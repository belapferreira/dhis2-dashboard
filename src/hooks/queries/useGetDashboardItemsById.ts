import api from '@/services/api';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export interface Access {
  manage: boolean;
  externalize: boolean;
  write: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

export interface DashboardItems {
  visualization?: {
    type: string;
    id: string;
    name: string;
  };
  map?: {
    id: string;
    name: string;
  };
  text?: string;
  users: Array<unknown>;
  shape?: string;
  x: number;
  y: number;
  type: string;
  id: string;
  reports: Array<unknown>;
  resources: Array<unknown>;
  h: number;
  w: number;
}

export interface DashboardItems {
  access: Access;
  restrictFilters: boolean;
  allowedFilters: Array<unknown>;
  displayName: string;
  id: string;
  dashboardItems: DashboardItems[];
  starred: boolean;
}

export const getDashboardItemsById = async (
  id: string,
): Promise<DashboardItems> => {
  const response = await api.get(`${id}.json`);

  return response.data;
};

export const useGetDashboardItemsById = (
  id: string,
  options?: UseQueryOptions<DashboardItems, unknown, DashboardItems, any[]>,
) => {
  return useQuery(
    ['dashboardItems', id],
    () => getDashboardItemsById(id),
    options,
  );
};
