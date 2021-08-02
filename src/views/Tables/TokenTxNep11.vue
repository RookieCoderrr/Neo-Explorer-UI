<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div class="table-responsive">
      <loading
        :is-full-page="false"
        :opacity="0.9"
        :active="isLoading"
      ></loading>

      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="NEP11TxList"
      >
        <template v-slot:columns>
          <th>Txid</th>
          <th>From</th>
          <th>To</th>
          <th>Amount</th>
          <th>Time</th>
          <th>TokenID</th>
        </template>

        <template v-slot:default="row">
          <th scope="row">
            <div class="media align-items-center">
              <div class="media-body txid">
                <span class="text-muted" v-if="row.item.txid === '0x0000000000000000000000000000000000000000000000000000000000000000'">Null Transaction</span>
                <a class="name mb-0 text-sm " v-else style="cursor: pointer" @click="getTransaction(row.item.txid)">{{row.item.txid}}</a>
              </div>
            </div>
          </th>
          <td class="From">
            <div class="addr">
              <span class="text-muted" v-if="row.item.from === null"> Null Account </span>
              <a class="name mb-0 text-sm" v-else style="cursor: pointer" @click="getAddress(row.item.from)">{{ row.item.from }}</a>
            </div>
          </td>
          <td class="To">
            <div class="addr">
              <span class="text-muted" v-if="row.item.to === null"> Null Account </span>
              <a class="name mb-0 text-sm" v-else style="cursor: pointer" @click="getAddress(row.item.to)">{{ row.item.to }}</a>
            </div>
          </td>
          <td class="Value">
            {{ convertToken(row.item.value, this.decimal) }}
          </td>
          <td class="time">
            {{ convertTime(row.item.time) }}
          </td>
          <td class="TokenID">
            <div class="addr">
              {{ row.item.tokenId }}
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
        &nbsp; of &nbsp;{{countPage}}
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
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { format } from "timeago.js";


export default {
  name: "tokens-tx-nep11",
  props: {
    type: {
      type: String,
    },
    contractHash: String,
    decimal: Number,
  },
  components: {
    Loading
  },
  data() {
    return {
      NEP11TxList: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      isLoading: true,
      firstTime: true,
      countPage: 0,
    };
  },
  created() {
    this.getTokenList(0);
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
    pageChangeByInput(pageNumber) {
      if (pageNumber >= this.countPage) {
        this.isLoading = true;
        this.pagination = this.countPage;
        const skip = (this.countPage - 1) * this.resultsPerPage;
        this.getBlockList(skip);
      } else if(pageNumber <= 0){
        this.isLoading = true;
        this.pagination = 1;
        const skip = this.resultsPerPage;
        this.getTokenList(skip);
      } else {
        this.isLoading = true;
        this.pagination = pageNumber;
        const skip = (pageNumber - 1) * this.resultsPerPage;
        this.getTokenList(skip);
      }
    },
    pageChange(pageNumber) {
      if (!this.firstTime) {
        this.isLoading = true;
        this.pagination = pageNumber;
        const skip = (pageNumber - 1) * this.resultsPerPage;
        this.getTokenList(skip);
      } else {
        this.firstTime = false;
      }
    },
    convertTime(ts) {
      return format(ts);
    },
    convertToken(val, decimal) {
      return val * Math.pow(10, -decimal);
    },
    getTokenList(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {"ContractHash": this.contractHash, Limit: this.resultsPerPage, Skip: skip },
          method: "GetNep11TransferByContractHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.NEP11TxList = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.countPage = (this.totalCount === 0 ) ?   1 : (Math.ceil(this.totalCount / this.resultsPerPage))
        this.isLoading = false;
      });
    },
    getAddress(accountAddress) {
      this.$router.push({
        path: `/accountprofile/${accountAddress}`,
      });
    },
    getTransaction(txhash) {
      this.$router.push({
        path: `/transactionInfo/${txhash}`,
      });
    },
  },
};
</script>
<style>
.txid {
  width: 200px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.addr {
  width: 150px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
