<template>
  <div class="col list-title">
    <h1 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
      {{ title }}
    </h1>
  </div>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <!--div
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
    </div-->
    <div class="table-responsive list-card">
      <loading
        :is-full-page="false"
        :opacity="0.9"
        :active="isLoading"
      ></loading>
      <base-table
        id="myTable"
        class="table align-items-center table-flush list-table"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"
      >
        <template v-slot:columns>
          <th class="tableHeader">{{ $t("candidate.address") }}</th>
          <th class="tableHeader">{{ $t("candidate.committee") }}</th>
          <th class="tableHeader">{{ $t("candidate.rank") }}</th>
          <th class="tableHeader">{{ $t("candidate.votes") }}</th>
          <th class="tableHeader">{{ $t("candidate.percentage") }}</th>
        </template>

        <template v-slot:default="row">
          <td class="budget">
            <div class="address">
              <router-link
                class=" table-list-item-blue mb-0 "
                style="cursor: pointer"
                :to="'/accountprofile/' + row.item.candidate"
              >
                {{ row.item.candidate }}
              </router-link>
            </div>
          </td>
          <td><i v-if="row.item.isCommittee" class="ni ni-badge"></i></td>
          <td  class="table-list-item">
            {{ row.index + 1 + this.count }}
          </td >
          <td  class="table-list-item">
            {{ row.item.votesOfCandidate }}
          </td>
          <td  class="table-list-item">
            {{ getVotePercentage(row.item.votesOfCandidate) }}
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

export default {
  name: "candidates-table",
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
      tableData: [],
      totalCount: 0,
      votesCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      skip: 0,
      count: 0,
      isLoading: true,
      countPage: 0,
    };
  },

  created() {
    this.getCandidateList(0);
    this.getTotalVotes();
  },

  methods: {
    getVotePercentage(votes) {
      var per = votes / this.votesCount;
      if (per == 0) {
        return 0;
      }
      var str = Number(per * 100).toFixed(2);
      str += "%";
      return str;
    },
    getAddress(accountAddress) {
      this.$router.push({
        path: `/accountprofile/${accountAddress}`,
      });
    },
    handleCurrentChange(val) {
      this.isLoading = true;
      this.pagination = val;
      const skip = (val - 1) * this.resultsPerPage;
      this.getCandidateList(skip);
    },
    getCandidateList(skip) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {
            Limit: this.resultsPerPage,
            Skip: skip,
            Sort: "votesOfCandidate = -1",
          },
          method: "GetCandidate",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.isLoading = false;
        this.tableData = res["data"]["result"]["result"];
        this.totalCount = res["data"]["result"]["totalCount"];
        this.countPage =
          this.totalCount === 0
            ? 1
            : Math.ceil(this.totalCount / this.resultsPerPage);
        this.count = this.skip;
      });
    },
    getTotalVotes() {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {},
          method: "GetTotalVotes",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.votesCount = res["data"]["result"]["totalvotes"];
      });
    },
  },
};
</script>
<style>
.address {
  width: 200px !important;
  white-space: nowrap;
  /*overflow: hidden;*/
  text-overflow: ellipsis;
}
</style>
