<template>
  <div>
    <div class="container-fluid mt--9">
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
              <div class="col-3"><h3>{{ this.numOfTxns }}</h3></div>
            </div>
            <div class="row mt-5"></div>
            <div class="row">
              <div class="col-2">
                <div class="text-muted">Gas balance: </div>
              </div>
              <div class="col-3"><h3>{{ this.gasBalance }}</h3></div>
              <div class="col-2">
                <div class="text-muted">NEP17 Transfers: </div>
              </div>
              <div class="col-3"><h3>{{ this.numOfTransfers }}</h3></div>
            </div>
            <div class="row mt-5"></div>
            <div class="row">
              <div class="col-2">
                <div class="text-muted">Type: </div>
              </div>
              <div class="col-3"><h3>{{  }}</h3></div>
              <div class="col-2">
                <div class="text-muted"> NEP11 Transfers: </div>
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
                <tab-pane icon="ni ni-money-coins" title="Token Balance">
                  <div class="row">
                    <div class="col">
                      <address-tokens-table :account_address="accountAddress"></address-tokens-table>
                    </div>
                  </div>
                </tab-pane>
                <tab-pane icon="ni ni-single-02 mr-2" title="Transactions">
                  <div class="row">
                    <div class="col">
                      <address-transactions-table :account_address="accountAddress"></address-transactions-table>
                    </div>
                  </div>
                </tab-pane>
                <tab-pane icon="ni ni-collection" title="NEP17 Transfers">
                  <div class="row">
                    <div class="col">

                      <address-nep17-transfers-table :account_address="accountAddress">
                      </address-nep17-transfers-table>
                    </div>
                  </div>
                </tab-pane>
                <tab-pane icon="ni ni-collection" title="NEP11 Transfers">
                  <div class="row">
                    <div class="col">
                      <address-nep11-transfers-table :account_address="accountAddress"></address-nep11-transfers-table>
                    </div>
                  </div>
                </tab-pane>
                <tab-pane icon="ni ni-collection" title="Contracts">
                </tab-pane>
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
import AddressTokensTable from "./Tables/AddressTokensTable";
import AddressTransactionsTable from "./Tables/AddressTransactionsTable";
import AddressNEP17TransfersTable from "./Tables/AddressNEP17TransfersTable";
import AddressNEP11TransfersTable from "./Tables/AddressNEP11TransfersTable";

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
      numOfTransfers: 0,
    };
  },
  components: {
    Loading,
    AddressTokensTable,
    AddressTransactionsTable,
    // eslint-disable-next-line vue/no-unused-components
    AddressNEP17TransfersTable,
    // eslint-disable-next-line vue/no-unused-components
    AddressNEP11TransfersTable,
  },
  created() {
    this.getNeoBalance();
    this.isLoading = false;
    this.getGasBalance();
    this.getTransactions();
    this.getCreatedTime();
    this.getTransfers();
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
          this.neoBalance = "0";
          console.log("Get Neo balance failed, Error", err);
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
          this.getGasBalance = "0"
          console.log("Error", err);
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
          // TODO: 这个还没处理
          this.numOfTxns = res["data"]["result"]["result"].length

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
            console.log("Get created time failed, Error", err);
          });
    },
    getTransfers() {
      
    },
  },
};
</script>
<style></style>
