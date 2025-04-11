// File: visualizers/graphVisualizer.js
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';

export function renderGraph(nodes = [], edges = [], containerId = "#visualizer") {
  const width = 800;
  const height = 500;

  const svg = d3.select(containerId)
    .html("")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(edges).id(d => d.id).distance(120))
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 2, height / 2));

  const link = svg.append("g")
    .selectAll("line")
    .data(edges)
    .join("line")
    .attr("stroke", "#aaa")
    .attr("stroke-width", 2);

  const node = svg.append("g")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 20)
    .attr("fill", "lightblue")
    .attr("stroke", "black");

  const label = svg.append("g")
    .selectAll("text")
    .data(nodes)
    .join("text")
    .text(d => d.id)
    .attr("text-anchor", "middle")
    .attr("dy", 5)
    .attr("font-size", "14px");

  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

    label
      .attr("x", d => d.x)
      .attr("y", d => d.y);
  });
}

export async function visualizeGraph({ nodes, edges, traversalOrder }, containerId = "#visualizer") {
  renderGraph(nodes, edges, containerId);

  for (const nodeId of traversalOrder) {
    highlightNode(nodeId, "orange");
    await delay(500);
    highlightNode(nodeId, "green");
  }
}

function highlightNode(id, color) {
  d3.selectAll("circle")
    .filter(d => d.id === id)
    .transition()
    .duration(300)
    .attr("fill", color);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
