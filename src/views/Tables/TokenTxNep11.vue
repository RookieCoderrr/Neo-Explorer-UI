<template>
  <div
    v-if="this.totalCount != 0"
    class="card shadow"
    :class="type === 'dark' ? 'bg-default' : ''"
  >
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
        :data="NEP11TxList"
      >
        <template v-slot:columns>
          <th style="background:#5576EC; color:#ffffff">{{ $t("tokenTx.txid") }}</th>
          <th style="background:#5576EC; color:#ffffff">{{ $t("tokenTx.type") }}</th>
          <th style="background:#5576EC; color:#ffffff">
            {{ $t("tokenTx.from") }}
            <span> </span>
            <button class="btn btn-sm btn-primary" @click="changeFormat(fromButton)">
              {{ this.fromButton.buttonName }}
            </button>
          </th>
          <th style="background:#5576EC; color:#ffffff"></th>
          <th style="background:#5576EC; color:#ffffff">
            {{ $t("tokenTx.to") }}
            <span> </span>
            <button class="btn btn-sm btn-primary" @click="changeFormat(toButton)">
              {{ this.toButton.buttonName }}
            </button>
          </th>
          <th style="background:#5576EC; color:#ffffff">{{ $t("tokenTx.amount") }}</th>
          <th style="background:#5576EC; color:#ffffff">{{ $t("tokenTx.time") }}</th>
          <th astyle="background:#5576EC; color:#ffffff">{{ $t("tokenTx.tokenID") }}</th>
        </template>

        <template v-slot:default="row">
          <th scope="row">
            <div class="media align-items-center">
              <div class="media-body">
                <div
                  class="text-muted"
                  v-if="
                    row.item.txid ===
                    '0x0000000000000000000000000000000000000000000000000000000000000000'
                  "
                >
                  {{ $t("na") }}
                </div>
                <div class="txid" v-else>
                  <router-link
                    class="name mb-0 text-sm"
                    style="cursor: pointer"
                    :to="'/transactionInfo/'+row.item.txid"
                    >{{ row.item.txid }}</router-link
                  >
                </div>
              </div>
            </div>
          </th>
          <td class="Type">
            <div>
              <span
                class="text-success"
                v-if="row.item.from === null"
                type="primary"
                >{{ $t("mint") }}</span
              >
              <span class="text-danger" v-else-if="row.item.to === null">
                {{ $t("burn") }}
              </span>
              <span class="text-info" v-else> {{ $t("transfer") }}</span>
            </div>
          </td>
          <td class="From">
            <div>
              <div class="text-muted" v-if="row.item.from === null">
                {{ $t("nullAddress") }}
              </div>
              <div v-else-if="fromButton.state" class="addr">
                <router-link
                  class="name mb-0 text-sm"
                  style="cursor: pointer"
                  :to="'/accountprofile/'+row.item.from"
                  >{{ scriptHashToAddress(row.item.from) }}</router-link
                >
              </div>
              <div v-else class="addr">
                <router-link
                  class="name mb-0 text-sm"
                  style="cursor: pointer"
                  :to="'/accountprofile/'+row.item.from"
                  >{{ row.item.from }}</router-link
                >
              </div>
            </div>
          </td>
          <td>
            <h1 style="color: #42b983">&#8594;</h1>
          </td>
          <td class="To">
            <div>
              <div class="text-muted" v-if="row.item.to === null">
                {{ $t("nullAddress") }}
              </div>
              <div class="addr" v-else-if="toButton.state">
                <router-link
                  class="name mb-0 text-sm"
                  style="cursor: pointer"
                  :to="'/accountprofile/'+row.item.to"
                  >{{ scriptHashToAddress(row.item.to) }}</router-link
                >
              </div>
              <div class="addr" v-else>
                <router-link
                  class="name mb-0 text-sm"
                  style="cursor: pointer"
                  :to="'/accountprofile/'+row.item.to"
                  >{{ row.item.to }}</router-link
                >
              </div>
            </div>
          </td>
          <td class="Value">
            {{ convertToken(row.item.value, this.decimal) }}
          </td>
          <td class="time">
            {{ convertTime(row.item.timestamp, this.$i18n.locale) }}
          </td>
          <td class="TokenID">
            <div class="addr">
              {{ row.item.tokenId }}
            </div>
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
import {
  convertToken,
  scriptHashToAddress,
  changeFormat,
  convertTime,
} from "../../store/util";

export default {
  name: "tokens-tx-nep11",
  props: {
    type: {
      type: String,
    },
    contractHash: String,
    decimal: Number,
  },
  components: {
    Loading,
  },
  data() {
    return {
      NEP11TxList: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      isLoading: true,
      firstTime: true,
      countPage: 0,
      fromButton: {state: true, buttonName: "Hash"},
      toButton: {state: true, buttonName: "Hash"},
    };
  },
  created() {
    this.getTokenList(0);
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
    convertToken,
    scriptHashToAddress,
    changeFormat,
    convertTime,
    watchcontract() {
      //如果路由有变化，执行的对应的动作
      this.getTokenList(0);
    },
    pageChangeByInput(pageNumber) {
      if (pageNumber >= this.countPage) {
        this.isLoading = true;
        this.pagination = this.countPage;
        const skip = (this.countPage - 1) * this.resultsPerPage;
        this.getTokenList(skip);
      } else if (pageNumber <= 0) {
        this.isLoading = true;
        this.pagination = 1;
        const skip = this.resultsPerPage;
        this.getTokenList(skip);
      } else {
        this.isLoading = true;
        this.pagination = pageNumber;
        const skip = (pageNumber - 1) * this.resultsPerPage;
        this.getTokenList(skip);
      }
    },
    pageChange(pageNumber) {
      if (!this.firstTime) {
        this.isLoading = true;
        this.pagination = pageNumber;
        const skip = (pageNumber - 1) * this.resultsPerPage;
        this.getTokenList(skip);
      } else {
        this.firstTime = false;
      }
    },
    getTokenList(skip) {
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
          method: "GetNep11TransferByContractHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.NEP11TxList = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.countPage =
          this.totalCount === 0
            ? 1
            : Math.ceil(this.totalCount / this.resultsPerPage);
        this.isLoading = false;
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
  width: 150px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
