import React, { useEffect, useState } from "react";
import ResultsTable from "./ResultsTable";
import CustomButton from "./CustomButton";

interface SearchResultsProps {
  results: any;
  input_query: string | any;
  page: number;
  updateParams: Function;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  input_query,
  page,
  updateParams,
}) => {
  const [prevDisabled, setPrevDisabled] = useState<boolean>(false);
  const [nextDisabled, setNextDisabled] = useState<boolean>(false);
  const list = results.hits;
  const totalValue = results.total.value;
  const totalPages = Math.ceil(totalValue / 10);

  useEffect(() => {
    const handlePageButtonDisability = () => {
      if (page === 1) {
        setPrevDisabled(true);
      } else {
        setPrevDisabled(false);
      }
      if (page === totalPages) {
        setNextDisabled(true);
      } else {
        setNextDisabled(false);
      }
    };
    handlePageButtonDisability();
  }, []);

  const handleSimilarSearch = (input: string) => {
    updateParams("input_query", input);
  };

  const handlePrev = () => {
    if (page > 1) updateParams("page", page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) updateParams("page", page + 1);
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-gray-600 my-4">
        About {results.total.value} Trademarks found for "{input_query}"
      </p>
      <div className="">
        <p className="text-sm text-gray-600 flex items-center gap-4">
          <p>Also try searching for:</p>
          <CustomButton
            onClickButton={() =>
              handleSimilarSearch(`*${input_query.substring(1)}`)
            }
          >
            *{input_query.substring(1)}
          </CustomButton>
          <CustomButton
            onClickButton={() => handleSimilarSearch(`${input_query}*`)}
          >
            {input_query}*
          </CustomButton>
        </p>
        <ResultsTable results={list} />
      </div>

      {/* Pagination */}
      <div className="flex justify-between">
        <CustomButton disabled={prevDisabled} onClickButton={handlePrev}>
          Previous
        </CustomButton>
        Page {page}/{totalPages}
        <CustomButton disabled={nextDisabled} onClickButton={handleNext}>
          Next
        </CustomButton>
      </div>
    </div>
  );
};

export default SearchResults;
