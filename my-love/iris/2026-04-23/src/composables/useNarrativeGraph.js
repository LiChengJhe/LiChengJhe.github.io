import { computed, ref, watch } from 'vue';
import { storyGraph } from '../data/storyGraph';
import { loadProgress, saveProgress } from './useProgressSave';

const START_NODE_ID = 'hero-opening';
const PHOTO_NODE_PREFIX = 'photo-';
const PHOTO_NODE_IDS = Object.keys(storyGraph).filter((nodeId) => nodeId.startsWith(PHOTO_NODE_PREFIX));
const PHOTO_NODE_SET = new Set(PHOTO_NODE_IDS);

const shuffleNodeIds = (nodeIds) => {
  const next = [...nodeIds];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
};

const isValidPhotoOrder = (order, expectedNodeIds) => {
  if (!Array.isArray(order)) return false;
  if (order.length !== expectedNodeIds.length) return false;
  const unique = new Set(order);
  if (unique.size !== expectedNodeIds.length) return false;
  const expectedSet = new Set(expectedNodeIds);
  return order.every((nodeId) => expectedSet.has(nodeId));
};

const resolvePhotoJourneyState = (savedOrder, savedIntroPhotoNodeId) => {
  if (PHOTO_NODE_IDS.length === 0) {
    return {
      introPhotoNodeId: null,
      photoJourneyOrder: []
    };
  }

  // Backward-compatible restore: old saves may only contain full photoJourneyOrder.
  if (savedIntroPhotoNodeId && PHOTO_NODE_SET.has(savedIntroPhotoNodeId)) {
    const expectedOrder = PHOTO_NODE_IDS.filter((nodeId) => nodeId !== savedIntroPhotoNodeId);
    if (isValidPhotoOrder(savedOrder, expectedOrder)) {
      return {
        introPhotoNodeId: savedIntroPhotoNodeId,
        photoJourneyOrder: [...savedOrder]
      };
    }
  }

  if (isValidPhotoOrder(savedOrder, PHOTO_NODE_IDS)) {
    return {
      introPhotoNodeId: savedOrder[0],
      photoJourneyOrder: savedOrder.slice(1)
    };
  }

  const shuffled = shuffleNodeIds(PHOTO_NODE_IDS);
  return {
    introPhotoNodeId: shuffled[0],
    photoJourneyOrder: shuffled.slice(1)
  };
};

const getJourneyNextNodeId = (currentNodeId, photoJourneyOrder) => {
  if (!photoJourneyOrder.length) return 'finale';

  if (currentNodeId === 'intro') {
    return photoJourneyOrder[0] || 'finale';
  }

  if (!PHOTO_NODE_SET.has(currentNodeId)) {
    return null;
  }

  const currentIndex = photoJourneyOrder.indexOf(currentNodeId);
  if (currentIndex === -1) {
    return photoJourneyOrder[0] || 'finale';
  }

  return photoJourneyOrder[currentIndex + 1] || 'finale';
};

export function useNarrativeGraph() {
  const saved = loadProgress();
  const initialPhotoJourney = resolvePhotoJourneyState(saved?.photoJourneyOrder, saved?.introPhotoNodeId);
  const initialCurrentNodeId =
    saved?.currentNodeId && storyGraph[saved.currentNodeId]
      ? saved.currentNodeId
      : START_NODE_ID;

  const initialNavigationHistory = Array.isArray(saved?.navigationHistory)
    ? saved.navigationHistory.filter((nodeId) => storyGraph[nodeId])
    : [];

  if (!initialNavigationHistory.length) {
    initialNavigationHistory.push(initialCurrentNodeId);
  }

  if (initialNavigationHistory[initialNavigationHistory.length - 1] !== initialCurrentNodeId) {
    initialNavigationHistory.push(initialCurrentNodeId);
  }

  const initialVisitedIds = Array.isArray(saved?.visitedNodeIds)
    ? saved.visitedNodeIds.filter((nodeId) => storyGraph[nodeId])
    : [];

  if (!initialVisitedIds.includes(initialCurrentNodeId)) {
    initialVisitedIds.push(initialCurrentNodeId);
  }

  const state = ref({
    currentNodeId: initialCurrentNodeId,
    visitedNodeIds: new Set(initialVisitedIds),
    choicesByNode: saved?.choicesByNode || {},
    navigationHistory: initialNavigationHistory,
    introPhotoNodeId: initialPhotoJourney.introPhotoNodeId,
    photoJourneyOrder: initialPhotoJourney.photoJourneyOrder
  });

  const currentNode = computed(() => {
    const node = storyGraph[state.value.currentNodeId] || storyGraph[START_NODE_ID];
    if (node.id === 'intro') {
      const introPhotoId = state.value.introPhotoNodeId;
      const introPhotoNode = introPhotoId ? storyGraph[introPhotoId] : null;
      const introPhotoImage = introPhotoNode?.memory?.image || node.memory?.image;

      return {
        ...node,
        memory: {
          ...(node.memory || {}),
          image: introPhotoImage,
          caption: '旅程起點會依本輪隨機順序展開，第一幕就在眼前。'
        }
      };
    }

    const photoOrderIndex = state.value.photoJourneyOrder.indexOf(node.id);

    if (photoOrderIndex === -1) {
      return node;
    }

    const sceneNumber = photoOrderIndex + 1;
    const memory = node.memory
      ? {
          ...node.memory,
          caption: `本輪第 ${sceneNumber} 幕，這段回憶再次被溫柔點亮。`
        }
      : node.memory;

    return {
      ...node,
      title: `照片旅程｜本輪第 ${sceneNumber} 幕`,
      memory
    };
  });

  const visitedCount = computed(() => state.value.visitedNodeIds.size);
  const previousNodeId = computed(() => {
    const history = state.value.navigationHistory;
    if (!Array.isArray(history) || history.length < 2) return null;
    return history[history.length - 2];
  });

  const canGoBack = computed(() => Boolean(previousNodeId.value));
  const perfMode = computed(() => {
    if (typeof window === 'undefined') return 'high';
    const cores = window.navigator.hardwareConcurrency || 4;
    return cores < 4 ? 'low' : 'high';
  });

  const goToNode = (nodeId) => {
    if (!storyGraph[nodeId]) return;

    state.value.currentNodeId = nodeId;
    state.value.visitedNodeIds.add(nodeId);
    if (state.value.navigationHistory[state.value.navigationHistory.length - 1] !== nodeId) {
      state.value.navigationHistory.push(nodeId);
    }
  };

  const goBack = (options = {}) => {
    const { dryRun = false } = options;
    const targetId = previousNodeId.value;
    if (!targetId) return null;

    if (dryRun) {
      return targetId;
    }

    state.value.navigationHistory = state.value.navigationHistory.slice(0, -1);
    state.value.currentNodeId = targetId;
    state.value.visitedNodeIds.add(targetId);
    return targetId;
  };

  const goHome = (options = {}) => {
    const { dryRun = false } = options;
    const homeNodeId = START_NODE_ID;
    if (!storyGraph[homeNodeId] || state.value.currentNodeId === homeNodeId) {
      return null;
    }

    if (dryRun) {
      return homeNodeId;
    }

    goToNode(homeNodeId);
    return homeNodeId;
  };

  const choose = (choiceId, options = {}) => {
    const { dryRun = false, recordChoice = false } = options;
    const node = currentNode.value;
    const selected = node.options?.find((option) => option.id === choiceId);
    if (!selected) return null;

    if (recordChoice) {
      state.value.choicesByNode[node.id] = choiceId;
    }

    if (dryRun) {
      return selected.next;
    }

    state.value.choicesByNode[node.id] = choiceId;
    goToNode(selected.next);
    return selected.next;
  };

  const advance = (options = {}) => {
    const { dryRun = false } = options;

    const journeyNextId = getJourneyNextNodeId(currentNode.value.id, state.value.photoJourneyOrder);
    if (journeyNextId && storyGraph[journeyNextId]) {
      if (dryRun) {
        return journeyNextId;
      }
      goToNode(journeyNextId);
      return journeyNextId;
    }

    const nextId = currentNode.value.next;
    if (nextId) {
      if (dryRun) {
        return nextId;
      }
      goToNode(nextId);
      return nextId;
    }

    return null;
  };

  const goToNodeWithTransition = (nodeId) => {
    goToNode(nodeId);
  };

  const restart = () => {
    const shuffled = shuffleNodeIds(PHOTO_NODE_IDS);
    state.value = {
      currentNodeId: START_NODE_ID,
      visitedNodeIds: new Set([START_NODE_ID]),
      choicesByNode: {},
      navigationHistory: [START_NODE_ID],
      introPhotoNodeId: shuffled[0] || null,
      photoJourneyOrder: shuffled.slice(1)
    };
  };

  watch(
    state,
    () => {
      saveProgress({
        currentNodeId: state.value.currentNodeId,
        visitedNodeIds: Array.from(state.value.visitedNodeIds),
        choicesByNode: state.value.choicesByNode,
        navigationHistory: state.value.navigationHistory,
        introPhotoNodeId: state.value.introPhotoNodeId,
        photoJourneyOrder: state.value.photoJourneyOrder
      });
    },
    { deep: true }
  );

  return {
    state,
    perfMode,
    currentNode,
    visitedCount,
    previousNodeId,
    canGoBack,
    choose,
    advance,
    goBack,
    goHome,
    goToNodeWithTransition,
    restart
  };
}
