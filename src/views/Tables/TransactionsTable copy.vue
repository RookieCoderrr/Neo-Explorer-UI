<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
<<<<<<< HEAD
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
=======
        class="card-header border-0"
        :class="type === 'dark' ? 'bg-transparent' : ''"
>>>>>>> main
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
          <th>交易ID</th>
          <th>区块高度</th>
          <th>大小</th>
          <th>时间</th>
          <th>花费的GAS</th>
          <th></th>
        </template>

        <template v-slot:default="row">
          <td>
            <div class="txid"   @οnmοuseοver="mouseHover(row.item.hash)">
              <a  class="name mb-0 text-sm"
                  style="cursor: pointer" @click="getTransaction(row.item.hash)">{{ row.item.hash }}</a>
            </div>

          </td>
          <td class="budget">
            {{ row.item.blockIndex }}
          </td>
          <td class="budget">
            {{ row.item.size }} bytes
          </td>
          <td class="budget">
            {{ this.convertTime(row.item.blocktime) }}
          </td>

          <td class="budget">
            {{ this.convertGas(row.item.netfee + row.item.sysfee)}}
          </td>

        </template>
      </base-table>
    </div>

    <div
<<<<<<< HEAD
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
          &nbsp; of &nbsp;{{
            parseInt(this.totalCount / this.resultsPerPage) + 1
          }}
        </div>
      </div>
=======
        class="card-footer d-flex justify-content-end"
        :class="type === 'dark' ? 'bg-transparent' : ''"
    >
>>>>>>> main
      <base-pagination  :total="this.totalCount" :value="pagination" v-on:input="pageChange($event)"></base-pagination>
    </div>
  </div>
</template>
<script>
<<<<<<< HEAD
=======
// by zilie cdde2b58d09e04290f9eabd8a6ebdbb3078d8cf4
>>>>>>> main
import axios from "axios"
import { format } from "timeago.js";
export default {
  name: "transactions-table",
  props: {
    type: {
      type: String,
    },
    title: String,
<<<<<<< HEAD
=======
    account_address: String,
>>>>>>> main
  },
  data() {
    return {
      tableData: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination : 1,
<<<<<<< HEAD
      placeHolder: 0,

=======
>>>>>>> main
    };
  },

  created() {
<<<<<<< HEAD
    this.getTransactionList(0)

  },
  computed: {
    text() {
      return function (value) {
        let inputLength = value.toString().length * 10 + 50;
        return (
            "width: " +
            inputLength +
            "px!important;text-align: center;height:80%;margin-top:5%;"
        );
      };
    },
  },
=======
    this.getTransactions()

  },
>>>>>>> main
  methods:{

    mouseHover(txid){
      var a = document.getElementsByClassName("txid");
      a.onmouseover = function () {}
<<<<<<< HEAD
        a.style.display = txid
=======
      a.style.display = txid
>>>>>>> main
    },
    convertGas(gas) {
      if (gas == 0) {
        return  0
      }
      return (gas * Math.pow(0.1,8)).toFixed(6)
    },

    convertTime(time) {
<<<<<<< HEAD
     return format(time)
=======
      return format(time)
>>>>>>> main
    },
    getTransaction(txhash) {
      this.$router.push({
        path: `/icons/${txhash}`,
      })
    },
    pageChange(pageNumber) {
      this.pagination = pageNumber;
      const skip = (pageNumber - 1) * this.resultsPerPage;
      this.getTransactionList(skip);
    },
<<<<<<< HEAD
    pageChangeByInput(pageNumber) {
      if (pageNumber >= parseInt(this.totalCount / this.resultsPerPage) + 1) {
        this.pagination = parseInt(this.totalCount / this.resultsPerPage) + 1;
        const skip =
            parseInt(this.totalCount / this.resultsPerPage) * this.resultsPerPage;
        this.getTransactionList(skip);
      }else if(pageNumber <= 0){
        this.pagination = 1;
        const skip =
            this.resultsPerPage;
        this.getTransactionList(skip);
      }
      else {
        this.pagination = pageNumber;
        const skip = (pageNumber - 1) * this.resultsPerPage;
        this.getTransactionList(skip);
      }
=======
    getTransactions(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          method: "GetRawTransactionByAddress",
          params: {
            Limit: this.resultsPerPage,
            Skip: skip,
            Address: this.account_address,
          },
          id: 1,
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: "true",
          crossDomain: "true",
        },
      })
          .then((res) => {
            // TODO: 这个还没处理
            console.log("get transaction list", res)
            this.tableData = res["data"]["result"]["result"]

          })
          .catch((err) => {
            console.log("Error", err);
          });
>>>>>>> main
    },

    getTransactionList(skip){

      axios({
        method:'post',
        url:'/api',
        data:{
          "jsonrpc": "2.0",
          "id": 1,
<<<<<<< HEAD
          "params": {"Limit":this.resultsPerPage,"Skip":skip},
=======
          "params": {"Limit":this.resultsPerPage, "Skip":skip},
>>>>>>> main
          "method": "GetTransactionList"
        },
        headers:{'Content-Type': 'application/json','withCredentials':' true',
          'crossDomain':'true',},
      }).then((res)=>{
<<<<<<< HEAD

        this.tableData = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];

        console.log(this.tableData)

        //
        // console.log("成功")
=======
        //this.tableData = res["data"]["result"]["result"];
        //this.totalCount = res["data"]["result"]["totalCount"];
        //
        console.log(res)
        this.tableData = res["data"]["result"]["result"]
>>>>>>> main
      });
    }
  }
};
</script>
<style>
.txid {
  width: 200px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> main
