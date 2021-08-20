<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
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
            <router-link
              class="name mb-0 text-sm"
              style="cursor: pointer"
              :to="'/transactionInfo/'+row.item.hash"
              >{{ row.item.hash }}</router-link
            >
          </td>
          <td class="id">
            <router-link
              class="name mb-0 text-sm"
              style="cursor: pointer"
              :to="'/blockinfo/'+row.item.blockhash"
              >{{ row.item.blockIndex }}</router-link
            >
          </td>
          <td class="budget">{{ row.item.size }} {{ $t("bytes") }}</td>
          <td >
<!--            {{ this.convertTime(row.item.blocktime, this.$i18n.locale) }}-->
            <div class="timeago" :datetime="(convertISOTime(row.item.blocktime))"> </div>
          </td>

          <td class="budget">
            {{ this.convertGas(row.item.netfee + row.item.sysfee) }}
          </td>
        </template>
      </base-table>
    </div>

    <div
      v-if="this.totalCount > 10"
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div style="margin-right: 10px; width: 250px" class="row">
        <div class="text">{{ $t("transactionList.page") }} &nbsp;</div>
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
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { convertGas, convertTime, convertISOTime } from "../../store/util";
import {render} from "timeago.js";
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
    };
  },

  created() {
    this.getTransactionList(0);
  },
  updated() {
    const nodes = document.getElementsByClassName('timeago')
    if(nodes.length != 0){
      if(this.$i18n.locale === 'cn'){
        render(nodes, 'zh_CN');
      }else{
        render(nodes, this.$i18n.locale );
      }
    }
  },
  computed: {
    text() {
      return function (value) {
        let inputLength = value.toString().length * 10 + 50;
        return (
          "width: " +
          inputLength +
          "px!important;text-align: center;height:80%;margin-top:5%;"
        );
      };
    },
  },
  methods: {
    convertGas,
    convertTime,
    convertISOTime,
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
    pageChange(pageNumber) {
      this.isLoading = true;
      this.pagination = pageNumber;
      const skip = (pageNumber - 1) * this.resultsPerPage;
      this.getTransactionList(skip);
    },
    pageChangeByInput(pageNumber) {
      if (pageNumber >= this.countPage) {
        this.pagination = this.countPage;
        const skip = (this.countPage - 1) * this.resultsPerPage;
        this.getTransactionList(skip);
      } else if (pageNumber <= 0) {
        this.pagination = 1;
        const skip = this.resultsPerPage;
        this.getTransactionList(skip);
      } else {
        this.pagination = pageNumber;
        const skip = (pageNumber - 1) * this.resultsPerPage;
        this.getTransactionList(skip);
      }
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
