<template>
  <div class="main-content bg-default">
    <!-- Navbar -->
    <base-nav
      class="navbar-top navbar-horizontal navbar-dark"
      containerClasses="px-4 container"
      expand
    >
      <template v-slot="{ closeMenu }">
        <!-- Collapse header -->
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/">
                <img src="src/assets/search.png" />
              </router-link>
            </div>
            <div class="col-6 collapse-close">

              <button
                type="button"
                @click="closeMenu"
                class="navbar-toggler"
                aria-label="Toggle sidenav"
              >
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
        <!-- Navbar items -->
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/homepage">
              <i class="ni ni-collection"></i>
              <span class="nav-link-inner--text">{{$t('authLayout.home')}}</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/blocks">
              <i class="ni ni-ungroup"></i>
              <span class="nav-link-inner--text">{{$t('authLayout.blocks')}}</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/transactions">
              <i class="ni ni-cart"></i>
              <span class="nav-link-inner--text">{{$t('authLayout.txs')}}</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/tokens">
              <i class="ni ni-money-coins"></i>
              <span class="nav-link-inner--text">{{$t('authLayout.tokens')}}</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/contracts">
              <i class="ni ni-collection"></i>
              <span class="nav-link-inner--text">{{$t('authLayout.contracts')}}</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/account">
              <i class="ni ni-single-02"></i>
              <span class="nav-link-inner--text">{{$t('authLayout.address')}}</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/candidates">
              <i class="ni ni-badge"></i>
              <span class="nav-link-inner--text">{{$t('authLayout.committee')}}</span>
            </router-link>
          </li>
        </ul>
        <div>
          <base-dropdown>
            <template v-slot:title>
              <base-button type="default" class="btn btn-sm">
                {{this.lang}}
              </base-button>
            </template>
            <li>
              <a class="dropdown-item" @click="switch_the_language('en')">
                <span>English 🇬🇧</span>
              </a>
            </li>
            <li>
              <a class="dropdown-item" @click="switch_the_language('cn')">
                <span>中文 🇨🇳</span>
              </a>
            </li>
            <li>
              <a class="dropdown-item"  @click="switch_the_language('fr')">
                <span>Français 🇫🇷</span>
              </a>
            </li>
          </base-dropdown>
        </div>

      </template>
    </base-nav>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8">
      <div class="search mt--5 ml-5">
        <input
          type="text"
          class="over-ellipsis"
          :placeholder="$t('search.placeholder')"
          v-model ="searchVal"
          autocomplete="off"
          @keyup.enter="search()"
        /><button  class="button" @click="search()"><img class="img" src="../assets/search.png" alt="search" /></button>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <loading
        :is-full-page="false"
        :opacity="0.9"
        :active="isLoading"
    ></loading>
    <router-view></router-view>
  </div>
</template>
<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import Neon from "@cityofzion/neon-js";

export default {
  name: "auth-layout",
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      searchVal: "",
      isHashPattern: /^((0x)?)([0-9a-f]{64})$/,
      isAssetPattern: /^((0x)?)([0-9a-f]{40})$/,
      isAddressPattern : /^N([0-9a-zA-Z]{33})$/,
      isNumberPattern: /^\d+$/,
      lang:"English 🇬🇧"
    };
  },
  methods: {
    switch_the_language(language) {
      //console.log(this.$i18n.locale)
      this.$i18n.locale = language
      if(language==="cn"){
        this.lang = "中文 "+"🇨🇳"
      }else if(language === "en") {
        this.lang = "English "+"🇬🇧"
      }else if (language === "fr") {
        this.lang = "Français "+"🇫🇷"
      }

    },
    search() {
      this.isLoading = true;
      let value = this.searchVal;
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
        }
        else {
          this.isLoading = false;
          this.$router.push({
            path: `/search`,
          });
        }
      } else if (this.isAddressPattern.test(value)){
        this.getAddressByAddress(this.addressToScriptHash(value))
      }
      else {
        this.isLoading = false;
        this.$router.push({
          path: `/search`,
        });
      }
    },
    addressToScriptHash(addr) {
      try {
        const acc = Neon.create.account(addr);
        return "0x" + acc.scriptHash;
      }catch (err){
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
          "jsonrpc": "2.0",
          "id": 1,
          "params": {"BlockHash":block_hash},
          "method": "GetBlockByBlockHash"
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
      },
      )
    },
    getBlockByBlockHeight(blockheight){
      axios({
        method: "post",
        url: "/api",
        data: {
          "jsonrpc": "2.0",
          "id": 1,
          "params": {"BlockHeight":parseInt(blockheight)},
          "method": "GetBlockByBlockHeight"
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
      },
    )},
    getAddressByAddress(addr) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          method: "GetAddressByAddress",
          params: {"Address": addr},
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
      })
    },

    getToken(value) {
      return new Promise(() => {
        axios({
          method: "post",
          url: "/api",
          data: {
            jsonrpc: "2.0",
            id: 1,
            params: {"ContractHash": value},
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
            params: {"Hash": value},
            method: "GetContractInfoByContractHash",
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
      });
    },

    getTransactionByTransactionHash(value) {
      axios({
        method: "post",
        url: "/api",
        data: {
          "jsonrpc": "2.0",
          "id": 1,
          "params": {"TransactionHash":value},
          "method": "GetRawTransactionByTransactionHash"
        },
        headers:{'Content-Type': 'application/json','withCredentials':' true',
          'crossDomain':'true',},
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
  },
};
</script>
<style>
.search-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 380px;
  background: #fff;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  color: #282828;
  margin-top: 36px;
  width: 100%;
}
.search {
  width: 100%;
  max-width: 565px;
  height: 50px;
  position: relative;
}
.button {
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 1px;
  top: 1px;
  background: #00af92;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  width: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.img {
  width: 26px;
}

.over-ellipsis {
  width: 100%;
  height: 100%;
  padding-right: 61px;
  padding-left: 11px;
  font-size: 16px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(191, 191, 191, 1);
  border-radius: 4px;
  color: #282828;
}
</style>
