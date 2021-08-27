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
          <th class="tableHeader">{{ $t("contract.txID") }}</th>
          <th class="tableHeader">
            {{ $t("contract.sender") }}
            <el-button type="info" :plain="true" size="small" style="height: 21px;margin-left: 4px" @click="changeFormat(button)">
              {{this.button.buttonName}}</el-button>
          </th>
          <th class="tableHeader">{{ $t("contract.method") }}</th>
          <th class="tableHeader">{{ $t("contract.callFlags") }}</th>
          <th class="tableHeader">{{ $t("contract.time") }}</th>
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
                  >{{$t('Null Transaction')}}</span
                >
                <router-link
                  class=" mb-0 table-list-item-blue"
                  v-else
                  style="cursor: pointer"
                  :to="'/transactionInfo/'+row.item.txid "
                  >{{ row.item.txid }}</router-link
                >
              </div>
            </div>
          </th>
          <td class="Sender">
            <div class="addr">
              <span class="text-muted" v-if="row.item.originSender === null">
               {{$t('nullAddress')}}
              </span>
              <router-link
                v-else-if="button.state"
                class=" mb-0 table-list-item-blue"
                style="cursor: pointer"
                :to="'/accountprofile/'+row.item.originSender"
                >{{ scriptHashToAddress(row.item.originSender) }}</router-link
              >
              <router-link
                v-else
                class="  mb-0 table-list-item-blue"
                style="cursor: pointer"
                :to="'/accountprofile/'+row.item.originSender"
                >{{ row.item.originSender }}</router-link
              >
            </div>
          </td>
          <td class="table-list-item">
            {{ row.item.method }}
          </td>
          <td class="table-list-item">
            {{ row.item.callFlags }}
          </td>
          <td class="table-list-item">

            {{ convertTime(row.item.time) }}
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
  watch: {
    contractHash: "watchcontract",
  },
  methods: {
    scriptHashToAddress,
    convertTime,
    changeFormat,
    watchcontract() {
      //如果路由有变化，执行的对应的动作
      this.getScCallList(0);
    },
    handleCurrentChange(val) {
      this.isLoading = true;
      this.pagination = val;
      const skip = (val - 1) * this.resultsPerPage;
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
