import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => import('../views/HomeView.vue')
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('../views/AboutView.vue')
  // }
  {
    path: '/',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/admin',
    component: () => import('@/views/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('@/views/ProductsView.vue')
      },
      {
        path: 'orders',
        component: () => import('@/views/OrdersView.vue')
      },
      {
        path: 'coupons',
        component: () => import('@/views/CouponsView.vue')
      },
      {
        path: 'article',
        component: () => import('@/views/ArticleView.vue')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('@/views/DashboardView.vue'),
    children: [
      {
        path: 'articles',
        component: () => import('@/views/UserArticlesView.vue')
      },
      {
        path: 'article/:articleId',
        component: () => import('@/views/UserArticleView.vue')
      },
      {
        path: 'cart',
        component: () => import('@/views/UserCartView.vue')
      },
      {
        path: 'product/:productId',
        component: () => import('@/views/UserProductView.vue')
      },
      {
        path: 'checkPaid/:checkPaidId',
        component: () => import('@/views/UserCheckPaidView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
