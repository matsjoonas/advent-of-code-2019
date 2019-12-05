// exclude obviously impossible inputs
// e.g. numbers starting with 3 can't contain numbers lower than 3
// e.g. numbers starting with 4 can't containt numbers lower than 4 and so on
// this means that for example, numbers between 399999 - 444 444 (start and end excluded) don't match.
// if our starting range is 356261-846303, then our possible values can only be between the following limits (inclusive)
const input = [356666, 799999];
const length = 6;

const passwordCandidates = [];

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substr(0, index) + chr + str.substr(index + 1);
}

let iStr,
  index0;

for (let i = input[0]; i <= input[1]; i++) {
  iStr = '' + i;
  index0 = iStr.indexOf(0);
  nrOfDigitsToSwitch = length - index0; 

  if (index0 > -1) {
    let digit = iStr[index0 - 1];
    iStr = iStr.substring(0, index0);
    for (let k = 0; k < nrOfDigitsToSwitch; k++) {
      iStr += digit;
    }
  }

  // check if two consecutive digits are the samec
  for (let j = 0; j < length; j++) {
    if (iStr[j] === iStr[j + 1]) {
      passwordCandidates.push(iStr);
      break;
    }
  }

  i = +iStr;
}

console.log(passwordCandidates.length);