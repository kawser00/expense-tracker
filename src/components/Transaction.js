import React from 'react'
import editImage from '../assets/images/edit.svg';
import deleteImage from '../assets/images/delete.svg';
import { useDispatch } from 'react-redux';
import { editActive, removeTransaction } from '../features/transaction/transactionSlice';
import { numberWithCommas } from '../utils/numberWithCommas';
import { useLocation } from 'react-router-dom';
import TransactionModal from './TransactionModal';

export default function Transaction({ transaction }) {
  const [showModal, setShowModal] = React.useState(false);
  const { id, name, amount, type } = transaction || {};
  const dispatch = useDispatch();
  const location = useLocation();

  const handleEdit = () => {
    dispatch(editActive(transaction));
    if(location.pathname.includes('transactions')) {
      setShowModal(true);
    }
  }

  const handleDelete = () => {
    dispatch(removeTransaction(id));
  }

  return (
    <>

      <li className={`transaction ${type}`}>
        <p>{name}</p>
        <div className="right">
          <p>৳ {numberWithCommas(amount)}</p>
          <button onClick={handleEdit} className="link">
            <img
              alt="edit"
              className="icon"
              src={editImage}
            />
          </button>
          <button onClick={handleDelete} className="link">
            <img
              alt="delete"
              className="icon"
              src={deleteImage}
            />
          </button>
        </div>
      </li>
      {showModal && <TransactionModal onHide={() =>setShowModal(false)}/>}
    </>
  )
}
