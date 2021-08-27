<template>
  <div v-if="this.totalCount != 0">
    <div
      v-if="this.totalCount != 0"
      class="card shadow"
      :class="type === 'dark' ? 'bg-default' : ''"
    >
      <div class="table-responsive">
        <base-table
          class="table align-items-center table-flush"
          :class="type === 'dark' ? 'table-dark' : ''"
          :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
          tbody-classes="list"
          :data="tableData"
        >
          <template v-slot:columns>
            <th class="tableHeader">
              {{ $t("transactionList.transactionId") }}
            </th>
            <th class="tableHeader">{{ $t("transactionList.blockHeight") }}</th>
            <th class="tableHeader">{{ $t("transactionList.size") }}</th>
            <th class="tableHeader">{{ $t("transactionList.time") }}</th>
            <th class="tableHeader">{{ $t("transactionList.gasConsumed") }}</th>
          </template>
          <template v-slot:default="row">
            <td>
              <div class="txid">
                <router-link
                  class=" mb-0 table-list-item-blue"
                  style="cursor: pointer"
                  :to="'/transactionInfo/' + row.item.hash"
                  >{{ row.item.hash }}</router-link
                >
              </div>
            </td>
            <td class="table-list-item">
              {{ row.item.blockIndex }}
            </td>
            <td class="table-list-item">{{ row.item.size }} bytes</td>
            <td class="table-list-item">
              {{ this.convertTime(row.item.blocktime, this.$i18n.locale) }}
            </td>

            <td class="table-list-item">
              {{ this.convertGas(row.item.netfee + row.item.sysfee) }}
            </td>
          </template>
        </base-table>
        <div v-if="totalCount>=10"
                class="card-footer d-flex justify-content-end"
                :class="type === 'dark' ? 'bg-transparent' : ''"
                style="height: 70px"
        >
          <el-pagination
                  @current-change="handleCurrentChange"
                  :hide-on-single-page="totalCount<=10"
                  :current-page="pagination"
                  :pager-count= "5"
                  :page-size= "10"
                  layout="jumper, prev, pager, next"
                  :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
  <card v-else shadow class="text-center">
    {{ $t("addressPage.txnullPrompt") }}
  </card>
</template>
<script>
import axios from "axios";
import { convertTime, convertGas } from "../../store/util";

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
    handleCurrentChange(val) {
      this.isLoading = true;
      this.pagination = val;
      const skip = (val - 1) * this.resultsPerPage;
      this.getTransactions(skip);
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
