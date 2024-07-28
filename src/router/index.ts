import { createRouter, createWebHistory } from 'vue-router'
import AirportView from '@/views/AirportView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/enroute',
    //   name: 'enroute',
    //   component: EnrouteView,
    //   meta:{
    //     'keepAlive': true
    //   }
    // },
    {
      path: '/airport',
      name: 'airport',
      component: AirportView,
      meta:{
        'keepAlive': true
      }
    },
    // {
    //   path: '/',
    //   redirect: '/enroute'
    // }
  ]
})

export default router
