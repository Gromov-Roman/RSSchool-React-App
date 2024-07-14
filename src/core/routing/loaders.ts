import { API_URL } from '@constants/api.const';
import { PagingResults, Result } from '@models/result.model';

export interface ResultsLoaderData {
  pagingResults: PagingResults;
}

export interface DetailLoaderData {
  detail: Result | null;
}

export async function resultsLoader({ request }: { request: Request }): Promise<ResultsLoaderData> {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || '';
  const page = searchParams.get('page') || '';

  const requestUrl = new URL(API_URL);
  requestUrl.search = new URLSearchParams({ name, page }).toString();

  const response = await fetch(requestUrl);
  const pagingResults = await response.json();

  return { pagingResults };
}

export async function detailLoader({ request }: { request: Request }): Promise<DetailLoaderData> {
  const { searchParams } = new URL(request.url);
  const detail = searchParams.get('detail');

  if (!detail) {
    return { detail: null };
  }

  const requestUrl = new URL(`${API_URL}/${detail}`);
  const response = await fetch(requestUrl);
  const data = await response.json();

  return { detail: data };
}
