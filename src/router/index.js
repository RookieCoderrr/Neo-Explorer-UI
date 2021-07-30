//import { createRouter, createWebHashHistory } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

//import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";
import Contracts from "../views/Contracts";
import ContractInfo from "../views/ContractInfo";
import TokenInfo from "../views/TokenInfo.vue";
import CandiateList from "../views/CandiateList.vue";
import Profile from "../views/UserProfile.vue";
import Account from "../views/AccountsList";
import TransactionList from "../views/TransactionList.vue";
import AccountProfile from "../views/AccountProfile";
import Tokens from "../views/Tokens.vue";
import Blocks from "../views/Blocks.vue";
import Test from "../views/test.vue";
import Search from "../views/Search";
import HomePage from "../views/HomePage";

import TransactionInfo from "../views/TransactionInfo.vue";

//import Login from "../views/Login.vue";
//import Register from "../views/Register.vue";

const routes = [
  {
    path: "/",
    redirect: "homepage",
    component: AuthLayout,
    children: [
      {
        path: "/tokens",
        name: "tokens",
        components: { default: Tokens },
      },
      {
        path: "/blocks",
        name: "blocks",
        components: { default: Blocks },
      },
      {
        path: "/test",
        name: "test",
        components: { default: Test },
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
        path: "/candidates",
        name: "Candidates",
        components: { default: CandiateList },
      },
      {
        path: "/profile",
        name: "profile",
        components: { default: Profile },
      },
      {
        path: "/account",
        name: "Accounts",
        components: { default: Account },
      },
      {
        path: "/accountprofile/:accountAddress",
        name: "AccountProfile",
        components: { default: AccountProfile },
      },
      {
        path: "/Transactions",
        name: "transactions",
        components: { default: TransactionList },
      },
      {
        path: "/homepage",
        name: "homepage",
        components: { default: HomePage },
      },
      {
        path: "/transactionInfo/:txhash",
        name: "transactionInfo",
        components: { default: TransactionInfo },
      },
      {
        path: "search",
        name: "search",
        components: { default: Search },
      },
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
