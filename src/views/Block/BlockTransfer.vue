<template>
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
        :data="NEP17TxList"
      >
        <template v-slot:columns>
          <th class="tableHeader">{{ $t("tokenTx.type") }}</th>
          <th class="tableHeader">
            {{ $t("tokenTx.from")
            }}
            <el-button type="info" :plain="true" size="small" style="height: 21px;margin-left: 4px" @click="changeFormat(fromButton)">
              {{this.fromButton.buttonName}}</el-button>

          </th>
          <th class="tableHeader"></th>
          <th class="tableHeader">
            {{ $t("tokenTx.to") }}
            <span>       </span>
            <el-button type="info" :plain="true" size="small" style="height: 21px;margin-left: 4px" @click="changeFormat(toButton)">
              {{this.toButton.buttonName}}</el-button>
          </th>
          <th class="tableHeader">{{ $t("tokenTx.amount") }}</th>
          <th class="tableHeader">{{ $t("tokenTx.time") }}</th>
        </template>

        <template v-slot:default="row">
          <td class="Type">
            <div>
              <span
                class="text-primary"
                v-if="row.item.from === null && row.item.value === '50000000'"
                type="primary"
                >{{ $t("blockReward") }}</span
              >
              <span
                class="text-warning"
                v-else-if="row.item.from === null"
                type="primary"
                >{{ $t("networkFeeReward") }}</span
              >
              <span class="text-danger" v-else type="primary">{{
                $t("feeBurn")
              }}</span>
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
                  >{{ scriptHashToAddress(row.item.from) }}</router-link>
              </div>
              <div v-else class="addr">
                <router-link
                  class="  mb-0 table-list-item-blue"
                  style="cursor: pointer"
                  :to="'/accountprofile/'+row.item.from"
                  >{{ row.item.from }}</router-link>
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
                  class=" mb-0 table-list-item-blue"
                  style="cursor: pointer"
                  :to="'/accountprofile/'+row.item.to"
                  >{{ scriptHashToAddress(row.item.to) }}</router-link
                >
              </div>
              <div v-else class="addr">
                <router-link
                  class=" mb-0 table-list-item-blue"
                  style="cursor: pointer"
                  :to="'/accountprofile/'+row.item.to"
                  >{{ row.item.to }}</router-link>
              </div>
            </div>
          </td>
          <td class="table-list-item">
            {{ convertToken(row.item.value, 8) }}Gas
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
import {changeFormat, convertTime, convertToken, scriptHashToAddress} from "../../store/util";

export default {
  name: "block-transfer",
  props: {
    type: {
      type: String,
    },
    blockHash: String,
    decimal: Number,
  },

  data() {
    return {
      NEP17TxList: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      isLoading: true,
      countPage: 1,
      fromButton: {state: true, buttonName: "Hash"},
      toButton: {state: true, buttonName: "Hash"},
    };
  },
  created() {
    this.getTransferList(0);
  },
  watch: {
    blockHash: "watchblock",
  },
  methods: {
    changeFormat,
    convertTime,
    convertToken,
    scriptHashToAddress,
    watchblock() {
      //如果路由有变化，执行的对应的动作
      this.getTransferList(0);
    },
    handleCurrentChange(val) {
      this.isLoading = true;
      this.pagination = val;
      const skip = (val - 1) * this.resultsPerPage;
      this.getTransferList(skip);
    },
    getTransferList(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {
            BlockHash: this.blockHash,
            Limit: this.resultsPerPage,
            Skip: skip,
          },
          method: "GetExtraTransferByBlockHash",
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
