import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { pageSelected, totalItemSelected } from '../features/pagination/paginationSlice';

export default function Pagination() {
  const dispatch = useDispatch();
  const { currentPage, totalItemShow } = useSelector(state => state.pagination);
  const { totalTransactionCount, transactions } = useSelector((state) => state.transactions);

  const totalPaginationCount = Math.ceil(totalTransactionCount / totalItemShow);

  const handleItemShow = (count) => {
    dispatch(totalItemSelected(count));
    dispatch(pageSelected(1));
  }

  const handlePagination = (pageNo) => {
    dispatch(pageSelected(pageNo));
  }

  const handlePrevButton = () => {
    currentPage > 1 && dispatch(pageSelected(currentPage - 1));
  }
  const handleNextButton = () => {
    currentPage < totalPaginationCount && dispatch(pageSelected(currentPage + 1));
  }

  return (
    <>
      {transactions.length > 0 && (
        <section className="pagination_container flex items-center justify-end max-w-7xl mx-auto">
          <form>
            <select value={totalItemShow} onChange={(e) => handleItemShow(e.target.value)} className="px-4 py-1 rounded-md h-full">
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="8">8</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </form>
          {totalPaginationCount > 1 && (
            <div
              className="py-6 lg:px-0 flex gap-2 justify-end"
            >
              {currentPage > 1 && (
                <button
                  onClick={handlePrevButton}
                  className={`font-1 px-4 py-1 rounded-md cursor-pointer text-white`}
                >
                  Prev
                </button>
              )}
              {Array.from(Array(totalPaginationCount).keys()).map(count =>
                <div
                  key={count}
                  onClick={() => handlePagination(count + 1)}
                  className={`font-1 px-4 py-1 rounded-md cursor-pointer ${currentPage === count + 1 ? 'bg-violet-600 text-white' : 'bg-violet-100 text-blue-600'}`}
                >
                  {count + 1}
                </div>
              )}
              {currentPage < totalPaginationCount && (
                <button
                  onClick={handleNextButton}
                  className={`font-1 px-4 py-1 rounded-md cursor-pointer text-white`}
                >
                  Next
                </button>
              )}
            </div>
          )}
        </section>
      )}
    </>
  )
}
