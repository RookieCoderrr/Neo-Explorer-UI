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
        <base-button type="primary" size="sm" @click="toBlocksTable()">{{
            $t("homePage.seeAll")
          }}</base-button>
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
          <th>{{ $t("blockinfo.hash") }}</th>
          <th>{{ $t("blockinfo.height") }}</th>
          <th>{{ $t("blockinfo.time") }}</th>
          <th>{{ $t("blockinfo.txns") }}</th>
          <th>{{ $t("blockinfo.size") }}</th>
        </template-->
        <template v-slot:default="row">
          <td style="width: 5px;">
            <div class="item-name">Blocks: </div>
            <div class="item-name"> Hash:</div>
          </td>
          <td style="text-align: left">
              <tr>
                {{ row.item.index }}
              </tr>
              <div class="blockid">
                <router-link
                    class="name mb-0 text-sm"
                    style="cursor: pointer"
                    :to="'/blockinfo/'+row.item.hash"
                >{{ row.item.hash }}</router-link>
              </div>
          </td>
          <td>
            <tr>
              Size: {{ row.item.size }} Bytes
            </tr>
              <div  class="timeago"  :datetime="(convertISOTime(row.item.timestamp)).toString()"></div>
          </td>
            <!--td>
              {{ row.item.transactioncount }}
            </td-->
        </template>
      </base-table>
    </div>
  </div>
</template>
<script>
import {convertTime,convertISOTime} from "../../store/util";


export default {
  name: "blocks-table-homepage",
  props: {
    type: {
      type: String,
    },
    title: String,
    tableData:Object,
  },
  data() {
    return {
      blockList: [],
      totalCount: 0,
      resultsPerPage: 10,
      pagination: 1,
      isLoading: true,
      placeHolder: 0,
    };
  },
  created() {

  },

  mounted() {

  },

  methods: {

    convertTime,
    convertISOTime,
    toBlocksTable() {
      this.$router.push({
        path: `/blocks`,
      });
    },


  },
};
</script>
<style>
.blockid {
  width: 150px !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-name {
  width: 5px;
}
</style>
