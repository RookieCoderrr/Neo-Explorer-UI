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
          <th>Account</th>

          <th>Ranking</th>
          <th>Votes</th>
          <th>Percentage</th>
          <th></th>
        </template>

        <template v-slot:default="row">
          <td class="budget">
            <div class="address">
              <a
                class="name mb-0 text-sm"
                style="cursor: pointer"
                @click="getAddress(row.item.candidate)"
                >{{ row.item.candidate }}
                {{ row.item.isCommittee ? "✅" : "" }}</a
              >
            </div>
          </td>

          <td class="budget">
            {{ row.index + 1 + this.count }}
          </td>
          <td class="budget">
            {{ row.item.votesOfCandidate }}
          </td>
          <td class="budget">20%</td>
        </template>
      </base-table>
    </div>

    <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
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
      resultsPerPage: 10,
      pagination: 1,
      skip: 0,
      count: 0,
      isLoading: true,
    };
  },
  // computed:{
  //   multiple(){
  //     return  this.resultsPerPage*(this.pagination-1) ;
  //   }
  // },

  created() {
    this.getCandidateList(0);
  },

  methods: {
    getAddress(accountAddress) {
      this.$router.push({
        path: `/accountprofile/${accountAddress}`,
      });
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
        this.count = this.skip;
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
