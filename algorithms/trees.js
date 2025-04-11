import { sampleBinaryTree } from "../data/sampleTrees.js";

// D3.js Tree Rendering
export function renderTree(root, containerId = "#tree-visual") {
  d3.select(containerId).html(""); // Clear previous content

  if (!root) {
    console.warn("Cannot render tree: root is null or undefined");
    return;
  }

  const margin = { top: 40, right: 90, bottom: 50, left: 90 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3.select(containerId)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const rootD3 = d3.hierarchy(root, d => [d.left, d.right].filter(Boolean));
  const treeLayout = d3.tree().size([width, height]);
  treeLayout(rootD3);

  // Links
  svg.selectAll(".link")
    .data(rootD3.links())
    .enter()
    .append("line")
    .attr("class", "link")
    .attr("stroke", "#ccc")
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  // Nodes
  const node = svg.selectAll(".node")
    .data(rootD3.descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.x},${d.y})`);

  node.append("circle")
    .attr("r", 20)
    .attr("fill", "#a5d6a7")
    .attr("id", d => `node-${d.data.value}`);

  node.append("text")
    .attr("dy", 5)
    .attr("text-anchor", "middle")
    .text(d => d.data.value);
}

// Animation helper
function highlightNode(value, color = "orange") {
  return new Promise(res => {
    d3.select(`#node-${value}`)
      .transition()
      .duration(400)
      .attr("fill", color)
      .on("end", () => res());
  });
}

// Traversals
export async function preorder(root, onVisit = () => {}) {
  async function traverse(node) {
    if (!node) return;
    onVisit(node.value);
    await highlightNode(node.value, "orange");
    await traverse(node.left);
    await traverse(node.right);
    await highlightNode(node.value, "green");
  }
  await traverse(root);
}

export async function inorder(root, onVisit = () => {}) {
  async function traverse(node) {
    if (!node) return;
    await traverse(node.left);
    onVisit(node.value);
    await highlightNode(node.value, "orange");
    await traverse(node.right);
    await highlightNode(node.value, "green");
  }
  await traverse(root);
}

export async function postorder(root, onVisit = () => {}) {
  async function traverse(node) {
    if (!node) return;
    await traverse(node.left);
    await traverse(node.right);
    onVisit(node.value);
    await highlightNode(node.value, "orange");
    await highlightNode(node.value, "green");
  }
  await traverse(root);
}

// Entry point
export async function visualizeTree(type = "inorder", containerId = "#tree-visual") {
  const root = sampleBinaryTree;

  if (!root) {
    console.error("visualizeTree: root is null");
    return;
  }

  renderTree(root, containerId);

  switch (type) {
    case "inorder":
      await inorder(root);
      break;
    case "preorder":
      await preorder(root);
      break;
    case "postorder":
      await postorder(root);
      break;
    default:
      console.warn(`Unknown traversal type: ${type}`);
  }
}
