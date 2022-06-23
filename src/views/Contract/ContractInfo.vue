<template>
  <div>
    <div class="container-fluid mt--8" style="background-color: #f7f8fa">
      <div class="row">
        <div class="col">
            <div class="top">
              <loading
                :is-full-page="false"
                :opacity="0.9"
                :active="isLoading"
              ></loading>
              <div class=" row mt-3  mb-5  title1 shortTitle" > {{ $t('contractDetail') }} </div>
              <div class=" row mt-3  mb-3 title2 shortTitle">
                {{ $t('overview') }}
                <div  v-if="this.standard===1">
                  <el-button v-if="isToken" type="info" :plain="true" size="small" style="height: 22px; margin-left: 10px" @click="getNep17Token(this.contract_id)">
                    Token</el-button>
                </div>
                <div  v-else-if="this.standard===2">
                  <el-button v-if="isToken" type="info" :plain="true" size="small" style="height: 22px; margin-left: 10px" @click="getNftToken(this.contract_id)">
                    Token</el-button>
                </div>
                <div v-else>
                  <el-button v-if="isToken" type="info" :plain="true" size="small" style="height: 22px; margin-left: 10px" @click="getNep17Token(this.contract_id)">
                    Token</el-button>
                </div>
              </div>
              <card shadow class="card-style list">

                <div class="row  mb-1 " >
                  <div class="col-md-3 lable-title">
                    {{ $t("contract.name") }}

                  </div>
                  <div class="col-md-9 context-black">
                    {{ this.contract_info["name"] }}
                    <el-tag v-if="this.contract_info['updatecounter'] === -1" type="danger" size="small" >
                      Destroyed
                    </el-tag>

                    <el-tag v-else-if="this.nef['compiler']==='neo-core-v3.0'" type="success" size="small" >
                      Native
                    </el-tag>
                    <el-tag v-if="this.whiteList.indexOf(this.contract_info['hash']) !== -1" type="success" size="small" >
                      Verified
                    </el-tag>
                    <i v-else-if="this.contract_info['updatecounter'] !== -1 &&this.nef['compiler']!=='neo-core-v3.0'&&this.isVerified" class="el-icon-circle-check" style="color: #2dce89;font-weight: bold">
                       Verified
                    </i>
                    <i v-else-if="this.contract_info['updatecounter'] !== -1 &&this.isVerified===false" class="el-icon-circle-close" style="color:red ;font-weight: bold">
                      Unverified
                    </i>

                  </div>

                </div>

                <div class="row info mt-3  mb-1">
                  <div class="col-md-3 lable-title">
                    {{ $t("contract.hash") }}
                  </div>
                  <div class="col-md-9 context-black" id="contract">
                    {{ this.contract_info["hash"] }}
                    <i class="ni ni-single-copy-04" id="contractButton" title="Copy to Clipboard" style="padding-left: 5px; color: grey; cursor: pointer;"  @click="copyItem('contract','contractButton','contractSpan')"></i>
                    <span  style="color: #42b983"  id="contractSpan" ></span>
                  </div>
                </div>


                <div class="row info mt-3  mb-1">
                    <div class="col-md-3 lable-title">
                      {{ $t("contract.creator") }}
                      <el-button type="info" :plain="true" size="small" style="height: 19px;margin-left: 6px" @click="changeFormat(button)">{{ this.button.buttonName }}</el-button>
                    </div>
                  <div class="col-md-9 context-black">
                    <span v-if="this.contract_info['sender'] === null">
                      {{$t("contract.available") }}
                    </span>
                    <div v-else>
                      <router-link
                              class="name mb-0 "
                              style="cursor: pointer;"
                              :to="'/accountprofile/'+ addressToScriptHash(contract_info['sender'])"
                      >{{ button.state ?this.contract_info["sender"] : addressToScriptHash(this.contract_info["sender"])}}</router-link
                      >

                  </div>
                  </div>
                </div>

                <div class="row info mt-3  mb-1">
                  <div class="col-md-3 lable-title">
                    {{ $t("contract.time") }}
                  </div>
                  <div class="col-md-9 context-black">
                    {{ convertPreciseTime(this.contract_info["createtime"]) }}
                  </div>
                </div>

                <div class="row info mt-md-3  mb-1">
                  <div class="col-md-3 lable-title">
                    {{ $t("contract.update") }}
                    <el-tooltip  :content="this.updateCountToolTip" placement="top" >
                      <i class="el-icon-question"/>
                    </el-tooltip>
                  </div>
                  <div class="col-md-9 context-black">
                    {{ this.contract_info["updatecounter"] }}
                  </div>
                </div>

                <div class="row info mt-md-3  mb-1">
                  <div class="col-md-3 lable-title">
                    {{ $t("contract.index") }}
                  </div>
                  <div class="col-md-9 context-black">
                    {{ this.contract_info["id"] }}
                  </div>
                </div>

                <div class="row info mt-md-3  mb-1">
                  <div class="col-md-3 lable-title">
                    {{ $t("contract.compiler") }}
                  </div>
                  <div class="col-md-9 context-black">
                    {{ this.nef["compiler"] }}
                  </div>
                </div>

                <div class="row info  mt-md-3  mb-1">
                  <div class="col-md-3 lable-title">
                    {{ $t("contract.txns") }}
                  </div>
                  <div class="col-md-9 context-black">
                    {{ this.contract_info["totalsccall"] }}
                  </div>
                </div>
              </card>
                <div class="row mt-3"></div>
                <div class="row mt-3"></div>

              <el-tabs type="card" class="list" v-model="activeName" v-if="this.contract_info['updatecounter'] !== -1" style="width:80%;margin-left: 10%;background-color: #f7f8fa" >
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
                        <h2 class="mt-2">{{ $t("tokenInfo.events") }}</h2>


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
                                    <div class="col-lg-2 event_param" >
                                      {{ param["name"] }}:
                                    </div>
                                    <div class="col-lg-9 context-black">
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
                      <h2 class="mt-2">{{ $t("tokenInfo.methods") }}</h2>

                      <el-collapse v-model="activeNames2"
                                    v-for="(item, index) in this.manifest['abi']['methods']"
                                   :key="index"
                                   :name="index"
                                   style="border: white;"
                      >
                      <el-collapse-item :title="item['name']" style="margin-bottom: 20px">
                        <div class="row">
                          <div class="col" style="margin-left: 4%" v-if="item['safe']">
                            <button
                                    class="btn btn-sm btn-primary"
                                    @click="onQuery(index)"
                            >
                              {{$t('tokenInfo.query')}}
                            </button>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-3" style="margin-left: 4%">
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
                          <div class="col-lg-3" style="margin-left: 4%">
                            <div class="return">
                              <div class="text-muted">{{$t('tokenInfo.returnType')}}</div>
                              {{ item["returntype"] }}
                            </div>
                          </div>
                          <div class="col-lg-3" style="margin-left: 4%">
                            <div class="text-muted">{{$t('tokenInfo.offset')}}</div>
                            {{ item["offset"] }}
                          </div>
                          <div class="col-lg" style="margin-left: 4%">
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
                <el-tab-pane :label="$t('contract.sourceCode')" name="forth" v-if="this.nef['compiler']!=='neo-core-v3.0' &&this.whiteList.indexOf(this.contract_info['hash']) === -1">
                  <card shadow class="text-center" v-if="this.isVerified &&this.nef['compiler']==='neo-core-v3.0'">
                    This is a native contract, and the source code is registered on the blockchain.
                  </card>
                  <div v-else-if="this.isVerified" class="text-center">
                    <source-code :contractHash="contract_id" :updatecounter="updatecounter"></source-code>
<!--                    <card shadow>-->
<!--                      Coming soon ~-->
<!--                    </card>-->
                  </div>
                  <card shadow v-else class="text-center">
                    Sorry, we were unable to locate a matching SourceCode for this contract.

                    If you are the contract owner, please <router-link    class="name mb-0 " id="preHash" style="cursor: pointer;" :to="'/VerifyContract/'+contract_id"   >
                    Verify Your Contract Source Code
                  </router-link>  here.

                  </card>
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
import SourceCode from "./SourceCode";
import Neon from "@cityofzion/neon-js";
import ContractJsonView from "./ContractJsonView";
import {addressToScriptHash, convertPreciseTime, changeFormat, responseConverter, RPC_NODE, RPC_NODE_MAIN,RPC_NODE_MAGNET, copyItem} from "../../store/util";
import net from "../../store/store";

export default {
  components: {
    Loading,
    SourceCode,
    EventsTable,
    ScCallTable,
    ContractJsonView,
  },
  data() {
    return {
      network: net.url,
      contract_id: this.$route.params.hash,
      isLoading: true,
      contract_info: [],
      standard:0,
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
      isVerified:0,
      updatecounter:0,
      whiteList:['0x5ba6c543c5a86a85e9ab3f028a4ad849b924fab9','0x385501cb0288b2953db767b0dc971478539456cb','0xf8465c7a0700c8ee0bfdb932c7586b66938f90d2','0xd1a9f78e1940f6322fef4df2340a963a9ec46f63','0xca2d20610d7982ebe0bed124ee7e9b2d580a6efc','0xfb75a5314069b56e136713d38477f647a13991b4','0xf970f4ccecd765b63732b821775dc38c25d74f23','0x545dee8354823d1bdf4ac524e4092f7405025247','0xc777a8032c1d9d7b885c7357d4c93e7a39f93942','0xedcbe55b04bcc7dad69cfe243bf3d26dc106a1d4','0x3244fcadcccff190c329f7b3083e4da2af60fbce','0x4d5a85b0c83777df72cfb665a933970e4e20c0ec','0x59aa80468a120fe79aa5601de07746275c9ed76a','0x6bcbf09a7193c968d608178a45785967f0721c42','0x1404929a660620869c9cb46ff228ee9d7147959d','0x171d791c0301c332cfe95c6371ee32965e34b606','0x1b3f740240af479f07e44ee3ee78df4c6cb4b1fb','0x45d182227b5d753c7f358594b631838b92caf409']
    };
  },
  created() {
    window.scroll(0, 0);
    this.getContract(this.contract_id);
    this.getToken(this.contract_id)
    this.testToken(this.contract_id)
  },
  watch: {
    $route: "watchrouter",
  },
  computed:{
    updateCountToolTip:function (){
      if(this.$i18n.locale==="en"){
        return "Contract hash will not change when the contract is updated, and this page only displays the latest version of the contract"
      }else if (this.$i18n.locale==="cn") {
        return "更新合约后，合约哈希不会变化，此界面只展示最新版本的合约"
      } else {
        return "Le hash du contrat ne changera pas lorsque le contrat est mis à jour, et cette page n'affiche que la dernière version du contrat"
      }
    },

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
        // this.contract_id = this.$route.params.hash;
        // this.getContract(this.contract_id);
        // this.getToken(this.contract_id)
        location.reload()
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
        this.updatecounter = this.contract_info["updatecounter"]
        this.totalsccall = this.contract_info["totalsccall"];
        this.testAddress(contract_id);
        this.getVerifiedContract(contract_id,this.updatecounter)
        this.isLoading = false;
        // console.log(raw)
      });
    },
    getVerifiedContract(contract_id,updatecounter) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { ContractHash: contract_id,updatecounter:updatecounter},
          method: "GetVerifiedContractByContractHash",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        const raw = res["data"]["result"];
        if (raw !== null ) {
          this.isVerified = true
        } else {
          this.isVerified = false
        }

      });
    },
    getToken(contract_id) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { ContractHash: contract_id },
          method: "GetAssetInfoByContractHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        let raw = res["data"]["result"];
        // console.log(raw)
        if(raw === null){
          this.standard =3
        }else{
          if (raw["type"] === "NEP17") {
            this.standard=1
          } else if (raw["type"] === "NEP11") {
            this.standard=2
          } else {
            this.standard=0
          }
        }
        // console.log(this.standard)

      });
    },

    getNep17Token(contract){
      this.$router.push(`/NEP17tokeninfo/${contract}`);
    },
    getNftToken(contract){
      this.$router.push(`/NFTtokeninfo/${contract}`);
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
          // console.log("yes")
        } else {
          this.isToken = false;
          // console.log("no")
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
      let client = "";
      if(`${location.hostname}`=== "explorer.onegate.space"){
         client = Neon.create.rpcClient(RPC_NODE_MAIN);
      }else if(`${location.hostname}`=== "testnet.explorer.onegate.space") {
        client = Neon.create.rpcClient(RPC_NODE)
      } else if(`${location.hostname}`=== "testmagnet.explorer.onegate.space") {
        client = Neon.create.rpcClient(RPC_NODE_MAGNET)
      }

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
  @media screen and (max-width: 790px ){
    .info{
      margin-top:1.5rem!important;
      margin-bottom:1.5rem!important; ;
    }

  }

</style>
