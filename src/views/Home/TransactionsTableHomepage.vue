<template>
  <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
  >
    <div class="row align-items-center">
      <div class="col">
        <h3 class="mb-0 hometxtitle" :class="type === 'dark' ? 'text-white' : ''">
          {{ title }}
        </h3>
      </div>
      <div class="col text-right">
        <span
            class="seeMoreButton"
            @click="toTransactionsTable()"
        >{{ $t("homePage.more") }}
        </span
        >
      </div>
    </div>
  </div>
  <div class="card border-0" :class="type === 'dark' ? 'bg-default' : ''">

    <div class="table-responsive">
      <base-table
        class="table align-items-center table-hover hometablelist"
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
        <template v-slot:columns>
          <th class="hometabletx">{{ $t("homePage.txTable.txID") }}</th>
          <th class="hometabletx">{{ $t("homePage.txTable.gas") }}</th>
          <th class="hometabletx hometableright">{{ $t("homePage.txTable.size") }}</th>
          <th class="hometabletx hometableright">{{ $t("homePage.txTable.time") }}</th>

        </template>
        <template v-slot:default="row">

          <td class="hometxcontent">
            <div class="txidhomepage">
              <router-link
                class="name mb-0 "
                style="cursor: pointer;"
                :to="'/transactionInfo/'+row.item.hash"
                >{{ row.item.hash }}</router-link
              >
            </div>

          </td>
          <td class="hometxcontent">
            <div class="">
              {{ this.convertGas(row.item.netfee + row.item.sysfee) }} gas
            </div>
          </td>
          <td class="hometxcontent hometxcontentright" >
            <div > {{ row.item.size }} {{ $t("bytes") }}</div>

          </td>
          <td class="hometxcontent hometxcontentright">
            <div  class="timeago"  :datetime="(convertISOTime(row.item.blocktime)).toString()"></div>
          </td>
        </template>
      </base-table>
    </div>
  </div>
</template>
<script>
import { convertGas, convertTime,convertISOTime } from "../../store/util";
import net from "../../store/store";


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
      network: net.url,
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
        path: `/Transactions/1`,
      });
    },
  },
};
</script>
<style>

.hometabletx{
  background-color: #FFFFFF!important;
  font-family: Inter!important;
  font-style: normal!important;
  font-weight: normal!important;
  font-size: 12px!important;
  line-height: 18px!important;
  text-transform:none!important;
  border-top:none!important;
  /* identical to box height, or 129% */


  /* grey500 */

  color: #86909C;
}
.hometabletxright{
  text-align: right;
}
.hometxtitle{
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  margin-right: 1%;
  margin-left: 1%;
  /* identical to box height, or 133% */

  /* grey900 */

  color: #1D2129;
}
.hometxcontent {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 30px;
  /* identical to box height, or 129% */


  /* grey900 */

  color: #1D2129;
}
.hometxcontentright{
  text-align: right;
}

@media screen and (max-width: 2000px ){
  .txidhomepage {
    width: 160px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px !important;
  }

}

</style>
