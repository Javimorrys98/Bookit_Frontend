import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookingsLayout from '@/views/bookings/BookingsLayout.vue'
import AuthAPI from '@/api/AuthAPI'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: { name: 'my-bookings' },
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: BookingsLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'my-bookings',
          component: () => import('../views/bookings/MyBookingsView.vue'),
        },
        {
          path: 'new',
          component: () => import('../views/bookings/NewBookingLayout.vue'),
          children: [
            {
              path: '',
              name: 'new-booking',
              component: () => import('../views/bookings/ServicesView.vue'),
            },
            {
              path: 'details',
              name: 'booking-details',
              component: () => import('../views/bookings/BookingView.vue'),
            }
          ]
        },
        {
          path: ':id/edit',
          component: () => import('../views/bookings/EditBookingLayout.vue'),
          children: [
            {
              path: '',
              name: 'edit-booking',
              component: () => import('../views/bookings/ServicesView.vue'),
            },
            {
              path: 'details',
              name: 'edit-booking-details',
              component: () => import('../views/bookings/BookingView.vue'),
            }
          ]
        },
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthLayout.vue'),
      children: [
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue'),
        },
        {
          path: 'verify-account/:token',
          name: 'verify-account',
          component: () => import('../views/auth/VerifyAccountView.vue'),
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue'),
        },
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    try {
      await AuthAPI.auth();
      next();
    } catch (error) {
      console.log(error.response.data.msg);
      next({ name: 'login' });
    }
  } else {
    next()
  }

})

export default router
