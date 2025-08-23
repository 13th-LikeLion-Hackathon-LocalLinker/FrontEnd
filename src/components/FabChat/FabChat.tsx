// src/components/FabChat/FabChat.tsx
import React from 'react';
import * as S from './FabChat.styles';
import chatIcon from '../../assets/icons/chat.svg';
import upIcon from '../../assets/icons/up.svg';
import { useNavigate } from 'react-router-dom';

export default function FabChat() {
  const navigate = useNavigate();

  return (
    <>
      <S.ChatImg
        src={chatIcon}
        alt="챗봇"
        onClick={() => {
          navigate('/chatbot');
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
