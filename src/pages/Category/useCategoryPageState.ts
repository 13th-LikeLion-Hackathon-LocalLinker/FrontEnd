import React from 'react';
import { useSearchParams } from 'react-router-dom';

import type { CategoryCode } from '../../types/category';
import {
  CATEGORY_LABELS,
  DEFAULT_CATEGORY,
  isCategoryCode,
} from '../../types/category';

import { useCategoryResults } from '../../hooks/useCategoryResults';
import { sortNotices } from '../../components/SortButtons/sort';
import type { SortKey } from '../../components/SortButtons/SortButtons.types';

import { loadOnboardingFilters, type MarriedStr } from '../../utils/onboarding';
import { toVisaParam } from './utils';

const DEBUG = false;
const PAGE_SIZE = 6;

type Filters = { visa: string; nation: string; married: MarriedStr };

function useDeferSetSearchParams(setSp: ReturnType<typeof useSearchParams>[1]) {
  return React.useCallback(
    (updater: (prev: URLSearchParams) => URLSearchParams) => {
      // 렌더 중 Router 업데이트 경고 방지: 다음 틱에 반영
      setTimeout(() => {
        setSp((prev) => updater(new URLSearchParams(prev)));
      }, 0);
    },
    [setSp],
  );
}

export function useCategoryPageState() {
  const [sp, setSp] = useSearchParams();
  const deferSetSp = useDeferSetSearchParams(setSp);

  // 현재 카테고리
  const raw = sp.get('category');
  const cat: CategoryCode = isCategoryCode(raw)
    ? (raw as CategoryCode)
    : DEFAULT_CATEGORY;

  const headerTitle = CATEGORY_LABELS[cat];

  // 페이지 (1-based)
  const pageParam = Math.max(1, parseInt(sp.get('page') || '1', 10));
  const [page, setPage] = React.useState<number>(pageParam);

  React.useEffect(() => {
    // URL이 바뀌면 로컬 상태 동기화
    setPage(pageParam);
  }, [pageParam]);

  // 개인맞춤/정렬
  const [personalOnly, setPersonalOnly] = React.useState(true);
  const [sortKey, setSortKey] = React.useState<SortKey>('due');

  // 필터 입력/적용 분리
  const [pending, setPending] = React.useState<Filters>({
    visa: '',
    nation: '',
    married: '',
  });
  const [applied, setApplied] = React.useState<Filters>({
    visa: '',
    nation: '',
    married: '',
  });

  // 온보딩 기반 활성 필터
  const onboarding = loadOnboardingFilters(); // { visa, nation, married }
  const active = personalOnly ? onboarding : applied;

  // 최종 요청 파라미터: 비자만 전송 (국적/결혼은 보기용)
  const visaParam = toVisaParam(active.visa);

  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.log('[Category][request params]', {
      category: cat,
      page: 0,
      size: 500,
      visa: visaParam,
      married: '(ignored)',
      rawActive: active,
    });
  }

  // 데이터 로딩
  const {
    list: categoryList,
    loading,
    error,
  } = useCategoryResults({
    cat,
    page: 0,
    size: 500,
    visa: visaParam,
  } as const);

  // 정렬 + due 폴백
  const sortedAll = React.useMemo(() => {
    const s = sortNotices(categoryList, sortKey);
    if (sortKey === 'due' && s.length === 0 && categoryList.length > 0) {
      if (DEBUG) console.log('[Category] due sort empty → fallback original');
      return categoryList;
    }
    return s;
  }, [categoryList, sortKey]);

  // 페이지네이션
  const total = sortedAll.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const current = React.useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedAll.slice(start, start + PAGE_SIZE);
  }, [sortedAll, page]);

  // 리스트/정렬 변화 시 페이지 보정
  React.useEffect(() => {
    if (page > totalPages) {
      deferSetSp((prev) => {
        const next = new URLSearchParams(prev);
        next.set('page', String(totalPages));
        return next;
      });
    }
  }, [page, totalPages, deferSetSp]);

  // 액션들
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
    if (DEBUG) console.log('[Category] goCategory()', { nextCat });
    deferSetSp((prev) => {
      const next = new URLSearchParams(prev);
      next.set('category', nextCat);
      next.set('page', '1');
      return next;
    });
    setSortKey('due');
  };

  const togglePersonal = React.useCallback(() => {
    setPersonalOnly((prev) => {
      const nv = !prev;
      if (prev === true) setPending(applied); // OFF 전환 시 현재 적용값 프리필
      if (DEBUG)
        console.log('[Category] togglePersonal()', { from: prev, to: nv });
      return nv;
    });
    deferSetSp((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', '1');
      return next;
    });
  }, [applied, deferSetSp]);

  const applyFilters = React.useCallback(() => {
    if (DEBUG) console.log('[Category] applyFilters()', { pending });
    setApplied(pending);
    setPersonalOnly(false); // 검색 시 개인맞춤 OFF
    deferSetSp((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', '1');
      return next;
    });
  }, [pending, deferSetSp]);

  const resetFilters = React.useCallback(() => {
    if (DEBUG) console.log('[Category] resetFilters()');
    setPending({ visa: '', nation: '', married: '' });
  }, []);

  return {
    // 데이터/상태
    cat,
    headerTitle,
    loading,
    error,
    total,
    totalPages,
    current,

    // 탭/페이지
    page,
    setPageSafe,
    goCategory,

    // 개인맞춤/정렬
    personalOnly,
    togglePersonal,
    sortKey,
    setSortKey,

    // 필터
    pending,
    setPending,
    resetFilters,
    applyFilters,
  };
}
