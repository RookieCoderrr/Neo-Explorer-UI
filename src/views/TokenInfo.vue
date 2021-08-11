<template>
  <div>
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
                <h1 v-if="this.token_info.ispopular" class="mb-0">
                  {{ this.token_info["tokenname"] }} &#x1F525;
                </h1>
                <h1 v-else class="mb-0">{{ this.token_info["tokenname"] }}</h1>
                <a
                  class="mb-0"
                  style="cursor: pointer"
                  @click="getContract(this.token_info['hash'])"
                  >{{ this.token_info["hash"] }}</a
                >
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-4">
                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="font-weight-bold mb-0">
                          {{ $t("tokenInfo.symbol") }}
                        </div>
                        <div class="panel-body">
                          {{ this.token_info["symbol"] }}
                        </div>
                      </div>
                    </card>
                  </div>
                  <div class="col-4">
                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="font-weight-bold mb-0">
                          {{ $t("tokenInfo.decimal") }}
                        </div>
                        <div class="panel-body">
                          {{ this.token_info["decimals"] }}
                        </div>
                      </div>
                    </card>
                  </div>
                  <div class="col-4">
                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="font-weight-bold mb-0">
                          {{ $t("tokenInfo.standard") }}
                        </div>
                        <div class="panel-body">
                          {{ this.token_info["type"] }}
                        </div>
                      </div>
                    </card>
                  </div>
                </div>
                <div class="row mt-3"></div>
                <div class="row">
                  <div class="col-4">
                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="font-weight-bold mb-0">
                          {{ $t("tokenInfo.transferred") }}
                        </div>
                        <div class="panel-body">
                          <div v-if="this.token_info.firsttransfertime">
                            {{
                              this.convertTime(
                                this.token_info["firsttransfertime"]
                              )
                            }}
                          </div>
                        </div>
                      </div>
                    </card>
                  </div>
                  <div class="col-4">
                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="font-weight-bold mb-0">
                          {{ $t("tokenInfo.supply") }}
                        </div>
                        <div class="panel-body">
                          {{
                            convertToken(
                              this.token_info["totalsupply"],
                              this.decimal
                            )
                          }}
                        </div>
                      </div>
                    </card>
                  </div>
                  <div class="col-4">
                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="font-weight-bold mb-0">
                          {{ $t("tokenInfo.holders") }}
                        </div>
                        <div class="panel-body">
                          {{ this.token_info["holders"] }}
                        </div>
                      </div>
                    </card>
                  </div>
                </div>

                <div class="row mt-3"></div>
              </div>
              <tabs fill class="flex-column flex-md-row">
                <tab-pane
                  icon="ni ni-diamond"
                  :title="$t('tokenInfo.recentTransfers')"
                >
                  <tokens-tx-nep17
                    v-if="standard === 1"
                    :contractHash="token_id"
                    :decimal="decimal == '' ? 0 : decimal"
                  ></tokens-tx-nep17>
                  <tokens-tx-nep11
                    v-else-if="standard === 2"
                    :contractHash="token_id"
                    :decimal="decimal == '' ? 0 : decimal"
                  ></tokens-tx-nep11>
                </tab-pane>
                <tab-pane
                  icon="ni ni-single-02 mr-2"
                  :title="$t('tokenInfo.topHolders')"
                >
                  <token-holder
                    :contract-hash="token_id"
                    :decimal="decimal == '' ? 0 : decimal"
                  ></token-holder>
                </tab-pane>
                <tab-pane
                  icon="ni ni-collection"
                  :title="$t('tokenInfo.contractInfo')"
                >
                  <card shadow type="secondary">
                    <div class="extra" v-if="this.manifest.extra">
                      <h3 class="mt-2">{{ $t("tokenInfo.extra") }}</h3>
                      <card shadow>
                        <div class="row">
                          <div class="col-auto">
                            {{ $t("tokenInfo.email") }} :
                            {{ this.manifest.extra["Email"] }}
                          </div>
                          <div class="col-auto">
                            {{ $t("tokenInfo.author") }}:
                            {{ this.manifest.extra["Author"] }}
                          </div>
                          <div class="col-auto">
                            {{ $t("tokenInfo.description") }} :
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
                        <h3 class="mt-2">{{ $t("tokenInfo.events") }}</h3>
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
                      <h3 class="mt-2">{{ $t("tokenInfo.methods") }}</h3>
                      <card
                          shadow
                          v-for="(item, index) in this.manifest['abi']['methods']"
                          :key="index"
                      >
                        <div class="row">
                          <h3 class="col-auto">{{ item["name"] }}</h3>
                          <div style="padding-left: 5px" v-if="item['safe']">
                            <button
                                class="btn btn-sm btn-primary"
                                @click="onQuery(index)"
                            >
                              Query
                            </button>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-4">
                            <div class="params">
                              <div class="text-muted">parameters:</div>
                              <div v-if="item['parameters'].length !== 0">
                                <div v-if="item['safe']">
                                  <div
                                      v-for="(param, ind) in item['parameters']"
                                      :key="ind"
                                  >

                                    <li>
                                      {{ param["name"] }}: {{ param["type"] }}
                                      <div>
                                        <input
                                            type="text"
                                            class="over-ellipsis input-param"
                                            v-model="
                                            manifest['abi']['methods'][index][
                                              'parameters'
                                            ][ind].value
                                          "
                                        />
                                      </div>
                                    </li>
                                  </div>
                                </div>
                                <div v-else>
                                  <li
                                      v-for="(param, ind) in item['parameters']"
                                      :key="ind"
                                  >
                                    {{ param["name"] }}: {{ param["type"] }}
                                  </li>
                                </div>
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
                        <div
                            class="mt-3"
                        >
                          <div v-if="manifest['abi']['methods'][index]['error'] && manifest['abi']['methods'][index]['error'] !== ''">
                            <h3>Error</h3>
                            <div>{{manifest['abi']['methods'][index]['error']}}</div>
                          </div>
                          <div v-else-if="manifest['abi']['methods'][index]['result'] && manifest['abi']['methods'][index]['result'] !== ''">
                            <h3>Response</h3>
                            <json-view  :json="manifest['abi']['methods'][index]['result']"></json-view>
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
import TokensTxNep17 from "./Tables/TokenTxNep17";
import TokensTxNep11 from "./Tables/TokenTxNep11";
import TokenHolder from "./Tables/TokenHolder";
import JsonView from "./Tables/JsonView";
import Neon from "@cityofzion/neon-js";

export default {
  components: {
    TokensTxNep17,
    TokensTxNep11,
    TokenHolder,
    Loading,
    JsonView,
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
  watch: {
    $route: "watchrouter",
  },
  methods: {
    watchrouter() {
      //如果路由有变化，执行的对应的动作
      if (this.$route.name === "tokeninfo") {
        this.token_id = this.$route.params.hash;
        this.getToken(this.$route.params.hash);
        this.getContractManifest(this.$route.params.hash);
      }
    },
    getContract(hash) {
      this.$router.push(`/contractinfo/${hash}`);
    },
    convertToken(val, decimal) {
      return val * Math.pow(10, -decimal);
    },
    convertTime(time) {
      var date = new Date(time);
      var y = date.getFullYear();
      var m =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var mi =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return (
        m + "-" + d + "-" + y + " " + h + ":" + mi + ":" + s + " +" + "UTC"
      );
    },
    getToken(token_id) {
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
        let raw = res["data"]["result"];
        this.standard = raw["type"] === "NEP17" ? 1 : 2;
        this.decimal = raw["decimals"];
        this.token_info = raw;
        this.isLoading = false;
      });
    },
    responseConverter(key, val) {
      if (typeof val === "object") {
        if (val["type"] === "ByteString" && typeof val["value"] === "string") {
          const buffer = Buffer.from(val["value"], "base64");
          const hex = buffer.toString("hex");
          if ( Neon.is.publicKey(hex)) {
            const acc = Neon.create.account(hex);
            val["value"] = "0x" + acc.scriptHash;
          } else {
            val["value"] = buffer.toString("utf-8");
          }
        }
      }
      return val;
    },
    onQuery(index) {
      this.manifest["abi"]["methods"][index]["result"] = "";
      this.manifest["abi"]["methods"][index]["error"] = "";
      const name = this.manifest["abi"]["methods"][index]["name"];
      const params = this.manifest["abi"]["methods"][index]["parameters"];
      const contractParams = [];
      for (const item of params) {
        try {
          let temp = Neon.create.contractParam(item["type"], item["value"]);
          contractParams.push(temp);
        } catch (err) {
          this.manifest["abi"]["methods"][index]["error"] = err.toString();
          return;
        }
      }
      const client = Neon.create.rpcClient("http://seed2t.neo.org:20332");
      console.log(contractParams);
      client
          .invokeFunction(this.contract_id, name, contractParams)
          .then((res) => {
            console.log(res);
            if(res["exception"] != null) {
              this.manifest["abi"]["methods"][index]["error"] = res["exception"];
            } else {
              this.manifest["abi"]["methods"][index]["result"] = JSON.parse(
                  JSON.stringify(res["stack"], this.responseConverter)
              );
            }
          })
          .catch((err) => {
            console.log(err);
            this.manifest["abi"]["methods"][index]["error"] = err.toString();
          });
    },
    getContractManifest(token_id) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { ContractHash: token_id },
          method: "GetContractByContractHash",
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
