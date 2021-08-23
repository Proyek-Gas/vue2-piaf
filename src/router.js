import Vue from "vue";
import VueRouter from "vue-router";
import AuthGuard from "./utils/auth.guard";
import { adminRoot } from "./constants/config";
import { UserRole } from "./utils/auth.roles";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "./views/home"),
    redirect: `${adminRoot}`,
    //redirect : "/user"
  },
  {
    path: adminRoot,
    component: () => import(/* webpackChunkName: "app" */ "./views/app"),
    redirect: `${adminRoot}/datatable`,
    meta: { loginRequired: true },
    /*
   define with Authorization :
   meta: { loginRequired: true, roles: [UserRole.Admin, UserRole.Editor] },
   */
    children: [
      {
        path: "user",
        component: () =>
        import(/* webpackChunkName: "piaf" */ "./views/app/user"),
        children : [
          {
            path: 'setting',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/user/settingPage'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'profile',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/user/page/profile'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
        ]
      },
      {
        path: "task",
        component: () =>
        import(/* webpackChunkName: "piaf" */ "./views/app/task"),
        children : [
          {
            path: 'taskDetail',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/task/taskPage'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
        ]
      },
      {
        path: "datatable",
        component: () =>
          import(/* webpackChunkName: "piaf" */ "./views/app/customer/datatable"),
        redirect: `${adminRoot}/datatable/customerTable`,
        children: [
          {
            path: 'customerTable',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/customer/datatable/customerTable'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'customerTable/cdetail',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/customer/page/customerDetail'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'customerTable/add',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/customer/form/addCustomer'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'customerTable/cdetail/edit',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/customer/form/editCustomer'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'projectTable',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/project/datatable/projectTable'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'projectTable/pDetail',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/project/page/projectDetail'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'projectTable/pdetail/edit',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/project/form/editProject'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'projectTable/add',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/project/form/addProject'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'schemeTable',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/scheme/datatable/schemeTable'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'schemeTable/sDetail',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/scheme/page/schemeDetail'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'schemeTable/sDetail/edit',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/scheme/form/editScheme'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'schemeTable/add',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/scheme/form/addScheme'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'itemTable',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/item/datatable/itemTable'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'itemTable/add',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/item/form/addItem'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'itemTable/iDetail',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/item/page/itemDetail'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'itemTable/iDetail/edit',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/item/form/editItem'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'quoteTable',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/quote/datatable/quoteTable'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'quoteTable/add',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/quote/form/addQuote'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'quoteTable/qDetail/edit',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/quote/form/editQuote'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'quoteTable/qDetail',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/quote/page/quoteDetail'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'userTable/add',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/user/form/addUser'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'userTable/uDetail/edit',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/user/form/editUser'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
        ],
      },
      {
        path: "piaf",
        component: () =>
          import(/* webpackChunkName: "piaf" */ "./views/app/piaf"),
        redirect: `${adminRoot}/piaf/start`,
        children: [
          {
            path: 'start',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/piaf/Start')
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          }
        ]
      },
      {
        path: "second-menu",
        component: () =>
          import(/* webpackChunkName: "second-menu" */ "./views/app/second-menu"),
        redirect: `${adminRoot}/second-menu/second`,
        children: [
          { path: 'second', component: () => import(/* webpackChunkName: "piaf" */ './views/app/second-menu/Second') }
        ]
      },


      {
        path: "single",
        component: () =>
          import(/* webpackChunkName: "single" */ "./views/app/single")
      }
    ]
  },
  {
    path: "/error",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  },
  {
    path: "/user",
    component: () => import(/* webpackChunkName: "user" */ "./views/user"),
    redirect: "/user/login",
    children: [
      {
        path: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Login")
      },


    ]
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName: "error" */ "./views/Error")
  }
];

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history",
});
router.beforeEach(AuthGuard);
export default router;
