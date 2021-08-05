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
                  <div class="col-11">
                    <h1 class="mb-0">{{ this.contract_info["name"] }}</h1>
                  </div>
                  <div v-if="this.contract_info['sender'] !== null" class="col-1">
                    <button  class="btn btn-primary btn-xs" @click="changeFormat()">{{this.buttonName}}</button>
                  </div>
                </div>
                <h4 class="text-muted">{{ this.contract_info["hash"] }}</h4>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-4">
                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="font-weight-bold mb-0">Creator</div>
                        <div class="panel-body">
                          <span  v-if="this.contract_info['sender'] === null">Not Available</span>
                          <a  v-else-if="this.state" style="cursor: pointer" @click="getSender(contract_info['sender'])">{{this.contract_info["sender"]}}</a>
                          <a  v-else style="cursor: pointer" @click="getSender(contract_info['sender'])">{{addressToScriptHash(this.contract_info["sender"])}}</a>
                        </div>
                      </div>
                    </card>
                  </div>
                  <div class="col-4">
                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="font-weight-bold mb-0">Created</div>
                        <div class="panel-body">
                          {{convertTime(this.contract_info["createtime"])}}
                        </div>
                      </div>
                    </card>
                  </div>
                  <div class="col-4">
                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="font-weight-bold mb-0">Updates</div>
                        <div class="panel-body">
                          {{this.contract_info["updatecounter"]}}
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
                        <div class="font-weight-bold mb-0">ID</div>
                        <div class="panel-body">
                          {{this.contract_info["id"]}}
                        </div>
                      </div>
                    </card>
                  </div>
                  <div class="col-4">
                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="font-weight-bold mb-0">Compiler</div>
                        <div class="panel-body">
                          {{this.nef["compiler"]}}
                        </div>
                      </div>
                    </card>
                  </div>
                  <div class="col-4">
                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="font-weight-bold mb-0">Transactions</div>
                        <div class="panel-body">
                          {{this.contract_info["totalsccall"]}}
                        </div>
                      </div>
                    </card>
                  </div>
                </div>
                <div class="row mt-3"></div>
              </div>
              <tabs fill class="flex-column flex-md-row">
                <tab-pane icon="ni ni-folder-17" title="Recent ScCalls">
                  <div v-if="this.totalsccall != 0">
                    <sc-call-table :contract-hash="contract_id"></sc-call-table>
                  </div>
                  <card shadow v-else class="text-center ">This Contract has no System Calls.</card>
                </tab-pane>
                <tab-pane icon="ni ni-active-40" title="Recent Events">
                  <div v-if="this.totalsccall != 0">
                    <events-table :contractHash="contract_id"></events-table>
                  </div>
                  <card shadow v-else class="text-center ">This Contract has no events.</card>
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
// import { format } from "timeago.js";
import EventsTable from "./Tables/EventsTable";
import ScCallTable from "./Tables/ScCallTable";
import Neon from "@cityofzion/neon-js";

export default {
  components: {
    Loading,
    EventsTable,
    ScCallTable,
  },
  data() {
    return {
      contract_id: this.$route.params.hash,
      isLoading: true,
      contract_info: [],
      nef: "",
      manifest: "",
      state: true,
      buttonName:"Hash",
      totalsccall:0
    };
  },
  created() {
    this.getContract(this.contract_id);
  },
  watch:{
    $route:'watchrouter'
  },
  methods: {
    watchrouter() {//如果路由有变化，执行的对应的动
      if( this.$route.name === 'contractinfo'){
      this.contract_id = this.$route.params.hash
      this.getContract(this.contract_id);
      }
    },
    convertTime(time) {
      var date = new Date(time);
      var y = date.getFullYear()
      var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      var d = (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate())
      var h = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()
      var mi = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
      var s = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds()
      return m + '-' + d + '-' + y + ' ' + h + ':' + mi + ':' + s + ' +' + "UTC";
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
        this.contract_info = raw;
        this.totalsccall=this.contract_info["totalsccall"]
        this.isLoading = false;
      });
    },
    addressToScriptHash(addr) {
      const acc = Neon.create.account(addr);
      return "0x" + acc.scriptHash;
    },
    changeFormat() {
      if (this.state === true) {
        this.state = false;
        this.buttonName = "WIF";
      } else {
        this.state = true;
        this.buttonName = "Hash";
      }
    },
    getSender(addr) {
      this.$router.push({
        path: `/accountprofile/${this.addressToScriptHash(addr)}`
      });
    },
  },
};
</script>

<style></style>
