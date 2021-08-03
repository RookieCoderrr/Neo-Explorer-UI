<template>
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
          <div class="from">
            <div class="addr">
              <span class="text-muted" v-if="row.item.from === null"> Null Account </span>
              <a class="name mb-0 text-sm" v-else style="cursor: pointer" @click="getAddress(row.item.from)">{{ row.item.from }}</a>
            </div>
          </div>
        </td>
        <td class="budget">
          {{ row.item.frombalance }}
        </td>
        <td class="budget">
          <div class="addr">
            <span class="text-muted" v-if="row.item.to === null"> Null Account </span>
            <a class="name mb-0 text-sm" v-else style="cursor: pointer" @click="getAddress(row.item.to)">{{ row.item.to }}</a>
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
</template>
<script>
import axios from "axios";
export default {
  name: "address11-ts-table",
  props: {
    type: {
      type: String,
    },
    account_address: String,
  },
  data() {
    return {
      tableData: [],
      resultsPerPage: 10,
      pagination: 1,
      countPage:0,
    };
  },
  created() {
    this.GetNep11TransferByAddress(0);
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
    pageChangeByInput(pageNumber) {
      if (pageNumber >= this.countPage) {
        this.isLoading = true;
        this.pagination =this.countPage;
        const skip =
                ( this.countPage - 1 ) * this.resultsPerPage;
        this.GetNep11TransferByAddress(skip);
      } else if (pageNumber <= 0) {
        this.isLoading = true;
        this.pagination = 1;
        const skip = this.resultsPerPage;
        this.GetNep11TransferByAddress(skip);
      } else {
        this.isLoading = true;
        this.pagination = pageNumber;
        const skip = (pageNumber - 1) * this.resultsPerPage;
        this.GetNep11TransferByAddress(skip);
      }
    },
    pageChange(pageNumber) {
      this.pagination = pageNumber;
      const skip = (pageNumber - 1) * this.resultsPerPage;
      this.GetNep11TransferByAddress(skip);
    },
    convertToken(token, decimal) {
      return (token * Math.pow(0.1, decimal)).toFixed(6);
    },

    mouseHover(contract) {
      var a = document.getElementById("contract");
      a.addEventListener("mouseover", function (event) {
        event.target.style.display = contract;
      });
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

    getToAccount() {
      return;
    },
    GetNep11TransferByAddress(skip) {
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
          method: "GetNep11TransferByAddress",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        //console.log("transfer", res["data"]["result"]["result"]);
        this.tableData = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
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

          });
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
