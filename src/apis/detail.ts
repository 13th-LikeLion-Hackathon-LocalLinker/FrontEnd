import api from './index';
import { getNationalityCode } from '../utils/nationality';

interface PostingResponse {
  id: number;
  title: string;
  category:
    | 'ADMINISTRATION'
    | 'MEDICAL'
    | 'EDUCATION'
    | 'HOUSING'
    | 'EMPLOYMENT'
    | 'EDUCATION'
    | 'LIFE_SUPPORT';
  sourceUrl: string;
  applyStartAt: string | null;
  applyEndAt: string | null;
  eligibility: string;
  tags: string;
  isPeriodLimited: boolean;
  detail: string;
}
export const getPostingDetail = async (
  postingId: number,
): Promise<PostingResponse | null> => {
  const onboardingInfo = JSON.parse(
    localStorage.getItem('onboardingInfo') || '{}',
  );
  const language = getNationalityCode(onboardingInfo.nationality);

  try {
    const response = await api.get<PostingResponse>(
      `/api/postings/${postingId}`,
      { params: { language } },
    );
    if (response.data) return response.data;
    return null; // null 반환
  } catch (error) {
    console.error(error);
    return null;
  }
};
