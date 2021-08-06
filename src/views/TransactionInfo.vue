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
              <div class="h2 font-weight-bold mb-0">{{ $t('transactionInfo.txId') }}</div>
              <div class="text-muted">{{ this.tabledata["hash"] }}</div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-3">
                  <card shadow>
                    <div class="panel panel-primary">
                      <div class="h2 font-weight-bold mb-0">{{ $t('transactionInfo.time') }}</div>
                      <div class="panel-body">
                        {{ convertTime(this.blocktime) }}
                      </div>
                    </div>
                  </card>
                </div>

                <div class="col-3">
                  <card shadow>
                    <div class="panel panel-primary">
                      <div class="h2 font-weight-bold mb-0">{{ $t('transactionInfo.blockHeight') }}</div>
                      <div class="panel-body">
                        {{ this.tabledata["blockIndex"] }}
                      </div>
                    </div>
                  </card>
                </div>

                <div class="col-3">
                  <card shadow>
                    <div class="panel panel-primary">
                      <div class="h2 font-weight-bold mb-0">{{ $t('transactionInfo.size') }}</div>
                      <div class="panel-body">
                        {{ this.tabledata["size"] }}
                      </div>
                    </div>
                  </card>
                </div>

                <div class="col-3">
                  <card shadow>
                    <div class="panel panel-primary">
                      <div class="h2 font-weight-bold mb-0">{{ $t('transactionInfo.version') }}</div>
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
      txhash: "",
      isLoading: true,
      blockhash:"",
      address:"",
      state: true,
      buttonName:"Hash",
      blocktime:0
    };
  },
  created() {
    this.txhash = this.$route.params.txhash;
    this.getTransactionByTransactionHash(this.$route.params.txhash);
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
    goToBlockInfo(hash){
      this.$router.push({
        path: `/blockinfo/${hash}`,
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
  },
};
</script>

<style></style>
