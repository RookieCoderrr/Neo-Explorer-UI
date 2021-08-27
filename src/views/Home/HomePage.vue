<template>
  <div class="home" style="background: rgb(250,250,250)" >
    <section class="Intro">
      <h2 class="Intro-h display-2 ">{{ $t("home") }}</h2>
      <div class=" dropAndSearch mt--5">
        <base-dropdown class="dropHome">
          <template v-slot:title >
            <base-button type="secondary" class=" dropdown-toggle dropHomeTitle" >
              {{this.filterName }}
            </base-button>
          </template>
          <li>
            <a class="dropdown-item"  @click="switch_the_filter(0,this.$i18n.locale)">
              <span>{{$t("allFilter")}}</span>
            </a>
          </li>
          <li>
            <a class="dropdown-item"  @click="switch_the_filter(1,this.$i18n.locale)">
              <span>{{$t("blockFilter")}}</span>
            </a>
          </li>
          <li>
            <a class="dropdown-item" @click="switch_the_filter(2,this.$i18n.locale)">
              <span>{{$t("transactionFilter")}}</span>
            </a>
          </li>
          <li>
            <a class="dropdown-item" @click="switch_the_filter(3,this.$i18n.locale)">
              <span>{{$t("contractFilter")}}</span>
            </a>
          </li>
          <li>
            <a class="dropdown-item" @click="switch_the_filter(4,this.$i18n.locale)">
              <span>{{$t("tokenFilter")}}</span>
            </a>
          </li>
          <li>
            <a class="dropdown-item" @click="switch_the_filter(5,this.$i18n.locale)">
              <span>{{$t("addressFilter")}}</span>
            </a>
          </li>
        </base-dropdown>
        <div class="search">
          <input
              type="text"
              class="over-ellipsis"
              :placeholder="$t('search.placeholder')"
              v-model="searchVal"
              @keyup.enter="search()"
          />
          <button class="button" @click="search(this.filter)">
            <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.2141 2.31429C3.61587 0.771429 5.65481 0 7.56631 0C9.47782 0 11.5168 0.771429 13.1734 2.31429C15.8495 5.01429 16.1044 9.25714 13.938 12.2143L17.761 16.0714C18.0159 16.3286 18.0159 16.7143 17.761 16.9714L16.869 17.8714C16.7415 18 16.6141 18 16.3592 18C16.1044 18 15.9769 18 15.8495 17.8714L12.0265 14.0143C10.6247 14.9143 9.09552 15.4286 7.56631 15.4286C5.65481 15.4286 3.61587 14.6571 2.2141 13.2429C-0.716874 10.1571 -0.716874 5.27143 2.2141 2.31429ZM3.99817 11.3143C4.89021 12.3429 6.16454 12.8571 7.56631 12.8571C8.96808 12.8571 10.2424 12.3429 11.1345 11.3143C12.1539 10.4143 12.6637 9.12857 12.6637 7.71429C12.6637 6.3 12.1539 5.01429 11.1345 4.11429C10.2424 3.08571 8.96808 2.57143 7.56631 2.57143C6.16454 2.57143 4.89021 3.08571 3.99817 4.11429C2.9787 5.01429 2.46897 6.3 2.46897 7.71429C2.46897 9.12857 2.9787 10.4143 3.99817 11.3143Z"
                  fill="black"
              />
            </svg>
          </button>
        </div>
      </div>

    </section>
    <div class="row mt-5"></div>




    <div class="main">
      <div class="container-fluid mt--8" style="padding-bottom: 50px;background: rgb(250,250,250)">
        <div  class="col-2 font-weight-bold mb-0 "
              style="font-size: 20px ;color:black;width: 80%">
          <span>{{$t('overview')}}</span>
        </div>
        <div class="row mt-3"></div>
        <div class="elements">
          <div class="row elerow">
            <div class="col-4 ele">
              <div class="eleName">
                {{$t('homePage.totalBLocks')}}
              </div>
              <div class="row mt-2"></div>
              <div class="eleValue">
                <count-to :startVal=this.startBlockVal :endVal=this.blockCount :duration='2000' @click="toBlock" style="cursor: pointer"></count-to>
              </div>
            </div>
            <div class="col-4 ele">
              <div class="eleName">
                {{$t('homePage.totalTxs')}}
              </div>
              <div class="row mt-2"></div>
              <div class="eleValue">
                <count-to :startVal=this.startTxVal :endVal=this.txCount :duration='2000' @click="toTransaction" style="cursor: pointer"></count-to>
              </div>

            </div>
            <div class="col-4 ele">
              <div class="eleName">
                {{$t('homePage.totalTokens')}}
              </div>
              <div class="row mt-2"></div>
              <div class="eleValue">
                <count-to :startVal=this.startAssetVal :endVal=this.assetCount :duration='2000' @click="toAsset" style="cursor: pointer"></count-to>
              </div>

            </div>
          </div>
          <div class="row mt-3"></div>
          <div class="row elerow">
            <div class="col-4 ele">
              <div class="eleName">
                {{$t('homePage.totalCntrts')}}
              </div>
              <div class="row mt-2"></div>
              <div class="eleValue">
                <count-to :startVal=this.startContractVal :endVal=this.contractCount :duration='2000' @click="toContract" style="cursor: pointer"></count-to>
              </div>
            </div>
            <div class="col-4 ele ">
              <div class="eleName">
                {{$t('homePage.totalAddrs')}}
              </div>
              <div class="row mt-2"></div>
              <div class="eleValue">
                <count-to :startVal=this.startAccountVal :endVal=this.accountCount :duration='2000' @click="toAddress" style="cursor: pointer"></count-to>
              </div>

            </div>
            <div class="col-4 ele">
              <div class="eleName">
                {{$t('homePage.totalCndidtes')}}
              </div>
              <div class="row mt-2"></div>
              <div class="eleValue">
                <count-to :startVal=this.startCandidateVal :endVal=this.candidateCount :duration='2000' @click="toCandidate" style="cursor: pointer"></count-to>
              </div>

            </div>

          </div>
          <div class="row mt-3"></div>
        </div>

        <div class="row mt-4">
          <div class="col-6" style="height: 400px">
            <daily-transaction>

            </daily-transaction>
          </div>

          <div class="col-6">
            <active-address>

            </active-address>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-6">
            <blocks-table-homepage
                :title="$t('homePage.recentBlocks')"
                :table-data="blockList"
            ></blocks-table-homepage>
          </div>
          <div class="col-6">
            <transaction-table-homepage
                :title="$t('homePage.recentTxs')"
                :table-data="transactionList"
            ></transaction-table-homepage>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlocksTableHomepage from "./BlocksTableHomepage";
import TransactionTableHomepage from "./TransactionsTableHomepage";
import axios from "axios";
// import StatsCard from "../components/StatsCard";
import Neon from "@cityofzion/neon-js";
import {render} from "timeago.js";
import CountTo from "../../components/countTo";
import en from "../../lang/en.js"
import zh from "../../lang/zh_cn.js"
import fr from "../../lang/fr.js"
import DailyTransaction from "../BurnGas/DailyTransaction";
import ActiveAddress from "../BurnGas/ActiveAddress";

export default {
  name: "Home",
  components: {
    DailyTransaction,
    BlocksTableHomepage,
    ActiveAddress,
    // StatsCard,
    TransactionTableHomepage,
    CountTo,
  },
  data() {
    return {
      blockCount: 0,
      txCount: 0,
      accountCount: 0,
      assetCount: 0,
      contractCount: 0,
      candidateCount: 0,
      searchVal: "",
      isLoading: false,
      isHashPattern: /^((0x)?)([0-9a-f]{64})$/,
      isAssetPattern: /^((0x)?)([0-9a-f]{40})$/,
      isAddressPattern: /^N([0-9a-zA-Z]{33})$/,
      isNumberPattern: /^\d+$/,
      webSock: null,
      //数字开始
      startBlockVal: 0,
      startTxVal: 0,
      startAccountVal: 0,
      startAssetVal: 0,
      startContractVal: 0,
      startCandidateVal: 0,

      websock: null,
      blockList:[],
      transactionList:[],
      filter:0,
      filterName: "All Filter",
    };
  },

  created() {
    this.getBlockCount();
    this.getTxCount();
    this.getAccountCount();
    this.getAssetCount();
    this.getContractCount();
    this.getCandidateCount();
    this.getBlockList();
    this.getTransactionList();
    this.initWebSocket()
  },
  updated() {
    const nodes = document.getElementsByClassName('timeago')
    if(nodes.length != 0){
    if(this.$i18n.locale === 'cn'){
      render(nodes, 'zh_CN');
    }else{
      render(nodes, this.$i18n.locale );
    }
    }
  },
  unmounted() {
    //页面销毁时关闭长连接
     this.websocketclose();
  },
  methods: {
    initWebSocket(){ //初始化weosocket
      const wsuri = "ws://testneofura.ngd.network:2026/home";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen(){ //连接建立之后执行send方法发送数据
      let actions = {"test":"12345"};
      this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror(){//连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e){ //数据接收
  // console.log(e.data)
      if( e.data != 'hello neo3fura'){
      try{
      const redata = JSON.parse(e.data);
      if (Object.keys(redata)[0] ==="BlockCount"){
          this.startBlockVal = this.blockCount
          this.blockCount = redata['BlockCount']["total counts"]
        }else if(Object.keys(redata)[0] ==="TransactionCount"){
          this.startTxVal = this.txCount
          this.txCount = redata["TransactionCount"]["total counts"]
      }else if (Object.keys(redata)[0] ==="AddressCount"){
        this.startAccountVal = this.accountCount
          this.accountCount = redata["AddressCount"]["total counts"]
      }else if (Object.keys(redata)[0] ==="AssetCount"){
        this.startAssetVal = this.assetCount
        this.assetCount = redata["AssetCount"]["total counts"]
      }else if (Object.keys(redata)[0] ==="ContractCount"){
        this.startContractVal =this.contractCount
        this.contractCount = redata["ContractCount"]["total counts"]
      }else if (Object.keys(redata)[0] ==="CandidateCount"){
        this.startCandidateVal = this.candidateCount
          this.candidateCount = redata["CandidateCount"]["total counts"]
      }else if (Object.keys(redata)[0] ==="BlockInfoList"){
          this.blockList = redata["BlockInfoList"]
      }else if (Object.keys(redata)[0] ==="TransactionList"){
        this.transactionList = redata["TransactionList"]
      }
      }catch (e) {
        console.log(e)
      }
      }
    },
    websocketsend(Data){//数据发送
      this.websock.send(Data);
    },
    websocketclose(e){  //关闭
      console.log('断开连接',e);
    },
    switch_the_filter(num,language){
      this.$i18n.locale = language;
      switch (num){
        case 0:
          this.filter=0
          if (language === "en") {
            this.filterName= en.allFilter
          }else if (language === "cn") {
            this.filterName = zh.allFilter
          }else {
            console.log(language)
            this.filterName = fr.allFilter
          }
          break;
        case 1:
          this.filter=1
          if (language === "en") {
            this.filterName= en.blockFilter
          }else if (language === "cn") {
            this.filterName = zh.blockFilter
          }else {
            this.filterName = fr.blockFilter
          }
          break;
        case 2:
          this.filter=2
          if (language === "en") {
            this.filterName= en.transactionFilter
          }else if (language === "cn") {
            this.filterName = zh.transactionFilter
          }else {
            this.filterName = fr.transactionFilter
          }
          break;
        case 3:
          this.filter=3
          if (language === "en") {
            this.filterName= en.contractFilter
          }else if (language === "cn") {
            this.filterName = zh.contractFilter
          }else {
            this.filterName = fr.contractFilter
          }
          break;
        case 4:
          this.filter=4
          if (language === "en") {
            this.filterName= en.tokenFilter
          }else if (language === "cn") {
            this.filterName = zh.tokenFilter
          }else {
            this.filterName = fr.tokenFilter
          }
          break;
        case 5:
          this.filter=5
          if (language === "en") {
            this.filterName= en.addressFilter
          }else if (language === "cn") {
            this.filterName = zh.addressFilter
          }else {
            this.filterName = fr.addressFilter
          }
          break;
        default:
          this.filter=0
          if (language === "en") {
            this.filterName= en.allFilter
          }else if (language === "cn") {
            this.filterName = zh.allFilter
          }else {
            this.filterName = fr.allFilter
          }
      }

    },
    switch_the_language(language) {
      if (language === "cn") {
        this.lang = "中文 " + "🇨🇳";
      } else if (language === "en") {
        this.lang = "English " + "🇬🇧";
      } else if (language === "fr") {
        this.lang = "Français " + "🇫🇷";
      }
    },
    getBlockCount() {
      axios({
        method: "post",
        url: "/api",
        data: {
          params: {},
          jsonrpc: "2.0",
          id: 1,
          method: "GetBlockCount",
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        this.blockCount = res["data"]["result"]["index"];
      });
    },
    getTxCount() {
      axios({
        method: "post",
        url: "/api",
        data: {
          params: {},
          jsonrpc: "2.0",
          id: 1,
          method: "GetTransactionCount",
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        this.txCount = res["data"]["result"]["total counts"];
      });
    },
    getAccountCount() {
      axios({
        method: "post",
        url: "/api",
        data: {
          params: {},
          jsonrpc: "2.0",
          id: 1,
          method: "GetAddressCount",
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        this.accountCount = res["data"]["result"]["total counts"];
      });
    },
    getAssetCount() {
      axios({
        method: "post",
        url: "/api",
        data: {
          params: {},
          jsonrpc: "2.0",
          id: 1,
          method: "GetAssetCount",
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        this.assetCount = res["data"]["result"]["total counts"];
      });
    },
    getContractCount() {
      axios({
        method: "post",
        url: "/api",
        data: {
          params: {},
          jsonrpc: "2.0",
          id: 1,
          method: "GetContractCount",
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        this.contractCount = res["data"]["result"]["total counts"];
      });
    },
    getCandidateCount() {
      axios({
        method: "post",
        url: "/api",
        data: {
          params: {},
          jsonrpc: "2.0",
          id: 1,
          method: "GetCandidateCount",
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        this.candidateCount = res["data"]["result"]["total counts"];
      });
    },
    getBlockList() {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { Limit: 10, Skip: 0 },
          method: "GetBlockInfoList",
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        this.blockList = res["data"]["result"]["result"];
      });
    },
    getTransactionList() {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { Limit: 10, Skip: 0 },
          method: "GetTransactionList",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.transactionList = res["data"]["result"]["result"];
      });
    },
    search(num) {
      var value;
      switch (num){
        case 0:
          console.log("All success")
          this.isLoading = true;
          value = this.searchVal;
          value = value.trim();
          this.searchVal = "";
          if (value === "") {
            this.$router.push({
              path: `/homepage`,
            });
            this.isLoading = false;
          } else if (this.isHashPattern.test(value)) {
            if (value.length === 64) {
              value = "0x" + value;
            }
            this.getTransactionByTransactionHash(value);
          } else if (this.isAssetPattern.test(value)) {
            if (value.length === 40) {
              value = "0x" + value;
            }
            this.getToken(value);
          } else if (Number(value[0]) >= 0) {
            value = value.replace(/[,，]/g, "");
            if (!isNaN(Number(value)) && this.isNumberPattern.test(value)) {
              if (Number.isInteger(Number(value))) {
                this.getBlockByBlockHeight(value);
              }
            } else {
              this.isLoading = false;
              this.$router.push({
                path: `/search`,
              });
            }
          } else if (this.isAddressPattern.test(value)) {
            this.getAddressByAddress(this.addressToScriptHash(value));
          } else {
            this.isLoading = false;
            this.$router.push({
              path: `/search`,
            });
          };
          break;
        case 1:
          console.log("Block success")
          this.isLoading = true;
          value = this.searchVal;
          value = value.trim();
          this.searchVal = "";
          if (value === "") {
            this.$router.push({
              path: `/homepage`,
            });
            this.isLoading = false;
          }
          else if (this.isHashPattern.test(value)) {
            console.log(2)
            if (value.length === 64) {
              value = "0x" + value;
            }
            this.getBlockByBlockHash(value);
          }else if (Number(value[0]) >= 0) {
            console.log(1)
            value = value.replace(/[,，]/g, "");
            if (!isNaN(Number(value)) && this.isNumberPattern.test(value)) {
              if (Number.isInteger(Number(value))) {
                this.getBlockByBlockHeight(value);
              }
            } else {
              this.isLoading = false;
              this.$router.push({
                path: `/search`,
              });
            }
          }  else {
            console.log(3)
            this.isLoading = false;
            this.$router.push({
              path: `/search`,
            });
          }
          break;
        case 2:
          console.log("Transaction success")
          this.isLoading = true;
          value = this.searchVal;
          value = value.trim();
          this.searchVal = "";
          if (value === "") {
            this.$router.push({
              path: `/homepage`,
            });
            this.isLoading = false;
          }else if (this.isHashPattern.test(value)) {
            if (value.length === 64) {
              value = "0x" + value;
            }
            axios({
              method: "post",
              url: "/api",
              data: {
                jsonrpc: "2.0",
                id: 1,
                params: { TransactionHash: value },
                method: "GetRawTransactionByTransactionHash",
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
                  path: `/transactionInfo/${value}`,
                });
              } else {
                this.$router.push({
                  path: `/search`,
                });
              }
            });
          }else {
            this.isLoading = false;
            this.$router.push({
              path: `/search`,
            });
          };
          break;
        case 3:
          console.log("Contract success")
          this.isLoading = true;
          value = this.searchVal;
          value = value.trim();
          this.searchVal = "";
          if (value === "") {
            this.$router.push({
              path: `/homepage`,
            });
            this.isLoading = false;
          }else if (this.isAssetPattern.test(value)) {
            if (value.length === 40) {
              value = "0x" + value;
            }
            axios({
              method: "post",
              url: "/api",
              data: {
                jsonrpc: "2.0",
                id: 1,
                params: { ContractHash: value },
                method: "GetContractByContractHash",
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
                  path: `/contractinfo/${value}`,
                });
              } else {
                this.$router.push({
                  path: `/search`,
                });
              }
            });
          } else {
            this.isLoading = false;
            this.$router.push({
              path: `/search`,
            });
          };
          break;
        case 4:
          console.log("Asset success")
          this.isLoading = true;
          value = this.searchVal;
          value = value.trim();
          this.searchVal = "";
          if (value === "") {
            this.$router.push({
              path: `/homepage`,
            });
            this.isLoading = false;
          } else if (this.isAssetPattern.test(value)) {
            if (value.length === 40) {
              value = "0x" + value;
            }
            axios({
              method: "post",
              url: "/api",
              data: {
                jsonrpc: "2.0",
                id: 1,
                params: { ContractHash: value },
                method: "GetAssetInfoByContractHash",
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
                  path: `/tokeninfo/${value}`,
                });
              } else {
                this.$router.push({
                  path: `/search`,
                });
              }
            });
          }
          else {
            this.isLoading = false;
            this.$router.push({
              path: `/search`,
            });
          };
          break;
        case 5:
          console.log("Address success")
          this.isLoading = true;
          value = this.searchVal;
          value = value.trim();
          this.searchVal = "";
          if (value === "") {
            this.$router.push({
              path: `/homepage`,
            });
            this.isLoading = false;
          }else if (this.isAssetPattern.test(value)) {
            if (value.length === 40) {
              value = "0x" + value;
            }
            axios({
              method: "post",
              url: "/api",
              data: {
                jsonrpc: "2.0",
                method: "GetAddressByAddress",
                params: { Address: value },
                id: 1,
              },
              headers: {
                "Content-Type": "application/json",
                withCredentials: "true",
                crossDomain: "true",
              },
            }).then((res) => {
              this.isLoading = false;
              if (res["data"]["error"] == null) {
                this.$router.push({
                  path: `/accountprofile/${value}`,
                });
              } else {
                this.isLoading = false;
                this.$router.push({
                  path: `/search`,
                });
              }
            });
          } else if (this.isAddressPattern.test(value)) {
            this.getAddressByAddress(this.addressToScriptHash(value));
          }
      }

    },
    addressToScriptHash(addr) {
      try {
        const acc = Neon.create.account(addr);
        return "0x" + acc.scriptHash;
      } catch (err) {
        this.$router.push({
          path: `/search`,
        });
      }
    },
    getBlockByBlockHash(block_hash) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { BlockHash: block_hash },
          method: "GetBlockByBlockHash",
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
          this.$router.push({
            path: `/search`,
          });
        }
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
          this.$router.push({
            path: `/search`,
          });
        }
      });
    },
    getAddressByAddress(addr) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          method: "GetAddressByAddress",
          params: { Address: addr },
          id: 1,
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: "true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.isLoading = false;
        if (res["data"]["error"] == null) {
          this.$router.push({
            path: `/accountprofile/${addr}`,
          });
        } else {
          this.isLoading = false;
          this.$router.push({
            path: `/search`,
          });
        }
      });
    },

    getToken(value) {
        axios({
          method: "post",
          url: "/api",
          data: {
            jsonrpc: "2.0",
            id: 1,
            params: { ContractHash: value },
            method: "GetAssetInfoByContractHash",
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
              path: `/tokeninfo/${value}`,
            });
          } else {
            this.getContractInfoByContractHash(value);
          }
        });
    },
    getContractInfoByContractHash(value) {
        axios({
          method: "post",
          url: "/api",
          data: {
            jsonrpc: "2.0",
            id: 1,
            params: { ContractHash: value },
            method: "GetContractByContractHash",
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
              path: `/contractinfo/${value}`,
            });
          } else {
            this.getAddressByAddress(value);
          }
        });
    },

    getTransactionByTransactionHash(value) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { TransactionHash: value },
          method: "GetRawTransactionByTransactionHash",
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
            path: `/transactionInfo/${value}`,
          });
        } else {
          this.getBlockByBlockHash(value);
        }
      });
    },
    toBlock() {
      this.$router.push({
        path: `/blocks`,
      });
    },
    toCandidate() {
      this.$router.push({
        path: `/candidates`,
      });
    },
    toTransaction() {
      this.$router.push({
        path: `/Transactions`,
      });
    },
    toAsset() {
      this.$router.push({
        path: `/tokens`,
      });
    },
    toAddress() {
      this.$router.push({
        path: `/account`,
      });
    },
    toContract() {
      this.$router.push({
        path: `/contracts`,
      });
    },

  },
};
</script>
<style>
.Intro {
  width: 80%;
  margin-left: 10%;
  background: rgb(250,250,250);
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.Intro-h {
  font-family: Inter;
  font-style: normal;
  font-weight: bold !important;
  font-size: 45px!important;
  line-height: 58px;
  /* identical to box height */
  color: black;
  margin-bottom: 80px;
}
.dropAndSearch{
  background: rgb(250,250,250);
  width: 100%;
  max-width: 1200px!important;
  padding-right: 1px;
  height: 70px !important;
}

.search {
  background: white;
  max-width: 1200px!important;
  width: 89%;
  float: right;
  height: 100%;
  filter: drop-shadow(0px 20px 20px rgba(0, 0, 0, 0.04));
}
.dropHome {
  height: 70px!important;
  width: 11%;
}
.dropHomeTitle{
  height: 70px!important;
  width: 100%;
  background: white;
  border-radius: 2px!important;
  box-shadow: none!important;
}
.img {
  width: 26px;
}
.over-ellipsis {
  width: 100%;
  height: 100%;
  padding-right: 71px;
  padding-left: 10px;
  font-size: 18px;
  background: white;
  border: 0px !important;
  border-radius: 4px;
  color: black;
  outline:none
}
.button {
  cursor: pointer;
  position: absolute;
  right: 1px;
  bottom: 1px;
  top: 1px;
  width: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #ffffff !important;
  border-radius: 4px;
  border: white;
}

.elements{
  background: white;
}
.ele{

}
.eleName{
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 15px;
  align-items: center;

  color: rgba(40, 43, 52, 0.3);

  mix-blend-mode: normal;
}
.elerow{
  padding-top: 30px;
  padding-left: 50px;
}
.eleValue{
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
}
.main{
  width: 85%;
  height: 30%;
  /*top: 268px;*/
  margin:0 auto;
  background: #FFFFFF;
  border-radius: 4px;
}
</style>
