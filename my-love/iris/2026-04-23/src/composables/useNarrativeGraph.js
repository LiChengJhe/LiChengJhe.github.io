import { computed, ref, watch } from 'vue';
import { storyGraph } from '../data/storyGraph';
import { loadProgress, saveProgress } from './useProgressSave';

const START_NODE_ID = 'hero-opening';
const PHOTO_NODE_PREFIX = 'photo-';
const PHOTO_NODE_IDS = Object.keys(storyGraph)
  .filter((nodeId) => nodeId.startsWith(PHOTO_NODE_PREFIX))
  .sort((a, b) => {
    const getIndex = (nodeId) => Number.parseInt(nodeId.replace(PHOTO_NODE_PREFIX, ''), 10) || 0;
    return getIndex(a) - getIndex(b);
  });
const PHOTO_NODE_SET = new Set(PHOTO_NODE_IDS);

const FIXED_PHOTO_JOURNEY_ORDER = [...PHOTO_NODE_IDS];

const resolvePhotoJourneyState = () => {
  if (PHOTO_NODE_IDS.length === 0) {
    return {
      photoJourneyOrder: []
    };
  }

  // Always use deterministic order (no randomness) and ignore legacy shuffled saves.
  return {
    photoJourneyOrder: [...FIXED_PHOTO_JOURNEY_ORDER]
  };
};

const getJourneyNextNodeId = (currentNodeId, photoJourneyOrder) => {
  if (!photoJourneyOrder.length) return 'finale';

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
  const initialPhotoJourney = resolvePhotoJourneyState();
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
    navigationHistory: initialNavigationHistory,
    photoJourneyOrder: initialPhotoJourney.photoJourneyOrder
  });

  const currentNode = computed(() => {
    const node = storyGraph[state.value.currentNodeId] || storyGraph[START_NODE_ID];
    const photoOrderIndex = state.value.photoJourneyOrder.indexOf(node.id);

    if (photoOrderIndex === -1) {
      return node;
    }

    const sceneNumber = photoOrderIndex + 1;
    const memory = node.memory
      ? {
          ...node.memory
        }
      : node.memory;

    return {
      ...node,
      title: `照片旅程｜第 ${sceneNumber} 幕`,
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

    // Returning to the journey start should begin a fresh run.
    restart();
    return homeNodeId;
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

  const restart = () => {
    state.value = {
      currentNodeId: START_NODE_ID,
      visitedNodeIds: new Set([START_NODE_ID]),
      navigationHistory: [START_NODE_ID],
      photoJourneyOrder: [...FIXED_PHOTO_JOURNEY_ORDER]
    };
  };

  watch(
    state,
    () => {
      saveProgress({
        currentNodeId: state.value.currentNodeId,
        visitedNodeIds: Array.from(state.value.visitedNodeIds),
        navigationHistory: state.value.navigationHistory,
        photoJourneyOrder: state.value.photoJourneyOrder
      });
    },
    { deep: true }
  );

  return {
    perfMode,
    currentNode,
    visitedCount,
    canGoBack,
    advance,
    goBack,
    goHome,
    restart
  };
}
