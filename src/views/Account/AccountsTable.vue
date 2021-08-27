<template>
  <div class="col list-title">
    <h1 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
      {{ title }}
    </h1>
  </div>
  <div class="card shadow list-card" :class="type === 'dark' ? 'bg-default' : ''">
    <!--div
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
    </div-->
    <div class="table-responsive">
      <loading
        :is-full-page="false"
        :opacity="0.9"
        :active="isLoading"
      ></loading>
      <base-table
        class="table align-items-center table-flush list-table"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"
      >
        <template v-slot:columns>
          <th class="tableHeader">{{ $t("addressPage.number") }}</th>
          <th class="tableHeader">
            {{ $t("addressPage.accountsTable")
            }}
            <el-button type="info" :plain="true" size="small" style="height: 19px;margin-left: 4px" @click="changeFormat(button)">
              {{this.button.buttonName}}</el-button>

          </th>
          <th class="tableHeader">{{ $t("addressPage.neoBalance") }}</th>
          <th class="tableHeader">{{ $t("addressPage.gasBalance") }}</th>
          <th class="tableHeader">{{ $t("addressPage.createdTime") }}</th>
        </template>
        <template v-slot:default="row">
          <td class="table-list-item" >
            {{ row.item.number }}
          </td>
          <td class="address">
            <router-link
              class="mb-0 table-list-item-blue"
              v-if="this.button.state"
              style="cursor: pointer"
              :to="'/accountprofile/' + row.item.address"
            >
              {{ scriptHashToAddress(row.item.address) }}
            </router-link>
            <router-link
              class="mb-0 table-list-item-blue"
              v-else
              style="cursor: pointer"
              :to="'/accountprofile/' + row.item.address"
            >
              {{ row.item.address }}
            </router-link>
            <!--a class="name mb-0 text-sm" style="cursor: pointer" @click="getAddress(row.item.address)">{{ row.item.address }}</a-->
          </td>
          <td class="table-list-item">
            {{ row.item.neoBalance }}
          </td>
          <td class="table-list-item">
            {{ row.item.gasBalance }}
          </td>
          <td class="table-list-item">
            {{ row.item.firstusetime }}
          </td>
        </template>
      </base-table>
    </div>

    <div   v-if="totalAccount>=10"
            class="card-footer d-flex justify-content-end"
            :class="type === 'dark' ? 'bg-transparent' : ''"
            style="height: 70px"
    >
      <el-pagination
              @current-change="handleCurrentChange"
              :hide-on-single-page="totalAccount<=10"
              :current-page="pagination"
              :pager-count= "5"
              :page-size= "10"
              layout="jumper, prev, pager, next"
              :total="totalAccount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import {
  convertGas,
  convertTime,
  scriptHashToAddress,
  addressToScriptHash,
  changeFormat,
} from "../../store/util";
import { render } from "timeago.js";

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
      totalAccount: 0,
      pagination: 1,
      resultsPerPage: 10,
      neoBalance: 0,
      isLoading: true,
      countPage: 0,
      button: { state: true, buttonName: "Hash" },
    };
  },
  created() {
    this.getAccoutsList(0);
  },
  updated() {
    const nodes = document.getElementsByClassName("timeago");
    console.log(nodes);
    if (nodes.length != 0) {
      if (this.$i18n.locale === "cn") {
        render(nodes, "zh_CN");
      } else {
        render(nodes, this.$i18n.locale);
      }
    }
  },

  methods: {
    convertGas,
    convertTime,
    addressToScriptHash,
    scriptHashToAddress,
    changeFormat,
    handleCurrentChange(val) {
      this.isLoading = true;
      this.pagination = val;
      const skip = (val - 1) * this.resultsPerPage;
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
            temp[k]["firstusetime"] = convertTime(
              temp[k]["firstusetime"],
              this.$i18n.locale
            );
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
