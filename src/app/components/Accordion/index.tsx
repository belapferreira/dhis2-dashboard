import { useEffect, useState } from 'react';
import * as AccordionRadix from '@radix-ui/react-accordion';

import { Dashboard } from '@/hooks/queries/useGetDashboards';
import { useGetDashboardItemsById } from '@/hooks/queries/useGetDashboardItemsById';

import { Loader } from '@/app/components/Loader';
import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';
import { AccordionContent } from './AccordionContent';

interface AccordionProps {
  dashboards: Dashboard[] | undefined;
}

export const Accordion = ({ dashboards }: AccordionProps) => {
  const [dashboardActive, setDashboardActive] = useState<string>('');

  const firstDashboardId = dashboards && dashboards[0]?.id;

  const { data: dashboardItems, isLoading } = useGetDashboardItemsById(
    dashboardActive as string,
    {
      enabled: !!dashboardActive,
    },
  );

  useEffect(() => {
    if (firstDashboardId) {
      setDashboardActive(firstDashboardId);
    }
  }, [firstDashboardId]);

  if (!dashboards?.length) {
    return <Loader />;
  }

  return (
    <AccordionRadix.Root
      type="single"
      value={dashboardActive}
      className="mt-6 flex w-full flex-col"
      onValueChange={(value: string) => setDashboardActive(value)}
    >
      {dashboards.map(({ id, displayName }) => (
        <AccordionItem key={id} value={id}>
          <AccordionTrigger>
            <h3 className="text-lg font-semibold group-data-[state=open]:mb-5">
              {displayName}
            </h3>
          </AccordionTrigger>
          {dashboardActive === id && (
            <AccordionContent data={dashboardItems} isLoading={isLoading} />
          )}
        </AccordionItem>
      ))}
    </AccordionRadix.Root>
  );
};
