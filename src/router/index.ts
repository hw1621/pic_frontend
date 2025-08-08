import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserLoginPage from '@/pages/user/UserLoginPage.vue'
import UserRegisterPage from '@/pages/user/UserRegisterPage.vue'
import UserManagePage from '@/pages/admin/UserManagePage.vue'
import AddPicturePage from '@/pages/AddPicturePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/user/login',
      name: 'user login',
      component: UserLoginPage,
    },
    {
      path: '/user/register',
      name: 'user register',
      component: UserRegisterPage,
    },
    {
      path: '/add_picture',
      name: 'Add Picture',
      component: AddPicturePage,
    },
    {
      path: '/admin/userManage',
      name: 'user manage',
      component: UserManagePage,
    },
  ],
})

export default router
