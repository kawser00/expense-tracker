import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { selectedFilterType } from '../features/filterTransaction/filterSlice';
import { pageSelected } from '../features/pagination/paginationSlice';
import Search from './Search';

export default function Filter() {
  const dispatch = useDispatch();
  const [filterType, setFilterType] = useState('');

  const handleFilterType = (type) => {
    setFilterType(type);
    dispatch(selectedFilterType(type));
    dispatch(pageSelected(1));
  }


  return (
    <div className="filter_container">
      <div className="form-group radio">
        <div className="radio_group">
          <input
            required
            type="radio"
            value="all"
            name="type"
            checked={filterType === ''}
            onChange={() => handleFilterType('')}
          />
          <label >All</label>
        </div>
        <div className="radio_group">
          <input
            required
            type="radio"
            value="income"
            name="type"
            checked={filterType === 'income'}
            onChange={() => handleFilterType('income')}
          />
          <label >Income</label>
        </div>
        <div className="radio_group">
          <input
            type="radio"
            value="expense"
            name="type"
            placeholder="Expense"
            checked={filterType === 'expense'}
            onChange={() => handleFilterType('expense')}
          />
          <label >Expense</label>
        </div>
      </div>
      <Search />
    </div>
  )
}
