import { API_URL } from '@constants/api.const';
import { Result } from '@models/result.model';

export interface ResultsLoaderData {
  results: Result[];
}

export async function resultsLoader({ request }: { request: Request }): Promise<ResultsLoaderData> {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || '';
  const page = searchParams.get('page') || '';

  const requestUrl = new URL(API_URL);
  requestUrl.search = new URLSearchParams({ name, page }).toString();

  const response = await fetch(requestUrl);
  const data = await response.json();

  return { results: data.results || [] };
}
