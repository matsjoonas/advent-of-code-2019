
const fs = require('fs');

Number.prototype.between = function (a, b) {
  const min = Math.min.apply(Math, [a, b]);
  const max = Math.max.apply(Math, [a, b]);
  return this >= min && this <= max;
};

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

  function getLineEq(segment) {
    if (segment[0][0] === segment[1][0]) {
      return {
        x: segment[0][0],
      }
    } else if (segment[0][1] === segment[1][1]) {
      return {
        y: segment[0][1],
      }
    }
  }

  const line1 = getLineEq(segment1);
  const line2 = getLineEq(segment2);

  let intersection = [];

  if (line1.x !== undefined && line2.x !== undefined) {
    return intersection;
  } else if (line1.y !== undefined && line2.y !== undefined) {
    return intersection;
  } else {
    let x, y;
    if (line1.x !== undefined) {
      x = line1.x; // line 1 runs parallel to y axis, x varies
      y = line2.y; // line 2 runs parallel to x axis, y varies

      if (x.between(segment2[0][0], segment2[1][0]) && y.between(segment1[0][1], segment1[1][1])) {
        intersection = [x, y];
      }

    } else {
      x = line2.x; // line 2 runs parallel to y axis 
      y = line1.y; // line 1 runs parallel to x axis
      if (x.between(segment1[0][0], segment1[1][0]) && y.between(segment2[0][1], segment2[1][1])) {
        intersection = [x, y];
      }
    }

  }

  return intersection;
}

fs.readFile('./input.txt', (e, data) => {
  const wires = data.toString()
    .split('\n')
    .map(line => line.split(','))
    .map(moves => convertTotLineSegments(moves));

  const intersections = [];
  wires[0].forEach(segment => {
    wires[1].forEach(segment2 => {
      const intersection = findSegmentIntersection(segment, segment2);
      if (intersection.length) {
        intersections.push(intersection);
      }
    });
  });

  const distances = intersections.map(intersection => {
    return Math.abs(intersection[0]) + Math.abs(intersection[1]);
  });


  console.log(distances.sort((a,b) => a - b)[0]);

});