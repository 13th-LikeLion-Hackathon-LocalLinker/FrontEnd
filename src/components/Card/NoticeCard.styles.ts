import styled from 'styled-components';

export const Card = styled.article`
  width: 335px;
  height: 134px;
  padding: 10px 16px 16px 16px; /* 내부 303에 맞춤 */
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: #ffffff;
  position: relative;
  display: flex;
  margin-left: 4px;
  flex-direction: column;
  row-gap: 12px;
`;

export const Inner = styled.div`
  width: 303px; /* 내부 컨테이너 폭 */
`;

/* 카테고리/타입, 우측 북마크 */
export const MetaRow = styled(Inner)`
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MetaLeft = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  font-size: 13px;
  line-height: 14px;
  color: #6b7280;
`;

export const IconButton = styled.button.attrs({ type: 'button' })`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  cursor: pointer;
  border: 0;
  background: transparent;
  border-radius: 4px;
`;

export const BookmarkImg = styled.img`
  position: absolute;
  width: 26px;
  height: 26px;
  left: 5.96px;
  top: 1px;
  transform: rotate(0deg);
  opacity: 1;
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
`;

/* 제목 컨테이너 */
export const TitleBox = styled(Inner)`
  height: 44px;
`;

/* 제목 */
export const Title = styled.h3`
  margin: 0;
  font-weight: 600;
  font-style: normal;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: 0;
  color: #111827;

  /* 2줄 말줄임 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

/* 부서, 신청기간 감싸는 스타일 */
export const BottomRow = styled(Inner)`
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 8px;
`;

/* 부서 */
export const Dept = styled.span`
  font-size: 10px;
  line-height: 14px;
  color: #374151;
  flex: 1 1 auto;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/* 기간 */
export const Period = styled.span`
  font-size: 10px;
  line-height: 14px;
  color: #374151;
  flex: 0 0 auto;
  white-space: nowrap;
`;
