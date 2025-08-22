import React from 'react';
import { StyledSelect } from './Select.styles';
import type { SelectProps } from './Select.types';

const Select = ({ options, ...rest }: SelectProps) => {
  return (
    <StyledSelect {...rest}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
