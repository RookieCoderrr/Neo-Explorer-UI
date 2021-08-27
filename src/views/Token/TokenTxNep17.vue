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
        :data="NEP17TxList"
      >
        <template v-slot:columns>
          <th class="tableHeader">{{ $t("tokenTx.txid") }}</th>
          <th class="tableHeader">{{ $t("tokenTx.type") }}</th>
          <th class="tableHeader">
            {{ $t("tokenTx.from")
            }}
            <el-button type="info" :plain="true" size="small" style="height: 19px;margin-left: 4px" @click="changeFormat(fromButton)">
              {{fromButton.buttonName}}</el-button>
          </th>
          <th class="tableHeader"></th>
          <th class="tableHeader">
            {{ $t("tokenTx.to") }}
            <el-button type="info" :plain="true" size="small" style="height: 19px;margin-left: 4px" @click="changeFormat(toButton)">
              {{toButton.buttonName}}</el-button>
          </th>
          <th class="tableHeader">{{ $t("tokenTx.amount") }}</th>
          <th class="tableHeader">{{ $t("tokenTx.time") }}</th>
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
                    class="  mb-0 table-list-item-blue"
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
                class="text-primary"
                v-if="
                  row.item.txid ===
                    '0x0000000000000000000000000000000000000000000000000000000000000000' &&
                  row.item.from === null &&
                  row.item.value === '50000000'
                "
                type="primary"
                >{{ $t("blockReward") }}</span
              >
              <span
                class="text-warning"
                v-else-if="
                  row.item.txid ===
                    '0x0000000000000000000000000000000000000000000000000000000000000000' &&
                  row.item.from === null
                "
                type="primary"
                >{{ $t("networkFeeReward") }}</span
              >
              <span
                class="text-danger"
                v-else-if="
                  row.item.txid ===
                    '0x0000000000000000000000000000000000000000000000000000000000000000' &&
                  row.item.to === null
                "
                type="primary"
                >{{ $t("feeBurn") }}</span
              >
              <span
                class="text-success"
                v-else-if="
                  row.item.from === null &&
                  this.contractHash ===
                    '0xd2a4cff31913016155e38e474a2c06d08be276cf'
                "
                type="primary"
              >
                {{ $t("transferReward") }}
              </span>
              <span
                class="text-success"
                v-else-if="row.item.from === null"
                type="primary"
                >{{ $t("mint") }}</span
              >
              <span class="text-danger" v-else-if="row.item.to === null">
                {{ $t("burn") }}</span
              >
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
                  class="  mb-0 table-list-item-blue"
                  style="cursor: pointer"
                  :to="'/accountprofile/'+row.item.from"
                  >{{ scriptHashToAddress(row.item.from) }}</router-link
                >
              </div>
              <div v-else class="addr">
                <router-link
                  class="  mb-0 table-list-item-blue"
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
              <div v-else-if="toButton.state" class="addr">
                <router-link
                  class="  mb-0 table-list-item-blue"
                  style="cursor: pointer"
                  :to="'/accountprofile/'+row.item.to"
                  >{{ scriptHashToAddress(row.item.to) }}</router-link
                >
              </div>
              <div v-else class="addr">
                <router-link
                  class="  mb-0 table-list-item-blue"
                  style="cursor: pointer"
                  :to="'/accountprofile/'+row.item.to"
                  >{{ row.item.to }}</router-link
                >
              </div>
            </div>
          </td>
          <td class="table-list-item">
            {{ convertToken(row.item.value, this.decimal) }}
          </td>
          <td class="table-list-item">
            {{ convertTime(row.item.timestamp, this.$i18n.locale) }}
          </td>
        </template>
      </base-table>
    </div>

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
</template>
<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { changeFormat, convertToken, convertTime, scriptHashToAddress } from "../../store/util";

export default {
  name: "tokens-tx-nep17",
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
      NEP17TxList: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      isLoading: true,
      countPage: 1,
      fromButton: { state: true, buttonName: "Hash"},
      toButton: { state: true, buttonName: "Hash"},
    };
  },
  created() {
    this.getTokenList(0);
  },
  watch: {
    contractHash: "watchcontract",
  },
  methods: {
    convertToken,
    convertTime,
    scriptHashToAddress,
    changeFormat,
    watchcontract() {
      //如果路由有变化，执行的对应的动作
      this.getTokenList(0);
    },
    handleCurrentChange(val) {
      this.isLoading = true;
      this.pagination = val;
      const skip = (val - 1) * this.resultsPerPage;
      this.getTokenList(skip);
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
          method: "GetNep17TransferByContractHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.NEP17TxList = res["data"]["result"]["result"];
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
