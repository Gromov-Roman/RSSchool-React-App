import MainPage, { MainPageProps } from '@pages/Main/Main.page';
import { GetServerSideProps } from 'next';
import { fetchData } from '@core/services/api';
import { Suspense } from 'react';
import LoaderComponent from '@components/Loader/Loader';
import cookie from 'cookie';

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = cookie.parse(context.req?.headers.cookie || '');
  context.query.searchQuery ??= JSON.parse(cookies.searchQuery);

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
