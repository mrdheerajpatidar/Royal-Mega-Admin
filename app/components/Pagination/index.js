import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({
  currentPage,
  prevPageHandler,
  pageCount,
  nextPageHandler,
  handlePageClick,
}) => {
  return (
    <div className="pagination flex items-center gap-1">
      <button
        className="p-2 text-14 bg-gradient-2 cursor-pointer min-w-[30px] text-center text-black hover:bg-gradient-2 hover:text-secondary disabled:opacity-50 disabled:hover:bg-white disabled:cursor-auto disabled:text-black"
        disabled={currentPage == 1 ? true : false}
        onClick={prevPageHandler}
      >
        Prev
      </button>
      <ul className="flex items-center gap-1">
        {Array(pageCount)
          .fill(null)
          .map((_item, index) => (
            <li
              key={index}
              className={`p-2 text-14 font-semibold  cursor-pointer min-w-[30px] text-center  hover:bg-gradient-2 hover:text-secondary rounded-5 ${
                currentPage == index + 1
                  ? 'bg-gradient-2 text-secondary'
                  : 'bg-black text-primary-100 border border-primary-100'
              }`}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </li>
          ))}
      </ul>
      <button
        className="p-2 text-14 bg-gradient-2 cursor-pointer min-w-[30px] text-center text-black hover:bg-gradient-2 hover:text-secondary disabled:opacity-50 disabled:hover:bg-white disabled:cursor-auto disabled:text-black"
        disabled={currentPage == pageCount ? true : false}
        onClick={nextPageHandler}
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  pageCount: PropTypes.number,
  prevPageHandler: PropTypes.func,
  nextPageHandler: PropTypes.func,
  handlePageClick: PropTypes.func,
};

export default Pagination;
