<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>

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
            <h1 class="mb-0">Account:</h1>
            <h4 class="text-muted">{{ this.accountAddress }}</h4>
          </div>

          <div class="card-body">
            <div class="row">
              <div class="col-2">
                <div class="text-muted">Neo balance: </div>
              </div>
              <div class="col-3"><h3>{{ this.neoBalance }}</h3></div>
              <div class="col-2">
                <div class="text-muted">Transactions: </div>
              </div>
              <div class="col-3"><h3>{{  }}</h3></div>
            </div>
            <div class="row mt-5"></div>
            <div class="row">
              <div class="col-2">
                <div class="text-muted">Gas balance: </div>
              </div>
              <div class="col-3"><h3>{{ this.gasBalance }}</h3></div>
              <div class="col-2">
                <div class="text-muted">Transfers: </div>
              </div>
              <div class="col-3"><h3>{{  }}</h3></div>
            </div>
            <div class="row mt-5"></div>
            <div class="row">
              <div class="col-2">
                <div class="text-muted">Type: </div>
              </div>
              <div class="col-3"><h3>{{  }}</h3></div>
              <div class="col-2">
                <div class="text-muted">Contract deployment: </div>
              </div>
              <div class="col-3"><h3>{{  }}</h3></div>
            </div>
            <div class="row mt-5"></div>
            <div class="row">
              <div class="col-2">
                <div class="text-muted">Created Time: </div>
              </div>
              <div class="col-3"><h3>{{ this.createdTime }}</h3></div>
              <div class="col-2">
                <div class="text-muted">Contract deployment: </div>
              </div>
              <div class="col-3"><h3>{{  }}</h3></div>
            </div>
            <tabs fill class="flex-column flex-md-row">
              <card shadow>
                <tab-pane icon="ni ni-money-coins" title="Token Balance">
                  <p class="description">
                    Raw denim you probably haven't heard of them jean shorts
                    Austin. Nesciunt tofu stumptown aliqua, retro synth master
                    cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro
                    keffiyeh dreamcatcher synth.
                  </p>
                </tab-pane>
                <tab-pane icon="ni ni-single-02 mr-2" title="Transactions">
                  <p class="description">
                    Cosby sweater eu banh mi, qui irure terry richardson ex
                    squid. Aliquip placeat salvia cillum iphone. Seitan aliquip
                    quis cardigana merican apparel, butcher voluptate nisi qui.
                  </p>
                </tab-pane>
                <tab-pane icon="ni ni-collection" title="Transfers">
                  <p class="description">
                    Raw denim you probably haven't heard of them jean shorts
                    Austin. Nesciunt tofu stumptown aliqua, retro synth master
                    cliche tempor, williamsburg carles vegan helvetica.
                    Reprehenderit butcher retro keffiyeh dreamcatcher synth.
                  </p>
                </tab-pane>
                <tab-pane icon="ni ni-collection" title="Contracts">
                  <p class="description">
                    Raw denim you probably haven't heard of them jean shorts
                    Austin. Nesciunt tofu stumptown aliqua, retro synth master
                    cliche tempor, williamsburg carles vegan helvetica.
                    Reprehenderit butcher retro keffiyeh dreamcatcher synth.
                  </p>
                </tab-pane>
              </card>
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
import { format } from "timeago.js";
export default {
  name: "account-profile",
  data() {
    return {
      accountAddress: "",
      neoBalance: "0",
      gasBalance: "0",
      txns: [],
      txnsTotalNumbers: 0,
      isLoading: true,
      createdTime: "",
      tokenList: [],
    };
  },
  components: {
    Loading,
  },
  created() {
    this.accountAddress = this.$route.params.accountAddress;
    this.getNeoBalance();
    this.getGasBalance();
    this.getTransactions();
    this.getCreatedTime();
    this.getToken();

  },
  methods: {
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
          console.log("Error", err);
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
          console.log("Error", err);
        });
    },
    getTransactions() {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          method: "GetRawTransactionBySender",
          params: {
            Sender: this.accountAddress,
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
          // TODO: 这个还没处理
          console.log("get transactions", res)
          this.isLoading = false;

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
          method: "GetAccountInfoByAddress",
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
            this.createdTime = format(res["data"]["result"]["firstusetime"])

          })
          .catch((err) => {
            console.log("Error", err);
          });
    },
    getToken() {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          method: "GetAssetsHeldByAddress",
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
            //this.tokenList = res["data"]["result"]["result"]
            //console.log(this.tokenList[0].tokenname)
            //console.log(this.tokenList[0].balanceinfo.balance)
            let temp_data = res["data"]["result"]["result"];
            for(let k=0; k<temp_data.length; k++){
              let temp = {"tokenname": res["data"]["result"]["result"][0].tokenname, "balance": res["data"]["result"]["result"][0].balanceinfo.balance}
              this.tokenList.push(temp)
            }
            console.log(this.tokenList)

          })
          .catch((err) => {
            console.log("Error", err);
          });
    },
  },
};
</script>
<style></style>
