<template>
  <div class="home" style="background: #f7f8fa" >
    <div class="Intro">
      <div class="container-fluid mt--5" >
        <h2 class="Intro-h display-2 ">{{ $t("home") }}</h2>
        <div class=" dropAndSearch mt--5">
          <div class="search">
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
                    fill="#165DFF"
                />
              </svg>
            </button>
            <input
                type="text"
                class="over-ellipsis"
                :placeholder="$t('search.placeholder')"
                @keyup.enter="search(this.filter)"
                v-model="searchVal"

            />
            <el-dropdown class="dropHome1">
            <span class="fontsize el-dropdown-link">
            {{this.filterName}}
            <i class="custom-icon el-icon-arrow-down" size="2px"></i>
            </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="switch_the_filter(0,this.$i18n.locale)">{{$t("allFilter")}}</el-dropdown-item>
                  <el-dropdown-item @click="switch_the_filter(1,this.$i18n.locale)">{{$t("blockFilter")}}</el-dropdown-item>
                  <el-dropdown-item @click="switch_the_filter(2,this.$i18n.locale)">{{$t("transactionFilter")}}</el-dropdown-item>
                  <el-dropdown-item @click="switch_the_filter(3,this.$i18n.locale)">{{$t("contractFilter")}}</el-dropdown-item>
                  <el-dropdown-item @click="switch_the_filter(4,this.$i18n.locale)">{{$t("tokenFilter")}}</el-dropdown-item>
                  <el-dropdown-item @click="switch_the_filter(5,this.$i18n.locale)">{{$t("addressFilter")}}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>

          </div>
      </div>
    </div>

    <div class="row mt-5"></div>

    <div class="main">
      <div class="container-fluid mt--8" style="padding-bottom: 50px;background: #f7f8fa">
        <div  class="col-md-2 font-weight-bold mb-0 "
              style="font-size: 20px ;color:black;width: 80%">
          <span>{{$t('overview')}}</span>
        </div>
        <div class="row mt-1"></div>
        <div class="row row-cols-lg-3 row-cols-md-2 row-cols-1">
          <div class="col mt-4" >
            <div class=" homecard" @click="toBlock">
              <div style="width: 40%; height: 160px; float:left;display: flex;justify-content: center;align-items: center;">

                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" >
                  <rect opacity="0.05" width="64" height="64" rx="32" fill="#5B93FF"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M31.5 20L43 25.9133V39.0867L31.5 45L20 39.0867V25.9133L31.5 20ZM22.4211 28.5741V37.6709L30.2895 41.7168V32.62L22.4211 28.5741ZM32.7105 32.62V41.7168L40.5789 37.6709V28.5741L32.7105 32.62ZM39.2023 26.6212L31.5 22.6607L23.7977 26.6212L31.5 30.5818L39.2023 26.6212Z" fill="#165DFF"/>
                </svg>

              </div>
              <div style="width: 60%; height: 160px; float: left;display: flex;align-items: center;">
                <div class="elehome">
                  <div class="eleName ">
                    {{$t('homePage.totalBLocks')}}
                  </div>
                  <div class="row mt-2"></div>
                  <div class="eleValue">
                    <count-to :startVal=this.startBlockVal :endVal=this.blockCount :duration='2000'  style="cursor: pointer"></count-to>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="col mt-4">
            <div class=" homecard" @click="toTransaction">
              <div style="width: 40%; height: 160px; float:left;display: flex;justify-content: center;align-items: center;">
                <div class="circle" style="display: flex;justify-content: center;align-items: center;">
                  <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.875 11.1562C14.875 7.63537 12.0208 4.78119 8.50003 4.78119V2.65619C13.1945 2.65619 17 6.46177 17 11.1562C17 13.4718 16.0726 15.573 14.5714 17.105L13.0536 15.6177C14.1814 14.4668 14.875 12.8936 14.875 11.1562Z" fill="#165DFF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.43768 14.3438L12.396 18.0625L7.43768 21.7812V14.3438Z" fill="#165DFF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.56227 0V7.4375L4.60394 3.71875L9.56227 0Z" fill="#165DFF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.94638 6.69481C2.81859 7.8457 2.125 9.41896 2.125 11.1563C2.125 14.6771 4.97918 17.5313 8.5 17.5313V19.6563C3.80558 19.6563 0 15.8508 0 11.1563C0 8.84068 0.927384 6.73951 2.42862 5.20752L3.94638 6.69481Z" fill="#165DFF"/>
                  </svg>
                </div>





              </div>
              <div style="width: 60%; height: 160px; float: left;display: flex;align-items: center;">
                <div class="elehome">
                  <div class="eleName">
                    {{$t('homePage.totalTxs')}}
                  </div>
                  <div class="row mt-2"></div>
                  <div class="eleValue">
                    <count-to :startVal=this.startTxVal :endVal=this.txCount :duration='2000'  style="cursor: pointer"></count-to>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="col mt-4">
            <div class=" homecard"  @click="toAsset">
              <div style="width: 40%; height: 160px; float:left;display: flex;justify-content: center;align-items: center;">
                <div class="circle" style="display: flex;justify-content: center;align-items: center;">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z" fill="#165DFF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.08583 10L10 5.08579L14.9143 10L10 14.9142L5.08583 10ZM7.91426 10L10 12.0858L12.0858 10L10 7.91421L7.91426 10Z" fill="#165DFF"/>
                  </svg>

                </div>





              </div>
              <div style="width: 60%; height: 160px; float: left;display: flex;align-items: center;">
                <div class="elehome">
                  <div class="eleName">
                    {{$t('homePage.totalTokens')}}
                  </div>
                  <div class="row mt-2"></div>
                  <div class="eleValue">
                    <count-to :startVal=this.startAssetVal :endVal=this.assetCount :duration='2000' style="cursor: pointer"></count-to>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="col mt-4">
            <div class=" homecard" @click="toContract">
              <div style="width: 40%; height: 160px; float:left;display: flex;justify-content: center;align-items: center;">
                <div class="circle" style="display: flex;justify-content: center;align-items: center;">
                  <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.8 1.8V16.2H13.5V6.22279L9.07721 1.8H1.8ZM0 1.35C0 0.604416 0.604415 0 1.35 0H9.82279L15.3 5.47721V16.65C15.3 17.3956 14.6956 18 13.95 18H1.35C0.604417 18 0 17.3956 0 16.65V1.35Z" fill="#165DFF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.54999 5.4V1.125H10.35V4.95H14.175V6.75H9.89999C9.1544 6.75 8.54999 6.14558 8.54999 5.4Z" fill="#165DFF"/>
                  </svg>

                </div>





              </div>
              <div style="width: 60%; height: 160px; float: left;display: flex;align-items: center;">
                <div class="elehome">
                  <div class="eleName">
                    {{$t('homePage.totalCntrts')}}
                  </div>
                  <div class="row mt-2"></div>
                  <div class="eleValue">
                    <count-to :startVal=this.startContractVal :endVal=this.contractCount :duration='2000'  style="cursor: pointer"></count-to>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="col mt-4 ">
            <div class=" homecard" @click="toAddress">
              <div style="width: 40%; height: 160px; float:left;display: flex;justify-content: center;align-items: center;">
                <div class="circle" style="display: flex;justify-content: center;align-items: center;">
                  <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.55668 5.77865C6.82019 5.77865 6.22315 6.37569 6.22315 7.11218C6.22315 7.84867 6.82019 8.44572 7.55668 8.44572C8.29317 8.44572 8.89021 7.84867 8.89021 7.11218C8.89021 6.37569 8.29317 5.77865 7.55668 5.77865ZM4.44511 7.11218C4.44511 5.39371 5.83821 4.00061 7.55668 4.00061C9.27516 4.00061 10.6683 5.39371 10.6683 7.11218C10.6683 8.83066 9.27516 10.2238 7.55668 10.2238C5.83821 10.2238 4.44511 8.83066 4.44511 7.11218Z" fill="#165DFF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.55668 1.77804C4.38743 1.77804 1.77804 4.42341 1.77804 7.73689C1.77804 8.45224 2.10488 9.39044 2.70695 10.4681C3.29684 11.524 4.09496 12.6163 4.91102 13.6141C5.72438 14.6086 6.54015 15.4905 7.1538 16.1248C7.30094 16.2769 7.43619 16.4145 7.55668 16.5356C7.67717 16.4145 7.81242 16.2769 7.95956 16.1248C8.57321 15.4905 9.38898 14.6086 10.2023 13.6141C11.0184 12.6163 11.8165 11.524 12.4064 10.4681C13.0085 9.39044 13.3353 8.45224 13.3353 7.73689C13.3353 4.42341 10.7259 1.77804 7.55668 1.77804ZM7.55668 17.7804C6.94809 18.4285 6.94797 18.4284 6.94782 18.4282L6.94611 18.4266L6.94171 18.4225L6.92583 18.4074C6.91729 18.3993 6.90636 18.389 6.89314 18.3763C6.88518 18.3687 6.87639 18.3603 6.86679 18.3511C6.81571 18.3022 6.74171 18.2308 6.64805 18.1391C6.4608 17.9556 6.19467 17.6906 5.87592 17.3611C5.23938 16.7032 4.38824 15.7834 3.53468 14.7397C2.68382 13.6994 1.81503 12.5172 1.15473 11.3353C0.506621 10.1752 0 8.91252 0 7.73689C0 3.48642 3.36104 0 7.55668 0C11.7523 0 15.1134 3.48642 15.1134 7.73689C15.1134 8.91252 14.6067 10.1752 13.9586 11.3353C13.2983 12.5172 12.4295 13.6994 11.5787 14.7397C10.7251 15.7834 9.87398 16.7032 9.23744 17.3611C8.91869 17.6906 8.65256 17.9556 8.4653 18.1391C8.37165 18.2308 8.29765 18.3022 8.24657 18.3511C8.22102 18.3756 8.20121 18.3945 8.18752 18.4074L8.17164 18.4225L8.16725 18.4266L8.16553 18.4282C8.16539 18.4284 8.16527 18.4285 7.55668 17.7804ZM7.55668 17.7804L8.16553 18.4282L7.55668 19L6.94782 18.4282L7.55668 17.7804Z" fill="#165DFF"/>
                  </svg>
                </div>
              </div>
              <div style="width: 60%; height: 160px; float: left;display: flex;align-items: center;">
                <div class="elehome">
                  <div class="eleName">
                    {{$t('homePage.totalAddrs')}}
                  </div>
                  <div class="row mt-2"></div>
                  <div class="eleValue">
                    <count-to :startVal=this.startAccountVal :endVal=this.accountCount :duration='2000'  style="cursor: pointer"></count-to>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="col mt-4">
            <div class=" homecard" @click="toCandidate">
              <div style="width: 40%; height: 160px; float:left;display: flex;justify-content: center;align-items: center;">
                <div class="circle" style="display: flex;justify-content: center;align-items: center;">
                  <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.38405 2.07274C5.91139 2.07274 4.71756 3.26656 4.71756 4.73923C4.71756 6.21189 5.91139 7.40571 7.38405 7.40571C8.85671 7.40571 10.0505 6.21189 10.0505 4.73923C10.0505 3.26656 8.85671 2.07274 7.38405 2.07274ZM2.64482 4.73923C2.64482 2.12182 4.76664 0 7.38405 0C10.0014 0 12.1233 2.12182 12.1233 4.73923C12.1233 7.35663 10.0014 9.47845 7.38405 9.47845C4.76664 9.47845 2.64482 7.35663 2.64482 4.73923Z" fill="#165DFF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.8478 5.77556C15.2516 5.77556 14.7682 6.25889 14.7682 6.85511C14.7682 7.45133 15.2516 7.93466 15.8478 7.93466C16.444 7.93466 16.9273 7.45133 16.9273 6.85511C16.9273 6.25889 16.444 5.77556 15.8478 5.77556ZM12.6955 6.85511C12.6955 5.11415 14.1068 3.70282 15.8478 3.70282C17.5888 3.70282 19.0001 5.11415 19.0001 6.85511C19.0001 8.59607 17.5888 10.0074 15.8478 10.0074C14.1068 10.0074 12.6955 8.59607 12.6955 6.85511Z" fill="#165DFF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 14.725C0 12.4355 1.85599 10.5795 4.14547 10.5795H10.6228C12.9123 10.5795 14.7682 12.4355 14.7682 14.725V19H0V14.725ZM4.14547 12.6523C3.00073 12.6523 2.07274 13.5803 2.07274 14.725V16.9273H12.6955V14.725C12.6955 13.5803 11.7675 12.6523 10.6228 12.6523H4.14547Z" fill="#165DFF"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.007 13.7102H15.8479V11.6375H18.007C19.7241 11.6375 21.1161 13.0295 21.1161 14.7466V17.9421H15.8479V15.8693H19.0434V14.7466C19.0434 14.1742 18.5794 13.7102 18.007 13.7102Z" fill="#165DFF"/>
                  </svg>


                </div>
              </div>
              <div style="width: 60%; height: 160px; float: left;display: flex;align-items: center;">
                <div class="elehome">
                  <div class="eleName">
                    {{$t('homePage.totalCndidtes')}}
                  </div>
                  <div class="row mt-2"></div>
                  <div class="eleValue">
                    <count-to :startVal=this.startCandidateVal :endVal=this.candidateCount :duration='2000'  style="cursor: pointer"></count-to>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div class="row mt-6">
          <div class="col-lg-6" style="height: 400px">
            <daily-transaction>

            </daily-transaction>
          </div>

          <div class="col-lg-6">
            <active-address>

            </active-address>
          </div>
        </div>
        <div class="row mt-6 screenxl">
          <div class="col-xl-4 ">
            <blocks-table-homepage
                :title="$t('homePage.recentBlocks')"
                :table-data="blockList"
            ></blocks-table-homepage>
          </div>
          <div class="col-xl-8 ">
            <transaction-table-homepage
                :title="$t('homePage.recentTxs')"
                :table-data="transactionList"
            ></transaction-table-homepage>
          </div>
        </div>
        <div class="row mt-6 screenlg">
          <div class="col-xl-5 ">
            <blocks-table-homepage
                :title="$t('homePage.recentBlocks')"
                :table-data="blockList"
            ></blocks-table-homepage>
          </div>
          <div class="col-xl-7 ">
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
import net from "../../store/store";

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
      network: net.url,
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
    };
  },

  created() {
    window.scroll(0, 0);
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
  computed:{
    filterName:function (){
      if(this.$i18n.locale==="en"){
        switch (this.filter) {
          case 0:
            return en.allFilter
          case 1:
            return en.blockFilter
          case 2:
            return en.transactionFilter
          case 3:
            return en.contractFilter
          case 4:
            return en.tokenFilter
          case 5:
            return en.addressFilter
          default:
            return en.allFilter
        }
      }else if (this.$i18n.locale==="cn") {
        switch (this.filter) {
          case 0:
            return zh.allFilter
          case 1:
            return zh.blockFilter
          case 2:
            return zh.transactionFilter
          case 3:
            return zh.contractFilter
          case 4:
            return zh.tokenFilter
          case 5:
            return zh.addressFilter
          default:
            return zh.allFilter
        }
      } else {
        switch (this.filter) {
          case 0:
            return fr.allFilter
          case 1:
            return fr.blockFilter
          case 2:
            return fr.transactionFilter
          case 3:
            return fr.contractFilter
          case 4:
            return fr.tokenFilter
          case 5:
            return fr.addressFilter
          default:
            return fr.allFilter
        }
      }
    }

  },
  unmounted() {
    //页面销毁时关闭长连接
     this.websocketclose();
  },
  methods: {
    initWebSocket(){ //初始化weosocket
      const wsuri = "wss://testneofura.ngd.network:3036/home";
      const wsuriMain = "wss://neofura.ngd.network:2027/home";
      // console.log(`${location.hostname}`)
      if (`${location.hostname}`=== "explorer.onegate.space"){
        this         .websock = new WebSocket(wsuriMain);

      } else if(`${location.hostname}`=== "testnet.explorer.onegate.space") {
        this.websock = new WebSocket(wsuri);

      }
      // this.websock = new WebSocket(wsuri);
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
        // console.log(this.blockList)
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
                if(res["data"]["result"]["type"] === "NEP17"){
                  this.$router.push({
                    path: `/NEP17tokeninfo/${value}`,
                  });
                }else if (res["data"]["result"]["type"] === "NEP11"){
                  this.$router.push({
                    path: `/NFTtokeninfo/${value}`,
                  });
                } else {
                  this.$router.push({
                    path: `/contractinfo/${value}`,
                  });
                }
              }  else {
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
            if(res["data"]["result"]["type"] === "NEP17"){
              this.$router.push({
                path: `/NEP17tokeninfo/${value}`,
              });
            }else if (res["data"]["result"]["type"] === "NEP11"){
              this.$router.push({
                path: `/NFTtokeninfo/${value}`,
              });
            } else {
              this.$router.push({
                path: `/contractinfo/${value}`,
              });
            }
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
        path: `/blocks/1`,
      });
    },
    toCandidate() {
      this.$router.push({
        path: `/candidates/1`,
      });
    },
    toTransaction() {
      this.$router.push({
        path: `/Transactions/1`,
      });
    },
    toAsset() {
      this.$router.push({
        path: `/tokens/Nep17/1`,
      });
    },
    toAddress() {
      this.$router.push({
        path: `/account/1`,
      });
    },
    toContract() {
      this.$router.push({
        path: `/contracts/1`,
      });
    },

  },
};
</script>
<style>
.Intro {
  width: 85%;
  margin:0 auto;
  background: #f7f8fa;
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
  text-align: center;
  /* identical to box height */
  color: black;
  margin-bottom: 80px;
}
.dropAndSearch{
  background: rgb(250,250,250);
  width: 100%;
  height: 70px !important;
}

.search {
  background: white;
  width: 100%;

  height: 100%;
  filter: drop-shadow(0px 20px 20px rgba(0, 0, 0, 0.04));
  position: relative;
}
.dropHome1 {
  position: absolute;
  right: 20px;
  bottom: 1px;
  top: 1px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
  padding-left: 72px;
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
  left: 1px;
  bottom: 1px;
  top: 1px;
  width: 70px;
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

.eleName{
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;

  /* grey300 */

  color: #4E5969;

  mix-blend-mode: normal;
}
.elerow{
  padding-top: 30px;
  padding-left: 50px;
}
.elehome{
}
.eleValue{
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  /* identical to box height */


  /* grey900 */

  color: #1D2129;
}
.circle {
  width: 64px;
  height: 64px;
  left: 578px;
  top: 525px;
  background: #f8faff;
  opacity: 1;
  border-radius: 55px;
}
.main{
  width: 85%;
  height: 30%;
  /*top: 268px;*/
  margin:0 auto;
  background-color: #f7f8fa;
  border-radius: 4px;
}
.fontsize{
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */


  /* blue500 */

  color: #165DFF;

  mix-blend-mode: normal;
}
.homecard {
  width: 99.6%;
  margin-left: 0.2%;
  height: 160px;

  background: #FFFFFF;
  border-radius: 4px;
  cursor:pointer;

}
.homecard:hover{
  -webkit-box-shadow: #ccc 0px 4px 10px;
  -moz-box-shadow: #ccc 0px 4px 10px;
  box-shadow: #ccc 0px 4px 10px;
}
@media screen and (max-width: 992px ){
  .dropHome1{
    display: none;
  }
  .search{
    width: 100%;
  }

}
@media screen and (min-width: 1400px ){
  .screenlg{
    display: none;
  }
}
@media screen and (max-width: 1400px ){
  .screenxl{
    display: none;
  }
}
</style>
