// src/pages/Bookmarked/BookmarkedNoticesPage.tsx
import React from 'react';
import * as S from './BookmarkedNoticesPage.styles';
import NoticeCard from '../../components/Card/NoticeCard';
import {
  mapBackendList,
  type BackendNotice,
  type Notice,
} from '../../data/notices';
import { useBookmark } from '../../hooks/useBookmark';
import { fetchJSON } from '../../apis/api'; // ← 모크 없는 실제 fetch
import { useNavigate } from 'react-router-dom';

export default function BookmarkedNoticesPage() {
  const navigate = useNavigate();
  const { bookmarkedIds, toggleBookmark } = useBookmark();
  const [list, setList] = React.useState<Notice[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleCardClick = (id: string | number) => {
    navigate(`/detail/${Number(id)}`);
  };

  React.useEffect(() => {
    const ac = new AbortController();

    // 북마크가 없으면 요청 안 함
    if (!bookmarkedIds || bookmarkedIds.length === 0) {
      setList([]);
      setLoading(false);
      setError(null);
      return () => ac.abort();
    }

    setLoading(true);
    setError(null);

    (async () => {
      try {
        // 서버에서 넉넉히 가져온 뒤 북마크로 필터
        const res: any = await fetchJSON('/api/postings/latest?limit=200', {
          signal: ac.signal,
        });
        console.log(res);
        const payload = Array.isArray(res)
          ? res
          : (res?.data ?? res?.content ?? res?.list ?? []);
        const arr: BackendNotice[] = Array.isArray(payload) ? payload : [];

        const all = mapBackendList(arr); // BackendNotice[] -> Notice[]
        const bookmarked = all.filter((n) =>
          bookmarkedIds.includes(String(n.id)),
        );

        if (!ac.signal.aborted) {
          setList(bookmarked);
          setLoading(false);
        }
      } catch (e: any) {
        if (e?.name === 'AbortError') return; // 개발모드 StrictMode에서 정상
        setError(e?.message ?? String(e));
        setList([]);
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [bookmarkedIds]);

  return (
    <S.Stage>
      <S.Page>
        <S.Content>
          {loading && <S.EmptyText>불러오는 중…</S.EmptyText>}
          {!loading && error && <S.EmptyText>오류: {error}</S.EmptyText>}
          {!loading && !error && list.length === 0 ? (
            <S.EmptyText>저장한 공고가 없습니다.</S.EmptyText>
          ) : (
            <S.ListContainer>
              {list.map((n) => (
                <NoticeCard
                  key={n.id}
                  {...n}
                  bookmarked={true}
                  onToggleBookmark={() => toggleBookmark(n.id)}
                  onClick={() => handleCardClick(n.id)}
                />
              ))}
            </S.ListContainer>
          )}
        </S.Content>
      </S.Page>
    </S.Stage>
  );
}
