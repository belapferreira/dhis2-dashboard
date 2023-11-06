'use client';

import { useGetDashboards } from '@/hooks/queries/useGetDashboards';

import { Subheader } from './components/Subheader';
import { Accordion } from './components/Accordion';

import { Box, Divider } from '@dhis2/ui';

const Home = () => {
  const { data: dashboardData } = useGetDashboards();

  return (
    <main className="mt-6 flex w-full justify-center">
      <Box className="flex h-full w-full max-w-screen-lg flex-col items-center justify-between py-3">
        <Subheader />

        <Divider />

        <Accordion dashboards={dashboardData?.dashboards} />
      </Box>
    </main>
  );
};

export default Home;
