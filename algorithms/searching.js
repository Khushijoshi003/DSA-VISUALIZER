// Utility delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Render the array visually using D3.js
function renderArray(arr, containerId) {
  const width = 40;
  const svg = d3.select(containerId)
    .html("") // Clear previous
    .append("svg")
    .attr("width", arr.length * width + 10)
    .attr("height", 100);

  svg.selectAll("rect")
    .data(arr)
    .enter()
    .append("rect")
    .attr("x", (_, i) => i * width)
    .attr("y", 20)
    .attr("width", width - 5)
    .attr("height", 40)
    .attr("fill", "#90caf9")
    .attr("stroke", "#0d47a1")
    .attr("id", (_, i) => `bar-${i}`);

  svg.selectAll("text")
    .data(arr)
    .enter()
    .append("text")
    .attr("x", (_, i) => i * width + 10)
    .attr("y", 45)
    .text((d) => d)
    .attr("fill", "#000");
}

function highlightIndex(index, color = "orange") {
  d3.select(`#bar-${index}`).transition().duration(300).attr("fill", color);
}

// Linear Search Visualization
export async function linearSearchVisual(arr, target, containerId) {
  renderArray(arr, containerId);

  for (let i = 0; i < arr.length; i++) {
    highlightIndex(i, "yellow");
    await delay(500);

    if (arr[i] === target) {
      highlightIndex(i, "green");
      return i;
    } else {
      highlightIndex(i, "red");
    }
  }

  return -1;
}

// Binary Search Visualization
export async function binarySearchVisual(arr, target, containerId) {
  renderArray(arr, containerId);

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    highlightIndex(mid, "yellow");
    await delay(500);

    if (arr[mid] === target) {
      highlightIndex(mid, "green");
      return mid;
    } else {
      highlightIndex(mid, "red");
      if (arr[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
  }

  return -1;
}

// Main visualizeSearch function
export async function visualizeSearch(algo, size, containerId = "#visualizer") {
  const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 30) + 1);
  const target = arr[Math.floor(Math.random() * size)];

  switch (algo) {
    case "linear":
      await linearSearchVisual(arr, target, containerId);
      break;
    case "binary":
      arr.sort((a, b) => a - b); // Binary search requires sorted array
      await binarySearchVisual(arr, target, containerId);
      break;
    default:
      console.error(`Unknown search algorithm: ${algo}`);
  }
}
