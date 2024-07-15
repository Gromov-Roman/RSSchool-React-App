import { vi } from 'vitest';

export const mockFetchResult = (data: unknown) => {
  const response = {
    ok: true,
    status: 200,
    json: async () => Promise.resolve(data),
  } as Response;

  vi.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve(response));
};
