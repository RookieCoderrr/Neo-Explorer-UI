<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div v-if="this.totalCount != 0" class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"
      >
        <template v-slot:columns>
          <th style="background:#5576EC; color:#ffffff">{{ $t("transactionList.transactionId") }}</th>
          <th style="background:#5576EC; color:#ffffff">{{ $t("transactionList.blockHeight") }}</th>
          <th style="background:#5576EC; color:#ffffff">{{ $t("transactionList.size") }}</th>
          <th style="background:#5576EC; color:#ffffff">{{ $t("transactionList.time") }}</th>
          <th style="background:#5576EC; color:#ffffff">{{ $t("transactionList.gasConsumed") }}</th>
        </template>

        <template v-slot:default="row">
          <td>
            <div class="txid">
              <router-link
                class="name mb-0 text-sm"
                style="cursor: pointer"
                :to="'/transactionInfo/'+ row.item.hash"
                >{{ row.item.hash }}</router-link
              >
            </div>
          </td>
          <td class="budget">
            {{ row.item.blockIndex }}
          </td>
          <td class="budget">{{ row.item.size }} bytes</td>
          <td class="budget">
            {{ this.convertTime(row.item.blocktime, this.$i18n.locale) }}
          </td>

          <td class="budget">
            {{ this.convertGas(row.item.netfee + row.item.sysfee) }}
          </td>
        </template>
      </base-table>
    </div>
    <div v-else class="row">
      <div class="col">
        <card shadow class="text-center">{{
          $t("addressPage.txnullPrompt")
        }}</card>
      </div>
    </div>

    <div
      v-if="this.totalCount > 10"
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
        <div class="text">&nbsp; of &nbsp;{{ countPage }}</div>
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
import {convertTime, convertGas} from "../../store/util";

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
      countPage: 0,
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
  watch: {
    account_address: "watchaddress",
  },
  methods: {
    convertTime,
    convertGas,
    watchaddress() {
      //如果路由有变化，执行的对应的动作
      this.getTransactions(0);
    },
    getTransaction(txhash) {
      this.$router.push({
        path: `/transactionInfo/${txhash}`,
      });
    },
    // TODO 替换这个gettransactionslist的bug
    pageChange(pageNumber) {
      this.pagination = pageNumber;
      const skip = (pageNumber - 1) * this.resultsPerPage;
      this.getTransactions(skip);
    },
    pageChangeByInput(pageNumber) {
      if (pageNumber >= this.countPage) {
        this.pagination = this.countPage;
        const skip = (this.countPage - 1) * this.resultsPerPage;
        this.getTransactions(skip);
      } else if (pageNumber <= 0) {
        this.pagination = 1;
        const skip = this.resultsPerPage;
        this.getTransactions(skip);
      } else {
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
          this.tableData = res["data"]["result"]["result"];
          this.totalCount = res["data"]["result"]["totalCount"];
          this.countPage =
            this.totalCount === 0
              ? 1
              : Math.ceil(this.totalCount / this.resultsPerPage);
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
