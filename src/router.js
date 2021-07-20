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
            path: 'customerTable/detail',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/customer/page/customerDetail'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'customerTable/add',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/customer/form/addCustomer'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'projectTable',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/project/datatable/projectTable'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'schemeTable',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/scheme/datatable/schemeTable'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'itemTable',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/item/datatable/itemTable'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          },
          {
            path: 'quoteTable',
            component: () => import(/* webpackChunkName: "piaf" */ './views/app/quote/datatable/quoteTable'),
            // meta: { roles: [UserRole.Admin, UserRole.Editor] },
          }
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
      {
        path: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/Register")
      },
      {
        path: "forgot-password",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/ForgotPassword")
      },
      {
        path: "reset-password",
        component: () =>
          import(/* webpackChunkName: "user" */ "./views/user/ResetPassword")
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
