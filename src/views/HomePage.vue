<template>
  <section class="Intro bg-gradient-success" >
    <h2 class="Intro-h display-2 text-white">{{ $t('home') }}</h2>
    <div class="search mt--5 ml-5">
      <input
          type="text"
          class="over-ellipsis"
          :placeholder="$t('search.placeholder')"
          v-model ="searchVal"
          autocomplete="off"
          @keyup.enter="search()"
      /><button  class="button" @click="search()"><img class="img" src="../assets/search.png" alt="search" /></button>
    </div>
  </section>
  <div class="row mt-5"></div>
  <div>
    <div class="container-fluid mt--8" style="padding-bottom: 50px">
      <div class="row">
        <div class="col">
          <stats-card shadow
            :title="$t('homePage.totalBLocks')"
            type="gradient-red"
            :sub-title="blockCount.toLocaleString()"
            icon="ni ni-ungroup"
            class="mb-4 mb-xl-0"
          >
          </stats-card>
        </div>
        <div class="col">
          <stats-card shadow
            :title="$t('homePage.totalTxs')"
            type="gradient-orange"
            :sub-title="txCount.toLocaleString()"
            icon="ni ni-cart"
            class="mb-4 mb-xl-0"
          >
          </stats-card>
        </div>
        <div class="col">
          <stats-card shadow
                  :title="$t('homePage.totalTokens')"
                  type="gradient-red"
                  :sub-title="assetCount.toLocaleString()"
                  icon="ni ni-money-coins"
                  class="mb-4 mb-xl-0"
          >
          </stats-card>
        </div>

      </div>
      <div class="row mt-4">
        <div class="col">
          <stats-card shadow
              :title="$t('homePage.totalCntrts')"
              type="gradient-purple"
              :sub-title="contractCount.toLocaleString()"
              icon="ni ni-collection"
              class="mb-4 mb-xl-0"
          >
          </stats-card>
        </div>
        <div class="col">
          <stats-card shadow
              :title="$t('homePage.totalAddrs')"
              type="gradient-green"
              :sub-title="accountCount.toLocaleString()"
              icon="ni ni-single-02"
              class="mb-4 mb-xl-0"
          >
          </stats-card>
        </div>

        <div class="col">
          <stats-card shadow
              :title="$t('homePage.totalCndidtes')"
              type="gradient-blue"
              :sub-title="candidateCount.toLocaleString()"
              icon="ni ni-badge"
              class="mb-4 mb-xl-0"
          >
          </stats-card>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-6">
          <blocks-table-homepage :title="$t('homePage.recentBlocks')"></blocks-table-homepage>
        </div>
        <div class="col-6">
          <transaction-table-homepage :title="$t('homePage.recentTxs')"></transaction-table-homepage>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BlocksTableHomepage from '../views/Tables/BlocksTableHomepage'
import TransactionTableHomepage from "../views/Tables/TransactionsTableHomepage";
import axios from "axios";
import StatsCard from "../components/StatsCard";
import Neon from "@cityofzion/neon-js";
//import {getCurrentInstance} from 'vue'

export default {
  name: "Home",
  components: {
    BlocksTableHomepage,
    StatsCard,
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
      searchVal: "",
      isLoading: false,
      isHashPattern: /^((0x)?)([0-9a-f]{64})$/,
      isAssetPattern: /^((0x)?)([0-9a-f]{40})$/,
      isAddressPattern : /^N([0-9a-zA-Z]{33})$/,
      isNumberPattern: /^\d+$/,
      // test:this.$t('language.name'),
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
          method: "GetAddressCount",
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
    search() {
      this.isLoading = true;
      let value = this.searchVal;
      value = value.trim();
      this.searchVal = "";
      if (value === "") {
        this.$router.push({
          path: `/homepage`,
        });
        this.isLoading = false;
      } else if (this.isHashPattern.test(value)) {
        if (value.length === 64) {
          value = "0x" + value;
        }
        this.getTransactionByTransactionHash(value);
      } else if (this.isAssetPattern.test(value)) {
        if (value.length === 40) {
          value = "0x" + value;
        }
        this.getToken(value);
      } else if (Number(value[0]) >= 0) {
        value = value.replace(/[,，]/g, "");
        if (!isNaN(Number(value)) && this.isNumberPattern.test(value)) {
          if (Number.isInteger(Number(value))) {
            this.getBlockByBlockHeight(value);
          }
        }
        else {
          this.isLoading = false;
          this.$router.push({
            path: `/search`,
          });
        }
      } else if (this.isAddressPattern.test(value)){
        this.getAddressByAddress(this.addressToScriptHash(value))
      }
      else {
        this.isLoading = false;
        this.$router.push({
          path: `/search`,
        });
      }
    },
    addressToScriptHash(addr) {
      try {
        const acc = Neon.create.account(addr);
        return "0x" + acc.scriptHash;
      }catch (err){
        this.$router.push({
          path: `/search`,
        });
      }


    },
    getBlockByBlockHash(block_hash) {
      axios({
        method: "post",
        url: "/api",
        data: {
          "jsonrpc": "2.0",
          "id": 1,
          "params": {"BlockHash":block_hash},
          "method": "GetBlockByBlockHash"
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
            this.isLoading = false;
            if (res["data"]["error"] == null) {
              this.$router.push({
                path: `/blockinfo/${res["data"]["result"]["hash"]}`,
              });

            } else {
              this.$router.push({
                path: `/search`,
              });
            }
          },
      )
    },
    getBlockByBlockHeight(blockheight){
      axios({
        method: "post",
        url: "/api",
        data: {
          "jsonrpc": "2.0",
          "id": 1,
          "params": {"BlockHeight":parseInt(blockheight)},
          "method": "GetBlockByBlockHeight"
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
            this.isLoading = false;
            if (res["data"]["error"] == null) {
              this.$router.push({
                path: `/blockinfo/${res["data"]["result"]["hash"]}`,
              });

            } else {
              this.$router.push({
                path: `/search`,
              });
            }
          },
      )},
    getAddressByAddress(addr) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          method: "GetAddressByAddress",
          params: {"Address": addr},
          id: 1,
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: "true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.isLoading = false;
        if (res["data"]["error"] == null) {
          this.$router.push({
            path: `/accountprofile/${addr}`,
          });
        } else {
          this.isLoading = false;
          this.$router.push({
            path: `/search`,
          });
        }
      })
    },

    getToken(value) {
      return new Promise(() => {
        axios({
          method: "post",
          url: "/api",
          data: {
            jsonrpc: "2.0",
            id: 1,
            params: {"ContractHash": value},
            method: "GetAssetInfoByContractHash",
          },
          headers: {
            "Content-Type": "application/json",
            withCredentials: " true",
            crossDomain: "true",
          },
        }).then((res) => {
          this.isLoading = false;
          if (res["data"]["error"] == null) {
            this.$router.push({
              path: `/tokeninfo/${value}`,
            });
          } else {
            this.getContractInfoByContractHash(value);
          }
        });
      });
    },
    getContractInfoByContractHash(value) {
      return new Promise(() => {
        axios({
          method: "post",
          url: "/api",
          data: {
            jsonrpc: "2.0",
            id: 1,
            params: {"Hash": value},
            method: "GetContractInfoByContractHash",
          },
          headers: {
            "Content-Type": "application/json",
            withCredentials: " true",
            crossDomain: "true",
          },
        }).then((res) => {
          this.isLoading = false;
          if (res["data"]["error"] == null) {
            this.$router.push({
              path: `/contractinfo/${value}`,
            });
          } else {
            this.getAddressByAddress(value);
          }
        });
      });
    },

    getTransactionByTransactionHash(value) {
      axios({
        method: "post",
        url: "/api",
        data: {
          "jsonrpc": "2.0",
          "id": 1,
          "params": {"TransactionHash":value},
          "method": "GetRawTransactionByTransactionHash"
        },
        headers:{'Content-Type': 'application/json','withCredentials':' true',
          'crossDomain':'true',},
      }).then((res) => {
        this.isLoading = false;
        if (res["data"]["error"] == null) {
          this.$router.push({
            path: `/transactionInfo/${value}`,
          });

        } else {
          this.getBlockByBlockHash(value);
        }
      });
    },

  },

};
</script>
<style>
.Intro {
  background: #e2e2e2;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.Intro-h{
  font-family: "Gill Sans";
  font-style: normal;
  font-weight: 800;
  font-size: 48px;
  line-height: 58px;
  /* identical to box height */
  color: #282B34;
  margin-bottom: 80px;
}

.search {
  width: 100%;
  max-width: 800px;
  height: 60px;
  position: relative;
  filter: drop-shadow(0px 20px 40px rgba(0, 0, 0, 0.12));
}
.button {
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 1px;
  top: 1px;
  background: #00af92;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  width: 60px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.img {
  width: 26px;
}
.over-ellipsis {
  width: 100%;
  height: 100%;
  padding-right: 71px;
  padding-left: 11px;
  font-size: 18px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(191, 191, 191, 1);
  border-radius: 4px;
  color: #282828;
}

</style>
