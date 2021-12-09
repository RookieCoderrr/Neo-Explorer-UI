<template>
  <div
    class="card shadow"
    :class="type === 'dark' ? 'bg-default' : ''"
  >
    <div class="table-responsive">
      <loading
        :is-full-page="false"
        :opacity="0.9"
        :active="isLoading"
      ></loading>
      <base-table
        class="table align-items-center table-hover"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"
      >
        <template v-slot:columns>
          <th class="tableHeader"> # </th>
<!--          <th class="tableHeader">{{ $t("nftToken.name") }}</th>-->
          <th class="tableHeader">{{ $t("nftToken.name") }}</th>
          <th class="tableHeader">{{ $t("nftToken.tokenId") }}</th>
          <!--          <th>Last Transferred</th>-->
          <th class="tableHeader">{{ $t("nftToken.holder") }}
            <el-button type="info" :plain="true" size="small" style="height: 21px;margin-left: 4px" @click="changeFormat(button)">
              {{this.button.buttonName}}</el-button>
          </th>
          <th class="tableHeader">{{ $t("nftInfo.description") }}</th>
        </template>

        <template v-slot:default="row">
          <td>
            <el-image
                style="width: 100px"
                :src="row.item.image"
                :preview-src-list="row.item.imageList"
                :hide-on-click-modal="true">
              <template #error>
                <div class="image-slot">
                  <i class="ni ni-image">
                  </i>
                </div>
              </template>
            </el-image>
          </td>
          <td>
            {{row.item.nftname}}
          </td>
<!--          <td class="table-list-item">-->
<!--            {{base64ToString(row.item.tokenid)}}-->
<!--          </td>-->
          <!--          <td class="firstused">-->
          <!--            {{ convertTime(row.item.lasttx.timestamp) }}-->
          <!--          </td>-->
          <td class="table-list-item">
            <div class="short">
              <router-link
                  class="  mb-0 table-list-item-blue"
                  style="cursor: pointer;"
                  :to="'/NFTinfo/'+row.item.asset+'/'+row.item.address+'/'+base64ToHash(row.item.tokenid)"
              >{{row.item.tokenid}}</router-link>
            </div>

          </td>
          <td class="Address">
            <div class="short">
              <router-link
                  v-if="button.state"
                  class="  mb-0 table-list-item-blue"
                  style="cursor: pointer; "
                  :to="'/accountprofile/'+row.item.address"
              >{{ scriptHashToAddress(row.item.address) }}</router-link>
              <router-link
                  v-else
                  class="  mb-0 table-list-item-blue"
                  style="cursor: pointer; "
                  :to="'/accountprofile/'+row.item.address"
              >{{ row.item.address }}
              </router-link>
            </div>


          </td>
          <td>
            {{row.item.description}}
          </td>
        </template>
      </base-table>
    </div>

    <div v-if="totalCount>=10"
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

</template>
<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { convertToken, scriptHashToAddress, changeFormat} from "../../store/util";
import Neon from "@cityofzion/neon-js";

export default {
  name: "nft-token",
  props: {
    type: {
      type: String,
    },
    contractHash: String,
    decimal: Number,
  },
  components: {
    Loading,
  },
  data() {
    return {
      tableData:[],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      isLoading: true,
      countPage: 0,
      button: { state: true, buttonName: "Hash" },
      windowWidth:window.innerWidth,
      properties:1,

    };
  },
  created() {
    this.GetAssetHoldersByContractHash(0);
  },
  watch: {
    contractHash: "watchcontract",
  },
  methods: {
    changeFormat,
    convertToken,
    scriptHashToAddress,
    watchcontract() {
      this.GetAssetHoldersByContractHash(0);
    },
    handleCurrentChange(val) {
      this.isLoading = true;
      this.pagination = val;
      const skip = (val - 1) * this.resultsPerPage;
      this.GetAssetHoldersByContractHash(skip);
    },
    toPercentage(num) {
      let s = Number(num * 100).toFixed(2);
      s += "%";
      return s;
    },
    getAddress(accountAddress) {
      this.$router.push({
        path: `/accountprofile/${accountAddress}`,
      });
    },
    base64ToString(base) {
      var tmp = Neon.u.base642hex(base);
      var res = Neon.u.hexstring2str(tmp);

      return res;
    },
    base64ToHash(base) {
      var res = Neon.u.base642hex(base);

      return res;
    },

    GetAssetHoldersByContractHash(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {
            ContractHash: this.contractHash,
            Limit: this.resultsPerPage,
            Skip: skip,
            balance:1,
          },
          method: "GetAssetHoldersListByContractHash",
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
        this.countPage = Math.ceil(this.totalCount / this.resultsPerPage);
        for (let k =0; k <this.tableData.length; k++){
          axios({
            method: "post",
            url: "/api",
            data: {
              jsonrpc: "2.0",
              id: 1,
              params: { ContractHash:this.tableData[k]["asset"],tokenIds:[this.tableData[k]["tokenid"]]},
              method: "GetNep11PropertiesByContractHashTokenId",
            },
            headers: {
              "Content-Type": "application/json",
              withCredentials: " true",
              crossDomain: "true",
            },
          }).then((res) => {
            // console.log(res)
            // console.log(this.tableData)
            var value = res["data"]["result"]["result"][0]
            // console.log(value["asset"])
            // console.log(value["properties"])
            this.tableData[k]["nftname"] = "——"

            this.tableData[k]["description"]="No description"
            if (value["properties"]===""){
              this.properties=null
            } else {
              try {
                this.properties = JSON.parse(value["properties"])
              } catch (e){
                this.isLoading = false;
                return
              }
              if("name" in this.properties) {
                this.tableData[k]["nftname"] = this.properties["name"]
                // console.log(this.tableData[k]["nftname"])
              }
              if ("image" in this.properties) {
                this.tableData[k]["image"] = this.properties["image"].startsWith('ipfs') ? this.properties['image'].replace(/^(ipfs:\/\/)|^(ipfs-video:\/\/)/, 'https://ipfs.infura.io/ipfs/'):this.properties["image"]
                this.tableData[k]["imageList"] = [this.tableData[k]["image"]]
                // console.log( this.tableData[k]["image"])
              }
              if ("description" in this.properties) {
                this.tableData[k]["description"] =this.properties["description"]

              }
            }
            this.isLoading = false;

          });
        }


      });
    },
  },
};
</script>
<style></style>
