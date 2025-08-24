export const BASE_URL: string =
  (process.env.REACT_APP_BASE_URL as string | undefined) || 'http://localhost:8080';

/** 상대 경로('/api/...')를 절대 URL(BASE_URL + path)로 변환 */
export function withBase(input: RequestInfo | URL): RequestInfo | URL {
  if (typeof input === 'string') {
    if (/^https?:\/\//i.test(input)) return input; // 이미 절대 URL이면 그대로
    const base = BASE_URL.replace(/\/$/, '');
    const path = input.replace(/^\//, '');
    return `${base}/${path}`;
  }
  return input;
}
