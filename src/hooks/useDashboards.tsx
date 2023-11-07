import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Dashboards } from '@/hooks/queries/useGetDashboards';
import { DashboardItems } from '@/hooks/queries/useGetDashboardItemsById';

import { useGetDashboards } from '@/hooks/queries/useGetDashboards';
import { useGetDashboardItemsById } from '@/hooks/queries/useGetDashboardItemsById';

type ProviderProps = { children: ReactNode };

type ContextProps = {
  dashboardActive: string;
  dashboardsData: Dashboards | undefined;
  dashboardItems: DashboardItems | undefined;
  isLoadingItems: boolean;
  handleDashboardActiveChange: (value: string) => void;
};

const DashboardsContext = createContext({} as ContextProps);

export const DashboardsProvider = ({ children }: ProviderProps) => {
  const [dashboardActive, setDashboardActive] = useState<string>('');

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
        handleDashboardActiveChange,
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
