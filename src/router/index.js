import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookingsLayout from '@/views/bookings/BookingsLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: BookingsLayout,
      children: [
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
        }
      ]
    }
  ]
})

export default router
