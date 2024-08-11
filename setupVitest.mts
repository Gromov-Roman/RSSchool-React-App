import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';
import { emptyPagingResultsMock, pagingResultsMock, resultMock } from '@mocks/mock-fetch-result';
import { localStorageMock } from '@mocks/local-storage.mock';
const nextRouterMock = require('next-router-mock')

vi.mock('next/navigation', () => {
  const { useRouter } = nextRouterMock;

  const usePathname = () => {
    const router = useRouter()
    return router.pathname
  }

  const useSearchParams = () => {
    const router = useRouter()
    return new URLSearchParams(router.query)
  }

  return {
    useRouter,
    usePathname,
    useSearchParams
  }
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
