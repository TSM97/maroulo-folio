import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/ProjectsView.vue'),
  },
  {
    path: '/projects/:slug',
    name: 'project-detail',
    component: () => import('@/views/ProjectDetailView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

if (import.meta.env.DEV) {
  routes.splice(routes.length - 1, 0, {
    path: '/styleguide',
    name: 'styleguide',
    component: () => import('@/views/StyleguideView.vue'),
  })
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    // Wait for the outgoing page to fade (see PageTransition) before moving the scroll position.
    return new Promise((resolve) => {
      setTimeout(() => resolve(savedPosition ?? { top: 0 }), 200)
    })
  },
})

export default router
