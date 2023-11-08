'use client';

import { DashboardsProvider } from '@/hooks/useDashboards';

import { Subheader } from './components/Subheader';
import { Accordion } from './components/Accordion';

import { Box, Divider } from '@dhis2/ui';

const Home = () => {
  return (
    <DashboardsProvider>
      <main className="mt-6 flex w-full justify-center px-6">
        <Box className="flex h-full w-full max-w-screen-lg flex-col items-center justify-between py-3">
          <Subheader />

          <Divider />

          <Accordion />
        </Box>
      </main>
    </DashboardsProvider>
  );
};

export default Home;
