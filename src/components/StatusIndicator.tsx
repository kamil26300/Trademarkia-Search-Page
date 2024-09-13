import React from "react";

interface StatusIndicatorProps {
  status: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  return (
    <div className="text-center text-gray-500 mt-4">
      {status}
    </div>
  );
};

export default StatusIndicator;
