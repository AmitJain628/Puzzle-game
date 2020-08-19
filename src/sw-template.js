/*eslint-disable */

self.__precacheManifest = [].concat(self.__precacheManifest || []);

workbox.core.setCacheNameDetails({
  prefix: 'puzzle',
  precache: 'install-time',
  suffix: 'v1',
  runtime: 'run-time',
  googleAnalytics: 'ga'
});

// active new service worker as long as it's installed
workbox.clientsClaim();
workbox.skipWaiting();

// suppress warnings if revision is not provided
workbox.precaching.suppressWarnings();

// precahce and route asserts built by webpack
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});


// routing for cloud served images
workbox.routing.registerRoute(
  /^https:\/\/.+\.(jpe?g|png|gif|svg|woff2|ico)$/i,
  workbox.strategies.cacheFirst({
    cacheName: 'puzzle-image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60,
        maxEntries: 20
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      })
    ]
  })
);

/*eslint-enable */
