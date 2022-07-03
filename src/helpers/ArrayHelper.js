export default function equals(arrayA, arrayB) {
  // if the other array is a falsy value, return
  if (!arrayA || !arrayB) return false;

  // compare lengths - can save a lot of time
  if (arrayA.length != arrayB.length) return false;

  for (var i = 0, l = arrayA.length; i < l; i++) {
    // Check if we have nested arrays
    if (arrayA[i] instanceof Array && arrayB[i] instanceof Array) {
      // recurse into the nested arrays
      if (!arrayA[i].equals(arrayB[i])) return false;
    } else if (arrayA[i] != arrayB[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
}
