// addEventListener('install', installEvent => {
//     installEvent.waitUntil(
//       caches.open('timetable')
//       .then( timeTable => {
//         timeTable.addAll([
//          'https://ben9lta.github.io/timetable/offline.html',
//          'https://ben9lta.github.io/timetable/main.css',
//          'https://ben9lta.github.io/timetable/weeks.js',
//          'https://ben9lta.github.io/timetable/img/icons/favicon/favicon-16x16.png'
//         ]); // конец addAll
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
//          if (request.headers.get('Accept').includes('text/html')) {
//            // покажите вашу офлайн-страницу
//            return caches.match('https://ben9lta.github.io/timetable/offline.html');
//          } // 1конец if
//        } // конец if/else
//      }) // конец match.then
//    }) // конец fetch.catch
//   ); // конец respondWith
// }); // конец addEventListener
const CACHE_NAME = 'timestamp-v1';

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll([
        '/offline.html',
        '/main.css',
        '/weeks.js',
        '/img/icons/favicon/favicon-16x16.png'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  var response;
  event.respondWith(caches.match(event.request).then(function(response) {
    if(response){
      return response;
    }
    else 
    {
      return fetch(event.request).catch(function (err) {
        return caches.open(CACHE_NAME).then(function(cache){
          if(event.request.headers.get('accept').includes('text/html')) {
            return cache.match('/offline.html');
          }
        });
      });

    }
    
  }).then(function(r) {
    response = r;
    caches.open(CACHE_NAME).then(function(cache) {
      cache.put(event.request, response);
    });
    return response.clone();
  }).catch(function() {
    return caches.match('/offline.html');
  }));
});