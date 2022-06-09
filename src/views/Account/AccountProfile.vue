<template>
  <div>
    <div
      class="container-fluid mt--8"
      style="background-color: #f7f8fa"
    >
      <div class="row">
        <div class="col">
          <div class="top">
            <loading
                :is-full-page="false"
                :opacity="0.9"
                :active="isLoading"
            ></loading>
            <div class="bat">
              <div class=" row mt-3  mb-5  title1 shortTitle" >
              <span
                  v-if="this.type === 'normal' || this.type === 'candidate'"
                  class="mb-0"
              >
                {{ $t("addressPage.addressProfile.title") }}
              </span>
                <span v-else-if="this.type === 'committee'" class="mb-0">
                {{ $t("addressPage.addressProfile.title") }}
                <i class="ni ni-badge"></i>
              </span>
              </div>
              <div class=" row mt-3  mb-3 title2 shortTitle"> {{ $t('overview') }} </div>
            </div>

            <card shadow class="card-style list">
              <div class="row info mt-3 mb-1">
                <div class="col-md-3 lable-title">
                  {{ $t("addressPage.addressProfile.address") }}
                </div>
                <div class="col-md-9 context-black">
                  <span id="address">
                    {{ this.scriptHashToAddress(this.accountAddress) }}

                  </span>
                  <i
                      class="ni ni-single-copy-04"
                      id="addressButton"
                      style="padding-left: 5px; color: grey; cursor: pointer"
                      title="Copy to Clipboard"
                      @click="copyItem('address', 'addressButton', 'addressSpan')"
                  ></i>
                  <span style="color: #42b983" id="addressSpan"></span>
                </div>
              </div>
              <div class="row info mt-3 mb-1">
                <div class="col-md-3 lable-title">
                  {{ $t("addressPage.createdTime") }}
                </div>
                <div class="col-md-9 context-black">
                  {{ convertPreciseTime(this.createdTime) }}
                </div>
              </div>
              <div class="row info mt-3 mb-1">
                <div class="col-md-3 lable-title">
                  {{ $t("addressPage.addressProfile.type") }}
                  <el-tooltip  :content=this.content placement="top" >
                    <i class="el-icon-question"/>
                  </el-tooltip>
                </div>
                <div class="col-md-9 context-black">
                  <div v-if="this.type === 'normal'">
                    {{ $t("addressPage.typeEnum.normal") }}
                  </div>
                  <div v-else-if="this.type === 'candidate'">
                    {{ $t("addressPage.typeEnum.candidate") }}
                  </div>
                  <div v-else-if="this.type === 'committee'">
                    {{ $t("addressPage.typeEnum.committee") }}
                  </div>
                </div>
              </div>
              <div class="row info mt-3 mb-1">
                <div class="col-md-3 lable-title">
                  {{ $t("addressPage.neoBalance") }}
                </div>
                <div class="col-md-9 context-black">
                  {{ numFormat(this.neoBalance )}}
                </div>
              </div>
              <div class="row info mt-3 mb-1">
                <div class="col-md-3 lable-title">
                  {{ $t("addressPage.gasBalance") }}
                </div>
                <div class="col-md-9 context-black">
                  {{ this.gasBalance }}
                </div>
              </div>
              <div class="row info mt-3 mb-1">
                <div class="col-md-3 lable-title">
                  {{ $t("addressPage.addressProfile.txNums") }}
                </div>
                <div class="col-md-9 context-black">
                  {{ this.numOfTxns }}
                </div>
              </div>


              <div class="row info mt-3 mb-1">
                <div class="col-md-3 lable-title">
                  {{ $t("addressPage.addressProfile.nep17Transfers") }}
                </div>
                <div class="col-md-9 context-black">
                  {{ this.numOfnep17Transfers }}
                </div>
              </div>
              <div class="row info  mt-3 mb-1">
                <div class="col-md-3 lable-title">
                  {{ $t("addressPage.addressProfile.nep11Transfers") }}
                </div>
                <div class="col-md-9 context-black">
                  {{ this.numOfnep11Transfers }}
                </div>
              </div>
              <div class="row mt-4"></div>
            </card>
            <div class="row mt-4 mb-3"></div>
          </div>

          <el-tabs
              type="card"
              class="list"
              v-model="activeName"
              style="
                width: 80%;
                margin-left: 10%;

              "
            >

              <el-tab-pane
                :label="$t('addressPage.addressProfile.tokenBalance')"
                name="first"
              >
                <address-tokens-table
                  :account_address="accountAddress"
                ></address-tokens-table>
              </el-tab-pane>
              <el-tab-pane
                :label="$t('addressPage.addressProfile.tx')"
                name="second"
              >
                <address-transactions-table
                  :account_address="accountAddress"
                ></address-transactions-table>
              </el-tab-pane>
              <el-tab-pane
                :label="$t('addressPage.addressProfile.nep17title')"
                name="third"
              >
                <address17-ts-table :account_address="accountAddress">
                </address17-ts-table>
              </el-tab-pane>
              <el-tab-pane
                :label="$t('addressPage.addressProfile.nep11title')"
                name="forth"
              >
                <address11-ts-table :account_address="accountAddress">
                </address11-ts-table>
              </el-tab-pane>
            </el-tabs>

          <div style="margin-top: 30px; margin-bottom: 20px"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import AddressTokensTable from "./AddressTokensTable";
import AddressTransactionsTable from "./AddressTransactionsTable";
import Address17TsTable from "./Address17TsTable";
import Address11TsTable from "./Address11TsTable";
import {
  scriptHashToAddress,
  convertPreciseTime,
  convertGas,
  numFormat,
  copyItem,
} from "../../store/util";
import net from "../../store/store";

export default {
  name: "account-profile",
  data() {
    return {
      network: net.url,
      accountAddress: this.$route.params.accountAddress,
      neoBalance: "0",
      gasBalance: "0",
      txns: [],
      txnsTotalNumbers: 0,
      isLoading: true,
      createdTime: "",
      numOfTxns: 0,
      numOfnep17Transfers: -1,
      numOfnep11Transfers: 0,
      type: "normal",
      activeName: "first",
      net:window.URL,
    };
  },
  components: {
    Loading,
    AddressTokensTable,
    AddressTransactionsTable,
    Address17TsTable,
    Address11TsTable,
  },
  created() {
    window.scroll(0, 0);
    this.getNep17Transfers();
    this.getNep11Transfers();
    this.getNeoBalance();
    this.getGasBalance();
    this.getTransactions();
    this.getCreatedTime();
    this.getCandidateByAddress();
  },
  watch: {
    $route: "watchrouter",
  },
  computed:{
    content:function (){
      if(this.$i18n.locale==='en'){
        return "Account includes consensus, committee, candidate, normal, 4 types."
      } else if (this.$i18n.locale==='cn'){
        return "账户包括 共识结点，委员会结点，候选人结点，普通结点四种类型"
      } else {
        return "Le compte contiens 4 types: consensus, comité, candidature, normal"
      }

    }
  },
  methods: {
    scriptHashToAddress,
    convertGas,
    convertPreciseTime,
    copyItem,
    numFormat,
    watchrouter() {

      this.isLoading = true;

      if (this.$route.name === "AccountProfile") {
        // this.accountAddress = this.$route.params.accountAddress;
        // this.getNep17Transfers();
        // this.getNep11Transfers();
        // this.getNeoBalance();
        // this.getGasBalance();
        // this.getTransactions();
        // this.getCreatedTime();
        // this.getCandidateByAddress();
        location.reload()
      }
    },
    getNeoBalance() {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          method: "GetBalanceByContractHashAddress",
          params: {
            Address: this.accountAddress,
            ContractHash: "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
          },
          id: 1,
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: "true",
          crossDomain: "true",
        },
      })
        .then((res) => {
          this.neoBalance = res["data"]["result"]["balance"];
        })
        .catch((err) => {
          if (Object.getPrototypeOf(TypeError) === Error) {
            this.neoBalance = "0";
          } else {
            console.log("Get Neo balance failed, Error", err);
          }
        });
    },
    getGasBalance() {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          method: "GetBalanceByContractHashAddress",
          params: {
            Address: this.accountAddress,
            ContractHash: "0xd2a4cff31913016155e38e474a2c06d08be276cf",
          },
          id: 1,
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: "true",
          crossDomain: "true",
        },
      })
        .then((res) => {
          this.gasBalance = res["data"]["result"]["balance"];
        })
        .catch((err) => {
          if (Object.getPrototypeOf(TypeError) === Error) {
            this.getGasBalance = "0";
          } else {
            console.log("Error", err);
          }
        });
    },
    getTransactions() {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          method: "GetTransactionCountByAddress",
          params: {
            Address: this.accountAddress,
          },
          id: 1,
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: "true",
          crossDomain: "true",
        },
      })
        .then((res) => {
          this.numOfTxns = res["data"]["result"]["total counts"];
        })
        .catch((err) => {
          console.log("Error", err);
        });
    },
    getCreatedTime() {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          method: "GetAddressByAddress",
          params: {
            address: this.accountAddress,
          },
          id: 1,
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: "true",
          crossDomain: "true",
        },
      })
        .then((res) => {
          this.createdTime = res["data"]["result"]["firstusetime"];
        })
        .catch((err) => {
          console.log("Get created time failed, Error", err);
        });
    },

    getNep17Transfers() {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {
            Address: this.accountAddress,
          },
          method: "GetNep17TransferCountByAddress",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      })
        .then((res) => {
          this.numOfnep17Transfers = res["data"]["result"];
        })
        .catch((err) => {
          console.log("Get nep 17 transfers error: ", err);
        });
    },
    getNep11Transfers() {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {
            Address: this.accountAddress,
          },
          method: "GetNep11TransferCountByAddress",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      })
        .then((res) => {
          this.numOfnep11Transfers = res["data"]["result"];
        })
        .catch((err) => {
          console.log("Get nep 11 transfers error: ", err);
        });
    },
    getCandidateByAddress() {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {
            Address: this.accountAddress,
          },
          method: "GetCandidateByAddress",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      })
        .then((res) => {
          this.isLoading = false;
          if (res["data"]["result"] == null) {
            this.type = "normal";
          } else if (res["data"]["result"]["isCommittee"] == true) {
            this.type = "committee";
          } else {
            this.type = "candidate";
          }
        })
        .catch((err) => {
          console.log("Get nep 11 transfers error: ", err);
        });
    },
  },
};
</script>
<style>
@media screen and (max-width: 790px ) {
  .info {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;;
  }
}
</style>
