import createRouter from 'app-plugin/router'              // 引入共用 npm 的 router 設定

const resetPath = process.env.VUE_APP_RESET_PATH          // 當沒有 token 時，會進入到哪一頁
export const pattern = /Page403|Page404|Page500|Login/    // 那些頁面不需要檢查是否有token，避免無線循環
export const routes = [                                   // 靜態 routes 
  {
    path: '/login',
    name: 'Login',
    component: () => import('@v/login'),
  },
  {
    path: '/403',
    name: 'Page403',
    component: () => import('app-plugin/pages/errors/Page403.vue'),
  },
  {
    path: '/404',
    name: 'Page404',
    component: () => import('app-plugin/pages/errors/Page404.vue'),
  },
  {
    path: '/500',
    name: 'Page500',
    component: () => import('app-plugin/pages/errors/Page500.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@v/pages/TestPage/Test.vue'),
  },
]

const router = createRouter({   //  創建新 router
  routes,
  resetPath,
  pattern,
})

export default router