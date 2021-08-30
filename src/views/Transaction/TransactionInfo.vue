<template>
  <div>
    <div class="container-fluid mt--7" style="background-color: rgb(250,250,250)">
      <div class="row">
        <div class="col">
          <loading
            :is-full-page="false"
            :opacity="0.9"
            :active="isLoading"
          ></loading>
          <div class="bat">
            <div class="title">
              {{ $t("transactionInfo.txId") }}
            </div>
          </div>

          <div class="card-body">
            <card shadow class="card-style">
              <div class="row mt-3 mb-1">
                <div class="col-2 lable-title">
                  {{ $t("transactionInfo.txId") }}
                </div>
                <div class="col-10 context-black">
                  <span id="tx">{{ this.tabledata["hash"] }}</span>
                  <span> </span>
                  <i
                    class="ni ni-single-copy-04"
                    id="txButton"
                    title="Copy to Clipboard"
                    style="padding-left: 5px; color: grey; cursor: pointer"
                    @click="copyItem('tx', 'txButton', 'txSpan')"
                  ></i>
                  <span style="color: #42b983" id="txSpan"></span>
                </div>
              </div>
              <div class="row mt-3 mb-1">
                <div class="col-2 lable-title">
                  {{ $t("transactionInfo.time") }}
                </div>
                <div class="col-10 context-black">
                  {{ convertPreciseTime(this.blocktime) }}
                </div>
              </div>

              <div class="row mt-3 mb-1">
                <div class="col-2 lable-title">
                  {{ $t("transactionInfo.blockHeight") }}
                </div>
                <div class="col-10 context-black">
                  {{ this.tabledata["blockIndex"] }}
                </div>
              </div>

              <div class="row mt-3 mb-1">
                <div class="col-2 lable-title">
                  {{ $t("transactionInfo.size") }}
                </div>
                <div class="col-10 context-black">
                  {{ this.tabledata["size"] }} {{ $t("bytes") }}
                </div>
              </div>

              <div class="row mt-3 mb-1">
                <div class="col-2 lable-title">
                  {{ $t("transactionInfo.version") }}
                </div>
                <div class="col-10 context-black">
                  {{ this.tabledata["version"] }}
                </div>
              </div>

              <div class="row mt-3 mb-1">
                <div class="col-2 lable-title">
                  {{ $t("transactionInfo.blockHash") }}
                </div>
                <div class="col-10 context">
                  <router-link
                    class="name mb-0 "
                    style="cursor: pointer"
                    :to="'/blockinfo/' + this.blockhash"
                  >
                    <span id="block">{{ this.blockhash }}</span>
                  </router-link>
                  <i
                    class="ni ni-single-copy-04"
                    id="blockButton"
                    title="Copy to Clipboard"
                    style="padding-left: 5px; color: grey; cursor: pointer"
                    @click="copyItem('block', 'blockButton', 'blockSpan')"
                  ></i>
                  <span style="color: #42b983" id="blockSpan"></span>
                </div>
              </div>

              <div class="row mt-3 mb-1">
                <div class="col-2 lable-title">
                  {{ $t("transactionInfo.sender") }}
                </div>
                <div class="col-10 context-black">
                  <router-link
                    class="name mb-0 "
                    id="sender"
                    style="cursor: pointer"
                    :to="'/accountprofile/' + this.address"
                  >
                    {{
                      this.button.state === true
                        ? this.address
                        : addressToScriptHash(this.address)
                    }}
                  </router-link>
                  <span style="display:-moz-inline-box;display:inline-block;width: 80px!important;vertical-align: center">
                  <i
                    class="ni ni-single-copy-04"
                    id="senderButton"
                    title="Copy to Clipboard"
                    style="padding-left: 5px; color: grey; cursor: pointer"
                    @click="copyItem('sender', 'senderButton', 'senderSpan')"
                  ></i>
                  <span style="color: #42b983" id="senderSpan"></span>
                  </span>
                  <el-button type="primary" size="small" style="height: 21px;margin-left: 20px;" @click="changeFormat(button)"> {{ this.button.buttonName }}</el-button>
                </div>
              </div>

              <div class="row mt-3 mb-1">
                <div class="col-2 lable-title">
                  {{ $t("transactionInfo.netFee") }}
                </div>
                <div class="col-10 context-black">
                  {{ convertGas(this.tabledata["netfee"]) }}
                </div>
              </div>

              <div class="row mt-3 mb-1">
                <div class="col-2 lable-title">
                  {{ $t("transactionInfo.sysFee") }}
                </div>
                <div class="col-10 context-black">
                  {{ convertGas(this.tabledata["sysfee"]) }}
                </div>
              </div>

              <div class="row mt-3 mb-1">
                <div class="col-2 lable-title">
                  {{ $t("transactionInfo.vmState") }}
                </div>
                <div class="col-10 context-black">
                  {{ this.vmstate }}
                </div>
              </div>
              <div class="row mt-3 mb-1">
                <div class="col-2 lable-title">
                  {{ $t("transactionInfo.exception") }}
                </div>
                <div class="col-10 context-black">
                  {{ this.exception === null ? "Null" : this.exception }}
                </div>
              </div>

              <div class="row mt-3 mb-1">
                <div class="col-2 lable-title">
                  {{ $t("transactionInfo.trigger") }}
                </div>
                <div class="col-10 context-black">
                  {{ this.trigger }}
                </div>
              </div>
            </card>
            <div class="row mt-4"></div>
            <el-tabs
                v-model="activeName"
                style="width: 80%; margin-left: 10%; background-color: rgb(250,250,250)"
            >
              <el-tab-pane label="Nep17Transfers" name="first">
                <transfers-list
                    :title="$t('transactionInfo.nep17')"
                    :txhash="this.txhash"
                ></transfers-list>
              </el-tab-pane>
              <el-tab-pane label="Nep11Transfers" name="second">
                <nft-table
                    :title="$t('transactionInfo.nep11')"
                    :txhash="this.txhash"
                ></nft-table>
              </el-tab-pane>
              <el-tab-pane
                  :label="$t('transactionInfo.notification')"
                  name="third"
              >
                <div
                    class="notificationDiv"
                    v-if="
                    this.tabledataApp['notifications'] &&
                    this.tabledataApp['notifications'].length != 0
                  "
                >
                  <div v-if="this.countApp === 0">
                    <card
                        shadow
                        v-for="(item, index) in this.tabledataApp[
                        'notifications'
                      ]"
                        :key="index"
                    >
                      <div class="row">
                        <div class="col-2">
                          <div class="text-muted">
                            {{ $t("transactionInfo.eventName") }}:
                          </div>
                          {{ item["eventname"] }}
                        </div>
                        <div class="col-1">
                          <div class="text-muted">
                            {{ $t("transactionInfo.vmState") }}:
                          </div>
                          {{ item["Vmstate"] }}
                        </div>
                        <div class="col-4">
                          <div class="text-muted">
                            {{ $t("transactionInfo.contract") }}:
                          </div>
                          <router-link
                              class="name mb-0 text-sm"
                              style="cursor: pointer"
                              :to="'/contractinfo/' + item['contract']"
                          >
                            {{ item["contract"] }}
                          </router-link>
                        </div>
                        <div class="col-5">
                          <div class="params">
                            <div class="text-muted">
                              {{ $t("transactionInfo.State") }}:
                            </div>
                            <div v-if="item['state'].length !== 0">
                              <li
                                  v-for="(param, ind) in item['state']['value']"
                                  :key="ind"
                              >
                                <span
                                    v-if="
                                    this.mapTotalApp.get(item['contract']) &&
                                    this.mapTotalApp
                                      .get(item['contract'])
                                      .get(item['eventname'])[ind] === 'Hash160'
                                  "
                                >
                                  {{ param["type"] }}:
                                  {{
                                    param["value"] === null
                                        ? "Null"
                                        : base64ToHash(param["value"])
                                  }}
                                </span>
                                <span
                                    v-else-if="
                                    this.mapTotalApp.get(item['contract']) &&
                                    this.mapTotalApp
                                      .get(item['contract'])
                                      .get(item['eventname'])[ind] === 'String'
                                  "
                                >
                                  {{ param["type"] }}:
                                  {{ base64ToString(param["value"]) }}
                                </span>
                                <span
                                    v-else-if="
                                    this.mapTotalApp.get(item['contract']) &&
                                    this.mapTotalApp
                                      .get(item['contract'])
                                      .get(item['eventname'])[ind] === 'Array'
                                  "
                                >
                                  {{ param["type"] }}:{{
                                    base64ToByteArray(param["value"])
                                  }}
                                </span>
                                <span
                                    v-else-if="
                                    this.mapTotalApp.get(item['contract']) &&
                                    this.mapTotalApp
                                      .get(item['contract'])
                                      .get(item['eventname'])[ind] ===
                                      'ByteArray'
                                  "
                                >
                                  {{ param["type"] }}:{{
                                    base64ToByteArray(param["value"])
                                  }}
                                </span>
                                <span v-else>
                                  {{ param["type"] }}: {{ param["value"] }}
                                </span>
                              </li>
                            </div>
                          </div>
                        </div>
                      </div>
                    </card>
                  </div>
                  <div v-else>
                    <span
                    >Some contract does not exist in the database(To do)</span
                    >
                  </div>
                </div>

                <card shadow v-else class="text-center">
                  This transaction has no events.
                </card>
              </el-tab-pane>
              <el-tab-pane
                  :label="$t('transactionInfo.systemCall')"
                  name="forth"
              >
                <div
                    class="systemCallDiv"
                    v-if="this.tabledataCall && this.tabledataCall['length'] != 0"
                >
                  <div v-if="this.countSys === 0">
                    <card
                        shadow
                        v-for="(item, index) in this.tabledataCall['result']"
                        :key="index"
                    >
                      <div class="row">
                        <div class="col-2">
                          <div class="text-muted">
                            {{ $t("transactionInfo.method") }}:
                          </div>
                          {{ item["method"] }}
                        </div>
                        <div class="col-4">
                          <div class="text-muted">
                            {{ $t("transactionInfo.originSender") }}:
                          </div>
                          <router-link
                              class="name mb-0 text-sm"
                              style="cursor: pointer"
                              :to="'/accountprofile/' + item['originSender']"
                          >
                            {{ item["originSender"] }}
                          </router-link>
                        </div>
                        <div class="col-4">
                          <div class="text-muted">
                            {{ $t("transactionInfo.contract") }}:
                          </div>
                          <router-link
                              class="name mb-0 text-sm"
                              style="cursor: pointer"
                              :to="'/contractinfo/' + item['contractHash']"
                          >
                            {{ item["contractHash"] }}
                          </router-link>
                        </div>
                        <div class="col-2">
                          <div class="text-muted">
                            {{ $t("transactionInfo.callFlags") }}:
                          </div>
                          {{ item["callFlags"] }}
                        </div>
                      </div>
                      <div class="row mt-3"></div>
                      <div class="row">
                        <div class="col">
                          <div class="text-muted">
                            {{ $t("transactionInfo.params") }}:
                          </div>
                          <div v-if="List[index] && List[index]['key']">
                            <li
                                class="col-12"
                                v-for="(param, ind) in item['hexStringParams']"
                                :key="ind"
                            >
                              <span
                                  v-if="
                                  List[index]['key'][ind]['type'] === 'Hash160'
                                "
                              >
                                {{ List[index]["key"][ind]["name"] }}:
                                {{
                                  param === "" ? "null" : this.hexToHash(param)
                                }}
                              </span>
                              <span
                                  v-else-if="
                                  List[index] &&
                                  List[index]['key'] &&
                                  List[index]['key'][ind]['type'] === 'String'
                                "
                              >
                                {{ List[index]["key"][ind]["name"] }}:
                                {{
                                  param === ""
                                      ? "null"
                                      : this.hexToString(param)
                                }}
                              </span>
                              <span
                                  v-else-if="
                                  List[index] &&
                                  List[index]['key'] &&
                                  List[index]['key'][ind]['type'] === 'Integer'
                                "
                              >
                                {{ List[index]["key"][ind]["name"] }}:
                                {{
                                  param === ""
                                      ? "null"
                                      : this.hexToInteger(param)
                                }}
                              </span>
                              <span v-else>
                                {{ List[index]["key"][ind]["name"] }}:
                                {{ param === "" ? "null" : param }}
                              </span>
                            </li>
                          </div>
                        </div>
                      </div>
                    </card>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>

            <div class="row mt-3 mb-3 title2">
              {{ $t("transactionInfo.signers") }}
            </div>
            <card shadow class="card-style" v-if="this.tabledata.signers">
              <el-collapse v-model="activeSignersNames" style="border: white">
                <el-collapse-item
                  :title="$t('transactionInfo.account')"
                  name="1"
                  class="text-title3"
                >
                  <div
                      class="ml-4"
                    v-for="(item, index) in this.tabledata['signers']"
                    :key="index"
                  >
                    {{ item["account"] }}
                  </div>
                </el-collapse-item>
                <el-collapse-item
                  :title="$t('transactionInfo.scopes')"
                  name="2"
                >
                  <div
                      class="ml-4"
                    v-for="(item, index) in this.tabledata['signers']"
                    :key="index"
                  >
                    {{ item["scopes"] }}
                  </div>
                </el-collapse-item>
              </el-collapse>
            </card>

            <div class="row mt-3 mb-3 title2">
              {{ $t("transactionInfo.witness") }}
            </div>
            <card shadow class="card-style" v-if="tabledata.witnesses">
              <el-collapse v-model="activeWitnessesNames" style="border: white">
                <el-collapse-item
                  :title="$t('transactionInfo.invocation')"
                  name="1"
                  class="itemCollapse"
                >
                  <div
                      class="ml-4"
                    v-for="(item, index) in this.tabledata['witnesses']"
                    :key="index"
                  >
                    <span v-html="item['invocation']"> </span>
                  </div>
                </el-collapse-item>
                <el-collapse-item
                  :title="$t('transactionInfo.verification')"
                  name="2"
                >
                  <div
                      class="ml-4"
                    v-for="(item, index) in this.tabledata['witnesses']"
                    :key="index"
                  >
                    <span v-html="item['verification']"></span>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </card>
            <div class="row mt-3 mb-3 title2">
              {{ $t("transactionInfo.script") }}
            </div>
            <card shadow class="card-style">
              <el-collapse v-model="activeScriptsNames" style="border: white">
                <el-collapse-item
                  :title="$t('transactionInfo.script')"
                  name="1"
                  class="item-collapse"
                >
                  <div class="ml-4" v-html="this.tabledata['script']"></div>
                </el-collapse-item>
              </el-collapse>
            </card>

          </div>
          <div style="margin-top: 30px; margin-bottom: 20px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TransfersList from "./TransfersList";
import NftTable from "./NftTable";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Neon from "@cityofzion/neon-js";
import toOpcode from "../../directives/typeConvertion";
import {
  convertPreciseTime,
  changeFormat,
  convertGas,
  addressToScriptHash,
  copyItem,
} from "../../store/util";

export default {
  components: {
    TransfersList,
    NftTable,
    Loading,
  },
  data() {
    return {
      tabledata: [],
      tabledataApp: [],
      tabledataCall: [],
      tableEvent: [],
      txhash: "",
      isLoading: true,
      blockhash: "",
      address: "",
      button: { state: true, buttonName: "Hash" },
      blocktime: 0,
      vmstate: "",
      trigger: "",
      exception: "",
      method: "",
      originSender: "",
      callFlags: "",
      contractHash: "",
      manifest: "",
      params: "",
      index: 0,
      array: [],
      mapTotalApp: new Map(),
      mapTotalSys: new Map(),
      countApp: 0,
      countSys: 0,
      List: [],
      activeIndex: "1",
      whichIndex: 1,
      activeSignersNames: ["0"],
      activeWitnessesNames: ["0"],
      activeScriptsNames: ["0"],
      activeName: "second",
    };
  },
  created() {
    this.txhash = this.$route.params.txhash;
    this.getTransactionByTransactionHash(this.$route.params.txhash);
    this.getScCallByTransactionHash(this.$route.params.txhash);
    this.getApplicationLogByTransactionHash(this.$route.params.txhash);
  },
  watch: {
    $route: "watchrouter",
  },
  methods: {
    addressToScriptHash,
    convertGas,
    convertPreciseTime,
    changeFormat,
    copyItem,
    handleSelect(key) {
      this.whichIndex = parseInt(key);
    },

    watchrouter() {
      //如果路由有变化，执行的对应的动作
      this.isLoading = true;
      if (this.$route.name === "transactionInfo") {
        this.txhash = this.$route.params.txhash;

        this.getApplicationLogByTransactionHash(this.$route.params.txhash);
        this.getTransactionByTransactionHash(this.$route.params.txhash);
        this.getScCallByTransactionHash(this.$route.params.txhash);
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
      // var res = moment(parseInt(temp)).format('YYYY/MM/DD hh:mm:ss')
      // return res
    },

    base64ToHash(base) {
      var tmp = Neon.u.base642hex(base);
      var res = Neon.u.reverseHex(tmp);

      return "0x" + res;
    },
    base64ToString(base) {
      var tmp = Neon.u.base642hex(base);
      var res = Neon.u.hexstring2str(tmp);

      return res;
    },
    base64ToByteArray(base) {
      var tmp = Neon.u.base642hex(base);
      return tmp;
    },
    hexToByteArray(base) {
      var tmp = Neon.u.hexstring2ab(base);
      return tmp;
    },

    hexToString(base) {
      var tmp = Neon.u.hexstring2str(base);
      return tmp;
    },
    hexToHash(base) {
      var tmp = Neon.u.reverseHex(base);
      return "0x" + tmp;
    },
    hexToInteger(base) {
      var temp = Neon.u.reverseHex(base);
      var res = parseInt("0x" + temp, 16);
      return res;
    },

    goToBlockInfo(hash) {
      this.$router.push({
        path: `/blockinfo/${hash}`,
      });
    },
    goToContractInfo(ctr_hash) {
      this.$router.push({
        path: `/contractinfo/${ctr_hash}`,
      });
    },
    goToAddressInfo(addr) {
      this.$router.push({
        path: `/accountprofile/${addr}`,
      });
    },
    getApplicationLogByTransactionHash(tx_id) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { TransactionHash: tx_id },
          method: "GetApplicationLogByTransactionHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.isLoading = false;
        this.tabledataApp = res["data"]["result"];
        this.exception = this.tabledataApp["exception"];
        this.trigger = this.tabledataApp["trigger"];
        this.vmstate = this.tabledataApp["vmstate"];
        // console.log(this.tabledataApp)
        // console.log(this.tabledataApp["notifications"].length)
        for (var i = 0; i < this.tabledataApp["notifications"].length; i++) {
          this.getContractsApp(
            this.tabledataApp["notifications"][i]["contract"]
          );
        }
      });
    },
    getContractsApp(ctr_hash) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { ContractHash: ctr_hash },
          method: "GetContractByContractHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.isLoading = false;
        const raw = res["data"]["result"];
        if (raw == null) {
          this.countApp++;
        } else {
          var temp = JSON.parse(raw["manifest"]);
          // console.log(temp)
          var map = new Map();
          for (var i = 0; i < temp["abi"]["events"].length; i++) {
            var table = [];
            // console.log(temp["abi"]["events"].length)
            for (
              var j = 0;
              j < temp["abi"]["events"][i]["parameters"].length;
              j++
            ) {
              table[j] = temp["abi"]["events"][i]["parameters"][j]["type"];
            }
            map.set(temp["abi"]["events"][i]["name"], table);
          }
          this.mapTotalApp.set(raw["hash"], map);
        }
      });
    },

    getTransactionByTransactionHash(tx_id) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { TransactionHash: tx_id },
          method: "GetRawTransactionByTransactionHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.tabledata = res["data"]["result"];
        this.blockhash = this.tabledata["blockhash"];
        this.address = this.tabledata["sender"];
        this.blocktime = this.tabledata["blocktime"];
        this.isLoading = false;

        this.convertScriptToOpcode();
      });
    },

    convertScriptToOpcode() {
      var script = toOpcode(this.tabledata["script"]);
      //this.tabledata["script"] = this.toOpcode(script)
      this.tabledata["script"] = script;
      var verification;
      var invocation;
      for (var i = 0; i < this.tabledata["witnesses"].length; i++) {
        verification = toOpcode(this.tabledata["witnesses"][i]["verification"]);
        this.tabledata["witnesses"][i]["verification"] = verification;
        invocation = toOpcode(this.tabledata["witnesses"][i]["invocation"]);
        this.tabledata["witnesses"][i]["invocation"] = invocation;
      }
    },
    getScCallByTransactionHash(tx_id) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { TransactionHash: tx_id },
          method: "GetScCallByTransactionHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.isLoading = false;
        this.tabledataCall = res["data"]["result"];
        console.log(this.tabledataCall["totalCount"], "?????");
        for (var i = 0; i < this.tabledataCall["totalCount"]; i++) {
          this.getContractsSys(
            this.tabledataCall["result"][i]["contractHash"],
            this.tabledataCall["result"][i]["method"]
          );
        }
      });
    },
    getContractsSys(ctr_hash, method) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { ContractHash: ctr_hash },
          method: "GetContractByContractHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.isLoading = false;
        const raw = res["data"]["result"];

        if (raw === null) {
          this.countSys++;
        } else {
          var temp = JSON.parse(raw["manifest"]);
          let json = {};
          for (var i = 0; i < temp["abi"]["methods"].length; i++) {
            if (temp["abi"]["methods"][i]["name"] === method) {
              json["contractHash"] = ctr_hash;
              json["method"] = method;
              json["key"] = temp["abi"]["methods"][i]["parameters"];
            }
          }
          this.List.push(json);
        }
        console.log(this.List);
      });
    },
  },
};
</script>

<style></style>
