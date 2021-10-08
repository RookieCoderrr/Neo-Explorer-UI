<template>
  <div
    v-if="this.totalCount != 0"
    class="card shadow"
    :class="type === 'dark' ? 'bg-default' : ''"
  >
    <div class="table-responsive">
      <loading
        :is-full-page="false"
        :opacity="0.9"
        :active="isLoading"
      ></loading>
      <base-table
        class="table align-items-center table-hover"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"
      >
        <template v-slot:columns>
          <th class="tableHeader"> # </th>
<!--          <th class="tableHeader">{{ $t("nftToken.name") }}</th>-->

          <th class="tableHeader">{{ $t("nftToken.tokenId") }}</th>
          <!--          <th>Last Transferred</th>-->
          <th class="tableHeader">{{ $t("nftToken.holder") }}
            <el-button type="info" :plain="true" size="small" style="height: 21px;margin-left: 4px" @click="changeFormat(button)">
              {{this.button.buttonName}}</el-button>
          </th>
        </template>

        <template v-slot:default="row">
          <td>
            <i class="ni ni-image"></i>
          </td>
<!--          <td class="table-list-item">-->
<!--            {{base64ToString(row.item.tokenid)}}-->
<!--          </td>-->
          <!--          <td class="firstused">-->
          <!--            {{ convertTime(row.item.lasttx.timestamp) }}-->
          <!--          </td>-->
          <td class="table-list-item">
            <router-link
                class="  mb-0 table-list-item-blue"
                style="cursor: pointer"
                :to="'/NFTinfo/'+row.item.asset+'/'+row.item.address+'/'+base64ToHash(row.item.tokenid)"
            >{{row.item.tokenid}}</router-link>
          </td>
          <td class="Address">
            <router-link
                v-if="button.state"
                class="  mb-0 table-list-item-blue"
                style="cursor: pointer"
                :to="'/accountprofile/'+row.item.address"
            >{{ scriptHashToAddress(row.item.address) }}</router-link>
            <router-link
                v-else
                class="  mb-0 table-list-item-blue"
                style="cursor: pointer"
                :to="'/accountprofile/'+row.item.address"
            >{{ row.item.address }}
            </router-link>
          </td>
        </template>
      </base-table>
    </div>

    <div v-if="totalCount>=10"
            class="card-footer d-flex justify-content-end"
            :class="type === 'dark' ? 'bg-transparent' : ''"
            style="height: 70px"
    >
      <el-pagination
          v-if="windowWidth > 552"
          @current-change="handleCurrentChange"
          :hide-on-single-page="totalCount<=10"
          :current-page="pagination"
          :pager-count= "3"
          :page-size= "10"
          layout="jumper, prev, pager, next"
          :total="totalCount">
      </el-pagination>
      <el-pagination
          v-if="windowWidth < 552"
          small ="true"
          @current-change="handleCurrentChange"
          :hide-on-single-page="totalCount<=10"
          :current-page="pagination"
          layout="prev,pager,next"
          :total="totalCount">
      </el-pagination>
    </div>
  </div>
  <card shadow v-else class="text-center">{{
    $t("NftToken.nullPrompt")
  }}</card>
</template>
<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { convertToken, scriptHashToAddress, changeFormat} from "../../store/util";
import Neon from "@cityofzion/neon-js";

export default {
  name: "nft-token",
  props: {
    type: {
      type: String,
    },
    contractHash: String,
    decimal: Number,
  },
  components: {
    Loading,
  },
  data() {
    return {
      tableData:[],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      isLoading: true,
      countPage: 0,
      button: { state: true, buttonName: "Hash" },
      windowWidth:window.innerWidth,
    };
  },
  created() {
    this.GetAssetHoldersByContractHash(0);
  },
  watch: {
    contractHash: "watchcontract",
  },
  methods: {
    changeFormat,
    convertToken,
    scriptHashToAddress,
    watchcontract() {
      this.GetAssetHoldersByContractHash(0);
    },
    handleCurrentChange(val) {
      this.isLoading = true;
      this.pagination = val;
      const skip = (val - 1) * this.resultsPerPage;
      this.GetAssetHoldersByContractHash(skip);
    },
    toPercentage(num) {
      let s = Number(num * 100).toFixed(2);
      s += "%";
      return s;
    },
    getAddress(accountAddress) {
      this.$router.push({
        path: `/accountprofile/${accountAddress}`,
      });
    },
    base64ToString(base) {
      var tmp = Neon.u.base642hex(base);
      var res = Neon.u.hexstring2str(tmp);

      return res;
    },
    base64ToHash(base) {
      var res = Neon.u.base642hex(base);

      return res;
    },

    GetAssetHoldersByContractHash(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {
            ContractHash: this.contractHash,
            Limit: this.resultsPerPage,
            Skip: skip,
            balance:1,
          },
          method: "GetAssetHoldersByContractHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.tableData = res["data"]["result"]["result"];
        // console.log(this.tableData)
        this.totalCount = res["data"]["result"]["totalCount"];
        this.countPage = Math.ceil(this.totalCount / this.resultsPerPage);
        this.isLoading = false;
      });
    },
  },
};
</script>
<style></style>
