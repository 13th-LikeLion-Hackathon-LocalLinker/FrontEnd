import React from 'react';
import { StyledSelect } from './Select.styles';

type Option = { label: string; value: string };

interface SelectProps {
  options: ReadonlyArray<Option>;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Select({ options, value, onChange }: SelectProps) {
  return (
    <StyledSelect value={value} onChange={onChange}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
