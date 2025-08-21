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
import { latest, dueSoon } from '../../data/notices';
import FabChat from '../../components/FabChat';

//...
export default function MainPage() {
  return (
    <S.Stage>
      <S.Page>
        <S.Content>
          <div id="top" />
          <SearchBar />
          <Banner />
          <QuickActions />

          <SectionHeader title="최신 공고" />
          <SectionList>
            {latest.map((n) => (
              <NoticeCard key={n.id} {...n} />
            ))}
          </SectionList>

          <SectionHeader title="마감 임박 공고" />
          <SectionList>
            {dueSoon.map((n) => (
              <NoticeCard key={n.id} {...n} />
            ))}
          </SectionList>
        </S.Content>

        <FabChat />
      </S.Page>
    </S.Stage>
  );
}
