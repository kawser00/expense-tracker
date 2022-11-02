import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeTransaction, createTransaction, editInActive } from '../features/transaction/transactionSlice';

export default function Form() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [editMode, setEditMode] = useState(false);

  const { isError, isLoading } = useSelector((state) => state.transactions);
  const { editing } = useSelector((state) => state.transactions);

  //listen for edit mode active
  useEffect(() => {
    const { id, name, type, amount } = editing || {};
    if (id) {
      setEditMode(true);
      setName(name);
      setType(type);
      setAmount(amount);
    } else {
      setEditMode(false);
      reset();
    }
  }, [editing]);

  const reset = () => {
    setName('');
    setType('');
    setAmount('');
  }

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(createTransaction({
      name,
      type,
      amount: Number(amount),
    }));
    reset();
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(changeTransaction({
      id: editing?.id,
      data: {
        name,
        type,
        amount: Number(amount),
      }
    }));
    setEditMode(false);
    reset();
  }

  const cancelEditMode = () => {
    setEditMode(false);
    dispatch(editInActive());
    reset();
  }

  return (
    <div className="form">
      <h3>Add new transaction</h3>
      <form onSubmit={editMode ? handleUpdate : handleCreate}>
        <div className="form-group">
          <label >Name</label>
          <input
            required
            type="text"
            name="name"
            placeholder="My Salary"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group radio">
          <label >Type</label>
          <div className="radio_group">
            <input
              required
              type="radio"
              value="income"
              name="type"
              checked={type === 'income'}
              onChange={() => setType('income')}
            />
            <label >Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="type"
              placeholder="Expense"
              checked={type === 'expense'}
              onChange={() => setType('expense')}
            />
            <label >Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label >Amount</label>
          <input
            required
            type="number"
            placeholder="Enter amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button disabled={isLoading} type="submit" className="btn">
          {
            editMode ?
              <>
                {
                  isLoading ? 'Updating Transaction...' : 'Update Transaction'
                }
              </> :
              <>
                {isLoading ? 'Adding Transaction...' : 'Add Transaction'}
              </>
          }
        </button>
        {!isLoading && isError && <p className="error">There was an error occurred!</p>}
      </form>

      {editMode && <button onClick={cancelEditMode} className="btn cancel_edit">Cancel Edit</button>}
    </div>
  )
}
