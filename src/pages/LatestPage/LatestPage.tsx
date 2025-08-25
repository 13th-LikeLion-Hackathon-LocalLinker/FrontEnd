// src/pages/Latest/LatestPage.tsx
import React from 'react';
import Layout from '../../layouts/layout';
import Pager from '../../components/Pager/Pager';
import NoticeCard from '../../components/Card/NoticeCard';
import { useLatest } from '../../hooks/useLatest';
import Fallback from '../../components/common/Fallback';

import FilterPanel from '../../components/FilterPanel/FilterPanel';
import PersonSwitch from '../../components/PersonSwitch/PersonSwitch';
import SortButtons from '../../components/SortButtons/SortButtons';
import { sortNotices } from '../../components/SortButtons/sort';
import type { SortKey } from '../../components/SortButtons/SortButtons.types';
import { VISA_OPTIONS, NATIONALITIES } from '../../constants/onboardingOptions';
import { loadOnboardingFilters } from '../../utils/onboarding';
import { normalizeVisa } from '../../utils/shared';

import type { FilterFormState, LatestPageProps } from './LatestPage.types';
import * as L from './LatestPage.styles';

const PAGE_SIZE = 6;

// 카테고리 페이지와 동일 규칙의 비자 포맷 정규화
const toVisaParam = (visaValue?: string): string | undefined => {
  if (!visaValue) return undefined;
  const n = normalizeVisa(visaValue) || visaValue;
  return n.trim().toUpperCase().replace(/-/g, '_').replace(/\s+/g, '');
};

export default function LatestPage({
  pageSize = 200,
  maxPages = 50,
}: LatestPageProps) {
  // 정렬
  const [sortKey, setSortKey] = React.useState<SortKey>('due');

  // 개인맞춤/필터 UI 상태
  const [personalOnly, setPersonalOnly] = React.useState(true);
  const [pending, setPending] = React.useState<FilterFormState>({
    visa: '',
    nation: '',
    married: '',
  });
  const [applied, setApplied] = React.useState<FilterFormState>({
    visa: '',
    nation: '',
    married: '',
  });

  const onboarding = loadOnboardingFilters(); // { visa, nation, married: 'true'|'false'|'' }
  const active = personalOnly ? onboarding : applied;

  // 서버로 넘길 실제 파라미터(국적은 제외)
  const visaParam = toVisaParam(active.visa);
  const marriedParam =
    active.married === '' ? undefined : active.married === 'true';

  // visa/married만 서버 필터로 전달 (카테고리 기준 없음)
  const { list, loading, error } = useLatest(pageSize, maxPages, {
    visa: visaParam,
    married: marriedParam,
  });

  // 정렬 적용
  const sorted = React.useMemo(
    () => sortNotices(list, sortKey),
    [list, sortKey],
  );

  // 페이지네이션
  const [page, setPage] = React.useState(1);
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const current = sorted.slice(start, start + PAGE_SIZE);

  const applyFilters = React.useCallback(() => {
    setApplied(pending);
    setPage(1);
  }, [pending]);

  const resetFilters = React.useCallback(() => {
    setPending({ visa: '', nation: '', married: '' });
  }, []);

  const togglePersonal = React.useCallback(() => {
    setPersonalOnly((v) => {
      if (v === true) setPending(applied); // OFF 전환 시 현재 적용값 프리필
      return !v;
    });
    setPage(1);
  }, [applied]);

  return (
    <Layout headerProps={{ type: 'detail', text: '최신 공고' }}>
      <div id="latest-top" />

      {/* 상단 카운트 */}
      <L.CountSection>
        <L.CountText>
          전체 <span className="total">{total}</span>건
        </L.CountText>
      </L.CountSection>

      {/* 컨트롤 바 */}
      <L.Controls>
        <PersonSwitch
          personalOnly={personalOnly}
          onSwitchPerson={togglePersonal}
        />
        <SortButtons
          sortKey={sortKey}
          onChangeSort={(k) => {
            setSortKey(k);
            setPage(1);
          }}
        />
      </L.Controls>

      {/* 개인맞춤 OFF일 때만 필터 노출 (국적은 UI-only) */}
      {!personalOnly && (
        <L.FilterWrap>
          <FilterPanel
            visa={pending.visa}
            nation={pending.nation} // UI-only
            married={pending.married}
            onChange={(patch) => setPending((f) => ({ ...f, ...patch }))}
            onReset={resetFilters}
            onSubmit={applyFilters}
            visaOptions={VISA_OPTIONS}
            nationalities={NATIONALITIES}
          />
        </L.FilterWrap>
      )}

      {/* 리스트 */}
      <L.ListSection>
        <Fallback
          loading={loading}
          error={error}
          empty={!loading && !error && current.length === 0}
          emptyText="공고가 아직 없습니다."
        >
          {current.map((n) => (
            <NoticeCard key={n.id} {...n} />
          ))}
        </Fallback>
      </L.ListSection>

      {!loading && !error && totalPages > 1 && (
        <div style={{ padding: '8px 0 16px' }}>
          <Pager page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      )}
    </Layout>
  );
}
