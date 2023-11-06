import { ComponentProps, ComponentRef, forwardRef } from 'react';
import * as Accordion from '@radix-ui/react-accordion';

import { IconChevronDown24 } from '@dhis2/ui';

type AccordionTriggerProps = ComponentProps<typeof Accordion.Trigger>;

export const AccordionTrigger = forwardRef<
  ComponentRef<typeof Accordion.Trigger>,
  AccordionTriggerProps
>((props, forwardedRef) => {
  const { children, ...rest } = props;

  return (
    <Accordion.Trigger
      {...rest}
      ref={forwardedRef}
      className="group flex w-full"
    >
      <div className="flex w-full justify-between">
        {children}

        <div className="self-start transition-transform duration-500 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180">
          <IconChevronDown24 />
        </div>
      </div>
    </Accordion.Trigger>
  );
});

AccordionTrigger.displayName = 'AccordionTrigger';
