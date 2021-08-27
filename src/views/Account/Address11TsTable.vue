<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div v-if="this.totalCount != 0" class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
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
          <th class="tableHeader">{{ $t("tokenTx.time") }}</th>
        </template>

        <template v-slot:default="row">
          <td class="budget">
            <div>
              <div
                      class="table-list-item"
                v-if="
                  row.item.txid ===
                  '0x0000000000000000000000000000000000000000000000000000000000000000'
                "
              >
                {{ $t("na") }}
              </div>
              <div class="txid" v-else>
                <router-link
                  class=" mb-0 table-list-item-blue"
                  style="cursor: pointer"
                  :to="'/transactionInfo/' + row.item.address"
                  >{{ row.item.txid }}</router-link
                >
              </div>
            </div>
          </td>
          <td class="table-list-item">
            <div class="from">
              {{ row.item.tokenname }}
            </div>
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
                  row.item.from === null &&
                  this.contractHash ===
                    '0xd2a4cff31913016155e38e474a2c06d08be276cf'
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
          <td class="from">
            <div>
              <div class="text-muted" v-if="row.item.from === null">
                {{ $t("nullAddress") }}
              </div>
              <div v-else-if="fromButton.state" class="addr">
                <router-link
                  v-if="row.item.from === this.account_address"
                  class="name mb-0 text-sm"
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
                  class="name mb-0 text-sm"
                  style="cursor: pointer"
                  :to="'/accountprofile/' + row.item.from"
                  ><i class="ni ni-tag"></i>{{ row.item.from }}
                </router-link>
                <router-link
                  v-else
                  class="name mb-0 text-sm"
                  style="cursor: pointer"
                  :to="'/accountprofile/' + row.item.from"
                  >{{ row.item.from }}
                </router-link>
              </div>
            </div>
          </td>
          <td>
            <h1 style="color: #42b983">&#8594;</h1>
          </td>
          <td class="to">
            <div class="text-muted" v-if="row.item.to === null">
              {{ $t("nullAddress") }}
            </div>
            <div v-else-if="toButton.state" class="addr">
              <router-link
                v-if="row.item.to === this.account_address"
                class="name mb-0 text-sm"
                style="cursor: pointer"
                :to="'/accountprofile/' + row.item.to"
                ><i class="ni ni-tag"></i>{{ scriptHashToAddress(row.item.to) }}
              </router-link>
              <router-link
                v-else
                class="name mb-0 text-sm"
                style="cursor: pointer"
                :to="'/accountprofile/' + row.item.to"
                >{{ scriptHashToAddress(row.item.to) }}
              </router-link>
            </div>
            <div v-else class="addr">
              <router-link
                v-if="row.item.to === this.account_address"
                class="name mb-0 text-sm"
                style="cursor: pointer"
                :to="'/accountprofile/' + row.item.to"
                ><i class="ni ni-tag"></i>{{ row.item.to }}
              </router-link>
              <router-link
                v-else
                class="name mb-0 text-sm"
                style="cursor: pointer"
                :to="'/accountprofile/' + row.item.to"
                >{{ row.item.to }}
              </router-link>
            </div>
          </td>

          <td class="table-list-item">
            {{ row.item.value }}
          </td>
          <td class="table-list-item">
            {{ convertTime(row.item.timestamp, this.$i18n.locale) }}
          </td>
        </template>
      </base-table>
      <div v-if="totalCount>=10"
              class="card-footer d-flex justify-content-end"
              :class="type === 'dark' ? 'bg-transparent' : ''"
              style="height: 70px"
      >
        <el-pagination
                @current-change="handleCurrentChange"
                :hide-on-single-page="totalCount<=10"
                :current-page="pagination"
                :pager-count= "5"
                :page-size= "10"
                layout="jumper, prev, pager, next"
                :total="totalCount">
        </el-pagination>
      </div>
    </div>

    <card shadow v-else class="text-center">{{
      $t("addressPage.nep11nullPrompt")
    }}</card>
  </div>
</template>
<script>
import axios from "axios";
import {
  changeFormat,
  convertToken,
  convertTime,
  addressToScriptHash,
  scriptHashToAddress,
} from "../../store/util";

export default {
  name: "address11-ts-table",
  props: {
    type: {
      type: String,
    },
    account_address: String,
  },
  data() {
    return {
      tableData: [],
      resultsPerPage: 10,
      pagination: 1,
      countPage: 0,
      fromButton: { state: true, buttonName: "Hash" },
      toButton: { state: true, buttonName: "Hash" },

      totalCount: 0,
      contractHash: "",
    };
  },
  created() {
    this.GetNep11TransferByAddress(0);
  },
  watch: {
    account_address: "watchcontract",
  },
  methods: {
    changeFormat,
    convertToken,
    convertTime,
    addressToScriptHash,
    scriptHashToAddress,
    watchcontract() {
      //如果路由有变化，执行的对应的动作
      this.GetNep11TransferByAddress(0);
    },
    handleCurrentChange(val) {
      this.isLoading = true;
      this.pagination = val;
      const skip = (val - 1) * this.resultsPerPage;
      this.GetNep11TransferByAddress(skip);
    },
    getTransaction(txhash) {
      this.$router.push({
        path: `/transactionInfo/${txhash}`,
      });
    },
    getContract(ctrHash) {
      this.$router.push({
        path: `/tokeninfo/${ctrHash}`,
      });
    },

    GetNep11TransferByAddress(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {
            Address: this.account_address,
            Limit: this.resultsPerPage,
            Skip: skip,
          },
          method: "GetNep11TransferByAddress",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.tableData = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.countPage =
          this.totalCount === 0
            ? 1
            : Math.ceil(this.totalCount / this.resultsPerPage);
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
.addr {
  width: 150px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
