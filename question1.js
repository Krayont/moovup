//
const graph = {
  A: ['B', 'D', 'H'],
  B: ['A', 'C', 'D'],
  C: ['B', 'D', 'F'],
  D: ['A', 'B', 'C', 'E'],
  E: ['D', 'F', 'H'],
  F: ['C', 'E', 'G'],
  G: ['F', 'H'],
  H: ['A', 'E', 'G']
};

// Get all possible paths between two nodes with each node can be visited only once
function getAllPossiblePaths(graph, start, end) {
  let visited = {};
  let paths = [];
  let path = [];

  function dfs(node) {
    // console.log('====================================');
    // Path Found
    if (node === end) {
      paths.push([...path, node]);
      // console.log('Path Found');
      return;
    }

    // Mark the node as visited and add it to the path
    visited[node] = true;
    path.push(node);

    // Visit all the neighbors of the node
    for (let neighbor of graph[node]) {
      if (!visited[neighbor]) {
        // console.log(`Node ${node}: visit`, neighbor);
        dfs(neighbor);
      } else {
        // console.log(`Node ${node}: skip`, neighbor);
      }
    }

    // Unmark the node as visited and remove it from the path
    visited[node] = false;
    path.pop();
  }

  dfs(start);

  return paths;
}

// Get the shortest paths between two nodes with each node can be visited only once
function getShortestPath(graph, start, end) {
  //
  let visited = {};
  visited[start] = true;

  // Create a queue of paths starting with the start node
  let queue = [[start]];

  // Iterate until there are paths to explore
  while (queue.length > 0) {
    // console.log('====================================');
    // console.log('queue', queue);

    let currentPath = queue.shift(); // Dequeue the current path
    let currentNode = currentPath[currentPath.length - 1]; // Get the last node from the path

    // console.log('currentPath', currentPath);
    // console.log('currentNode', currentNode);

    // If the current node is the end node, return the path
    if (currentNode === end) {
      return currentPath;
    }

    // Explore neighbors of the current node
    for (let neighbor of graph[currentNode]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true; // Mark the neighbor as visited
        let newPath = currentPath.concat(neighbor); // Create a new path
        queue.push(newPath); // Enqueue the new path
        // console.log(queue);
      } else {
        // console.log('skip', neighbor);
      }
    }
    // console.log('visited', visited);
  }

  // If no path is found, return null or throw an error
  return null;

};

//
console.log('Possible', getAllPossiblePaths(graph, 'A', 'H'));
console.log('Shortest', getShortestPath(graph, 'A', 'H'));