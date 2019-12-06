const fs = require('fs');
const Graph = require('node-dijkstra');

fs.readFile('./input.txt', (e, data) => {
  const input = data.toString()
    .split('\r\n')
    .map(item => {
      return item.split(')');
    });

  const route = new Graph()

  function getGraph(input) {

    input.forEach(thisNode => {
      const graphObject = {};
      const graphKey = thisNode.join();
      const nextNodes = input.filter(node => thisNode[1] === node[0]);
      const prevNodes = input.filter(node => thisNode[0] === node[1]);
      [...nextNodes, ...prevNodes].forEach(node => {
        graphObject[node.join()] = 1;
      });
      route.addNode(graphKey, graphObject);
    });
  }

  getGraph(input);

  const shortestPath = route.path('Z48,YOU', '87T,SAN');

  console.log(shortestPath.length);
});
