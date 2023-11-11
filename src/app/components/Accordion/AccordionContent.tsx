import { ComponentProps, ComponentRef, forwardRef, useMemo } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import Markdown from 'react-markdown';

import {
  Divider,
  IconWorld16,
  IconTextBox16,
  IconMessages16,
  IconVisualizationPie16,
  IconVisualizationLine16,
  IconVisualizationGauge16,
  IconVisualizationColumn16,
  IconVisualizationLineMulti16,
  IconVisualizationPivotTable16,
  IconVisualizationBarStacked16,
} from '@dhis2/ui';

import { useDashboards, INITIAL_OPTIONS_VALUE } from '@/hooks/useDashboards';

import { Loader } from '@/app/components/Loader';

import {
  Divider,
  IconWorld16,
  IconTextBox16,
  IconMessages16,
  IconVisualizationPie16,
  IconVisualizationLine16,
  IconVisualizationGauge16,
  IconVisualizationColumn16,
  IconVisualizationLineMulti16,
  IconVisualizationPivotTable16,
  IconVisualizationBarStacked16,
} from '@dhis2/ui';

import { DashboardItems } from '@/hooks/queries/useGetDashboardItemsById';

import { Loader } from '@/app/components/Loader';

type AccordionContentProps = ComponentProps<typeof Accordion.Content>;

const ICON = {
  MAP: IconWorld16,
  TEXT: IconTextBox16,
  MESSAGES: IconMessages16,
  PIE: IconVisualizationPie16,
  LINE: IconVisualizationLine16,
  GAUGE: IconVisualizationGauge16,
  COLUMN: IconVisualizationColumn16,
  PIVOT_TABLE: IconVisualizationPivotTable16,
  STACKED_COLUMN: IconVisualizationBarStacked16,
  YEAR_OVER_YEAR_LINE: IconVisualizationLineMulti16,
};

type Icons =
  | 'PIE'
  | 'LINE'
  | 'GAUGE'
  | 'COLUMN'
  | 'PIVOT_TABLE'
  | 'STACKED_COLUMN'
  | 'YEAR_OVER_YEAR_LINE';

const ICON = {
  MAP: IconWorld16,
  TEXT: IconTextBox16,
  MESSAGES: IconMessages16,
  PIE: IconVisualizationPie16,
  LINE: IconVisualizationLine16,
  GAUGE: IconVisualizationGauge16,
  COLUMN: IconVisualizationColumn16,
  PIVOT_TABLE: IconVisualizationPivotTable16,
  STACKED_COLUMN: IconVisualizationBarStacked16,
  YEAR_OVER_YEAR_LINE: IconVisualizationLineMulti16,
};

type Icons =
  | 'PIE'
  | 'LINE'
  | 'GAUGE'
  | 'COLUMN'
  | 'PIVOT_TABLE'
  | 'STACKED_COLUMN'
  | 'YEAR_OVER_YEAR_LINE';

export const AccordionContent = forwardRef<
  ComponentRef<typeof Accordion.Content>,
  AccordionContentProps
>((props, forwardedRef) => {
  const {
    dashboardItems: data,
    isLoadingItems,
    selectedOptions,
  } = useDashboards();

  const isAllTypesSelected = selectedOptions?.find(
    (option) => option === INITIAL_OPTIONS_VALUE,
  );

  const items = useMemo(() => {
    if (!!data) {
      const dataNormalized = data.dashboardItems?.map((item) => {
        const type = item?.type;

        switch (type) {
          case 'VISUALIZATION':
            return {
              id: item.id,
              text: item?.visualization?.name,
              icon: ICON[item?.visualization?.type as Icons],
              type,
            };

          case 'MAP':
            return {
              id: item.id,
              text: item?.map?.name,
              icon: ICON[type],
              type,
            };

          case 'TEXT':
            return {
              id: item.id,
              text: item.text,
              icon: ICON[type],
              type,
            };

          case 'MESSAGES': {
            return {
              id: item.id,
              text: 'Messages',
              icon: ICON[type],
              type,
            };
          }
        }
      });

      return dataNormalized;
    }
  }, [data]);

  const itemsFiltered = useMemo(() => {
    if (isAllTypesSelected) {
      return items;
    } else {
      return items?.filter(
        (item) => selectedOptions?.some((option) => option === item?.type),
      );
    }
  }, [isAllTypesSelected, items, selectedOptions]);

  if (isLoadingItems) {
    return <Loader />;
  }

  return (
    <Accordion.Content {...props} ref={forwardedRef}>
      {itemsFiltered?.map((item) => {
        const Icon = item?.icon;

        return (
          <>
            <div
              key={item?.id}
              className="text-app-grey-800 flex items-center gap-4"
            >
              <div>{<Icon />}</div>

              <Markdown className="flex flex-col gap-2 text-app-grey-900">
                {item?.text}
              </Markdown>
            </div>

            <Divider />
          </>
        );
      })}
    </Accordion.Content>
  );
});

AccordionContent.displayName = 'AccordionContent';
