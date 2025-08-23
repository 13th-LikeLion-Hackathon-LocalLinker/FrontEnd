import styled from '@emotion/styled';

const ChatBotPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ChatWindow = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  background-color: ${({ theme }) => theme.colors.surface.variant};
  padding-bottom: 80px;
`;
const ChatMessage = styled.div<{ sender: 'user' | 'bot' }>`
  margin-bottom: 26px;
  display: flex;
  width: ${({ sender }) => (sender === 'user' ? 'fit-content' : '100%')};
  flex-direction: column;
  align-self: ${({ sender }) =>
    sender === 'user' ? 'flex-end' : 'flex-start'};
  background: ${({ sender }) => (sender === 'user' ? 'white' : 'transparent')};
  padding: ${({ sender }) => (sender === 'user' ? '14px 16px' : '0')};
  border-radius: ${({ sender }) => (sender === 'user' ? '200px' : '0')};
  color: ${({ theme }) => theme.colors.surface.onVariant};
  white-space: pre-wrap;
  line-height: 1.5;
`;

const ChatOptions = styled.div`
  position: fixed;
  max-width: 375px;
  bottom: 0;
  padding: 14px 20px;
  background-color: ${({ theme }) => theme.colors.surface.variant};

  overflow-x: auto;
  overflow-y: hidden;

  /* 스크롤바 숨기기 */
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChatOptionsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  width: fit-content;
  flex-direction: column;
  max-height: calc(2 * 40px + 6px); //버튼 높이 2개 + 간격
`;

export {
  ChatBotPageContainer,
  ChatWindow,
  ChatMessage,
  ChatOptions,
  ChatOptionsGrid,
};
