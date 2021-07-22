<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow">

            <div class="card-header bg-transparent">
              <h1 class="mb-0">Tx ID</h1>
              <h4 class="text-muted">{{this.tabledata["hash"]}}</h4>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-3">
                  <card shadow>
                    <div class="panel panel-primary">
                      <div class="h2 font-weight-bold mb-0">
                        Time
                      </div>
                      <div class="panel-body">
                        {{this.tabledata["blocktime"]}}
                      </div>
                    </div>
                  </card>
                </div>

                <div class="col-3">
                  <card shadow>
                    <div class="panel panel-primary">
                      <div class="h2 font-weight-bold mb-0">
                        Block Height
                      </div>
                      <div class="panel-body">
                        {{this.tabledata["validUntilBlock"]}}
                      </div>
                    </div>
                  </card>
                </div>

                <div class="col-3">
                  <card shadow>
                    <div class="panel panel-primary">
                      <div class="h2 font-weight-bold mb-0">
                        Size
                      </div>
                      <div class="panel-body">
                        {{this.tabledata["size"]}}
                      </div>
                    </div>
                  </card>
                </div>

                <div class="col-3">
                  <card shadow>
                    <div class="panel panel-primary">
                      <div class="h2 font-weight-bold mb-0">
                        Version
                      </div>
                      <div class="panel-body">
                        {{this.tabledata["version"]}}
                      </div>
                    </div>
                  </card>
                </div>

              </div>
              <div class="row mt-3"></div>
              <card shadow>
                <div class="row" >
                  <div class="col-2  font-weight-bold mb-0">
                    Block Hash
                  </div>
                  <div class="col-10">{{ this.tabledata["blockhash"]}}</div>
                </div>
              </card>

              <div class="row mt-3"></div>
              <card shadow>
                <div class="row" >
                  <div class="col-2 font-weight-bold mb-0" >
                    Sender
                  </div>
                  <div class="col-10">{{  this.tabledata["sender"]}}</div>
                </div>
              </card>

              <div class="row mt-3"></div>
              <card shadow>
                <div class="row" >
                  <div class="col-2 font-weight-bold mb-0">
                    Network Fee
                  </div>
                  <div class="col-4">{{  convertGas(this.tabledata["netfee"])}}</div>
                  <div class="col-2 font-weight-bold mb-0">
                    System Fee
                  </div>
                  <div class="col-4">{{ convertGas(this.tabledata["sysfee"])}}</div>
                </div>
              </card>

              <div class="row mt-3"></div>

              <card shadow>
              <div class="col-2 font-weight-bold mb-0" style="font-size: 20px">
                Signers
              </div>
              <hr/>
              <div class="row" >
                <div class="col-2 font-weight-bold mb-0">
                  Account
                </div>
                <div class="col-4">{{  this.tabledata["signers"][0]["account"]}}</div>
                <div class="col-2 font-weight-bold mb-0">
                  Scopes
                </div>
                <div class="col-4">{{ this.tabledata["signers"][0]["scopes"]}}</div>
              </div>
            </card>

              <div class="row mt-3"></div>

              <card shadow>
                <div class="col-2 font-weight-bold mb-0" style="font-size: 20px">
                  Witnesses
                </div>
                <hr/>
                <div class="row">
                  <div class="col-2">
                    <div class="text-muted"><h3>Invocation</h3></div>
                  </div>
                  <div class="col-4">{{  this.tabledata["witnesses"][0]["invocation"]}}</div>
                  <div class="col-2">
                    <div class="text-muted"><h3>Verification</h3></div>
                  </div>
                  <div class="col-4">{{ this.tabledata["witnesses"][0]["verification"]}}</div>
                </div>
              </card>

              <div class="row mt-3"></div>

              <card shadow>
                <div class="row">
                  <div class="col-2">
                    <div class="text-muted"><h3>Script</h3></div>
                  </div>
                  <div class="col-10">{{  this.tabledata["script"]}}</div>
                </div>
              </card>



              <tabs fill class="flex-column flex-md-row">

                  <tab-pane icon="ni ni-money-coins" title="Nep17 Transfer" >
                        <transfers-table title="Nep17Transfer" :txhash = this.txhash ></transfers-table>
                  </tab-pane>

              </tabs>
              <tabs fill class="flex-column flex-md-row">

                  <tab-pane icon="ni ni-money-coins" title="Nep11 Transfer" >
                        <nft-table title="Nep11Transfer" ></nft-table>
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
import { format } from "timeago.js";
import TransfersTable from "./Tables/TransfersTable";
import NftTable from "./Tables/NftTable"
export default {
  components: {
    TransfersTable,
    NftTable
  },
  data() {
    return {
      tx_id: "0x9a52bbd5b14304b6643074377719dc52eaa1b3458c5860037b5af22126cd44b3",
      tabledata: [],
      txhash:""
    };
  },
  created() {
    this.getTransactionByTransactionHash(this.$route.params.txhash);
  },
  methods: {

    convertGas(gas) {
      return (gas * Math.pow(0.1,8)).toFixed(6)
    },

    getTransactionByTransactionHash(tx_id){
      axios({
        method:'post',
        url:'/api',
        data:{
          "jsonrpc": "2.0",
          "id": 1,
          "params": {"TransactionHash":tx_id},
          "method": "GetRawTransactionByTransactionHash"
        },
        headers:{'Content-Type': 'application/json','withCredentials':' true',
          'crossDomain':'true',},
      }).then((res) => {
        var raw = res["data"]["result"]
        raw["blocktime"] = format(raw["blocktime"]);
        this.tabledata = raw;
        this.txhash = this.tabledata["hash"]
        console.log(this.txhash)

      });
    },
    onCopy(el) {
      var test = document.getElementById(el);
      test.select();
      document.execCommand("copy");
    },
  },
};
</script>

<style></style>