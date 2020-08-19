require("source-map-support").install(),module.exports=function(e){var t={},n={1:0};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.e=function(t){if(0!==n[t]){var r=require("./chunks/"+({0:"home"}[t]||t)+".js"),o=r.modules,i=r.ids;for(var a in o)e[a]=o[a];for(var s=0;s<i.length;s++)n[i[s]]=0}return Promise.all([])},r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/assets/",r.oe=function(e){process.nextTick((function(){throw e}))},r(r.s=27)}([function(e,t){e.exports=require("styled-components")},function(e,t){e.exports=require("react")},function(e,t){e.exports=require("redux")},function(e,t){e.exports=require("react-loadable")},function(e,t){e.exports=require("react-helmet")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("cookie-parser")},function(e,t){e.exports=require("redux-saga")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("react-router-dom")},function(e,t){e.exports=require("react-dom/server")},function(e,t){e.exports=require("mime-types")},function(e,t){e.exports=require("bunyan")},function(e,t){e.exports=require("serialize-javascript")},function(e,t){e.exports=require("./chunk-manifest.json")},function(e,t){e.exports=require("immer")},function(e,t){e.exports=require("react-redux")},function(e,t){e.exports=require("dotenv")},function(e,t){e.exports=require("redux-saga/effects")},function(e,t){e.exports=require("react-router-config")},function(e,t){e.exports=require("react-loadable/webpack")},function(e,t){e.exports=require("express-bunyan-logger")},function(e,t){e.exports=require("compression")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("morgan")},function(e,t){e.exports=require("helmet")},function(e,t){e.exports=require("./react-loadable.json")},function(e,t,n){n(28),e.exports=n(29)},function(e,t){e.exports=require("@babel/polyfill")},function(e,t,n){"use strict";n.r(t);var r=n(7),o=n.n(r),i=n(2);var a="HOME_SET_LOADING",s=n(15);var l,c,d=(l=()=>({isLoading:!0}),c={[a]:(e,t)=>{e.isLoading=t}},n.n(s)()((e=l(),{type:t,payload:n})=>(c[t]&&c[t](e,n),e)));var u=Object(i.combineReducers)({home:d});const p=(e={})=>{const t=o()(),n=(0,i.compose)(Object(i.applyMiddleware)(t)),a=Object(i.createStore)(u,e,n);return a.runSaga=t.run,a.close=()=>{a.dispatch(r.END)},a};let f;try{const e=window.__INITIAL_STATE__;delete window.__INITIAL_STATE__,f=p(e)}catch(e){f=p()}var b=f,m=n(0),g=n.n(m),h=n(8),y=n.n(h),v=n(16),k=n(1),x=n.n(k),w=n(5),S=n.n(w),q=n(6),_=n.n(q),j=n(9),A=n(17),T=n.n(A),$=n(3),P=n.n($),O=n(4),z=n.n(O),E=n(10),I=n.n(E);var C=[{path:"/",basePath:"/",exact:!0,component:P()({loading:()=>null,loader:()=>n.e(0).then(n.bind(null,30)),modules:["./routes/home"],webpack:()=>[30]})}],L=n(18);const N=768,M=1024,R=1366,G="#383838",F="#a3a3a3",D="#6c6c6c";var H=m.createGlobalStyle`


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
      color: ${D};
    }

    @media (min-width: ${R}px) {
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

}`;class B extends k.Component{render(){return null}}var W,J=m.createGlobalStyle`
  *{
    outline: none;
  }

  body{
    overflow: auto;
    color: ${G};
  }

  #app{
    margin: auto;
    min-width: ${N}px;
  }

  @media screen and (min-width: ${M}px) {
    body.hasSummary{
      #app{
        padding-right: 18rem;
      }
    }
  }
`,U=n(19);function V(e,t,n,r){W||(W="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=r;else if(i>1){for(var a=new Array(i),s=0;s<i;s++)a[s]=arguments[s+3];t.children=a}if(t&&o)for(var l in o)void 0===t[l]&&(t[l]=o[l]);else t||(t=o||{});return{$$typeof:W,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}const Y=g.a.div.withConfig({displayName:"App__StyledAppInner",componentId:"td9ve8-0"})(["display:flex;flex-direction:column;min-height:100vh;justify-content:space-between;"]);var K=V(O.Helmet,{},void 0,V("title",{},void 0,"Puzzle game"),V("meta",{name:"description",content:"react typescript ssr with code split"})),Q=V(B,{}),X=V(H,{}),Z=V(J,{}),ee=()=>x.a.createElement(x.a.Fragment,null,V(Y,{className:"styledAppInner"},void 0,K,Q,Object(U.renderRoutes)(C),X,Z)),te=n(20),ne=n(11),re=n.n(ne),oe=n(12),ie=n.n(oe),ae=n(21),se=n.n(ae);const le=ie.a.createLogger({name:"puzzle",streams:[{level:"info",path:"logs/puzzle-game-ui-dev-out-app.log"},{level:"error",path:"logs/puzzle-game-ui-dev-error-app.log"}]});le.getBasicLogger=(e="init")=>ie.a.createLogger({name:e}),le.getRequestLogger=se()({excludes:["user-agent","res-headers","res","req","body"],obfuscate:["body.password","body.confirmPassword"]});var ce=le,de=n(22),ue=n.n(de),pe=n(23),fe=n.n(pe),be=n(24),me=n.n(be),ge=n(25),he=n.n(ge);const ye=S.a.Router();ye.route("/").get((e,t)=>t.sendStatus(200));var ve,ke=ye,xe=n(13),we=n.n(xe),Se=({secrets:e,data:t,children:n,head:r,style:o,scripts:i,bodyAttrs:a})=>`<html className="no-js" lang="en">\n    <head>\n      <meta charSet="utf-8" />\n      <meta name="mobile-web-app-capable" content="yes">\n      <meta name="apple-mobile-web-app-capable" content="yes">\n      <meta name="theme-color" content="#536878">\n      <meta httpEquiv="x-ua-compatible" content="ie=edge" />\n      <link rel='favicon' type='image/png' href='/favicon.png?v=3' />\n      <script src="/dataLayer.js"><\/script>\n      <link rel='favicon' type='image/png' href='/favicon.png' />\n      <link\n          href='//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css'\n          rel='stylesheet'\n        />\n      ${r}\n      <meta name="viewport" content="width=device-width,minimum-scale=1,user-scalable=no">\n\n      ${i.map(e=>`<link rel="preload" as="script" href="${e}" />`).join("")}\n      <link rel="manifest" href="/site.webmanifest" />\n\n      <link rel="apple-touch-icon" href='/favicon.png' />\n      ${o}\n    </head>\n    <body ${a}>\n      <div id="app">${n}</div>\n      <script>\n      window.__SECRETS__ =  ${we()(e,{isJSON:!0})}\n      <\/script>\n      <script>\n      window.__INITIAL_STATE__ = ${we()(t,{isJSON:!0})}<\/script>\n      ${i.map(e=>`<script src="${e}" ><\/script>`).join("")}\n      <script>\n        if ('serviceWorker' in navigator) {\n          window.addEventListener('load', function() {\n            navigator.serviceWorker.register('/sw.js').then(function(registration) {\n              console.log('ServiceWorker registration successful with scope: ', registration.scope);\n            }, function(err) {\n              console.log('ServiceWorker registration failed: ', err);\n            });\n          });\n        } else {\n          console.log('service worker not installed');\n        }\n      <\/script>\n    </body>\n  </html>`,qe=n(14),_e=n.n(qe),je=n(26),Ae=n.n(je);function Te(e,t,n,r){ve||(ve="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),1===i)t.children=r;else if(i>1){for(var a=new Array(i),s=0;s<i;s++)a[s]=arguments[s+3];t.children=a}if(t&&o)for(var l in o)void 0===t[l]&&(t[l]=o[l]);else t||(t=o||{});return{$$typeof:ve,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function $e(e,t,n,r,o,i,a){try{var s=e[i](a),l=s.value}catch(e){return void n(e)}s.done?t(l):Promise.resolve(l).then(r,o)}T.a.config(),P.a.preloadAll(),(()=>{function e(e,t){e.cleanup&&process.stdout.write("clean"),t&&process.stdout.write(t.stack),e.exit&&process.exit()}process.stdin.resume(),process.on("exit",e.bind(null,{cleanup:!0})),process.on("SIGINT",e.bind(null,{exit:!0})),process.on("SIGUSR1",e.bind(null,{exit:!0})),process.on("SIGUSR2",e.bind(null,{exit:!0})),process.on("uncaughtException",e.bind(null,{exit:!0}))})();const Pe=S()();Pe.use(_()()),(e=>{global.navigator=global.navigator||{},global.navigator.userAgent=global.navigator.userAgent||"all";e.use(me()("dev")),e.use(ce.getRequestLogger),e.use(ue()()),e.use(he()()),e.use(_()()),e.use(fe.a.json())})(Pe),Pe.use("/health",ke),Pe.use(S.a.static(y.a.resolve(__dirname,"public"),{maxAge:"30d",setHeaders(e,t){"text/html"===re.a.lookup(t)?e.setHeader("Cache-Control","public, max-age=0"):"font/opentype"===re.a.lookup(t)&&e.setHeader("Cache-Control","public, max-age=1yr")}})),Pe.get("/sw.js",(e,t)=>{t.sendFile(y.a.resolve(__dirname,"public/assets/sw.js"))});var Oe=Te(ee,{});Pe.get("*",function(){var e,t=(e=function*(e,t,n){try{const n=[];C.forEach(t=>{Object(j.matchPath)(e.url,t)&&t&&t.loadData&&n.push(t.loadData())}),yield b.runSaga((function*(){yield Object(L.all)([n])})).done;const r=new Set,o={head:"",style:"",scripts:[],children:"",secrets:{},data:null,bodyAttrs:""},i={},a=new m.ServerStyleSheet,s=[],l=e=>{_e.a[e]&&_e.a[e].forEach(e=>r.add(e))},c=e=>s.push(e);if(o.children=I.a.renderToString(Te(v.Provider,{store:b},void 0,Te(P.a.Capture,{report:c},void 0,Te(m.StyleSheetManager,{sheet:a.instance},void 0,Te(j.StaticRouter,{location:e.url,context:i},void 0,Oe))))),301===i.status||302===i.status)return t.redirect(i.status,i.url);o.head=`\n    ${z.a.renderStatic().title.toString()}\n    ${z.a.renderStatic().meta.toString()}\n    `,o.bodyAttrs=z.a.renderStatic().bodyAttributes.toString(),o.style=a.getStyleTags(),o.secrets={ENV:"production"},l("client");const d=Object(te.getBundles)(Ae.a,s);ce.info("Bundles created"),d.forEach(e=>{r.add(e.publicPath)}),o.data=b.getState(),o.scripts=[...Array.from(r)];const u=Se(o);t.status(i.status||200),t.send("<!doctype html>"+u)}catch(e){n(e)}},function(){var t=this,n=arguments;return new Promise((function(r,o){var i=e.apply(t,n);function a(e){$e(i,r,o,a,s,"next",e)}function s(e){$e(i,r,o,a,s,"throw",e)}a(void 0)}))});return function(e,n,r){return t.apply(this,arguments)}}()),Pe.use((e,t,n,r)=>{ce.error(e);const o={head:`\n    <title>${e.message}</title>\n    <meta name="description">Error</meta>\n  `,style:"",scripts:[],secrets:{},data:null,noScriptForGTA:"",scriptForGTA:"",bodyAttributes:"",bodyAttrs:"",children:I.a.renderToString(x.a.createElement(x.a.Fragment,null))},i=Se(o);n.status(e.status||500),n.send("<!doctype html>"+i)});{const e=process.env.PORT;P.a.preloadAll().then(()=>{Pe.listen(e,()=>{ce.info(`The server is running at http://localhost:${e}/`)})}).catch(e=>{ce.error(e)})}t.default=Pe}]);