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
        :data="NEP17TxList"
      >
        <template v-slot:columns>
          <th> {{$t('tokenHolder.ranking')}}</th>
          <th>{{$t('tokenHolder.address')}}<button class="btn btn-sm btn-primary"  @click="changeFormat()">{{this.buttonName}}</button></th>
          <th>{{$t('tokenHolder.balance')}}</th>
<!--          <th>Last Transferred</th>-->
          <th>{{$t('tokenHolder.percentage')}}</th>
        </template>

        <template v-slot:default="row">
          <th scope="row">
            <div class="media align-items-center">
              <div class="media-body">
                <div v-if="row.index + (pagination - 1) * 10 === 0">{{ row.index + (pagination - 1) * 10 + 1 }} &#129351;</div>
                <div v-else-if="row.index + (pagination - 1) * 10 === 1">{{ row.index + (pagination - 1) * 10 + 1 }} &#129352;</div>
                <div v-else-if="row.index + (pagination - 1) * 10 === 2">{{ row.index + (pagination - 1) * 10 + 1 }} &#129353;</div>
                <div v-else>{{ row.index + (pagination - 1) * 10 + 1 }}</div>
              </div>
            </div>
          </th>
          <td class="Address">
            <a v-if="this.state" class="name mb-0 text-sm" style="cursor: pointer" @click="getAddress(row.item.address)">{{ scriptHashToAddress(row.item.address) }}</a>
            <a v-else class="name mb-0 text-sm" style="cursor: pointer" @click="getAddress(row.item.address)">{{row.item.address}} </a>
          </td>
          <td class="balance">
            {{ convertToken(row.item.balance, this.decimal) }}
          </td>
<!--          <td class="firstused">-->
<!--            {{ convertTime(row.item.lasttx.timestamp) }}-->
<!--          </td>-->
          <td class="percentage">
            {{ toPercentage(row.item.percentage) }}
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
import Neon from "@cityofzion/neon-js";

export default {
  name: "token-holder",
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
      NEP17TxList: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      isLoading: true,
      countPage:0,
      state: true,
      buttonName: this.$t('hash'),
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
        const skip =
                this.resultsPerPage;
        this.getTokenList(skip);
      } else {
        this.isLoading = true;
        this.pagination = pageNumber;
        const skip = (pageNumber - 1) * this.resultsPerPage;
        this.getTokenList(skip);
      }
    },
    toPercentage(num) {
      let s = Number(num * 100).toFixed(4);
      s += "%";
      return s;
    },
    pageChange(pageNumber) {
      this.isLoading = true;
      this.pagination = pageNumber;
      const skip = (pageNumber - 1) * this.resultsPerPage;
      this.getTokenList(skip);
    },
    convertTime(ts){
      return format(ts);
    },
    convertToken(val, decimal) {
      return val * Math.pow(10, -decimal);
    },
    getAddress(accountAddress) {
      this.$router.push({
        path: `/accountprofile/${accountAddress}`,
      });
    },
    scriptHashToAddress(hash) {
      hash = hash.substring(2);
      const acc = Neon.create.account(hash);
      return acc.address;
    },
    changeFormat() {
      if (this.state === true) {
        this.state = false;
        this.buttonName = this.$t('wif');
      } else {
        this.state = true;
        this.buttonName = this.$t('hash');
      }
    },
    getTokenList(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {"ContractHash": this.contractHash, Limit: this.resultsPerPage, Skip: skip },
          method: "GetAssetHoldersByContractHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        console.log(res);
        this.NEP17TxList = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.countPage = Math.ceil(this.totalCount / this.resultsPerPage)
        this.isLoading = false;
      });
    },
  },
};
</script>
<style></style>
