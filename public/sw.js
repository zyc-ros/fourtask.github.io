if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,i)=>{const f=e||("document"in self?document.currentScript.src:"")||location.href;if(s[f])return;let c={};const r=e=>n(e,f),t={module:{uri:f},exports:c,require:r};s[f]=Promise.all(a.map((e=>t[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts("/fallback-ce627215c0e4a9af.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Donate_Paypal.png",revision:"b247fc7a81ab013338b1d2b0536c65eb"},{url:"/Donate_Wechat.png",revision:"d98fe30af1f57c1bd67cfc8342ebd9e7"},{url:"/_next/static/Db0Dx7NvqILmblifmFaBf/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/_next/static/Db0Dx7NvqILmblifmFaBf/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0e5ce63c-03d9cb81df15c228.js",revision:"Db0Dx7NvqILmblifmFaBf"},{url:"/_next/static/chunks/190-ebc2b43e82b24473.js",revision:"Db0Dx7NvqILmblifmFaBf"},{url:"/_next/static/chunks/525.b584acd219f0d08c.js",revision:"b584acd219f0d08c"},{url:"/_next/static/chunks/629-fb843f0e629a968d.js",revision:"Db0Dx7NvqILmblifmFaBf"},{url:"/_next/static/chunks/633-9b7b72d8902bae59.js",revision:"Db0Dx7NvqILmblifmFaBf"},{url:"/_next/static/chunks/800.eeabfb10d6e3f41e.js",revision:"eeabfb10d6e3f41e"},{url:"/_next/static/chunks/977.893a1ea5fe72f1c6.js",revision:"893a1ea5fe72f1c6"},{url:"/_next/static/chunks/app/_not-found/page-40d4f33989fef8b9.js",revision:"Db0Dx7NvqILmblifmFaBf"},{url:"/_next/static/chunks/app/layout-b99e94fc25f8f013.js",revision:"Db0Dx7NvqILmblifmFaBf"},{url:"/_next/static/chunks/app/page-327544c31280e493.js",revision:"Db0Dx7NvqILmblifmFaBf"},{url:"/_next/static/chunks/app/zen/%5Bindex%5D/page-c490d0ce0fe02a3b.js",revision:"Db0Dx7NvqILmblifmFaBf"},{url:"/_next/static/chunks/app/~offline/page-3e1f631551a67768.js",revision:"Db0Dx7NvqILmblifmFaBf"},{url:"/_next/static/chunks/fd9d1056-b3bd52a8d361449a.js",revision:"Db0Dx7NvqILmblifmFaBf"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"Db0Dx7NvqILmblifmFaBf"},{url:"/_next/static/chunks/main-4b026218d809168f.js",revision:"Db0Dx7NvqILmblifmFaBf"},{url:"/_next/static/chunks/main-app-d6ac45f30c22c5b1.js",revision:"Db0Dx7NvqILmblifmFaBf"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"Db0Dx7NvqILmblifmFaBf"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"Db0Dx7NvqILmblifmFaBf"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-a29976282e123edd.js",revision:"Db0Dx7NvqILmblifmFaBf"},{url:"/_next/static/css/d8ea888600f7c5fd.css",revision:"d8ea888600f7c5fd"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/poppins-latin-400-normal.916d3686.woff2",revision:"916d3686"},{url:"/_next/static/media/poppins-latin-400-normal.cbe785df.woff",revision:"cbe785df"},{url:"/_next/static/media/poppins-latin-ext-400-normal.56cb5e9c.woff2",revision:"56cb5e9c"},{url:"/_next/static/media/poppins-latin-ext-400-normal.fbcaaafb.woff",revision:"fbcaaafb"},{url:"/fallback-ce627215c0e4a9af.js",revision:"9ce9e8fe1a0baf80515b990b51ddc4df"},{url:"/icon.svg",revision:"164e4adfb055eb1fb0d719cd0fc38256"},{url:"/icons/android-chrome-192x192.png",revision:"f483217ce0c6517f57d480ec484d6e9b"},{url:"/icons/android-chrome-384x384.png",revision:"9b290cd6666238ae0bb7672df0518200"},{url:"/icons/icon-512x512.png",revision:"10814b16728b27e83e782a266887e4c8"},{url:"/icons/icon-circle.png",revision:"5fa88833b06558993bd8fbd0fecbd2cc"},{url:"/icons/icon-circle.svg",revision:"ef5fd48c50a95cafd3c02ad0dd6de596"},{url:"/icons/icon.png",revision:"93d858098d506b74e0e0db1f1066f4eb"},{url:"/icons/logo.png",revision:"6f72aa34505b3b5ce6d1a54d00af1b1f"},{url:"/icons/logo.svg",revision:"db97f08e12eaf474821dfba0bb5fd0d1"},{url:"/locales/de_DE.json",revision:"654e2d902f0b118afbd167e21bee3925"},{url:"/locales/en_US.json",revision:"634eb830d7aab8e3229375f0d14cbef4"},{url:"/locales/zh_CN.json",revision:"fbbde63de2b4a5ad590737ffff868185"},{url:"/manifest.json",revision:"f9706f6d9fb7d22337389d32704459f3"},{url:"/swe-worker-5c72df51bb1f6ee0.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/~offline",revision:"Db0Dx7NvqILmblifmFaBf"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e},{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>"undefined"!=typeof self?self.fallback(e):Response.error()}]}),"GET")}));
