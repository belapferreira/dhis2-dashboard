import { useEffect, useState } from 'react';
import * as AccordionRadix from '@radix-ui/react-accordion';

import { useDashboards } from '@/hooks/useDashboards';

import { Loader } from '@/app/components/Loader';
import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';
import { AccordionContent } from './AccordionContent';

export const Accordion = () => {
  const { dashboards, dashboardActive, handleDashboardActiveChange } =
    useDashboards();

  if (!dashboards?.length) {
    return <Loader />;
  }

  return (
    <AccordionRadix.Root
      type="single"
      value={dashboardActive}
      className="mt-6 flex w-full flex-col"
      onValueChange={handleDashboardActiveChange}
    >
      {dashboards?.map(({ id, displayName, starred }) => (
        <AccordionItem key={id} value={id}>
          <AccordionTrigger id={id} displayName={displayName} starred={starred}>
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
