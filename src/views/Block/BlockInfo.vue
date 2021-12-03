<template>
  <div>
    <div class="container-fluid mt--8" style="background-color: #f7f8fa">
      <div class="row">
        <div class="col">

            <div class="top" >
              <loading
                :is-full-page="false"
                :opacity="0.9"
                :active="isLoading"
              ></loading>
<!--              <div class="card-header bg-transparent">-->
                <div class=" row mt-3  mb-5  title1 shortTitle" > {{ $t('blockDetail') }} </div>
              <div class=" row mt-3  mb-3 title2 shortTitle"> {{ $t('overview') }} </div>
                <div class="row mt-3"></div>

                <card shadow class="card-style list">
                  <div class="row mt-1 mb-1">
                    <div class="col-md-3 lable-title">
                      {{ $t("blockinfo.height") }}
                    </div>
                    <div class=" col-md-9 context-black">
                      {{ this.block_info.index }}
                      <el-button
                              id="leftButton"
                              size="mini"
                              icon="el-icon-caret-left"
                              style="margin-left: 5px"
                              @click="getBlockByBlockHeight(this.block_info.index - 1)"
                      ></el-button>
                      <el-button
                              id="rightButton"
                              size="mini"
                              icon="el-icon-caret-right"
                              @click="getBlockByBlockHeight(this.block_info.index + 1)"
                      ></el-button>
                    </div>
                  </div>

                  <div class="row info mt-3  mb-1 " >
                    <div class="col-sm-3 lable-title">
                      {{ $t("blockinfo.time") }}
                    </div>
                    <div class="col-sm-9 context-black">
                      {{ convertPreciseTime(this.block_info.timestamp) }}
                    </div>
                  </div>


                  <div class="row info mt-3  mb-1">
                    <div class="col-sm-3 lable-title">
                      {{ $t("blockinfo.size") }}
                    </div>
                    <div class="col-sm-9 context-black">
                      {{ this.block_info.size }} {{ $t("blockinfo.bytes") }}
                    </div>
                  </div>

                  <div class="row info mt-3  mb-1">
                    <div class="col-sm-3 lable-title">
                      {{ $t("blockinfo.version") }}
                    </div>
                    <div class="col-sm-9 context-black">
                      {{ this.block_info.version }}
                    </div>
                  </div>

                  <div class="row info mt-3  mb-1"  >
                    <div class="col-sm-3 lable-title">
                      {{ $t("blockinfo.blockReward") }}
                    </div>
                    <div class="col-sm-9 context-black">0.5 GAS</div>
                  </div>


                  <div class="row info mt-3  mb-1">
                    <div class="col-sm-3 lable-title">
                        {{ $t("blockinfo.speaker") }}
                      <el-tooltip  :content=this.content placement="right">
                        <i class="el-icon-question"/>
                      </el-tooltip>
                      <el-button type="info" :plain="true" size="small" style="height: 21px; margin-left:6px" @click="changeFormat(button)">
                        {{this.button.buttonName}}</el-button>
                    </div>

                    <div class="col-sm-9 context-black" v-if="this.block_info['speaker']">
                      <router-link class="name mb-0 " id="speaker" style="cursor: pointer; " :to="'/accountprofile/'+this.block_info.speaker">
                        {{ button.state ? scriptHashToAddress( this.block_info["speaker"]) : this.block_info["speaker"] }}
                      </router-link>
<span style="display:-moz-inline-box;display:inline-block;width: 80px!important;vertical-align: center">
                      <i class="ni ni-single-copy-04" id="speakerButton" title="Copy to Clipboard" style="padding-left: 5px; color: grey; cursor: pointer;"  @click="copyItem('speaker','speakerButton','speakerSpan')"></i>
                      <span style="color: #42b983;" id="speakerSpan" ></span>
</span>

                    </div>
                    <div class="col-2 "  v-if="this.block_info['speaker']" >
                     </div>
                  </div>

                  <div class="row info mt-3  mb-1">
                    <div class="col-sm-3 lable-title">
                      <div>{{ $t("blockinfo.preHash") }}</div>
                    </div>
                    <div class="col-sm-9 context-black" v-if="block_info['prevhash']">
                    <router-link    class="name mb-0 " id="preHash" style="cursor: pointer;" :to="'/blockinfo/'+this.block_info.prevhash"   >
                        {{this.block_info.prevhash }}
                    </router-link>
                    <i class="ni ni-single-copy-04" id="preHashButton" title="Copy to Clipboard" style="padding-left: 5px; color: grey; cursor: pointer" @click="copyItem('preHash','preHashButton','preHashSpan')"></i>
                    <span style="color: #42b983" id="preHashSpan" ></span>
                    </div>
                  </div>

                  <div class="row info mt-3  mb-1">
                    <div class="col-sm-3 lable-title">
                      <div>{{ $t("blockinfo.hash") }}</div>
                    </div>
                    <div class="col-sm-9 context-black" v-if="block_info.hash" id="Hash">
                      {{ block_info.hash  }}
                      <i class="ni ni-single-copy-04" id="HashButton" title="Copy to Clipboard" style="padding-left: 5px; color: grey; cursor: pointer" @click="copyItem('Hash','HashButton','HashSpan')"></i>
                      <span style="color: #42b983" id="HashSpan" ></span>
                    </div>
                  </div>

                  <div class="row  info mt-3  mb-1" >
                    <div class="col-sm-3 lable-title ">
                        {{ $t("blockinfo.txns") }}
                    </div>
                    <div class="col-sm-9 context-black">
                      {{ this.block_info.transactioncount }}
                    </div>
                  </div>

                  <div class="row info mt-3  mb-1 "  >
                    <div class="col-sm-3 lable-title">
                        {{ $t("blockinfo.transfers") }}
                    </div>
                    <div class="col-sm-9 context-black">
                      {{
                      parseInt(block_info.nep11count) +
                      parseInt(block_info.nep17count)
                      }}
                    </div>
                  </div>

                  <div class="row info  mt-3  mb-1" >
                    <div class="col-sm-3 lable-title ">
                        {{ $t("blockinfo.totalSysFee") }}
                    </div>
                    <div class="col-sm-9 context-black">
                      {{ this.block_info.systemFee / 100000000 }} GAS
                    </div>
                  </div>

                  <div class="row info mt-3  mb-1" >
                    <div class="col-sm-3 lable-title">
                        {{ $t("blockinfo.totalNetFee") }}
                    </div>
                    <div class="col-sm-9 context-black">
                      {{ this.block_info.networkFee / 100000000 }} GAS
                    </div>
                  </div>

                  <div class="row  mt-3 mb-3">

                  </div>
                </card>
                <div class="row mt-3 mb-3"></div>
              <el-tabs class="list" v-model="activeName"  style="width:80%;margin-left: 10%;" >

                <el-tab-pane :label="$t('blockinfo.trfsList')"  name="first">
                  <div  v-if="
                      block_info != '' &&
                      (block_info.transfer11count !=0||
                        block_info.transfer17count !=0 )"  >
                    <block-transfer
                        :title="$t('blockinfo.txnsList')"
                        :blockHash="this.BlockHash"
                    ></block-transfer>
                    <div class="row mt-3"></div>
                  </div>
                  <card shadow  v-else class="text-center card-style" style="margin-bottom: 50px">{{
                      $t("blockinfo.nullPrompt")
                    }}</card>

                </el-tab-pane>
                <el-tab-pane :label="$t('blockinfo.txnsList')"  name="second">
                  <block-transaction
                      v-if=" this.block_info.transactioncount != 0"
                      :title="$t('blockinfo.txnsList')"
                      :blockHash="this.BlockHash"
                  ></block-transaction>
                  <card shadow v-else class="text-center " style="margin-bottom: 50px">{{
                      $t("blockinfo.nullPrompt")
                    }}</card>
                </el-tab-pane>
              </el-tabs>
              <div class=" row mt-3  mb-3 title2 list" > {{ $t('transactionInfo.witness') }} </div>
                <card shadow class="card-style list" v-if="block_info.witnesses">
                  <el-collapse v-model="activeNames"    style="border: white;">
                    <el-collapse-item :title="$t('transactionInfo.invocation')" name="1"  class="text-title3"  >
                      <div  v-html=" block_info['witnesses'][0]['invocation']" style="margin-left: 5%"></div>
                    </el-collapse-item>
                    <el-collapse-item :title="$t('transactionInfo.verification')" name="2"  style="" >
                      <div  v-html=" block_info['witnesses'][0]['verification']"  style="margin-left:5%"></div>
                    </el-collapse-item>
                  </el-collapse>

                </card>
                <div class="row mt-3"></div>
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
import BlockTransaction from "./BlockTransaction";
import BlockTransfer from "./BlockTransfer";
import toOpcode from "../../directives/typeConvertion";
import {convertPreciseTime, scriptHashToAddress, changeFormat, copyItem} from "../../store/util";
import net from "../../store/store";
export default {

  components: {
    BlockTransaction,
    BlockTransfer,
    Loading,
  },
  data() {
    return {
      network: net.url,
      BlockHash: this.$route.params.hash,
      isLoading: true,
      block_info: [],
      standard: 0,
      manifest: "",
      TxList: [],
      transfercount: "",
      button: { state: true, buttonName: "Hash" },
      activeNames: ['1','2'],
      activeName:"first"
    };
  },
  created() {
    window.scroll(0, 0);
    this.getBlock(this.BlockHash);
    // console.log(this.BlockHash)
  },
  computed:{
    content:function (){
      if(this.$i18n.locale==="en"){
        return "Speaker is the node who invokes this block"
      }else if (this.$i18n.locale==="cn") {
        return "议长结点是提出该区块的结点"
      } else {
        return "Speaker est le nœud qui invoque ce bloc"
      }
    }

  },
  watch: {
    $route: "watchrouter",
  },
  methods: {
    scriptHashToAddress,
    changeFormat,
    convertPreciseTime,
    copyItem,

    watchrouter() {
      //如果路由有变化，执行的对应的动作
      if (this.$route.name === "blockinfo") {
        this.isLoading = true;
        this.BlockHash = this.$route.params.hash;
        this.getBlock(this.BlockHash);
      }
    },
    preBlock(hash) {
      this.isLoading = true;
      this.getBlock(hash);
    },

    getBlock(hash) {
      // console.log(hash);
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
      })
        .then((res) => {
          // console.log(res);
          this.block_info = res["data"]["result"];
          this.block_info["witnesses"][0]["invocation"] = toOpcode(
            this.block_info["witnesses"][0]["invocation"]
          );

        this.block_info["witnesses"][0]["verification"] = toOpcode( this.block_info["witnesses"][0]["verification"])
        let words = this.block_info["witnesses"][0]["verification"].split("<br>")

        this.block_info["speaker"]=words[this.block_info["primary"]+1].substring(10)
        this.isLoading = false;
      }).catch((e)=>{
        console.log(e)
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
        document.getElementById("leftButton").blur()
        document.getElementById("rightButton").blur()
        if (res["data"]["error"] == null) {
          this.$router.push({
            path: `/blockinfo/${res["data"]["result"]["hash"]}`,
          });
        } else {
          return;
        }
      });
    },
  },
};
</script>

<style>
@media screen and (max-width: 790px ){
 .info{
   margin-top:1.5rem!important;
   margin-bottom:1.5rem!important; ;
 }

}
</style>
