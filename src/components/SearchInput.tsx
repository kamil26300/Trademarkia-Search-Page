import React, { useState } from "react";
import CustomButton from "./CustomButton";

interface SearchInputProps {
  updateParams: (key: string, value: string) => void;
  input_query: any;
}

const SearchInput: React.FC<SearchInputProps> = ({
  input_query,
  updateParams,
}) => {
  const [input, setInput] = useState(input_query || "");

  const handleSearch = () => {
    updateParams("input_query", input);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder="Search Trademark Here e.g. Nike"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <CustomButton disabled={input === ""} onClickButton={handleSearch}>
        Search
      </CustomButton>
    </div>
  );
};

export default SearchInput;
