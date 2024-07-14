import { API_URL } from '@constants/api.const';
import { Result } from '@models/result.model';

export interface DetailLoaderData {
  detail: Result | null;
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
