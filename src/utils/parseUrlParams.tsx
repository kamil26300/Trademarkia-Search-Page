export const parseUrlParams = (search: string) => {
  const params = new URLSearchParams(search);

  const getArrayParam = (key: string) => {
    const values = params.getAll(key);
    return values.length === 1 && values[0] === "" ? [] : values;
  };

  // Build the parsed parameters object
  const parsedParams = {
    input_query: params.get("input_query") || "",
    input_query_type: params.get("input_query_type") || "",
    sort_by: params.get("sort_by") || "",
    
    status: getArrayParam("status"),
    owners: getArrayParam("owners"),
    attorneys: getArrayParam("attorneys"),
    law_firms: getArrayParam("law_firms"),
    mark_description_description: getArrayParam("mark_description_description"),
    classes: getArrayParam("classes"),
    
    exact_match: params.get("exact_match") === "true" ? true : "",
    date_query: params.get("date_query") === "true" ? true : "",
    
    page: Number(params.get("page")) || "",
    rows: Number(params.get("rows")) || "",
    sort_order: params.get("sort_order") || "",
    
    states: getArrayParam("states"),
    counties: getArrayParam("counties"),
  };

  // Remove items with empty strings or empty arrays
  const filteredParams = Object.fromEntries(
    Object.entries(parsedParams).filter(([key, value]) => 
      value !== "" && 
      (Array.isArray(value) ? value.length > 0 : true)
    )
  );
  
  return filteredParams;
};
