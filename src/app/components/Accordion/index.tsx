import * as AccordionRadix from '@radix-ui/react-accordion';
import { Divider } from '@dhis2/ui';

import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';
import { AccordionContent } from './AccordionContent';

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

export const Accordion = () => {
  return (
    <AccordionRadix.Root
      type="single"
      collapsible
      className="mt-6 flex w-full flex-col"
    >
      {items.map(({ title, value, details }) => (
        <AccordionItem key={value} value={value}>
          <AccordionTrigger>
            <h3 className="text-lg font-semibold group-data-[state=open]:mb-5">
              {title}
            </h3>
          </AccordionTrigger>
          <AccordionContent>
            {details.map((detail) => (
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
