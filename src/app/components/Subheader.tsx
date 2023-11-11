import { useId } from 'react';
import Select from 'react-select';

import { options } from '@/constants';
import { useDashboards } from '@/hooks/useDashboards';

export const Subheader = () => {
  const { selectedOptions, handleChangeSelectedOptions } = useDashboards();

  return (
    <div className="flex w-full flex-col justify-between gap-4 py-3 md:flex-row md:items-center">
      <h2 className="text-lg font-bold text-app-grey-900">Dashboards</h2>

      <div className="w-full md:w-fit md:min-w-max">
        <form data-testid="type-selector">
          <label className="invisible flex h-0" htmlFor="type">
            Type
          </label>
          <Select
            isMulti
            name="type"
            inputId="type"
            options={options}
            instanceId={useId()}
            value={selectedOptions}
            closeMenuOnSelect={false}
            placeholder="Select any type"
            classNamePrefix="react-select"
            onChange={handleChangeSelectedOptions}
            classNames={{
              control: () => 'border border-app-grey-300',
              multiValue: () => 'bg-app-grey-200 rounded-2xl text-[13px]',
              multiValueLabel: () => 'text-app-grey-900',
            }}
          />
        </form>
      </div>
    </div>
  );
};
