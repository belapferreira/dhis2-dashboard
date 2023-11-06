import { Box, MultiSelect, MultiSelectOption, Divider } from '@dhis2/ui';

const options = [
  { value: 'antenatal-care', label: 'Antenatal Care' },
  { value: 'cases-malaria', label: 'Cases Malaria' },
];

export const Subheader = () => {
  return (
    <Box className="flex w-full items-center justify-between py-3">
      <h2 className="text-lg font-bold text-app-grey-900">Dashboards</h2>

      <MultiSelect prefix="Filter items">
        {options.map(({ value, label }) => (
          <MultiSelectOption key={value} value={value} label={label} />
        ))}
      </MultiSelect>
    </Box>
  );
};
