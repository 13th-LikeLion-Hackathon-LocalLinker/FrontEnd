import React from 'react';
import * as S from './MainPage.styles';
import SearchBar from '../../components/Main/SearchBar/SearchBar';
import Banner from '../../components/Main/Banner/Banner';
import QuickActions from '../../components/Main/QuickActions/QuickActions';
import {
  SectionHeader,
  SectionList,
} from '../../components/Main/Section/Section';
import NoticeCard from '../../components/Card/NoticeCard';
import { useNavigate } from 'react-router-dom';
import FabChat from '../../components/FabChat';
import { useLatest } from '../../hooks/useLatest';
import { useDue } from '../../hooks/useDue';
import Fallback from '../../components/common/Fallback';

import { useBookmark } from '../../hooks/useBookmark';

export default function MainPage() {
  const { list: latest, loading: lLoading, error: lError } = useLatest(50);
  const { list: due, loading: dLoading, error: dError } = useDue(200);
  const { bookmarkedIds, toggleBookmark } = useBookmark();
  const navigate = useNavigate();

  const [search, setSearch] = React.useState('');

  const handleCardClick = (id: string | number) => {
    navigate(`/detail/${Number(id)}`);
  };

  // 검색 필터링 (제목/부서/기간/카테고리 등 원하는 필드 추가)
  const filteredLatest = latest.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      (n.dept && n.dept.toLowerCase().includes(search.toLowerCase())) ||
      (n.category && n.category.toLowerCase().includes(search.toLowerCase())),
  );
  const filteredDue = due.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      (n.dept && n.dept.toLowerCase().includes(search.toLowerCase())) ||
      (n.category && n.category.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <S.Stage>
      <S.Page>
        <S.Content>
          <div id="top" />
          <SearchBar value={search} onChange={setSearch} />
          <Banner />
          <QuickActions />

          <SectionHeader title="최신 공고" to="/postings/latest" />
          <SectionList>
            <Fallback
              loading={lLoading}
              error={lError}
              empty={
                !lLoading && !lError && filteredLatest.slice(0, 3).length === 0
              }
            >
              {filteredLatest.slice(0, 3).map((n) => (
                <NoticeCard
                  key={n.id}
                  {...n}
                  bookmarked={bookmarkedIds.includes(n.id)}
                  onToggleBookmark={() => toggleBookmark(n.id)}
                  onClick={() => handleCardClick(n.id)}
                />
              ))}
            </Fallback>
          </SectionList>

          <SectionHeader title="마감 임박 공고" to="/postings/due" />
          <SectionList>
            <Fallback
              loading={dLoading}
              error={dError}
              empty={
                !dLoading && !dError && filteredDue.slice(0, 3).length === 0
              }
            >
              {filteredDue.slice(0, 3).map((n) => (
                <NoticeCard
                  key={n.id}
                  {...n}
                  bookmarked={bookmarkedIds.includes(n.id)}
                  onToggleBookmark={() => toggleBookmark(n.id)}
                  onClick={() => handleCardClick(n.id)}
                />
              ))}
            </Fallback>
          </SectionList>
        </S.Content>

        <FabChat />
      </S.Page>
    </S.Stage>
  );
}
