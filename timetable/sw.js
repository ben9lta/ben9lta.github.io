addEventListener('install', installEvent => {
    installEvent.waitUntil(
      caches.open('timetable')
      .then( timeTable => {
        timeTable.addAll([
         'offline.html',
         'main.css',
         'weeks.js',
         '/img/icons/favicon/favicon-16x16.png'
        ]); // конец addAll
      }) // конец open.then
    ); // конец waitUntil
  }); // конец addEventListener

  // Всегда, когда файл запрашивается
addEventListener('fetch', fetchEvent => {
  const request = fetchEvent.request;
  fetchEvent.respondWith(
    // Сначала попытка запросить его из Сети
    fetch(request)
    .then( responseFromFetch => {
      return responseFromFetch;
    }) // конец fetch.then
    // Если не сработало, то...
    .catch( fetchError => {
      // пытаемся найти в кеше
      caches.match(request)
      .then( responseFromCache => {
        if (responseFromCache) {
         return responseFromCache;
       // если не сработало и...
       } else {
         // это запрос к веб-странице, то...
         if (request.headers.get('Accept').includes('text/html')) {
           // покажите вашу офлайн-страницу
           return caches.match('/offline.html');
         } // 1конец if
       } // конец if/else
     }) // конец match.then
   }) // конец fetch.catch
  ); // конец respondWith
}); // конец addEventListener
