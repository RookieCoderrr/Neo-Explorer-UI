<template>
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
            class="seeMoreButton"
            type="primary"
            size="sm"
            @click="toTransactionsTable()"
        >{{ $t("homePage.more") }}
          <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="10.8333" height="10" fill="url(#pattern0)"/>
            <defs>
              <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0" transform="scale(0.0227273 0.025)"/>
              </pattern>
              <image id="image0" width="44" height="40" xlink:href="data:image/png;base64,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"/>
            </defs>
          </svg>
        </base-button
        >
      </div>
    </div>
  </div>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">

    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"
      >
        <!--template v-slot:columns>
          <th>{{ $t("homePage.txTable.txID") }}</th>
          <th>{{ $t("homePage.txTable.size") }}</th>
          <th>{{ $t("homePage.txTable.time") }}</th>
          <th>{{ $t("homePage.txTable.gas") }}</th>
        </template-->

        <template v-slot:default="row">
          <td style="text-align: right">
            <div class="item-name">{{ $t("transactionId") }}</div>
            <div class="item-name">{{ $t("gas") }}</div>
          </td>
          <td>
            <div class="txid">
              <router-link
                class="name mb-0 text-sm"
                style="cursor: pointer"
                :to="'/transactionInfo/'+row.item.hash"
                >{{ row.item.hash }}</router-link
              >
            </div>
            <div>
              {{ this.convertGas(row.item.netfee + row.item.sysfee) }}
            </div>
          </td>
          <td style="text-align: right">
            <div>{{ $t("size") }} {{ row.item.size }} {{ $t("bytes") }}</div>
            <div  class="timeago"  :datetime="(convertISOTime(row.item.blocktime)).toString()"></div>
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
