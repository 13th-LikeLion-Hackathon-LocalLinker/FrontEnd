// src/pages/Category/components/FilterPanel.tsx
import React from 'react';
import * as S from './FilterPanel.styles';
import type { FilterPanelProps } from './FilterPanel.types';

export default function FilterPanel({
  visa,
  nation,
  married,
  onChange,
  onReset,
  visaOptions,
  nationalities,
}: FilterPanelProps) {
  return (
    <S.Card>
      <S.Field>
        <label>체류자격(비자)</label>
        <S.Select
          value={visa}
          onChange={(e) => onChange({ visa: e.target.value })}
        >
          <option value="">비자 선택</option>
          {visaOptions.map((v) => (
            <option key={v.value} value={v.value}>
              {v.label}
            </option>
          ))}
        </S.Select>
      </S.Field>

      <S.Field>
        <label>국적</label>
        <S.Select
          value={nation}
          onChange={(e) => onChange({ nation: e.target.value })}
        >
          <option value="">국적 선택 </option>
          {nationalities.map((n) => (
            <option key={n.value} value={n.value}>
              {n.label}
            </option>
          ))}
        </S.Select>
      </S.Field>

      <S.Field>
        <label>결혼여부</label>
        <S.Inline>
          <S.Radio>
            <input
              type="radio"
              name="married"
              value="true"
              checked={married === 'true'}
              onChange={() => onChange({ married: 'true' })}
            />
            기혼
          </S.Radio>
          <S.Radio>
            <input
              type="radio"
              name="married"
              value="false"
              checked={married === 'false'}
              onChange={() => onChange({ married: 'false' })}
            />
            비혼
          </S.Radio>
        </S.Inline>
      </S.Field>

      <S.Actions>
        <S.GhostBtn onClick={onReset}>초기화</S.GhostBtn>
        <S.PrimaryBtn
          onClick={() => {
            /* 훅이 즉시 반영하므로 submit 불필요 */
          }}
        >
          검색
        </S.PrimaryBtn>
      </S.Actions>
    </S.Card>
  );
}
