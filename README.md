# TradeMarkia Search Page

## Description

Cloned TradeMarkia's Search Page with API provided by the company for their task.

## Tech Stack

- **Frontend**: React TypeScript, Tailwind CSS, Material-UI

## Features

- **Search Progress Status**: Status messages for "Searching", "No Results Found", or "Error Occurred".
- **API Integration**:
  -- Fetch trademark data based on user queries and filters from provided APIs.
  -- Display search results dynamically based on API response.
- **Filters**:
  -- Owner Filter: Select trademarks by the current owner.
  -- Law Firm Filter: Filter results based on law firms associated with the trademark.
  -- Attorney Filter: Narrow results based on attorney representation.
  -- Status Filter: Filter trademarks based on their status (registered, pending, abandoned, etc.).
- **Search Bar**:
  -- Input field for user queries (e.g., search by trademark name).
  -- Debounced search to avoid excessive API calls.

## API Calls

| Endpoint     | Method | Description                 |
| ------------ | ------ | --------------------------- |
| `/api/v3/us` | POST   | Fetches trademarks details. |

Parameters

```json
{
  "input_query": "check",
  "input_query_type": "",
  "sort_by": "default",
  "status": [],
  "exact_match": false,
  "date_query": false,
  "owners": [],
  "attorneys": [],
  "law_firms": [],
  "mark_description_description": [],
  "classes": [],
  "page": 1,
  "rows": 10,
  "sort_order": "desc",
  "states": [],
  "counties": []
}
```

## Dependencies

### Frontend

```json
    @emotion/react,
    @emotion/styled,
    @mui/material,
    @types/jest,
    @types/node,
    @types/react,
    @types/react-dom,
    axios,
    react,
    react-dom,
    react-icons,
    react-router-dom,
    react-scripts,
    react-table-ui,
    typescript,
    web-vitals
```

## Author

[Kamil Dehliwala](https://github.com/kamil26300)
