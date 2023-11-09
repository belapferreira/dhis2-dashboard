import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { options, DashboardItemTypes } from '@/constants';

import { Dashboard } from '@/hooks/queries/useGetDashboards';
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
  dashboards: Dashboard[];
  selectedOptions: DashboardItemTypes[];
  dashboardItems: DashboardItems | undefined;
  handleChangeStarred: (params: Dashboard) => void;
  handleChangeSelectedOptions: (value: Value) => void;
  handleDashboardActiveChange: (value: string) => void;
};

export const INITIAL_OPTIONS_VALUE = options[0].value;
export const DASHBOARDS_STARRED_KEY = '@Dhis2:recordStarredDashboards';

const DashboardsContext = createContext({} as ContextProps);

export const DashboardsProvider = ({ children }: ProviderProps) => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [dashboardActive, setDashboardActive] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState([
    INITIAL_OPTIONS_VALUE,
  ]);

  const { data: dashboardsResponse } = useGetDashboards();

  const { data: dashboardItems, isLoading: isLoadingItems } =
    useGetDashboardItemsById(dashboardActive as string, {
      enabled: !!dashboardActive,
    });

  const dashboardsData = dashboardsResponse?.dashboards;

  const firstDashboardId = dashboardsData && dashboardsData[0]?.id;

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

  const handleGetDashboardsStored = useCallback(() => {
    const storedDashboardsStarred = localStorage.getItem(
      DASHBOARDS_STARRED_KEY,
    );

    if (!storedDashboardsStarred) {
      return;
    }

    const storedDashboardsParsed: Dashboard[] = JSON.parse(
      storedDashboardsStarred,
    );

    return storedDashboardsParsed;
  }, []);

  const handleChangeStarred = useCallback(
    (params: Dashboard) => {
      const { id, displayName, starred } = params;

      const storedDashboardsData = handleGetDashboardsStored();

      const dashboardsFiltered = dashboards?.filter(
        (dashboard) => dashboard.id !== id,
      );

      if (storedDashboardsData) {
        const storedDashboardsFitlered = storedDashboardsData?.filter(
          (dashboard) => dashboard.id !== id,
        );

        const dashboardsUpdated = [
          ...storedDashboardsFitlered,
          { id, displayName, starred },
        ];

        localStorage.setItem(
          DASHBOARDS_STARRED_KEY,
          JSON.stringify(dashboardsUpdated),
        );
      } else {
        localStorage.setItem(
          DASHBOARDS_STARRED_KEY,
          JSON.stringify([{ id, displayName, starred }]),
        );
      }

      setDashboards([...dashboardsFiltered, { id, displayName, starred }]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleGetDashboardsStored],
  );

  useEffect(() => {
    if (firstDashboardId) {
      setDashboardActive(firstDashboardId);
    }
  }, [firstDashboardId]);

  useEffect(() => {
    const storedDashboardsData = handleGetDashboardsStored();

    if (!storedDashboardsData && !dashboards.length) {
      setDashboards(dashboardsData || []);
      return;
    }

    const updatedDashboardsData = dashboardsData?.map((dashboard) => {
      const starredStatusStored = storedDashboardsData?.find(
        (storedDashboard) => storedDashboard?.id === dashboard?.id,
      );

      if (!starredStatusStored) {
        return dashboard;
      }

      return starredStatusStored;
    });

    setDashboards(updatedDashboardsData as Dashboard[]);
  }, [
    dashboardsResponse,
    setDashboards,
    handleChangeStarred,
    handleGetDashboardsStored,
    dashboards?.length,
    dashboardsData,
  ]);

  return (
    <DashboardsContext.Provider
      value={{
        dashboards,
        dashboardItems,
        isLoadingItems,
        dashboardActive,
        selectedOptions,
        handleChangeStarred,
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
