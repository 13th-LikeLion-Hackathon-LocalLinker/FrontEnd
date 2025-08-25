import api from './index';

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
  console.log(onboardingInfo.nationality);

  try {
    const response = await api.get<PostingResponse>(
      `/api/postings/${postingId}`,
      { params: { language: onboardingInfo.nationality } },
    );
    if (response.data) return response.data;
    return null; // null 반환
  } catch (error) {
    console.error(error);
    return null;
  }
};
