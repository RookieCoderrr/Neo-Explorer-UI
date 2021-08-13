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
        id="myTable"
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"
      >
        <template v-slot:columns>
          <th>{{ $t("candidate.address") }}</th>
          <th>{{ $t("candidate.rank") }}</th>
          <th>{{ $t("candidate.votes") }}</th>
          <th>{{ $t("candidate.percentage") }}</th>
        </template>

        <template v-slot:default="row">
          <td class="budget">
            <div class="address">
              <router-link
                class="name mb-0 text-sm"
                style="cursor: pointer"
                :to="'/accountprofile/'+row.item.candidate"
                >{{ row.item.candidate }}
                <i v-if="row.item.isCommittee" class="ni ni-badge"></i></router-link
              >
            </div>
          </td>

          <td class="budget">
            {{ row.index + 1 + this.count }}
          </td>
          <td class="budget">
            {{ row.item.votesOfCandidate }}
          </td>
          <td class="budget">
            {{ getVotePercentage(row.item.votesOfCandidate) }}
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
          @changeinput="pageChangeByInput($event)"
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
    multiple() {
      return this.resultsPerPage * (this.pagination - 1);
    },
  },

  created() {
    this.getCandidateList(0);
    this.getTotalVotes();
  },

  methods: {
    getVotePercentage(votes) {
      var per = votes / this.votesCount;
      console.log(per);
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
    pageChangeByInput(pageNumber) {
      if (pageNumber >= this.countPage) {
        this.isLoading = true;
        this.pagination = this.countPage;
        const skip = (this.countPage - 1) * this.resultsPerPage;
        this.getCandidateList(skip);
      } else if (pageNumber <= 0) {
        this.isLoading = true;
        this.pagination = 1;
        const skip = this.resultsPerPage;
        this.getCandidateList(skip);
      } else {
        this.isLoading = true;
        this.pagination = pageNumber;
        const skip = (pageNumber - 1) * this.resultsPerPage;
        this.getCandidateList(skip);
      }
    },
    pageChange(pageNumber) {
      this.isLoading = true;
      this.pagination = pageNumber;
      this.skip = (pageNumber - 1) * this.resultsPerPage;
      this.getCandidateList(this.skip);
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
        console.log(this.votesCount);
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
