import React from 'react';
import { StyledRadioLabel } from './RadioLabel.styles';
import type { RadioLabelProps } from './RadioLabel.types';

const RadioLabel = ({ children }: RadioLabelProps) => {
  return <StyledRadioLabel>{children}</StyledRadioLabel>;
};

export default RadioLabel;
