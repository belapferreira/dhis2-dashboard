import * as AccordionRadix from '@radix-ui/react-accordion';
import { Divider } from '@dhis2/ui';

import { Dashboard } from '@/hooks/queries/useGetDashboards';

import { Loader } from '@/app/components/Loader';
import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';
import { AccordionContent } from './AccordionContent';

interface AccordionProps {
  dashboards: Dashboard[] | undefined;
}

const items = [
  {
    title: 'Antenatal Care',
    value: 'antenatal-care',
    details: [
      {
        description: 'Malaria cases reported to clinic',
        type: 'graph',
      },
      {
        description: 'This is a type text item',
        type: 'text',
      },
    ],
  },
  {
    title: 'Cases Malaria',
    value: 'cases-malaria',
    details: [
      {
        description: 'Malaria cases reported to clinic',
        type: 'graph',
      },
      {
        description: 'This is a type text item',
        type: 'text',
      },
    ],
  },
];

export const Accordion = ({ dashboards }: AccordionProps) => {
  if (!dashboards?.length) {
    return <Loader />;
  }

  return (
    <AccordionRadix.Root
      type="single"
      collapsible
      defaultValue={dashboards[0].id}
      className="mt-6 flex w-full flex-col"
    >
      {dashboards.map(({ id, displayName }) => (
        <AccordionItem key={id} value={id}>
          <AccordionTrigger>
            <h3 className="text-lg font-semibold group-data-[state=open]:mb-5">
              {displayName}
            </h3>
          </AccordionTrigger>
          <AccordionContent>
            {items[0].details.map((detail) => (
              <>
                <div key={detail.description}>{detail.description}</div>

                <Divider />
              </>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionRadix.Root>
  );
};
