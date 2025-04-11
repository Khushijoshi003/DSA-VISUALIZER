// visualizers/sortVisualizer.js

// Renders the array as vertical bars
export function renderSortArray(array, containerId = "#visualizer") {
    const container = d3.select(containerId);
    container.html(""); // Clear previous content
  
    const svg = container
      .append("svg")
      .attr("width", "100%")
      .attr("height", 300)
      .style("background-color", "#f5f5f5");
  
    const barWidth = 30;
    const spacing = 10;
    const chartWidth = (barWidth + spacing) * array.length;
  
    const xScale = d3.scaleLinear()
      .domain([0, array.length])
      .range([0, chartWidth]);
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(array)])
      .range([0, 250]);
  
    svg.selectAll("rect")
      .data(array)
      .enter()
      .append("rect")
      .attr("x", (_, i) => xScale(i))
      .attr("y", d => 300 - yScale(d))
      .attr("width", barWidth)
      .attr("height", d => yScale(d))
      .attr("fill", "#64b5f6")
      .attr("id", (_, i) => `bar-${i}`)
      .attr("stroke", "#0d47a1")
      .attr("stroke-width", 1);
  }
  
  // Highlights a specific bar (e.g. during comparison)
  export function highlightBar(index, color = "orange") {
    d3.select(`#bar-${index}`)
      .transition()
      .duration(300)
      .attr("fill", color);
  }
  
  // Swaps heights of two bars with animation
  export async function swapBars(i, j, array) {
    const barI = d3.select(`#bar-${i}`);
    const barJ = d3.select(`#bar-${j}`);
  
    const heightI = +barI.attr("height");
    const heightJ = +barJ.attr("height");
  
    const yI = +barI.attr("y");
    const yJ = +barJ.attr("y");
  
    barI.transition().duration(300).attr("height", heightJ).attr("y", 300 - heightJ);
    barJ.transition().duration(300).attr("height", heightI).attr("y", 300 - heightI);
  
    // Swap in data too
    [array[i], array[j]] = [array[j], array[i]];
    await delay(350);
  }
  
  // Delay utility for animations
  export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  