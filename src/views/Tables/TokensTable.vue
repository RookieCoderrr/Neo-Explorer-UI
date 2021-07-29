<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
            {{ title }}
          </h3>
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
          <th></th>
        </template>

        <template v-slot:default="row">
          <th scope="row">
            <div class="media align-items-center">
              <div class="media-body">
                <a
                  class="name mb-0 text-sm"
                  style="cursor: pointer"
                  @click="getToken(row.item.hash)"
                  >{{ row.item.hash }}</a
                >
              </div>
            </div>
          </th>
          <td class="name">
            {{ row.item.tokenname }}
          </td>
          <td class="symbol">
            {{ row.item.symbol }}
          </td>
          <td>
            <badge
              v-if="row.item.standard === 'NEP17'"
              class="badge-dot mr-4"
              type="primary"
            >
              <span class="">{{ row.item.standard }}</span>
            </badge>
            <badge v-else class="badge-dot mr-4" type="success">
              <span class="">{{ row.item.standard }}</span>
            </badge>
          </td>
          <td class="holders">
            {{ row.item.total_holders }}
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
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "tokens-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  components: {
    Loading,
  },
  data() {
    return {
      tokenList: [],
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
      } else if (pageNumber <= 0) {
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
          method: "GetTokenList",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.tokenList = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.isLoading = false;
      });
    },
  },
};
</script>
<style></style>
