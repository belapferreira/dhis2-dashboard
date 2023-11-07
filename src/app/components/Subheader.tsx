import { Box, MultiSelect, MultiSelectOption } from '@dhis2/ui';

import { useDashboards } from '@/hooks/useDashboards';

interface Option {
  value: string;
  label: string;
}

export const Subheader = () => {
  const { dashboardItems: data } = useDashboards();

  const options = data?.dashboardItems?.reduce<Option[]>((acc, curr) => {
    const currType = curr?.type;

    const currValueExists = acc?.find(({ label }) => label === currType);

    if (!currValueExists) {
      acc?.push({ value: currType, label: currType });
    }

    return acc;
  }, []);

  return (
    <Box className="flex w-full items-center justify-between py-3">
      <h2 className="text-lg font-bold text-app-grey-900">Dashboards</h2>

      <MultiSelect prefix="Filter items">
        {options?.map(({ value, label }) => (
          <MultiSelectOption key={value} value={value} label={label} />
        ))}
      </MultiSelect>
    </Box>
  );
};
