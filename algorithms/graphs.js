// File: algorithms/graphs.js
import { visualizeGraph } from '../visualizers/graphVisualizer.js';

export function visualizeGraphAlgo(algo, containerId = '#visualizer') {
  const nodes = [
    { id: 'A' },
    { id: 'B' },
    { id: 'C' },
    { id: 'D' },
    { id: 'E' }
  ];

  const edges = [
    { source: 'A', target: 'B' },
    { source: 'A', target: 'C' },
    { source: 'B', target: 'D' },
    { source: 'C', target: 'E' }
  ];

  const adjacencyList = buildAdjacencyList(nodes, edges);
  let traversalOrder = [];

  if (algo === 'bfs') {
    traversalOrder = bfs('A', adjacencyList);
  } else if (algo === 'dfs') {
    traversalOrder = dfs('A', adjacencyList);
  }

  visualizeGraph({ nodes, edges, traversalOrder }, containerId);
}

function buildAdjacencyList(nodes, edges) {
  const list = {};
  nodes.forEach(node => {
    list[node.id] = [];
  });
  edges.forEach(edge => {
    list[edge.source].push(edge.target);
    list[edge.target].push(edge.source); // for undirected graph
  });
  return list;
}

function bfs(start, adjList) {
  const visited = new Set();
  const queue = [start];
  const result = [];

  while (queue.length > 0) {
    const node = queue.shift();
    if (!visited.has(node)) {
      visited.add(node);
      result.push(node);
      queue.push(...adjList[node].filter(n => !visited.has(n)));
    }
  }

  return result;
}

function dfs(start, adjList) {
  const visited = new Set();
  const result = [];

  function dfsHelper(node) {
    if (visited.has(node)) return;
    visited.add(node);
    result.push(node);
    adjList[node].forEach(neighbor => dfsHelper(neighbor));
  }

  dfsHelper(start);
  return result;
}
