/** "YY.MM.DD" → timestamp */
export function toTsFromYYMMDD(s?: string): number | undefined {
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

export function periodEndTs(period: string): number {
  const parts = period.split('~');
  if (parts.length < 2) return Number.POSITIVE_INFINITY;
  const end = (parts[1] ?? '').trim();
  if (!end || end === '미정' || end === '상시') return Number.POSITIVE_INFINITY;
  const t = toTsFromYYMMDD(end);
  return t ?? Number.POSITIVE_INFINITY;
}

export function periodStartTs(period: string): number {
  const start = (period.split('~')[0] ?? '').trim();
  if (!start || start === '미정' || start === '상시')
    return Number.NEGATIVE_INFINITY;
  const t = toTsFromYYMMDD(start);
  return t ?? Number.NEGATIVE_INFINITY;
}

export function cmpAscSafe(a: number, b: number) {
  if (a === b) return 0;
  const aInf = !Number.isFinite(a);
  const bInf = !Number.isFinite(b);
  if (aInf && bInf) return 0;
  if (aInf) return a === Number.NEGATIVE_INFINITY ? -1 : 1;
  if (bInf) return b === Number.NEGATIVE_INFINITY ? 1 : -1;
  return a < b ? -1 : 1;
}

export function cmpDescSafe(a: number, b: number) {
  if (a === b) return 0;
  const aInf = !Number.isFinite(a);
  const bInf = !Number.isFinite(b);
  if (aInf && bInf) return 0;
  if (aInf) return a === Number.NEGATIVE_INFINITY ? 1 : -1;
  if (bInf) return b === Number.NEGATIVE_INFINITY ? -1 : 1;
  return a > b ? -1 : 1;
}
