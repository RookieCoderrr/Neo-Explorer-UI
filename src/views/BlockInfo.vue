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
                <h1 class="mb-0">BlockInfo</h1>
<!--                <a-->
<!--                  class="mb-0"-->
<!--                  style="cursor: pointer"-->
<!--                  >{{ this.block_info["hash"] }}-->
<!--                </a>-->
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-2">
                    <div class="text-muted">Block Height</div>
                  </div>
                  <div class="col-5">
                    <h3>{{ this.block_info.index }}</h3>
                  </div>
                  <div class="col-2">
                    <div class="text-muted">Tx Count</div>
                  </div>
                  <div class="col-3">
                    <h3>{{ this.block_info.transactionNumber }}</h3>
                  </div>
                </div>
                <div class="row mt-5"></div>
                <div class="row">
                  <div class="col-2">
                    <div class="text-muted">BlockHash</div>
                  </div>
                  <div class="col-5">
                    <h3>{{ this.block_info.hash }}</h3>
                  </div>
                  <div class="col-2">
                    <div class="text-muted">Transfers</div>
                  </div>
                  <div class="col-3">
                    <h3>{{ this.block_info.transfersNumber }}</h3>
                  </div>
                </div>
                <div class="row mt-5">    </div>
                  <div class="row">
                    <div class="col-2">
                      <div class="text-muted">Time</div>
                    </div>
                    <div class="col-5">
                      <h3>{{  convertTime(this.block_info.timestamp) }}</h3>
                    </div>
                    <div class="col-2">
                      <div class="text-muted">BlockSize</div>
                    </div>
                    <div class="col-3">
                      <h3>{{ this.block_info.size }}Bytes</h3>
                    </div>
                  </div>
                <div class="row mt-5">    </div>
                <div class="row">
                  <div class="col-2">
                    <div class="text-muted">Total SystemFee</div>
                  </div>
                  <div class="col-5">
                    <h3>{{  this.block_info.systemFee}}</h3>
                  </div>
                  <div class="col-2">
                    <div class="text-muted">Total NetworkFee</div>
                  </div>
                  <div class="col-3">
                    <h3>{{this.block_info.networkFee}}</h3>
                  </div>
                </div>
                <div class="row mt-5">    </div>
                <div class="row">
                  <div class="col-2">
                    <div class="text-muted">Miner</div>
                  </div>
                  <div class="col-5">
                    <h3>Unknown</h3>
                  </div>
                  <div class="col-2">
                    <div class="text-muted">Miner Order</div>
                  </div>
                  <div class="col-3">
                    <h3>{{this.block_info.primary}}</h3>
                  </div>

                </div>
                <div class="row mt-5">    </div>
                <div class="row">
                  <div class="col-2">
                    <div class="text-muted">PreHash</div>
                  </div>
                  <div class="col-5">
                    <h3>{{this.block_info.prevhash}}</h3>
                  </div>
                  <div class="col-2">
                    <div class="text-muted">Version Number</div>
                  </div>
                  <div class="col-3">
                    <h3>{{this.block_info.version}}</h3>
                  </div>
                </div>
              </div>
              <tabs fill class="flex-column flex-md-row">
                  <block-transaction title="Transaction List" :blockHash="this.BlockHash"></block-transaction>
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
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { format } from "timeago.js";
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
      if(this.$route.name === 'blocks') {
        this.BlockHash = this.$route.params.hash
        this.getBlock(this.BlockHash);
      }
    },
    convertTime(ts) {
      return format(ts);
    },
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
        this.block_info = res["data"]["result"];
        this.isLoading = false;
      });
    },

  },
};
</script>

<style></style>
