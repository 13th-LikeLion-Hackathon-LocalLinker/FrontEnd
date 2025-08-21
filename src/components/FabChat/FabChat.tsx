// src/components/FabChat/FabChat.tsx
import React from 'react';
import * as S from './FabChat.styles';
import chatIcon from '../../assets/icons/chat.svg';
import upIcon from '../../assets/icons/up.svg';

export default function FabChat() {
  return (
    <>
      <S.ChatImg
        src={chatIcon}
        alt="챗봇"
        onClick={() => {
          window.location.href = '#';
        }}
        draggable={false}
      />
      <S.TopImg
        src={upIcon}
        alt="맨 위로"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        draggable={false}
      />
    </>
  );
}
