import * as AccordionRadix from '@radix-ui/react-accordion';

import { useDashboards } from '@/hooks/useDashboards';

import { Loader } from '@/app/components/Loader';
import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';
import { AccordionContent } from './AccordionContent';

export const Accordion = () => {
  const { dashboardsData, dashboardActive, handleDashboardActiveChange } =
    useDashboards();

  const dashboards = dashboardsData?.dashboards;

  if (!dashboardsData?.dashboards?.length) {
    return <Loader />;
  }

  return (
    <AccordionRadix.Root
      type="single"
      value={dashboardActive}
      className="mt-6 flex w-full flex-col"
      onValueChange={handleDashboardActiveChange}
    >
      {dashboards?.map(({ id, displayName }) => (
        <AccordionItem key={id} value={id}>
          <AccordionTrigger>
            <h3 className="text-lg font-semibold group-data-[state=open]:mb-5">
              {displayName}
            </h3>
          </AccordionTrigger>
          {dashboardActive === id && <AccordionContent />}
        </AccordionItem>
      ))}
    </AccordionRadix.Root>
  );
};
