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
        :data="tableData"
      >
        <template v-slot:columns>
          <th>Transaction ID</th>
          <th>Block Height</th>
          <th>Size</th>
          <th>Time</th>
          <th>GAS Consumed</th>

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

    <div v-if="this.totalCount > 10"
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
          &nbsp; of &nbsp;{{ countPage }}
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
// by zilie cdde2b58d09e04290f9eabd8a6ebdbb3078d8cf4
import axios from "axios";
import { format } from "timeago.js";
import Loading from"vue-loading-overlay";

export default {
  name: "transactions-table",
  props: {
    type: {
      type: String,
    },
    account_address: String,
  },
  components: {
    Loading,
  },
  data() {
    return {
      tableData: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      countPage:0,
      isLoading: true,
    };
  },

  created() {
    this.getTransactions();
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

    convertTime(ts) {
      const lang = this.$i18n.locale;
      switch (lang) {
        case "cn":
          return format(ts, "zh_CN");
        default:
          return format(ts);
      }
    },
    getTransaction(txhash) {
      this.$router.push({
        path: `/transactionInfo/${txhash}`,
      });
    },
    // TODO 替换这个gettransactionslist的bug
    pageChange(pageNumber) {
      this.isLoading = true;
      this.pagination = pageNumber;
      const skip = (pageNumber - 1) * this.resultsPerPage;
      this.getTransactions(skip);
    },
    pageChangeByInput(pageNumber) {
      if (pageNumber >= this.countPage) {
        this.isLoading = true;
        this.pagination =this.countPage;
        const skip =
                ( this.countPage - 1 ) * this.resultsPerPage;
        this.getTransactions(skip);
      } else if (pageNumber <= 0) {
        this.isLoading = true;
        this.pagination = 1;
        const skip = this.resultsPerPage;
        this.getTransactions(skip);
      } else {
        this.isLoading = true;
        this.pagination = pageNumber;
        const skip = (pageNumber - 1) * this.resultsPerPage;
        this.getTransactions(skip);
      }
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
          this.isLoading = false;
          this.tableData = res["data"]["result"]["result"];
          this.totalCount = res["data"]["result"]["totalCount"];
          this.countPage = (this.totalCount ===0) ?  1  : (Math.ceil(this.totalCount / this.resultsPerPage))
        })
        .catch((err) => {
          console.log("Error", err);
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
