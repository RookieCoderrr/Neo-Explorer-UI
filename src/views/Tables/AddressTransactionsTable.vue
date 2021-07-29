<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"
      >
        <template v-slot:columns>
          <th>交易ID</th>
          <th>区块高度</th>
          <th>大小</th>
          <th>时间</th>
          <th>花费的GAS</th>
          <th></th>
        </template>

        <template v-slot:default="row">
          <td>
            <div class="txid" @οnmοuseοver="mouseHover(row.item.hash)">
              <a
                class="name mb-0 text-sm"
                style="cursor: pointer"
                @click="getTransaction(row.item.hash)"
                >{{ row.item.hash }}</a
              >
            </div>
          </td>
          <td class="budget">
            {{ row.item.blockIndex }}
          </td>
          <td class="budget">{{ row.item.size }} bytes</td>
          <td class="budget">
            {{ this.convertTime(row.item.blocktime) }}
          </td>

          <td class="budget">
            {{ this.convertGas(row.item.netfee + row.item.sysfee) }}
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
// by zilie cdde2b58d09e04290f9eabd8a6ebdbb3078d8cf4
import axios from "axios";
import { format } from "timeago.js";
export default {
  name: "transactions-table",
  props: {
    type: {
      type: String,
    },
    account_address: String,
  },
  data() {
    return {
      tableData: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
    };
  },

  created() {
    this.getTransactions();
  },
  methods: {
    mouseHover(txid) {
      var a = document.getElementsByClassName("txid");
      a.onmouseover = function () {};
      a.style.display = txid;
    },
    convertGas(gas) {
      if (gas == 0) {
        return 0;
      }
      return (gas * Math.pow(0.1, 8)).toFixed(6);
    },

    convertTime(time) {
      return format(time);
    },
    getTransaction(txhash) {
      this.$router.push({
        path: `/icons/${txhash}`,
      });
    },
    pageChange(pageNumber) {
      this.pagination = pageNumber;
      const skip = (pageNumber - 1) * this.resultsPerPage;
      this.getTransactionList(skip);
    },
    getTransactions(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          method: "GetRawTransactionByAddress",
          params: {
            Limit: this.resultsPerPage,
            Skip: skip,
            Address: this.account_address,
          },
          id: 1,
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: "true",
          crossDomain: "true",
        },
      })
        .then((res) => {
          this.tableData = res["data"]["result"]["result"];
        })
        .catch((err) => {
          console.log("Error", err);
        });
    },

    getTransactionList(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { Limit: this.resultsPerPage, Skip: skip },
          method: "GetTransactionList",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.tableData = res["data"]["result"]["result"];
      });
    },
  },
};
</script>
<style>
.txid {
  width: 200px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
