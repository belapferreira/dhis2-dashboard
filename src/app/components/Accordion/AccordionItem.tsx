import { ComponentProps, ComponentRef, forwardRef } from 'react';
import * as Accordion from '@radix-ui/react-accordion';

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
      <div className="rounded bg-pure-white p-5 shadow-app">{children}</div>
    </Accordion.Item>
  );
});

AccordionItem.displayName = 'AccordionItem';
