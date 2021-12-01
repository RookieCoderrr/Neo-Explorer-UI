<template>
  <div v-if="this.length != 0">
    <div
      v-if="this.length != 0"
      class="card "
      :class="type === 'dark' ? 'bg-default' : ''"
    >
<!--      <div class="table-responsive">-->
<!--        <base-table-->
<!--          class="table align-items-center table-hover"-->
<!--          :class="type === 'dark' ? 'table-dark' : ''"-->
<!--          :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"-->
<!--          tbody-classes="list"-->
<!--          :data="tableData"-->
<!--        >-->
<!--          <template v-slot:columns>-->
<!--            <th class="tableHeader">-->
<!--              {{ $t("transactionTransfer.contract") }}-->
<!--            </th>-->
<!--            <th class="tableHeader">{{ $t("transactionTransfer.token") }}</th>-->
<!--            <th class="tableHeader" style="text-align: center">-->
<!--              {{ $t("transactionTransfer.from") }}-->
<!--              <el-button type="info" :plain="true" size="small" style="height: 19px;margin-left: 4px" @click="changeFormat(fromButton)">-->
<!--                {{fromButton.buttonName}}</el-button>-->

<!--            </th>-->
<!--            <th class="tableHeader " style="text-align: center">{{ $t("transactionTransfer.amount") }}</th>-->
<!--            <th class="tableHeader" style="text-align: center">-->
<!--              {{ $t("transactionTransfer.to") }}-->
<!--              <el-button type="info" :plain="true" size="small" style="height: 19px;margin-left: 4px" @click="changeFormat(toButton)">-->
<!--                {{toButton.buttonName}}</el-button>-->

<!--            </th>-->


<!--          </template>-->

<!--          <template v-slot:default="row">-->
<!--            <td class="budget">-->
<!--              <div class="contract">-->
<!--                <router-link-->
<!--                  class="  mb-0 table-list-item-blue"-->
<!--                  style="cursor: pointer; "-->
<!--                  :to="'/contractinfo/' + row.item.contract"-->
<!--                  >{{ row.item.contract }}</router-link-->
<!--                >-->
<!--              </div>-->
<!--            </td>-->
<!--            <td class="budget">-->
<!--              <div class="table-list-item">-->
<!--                {{ row.item.tokenname }}-->
<!--              </div>-->
<!--            </td>-->
<!--            <td class="budget" style="text-align: center">-->
<!--              <div class="table-list-item">-->
<!--                <span class="text-muted" v-if="row.item.from === null">-->
<!--                  {{ $t("nullAddress") }}</span-->
<!--                >-->
<!--                <router-link-->
<!--                  class="  mb-0 table-list-item-blue"-->
<!--                  v-else-->
<!--                  style="cursor: pointer; "-->
<!--                  :to="'/accountprofile/' + row.item.from"-->
<!--                  >{{-->
<!--                    this.fromButton.state-->
<!--                      ? scriptHashToAddress(row.item.from)-->
<!--                      : row.item.from-->
<!--                  }}</router-link-->
<!--                >-->
<!--              </div>-->
<!--            </td>-->
<!--            <td class="pt-4" style="text-align: center">-->
<!--              <div class="table-list-item mt-2" style="text-align: center">-->
<!--                {{ convertToken(row.item.value, row.item.decimals) }}-->
<!--                <span v-if="row.item.tokenname==='NeoToken'">Neo</span>-->
<!--                <span v-else-if="row.item.tokenname==='GasToken'">Gas</span>-->
<!--              </div>-->
<!--              <span style="color: #42b983;font-size: 30px">&#10230;</span>-->
<!--              <div class="table-list-item">-->
<!--                <span-->
<!--                    class="text-success"-->
<!--                    v-if="-->
<!--                    row.item.from === null && row.item.tokenname === 'GasToken'-->
<!--                  "-->
<!--                    type="primary"-->
<!--                >-->
<!--                  {{ $t("transferReward") }}-->
<!--                </span>-->
<!--                <span-->
<!--                    class="text-success"-->
<!--                    v-else-if="row.item.from === null"-->
<!--                    type="primary"-->
<!--                >{{ $t("mint") }}</span-->
<!--                >-->
<!--                <span class="text-danger" v-else-if="row.item.to === null">-->
<!--                  {{ $t("burn") }}</span-->
<!--                >-->
<!--                <span v-else style="color: seagreen"> {{ $t("transfer") }}</span>-->
<!--              </div>-->
<!--            </td>-->
<!--            <td class="budget" style="text-align: center">-->
<!--              <div class="table-list-item">-->
<!--                <span class="text-muted" v-if="row.item.to === null">-->
<!--                  {{ $t("nullAddress") }}</span-->
<!--                >-->
<!--                <router-link-->
<!--                  v-else-->
<!--                  class="  mb-0 table-list-item-blue"-->
<!--                  style="cursor: pointer ; "-->
<!--                  :to="'/accountprofile/' + row.item.to"-->
<!--                  >{{-->
<!--                    this.toButton.state-->
<!--                      ? scriptHashToAddress(row.item.to)-->
<!--                      : row.item.to-->
<!--                  }}</router-link-->
<!--                >-->
<!--              </div>-->
<!--            </td>-->




<!--          </template>-->
<!--        </base-table>-->
<!--      </div>-->


      <div class="devicelg" style="background-color: #f7f8fa; width: 100%">
        <div class="left" style="width:48.5%;background-color: white;border-radius: 10px; float: left">
          <div style="height: 60px;width:100%;display:block;line-height:60px;text-align: center">
            {{ $t("transactionTransfer.from") }}
          </div>
          <div class="colorTable" v-for ="(item, index) in this.tableData" :key="index" style="width: 100%">
            <div class="table-list-item padding" v-if="item.from !== null" style=" height: 80px; text-align: center;padding-top: 20px;padding-left: 10%; padding-right: 10%">

                <span class="text-muted" v-if="item.from === null" >
                  {{ $t("nullAddress") }}</span
                >
              <router-link
                  class="  mb-0 table-list-item-blue padding-size"
                  v-else
                  style="cursor: pointer;color: #1fa2ff "
                  :to="'/accountprofile/' + item.from"
              >{{scriptHashToAddress(item.from)}}</router-link>
              <router-link class="table-list-item mt-2" style=" display:block;text-align: center;cursor: pointer" :to="'/contractinfo/' + item['contract']">
                [
                {{ convertToken(item.value, item.decimals) }}
                <span v-if="item.tokenname==='NeoToken'" style="color: #2dce89">Neo</span>
                <span v-else-if="item.tokenname==='GasToken'" style="color: darkorange">Gas</span>
                <span v-else>{{item.tokenname}}</span>
                ]
              </router-link>

            </div>
            <div class="table-list-item padding" v-else style=" height: 80px; text-align: center;padding-top: 20px;padding-left: 10%; padding-right: 10%"></div>
        </div>
        </div>
        <div class="mid" style="width: 3%;float: left">
          <div  style="height: 60px">

          </div>
          <div  class="paddingArrow" v-for="index in this.length" :key="index" style="height: 80px; text-align: center;" >
            <svg  class="paddingArrow" style="height: 80px" width="30px" height="30px" viewBox="0 0 81 81" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Combined Shape</title><g id="-1440-desktop-designs" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.93"><g id="Desktop--1440px-Invocation-information" transform="translate(-736.000000, -377.000000)" fill="#7D9FB1"><g id="Invocation-expanded" transform="translate(175.000000, 353.000000)"><path d="M601.5,24 C623.867532,24 642,42.1324676 642,64.5 C642,86.8675324 623.867532,105 601.5,105 C579.132468,105 561,86.8675324 561,64.5 C561,42.1324676 579.132468,24 601.5,24 Z M601.355881,46.4210802 L598.093181,49.68378 L610.978081,62.6239794 L582.885682,62.6239794 L582.885682,67.1585792 L610.978081,67.1585792 L598.093181,80.0987785 L601.355881,83.3614784 L619.82608,64.8912793 L601.355881,46.4210802 Z" id="Combined-Shape"></path></g></g></g></svg>
          </div>
        </div>
        <div class="right" style="width: 48.5% ;  background-color: white;border-radius: 10px;float: right" >
          <div style="height: 60px;width:100%;display:block;line-height:60px;text-align: center">
          {{ $t("transactionTransfer.to") }}
          </div>
          <div class="colorTable" v-for ="(item, index) in this.tableData" :key="index">
            <div class="table-list-item padding" v-if="item.to !== null" style=" height: 80px; text-align: center; padding-top: 20px;padding-left: 10%; padding-right: 10%" >
                <span class="text-muted" v-if="item.to === null">
                  {{ $t("nullAddress") }}</span
                >
              <router-link
                  v-else
                  class="  mb-0 table-list-item-blue padding-size"
                  style="cursor: pointer ; color: #1fa2ff;"
                  :to="'/accountprofile/' +item['to']"
              >
                {{scriptHashToAddress(item['to']) }}
              </router-link>
              <router-link class="table-list-item mt-2" style="display:block;text-align: center;cursor: pointer" :to="'/contractinfo/' + item['contract']">
                [
                {{ convertToken(item.value, item.decimals) }}
                <span v-if="item.tokenname==='NeoToken'" style="color: #2dce89">Neo</span>
                <span v-else-if="item.tokenname==='GasToken'" style="color: darkorange">Gas</span>
                <span v-else>{{item.tokenname}}</span>
                ]
              </router-link>


            </div>
            <div class="table-list-item padding" v-else style=" height: 80px; text-align: center;padding-top: 20px;padding-left: 10%; padding-right: 10%"></div>
          </div>
        </div>
      </div>
      <div class="devicesm" style="background-color: #f7f8fa; width: 100%;display: none">
        <div  style="width:47%;background-color: white;border-radius: 10px; float: left">
          <div style="height: 60px;width:100%;display:block;line-height:60px;text-align: center">
            {{ $t("transactionTransfer.from") }}
          </div>
          <div class="colorTable" v-for ="(item, index) in this.tableData" :key="index" style="width: 100%">
            <div class="table-list-item " v-if="item.from !== null" style=" height: 150px; text-align: center;padding-top: 24px;padding-left: 10%; padding-right: 10%">

                <span class="text-muted" v-if="item.from === null" >
                  {{ $t("nullAddress") }}</span
                >
              <router-link
                  class="  mb-0 table-list-item-blue padding-size"
                  v-else
                  style="cursor: pointer;color: #1fa2ff "
                  :to="'/accountprofile/' + item.from"
              >{{scriptHashToAddress(item.from)}}</router-link>
              <div class="table-list-item mt-2" style="text-align: center;">
                [
                {{ convertToken(item.value, item.decimals) }}

                ]
              </div>
              <router-link v-if="item.tokenname==='NeoToken'" style="color: #2dce89;cursor: pointer" :to="'/contractinfo/' + item['contract']">Neo</router-link>
              <router-link v-else-if="item.tokenname==='GasToken'" style="color: darkorange;cursor: pointer" :to="'/contractinfo/' + item['contract']">Gas</router-link>
              <router-link v-else style="cursor: pointer" :to="'/contractinfo/' + item['contract']">{{item.tokenname}}</router-link>

            </div>
            <div v-else style=" height: 150px; text-align: center; padding-left: 10%; padding-right: 10%; padding-top: 24px"></div>
          </div>
        </div>
        <div  style="width: 6%;float: left">
          <p  style="height: 60px">

          </p>
          <div  class="" v-for="index in this.length" :key="index" style=" height: 140px; text-align: center" >
            <svg  class="" style="height: 140px" width="17px" height="17px" viewBox="0 0 81 81" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Combined Shape</title><g id="-1440-desktop-designs" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.93"><g id="Desktop--1440px-Invocation-information" transform="translate(-736.000000, -377.000000)" fill="#7D9FB1"><g id="Invocation-expanded" transform="translate(175.000000, 353.000000)"><path d="M601.5,24 C623.867532,24 642,42.1324676 642,64.5 C642,86.8675324 623.867532,105 601.5,105 C579.132468,105 561,86.8675324 561,64.5 C561,42.1324676 579.132468,24 601.5,24 Z M601.355881,46.4210802 L598.093181,49.68378 L610.978081,62.6239794 L582.885682,62.6239794 L582.885682,67.1585792 L610.978081,67.1585792 L598.093181,80.0987785 L601.355881,83.3614784 L619.82608,64.8912793 L601.355881,46.4210802 Z" id="Combined-Shape"></path></g></g></g></svg>
          </div>
        </div>
        <div  style="width: 47% ;  background-color: white;border-radius: 10px;float: right" >
          <div style="height: 60px;width:100%;display:block;line-height:60px;text-align: center">
            {{ $t("transactionTransfer.to") }}
          </div>
          <div class="colorTable" v-for ="(item, index) in this.tableData" :key="index">
            <div class="table-list-item " v-if="item.to !== null" style=" height: 150px; text-align: center; padding-left: 10%; padding-right: 10%; padding-top: 24px" >
              <span class="text-muted" v-if="item.to === null" >
                  {{ $t("nullAddress") }}</span
                >
              <router-link
                  v-else
                  class="  mb-0 table-list-item-blue padding-size"
                  style="cursor: pointer ; color: #1fa2ff;"
                  :to="'/accountprofile/' +item['to']"
              >
                {{scriptHashToAddress(item['to']) }}
              </router-link>
              <router-link class="table-list-item mt-2" style=" display:block;text-align: center;cursor: pointer" :to="'/contractinfo/' + item['contract']">
                [
                {{ convertToken(item.value, item.decimals) }}

                ]
              </router-link>
              <router-link v-if="item.tokenname==='NeoToken'" style="color: #2dce89;cursor: pointer" :to="'/contractinfo/' + item['contract']">Neo</router-link>
              <router-link v-else-if="item.tokenname==='GasToken'" style="color: darkorange;cursor: pointer" :to="'/contractinfo/' + item['contract']">Gas</router-link>
              <router-link v-else style="cursor: pointer" :to="'/contractinfo/' + item['contract']">{{item.tokenname}}</router-link>
            </div>
            <div v-else style=" height: 150px; text-align: center; padding-left: 10%; padding-right: 10%; padding-top: 24px">

            </div>
          </div>
        </div>
      </div>
      </div>
  </div>
  <card shadow v-else class="text-center">
    {{ $t("transactionTransfer.nep17null") }}
  </card>
</template>
<script>
import axios from "axios";
import {
  changeFormat,
  convertToken,
  addressToScriptHash,
  scriptHashToAddress,
} from "../../store/util";
import net from "../../store/store";

export default {
  name: "transfers-list",
  props: {
    type: {
      type: String,
    },
    title: String,
    txhash: String,
  },
  data() {
    return {
      network: net.url,
      tableData: [],
      length,
      fromButton: { state: true, buttonName: "Hash" },
      toButton: { state: true, buttonName: "Hash" },
    };
  },
  created() {
    this.getNep17TransferByTransactionHash(this.txhash);
    // this.hasContent(this.length)
  },
  watch: {
    txhash: "watchtxhash",
  },
  methods: {
    changeFormat,
    convertToken,
    addressToScriptHash,
    scriptHashToAddress,
    watchtxhash() {
      //如果路由有变化，执行的对应的动作
      this.getNep17TransferByTransactionHash(this.txhash);
    },
    getContract(ctrHash) {
      this.$router.push({
        path: `/contractinfo/${ctrHash}`,
      });
    },
    getAccount(accHash) {
      this.$router.push({
        path: `/accountprofile/${accHash}`,
      });
    },
    getNep17TransferByTransactionHash(txhash) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { TransactionHash: txhash },
          method: "GetNep17TransferByTransactionHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.tableData = res["data"]["result"]["result"];
        // console.log(this.tableData)
        this.length = this.tableData["length"];
      });
    },
  },
};
</script>
<style>
.contract {
  width: 150px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.from {
  width: 150px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.to {
  width: 150px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.colorTable:nth-child(2n){

  background-color: #f6f9fc;
}
@media screen and (max-width: 980px ){
  .padding{
    padding-top:30px!important;
    height: 110px!important;
  }
  .padding-size{
    font-size:10px
  }
  .paddingArrow{
    height:110px!important;
  }

}

@media screen and (max-width: 1300px) {
  .left{
    width: 47% !important;
  }
  .right{
    width: 47%!important;
  }
  .mid {
    width: 6% !important;
  }
}
@media screen and (max-width: 650px){
  .devicelg{
    display: none;
  }
  .devicesm {
    display: initial!important;
  }
}
</style>
