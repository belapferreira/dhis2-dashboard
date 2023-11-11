import api from '@/services/api';

import { useQuery } from '@tanstack/react-query';

export interface Dashboard {
  id: string;
  displayName: string;
  starred: boolean;
}

export interface Dashboards {
  dashboards: Dashboard[];
}

export const getDashboards = async (): Promise<Dashboards> => {
  const response = await api.get('/dashboards.json');

  return response.data;
};

export const useGetDashboards = () => {
  return useQuery(['dashboards'], () => getDashboards());
};
