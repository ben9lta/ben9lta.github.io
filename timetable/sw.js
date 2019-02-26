const CACHE_NAME = 'v6';
const CACHE_URLS = [
  '/timetable/offline.html',
  '/timetable/main.css',
  '/timetable/weeks.js',
  '/timetable/img/icons/favicon/favicon-16x16.png',
];

const expectedCaches = [
  'movies-static-v1',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(CACHE_URLS)
    )
  );
});

// once a new Service Worker has installed & a previous version isn't
// being used, the new one activates so we can clean-up & migrate
// self.addEventListener('activate', (event) => {
//   // remove caches beginning "movies-" that aren't in
//   // expectedCaches
//   event.waitUntil(
//     caches.keys().then((cacheNames) =>
//       Promise.all(
//         cacheNames.map((cacheName) => {
//           if (/^timestamp-/.test(cacheName)) {
//             if (CACHE_NAME.indexOf(cacheName) === -1) {
//               return caches.delete(cacheName);
//             }
//           }

//           return null;
//         })
//       )
//     ));
// });

this.addEventListener('activate', function(event) {
  var cacheWhitelist = ['v6'];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});


var MAX_AGE = 86400000;

self.addEventListener('fetch', function (event) {
  event.respondWith(
    // ищем запрошенный ресурс среди закэшированных
    caches.match(event.request).then(function (cachedResponse) {
      var lastModified, fetchRequest;
      // если ресурс есть в кэше
      if (cachedResponse) {
        // получаем дату последнего обновления
        lastModified = new Date(cachedResponse.headers.get('last-modified'));
        // и если мы считаем ресурс устаревшим
        if (lastModified && (Date.now() - lastModified.getTime()) > MAX_AGE) {
          fetchRequest = event.request.clone();
          // создаём новый запрос
          return fetch(fetchRequest).then(function (response) {
            // при неудаче всегда можно выдать ресурс из кэша
            if (!response || response.status !== 200) {
              return cachedResponse;
            }
            // обновляем кэш
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, response.clone());
            });
            // возвращаем свежий ресурс
            return response;
          }).catch(function () {
            return cachedResponse;
          });
        }
        return cachedResponse;
      }
      // запрашиваем из сети как обычно
      return fetch(event.request);
    })
  );
});