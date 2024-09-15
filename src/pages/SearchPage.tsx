import React, { useEffect, useState } from "react";
import { fetchFilters, fetchResults, useSearchParams } from "../hooks/useSearchParams";
import SearchInput from "../components/SearchInput";
import FiltersSidebar from "../components/FiltersSidebar";
import SearchResults from "../components/SearchResults";
import StatusIndicator from "../components/StatusIndicator";

const SearchPage: React.FC = () => {
  const { params, updateParams } = useSearchParams();
  const [searchData, setSearchData] = useState<any>(null);
  const [filters, setFilters] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const input_query = params["input_query"];

  useEffect(() => {
    const fetchData = async () => {
      setSearchData(null);
      setLoading(true);
      setError(false);
      try {
        const data = await fetchResults(params);

        setSearchData(data);
      } catch (error: any) {
        if (error.status !== 404) setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [params]);

  useEffect(() => {
    const fetchFiltersData = async () => {
      setFilters(null);
      try {
        const data = await fetchFilters(String(input_query));
        setFilters(data);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchFiltersData();
  }, [input_query]);

  return (
    <div className="grid grid-cols-5 relative">
      <div className="p-6 col-span-4">
        <SearchInput input_query={input_query} updateParams={updateParams} />
        {loading ? (
          <StatusIndicator status="Searching..." />
        ) : error ? (
          <StatusIndicator status="Error Occurred" />
        ) : searchData && searchData?.hits?.length > 0 ? (
          <SearchResults input_query={input_query} results={searchData} page={Number(params["page"]) || 1} updateParams={updateParams} />
        ) : (
          <StatusIndicator status="No Results Found" />
        )}
      </div>
      <FiltersSidebar aggregations={filters} updateParams={updateParams} currentParams={params} />
    </div>
  );
};

export default SearchPage;
