//import { createRouter, createWebHashHistory } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";
import Contracts from "../views/Contracts";
import ContractInfo from "../views/ContractInfo";
import Dashboard from "../views/Dashboard.vue";
import TokenInfo from "../views/TokenInfo.vue";
import Maps from "../views/Maps.vue";
import Profile from "../views/UserProfile.vue";
import Account from "../views/AccountsList";
//import Tables from "../views/Tables.vue";
import AccountProfile from "../views/AccountProfile";
import Tokens from "../views/Tokens.vue";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const routes = [
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        components: { default: Login },
      },
      {
        path: "/register",
        name: "register",
        components: { default: Register },
      },
    ],
  },
  {
    path: "/",
    redirect: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        components: { default: Dashboard },
      },
      {
        path: "/tokens",
        name: "tokens",
        components: { default: Tokens },
      },
      {
        path: "/tokeninfo/:hash",
        name: "tokeninfo",
        components: { default: TokenInfo },
      },
      {
        path: "/contracts",
        name: "contracts",
        components: { default: Contracts },
      },
      {
        path: "/contractinfo/:hash",
        name: "contractinfo",
        components: { default: ContractInfo },
      },
      {
        path: "/maps",
        name: "maps",
        components: { default: Maps },
      },
      {
        path: "/profile",
        name: "profile",
        components: { default: Profile },
      },
      // TODO: 需要加到主页的路径中，通过api可以获得account的总数
      {
        path: "/account",
        name: "Accounts",
        components: { default: Account },
      },
      //{
      //  path: "/tables",
      //  name: "tables",
      //  components: { default: Tables },
      //},
      {
        path: "/accountprofile/:accountAddress",
        name: "AccountProfile",
        components: { default: AccountProfile },
      },
      {
        path: '/icons/:txhash',
        name: 'icons',
        components: { default: Icons },
      }
    ],
  },
];

const router = createRouter({
  //history: createWebHashHistory(),
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
});

export default router;
