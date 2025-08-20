import React from 'react';
import * as S from './SearchBar.styles';
import searchIcon from '../../../assets/icons/main/search.svg';

export default function SearchBar() {
  return (
    <S.Box>
      <S.Field>
        <S.Input placeholder="검색어를 입력해주세요" />
        <S.SearchIcon src={searchIcon} alt="Search" />
      </S.Field>
    </S.Box>
  );
}
