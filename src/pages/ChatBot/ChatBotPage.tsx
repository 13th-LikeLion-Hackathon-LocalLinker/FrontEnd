import React, { useEffect, useRef, useState } from 'react';
import * as S from './ChatBotPage.styles';
import ChatOptionButton from '../../components/ChatOptionButton/ChatOptionButton';
import type { ChatBotProps } from './ChatBotPage.types';

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
    let index = 0;
    const interval = setInterval(() => {
      if (index >= fullText.length) {
        clearInterval(interval);
        return;
      }

      setMessages((prev) => {
        const lastMsg = prev[prev.length - 1];

        if (!lastMsg || lastMsg.sender !== 'bot') {
          return [
            ...prev,
            { id: Date.now(), text: fullText[index] || '', sender: 'bot' },
          ];
        } else {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...lastMsg,
            text: lastMsg.text + (fullText[index] || ''),
          };
          return updated;
        }
      });

      index++;
    }, 30);
  };

  const handleOptionClick = (option: string) => {
    // 1. 유저 메시지 추가
    const newUserMsg: ChatBotProps = {
      id: Date.now(),
      text: option,
      sender: 'user',
    };
    setMessages((prev) => [...prev, newUserMsg]);

    // 2. 목업 답변
    const mockResponses: Record<string, string> = {
      '대표 관광지': '서울의 경복궁, 부산의 해운대가 대표 관광지입니다.',
      '음식물쓰레기 배출법': '음식물쓰레기는 전용 용기에 담아 배출해주세요.',
      '외국인 의료비 지원':
        '외국인은 국민건강보험공단에서 의료비 지원을 받을 수 있습니다.',
      다문화가족지원센터:
        '각 지역 다문화가족지원센터에서 상담을 받으실 수 있습니다.',
      '외국인 지원기관':
        '외국인 지원기관 정보는 정부 포털에서 확인 가능합니다.',
      '외국인 등록': '외국인 등록은 출입국관리사무소에서 가능합니다.',
    };

    // 3. 타자 효과로 봇 메시지 출력
    const answer = mockResponses[option] || '죄송합니다. 답변을 준비 중입니다.';
    typeText(answer);

    // api 코드
    // const answer = await sendChatMessage(option);
    // typeText(answer);
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
