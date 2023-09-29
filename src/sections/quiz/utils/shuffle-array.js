export const shuffleArray = (array) => {
  const _array = [...array];
  for (let i = _array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [_array[i], _array[j]] = [_array[j], _array[i]];
  }
  return _array;
};
