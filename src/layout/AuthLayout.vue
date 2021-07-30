<template>
  <div class="main-content bg-default">
    <!-- Navbar -->
    <base-nav
      class="navbar-top navbar-horizontal navbar-dark"
      containerClasses="px-4 container"
      expand
    >
      <!-- <router-link slot="brand" class="navbar-brand" to="/">
                <img src="img/brand/white.png"/>
            </router-link> -->
      <template v-slot="{ closeMenu }">
        <!-- Collapse header -->
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/">
                <img src="img/brand/green.png" />
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
              <span class="nav-link-inner--text">Home</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/candidates">
              <i class="ni ni-badge"></i>
              <span class="nav-link-inner--text">Committee</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/blocks">
              <i class="ni ni-ungroup"></i>
              <span class="nav-link-inner--text">Blocks</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/transactions">
              <i class="ni ni-cart"></i>
              <span class="nav-link-inner--text">Transactions</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/tokens">
              <i class="ni ni-money-coins"></i>
              <span class="nav-link-inner--text">Tokens</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/contracts">
              <i class="ni ni-collection"></i>
              <span class="nav-link-inner--text">Contracts</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/account">
              <i class="ni ni-single-02"></i>
              <span class="nav-link-inner--text">Accounts</span>
            </router-link>
          </li>
        </ul>
      </template>
    </base-nav>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8">
      <div class="search mt--5 ml-5">
        <input
          type="text"
          class="over-ellipsis"
          :placeholder="'Block Height, Hash, Address or Transaction id'"
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
    <router-view></router-view>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "auth-layout",
  data() {
    return {
      searchVal: "",
      isHashPattern: /^((0x)?)([0-9a-f]{64})$/,
      isAssetPattern: /^((0x)?)([0-9a-f]{40})$/,
      isNumberPattern: /^\d+$/,
    };
  },
  methods: {
    search() {
      let value = this.searchVal;
      value = value.trim();
      this.searchVal = "";
      if (value === "") {
        alert("Please input a value to search!");
      } else if (this.isHashPattern.test(value)) {
        if (value.length === 64) {
          value = "0x" + value;
          console.log(value);
        }
        this.getTransactionByTransactionHash(value);
      } else if (this.isAssetPattern.test(value)) {
        if (value.length === 40) {
          value = "0x" + value;
          console.log(value);
        }
        this.getToken(value);
      } else if (Number(value[0]) >= 0) {
        value = value.replace(/[,，]/g, "");
        if (!isNaN(Number(value)) && this.isNumberPattern.test(value)) {
          if (Number.isInteger(Number(value))) {
            this.getBlockByBlockHeight(value);
          }
        } else {
          alert("Invalid input!");
        }
      } else {
        alert("Invalid input!");
      }
    },
    getBlockByBlockHash(block_hash) {
      console.log(block_hash);
    },
    getBlockByBlockHeight(blockheight){
      axios({
        method: "post",
        url: "/api",
        data: {
          "jsonrpc": "2.0",
          "id": 1,
          "params": {"BlockHeight":blockheight},
          "method": "GetBlockByBlockHeight"
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        if (res["data"]["error"] == null) {
          this.$router.push({
            path: `/blockinfo/${blockheight}`,
          });
          console.log(res.status);
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
        if (res["data"]["error"] == null) {
          this.$router.push({
            path: `/accountprofile/${addr}`,
          });
          console.log(res["data"]["error"]);
        } else {
          console.log(res["data"]["error"]);
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
          if (res["data"]["error"] == null) {
            this.$router.push({
              path: `/tokeninfo/${value}`,
            });
            console.log(res["data"]["error"]);
          } else {
            console.log(res["data"]["error"]);
            console.log(this.count160);
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
          if (res["data"]["error"] == null) {
            this.$router.push({
              path: `/contractinfo/${value}`,
            });
            console.log(res.status);
          } else {
            console.log(res["data"]["error"]);
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
        if (res["data"]["error"] == null) {
          this.$router.push({
            path: `/transactionInfo/${value}`,
          });
          console.log(res.status);
          this.getBlockByBlockHash(value);
        } else {
          console.log(res["data"]["error"]);
        }
      });
    },
  },
};
</script>
<style>
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
