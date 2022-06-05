import React from 'react';
import propTypes from 'prop-types';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
// import { useDispatch, useSelector } from 'react-redux';
// import Select from 'react-select';
// import { listProductDirectors } from '../actions/productActions';

const animatedComponents = makeAnimated();

function MultiSelectDropdown({ placeholder, defaultValue, options, onChange }) {
  return (
    <div>
      <CreatableSelect
        isClearable
        className="multi-select"
        placeholder={placeholder}
        options={options}
        onChange={(value, action) => {
          onChange(
            value.map((v) => v.value),
            action
          );
        }}
        defaultValue={defaultValue}
        components={animatedComponents}
        isMulti
      />
    </div>
  );
}

MultiSelectDropdown.propTypes = {
  onChange: propTypes.func.isRequired,
  options: propTypes.array.isRequired,
  defaultValue: propTypes.array.isRequired,
  placeholder: propTypes.string.isRequired,
};
export default MultiSelectDropdown;
