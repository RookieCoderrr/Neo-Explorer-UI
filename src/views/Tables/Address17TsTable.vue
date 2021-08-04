<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"
      >
        <template v-slot:columns>
          <th>Tx ID</th>
          <th>Token</th>
          <th>Type</th>
          <th>From <button class="btn btn-sm btn-primary" @click="changeFrom()">{{this.fromButton}}</button></th>
          <th>To <button class="btn btn-sm btn-primary" @click="changeTo()">{{this.toButton}}</button></th>
          <th>Amount</th>
          <th>Time</th>
        </template>
        <template v-slot:default="row">

          <td class="budget">
            <div class="txid">
              <span class="text-muted" v-if="row.item.txid === '0x0000000000000000000000000000000000000000000000000000000000000000'">Null Transaction</span>
              <a class="name mb-0 text-sm " v-else style="cursor: pointer" @click="getTransaction(row.item.txid)">{{row.item.txid}}</a>
            </div>
          </td>
          <td class="budget">
            <div >
              {{ row.item.tokenname }}
            </div>
          </td>
          <td class="budget">
            <div >
              <span class="text-success" v-if="row.item.from === null" type="primary"> Reward </span>
              <span class="text-danger" v-else-if="row.item.to === null" > Burn </span>
              <span class="text-info" v-else> Transfer</span>
            </div>
          </td>
          <td class="budget">
            <div class="addr">
              <span class="text-muted" v-if="row.item.from === null"> Null Account </span>
              <a class="mb-0 text-sm" v-else-if="this.account_address===row.item.from" style="cursor: pointer" @click="getAddress(row.item.from)"><h3>&#129332;</h3> </a>
              <a class="mb-0 text-sm" v-else style="cursor: pointer" @click="getAddress(row.item.from)"> {{this.fromState? scriptHashToAddress(row.item.from):row.item.from}}  </a>
            </div>
          </td>

          <td class="budget">
            <div class="addr">
              <span class="text-muted" v-if="row.item.to === null"> Null Account </span>
              <a class="mb-0 text-sm" v-else-if="this.account_address===row.item.to" style="cursor: pointer" @click="getAddress(row.item.to)"><h3>&#129332;</h3> </a>
              <a class="mb-0 text-sm" v-else style="cursor: pointer" @click="getAddress(row.item.to)"> {{this.toState? scriptHashToAddress(row.item.to):row.item.to}}  </a>
            </div>
          </td>

          <td class="budget">
            {{ convertToken(row.item.value ,row.item.decimals) }}
          </td>
          <td class="budget">
            <div >
              {{convertTime(row.item.timestamp) }}
            </div>
          </td>
        </template>
      </base-table>
    </div>
    <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div style="margin-right: 10px; width: 250px" class="row">
        <div class="text">Page &nbsp;</div>
        <base-input
                type="number"
                :style="text(pagination)"
                :placeholder="pagination"
                v-on:changeinput="pageChangeByInput($event)"
        ></base-input>
        <div class="text">
          &nbsp; of &nbsp;{{ countPage }}
        </div>
      </div>
      <base-pagination
        :total="this.totalCount"
        :value="pagination"
        v-on:input="pageChange($event)"
      ></base-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Neon from "@cityofzion/neon-js";
import {format} from "timeago.js";
export default {
  name: "address17-ts-table",
  props: {
    type: {
      type: String,
    },
    title: String,
    account_address: String,
  },
  data() {
    return {
      tableData: [],
      resultsPerPage: 10,
      pagination: 1,
      countPage:0,
      fromState: true,
      fromButton: "Hash",
      toState: true,
      toButton: "Hash",
      txId:"",
      timeStamp:0
    };
  },
  created() {
    this.GetNep17TransferByAddress(0);
  },
  computed: {
    text() {
      return function (value) {
        let inputLength = value.toString().length * 10 + 30;
        return (
                "width: " +
                inputLength +
                "px!important;text-align: center;height:80%;margin-top:5%;"
        );
      };
    },
  },
  methods: {
    pageChange(pageNumber) {
      this.pagination = pageNumber;
      const skip = (pageNumber - 1) * this.resultsPerPage;
      this.GetNep17TransferByAddress(skip);
    },
    convertToken(token, decimal) {
      if(decimal===0) {
        return token
      }else {
        return (token * Math.pow(0.1, decimal)).toFixed(8);
      }

    },
    getTransaction(txhash) {
      this.$router.push({
        path: `/transactionInfo/${txhash}`,
      });
    },
    mouseHover(contract) {
      var a = document.getElementById("contract");
      a.addEventListener("mouseover", function (event) {
        event.target.style.display = contract;
      });
    },
    pageChangeByInput(pageNumber) {
      if (pageNumber >= this.countPage) {
        this.isLoading = true;
        this.pagination =this.countPage;
        const skip =
                ( this.countPage - 1 ) * this.resultsPerPage;
        this.GetNep17TransferByAddress(skip);
      } else if (pageNumber <= 0) {
        this.isLoading = true;
        this.pagination = 1;
        const skip = this.resultsPerPage;
        this.GetNep17TransferByAddress(skip);
      } else {
        this.isLoading = true;
        this.pagination = pageNumber;
        const skip = (pageNumber - 1) * this.resultsPerPage;
        this.GetNep17TransferByAddress(skip);
      }
    },
    getContract(ctrHash) {
      this.$router.push({
        path: `/tokeninfo/${ctrHash}`,
      });
    },

    getAddress(accountAddress) {
      this.$router.push({
        path: `/accountprofile/${accountAddress}`,
      });
    },
    getFromAccount() {
      return;
    },

    getToAccount() {
      return;
    },
    convertTime(time) {
      return format(time);
    },

    GetNep17TransferByAddress(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {
            Address: this.account_address,
            Limit: this.resultsPerPage,
            Skip: skip,
          },
          method: "GetNep17TransferByAddress",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.tableData = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.txId = res["data"]["result"]["result"]["txid"];
        this.timeStamp =res["data"]["result"]["result"]["timestamp"]
        this.countPage = (this.totalCount ===0) ?  1  : (Math.ceil(this.totalCount / this.resultsPerPage))
        for (let k = 0; this.tableData.length; k++) {
          axios({
            method: "post",
            url: "/api",
            data: {
              jsonrpc: "2.0",
              id: 1,
              params: {
                ContractHash: this.tableData[k]["contract"],
                Limit: this.resultsPerPage,
                Skip: skip,
              },
              method: "GetAssetInfoByContractHash",
            },
            headers: {
              "Content-Type": "application/json",
              withCredentials: " true",
              crossDomain: "true",
            },
          }).then((res) => {
            this.tableData[k]["tokenname"] = res["data"]["result"]["tokenname"];
            this.tableData[k]["decimals"] = res["data"]["result"]["decimals"]

          });
        }
      });
    },
    scriptHashToAddress(hash) {
      hash = hash.substring(2);
      const acc = Neon.create.account(hash);
      return acc.address;
    },
    addressToScriptHash(addr) {
      const acc = Neon.create.account(addr);
      return "0x" + acc.scriptHash;
    },
    changeFrom() {
      if (this.fromState === true) {
        this.fromState = false;
        this.fromButton = "WIF";
      } else {
        this.fromState = true;
        this.fromButton = "Hash";
      }
    },
    changeTo() {
      if (this.toState === true) {
        this.toState = false;
        this.toButton = "WIF";
      } else {
        this.toState = true;
        this.toButton = "Hash";
      }
    },
  },
};
</script>
<style>
.contract {
  width: 150px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.txid {
  width: 200px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.from {
  width: 150px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.to {
  width: 150px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
