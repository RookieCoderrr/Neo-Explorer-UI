import { createRouter, createWebHistory } from "vue-router";
const Contracts = ()=>import('../views/Contract/Contracts');
const ContractInfo = ()=>import('../views/Contract/ContractInfo');
const TokenInfo = ()=>import('../views/Token/TokenInfo');
const BlockInfo = ()=>import('../views/Block/BlockInfo');
const CandiateList = ()=>import('../views/Candidate/CandiateList');
const Account = ()=>import('../views/Account/AccountsList');
const TransactionList = ()=>import('../views/Transaction/TransactionList');
const AccountProfile = ()=>import('../views/Account/AccountProfile');
const Tokens = ()=>import('../views/Token/Tokens');
const Blocks = ()=>import('../views/Block/Blocks');
const Search = ()=>import('../views/NotFound/SearchNotFound');
const HomePage = ()=>import('../views/Home/HomePage');
const PageNotFound = ()=>import('../views/NotFound/PageNotFound');
const BurnFee = ()=>import('../views/BurnGas/BurnFee');
const importEcharts = ()=>import('../views/BurnGas/DailyTransaction');
const TransactionInfo = ()=>import('../views/Transaction/TransactionInfo');
import AuthLayout from "../layout/AuthLayout";

const routes = [
  {
    path: "/",
    redirect: "homepage",
    component: AuthLayout,
    children: [
      {
        path: '/:pathMatch(.*)',
        name: '404',
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
