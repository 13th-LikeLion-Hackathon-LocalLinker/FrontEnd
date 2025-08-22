import React from 'react';
import { StyledLabel } from './Label.styles';
import type { LabelProps } from './Label.types';

const Label = ({ children }: LabelProps) => {
  return <StyledLabel>{children}</StyledLabel>;
};

export default Label;
