import { ComponentProps, ComponentRef, forwardRef } from 'react';
import * as Accordion from '@radix-ui/react-accordion';

import { Card } from '@dhis2/ui';

type AccordionItemProps = ComponentProps<typeof Accordion.Item>;

export const AccordionItem = forwardRef<
  ComponentRef<typeof Accordion.Item>,
  AccordionItemProps
>((props, forwardedRef) => {
  const { children, ...rest } = props;

  return (
    <Accordion.Item
      {...rest}
      ref={forwardedRef}
      className="mb-4 data-[state=open]:rounded data-[state=open]:border-2 data-[state=open]:border-app-blue-500"
    >
      <Card className="p-5">{children}</Card>
    </Accordion.Item>
  );
});

AccordionItem.displayName = 'AccordionItem';
