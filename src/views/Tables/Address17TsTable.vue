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
        :data="tableData"
      >
        <template v-slot:columns>
          <th>{{$t('tokenTx.txid')}}</th>
          <th>{{$t('transferList.token')}}</th>
          <th>{{$t('transferList.type')}}</th>
          <th>{{$t('transferList.from')}}
            <button v-if="this.fromButton==='Hash'" class="btn btn-sm btn-primary" @click="changeFrom()">{{$t('addressPage.hash')}}</button>
            <button v-else class="btn btn-sm btn-primary" @click="changeFrom()">{{this.fromButton}}</button>
          </th>
          <th></th>
          <th>{{$t('transferList.to')}}
            <button v-if="this.toButton==='Hash'" class="btn btn-sm btn-primary" @click="changeTo()">{{$t('addressPage.hash')}}</button>
            <button v-else class="btn btn-sm btn-primary" @click="changeTo()">{{this.toButton}}</button>
          </th>
          <th>{{$t('transferList.amount')}}</th>
          <th>{{$t('tokenTx.time')}}</th>
        </template>
        <template v-slot:default="row">

          <td class="budget">
            <div>
              <div class="text-muted" v-if="row.item.txid === '0x0000000000000000000000000000000000000000000000000000000000000000'">{{$t('na')}}</div>
              <div class="txid" v-else>
                <a class="name mb-0 text-sm " style="cursor: pointer" @click="getTransaction(row.item.txid)">{{row.item.txid}}</a>
              </div>
            </div>
          </td>
          <td class="budget">
            <div >
              {{ row.item.tokenname }}
            </div>
          </td>
          <td class="Type">
            <div >
              <span class="text-primary" v-if="row.item.txid === '0x0000000000000000000000000000000000000000000000000000000000000000' && row.item.from === null && row.item.value === '50000000'" type="primary">{{$t('blockReward')}}</span>
              <span class="text-warning" v-else-if="row.item.txid === '0x0000000000000000000000000000000000000000000000000000000000000000' && row.item.from === null" type="primary">{{$t('networkFeeReward')}}</span>
              <span class="text-danger" v-else-if="row.item.txid === '0x0000000000000000000000000000000000000000000000000000000000000000' && row.item.to === null" type="primary">{{$t('feeBurn')}}</span>
              <span class="text-success" v-else-if="row.item.from === null && this.contractHash === '0xd2a4cff31913016155e38e474a2c06d08be276cf'" type="primary"> {{$t('transferReward')}} </span>
              <span class="text-success" v-else-if="row.item.from === null" type="primary">{{$t('mint')}}</span>
              <span class="text-danger" v-else-if="row.item.to === null" > {{$t('burn')}}</span>
              <span class="text-info" v-else> {{$t('transfer')}}</span>
            </div>
          </td>
          <td class="from">
            <div>
              <div class="text-muted" v-if="row.item.from === null"> {{$t('nullAddress')}} </div>
              <div v-else-if="fromState" class="addr">
                <a class="name mb-0 text-sm" style="cursor: pointer" @click="getAddress(row.item.from)">{{ scriptHashToAddress(row.item.from) }}</a>
              </div>
              <div v-else class="addr">
                <a class="name mb-0 text-sm" style="cursor: pointer" @click="getAddress(row.item.from)">{{ row.item.from }}</a>
              </div>
            </div>
          </td>
          <td>
            <h1 style="color: #42b983;">&#8594;</h1>
          </td>
          <td class="to">
            <div class="text-muted" v-if="row.item.to === null"> {{$t('nullAddress')}} </div>
            <div v-else-if="toState" class="addr">
              <a class="name mb-0 text-sm" style="cursor: pointer" @click="getAddress(row.item.to)">{{ scriptHashToAddress(row.item.to) }}</a>
            </div>
            <div v-else class="addr">
              <a class="name mb-0 text-sm" style="cursor: pointer" @click="getAddress(row.item.to)">{{ row.item.to }}</a>
            </div>
          </td>

          <td class="budget">
            {{ convertToken(row.item.value ,row.item.decimals) }}
          </td>
          <td class="budget">
            <div >
              {{convertTime(row.item.timestamp) }}
            </div>
          </td>
        </template>
      </base-table>
    </div>
    <div v-if="this.totalCount > 10"
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
        <div class="text">
          &nbsp; of &nbsp;{{ countPage }}
        </div>
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
import Neon from "@cityofzion/neon-js";
import {format} from "timeago.js";
import Loading from "vue-loading-overlay";

export default {
  name: "address17-ts-table",
  props: {
    type: {
      type: String,
    },
    title: String,
    account_address: String,
  },
  components: {
    Loading,
  },
  data() {
    return {
      tableData: [],
      resultsPerPage: 10,
      pagination: 1,
      countPage:0,
      fromState: true,
      fromButton: "Hash",
      toState: true,
      toButton: "Hash",
      txId:"",
      timeStamp:0,
      isLoading: true,
    };
  },
  created() {
    this.GetNep17TransferByAddress(0);
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
  methods: {
    pageChange(pageNumber) {
      this.isLoading = true;
      this.pagination = pageNumber;
      const skip = (pageNumber - 1) * this.resultsPerPage;
      this.GetNep17TransferByAddress(skip);
    },
    convertToken(token, decimal) {
      if(decimal===0) {
        return token
      }else {
        return (token * Math.pow(0.1, decimal)).toFixed(8);
      }

    },
    getTransaction(txhash) {
      this.$router.push({
        path: `/transactionInfo/${txhash}`,
      });
    },
    mouseHover(contract) {
      var a = document.getElementById("contract");
      a.addEventListener("mouseover", function (event) {
        event.target.style.display = contract;
      });
    },
    pageChangeByInput(pageNumber) {
      if (pageNumber >= this.countPage) {
        this.isLoading = true;
        this.pagination =this.countPage;
        const skip =
                ( this.countPage - 1 ) * this.resultsPerPage;
        this.GetNep17TransferByAddress(skip);
      } else if (pageNumber <= 0) {
        this.isLoading = true;
        this.pagination = 1;
        const skip = this.resultsPerPage;
        this.GetNep17TransferByAddress(skip);
      } else {
        this.isLoading = true;
        this.pagination = pageNumber;
        const skip = (pageNumber - 1) * this.resultsPerPage;
        this.GetNep17TransferByAddress(skip);
      }
    },
    getContract(ctrHash) {
      this.$router.push({
        path: `/tokeninfo/${ctrHash}`,
      });
    },

    getAddress(accountAddress) {
      this.$router.push({
        path: `/accountprofile/${accountAddress}`,
      });
    },
    getFromAccount() {
      return;
    },

    getToAccount() {
      return;
    },
    convertTime(ts) {
      const lang = this.$i18n.locale;
      switch (lang) {
        case "cn":
          return format(ts, "zh_CN");
        default:
          return format(ts);
      }
    },
    GetNep17TransferByAddress(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {
            Address: this.account_address,
            Limit: this.resultsPerPage,
            Skip: skip,
          },
          // TODO 是否可以按照时间排序，似乎需要修改后端
          method: "GetNep17TransferByAddress",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.isLoading = false;
        this.tableData = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.txId = res["data"]["result"]["result"]["txid"];
        this.timeStamp =res["data"]["result"]["result"]["timestamp"]
        this.countPage = (this.totalCount ===0) ?  1  : (Math.ceil(this.totalCount / this.resultsPerPage))
        for (let k = 0; this.tableData.length; k++) {
          axios({
            method: "post",
            url: "/api",
            data: {
              jsonrpc: "2.0",
              id: 1,
              params: {
                ContractHash: this.tableData[k]["contract"],
                Limit: this.resultsPerPage,
                Skip: skip,
              },
              method: "GetAssetInfoByContractHash",
            },
            headers: {
              "Content-Type": "application/json",
              withCredentials: " true",
              crossDomain: "true",
            },
          }).then((res) => {
            this.tableData[k]["tokenname"] = res["data"]["result"]["tokenname"];
            this.tableData[k]["decimals"] = res["data"]["result"]["decimals"]

          });
        }
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
