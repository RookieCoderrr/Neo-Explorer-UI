<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row align-items-center">
        <div class="col-2">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
            {{ title }}
          </h3>
        </div>
        <div class="col-6"></div>
        <div class="col-4">
          <div class="search">
            <input
              type="text"
              class="over-ellipsis"
              :placeholder="'Search by Contract Name'"
              v-model="searchVal"
              autocomplete="off"
              @keyup.enter="search()"
            /><button class="button" @click="search()">
            <img class="img" src="../../assets/search.png" alt="search" /></button>
          </div>
        </div>
      </div>
    </div>

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
        :data="contractList"
      >
        <template v-slot:columns>
          <th>Hash</th>
          <th>Name</th>
          <th>Creator <button class="btn btn-sm btn-primary"  @click="changeFormat()">{{this.buttonName}}</button> </th>
          <th>Index</th>
          <th>Create Time</th>
        </template>

        <template v-slot:default="row">
          <th scope="row" v-if="row.item">
            <div class="media align-items-center">
              <div class="media-body" >
                <a class="name mb-0 text-sm" style="cursor: pointer" @click="getContract(row.item.hash)">{{ row.item.hash }}</a>
              </div>
            </div>
          </th>
          <td class="name">
            {{ row.item.name }}
          </td>
          <td class="Creator">
            <span class="text-muted" v-if="row.item.Transaction.length === 0">Not Available</span>
            <a class="mb-0 text-sm" v-else-if="this.state" style="cursor: pointer" @click="getSender(row.item.Transaction[0]['sender'])"> {{row.item.Transaction[0]["sender"]}} </a>
            <a class="mb-0 text-sm" v-else style="cursor: pointer" @click="getSender(row.item.Transaction[0]['sender'])"> {{addressToScriptHash(row.item.Transaction[0]["sender"])}} </a>
          </td>
          <td class="index">
            {{row.item.id}}
          </td>
          <td class="time">
            {{ convertTime(row.item.createtime) }}
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
          &nbsp; of &nbsp;{{this.countPage }}
        </div>
      </div>
      <base-pagination
        :total="totalCount"
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
  name: "contracts-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  components: {
    Loading
  },
  data() {
    return {
      contractList: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      isLoading: true,
      searchVal: "",
      name: "",
      countPage: 0,
      state: true,
      buttonName: "Hash",
    };
  },
  created() {
    this.getContractList(0);
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
        this.pagination =this.countPage ;
        const skip =
                (this.countPage -1) * this.resultsPerPage;
        this.getContractList(skip);
      }else if(pageNumber <= 0){
        this.isLoading = true;
        this.pagination = 1;
        const skip =
                this.resultsPerPage;
        this.getContractList(skip);
      }
      else {
        this.isLoading = true;
        this.pagination = pageNumber;
        const skip = (pageNumber - 1) * this.resultsPerPage;
        this.getContractList(skip);
      }
    },
    convertTime(ts) {
      return format(ts);
    },
    pageChange(pageNumber) {
      this.isLoading = true;
      this.pagination = pageNumber;
      const skip = (pageNumber - 1) * this.resultsPerPage;
      if (this.name !== "") {
        this.getContractListByName(name, skip);
      }
      this.getContractList(skip);
    },
    getContract(hash) {
      this.$router.push({
        path: `/contractinfo/${hash}`
      });
    },
    getContractList(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { Limit: this.resultsPerPage, Skip: skip },
          method: "GetContractList",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        console.log(res);
        this.contractList = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.countPage = (this.totalCount ===0) ?  1  : (Math.ceil(this.totalCount / this.resultsPerPage))
        this.isLoading = false;
      });
    },
    getContractListByName(name, skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { Name: this.name, Limit: this.resultsPerPage, Skip: skip },
          method: "GetContractListByName",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.contractList = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.countPage = (this.totalCount ===0) ?  1  : (Math.ceil(this.totalCount / this.resultsPerPage))
        this.isLoading = false;
      });
    },
    addressToScriptHash(addr) {
      const acc = Neon.create.account(addr);
      return "0x" + acc.scriptHash;
    },
    getSender(addr) {
      this.$router.push({
        path: `/accountprofile/${this.addressToScriptHash(addr)}`
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
    search() {
      this.isLoading = true;
      let value = this.searchVal;
      // const inputValue = this.searchVal;
      value = value.trim();
      if (value === "") {
        return;
      }
      this.name = value;
      this.searchVal = "";
      this.getContractListByName(value, 0);
    },
  },
};
</script>
<style></style>
