<template>
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
          <th>Token ID</th>
          <th>From</th>
          <th>From Balance</th>
          <th>To</th>
          <th>To Balance</th>
          <th>Amount</th>
        </template>

        <template v-slot:default="row">
          <td class="budget">
            <div class="contract">
              <a class="name mb-0 text-sm" style="cursor: pointer" @click="getContract(row.item.contract)">{{
                row.item.contract
              }}</a>
            </div>
          </td>
          <td class="budget">
            <div class="from">
              {{ row.item.tokenname }}
            </div>
          </td>
          <td class="budget">
            <div class="from">
              {{ row.item.tokenId }}
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
            {{ row.item.frombalance }}
          </td>
          <td class="budget">
            <div class="to">
              <span class="text-muted" v-if="row.item.to === null"> Null Account </span>
              <a class="name mb-0 text-sm" v-else style="cursor: pointer"  @click="getAccount(row.item.to)">{{ row.item.to }}
              </a>
            </div>
          </td>

          <td class="budget">
            {{ row.item.tobalance }}
          </td>

          <td class="budget">
            {{ row.item.value }}
          </td>
        </template>
      </base-table>
    </div>

    <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    ></div>
  </div>
</template>
<script>
import axios from "axios";
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
    };
  },

  created() {
    this.getNep11TransferByTransactionHash(this.txhash);
  },
  methods: {
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
        this.tableData[0] = res["data"]["result"];
        if (this.tableData[0] == null) {
          this.length = 0;
          this.tableData[0] = [];
        } else {
          this.length = 1;
        }
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
