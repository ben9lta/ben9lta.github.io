//const CACHE_NAME = 'v11';
const CACHE_NAME = 'v1';
const CACHE_URLS = [
  '/timetable/offline.html',
  '/timetable/main.css',
  '/timetable/weeks.js',
  '/timetable/img/icons/favicon/favicon-16x16.png',
];

this.addEventListener('install', function (event) {
	event.waitUntil(caches).open('v1').then(function (cache) {
		return cache.addAll(CACHE_URLS);
  })
});



// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) =>
//       cache.addAll(CACHE_URLS)
//     )
//   );
// });

// this.addEventListener('activate', function(event) {
//   var cacheWhitelist = ['v10'];

//   event.waitUntil(
//     caches.keys().then(function(keyList) {
//       return Promise.all(keyList.map(function(key) {
//         if (cacheWhitelist.indexOf(key) === -1) {
//           return caches.delete(key);
//         }
//       }));
//     })
//   );
// });

// this.addEventListener('fetch', function(event) {
//   var response;
//   event.respondWith(caches.match(event.request).then(function() {
//     return fetch(event.request);
//   }).then(function(r) {
//     response = r;
//     caches.open('v11').then(function(cache) {
//       console.log(event.request, response);
//       console.log(cache);
//       cache.put(event.request, response);
//       console.log('============')
//       console.log(cache);
//     });
//     return response.clone();
//   }).catch(function() {
//     return caches.match('/timetable/offline.html');
//   }));
// });
