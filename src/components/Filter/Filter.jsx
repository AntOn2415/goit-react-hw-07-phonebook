import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {DebounceInput} from 'react-debounce-input';
import { setFilter } from 'redux/slices/filterSlice';
import { FilterName, FilterInput } from './Filter.styled';
import {selectFilter} from 'redux/selectors'

const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFilter(filter));
  }, [filter, dispatch]);

  const onChangeFilter = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <FilterName>
      Find contacts by Name
      <DebounceInput 
        element={FilterInput}
        type="text"
        value={filter}
        debounceTimeout={500} 
        onChange={onChangeFilter}
      />
    </FilterName>
  );
};

export default Filter;
