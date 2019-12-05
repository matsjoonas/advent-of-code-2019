const fs = require('fs');

/*
* opcodes:
* 01 - input1, input2, ouput
* 02 - input1, input2, output
* 03 - 
*/

const INPUT = 1;
const OUTPUTS = [];

function getModesAndOpcode(value) {
  let opcode,
    mode = [0, 0, 0];

  const valueStr = '' + value;

  if (valueStr.length <= 2) {
    opcode = value;
  } else if (valueStr.length === 3) {
    opcode = parseInt(valueStr.substring(2, 3));
    mode[0] = parseInt(valueStr.charAt(0));
  } else {
    opcode = parseInt(valueStr.substring(3, 4));
    mode[0] = parseInt(valueStr.charAt(1));
    mode[1] = parseInt(valueStr.charAt(0));
  }

  return {
    opcode,
    mode,
  }
}

function getInput1(mode, value, intcode) {
  if (mode[0] === 0) {
    return intcode[value];
  } else {
    return value;
  }
}

function getInput2(mode, value, intcode) {
  if (mode[1] === 0) {
    return intcode[value];
  } else {
    return value;
  }
}


function executeInstruction(intcode, pointer) {
  let nrOfValues;

  const { mode, opcode } = getModesAndOpcode(intcode[pointer]);

  if (opcode === 99) {
    return 'halt';
  }

  const param1 = getInput1(mode, intcode[pointer + 1], intcode);
  const param2 =  getInput2(mode, intcode[pointer + 2], intcode);

  if (opcode === 1) {
    intcode[intcode[pointer + 3]] = param1 + param2;
    nrOfValues = 4;
  } else if (opcode === 2) {
    intcode[intcode[pointer + 3]] = param1 * param2;
    nrOfValues = 4;
  } else if (opcode === 3) {
    intcode[intcode[pointer + 1]] = INPUT;
    nrOfValues = 2;
  } else if (opcode === 4) {
    nrOfValues = 2;
    OUTPUTS.push(intcode[intcode[pointer + 1]]);
  }

  return nrOfValues;
}

fs.readFile('./input.txt', (e, data) => {
  const intcode = data.toString()
    .split(',')
    .map(value => parseInt(value));

  let nrOfValues;

  for (let i = 0; i < intcode.length; i++) {
    if (nrOfValues === 'halt') {
      break;
    }
    nrOfValues = executeInstruction(intcode, i)
    i += (nrOfValues - 1);
  }

  console.log(OUTPUTS);
});


