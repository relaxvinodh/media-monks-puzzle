import { swap, getMatrixPosition } from './helpers';

describe('validate helpers functions', () => {
  it('should swap array values', () => {
    const array = [1, 2, 3];
    const swappedArray = swap(array, 0, 1);
    expect(swappedArray).toStrictEqual([2, 1, 3]);
  });

  it('should return row/col pair of the index', () => {
    const { row, col } = getMatrixPosition(11);
    expect(row).toBe(2);
    expect(col).toBe(3);
  });
});
