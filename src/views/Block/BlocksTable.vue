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
          <th scope="row">
            {{ row.item.index }}
          </th>
          <td style="padding-left: 100px">
            <div>
              <router-link
                class="name mb-0 text-sm"
                style="cursor: pointer"
                :to="'/blockinfo/'+row.item.hash"
                >{{ row.item.hash }}</router-link>
            </div>
          </td>
          <td>
<!--            {{ this.convertTime(row.item.timestamp, this.$i18n.locale) }}-->
            <div class="timeago" :datetime="(convertISOTime(row.item.timestamp))"> </div>
          </td>
          <td class="txnumber">
            {{ row.item.transactioncount }}
          </td>
          <td>{{ row.item.size }} {{ $t("bytes") }}</td>
        </template>
      </base-table>
    </div>

    <div
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
import {convertTime,convertISOTime} from "../../store/util";
import {render} from "timeago.js";

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
  updated() {
    const nodes = document.getElementsByClassName('timeago')
    if(nodes.length != 0){
      if(this.$i18n.locale === 'cn'){
        render(nodes, 'zh_CN');
      }else{
        render(nodes, this.$i18n.locale );
      }
    }
  },
  methods: {
    convertTime,
    convertISOTime,
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
