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

const toVisaParam = (visaValue?: string): string | undefined => {
  if (!visaValue) return undefined;
  const n = normalizeVisa(visaValue) || visaValue;
  return n.trim().toUpperCase().replace(/-/g, '_').replace(/\s+/g, '');
};

export default function LatestPage({ pageSize = 200, maxPages = 50 }: LatestPageProps) {
  const [sortKey, setSortKey] = React.useState<SortKey>('due');
  const [personalOnly, setPersonalOnly] = React.useState(true);
  const [pending, setPending] = React.useState<FilterFormState>({ visa: '', nation: '', married: '' });
  const [applied, setApplied] = React.useState<FilterFormState>({ visa: '', nation: '', married: '' });

  const onboarding = loadOnboardingFilters(); // { visa, nation, married }
  const active = personalOnly ? onboarding : applied;

  const visaParam = toVisaParam(active.visa); // 서버엔 비자만 전달
  const { list, loading, error } = useLatest(pageSize, maxPages, { visa: visaParam });

  const sorted = React.useMemo(() => sortNotices(list, sortKey), [list, sortKey]);

  const [page, setPage] = React.useState(1);
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const current = sorted.slice(start, start + PAGE_SIZE);

  React.useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const applyFilters = React.useCallback(() => {
    setApplied(pending);
    setPersonalOnly(false);
    setPage(1);
  }, [pending]);

  const resetFilters = React.useCallback(() => {
    setPending({ visa: '', nation: '', married: '' });
  }, []);

  const togglePersonal = React.useCallback(() => {
    setPersonalOnly((v) => {
      if (v) setPending(applied); // OFF 전환 시 현재 적용값 프리필
      return !v;
    });
    setPage(1);
  }, [applied]);

  const isEmptyAll = !loading && !error && total === 0;

  return (
    <Layout headerProps={{ type: 'detail', text: '최신 공고' }}>

      <L.Container>
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
      </L.Container>

      <div id="latest-top" />

      <L.CountSection>
        <L.CountText>
          전체 <span className="total">{total}</span>건
        </L.CountText>
      </L.CountSection>

      <L.Controls>
        <PersonSwitch personalOnly={personalOnly} onSwitchPerson={togglePersonal} />
        <SortButtons
          sortKey={sortKey}
          onChangeSort={(k) => {
            setSortKey(k);
            setPage(1);
          }}
        />
      </L.Controls>

      {!personalOnly && (
        <L.FilterWrap>
          <FilterPanel
            visa={pending.visa}
            nation={pending.nation}   // UI-only
            married={pending.married} // UI-only
            onChange={(patch) => setPending((f) => ({ ...f, ...patch }))}
            onReset={resetFilters}
            onSubmit={applyFilters}
            visaOptions={VISA_OPTIONS}
            nationalities={NATIONALITIES}
          />
        </L.FilterWrap>
      )}

      <L.ListSection>
        <Fallback loading={loading} error={error} empty={isEmptyAll} emptyText="공고가 아직 없습니다.">
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
