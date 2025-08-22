// src/lib/api.ts
export async function fetchJSON<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(input, {
    headers: { Accept: 'application/json', ...(init?.headers || {}) },
    ...init,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    console.error(
      '[API ERROR]',
      res.status,
      res.statusText,
      String(input),
      body,
    );
    throw new Error(`HTTP ${res.status}`);
  }

  try {
    return (await res.json()) as T;
  } catch (e) {
    console.error('[API PARSE ERROR]', String(input), e);
    throw e;
  }
}
/** 서버 실패 시 목업을 반환. usedMock 플래그로 구분 가능 */
export async function fetchJSONOrMock<T>(
  input: RequestInfo | URL,
  init: RequestInit | undefined,
  mock: T,
): Promise<{ data: T; usedMock: boolean }> {
  try {
    const data = await fetchJSON<T>(input, init);
    return { data, usedMock: false };
  } catch (e) {
    console.warn('[API FALLBACK -> MOCK]', String(input), e);
    return { data: mock, usedMock: true };
  }
}
