import { ComponentProps, ComponentRef, forwardRef } from 'react';
import * as Accordion from '@radix-ui/react-accordion';

import {
  Box,
  IconChevronDown24,
  IconStar24,
  IconStarFilled24,
} from '@dhis2/ui';

import { Dashboard } from '@/hooks/queries/useGetDashboards';
import { useDashboards } from '@/hooks/useDashboards';

type AccordionTriggerProps = ComponentProps<typeof Accordion.Trigger> &
  Dashboard;

export const AccordionTrigger = forwardRef<
  ComponentRef<typeof Accordion.Trigger>,
  AccordionTriggerProps
>((props, forwardedRef) => {
  const { id, displayName, starred, children, ...rest } = props;

  const { handleChangeStarred } = useDashboards();

  return (
    <Accordion.Trigger
      {...rest}
      ref={forwardedRef}
      className="group flex w-full"
    >
      <Box className="flex w-full justify-between text-app-grey-900">
        {children}

        <Box className="flex gap-4">
          <button
            className="h-fit"
            onClick={() =>
              handleChangeStarred({
                id,
                displayName,
                starred: !starred,
              })
            }
          >
            {starred ? (
              <IconStarFilled24 color="#ffa902" />
            ) : (
              <IconStar24 color="#404B5A" />
            )}
          </button>

          <Box className="self-start transition-transform duration-500 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180">
            <IconChevronDown24 color="#404B5A" />
          </Box>
        </Box>
      </Box>
    </Accordion.Trigger>
  );
});

AccordionTrigger.displayName = 'AccordionTrigger';
