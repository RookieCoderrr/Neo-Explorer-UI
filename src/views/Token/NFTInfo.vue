<template>
  <div>
    <div
      class="container-fluid mt--8"
      style="background-color: rgb(250, 250, 250)"
    >
      <div class="row">
        <div class="col">
          <div class="top">
            <loading
              :is-full-page="false"
              :opacity="0.9"
              :active="isLoading"
            ></loading>
            <div class="row mt-3 mb-5 title1">{{ $t("nftDetail") }}</div>
            <div class="row mt-3 mb-3 title2">{{ $t("overview") }}</div>
            <div class="row mt-3"></div>

            <card shadow class="card-style">




              <div class="row mt-3 mb-1">
                <div class="col-3 lable-title">
                  {{ $t("nftInfo.tokenId") }}
                </div>
                <div class="col-9 context-black">
                  {{ this.token_info["decimals"] }}
                </div>
              </div>


              <div class="row mt-3 mb-1">
                <div class="col-3 lable-title">
                  {{ $t("nftInfo.contract") }}
                </div>
                <div class="col-9 context-black">
                  <div v-if="this.token_info.firsttransfertime">
                    {{
                      this.convertPreciseTime(
                        this.token_info["firsttransfertime"]
                      )
                    }}
                  </div>
                </div>
              </div>

              <div class="row mt-3 mb-1">
                <div class="col-3 lable-title">
                  {{ $t("nftInfo.address") }}
                </div>
                <div class="col-9 context-black">
                  {{
                    convertToken(this.token_info["totalsupply"], this.decimal)
                  }}
                </div>
              </div>


            </card>

            <div class="row mt-5"></div>
            <el-tabs
              v-model="activeName"
              style="
                width: 80%;
                margin-left: 10%;
                background-color: rgb(250, 250, 250);
              "
            >
              <el-tab-pane :label="$t('tokenInfo.nftToken')" name="first">
                <nft-token
                  :contract-hash="token_id"
                  :decimal="decimal == '' ? 0 : decimal"
                ></nft-token>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import {
  convertPreciseTime,
  convertToken,

  copyItem,
} from "../../store/util";
import NftToken from "./NftTokens";

export default {
  components: {
    NftToken,

    Loading,
  },
  data() {
    return {
      tableData:[],
      token_id: this.$route.params.hash,
      contractHash:this.$route.params.contractHash,
      address:this.$route.params.address,
      isLoading: true,
      token_info: [],
      standard: 0,
      manifest: "",
      decimal: "",
      activeName: "first",
      activeNames: ['0'],
      activeNames2:['0'],
    };
  },
  created() {
    window.scroll(0,0)
    this.GetNep11BalanceByContractHashAddressTokenId(this.contractHash,this.token_id,this.address);

  },
  watch: {
    $route: "watchrouter",
  },
  methods: {
    convertPreciseTime,
    convertToken,
    copyItem,
    watchrouter() {
      //如果路由有变化，执行的对应的动作
      if (this.$route.name === "tokeninfo") {
        this.token_id = this.$route.params.hash;
        this.getToken(this.$route.params.hash);

      }
    },
    getContract(hash) {
      this.$router.push(`/contractinfo/${hash}`);
    },
    GetNep11BalanceByContractHashAddressTokenId(contract_hash,token_id,address) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { ContractHash: contract_hash,TokenId:token_id,Address:address },
          method: "GetNep11BalanceByContractHashAddressTokenId",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.tableData = res["data"]["result"];
        console.log(this.tableData)
        this.isLoading = false;
      });
    },


  },
};
</script>

<style>

</style>
