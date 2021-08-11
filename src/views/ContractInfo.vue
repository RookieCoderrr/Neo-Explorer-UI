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
                  <div
                    v-if="this.contract_info['sender'] !== null"
                    class="col-1"
                  >
                    <button
                      class="btn btn-primary btn-xs"
                      @click="changeFormat()"
                    >
                      {{ this.buttonName }}
                    </button>
                  </div>
                </div>
                <h4 class="text-muted">{{ this.contract_info["hash"] }}</h4>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-4">
                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="font-weight-bold mb-0">
                          {{ $t("contract.creator") }}
                        </div>
                        <div class="panel-body">
                          <span v-if="this.contract_info['sender'] === null">{{
                            $t("contract.available")
                          }}</span>
                          <a
                            v-else-if="this.state"
                            style="cursor: pointer"
                            @click="getSender(contract_info['sender'])"
                            >{{ this.contract_info["sender"] }}</a
                          >
                          <a
                            v-else
                            style="cursor: pointer"
                            @click="getSender(contract_info['sender'])"
                            >{{
                              addressToScriptHash(this.contract_info["sender"])
                            }}</a
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
                          {{ convertTime(this.contract_info["createtime"]) }}
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
                    <div class="extra" v-if="this.manifest.extra">
                      <h3 class="mt-2">{{ $t("tokenInfo.extra") }}</h3>
                      <card shadow>
                        <div class="row">
                          <div class="col-auto">
                            {{ $t("tokenInfo.email") }}:
                            {{ this.manifest.extra["Email"] }}
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
                                          style="background: #dbe7e7"
                                          class="over-ellipsis"
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
                          v-if="manifest['abi']['methods'][index]['result']"
                        >
                          <h3>Response</h3>
                          <div>
                            <vue-json-pretty :path="'res'" :data="{ key: 'value' }"> </vue-json-pretty>
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
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

export default {
  components: {
    Loading,
    EventsTable,
    ScCallTable,
    VueJsonPretty,
  },
  data() {
    return {
      contract_id: this.$route.params.hash,
      isLoading: true,
      contract_info: [],
      nef: "",
      manifest: "",
      state: true,
      buttonName: "Hash",
      totalsccall: 0,
    };
  },
  created() {
    this.getContract(this.contract_id);
  },
  watch: {
    $route: "watchrouter",
  },
  methods: {
    watchrouter() {
      if (this.$route.name === "contractinfo") {
        this.contract_id = this.$route.params.hash;
        this.getContract(this.contract_id);
      }
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
        this.totalsccall = this.contract_info["totalsccall"];
        this.isLoading = false;
      });
    },
    addressToScriptHash(addr) {
      const acc = Neon.create.account(addr);
      return "0x" + acc.scriptHash;
    },
    responseConverter(key, val) {
      if (typeof val === "object") {
        if (val["type"] === "ByteString" && typeof val["value"] === "string") {
          const buffer = Buffer.from(val["value"], "base64");
          const hex = buffer.toString("hex");
          const acc = Neon.create.account(hex);
          val["value"] = acc.address;
        }
      }
      return val;
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
        path: `/accountprofile/${this.addressToScriptHash(addr)}`,
      });
    },
    onQuery(index) {
      const name = this.manifest["abi"]["methods"][index]["name"];
      const params = this.manifest["abi"]["methods"][index]["parameters"];
      const contractParams = [];
      for (const item of params) {
        try {
          let temp = Neon.create.contractParam(item["type"], item["value"]);
          contractParams.push(temp);
        } catch (err) {
          this.manifest["abi"]["methods"][index]["result"] = err;
          return;
        }
      }
      const client = Neon.create.rpcClient("http://seed2t.neo.org:20332");
      client
        .invokeFunction(this.contract_id, name, contractParams)
        .then((res) => {
          this.manifest["abi"]["methods"][index]["result"] = JSON.stringify(
            res["stack"],
            this.responseConverter
          );
        })
        .catch((err) => {
          this.manifest["abi"]["methods"][index]["result"] = err;
        });
    },
  },
};
</script>

<style></style>
