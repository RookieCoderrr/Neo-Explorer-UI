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
                  <h1 class="mb-0">{{this.block_info.index}}</h1>
                  <h4 class="text-muted">{{ this.block_info.hash}}</h4>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-3">
                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="h2 font-weight-bold mb-0">{{$t('blockinfo.time')}}</div>
                        <div class="panel-body">
                          {{ convertTime(this.block_info.timestamp) }}
                        </div>
                      </div>
                    </card>
                  </div>
                  <div class="col-3">
                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="h2 font-weight-bold mb-0">{{$t('blockinfo.size')}}</div>
                        <div class="panel-body">
                          {{this.block_info.size}} {{$t('blockinfo.bytes')}}
                        </div>
                      </div>
                    </card>
                  </div>
                  <div class="col-3">
                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="h2 font-weight-bold mb-0">{{$t('blockinfo.height')}}</div>
                        <div class="panel-body">
                          {{this.block_info.index }}
                        </div>
                      </div>
                    </card>
                  </div>

                  <div class="col-3">

                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="h2 font-weight-bold mb-0">{{$t('blockinfo.version')}}</div>
                        <div class="panel-body">
                          {{this.block_info.version}}
                        </div>
                      </div>
                    </card>
                  </div>


                </div>
                <div class="row mt-3"></div>
                <card shadow>
                  <div class="row">
                    <div class="col-2 font-weight-bold mb-0">
                      <div >{{$t('blockinfo.hash')}}</div>
                    </div>
                    <div class="col-10 name mb-0 text-sm">{{ this.block_info.hash }}
                    </div>
                  </div>
                </card>
                <div class="row mt-3">    </div>
                <card shadow>
                  <div class="row">
                    <div class="col-2 font-weight-bold mb-0">

                      <div  >{{$t('blockinfo.preHash')}}</div>
                    </div>
                    <div class="col-10"  @click="preBlock(this.block_info.prevhash)">
                      <a class="name mb-0 text-sm" style="cursor: pointer; " >{{this.block_info.prevhash}}</a>
                    </div>
                  </div>
                </card>


                <div class="row mt-3"> </div>
                <card shadow>
                  <div class="row">

                    <div class="col-2">
                      <div class=" font-weight-bold mb-0">{{$t('blockinfo.txns')}}</div>
                    </div>
                    <div class="col-4">{{ this.block_info.transactioncount }}
                    </div>
                    <div class="col-2">
                      <div class=" font-weight-bold mb-0">{{$t('blockinfo.transfers')}}</div>
                    </div>
                    <div class="col-4">{{ this.transfercount }}
                    </div>

                  </div>
                </card>
                <div class="row mt-3">    </div>
                <card shadow>
                  <div class="row">
                    <div class="col-2">
                      <div class=" font-weight-bold mb-0">{{$t('blockinfo.totalSysFee')}}</div>
                    </div>
                    <div class="col-4">{{  this.block_info.systemFee}}
                    </div>
                    <div class="col-2">
                      <div class=" font-weight-bold mb-0">{{$t('blockinfo.totalNetFee')}}</div>
                    </div>
                    <div class="col-4">{{this.block_info.networkFee}}
                    </div>
                  </div>
                </card>

<!--                <div class="row mt-5">    </div>-->
<!--                <div class="row">-->
<!--                  <div class="col-2">-->
<!--                    <div class="text-muted">Speaker</div>-->
<!--                  </div>-->
<!--                  <div class="col-5">-->
<!--                   TBC-->
<!--                  </div>-->
<!--                  <div class="col-2">-->
<!--                    <div class="text-muted">Miner Order</div>-->
<!--                  </div>-->
<!--                  <div class="col-3">-->
<!--                   {{this.block_info.primary}}-->
<!--                  </div>-->

<!--                </div>-->
                <div class="row mt-3">    </div>

                <block-transaction :title="$t('blockinfo.txnsList')" :blockHash="this.BlockHash"></block-transaction>
              </div>


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
// import { format } from "timeago.js";
import BlockTransaction from "./Tables/BlockTransaction";
export default {
  components: {
    BlockTransaction,
    Loading,
  },
  data() {
    return {
      BlockHash: this.$route.params.hash,
      isLoading: true,
      block_info: [],
      standard: 0,
      manifest: "",
      TxList:[],
      transfercount:"",
    };
  },
  created() {
    this.getBlock(this.BlockHash);
  },
  watch:{
    $route:'watchrouter'
  },
  methods: {
    watchrouter() {//如果路由有变化，执行的对应的动作
      if(this.$route.name === 'blockinfo') {
        this.BlockHash = this.$route.params.hash
        this.getBlock(this.BlockHash);
      }
    },
    convertTime(time) {
      var date = new Date(time);
      var y = date.getFullYear()
      var m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      var d = (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate())
      var h = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()
      var mi = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
      var s = date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds()
      return m + '-' + d + '-' + y + ' ' + h + ':' + mi + ':' + s + ' +' + "UTC";
    },

    preBlock(hash){
      this.isLoading =true
      this.getBlock(hash)
    }
    ,
    getBlock(hash) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { BlockHash: hash },
          method: "GetBlockInfoByBlockHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        console.log(res)
        this.block_info = res["data"]["result"];
        this.isLoading = false;
      });

      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { BlockHash: hash,Limit:10,Skip:0},
          method: "GetTransferByBlockHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        console.log(res)
        this.transfercount = res["data"]["result"]["totalCount"];
        this.isLoading = false;
      });
    },

  },
};
</script>

<style></style>
