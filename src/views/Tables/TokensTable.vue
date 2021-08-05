<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row align-items-center">
        <div class="col-8">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
            {{ title }}
          </h3>
        </div>
        <div class="col-4">
          <div class="search">
            <input
              type="text"
              class="over-ellipsis"
              :placeholder="'Search by Token Name'"
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
        :data="tokenList"
      >
        <template v-slot:columns>
          <th>Hash</th>
          <th>Name</th>
          <th>Symbol</th>
          <th>Standard</th>
          <th>Total Holders</th>
        </template>

        <template v-slot:default="row">
          <th scope="row">
            <div class="media align-items-center">
              <div class="media-body" >
                <a class="name mb-0 text-sm" style="cursor: pointer" @click="getToken(row.item.hash)">{{ row.item.hash }}</a>
              </div>
            </div>
          </th>
          <td class="name">
            <span v-if="row.item.ispopular">{{ row.item.tokenname }} &#x1F525; </span>
            <span v-else>{{ row.item.tokenname}}</span>
          </td>
          <td class="symbol">
            {{ row.item.symbol }}
          </td>
          <td>
            <badge v-if="row.item.type==='NEP17'" class="badge-dot mr-4" type="primary">
              <span class="">{{ row.item.type }}</span>
            </badge>
            <badge v-else class="badge-dot mr-4" type="success">
              <span class="">{{ row.item.type }}</span>
            </badge>
          </td>
          <td class="holders">
            {{ row.item.holders }}
          </td>
        </template>
      </base-table>
    </div>

    <div v-if="this.totalCount> 10 "
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
          &nbsp; of &nbsp;{{countPage }}
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

export default {
  name: "tokens-table",
  props: {
    type: { type: String},
    title: String,
  },
  components: {
    Loading
  },
  data() {
    return {
      tokenList: [],
      tokenListName: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      isLoading: true,
      name: "",
      searchVal: "",
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
        const skip = (this.countPage - 1 ) * this.resultsPerPage;
        this.getTokenList(skip);
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
      this.isLoading = true;
      this.pagination = pageNumber;
      const skip = (pageNumber - 1) * this.resultsPerPage;
      if (this.name !== "") {
        this.getTokenListByName(name, skip);
      }
      this.getTokenList(skip);
    },
    getToken(hash) {
      this.$router.push(`/tokeninfo/${hash}`);
    },
    getTokenList(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { Limit: this.resultsPerPage, Skip: skip },
          method: "GetAssetInfos",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        console.log(res);
        this.tokenList = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.countPage = Math.ceil( this.totalCount / this.resultsPerPage )
        this.isLoading = false;
      });
    },
    getTokenListByName(name, skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { Name: this.name, Limit: this.resultsPerPage, Skip: skip },
          method: "GetAssetInfosByName",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.tokenList = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.countPage = Math.ceil( this.totalCount / this.resultsPerPage )
        this.isLoading = false;
      });
    },
    search() {
      this.isLoading = true;
      let value = this.searchVal;
      value = value.trim();
      if (value === "") {
        return;
      }
      this.name = value;
      this.searchVal = "";
      this.getTokenListByName(value, 0);
    },
  },
};
</script>
<style></style>
