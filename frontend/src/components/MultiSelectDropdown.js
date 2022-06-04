import React, { useEffect } from 'react';
import propTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import CreatableSelect from "react-select/creatable";
import makeAnimated from 'react-select/animated';
import { createProductDirectors, listProductDirectors } from '../actions/productActions';
const animatedComponents = makeAnimated();


function MultiSelectDropdown({ defaultValue, onChange }) {
  const dispatch = useDispatch();
  const directorList = useSelector((state) => state.directorList);
  const { loading, error, directors } = directorList;

  useEffect(() => {
    dispatch(
      listProductDirectors()
    );
  }, [])



  return (
    <div>

      <CreatableSelect
        isClearable
        className="multi-select"
        placeholder="Select Directors"
        options={directors?.map(director => ({ value: director, label: director.name }))}
        onChange={onChange}
        defaultValue={defaultValue}
        components={animatedComponents}
        isMulti
      />


    </div>
  );
}

MultiSelectDropdown.propTypes = {
  onChange: propTypes.func,
  defaultValue: propTypes.array,
}
export default MultiSelectDropdown;
