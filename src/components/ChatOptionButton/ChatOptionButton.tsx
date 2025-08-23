import React from 'react';
import * as S from './ChatOptionButton.styles';
import type { ChatOptionButtonProps } from './ChatOptionButton.types';

function ChatOptionButton({ text, onClick }: ChatOptionButtonProps) {
  return (
    <S.ChatOptionButtonContainer onClick={onClick}>
      {text}
    </S.ChatOptionButtonContainer>
  );
}

export default ChatOptionButton;
