<template>
  <div class="col list-title">
    <h1 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
      {{ title }}
    </h1>
  </div>
  <div class="card shadow list-card" :class="type === 'dark' ? 'bg-default' : ''" >
    <!--div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row align-items-center" >
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
            {{ title }}
          </h3>
        </div>
      </div>
    </div-->
    <div class="table-responsive">
      <loading
        :is-full-page="false"
        :opacity="0.9"
        :active="isLoading"
      ></loading>
      <base-table
        class="table align-items-center table-flush list-table"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="blockList"
      >
        <template v-slot:columns>
          <th class="tableHeader">{{ $t("blockinfo.height") }}</th>
          <th class="tableHeader">{{ $t("blockinfo.hash") }}</th>
          <th class="tableHeader">{{ $t("blockinfo.time") }}</th>
          <th class="tableHeader">{{ $t("blockinfo.txns") }}</th>
          <th class="tableHeader">{{ $t("blockinfo.size") }}</th>
          <th class="tableHeader"></th>
        </template>

        <template v-slot:default="row">

          <td >
            <div  class="table-list-item" >{{ row.item.index }}</div>
          </td>
          <td style="text-align: left;margin-left: 2%">
            <div>
              <router-link
                class="table-list-item-blue name mb-0"
                style="cursor: pointer"
                :to="'/blockinfo/'+row.item.hash"
                >{{ row.item.hash }}</router-link>
            </div>
          </td>
          <td class="table-list-item">
            {{ this.convertTime(row.item.timestamp, this.$i18n.locale) }}
          </td>
          <td class="table-list-item">
            {{ row.item.transactioncount }}
          </td>
          <td class="table-list-item">{{ row.item.size }} {{ $t("bytes") }}</td>
        </template>
      </base-table>
    </div>

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
</template>
<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import {convertTime,} from "../../store/util";
export default {
  name: "blocks-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  components: {
    Loading,
  },
  data() {
    return {
      blockList: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      isLoading: true,
      placeHolder: 0,
      countPage: 0,
    };
  },
  created() {
    this.getBlockList(0);
  },

  methods: {
    convertTime,

    getBlock(hash) {
      this.$router.push(`/blockinfo/${hash}`);
    },
    handleCurrentChange(val) {
          this.isLoading = true;
          this.pagination = val;
          const skip = (val - 1) * this.resultsPerPage;
          this.getBlockList(skip);
      },
    getBlockList(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { Limit: this.resultsPerPage, Skip: skip },
          method: "GetBlockInfoList",
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        this.blockList = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.countPage =
          this.totalCount === 0
            ? 1
            : Math.ceil(this.totalCount / this.resultsPerPage);
        this.isLoading = false;
      });
    },
  },
};
</script>
<style>

input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
  -moz-appearance: textfield;
}

.text {
  display: inline-block;
  height: 100%;
  line-height: 2.5;
  vertical-align: middle;
  font-size: 5px;
}
</style>
