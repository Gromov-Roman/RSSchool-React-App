import { ParsedUrlQuery } from 'node:querystring';
import { PagingResults, Result } from '@models/result.model';
import { MainPageProps } from '@pages/Main/Main.page';

export const fetchData = async (query: ParsedUrlQuery): Promise<MainPageProps> => {
  const { page, searchQuery, detail } = query;

  const queryParams = new URLSearchParams();
  if (page) {
    queryParams.set('page', String(page));
  }
  if (searchQuery) {
    queryParams.set('name', String(searchQuery));
  }

  let queryParamsString = '';
  if (page || searchQuery) {
    queryParamsString = `?${queryParams}`;
  }

  const resultsResponse = await fetch(`https://rickandmortyapi.com/api/character${queryParamsString}`);
  const results: PagingResults = await resultsResponse.json();

  let detailResponse: Response | null = null;
  let result: Result | null = null;

  if (detail) {
    const id = String(detail || '');
    detailResponse = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    result = await detailResponse.json();
  }

  return {
    initialData: { results, detail: result },
    isFetching: { results: !resultsResponse.ok, detail: !detailResponse?.ok },
  };
};
