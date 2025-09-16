
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/home",
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-PRK7V3KI.js",
      "chunk-NW42X7WU.js",
      "chunk-MVO62GWL.js"
    ],
    "route": "/login"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-JDEETFNQ.js",
      "chunk-NW42X7WU.js",
      "chunk-MVO62GWL.js"
    ],
    "route": "/register"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-EZM3NVQ2.js",
      "chunk-NW42X7WU.js",
      "chunk-MVO62GWL.js"
    ],
    "route": "/forgot"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-TOHYNKXH.js",
      "chunk-P3DDOO3Z.js",
      "chunk-75GS4FTA.js"
    ],
    "route": "/home"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-LYG4U5HH.js"
    ],
    "route": "/cart"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-DZMHRK46.js"
    ],
    "route": "/wishlist"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-7ALYNKF2.js",
      "chunk-MVO62GWL.js",
      "chunk-P3DDOO3Z.js"
    ],
    "route": "/products"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-RHPXVWSI.js"
    ],
    "route": "/brands"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-NPYMMF7H.js",
      "chunk-75GS4FTA.js"
    ],
    "route": "/categories"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-JMEQOQZX.js"
    ],
    "route": "/allorders"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-MYNF2PBJ.js"
    ],
    "route": "/details/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-MYNF2PBJ.js"
    ],
    "route": "/details/*/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-3CGOCOU3.js",
      "chunk-NW42X7WU.js",
      "chunk-MVO62GWL.js"
    ],
    "route": "/checkout/*"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-TOEQDO5Y.js"
    ],
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 12843, hash: '189db98d4a76483b5a075e6bccf09e52d6d0b5c2756737eee6678d0330dc9d30', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2503, hash: '8d1b0fe3dbdebbbba8130e08c1348aa336cf5df3150e5d7fc6486dcae3b61c9c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 98909, hash: 'ba212bb7bb65c0a613d4de37392cf29c9d4437bd4cc0c30eecd210e067b8ffd9', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 99446, hash: '59fa9be595ec854dfb78358ea24fd4d168c29f1f2270ddc702360cae8f6740a2', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'cart/index.html': {size: 98805, hash: 'b49601461192b85b7eba342c535d62929f9644bed50617a7b50bdc17fa28647f', text: () => import('./assets-chunks/cart_index_html.mjs').then(m => m.default)},
    'brands/index.html': {size: 98805, hash: '0d5ce94dc2200bf735258f62087dcf9c74b4c15f7415e2bafd2911bac79e6d1f', text: () => import('./assets-chunks/brands_index_html.mjs').then(m => m.default)},
    'allorders/index.html': {size: 98806, hash: '56133a15b7c4c228633e4fc20da4122e4b29d2b48dd17594af040fabae0c8e89', text: () => import('./assets-chunks/allorders_index_html.mjs').then(m => m.default)},
    'products/index.html': {size: 98909, hash: '66ee39b660e2324d53ee0169a43ebe90cd2fee229e86c5a9054d597a43fc5567', text: () => import('./assets-chunks/products_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 98909, hash: '13b33359c2926bf964dd4a346a23e68c923b11ad1cd9c838447601d51acc8476', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'forgot/index.html': {size: 100404, hash: '91662e1f33ffe00fba509613c67921077f7fbb591439a2a1af4230534f9fa7de', text: () => import('./assets-chunks/forgot_index_html.mjs').then(m => m.default)},
    'categories/index.html': {size: 98857, hash: '74eb2eedf09fe5ea153c49893731f13278131437f745122e6fd6943fab6b691b', text: () => import('./assets-chunks/categories_index_html.mjs').then(m => m.default)},
    'wishlist/index.html': {size: 98805, hash: 'f46ecfd0d08c356578754eea61d5a64ab0420282f79f11603df45080100a1af1', text: () => import('./assets-chunks/wishlist_index_html.mjs').then(m => m.default)},
    'styles-Q7LTGFCP.css': {size: 193860, hash: 'rbxvgJZEwHU', text: () => import('./assets-chunks/styles-Q7LTGFCP_css.mjs').then(m => m.default)}
  },
};
