import React from 'react';
import Filter from '../components/Filter';
import Layout from '../components/Layout';
import Pagination from '../components/Pagination';
import TransactionLists from '../components/TransactionLists';

const ViewTransactions = () => {
  return (
    <Layout>
      <div className="container_of_list_of_transactions_view">
        <Filter />
        <TransactionLists />
        <Pagination />
      </div>
    </Layout>
  );
};

export default ViewTransactions;