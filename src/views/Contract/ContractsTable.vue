<template>
  <div class="col list-title">
    <h1 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
      {{ title }}
    </h1>
  </div>
  <div class="card shadow list-card" :class="type === 'dark' ? 'bg-default' : ''">
      <div class="" style="margin-top: 10px;margin-bottom: 1px;height: 45px">
        <div class="col-9"></div>
        <div class="col-3">
          <div class="searchName" style="height: 45px">
            <input
              type="text"
              class="over-ellipsis-Name"
              :placeholder="$t('contract.search')"
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
                  fill="#1e90ff"
              />
            </svg>
            </button>
          </div>
        </div>
    </div>
    <div class="table-responsive" >
      <loading
        :is-full-page="false"
        :opacity="0.9"
        :active="isLoading"
      ></loading>
      <base-table
        class="table align-items-center table-flush list-table InfoTable"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="contractList"
      >
        <template v-slot:columns>
          <th class="tableHeader">{{ $t("contract.hash") }}</th>
          <th class="tableHeader">{{ $t("contract.name") }}</th>
          <th class="tableHeader">
            {{ $t("contract.creator") }}
            <el-button type="info" :plain="true" size="small" style="height: 19px;margin-left: 4px" @click="changeFormat(button)">
              {{this.button.buttonName}}</el-button>

          </th>
          <th class="tableHeader">{{ $t("contract.index") }}</th>
          <th class="tableHeader">{{ $t("contract.updates") }}</th>
          <th class="tableHeader">{{ $t("contract.time") }}</th>
        </template>

        <template v-slot:default="row">
          <td scope="row" v-if="row.item">
            <div style="text-align: left">
              <div class="media-body">
                <router-link
                  class=" table-list-item-blue mb-0 "
                  style="cursor: pointer"
                  :to="'/contractinfo/' + row.item.hash"
                  >{{ row.item.hash }}</router-link
                >
              </div>
            </div>

          </td>
          <td  class="table-list-item">
            {{ row.item.name }}
          </td>
          <td  class="table-list-item-blue">
            <span class="text-muted" v-if="row.item.Transaction.length === 0">{{
              $t("contract.available")
            }}</span>
            <router-link
              class="table-list-item-blue mb-0"
              v-else-if="button.state"
              style="cursor: pointer"
              :to="
                '/accountprofile/' +
                addressToScriptHash(row.item.Transaction[0]['sender'])
              "
            >
              {{ row.item.Transaction[0]["sender"] }}
            </router-link>
            <router-link
              class="table-list-item-blue mb-0 "
              v-else
              style="cursor: pointer"
              :to="
                '/accountprofile/' +
                addressToScriptHash(row.item.Transaction[0]['sender'])
              "
            >
              {{ addressToScriptHash(row.item.Transaction[0]["sender"]) }}
            </router-link>
          </td>
          <td  class="table-list-item">
            {{ row.item.id }}
          </td>
          <td  class="table-list-item">
            {{ row.item.updatecounter }}
          </td>
          <td  class="table-list-item">
            {{ convertTime(row.item.createtime, this.$i18n.locale) }}
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
import {
  convertTime,
  addressToScriptHash,
  changeFormat,
} from "../../store/util";

export default {
  name: "contracts-table",
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
      contractList: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      isLoading: true,
      searchVal: "",
      name: "",
      countPage: 0,
      button: { state: true, buttonName: "Hash" },
    };
  },
  created() {
    this.getContractList(0);
  },
  methods: {
    convertTime,
    addressToScriptHash,
    changeFormat,
    handleCurrentChange(val) {
      this.isLoading = true;
      this.pagination = val;
      const skip = (val - 1) * this.resultsPerPage;
      if (this.name !== "") {
        this.getContractListByName(name, skip);
      } else {
        this.getContractList(skip);
      }
    },
      getContract(hash) {
      this.$router.push({
        path: `/contractinfo/${hash}`,
      });
    },
    getContractList(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { Limit: this.resultsPerPage, Skip: skip },
          method: "GetContractList",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.contractList = res["data"]["result"]["result"];
        console.log(this.contractList)
        this.totalCount = res["data"]["result"]["totalCount"];
        this.countPage =
          this.totalCount === 0
            ? 1
            : Math.ceil(this.totalCount / this.resultsPerPage);
        this.isLoading = false;
      });
    },
    getContractListByName(name, skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { Name: this.name, Limit: this.resultsPerPage, Skip: skip },
          method: "GetContractListByName",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.contractList = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.countPage =
          this.totalCount === 0
            ? 1
            : Math.ceil(this.totalCount / this.resultsPerPage);
        this.isLoading = false;
      });
    },
    getSender(addr) {
      this.$router.push({
        path: `/accountprofile/${this.addressToScriptHash(addr)}`,
      });
    },
    search() {
      this.isLoading = true;
      let value = this.searchVal;
      // const inputValue = this.searchVal;
      value = value.trim();
      if (value === "") {
        this.isLoading = false;
        return;
      }
      this.name = value;
      this.searchVal = "";
      this.pagination = 1;
      this.getContractListByName(value, 0);
    },
  },
};
</script>
<style>
.searchName {
  width: 100%;
  max-width: 300px;
  position: relative;
}
.buttonName {
  cursor: pointer;
  position: absolute;
  right: 1px;
  bottom: 1px;
  top: 1px;
  width: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #ffffff !important;
  mix-blend-mode: normal;
  border-radius: 4px;
}

.img {
  width: 26px;
}

.over-ellipsis-Name {
  width: 100%;
  height: 100%;
  padding-right: 61px;
  padding-left: 11px;
  font-size: 16px;
  background: rgba(255, 255, 255, 1);
  border: 0 !important;

  border-radius: 4px;
  color: black;
}


</style>
