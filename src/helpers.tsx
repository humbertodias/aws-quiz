export const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const compareArrays = (a: Array<unknown>, b: Array<unknown>) =>
  a.length === b.length &&
  a.every((element: unknown, index: number) => element === b[index]);

export const randomBoolean = (): boolean => {
  return Math.random() < 0.5;
};


export const randomBooleanArray = (size: number): boolean[] => {
  return Array(size).fill(randomBoolean())
};