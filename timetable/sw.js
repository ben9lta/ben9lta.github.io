const CACHE_NAME = 'v8';
const CACHE_URLS = [
  '/timetable/offline.html',
  '/timetable/main.css',
  '/timetable/weeks.js',
  '/timetable/img/icons/favicon/favicon-16x16.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(CACHE_URLS)
    )
  );
});

this.addEventListener('activate', function(event) {
  var cacheWhitelist = ['v8'];

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

this.addEventListener('fetch', function(event) {
  var response;
  event.respondWith(caches.match(event.request).then(function() {
    return fetch(event.request);
  }).then(function(r) {
    response = r;
    caches.open('v8').then(function(cache) {
      cache.put(event.request, response);
    });
    return response.clone();
  }).catch(function() {
    return caches.match('/sw-test/offline.html');
  }));
});
// var MAX_AGE = 86400000;

// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     // ищем запрошенный ресурс среди закэшированных
//     caches.match(event.request).then(function (cachedResponse) {
//       var lastModified, fetchRequest;
//       // если ресурс есть в кэше
//       if (cachedResponse) {
//         // получаем дату последнего обновления
//         lastModified = new Date(cachedResponse.headers.get('last-modified'));
//         // и если мы считаем ресурс устаревшим
//         if (lastModified && (Date.now() - lastModified.getTime()) > MAX_AGE) {
//           fetchRequest = event.request.clone();
//           // создаём новый запрос
//           return fetch(fetchRequest).then(function (response) {
//             // при неудаче всегда можно выдать ресурс из кэша
//             if (!response || response.status !== 200) {
//               return cachedResponse;
//             }
//             // обновляем кэш
//             caches.open(CACHE_NAME).then(function (cache) {
//               cache.put(event.request, response.clone());
//             });
//             // возвращаем свежий ресурс
//             return response;
//           }).catch(function () {
//             return cachedResponse;
//           });
//         }
//         return cachedResponse;
//       }
//       // запрашиваем из сети как обычно
//       return fetch(event.request);
//     })
//   );
// });
