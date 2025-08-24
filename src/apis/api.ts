// src/lib/api.ts
export async function fetchJSON<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(input, {
    // 캐시/서비스워커 영향 차단
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      Pragma: 'no-cache',
      ...(init?.headers || {}),
    },
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
