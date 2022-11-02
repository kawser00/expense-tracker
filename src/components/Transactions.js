import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectedFilterType } from '../features/filterTransaction/filterSlice';
import { fetchTransactions } from '../features/transaction/transactionSlice';
import Transaction from './Transaction';


export default function Transactions() {
  const dispatch = useDispatch();
  const { error, isError, isLoading, transactions, totalTransactionCount } = useSelector((state) => state.transactions);
  const { type, search } = useSelector((state) => state.filter);

  const sortedArray = [...transactions].reverse();
  const firstFiveTransactions = sortedArray.slice(0, 5);

  useEffect(() => {
    dispatch(fetchTransactions({ type, search, currentPage: 1, totalItemShow: totalTransactionCount, isFilter: false }));
  }, [dispatch, type, search, totalTransactionCount]);

  //decide what to render for each
  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (!isLoading && isError) content = <p className="error">{error}</p>

  if (!isLoading && !isError && transactions.length === 0) content = <p className="text-center">No transactions found!</p>

  if (!isLoading && !isError && transactions.length > 0) content = firstFiveTransactions.map((transaction) => <Transaction key={transaction.id} transaction={transaction} />);

  return (
    <div>
      <p className="second_heading">Your Transactions:</p>

      <div className="container_of_list_of_transactions">
        <ul>
          {content}
        </ul>
        <div className="text-center">
          <Link onClick={() => dispatch(selectedFilterType(''))} to="/transactions" className="view_more">View All...</Link>
        </div>
      </div>
    </div>
  )
}
