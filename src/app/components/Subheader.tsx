import Select from 'react-select';

import { options } from '@/constants';
import { useDashboards } from '@/hooks/useDashboards';

export const Subheader = () => {
  const { selectedOptions, handleChangeSelectedOptions } = useDashboards();

  return (
    <div className="flex w-full flex-col justify-between gap-4 py-3 md:flex-row md:items-center">
      <h2 className="text-lg font-bold text-app-grey-900">Dashboards</h2>

      <div className="w-full md:w-fit md:min-w-max">
        <Select
          isMulti
          options={options}
          closeMenuOnSelect={false}
          placeholder="Select any type"
          value={selectedOptions}
          onChange={handleChangeSelectedOptions}
        />
      </div>
    </div>
  );
};
