import MainPage, { MainPageProps } from '@pages/Main/Main.page';
import { GetServerSideProps } from 'next';
import { fetchData } from '@core/services/api';
import { Suspense } from 'react';
import LoaderComponent from '@components/Loader/Loader';
import cookie from 'cookie';

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = cookie.parse(context.req?.headers.cookie || '');

  if (context.query.searchQuery !== undefined) {
    context.res.setHeader(
      'Set-Cookie',
      cookie.serialize('searchQuery', JSON.stringify(context.query.searchQuery), {
        httpOnly: false,
        // eslint-disable-next-line no-magic-numbers
        maxAge: 60 * 60 * 24 * 7,
      }),
    );
  } else {
    context.query.searchQuery = cookies.searchQuery ? JSON.parse(cookies.searchQuery) : null;
  }

  const props = await fetchData(context.query);

  return { props };
};

function AppPage({ initialData, isFetching }: MainPageProps) {
  return (
    <Suspense fallback={<LoaderComponent />}>
      <MainPage initialData={initialData} isFetching={isFetching} />
    </Suspense>
  );
}

export default AppPage;
