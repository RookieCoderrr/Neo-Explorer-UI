<template>
    <div class="card-header border-0"
         :class="type==='dark' ?'bg-transparent':''">
      <div class="row align-items-center">
        <div class="col-2">
          <base-dropdown>
            <template v-slot:title>
              <base-button type="default" class="btn btn-sm">
                {{ this.listButton.buttonName }}
              </base-button>
            </template>
            <li>
              <a class="dropdown-item" @click="switchTransferList('All')">
                <span>All Types</span>
              </a>
            </li>
            <li>
              <a class="dropdown-item" @click="switchTransferList('Only')">
                <span>Transfers Only</span>
              </a>
            </li>

          </base-dropdown>
        </div>
        <div class="col-10">

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
          <th class="tableHeader">{{ $t("transferList.type") }}</th>
          <th class="tableHeader">
            {{ $t("transferList.from") }}
            <el-button type="info" :plain="true" size="small" style="height: 19px;margin-left: 4px" @click="changeFormat(fromButton)">
              {{fromButton.buttonName}}</el-button>
          </th>
          <th class="tableHeader"></th>
          <th class="tableHeader">
            {{ $t("transferList.to") }}
            <el-button type="info" :plain="true" size="small" style="height: 19px;margin-left: 4px" @click="changeFormat(toButton)">
              {{toButton.buttonName}}</el-button>
          </th>
          <th class="tableHeader">{{ $t("transferList.amount") }}</th>
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
                  style="cursor: pointer"
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
              <span class="text-info" v-else> {{ $t("transfer") }}</span>
            </div>
          </td>
          <td class="table-list-item">
            <div>
              <div class="text-muted" v-if="row.item.from === null">
                {{ $t("nullAddress") }}
              </div>
              <div v-else-if="fromButton.state" class="addr">
                <router-link
                  v-if="row.item.from === this.account_address"
                  class="  mb-0 table-list-item-blue"
                  style="cursor: pointer"
                  :to="'/accountprofile/' + row.item.from"
                  ><i class="ni ni-tag"></i
                  >{{ scriptHashToAddress(row.item.from) }}
                </router-link>
                <router-link
                  v-else
                  class="name mb-0 text-sm"
                  style="cursor: pointer"
                  :to="'/accountprofile/' + row.item.from"
                  >{{ scriptHashToAddress(row.item.from) }}
                </router-link>
              </div>
              <div v-else class="addr">
                <router-link
                  v-if="row.item.from === this.account_address"
                  class="  mb-0 table-list-item-blue"
                  style="cursor: pointer"
                  :to="'/accountprofile/' + row.item.from"
                  ><i class="ni ni-tag"></i>{{ row.item.from }}
                </router-link>
                <router-link
                  v-else
                  class="  mb-0 table-list-item-blue"
                  style="cursor: pointer"
                  :to="'/accountprofile/' + row.item.from"
                  >{{ row.item.from }}
                </router-link>
              </div>
            </div>
          </td>
          <td>
            <h3 style="color: #42b983">&#8594;</h3>
          </td>
          <td class="table-list-item">
            <div class="text-muted" v-if="row.item.to === null">
              {{ $t("nullAddress") }}
            </div>
            <div v-else-if="toButton.state" class="addr">
              <router-link
                v-if="row.item.to === this.account_address"
                class="  mb-0 table-list-item-blue"
                style="cursor: pointer"
                :to="'/accountprofile/' + row.item.to"
                ><i class="ni ni-tag"></i>{{ scriptHashToAddress(row.item.to) }}
              </router-link>
              <router-link
                v-else
                class="  mb-0 table-list-item-blue"
                style="cursor: pointer"
                :to="'/accountprofile/' + row.item.to"
                >{{ scriptHashToAddress(row.item.to) }}
              </router-link>
            </div>
            <div v-else class="addr">
              <router-link
                v-if="row.item.to === this.account_address"
                class="mb-0 table-list-item-blue"
                style="cursor: pointer"
                :to="'/accountprofile/' + row.item.to"
                ><i class="ni ni-tag"></i>{{ row.item.to }}
              </router-link>
              <router-link
                v-else
                class="mb-0 table-list-item-blue"
                style="cursor: pointer"
                :to="'/accountprofile/' + row.item.to"
                >{{ row.item.to }}
              </router-link>
            </div>
          </td>

          <td class="table-list-item">
            {{ convertToken(row.item.value, row.item.decimals) }}
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
            :current-page="pagination"
            :pager-count= "3"
            :page-size= "10"
            layout="jumper, prev, pager, next"
            :total="totalCount">
        </el-pagination>
        <el-pagination
            v-if="windowWidth < 552"
            small ="true"
            @current-change="handleCurrentChange"
            :hide-on-single-page="totalCount<=10"
            :current-page="pagination"
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

export default {
  name: "address17-ts-table",
  props: {
    type: {
      type: String,
    },
    title: String,
    account_address: String,
  },

  data() {
    return {
      time:{state:true},
      network: net.url,
      tableData: [],
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
          // console.log(this.tableData)
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
              this.tableData[k]["decimals"] = res["data"]["result"]["decimals"];
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
