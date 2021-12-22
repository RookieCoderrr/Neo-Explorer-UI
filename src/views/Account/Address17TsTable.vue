<template>
    <div class="card-header border-0"
         :class="type==='dark' ?'bg-transparent':''">
      <div class="row align-items-center">
        <div class="col-2">
          <el-dropdown>
            <el-button size="mini" plain>
              {{ this.listButton.buttonName }}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.93387 4.03915C8.73861 3.84388 8.42202 3.84388 8.22676 4.03915L6.04662 6.21929L3.92899 4.10165C3.73372 3.90638 3.41714 3.90638 3.22188 4.10165L2.86833 4.4552C2.67306 4.65046 2.67306 4.96705 2.86833 5.16231L5.69675 7.99074C5.89201 8.186 6.2086 8.186 6.40386 7.99074L6.75741 7.63718C6.77481 7.61979 6.79065 7.60143 6.80495 7.58228L9.28742 5.09981C9.48268 4.90454 9.48268 4.58796 9.28742 4.3927L8.93387 4.03915Z" fill="#4E5969"/>
              </svg>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="switchTransferList('All')"><span>All Types</span></el-dropdown-item>
                <el-dropdown-item @click="switchTransferList('Only')"> <span>Transfers Only</span></el-dropdown-item>

              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="col-8">
        </div>
        <div class="col-2" style="text-align: center" >

            <el-button size="mini" plain @click="dialogVisible = true ">CSV Export</el-button>
            <el-dialog
                v-model="dialogVisible"
                title="Export address transfers to csv format "
            >
              <loading
                  :is-full-page="false"
                  :opacity="0.9"
                  :active="isLoading"
              ></loading>
              <div class="mb-2">Please select the time period of transfer records</div>
              <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="Start date"
                  end-placeholder="End date"
                  unlink-panels
              >
              </el-date-picker>

              <template #footer>
                 <span class="dialog-footer">
                   <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="downLoad()">
                      Export
                    </el-button>
                  </span>
              </template>
            </el-dialog>

        </div>

      </div>

    </div>

    <div v-if="this.totalCount!=0" >
      <div
              v-if="this.totalCount!=0"
              class="card shadow"
              :class="type === 'dark' ? 'bg-default' : ''"
      >

      <div class="table-responsive">
      <base-table
        class="table align-items-center table-hover"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"
      >
        <template v-slot:columns>
          <th class="tableHeader">{{ $t("tokenTx.txid") }}</th>
          <th class="tableHeader">{{ $t("transferList.token") }}</th>
          <th class="tableHeader">
            {{ $t("transferList.from") }}
            <el-button type="info" :plain="true" size="small" style="height: 19px;margin-left: 4px" @click="changeFormat(fromButton)">
              {{fromButton.buttonName}}</el-button>
          </th>
          <th class="tableHeader"></th>
          <th class="tableHeader" style="text-align: center">{{ $t("transferList.amount") }}</th>
          <th class="tableHeader">
            {{ $t("transferList.to") }}
            <el-button type="info" :plain="true" size="small" style="height: 19px;margin-left: 4px" @click="changeFormat(toButton)">
              {{toButton.buttonName}}</el-button>
          </th>

          <th class="tableHeader">{{ $t("tokenTx.time") }}
            <el-button type="info" :plain="true" size="small" style="height: 19px;margin-left: 4px" @click="switchTime(time)">
              Format</el-button>
          </th>
        </template>
        <template v-slot:default="row">
          <td class="table-list-item">
            <div>
              <div
                class="text-muted"
                v-if="
                  row.item.txid ===
                  '0x0000000000000000000000000000000000000000000000000000000000000000'
                "
              >
                {{ $t("na") }}
              </div>
              <div class="txid" v-else>
                <router-link
                  class="name mb-0 text-sm"
                  style="cursor: pointer; "
                  :to="'/transactionInfo/' + row.item.txid"
                  >{{ row.item.txid }}</router-link
                >
              </div>
            </div>
          </td>
          <td class="table-list-item">
              {{ row.item.tokenname }}
          </td>

          <td class="table-list-item">
            <div>
              <div class="text-muted" v-if="row.item.from === null">
                {{ $t("nullAddress") }}
              </div>
              <div v-else-if="fromButton.state" class=" short">
                <span
                  v-if="row.item.from === this.account_address"
                  >{{ scriptHashToAddress(row.item.from) }}
                </span>
                <router-link
                  v-else
                  class="name mb-0 text-sm"
                  style="cursor: pointer; "
                  :to="'/accountprofile/' + row.item.from"
                  >{{ scriptHashToAddress(row.item.from) }}
                </router-link>
              </div>
              <div v-else class=" short">
                <span
                  v-if="row.item.from === this.account_address"
                  >{{ row.item.from }}
                </span>
                <router-link
                  v-else
                  class="  mb-0 table-list-item-blue"
                  style="cursor: pointer; "
                  :to="'/accountprofile/' + row.item.from"
                  >{{ row.item.from }}
                </router-link>
              </div>
            </div>
          </td>
          <td class="table-list-item" style="text-align: center">
            <el-tag v-if="row.item.to===this.account_address && row.item.from===this.account_address" type="info" hit color="" ><span style="font-weight: bold;font-size: 15px;">Self</span> </el-tag>
            <el-tag v-else-if="row.item.to===this.account_address" type="success" hit color="" ><span style="font-weight: bold;font-size: 15px;">In</span> </el-tag>
            <el-tag v-else-if="row.item.from===this.account_address" type="warning" hit color="" ><span style="font-weight: bold;font-size: 15px;">Out</span> </el-tag>
          </td>
          <td class="pt-4" style="text-align: center">
            <div class="table-list-item mt-2" style="text-align: center">
              {{ convertToken(row.item.value, row.item.decimals) }} {{row.item.symbol}}
            </div>
            <span style="color: #42b983;font-size: 30px">&#10230;</span>
            <div  class="mt-2" style="text-align: center">
              <span
                  class="text-primary"
                  v-if="
                  row.item.txid ===
                    '0x0000000000000000000000000000000000000000000000000000000000000000' &&
                  row.item.from === null &&
                  row.item.value === '50000000'
                "
                  type="primary"
              >{{ $t("blockReward") }}</span
              >
              <span
                  class="text-warning"
                  v-else-if="
                  row.item.txid ===
                    '0x0000000000000000000000000000000000000000000000000000000000000000' &&
                  row.item.from === null
                "
                  type="primary"
              >{{ $t("networkFeeReward") }}</span
              >
              <span
                  class="text-danger"
                  v-else-if="
                  row.item.txid ===
                    '0x0000000000000000000000000000000000000000000000000000000000000000' &&
                  row.item.to === null
                "
                  type="primary"
              >{{ $t("feeBurn") }}</span
              >
              <span
                  class="text-success"
                  v-else-if="
                  row.item.from === null && row.item.tokenname === 'GasToken'
                "
                  type="primary"
              >
                {{ $t("transferReward") }}
              </span>
              <span
                  class="text-success"
                  v-else-if="row.item.from === null"
                  type="primary"
              >{{ $t("mint") }}</span
              >
              <span class="text-danger" v-else-if="row.item.to === null">
                {{ $t("burn") }}</span
              >
              <span  v-else style="color: seagreen"> {{ $t("transfer") }}</span>
            </div>
          </td>
          <td class="table-list-item">
            <div class="text-muted" v-if="row.item.to === null">
              {{ $t("nullAddress") }}
            </div>
            <div v-else-if="toButton.state" class="short">
              <span
                v-if="row.item.to === this.account_address">
               {{ scriptHashToAddress(row.item.to) }}
              </span>
              <router-link
                v-else
                class="  mb-0 table-list-item-blue"
                style="cursor: pointer;"
                :to="'/accountprofile/' + row.item.to"
                >{{ scriptHashToAddress(row.item.to) }}
              </router-link>
            </div>
            <div v-else class="short">
              <span
                v-if="row.item.to === this.account_address"

                >{{ row.item.to }}
              </span>
              <router-link
                v-else
                class="mb-0 table-list-item-blue"
                style="cursor: pointer; "
                :to="'/accountprofile/' + row.item.to"
                >{{ row.item.to }}
              </router-link>
            </div>
          </td>


          <td class="table-list-item">
            <div>
              {{time.state? this.convertTime(row.item.timestamp, this.$i18n.locale):this.convertISOTime(row.item.timestamp) }}
            </div>
          </td>
        </template>
      </base-table>
      <div  v-if="totalCount>=10"
              class="card-footer d-flex justify-content-end"
              :class="type === 'dark' ? 'bg-transparent' : ''"
              style="height: 70px"
      >
        <el-pagination
            v-if="windowWidth > 552"
            @current-change="handleCurrentChange"
            :hide-on-single-page="totalCount<=10"
            :current-page="parseInt(pagination)"
            :pager-count= "5"
            :page-size= "10"
            layout="jumper, prev, pager, next"
            :total="totalCount">
        </el-pagination>
        <el-pagination
            v-if="windowWidth < 552"
            small ="true"
            @current-change="handleCurrentChange"
            :hide-on-single-page="totalCount<=10"
            :current-page="parseInt(pagination)"
            :pager-count= "5"
            layout="prev,pager,next"
            :total="totalCount">
        </el-pagination>
      </div>
    </div>
      </div></div>
    <card v-else shadow class="text-center">{{
      $t("addressPage.nep17nullPrompt")
    }}</card>
</template>
<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import json2csv from 'json2csv';
import {
  changeFormat,
  convertToken,
  convertTime,
  convertISOTime,
  switchTime,
  addressToScriptHash,
  scriptHashToAddress,
} from "../../store/util";
import net from "../../store/store";
// import {ref} from 'vue'

export default {
  name: "address17-ts-table",
  props: {
    type: {
      type: String,
    },
    title: String,
    account_address: String,
  },
  components: {
    Loading
  },


  data() {
    return {
      time:{state:true},
      network: net.url,
      tableData: [],
      exportData:[],
      tableDataTransfer:[],
      resultsPerPage: 10,
      pagination: 1,
      countPage: 0,
      fromButton: { state: true, buttonName: "Hash" },
      toButton: { state: true, buttonName: "Hash" },
      totalCount: 0,
      totalCountTransfer: 0,
      listButton:{ flag:false,buttonName:"All Types",},
      windowWidth:window.innerWidth,
      value1:[new Date(2021, 1, 1), new Date()],
      dialogVisible:false,
      isLoading:false,
      fields:['txid','blockhash','timestamp','from','to','contract','value','symbol','decimals','netfee','sysfee','vmstate']
    };
  },
  created() {
    this.GetNep17TransferByAddress(0,this.listButton.flag);
  },

  watch: {
    account_address: "watchaddress",
  },
  methods: {
    changeFormat,
    convertToken,
    convertTime,
    convertISOTime,
    switchTime,
    addressToScriptHash,
    scriptHashToAddress,
    watchaddress() {

      this.GetNep17TransferByAddress(0,this.listButton.flag);
    },
    getTransaction(txhash) {
      this.$router.push({
        path: `/transactionInfo/${txhash}`,
      });
    },
    handleCurrentChange(val) {
      this.isLoading = true;
      this.pagination = val;
      const skip = (val - 1) * this.resultsPerPage;
      this.GetNep17TransferByAddress(skip,this.listButton.flag);


    },

    downLoad(){
      this.isLoading = true;
      this.GetNep17TransferByAddressExport(0,true)

    },
    export(){
      try {
        console.log(this.exportData)
        const result = json2csv.parse(this.exportData,{fields:this.fields} );
        console.log("here")
        if ((navigator.userAgent.indexOf('compatible') > -1 &&
            navigator.userAgent.indexOf('MSIE') > -1) ||
            navigator.userAgent.indexOf('Edge') > -1) {
          var BOM = "\uFEFF";
          var csvData = new Blob([BOM + result], {type: "text/csv"});
          navigator.msSaveBlob(csvData, this.account_address+"_transfers");
        }

        else {
          var csvContent = "data:text/csv;charset=utf-8,\uFEFF" + result;
          var link = document.createElement("a");
          link.href = encodeURI(csvContent);
          link.download = this.scriptHashToAddress(this.account_address)+"_transfers";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (err) {
        alert(err)
      }
    },
    getContract(ctrHash) {
      this.$router.push({
        path: `/tokeninfo/${ctrHash}`,
      });
    },

    getAddress(accountAddress) {
      this.$router.push({
        path: `/accountprofile/${accountAddress}`,
      });
    },
    switchTransferList(type){
      if(type==="All"){
        this.listButton.flag=false;
        this.listButton.buttonName="All Types"
      } else if (type==="Only") {
        this.listButton.flag=true;
        this.listButton.buttonName="Transfers Only"
      }
      this.pagination =1
      this.GetNep17TransferByAddress(0,this.listButton.flag)
    },
    GetNep17TransferByAddress(skip,flag) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {
            Address: this.account_address,
            Limit: this.resultsPerPage,
            ExcludeBonusAndBurn:flag,
            Skip: skip,
          },
          // TODO 是否可以按照时间排序，似乎需要修改后端
          method: "GetNep17TransferByAddress",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
          this.tableData = res["data"]["result"]["result"];
          console.log(this.tableData)
          this.totalCount = res["data"]["result"]["totalCount"];
          for (let k = 0; k < this.tableData.length; k++) {
            axios({
              method: "post",
              url: "/api",
              data: {
                jsonrpc: "2.0",
                id: 1,
                params: {
                  ContractHash: this.tableData[k]["contract"],
                  Limit: this.resultsPerPage,
                  Skip: skip,
                },
                method: "GetAssetInfoByContractHash",
              },
              headers: {
                "Content-Type": "application/json",
                withCredentials: " true",
                crossDomain: "true",
              },
            }).then((res) => {
              this.tableData[k]["tokenname"] = res["data"]["result"]["tokenname"];
              this.tableData[k]["symbol"] = res["data"]["result"]["symbol"];
              this.tableData[k]["decimals"] = res["data"]["result"]["decimals"];
            });
          }

      });
    },

    GetNep17TransferByAddressExport(skip,flag) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {
            Address: this.account_address,
            ExcludeBonusAndBurn:flag,
            Limit:500,
            Skip: skip,
          },
          // TODO 是否可以按照时间排序，似乎需要修改后端
          method: "GetNep17TransferByAddress",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.exportData = res["data"]["result"]["result"];
        console.log(this.exportData)
        let count = 0;
        for (let k = 0; k < this.exportData.length; k++) {
          axios({
            method: "post",
            url: "/api",
            data: {
              jsonrpc: "2.0",
              id: 1,
              params: {
                ContractHash: this.exportData[k]["contract"],
                Limit: this.resultsPerPage,
                Skip: skip,
              },
              method: "GetAssetInfoByContractHash",
            },
            headers: {
              "Content-Type": "application/json",
              withCredentials: " true",
              crossDomain: "true",
            },
          }).then((res) => {
            this.exportData[k]["tokenname"] = res["data"]["result"]["tokenname"];
            this.exportData[k]["symbol"] = res["data"]["result"]["symbol"];
            this.exportData[k]["decimals"] = res["data"]["result"]["decimals"];
            count = count +1;
            if (count === this.exportData.length) {
              this.isLoading=false
              this.dialogVisible = false
              this.export()
            }
          });
        }





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
.txid {
  width: 200px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.addr {
  width: 150px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
