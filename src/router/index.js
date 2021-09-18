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
          showBot:false,
          showNet:true,
        },
      },
      {
        path: "/tokens",
        name: "tokens",
        component:Tokens ,
        meta: {
          showSearch: true,
          showBot:true,
          showNet:true,
        },
      },
      {
        path: "/burn",
        name: "burn",
        component: BurnFee ,
        meta: {
          showSearch: true,
          showBot:true,
          showNet:true,
        },
      },
      {
        path: "/echarts",
        name: "echarts",
        component: importEcharts ,
        meta: {
          showSearch: true,
          showBot:true,
          showNet:true,
        },
      },
      {
        path: "/blocks",
        name: "blocks",
        component: Blocks ,
        meta: {
          showSearch: true,
          showBot:true,
          showNet:true,
        },
      },
      {
        path: "/tokeninfo/:hash",
        name: "tokeninfo",
        component: TokenInfo ,
        meta: {
          showSearch: true,
          showBot:true,
          showNet:false,
        },
      },
      {
        path: "/blockinfo/:hash",
        name: "blockinfo",
        component:  BlockInfo ,
        meta: {
          showSearch: true,
          showBot:true,
          showNet:false,
        },
      },
      {
        path: "/contracts",
        name: "contracts",
        component: Contracts,
        meta: {
          showSearch: true,
          showBot:true,
          showNet:true,
        },
      },
      {
        path: "/contractinfo/:hash",
        name: "contractinfo",
        component:  ContractInfo ,
        meta: {
          showSearch: true,
          showBot:true,
          showNet:false,
        },
      },
      {
        path: "/candidates",
        name: "Candidates",
        component:  CandiateList ,
        meta: {
          showSearch: true,
          showBot:true,
          showNet:true,
        },
      },
      {
        path: "/account",
        name: "Accounts",
        component:  Account,
        meta: {
          showSearch: true,
          showBot:true,
          showNet:true,
        },
      },
      {
        path: "/accountprofile/:accountAddress",
        name: "AccountProfile",
        component:  AccountProfile ,
        meta: {
          showSearch: true,
          showBot:true,
          showNet:false,
        },
      },
      {
        path: "/Transactions",
        name: "transactions",
        component:  TransactionList ,
        meta: {
          showSearch: true,
          showBot:true,
          showNet:true,
        },
      },
      {
        path: "/homepage",
        name: "homepage",
        component: HomePage ,
        meta: {
          showSearch: false,
          HomePage:true,
          showBot:true,
          showNet:true,
        },
      },
      {
        path: "/transactionInfo/:txhash",
        name: "transactionInfo",
        component:  TransactionInfo ,
        meta: {
          showSearch: true,
          showBot:true,
          showNet:false,
        },
      },
      {
        path: "search",
        name: "search",
        component:  Search,
        meta: {
          showSearch: false,
          showBot:false,
          showNet:true,
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
