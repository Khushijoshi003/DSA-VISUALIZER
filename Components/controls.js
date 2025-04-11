// Controls generator based on selected algorithm
export function renderControls(tab) {
    const controls = document.getElementById("algorithm-controls");
    controls.innerHTML = ""; // Clear previous
  
    switch (tab) {
      case "sorting":
        controls.innerHTML = `
          <input type="number" id="arraySize" placeholder="Size (e.g. 20)" />
          <select id="sortAlgo">
            <option value="bubble">Bubble Sort</option>
            <option value="merge">Merge Sort</option>
            <option value="quick">Quick Sort</option>
            <option value="heap">Heap Sort</option>
          </select>
          <button id="run-sort">Run Sort</button>
        `;
        document.getElementById("run-sort").onclick = () => window.startSorting();
        break;
  
      case "searching":
        controls.innerHTML = `
          <input type="text" id="searchArray" placeholder="e.g. 1,3,5,7,9"/>
          <input type="number" id="searchValue" placeholder="Target"/>
          <select id="searchAlgo">
            <option value="linear">Linear Search</option>
            <option value="binary">Binary Search</option>
          </select>
          <button id="run-search">Run Search</button>
        `;
        document.getElementById("run-search").onclick = () => window.startSearching();
        break;
  
      case "tree":
        controls.innerHTML = `
          <input type="text" id="treeArray" placeholder="Level-order e.g. 1,2,3,null,4" />
          <select id="treeAlgo">
            <option value="inorder">Inorder</option>
            <option value="preorder">Preorder</option>
            <option value="postorder">Postorder</option>
          </select>
          <button id="run-tree">Run Traversal</button>
        `;
        document.getElementById("run-tree").onclick = () => window.startTreeTraversal();
        break;
  
      case "graph":
        controls.innerHTML = `
          <select id="graphAlgo">
            <option value="bfs">BFS</option>
            <option value="dfs">DFS</option>
            <option value="dijkstra">Dijkstra</option>
          </select>
          <button id="run-graph">Run Graph Algorithm</button>
        `;
        document.getElementById("run-graph").onclick = () => window.startGraphAlgo();
        break;
  
      default:
        controls.innerHTML = "<p>Select an algorithm tab above 👆</p>";
    }
  }
  