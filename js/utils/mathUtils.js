export function getMinValue(arr) {
  return arr.reduce((min, val) => {
    if (min < val) return min;
    return val;
  });
}

export function getMaxValue(arr) {
  return arr.reduce((max, val) => {
    if (max > val) return max;
    return val;
  });
}
