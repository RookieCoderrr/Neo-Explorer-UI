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
        <div class="col text-right">
          <base-button type="primary" size="sm">See all</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"

      >
        <template v-slot:columns>
          <th>Account</th>
          <th>Committee</th>
          <th>Ranking</th>
          <th>Votes</th>
          <th>Percentage</th>
          <th></th>
        </template>

        <template v-slot:default="row">
          <td class="budget">
            {{ row.item.candidate }}
          </td>
          <td class="budget">
            {{ row.item.state }}
          </td>
          <td class="budget">
            1
          </td>
          <td class="budget">
            {{ row.item.votesOfCandidate }}
          </td>

          <td class="budget">
            20%
          </td>

          <td class="text-right">
            <base-dropdown class="dropdown" position="right">
              <template v-slot:title>
                <a
                    class="btn btn-sm btn-icon-only text-light"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                  <i class="fas fa-ellipsis-v"></i>
                </a>
              </template>

              <template>
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </template>
            </base-dropdown>
          </td>
        </template>
      </base-table>
    </div>

    <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <base-pagination  :total="this.totalCount" :value="pagination" v-on:input="pageChange($event)"></base-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  name: "candidates-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  data() {
    return {
      tableData: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination : 1,
    };
  },

  created() {
    this.getTransactionList(0)

  },
  methods:{
    pageChange(pageNumber) {
      this.pagination = pageNumber;
      const skip = (pageNumber - 1) * this.resultsPerPage;
      this.getTransactionList(skip);
    },

    getTransactionList(skip){

      axios({
        method:'post',
        url:'/api',
        data:{
          "jsonrpc": "2.0",
          "id": 1,
          "params": {"Limit":this.resultsPerPage,"Skip":skip},
          "method": "GetCandidate"
        },
        headers:{'Content-Type': 'application/json','withCredentials':' true',
          'crossDomain':'true',},
      }).then((res)=>{
        // console.log(res.data)
        this.tableData = res["data"]["result"]["result"];
        console.log(this.tableData)
        this.totalCount = res["data"]["result"]["totalCount"];
        // console.log("成功")
      });
    }
  }
};
</script>
<style></style>
