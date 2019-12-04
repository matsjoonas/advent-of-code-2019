
const fs = require('fs');

function convertTotLineSegments(moves, startingPoint = [0, 0]) {

  return moves.reduce((lineSegments, move) => {
    const direction = move.charAt(0);
    const magnitude = parseInt(move.substr(1));
    let vector;
    switch (direction) {
      case 'R':
        vector = [magnitude, 0];
        break;
      case 'L':
        vector = [-magnitude, 0];
        break;
      case 'U':
        vector = [0, magnitude];
        break;
      case 'D':
        vector = [0, -magnitude];
        break;
    }

    let p1 = startingPoint;
    if (lineSegments.length > 0) {
      p1 = lineSegments[lineSegments.length - 1][1];
    }

    const p2 = [p1[0] + vector[0], p1[1] + vector[1]];
    lineSegments.push([p1, p2]);
    return lineSegments;
  }, []);
}

function findSegmentIntersection(segment1, segment2) {
  const vector1 = [segment1[1][0] - segment1[0][0], segment1[1][1] - segment1[0][1]];
  const vector2 = [segment2[1][0] - segment2[0][0], segment2[1][1] - segment2[0][1]];

  function getLineEq(segment)  {
    if (segment[0][0] === segment[1][0] ) {
      return {
        x: segment[0][0],
      }
    } else if (segment[0][1] === segment[1][1] ) {
      return {
        y: segment[0][1],
      }
    }
  }

  const line1 = getLineEq(segment1);
  const line2 = getLineEq(segment2);

  const intersection = [];
  line1.x !== undefined ? intersection[0] = line1.x : intersection[0] = line2.x;
  line1.y !== undefined ? intersection[1] = line1.y : intersection[1] = line2.y;

  console.log(intersection);
  // find out if the intersection is in the segment
  // alsho, handle parallel lines
}

fs.readFile('./input.txt', (e, data) => {
  const wires = data.toString()
    .split('\n')
    .map(line => line.split(','))
    .map(moves => convertTotLineSegments(moves));

    
  findSegmentIntersection([[0, 4], [0, 10]], [[3, 10], [100, 10]]);
  findSegmentIntersection([[3, 10], [100, 10]], [[0, 4], [0, 10]]);
  findSegmentIntersection([[5, 4], [5, 10]], [[3, 10], [100, 10]]);

});