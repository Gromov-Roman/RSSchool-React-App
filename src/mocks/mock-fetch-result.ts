import { getResultMock } from '@mocks/result.mock';

export const resultMock = getResultMock(1);

export const pagingResultsMock = {
  results: [resultMock],
  info: { pages: 2 },
};

export const emptyPagingResultsMock = {
  results: [],
  info: { pages: 0 },
};
