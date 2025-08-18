self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
});

self.addEventListener('fetch', (event) => {
  // 캐싱 필요 없으면 네트워크만 사용
});
