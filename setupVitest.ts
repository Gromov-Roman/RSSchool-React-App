import { getResultMock } from '@mocks/result.mock.js';
import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';

const fetchMocker = createFetchMock(vi);

fetchMocker.mockIf(/^https?:\/\/rickandmortyapi.com\/api\/character.*$/, (req: Request) => {
  if (req.url.endsWith('character')) {
    return JSON.stringify({
      results: [getResultMock(1)],
      info: { pages: 1 },
    });
  } else if (req.url.endsWith('/1')) {
    return JSON.stringify(getResultMock(1));
  } else {
    return {
      status: 404,
      body: 'Not Found',
    };
  }
});

fetchMocker.enableMocks();
