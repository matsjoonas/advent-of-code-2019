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

  const paths = [];

  const startingNode = input.find(node => node[0] === 'COM');
  let count = 0;

  function traverse(input, thisNode) {
    const nextNodes = input.filter(node => node[0] === thisNode[1]);
    count++;
    console.log(thisNode);
    if (!nextNodes.length) {
      return;;
    } else {
      return nextNodes.forEach(nextNode => {
        return traverse(input, nextNode);
      });
    }
  }

  traverse(input, startingNode);
  console.log(count);

});
