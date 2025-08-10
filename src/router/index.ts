import { createRouter, createWebHistory } from 'vue-router'
import UserLoginPage from '@/pages/user/UserLoginPage.vue'
import UserRegisterPage from '@/pages/user/UserRegisterPage.vue'
import UserManagePage from '@/pages/admin/UserManagePage.vue'
import AddPicturePage from '@/pages/AddPicturePage.vue'
import PictureManagePage from '@/pages/admin/PictureManagePage.vue'
import HomePage from '@/pages/HomePage.vue'
import PictureDetailPage from '@/pages/PictureDetailPage.vue'
import AddPictureBatchPage from '@/pages/AddPictureBatchPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
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
    {
      path: '/admin/pictureManage',
      name: 'picture manage',
      component: PictureManagePage,
    },
    {
      path: '/picture/:id',
      name: 'picture detail info',
      component: PictureDetailPage,
      props: true,
    },
    {
      path: '/add_picture/batch',
      name: 'Batch insert picture',
      component: AddPictureBatchPage,
    },
  ],
})

export default router
