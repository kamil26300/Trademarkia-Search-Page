import React from "react";
import ResultsTable from "./ResultsTable";

interface SearchResultsProps {
  results: any[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-4">About {results.length} Trademarks found</p>
      <ResultsTable results={results} />
    </div>
  );
};

export default SearchResults;
