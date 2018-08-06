
self.addEventListener('install', function (event) {

  event.waitUntil(
    caches.open('my-restaurant')
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll([
          '/',
          'restaurant.html',
          'index.html',
          'css/styles.css',
          'css/responsive.css',
          'js/main.js',
          'js/restaurant_info.js',
          'js/dbhelper.js',
          'data/restaurants.json',
          'img/1.jpg',
          'img/2.jpg',
          'img/3.jpg',
          'img/4.jpg',
          'img/5.jpg',
          'img/6.jpg',
          'img/7.jpg',
          'img/8.jpg',
          'img/9.jpg',
          'img/10.jpg'
        ]);
      })
  );

});

//Caches and responses 

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // cloning requests for future requests

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function (response) {

            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // Also clone the responds
            var responseToCache = response.clone();
            caches.open('my-restaurant')
              .then(function (cache) {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
  );
});

