import { createRouter, createWebHistory } from 'vue-router'
import UserLoginPage from '@/pages/user/UserLoginPage.vue'
import UserRegisterPage from '@/pages/user/UserRegisterPage.vue'
import UserManagePage from '@/pages/admin/UserManagePage.vue'
import AddPicturePage from '@/pages/AddPicturePage.vue'
import PictureManagePage from '@/pages/admin/PictureManagePage.vue'
import HomePage from '@/pages/HomePage.vue'
import PictureDetailPage from '@/pages/PictureDetailPage.vue'
import AddPictureBatchPage from '@/pages/AddPictureBatchPage.vue'
import SpaceManagePage from '@/pages/admin/SpaceManagePage.vue'
import AddSpacePage from '@/pages/AddSpacePage.vue'
import SpaceDetailPage from '@/pages/SpaceDetailPage.vue'
import MySpacePage from '@/pages/MySpacePage.vue'
import SearchPicturePage from '@/pages/SearchPicturePage.vue'

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
      path: '/space/:id',
      name: 'space detail info',
      component: SpaceDetailPage,
      props: true,
    },
    {
      path: '/admin/spaceManage',
      name: 'Space Manage',
      component: SpaceManagePage,
    },
    {
      path: '/add_picture/batch',
      name: 'Batch insert picture',
      component: AddPictureBatchPage,
    },
    {
      path: '/add_space',
      name: 'Add space page',
      component: AddSpacePage,
    },
    {
      path: '/my_space',
      name: 'my space',
      component: MySpacePage,
    },
    {
      path: '/search_picture',
      name: 'Search pic by pic',
      component: SearchPicturePage,
    }
  ],
})

export default router
