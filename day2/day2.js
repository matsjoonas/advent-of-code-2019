function computer(intcode, startingPos = 0, inputs = [12, 2]) {
  let currentSegment = intcode.slice(startingPos, startingPos + 4);
  const opcode = currentSegment[0];
  if (opcode === 99 || !currentSegment.length) {
    return intcode;
  }

  // assign inputs
  if (startingPos === 0) {
    intcode[1] = inputs[0];
    intcode[2] = inputs[1];
  }

  const inVal1 = intcode[currentSegment[1]];
  const inVal2 = intcode[currentSegment[2]];
  const outPos = currentSegment[3];

  if (opcode === 1) {
    intcode[outPos] = inVal1 + inVal2;
    return computer(intcode, startingPos + 4);
  } else if (opcode === 2) {
    intcode[outPos] = inVal1 * inVal2;
    return computer(intcode, startingPos + 4);
  }

  return intcode;
}

const intcode = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,13,19,2,9,19,23,1,23,6,27,1,13,27,31,1,31,10,35,1,9,35,39,1,39,9,43,2,6,43,47,1,47,5,51,2,10,51,55,1,6,55,59,2,13,59,63,2,13,63,67,1,6,67,71,1,71,5,75,2,75,6,79,1,5,79,83,1,83,6,87,2,10,87,91,1,9,91,95,1,6,95,99,1,99,6,103,2,103,9,107,2,107,10,111,1,5,111,115,1,115,6,119,2,6,119,123,1,10,123,127,1,127,5,131,1,131,2,135,1,135,5,0,99,2,0,14,0];

function findInputsByOutput(output) {
  for (let a = 0; a <= 99; a++) {
    for (let b = 0; b <= 99; b++) {
      
      let currentOutput = computer(intcode.slice(0), 0, [a, b])[0];
      if (currentOutput === output) {
        return [a, b];
      }
    } 
  }
}

const result = findInputsByOutput(19690720);
console.log(100 * result[0] + result[1]);