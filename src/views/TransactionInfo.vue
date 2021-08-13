<template>
  <div>
    <div class="container-fluid mt--7">

      <div class="row">
        <div class="col">
          <div class="card shadow">
            <loading
                    :is-full-page="false"
                    :opacity="0.9"
                    :active="isLoading"
            ></loading>
            <div class="card-header bg-transparent">
              <div class="h2 font-weight-bold mb-0">
                {{ $t('transactionInfo.txId') }}
              </div>
              <span id ="tx">{{ this.tabledata["hash"] }}</span>
              <span> </span>
              <img class="copy" src="../assets/copy.png" style="height: 18px ;width: 18px; cursor: pointer;" @click="copyItem('tx')">
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-3">
                  <card shadow>
                    <div class="panel panel-primary">
                      <div class="h2 font-weight-bold mb-0">
                        {{ $t('transactionInfo.time') }}
                      </div>
                      <div class="panel-body">
                        {{ convertTime(this.blocktime) }}
                      </div>
                    </div>
                  </card>
                </div>

                <div class="col-3">
                  <card shadow>
                    <div class="panel panel-primary">
                      <div class="h2 font-weight-bold mb-0">
                        {{ $t('transactionInfo.blockHeight') }}
                      </div>
                      <div class="panel-body">
                        {{ this.tabledata["blockIndex"] }}
                      </div>
                    </div>
                  </card>
                </div>

                <div class="col-3">
                  <card shadow>
                    <div class="panel panel-primary">
                      <div class="h2 font-weight-bold mb-0">
                        {{ $t('transactionInfo.size') }}
                      </div>
                      <div class="panel-body">
                        {{ this.tabledata["size"] }}
                      </div>
                    </div>
                  </card>
                </div>

                <div class="col-3">
                  <card shadow>
                    <div class="panel panel-primary">
                      <div class="h2 font-weight-bold mb-0">
                        {{ $t('transactionInfo.version') }}
                      </div>
                      <div class="panel-body">
                        {{ this.tabledata["version"] }}
                      </div>
                    </div>
                  </card>
                </div>
              </div>
              <div class="row mt-3"></div>
              <card shadow>
                <div class="row">
                  <div class="col-2 font-weight-bold mb-0">{{ $t('transactionInfo.blockHash') }}</div>
                  <div class="col-10">
                    <a class="name mb-0 text-sm" style="cursor: pointer"  @click="goToBlockInfo(this.blockhash)">
                      <span id="block">{{ this.blockhash }}</span>
                    </a>
                    <img class="copy" src="../assets/copy.png" style="height: 18px ;width: 18px; cursor: pointer;"  @click="copyItem('block')">
                  </div>
                </div>
              </card>

              <div class="row mt-3"></div>
              <card shadow>
                <div class="row">
                  <div class="col-2 font-weight-bold mb-0">{{ $t('transactionInfo.sender') }}</div>
                  <div class="col-9">
                    <a class="name mb-0 text-sm" id = "sender" style="cursor: pointer"  @click="goToAddressInfo(addressToScriptHash(this.address))">
                      {{ this.state ===true ? this.address :addressToScriptHash(this.address)}}
                    </a>
                    <img class="copy" src="../assets/copy.png" style="height: 18px ;width: 18px; cursor: pointer;" @click="copyItem('sender')">
                  </div>
                  <div class="col-1">
                    <button  class="btn btn-sm btn-primary" @click="changeFormat()">{{this.buttonName}}</button>
                  </div>
                </div>
              </card>

              <div class="row mt-3"></div>
              <card shadow>
                <div class="row">
                  <div class="col-2 font-weight-bold mb-0">{{ $t('transactionInfo.netFee') }}</div>
                  <div class="col-4">
                    {{ convertGas(this.tabledata["netfee"]) }}
                  </div>
                  <div class="col-2 font-weight-bold mb-0">{{ $t('transactionInfo.sysFee') }}</div>
                  <div class="col-4">
                    {{ convertGas(this.tabledata["sysfee"]) }}
                  </div>
                </div>
              </card>

              <div class="row mt-3"></div>
              <card shadow>
                <div class="row">
                  <div class="col-2 font-weight-bold mb-0">{{$t('transactionInfo.vmState') }}</div>
                  <div class="col-4">
                    {{ this.vmstate }}
                  </div>
                  <div class="col-2 font-weight-bold mb-0">{{$t('transactionInfo.exception') }}</div>
                  <div class="col-4">
                    {{ this.exception === null? "Null":this.exception}}
                  </div>
                </div>
              </card>
              <div class="row mt-3"></div>
              <card shadow>
                <div class="row">
                  <div class="col-2 font-weight-bold mb-0">{{$t('transactionInfo.trigger') }}</div>
                  <div class="col-10">
                    {{this.trigger}}
                  </div>
                </div>
              </card>
              <div class="row mt-3"></div>
              <transfers-list
                  :title="$t('transactionInfo.nep17')"
                  :txhash="this.txhash"
              ></transfers-list>

              <nft-table
                  :title="$t('transactionInfo.nep11')"
                  :txhash="this.txhash"
              ></nft-table>

              <div class="row mt-3"></div>
              <card shadow>
                <div
                  class="col-2 font-weight-bold mb-0"
                  style="font-size: 20px"
                >
                  {{ $t('transactionInfo.signers') }}
                </div>
                <hr />
                <div v-if="this.tabledata.signers">
                <div class="row" v-if="this.tabledata.signers[0]">
                  <div class="col-2 font-weight-bold mb-0">{{ $t('transactionInfo.account') }}</div>
                  <div class="col-4">
                    {{ this.tabledata["signers"][0]["account"] }}
                  </div>
                  <div class="col-2 font-weight-bold mb-0">{{ $t('transactionInfo.scopes') }}</div>
                  <div class="col-4">
                    {{ this.tabledata["signers"][0]["scopes"] }}
                  </div>
                </div>
                <div class="row mt-3"></div>
                <div class="row" v-if="this.tabledata.signers[1]">
                  <div class="col-2 font-weight-bold mb-0"></div>
                  <div class="col-4">
                    {{ this.tabledata["signers"][1]["account"] }}
                  </div>
                  <div class="col-2 font-weight-bold mb-0">/div>
                  <div class="col-4">
                    {{ this.tabledata["signers"][1]["scopes"] }}
                  </div>
                </div>
                </div>
                </div>
              </card>

              <div class="row mt-3"></div>

              <card shadow>
                <div
                  class="col-2 font-weight-bold mb-0"
                  style="font-size: 20px"
                >
                  {{ $t('transactionInfo.witness') }}
                </div>
                <hr />
                <div v-if="tabledata.witnesses">
                  <div class="row" v-if="tabledata.witnesses[0]">
                    <div class="col-2 font-weight-bold mb-0">{{ $t('transactionInfo.invocation') }}</div>
                    <div class="col-4" v-html="this.tabledata['witnesses'][0]['invocation']">
                    </div>
                    <div class="col-2 font-weight-bold mb-0">{{ $t('transactionInfo.verification') }}</div>
                    <div class="col-4" v-html="this.tabledata['witnesses'][0]['verification']">
                    </div>
                  </div>
                  <div class="row mt-3"></div>
                  <div class="row" v-if="tabledata.witnesses[1]">
                    <div class="col-2">
                      <div class="text-muted"><h3></h3></div>
                    </div>
                    <div class="col-4" v-html="this.tabledata['witnesses'][1]['invocation']">
                    </div>
                    <div class="col-2">
                      <div class="text-muted"><h3></h3></div>
                    </div>
                    <div class="col-4" v-html="this.tabledata['witnesses'][1]['verification']">
                    </div>
                  </div>
                </div>
              </card>

              <div class="row mt-3"></div>

              <card shadow>
                <div class="row">
                  <div class="col-2">
                    <div class="text-muted"><h3>{{ $t('transactionInfo.script') }}</h3></div>
                  </div>
                  <div class="col-10" v-html="this.tabledata['script']"></div>
                </div>
              </card>

              <div class="row mt-3"></div>

              <tabs fill class="flex-column flex-md-row">
                <tab-pane icon="ni ni-folder-17" :title="$t('transactionInfo.notification')">
                  <div v-if="this.tabledataApp['notifications']&&this.tabledataApp['notifications'].length != 0">
                    <div v-if="this.countApp ===0">
                      <card
                          shadow
                          v-for="(item, index) in this.tabledataApp['notifications']"
                          :key="index"
                      >
                        <div class="row">
                          <div class="col-2">
                            <div class="text-muted">{{$t('transactionInfo.eventName') }}:</div>
                            {{ item["eventname"] }}
                          </div>
                          <div class="col-1">
                            <div class="text-muted">{{$t('transactionInfo.vmState') }}:</div>
                            {{ item["Vmstate"] }}
                          </div>
                          <div class="col-4">
                            <div class="text-muted">{{$t('transactionInfo.contract') }}:</div>
                            <a class="name mb-0 text-sm" style="cursor: pointer"  @click="goToContractInfo(item['contract'])">
                              {{ item["contract"] }}
                            </a>
                          </div>
                          <div class="col-5">
                            <div class="params">

                              <div class="text-muted">{{$t('transactionInfo.State') }}:</div>
                              <div v-if="item['state'].length !== 0">
                                <li
                                    v-for="(param, ind) in item['state']['value']"
                                    :key="ind"
                                >
                                  <span v-if="this.mapTotalApp.get(item['contract'])&&this.mapTotalApp.get(item['contract']).get(item['eventname'])[ind]==='Hash160'">
                                    {{ param["type"] }}: {{ param["value"] ===null ? "Null":base64ToHash(param["value"])}}
                                  </span>
                                  <span v-else-if="this.mapTotalApp.get(item['contract'])&&this.mapTotalApp.get(item['contract']).get(item['eventname'])[ind]==='String'">
                                    {{ param["type"] }}: {{ base64ToString(param["value"])}}
                                  </span>
                                  <span v-else-if="this.mapTotalApp.get(item['contract'])&&this.mapTotalApp.get(item['contract']).get(item['eventname'])[ind]==='Array'">
                                    {{ param["type"] }}:{{ base64ToByteArray(param["value"])}}
                                  </span>
                                  <span v-else-if="this.mapTotalApp.get(item['contract'])&&this.mapTotalApp.get(item['contract']).get(item['eventname'])[ind]==='ByteArray'">
                                    {{ param["type"] }}:{{ base64ToByteArray(param["value"])}}
                                  </span>
                                  <span v-else>
                                    {{ param["type"] }}: {{param["value"]}}
                                  </span>
                                </li>
                              </div>

                            </div>
                          </div>
                        </div>
                      </card>
                    </div>
                    <div v-else>
                      <span>Some contract does not exist in the database(To do)</span>
                    </div>
                  </div>

                  <card shadow v-else class="text-center ">
                    This transaction has no events.
                  </card>
                </tab-pane>

                <tab-pane icon="ni ni-active-40" :title= "$t('transactionInfo.systemCall')">
                  <div v-if="this.tabledataCall&&this.tabledataCall['length'] != 0">
                    <div v-if="this.countSys === 0">
                      <card
                          shadow
                          v-for="(item, index) in this.tabledataCall['result']"
                          :key="index"
                      >
                        <div class="row">
                          <div class="col-2">
                            <div class="text-muted">{{$t('transactionInfo.method')}}:</div>
                            {{ item["method"]}}
                          </div>
                          <div class="col-4">
                            <div class="text-muted">{{$t('transactionInfo.originSender')}}:</div>
                            <a class="name mb-0 text-sm" style="cursor: pointer"  @click="goToAddressInfo(item['originSender'])">
                              {{ item["originSender"]}}
                            </a>
                          </div>
                          <div class="col-4">
                            <div class="text-muted">{{$t('transactionInfo.contract')}}:</div>
                            <a class="name mb-0 text-sm" style="cursor: pointer"  @click="goToContractInfo(item['contractHash'] )">
                              {{ item["contractHash"]}}
                            </a>
                          </div>
                          <div class="col-2">
                            <div class="text-muted">{{$t('transactionInfo.callFlags')}}:</div>
                            {{ item["callFlags"] }}
                          </div>
                        </div>
                        <div class="row mt-3"></div>
                        <div class="row">
                          <div class="col">
                            <div class="text-muted">{{$t('transactionInfo.params')}}:</div>
                            <div v-if="List[index]&&List[index]['key']" >
                              <li class="col-12"
                                  v-for="(param, ind) in item['hexStringParams']"
                                  :key="ind"

                              >
                                <span   v-if="List[index]['key'][ind]['type'] ==='Hash160'">
                                {{List[index]['key'][ind]['name'] }}: {{param==="" ? "null":this.hexToHash(param) }}
                                </span>
                                <span  v-else-if="List[index]&&List[index]['key'] &&List[index]['key'][ind]['type'] ==='String'">
                                {{List[index]['key'][ind]['name']}}: {{ param==="" ? "null":this.hexToString(param) }}
                                </span>
                                <span  v-else-if="List[index]&&List[index]['key'] &&List[index]['key'][ind]['type'] ==='Integer'">
                                  {{List[index]['key'][ind]['name']}}: {{ param==="" ? "null":this.hexToInteger(param) }}
                                </span>
                                <span v-else>
                                {{List[index]['key'][ind]['name']}}: {{param==="" ? "null":param }}
                              </span>

                              </li>
                            </div>
                          </div>
                        </div>
                      </card>
                    </div>
                  </div>
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
import TransfersList from "./Tables/TransfersList";
import NftTable from "./Tables/NftTable";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Neon from "@cityofzion/neon-js";
import toOpcode from "../directives/typeConvertion"
// import convertDecimal from "../directives/typeConvertion"


export default {
  components: {
    TransfersList,
    NftTable,
    Loading,
  },
  data() {
    return {
      tabledata: [],
      tabledataApp:[],
      tabledataCall:[],
      tableEvent:[],
      txhash: "",
      isLoading: true,
      blockhash:"",
      address:"",
      state: true,
      buttonName:"Hash",
      blocktime:0,
      vmstate:"",
      trigger:"",
      exception:"",
      method:"",
      originSender:"",
      callFlags:"",
      contractHash:"",
      manifest:"",
      params:"",
      index:0,
      array:[],
      mapTotalApp: new Map(),
      mapTotalSys: new Map(),
      countApp:0,
      countSys:0,
      List:[],



    };
  },
  created() {
    this.txhash = this.$route.params.txhash;
    this.getTransactionByTransactionHash(this.$route.params.txhash);
    this.getScCallByTransactionHash(this.$route.params.txhash)
    this.getApplicationLogByTransactionHash(this.$route.params.txhash);


  },
  watch:{
    $route:'watchrouter'
  },
  methods: {
    watchrouter() {//如果路由有变化，执行的对应的动作
      this.isLoading = true
      if(this.$route.name === 'transactionInfo'){
      this.txhash = this.$route.params.txhash

        this.getApplicationLogByTransactionHash(this.$route.params.txhash);
      this.getTransactionByTransactionHash(this.$route.params.txhash)
        this.getScCallByTransactionHash(this.$route.params.txhash)
      }
    },
    convertTime(time){
      var date = new Date(time);
      var y = date.getFullYear()
      var m = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1)
      var d = (date.getDate() <10 ? ('0' +date.getDate()): date.getDate())
      var h = date.getHours() < 10 ? ('0' + date.getHours()): date.getHours()
      var mi = date.getMinutes() < 10 ? ('0' + date.getMinutes()): date.getMinutes()
      var s = date.getSeconds() < 10 ? ('0' + date.getSeconds()): date.getSeconds()
      return m+'-'+d+'-'+y+' '+h+':'+mi+':'+s +' +' + "UTC";
      // var res = moment(parseInt(temp)).format('YYYY/MM/DD hh:mm:ss')
      // return res
    },
    changeFormat(){
      if(this.state === true) {
        this.state = false
        this.buttonName = "Addr"
        return
      } else {
        this.state = true
        this.buttonName = "Hash"
        return
      }
    },

    copyItem(ele){
      console.log("hello")
      var item = document.getElementById(ele).innerText;
      console.log(item)
      var oInput = document.createElement('input');
      oInput.value = item;
      document.body.appendChild(oInput);
      oInput.select();
      document.execCommand("Copy");
      oInput.className = 'oInput';
      oInput.style.display = 'none';
    },

    convertGas(gas) {
      return (gas * Math.pow(0.1, 8)).toFixed(6);
    },
    base64ToHash(base){
        var tmp = Neon.u.base642hex(base)
        var res = Neon.u.reverseHex(tmp)

        return "0x"+res
    },
    base64ToString(base) {
        var tmp =Neon.u.base642hex(base)
        var res = Neon.u.hexstring2str(tmp)

        return res
    },
    base64ToByteArray(base){
      var tmp =Neon.u.base642hex(base)
      return tmp
    },
    hexToByteArray(base){
      var tmp =Neon.u.hexstring2ab(base)
      return tmp
    },

    hexToString(base){
      var tmp =Neon.u.hexstring2str(base)
      return tmp
    },
    hexToHash(base){
      var tmp =Neon.u.reverseHex(base)
      return "0x"+tmp
    },
    hexToInteger(base){
      var temp = Neon.u.reverseHex(base)
      var res = parseInt('0x'+temp, 16)
      return res
    },

    goToBlockInfo(hash){
      this.$router.push({
        path: `/blockinfo/${hash}`,
      });
    },
    goToContractInfo(ctr_hash){
      this.$router.push({
        path: `/contractinfo/${ctr_hash}`,
      });
    },
    goToAddressInfo(addr){
      this.$router.push({
        path: `/accountprofile/${addr}`,
      });
    },
    addressToScriptHash(addr) {
      const acc = Neon.create.account(addr);
      return "0x" + acc.scriptHash;

    },
    getApplicationLogByTransactionHash(tx_id){
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
        for (var i = 0; i <this.tabledataApp["notifications"].length;i ++){
         this.getContractsApp(this.tabledataApp["notifications"][i]["contract"])
        }
      });
    },
    getContractsApp(ctr_hash){
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { ContractHash:  ctr_hash },
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
        if (raw ==null) {
          this.countApp ++

        }
        else {
          var temp = JSON.parse(raw["manifest"]);
          // console.log(temp)
          var map = new Map()
          for (var i = 0; i < temp["abi"]["events"].length; i++) {
            var table = []
            // console.log(temp["abi"]["events"].length)
            for (var j = 0; j < temp["abi"]["events"][i]["parameters"].length; j++) {
              table[j] = temp["abi"]["events"][i]["parameters"][j]["type"]
            }
            map.set(temp["abi"]["events"][i]["name"], table)
          }
          this.mapTotalApp.set(raw["hash"], map)
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
        this.blockhash = this.tabledata["blockhash"]
        this.address = this.tabledata["sender"]
        this.blocktime = this.tabledata["blocktime"]
        this.isLoading = false;

        this.convertScriptToOpcode();
      });
    },

    convertScriptToOpcode() {
      var script = toOpcode(this.tabledata["script"])
      //this.tabledata["script"] = this.toOpcode(script)
      this.tabledata["script"] = script

      //console.log(this.tabledata["witnesses"][0]["verification"])

      var verification
      var invocation
      if (this.tabledata["witnesses"][0]) {
        //console.log(" ========== 0 ===========")
        verification = toOpcode(this.tabledata["witnesses"][0]["verification"])
        this.tabledata["witnesses"][0]["verification"] = verification
        invocation = toOpcode(this.tabledata["witnesses"][0]["invocation"])
        this.tabledata["witnesses"][0]["invocation"] = invocation
      } else {
        //console.log(" ========== 1 ===========")
        verification = toOpcode(this.tabledata["witnesses"][1]["verification"])
        this.tabledata["witnesses"][1]["verification"] = verification
        invocation = toOpcode(this.tabledata["witnesses"][1]["invocation"])
        this.tabledata["witnesses"][1]["invocation"] = invocation
      }


    },
    getScCallByTransactionHash(tx_id){
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
        for (var i = 0; i <this.tabledataCall["totalCount"];i ++){
          this.getContractsSys(this.tabledataCall["result"][i]["contractHash"],this.tabledataCall["result"][i]["method"])
        }
      });

    },
      getContractsSys(ctr_hash,method){
        axios({
          method: "post",
          url: "/api",
          data: {
            jsonrpc: "2.0",
            id: 1,
            params: { ContractHash:  ctr_hash },
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

          if(raw === null ){
            this.countSys ++
          }
          else {
            var temp = JSON.parse(raw["manifest"]);
            let json={}
            for (var i = 0; i < temp["abi"]["methods"].length; i++) {
              if (temp["abi"]["methods"][i]["name"] === method){
               json["contractHash"] = ctr_hash
                json["method"] = method
                json["key"] = temp["abi"]["methods"][i]["parameters"]
              }
            }
            this.List.push(json)

          }
        });
      }
  },
};
</script>

<style></style>
