
//OPTIMIZED
const saltedSha256 = require('salted-sha256');

const salt = 'moab';
const saltedSha256Code = '15e774455e8ac400d3dd7837699314e63c2363ec5d520a1e9d631a831a441e36';
//brute force upto n= 6
function* generateCombinations(length, prefix = '') {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  if (length === 0) {
    yield prefix;
  } else {
    for (let i = 0; i < alphabet.length; i++) {
      yield* generateCombinations(length - 1, prefix + alphabet[i]);
    }
  }
}

function decrypt(saltStr, saltedSha256CodeStr) {
  for (let combination of generateCombinations(6)) {
    if (saltedSha256(combination, saltStr) === saltedSha256CodeStr) {
      return combination;
    }
  }

  return null;
}

console.log('password script', decrypt(salt, saltedSha256Code)); // 'teapot'


/**
 * 
 
// NOT OPTIMAL - running out of memory 
const saltedSha256 = require('salted-sha256');

const salt = 'moab';
const saltedSha256Code = '15e774455e8ac400d3dd7837699314e63c2363ec5d520a1e9d631a831a441e36';

function generateCombinations(length) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const combinations = [];

  for (let i = 0; i < alphabet.length; i++) {
    const currentLetter = alphabet[i];
    const remainingLetters = alphabet.slice(i + 1);

    if (length === 1) {
      combinations.push(currentLetter);
    } else {
      const subCombinations = generateCombinations(length - 1);

      for (let j = 0; j < subCombinations.length; j++) {
        combinations.push(currentLetter + subCombinations[j]);
      }
    }
  }

  return combinations;
}

const allCombinations = generateCombinations(6);

const decrypt = function( salty, saltedSha256Codey) {
  allCombinations.forEach(element => {
// console.log(`element`, element);
// console.log(`saled`, saltedSha256(element, salty));

    if (saltedSha256(element, salty) === saltedSha256Codey )
    return element;
  else {
    return [];
  }
  });

}

console.log('salty', decrypt( salt, saltedSha256Code)  );
*/