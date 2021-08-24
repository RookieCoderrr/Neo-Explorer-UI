import { createRouter, createWebHistory } from "vue-router";
// import Contracts from "../views/Contract/Contracts";
const Contracts = ()=>import('../views/Contract/Contracts');
const ContractInfo = ()=>import('../views/Contract/ContractInfo');
const TokenInfo = ()=>import('../views/Token/TokenInfo');
const BlockInfo = ()=>import('../views/Block/BlockInfo');
const CandiateList = ()=>import('../views/Candidate/CandiateList');
const Account = ()=>import('../views/Account/AccountsList');
// import ContractInfo from "../views/Contract/ContractInfo";
// import TokenInfo from "../views/Token/TokenInfo.vue";
// import BlockInfo from "../views/Block/BlockInfo.vue";
// import CandiateList from "../views/Candidate/CandiateList.vue";
// import Account from "../views/Account/AccountsList";
// import TransactionList from "../views/Transaction/TransactionList.vue";
const TransactionList = ()=>import('../views/Transaction/TransactionList');
// import AccountProfile from "../views/Account/AccountProfile";
const AccountProfile = ()=>import('../views/Account/AccountProfile');
// import Tokens from "../views/Token/Tokens.vue";
const Tokens = ()=>import('../views/Token/Tokens');
// import Blocks from "../views/Block/Blocks.vue";
const Blocks = ()=>import('../views/Block/Blocks');
// import Search from "../views/NotFound/SearchNotFound";
const Search = ()=>import('../views/NotFound/SearchNotFound');
// import HomePage from "../views/Home/HomePage";
const HomePage = ()=>import('../views/Home/HomePage');
// import PageNotFound from "../views/NotFound/PageNotFound";
const PageNotFound = ()=>import('../views/NotFound/PageNotFound');
// import BurnFee from "../views/BurnGas/BurnFee";
const BurnFee = ()=>import('../views/BurnGas/BurnFee');
// import importEcharts from "../views/BurnGas/importEcharts";
const importEcharts = ()=>import('../views/BurnGas/importEcharts');
// import TransactionInfo from "../views/Transaction/TransactionInfo.vue";
const TransactionInfo = ()=>import('../views/Transaction/TransactionInfo');
import AuthLayout from "../layout/AuthLayout";
// const AccountProfile = ()=>import('../views/Account/AccountProfile');
const routes = [
  {
    path: "/",
    redirect: "homepage",
    component: AuthLayout,
    children: [
      {
        path: "/:pathMatch(.*)*",
        name: "404",
        component: PageNotFound,
        meta: {
          showSearch: false,
        },
      },
      {
        path: "/tokens",
        name: "tokens",
        component:Tokens ,
        meta: {
          showSearch: true,
        },
      },
      {
        path: "/burn",
        name: "burn",
        component: BurnFee ,
        meta: {
          showSearch: true,
        },
      },
      {
        path: "/echarts",
        name: "echarts",
        component: importEcharts ,
        meta: {
          showSearch: true,
        },
      },
      {
        path: "/blocks",
        name: "blocks",
        component: Blocks ,
        meta: {
          showSearch: true,
        },
      },
      {
        path: "/tokeninfo/:hash",
        name: "tokeninfo",
        component: TokenInfo ,
        meta: {
          showSearch: true,
        },
      },
      {
        path: "/blockinfo/:hash",
        name: "blockinfo",
        component:  BlockInfo ,
        meta: {
          showSearch: true,
        },
      },
      {
        path: "/contracts",
        name: "contracts",
        component: Contracts,
        meta: {
          showSearch: true,
        },
      },
      {
        path: "/contractinfo/:hash",
        name: "contractinfo",
        component:  ContractInfo ,
        meta: {
          showSearch: true,
        },
      },
      {
        path: "/candidates",
        name: "Candidates",
        component:  CandiateList ,
        meta: {
          showSearch: true,
        },
      },
      {
        path: "/account",
        name: "Accounts",
        component:  Account,
        meta: {
          showSearch: true,
        },
      },
      {
        path: "/accountprofile/:accountAddress",
        name: "AccountProfile",
        component:  AccountProfile ,
        meta: {
          showSearch: true,
        },
      },
      {
        path: "/Transactions",
        name: "transactions",
        component:  TransactionList ,
        meta: {
          showSearch: true,
        },
      },
      {
        path: "/homepage",
        name: "homepage",
        component: HomePage ,
        meta: {
          showSearch: false,
          HomePage:true,
        },
      },
      {
        path: "/transactionInfo/:txhash",
        name: "transactionInfo",
        component:  TransactionInfo ,
        meta: {
          showSearch: true,
        },
      },
      {
        path: "search",
        name: "search",
        component:  Search,
        meta: {
          showSearch: false,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
});

export default router;
