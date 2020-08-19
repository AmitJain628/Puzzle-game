import serialize from 'serialize-javascript';
import { IMainState } from '@common/store/reducers/types';

declare const __DEV__: boolean;
export interface IProps {
  head: string;
  style: string;
  scripts: string[];
  secrets: object;
  data: IMainState | null;
  children: string;
  bodyAttrs: string;
}

export default ({
  secrets,
  data,
  children,
  head,
  style,
  scripts,
  bodyAttrs,
}: // tslint:disable-next-line:no-big-function
IProps) => {
  if (!__DEV__) {
    return `<html className="no-js" lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="mobile-web-app-capable" content="yes">
      <meta name="apple-mobile-web-app-capable" content="yes">
      <meta name="theme-color" content="#536878">
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <link rel='favicon' type='image/png' href='/favicon.png?v=3' />
      <script src="/dataLayer.js"></script>
      <link rel='favicon' type='image/png' href='/favicon.png' />
      <link
          href='//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css'
          rel='stylesheet'
        />
      ${head}
      <meta name="viewport" content="width=device-width,minimum-scale=1,user-scalable=no">

      ${scripts
        .map(script => `<link rel="preload" as="script" href="${script}" />`)
        .join('')}
      <link rel="manifest" href="/site.webmanifest" />

      <link rel="apple-touch-icon" href='/favicon.png' />
      ${style}
    </head>
    <body ${bodyAttrs}>
      <div id="app">${children}</div>
      <script>
      window.__SECRETS__ =  ${serialize(secrets, {
        isJSON: true,
      })}
      </script>
      <script>
      window.__INITIAL_STATE__ = ${serialize(data, {
        isJSON: true,
      })}</script>
      ${scripts.map(script => `<script src="${script}" ></script>`).join('')}
      <script>
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js').then(function(registration) {
              console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, function(err) {
              console.log('ServiceWorker registration failed: ', err);
            });
          });
        } else {
          console.log('service worker not installed');
        }
      </script>
    </body>
  </html>`;
  } else {
    return `<html className="no-js" lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="mobile-web-app-capable" content="yes">
      <meta name="apple-mobile-web-app-capable" content="yes">
      <meta name="theme-color" content="#536878">
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <link rel='favicon' type='image/png' href='/favicon.png' />
      <link
          href='//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css'
          rel='stylesheet'
        />
      ${head}
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
      ${scripts
        .map(script => `<link rel="preload" as="script" href="${script}" />`)
        .join('')}
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="apple-touch-icon" href='/favicon.png' />
      ${style}
    </head>
    <body ${bodyAttrs}>
    <div id="app">${children}</div>
    <script>
      window.__SECRETS__ =  ${serialize(secrets, {
        isJSON: true,
      })}
      </script>
      <script>
      window.__INITIAL_STATE__ = ${serialize(data, {
        isJSON: true,
      })}</script>
      ${scripts.map(script => `<script src="${script}" ></script>`).join('')}
      </body>
  </html>`;
  }
};
