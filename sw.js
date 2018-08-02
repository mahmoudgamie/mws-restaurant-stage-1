self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('restaurant-service-worker').then(function (cache) {
            return cache.addAll([
                './',
                './index.html',
                './restaurant.html',
                './data/restaurants.json',
                './js/dbhelper.js',
                './js/main.js',
                './js/restaurant_info.js',
                './css/styles.css',
                './img/1.jpg',
                './img/10.jpg',
                './img/2.jpg',
                './img/3.jpg',
                './img/4.jpg',
                './img/5.jpg',
                './img/6.jpg',
                './img/7.jpg',
                './img/8.jpg',
                './img/9.jpg',
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          // if no cache available clone the request 
          var fetchRequest = event.request.clone();
          return fetch(fetchRequest).then(
            function(response) {
              // Check if we received a valid response
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              //after cloning the request and the response we put it in the cashe?
              var responseToCache = response.clone();  
              caches.open('restaurant-service-worker')
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });
              return response;
            }
          );
        })
      );
  });