<template>
  <div class="col list-title">
    <h1 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
      {{ title }}
    </h1>
  </div>
  <div class="card shadow list-card" :class="type === 'dark' ? 'bg-default' : ''">
    <!--div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
            {{ $t("transactionList.title") }}
          </h3>
        </div>
      </div>
    </div-->
    <div class="table-responsive">
      <loading
        :is-full-page="false"
        :opacity="0.9"
        :active="isLoading"
      ></loading>
      <base-table
        class="table align-items-center table-flush list-table"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"
      >
        <template v-slot:columns>
          <th class="tableHeader">{{ $t("transactionList.transactionId") }}</th>
          <th class="tableHeader">{{ $t("transactionList.blockHeight") }}</th>
          <th class="tableHeader">{{ $t("transactionList.size") }}</th>
          <th class="tableHeader">{{ $t("transactionList.time") }}</th>
          <th class="tableHeader">{{ $t("transactionList.gasConsumed") }}</th>
        </template>

        <template v-slot:default="row">
          <td class="id">
            <div style="text-align: left;">
            <router-link
              class="table-list-item-blue mb-0 "
              style="cursor: pointer"
              :to="'/transactionInfo/'+row.item.hash"
              >{{ row.item.hash }}</router-link
            >
            </div>
          </td>
          <td class="id">
            <router-link
              class="table-list-item-blue mb-0 "
              style="cursor: pointer"
              :to="'/blockinfo/'+row.item.blockhash"
              >{{ row.item.blockIndex }}</router-link
            >
          </td>
          <td class="table-list-item">{{ row.item.size }} {{ $t("bytes") }}</td>
          <td class="table-list-item">
            {{ this.convertTime(row.item.blocktime, this.$i18n.locale) }}

          </td>

          <td class="table-list-item">
            {{ this.convertGas(row.item.netfee + row.item.sysfee) }}
          </td>
        </template>
      </base-table>
    </div>

    <div
      v-if="this.totalCount > 10"
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
      style="height: 70px"
    >
          <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="pagination"
                  :pager-count= "5"
                  :page-size= "10"
                  layout="jumper, prev, pager, next"
                  :total="totalCount">
          </el-pagination>

    </div>
  </div>
</template>
<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { convertGas, convertTime } from "../../store/util";
export default {
  name: "transactions-table",
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
      tableData: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      placeHolder: 0,
      isLoading: true,
      countPage: 0,
      currentPage4: 4,
    };
  },

  created() {
    this.getTransactionList(0);
  },

  methods: {
    convertGas,
    convertTime,
    handleCurrentChange(val) {
        this.isLoading = true;
        this.pagination = val;
        const skip = (val - 1) * this.resultsPerPage;
        this.getTransactionList(skip);
    },
    getTransaction(txhash) {
      this.$router.push({
        path: `/transactionInfo/${txhash}`,
      });
    },
    getBlock(blochash) {
      this.$router.push({
        path: `/blockinfo/${blochash}`,
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
        this.isLoading = false;
        this.tableData = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.countPage =
          this.totalCount === 0
            ? 1
            : Math.ceil(this.totalCount / this.resultsPerPage);
      });
    },
  },
};
</script>
<style>
.id {
  width: 200px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
