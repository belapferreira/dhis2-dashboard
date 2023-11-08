import { Box, MultiSelect, MultiSelectOption } from '@dhis2/ui';

import { options } from '@/constants';
import { useDashboards } from '@/hooks/useDashboards';

export const Subheader = () => {
  const { selectedOptions, handleChangeSelectedOptions } = useDashboards();

  return (
    <Box className="flex w-full flex-col justify-between gap-4 py-3 md:flex-row md:items-center">
      <h2 className="text-lg font-bold text-app-grey-900">Dashboards</h2>

      <div className="w-full md:w-fit md:min-w-max">
        <MultiSelect
          prefix="Filter items"
          selected={selectedOptions}
          onChange={handleChangeSelectedOptions}
        >
          {options?.map(({ value, label }) => (
            <MultiSelectOption key={value} value={value} label={label} />
          ))}
        </MultiSelect>
      </div>
    </Box>
  );
};
