<template>
  <div class="search-content">
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
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      searchVal: '',
      isHashPattern: /^((0x)?)([0-9a-f]{64})$/,
      isAssetPattern: /^([0-9a-f]{40})$/,
      isAddressPattern: /^A([0-9a-zA-Z]{33})$/,
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
          console.log(value)
        }
          this.getTransactionByTransactionHash(value)
      }

      else if (this.isAssetPattern.test(value)) {
        this.getAssetInfoByContractHash(value)
      }

      else if (this.isAddressPattern.test(value)) {
        this.getAddressByAddress(value)
      }

      else if (Number(value[0]) >= 0){
        value = value.replace(/[,，]/g, '');
        if (!isNaN(Number(value)) && this.isNumberPattern.test(value)) {
          if (Number.isInteger(Number(value))) {
            this.getBlockByBlockHash(value)
          }
        }
        else {
          this.$router.push({
            path: `/profile`,
          });
        }
      }

      else {
        this.$router.push({
          path: `/profile`,
        });
      }
    },
    getBlockByBlockHash(blockheight){
        console.log(blockheight)
    },
    getAddressByAddress(addr){
        console.log(addr)
    },
    getAssetInfoByContractHash(ass_id){
        console.log(ass_id)
    },

    getTransactionByTransactionHash(tx_id){
      axios({
        method:'post',
        url:'/api',
        data:{
          "jsonrpc": "2.0",
          "id": 1,
          "params": {"TransactionHash":tx_id},
          "method": "GetRawTransactionByTransactionHash"
        },
        headers:{'Content-Type': 'application/json','withCredentials':' true',
          'crossDomain':'true',},
      }).then((res) => {
        if (res["data"]["error"] ==null) {
          this.$router.push({
            path: `/transactionInfo/${tx_id}`,
          });
            console.log(res.status)
          }
        else {
          this.$router.push({
            path: `/profile`,
          });
          console.log(res.status)
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
