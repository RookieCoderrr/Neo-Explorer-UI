<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div class="table-responsive">
      <loading
        :is-full-page="false"
        :opacity="0.9"
        :active="isLoading"
      ></loading>
      <collapse-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="NEP17TxList"
      >
        <template v-slot:columns>
          <th>Address</th>
          <th>Balance</th>
          <th>Last Transferred</th>
          <th>Percentage</th>
          <th>Tokens</th>
        </template>

        <template v-slot:default="row" >
          <th v-if="row.item">
            <a   data-toggle="collapse"
                 :href="`#${row.item.address}`"> >  </a>
          </th>
          <th scope="row" >
            <div class="media align-items-center">
              <div class="media-body">
                <a class="name mb-0 text-sm" style="cursor: pointer" @click="getAddress(row.item.address)">{{ row.item.address}}</a>
              </div>
            </div>
          </th>

          <td class="balance">
            <div>{{ convertToken(row.item.balance, this.decimal) }}</div>
          </td>
          <td class="firstused" v-if="row.item.tokenlist">
            {{ convertTime(row.item.tokenlist[0]["time"]) }}
          </td>
          <td class="percentage">
            {{ toPercentage(row.item.percentage) }}
          </td>
<!--          <td   class="collapse" :id="row.item.address" >-->
<!--            <card shadow v-for="(item, index) in row.item.tokenlist" :key="index">-->
<!--              <div class="row">-->
<!--                  Token ID: {{item.tokenid}}-->
<!--              </div>-->
<!--              <div class="row">-->
<!--                Last Transferred: {{convertTime(item.time)}}-->
<!--              </div>-->
<!--            </card>-->
<!--          </td>-->
        </template>
      </collapse-table>
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
          &nbsp; of &nbsp;{{
          parseInt(this.totalCount / this.resultsPerPage) + 1
          }}
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
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { format } from "timeago.js";
export default {
  name: "token-holder11",
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
      if (pageNumber >= parseInt(this.totalCount / this.resultsPerPage) + 1) {
        this.isLoading = true;
        this.pagination = parseInt(this.totalCount / this.resultsPerPage) + 1;
        const skip =
                parseInt(this.totalCount / this.resultsPerPage) * this.resultsPerPage;
        this.getBlockList(skip);
      }else if(pageNumber <= 0){
        this.isLoading = true;
        this.pagination = 1;
        const skip =
                this.resultsPerPage;
        this.getTokenList(skip);
      }
      else {
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
    getTokenList(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {"ContractHash": this.contractHash, Limit: this.resultsPerPage, Skip: skip },
          method: "GetNep11HoldersByContractHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.NEP17TxList = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.isLoading = false;
      });
    },
  },
};
</script>
<style></style>
