import { ComponentProps, ComponentRef, forwardRef } from 'react';
import * as Accordion from '@radix-ui/react-accordion';

type AccordionContentProps = ComponentProps<typeof Accordion.Content>;

export const AccordionContent = forwardRef<
  ComponentRef<typeof Accordion.Content>,
  AccordionContentProps
>((props, forwardedRef) => {
  const { children, ...rest } = props;

  return (
    <Accordion.Content {...rest} ref={forwardedRef}>
      {children}
    </Accordion.Content>
  );
});

AccordionContent.displayName = 'AccordionContent';
