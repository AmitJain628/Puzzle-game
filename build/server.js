require("source-map-support").install(),module.exports=function(e){var t={},n={1:0};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.e=function(t){if(0!==n[t]){var r=require("./chunks/"+({0:"home"}[t]||t)+".js"),o=r.modules,i=r.ids;for(var a in o)e[a]=o[a];for(var s=0;s<i.length;s++)n[i[s]]=0}return Promise.all([])},r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/assets/",r.oe=function(e){process.nextTick(function(){throw e})},r(r.s=27)}([function(e,t){e.exports=require("styled-components")},function(e,t){e.exports=require("react")},function(e,t){e.exports=require("redux")},function(e,t){e.exports=require("react-loadable")},function(e,t){e.exports=require("react-helmet")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("cookie-parser")},function(e,t){e.exports=require("redux-saga")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("react-router-dom")},function(e,t){e.exports=require("react-dom/server")},function(e,t){e.exports=require("mime-types")},function(e,t){e.exports=require("bunyan")},function(e,t){e.exports=require("serialize-javascript")},function(e,t){e.exports=require("./chunk-manifest.json")},function(e,t){e.exports=require("immer")},function(e,t){e.exports=require("react-redux")},function(e,t){e.exports=require("dotenv")},function(e,t){e.exports=require("redux-saga/effects")},function(e,t){e.exports=require("react-router-config")},function(e,t){e.exports=require("react-loadable/webpack")},function(e,t){e.exports=require("express-bunyan-logger")},function(e,t){e.exports=require("compression")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("morgan")},function(e,t){e.exports=require("helmet")},function(e,t){e.exports=require("./react-loadable.json")},function(e,t,n){n(28),e.exports=n(29)},function(e,t){e.exports=require("@babel/polyfill")},function(e,t,n){"use strict";n.r(t);var r=n(7),o=n.n(r),i=n(2);var a="HOME_SET_LOADING",s="HOME_SET_USERDETAILS",l="HOME_SET_USER_PHOTOS",c="HOME_SET_INITAL_STATE",d=n(15),u=n.n(d);var p=((e,t)=>u()((n=e(),{type:r,payload:o})=>(t[r]&&t[r](n,o),n)))(()=>({userDetails:[],isLoading:!0,userPhotos:[]}),{[a]:(e,t)=>{e.isLoading=t},[s]:(e,t)=>{e.userDetails=t},[l]:(e,t)=>{e.userPhotos=t},[c]:e=>{e.userPhotos=[],e.userDetails=[]}});var f=Object(i.combineReducers)({home:p});const b=(e={})=>{const t=o()(),n=(0,i.compose)(Object(i.applyMiddleware)(t)),a=Object(i.createStore)(f,e,n);return a.runSaga=t.run,a.close=(()=>{a.dispatch(r.END)}),a};let m;try{const e=window.__INITIAL_STATE__;delete window.__INITIAL_STATE__,m=b(e)}catch(e){m=b()}var g=m,h=n(0),y=n.n(h),v=n(8),k=n.n(v),x=n(16),S=n(1),w=n.n(S),_=n(5),q=n.n(_),T=n(6),E=n.n(T),j=n(9),A=n(17),O=n.n(A),P=n(3),$=n.n(P),z=n(4),I=n.n(z),L=n(10),C=n.n(L);var N=[{path:"/",basePath:"/",exact:!0,component:$()({loading:()=>null,loader:()=>n.e(0).then(n.bind(null,30)),modules:["./routes/home"],webpack:()=>[30]})}],M=n(18);const R=768,D=1024,H=1366,G="#383838",F="#a3a3a3",B="#6c6c6c";var W=h.createGlobalStyle`


*[tabindex]{
  outline: none;
}

::-moz-selection { /* Code for Firefox */
  background: transparent;
}

body{
  overflow-x:hidden;
}

body {
  margin: 0;
  padding: 0;
}

/* ::selection {
  background: transparent;
} */

.styles__SummaryContentCompactWrapper-jctqrb-5{
  transition: 0.2s linear 0s !important;
}
.hideDrawer{
  .isSticky{
  transform: translateY(0%) !important;
  position: relative !important;
  }
}
.checkoutMobileFooterDrawer {
    width: 100%;
    display: flex;
    flex: 1;
    align-items: center;
    padding: 2.5rem;

    height: 56px;
    background-color: #000;

    font-size: 12px;
    line-height: 1.33;

    .copy {
      color: ${F};
      margin-right: 1rem;
    }
    .tnc {
      color: ${B};
    }

    @media (min-width: ${H}px) {
      display: none;
    }
  }



/*** RESET CSS ***/
html {
  font-family: 'TeleGrotesk Next' !important;
}

button:focus {
  outline: none;
}

/*********** Product Detailed Plan Modal Body Scroll False CSS 03-06-2019 ***********/
body{
  &.overflowHide{
    overflow:hidden!important;
    position:fixed;
  }
}
/*********** Product Detailed Plan Modal Body Scroll False CSS 03-06-2019 ***********/



*,
*::after,
*::before {
  box-sizing: border-box;
  font-family: 'TeleGrotesk Next';
  -webkit-tap-highlight-color: transparent;
}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

body {
  line-height: 1;
  text-rendering: optimizeLegibility;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
}

ol,
ul {
  list-style: none;
}

a {
  color: inherit;
  text-decoration: none;
}

blockquote,
q {
  quotes: none;
}

blockquote::before,
blockquote::after,
q::before,
q::after {
  content: '';
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

/*** slick slider ***/
/* Slider */
.slick-slider
{
    position: relative;

    display: block;
    box-sizing: border-box;

    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;

    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -ms-touch-action: pan-y;
        touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
}

.slick-list
{
    position: relative;

    display: block;
    overflow: hidden;

    margin: 0;
    padding: 0;
}
.slick-list:focus
{
    outline: none;
}
.slick-list.dragging
{
    cursor: pointer;
    cursor: hand;
}

.slick-slider .slick-track,
.slick-slider .slick-list
{
    -webkit-transform: translate3d(0, 0, 0);
       -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
         -o-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
}

.slick-track
{
    position: relative;
    top: 0;
    left: 0;

    display: block;
}
.slick-track:before,
.slick-track:after
{
    display: table;

    content: '';
}
.slick-track:after
{
    clear: both;
}
.slick-loading .slick-track
{
    visibility: hidden;
}

.slick-slide
{
    display: none;
    float: left;

    height: 100%;
    min-height: 1px;
}
[dir='rtl'] .slick-slide
{
    float: right;
}
.slick-slide img
{
    display: block;
}
.slick-slide.slick-loading img
{
    display: none;
}
.slick-slide.dragging img
{
    pointer-events: none;
}
.slick-initialized .slick-slide
{
    display: block;
}
.slick-loading .slick-slide
{
    visibility: hidden;
}
.slick-vertical .slick-slide
{
    display: block;

    height: auto;

    border: 1px solid transparent;
}
.slick-arrow.slick-hidden {
    display: none;
}
#binkies-on-page,
#binkies-in-modal
{
	transition: opacity 0.5s, visibility 0.5s;
}
body.binkies-show #binkies-on-page,
body.binkies-show #binkies-in-modal{
	opacity: 1;
	visibility: visible;
}
body.binkies-hide #binkies-on-page,
body.binkies-hide #binkies-in-modal
{
	opacity: 0;
	visibility: hidden;
}
.binkies-bar{
  visibility: hidden;
}



/* hide scroll bar */
body *::-webkit-scrollbar {
    display: none;
    width: 0 !important ;
    scrollbar-width: none;
    overflow: -moz-scrollbars-none;
  }
 body  *{
    scrollbar-width: none;
    overflow: -moz-scrollbars-none;
  /* } */

  /** Binkies Page CSS */

  #binkies-on-page.outOfStock{
  opacity: 0.6;
  }
  @media only screen and (max-width: 767px){
    #binkies-on-page.outOfStock{
      opacity: 0.4;
    }
  }

  .green {
    background-color: #309260;
  }
  .blue {
    background-color: #3598dc;
  }
  .yellow {
    background-color: #e8d91e;
  }
  .orange {
    background-color: #e77e22;
  }
  .red {
    background-color: #e84c3d;
  }

}`;class U extends S.Component{render(){return null}}var J,V=h.createGlobalStyle`
  *{
    outline: none;
  }

  body{
    overflow: auto;
    color: ${G};
  }

  #app{
    margin: auto;
    min-width: ${R}px;
  }

  @media screen and (min-width: ${D}px) {
    body.hasSummary{
      #app{
        padding-right: 18rem;
      }
    }
  }
`,Y=n(19);function K(e,t,n,r){J||(J="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),t&&o)for(var a in o)void 0===t[a]&&(t[a]=o[a]);else t||(t=o||{});if(1===i)t.children=r;else if(i>1){for(var s=new Array(i),l=0;l<i;l++)s[l]=arguments[l+3];t.children=s}return{$$typeof:J,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}const Q=y.a.div.withConfig({displayName:"App__StyledAppInner",componentId:"td9ve8-0"})(["display:flex;flex-direction:column;min-height:100vh;justify-content:space-between;"]);var X=K(z.Helmet,{},void 0,K("title",{},void 0,"Puzzle game"),K("meta",{name:"description",content:"react typescript ssr with code split"})),Z=K(U,{}),ee=K(W,{}),te=K(V,{}),ne=()=>w.a.createElement(w.a.Fragment,null,K(Q,{className:"styledAppInner"},void 0,X,Z,Object(Y.renderRoutes)(N),ee,te)),re=n(20),oe=n(11),ie=n.n(oe),ae=n(12),se=n.n(ae),le=n(21),ce=n.n(le);const de=se.a.createLogger({name:"puzzle",streams:[{level:"info",path:"logs/puzzle-game-ui-dev-out-app.log"},{level:"error",path:"logs/puzzle-game-ui-dev-error-app.log"}]});de.getBasicLogger=((e="init")=>se.a.createLogger({name:e})),de.getRequestLogger=ce()({excludes:["user-agent","res-headers","res","req","body"],obfuscate:["body.password","body.confirmPassword"]});var ue=de,pe=n(22),fe=n.n(pe),be=n(23),me=n.n(be),ge=n(24),he=n.n(ge),ye=n(25),ve=n.n(ye);const ke=q.a.Router();ke.route("/").get((e,t)=>t.sendStatus(200));var xe,Se=ke,we=n(13),_e=n.n(we),qe=({secrets:e,data:t,children:n,head:r,style:o,scripts:i,bodyAttrs:a})=>`<html className="no-js" lang="en">\n    <head>\n      <meta charSet="utf-8" />\n      <meta name="mobile-web-app-capable" content="yes">\n      <meta name="apple-mobile-web-app-capable" content="yes">\n      <meta name="theme-color" content="#536878">\n      <meta httpEquiv="x-ua-compatible" content="ie=edge" />\n      <link rel='favicon' type='image/png' href='/favicon.png?v=3' />\n      <script src="/dataLayer.js"><\/script>\n      <link rel='favicon' type='image/png' href='/favicon.png' />\n      <link\n          href='//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css'\n          rel='stylesheet'\n        />\n      ${r}\n      <meta name="viewport" content="width=device-width,minimum-scale=1,user-scalable=no">\n\n      ${i.map(e=>`<link rel="preload" as="script" href="${e}" />`).join("")}\n      <link rel="manifest" href="/site.webmanifest" />\n\n      <link rel="apple-touch-icon" href='/favicon.png' />\n      ${o}\n    </head>\n    <body ${a}>\n      <div id="app">${n}</div>\n      <script>\n      window.__SECRETS__ =  ${_e()(e,{isJSON:!0})}\n      <\/script>\n      <script>\n      window.__INITIAL_STATE__ = ${_e()(t,{isJSON:!0})}<\/script>\n      ${i.map(e=>`<script src="${e}" ><\/script>`).join("")}\n      <script>\n        if ('serviceWorker' in navigator) {\n          window.addEventListener('load', function() {\n            navigator.serviceWorker.register('/sw.js').then(function(registration) {\n              console.log('ServiceWorker registration successful with scope: ', registration.scope);\n            }, function(err) {\n              console.log('ServiceWorker registration failed: ', err);\n            });\n          });\n        } else {\n          console.log('service worker not installed');\n        }\n      <\/script>\n    </body>\n  </html>`,Te=n(14),Ee=n.n(Te),je=n(26),Ae=n.n(je);function Oe(e,t,n,r){xe||(xe="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),t&&o)for(var a in o)void 0===t[a]&&(t[a]=o[a]);else t||(t=o||{});if(1===i)t.children=r;else if(i>1){for(var s=new Array(i),l=0;l<i;l++)s[l]=arguments[l+3];t.children=s}return{$$typeof:xe,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function Pe(e,t,n,r,o,i,a){try{var s=e[i](a),l=s.value}catch(e){return void n(e)}s.done?t(l):Promise.resolve(l).then(r,o)}O.a.config(),$.a.preloadAll(),(()=>{function e(e,t){e.cleanup&&process.stdout.write("clean"),t&&process.stdout.write(t.stack),e.exit&&process.exit()}process.stdin.resume(),process.on("exit",e.bind(null,{cleanup:!0})),process.on("SIGINT",e.bind(null,{exit:!0})),process.on("SIGUSR1",e.bind(null,{exit:!0})),process.on("SIGUSR2",e.bind(null,{exit:!0})),process.on("uncaughtException",e.bind(null,{exit:!0}))})();const $e=q()();$e.use(E()()),(e=>{global.navigator=global.navigator||{},global.navigator.userAgent=global.navigator.userAgent||"all";e.use(he()("dev")),e.use(ue.getRequestLogger),e.use(fe()()),e.use(ve()()),e.use(E()()),e.use(me.a.json())})($e),$e.use("/health",Se),$e.use(q.a.static(k.a.resolve(__dirname,"public"),{maxAge:"30d",setHeaders(e,t){"text/html"===ie.a.lookup(t)?e.setHeader("Cache-Control","public, max-age=0"):"font/opentype"===ie.a.lookup(t)&&e.setHeader("Cache-Control","public, max-age=1yr")}})),$e.get("/sw.js",(e,t)=>{t.sendFile(k.a.resolve(__dirname,"public/assets/sw.js"))});var ze=Oe(ne,{});$e.get("*",function(){var e,t=(e=function*(e,t,n){try{const r=[];N.forEach(t=>{Object(j.matchPath)(e.url,t)&&t&&t.loadData&&r.push(t.loadData())}),yield g.runSaga(function*(){yield Object(M.all)([r])}).done;const o=new Set,i={head:"",style:"",scripts:[],children:"",secrets:{},data:null,bodyAttrs:""},a={},s=new h.ServerStyleSheet,l=[],c=e=>{Ee.a[e]&&Ee.a[e].forEach(e=>o.add(e))},d=e=>l.push(e);if(i.children=C.a.renderToString(Oe(x.Provider,{store:g},void 0,Oe($.a.Capture,{report:d},void 0,Oe(h.StyleSheetManager,{sheet:s.instance},void 0,Oe(j.StaticRouter,{location:e.url,context:a},void 0,ze))))),301===a.status||302===a.status)return t.redirect(a.status,a.url);i.head=`\n    ${I.a.renderStatic().title.toString()}\n    ${I.a.renderStatic().meta.toString()}\n    `,i.bodyAttrs=I.a.renderStatic().bodyAttributes.toString(),i.style=s.getStyleTags(),i.secrets={ENV:"production"},c("client");const u=Object(re.getBundles)(Ae.a,l);ue.info("Bundles created"),u.forEach(e=>{o.add(e.publicPath)}),i.data=g.getState(),i.scripts=[...Array.from(o)];const p=qe(i);t.status(a.status||200),t.send(`<!doctype html>${p}`)}catch(e){n(e)}},function(){var t=this,n=arguments;return new Promise(function(r,o){var i=e.apply(t,n);function a(e){Pe(i,r,o,a,s,"next",e)}function s(e){Pe(i,r,o,a,s,"throw",e)}a(void 0)})});return function(e,n,r){return t.apply(this,arguments)}}()),$e.use((e,t,n,r)=>{ue.error(e);const o={head:`\n    <title>${e.message}</title>\n    <meta name="description">Error</meta>\n  `,style:"",scripts:[],secrets:{},data:null,noScriptForGTA:"",scriptForGTA:"",bodyAttributes:"",bodyAttrs:"",children:C.a.renderToString(w.a.createElement(w.a.Fragment,null))},i=qe(o);n.status(e.status||500),n.send(`<!doctype html>${i}`)});{const e=process.env.PORT;$.a.preloadAll().then(()=>{$e.listen(e,()=>{ue.info(`The server is running at http://localhost:${e}/`)})}).catch(e=>{ue.error(e)})}t.default=$e}]);