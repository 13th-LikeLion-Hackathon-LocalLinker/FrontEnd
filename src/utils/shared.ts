// 공용 유틸 = 비자 정규화랑 쿼리스트링 빌더

export function normalizeVisa(val?: string): string | undefined {
  if (!val) return undefined;
  return val.replace(/\s+/g, '').replace('-', '_').toUpperCase();
}

export function buildQS(params: Record<string, unknown>) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === null || v === undefined) return;
    qs.set(k, String(v));
  });
  return qs.toString();
}
