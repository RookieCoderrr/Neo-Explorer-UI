<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="top">
              <loading
                :is-full-page="false"
                :opacity="0.9"
                :active="isLoading"
              ></loading>
              <div class="card-header bg-transparent">
                <h1 class="mb-0">{{ this.token_info["tokenname"] }}</h1>
                <h4 class="text-muted">{{this.token_info["hash"]}}</h4>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-2">
                    <div class="text-muted">Token Symbol</div>
                  </div>
                  <div class="col-3"><h3>{{ this.token_info["symbol"] }}</h3></div>
                  <div class="col-2">
                    <div class="text-muted">Supported Standard</div>
                  </div>
                  <div class="col-3"><h3>{{ this.token_info["standard"] }}</h3></div>
                </div>
                <div class="row mt-5"></div>
                <div class="row">
                  <div class="col-2">
                    <div class="text-muted">Decimal</div>
                  </div>
                  <div class="col-3"><h3>{{ this.token_info["decimals"] }}</h3></div>
                  <div class="col-2">
                    <div class="text-muted">Total Supply</div>
                  </div>
                  <div class="col-3"><h3>{{ this.token_info["totalsupply"] }}</h3></div>
                </div>
                <div class="row mt-5"></div>
                <div class="row">
                  <div class="col-2">
                    <div class="text-muted">Total Holders</div>
                  </div>
                  <div class="col-3"><h3>{{ this.token_info["total_holders"] }}</h3></div>
                  <div class="col-2">
                    <div class="text-muted">First Transferred</div>
                  </div>
                  <div class="col-3"><h3>{{ this.token_info["firsttransfertime"] }}</h3></div>
                </div>
              </div>
              <tabs fill class="flex-column flex-md-row">
                <tab-pane icon="ni ni-money-coins" title="Recent Transactions">
                  <tokens-tx-nep17 v-if="standard===1" :contractHash="token_id"></tokens-tx-nep17>
                  <tokens-tx-nep11 v-else-if="standard===2"  :contractHash="token_id"></tokens-tx-nep11>
                </tab-pane>
                <tab-pane icon="ni ni-single-02 mr-2" title="Top Holders">
                  <p class="description">Cosby sweater eu banh mi, qui irure terry richardson ex
                    squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan
                    american apparel, butcher voluptate nisi qui.</p>
                </tab-pane>
                <tab-pane icon="ni ni-collection" title="Contract Info">
                  <p class="description">Raw denim you probably haven't heard of them jean shorts
                    Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache
                    cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro
                    keffiyeh dreamcatcher synth.</p>
                </tab-pane>
              </tabs>
            </div>
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
import { format } from "timeago.js";
import TokensTxNep17 from "./Tables/TokenTxNep17";
import TokensTxNep11 from "./Tables/TokenTxNep11";

export default {
  components: {
    TokensTxNep17,
    TokensTxNep11,
    Loading,
  },
  data() {
    return {
      token_id: "0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5",
      isLoading: true,
      token_info: [],
      standard: 0,
    };
  },
  created() {
    this.getToken(this.token_id);
  },
  methods: {
    getToken(token_id){
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {"ContractHash": token_id},
          method: "GetAssetInfoByContractHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        const raw = res["data"]["result"];
        raw["firsttransfertime"] = format(raw["firsttransfertime"]);
        this.standard = raw["standard"] === "NEP17" ? 1 : 2;
        this.token_info = raw;
        this.isLoading = false;
      });
    },
    onCopy(el) {
      var test = document.getElementById(el);
      test.select();
      document.execCommand("copy");
    },
  },
};
</script>

<style></style>
