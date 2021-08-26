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
            <div class="row mt-3 mb-5 title1">{{ $t("tokenDetail") }}</div>
            <div class="row mt-3 mb-3 title2">{{ $t("overview") }}</div>
            <div class="row mt-3"></div>

            <card shadow class="card-style">
              <div class="row">
                <div class="col-2 lable-title">
                  {{ $t("tokenInfo.name") }}
                </div>
                <div class="col-8 context-black">
                  <div v-if="this.token_info.ispopular">
                    {{ this.token_info["tokenname"] }} &#x1F525;
                  </div>
                  <div v-else>{{ this.token_info["tokenname"] }}</div>
                </div>
                <div class="col-2">
                  <el-button type="primary" size="small" style="height: 25px; margin-left: 60px" @click="getContract(this.token_info['hash'])">
                    Contract</el-button>
                </div>
              </div>

              <div class="row mt-3 mb-1">
                <div class="col-2 lable-title">
                  {{ $t("hash") }}
                </div>
                <div class="col-10 context-black" id="token">
                  {{ this.token_info["hash"] }}

                  <i
                    class="ni ni-single-copy-04"
                    id="hashButton"
                    title="Copy to Clipboard"
                    style="padding-left: 5px; color: grey; cursor: pointer"
                    @click="copyItem('token', 'hashButton', 'hashSpan')"
                  ></i>
                  <span style="color: #42b983" id="hashSpan"></span>
                </div>
              </div>

              <div class="row mt-3 mb-1">
                <div class="col-2 lable-title">
                  {{ $t("tokenInfo.symbol") }}
                </div>
                <div class="col-10 context-black">
                  {{ this.token_info["symbol"] }}
                </div>
              </div>

              <div class="row mt-3 mb-1">
                <div class="col-2 lable-title">
                  {{ $t("tokenInfo.decimal") }}
                </div>
                <div class="col-10 context-black">
                  {{ this.token_info["decimals"] }}
                </div>
              </div>

              <div class="row mt-3 mb-1">
                <div class="col-2 lable-title">
                  {{ $t("tokenInfo.standard") }}
                </div>
                <div class="col-10 context-black">
                  {{ $t("tokenInfo.standard") }}
                  {{ this.token_info["type"] }}
                </div>
              </div>

              <div class="row mt-3 mb-1">
                <div class="col-2 lable-title">
                  {{ $t("tokenInfo.transferred") }}
                </div>
                <div class="col-10 context-black">
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
                <div class="col-2 lable-title">
                  {{ $t("tokenInfo.supply") }}
                </div>
                <div class="col-10 context-black">
                  {{
                    convertToken(this.token_info["totalsupply"], this.decimal)
                  }}
                </div>
              </div>

              <div class="row mt-3 mb-1">
                <div class="col-2 lable-title">
                  {{ $t("tokenInfo.holders") }}
                </div>
                <div class="col-10 context-black">
                  {{ this.token_info["holders"] }}
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
              <el-tab-pane
                :label="$t('tokenInfo.recentTransfers')"
                name="first"
              >
                <tokens-tx-nep17
                  :contractHash="token_id"
                  :decimal="decimal == '' ? 0 : decimal"
                ></tokens-tx-nep17>
                <tokens-tx-nep11
                  :contractHash="token_id"
                  :decimal="decimal == '' ? 0 : decimal"
                ></tokens-tx-nep11>
              </el-tab-pane>
              <el-tab-pane :label="$t('tokenInfo.topHolders')" name="second">
                <token-holder
                  :contract-hash="token_id"
                  :decimal="decimal == '' ? 0 : decimal"
                ></token-holder>
              </el-tab-pane>
              <el-tab-pane :label="$t('tokenInfo.contractInfo')" name="third">
                <div
                  class="extra"
                  v-if="
                    this.manifest.extra &&
                    JSON.stringify(this.manifest.extra) !== '{}'
                  "
                >
                  <div class="mt-2 mb-3 title4">
                    {{ $t("tokenInfo.extra") }}
                  </div>
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
                    <div class="mt-2 mb-3 title4">
                      {{ $t("tokenInfo.events") }}
                    </div>

                    <el-collapse v-model="activeNames"
                                 v-for="(item, index) in this.manifest['abi']['events']"
                                 :key="index"
                                 :name="index"
                                 style="border: white;">

                      <el-collapse-item    :title="item['name']"  style="margin-bottom: 20px" >
                        <div class="row">
                          <div class="col">
                            <div class="params">
                              <div class="event_parameters">{{$t('tokenInfo.params')}}</div>
                              <div v-if="item['parameters'].length !== 0">
                                <div v-for="(param, ind) in item['parameters']"
                                     :key="ind"  class="row  mt-3  mb-1">
                                  <div class="col-2 event_param" >
                                    {{ param["name"] }}:
                                  </div>
                                  <div class="col-9 context-black">
                                    {{ param["type"] }}
                                  </div>

                                </div>
                              </div>
                              <div v-else>null</div>
                            </div>
                          </div>
                        </div>
                      </el-collapse-item>

                    </el-collapse>
                  </div>
                  <div class="mt-4 mb-3 title4">
                    {{ $t("tokenInfo.methods") }}
                  </div>

                  <el-collapse v-model="activeNames2"
                               v-for="(item, index) in this.manifest['abi']['methods']"
                               :key="index"
                               :name="index"
                               style="border: white;"
                  >
                    <el-collapse-item :title="item['name']" style="margin-bottom: 20px">
                      <div class="row">
                        <div style="margin-left: 4%" v-if="item['safe']">
                          <button
                                  class="btn btn-sm btn-primary"
                                  @click="onQuery(index)"
                          >
                            {{$t('tokenInfo.query')}}
                          </button>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-4" style="margin-left: 3%">
                          <div class="params">
                            <div class="text-muted">{{$t('tokenInfo.params')}}</div>
                            <div v-if="item['parameters'].length !== 0">
                              <div v-if="item['safe']">
                                <div v-for="(param, ind) in item['parameters']"
                                     :key="ind">
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
                        <div class="col-3">
                          <div class="return">
                            <div class="text-muted">{{$t('tokenInfo.returnType')}}</div>
                            {{ item["returntype"] }}
                          </div>
                        </div>
                        <div class="col-3">
                          <div class="text-muted">{{$t('tokenInfo.offset')}}</div>
                          {{ item["offset"] }}
                        </div>
                        <div class="col">
                          <div class="text-muted">{{$t('tokenInfo.safe')}}</div>
                          {{ item["safe"] }}
                        </div>
                      </div>
                      <div
                              class="mt-3 ml-4"
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
                          <contract-json-view v-if="manifest['abi']['methods'][index]['isRaw']" :json="manifest['abi']['methods'][index]['raw']"></contract-json-view>
                          <contract-json-view v-else :json="manifest['abi']['methods'][index]['display']"></contract-json-view>
                        </div>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </div>
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
import TokensTxNep17 from "./TokenTxNep17";
import TokensTxNep11 from "./TokenTxNep11";
import TokenHolder from "./TokenHolder";
import ContractJsonView from "../Contract/ContractJsonView";
import Neon from "@cityofzion/neon-js";
import {
  convertPreciseTime,
  convertToken,
  responseConverter,
  RPC_NODE,
  copyItem,
} from "../../store/util";

export default {
  components: {
    ContractJsonView,
    TokensTxNep17,
    TokensTxNep11,
    TokenHolder,
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
      activeName: "first",
      activeNames: ['0'],
      activeNames2:['0'],
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
            this.manifest["abi"]["methods"][index]["display"] = JSON.parse(
              JSON.stringify(temp, responseConverter)
            );
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

<style>

  .el-collapse-item__header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 70px;
    line-height: 48px;
    background-color: #FFF;
    color: #000000;
    mix-blend-mode: normal;
    cursor: pointer;
    border-bottom: 0px!important;
    font-family: Inter,sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    padding-left: 30px;
    -webkit-transition: border-bottom-color .3s;
    transition: border-bottom-color .3s;
    outline: 0;
  }

</style>
