<template>
  <div v-show="this.length != 0">
    <div
      v-show="this.length != 0"
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
              {{ title }}
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
            <th>Contract</th>
            <th>Token</th>
            <th>Type</th>
            <th>From</th>
            <th>From Balance</th>
            <th>To</th>
            <th>To Balance</th>
            <th>Amount</th>
          </template>

          <template v-slot:default="row">
            <td class="budget">
              <div class="contract" @mouseover="mouseHover(row.item.contract)">
                <a
                  class="name mb-0 text-sm"
                  style="cursor: pointer"
                  @click="getContract(row.item.contract)"
                  >{{ row.item.contract }}</a
                >
              </div>
            </td>
            <td class="budget">
              <div class="from">
                {{ row.item.tokenname }}
              </div>
            </td>
            <td class="budget">
              <div >
                <span class="text-success" v-if="row.item.from === null" type="primary"> Mint </span>
                <span class="text-danger" v-else-if="row.item.to === null" > Burn </span>
                <span class="text-info" v-else> Transfer</span>
              </div>
            </td>
            <td class="budget">
              <div class="from">
                <span class="text-muted" v-if="row.item.from === null"> Null Account </span>
                <a class="name mb-0 text-sm" v-else style="cursor: pointer"  @click="getAccount(row.item.from)">{{ row.item.from }}
                </a>

              </div>
            </td>
            <td class="budget">
              <span class="text-muted" v-if="row.item.from === null"> Null Balance </span>
              <span  v-else >{{ convertToken(row.item.frombalance, row.item.decimals) }}</span>
            </td>
            <td class="budget">
              <div class="to">
                <a
                  class="name mb-0 text-sm"
                  style="cursor: pointer"
                  @click="getAccount(row.item.to)"
                  >{{ row.item.to }}</a
                >
              </div>
            </td>

            <td class="budget">
              <span class="text-muted" v-if="row.item.to === null"> Null Balance </span>
              <span  v-else > {{ convertToken(row.item.tobalance ,row.item.decimals)}}</span>
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
export default {
  name: "transfers-list",
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
    };
  },
  created() {
    this.getNep17TransferByTransactionHash(this.txhash);
    // this.hasContent(this.length)
  },
  methods: {
    convertToken(token, decimal) {
      var temp = token * Math.pow(0.1, decimal);
      if (temp % 1 === 0) {
        return temp;
      } else {
        return (token * Math.pow(0.1, decimal)).toFixed(6);
      }
    },
    mouseHover(contract) {
      var a = document.getElementById("contract");
      a.addEventListener("mouseover", function (event) {
        event.target.style.display = contract;
      });
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
    getNep17TransferByTransactionHash(txhash) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { TransactionHash: txhash },
          method: "GetNep17TransferByTransactionHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.tableData = res["data"]["result"]["result"];
        this.length = this.tableData["length"];
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
