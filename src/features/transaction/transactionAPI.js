import axios from "../../utils/axios";

export const getTransactions = async ({type, search, currentPage, totalItemShow , isFilter}) => {
  const typeQuery = type !== "" ? `&type=${type}` : "";
  const searchQuery = search !== "" ? `&name_like=${search}` : "";
  const querystring = `${typeQuery}${searchQuery}`;

  const response = await axios.get(`/transactions?_page=${currentPage}&_limit=${totalItemShow}${isFilter ? querystring : ""}`);

  return {
    transactions: response.data,
    total: response.headers["x-total-count"],
  };

};

export const addTransaction = async (data) => {
  const response = await axios.post('/transactions', data);
  return response.data;
};

export const editTransaction = async (id, data) => {
  const response = await axios.put(`/transactions/${id}`, data);
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await axios.delete(`/transactions/${id}`);
  return response.data;
};