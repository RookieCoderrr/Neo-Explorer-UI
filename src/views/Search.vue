<template>
  <section class="page-content">
    <div class="search-content">
      <div class="h2 font-weight-bold mb-0">
        {{ 'Sorry, Your search height, hash, address or transaction id does not exist.' }}
      </div>
      <div class="row mt-3"></div>
      <div class="h2 font-weight-bold mb-0">{{ 'Try going back to where you were or heading to the home page.' }}</div>
      <div class="row mt-3"></div>
      <div class="search">
        <input
            type="text"
            class="over-ellipsis"
            :placeholder="'Block Height, Hash, Address or Transaction id'"
            v-model ="searchVal"
            autocomplete="off"
            @keyup.enter="search()"
        /><button  class="button" @click="search()"><img class="img" src="../assets/search.png" alt="search" /></button>
      </div>
    </div>
  </section>

</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      searchVal: '',
      isHashPattern: /^((0x)?)([0-9a-f]{64})$/,
      isAssetPattern: /^((0x)?)([0-9a-f]{40})$/,
      isNumberPattern: /^\d+$/,


    }
  },
  methods: {
    search() {
      var value = this.searchVal;
      // const inputValue = this.searchVal;
      value = value.trim();
      if (value === '') {
        return;
      }
      this.searchVal = '';
      if (this.isHashPattern.test(value)) {
        if (value.length === 64) {
          value = '0x' + value;
        }
          this.getTransactionByTransactionHash(value)



      }
      else if (this.isAssetPattern.test(value)) {
        if (value.length === 40) {
          value = '0x' + value;
        }
        this.getToken(value)

      }
      else if (Number(value[0]) >= 0){
        value = value.replace(/[,，]/g, '');
        if (!isNaN(Number(value)) && this.isNumberPattern.test(value)) {
          if (Number.isInteger(Number(value))) {
            this.getBlockByBlockHeight(value)
          }
        }
        else {
          this.$router.push({
            path: `/search`,
          });
        }
      }
      else {
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
          "params": {"BlockHeight":block_hash},
          "method": "GetBlockByBlockHash"
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
                if (res["data"]["error"] ==null) {
                  this.$router.push({
                    path: `/blockinfo/${block_hash}`,
                  });
                }
                else {
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
          "params": {"BlockHeight":blockheight},
          "method": "GetBlockByBlockHeight"
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
          if (res["data"]["error"] ==null) {
              this.$router.push({
                path: `/blockinfo/${blockheight}`,
              });
              console.log(res.status)
           }
          else {
            this.$router.push({
              path: `/search`,
            });
          }
        },
      )},


    getAddressByAddress(addr){
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
      })
          .then((res) => {
            if (res["data"]["error"] ==null) {
              this.$router.push({
                path: `/accountprofile/${addr}`,
              });
              console.log(res["data"]["error"])
            }
            else {
              console.log(res["data"]["error"])
              this.$router.push({
                path: `/search`,
              });
            }
          })
    },

    getToken(value){
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
          if (res["data"]["error"] ==null) {
            this.$router.push({
              path: `/tokeninfo/${value}`,
            });
            console.log(res["data"]["error"])
          }
          else {
            console.log(res["data"]["error"])
            console.log(this.count160)
            this.getContractInfoByContractHash(value)
          }
        });
      });

    },
    getContractInfoByContractHash(value){
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
          if (res["data"]["error"] ==null) {
            this.$router.push({
              path: `/contractinfo/${value}`,
            });
            console.log(res.status)
          }
          else {
            console.log(res["data"]["error"])
            this.getAddressByAddress(value)
          }

        });
      });

    },

    getTransactionByTransactionHash(value){
      axios({
        method:'post',
        url:'/api',
        data:{
          "jsonrpc": "2.0",
          "id": 1,
          "params": {"TransactionHash":value},
          "method": "GetRawTransactionByTransactionHash"
        },
        headers:{'Content-Type': 'application/json','withCredentials':' true',
          'crossDomain':'true',},
      }).then((res) => {
        if (res["data"]["error"] ==null) {
          this.$router.push({
            path: `/transactionInfo/${value}`,
          });
          console.log(res.status)
          this.getBlockByBlockHash(value)
          }
        else {

          console.log(res["data"]["error"])
        }
      });
    },
  },
}
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
