export type DashboardItemTypes =
  | 'ALL_TYPES'
  | 'VISUALIZATION'
  | 'MAP'
  | 'TEXT'
  | 'MESSAGES';

export interface Option {
  readonly value: DashboardItemTypes;
  readonly label: string;
}

export const options: Option[] = [
  {
    value: 'ALL_TYPES',
    label: 'All types',
  },
  {
    value: 'VISUALIZATION',
    label: 'Visualization',
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
