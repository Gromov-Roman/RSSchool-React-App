import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import { getResultMock } from '@mocks/result.mock';
import { renderWithProviders } from '@mocks/test-utils';
import ResultCardComponent from './ResultCard';

describe('ResultCardComponent', () => {
  afterEach(cleanup);

  it('renders the relevant card data', () => {
    const resultMock = getResultMock();
    renderWithProviders(<ResultCardComponent result={resultMock} />);

    expect(screen.getByText(resultMock.name).textContent).toBe('Gaia');
    expect(screen.getByTestId('result-card__image')).toBeDefined();
  });
});
