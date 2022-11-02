import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searched } from '../features/filterTransaction/filterSlice';

export default function Search() {
  const dispatch = useDispatch();
  const { search } = useSelector(state => state.filter);
  const [input, setInput] = useState(search);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searched(input));
  }

  //if do clear filter, update input
  useEffect(() => {
    setInput(search);
  }, [search]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="search">
        <input
          type="text"
          name="search"
          placeholder="Search"
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="submit"
          value="Search"
        />
      </div>
    </form>
  )
}
