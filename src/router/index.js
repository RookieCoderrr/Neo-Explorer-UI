//import { createRouter, createWebHashHistory } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

// import AuthLayout from "@/layout/AuthLayout";
import Contracts from "../views/Contract/Contracts";
import ContractInfo from "../views/Contract/ContractInfo";
import TokenInfo from "../views/Token/TokenInfo.vue";
import BlockInfo from "../views/Block/BlockInfo.vue";
import CandiateList from "../views/Candidate/CandiateList.vue";
import Account from "../views/Account/AccountsList";
import TransactionList from "../views/Transaction/TransactionList.vue";
import AccountProfile from "../views/Account/AccountProfile";
import Tokens from "../views/Token/Tokens.vue";
import Blocks from "../views/Block/Blocks.vue";
import Search from "../views/NotFound/SearchNotFound";
import HomePage from "../views/Home/HomePage";
import PageNotFound from "../views/NotFound/PageNotFound";
import BurnFee from "../views/BurnGas/BurnFee";
import importEcharts from "../views/BurnGas/importEcharts";

import TransactionInfo from "../views/Transaction/TransactionInfo.vue";
import AuthLayout from "../layout/AuthLayout";

const routes = [
  {
    path: "/",
    redirect: "homepage",
    component: AuthLayout,
    children: [
      {
        path: "/:pathMatch(.*)*",
        name: "404",
        components: { default: PageNotFound },
        meta: {
          showSearch: false,
        },
      },
      {
        path: "/tokens",
        name: "tokens",
        components: { default: Tokens },
        meta: {
          showSearch: true,
        },
      },
      {
        path: "/burn",
        name: "burn",
        components: { default: BurnFee },
        meta: {
          showSearch: true,
        },
      },
      {
        path: "/echarts",
        name: "echarts",
        components: { default: importEcharts },
        meta: {
          showSearch: true,
        },
      },
      {
        path: "/blocks",
        name: "blocks",
        components: { default: Blocks },
        meta: {
          showSearch: true,
        },
      },
      {
        path: "/tokeninfo/:hash",
        name: "tokeninfo",
        components: { default: TokenInfo },
        meta: {
          showSearch: true,
        },
      },
      {
        path: "/blockinfo/:hash",
        name: "blockinfo",
        components: { default: BlockInfo },
        meta: {
          showSearch: true,
        },
      },
      {
        path: "/contracts",
        name: "contracts",
        components: { default: Contracts },
        meta: {
          showSearch: true,
        },
      },
      {
        path: "/contractinfo/:hash",
        name: "contractinfo",
        components: { default: ContractInfo },
        meta: {
          showSearch: true,
        },
      },
      {
        path: "/candidates",
        name: "Candidates",
        components: { default: CandiateList },
        meta: {
          showSearch: true,
        },
      },
      {
        path: "/account",
        name: "Accounts",
        components: { default: Account },
        meta: {
          showSearch: true,
        },
      },
      {
        path: "/accountprofile/:accountAddress",
        name: "AccountProfile",
        components: { default: AccountProfile },
        meta: {
          showSearch: true,
        },
      },
      {
        path: "/Transactions",
        name: "transactions",
        components: { default: TransactionList },
        meta: {
          showSearch: true,
        },
      },
      {
        path: "/homepage",
        name: "homepage",
        components: { default: HomePage },
        meta: {
          showSearch: false,
          HomePage:true,
        },
      },
      {
        path: "/transactionInfo/:txhash",
        name: "transactionInfo",
        components: { default: TransactionInfo },
        meta: {
          showSearch: true,
        },
      },
      {
        path: "search",
        name: "search",
        components: { default: Search },
        meta: {
          showSearch: false,
        },
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
