import api from './index';
import { getNationalityCode } from '../utils/nationality';

interface ChatRequest {
  query: string;
  language: string;
}

interface ChatResponse {
  answer: string;
}
export const sendChatMessage = async (query: string) => {
  const onboardingInfo = JSON.parse(
    localStorage.getItem('onboardingInfo') || '{}',
  );
  const language = getNationalityCode(onboardingInfo.nationality);

  const payload: ChatRequest = { query, language };

  try {
    const response = await api.post<ChatResponse>('/api/chat/ask', payload);
    return response.data.answer;
  } catch (error) {
    console.error(error);
  }
};
