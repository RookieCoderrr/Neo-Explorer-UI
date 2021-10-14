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




              <div class="row info mt-3 mb-1">
                <div class="col-md-3 lable-title">
                  {{ $t("nftInfo.tokenId") }}
                </div>
                <div class="col-md-9 context-black">
                  {{ this.token_info["tokenid"] }}
                </div>
              </div>


              <div class="row info mt-3 mb-1">
                <div class="col-md-3 lable-title">
                  {{ $t("nftInfo.contract") }}
                </div>
                <div class="col-md-9 context-black">
                  {{ this.token_info["asset"] }}
                </div>
              </div>

              <div class="row info mt-3 mb-1">
                <div class="col-md-3 lable-title">
                  {{ $t("nftInfo.address") }}
                </div>
                <div class="col-md-9 context-black">
                  {{
                    this.token_info["address"]
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
              <el-tab-pane :label="$t('tokenInfo.transactions')" name="first">
                <tokens-tx-nep11
                  :contract-hash="contractHash"
                  :token-id="token_id"
                  :decimal="decimal == '' ? 0 : decimal"
                ></tokens-tx-nep11>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div style="margin-top: 30px;margin-bottom: 20px">

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

import Neon from "@cityofzion/neon-js";
import TokensTxNep11 from "./TokenTxNep11";

export default {
  components: {
    TokensTxNep11,

    Loading,
  },
  data() {
    return {
      token_id: this.$route.params.tokenId,
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
    window.scroll(0,0);

    this.GetNep11BalanceByContractHashAddressTokenId(this.contractHash,this.hashToBase64(this.token_id),this.address)

    // console.log(this.contractHash)
    // console.log(this.token_id)
    // console.log(this.address)

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
      if (this.$route.name === "NFTinfo") {
        this.token_id= this.$route.params.tokenId;
        this.contractHash=this.$route.params.contractHash;
        this.address=this.$route.params.address;
        this.GetNep11BalanceByContractHashAddressTokenId(this.contractHash,this.hashToBase64(this.token_id),this.address)

      }
    },
    getContract(hash) {
      this.$router.push(`/contractinfo/${hash}`);
    },

    hashToBase64(hash){
      var res = Neon.u.hex2base64(hash);
      return res;
    },
    base64ToHash(base) {
      var res = Neon.u.base642hex(base);

      return res;
    },

    GetNep11BalanceByContractHashAddressTokenId(contract_hash,token_id,address) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { ContractHash:contract_hash,TokenId:token_id,Address:address },
          method: "GetNep11BalanceByContractHashAddressTokenId",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.token_info = res["data"]["result"];
        // console.log(this.tableData)
        this.isLoading = false;
      });
    },


  },
};
</script>

<style>
@media screen and (max-width: 790px ){
  .info{
    margin-top:1.5rem!important;
    margin-bottom:1.5rem!important; ;
  }

}
</style>
