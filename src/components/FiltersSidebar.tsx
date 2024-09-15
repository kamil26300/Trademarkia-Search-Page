import React, { useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { capitalizeFirst, status_color } from "../assets/helpers";

interface FiltersSidebarProps {
  updateParams: (key: string, value: any) => void;
  currentParams: any;
  aggregations: any;
}

const key_to_param: { [key: string]: string } = {
  class_codes: "classes",
  country: "counties",
  current_owners: "owners",
};

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  updateParams,
  currentParams,
  aggregations,
}) => {
  const onCheckboxChange = (e: any, filter: string, key: string) => {
    const values = currentParams[key];
    const updatedfilter = Array.isArray(values)
      ? values.includes(filter)
        ? values.filter((s: string) => s !== filter)
        : [...values, filter]
      : [filter];

    updateParams(key, updatedfilter);
  };

  delete aggregations?.office_actions;

  return (
    <div>
      <div className="top-4 right-4 sticky space-y-6">
        <ButtonFilter
          param={currentParams.status}
          onChange={onCheckboxChange}
          filterKeys={["all", "registered", "pending", "abandoned", "other"]}
          title="Status"
          key_item="status"
        />
        {aggregations && (
          <MultipleFilterHead
            aggregations={aggregations}
            currentParams={currentParams}
            onCheckboxChange={onCheckboxChange}
          />
        )}
      </div>
    </div>
  );
};

const MultipleFilterHead = ({
  aggregations,
  currentParams,
  onCheckboxChange,
}: {
  aggregations: any;
  onCheckboxChange: Function;
  currentParams: any;
}) => {
  const [selectedFilterHead, setSelectedFilterHead] = useState<string | null>(
    Object.keys(aggregations)[0] || ""
  );
  const selectedFilterData = selectedFilterHead
    ? aggregations[selectedFilterHead]
    : null;

  const handleFilterChange = (filter_key: string) => {
    setSelectedFilterHead(filter_key);
  };

  return (
    <div className="flex gap-4 flex-col p-4 h-[400px] bg-white rounded-xl text-nowrap">
      <div className="flex gap-2 justify-between flex-wrap border-b-2 pb-2 border-black">
        {Object.entries(aggregations).map(([key, value]) => {
          return (
            <button
              key={key}
              className={`font-semibold border-b ${
                selectedFilterHead === key
                  ? "border-cyan-400 text-cyan-400"
                  : "border-transparent"
              }`}
              onClick={() => handleFilterChange(key)}
            >
              {capitalizeFirst(key)}
            </button>
          );
        })}
      </div>

      {selectedFilterHead && (
        <MultipleFilters
          filterKeys={selectedFilterData}
          param={
            currentParams[
              key_to_param[selectedFilterHead] || selectedFilterHead
            ]
          }
          onChange={onCheckboxChange}
          key_item={key_to_param[selectedFilterHead] || selectedFilterHead}
        />
      )}
    </div>
  );
};

const MultipleFilters = ({
  filterKeys,
  param,
  onChange,
  key_item,
}: {
  filterKeys: any;
  param: any;
  onChange: Function;
  key_item: string;
}) => {
  const filterKeysArray = filterKeys?.buckets;

  return (
    <div className="pl-4 flex flex-col gap-4 overflow-y-auto">
      {filterKeysArray?.map((filter: any) => {
        const filter_key = filter.key;
        const checked = param?.includes(filter_key);

        return (
          <label
            key={filter_key}
            className="flex text-wrap items-center justify-start gap-1 cursor-pointer"
          >
            <span
              className={`h-3 w-3 border-2 border-white outline outline-1   cursor-pointer ${
                checked ? "bg-cyan-400 outline-cyan-400 " : "outline-black"
              }`}
            ></span>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => onChange(e, filter_key, key_item)}
              className="opacity-0 absolute cursor-pointer"
            />
            {capitalizeFirst(filter_key)} ({filter.doc_count})
          </label>
        );
      })}
    </div>
  );
};

const ButtonFilter = ({
  param,
  title,
  onChange,
  filterKeys,
  key_item,
}: {
  param: any;
  title: string;
  onChange: Function;
  filterKeys: any[];
  key_item: string;
}) => {
  return (
    <div className="flex gap-4 flex-col p-4 h-min bg-white rounded-xl text-nowrap">
      <h4>{title}</h4>
      <div className="flex flex-wrap gap-4 justify-between items-center">
        {filterKeys.map((filter) => (
          <label
            key={filter}
            className={`relative flex text-nowrap justify-center items-center gap-1 border border-black py-2 px-4 rounded-xl ${
              param?.includes(filter)
                ? "border-cyan-400 text-cyan-400"
                : "border-black"
            }`}
          >
            <input
              type="checkbox"
              checked={param?.includes(filter)}
              onChange={(e) => onChange(e, filter, key_item)}
              className="opacity-0 w-full h-full absolute cursor-pointer"
            />
            <FaDotCircle className={`${status_color[filter]}`} />
            {capitalizeFirst(filter)}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FiltersSidebar;
