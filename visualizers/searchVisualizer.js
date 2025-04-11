// visualizers/searchVisualizer.js

// Draws the array for search
export function renderSearchArray(array, containerId = "#visualizer") {
  const container = d3.select(containerId); 
  container.html(""); // Clear previous render

  const boxWidth = 60;

  const elements = container
    .append("div")
    .attr("class", "search-array")
    .style("display", "flex")
    .style("justify-content", "center");

  array.forEach((value, index) => {
    elements
      .append("div")
      .attr("class", "search-box")
      .attr("id", `box-${index}`)
      .style("width", `${boxWidth}px`)
      .style("height", "60px")
      .style("margin", "5px")
      .style("background-color", "#bbdefb")
      .style("display", "flex")
      .style("justify-content", "center")
      .style("align-items", "center")
      .style("border", "2px solid #0d47a1")
      .style("font-weight", "bold")
      .text(value);
  });
}

// Highlights a box by index
export function highlightBox(index, color = "orange") {
  d3.select(`#box-${index}`)
    .transition()
    .duration(300)
    .style("background-color", color);
}

// Delay utility
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 🚀 This is the NEW function to fix the error
export async function visualizeSearch(array, target, result) {
  renderSearchArray(array);

  for (let i = 0; i < array.length; i++) {
      highlightBox(i, "orange");
      await delay(500);

      if (array[i] === target) {
          highlightBox(i, "green"); // Found
          return;
      } else {
          highlightBox(i, "#e0e0e0"); // Not found, fade out
      }
  }

  // If not found, optional: flash red or show alert
  if (result === -1) {
      alert("Target not found in array.");
  }
}
