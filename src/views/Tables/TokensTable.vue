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
        <div class="col text-right">
          <base-button type="primary" size="sm">See all</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
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
                <span class="name mb-0 text-sm">{{ row.item.hash }}</span>
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
            <badge class="badge-dot mr-4" type="primary">
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
export default {
  name: "tokens-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  data() {
    return {
      tokenList: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
    };
  },
  created() {
    this.getTokenList(0);
  },
  methods: {
    pageChange(pageNumber) {
      this.pagination = pageNumber;
      const skip = (pageNumber - 1) * this.resultsPerPage;
      this.getTokenList(skip);
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
        console.log(res)
        this.tokenList = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
      });
    },
  },
};
</script>
<style></style>
