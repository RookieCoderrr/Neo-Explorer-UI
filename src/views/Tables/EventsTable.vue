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
        :data="contractList"
      >
        <template v-slot:columns>
          <th>Txid</th>
          <th>Event Name</th>
          <th>VM State</th>
          <th>Index</th>
          <th>Fired</th>
          <th></th>
        </template>

        <template v-slot:default="row">
          <th scope="row">
            <div class="media align-items-center">
              <div class="media-body" >
                <a class="name mb-0 text-sm" style="cursor: pointer">{{ row.item.txid }}</a>
              </div>
            </div>
          </th>
          <td class="name">
            {{ row.item.eventname }}
          </td>
          <td class="vm">
            {{row.item.Vmstate}}
          </td>
          <td class="index">
            {{row.item.index}}
          </td>
          <td class="event">
            {{convertTime(row.item.timestamp)}}
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

export default {
  name: "events-table",
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
      contractList: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      isLoading: true,
      firstTime: true,
    };
  },
  created() {
    this.getContractList(0);
  },
  methods: {
    convertTime(ts) {
      return format(ts);
    },
    pageChange(pageNumber) {
      if (!this.firstTime) {
        this.isLoading = true;
        this.pagination = pageNumber;
        const skip = (pageNumber - 1) * this.resultsPerPage;
        this.getContractList(skip);
      } else {
        this.firstTime = false;
      }
    },
    getContract(hash) {
      this.$router.push(`/contractinfo/${hash}`);
    },
    getContractList(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {"ContractHash": this.contractHash, Limit: this.resultsPerPage, Skip: skip },
          method: "GetNotificationByContractHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.contractList = res["data"]["result"]['result'];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.isLoading = false;
      });
    },
  },
};
</script>
<style></style>
