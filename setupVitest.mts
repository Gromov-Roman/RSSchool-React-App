import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';
import { emptyPagingResultsMock, pagingResultsMock, resultMock } from '@mocks/mock-fetch-result';
import { localStorageMock } from '@mocks/local-storage.mock';

const setSearchParamsMock = vi.fn();

vi.mock('@remix-run/react', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    actual,
    useLocation: () => vi.fn(),
    useNavigate: () => vi.fn(),
    useSearchParams: () => [
      {
        get: vi.fn((param) => {
          if (param === 'page') {
            return '1';
          }
          return null;
        }),
        delete: vi.fn(),
      },
      setSearchParamsMock,
    ],
  };
});

const fetchMocker = createFetchMock(vi);

fetchMocker.mockIf(/^https?:\/\/rickandmortyapi.com\/api\/character.*$/, (req: Request) => {
  if (req.url.endsWith('name=no-items')) {
    return JSON.stringify(emptyPagingResultsMock);
  }

  if (req.url.endsWith('character')) {
    return JSON.stringify(pagingResultsMock);
  }

  if (req.url.endsWith('/1')) {
    return JSON.stringify(resultMock);
  }

  return {
    status: 404,
    body: 'Not Found',
  };
});

fetchMocker.enableMocks();

Object.defineProperty(window, 'localStorage', { value: localStorageMock, });
Object.defineProperty(window, 'matchMedia', { value: () => true });
