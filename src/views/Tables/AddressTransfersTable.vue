<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
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
          <th>From</th>
          <th>From Balance</th>
          <th>To</th>
          <th>To Balance</th>
          <th>Amount</th>
          <th></th>
        </template>

        <template v-slot:default="row">
          <td class="budget">
            <div class="contract" @mouseover="mouseHover(row.item.contract)">
              <a  class="name mb-0 text-sm"
                  style="cursor: pointer"  @click="getContract(row.item.contract)">{{ row.item.contract}}</a>
            </div>
          </td>
          <td class="budget">
            <div class="from">
              {{ row.item.tokenname }}
            </div>
          </td>
          <td class="budget">
            <div class="from">
              <a  class="name mb-0 text-sm"
                  style="cursor: pointer" @click="getFromAccount(row.item.from)">{{ row.item.from }}</a>
            </div>
          </td>
          <td class="budget">
            {{ row.item.frombalance }}
          </td>
          <td class="budget">
            <a  class="name mb-0 text-sm"
                style="cursor: pointer" @click="getToAccount(row.item.to)">{{ row.item.to }}</a>
          </td>

          <td class="budget">
            {{row.item.tobalance}}
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
    >
    <base-pagination  :total="this.totalCount" :value="pagination" v-on:input="pageChange($event)"></base-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "address-transfers-table",
  props: {
    type: {
      type: String,
    },
    title: String,
    account_address: String,
  },
  data() {
    return {
      tableData: [],
      resultsPerPage: 10,
      pagination: 1,
    };
  },
  created() {
    this.GetNep17TransferByAddress(0)
    this.GetNep11TransferByAddress(0)
  },
  methods:{
    pageChange(pageNumber) {
      this.pagination = pageNumber;
      const skip = (pageNumber - 1) * this.resultsPerPage;
      this.GetNep17TransferByAddress(skip);
      this.GetNep11TransferByAddress(skip)
    },
    convertToken(token,decimal) {
      return (token * Math.pow(0.1,decimal)).toFixed(6)
    },

    mouseHover(contract){
      var a = document.getElementById("contract");
      a.addEventListener("mouseover",function (event){
        event.target.style.display= contract;
      })
    },

    getContract(ctrHash){
      return ctrHash
    },

    getFromAccount(){
      return
    },

    getToAccount(){
      return
    },

    GetNep17TransferByAddress(skip) {
      axios({
        method:'post',
        url:'/api',
        data:{
          "jsonrpc": "2.0",
          "id": 1,
          "params": {Address: this.account_address, Limit:this.resultsPerPage, Skip:skip},
          "method": "GetNep17TransferByAddress"
        },
        headers:{'Content-Type': 'application/json','withCredentials':' true',
          'crossDomain':'true',},
      }).then((res)=>{
        this.tableData = res["data"]["result"]["result"]
        for(let k=0; this.tableData.length; k++) {
          axios({
            method:'post',
            url:'/api',
            data:{
              "jsonrpc": "2.0",
              "id": 1,
              "params": {ContractHash: this.tableData[k]["contract"], Limit:this.resultsPerPage, Skip:skip},
              "method": "GetAssetInfoByContractHash"
            },
            headers:{'Content-Type': 'application/json','withCredentials':' true',
              'crossDomain':'true',},
          }).then((res)=> {
            this.tableData[k]["tokenname"]  = res["data"]["result"]["tokenname"]
          });
        }
      });
    },
    GetNep11TransferByAddress(skip) {
      axios({
        method:'post',
        url:'/api',
        data:{
          "jsonrpc": "2.0",
          "id": 1,
          "params": {Address: this.account_address, Limit:this.resultsPerPage, Skip:skip},
          "method": "GetNep11TransferByAddress"
        },
        headers:{'Content-Type': 'application/json','withCredentials':' true',
          'crossDomain':'true',},
      }).then((res)=>{
        this.tableData = res["data"]["result"]["result"]
        for(let k=0; this.tableData.length; k++) {
          axios({
            method:'post',
            url:'/api',
            data:{
              "jsonrpc": "2.0",
              "id": 1,
              "params": {ContractHash: this.tableData[k]["contract"], Limit:this.resultsPerPage, Skip:skip},
              "method": "GetAssetInfoByContractHash"
            },
            headers:{'Content-Type': 'application/json','withCredentials':' true',
              'crossDomain':'true',},
          }).then((res)=> {
            this.tableData[k]["tokenname"]  = res["data"]["result"]["tokenname"]
          });
        }
      });
    }

  }
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
