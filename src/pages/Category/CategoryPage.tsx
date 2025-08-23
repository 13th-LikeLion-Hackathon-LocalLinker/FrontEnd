// src/pages/Category/CategoryPage.tsx
import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../../layouts/layout';
import NoticeCard from '../../components/Card/NoticeCard';
import Pager from '../../components/Pager/Pager';
import FabChat from '../../components/FabChat';
import type { CategoryCode } from '../../types/category';
import {
  CATEGORY_LABELS,
  DEFAULT_CATEGORY,
  isCategoryCode,
} from '../../types/category';
import * as L from './CategoryPage.styles';
import Fallback from '../../components/common/Fallback';
import CategoryTabs from '../../components/CategoryTabs/CategoryTabs';
import { CATEGORY_ORDER } from '../../constants/categories';
import Line from '../../components/Line/Line';
import { useCategoryResults } from '../../hooks/useCategoryResults';
import { VISA_OPTIONS, NATIONALITIES } from '../../constants/onboardingOptions';

const PAGE_SIZE = 6;

/* ---------- 상단 토글/정렬 ---------- */
const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px 8px;
`;
const PersonalWrap = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 13px;
`;
const Switch = styled.button<{ $on: boolean }>`
  width: 44px;
  height: 24px;
  border-radius: 999px;
  border: 0;
  padding: 2px;
  cursor: pointer;
  background: ${(p) => (p.$on ? '#10B981' : '#E5E7EB')};
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${(p) => (p.$on ? '22px' : '2px')};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ffffff;
    transition: left 120ms ease;
  }
`;
const SortWrap = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
`;
const SortItem = styled.button<{ $active: boolean }>`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${(p) => (p.$active ? '#111827' : '#9CA3AF')};
  font-weight: ${(p) => (p.$active ? 600 : 500)};
`;

/* ---------- 검색 패널(UI) ---------- */
const FilterCard = styled.div`
  margin: 8px 16px 12px;
  padding: 14px 12px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 0 0 1px #e5e7eb inset;
`;
const Field = styled.div`
  display: grid;
  grid-template-columns: 88px 1fr;
  align-items: center;
  column-gap: 12px;
  row-gap: 10px;
  & + & {
    margin-top: 10px;
  }
  label {
    color: #374151;
    font-size: 13px;
  }
`;
const Inline = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Select = styled.select`
  height: 36px;
  padding: 0 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 13px;
  background: #fff;
  flex: 1 1 auto;
`;
const Radio = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #4b5563;
  font-size: 13px;
`;
const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 12px;
`;
const GhostBtn = styled.button`
  height: 40px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-weight: 600;
  color: #6b7280;
  cursor: pointer;
`;
const PrimaryBtn = styled.button`
  height: 40px;
  background: #10b981;
  border: 1px solid #10b981;
  border-radius: 10px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
`;

/* ---------- 날짜 파싱 & 안전 비교 ---------- */
function toTsFromYYMMDD(s?: string): number | undefined {
  if (!s) return undefined;
  const m = s.trim().match(/^(\d{2})\.(\d{2})\.(\d{2})$/);
  if (!m) return undefined;
  const yy = Number(m[1]);
  const yyyy = 2000 + yy;
  const mm = Number(m[2]) - 1;
  const dd = Number(m[3]);
  const t = new Date(yyyy, mm, dd).getTime();
  return Number.isNaN(t) ? undefined : t;
}
function periodEndTs(period: string): number {
  const parts = period.split('~');
  if (parts.length < 2) return Number.POSITIVE_INFINITY;
  const end = (parts[1] ?? '').trim();
  if (!end || end === '미정' || end === '상시') return Number.POSITIVE_INFINITY;
  const t = toTsFromYYMMDD(end);
  return t ?? Number.POSITIVE_INFINITY;
}
function periodStartTs(period: string): number {
  const start = (period.split('~')[0] ?? '').trim();
  if (!start || start === '미정' || start === '상시')
    return Number.NEGATIVE_INFINITY;
  const t = toTsFromYYMMDD(start);
  return t ?? Number.NEGATIVE_INFINITY;
}
function cmpAscSafe(a: number, b: number) {
  if (a === b) return 0;
  const aInf = !Number.isFinite(a);
  const bInf = !Number.isFinite(b);
  if (aInf && bInf) return 0;
  if (aInf) return a === Number.NEGATIVE_INFINITY ? -1 : 1;
  if (bInf) return b === Number.NEGATIVE_INFINITY ? 1 : -1;
  return a < b ? -1 : 1;
}
function cmpDescSafe(a: number, b: number) {
  if (a === b) return 0;
  const aInf = !Number.isFinite(a);
  const bInf = !Number.isFinite(b);
  if (aInf && bInf) return 0;
  if (aInf) return a === Number.NEGATIVE_INFINITY ? 1 : -1;
  if (bInf) return b === Number.NEGATIVE_INFINITY ? -1 : 1;
  return a > b ? -1 : 1;
}

/** 국적 → 언어코드 */
const NATION_TO_LANGUAGE: Record<
  string,
  'KO' | 'EN' | 'UZ' | 'JA' | 'ZH' | 'TH' | 'VI'
> = {
  미국: 'EN',
  중국: 'ZH',
  베트남: 'VI',
  태국: 'TH',
  일본: 'JA',
  우즈베키스탄: 'UZ',
};

type SortKey = 'due' | 'latest';
type MarriedStr = '' | 'true' | 'false';

/** 온보딩 저장값 로딩(프로젝트 키명에 맞게 필요시 수정) */
function readLS(keys: string[]): string | null {
  for (const k of keys) {
    const v = localStorage.getItem(k);
    if (v && v !== 'null' && v !== 'undefined') return v;
  }
  return null;
}
function loadOnboardingFilters(): {
  visa: string;
  nation: string;
  married: MarriedStr;
} {
  const visa = readLS(['onboardingVisa', 'visa']) ?? '';
  const nation = readLS(['onboardingNation', 'nation']) ?? '';
  const marriedRaw = readLS(['onboardingMarried', 'married']);
  const married: MarriedStr =
    marriedRaw === 'true' ? 'true' : marriedRaw === 'false' ? 'false' : '';
  return { visa, nation, married };
}

export default function CategoryPage() {
  const [sp, setSp] = useSearchParams();
  const raw = sp.get('category');
  const cat: CategoryCode = isCategoryCode(raw)
    ? (raw as CategoryCode)
    : DEFAULT_CATEGORY;

  // 개인 맞춤 / 정렬
  const [personalOnly, setPersonalOnly] = useState(true); // ON: 온보딩값, OFF: 화면 필터
  const [sortKey, setSortKey] = useState<SortKey>('due');

  // OFF(수동 선택)용 필터 상태
  const [filters, setFilters] = useState<{
    visa: string;
    nation: string;
    married: MarriedStr;
  }>({
    visa: '',
    nation: '',
    married: '',
  });

  // ON에서 사용할 온보딩 저장값
  const onboarding = loadOnboardingFilters();

  // 실제 요청에 사용할 조건: ON=온보딩, OFF=수동
  const active = personalOnly ? onboarding : filters;

  // /api/postings/category 호출 (훅 내부에서 서버 실패 시 목업으로 폴백)
  const {
    list: categoryList,
    loading,
    error,
  } = useCategoryResults({
    cat,
    page: 0,
    size: 500,
    visa: active.visa || undefined,
    language: active.nation ? NATION_TO_LANGUAGE[active.nation] : undefined,
    married: active.married === '' ? undefined : active.married === 'true',
  });

  // 페이지네이션
  const page = Math.max(1, parseInt(sp.get('page') || '1', 10));

  // 정렬 적용
  const sortedAll = useMemo(() => {
    const base = [...categoryList];
    if (sortKey === 'due') {
      base.sort((a, b) =>
        cmpAscSafe(periodEndTs(a.period), periodEndTs(b.period)),
      );
    } else {
      base.sort((a, b) =>
        cmpDescSafe(periodStartTs(a.period), periodStartTs(b.period)),
      );
    }
    return base;
  }, [categoryList, sortKey]);

  const total = sortedAll.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const current = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedAll.slice(start, start + PAGE_SIZE);
  }, [sortedAll, page]);

  const setPageSafe = (p: number) => {
    const np = Math.min(Math.max(1, p), totalPages);
    setSp((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', String(np));
      return next;
    });
    requestAnimationFrame(() =>
      document
        .getElementById('top-anchor')
        ?.scrollIntoView({ behavior: 'smooth' }),
    );
  };

  const goCategory = (nextCat: CategoryCode) => {
    setSp((prev) => {
      const next = new URLSearchParams(prev);
      next.set('category', nextCat);
      next.set('page', '1');
      return next;
    });
    setSortKey('due');
  };

  const resetFilters = () => setFilters({ visa: '', nation: '', married: '' });

  return (
    <Layout
      showHeader
      showFooter
      headerProps={{ type: 'detail', text: CATEGORY_LABELS[cat] }}
    >
      <div id="top-anchor" />

      {/* 카테고리 탭 + 구분선 */}
      <CategoryTabs active={cat} order={CATEGORY_ORDER} onChange={goCategory} />
      <Line />

      <L.Wrap>
        {/* 상단 건수 */}
        <L.CountBar>
          <b style={{ color: '#111827' }}>전체 {total}건</b>
          {error && (
            <span style={{ color: 'crimson', marginLeft: 8 }}>
              에러: {error}
            </span>
          )}
        </L.CountBar>

        {/* 개인 맞춤 토글 + 정렬 */}
        <Controls>
          <PersonalWrap>
            <span>개인 맞춤 공고만</span>
            <Switch
              $on={personalOnly}
              aria-pressed={personalOnly}
              onClick={() => setPersonalOnly((v) => !v)}
            />
          </PersonalWrap>

          <SortWrap role="tablist" aria-label="정렬">
            <SortItem
              $active={sortKey === 'due'}
              onClick={() => setSortKey('due')}
              aria-pressed={sortKey === 'due'}
            >
              마감순
            </SortItem>
            <span style={{ color: '#e5e7eb' }}>|</span>
            <SortItem
              $active={sortKey === 'latest'}
              onClick={() => setSortKey('latest')}
              aria-pressed={sortKey === 'latest'}
            >
              최신등록순
            </SortItem>
          </SortWrap>
        </Controls>

        {/* 스위치 OFF → 검색 패널(같은 /category 파라미터로 전송) */}
        {!personalOnly && (
          <FilterCard>
            <Field>
              <label>체류자격(비자)</label>
              <Select
                value={filters.visa}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, visa: e.target.value }))
                }
              >
                <option value="">전체</option>
                {VISA_OPTIONS.map((v) => (
                  <option key={v.value} value={v.value}>
                    {v.label}
                  </option>
                ))}
              </Select>
            </Field>

            <Field>
              <label>국적</label>
              <Select
                value={filters.nation}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, nation: e.target.value }))
                }
              >
                <option value="">전체</option>
                {NATIONALITIES.map((n) => (
                  <option key={n.value} value={n.value}>
                    {n.label}
                  </option>
                ))}
              </Select>
            </Field>

            <Field>
              <label>결혼여부</label>
              <Inline>
                <Radio>
                  <input
                    type="radio"
                    name="married"
                    value="true"
                    checked={filters.married === 'true'}
                    onChange={() =>
                      setFilters((f) => ({ ...f, married: 'true' }))
                    }
                  />
                  기혼
                </Radio>
                <Radio>
                  <input
                    type="radio"
                    name="married"
                    value="false"
                    checked={filters.married === 'false'}
                    onChange={() =>
                      setFilters((f) => ({ ...f, married: 'false' }))
                    }
                  />
                  비혼
                </Radio>
                <Radio style={{ marginLeft: 8 }}>
                  <input
                    type="radio"
                    name="married"
                    value=""
                    checked={filters.married === ''}
                    onChange={() => setFilters((f) => ({ ...f, married: '' }))}
                  />
                  전체
                </Radio>
              </Inline>
            </Field>

            <Actions>
              <GhostBtn onClick={resetFilters}>초기화</GhostBtn>
              <PrimaryBtn
                onClick={() => {
                  /* 변경 즉시 훅에 반영되므로 별도 submit 불필요 */
                }}
              >
                검색
              </PrimaryBtn>
            </Actions>
          </FilterCard>
        )}

        {/* 리스트 */}
        <L.List>
          <Fallback
            loading={loading}
            error={error}
            empty={!loading && !error && current.length === 0}
          >
            {current.map((n) => (
              <NoticeCard key={n.id} {...n} />
            ))}
          </Fallback>
        </L.List>

        {!loading && !error && totalPages > 1 && (
          <Pager page={page} totalPages={totalPages} onChange={setPageSafe} />
        )}
      </L.Wrap>

      <FabChat />
    </Layout>
  );
}
