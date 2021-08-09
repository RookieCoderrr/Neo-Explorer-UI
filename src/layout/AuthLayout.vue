<template>
  <div class="main-content bg-default">
    <!-- Navbar -->
    <base-nav
      class="navbar-top navbar-horizontal navbar-dark"
      containerClasses="px-4 container"
      expand
    >
      <svg class="ml--7" width="183" height="37" viewBox="0 0 183 37" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50.9399 11.4254C52.1999 12.5354 52.8299 14.1854 52.8299 16.3154V27.3854H50.0699V17.2754C50.0699 15.4754 49.6799 14.1554 48.8999 13.3454C48.1199 12.5354 47.0999 12.1454 45.8099 12.1454C44.9056 12.1441 44.0129 12.3494 43.1999 12.7454C42.3589 13.1954 41.6699 13.8844 41.2199 14.7254C40.6799 15.6254 40.4399 16.7954 40.4399 18.1754V27.3854H37.6499V10.5854L40.1999 11.6354L40.2599 12.7754C40.7879 11.7653 41.6304 10.9545 42.6599 10.4654C43.724 9.94693 44.8965 9.68981 46.0799 9.71543C48.0399 9.71543 49.6599 10.2854 50.9399 11.4254Z" fill="#000033"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M59.4898 19.7654H72.5398C72.6345 19.1196 72.6846 18.4681 72.6898 17.8154C72.7087 16.3946 72.4008 14.9883 71.7898 13.7054C71.2008 12.497 70.2732 11.4859 69.1198 10.7954C67.8481 10.0502 66.3932 9.67607 64.9198 9.71543C62.3098 9.71543 60.3298 10.5254 58.8898 12.1154C57.4498 13.7054 56.7598 15.8954 56.7598 18.7154C56.7598 21.5354 57.4798 23.7554 58.9798 25.3454C60.4798 26.9354 62.5198 27.7454 65.1298 27.7454C66.9298 27.7454 68.4298 27.4154 69.5698 26.7554C70.7415 26.1136 71.7006 25.144 72.3298 23.9654L70.0198 22.7354C69.7184 23.5719 69.1059 24.2597 68.3098 24.6554C67.3156 25.1199 66.2267 25.3459 65.1298 25.3154C63.5398 25.3154 62.2198 24.8054 61.2298 23.8454C60.2398 22.8854 59.6398 21.5354 59.4898 19.7654ZM59.5198 17.3054C59.7298 15.6554 60.2998 14.3954 61.2298 13.4954C62.1598 12.5954 63.4498 12.1454 64.9198 12.1454C66.3898 12.1454 67.5598 12.6254 68.4298 13.5254C69.2998 14.4254 69.8398 15.6854 70.0198 17.3054H59.5198Z" fill="#000033"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M93.27 18.7154C93.27 15.8954 92.52 13.7054 91.02 12.1154C89.55 10.5254 87.48 9.71542 84.87 9.71542C82.26 9.71542 80.19 10.5254 78.72 12.1154C77.25 13.7054 76.5 15.8954 76.5 18.7154C76.5 21.5354 77.22 23.7554 78.72 25.3454C80.22 26.9354 82.26 27.7454 84.87 27.7454C87.48 27.7454 89.52 26.9354 91.02 25.3454C92.52 23.7554 93.27 21.5354 93.27 18.7154ZM79.26 18.7154C79.26 16.6754 79.77 15.0554 80.76 13.8854C81.75 12.6854 83.1 12.1154 84.87 12.1154C86.64 12.1154 88.02 12.7154 89.01 13.8854C90 15.0554 90.48 16.6454 90.48 18.7154C90.48 20.7854 90 22.4054 89.01 23.5754C88.02 24.7454 86.61 25.3454 84.87 25.3454C83.13 25.3454 81.75 24.7454 80.76 23.5754C79.77 22.4054 79.26 20.7554 79.26 18.7154Z" fill="#000033"/>
        <path d="M0 6.38542V30.4754L15.66 36.0854V11.7854L32.55 5.57542L17.22 0.0854187L0 6.38542Z" fill="#282B34"/>
        <path d="M16.9199 12.6854V25.6754L32.5499 31.2554V6.89542L16.9199 12.6854Z" fill="#282B34"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M143.3 10.44V25H141.02V10.44H143.3ZM116.04 25V23H107.74V18.68H115.22V16.68H107.74V12.72H115.7V10.72H105.4V25H116.04ZM119.62 25L122.22 21.18L124.8 25H127.48L123.46 19.5L127.02 14.66H124.36L122.22 17.82L120.06 14.66H117.4L120.96 19.5L116.94 25H119.62ZM131.06 23.58V28.96H128.78V14.66H130.9V15.76C131.62 14.84 132.66 14.38 134.02 14.38C135.54 14.38 136.74 14.92 137.62 16C138.42 17 138.82 18.28 138.82 19.88C138.82 21.4 138.42 22.66 137.64 23.66C136.8 24.74 135.62 25.28 134.14 25.28C132.94 25.28 131.9 24.7 131.06 23.58ZM133.6 23.44C132.86 23.44 132.26 23.14 131.78 22.54C131.24 21.88 130.98 21 130.98 19.92V19.76C130.98 18.72 131.18 17.9 131.62 17.28C132.1 16.56 132.78 16.22 133.68 16.22C134.68 16.22 135.42 16.58 135.9 17.3C136.28 17.9 136.48 18.76 136.48 19.88C136.48 21 136.26 21.86 135.84 22.46C135.36 23.1 134.6 23.44 133.6 23.44ZM150.7 25.28C152.26 25.28 153.54 24.76 154.5 23.72C155.42 22.72 155.9 21.42 155.9 19.84C155.9 18.24 155.42 16.94 154.48 15.92C153.52 14.88 152.26 14.38 150.7 14.38C149.12 14.38 147.86 14.88 146.92 15.92C145.96 16.94 145.5 18.24 145.5 19.84C145.5 21.42 145.96 22.72 146.9 23.72C147.86 24.76 149.12 25.28 150.7 25.28ZM148.5 22.3C149.02 23.04 149.74 23.42 150.7 23.42C151.64 23.42 152.38 23.04 152.9 22.3C153.34 21.64 153.58 20.82 153.58 19.84C153.58 18.84 153.34 18 152.9 17.36C152.38 16.6 151.64 16.24 150.7 16.24C149.74 16.24 149.02 16.6 148.5 17.36C148.06 18 147.84 18.84 147.84 19.84C147.84 20.84 148.06 21.66 148.5 22.3ZM160.16 25V19.52C160.16 18.64 160.42 17.94 160.98 17.4C161.46 16.92 162 16.7 162.6 16.7C163.08 16.7 163.56 16.76 164.08 16.92V14.64C163.72 14.46 163.28 14.38 162.78 14.38C162.14 14.38 161.6 14.56 161.14 14.94C160.76 15.22 160.44 15.62 160.16 16.14V14.66H157.9V25H160.16ZM173.32 24.1C172.4 24.88 171.26 25.28 169.88 25.28C168.34 25.28 167.12 24.8 166.22 23.86C165.26 22.88 164.78 21.54 164.78 19.82C164.78 18.28 165.22 17 166.14 15.96C167.02 14.9 168.24 14.38 169.78 14.38C171.48 14.38 172.78 14.94 173.68 16.1C174.5 17.14 174.92 18.6 174.92 20.46H167.18C167.26 21.42 167.52 22.16 167.96 22.66C168.4 23.16 169.04 23.42 169.86 23.42C170.56 23.42 171.12 23.26 171.56 22.94C171.9 22.68 172.2 22.26 172.48 21.68H174.76C174.52 22.64 174.04 23.46 173.32 24.1ZM172.54 18.74H167.22C167.36 17.92 167.64 17.3 168.06 16.88C168.5 16.44 169.08 16.24 169.84 16.24C171.44 16.24 172.34 17.06 172.54 18.74ZM178.98 19.52V25H176.72V14.66H178.98V16.14C179.26 15.62 179.58 15.22 179.96 14.94C180.42 14.56 180.96 14.38 181.6 14.38C182.1 14.38 182.54 14.46 182.9 14.64V16.92C182.38 16.76 181.9 16.7 181.42 16.7C180.82 16.7 180.28 16.92 179.8 17.4C179.24 17.94 178.98 18.64 178.98 19.52Z" fill="black"/>
      </svg>

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
    </base-nav>
    <!-- Header -->
    <div v-if="$route.meta.showSearch" class="header bg-gradient-success py-7 py-lg-8">
      <div  class="search mt--5 ml-5">
        <input
          type="text"
          class="over-ellipsis"
          :placeholder="$t('search.placeholder')"
          v-model ="searchVal"
          autocomplete="off"
          @keyup.enter="search()"
        /><button  class="button" @click="search()"><img class="img" src="../assets/search.png" alt="search" /></button>
      </div>
    </div>
    <div v-else class="header bg-gradient-success py-7 py-lg-2">

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
