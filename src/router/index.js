import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/homePage',
    children: [{
      path: 'homePage',
      name: 'homePage',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/compomentsMenu',
    component: Layout,
    redirect: '/table',
    name: 'compomentsMenu',
    meta: { title: '优化的组件', icon: 'table' },
    children: [{
      path: '/table',
      name: 'table',
      component: () => import('@/views/table/table'),
      meta: { title: '超长表格', icon: 'table' }
    }, {
      path: '/LongSelect',
      name: 'longSelect',
      component: () => import('@/views/table/longSelect'),
      meta: { title: '超长下拉', icon: 'tree' }
    }, {
      path: '/roleMenu',
      name: 'roleMenu',
      component: () => import('@/views/roleManage/roleMenu'),
      meta: { title: '菜单平铺', icon: 'example' }
    }]
  },
  {
    path: '/translateMenu',
    component: Layout,
    redirect: '/translate',
    name: 'compomentsMenu',
    meta: { title: '国际化', icon: 'nested' },
    children: [{
      path: '/translate',
      name: 'translate',
      component: () => import('@/views/translate/translate'),
      meta: { title: 'Translate', icon: 'nested' }
    }]
  },
  {
    path: '/permissionMenu',
    component: Layout,
    redirect: '/permission',
    name: 'compomentsMenu',
    meta: { title: '按钮权限', icon: 'nested' },
    children: [{
      path: '/permission',
      name: 'permissionButton',
      component: () => import('@/views/permission/perButton'),
      meta: { title: '按钮权限', icon: 'example' }
    }]
  },
  {
    path: '/haveFun',
    component: Layout,
    redirect: '/game1',
    name: 'haveFun',
    meta: { title: '开心一下', icon: 'funny' },
    children: [{
      path: '/game1',
      name: 'game1',
      component: () => import('@/views/games/Game1'),
      meta: { title: '小游戏1', icon: 'funny' }
    },
    {
      path: '/pokemonList',
      name: 'pokemonList',
      component: () => import('@/views/pokemon/pokemonTable'),
      meta: { title: '全国图鉴', icon: 'table' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
