import React from 'react';
import * as S from './BookmarkedNoticesPage.styles';
import NoticeCard from '../../components/Card/NoticeCard';
import { mapBackendList, MOCK_BACKEND_LATEST } from '../../data/notices';
import { useBookmark } from '../../hooks/useBookmark'; // 북마크 훅 import

export default function BookmarkedNoticesPage() {
  const { bookmarkedIds, toggleBookmark } = useBookmark();

  // 공고 데이터 (API 호출을 이미 커스텀 훅으로 처리한다면 그곳에서 읽어와도 됨)
  const notices = mapBackendList(MOCK_BACKEND_LATEST);

  // 북마크된 공고만 필터링
  const bookmarkedNotices = notices.filter((n) => bookmarkedIds.includes(n.id));

  return (
    <S.Stage>
      <S.Page>
        <S.Content>
          {bookmarkedNotices.length === 0 ? (
            <S.EmptyText>저장한 공고가 없습니다.</S.EmptyText>
          ) : (
            <S.ListContainer>
              {bookmarkedNotices.map((n) => (
                <NoticeCard
                  key={n.id}
                  {...n}
                  bookmarked={true} // 저장공고는 모두 북마크 상태
                  onToggleBookmark={() => toggleBookmark(n.id)} // 토글 콜백 전달
                />
              ))}
            </S.ListContainer>
          )}
        </S.Content>
      </S.Page>
    </S.Stage>
  );
}
