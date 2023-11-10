import { ComponentProps, ComponentRef, forwardRef, useMemo } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import Markdown from 'react-markdown';

import {
  PublicRounded,
  FontDownloadOutlined,
  ChatBubbleOutline,
  PieChartRounded,
  ShowChartRounded,
  SpeedRounded,
  BarChartOutlined,
  PivotTableChartOutlined,
  StackedBarChartOutlined,
  SsidChartRounded,
} from '@mui/icons-material';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { Divider } from '@/app/components/Divider';

import { useDashboards, INITIAL_OPTIONS_VALUE } from '@/hooks/useDashboards';

import { Loader } from '@/app/components/Loader';

type AccordionContentProps = ComponentProps<typeof Accordion.Content>;

const ICON = {
  MAP: PublicRounded,
  TEXT: FontDownloadOutlined,
  MESSAGES: ChatBubbleOutline,
  PIE: PieChartRounded,
  LINE: ShowChartRounded,
  GAUGE: SpeedRounded,
  COLUMN: BarChartOutlined,
  PIVOT_TABLE: PivotTableChartOutlined,
  STACKED_COLUMN: StackedBarChartOutlined,
  YEAR_OVER_YEAR_LINE: SsidChartRounded,
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
        (item) =>
          selectedOptions?.some((option) => option.value === item?.type),
      );
    }
  }, [isAllTypesSelected, items, selectedOptions]);

  if (isLoadingItems) {
    return <Loader />;
  }

  return (
    <Accordion.Content {...props} ref={forwardedRef}>
      {itemsFiltered?.length ? (
        itemsFiltered?.map((item) => {
          const Icon = item?.icon as OverridableComponent<
            SvgIconTypeMap<{}, 'svg'>
          >;

          return (
            <div key={item?.id}>
              <div className="flex items-center gap-4 text-app-grey-800">
                <div>{<Icon fontSize="small" />}</div>

                <Markdown className="flex flex-col gap-2 text-app-grey-900">
                  {item?.text}
                </Markdown>
              </div>

              <Divider />
            </div>
          );
        })
      ) : (
        <p className="flex w-full justify-center text-center text-app-grey-600">
          Theres no details to show. Please try selecting one or more different
          types in the filter.
        </p>
      )}
    </Accordion.Content>
  );
});

AccordionContent.displayName = 'AccordionContent';
