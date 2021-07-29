<template>
  <div>
    <div class="container-fluid mt--9">
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
                <a
                  class="mb-0"
                  style="cursor: pointer"
                  @click="getContract(this.token_info['hash'])"
                  >{{ this.token_info["hash"] }}</a
                >
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-2">
                    <div class="text-muted">Token Symbol</div>
                  </div>
                  <div class="col-3">
                    <h3>{{ this.token_info["symbol"] }}</h3>
                  </div>
                  <div class="col-2">
                    <div class="text-muted">Supported Standard</div>
                  </div>
                  <div class="col-3">
                    <h3>{{ this.token_info["standard"] }}</h3>
                  </div>
                </div>
                <div class="row mt-5"></div>
                <div class="row">
                  <div class="col-2">
                    <div class="text-muted">Decimal</div>
                  </div>
                  <div class="col-3">
                    <h3>{{ this.token_info["decimals"] }}</h3>
                  </div>
                  <div class="col-2">
                    <div class="text-muted">Total Supply</div>
                  </div>
                  <div class="col-3"><h3>{{ convertToken(this.token_info["totalsupply"], this.decimal) }}</h3></div>
                </div>
                <div class="row mt-5"></div>
                <div class="row">
                  <div class="col-2">
                    <div class="text-muted">Total Holders</div>
                  </div>
                  <div class="col-3">
                    <h3>{{ this.token_info["total_holders"] }}</h3>
                  </div>
                  <div class="col-2">
                    <div class="text-muted">First Transferred</div>
                  </div>
                  <div class="col-3">
                    <h3>{{ this.token_info["firsttransfertime"] }}</h3>
                  </div>
                </div>
              </div>
              <tabs fill class="flex-column flex-md-row">
                <tab-pane icon="ni ni-money-coins" title="Recent Transactions">
                  <tokens-tx-nep17 v-if="standard===1" :contractHash="token_id" :decimal="decimal"></tokens-tx-nep17>
                  <tokens-tx-nep11 v-else-if="standard===2" :contractHash="token_id" :decimal="decimal"></tokens-tx-nep11>
                </tab-pane>
                <tab-pane icon="ni ni-single-02 mr-2" title="Top Holders">
                  <token-holder v-if="standard===1" :contract-hash="token_id" :decimal="decimal"></token-holder>
                  <token-holder11 v-else-if="standard===2" :contract-hash="token_id" :decimal="decimal"></token-holder11>
                </tab-pane>
                <tab-pane icon="ni ni-collection" title="Contract Info">
                  <card shadow type="secondary">
                    <div class="extra" v-if="this.manifest.extra">
                      <h3 class="mt-2">Extras</h3>
                      <card shadow>
                        <div class="row">
                          <div class="col-auto">
                            Email : {{ this.manifest.extra["Email"] }}
                          </div>
                          <div class="col-auto">
                            Author : {{ this.manifest.extra["Author"] }}
                          </div>
                          <div class="col-auto">
                            Description :
                            {{ this.manifest.extra["Description"] }}
                          </div>
                        </div>
                      </card>
                    </div>
                    <div class="abi" v-if="this.manifest.abi">
                      <div
                        class="events"
                        v-if="this.manifest.abi.events.length !== 0"
                      >
                        <h3 class="mt-2">Events</h3>
                        <card
                          shadow
                          v-for="(item, index) in this.manifest['abi'][
                            'events'
                          ]"
                          :key="index"
                        >
                          <h3 class="method-name">{{ item["name"] }}</h3>
                          <div class="row">
                            <div class="col">
                              <div class="params">
                                <div class="text-muted">parameters:</div>
                                <div v-if="item['parameters'].length !== 0">
                                  <li
                                    v-for="(param, ind) in item['parameters']"
                                    :key="ind"
                                  >
                                    {{ param["name"] }}: {{ param["type"] }}
                                  </li>
                                </div>
                                <div v-else>null</div>
                              </div>
                            </div>
                          </div>
                        </card>
                      </div>
                      <h3 class="mt-2">Methods</h3>
                      <card
                        shadow
                        v-for="(item, index) in this.manifest['abi']['methods']"
                        :key="index"
                      >
                        <h3 class="method-name">{{ item["name"] }}</h3>
                        <div class="row">
                          <div class="col">
                            <div class="params">
                              <div class="text-muted">parameters:</div>
                              <div v-if="item['parameters'].length !== 0">
                                <li
                                  v-for="(param, ind) in item['parameters']"
                                  :key="ind"
                                >
                                  {{ param["name"] }}: {{ param["type"] }}
                                </li>
                              </div>
                              <div v-else>null</div>
                            </div>
                          </div>
                          <div class="col">
                            <div class="return">
                              <div class="text-muted">return type:</div>
                              {{ item["returntype"] }}
                            </div>
                          </div>
                          <div class="col">
                            <div class="text-muted">offset:</div>
                            {{ item["offset"] }}
                          </div>
                          <div class="col">
                            <div class="text-muted">safe:</div>
                            {{ item["safe"] }}
                          </div>
                        </div>
                      </card>
                    </div>
                  </card>
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
import TokenHolder from "./Tables/TokenHolder";
import TokenHolder11 from "./Tables/TokenHolder11";

export default {
  components: {
    TokensTxNep17,
    TokensTxNep11,
    TokenHolder,
    TokenHolder11,
    Loading,
  },
  data() {
    return {
      token_id: this.$route.params.hash,
      isLoading: true,
      token_info: [],
      standard: 0,
      manifest: "",
      decimal: "",
    };
  },
  created() {
    this.getToken(this.token_id);
    this.getContractManifest(this.token_id);
  },
  methods: {
    getContract(hash) {
      this.$router.push(`/contractinfo/${hash}`);
    },
    convertToken(val, decimal) {
      return val * Math.pow(10, -decimal);
    },
    getToken(token_id){
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { ContractHash: token_id },
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
        this.decimal = raw["decimals"];
        this.token_info = raw;
        this.isLoading = false;
      });
    },
    getContractManifest(token_id) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { Hash: token_id },
          method: "GetContractInfoByContractHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.manifest = JSON.parse(res["data"]["result"]["manifest"]);
      });
    },
  },
};
</script>

<style></style>
