export type DashboardItemTypes =
  | 'ALL_TYPES'
  | 'VISUALIZATION'
  | 'MAP'
  | 'TEXT'
  | 'MESSAGES';

interface Option {
  value: DashboardItemTypes;
  label: string;
}

export const options: Option[] = [
  {
    value: 'ALL_TYPES',
    label: 'All types',
  },
  {
    value: 'VISUALIZATION',
    label: 'Visulization',
  },
  {
    value: 'MAP',
    label: 'Map',
  },
  {
    value: 'TEXT',
    label: 'Text',
  },
  {
    value: 'MESSAGES',
    label: 'Messages',
  },
];
