// data/algorithms.js

import { bfs } from "../algorithms/graphs.js";
import { binarySearch } from "../algorithms/searching.js";
import { bubbleSort } from "../algorithms/sorting.js";
import { dfsTraversal } from "../algorithms/trees.js";

export const algorithms = [
  {
    name: "Breadth First Search",
    category: "Graph",
    run: bfs,
  },
  {
    name: "Binary Search",
    category: "Search",
    run: binarySearch,
  },
  {
    name: "Bubble Sort",
    category: "Sort",
    run: bubbleSort,
  },
  {
    name: "DFS Traversal",
    category: "Tree",
    run: dfsTraversal,
  },
];
