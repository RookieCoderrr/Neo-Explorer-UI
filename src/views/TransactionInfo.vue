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
              <div class="mb-0">Tx ID</div>
              <div class="text-muted">{{ this.tabledata["hash"] }}</div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-3">
                  <card shadow>
                    <div class="panel panel-primary">
                      <div class="h2 font-weight-bold mb-0">Time</div>
                      <div class="panel-body">
                        {{ this.tabledata["blocktime"] }}
                      </div>
                    </div>
                  </card>
                </div>

                <div class="col-3">
                  <card shadow>
                    <div class="panel panel-primary">
                      <div class="h2 font-weight-bold mb-0">Block Height</div>
                      <div class="panel-body">
                        {{ this.tabledata["blockIndex"] }}
                      </div>
                    </div>
                  </card>
                </div>

                <div class="col-3">
                  <card shadow>
                    <div class="panel panel-primary">
                      <div class="h2 font-weight-bold mb-0">Size</div>
                      <div class="panel-body">
                        {{ this.tabledata["size"] }}
                      </div>
                    </div>
                  </card>
                </div>

                <div class="col-3">
                  <card shadow>
                    <div class="panel panel-primary">
                      <div class="h2 font-weight-bold mb-0">Version</div>
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
                  <div class="col-2 font-weight-bold mb-0">Block Hash</div>
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
                  <div class="col-2 font-weight-bold mb-0">Sender</div>
                  <div class="col-9">
                    <a class="name mb-0 text-sm" style="cursor: pointer"  @click="goToAddressInfo(addressToScriptHash(this.address))">
                      {{ this.state ===true ? this.address :addressToScriptHash(this.address)}}
                    </a>
                  </div>
                  <div class="col-1">
                    <button  class="btn btn-primary btn-xs" @click="changeFormat()">{{this.buttonName}}</button>
                  </div>
                </div>
              </card>

              <div class="row mt-3"></div>
              <card shadow>
                <div class="row">
                  <div class="col-2 font-weight-bold mb-0">Network Fee</div>
                  <div class="col-4">
                    {{ convertGas(this.tabledata["netfee"]) }}
                  </div>
                  <div class="col-2 font-weight-bold mb-0">System Fee</div>
                  <div class="col-4">
                    {{ convertGas(this.tabledata["sysfee"]) }}
                  </div>
                </div>
              </card>

              <div class="row mt-3"></div>

              <transfers-list
                  title="Nep17Transfer"
                  :txhash="this.txhash"
              ></transfers-list>

              <nft-table
                  title="Nep11Transfer"
                  :txhash="this.txhash"
              ></nft-table>

              <div class="row mt-3"></div>
              <card shadow>
                <div
                  class="col-2 font-weight-bold mb-0"
                  style="font-size: 20px"
                >
                  Signers
                </div>
                <hr />
                <div v-if="this.tabledata.signers">
                <div class="row" v-if="this.tabledata.signers[0]">
                  <div class="col-2 font-weight-bold mb-0">Account</div>
                  <div class="col-4">
                    {{ this.tabledata["signers"][0]["account"] }}
                  </div>
                  <div class="col-2 font-weight-bold mb-0">Scopes</div>
                  <div class="col-4">
                    {{ this.tabledata["signers"][0]["scopes"] }}
                  </div>
                </div>
                <div class="row mt-3"></div>
                <div class="row" v-if="this.tabledata.signers[1]">
                  <div class="col-2 font-weight-bold mb-0">Account</div>
                  <div class="col-4">
                    {{ this.tabledata["signers"][1]["account"] }}
                  </div>
                  <div class="col-2 font-weight-bold mb-0">Scopes</div>
                  <div class="col-4">
                    {{ this.tabledata["signers"][1]["scopes"] }}
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
                  Witnesses
                </div>
                <hr />
                <div v-if="tabledata.witnesses">
                  <div class="row" v-if="tabledata.witnesses[0]">
                    <div class="col-2">
                      <div class="text-muted"><h3>Invocation</h3></div>
                    </div>
                    <div class="col-4">
                      {{ this.tabledata["witnesses"][0]["invocation"] }}
                    </div>
                    <div class="col-2">
                      <div class="text-muted"><h3>Verification</h3></div>
                    </div>
                    <div class="col-4">
                      {{ this.tabledata["witnesses"][0]["verification"] }}
                    </div>
                  </div>
                  <div class="row mt-3"></div>
                  <div class="row" v-if="tabledata.witnesses[1]">
                    <div class="col-2">
                      <div class="text-muted"><h3>Invocation</h3></div>
                    </div>
                    <div class="col-4">
                      {{ this.tabledata["witnesses"][1]["invocation"] }}
                    </div>
                    <div class="col-2">
                      <div class="text-muted"><h3>Verification</h3></div>
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
                    <div class="text-muted"><h3>Script</h3></div>
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
import { format } from "timeago.js";
import TransfersList from "./Tables/TransfersList";
import NftTable from "./Tables/NftTable";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Neon from "@cityofzion/neon-js";
// import { u } from "@cityofzion/neon-core";

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
      buttonName:"Hash"
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
    changeFormat(){
      if(this.state === true) {
        this.state = false
        this.buttonName = "WIF"
        console.log(this.state)
        return
      } else {
        this.state = true
        console.log(this.state)
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
        var raw = res["data"]["result"];
        raw["blocktime"] = format(raw["blocktime"]);
        this.tabledata = raw;
        this.blockhash = this.tabledata["blockhash"]
        this.address = this.tabledata["sender"]
        console.log(Neon.u.str2hexstring(this.tabledata["script"]))
      });
    },
  },
};
</script>

<style></style>
