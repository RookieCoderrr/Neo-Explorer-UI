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
        :data="ScCallList"
      >
        <template v-slot:columns>
          <th>{{ $t("contract.txID") }}</th>
          <th>
            {{ $t("contract.sender") }}
            <button class="btn btn-sm btn-primary" @click="changeFormat(button)">
              {{ button.buttonName }}
            </button>
          </th>
          <th>{{ $t("contract.method") }}</th>
          <th>{{ $t("contract.callFlags") }}</th>
          <th>{{ $t("contract.time") }}</th>
        </template>

        <template v-slot:default="row">
          <th scope="row">
            <div class="media align-items-center">
              <div class="media-body txid">
                <span
                  class="text-muted"
                  v-if="
                    row.item.txid ===
                    '0x0000000000000000000000000000000000000000000000000000000000000000'
                  "
                  >Null Transaction</span
                >
                <a
                  class="name mb-0 text-sm"
                  v-else
                  style="cursor: pointer"
                  @click="getTransaction(row.item.txid)"
                  >{{ row.item.txid }}</a
                >
              </div>
            </div>
          </th>
          <td class="Sender">
            <div class="addr">
              <span class="text-muted" v-if="row.item.originSender === null">
                Null Account
              </span>
              <a
                v-else-if="button.state"
                class="name mb-0 text-sm"
                style="cursor: pointer"
                @click="getAddress(row.item.originSender)"
                >{{ scriptHashToAddress(row.item.originSender) }}</a
              >
              <a
                v-else
                class="name mb-0 text-sm"
                style="cursor: pointer"
                @click="getAddress(row.item.originSender)"
                >{{ row.item.originSender }}</a
              >
            </div>
          </td>
          <td class="Method">
            {{ row.item.method }}
          </td>
          <td class="Call Flags">
            {{ row.item.callFlags }}
          </td>
          <td class="time">
            Currently Unavailable
            <!--            //{{ convertTime(row.item.time) }}-->
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
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import {scriptHashToAddress, convertTime, changeFormat} from "../../store/util";

export default {
  name: "sc-call-table",
  props: {
    type: {
      type: String,
    },
    contractHash: String,
  },
  components: {
    Loading,
  },
  data() {
    return {
      ScCallList: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      isLoading: true,
      countPage: 0,
      button: { state: true, buttonName: "Hash" },
    };
  },
  created() {
    this.getScCallList(0);
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
    contractHash: "watchcontract",
  },
  methods: {
    convertTime,
    scriptHashToAddress,
    changeFormat,
    watchcontract() {
      //如果路由有变化，执行的对应的动作
      this.getScCallList(0);
    },
    pageChangeByInput(pageNumber) {
      if (pageNumber >= this.countPage) {
        this.isLoading = true;
        this.pagination = this.countPage;
        const skip = (this.countPage - 1) * this.resultsPerPage;
        this.getScCallList(skip);
      } else if (pageNumber <= 0) {
        this.isLoading = true;
        this.pagination = 1;
        const skip = this.resultsPerPage;
        this.getScCallList(skip);
      } else {
        this.isLoading = true;
        this.pagination = pageNumber;
        const skip = (pageNumber - 1) * this.resultsPerPage;
        this.getScCallList(skip);
      }
    },
    pageChange(pageNumber) {
      this.isLoading = true;
      this.pagination = pageNumber;
      const skip = (pageNumber - 1) * this.resultsPerPage;
      this.getScCallList(skip);
    },
    getScCallList(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {
            ContractHash: this.contractHash,
            Limit: this.resultsPerPage,
            Skip: skip,
          },
          method: "GetScCallByContractHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.ScCallList = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.countPage =
          this.totalCount === 0
            ? 1
            : Math.ceil(this.totalCount / this.resultsPerPage);
        this.isLoading = false;
      });
    },
    getAddress(accountAddress) {
      this.$router.push({
        path: `/accountprofile/${accountAddress}`,
      });
    },
    getTransaction(txhash) {
      this.$router.push({
        path: `/transactionInfo/${txhash}`,
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
.addr {
  width: 200px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
