<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
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
          <th>ID.</th>
          <th>Address</th>
          <th>Neo Balance</th>
          <th>Gas Balance</th>
          <th>Created Time</th>
          <th></th>
        </template>
        <template v-slot:default="row">
          <td>
            {{ row.item._id }}
          </td>
          <td class="address">
            <a class="name mb-0 text-sm" style="cursor: pointer" @click="getAddress(row.item.address)">{{ row.item.address }}</a>
          </td>
          <td class="neoBalance">
            {{ row.item.neoBalance }}
          </td>
          <td class="gasBalance">
            {{ row.item.gasBalance }}
          </td>
          <td class="firstusetime">
            {{ row.item.firstusetime }}
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
          &nbsp; of &nbsp;{{
            parseInt(this.totalAccount / this.resultsPerPage) + 1
          }}
        </div>
      </div>
      <base-pagination
        :total="this.totalAccount"
        :value="this.pagination"
        v-on:input="pageChange($event)"
      ></base-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { format } from "timeago.js";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "accounts-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  components: {
    Loading,
  },
  data() {
    return {
      tableData: [],
      totalAccount: 100,
      pagination: 1,
      resultsPerPage: 10,
      neoBalance: 0,
      isLoading: true,
    };
  },
  created() {
    this.getAccoutsList(0);
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
      if (pageNumber >= parseInt(this.totalAccount / this.resultsPerPage) + 1) {
        this.isLoading = true;
        this.pagination = parseInt(this.totalAccount / this.resultsPerPage) + 1;
        const skip =
          parseInt(this.totalAccount / this.resultsPerPage) *
          this.resultsPerPage;
        this.getAccoutsList(skip);
      } else if (pageNumber <= 0) {
        this.isLoading = true;
        this.pagination = 1;
        const skip = this.resultsPerPage;
        this.getAccoutsList(skip);
      } else {
        this.isLoading = true;
        this.pagination = pageNumber;
        const skip = (pageNumber - 1) * this.resultsPerPage;
        this.getAccoutsList(skip);
      }
    },
    pageChange(pageNumber) {
      this.isLoading = true;
      this.pagination = pageNumber;
      const skip = (pageNumber - 1) * this.resultsPerPage;
      this.getAccoutsList(skip);
    },
    getAccoutsList(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          method: "GetAccountsList",
          params: { Limit: this.resultsPerPage, Skip: skip },
          id: 1,
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: "true",
          crossDomain: "true",
        },
      })
        .then((res) => {
          let temp = res["data"]["result"]["result"];
          for (let k = 0; k < temp.length; k++) {
            temp[k]["firstusetime"] = format(temp[k]["firstusetime"]);
            temp[k]["neoBalance"] = "";
            temp[k]["gasBalance"] = "";
          }
          this.tableData = temp;
          this.totalAccount = res["data"]["result"]["totalCount"];
          this.getBalance();
          setTimeout(() => {
            this.isLoading = false;
          }, 1500);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    },
    getAddress(accountAddress) {
      this.$router.push({
        path: `/accountprofile/${accountAddress}`,
      });
    },
    getBalance() {
      for (let k = 0; k < this.tableData.length; k++) {
        console.log(k.toString());
        let addr = this.tableData[k].address;
        axios({
          method: "post",
          url: "/api",
          data: {
            jsonrpc: "2.0",
            method: "GetBalanceByContractHashAddress",
            params: {
              Address: addr,
              ContractHash: "0xd2a4cff31913016155e38e474a2c06d08be276cf", // gas
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
            this.tableData[k]["gasBalance"] = res["data"]["result"]["balance"];
            //this.neoBalance = res["data"]["result"]["balance"];
          })
          .catch((err) => {
            this.tableData[k]["gasBalance"] = "0";
            console.log("Error", err);
          });

        axios({
          method: "post",
          url: "/api",
          data: {
            jsonrpc: "2.0",
            method: "GetBalanceByContractHashAddress",
            params: {
              Address: addr,
              ContractHash: "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
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
            this.tableData[k]["neoBalance"] = res["data"]["result"]["balance"];
          })
          .catch((err) => {
            this.tableData[k]["neoBalance"] = "0";
            console.log("Error", err);
          });
      }
    },
    getNeoBalance(accountAddress) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          method: "GetBalanceByContractHashAddress",
          params: {
            Address: accountAddress,
            ContractHash: "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
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
          console.log(res);
          return res["data"]["result"]["balance"];
        })
        .catch((err) => {
          console.log("Error", err);
        });
    },
    getGasBalance(accountAddress) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          method: "GetBalanceByContractHashAddress",
          params: {
            Address: accountAddress,
            ContractHash: "0xd2a4cff31913016155e38e474a2c06d08be276cf",
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
          return res["data"]["result"]["balance"];
        })
        .catch((err) => {
          console.log("Error", err);
        });
    },
  },
};
</script>
<style></style>
