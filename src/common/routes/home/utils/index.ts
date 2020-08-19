import AppConstant from '@src/common/constants/appConstants';
import { IEdge, IEdgeNodes, INode, INodes } from '@home/types';

export const getRandomIndex = (): number => {
  let index = 0;

  for (
    let iCtr = 1, max = Object.keys(AppConstant.COLORS).length;
    iCtr < max;
    iCtr++
  ) {
    if (Math.random() < 1 / (iCtr + 1)) {
      index = iCtr;
    }
  }

  return index;
};

export const sameColor = (nodeAId: number, nodeBId: number, nodes: INodes) => {
  return nodes[nodeAId].color === nodes[nodeBId].color;
};

export const createNodes = () => {
  const nodes: INodes = {};
  const totalSize = AppConstant.SIZE * AppConstant.SIZE;

  for (let i = 0; i < totalSize; i++) {
    const node: INode = {
      id: i,
      color: getRandomIndex(),
    };
    nodes[i] = node;
  }

  return nodes;
};

export const setEdgeWeight = (
  id: number,
  nodes: INodes,
  edgesByNode: IEdgeNodes
) => {
  const node = nodes[id];
  const nodeId = node.id;
  const edges: IEdge[] = [];

  const topIndex = nodeId - AppConstant.SIZE;
  const rightIndex = nodeId + 1;
  const bottomIndex = nodeId + AppConstant.SIZE;
  const leftIndex = nodeId - 1;

  if (topIndex >= 0) {
    const w = sameColor(nodeId, topIndex, nodes) ? 0 : 1;
    edges.push({ sourceId: nodeId, distId: topIndex, weight: w });
  }

  if (rightIndex % AppConstant.SIZE > 0) {
    const w = sameColor(nodeId, rightIndex, nodes) ? 0 : 1;
    edges.push({ sourceId: nodeId, distId: rightIndex, weight: w });
  }

  if (bottomIndex < AppConstant.SIZE * AppConstant.SIZE) {
    const w = sameColor(nodeId, bottomIndex, nodes) ? 0 : 1;
    edges.push({ sourceId: nodeId, distId: bottomIndex, weight: w });
  }

  if (nodeId % AppConstant.SIZE !== 0) {
    const w = sameColor(nodeId, leftIndex, nodes) ? 0 : 1;
    edges.push({ sourceId: nodeId, distId: leftIndex, weight: w });
  }

  edgesByNode[nodeId] = edges;
};

export const getEdgeWeights = (nodes: INodes): IEdgeNodes => {
  const edgesByNode: IEdgeNodes = {};
  Object.keys(nodes).forEach(id => {
    setEdgeWeight(Number(id), nodes, edgesByNode);
  });

  return edgesByNode;
};

export const updateColor = (
  colorIndex: number,
  newNodes: INodes,
  newNodeEges: IEdgeNodes
) => {
  const seenIds: number[] = [];
  const processing = [0];
  const updateEdgeWeights: number[] = [];
  while (processing.length > 0) {
    const currentNodeId = processing.pop();
    if (typeof currentNodeId !== 'undefined') {
      const newNode = { id: currentNodeId, color: colorIndex };
      newNodes[currentNodeId] = newNode;
      updateEdgeWeights.push(currentNodeId);
      seenIds.push(currentNodeId);
      newNodeEges[currentNodeId].forEach((edge: IEdge) => {
        if (updateEdgeWeights.indexOf(edge.distId) !== -1) {
          updateEdgeWeights.push(edge.distId);
        }
        if (seenIds.indexOf(edge.distId) > -1) {
          return;
        }
        if (edge.weight === 0) {
          processing.push(edge.distId);
        }
      });
    }
  }
  updateEdgeWeights.forEach((nodeId: number) =>
    setEdgeWeight(nodeId, newNodes, newNodeEges)
  );
};

export const calculateConnectedNode = (newNodeEges: IEdgeNodes): number => {
  const processing = [0];
  let count = 1;
  const seenIds: number[] = [];
  while (processing.length > 0) {
    const currentNodeId = processing.pop();
    if (typeof currentNodeId !== 'undefined') {
      seenIds.push(currentNodeId);
      newNodeEges[currentNodeId].forEach((edge: IEdge) => {
        if (seenIds.indexOf(edge.distId) > -1) {
          return;
        }
        if (edge.weight === 0) {
          processing.push(edge.distId);
          count++;
        }
      });
    }
  }

  return count;
};
