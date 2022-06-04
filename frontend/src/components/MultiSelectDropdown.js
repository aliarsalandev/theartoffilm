import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
const Countries = [
  { label: 'Albania', value: 355 },
  { label: 'Argentina', value: 54 },
  { label: 'Austria', value: 43 },
  { label: 'Cocos Islands', value: 61 },
  { label: 'Kuwait', value: 965 },
  { label: 'Sweden', value: 46 },
  { label: 'Venezuela', value: 58 },
];
function MultiSelectDropdown(props) {
  return (
    <div>
      <Select
        className="multi-select"
        placeholder="Select Directors"
        options={Countries}
        components={animatedComponents}
        isMulti
      />
    </div>
  );
}

export default MultiSelectDropdown;
