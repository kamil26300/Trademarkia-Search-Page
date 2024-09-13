import React from "react";

interface ResultsTableProps {
  results: any[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th>Mark</th>
          <th>Details</th>
          <th>Status</th>
          <th>Class/Description</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, index) => (
          <tr key={index}>
            <td>{result.mark}</td>
            <td>{result.details}</td>
            <td>{result.status}</td>
            <td>{result.classDescription}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
