import React from 'react';
import type { Notice } from '../../data/notices';
import bookmarket from '../../assets/icons/bookmarket.svg';
import bookmarketFill from '../../assets/icons/bookmark_fill.svg';
import * as S from './NoticeCard.styles';

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

export default function NoticeCard(props: NoticeCardProps) {
  const {
    bookmarked: controlled,
    defaultBookmarked,
    onToggleBookmark,
    onClick,
    className,
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
    <S.Card
      role="button"
      aria-label={n.title}
      onClick={onClick}
      className={className}
    >
      {/* 메타 + 북마크 */}
      <S.MetaRow>
        <S.MetaLeft>
          <span>{n.category} |</span>
          <span>{n.type}</span>
        </S.MetaLeft>
        <S.IconButton onClick={handleBookmarkClick}>
          <S.BookmarkImg src={bookmarked ? bookmarketFill : bookmarket} />
        </S.IconButton>
      </S.MetaRow>

      {/* 제목 */}
      <S.TitleBox>
        <S.Title>{n.title}</S.Title>
      </S.TitleBox>

      {/* 부서,신청기간 */}
      <S.BottomRow>
        <S.Dept>{n.dept}</S.Dept>
        <S.Period>신청기간 | {n.period}</S.Period>
      </S.BottomRow>
    </S.Card>
  );
}
