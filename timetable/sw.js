const CACHE_NAME = 'timestamp-v4';
const CACHE_URLS = [
  '/timestamp/offline.html',
  '/timestamp/main.css',
  '/timestamp/weeks.js',
  '/timestamp/img/icons/favicon/favicon-16x16.png',
];


// addEventListener('install', installEvent => {
//     installEvent.waitUntil(
//       caches.open(CACHE_NAME)
//       .then( timeTable => {
//         timeTable.addAll(CACHE_URLS); // конец addAll
//       }) // конец open.then
//     ); // конец waitUntil
//   }); // конец addEventListener

//   // Всегда, когда файл запрашивается
// addEventListener('fetch', fetchEvent => {
//   const request = fetchEvent.request;
//   fetchEvent.respondWith(
//     // Сначала попытка запросить его из Сети
//     fetch(request)
//     .then( responseFromFetch => {
//       return responseFromFetch;
//     }) // конец fetch.then
//     // Если не сработало, то...
//     .catch( fetchError => {
//       // пытаемся найти в кеше
//       caches.match(request)
//       .then( responseFromCache => {
//         if (responseFromCache) {
//          return responseFromCache;
//        // если не сработало и...
//        } else {
//          // это запрос к веб-странице, то...
//          if (request.headers.get('accept').includes('text/html')) {
//            // покажите вашу офлайн-страницу
//            return caches.match('/offline.html');
//          } // 1конец if
//        } // конец if/else
//      }) // конец match.then
//    }) // конец fetch.catch
//   ); // конец respondWith
// }); // конец addEventListener



// self.addEventListener('install', function (event) {
//   console.log('[Service Worker] Installing Service Worker ...', event);
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(function (cache) {
//         return cache.addAll(CACHE_URLS);
//       })
//   );
// });

// self.addEventListener('activate', function(event) {
//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.map(function(cacheName) {
//           if (cacheName.startsWith('pages-cache-') && staticCacheName !== cacheName) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener('fetch', function (event) {
//   console.log('Fetch event for ', event.request.url);
//   var response;
//   event.respondWith(caches.match(event.request).then(function (response) {
//     if (response) {
//       console.log('Found ', event.request.url, ' in cache');
//       return response;
//     }
//     console.log('Network request for ', event.request.url);
//     return fetch(event.request).then(function (response) {
//       if (response.status === 404) {
//         return caches.match('main.css')
//       }
//       return caches.open(CACHE_URLS).then(function (cache) {
//         cache.put(event.request.url, response.clone());
//         return response;
//       });
//     });
//   }).catch(function (error) {
//     console.log('Error, ', error);
//     return caches.match('offline.html');
//   })
//   );
// });
    // else
    // {
    //   return fetch(event.request).catch(function (err) {
    //     return caches.open(CACHE_NAME).then(function(cache){
    //       if(event.request.headers.get('accept').includes('text/html')) {
    //         return cache.match('/offline.html');
    //       }
    //     });
    //   });

    // }

//   }).then(function(r) {
//     response = r;
//     caches.open(CACHE_NAME).then(function(cache) {
//       cache.put(event.request, response);
//     });
//     return response.clone();
//   }).catch(function() {
//     return caches.match('/offline.html');
//   }));
// });


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
self.addEventListener('activate', (event) => {
  // remove caches beginning "movies-" that aren't in
  // expectedCaches
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (/^timestamp-/.test(cacheName)) {
            if (CACHE_NAME.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          }

          return null;
        })
      )
  ));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    // try the cache
    caches.match(event.request).then((cachedResponse) =>
      // fall back to network
      cachedResponse || fetch(event.request)
    ).catch(() =>
      // if both fail, show a generic fallback:
      caches.match('/offline.html')
    )
  );
});