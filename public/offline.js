/*self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('my-dynamic').then(function(cache) {
        return cache.addAll(
          [
            'off.html'
            
          ]
        );
      })
    );
  });


  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.open('my-dynamic').then(function(cache) {
        return cache.match(event.request).then(function (response) {
          return response || fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  });
*/
  /*self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('dynamic-v1')
        .then(cache => cache.addAll('off.html'))
        .then(self.skipWaiting())
    );
  });

  self.addEventListener('fetch', event => {
    // Skip cross-origin requests, like those for Google Analytics.
    if (event.request.url.startsWith(self.location.origin)) {
      event.respondWith(
        caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
  
          return caches.open('runtimes').then(cache => {
            return fetch(event.request).then(response => {
              // Put a copy of the response in the runtime cache.
              return cache.put(event.request, response.clone()).then(() => {
                return response;
              });
            });
          });
        })
      );
    }
  });
  */

 var filesToCache = [
    '/off.html'
    
  ];
  
  var staticCacheName = 'pages-cache-v1';
  
  self.addEventListener('install', function(event) {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
      caches.open(staticCacheName)
      .then(function(cache) {
        return cache.addAll(filesToCache);
      })
    );
  });

  self.addEventListener('fetch', function(event) {
    //console.log('Fetch event for ', event.request.url);
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          //console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        //console.log('Network request for ', event.request.url);
        return fetch(event.request).then(function(response) {

            // TODO 5 - Respond with custom 404 page
          
            return caches.open(staticCacheName).then(function(cache) {
              if (event.request.url.indexOf('test') < 0) {
                cache.put(event.request.url, response.clone());
              }
              return response;
            });
          });
  
      }).catch(function(error) {
  
        // TODO 6 - Respond with custom offline page
  
      })
    );
  });
  

 /*(function() {
    'use strict';
  
    var filesToCache = [
      'off.html'
    ];
  
    var staticCacheName = 'pages-cache-v1';
  
    self.addEventListener('install', function(event) {
      console.log('Attempting to install service worker and cache static assets');
      event.waitUntil(
        caches.open(staticCacheName)
        .then(function(cache) {
          return cache.addAll(filesToCache);
        })
      );
    });
  
    self.addEventListener('fetch', function(event) {
      console.log('Fetch event for ', event.request.url);
      event.respondWith(
        caches.match(event.request).then(function(response) {
          if (response) {
            console.log('Found ', event.request.url, ' in cache');
            return response;
          }
          console.log('Network request for ', event.request.url);
          return fetch(event.request).then(function(response) {
            if (response.status === 404) {
              return caches.match('/404.html');
            }
            return caches.open(staticCacheName).then(function(cache) {
              if (event.request.url.indexOf('test') < 0) {
                cache.put(event.request.url, response.clone());
              }
              return response;
            });
          });
        }).catch(function(error) {
          console.log('Error, ', error);
          return caches.match('/off.html');
        })
      );
    });
  
    // TODO 7 - delete unused caches
  
  })();

  */
  
