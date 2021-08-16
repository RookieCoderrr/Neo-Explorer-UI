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
                <div class="row">
                  <div class="col-10">
                    <h1 class="mb-0">{{ this.contract_info["name"] }}</h1>
                  </div>
                  <div
                      v-if="this.isAddress"
                      class="col-2"
                  >
                    <button
                        class="btn btn-primary btn-xs"
                        @click="getAddress(this.contract_id)"
                    >
                      {{$t('contract.viewAsAddr')}}
                    </button>
                  </div>
                </div>
                <span class="text-muted" id="contract">{{ this.contract_info["hash"] }}</span>
                <i class="ni ni-single-copy-04" id="contractButton" title="Copy to Clipboard" style="padding-left: 5px; color: black; cursor: pointer;"  @click="copyItem('contract','contractButton','contractSpan')"></i>
                <span  style="color: #42b983"  id="contractSpan" ></span>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-4">
                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="row">
                          <div class="font-weight-bold mb-0 ml-3">
                            {{ $t("contract.creator") }}
                          </div>
                          <div
                              v-if="this.contract_info['sender'] !== null"
                              class="col-1 text-right"
                          >
                            <button
                                class="btn btn-sm btn-primary"
                                @click="changeFormat(button)"
                            >
                              {{ this.button.buttonName }}
                            </button>
                          </div>
                        </div>
                        <div class="panel-body">
                          <span v-if="this.contract_info['sender'] === null">
                            {{$t("contract.available") }}
                          </span>
                          <router-link
                            class="text"
                            v-else-if="button.state"
                            style="cursor: pointer"
                            :to="'/accountprofile/'+ addressToScriptHash(contract_info['sender'])"
                            >{{ this.contract_info["sender"] }}</router-link
                          >
                          <router-link
                            class="text"
                            v-else
                            style="cursor: pointer"
                            :to="'/accountprofile/'+ addressToScriptHash(contract_info['sender'])"
                            >{{
                              addressToScriptHash(this.contract_info["sender"])
                            }}</router-link
                          >
                        </div>
                      </div>
                    </card>
                  </div>
                  <div class="col-4">
                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="font-weight-bold mb-0">
                          {{ $t("contract.time") }}
                        </div>
                        <div class="panel-body">
                          {{ convertPreciseTime(this.contract_info["createtime"]) }}
                        </div>
                      </div>
                    </card>
                  </div>
                  <div class="col-4">
                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="font-weight-bold mb-0">
                          {{ $t("contract.update") }}
                        </div>
                        <div class="panel-body">
                          {{ this.contract_info["updatecounter"] }}
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
                          {{ $t("contract.index") }}
                        </div>
                        <div class="panel-body">
                          {{ this.contract_info["id"] }}
                        </div>
                      </div>
                    </card>
                  </div>
                  <div class="col-4">
                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="font-weight-bold mb-0">
                          {{ $t("contract.compiler") }}
                        </div>
                        <div class="panel-body">
                          {{ this.nef["compiler"] }}
                        </div>
                      </div>
                    </card>
                  </div>
                  <div class="col-4">
                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="font-weight-bold mb-0">
                          {{ $t("contract.txns") }}
                        </div>
                        <div class="panel-body">
                          {{ this.contract_info["totalsccall"] }}
                        </div>
                      </div>
                    </card>
                  </div>
                </div>
                <div class="row mt-3"></div>
              </div>
              <tabs fill class="flex-column flex-md-row">
                <tab-pane
                  icon="ni ni-folder-17"
                  :title="$t('contract.scCallTitle')"
                >
                  <div v-if="this.totalsccall != 0">
                    <sc-call-table :contract-hash="contract_id"></sc-call-table>
                  </div>
                  <card shadow v-else class="text-center">{{
                    $t("contract.noScCall")
                  }}</card>
                </tab-pane>
                <tab-pane
                  icon="ni ni-active-40"
                  :title="$t('contract.eventTitle')"
                >
                  <div v-if="this.totalsccall != 0">
                    <events-table :contractHash="contract_id"></events-table>
                  </div>
                  <card shadow v-else class="text-center">{{
                    $t("contract.noEvent")
                  }}</card>
                </tab-pane>
                <tab-pane
                  icon="ni ni-collection"
                  :title="$t('contract.conInfo')"
                >
                  <card shadow type="secondary">
                    <div class="extra" v-if="this.manifest.extra && JSON.stringify(this.manifest.extra) !== '{}'">
                      <h3 class="mt-2">{{ $t("tokenInfo.extra") }}</h3>
                      <card shadow>
                        <div class="row">
                          <div class="col-auto">
                            {{ $t("tokenInfo.email") }}:
                            <a :href="'mailto:' + manifest.extra['Email']">
                              {{ this.manifest.extra["Email"] }}
                            </a>
                          </div>
                          <div class="col-auto">
                            {{ $t("tokenInfo.author") }} :
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
                                <div class="text-muted">{{$t('tokenInfo.params')}}</div>
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
                              {{$t('tokenInfo.query')}}
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
                          <div v-else-if="manifest['abi']['methods'][index]['result'] && manifest['abi']['methods'][index]['result'] !== ''">
                            <h3>{{$t('tokenInfo.response')}}</h3>
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
import EventsTable from "./Tables/EventsTable";
import ScCallTable from "./Tables/ScCallTable";
import Neon from "@cityofzion/neon-js";
import JsonView from "./Tables/JsonView";
import {addressToScriptHash, convertPreciseTime, changeFormat, responseConverter, RPC_NODE, copyItem} from "../store/util";

export default {
  components: {
    Loading,
    EventsTable,
    ScCallTable,
    JsonView,
  },
  data() {
    return {
      contract_id: this.$route.params.hash,
      isLoading: true,
      contract_info: [],
      nef: "",
      manifest: "",
      button: {state: true, buttonName: "Hash"},
      totalsccall: 0,
      isAddress: false,
    };
  },
  created() {
    this.getContract(this.contract_id);
  },
  watch: {
    $route: "watchrouter",
  },
  methods: {
    addressToScriptHash,
    convertPreciseTime,
    changeFormat,
    copyItem,
    watchrouter() {
      this.isLoading = true
      if (this.$route.name === "contractinfo") {
        this.contract_id = this.$route.params.hash;
        this.getContract(this.contract_id);
      }
    },
    getContract(contract_id) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { ContractHash: contract_id },
          method: "GetContractByContractHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        const raw = res["data"]["result"];
        this.nef = JSON.parse(raw["nef"]);
        this.manifest = JSON.parse(raw["manifest"]);
        console.log(this.manifest);
        this.contract_info = raw;
        this.totalsccall = this.contract_info["totalsccall"];
        this.testAddress(contract_id);
        this.isLoading = false;
      });
    },
    testAddress(addr) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          method: "GetAddressByAddress",
          params: { Address: addr },
          id: 1,
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: "true",
          crossDomain: "true",
        },
      }).then((res) => {
        if (res["data"]["error"] == null)
          this.isAddress = true;
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
        .invokeFunction(this.contract_id, name, contractParams)
        .then((res) => {
          if(res["exception"] != null) {
            this.manifest["abi"]["methods"][index]["error"] = res["exception"];
          } else {
            this.manifest["abi"]["methods"][index]["result"] = JSON.parse(
              JSON.stringify(res["stack"], responseConverter)
            );
          }
        })
        .catch((err) => {
          this.manifest["abi"]["methods"][index]["error"] = err.toString();
        });
    },
  },
};
</script>

<style>
</style>
