import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../features/transaction/transactionSlice';
import Transaction from './Transaction';


export default function TransactionLists() {
  const dispatch = useDispatch();
  const {  type, search } = useSelector((state) => state.filter);
  const { currentPage, totalItemShow } = useSelector(state => state.pagination);
  const {error, isError, isLoading, transactions} = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(fetchTransactions({type, search, currentPage, totalItemShow, isFilter:true}));
  }, [dispatch,type, search, currentPage, totalItemShow]);

  //decide what to render for each
  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (!isLoading && isError) content = <p className="error">{error}</p>

  if (!isLoading && !isError && transactions.length === 0) content = <p className="text-center">No transactions found!</p>

  if (!isLoading && !isError && transactions.length > 0) content = transactions.map((transaction) => <Transaction key={transaction.id} transaction={transaction} />);

  return <ul>{content}</ul>
}
