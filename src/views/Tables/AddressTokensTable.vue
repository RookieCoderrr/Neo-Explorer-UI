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
              <div class="media-body" >
                <a class="name mb-0 text-sm" style="cursor: pointer" @click="getToken(row.item.hash)">{{ row.item.hash }}</a>
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
            <badge v-if="row.item.standard==='NEP17'" class="badge-dot mr-4" type="primary">
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

export default {
  name: "address-tokens-table",
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
      tokenList: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      isLoading: true,
      firstTime: true,
    };
  },
  created() {
    this.getTokenList(0);
  },
  methods: {
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
        console.log(res);
        this.tokenList = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.isLoading = false;
      });
    },
  },
};
</script>
<style></style>
