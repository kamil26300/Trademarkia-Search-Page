import React, { useEffect, useState } from "react";
import { fetchResults, useSearchParams } from "../hooks/useSearchParams";
import SearchInput from "../components/SearchInput";
import FiltersSidebar from "../components/FiltersSidebar";
import SearchResults from "../components/SearchResults";
import StatusIndicator from "../components/StatusIndicator";
import { SearchParams } from "../types";

const SearchPage: React.FC = () => {
  const { params, updateParams } = useSearchParams();
  const [searchData, setSearchData] = useState<SearchParams[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchResults(params);
        console.log(data);
        setSearchData(data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [params]);

  return (
    <div className="flex">
      <FiltersSidebar updateParams={updateParams} currentParams={params} />
      <div className="flex-grow p-6">
        <SearchInput updateParams={updateParams} />
        {loading ? (
          <StatusIndicator status="Searching..." />
        ) : error ? (
          <StatusIndicator status="Error Occurred" />
        ) : searchData && searchData.length > 0 ? (
          <SearchResults results={searchData} />
        ) : (
          <StatusIndicator status="No Results Found" />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
