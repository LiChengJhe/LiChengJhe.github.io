import { computed, ref, watch } from 'vue';
import { storyGraph } from '../data/storyGraph';
import { loadProgress, saveProgress } from './useProgressSave';

const START_NODE_ID = 'hero-opening';

export function useNarrativeGraph() {
  const saved = loadProgress();
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
    navigationHistory: initialNavigationHistory
  });

  const currentNode = computed(() => {
    return storyGraph[state.value.currentNodeId] || storyGraph[START_NODE_ID];
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
    state.value = {
      currentNodeId: START_NODE_ID,
      visitedNodeIds: new Set([START_NODE_ID]),
      choicesByNode: {},
      navigationHistory: [START_NODE_ID]
    };
  };

  watch(
    state,
    () => {
      saveProgress({
        currentNodeId: state.value.currentNodeId,
        visitedNodeIds: Array.from(state.value.visitedNodeIds),
        choicesByNode: state.value.choicesByNode,
        navigationHistory: state.value.navigationHistory
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
