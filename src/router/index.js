import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import LegalView from '../views/LegalView.vue'
import AuthView from '../views/AuthView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Vyliam Systems | Next-Gen Software for Windows & Android' }
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView,
    meta: { title: 'Products Showcase | Vyliam Systems' }
  },
  {
    path: '/products/:id',
    name: 'product-detail',
    component: ProductDetailView,
    meta: { title: 'Product Details | Vyliam Systems' }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { title: 'About Us | Vyliam Systems' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: { title: 'Contact & Support | Vyliam Systems' }
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: LegalView,
    meta: { title: 'Privacy Policy | Vyliam Systems' }
  },
  {
    path: '/terms',
    name: 'terms',
    component: LegalView,
    meta: { title: 'Terms of Service | Vyliam Systems' }
  },
  {
    path: '/auth',
    alias: ['/login', '/register'],
    name: 'auth',
    component: AuthView,
    meta: { title: 'Account Access & Registration | Vyliam Systems' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
})

export default router
