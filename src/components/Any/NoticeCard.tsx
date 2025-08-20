import React from 'react';
import styled from 'styled-components';
import type { Notice } from '../../data/notices';
import bookmarket from '../../assets/icons/bookmarket.svg';
import bookmarketFill from '../../assets/icons/bookmark_fill.svg';

type NoticeCardProps = Notice & {
  /** (선택) 외부에서 북마크 상태 제어 */
  bookmarked?: boolean;
  /** (선택) 내부 상태용 초기값 */
  defaultBookmarked?: boolean;
  /** (선택) 토글 콜백 */
  onToggleBookmark?: (next: boolean) => void;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
};

const Card = styled.article`
  width: 335px;
  height: 134px;
  padding: 10px 16px 16px 16px; /* 내부 303에 맞춤 */
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: #FFFFFF;
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

const Inner = styled.div`
  width: 303px; /* 내부 컨테이너 폭 */
`;

/*카테고리/타입, 우측 북마크 */
const MetaRow = styled(Inner)`
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MetaLeft = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  font-size: 13px;
  line-height: 14px;
  color: #6b7280;
`;

const IconButton = styled.button.attrs({ type: 'button' })`
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

const BookmarkImg = styled.img`
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

//제목 컨테이너
const TitleBox = styled(Inner)`
  height: 44px;
`;

//제목
const Title = styled.h3`
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

/* 부서, 신청기간 감싸는 스타일*/
const BottomRow = styled(Inner)`
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 8px;
`;

//부서 -> 이 부분이 피그마에서 대상 |
const Dept = styled.span`
  font-size: 10px;
  line-height: 14px;
  color: #374151;
  flex: 1 1 auto;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

//기간
const Period = styled.span`
  font-size: 10px;
  line-height: 14px;
  color: #374151;
  flex: 0 0 auto;
  white-space: nowrap;
`;

export default function NoticeCard(props: NoticeCardProps) {
  const {
    bookmarked: controlled,
    defaultBookmarked,
    onToggleBookmark,
    onClick,
    ...n
  } = props;
  const isControlled = controlled !== undefined;
  const [uncontrolled, setUncontrolled] = React.useState(!!defaultBookmarked);
  const bookmarked = isControlled ? !!controlled : uncontrolled;

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !bookmarked;
    if (!isControlled) setUncontrolled(next);
    onToggleBookmark?.(next);
  };

  return (
    <Card role="button" aria-label={n.title} onClick={onClick}>
      {/* 메타 + 북마크 */}
      <MetaRow>
        <MetaLeft>
          <span>{n.category} |</span>
          <span>{n.type}</span>
        </MetaLeft>
        <IconButton onClick={handleBookmarkClick}>
          <BookmarkImg src={bookmarked ? bookmarketFill : bookmarket} />
        </IconButton>
      </MetaRow>

      {/* 제목 */}
      <TitleBox>
        <Title>{n.title}</Title>
      </TitleBox>

      {/* 부서,신청기간 */}
      <BottomRow>
        <Dept>{n.dept}</Dept>
        <Period>신청기간 | {n.period}</Period>
      </BottomRow>
    </Card>
  );
}
