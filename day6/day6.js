const fs = require('fs');

// example answer is 42
/*
* take a node
* if node's alpha connects to some already traversed path's beta, attach it to tit and count 1
* Traverse back until no more or some already traversed node's beta and count 
* store traversed path
* 
*/

fs.readFile('./input.txt', (e, data) => {
  const input = data.toString()
    .split('\r\n')
    .map(item => {
      return item.split(')');
    });



  const startingNode = input.find(node => node[0] === 'COM');
  const termninalNodes = [];

  function getTerminalNodes(input, thisNode) {
    const nextNodes = input.filter(node => node[0] === thisNode[1]);
    if (!nextNodes.length) {
      termninalNodes.push(thisNode);
      return;
    } else {
      return nextNodes.forEach(nextNode => {
        return getTerminalNodes(input, nextNode);
      });
    }
  }

  getTerminalNodes(input, startingNode);
  const paths = [];

  function getPath(input, thisNode, path = []) {
    path.push(thisNode);
    const nextNode = input.find(nextNode => nextNode[1] === thisNode[0])
    if (!nextNode) {
      return path;
    } else {
      return getPath(input, nextNode, path);
    }
  };

  termninalNodes.forEach(thisNode => {
    paths.push(getPath(input, thisNode).reverse());
  });

  let totalOrbits = 0;

  input.forEach(node => {
    const path = paths.find(path => {
      return path.find(pathNode => pathNode.join() === node.join());
    });

    const index = path.findIndex(pathNode => pathNode.join() === node.join());

    if (index > -1) {
      totalOrbits += index + 1;
    }
  });

  console.log(totalOrbits);
});
