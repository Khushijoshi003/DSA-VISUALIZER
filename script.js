import { setupNavbar } from './Components/navbar.js';
import { renderControls } from './Components/controls.js';

// DOM Elements
const visualizer = document.getElementById('visualizer');
let currentTab = 'sorting';

// Setup the navbar with tab switching
setupNavbar((tab) => {
  currentTab = tab;
  renderControls(currentTab); // Load relevant controls
  clearVisualizer();
});

// Clear previous visualizations
function clearVisualizer() {
  visualizer.innerHTML = '';
}

// ---------------------
// Callbacks for Algorithms
// ---------------------

// SORTING
function startSorting() {
  const algo = document.getElementById('sortAlgo').value;
  const size = parseInt(document.getElementById('arraySize').value);
  clearVisualizer();

  import('./algorithms/sorting.js')
    .then(({ visualizeSort }) => {
      visualizeSort(algo, size, visualizer);
    })
    .catch(console.error);
}

// SEARCHING
function startSearching() {
  const algo = document.getElementById('searchAlgo').value;
  const value = parseInt(document.getElementById('searchValue').value);
  clearVisualizer();

  import('./algorithms/searching.js')
    .then(({ visualizeSearch }) => {
      visualizeSearch(algo, value, visualizer);
    })
    .catch(console.error);
}

// TREES
function startTreeTraversal() {
  const algo = document.getElementById('treeAlgo').value;
  clearVisualizer();

  import('./algorithms/trees.js')
    .then(({ visualizeTree }) => {
      visualizeTree(algo, visualizer);
    })
    .catch(console.error);
}

// GRAPHS
// GRAPHS
function startGraphAlgo() {
  const algo = document.getElementById('graphAlgo').value;
  clearVisualizer();

  import('./algorithms/graphs.js')
    .then(({ visualizeGraphAlgo }) => {
      visualizeGraphAlgo(algo, '#visualizer');
    })
    .catch(console.error);
}


// ---------------------
// Expose to window for HTML button onclicks
// ---------------------
window.startSorting = startSorting;
window.startSearching = startSearching;
window.startTreeTraversal = startTreeTraversal;
window.startGraphAlgo = startGraphAlgo;

// Initialize first tab and controls
renderControls(currentTab);
document.querySelector(`[data-tab="${currentTab}"]`)?.classList.add('active');
