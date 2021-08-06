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
          <th>{{ $t('transactionTransfer.contract')}}</th>
          <th>{{ $t('transactionTransfer.token')}}</th>
          <th>{{ $t('transactionTransfer.tokenID')}}</th>
          <th>{{ $t('transactionTransfer.type')}}</th>
          <th>{{ $t('transactionTransfer.from')}}<button class="btn btn-sm btn-primary" @click="changeFrom()">{{this.fromButton}}</button></th>
          <th>{{ $t('transactionTransfer.fromBalance')}}</th>
          <th>{{ $t('transactionTransfer.to')}}<button class="btn btn-sm btn-primary" @click="changeTo()">{{this.toButton}}</button></th>
          <th>{{ $t('transactionTransfer.toBalance')}}</th>
          <th>{{ $t('transactionTransfer.amount')}}</th>
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
            <div class="">
              {{ row.item.tokenId }}
            </div>
          </td>
          <td class="budget">
            <div >
              <span class="text-success" v-if="row.item.from === null && row.item.tokenname === 'GasToken'" type="primary"> {{$t('transferReward')}} </span>
              <span class="text-success" v-else-if="row.item.from === null" type="primary">{{$t(mint)}}</span>
              <span class="text-danger" v-else-if="row.item.to === null" > {{$t(burn)}}</span>
              <span class="text-info" v-else> {{$t('transfer')}}</span>
            </div>
          </td>
          <td class="budget">
            <div class="from">
              <span class="text-muted" v-if="row.item.from === null"> {{$t('nullAddress')}}</span>
              <a class="name mb-0 text-sm" v-else style="cursor: pointer"  @click="getAccount(row.item.from)">{{this.fromState? scriptHashToAddress(row.item.from):row.item.from}}</a>
            </div>
          </td>
          <td class="budget">
            <span class="text-muted" v-if="row.item.from === null">{{$t('nullBalance')}}</span>
            <span  v-else >{{ convertToken(row.item.frombalance, row.item.decimals) }}</span>
          </td>
          <td class="budget">
            <div class="to">
              <span class="text-muted" v-if="row.item.to === null"> {{$t('nullAddress')}}</span>
              <a v-else class="name mb-0 text-sm" style="cursor: pointer" @click="getAccount(row.item.to)">{{ this.toState? scriptHashToAddress(row.item.to):row.item.to }}</a>
            </div>
          </td>

          <td class="budget">
            <span class="text-muted" v-if="row.item.to === null"> {{$t('nullBalance')}} </span>
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
</template>
<script>
import axios from "axios";
import Neon from "@cityofzion/neon-js";
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
      fromButton: "Hash",
      toState: true,
      toButton: "Hash",
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
    scriptHashToAddress(hash) {
      hash = hash.substring(2);
      const acc = Neon.create.account(hash);
      return acc.address;
    },
    addressToScriptHash(addr) {
      const acc = Neon.create.account(addr);
      return "0x" + acc.scriptHash;
    },
    convertToken(token, decimal) {
      var temp = token * Math.pow(0.1, decimal);
      if (temp % 1 === 0) {
        return temp;
      } else {
        return (token * Math.pow(0.1, decimal)).toFixed(6);
      }
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
    changeFrom() {
      if (this.fromState === true) {
        this.fromState = false;
        this.fromButton = "WIF";
      } else {
        this.fromState = true;
        this.fromButton = "Hash";
      }
    },
    changeTo() {
      if (this.toState === true) {
        this.toState = false;
        this.toButton = "WIF";
      } else {
        this.toState = true;
        this.toButton = "Hash";
      }
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
