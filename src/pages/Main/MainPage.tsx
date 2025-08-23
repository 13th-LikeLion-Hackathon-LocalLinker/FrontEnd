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
import FabChat from '../../components/FabChat';
import { useLatest } from '../../hooks/useLatest';
import { useDue } from '../../hooks/useDue';
import Fallback from '../../components/common/Fallback';

export default function MainPage() {
  const { list: latest, loading: lLoading, error: lError } = useLatest(50);
  const { list: due, loading: dLoading, error: dError } = useDue(200);

  return (
    <S.Stage>
      <S.Page>
        <S.Content>
          <div id="top" />
          <SearchBar />
          <Banner />
          <QuickActions />

          <SectionHeader title="최신 공고" to="/postings/latest" />
          <SectionList>
            <Fallback
              loading={lLoading}
              error={lError}
              empty={!lLoading && !lError && latest.slice(0, 3).length === 0}
            >
              {latest.slice(0, 3).map((n) => (
                <NoticeCard key={n.id} {...n} />
              ))}
            </Fallback>
          </SectionList>

          <SectionHeader title="마감 임박 공고" to="/postings/due" />
          <SectionList>
            <Fallback
              loading={dLoading}
              error={dError}
              empty={!dLoading && !dError && due.slice(0, 3).length === 0}
            >
              {due.slice(0, 3).map((n) => (
                <NoticeCard key={n.id} {...n} />
              ))}
            </Fallback>
          </SectionList>
        </S.Content>

        <FabChat />
      </S.Page>
    </S.Stage>
  );
}
