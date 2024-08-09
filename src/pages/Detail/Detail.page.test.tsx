// import { describe, it, expect, afterEach, beforeEach } from 'vitest';
// import { cleanup, fireEvent, screen } from '@testing-library/react';
// import { getResultMock } from '@mocks/result.mock';
// import { renderWithProviders } from '@mocks/test-utils';
// import App from 'src/pages/App/App';
//
// const resultMock = getResultMock(1);
//
// describe('DetailPage', () => {
//   afterEach(cleanup);
//
//   beforeEach(async () => {
//     renderWithProviders(<App />);
//     await screen.findByTestId('result-card');
//     fireEvent.click(screen.getByTestId('result-card'));
//   });
//
//   it('displays a loading indicator while fetching data', async () => {
//     expect(screen.getByTestId('loader')).toBeDefined();
//   });
//
//   it('correctly displays the detailed card data', async () => {
//     await screen.findByTestId('detail');
//
//     expect(screen.getByTestId('detail__title-text').textContent).toBe(resultMock.name);
//     expect(screen.getByText(resultMock.status)).toBeDefined();
//     expect(screen.getByText(resultMock.gender)).toBeDefined();
//     expect(screen.getByText(resultMock.origin.name)).toBeDefined();
//     expect(screen.getByText(resultMock.location.name)).toBeDefined();
//     expect(screen.getByTestId('detail__image').getAttribute('src')).toBe(resultMock.image);
//   });
//
//   it('hides the component when the close button is clicked', async () => {
//     await screen.findByTestId('detail');
//
//     fireEvent.click(screen.getByTestId('close-button'));
//
//     expect(!!screen.queryByTestId('detail')).toBeFalsy();
//   });
// });
