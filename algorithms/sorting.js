// Utility Functions
function renderArray(arr, containerId = "#visualizer") {
    const width = 40;
    const svg = d3.select(containerId)
      .html("")
      .append("svg")
      .attr("width", arr.length * width + 20)
      .attr("height", 200);
  
    svg.selectAll("rect")
      .data(arr)
      .enter()
      .append("rect")
      .attr("x", (_, i) => i * width + 10)
      .attr("y", d => 180 - d * 5)
      .attr("width", width - 10)
      .attr("height", d => d * 5)
      .attr("fill", "#90caf9")
      .attr("id", (_, i) => `bar-${i}`);
  
    svg.selectAll("text")
      .data(arr)
      .enter()
      .append("text")
      .attr("x", (_, i) => i * width + 20)
      .attr("y", 190)
      .attr("text-anchor", "middle")
      .text(d => d);
  }
  
  function highlightBars(i, j, color = "yellow") {
    d3.select(`#bar-${i}`).attr("fill", color);
    d3.select(`#bar-${j}`).attr("fill", color);
  }
  
  function updateBars(arr) {
    arr.forEach((val, i) => {
      d3.select(`#bar-${i}`)
        .transition()
        .duration(200)
        .attr("y", 180 - val * 5)
        .attr("height", val * 5);
    });
  }
  
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  
  // Bubble Sort
  export async function bubbleSort(arr) {
    renderArray(arr);
    const n = arr.length;
  
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        highlightBars(j, j + 1, "orange");
        await delay(300);
        if (arr[j] > arr[j + 1]) {
          swap(arr, j, j + 1);
          updateBars(arr);
          await delay(300);
        }
        highlightBars(j, j + 1, "#90caf9");
      }
    }
  
    arr.forEach((_, i) => highlightBars(i, i, "green"));
  }
  
  // Merge Sort
  export async function mergeSort(arr, containerId = "#visualizer") {
    renderArray(arr, containerId);
    await mergeSortHelper(arr, 0, arr.length - 1);
    arr.forEach((_, i) => highlightBars(i, i, "green"));
  }
  
  async function mergeSortHelper(arr, left, right) {
    if (left >= right) return;
  
    const mid = Math.floor((left + right) / 2);
    await mergeSortHelper(arr, left, mid);
    await mergeSortHelper(arr, mid + 1, right);
    await merge(arr, left, mid, right);
  }
  
  async function merge(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
  
    while (i < leftArr.length && j < rightArr.length) {
      highlightBars(k, k, "orange");
      await delay(300);
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i++];
      } else {
        arr[k] = rightArr[j++];
      }
      updateBars(arr);
      await delay(300);
      highlightBars(k, k, "#90caf9");
      k++;
    }
  
    while (i < leftArr.length) {
      arr[k] = leftArr[i++];
      updateBars(arr);
      await delay(300);
      k++;
    }
  
    while (j < rightArr.length) {
      arr[k] = rightArr[j++];
      updateBars(arr);
      await delay(300);
      k++;
    }
  }
  
  // Quick Sort
  export async function quickSort(arr) {
    renderArray(arr);
    await quickSortHelper(arr, 0, arr.length - 1);
    arr.forEach((_, i) => highlightBars(i, i, "green"));
  }
  
  async function quickSortHelper(arr, low, high) {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    }
  }
  
  async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    highlightBars(high, high, "purple"); // Highlight pivot
  
    for (let j = low; j < high; j++) {
      highlightBars(j, j, "orange");
      await delay(300);
      if (arr[j] < pivot) {
        i++;
        swap(arr, i, j);
        updateBars(arr);
        await delay(300);
      }
      highlightBars(j, j, "#90caf9");
    }
  
    swap(arr, i + 1, high);
    updateBars(arr);
    await delay(300);
    return i + 1;
  }
  
  // Heap Sort
  export async function heapSort(arr) {
    renderArray(arr);
    const n = arr.length;
  
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }
  
    for (let i = n - 1; i > 0; i--) {
      swap(arr, 0, i);
      updateBars(arr);
      await delay(300);
      await heapify(arr, i, 0);
    }
  
    arr.forEach((_, i) => highlightBars(i, i, "green"));
  }
  
  async function heapify(arr, n, i) {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
  
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
  
    if (largest !== i) {
      swap(arr, i, largest);
      updateBars(arr);
      await delay(300);
      await heapify(arr, n, largest);
    }
  }
  export async function visualizeSort(algo, size, containerId = "#visualizer") {
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 30) + 1);
  
    switch (algo) {
      case "bubble":
        await bubbleSort(arr);
        break;
      case "merge":
        await mergeSort(arr, containerId);
        break;
      case "quick":
        await quickSort(arr);
        break;
      case "heap":
        await heapSort(arr);
        break;
      default:
        console.error(`Unknown algorithm: ${algo}`);
    }
  }
  