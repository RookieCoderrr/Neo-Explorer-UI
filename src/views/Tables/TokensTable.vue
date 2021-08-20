<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row align-items-center">
        <div class="col-9">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
            {{ title }}
          </h3>
        </div>
        <div class="col-3">
          <div class="searchName" style="height: 45px">
            <input
              type="text"
              class="over-ellipsis-Name"
              :placeholder="$t('tokensTable.prompt')"
              v-model="searchVal"
              autocomplete="off"
              @keyup.enter="search()"
            /><button class="buttonName" @click="search()" style="border: white">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.2141 2.31429C3.61587 0.771429 5.65481 0 7.56631 0C9.47782 0 11.5168 0.771429 13.1734 2.31429C15.8495 5.01429 16.1044 9.25714 13.938 12.2143L17.761 16.0714C18.0159 16.3286 18.0159 16.7143 17.761 16.9714L16.869 17.8714C16.7415 18 16.6141 18 16.3592 18C16.1044 18 15.9769 18 15.8495 17.8714L12.0265 14.0143C10.6247 14.9143 9.09552 15.4286 7.56631 15.4286C5.65481 15.4286 3.61587 14.6571 2.2141 13.2429C-0.716874 10.1571 -0.716874 5.27143 2.2141 2.31429ZM3.99817 11.3143C4.89021 12.3429 6.16454 12.8571 7.56631 12.8571C8.96808 12.8571 10.2424 12.3429 11.1345 11.3143C12.1539 10.4143 12.6637 9.12857 12.6637 7.71429C12.6637 6.3 12.1539 5.01429 11.1345 4.11429C10.2424 3.08571 8.96808 2.57143 7.56631 2.57143C6.16454 2.57143 4.89021 3.08571 3.99817 4.11429C2.9787 5.01429 2.46897 6.3 2.46897 7.71429C2.46897 9.12857 2.9787 10.4143 3.99817 11.3143Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
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
        :data="tokenList"
      >
        <template v-slot:columns>
          <th style="background:#5576EC; color:#ffffff">{{ $t("tokensTable.hash") }}</th>
          <th style="background:#5576EC; color:#ffffff">{{ $t("tokensTable.name") }}</th>
          <th style="background:#5576EC; color:#ffffff">{{ $t("tokensTable.symbol") }}</th>
          <th style="background:#5576EC; color:#ffffff">{{ $t("tokensTable.standard") }}</th>
          <th style="background:#5576EC; color:#ffffff">{{ $t("tokensTable.holders") }}</th>
        </template>

        <template v-slot:default="row">
          <th scope="row">
            <div class="media align-items-center">
              <div class="media-body">
                <router-link
                  class="name mb-0 text-sm"
                  style="cursor: pointer"
                  :to="'/tokeninfo/'+row.item.hash"
                  >{{ row.item.hash }}</router-link>
              </div>
            </div>
          </th>
          <td class="name">
            <span v-if="row.item.ispopular"
              >{{ row.item.tokenname }} &#x1F525;
            </span>
            <span v-else>{{ row.item.tokenname }}</span>
          </td>
          <td class="symbol">
            {{ row.item.symbol }}
          </td>
          <td>
            <badge
              v-if="row.item.type === 'NEP17'"

              type="primary"
            >
              <span class="">{{ row.item.type }}</span>
            </badge>
            <badge v-else-if="row.item.type === 'NEP11'"  type="success">
              <span class="">{{ row.item.type }}</span>
            </badge>
            <badge v-else type="danger">
              <span class="">{{ row.item.type==="UNKNOW"? "Unknown":"Unknown" }}</span>
            </badge>
          </td>
          <td class="holders">
            {{ row.item.holders }}
          </td>
        </template>
      </base-table>
    </div>

    <div
      v-if="this.totalCount > 10"
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
        <div class="text">&nbsp; of &nbsp;{{ countPage }}</div>
      </div>
      <base-pagination
        :total="this.totalCount"
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
  name: "tokens-table",
  props: {
    type: { type: String },
    title: String,
  },
  components: {
    Loading,
  },
  data() {
    return {
      tokenList: [],
      tokenListName: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      isLoading: true,
      name: "",
      searchVal: "",
      countPage: 0,
    };
  },
  created() {
    this.getTokenList(0);
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
    pageChangeByInput(pageNumber) {
      if (pageNumber >= this.countPage) {
        this.isLoading = true;
        this.pagination = this.countPage;
        const skip = (this.countPage - 1) * this.resultsPerPage;
        if (this.name !== "") {
          this.getTokenListByName(name, skip);
        }else{
        this.getTokenList(skip);}
      } else if (pageNumber <= 0) {
        this.isLoading = true;
        this.pagination = 1;
        const skip = this.resultsPerPage;
        if (this.name !== "") {
          this.getTokenListByName(name, skip);
        }else{
          this.getTokenList(skip);}
      } else {
        this.isLoading = true;
        this.pagination = pageNumber;
        const skip = (pageNumber - 1) * this.resultsPerPage;
        if (this.name !== "") {
          this.getTokenListByName(name, skip);
        }else{
          this.getTokenList(skip);}
      }
    },
    pageChange(pageNumber) {
      this.isLoading = true;
      this.pagination = pageNumber;
      const skip = (pageNumber - 1) * this.resultsPerPage;
      if (this.name !== "") {
        this.getTokenListByName(name, skip);
      }else{
        this.getTokenList(skip);}
    },
    getTokenList(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { Limit: this.resultsPerPage, Skip: skip },
          method: "GetAssetInfos",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.tokenList = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.countPage = Math.ceil(this.totalCount / this.resultsPerPage);
        this.isLoading = false;
      });
    },
    getTokenListByName(name, skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { Name: this.name, Limit: this.resultsPerPage, Skip: skip },
          method: "GetAssetInfosByName",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.tokenList = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.countPage = Math.ceil(this.totalCount / this.resultsPerPage);
        this.isLoading = false;
      });
    },
    search() {
      this.isLoading = true;
      let value = this.searchVal;
      value = value.trim();
      if (value === "") {
        this.isLoading = false;
        return;
      }
      this.name = value;
      this.searchVal = "";
      this.getTokenListByName(value, 0);
    },
  },
};
</script>
<style></style>
