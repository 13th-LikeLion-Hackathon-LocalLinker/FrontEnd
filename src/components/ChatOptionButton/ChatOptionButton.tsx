import React from 'react';
import * as S from './ChatOptionButton.styles';
import type { ChatOptionButtonProps } from './ChatOptionButton.types';

function ChatOptionButton({ text }: ChatOptionButtonProps) {
  return <S.ChatOptionButtonContainer>{text}</S.ChatOptionButtonContainer>;
}

export default ChatOptionButton;
