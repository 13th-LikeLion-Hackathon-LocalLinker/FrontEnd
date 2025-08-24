import React, { useEffect, useRef, useState } from 'react';
import * as S from './ChatBotPage.styles';
import ChatOptionButton from '../../components/ChatOptionButton/ChatOptionButton';
import type { ChatBotProps } from './ChatBotPage.types';
import { sendChatMessage } from '../../apis/chat';

function ChatBotPage() {
  const [messages, setMessages] = useState<ChatBotProps[]>([
    {
      id: 1,
      text: '안녕하세요! \n어떤 문의사항이 있으신가요?',
      sender: 'bot',
    },
  ]);

  //자동 스크롤
  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  //   한글자씩 나오게 하는 효과
  const typeText = (fullText: string) => {
    const id = Date.now();
    setMessages((prev) => [...prev, { id, text: '', sender: 'bot' }]);

    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        const currentText = fullText.slice(0, index + 1); // 맨 앞글자 누락을 방지하기 위한 앞에서부터 자르기
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === id ? { ...msg, text: currentText } : msg,
          ),
        );
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);
  };

  const handleOptionClick = async (option: string) => {
    // 유저 메시지 추가
    const newUserMsg: ChatBotProps = {
      id: Date.now(),
      text: option,
      sender: 'user',
    };
    setMessages((prev) => [...prev, newUserMsg]);

    // 봇 로딩 메시지 추가
    const loadingId = Date.now() + 1;
    setMessages((prev) => [
      ...prev,
      { id: loadingId, text: '...', sender: 'bot' },
    ]);

    try {
      const answer = await sendChatMessage(option);
      if (answer) {
        // 로딩 메시지를 실제 응답으로 교체
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === loadingId ? { ...msg, text: '' } : msg,
          ),
        );
        typeText(answer); // 글자 타이핑 효과
      } else {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === loadingId ? { ...msg, text: 'no response' } : msg,
          ),
        );
      }
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingId ? { ...msg, text: 'error' } : msg,
        ),
      );
    }
  };

  return (
    <S.ChatBotPageContainer>
      <S.ChatWindow ref={chatWindowRef}>
        {messages.map((msg) => (
          <S.ChatMessage key={msg.id} sender={msg.sender}>
            {msg.text}
          </S.ChatMessage>
        ))}
      </S.ChatWindow>
      <S.ChatOptions>
        <S.ChatOptionsGrid>
          <ChatOptionButton
            text="음식물쓰레기 배출법"
            onClick={() => handleOptionClick('음식물쓰레기 배출법')}
          />
          <ChatOptionButton
            text="외국인 의료비 지원"
            onClick={() => handleOptionClick('외국인 의료비 지원')}
          />

          <ChatOptionButton
            text="다문화가족지원센터"
            onClick={() => handleOptionClick('다문화가족지원센터')}
          />
          <ChatOptionButton
            text="외국인 지원기관"
            onClick={() => handleOptionClick('외국인 지원기관')}
          />
          <ChatOptionButton
            text="대표 관광지"
            onClick={() => handleOptionClick('대표 관광지')}
          />
          <ChatOptionButton
            text="외국인 등록"
            onClick={() => handleOptionClick('외국인 등록')}
          />
        </S.ChatOptionsGrid>
      </S.ChatOptions>
    </S.ChatBotPageContainer>
  );
}

export default ChatBotPage;
