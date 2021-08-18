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
          <base-button
            type="primary"
            size="sm"
            @click="toTransactionsTable()"
            >{{ $t("homePage.seeAll") }}</base-button
          >
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
          <th>{{ $t("homePage.txTable.txID") }}</th>
          <th>{{ $t("homePage.txTable.size") }}</th>
          <th>{{ $t("homePage.txTable.time") }}</th>
          <th>{{ $t("homePage.txTable.gas") }}</th>
        </template>

        <template v-slot:default="row">
          <td>
            <div class="txid">
              <router-link
                class="name mb-0 text-sm"
                style="cursor: pointer"
                :to="'/transactionInfo/'+row.item.hash"
                >{{ row.item.hash }}</router-link
              >
            </div>
          </td>
          <td>{{ row.item.size }} {{ $t("bytes") }}</td>
          <td>
            <div  class="timeago"  :datetime="(convertISOTime(row.item.blocktime)).toString()"></div>
          </td>

          <td>
            {{ this.convertGas(row.item.netfee + row.item.sysfee) }}
          </td>
        </template>
      </base-table>
    </div>
  </div>
</template>
<script>
import { convertGas, convertTime,convertISOTime } from "../../store/util";


export default {
  name: "transactions-table-homepage",
  props: {
    type: {
      type: String,
    },
    title: String,
    tableData: Object,
  },
  data() {
    return {

      totalCount: 0,
      resultsPerPage: 10,
      placeHolder: 0,
      isLoading: true,
    };
  },


  methods: {
    convertGas,
    convertTime,
    convertISOTime,
    toTransactionsTable() {
      this.$router.push({
        path: `/Transactions`,
      });
    },
  },
};
</script>
<style>
.txid {
  width: 200px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
