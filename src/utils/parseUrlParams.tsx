export const parseUrlParams = (search: string) => {
  const params = new URLSearchParams(search);

  const getArrayParam = (key: string) => {
    const values = params.getAll(key);
    return values.length === 1 && values[0] === "" ? [] : values;
  };

  // Build the parsed parameters object
  const parsedParams = {
    input_query: params.get("input_query") || "nike",
    input_query_type: params.get("input_query_type") || "",
    sort_by: params.get("sort_by") || "default",
    
    status: getArrayParam("status"),
    owners: getArrayParam("owners"),
    attorneys: getArrayParam("attorneys"),
    law_firms: getArrayParam("law_firms"),
    mark_description_description: getArrayParam("mark_description_description"),
    classes: getArrayParam("classes"),
    
    exact_match: params.get("exact_match") === "true",
    date_query: params.get("date_query") === "true",
    
    page: Number(params.get("page")) || 1,
    rows: Number(params.get("rows")) || 10,
    sort_order: params.get("sort_order") || "desc",
    
    states: getArrayParam("states"),
    counties: getArrayParam("counties"),
  };

  // Remove items with empty strings or empty arrays
  const filteredParams = Object.fromEntries(
    Object.entries(parsedParams).filter(([key, value]) => 
      // Exclude empty strings and empty arrays
      value !== "" && 
      (Array.isArray(value) ? value.length > 0 : true)
    )
  );

  return filteredParams;
};
