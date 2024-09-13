import React from "react";

interface FiltersSidebarProps {
  updateParams: (key: string, value: any) => void;
  currentParams: any;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({ updateParams, currentParams }) => {
  return (
    <div className="w-64 p-4 bg-gray-100">
      <div className="mb-4">
        <h4>Status</h4>
        <div>
          {["All", "Registered", "Pending", "Abandoned"].map((status) => (
            <label key={status} className="block">
              <input
                type="checkbox"
                checked={currentParams.status?.includes(status)}
                onChange={(e) =>
                  updateParams("status", [...currentParams.status, status])
                }
              />
              {status}
            </label>
          ))}
        </div>
      </div>

      {/* Additional filters for owners, law firms, etc. */}
    </div>
  );
};

export default FiltersSidebar;
