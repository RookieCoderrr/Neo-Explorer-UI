<template>
  <div
    v-if="this.totalCount != 0"
    class="card shadow"
    :class="type === 'dark' ? 'bg-default' : ''"
  >
    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tokenList"
      >
        <template v-slot:columns>
          <th style="background:#5576EC; color:#ffffff">{{ $t("hash") }}</th>
          <th style="background:#5576EC; color:#ffffff">{{ $t("tokensTable.name") }}</th>
          <th style="background:#5576EC; color:#ffffff">{{ $t("tokensTable.symbol") }}</th>
          <th style="background:#5576EC; color:#ffffff">{{ $t("tokensTable.symbol") }}</th>
          <th style="background:#5576EC; color:#ffffff">{{ $t("tokenHolder.balance") }}</th>
        </template>

        <template v-slot:default="row">
          <th scope="row">
            <div class="media align-items-center">
              <div class="media-body">
                <router-link
                  class="name mb-0 text-sm"
                  style="cursor: pointer"
                  :to="'/tokeninfo/'+row.item.asset"
                  >{{ row.item.asset }}</router-link
                >
              </div>
            </div>
          </th>
          <td class="name">
            {{ row.item.tokenname }}
          </td>
          <td class="symbol">
            {{ row.item.symbol }}
          </td>
          <td>
            <badge
              v-if="row.item.standard === 'NEP17'"
              class="badge-dot mr-4"
              type="primary"
            >
              <span class="">{{ row.item.standard }}</span>
            </badge>
            <badge v-else class="badge-dot mr-4" type="success">
              <span class="">{{ row.item.standard }}</span>
            </badge>
          </td>
          <td class="balance">
            {{ convertToken(row.item.balance, row.item.decimals) }}
          </td>
        </template>
      </base-table>
    </div>

    <div
      v-if="this.totalCount > 10"
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
        <div class="text">&nbsp; of &nbsp;{{ countPage }}</div>
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
import {convertToken} from "../../store/util";
export default {
  name: "address-tokens-table",
  props: {
    type: {
      type: String,
    },
    account_address: String,
  },
  data() {
    return {
      tokenList: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      address_list: [],
    };
  },
  created() {
    this.getTokenListWithBalance(0);
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
  watch: {
    account_address: "watchaddress",
  },
  methods: {
    convertToken,
    watchaddress() {
      this.getTokenListWithBalance(0);
    },
    pageChange(pageNumber) {
      this.isLoading = true;
      this.pagination = pageNumber;
      const skip = (pageNumber - 1) * this.resultsPerPage;
      this.getTokenListWithBalance(skip);
    },
    getToken(hash) {
      this.$router.push(`/tokeninfo/${hash}`);
    },

    pageChangeByInput(pageNumber) {
      if (pageNumber >= this.countPage) {
        this.pagination = this.countPage;
        const skip = (this.countPage - 1) * this.resultsPerPage;
        this.getTokenListWithBalance(skip);
      } else if (pageNumber <= 0) {
        this.pagination = 1;
        const skip = this.resultsPerPage;
        this.getTokenListWithBalance(skip);
      } else {
        this.pagination = pageNumber;
        const skip = (pageNumber - 1) * this.resultsPerPage;
        this.getTokenListWithBalance(skip);
      }
    },
    getTokenListWithBalance(skip) {
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
          // TODO: 上线后改成GetAssetsHeldByAddress
          method: "GetAssetsHeldByAddress",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        let temp = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.countPage =
          this.totalCount === 0
            ? 1
            : Math.ceil(this.totalCount / this.resultsPerPage);
        let address_list = [];
        for (let k = 0; k < temp.length; k++) {
          address_list.push(temp[k]["asset"]);
        }
        // console.log("address_list", address_list)
        this.tokenList = temp;
        this.getTokenInfo(address_list);
      });
    },
    getTokenInfo(address_list) {
      for (let k = 0; k < address_list.length; k++) {
        axios({
          method: "post",
          url: "/api",
          data: {
            jsonrpc: "2.0",
            id: 1,
            params: {
              ContractHash: address_list[k],
              Limit: this.resultsPerPage,
            },
            method: "GetAssetInfoByContractHash",
          },
          headers: {
            "Content-Type": "application/json",
            withCredentials: " true",
            crossDomain: "true",
          },
        }).then((res) => {
          this.tokenList[k]["tokenname"] = res["data"]["result"]["tokenname"];
          this.tokenList[k]["symbol"] = res["data"]["result"]["symbol"];
          this.tokenList[k]["standard"] = res["data"]["result"]["type"];
          this.tokenList[k]["decimals"] = res["data"]["result"]["decimals"];
        });
      }
    },
  },
};
</script>
<style></style>
