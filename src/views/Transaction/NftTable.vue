<template>
  <div v-if="this.totalCount != 0">
  <div
    v-if="this.totalCount != 0"
    class="card shadow"
    :class="type === 'dark' ? 'bg-default' : ''"
  >

    <div class="table-responsive">
      <base-table
        class="table align-items-center table-hover"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"
      >
        <template v-slot:columns>
          <th class="tableHeader">{{ $t("transactionTransfer.contract") }}</th>
          <th class="tableHeader">{{ $t("transactionTransfer.token") }}</th>
          <th class="tableHeader">{{ $t("transactionTransfer.tokenID") }}</th>
          <th class="tableHeader">{{ $t("transactionTransfer.type") }}</th>
          <th class="tableHeader" style="text-align: center">
            {{ $t("transactionTransfer.from") }}

            <el-button type="info" :plain="true" size="small" style="height: 19px;margin-left: 4px" @click="changeFormat(fromButton)">
              {{fromButton.buttonName}}</el-button>
          </th>
          <th class="tableHeader" style="text-align: center">{{ $t("transactionTransfer.amount") }}</th>
          <th class="tableHeader" style="text-align: center">
            {{ $t("transactionTransfer.to") }}
            <el-button type="info" :plain="true" size="small" style="height: 19px;margin-left: 4px" @click="changeFormat(toButton)">
              {{toButton.buttonName}}</el-button>
          </th>

        </template>

        <template v-slot:default="row">
          <td class="budget">
            <div class="contract">
              <router-link
                class=" mb-0 table-list-item-blue"
                style="cursor: pointer; "
                :to="'/contractinfo/'+row.item.contract"
                >{{ row.item.contract }}</router-link
              >
            </div>
          </td>
          <td class="budget">
            <div class="table-list-item">
              {{ row.item.tokenname }}
            </div>
          </td>
          <td class="budget">
            <div class="table-list-item">
              {{ row.item.tokenId }}
            </div>
          </td>
          <td class="budget">
            <div class="table-list-item">
              <span
                class="text-success"
                v-if="row.item.from === null"
                type="primary"
                >{{ $t("mint") }}</span
              >
              <span class="text-danger" v-else-if="row.item.to === null">
                {{ $t("burn") }}</span
              >
              <span class="text-info" v-else> {{ $t("transfer") }}</span>
            </div>
          </td>
          <td class="budget" style="text-align: center">
            <div class="table-list-item">
              <span class="text-muted" v-if="row.item.from === null">
                {{ $t("nullAddress") }}</span
              >
              <span v-else>
              <router-link
                class="mb-0 table-list-item-blue"
                :to="'/accountprofile/'+row.item.from"
                >{{
                  this.fromButton.state
                      ? scriptHashToAddress(row.item.from)
                      : row.item.from
                }}</router-link>
              </span>
            </div>
          </td>
          <td class="pt-4" style="text-align: center">
            <div class="table-list-item mt-2" style="text-align: center">
              {{ convertToken(row.item.value, row.item.decimals) }}
            </div>
            <span style="color: #42b983;font-size: 30px">&#10230;</span>
          </td>
          <td class="budget" style="text-align: center">
            <div class="table-list-item">
              <span class="text-muted" v-if="row.item.to === null">
                {{ $t("nullAddress") }}</span
              >
              <a
                v-else
                class="  mb-0 table-list-item-blue"
                style="cursor: pointer"
                :to="'/accountprofile/'+row.item.to"
                >{{
                  this.toButton.state
                      ? scriptHashToAddress(row.item.to)
                      : row.item.to
                }}</a
              >
            </div>
          </td>

        </template>
      </base-table>
    </div>

  </div>
  </div>
  <card shadow v-else class="text-center ">
    This transaction has no NEP11 Transfers.
  </card>
</template>
<script>
import axios from "axios";
import { convertToken, scriptHashToAddress, addressToScriptHash, changeFormat} from "../../store/util";
import net from "../../store/store";
export default {
  name: "transfers-table",
  props: {
    type: {
      type: String,
    },
    title: String,
    txhash: String,
  },
  data() {
    return {
      network:net.url,
      tableData: [],
      length,
      fromState: true,
      fromButton: { state: true, buttonName: "Hash"},
      toButton: { state: true, buttonName: "Hash"},
      toState: true,

      totalCount:0,

    };
  },

  created() {
    this.getNep11TransferByTransactionHash(this.txhash);
  },
  watch: {
    txhash: "watchhash",
  },
  methods: {
    scriptHashToAddress,
    addressToScriptHash,
    convertToken,
    changeFormat,
    watchhash() {
      //如果路由有变化，执行的对应的动作
          this.getNep11TransferByTransactionHash(this.txhash);

    },
    getContract(ctrHash) {
      this.$router.push({
        path: `/contractinfo/${ctrHash}`,
      });
    },

    getAccount(accHash) {
      this.$router.push({
        path: `/accountprofile/${accHash}`,
      });
    },
    getNep11TransferByTransactionHash(txhash) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { TransactionHash: txhash },
          method: "GetNep11TransferByTransactionHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.tableData = res["data"]["result"]["result"];
        // console.log(this.tableData)
        this.totalCount = res["data"]["result"]["totalCount"]
      });
    },
  },
};
</script>
<style>
.contract {
  width: 150px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.from {
  width: 150px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.to {
  width: 150px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
