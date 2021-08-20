<template>
  <div>
    <div class="container-fluid mt--7"  style="background-color: #F2F2F2" >
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
                <div class="row">
                  <div class="col-10">
                    <h1 v-if="this.token_info.ispopular" class="mb-0">
                      {{ this.token_info["tokenname"] }} &#x1F525;
                      <button
                          class="btn btn-primary btn-sm"
                          @click="getContract(this.token_info['hash'])"
                      >
                        Contract
                      </button>
                    </h1>
                    <h1 v-else class="mb-0">{{ this.token_info["tokenname"] }}
                      <button
                          class="btn btn-primary btn-sm"
                          @click="getContract(this.token_info['hash'])"
                      >
                        Contract
                      </button>
                    </h1>
                  </div>

                </div>
                <a
                  class="mb-0"
                  id="token"
                  style="cursor: pointer"
                  @click="getContract(this.token_info['hash'])"
                  >{{ this.token_info["hash"] }}</a
                >
                <i class="ni ni-single-copy-04" id="hashButton" title="Copy to Clipboard" style="padding-left: 5px; color: grey; cursor: pointer;"  @click="copyItem('token','hashButton','hashSpan')"></i>
                <span  style="color: #42b983"  id="hashSpan" ></span>
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
                              this.convertPreciseTime(
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
                    :contractHash="token_id"
                    :decimal="decimal == '' ? 0 : decimal"
                  ></tokens-tx-nep17>
                  <tokens-tx-nep11
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
                    <div class="extra" v-if="this.manifest.extra && JSON.stringify(this.manifest.extra) !== '{}'">
                      <h3 class="mt-2">{{ $t("tokenInfo.extra") }}</h3>
                      <card shadow>
                        <div class="row">
                          <div class="col-auto">
                            {{ $t("tokenInfo.email") }} :
                            <a :href="'mailto:' + manifest.extra['Email']">
                              {{ this.manifest.extra["Email"] }}
                            </a>
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
                              {{ $t("tokenInfo.query") }}
                            </button>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-4">
                            <div class="params">
                              <div class="text-muted">{{$t('tokenInfo.params')}}</div>
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
                                            style="border: 2px solid #676c6c; border-radius: 4px;"
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
                              <div v-else>{{$t('tokenInfo.noParam')}}</div>
                            </div>
                          </div>
                          <div class="col">
                            <div class="return">
                              <div class="text-muted">{{$t('tokenInfo.returnType')}}</div>
                              {{ item["returntype"] }}
                            </div>
                          </div>
                          <div class="col">
                            <div class="text-muted">{{$t('tokenInfo.offset')}}</div>
                            {{ item["offset"] }}
                          </div>
                          <div class="col">
                            <div class="text-muted">{{$t('tokenInfo.safe')}}</div>
                            {{ item["safe"] }}
                          </div>
                        </div>
                        <div
                            class="mt-3"
                        >
                          <div v-if="manifest['abi']['methods'][index]['error'] && manifest['abi']['methods'][index]['error'] !== ''">
                            <h3>{{$t('tokenInfo.error')}}</h3>
                            <div>{{manifest['abi']['methods'][index]['error']}}</div>
                          </div>
                          <div v-else-if="manifest['abi']['methods'][index]['raw'] && manifest['abi']['methods'][index]['raw'] !== ''">
                            <div class="row">
                              <h3 class="col-auto">{{$t('tokenInfo.response')}}</h3>
                              <div>
                                <button
                                    class="btn btn-sm btn-primary ml-2"
                                    @click="decode(index)"
                                >
                                  {{ manifest['abi']['methods'][index]['button'] }}
                                </button>
                              </div>
                            </div>
                            <json-view v-if="manifest['abi']['methods'][index]['isRaw']" :json="manifest['abi']['methods'][index]['raw']"></json-view>
                            <json-view v-else :json="manifest['abi']['methods'][index]['display']"></json-view>
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
import {convertPreciseTime, convertToken, responseConverter, RPC_NODE, copyItem} from "../store/util";

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
    convertPreciseTime,
    convertToken,
    copyItem,
    decode(index) {
      if (this.manifest["abi"]["methods"][index]["isRaw"]) {
        this.manifest["abi"]["methods"][index]["isRaw"] = false;
        this.manifest["abi"]["methods"][index]["button"] = "Raw";
      } else {
        this.manifest["abi"]["methods"][index]["isRaw"] = true;
        this.manifest["abi"]["methods"][index]["button"] = "Decode";
      }
    },
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
      const client = Neon.create.rpcClient(RPC_NODE);
      client
        .invokeFunction(this.token_id, name, contractParams)
        .then((res) => {
          if (res["exception"] != null) {
            this.manifest["abi"]["methods"][index]["error"] = res["exception"];
          } else {
            const temp = JSON.parse(JSON.stringify(res["stack"]));
            this.manifest["abi"]["methods"][index]["isRaw"] = true;
            this.manifest["abi"]["methods"][index]["button"] = "Decode";
            this.manifest["abi"]["methods"][index]["raw"] = res["stack"];
            this.manifest["abi"]["methods"][index]["display"] = JSON.parse( JSON.stringify(temp, responseConverter));
          }
        })
        .catch((err) => {
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
