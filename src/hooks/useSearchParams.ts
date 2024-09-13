import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { parseUrlParams } from "../utils/parseUrlParams";

export const useSearchParams = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useState(parseUrlParams(location.search));

  // Helper function to serialize params (e.g., convert arrays to comma-separated strings)
  const serializeParams = (params: Record<string, any>) => {
    
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (Array.isArray(value)) {
        searchParams.set(key, value.join(",")); // Convert arrays to comma-separated strings
      } else {
        searchParams.set(key, value);
      }
    });

    return searchParams.toString();
  };

  const updateParams = (key: string, value: any) => {
    const newParams = { ...params, [key]: value };
    setParams(newParams);
    const query = serializeParams(newParams);

    navigate({
      pathname: location.pathname,
      search: `?${query}`,
    });
  };

  useEffect(() => {    
    setParams(parseUrlParams(location.search));
  }, [location.search]);

  return { params, updateParams };
};

export const fetchResults = async (params: any) => {
  // params = {sort_by:"default", exact_match:false, date_query:false, page:1, rows:10, sort_order:"desc", ...params}
  let data = JSON.stringify(params);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://vit-tm-task.api.trademarkia.app/api/v3/us",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error fetching results:", error);
    throw error;
  }
};
