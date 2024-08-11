const PAGINATION_OFFSET = 1;
const PAGINATION_LIMIT = 2;

export const generatePages = (page: number, length: number): number[] => {
  const pages: number[] = [];

  let startPage = Math.max(1, page - PAGINATION_OFFSET);
  let endPage = Math.min(length, page + PAGINATION_OFFSET);

  if (endPage - startPage < PAGINATION_LIMIT) {
    if (startPage === 1) {
      endPage = Math.min(length, startPage + PAGINATION_LIMIT);
    } else if (endPage === length) {
      startPage = Math.max(1, endPage - PAGINATION_LIMIT);
    }
  }

  for (let i = startPage; i <= endPage; i += 1) {
    pages.push(i);
  }

  return pages;
};
