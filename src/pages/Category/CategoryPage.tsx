import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Layout from '../../layouts/layout';
import NoticeCard from '../../components/Card/NoticeCard';
import Pager from '../../components/Pager/Pager';
import FabChat from '../../components/FabChat';
import * as L from './CategoryPage.styles';
import CategoryTabs from '../../components/CategoryTabs/CategoryTabs';
import Fallback from '../../components/common/Fallback';

import type { CategoryCode } from '../../types/category';
import {
  CATEGORY_LABELS,
  DEFAULT_CATEGORY,
  isCategoryCode,
} from '../../types/category';
import { CATEGORY_ORDER } from '../../constants/categories';
import { VISA_OPTIONS, NATIONALITIES } from '../../constants/onboardingOptions';
import { useCategoryResults } from '../../hooks/useCategoryResults';

import FilterPanel from '../../components/FilterPanel/FilterPanel';
import PersonSwitch from '../../components/PersonSwitch/PersonSwitch';
import SortButtons from '../../components/SortButtons/SortButtons';
import { sortNotices } from '../../components/SortButtons/sort';
import type { SortKey } from '../../components/SortButtons/SortButtons.types';

import { loadOnboardingFilters, type MarriedStr } from '../../utils/onboarding';
import { normalizeVisa } from '../../utils/shared';

const DEBUG = true;
const PAGE_SIZE = 6;

type Filters = { visa: string; nation: string; married: MarriedStr };

// 언더스코어 포맷 강제 (예: D_2, E_7)
const toVisaParam = (visaValue?: string): string | undefined => {
  if (!visaValue) return undefined;
  const n = normalizeVisa(visaValue) || visaValue;
  return n.trim().toUpperCase().replace(/-/g, '_').replace(/\s+/g, '');
};

export default function CategoryPage() {
  const navigate = useNavigate();
  const [sp, setSp] = useSearchParams();

  // 렌더 중 Router 업데이트 방지: 다음 틱에 반영
  const deferSetSp = useCallback(
    (updater: (prev: URLSearchParams) => URLSearchParams) => {
      setTimeout(() => {
        setSp((prev) => updater(new URLSearchParams(prev)));
      }, 0);
    },
    [setSp],
  );

  const raw = sp.get('category');
  const cat: CategoryCode = isCategoryCode(raw)
    ? (raw as CategoryCode)
    : DEFAULT_CATEGORY;

  const [personalOnly, setPersonalOnly] = useState(true); // ON이면 온보딩값 사용
  const [sortKey, setSortKey] = useState<SortKey>('due');

  // 입력/적용 분리
  const [pending, setPending] = useState<Filters>({
    visa: '',
    nation: '',
    married: '',
  });
  const [applied, setApplied] = useState<Filters>({
    visa: '',
    nation: '',
    married: '',
  });

  // 개인맞춤 ON이면 온보딩, OFF면 적용값
  const onboarding = loadOnboardingFilters(); // { visa, nation, married: 'true'|'false'|'' }
  const active = personalOnly ? onboarding : applied;

  const page = Math.max(1, parseInt(sp.get('page') || '1', 10));

  // ▶ 검색 눌렀을 때: applied로 확정 + 개인맞춤 OFF + page=1
  const applyFilters = useCallback(() => {
    if (DEBUG) console.log('[CategoryPage] applyFilters()', { pending });
    setApplied(pending);
    setPersonalOnly(false); // 검색 시 개인맞춤 끄기 (applied 사용)
    deferSetSp((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', '1');
      return next;
    });
  }, [pending, deferSetSp]);

  const resetFilters = useCallback(() => {
    if (DEBUG) console.log('[CategoryPage] resetFilters()');
    setPending({ visa: '', nation: '', married: '' });
  }, []);

  const togglePersonal = useCallback(() => {
    setPersonalOnly((prev) => {
      const nv = !prev;
      if (prev === true) setPending(applied); // OFF 전환 시 현재 적용값 프리필
      if (DEBUG)
        console.log('[CategoryPage] togglePersonal()', { from: prev, to: nv });
      return nv;
    });
    deferSetSp((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', '1');
      return next;
    });
  }, [applied, deferSetSp]);

  // 최종 파라미터 (국적/결혼여부는 전송하지 않음 = 보기용)
  const visaParam = toVisaParam(active.visa);

  if (DEBUG) {
    console.log('[CategoryPage] query params to hook', {
      category: cat,
      page: 0,
      size: 500,
      visa: visaParam,
      married: '(ignored in request)',
      rawActive: active,
    });
  }

  const {
    list: categoryList,
    loading,
    error,
  } = useCategoryResults({
    cat,
    page: 0,
    size: 500,
    visa: visaParam,
    // married는 더 이상 넘기지 않음
  } as const);

  // 'due' 정렬 결과가 비면 원본으로 폴백 (마감 null 대응)
  const sortedAll = useMemo(() => {
    const s = sortNotices(categoryList, sortKey);
    if (sortKey === 'due' && s.length === 0 && categoryList.length > 0) {
      if (DEBUG)
        console.log(
          '[CategoryPage] due sort empty → fallback to original list',
        );
      return categoryList;
    }
    return s;
  }, [categoryList, sortKey]);

  const total = sortedAll.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const current = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedAll.slice(start, start + PAGE_SIZE);
  }, [sortedAll, page]);

  // 리스트/정렬 변화로 totalPages가 줄면 page 보정
  useEffect(() => {
    if (page > totalPages) {
      deferSetSp((prev) => {
        const next = new URLSearchParams(prev);
        next.set('page', String(totalPages)); // 또는 '1'
        return next;
      });
    }
  }, [page, totalPages, deferSetSp]);

  const setPageSafe = (p: number) => {
    const np = Math.min(Math.max(1, p), totalPages);
    deferSetSp((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', String(np));
      return next;
    });
    requestAnimationFrame(() => {
      document
        .getElementById('top-anchor')
        ?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const goCategory = (nextCat: CategoryCode) => {
    if (DEBUG) console.log('[CategoryPage] goCategory()', { nextCat });
    deferSetSp((prev) => {
      const next = new URLSearchParams(prev);
      next.set('category', nextCat);
      next.set('page', '1');
      return next;
    });
    setSortKey('due');
  };

  // 빈 상태는 전체(total===0)로 판단
  const isEmptyAll = !loading && !error && total === 0;

  return (
    <Layout
      showHeader
      showFooter
      headerProps={{ type: 'detail', text: CATEGORY_LABELS[cat] }}
    >
      <div id="top-anchor" />
      <CategoryTabs active={cat} order={CATEGORY_ORDER} onChange={goCategory} />

      <L.Wrap>
        <L.CountBar>
          <b style={{ color: '#111827' }}>
            전체 <span style={{ color: '#0FB050' }}>{total}</span>건
          </b>
          {error && (
            <span style={{ color: 'crimson', marginLeft: 8 }}>
              에러: {error}
            </span>
          )}
        </L.CountBar>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 16px 8px',
          }}
        >
          <PersonSwitch
            personalOnly={personalOnly}
            onSwitchPerson={togglePersonal}
          />
          <SortButtons sortKey={sortKey} onChangeSort={setSortKey} />
        </div>

        {!personalOnly && (
          <FilterPanel
            visa={pending.visa}
            nation={pending.nation} // 보기용
            married={pending.married} // 보기용 (전송 안 함)
            onChange={(patch) => setPending((f) => ({ ...f, ...patch }))}
            onReset={resetFilters}
            onSubmit={applyFilters}
            // option value는 반드시 'D_2' / 'E_7' 같은 코드여야 함
            visaOptions={VISA_OPTIONS}
            nationalities={NATIONALITIES}
          />
        )}

        <L.List>
          <Fallback loading={loading} error={error} empty={isEmptyAll}>
            {current.map((n) => (
              <NoticeCard
                key={n.id}
                {...n}
                onClick={() => navigate(`/detail/${Number(n.id)}`)}
              />
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
