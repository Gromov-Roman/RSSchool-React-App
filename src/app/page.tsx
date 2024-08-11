'use client';

import MainPage from '@src/app/Main/Main.page';
import { Suspense } from 'react';

function AppPage() {
  return (
    <Suspense>
      <MainPage />
    </Suspense>
  );
}

export default AppPage;
