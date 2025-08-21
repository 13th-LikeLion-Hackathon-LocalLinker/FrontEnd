// src/components/NoticeCard/NoticeCard.tsx
import React from 'react';
import type { Notice } from '../../data/notices';
import bookmarket from '../../assets/icons/bookmarket.svg';
import bookmarketFill from '../../assets/icons/bookmark_fill.svg';
import * as S from './NoticeCard.styles';

type NoticeCardProps = Notice & {
  bookmarked?: boolean;
  defaultBookmarked?: boolean;
  onToggleBookmark?: (next: boolean) => void;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  isPeriodLimited?: boolean;
};

export default function NoticeCard(props: NoticeCardProps) {
  const {
    bookmarked: controlled,
    defaultBookmarked,
    onToggleBookmark,
    onClick,
    className,
    isPeriodLimited,
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

  const hasTag = !!n.type && n.type.trim().length > 0;

  return (
    <S.Card role="button" aria-label={n.title} onClick={onClick} className={className}>
      <S.MetaRow>
        <S.MetaLeft>
          <S.CategoryText>{n.category}</S.CategoryText>
          {hasTag && <S.TagBadge>{n.type}</S.TagBadge>}
          {isPeriodLimited && <S.LimitedBadge>기간제</S.LimitedBadge>}
        </S.MetaLeft>

        <S.IconButton onClick={handleBookmarkClick}>
          <S.BookmarkImg src={bookmarked ? bookmarketFill : bookmarket} />
        </S.IconButton>
      </S.MetaRow>

      <S.TitleBox>
        <S.Title>{n.title}</S.Title>
      </S.TitleBox>

      <S.BottomRow>
        <S.Dept>대상 | {n.dept}</S.Dept>
        <S.Period>신청기간 | {n.period}</S.Period>
      </S.BottomRow>
    </S.Card>
  );
}