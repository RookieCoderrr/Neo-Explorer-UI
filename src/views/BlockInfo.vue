<template>
  <div>
    <div class="container-fluid mt--7" style="padding-bottom: 80px">
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
                <div class="row">
                 <h1 class="mb-0" style="margin-right: 10px;margin-left: 10px">
                {{ this.block_info.index }}
               </h1>
                  <base-button
                          type="primary"
                          size="sm"
                          @click="getBlockByBlockHeight(this.block_info.index - 1)"
                  >&lt;</base-button>
                   <base-button
                           type="primary"
                           size="sm"
                           @click="getBlockByBlockHeight(this.block_info.index + 1)"
                   >&gt;</base-button>
               </div>
                <span class="text-muted" id="block">{{ this.block_info.hash }}</span>
                <img class="copy" src="../assets/copy.png" title="Copy to clipboard" style="height: 18px ;width: 18px; cursor: pointer;"  @click="copyItem('block')">
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-3">
                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="h2 font-weight-bold mb-0">
                          {{ $t("blockinfo.time") }}
                        </div>
                        <div class="panel-body">
                          {{ convertTime(this.block_info.timestamp) }}
                        </div>
                      </div>
                    </card>
                  </div>
                  <div class="col-3">
                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="h2 font-weight-bold mb-0">
                          {{ $t("blockinfo.size") }}
                        </div>
                        <div class="panel-body">
                          {{ this.block_info.size }} {{ $t("blockinfo.bytes") }}
                        </div>
                      </div>
                    </card>
                  </div>
                  <div class="col-3">
                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="h2 font-weight-bold mb-0">
                          {{ $t("blockinfo.height") }}
                        </div>
                        <div class="panel-body">
                          {{ this.block_info.index }}
                        </div>
                      </div>
                    </card>
                  </div>

                  <div class="col-3">
                    <card shadow>
                      <div class="panel panel-primary">
                        <div class="h2 font-weight-bold mb-0">
                          {{ $t("blockinfo.version") }}
                        </div>
                        <div class="panel-body">
                          {{ this.block_info.version }}
                        </div>
                      </div>
                    </card>
                  </div>
                </div>
                <div class="row mt-3"></div>
                <card shadow>
                  <div class="row">
                    <div class="col-2">
                      <div class="font-weight-bold mb-0">
                        {{ $t("blockinfo.speaker") }}
                      </div>
                    </div>
                    <div class="col-4" v-if="block_info['speaker']">
                      <router-link class="name mb-0 text-sm" id="speaker" style="cursor: pointer" :to="'/accountprofile/'+block_info['speaker']">
                        {{ this.state ===false ? block_info["speaker"] :scriptHashToAddress( block_info["speaker"])}}
                      </router-link>
                      <img class="copy" src="../assets/copy.png" title="Copy to clipboard" style="height: 18px ;width: 18px; cursor: pointer;" @click="copyItem('speaker')">

                    </div>
                    <div class="col-1">
                      <button  class="btn btn-sm btn-primary" @click="changeFormat()">{{this.buttonName}}</button>
                    </div>
                    <div class="col-2">
                      <div class="font-weight-bold mb-0">
                        {{ $t("blockinfo.blockReward") }}
                      </div>
                    </div>
                    <div class="col-2">0.5 GAS</div>
                  </div>
                </card>
                <div class="row mt-3"></div>
                <card shadow>
                  <div class="row">
                    <div class="col-2 font-weight-bold mb-0">
                      <div>{{ $t("blockinfo.preHash") }}</div>
                    </div>
                    <router-link    class="name mb-0 text-sm" id="preHash" style="cursor: pointer" :to="'/blockinfo/'+this.block_info.prevhash"   >
                        {{this.block_info.prevhash }}
                    </router-link>
                    <i class="ni ni-single-copy-04"  style="color:black; cursor: pointer;" @click="copyItem(this.block_info.prevhash)"></i>
                  </div>
                </card>

                <div class="row mt-3"></div>
                <card shadow>
                  <div class="row">
                    <div class="col-2">
                      <div class="font-weight-bold mb-0">
                        {{ $t("blockinfo.txns") }}
                      </div>
                    </div>
                    <div class="col-4">
                      {{ this.block_info.transactioncount }}
                    </div>
                    <div class="col-2">
                      <div class="font-weight-bold mb-0">
                        {{ $t("blockinfo.transfers") }}
                      </div>
                    </div>
                    <div class="col-4">
                      {{
                        parseInt(block_info.nep11count) +
                        parseInt(block_info.nep17count)
                      }}
                    </div>
                  </div>
                </card>
                <div class="row mt-3"></div>
                <card shadow>
                  <div class="row">
                    <div class="col-2">
                      <div class="font-weight-bold mb-0">
                        {{ $t("blockinfo.totalSysFee") }}
                      </div>
                    </div>
                    <div class="col-4">
                      {{ this.block_info.systemFee / 100000000 }}
                    </div>
                    <div class="col-2">
                      <div class="font-weight-bold mb-0">
                        {{ $t("blockinfo.totalNetFee") }}
                      </div>
                    </div>
                    <div class="col-4">
                      {{ this.block_info.networkFee / 100000000 }}
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
                    <div class="row" v-if="block_info.witnesses" style="margin-bottom: 15px">
                      <div class="col-6 font-weight-bold mb-0 ">{{ $t('transactionInfo.invocation') }}</div>
                      <div class="col-6 font-weight-bold mb-0 " style="padding-left: 80px" >{{ $t('transactionInfo.verification') }}</div>
                      </div>
                  <div class="row" v-if="block_info.witnesses">
                    <div class="col-6" v-html=" block_info['witnesses'][0]['invocation']"></div>
                    <div class="col-6 " style="padding-left: 80px"  v-html=" block_info['witnesses'][0]['verification']"></div>
                    </div>
                </card>
                <div class="row mt-3"></div>

              </div>
              <div>
                <tabs fill class="flex-column flex-md-row">
                  <tab-pane
                    icon="ni ni-diamond"
                    :title="$t('blockinfo.txnsList')"
                  >
                    <block-transaction
                      v-if="
                        this.block_info != '' &&
                        this.block_info.transactioncount != 0
                      "
                      :title="$t('blockinfo.txnsList')"
                      :blockHash="this.BlockHash"
                    ></block-transaction>
                    <card shadow v-else class="text-center">{{
                      $t("blockinfo.nullPrompt")
                    }}</card>
                  </tab-pane>
                  <tab-pane
                    icon="ni ni-single-02 mr-2"
                    :title="$t('blockinfo.trfsList')"
                  >
                  <block-transfer
                    v-if="
                      this.block_info != '' &&
                      parseInt(block_info.transfer11count) +
                        parseInt(block_info.transfer17count) !=0 "
                    :title="$t('blockinfo.txnsList')"
                    :blockHash="this.BlockHash"
                  ></block-transfer>
                    <card shadow v-else class="text-center">{{
                      $t("blockinfo.nullPrompt")
                    }}</card>
                  </tab-pane>
                </tabs>
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
import BlockTransaction from "./Tables/BlockTransaction";
import BlockTransfer from "./Tables/BlockTransfer";
import toOpcode from "../directives/typeConvertion";
import Neon from "@cityofzion/neon-js";
export default {
  components: {
    BlockTransaction,
    BlockTransfer,
    Loading,
  },
  data() {
    return {
      BlockHash: this.$route.params.hash,
      isLoading: true,
      block_info: [],
      standard: 0,
      manifest: "",
      TxList: [],
      transfercount: "",
      buttonName:"Addr",
      state: true
    };
  },
  created() {
    this.getBlock(this.BlockHash);
  },
  watch: {
    $route: "watchrouter",
  },
  methods: {
    watchrouter() {
      //如果路由有变化，执行的对应的动作
      if (this.$route.name === "blockinfo") {
        this.isLoading = true
        this.BlockHash = this.$route.params.hash;
        this.getBlock(this.BlockHash);
      }
    },
    goToAddressInfo(addr){
      this.$router.push({
        path: `/accountprofile/${addr}`,
      });
    },
    scriptHashToAddress(hash) {
      hash = hash.substring(2);
      const acc = Neon.create.account(hash);
      return acc.address;
    },
    changeFormat(){
      if(this.state === true) {
        this.state = false
        this.buttonName = "Hash"
        return
      } else {
        this.state = true
        this.buttonName = "Addr"
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
    convertTime(time) {
      var date = new Date(time);
      var y = date.getFullYear();
      var m =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var mi =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return (
        m + "-" + d + "-" + y + " " + h + ":" + mi + ":" + s + " +" + "UTC"
      );
    },

    // preBlock(hash) {
    //   this.isLoading = true;
    //   this.getBlock(hash);
    // },
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
        this.block_info["witnesses"][0]["invocation"] = toOpcode( this.block_info["witnesses"][0]["invocation"])

        this.block_info["witnesses"][0]["verification"] = toOpcode( this.block_info["witnesses"][0]["verification"])
        let words = this.block_info["witnesses"][0]["verification"].split("<br>")

        this.block_info["speaker"]=words[this.block_info["primary"]+1].substring(10)
        this.isLoading = false;
      });
    },
    getBlockByBlockHeight(blockheight) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { BlockHeight: parseInt(blockheight) },
          method: "GetBlockByBlockHeight",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.isLoading = false;
        if (res["data"]["error"] == null) {
          this.$router.push({
            path: `/blockinfo/${res["data"]["result"]["hash"]}`,
          });
        } else {
          return

        }
      });
    },
  },
};
</script>

<style>
</style>
