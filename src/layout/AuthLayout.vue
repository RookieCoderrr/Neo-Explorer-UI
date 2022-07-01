<template>
  <div class="content " style="background-color: #f7f8fa!important;">
    <!-- Navbar -->
    <base-nav
      class="navbar-horizontal"
      expand

    >
      <div class="" style="color: black; font-size: 30px; font-family:Verdana ;cursor: pointer; margin-left: 7%" @click="backHome()">Jiuquan</div>
      <div class="searchDiv " v-if="$route.meta.showSearch">
        <input
            type="text"
            class="over-ellipsis-Auth"
            :placeholder="$t('search.placeholder')"
            v-model="searchVal"
            autocomplete="off"
            @keyup.enter="search()"
        /><button class="buttonres" @click="search()" style="border: white">
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
              fill="lightgrey"
          />
        </svg>
      </button>
      </div>
      <div class="blanc" v-if="!$route.meta.showSearch" style="margin-left: auto;margin-right: 0;">

      </div>
      <ul class="navbar-nav mr-4 menu homeTag" >
        <li class="nav-item-1">
          <router-link class="nav-link" to="/homepage">
            {{ $t("authLayout.home") }}
          </router-link>
        </li>
<!--        <li class="nav-item-1">-->
<!--          <el-dropdown class="nav-link">-->
<!--          <span class=" el-dropdown-link">-->
<!--            Blockchain-->
<!--            <i class="custom-icon el-icon-arrow-down" size="1px"></i>-->
<!--          </span>-->
<!--            <template #dropdown>-->
<!--              <el-dropdown-menu>-->
<!--                <el-dropdown-item >-->
<!--                  <router-link  to="/blocks/1">-->
<!--                    {{ $t("authLayout.blocks") }}-->
<!--                  </router-link>-->
<!--                </el-dropdown-item>-->
<!--                <el-dropdown-item>-->
<!--                  <router-link  to="/transactions/1">-->
<!--                    {{ $t("authLayout.txs") }}-->
<!--                  </router-link>-->
<!--                </el-dropdown-item>-->
<!--              </el-dropdown-menu>-->
<!--            </template>-->
<!--          </el-dropdown>-->
<!--        </li>-->
<!--        <li class="nav-item-1">-->
<!--          <router-link class="nav-link" to="/transactions/1">-->
<!--            {{ $t("authLayout.txs") }}-->
<!--          </router-link>-->
<!--        </li>-->
<!--        <li class="nav-item-1">-->
<!--          <router-link class="nav-link" to="/tokens/Nep17/1">-->
<!--            {{ $t("authLayout.tokens") }}-->
<!--          </router-link>-->
<!--        </li>-->
<!--        <li class="nav-item-1">-->
<!--          <router-link class="nav-link" to="/contracts/1">-->
<!--            {{ $t("authLayout.contracts") }}-->
<!--          </router-link>-->
<!--        </li>-->
<!--        <li class="nav-item-1">-->
<!--          <router-link class="nav-link" to="/account/1">-->
<!--            {{ $t("authLayout.address") }}-->
<!--          </router-link>-->
<!--        </li>-->
<!--        <li class="nav-item-1">-->
<!--          <router-link class="nav-link" to="/candidates/1">-->
<!--            {{ $t("authLayout.committee") }}-->
<!--          </router-link>-->
<!--        </li>-->

      </ul>
      <el-dropdown class="mr-4" >
          <span class=" el-dropdown-link droptitle drophide"  :style="handleStyle(1)">
            {{ $t("authLayout.blockchain") }}
           <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.93387 4.03915C8.73861 3.84388 8.42202 3.84388 8.22676 4.03915L6.04662 6.21929L3.92899 4.10165C3.73372 3.90638 3.41714 3.90638 3.22188 4.10165L2.86833 4.4552C2.67306 4.65046 2.67306 4.96705 2.86833 5.16231L5.69675 7.99074C5.89201 8.186 6.2086 8.186 6.40386 7.99074L6.75741 7.63718C6.77481 7.61979 6.79065 7.60143 6.80495 7.58228L9.28742 5.09981C9.48268 4.90454 9.48268 4.58796 9.28742 4.3927L8.93387 4.03915Z" fill="#4E5969"/>
</svg>
          </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="toBlock()">
                {{ $t("authLayout.blocks") }}
            </el-dropdown-item>
            <el-dropdown-item @click="toTransaction()" >
              {{ $t("authLayout.txs") }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown class="mr-4">
          <span class=" el-dropdown-link droptitle drophide" :style="handleStyle(2)">
            {{ $t("authLayout.tokenss") }}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.93387 4.03915C8.73861 3.84388 8.42202 3.84388 8.22676 4.03915L6.04662 6.21929L3.92899 4.10165C3.73372 3.90638 3.41714 3.90638 3.22188 4.10165L2.86833 4.4552C2.67306 4.65046 2.67306 4.96705 2.86833 5.16231L5.69675 7.99074C5.89201 8.186 6.2086 8.186 6.40386 7.99074L6.75741 7.63718C6.77481 7.61979 6.79065 7.60143 6.80495 7.58228L9.28742 5.09981C9.48268 4.90454 9.48268 4.58796 9.28742 4.3927L8.93387 4.03915Z" fill="#4E5969"/>
</svg>

          </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="toAsset()">
                {{ $t("authLayout.tokens") }}
            </el-dropdown-item>
            <el-dropdown-item @click="toContract()">
                {{ $t("authLayout.contracts") }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown class="mr-3">
          <span class=" el-dropdown-link droptitle drophide" :style="handleStyle(3)">
            {{ $t("authLayout.addresses") }}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.93387 4.03915C8.73861 3.84388 8.42202 3.84388 8.22676 4.03915L6.04662 6.21929L3.92899 4.10165C3.73372 3.90638 3.41714 3.90638 3.22188 4.10165L2.86833 4.4552C2.67306 4.65046 2.67306 4.96705 2.86833 5.16231L5.69675 7.99074C5.89201 8.186 6.2086 8.186 6.40386 7.99074L6.75741 7.63718C6.77481 7.61979 6.79065 7.60143 6.80495 7.58228L9.28742 5.09981C9.48268 4.90454 9.48268 4.58796 9.28742 4.3927L8.93387 4.03915Z" fill="#4E5969"/>
</svg>

          </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item  @click="toAddress()">
                {{ $t("authLayout.address") }}
            </el-dropdown-item>
            <el-dropdown-item @click="toCandidate()">
                {{ $t("authLayout.committee") }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="mobileMenu "  style="display: none ;">
        <el-dropdown>
          <i class="ni ni-align-center"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="backHome()">{{ $t("authLayout.home") }}</el-dropdown-item>
              <el-dropdown-item @click="toBlock()">{{ $t("authLayout.blocks") }}</el-dropdown-item>
              <el-dropdown-item @click="toTransaction()"> {{ $t("authLayout.txs") }}</el-dropdown-item>
              <el-dropdown-item @click="toAsset()"> {{ $t("authLayout.tokens") }}</el-dropdown-item>
              <el-dropdown-item @click="toContract()"> {{ $t("authLayout.contracts") }}</el-dropdown-item>
              <el-dropdown-item @click="toAddress()">  {{ $t("authLayout.address") }}</el-dropdown-item>
              <el-dropdown-item @click="toCandidate()">  {{ $t("authLayout.committee") }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <el-divider class="mr-3 drophide" direction="vertical"></el-divider>

<!--      <div class=" mr-2 mb-1 drophide" v-if="$route.meta.showNet" style="width: 80px" >-->
<!--        <el-dropdown>-->
<!--          <span class=" el-dropdown-link droptitle">-->
<!--            {{this.netShow}}-->
<!--            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--<path fill-rule="evenodd" clip-rule="evenodd" d="M8.93387 4.03915C8.73861 3.84388 8.42202 3.84388 8.22676 4.03915L6.04662 6.21929L3.92899 4.10165C3.73372 3.90638 3.41714 3.90638 3.22188 4.10165L2.86833 4.4552C2.67306 4.65046 2.67306 4.96705 2.86833 5.16231L5.69675 7.99074C5.89201 8.186 6.2086 8.186 6.40386 7.99074L6.75741 7.63718C6.77481 7.61979 6.79065 7.60143 6.80495 7.58228L9.28742 5.09981C9.48268 4.90454 9.48268 4.58796 9.28742 4.3927L8.93387 4.03915Z" fill="#4E5969"/>-->
<!--</svg>-->

<!--          </span>-->
<!--          <template #dropdown>-->
<!--            <el-dropdown-menu>-->
<!--              <el-dropdown-item @click="switchNet('main')">MainNet</el-dropdown-item>-->
<!--              <el-dropdown-item @click="switchNet('test')">TestNet</el-dropdown-item>-->
<!--            </el-dropdown-menu>-->
<!--          </template>-->
<!--        </el-dropdown>-->
<!--      </div>-->
      <div class=" mb-1  drophide dropTag " >
        <el-dropdown>
          <span class="el-dropdown-link droptitle">
            {{this.lang}}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.93387 4.03915C8.73861 3.84388 8.42202 3.84388 8.22676 4.03915L6.04662 6.21929L3.92899 4.10165C3.73372 3.90638 3.41714 3.90638 3.22188 4.10165L2.86833 4.4552C2.67306 4.65046 2.67306 4.96705 2.86833 5.16231L5.69675 7.99074C5.89201 8.186 6.2086 8.186 6.40386 7.99074L6.75741 7.63718C6.77481 7.61979 6.79065 7.60143 6.80495 7.58228L9.28742 5.09981C9.48268 4.90454 9.48268 4.58796 9.28742 4.3927L8.93387 4.03915Z" fill="#4E5969"/>
</svg>

          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="switch_the_language('en')">English 🇬🇧</el-dropdown-item>
              <el-dropdown-item @click="switch_the_language('cn')">中文 🇨🇳</el-dropdown-item>
              <el-dropdown-item @click="switch_the_language('fr')">Français 🇫🇷</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </base-nav>

    <!-- Header -->

    <div v-if="$route.meta.HomePage" style="background: #f7f8fa"></div>
    <div v-else class="header py-6 " style="background: #f7f8fa"></div>

    <router-view></router-view>
    <div v-if="$route.meta.showBot ===true" style="border-top: 1px solid white;;background-color: #fafafa;min-height: 300px;">
      <div class="mainHome"  >
      <div class="row mt-5 mb-3" >
        <div class="col-lg-5">
          <div style="color: black;font-family:Verdana; font-size: 34px">Jiuquan</div>
          <div class="mt-3">
            <small>{{ $t("authLayout.oneGate") }}</small>
          </div>
        </div>

        <div  class="col-lg-7">
          <div class="row">
            <div class="col-lg-3 mb-2 mt-2" >
              <div class="dropbot " style="display: none">
                <el-dropdown>
          <el-button  size="mini" plain class="el-dropdown-link droptitle">
            {{this.lang}}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.93387 4.03915C8.73861 3.84388 8.42202 3.84388 8.22676 4.03915L6.04662 6.21929L3.92899 4.10165C3.73372 3.90638 3.41714 3.90638 3.22188 4.10165L2.86833 4.4552C2.67306 4.65046 2.67306 4.96705 2.86833 5.16231L5.69675 7.99074C5.89201 8.186 6.2086 8.186 6.40386 7.99074L6.75741 7.63718C6.77481 7.61979 6.79065 7.60143 6.80495 7.58228L9.28742 5.09981C9.48268 4.90454 9.48268 4.58796 9.28742 4.3927L8.93387 4.03915Z" fill="#4E5969"/>
            </svg>

          </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="switch_the_language('en')">English 🇬🇧</el-dropdown-item>
                    <el-dropdown-item @click="switch_the_language('cn')">中文 🇨🇳</el-dropdown-item>
                    <el-dropdown-item @click="switch_the_language('fr')">Français 🇫🇷</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              </div>
<!--              <div class="dropbot ml-3 " style="display: none" v-if="$route.meta.showNet">-->
<!--                <el-dropdown>-->
<!--          <el-button size="mini" plain class=" el-dropdown-link droptitle">-->
<!--            {{this.netShow}}-->
<!--            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.93387 4.03915C8.73861 3.84388 8.42202 3.84388 8.22676 4.03915L6.04662 6.21929L3.92899 4.10165C3.73372 3.90638 3.41714 3.90638 3.22188 4.10165L2.86833 4.4552C2.67306 4.65046 2.67306 4.96705 2.86833 5.16231L5.69675 7.99074C5.89201 8.186 6.2086 8.186 6.40386 7.99074L6.75741 7.63718C6.77481 7.61979 6.79065 7.60143 6.80495 7.58228L9.28742 5.09981C9.48268 4.90454 9.48268 4.58796 9.28742 4.3927L8.93387 4.03915Z" fill="#4E5969"/>-->
<!--            </svg>-->

<!--          </el-button>-->
<!--                  <template #dropdown>-->
<!--                    <el-dropdown-menu>-->
<!--                      <el-dropdown-item @click="switchNet('main')">MainNet</el-dropdown-item>-->
<!--                      <el-dropdown-item @click="switchNet('test')">TestNet</el-dropdown-item>-->
<!--                    </el-dropdown-menu>-->
<!--                  </template>-->
<!--                </el-dropdown>-->
<!--              </div>-->
            </div>
            <div class="col-lg-3 ">
              <div class="mb-3"><strong>{{ $t("authLayout.help") }}</strong></div>
              <div><a class="text-muted" title="Coming Soon~" href="https://onegate.gitbook.io/onegate/manage-wallets"  target="_blank" rel="noopener noreferrer">{{ $t("authLayout.wallet") }}</a></div>
              <div><a class="text-muted" title="Coming Soon~" href="https://onegate.gitbook.io/onegate/nfts" target="_blank" rel="noopener noreferrer">{{ $t("authLayout.nft") }}</a></div>
            </div>
            <div class="col-lg-3">
              <div class="mb-3"><strong>{{ $t("authLayout.developer") }}</strong></div>
              <div><a class="text-muted" title="Coming Soon~" href="javascript:">{{ $t("authLayout.dApi") }}</a></div>
            </div>
            <div class="col-lg-3">
              <div class="mb-3"><strong>{{ $t("authLayout.contractUs") }}</strong></div>
              <div>
                <a class="text-muted" title="Twitter: OneGateWallet" href="https://twitter.com/OneGateSpace" target="_blank"
                rel="noopener noreferrer">

                  <svg width="27" height="22" viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.1358 3.26512C25.2059 3.67759 24.2063 3.95634 23.1575 4.08168C24.228 3.43988 25.0504 2.42364 25.4375 1.21265C24.4354 1.80698 23.3257 2.23852 22.1444 2.47103C21.1985 1.46318 19.8509 0.833496 18.3593 0.833496C15.4955 0.833496 13.1734 3.15527 13.1734 6.01912C13.1734 6.42554 13.2193 6.82134 13.3078 7.20093C8.99789 6.98464 5.17673 4.92012 2.6191 1.78265C2.17269 2.54854 1.91696 3.43934 1.91696 4.38973C1.91696 6.18888 2.83243 7.77613 4.22393 8.70615C3.37394 8.67908 2.57423 8.44588 1.87512 8.05747C1.87463 8.07913 1.87463 8.10077 1.87463 8.12265C1.87463 10.6353 3.66218 12.7311 6.03445 13.2076C5.59933 13.3261 5.14119 13.3895 4.66825 13.3895C4.33409 13.3895 4.00923 13.3569 3.69254 13.2965C4.35247 15.3566 6.26758 16.856 8.53685 16.8977C6.76207 18.2887 4.52606 19.1178 2.09642 19.1178C1.67784 19.1178 1.26506 19.0931 0.859375 19.0451C3.15431 20.5165 5.88017 21.3752 8.80867 21.3752C18.3471 21.3752 23.5633 13.4733 23.5633 6.62042C23.5633 6.39562 23.5582 6.17197 23.5482 5.94952C24.5615 5.21837 25.4406 4.30506 26.1358 3.26512Z" fill="#676c6c"/>
                  </svg>

                </a>
              </div>
              <div>
                <a class="text-muted" href="mailto:hello@onegate.space">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.75 3.75H2.25C1.83516 3.75 1.5 4.08516 1.5 4.5V19.5C1.5 19.9148 1.83516 20.25 2.25 20.25H21.75C22.1648 20.25 22.5 19.9148 22.5 19.5V4.5C22.5 4.08516 22.1648 3.75 21.75 3.75ZM19.8563 6.30234L12.4617 12.0563C12.2789 12.1992 12.0234 12.1992 11.8406 12.0563L4.44375 6.30234C4.41587 6.28082 4.39541 6.25112 4.38526 6.21739C4.37511 6.18367 4.37576 6.14761 4.38713 6.11427C4.3985 6.08094 4.42002 6.052 4.44867 6.0315C4.47731 6.01101 4.51165 5.99999 4.54688 6H19.7531C19.7883 5.99999 19.8227 6.01101 19.8513 6.0315C19.88 6.052 19.9015 6.08094 19.9129 6.11427C19.9242 6.14761 19.9249 6.18367 19.9147 6.21739C19.9046 6.25112 19.8841 6.28082 19.8563 6.30234Z" fill="#676c6c"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p   class="mt-5">
        <span>Copyright 2022 Jiuquan.<a class="text-muted" href="https://onegate.space/terms.html" target="_blank">Terms</a> <span>&</span> <a class="text-muted" href="https://onegate.space/privacy.html" target="_blank">Privacy</a> </span>

      </p>
    </div>
    </div>
  </div>

</template>
<script>
import axios from "axios";
import Neon from "@cityofzion/neon-js";
import net from "../store/store";
export default {
  name: "auth-layout",
  data() {
    return {
      network: net.url,
      netShow:"Mainnet",
      searchVal: "",
      isHashPattern: /^((0x)?)([0-9a-f]{64})$/,
      isAssetPattern: /^((0x)?)([0-9a-f]{40})$/,
      isAddressPattern: /^N([0-9a-zA-Z]{33})$/,
      isNumberPattern: /^\d+$/,
      lang: "En",
      command:0,
    };
  },

  created() {
    // if(localStorage.getItem("net")===null){
    //   localStorage.setItem("net","/bpi")
    // }
    let lang = this.$i18n.locale;
    if (lang === "cn") {
      this.lang = "Cn";
    } else if (lang === "en") {
      this.lang = "En";
    } else if (lang === "fr") {
      this.lang = "Fr"
    }
   if(`${location.hostname}`=== "explorer.onegate.space"){
     if (this.$i18n.locale === "cn") {
       this.netShow="主网"
     } else if (this.$i18n.locale === "en") {
       this.netShow = "Mainnet"
     } else if (this.$i18n.locale === "fr") {
       this.netShow="Mainnet"
     }
   }else if(`${location.hostname}`=== "testnet.explorer.onegate.space") {
     if (this.$i18n.locale === "cn") {
       this.netShow="测试网"
     } else if (this.$i18n.locale === "en") {
       this.netShow = "Testnet"
     } else if (this.$i18n.locale === "fr") {
       this.netShow="Testnet"
     }
   }
  },

  computed: {
    getUrl() {
      return this.$URL
    },
  },
  methods: {
    // 语言切换
    switch_the_language(language) {

      this.$i18n.locale = language;
      if (language === "cn") {
        this.lang = "Cn";
        localStorage.setItem('lang',"cn")
        this.$refs.tabs.calcPaneInstances(true)
      } else if (language === "en") {
        this.lang = "En";
        localStorage.setItem('lang',"en")
        this.$refs.tabs.calcPaneInstances(true)
      } else if (language === "fr") {
        this.lang = "Fr";
        localStorage.setItem('lang',"fr")
        this.$refs.t.calcPaneInstances(true)
      }

    },
    switchNet(net){
      if(net=='main'){
        // localStorage.setItem("net","/bpi")

        location.href = "https://explorer.onegate.space"+`${location.pathname}`;

      } else if(net=='test'){
        location.href = "https://testnet.explorer.onegate.space"+`${location.pathname}`;


      }
    },
    handleStyle(command){
      switch (command){
        case 1:
          if (this.$route.name==="blocks"||this.$route.name==="transactions"||this.$route.name==="blockinfo"||this.$route.name==="transactionInfo"){
            return {  color: "#165DFF"}
          }
          break;

        case 2:
          if (this.$route.name==="contractinfo"||this.$route.name==="NftInfo"||this.$route.name==="contracts"||this.$route.name==="NFTtokeninfo"||this.$route.name==="NEP17tokeninfo"||this.$route.name==="VerifyContract"||this.$route.name==="SourceCode"||this.$route.name==="tokens"){
            return {  color: "#165DFF"}
          }
          break;
        case 3:
          if (this.$route.name==="AccountProfile"||this.$route.name==="Accounts"||this.$route.name==="Candidates"){
            return {  color: "#165DFF"}
          }
          break;
      }



    },
    backHome() {
      this.$router.push({
        path: `/homepage`,
      });
    },
    search() {
      let value = this.searchVal;
      value = value.trim();
      this.searchVal = "";
      if (value === "") {
        return;
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
          this.$router.push({
            path: `/search`,
          });
        }
      } else if (this.isAddressPattern.test(value)) {
        this.getAddressByAddress(this.addressToScriptHash(value));
      } else {
        this.$router.push({
          path: `/search`,
        });
      }
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
        // console.log("4")
        if (res["data"]["error"] == null) {
          this.$router.push({
            path: `/accountprofile/${addr}`,
          });
        } else {
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
          // console.log("2")
        } else {
          this.getContractInfoByContractHash(value);

        }
      });
    },
    getContractInfoByContractHash(value) {
      return new Promise(() => {
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
          if (res["data"]["error"] == null) {
            // console.log("3")
            this.$router.push({
              path: `/contractinfo/${value}`,
            });
          } else {
            this.getAddressByAddress(value);
          }
        });
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
        if (res["data"]["error"] == null) {
          this.$router.push({
            path: `/transactionInfo/${value}`,
          });
        } else {
          this.getBlockByBlockHash(value);
        }
      });
    },
  },
};
</script>
<style>
.buttonres {
  cursor: pointer;
  position: absolute;
  right: 2px;
  top: 2px;
  botton: 3px;
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: white !important;
  mix-blend-mode: normal;
  border-radius: 4px;
}


.over-ellipsis-Auth {
  width: 100%;
  height: 100%;
  padding-right: 15px;
  padding-left: 11px;
  font-size: 16px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgb(242,242,242);
  border-radius: 4px;
  outline-color:  lightgrey;
}
.drop {
  width: 10%;
  margin-left: 1%;
}
.searchDiv {
  margin-left: auto;
  margin-right:1%;
  width: 300px;
  background: white;
  height: 35px;
  position: relative;

}
.btn-icon svg:hover path{
  fill:rgb(85,118,236);
  fill-opacity:1
}
.btn-icon {
  padding: 0rem 0rem!important;
  border-radius: 100% !important;
  border: 0px solid transparent!important;

}
.footer-title{
  font-family: Inter,sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 17px;
  text-align: center;
  color: #000000;
  margin-bottom: 20px
}
.mainHome{
  width: 80%;
  height: 30%;
  /*top: 268px;*/
  margin:0 auto;
  background: #fafafa;
  border-radius: 4px;
}
.custom-icon {
  font-size:3px;
}
.logo {
  margin-left:7.5%;
}

.homeTag {

}
.droptitle{
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  /* identical to box height */



  mix-blend-mode: normal;

}
.droptitle:hover{
  color: #165DFF;
}
.dropTag {
  width: 50px;
  margin-right:7.5%;

}
.color{
  color: #165DFF;
}

@media screen and (max-width: 1200px ){
  .navbar-nav{
    display: none!important;
  }
  .searchDiv{
    display: none;
  }
  .drop{
    display: none;
  }
  .mobileMenu{
    display: initial!important;
    margin-inline-start: auto;
  }
  .dropbot{
    display:initial!important;
  }
  .drophide{
    display: none;
  }
}






</style>
