<template>

  <div class="search">
    <input
      type="text"
      class="over-ellipsis"
      :placeholder="'Block Height, Hash, Address or Transaction id'"
      v-model ="searchVal"
      autocomplete="off"
      @keyup.enter="search()"
    /><button  class="button" @click="search()"><img class="img" src="/assets/search.png" alt="search" /></button>
  </div>

</template>

<script>
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
      const inputValue = this.searchVal;
      value = value.trim();
      if (value === '') {
        return;
      }
      this.searchVal = '';
      if (this.isHashPattern.test(value)) {
        if (value.length === 64) {
          value = '0x' + value;
        }
        getTransactionByTxHash(value)

      }
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
        if (res.code === 200) {
          if (res.result === '1') {
            this.router.navigateByUrl(`/transaction/${value}`);
          } else if (res.result === '0') {
            this.router.navigateByUrl(`/asset/${value}/page/1`);
          }
        } else {
          this.router.navigateByUrl(`/notsearch/${inputValue}`);
        }
      });
    },
  },
}
</script>
<style>
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
