// 정렬 로직
import * as React from 'react';
import type { Notice } from '../../data/notices';
import { periodEndTs, periodStartTs, cmpAscSafe, cmpDescSafe } from '../../utils/dates';
import type { SortKey } from './SortButtons.types';

// 대한민국시간
const nowKST = () => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60_000;
  return utc + 9 * 60 * 60 * 1_000;
};

export function sortNotices(list: Notice[], key: SortKey, nowTs = nowKST()): Notice[] {
  const arr = [...list];

  if (key === 'due') {
    // 마감순: 마감 있는 공고 ↑우선 → 마감 임박(오름차순) → 시작 빠른 순
    arr.sort((a, b) => {
      const ae = periodEndTs(a.period);
      const be = periodEndTs(b.period);
      const aHas = Number.isFinite(ae);
      const bHas = Number.isFinite(be);

      if (aHas !== bHas) return aHas ? -1 : 1;
      if (aHas && bHas) {
        const byEnd = cmpAscSafe(ae, be);
        if (byEnd !== 0) return byEnd;
        return cmpAscSafe(periodStartTs(a.period), periodStartTs(b.period));
      }
      return cmpAscSafe(periodStartTs(a.period), periodStartTs(b.period));
    });
    return arr;
  }

  // 최신등록순
  arr.sort((a, b) => {
    const as = periodStartTs(a.period);
    const bs = periodStartTs(b.period);
    const aHas = Number.isFinite(as);
    const bHas = Number.isFinite(bs);
    if (aHas !== bHas) return aHas ? -1 : 1;
    if (!aHas && !bHas) return 0;

    const da = Math.abs((as as number) - nowTs);
    const db = Math.abs((bs as number) - nowTs);
    const near = cmpAscSafe(da, db);
    if (near !== 0) return near;

    const aFuture = (as as number) >= nowTs;
    const bFuture = (bs as number) >= nowTs;
    if (aFuture !== bFuture) return aFuture ? -1 : 1;

    return aFuture ? cmpAscSafe(as, bs) : cmpDescSafe(as, bs);
  });

  return arr;
}
