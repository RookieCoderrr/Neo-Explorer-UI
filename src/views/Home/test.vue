<template>
<button @click="getContract('0xd2a4cff31913016155e38e474a2c06d08be276cf')">get Contract</button>
  <span>{{this.table}}</span>
</template>

<script>
import axios from "axios";
export default {
  name: "test",
  data(){
    return {
      table:[]
    }
  },
  methods:{
    getContract(contract_id) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { ContractHash: contract_id },
          method: "GetContractByContractHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.table = res["data"]["result"];
      });
    },
  }


}
</script>

<style scoped>

</style>
