'use client';

import { DashboardsProvider } from '@/hooks/useDashboards';

import { Divider } from '@/app/components/Divider';
import { Subheader } from './components/Subheader';
import { Accordion } from './components/Accordion';

const Home = () => {
  return (
    <DashboardsProvider>
      <main className="mt-6 flex w-full justify-center px-6">
        <div className="flex h-full w-full max-w-screen-lg flex-col items-center justify-between py-3">
          <Subheader />

          <Divider />

          <Accordion />
        </div>
      </main>
    </DashboardsProvider>
  );
};

export default Home;
