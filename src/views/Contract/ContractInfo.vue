<template>
  <div>
    <div class="container-fluid mt--8" style="background-color: rgb(250,250,250)">
      <div class="row">
        <div class="col">
            <div class="top">
              <loading
                :is-full-page="false"
                :opacity="0.9"
                :active="isLoading"
              ></loading>
              <div class=" row mt-3  mb-5  title1" > {{ $t('contractDetail') }} </div>
              <div class=" row mt-3  mb-3 title2"> {{ $t('overview') }} </div>
              <card shadow class="card-style">

                <div class="row   mb-1">
                  <div class="col-2 lable-title">
                    {{ $t("contract.name") }}
                  </div>
                  <div class="col-8 context-black">
                    {{ this.contract_info["name"] }}
                  </div>
                  <div class="col-2">
                    <el-button v-if="isToken" type="primary" size="small" style="height: 25px; margin-left: 60px" @click="getToken(this.contract_id)">
                      Token</el-button>
                  </div>
                </div>

                <div class="row  mt-3  mb-1">
                  <div class="col-2 lable-title">
                    {{ $t("contract.hash") }}
                  </div>
                  <div class="col-10 context-black" id="contract">
                    {{ this.contract_info["hash"] }}
                    <i class="ni ni-single-copy-04" id="contractButton" title="Copy to Clipboard" style="padding-left: 5px; color: grey; cursor: pointer;"  @click="copyItem('contract','contractButton','contractSpan')"></i>
                    <span  style="color: #42b983"  id="contractSpan" ></span>
                  </div>
                </div>


                <div class="row  mt-3  mb-1">
                    <div class="col-2 lable-title">
                      {{ $t("contract.creator") }}
                    </div>
                  <div class="col-10 context-black">
                    <span v-if="this.contract_info['sender'] === null">
                      {{$t("contract.available") }}
                    </span>
                    <div v-else>
                      <router-link
                              class="name mb-0 "
                              style="cursor: pointer"
                              :to="'/accountprofile/'+ addressToScriptHash(contract_info['sender'])"
                      >{{ button.state ?this.contract_info["sender"] : addressToScriptHash(this.contract_info["sender"])}}</router-link
                      >
                      <el-button type="primary" size="small" style="height: 19px;margin-left: 20px" @click="changeFormat(button)">{{ this.button.buttonName }}</el-button>
                    </div>
                  </div>
                </div>

                <div class="row  mt-3  mb-1">
                  <div class="col-2 lable-title">
                    {{ $t("contract.time") }}
                  </div>
                  <div class="col-10 context-black">
                    {{ convertPreciseTime(this.contract_info["createtime"]) }}
                  </div>
                </div>

                <div class="row  mt-3  mb-1">
                  <div class="col-2 lable-title">
                    {{ $t("contract.update") }}
                  </div>
                  <div class="col-10 context-black">
                    {{ this.contract_info["updatecounter"] }}
                  </div>
                </div>

                <div class="row  mt-3  mb-1">
                  <div class="col-2 lable-title">
                    {{ $t("contract.index") }}
                  </div>
                  <div class="col-10 context-black">
                    {{ this.contract_info["id"] }}
                  </div>
                </div>

                <div class="row  mt-3  mb-1">
                  <div class="col-2 lable-title">
                    {{ $t("contract.compiler") }}
                  </div>
                  <div class="col-10 context-black">
                    {{ this.nef["compiler"] }}
                  </div>
                </div>

                <div class="row  mt-3  mb-1">
                  <div class="col-2 lable-title">
                    {{ $t("contract.txns") }}
                  </div>
                  <div class="col-10 context-black">
                    {{ this.contract_info["totalsccall"] }}
                  </div>
                </div>
              </card>
                <div class="row mt-3"></div>
                <div class="row mt-3"></div>

              <el-tabs v-model="activeName"  style="width:80%;margin-left: 10%;background-color: rgb(250,250,250)" >
                <el-tab-pane :label="$t('contract.scCallTitle')"  name="first">
                  <div v-if="this.totalsccall != 0">
                    <sc-call-table :contract-hash="contract_id"></sc-call-table>
                  </div>
                  <card shadow v-else class="text-center">{{
                    $t("contract.noScCall")
                    }}</card>
                </el-tab-pane>
                <el-tab-pane :label="$t('contract.eventTitle')"  name="second">
                  <div >
                    <events-table :contractHash="contract_id"></events-table>
                  </div>

                </el-tab-pane>
                <el-tab-pane :label="$t('contract.conInfo')"  name="third">
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
                      <div    class="events"
                              v-if="this.manifest.abi.events.length !== 0">
                        <h3 class="mt-2">{{ $t("tokenInfo.events") }}</h3>


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
                      <h3 class="mt-2">{{ $t("tokenInfo.methods") }}</h3>

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
import EventsTable from "./EventsTable";
import ScCallTable from "./ScCallTable";
import Neon from "@cityofzion/neon-js";
import ContractJsonView from "./ContractJsonView";
import {addressToScriptHash, convertPreciseTime, changeFormat, responseConverter, RPC_NODE, copyItem} from "../../store/util";

export default {
  components: {
    Loading,
    EventsTable,
    ScCallTable,
    ContractJsonView,
  },
  data() {
    return {
      contract_id: this.$route.params.hash,
      isLoading: true,
      contract_info: [],
      nef: "",
      manifest: "",
      button: {state: true, buttonName: "Hash"},
      decodeButton: {state: true, buttonName: "Decode"},
      totalsccall: 0,
      isAddress: false,
      isToken:false,
      activeName: 'first',
      activeNames: ['0'],
      activeNames2:['0'],
    };
  },
  created() {
    this.getContract(this.contract_id);
    this.testToken(this.contract_id)
  },
  watch: {
    $route: "watchrouter",
  },
  methods: {
    addressToScriptHash,
    convertPreciseTime,
    changeFormat,
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
      this.isLoading = true;
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
          "Content-Type": "application/x-www-form-urlencoded",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        const raw = res["data"]["result"];
        this.nef = JSON.parse(raw["nef"]);
        this.manifest = JSON.parse(raw["manifest"]);
        this.contract_info = raw;
        this.totalsccall = this.contract_info["totalsccall"];
        this.testAddress(contract_id);
        this.isLoading = false;
        console.log(raw)
      });
    },
    getToken(contract){
      this.$router.push(`/tokeninfo/${contract}`);
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
    testToken(contract){
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          method: "GetAssetInfoByContractHash",
          params: { ContractHash: contract },
          id: 1,
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: "true",
          crossDomain: "true",
        },
      }).then((res) => {
        if (res["data"]["error"] === null){
          this.isToken = true;
          console.log("yes")
        } else {
          this.isToken = false;
          console.log("no")
        }

      });
    },

    onQuery(index) {
      this.manifest["abi"]["methods"][index]["raw"] = "";
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
      client.invokeFunction(this.contract_id, name, contractParams)
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
    getAddress(accountAddress) {
      this.$router.push({
        path: `/accountprofile/${accountAddress}`,
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
