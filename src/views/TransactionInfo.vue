<template>
  <div>
    <div class="container-fluid mt--7">
      <loading
        :is-full-page="false"
        :opacity="0.9"
        :active="isLoading"
      ></loading>
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header bg-transparent">
              <div class="h2 font-weight-bold mb-0">
                {{ $t('transactionInfo.txId') }}
              </div>
              <div class="text-muted">{{ this.tabledata["hash"] }}</div>
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
                    {{ this.blockhash }}
                    </a>
                  </div>
                </div>
              </card>

              <div class="row mt-3"></div>
              <card shadow>
                <div class="row">
                  <div class="col-2 font-weight-bold mb-0">{{ $t('transactionInfo.sender') }}</div>
                  <div class="col-9">
                    <a class="name mb-0 text-sm" style="cursor: pointer"  @click="goToAddressInfo(addressToScriptHash(this.address))">
                      {{ this.state ===true ? this.address :addressToScriptHash(this.address)}}
                    </a>
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
                <tab-pane icon="ni ni-folder-17" title="Transaction Notification">
                  <div v-if="this.tabledataApp['notifications']&&this.tabledataApp['notifications'].length != 0">
                    <div v-if="this.count ===0">
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
                                  <span v-if="this.mapTotal.get(item['contract'])&&this.mapTotal.get(item['contract']).get(item['eventname'])[ind]==='Hash160'">
                                    {{ param["type"] }}: {{ param["value"] ===null ? "Null":base64ToHash(param["value"])}}
                                  </span>
                                  <span v-else-if="this.mapTotal.get(item['contract'])&&this.mapTotal.get(item['contract']).get(item['eventname'])[ind]==='String'">
                                    {{ param["type"] }}: {{ base64ToString(param["value"])}}
                                  </span>
                                  <span v-else-if="this.mapTotal.get(item['contract'])&&this.mapTotal.get(item['contract']).get(item['eventname'])[ind]==='Array'">
                                    {{ param["type"] }}:{{ base64ToByteArray(param["value"])}}
                                  </span>
                                  <span v-else-if="this.mapTotal.get(item['contract'])&&this.mapTotal.get(item['contract']).get(item['eventname'])[ind]==='ByteArray'">
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
                  <div v-else>
                    <card shadow class="text-center">
                    {{$t('transactionInfo.remind') }}
                    </card>
                  </div>

                </tab-pane>
                <tab-pane icon="ni ni-active-40" title="System Call">
                  <card
                      shadow
                  >
                    <div class="row">
                      <div class="col-2">
                        <div class="text-muted">Method:</div>
                        {{ this.method }}
                      </div>
                      <div class="col-4">
                        <div class="text-muted">OriginSender:</div>
                        <a class="name mb-0 text-sm" style="cursor: pointer"  @click="goToAddressInfo(this.originSender)">
                        {{ this.originSender}}
                        </a>
                      </div>
                      <div class="col-4">
                        <div class="text-muted">Contract:</div>
                        <a class="name mb-0 text-sm" style="cursor: pointer"  @click="goToContractInfo(this.contractHash )">
                        {{ this.contractHash }}
                        </a>
                      </div>
                      <div class="col-2">
                        <div class="text-muted">CallFlags:</div>
                        {{ this.callFlags }}
                      </div>
                    </div>
                    <div class="row mt-3"></div>
                    <div class="row">
                      <div class="params col" v-if="this.manifest != null ">
                        <div class="text-muted">Params:</div>
                        <li class="col-12"
                            v-for="(param, ind) in tabledataCall['hexStringParams']"
                            :key="ind"

                        >
                          <span  v-if="params[this.index]['parameters'][ind]['type']==='Hash160'">{{params[this.index]['parameters'][ind]['name']}}: {{param==="" ? "null":this.baseToHash(param) }}
                          </span>
                          <span  v-else-if="params[this.index]['parameters'][ind]['type']==='String'">{{params[this.index]['parameters'][ind]['name']}}: {{ param==="" ? "null":this.baseToString(param) }}
                          </span>
                          <span v-else>
                            {{params[this.index]['parameters'][ind]['name']}}: {{param==="" ? "null":param }}
                          </span>
                        </li></div>
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
import TransfersList from "./Tables/TransfersList";
import NftTable from "./Tables/NftTable";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Neon from "@cityofzion/neon-js";
import BigNumber from "bignumber.js";
// import { u } from "@cityofzion/neon-core";
// import moment from 'moment';

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
      tabledataContract:[],
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
      mapTotal: new Map(),
      count:0



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
      if(this.$route.name === 'transactionInfo'){
      this.txhash = this.$route.params.txhash
      this.getTransactionByTransactionHash(this.$route.params.txhash)

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
        this.buttonName = "WIF"
        return
      } else {
        this.state = true
        this.buttonName = "Hash"
        return
      }
    },


    convertGas(gas) {
      return (gas * Math.pow(0.1, 8)).toFixed(6);
    },
    base64ToHash(base){
        var tmp = Neon.u.base642hex(base)
        var res = Neon.u.reverseHex(tmp)
      // console.log(res)
        return "0x"+res
    },
    base64ToString(base) {
        var tmp =Neon.u.base642hex(base)
        var res = Neon.u.hexstring2str(tmp)
        // console.log(res)
        return res
    },
    base64ToByteArray(base){
      var tmp =Neon.u.base642hex(base)
      // var res = Neon.u.hexstring2ab(tmp)
      // console.log(res)
      return tmp
    },
    baseToByteArray(base){
      var tmp =Neon.u.hexstring2ab(base)
      console.log(tmp)
      return tmp
    },
    baseToString(base){
      var tmp =Neon.u.hexstring2str(base)
      console.log(tmp)
      return tmp
    },
    baseToHash(base){
      var tmp =Neon.u.reverseHex(base)
      console.log("0x"+tmp)
      return "0x"+tmp

    },
    baseToInteger(base){
      var tmp =Neon.u.hex2base64(base)
      var res =Neon.u.base642utf8(tmp)
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
        console.log(this.tabledataApp)
        // console.log(this.tabledataApp["notifications"].length)
        for (var i = 0; i <this.tabledataApp["notifications"].length;i ++){
         this.getContracts(this.tabledataApp["notifications"][i]["contract"])
        }
        console.log(this.mapTotal)
        console.log(this.count)
      });
    },
    getContracts(ctr_hash){
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
          this.count ++

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
          this.mapTotal.set(raw["hash"], map)
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
    _base64ToArrayBuffer(base64) {
      var binary_string =  window.atob(base64);
      var len = binary_string.length;
      var bytes = new Uint8Array( len );
      for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes;
    },
    b64ToHex(bin) {
      var hex = [];
      for(let k=0; k<bin.length; k++) {
        hex.push(bin[k].toString(16));
      }
      hex.reverse()

      return '0x' + hex.join('');
    },
    bin2String(array) {
      //console.log(array)
      var result = "";
      for (var i = 0; i < array.length; i++) {
        //result += String.fromCharCode(parseInt(array[i], 16));
        result += String.fromCharCode(array[i]);
      }
      //console.log("bin2string", result);
      return result;
    },
    convertDecimal (barray) {
      let result = new BigNumber('0');
      var factor = 1;
      for (let i=0; i<barray.length; i++) {
        //console.log("ConvertDecimal", result.toString(), ' ',  factor, barray[i])
        //result = BigNumber.sum(result, new BigNumber(barray[i]*factor))
        result = result.plus(barray[i]*factor)
        //result = result + barray[i]*factor;
        factor = factor*256;
      }
      return result.toString()
    },

    toOpcode(b64) {
      let OperandSizePrefixTable = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let OperandSizeTable = [1, 2, 4, 8, 16, 32, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 0, 2, 0, 0, 0, 2, 8, 1, 4, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let opcodes = ["PUSHINT8", "PUSHINT16", "PUSHINT32", "PUSHINT64", "PUSHINT128", "PUSHINT256", "6", "7", "8", "9", "PUSHA", "PUSHNULL", "PUSHDATA1", "PUSHDATA2", "PUSHDATA4", "PUSHM1", "PUSH0", "PUSH1", "PUSH2", "PUSH3", "PUSH4", "PUSH5", "PUSH6", "PUSH7", "PUSH8", "PUSH9", "PUSH10", "PUSH11", "PUSH12", "PUSH13", "PUSH14", "PUSH15", "PUSH16", "NOP", "JMP", "JMP_L", "JMPIF", "JMPIF_L", "JMPIFNOT", "JMPIFNOT_L", "JMPEQ", "JMPEQ_L", "JMPNE", "JMPNE_L", "JMPGT", "JMPGT_L", "JMPGE", "JMPGE_L", "JMPLT", "JMPLT_L", "JMPLE", "JMPLE_L", "CALL", "CALL_L", "CALLA", "CALLT", "ABORT", "ASSERT", "THROW", "TRY", "TRY_L", "ENDTRY", "ENDTRY_L", "ENDFINALLY", "RET", "SYSCALL", "66", "DEPTH", "68", "DROP", "NIP", "71", "XDROP", "CLEAR", "DUP", "OVER", "76", "PICK", "TUCK", "79", "SWAP", "ROT", "ROLL", "REVERSE3", "REVERSE4", "REVERSEN", "INITSSLOT", "INITSLOT", "LDSFLD0", "LDSFLD1", "LDSFLD2", "LDSFLD3", "LDSFLD4", "LDSFLD5", "LDSFLD6", "LDSFLD", "STSFLD0", "STSFLD1", "STSFLD2", "STSFLD3", "STSFLD4", "STSFLD5", "STSFLD6", "STSFLD", "LDLOC0", "LDLOC1", "LDLOC2", "LDLOC3", "LDLOC4", "LDLOC5", "LDLOC6", "LDLOC", "STLOC0", "STLOC1", "STLOC2", "STLOC3", "STLOC4", "STLOC5", "STLOC6", "STLOC", "LDARG0", "LDARG1", "LDARG2", "LDARG3", "LDARG4", "LDARG5", "LDARG6", "LDARG", "STARG0", "STARG1", "STARG2", "STARG3", "STARG4", "STARG5", "STARG6", "STARG", "NEWBUFFER", "MEMCPY", "138", "CAT", "SUBSTR", "LEFT", "RIGHT", "143", "INVERT", "AND", "OR", "XOR", "148", "149", "150", "EQUAL", "NOTEQUAL", "SIGN", "ABS", "NEGATE", "INC", "DEC", "ADD", "SUB", "MUL", "DIV", "MOD", "POW", "SQRT", "165", "166", "167", "SHL", "SHR", "NOT", "BOOLAND", "BOOLOR", "173", "174", "175", "176", "NZ", "178", "NUMEQUAL", "NUMNOTEQUAL", "LT", "LE", "GT", "GE", "MIN", "MAX", "WITHIN", "188", "189", "190", "191", "PACK", "UNPACK", "NEWARRAY0", "NEWARRAY", "NEWARRAY_T", "NEWSTRUCT0", "NEWSTRUCT", "199", "NEWMAP", "201", "SIZE", "HASKEY", "KEYS", "VALUES", "PICKITEM", "APPEND", "SETITEM", "REVERSEITEMS", "REMOVE", "CLEARITEMS", "POPITEM", "213", "214", "215", "ISNULL", "ISTYPE", "218", "CONVERT", "220", "221", "222", "223", "224", "225", "226", "227", "228", "229", "230", "231", "232", "233", "234", "235", "236", "237", "238", "239", "240", "241", "242", "243", "244", "245", "246", "247", "248", "249", "250", "251", "252", "253", "254", "255"];
      let dic = new Map();
      dic.set("1381727586", "System.Contract.Call");
      dic.set("1736177434", "System.Contract.CallNative");
      dic.set("2168117909", "System.Contract.GetCallFlags");
      dic.set("42441167", "System.Contract.CreateStandardAccount");
      dic.set("166277994", "System.Contract.CreateMultisigAccount");
      dic.set("2478627630", "System.Contract.NativeOnPersist");
      dic.set("375234884", "System.Contract.NativePostPersist");
      dic.set("666101590", "System.Crypto.CheckSig");
      dic.set("987549854", "System.Crypto.CheckMultisig");
      dic.set("2632779932", "System.Iterator.Next");
      dic.set("499078387", "System.Iterator.Value");
      dic.set("4143741362", "System.Runtime.Platform");
      dic.set("2688056809", "System.Runtime.GetTrigger");
      dic.set("59294647", "System.Runtime.GetTime");
      dic.set("805851437", "System.Runtime.GetScriptContainer");
      dic.set("1957232347", "System.Runtime.GetExecutingScriptHash");
      dic.set("1013863225", "System.Runtime.GetCallingScriptHash");
      dic.set("954381561", "System.Runtime.GetEntryScriptHash");
      dic.set("2364286968", "System.Runtime.CheckWitness");
      dic.set("1125197700", "System.Runtime.GetInvocationCounter");
      dic.set("2521294799", "System.Runtime.Log");
      dic.set("1634664853", "System.Runtime.Notify");
      dic.set("4046799655", "System.Runtime.GetNotifications");
      dic.set("3470297108", "System.Runtime.GasLeft");
      dic.set("3163314883", "System.Runtime.BurnGas");
      dic.set("3462919835", "System.Storage.GetContext");
      dic.set("3798709494", "System.Storage.GetReadOnlyContext");
      dic.set("3921628278", "System.Storage.AsReadOnly");
      dic.set("837311890", "System.Storage.Get");
      dic.set("2595762399", "System.Storage.Find");
      dic.set("2216181734", "System.Storage.Put");
      dic.set("3989133359", "System.Storage.Delete");
      var debug = 0;

      let res = this._base64ToArrayBuffer(b64)
      //res = res.Uint8Array
      let scripts = new Uint8Array(res);
      console.log("toOpcode", b64, scripts)
      //for (let k=1; k<=a.length; k++) {
      //    //console.log(a.substr(0, k))
      //  let temp = a[k]
      //  console.log(temp)
      //}

      let result = new Array();
      while (scripts.length > 0) {
        let temp_result = "";
        //console.log("scripts[]", scripts[0]);
        let op = opcodes[scripts[0]];
        let operandSizePrefix = OperandSizePrefixTable[scripts[0]];
        let operandSize = OperandSizeTable[scripts[0]];
        //console.log(op)
        scripts = scripts.slice(1);
        //temp_result += op + '\n'

        if (operandSize > 0) {
          let operand = scripts.slice(0, operandSize);
          if (debug == 1)
            console.log("Here", op, operand, operandSize);
          if (op.startsWith("PUSHINT")) {
            //console.log("true")
            temp_result += op + ' ' + this.convertDecimal(operand)
            result.push(temp_result)
          } else if (op == 'SYSCALL') {
            temp_result += op + ' ' + dic.get(this.convertDecimal(operand));
            if (debug == 1)
              console.log("SYSCALL: ", dic.get(this.convertDecimal(operand)), this.convertDecimal(operand))
            result.push(temp_result)
          } else {
            temp_result += op + ' ' + operand.toString()
            result.push(temp_result)
          }
          scripts = scripts.slice(operandSize)
        }
        if (operandSizePrefix > 0) {
          let bytes = scripts.slice(0, operandSizePrefix)
          let number
          if (bytes[0] != 20) {
            number = this.convertDecimal(bytes)
          } else {
            number = bytes[0]
          }
          scripts = scripts.slice(operandSizePrefix)

          if(debug == 1)
            console.log("Byte: ", op, bytes, scripts);

          let operand = scripts.slice(0, number)

          if(debug == 1)
            console.log("operand: ", op, operand, scripts);
          let flag = false
          for(let k=0; k<operand.length; k++) {
            //console.log("operand[k] ", operand[k], typeof(operand[k]), operand[k]>122)
            if (operand[k] > 122 || operand[k] < 48 ) {
              flag = true
              break
            }
          }

          if(flag) {
            temp_result += op + ' ' + this.b64ToHex(operand);
          } else {
            temp_result += op + ' ' + this.bin2String(operand);
          }

          result.push(temp_result)

          if(debug == 1)
            console.log(op, operand, number, bytes)

          scripts = scripts.slice(number)
        }
        if (operandSizePrefix == 0)
          result.push(op)

        //console.log("Every line", op, operandSize, operandSizePrefix, temp_result);
      }
      //console.log(result)
      //res = result.join('\n')
      res = result.join('<br>')
      console.log(res)
      return res
    },
    convertScriptToOpcode() {
      var script = this.toOpcode(this.tabledata["script"])
      //this.tabledata["script"] = this.toOpcode(script)
      //console.log(script)
      this.tabledata["script"] = script

      //console.log(this.tabledata["witnesses"][0]["verification"])

      var verification
      var invocation
      if (this.tabledata["witnesses"][0]) {
        //console.log(" ========== 0 ===========")
        verification = this.toOpcode(this.tabledata["witnesses"][0]["verification"])
        this.tabledata["witnesses"][0]["verification"] = verification
        invocation = this.toOpcode(this.tabledata["witnesses"][0]["invocation"])
        this.tabledata["witnesses"][0]["invocation"] = invocation
      } else {
        //console.log(" ========== 1 ===========")
        verification = this.toOpcode(this.tabledata["witnesses"][1]["verification"])
        this.tabledata["witnesses"][1]["verification"] = verification
        invocation = this.toOpcode(this.tabledata["witnesses"][1]["invocation"])
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
        this.method = this.tabledataCall["method"];
        this.originSender = this.tabledataCall["originSender"];
        this.callFlags = this.tabledataCall["callFlags"];
        this.contractHash = this.tabledataCall["contractHash"]
        console.log(this.tabledataCall)
        this.getContractByContractHash(this.contractHash)
      });
    },
      getContractByContractHash(ctr_hash){
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
          console.log(raw)
          if(raw === null ){
            this.manifest = null;
          }
          else {
            this.manifest = JSON.parse(raw["manifest"]);
            console.log(this.manifest)
            this.tabledataContract = raw;
            this.params = this.manifest["abi"]["methods"]
            // console.log(raw)
            for (var i = 0; i < this.params.length;i++){
              // console.log(this.params.length)
              // console.log(this.method)
              if (this.method === this.params[i]["name"]){
                this.index = i
                console.log(this.index)
              }
            }
          }
        });
      }
  },
};
</script>

<style></style>
