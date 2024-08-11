import { describe, it, expect } from 'vitest';
import { generatePages } from './generate-pages';

describe('generatePages', () => {
  it('should generate pages correctly when page is in the middle', () => {
    expect(generatePages(3, 10)).toEqual([2, 3, 4]);
  });

  it('should generate pages correctly when page is at the start', () => {
    expect(generatePages(1, 10)).toEqual([1, 2, 3]);
  });

  it('should generate pages correctly when page is at the end', () => {
    expect(generatePages(10, 10)).toEqual([8, 9, 10]);
  });

  it('should generate pages correctly when length is less than PAGINATION_LIMIT', () => {
    expect(generatePages(1, 1)).toEqual([1]);
  });

  it('should generate pages correctly when length is equal to PAGINATION_LIMIT', () => {
    expect(generatePages(1, 2)).toEqual([1, 2]);
  });

  it('should generate pages correctly when length is greater than PAGINATION_LIMIT but less than 2 * PAGINATION_OFFSET + 1', () => {
    expect(generatePages(2, 3)).toEqual([1, 2, 3]);
  });
});
