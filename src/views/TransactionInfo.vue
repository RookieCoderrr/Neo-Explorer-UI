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
                  <div class="col-2 font-weight-bold mb-0">VM State</div>
                  <div class="col-4">
                    {{ this.vmstate }}
                  </div>
                  <div class="col-2 font-weight-bold mb-0">Exception</div>
                  <div class="col-4">
                    {{ this.exception === null? "Null":this.exception}}
                  </div>
                </div>
              </card>
              <div class="row mt-3"></div>
              <card shadow>
                <div class="row">
                  <div class="col-2 font-weight-bold mb-0">Trigger</div>
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
                    <div class="col-4">
                      {{ this.tabledata["witnesses"][0]["invocation"] }}
                    </div>
                    <div class="col-2 font-weight-bold mb-0">{{ $t('transactionInfo.verification') }}</div>
                    <div class="col-4">
                      {{ this.tabledata["witnesses"][0]["verification"] }}
                    </div>
                  </div>
                  <div class="row mt-3"></div>
                  <div class="row" v-if="tabledata.witnesses[1]">
                    <div class="col-2">
                      <div class="text-muted"><h3></h3></div>
                    </div>
                    <div class="col-4">
                      {{ this.tabledata["witnesses"][1]["invocation"] }}
                    </div>
                    <div class="col-2">
                      <div class="text-muted"><h3></h3></div>
                    </div>
                    <div class="col-4">
                      {{ this.tabledata["witnesses"][1]["verification"] }}
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
                  <div class="col-10">{{ this.tabledata["script"] }}</div>
                </div>
              </card>

              <div class="row mt-3"></div>

              <tabs fill class="flex-column flex-md-row">
                <tab-pane icon="ni ni-folder-17" title="Transaction Notification">
                  <div v-if="tabledataApp['notifications']">
                    <div v-if="tabledataApp['notifications']['length'] != 0">
                      <card
                          shadow
                          v-for="(item, index) in this.tabledataApp['notifications']"
                          :key="index"
                      >
                        <div class="row">
                          <div class="col-2">
                            <div class="text-muted">Eventname:</div>
                            {{ item["eventname"] }}
                          </div>
                          <div class="col-1">
                            <div class="text-muted">Vmstate:</div>
                            {{ item["Vmstate"] }}
                          </div>
                          <div class="col-4">
                            <div class="text-muted">Contract:</div>
                            <a class="name mb-0 text-sm" style="cursor: pointer"  @click="goToContractInfo(item['contract'])">
                              {{ item["contract"] }}
                            </a>
                          </div>
                          <div class="col-5">
                            <div class="params">
                              <div class="text-muted">State:</div>
                              <div v-if="item['state'].length !== 0">
                                <li
                                    v-for="(param, ind) in item['state']['value']"
                                    :key="ind"
                                >
                                  <div v-if="cEvent!=[] && cEvent[0] && cEvent[0]['parameters']">
                                  <div v-if="this.cEvent[0]['parameters'][0]['type']==='Hash160'">
                                    {{ param["type"] }}: {{ base64ToHash(param["value"])}}
                                  </div>
                                  <div v-else-if="this.cEvent[0]['parameters'][0]['type']==='String'">
                                    {{ param["type"] }}: {{ base64ToString(param["value"])}}
                                  </div>
                                  <div v-else-if="this.cEvent[0]['parameters'][0]['type']==='Array'">
                                    {{ param["type"] }}:{{ base64ToByteArray(param["value"])}}
                                  </div>
                                  <div v-else-if="this.cEvent[0]['parameters'][0]['type']==='ByteArray'">
                                    {{ param["type"] }}:{{ base64ToByteArray(param["value"])}}
                                  </div>
                                  <div v-else >
                                    {{ param["type"] }}: {{ param["value"]}}
                                  </div>
                                  </div>
                                </li>
                              </div>
                              <div v-else>null</div>
                            </div>
                          </div>
                        </div>
                      </card>
                    </div>
                  </div>

                  <card shadow v-else class="text-center ">
                    This transaction has no events.
                  </card>
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
                      <div class="params col">
                        <div class="text-muted">Params:</div>

                        <li class="col-12"

                            v-for="(param, ind) in tabledataCall['hexStringParams']"
                            :key="ind"

                        >
                          <div  v-if="params[k] && params[k].parameters">{{params[k]['parameters'][ind]['name']}}: {{ param==="" ? "null":param }}
                          </div>
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
      k:0,
      array:[],
      cEvent:[],
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
    checkEvent(name){
      for (var i = 0; i < this.array.length;i++){
        if (name === this.array[i]){
          console.log(i)
          return
        }
      }
    },

    convertGas(gas) {
      return (gas * Math.pow(0.1, 8)).toFixed(6);
    },
    base64ToHash(base){
        var res = Neon.u.base642hex(base)
        return "0x"+res
    },
    base64ToString(base) {
        var tmp =Neon.u.base642hex(base)
        var res = Neon.u.hexstring2str(tmp)
        console.log(res)
        return res
    },
    base64ToByteArray(base){
      var tmp =Neon.u.base642hex(base)
      var res = Neon.u.hexstring2ab(tmp)
      console.log(res)
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
        this.isLoading = false;
        this.tabledata = res["data"]["result"];
        this.blockhash = this.tabledata["blockhash"]
        this.address = this.tabledata["sender"]
        this.blocktime = this.tabledata["blocktime"]
      });
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
          const raw = res["data"]["result"]['manifest'];
          this.manifest = JSON.parse(raw);
          console.log(this.manifest)
          this.tabledataContract = raw;
          this.params = this.manifest["abi"]["methods"]
          this.cEvent = this.manifest["abi"]["events"]
          console.log(this.params)
          for (var i = 0; i < this.params["length"];i++){
            if (this.params[i]["name"]===this.method){
              this.k = i
            }
          }

          for (var j = 0; j <this.manifest["abi"]["events"]["length"];j ++){
            this.array[j] = this.manifest["abi"]["events"][j]["name"]
          }
          console.log(this.manifest['abi']['events'][0]['parameters'][0]['type'])

        });
      }
  },
};
</script>

<style></style>
