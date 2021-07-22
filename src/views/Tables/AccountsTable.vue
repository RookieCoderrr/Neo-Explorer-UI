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
        :data="tableData"
      >
        <template v-slot:columns>
          <th>ID.</th>
          <th>Address</th>
          <th>Created Time</th>
          <th></th>
        </template>
        <template v-slot:default="row">
          <td>
            {{ row.item._id }}
          </td>
          <td class="address">
            <a @click="getAddress(row.item.address)">{{ row.item.address }}</a>
          </td>
          <td class="firstusetime">
            {{ row.item.firstusetime }}
          </td>
        </template>
      </base-table>
    </div>

    <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <base-pagination
        :total="this.totalAccount"
        :value="this.pagination"
        v-on:input="pageChange($event)"
      ></base-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { format } from "timeago.js";
export default {
  name: "accounts-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  data() {
    return {
      tableData: [],
      totalAccount: 100,
      pagination: 1,
      resultsPerPage: 10,
    };
  },
  created() {
    this.getAccoutsList(0);
  },
  methods: {
    pageChange(pageNumber) {
      this.pagination = pageNumber;
      const skip = (pageNumber - 1) * this.resultsPerPage;
      this.getAccoutsList(skip);
    },
    getAccoutsList(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          method: "GetAccountsList",
          params: { Limit: this.resultsPerPage, Skip: skip },
          id: 1,
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: "true",
          crossDomain: "true",
        },
      })
        .then((res) => {
          let temp = res["data"]["result"]["result"]
          for(let k=0; k<temp.length; k++) {
            temp[k]["firstusetime"] = format(temp[k]["firstusetime"])
          }
          this.tableData = temp;
          this.totalAccount = res["data"]["result"]["totalCount"];
        })
        .catch((err) => {
          console.log("Error", err);
        });
    },
    getAddress(accountAddress) {
      this.$router.push({
        path: `/accountprofile/${accountAddress}`,
      });
    },
  },
};
</script>
<style></style>
