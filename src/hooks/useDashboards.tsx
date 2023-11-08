import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { options, DashboardItemTypes } from '@/constants';

import { Dashboards } from '@/hooks/queries/useGetDashboards';
import { DashboardItems } from '@/hooks/queries/useGetDashboardItemsById';

import { useGetDashboards } from '@/hooks/queries/useGetDashboards';
import { useGetDashboardItemsById } from '@/hooks/queries/useGetDashboardItemsById';

interface Value {
  selected: DashboardItemTypes[];
}

type ProviderProps = { children: ReactNode };

type ContextProps = {
  isLoadingItems: boolean;
  dashboardActive: string;
  selectedOptions: DashboardItemTypes[];
  dashboardsData: Dashboards | undefined;
  dashboardItems: DashboardItems | undefined;
  handleChangeSelectedOptions: (value: Value) => void;
  handleDashboardActiveChange: (value: string) => void;
};

export const INITIAL_OPTIONS_VALUE = options[0].value;

const DashboardsContext = createContext({} as ContextProps);

export const DashboardsProvider = ({ children }: ProviderProps) => {
  const [dashboardActive, setDashboardActive] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState([
    INITIAL_OPTIONS_VALUE,
  ]);

  const { data: dashboardsData } = useGetDashboards();

  const { data: dashboardItems, isLoading: isLoadingItems } =
    useGetDashboardItemsById(dashboardActive as string, {
      enabled: !!dashboardActive,
    });

  const dashboards = dashboardsData?.dashboards;

  const firstDashboardId = dashboards && dashboards[0]?.id;

  const handleDashboardActiveChange = useCallback((value: string) => {
    setDashboardActive(value);
  }, []);

  const handleChangeSelectedOptions = useCallback((value: Value) => {
    const values = value?.selected;

    const hasMoreThanOneOption = values?.length > 1;
    const isFirstSelectionAllTypes = values[0] === INITIAL_OPTIONS_VALUE;

    const isOnlyAllTypesSelected =
      !hasMoreThanOneOption && isFirstSelectionAllTypes;

    const isAllTypesSelected =
      hasMoreThanOneOption &&
      !isFirstSelectionAllTypes &&
      values?.some((option) => option === INITIAL_OPTIONS_VALUE);

    if (
      values.length === 0 ||
      values.length >= 4 ||
      isAllTypesSelected ||
      isOnlyAllTypesSelected
    ) {
      setSelectedOptions([INITIAL_OPTIONS_VALUE]);
    } else {
      const optionsSelected = values.filter(
        (option) => option !== INITIAL_OPTIONS_VALUE,
      );

      setSelectedOptions(optionsSelected);
    }
  }, []);

  useEffect(() => {
    if (firstDashboardId) {
      setDashboardActive(firstDashboardId);
    }
  }, [firstDashboardId]);

  return (
    <DashboardsContext.Provider
      value={{
        dashboardActive,
        dashboardsData,
        dashboardItems,
        isLoadingItems,
        selectedOptions,
        handleDashboardActiveChange,
        handleChangeSelectedOptions,
      }}
    >
      {children}
    </DashboardsContext.Provider>
  );
};

export function useDashboards() {
  const context = useContext(DashboardsContext);

  if (!context) {
    throw new Error('useDashabord must be used within a DashboardsProvider');
  }

  return context;
}
