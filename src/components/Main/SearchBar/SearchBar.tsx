import React from 'react';
import * as S from './SearchBar.styles';
import searchIcon from '../../../assets/icons/main/search.svg';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <S.Box>
      <S.Field>
        <S.Input
          placeholder="검색어를 입력해주세요"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <S.SearchIcon src={searchIcon} alt="Search" />
      </S.Field>
    </S.Box>
  );
}
