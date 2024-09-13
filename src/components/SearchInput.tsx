import React, { useState } from "react";

interface SearchInputProps {
  updateParams: (key: string, value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ updateParams }) => {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    updateParams("input_query", input);
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder="Search Trademark Here e.g. Nike"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="ml-2 bg-blue-500 text-white p-2 rounded" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchInput;
