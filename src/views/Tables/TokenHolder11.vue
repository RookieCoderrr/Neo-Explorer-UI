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
          <th>Address <button class="btn btn-sm btn-primary"  @click="changeFormat()">{{this.buttonName}}</button></th>
          <th>Balance</th>
          <th>Last Transferred</th>
          <th>Percentage</th>
          <th>Tokens</th>
        </template>

        <template v-slot:default="row">
          <th scope="row">
            <div class="media align-items-center">
              <div class="media-body">
                <a v-if="this.state" class="name mb-0 text-sm" style="cursor: pointer" @click="getAddress(row.item.address)">{{ scriptHashToAddress(row.item.address) }}</a>
                <a v-else class="name mb-0 text-sm" style="cursor: pointer" @click="getAddress(row.item.address)">{{row.item.address}}</a>
              </div>
            </div>
          </th>
          <td class="balance">
            <div>{{ row.item.balance }}</div>
          </td>
          <td class="firstused" v-if="row.item.tokenlist">
            {{ convertTime(row.item.tokenlist[0]["time"]) }}
          </td>
          <td class="percentage">
            {{ toPercentage(row.item.percentage) }}
          </td>
          <td>
            <card shadow v-for="(item, index) in row.item.tokenlist" :key="index">
              <div class="row">
                Token ID: {{item.tokenid}}
              </div>
              <div class="row">
                Last Transferred: {{convertTime(item.time)}}
              </div>
            </card>
          </td>
        </template>
      </base-table>
    </div>

    <div
            class="card-footer d-flex justify-content-end"
            :class="type === 'dark' ? 'bg-transparent' : ''"
    >
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
import Neon from "@cityofzion/neon-js";

export default {
  name: "token-holder11",
  props: {
    type: {
      type: String,
    },
    contractHash: String,
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
      firstTime: true,
      state: true,
      buttonName: "Hash",
    };
  },
  created() {
    this.getTokenList(0);
  },
  methods: {
    toPercentage(num) {
      let s = Number(num * 100).toFixed(4);
      s += "%";
      return s;
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
    scriptHashToAddress(hash) {
      hash = hash.substring(2);
      const acc = Neon.create.account(hash);
      return acc.address;
    },
    getAddress(accountAddress) {
      this.$router.push({
        path: `/accountprofile/${accountAddress}`,
      });
    },
    changeFormat() {
      if (this.state === true) {
        this.state = false;
        this.buttonName = "WIF";
      } else {
        this.state = true;
        this.buttonName = "Hash";
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
          method: "GetNep11HoldersByContractHash",
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
        this.isLoading = false;
      });
    },
  },
};
</script>
<style></style>
