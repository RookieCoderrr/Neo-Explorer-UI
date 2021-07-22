<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">


    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"

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
          <th></th>
        </template>

        <template v-slot:default="row">
          <td class="budget">
            <div class="contract" >
              <a  class="name mb-0 text-sm"
                  style="cursor: pointer">{{this.tableData["contract"]}}</a>
            </div>

          </td>
          <td class="budget">
            <div class="from">
              {{ this.tableData["tokenname"] }}
            </div>
          </td>
          <td class="budget">
            <div class="from">
              {{ this.tableData["tokenId"] }}
            </div>
          </td>
          <td class="budget">
            <div class="from">
              <a  class="name mb-0 text-sm"
                  style="cursor: pointer"  @click="getFromAccount(row.item.from)">{{ this.tableData["from"] }}</a>

            </div>
          </td>
          <td class="budget">
            {{ this.tableData["frombalance"] }}
          </td>
          <td class="budget">
            <a  class="name mb-0 text-sm"
                style="cursor: pointer"  @click="getToAccount(row.item.to)">{{this.tableData["to"] }}</a>
          </td>

          <td class="budget">
            {{this.tableData["tobalance"] }}
          </td>

          <td class="budget">
            {{ this.tableData["value"] }}
          </td>

          <td class="text-right">
            <base-dropdown class="dropdown" position="right">
              <template v-slot:title>
                <a
                    class="btn btn-sm btn-icon-only text-light"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                  <i class="fas fa-ellipsis-v"></i>
                </a>
              </template>

              <template>
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </template>
            </base-dropdown>
          </td>
        </template>
      </base-table>
    </div>

    <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
    </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  name: "transfers-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  data() {
    return {
      tableData: [],
      txhash:"0x9a52bbd5b14304b6643074377719dc52eaa1b3458c5860037b5af22126cd44b3"
    };
  },

  created() {
    console.log(this.txhash)
    this.getNep11TransferByTransactionHash(this.txhash)

  },
  methods:{


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

    getNep11TransferByTransactionHash(txhash){
      axios({
        method:'post',
        url:'/api',
        data:{
          "jsonrpc": "2.0",
          "id": 1,
          "params": {"TransactionHash":txhash},
          "method": "GetNep11TransferByTransactionHash"
        },
        headers:{'Content-Type': 'application/json','withCredentials':' true',
          'crossDomain':'true',},
      }).then((res)=> {
        this.tableData = res["data"]["result"]
        console.log(this.tableData["contract"])
      })
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
