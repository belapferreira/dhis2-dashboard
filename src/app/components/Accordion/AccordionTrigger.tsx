import {
  ComponentProps,
  ComponentRef,
  forwardRef,
  useCallback,
  useState,
  MouseEvent,
} from 'react';
import * as Accordion from '@radix-ui/react-accordion';

import {
  StarRounded,
  ExpandMoreRounded,
  StarOutlineRounded,
} from '@mui/icons-material';

import { Dashboard } from '@/hooks/queries/useGetDashboards';
import { useDashboards } from '@/hooks/useDashboards';

type AccordionTriggerProps = ComponentProps<typeof Accordion.Trigger> &
  Dashboard;

export const AccordionTrigger = forwardRef<
  ComponentRef<typeof Accordion.Trigger>,
  AccordionTriggerProps
>((props, forwardedRef) => {
  const { id, displayName, children, starred: starredProp, ...rest } = props;

  const [starred, setStarred] = useState(starredProp);

  const { handleChangeStarred } = useDashboards();

  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      handleChangeStarred({
        id,
        displayName,
        starred: !starred,
      });

      setStarred((previous) => !previous);
    },
    [displayName, handleChangeStarred, id, starred],
  );

  return (
    <Accordion.Trigger
      {...rest}
      ref={forwardedRef}
      className="group flex w-full"
    >
      <div className="flex w-full justify-between text-app-grey-900">
        {children}

        <div className="flex gap-4">
          <div className="h-fit" onClick={handleClick}>
            {starred ? (
              <StarRounded sx={{ color: '#ffa902' }} />
            ) : (
              <StarOutlineRounded sx={{ color: '#404B5A' }} />
            )}
          </div>

          <div className="self-start transition-transform duration-500 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180">
            <ExpandMoreRounded sx={{ color: '#404B5A' }} />
          </div>
        </div>
      </div>
    </Accordion.Trigger>
  );
});

AccordionTrigger.displayName = 'AccordionTrigger';
