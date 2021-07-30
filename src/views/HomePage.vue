<template>
  <div>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-2">
          <stats-card
            title="Total Blocks"
            type="gradient-red"
            :sub-title="blockCount.toLocaleString()"
            icon="ni ni-ungroup"
            class="mb-4 mb-xl-0"
          >
          </stats-card>
        </div>
        <div class="col-2">
          <stats-card
            title="Total Txns"
            type="gradient-orange"
            :sub-title="txCount.toLocaleString()"
            icon="ni ni-cart"
            class="mb-4 mb-xl-0"
          >
          </stats-card>
        </div>
        <div class="col-2">
          <stats-card
            title="Total Users"
            type="gradient-green"
            :sub-title="accountCount.toLocaleString()"
            icon="ni ni-single-02"
            class="mb-4 mb-xl-0"
          >
          </stats-card>
        </div>
        <div class="col-2">
          <stats-card
            title="Total Assets"
            type="gradient-purple"
            :sub-title="assetCount.toLocaleString()"
            icon="ni ni-money-coins"
            class="mb-4 mb-xl-0"
          >
          </stats-card>
        </div>
        <div class="col-2">
          <stats-card
              title="Total Candi"
              type="gradient-blue"
              :sub-title="candidateCount.toLocaleString()"
              icon="ni ni-badge"
              class="mb-4 mb-xl-0"
          >
         </stats-card>
        </div>
        <div class="col-2">
          <stats-card
              title="Total Contra"
              type="gradient-red"
              :sub-title="contractCount.toLocaleString()"
              icon="ni ni-collection"
              class="mb-4 mb-xl-0"
          >
          </stats-card>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-6">
          <blocks-table title="Recent Blocks"></blocks-table>
        </div>
        <div class="col-6">
          <transaction-table-homepage title="Recent Transactions"></transaction-table-homepage>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BlocksTable from '../views/Tables/BlocksTable'
import TransactionTableHomepage from "../views/Tables/TransactionsTableHomepage";
import axios from "axios";
import StatsCard from "../components/StatsCard";

export default {
  name: "Home",
  components: {
    StatsCard,
    BlocksTable,
    TransactionTableHomepage,
  },
  data() {
    return {
      blockCount: 0,
      txCount: 0,
      accountCount: 0,
      assetCount: 0,
      contractCount: 0,
      candidateCount: 0,
    };
  },
  created() {
    this.getBlockCount();
    this.getTxCount();
    this.getAccountCount();
    this.getAssetCount();
    this.getContractCount();
    this.getCandidateCount();
  },
  methods: {
    getBlockCount() {
      axios({
        method: "post",
        url: "/api",
        data: {
          params: {},
          jsonrpc: "2.0",
          id: 1,
          method: "GetBlockCount",
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        this.blockCount = res["data"]["result"]["index"];
      });
    },
    getTxCount() {
      axios({
        method: "post",
        url: "/api",
        data: {
          params: {},
          jsonrpc: "2.0",
          id: 1,
          method: "GetTransactionCount",
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        this.txCount = res["data"]["result"]["total counts"];
      });
    },
    getAccountCount() {
      axios({
        method: "post",
        url: "/api",
        data: {
          params: {},
          jsonrpc: "2.0",
          id: 1,
          method: "GetAccountCount",
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        this.accountCount = res["data"]["result"]["total counts"];
      });
    },
    getAssetCount() {
      axios({
        method: "post",
        url: "/api",
        data: {
          params: {},
          jsonrpc: "2.0",
          id: 1,
          method: "GetAssetCount",
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        this.assetCount = res["data"]["result"]["total counts"];
      });
    },
    getContractCount() {
      axios({
        method: "post",
        url: "/api",
        data: {
          params: {},
          jsonrpc: "2.0",
          id: 1,
          method: "GetContractCount",
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        this.contractCount = res["data"]["result"]["total counts"];
      });
    },
    getCandidateCount() {
      axios({
        method: "post",
        url: "/api",
        data: {
          params: {},
          jsonrpc: "2.0",
          id: 1,
          method: "GetCandidateCount",
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        this.candidateCount = res["data"]["result"]["total counts"];
      });
    },
  },

};
</script>
<style></style>
