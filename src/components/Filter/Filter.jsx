import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import { BsSearch } from 'react-icons/bs';
import { setFilter } from 'redux/slices/filterSlice';
import {
  FilterName,
  LabelSpan,
  FilterInput,
  IconWrapper,
} from './Filter.styled';
import {
  selectFilter,
  memoizedFilteredContactsSelector,
} from 'redux/selectors';

const Filter = () => {
  const filter = useSelector(selectFilter);
  const filteredContacts = useSelector(memoizedFilteredContactsSelector);

  const isEmptyFilter = filteredContacts.length === 0;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFilter(filter));
  }, [filter, dispatch]);

  const onChangeFilter = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <FilterName>
      <IconWrapper isEmptyFilter={isEmptyFilter}>
        <BsSearch />
      </IconWrapper>
      <LabelSpan>Find contacts by Name</LabelSpan>
      <DebounceInput
        element={FilterInput}
        type="text"
        value={filter}
        debounceTimeout={500}
        onChange={onChangeFilter}
        isEmptyFilter={isEmptyFilter}
      />
    </FilterName>
  );
};

export default Filter;
