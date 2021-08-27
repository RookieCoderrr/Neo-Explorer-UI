<template>
  <div v-if="this.totalCount != 0">
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
            <th class="tableHeader">{{ $t("hash") }}</th>
            <th class="tableHeader">{{ $t("tokensTable.name") }}</th>
            <th class="tableHeader">{{ $t("tokensTable.symbol") }}</th>
            <th class="tableHeader">{{ $t("tokensTable.standard") }}</th>
            <th class="tableHeader">{{ $t("tokenHolder.balance") }}</th>
          </template>

          <template v-slot:default="row">
            <th scope="row">
              <div class="media align-items-center">
                <div class="media-body">
                  <router-link
                    class="  mb-0 table-list-item-blue"
                    style="cursor: pointer"
                    :to="'/tokeninfo/' + row.item.asset"
                    >{{ row.item.asset }}</router-link
                  >
                </div>
              </div>
            </th>
            <td class="table-list-item">
              {{ row.item.tokenname }}
            </td>
            <td class="table-list-item">
              {{ row.item.symbol }}
            </td>
            <td>
              <el-tag
                v-if="row.item.standard === 'NEP17'"
              >
                <span class="">{{ row.item.standard }}</span>
              </el-tag>
              <el-tag v-else class="badge-dot mr-4" type="success">
                <span class="">{{ row.item.standard }}</span>
              </el-tag>
            </td>
            <td class="table-list-item">
              {{ convertToken(row.item.balance, row.item.decimals) }}
            </td>
          </template>
        </base-table>
        <div v-if="totalCount>=10"
                class="card-footer d-flex justify-content-end"
                :class="type === 'dark' ? 'bg-transparent' : ''"
                style="height: 70px"
        >
          <el-pagination
                  @current-change="handleCurrentChange"
                  :hide-on-single-page="totalCount<=10"
                  :current-page="pagination"
                  :pager-count= "5"
                  :page-size= "10"
                  layout="jumper, prev, pager, next"
                  :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
  <card shadow v-else class="text-center">
    {{ $t("addressPage.tokennullPrompt") }}</card
  >
</template>
<script>
import axios from "axios";
import { convertToken } from "../../store/util";
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

  watch: {
    account_address: "watchaddress",
  },
  methods: {
    convertToken,
    watchaddress() {
      this.getTokenListWithBalance(0);
    },
    handleCurrentChange(val) {
      this.isLoading = true;
      this.pagination = val;
      const skip = (val - 1) * this.resultsPerPage;
      this.getTokenListWithBalance(skip);
    },
    getToken(hash) {
      this.$router.push(`/tokeninfo/${hash}`);
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
