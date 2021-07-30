<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
            {{ title }}
          </h3>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <loading
        :is-full-page="false"
        :opacity="0.9"
        :active="isLoading"
      ></loading>
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="blockList"
        style="text-align: center"
      >
        <template v-slot:columns>
          <th>index</th>
          <th>Hash</th>
          <th>TimeStamp</th>
          <th>TxNumber</th>
          <th>Size</th>
          <th></th>
        </template>

        <template v-slot:default="row">
          <th scope="row">
            <div class="media align-items-center" style="text-align: center">
              <div class="media-body">
                <a class="name mb-0 text-sm" style="cursor: pointer">{{ row.item.index }}</a>
              </div>
            </div>
          </th>
          <td style="padding-left: 100px">
            <div >
              <a
                      class="name mb-0 text-sm"
                      style="cursor: pointer"
                      @click="getBlock(row.item.hash)"
              >{{ row.item.hash }}</a
              >
            </div>
          </td>
          <td>
            {{ row.item.timestamp }}
          </td>
          <td class="txnumber">
            {{ row.item.transactionNumber }}
          </td>
          <td>
            {{ row.item.size }}
          </td>
        </template>
      </base-table>
    </div>

    <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div style="margin-right: 10px; width: 250px" class="row">
        <div class="text">Page &nbsp;</div>
        <base-input
          type="number"
          :style="text(pagination)"
          :placeholder="pagination"
          v-on:changeinput="pageChangeByInput($event)"
        ></base-input>
        <div class="text">
          &nbsp; of &nbsp;{{countPage}}
        </div>
      </div>

      <base-pagination
        :total="totalCount"
        :value="pagination"
        v-on:input="pageChange($event)"
      ></base-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

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
      countPage:0,
    };
  },
  created() {
    this.getBlockList(0);
  },
  computed: {
    text() {
      return function (value) {
        let inputLength = value.toString().length * 10 + 30;
        return (
          "width: " +
          inputLength +
          "px!important;text-align: center;height:80%;margin-top:5%;"
        );
      };
    },
  },
  methods: {
    getBlock(hash) {
      this.$router.push(`/blockinfo/${hash}`);
    },
    pageChangeByInput(pageNumber) {
      if (pageNumber >= this.countPage) {
        this.isLoading = true;
        this.pagination =this.countPage;
        const skip =
                ( this.countPage - 1 ) * this.resultsPerPage;
        this.getBlockList(skip);
      } else if (pageNumber <= 0) {
        this.isLoading = true;
        this.pagination = 1;
        const skip = this.resultsPerPage;
        this.getBlockList(skip);
      } else {
        this.isLoading = true;
        this.pagination = pageNumber;
        const skip = (pageNumber - 1) * this.resultsPerPage;
        this.getBlockList(skip);
      }
    },
    pageChange(pageNumber) {
      this.isLoading = true;
      this.pagination = pageNumber;
      const skip = (pageNumber - 1) * this.resultsPerPage;
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
        this.countPage = Math.ceil(this.totalCount / this.resultsPerPage)
        this.isLoading = false;
      });
    },
  },
};
</script>
<style>
/*.blockid {*/
/*  width: 150px !important;*/
/*  white-space: nowrap;*/
/*  overflow: hidden;*/
/*  text-overflow: ellipsis;*/
/*}*/
.class123 /deep/ .a input::-webkit-outer-spin-button,
.class123 /deep/ .a input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.class123 /deep/ .a input[type="number"] {
  -moz-appearance: textfield;
}
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
  font-size: 5;
}
</style>
