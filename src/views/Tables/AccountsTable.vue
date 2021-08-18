<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
            {{ $t("addressPage.address") }}
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
          <th>{{ $t("addressPage.number") }}</th>
          <th>
            {{ $t("addressPage.address")
            }}<button class="btn btn-sm btn-primary" @click="changeFormat(button)">
              {{ this.button.buttonName }}
            </button>
          </th>
          <th>{{ $t("addressPage.neoBalance") }}</th>
          <th>{{ $t("addressPage.gasBalance") }}</th>
          <th>{{ $t("addressPage.createdTime") }}</th>
        </template>
        <template v-slot:default="row">
          <td>
            {{ row.item.number }}
          </td>
          <td class="address">
            <router-link
              class="mb-0 text-sm"
              v-if="this.button.state"
              style="cursor: pointer"
              :to="'/accountprofile/'+row.item.address"
            >
              {{ scriptHashToAddress(row.item.address) }}
            </router-link>
            <router-link
              class="mb-0 text-sm"
              v-else
              style="cursor: pointer"
              :to="'/accountprofile/'+row.item.address"
            >
              {{ row.item.address }}
            </router-link>
            <!--a class="name mb-0 text-sm" style="cursor: pointer" @click="getAddress(row.item.address)">{{ row.item.address }}</a-->
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
        <div class="text">{{ $t("page") }} &nbsp;</div>
        <base-input
          type="number"
          :style="text(pagination)"
          :placeholder="pagination"
          v-on:changeinput="pageChangeByInput($event)"
        ></base-input>
        <div class="text">&nbsp; of &nbsp;{{ countPage }}</div>
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
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import {convertGas, convertTime, scriptHashToAddress,addressToScriptHash, changeFormat} from "../../store/util";
import {render} from "timeago.js";

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
      countPage: 0,
      button: { state: true, buttonName: "Hash"},
    };
  },
  created() {
    this.getAccoutsList(0);
  },
  updated() {
    const nodes = document.getElementsByClassName('timeago')
    console.log(nodes)
    if(nodes.length != 0){
      if(this.$i18n.locale === 'cn'){
        render(nodes, 'zh_CN');
      }else{
        render(nodes, this.$i18n.locale );
      }
    }
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
    convertGas,
    convertTime,
    addressToScriptHash,
    scriptHashToAddress,
    changeFormat,
    pageChangeByInput(pageNumber) {
      if (pageNumber >= this.countPage) {
        this.isLoading = true;
        this.pagination = this.countPage;
        const skip = (this.countPage - 1) * this.resultsPerPage;
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
          method: "GetAddressList",
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
            temp[k]["firstusetime"] = convertTime(temp[k]["firstusetime"], this.$i18n.locale);
            temp[k]["neoBalance"] = "";
            temp[k]["gasBalance"] = "";
            temp[k]["number"] =
              k + 1 + this.resultsPerPage * (this.pagination - 1);
          }
          this.tableData = temp;
          this.totalAccount = res["data"]["result"]["totalCount"];
          this.countPage = Math.ceil(this.totalAccount / this.resultsPerPage);
          this.getBalance();
          this.isLoading = false;
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
            this.tableData[k]["gasBalance"] = this.convertGas(
              res["data"]["result"]["balance"]
            );
          })
          .catch((err) => {
            if (Object.getPrototypeOf(TypeError) === Error) {
              this.tableData[k]["gasBalance"] = "0";
            } else {
              console.log("Error", err);
            }
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
            if (Object.getPrototypeOf(TypeError) === Error) {
              this.tableData[k]["neoBalance"] = "0";
            } else {
              console.log("Error", err);
            }
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
          return this.convertGas(res["data"]["result"]["balance"]);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    },
  },
};
</script>
<style></style>
