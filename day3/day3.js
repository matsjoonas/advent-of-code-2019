
const fs = require('fs');

const wire1Points = [];
const wire2Points = [];

function executeMove(lastCoords = { x: 0, y: 0 }, currentMove, wirePoints) {
  for (let i = 0; i < currentMove.distance; i++) {
    switch (currentMove.direction) {
      case 'R':
        lastCoords = {
          x: lastCoords.x + 1,
          y: lastCoords.y,
        };
        wirePoints.push(lastCoords);
        break;
      case 'L':
        lastCoords = {
          x: lastCoords.x - 1,
          y: lastCoords.y,
        };
        wirePoints.push(lastCoords);
        break;
      case 'U':
        lastCoords = {
          x: lastCoords.x,
          y: lastCoords.y + 1,
        };
        wirePoints.push(lastCoords);
        break;
      case 'D':
        lastCoords = {
          x: lastCoords.x,
          y: lastCoords.y - 1,
        };
        wirePoints.push(lastCoords);
        break;
    }
  }

  return lastCoords;
}

fs.readFile('./input.txt', (e, data) => {
  const wires = data.toString()
    .split('\n')
    .map(line => line.split(',').map(move => {
      return {
        direction: move.charAt(0),
        distance: parseInt(move.substr(1)),
      }
    }));


  let lastCoords = { x: 0, y: 0 };
  wires[0].forEach(move => {
    lastCoords = executeMove(lastCoords, move, wire1Points);
  })

  lastCoords = { x: 0, y: 0 };
  wires[1].forEach(move => {
    lastCoords = executeMove(lastCoords, move, wire2Points);
  })

  const wire1PointsStrings = wire1Points.map(point => JSON.stringify(point));
  const wire2PointsStrings = wire2Points.map(point => JSON.stringify(point));

  let intersections = [];

  // find intersections and steps
  
  wire1PointsStrings.forEach((point, index) => {
    const intersectionIndex = wire2PointsStrings.indexOf(point);

    if (intersectionIndex > -1) {
      intersections.push({
        intersection: wire2PointsStrings[intersectionIndex],
        wire1Steps: index + 1,
        wire2Steps: intersectionIndex + 1,
      });
    }
  });

  console.log(intersections);
  
  const result = intersections.map(intersection => {
    return intersection.wire1Steps + intersection.wire2Steps;
  }).sort((a, b) => a - b)[0];
  console.log(result)
  

});