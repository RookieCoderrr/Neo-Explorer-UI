<template>
  <div v-if="this.totalCount != 0">
  <div
    v-if="this.totalCount != 0"
    class="card shadow"
    :class="type === 'dark' ? 'bg-default' : ''"
  >
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
            {{ $t("NftTable.title") }}
          </h3>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"
      >
        <template v-slot:columns>
          <th>{{ $t("transactionTransfer.contract") }}</th>
          <th>{{ $t("transactionTransfer.token") }}</th>
          <th>{{ $t("transactionTransfer.tokenID") }}</th>
          <th>{{ $t("transactionTransfer.type") }}</th>
          <th>
            {{ $t("transactionTransfer.from") }}
            <span>       </span>
            <button class="btn btn-sm btn-primary" @click="changeFormat(fromButton)">
              {{ fromButton.buttonName }}
            </button>
          </th>
          <th>{{ $t("transactionTransfer.fromBalance") }}</th>
          <th></th>
          <th>
            {{ $t("transactionTransfer.to") }}
            <span>       </span>
            <button class="btn btn-sm btn-primary" @click="changeFormat(toButton)">
              {{ toButton.buttonName }}
            </button>
          </th>
          <th>{{ $t("transactionTransfer.toBalance") }}</th>
          <th>{{ $t("transactionTransfer.amount") }}</th>
        </template>

        <template v-slot:default="row">
          <td class="budget">
            <div class="contract">
              <router-link
                class="name mb-0 text-sm"
                style="cursor: pointer"
                :to="'/contractinfo/'+row.item.contract"
                >{{ row.item.contract }}</router-link
              >
            </div>
          </td>
          <td class="budget">
            <div class="from">
              {{ row.item.tokenname }}
            </div>
          </td>
          <td class="budget">
            <div class="">
              {{ row.item.tokenId }}
            </div>
          </td>
          <td class="budget">
            <div>
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
          <td class="budget">
            <div class="from">
              <span class="text-muted" v-if="row.item.from === null">
                {{ $t("nullAddress") }}</span
              >
              <span v-else>
              <router-link
                class="name mb-0 text-sm"
                style="cursor: pointer"
                :to="'/accountprofile/'+row.item.from"
                >{{
                  this.fromButton.state
                      ? scriptHashToAddress(row.item.from)
                      : row.item.from
                }}</router-link>
              </span>
            </div>
          </td>
          <td class="budget">
            <span class="text-muted" v-if="row.item.from === null">{{
              $t("nullBalance")
            }}</span>
            <span v-else>{{
              convertToken(row.item.frombalance, row.item.decimals)
            }}</span>
          </td>
          <td>
            <h1 style="color: #42b983">&#8594;</h1>
          </td>
          <td class="budget">
            <div class="to">
              <span class="text-muted" v-if="row.item.to === null">
                {{ $t("nullAddress") }}</span
              >
              <a
                v-else
                class="name mb-0 text-sm"
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

          <td class="budget">
            <span class="text-muted" v-if="row.item.to === null">
              {{ $t("nullBalance") }}
            </span>
            <span v-else>
              {{ convertToken(row.item.tobalance, row.item.decimals) }}</span
            >
          </td>

          <td class="budget">
            {{ convertToken(row.item.value, row.item.decimals) }}
          </td>
        </template>
      </base-table>
    </div>

    <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    ></div>
  </div>
  </div>
</template>
<script>
import axios from "axios";
import { convertToken, scriptHashToAddress, addressToScriptHash, changeFormat} from "../../store/util";

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
        console.log(this.tableData)
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
