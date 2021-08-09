<template>
  <div>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <loading
              :is-full-page="false"
              :opacity="0.9"
              :active="isLoading"
            ></loading>
            <div class="card-header bg-transparent">
              <h1 v-if="this.type==='normal'" class="mb-0">{{$t('addressPage.addressProfile.title')}} </h1>
              <h1 v-else-if="this.type==='candidate'" class="mb-0">{{$t('addressPage.addressProfile.title')}} &#x1F46E;</h1>
              <h1 v-else-if="this.type==='committee'" class="mb-0">{{$t('addressPage.addressProfile.title')}} &#x1F46E;</h1>
              <h4 class="text-muted">{{ this.scriptHashToAddress(this.accountAddress) }}</h4>
            </div>

            <div class="card-body">
              <card shadow>
                <div class="row">
                  <div class="col-2 font-weight-bold mb-0">{{$t('addressPage.createdTime')}}</div>
                  <div class="col-4">
                    {{ convertTime(this.createdTime) }}
                  </div>
                  <div class="col-2 font-weight-bold mb-0">{{$t('addressPage.addressProfile.type')}}</div>
                  <div v-if="this.type==='normal'" class="col-4">
                    {{$t('addressPage.typeEnum.normal')}}
                  </div>
                  <div v-else-if="this.type==='candidate'" class="col-4">
                    {{$t('addressPage.typeEnum.candidate')}}
                  </div>
                  <div v-else-if="this.type==='committee'" class="col-4">
                    {{$t('addressPage.typeEnum.committee')}}
                  </div>
                </div>
              </card>
              <div class="row mt-3"></div>
              <card shadow>
                <div class="row">
                  <div class="col-2 font-weight-bold mb-0">{{$t('addressPage.neoBalance')}}</div>
                  <div class="col-4">
                    {{ this.neoBalance }}
                  </div>
                  <div class="col-2 font-weight-bold mb-0">{{$t('addressPage.gasBalance')}}</div>
                  <div class="col-4">
                    {{ this.gasBalance  }}
                  </div>
                </div>
              </card>
              <div class="row mt-3"></div>
              <div class ="row">
                <div class="col-4">
                  <card shadow>
                    <div class="panel panel-primary">
                      <div class=" font-weight-bold mb-0">{{$t('addressPage.addressProfile.txNums')}}</div>
                      <div class="panel-body">
                        {{  this.numOfTxns }}
                      </div>
                    </div>
                  </card>
                </div>
                <div class="col-4">
                  <card shadow>
                    <div class="panel panel-primary">
                      <div class=" font-weight-bold mb-0">{{$t('addressPage.addressProfile.nep17Transfers')}}</div>
                      <div class="panel-body">
                        {{  this.numOfnep17Transfers  }}
                      </div>
                    </div>
                  </card>
                </div>
                <div class="col-4">
                  <card shadow>
                    <div class="panel panel-primary">
                      <div class=" font-weight-bold mb-0">{{$t('addressPage.addressProfile.nep11Transfers')}}</div>
                      <div class="panel-body">
                        {{this.numOfnep11Transfers}}
                      </div>
                    </div>
                  </card>
                </div>
              </div>
              <tabs fill class="flex-column flex-md-row">
                <tab-pane icon="ni ni-money-coins" :title="$t('addressPage.addressProfile.tokenBalance')">

                  <div   class="row" >
                    <div class="col">
                      <address-tokens-table
                        :account_address="accountAddress"
                      ></address-tokens-table>
                    </div>
                  </div>
                </tab-pane>
                <tab-pane icon="ni ni-single-02 mr-2" :title="$t('addressPage.addressProfile.tx')">
                  <div  class="row">
                    <div class="col">
                      <address-transactions-table
                        :account_address="accountAddress"
                      ></address-transactions-table>
                    </div>
                  </div>

                </tab-pane>
                <tab-pane icon="ni ni-collection" :title="$t('addressPage.addressProfile.nep17title')">
                  <div  class="row">
                    <div class="col">
                      <address17-ts-table
                        :account_address="accountAddress"
                      >
                      </address17-ts-table>
                    </div>
                  </div>

                </tab-pane>
                <tab-pane icon="ni ni-collection" :title="$t('addressPage.addressProfile.nep11title')">
                  <div class="row">
                    <div class="col">
                      <address11-ts-table :account_address="accountAddress">
                        </address11-ts-table>
                    </div>
                  </div>

                </tab-pane>
                <!--tab-pane icon="ni ni-collection" title="Contracts"> </tab-pane-->
              </tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
// import { format } from "timeago.js";
import AddressTokensTable from "./Tables/AddressTokensTable";
import AddressTransactionsTable from "./Tables/AddressTransactionsTable";
import Address17TsTable from "./Tables/Address17TsTable";
import Address11TsTable from "./Tables/Address11TsTable";
import Neon from "@cityofzion/neon-js";

export default {
  name: "account-profile",
  data() {
    return {
      accountAddress: this.$route.params.accountAddress,
      neoBalance: "0",
      gasBalance: "0",
      txns: [],
      txnsTotalNumbers: 0,
      isLoading: true,
      createdTime: "",
      numOfTxns: 0,
      numOfnep17Transfers: 0,
      numOfnep11Transfers: 0,
      type: "normal",
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
    this.getNeoBalance();
    this.isLoading = false;
    this.getGasBalance();
    this.getTransactions();
    this.getCreatedTime();
    this.getTransfers();
    this.getCandidateByAddress();
  },
  watch:{
    $route:'watchrouter'
  },
  methods: {
    watchrouter() {//如果路由有变化，执行的对应的动作
      //console.log("watch router")
      if(this.$route.name === 'AccountProfile') {
        this.accountAddress = this.$route.params.accountAddress
        this.getNeoBalance();
        this.isLoading = false;
        this.getGasBalance();
        this.getTransactions();
        this.getCreatedTime();
        this.getTransfers();
        this.getCandidateByAddress();
      }
    },
    convertGas(gas) {
      if (gas === 0) {
        return 0;
      }
      return (gas * Math.pow(0.1, 8)).toFixed(6);
    },
    convertTime(time) {
      var date = new Date(time);
      var y = date.getFullYear()
      var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      var d = (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate())
      var h = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()
      var mi = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
      var s = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds()
      return m + '-' + d + '-' + y + ' ' + h + ':' + mi + ':' + s + ' +' + "UTC";
    },
    scriptHashToAddress(hash) {
      hash = hash.substring(2);
      const acc = Neon.create.account(hash);
      return acc.address;
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
          }
          else {
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
          this.gasBalance = this.convertGas(res["data"]["result"]["balance"]);
        })
        .catch((err) => {
          if (Object.getPrototypeOf(TypeError) === Error) {
            this.getGasBalance = "0";
          }
          else {
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
          method: "GetRawTransactionByAddress",
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
          this.numOfTxns = res["data"]["result"]["totalCount"];
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
    getTransfers() {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {
            Address: this.accountAddress,
          },
          method: "GetNep17TransferByAddress",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        //console.log("Transfers17", res["data"]["result"]["totalCount"])
        this.numOfnep17Transfers = res["data"]["result"]["totalCount"];
      }).catch((err) => {
        console.log("Get nep 17 transfers error: ", err)
      });
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {
            Address: this.accountAddress,
          },
          method: "GetNep11TransferByAddress",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        //console.log("Transfer11", res["data"]["result"]["totalCount"])
        this.numOfnep11Transfers = res["data"]["result"]["totalCount"];
      }).catch((err) => {
        console.log("Get nep 11 transfers error: ", err)
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
      }).then((res) => {
        //console.log(res)
        if(res["data"]["result"] == null) {
          this.type = "normal"
        }
        else if(res["data"]["result"]["isCommittee"] == true) {
          this.type = "committee"
        }
        else {
          this.type = "candidate"
        }
      }).catch((err) => {
        console.log("Get nep 11 transfers error: ", err)
      });
    },
  },
};
</script>
<style></style>
