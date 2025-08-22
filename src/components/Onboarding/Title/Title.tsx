import React from 'react';
import { StyledTitle } from './Title.styles';
import type { TitleProps } from './Title.types';

const Title = ({ children }: TitleProps) => {
  return <StyledTitle>{children}</StyledTitle>;
};

export default Title;
