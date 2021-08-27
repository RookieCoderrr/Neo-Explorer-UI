<template>
  <div style="padding-bottom: 10%!important; background: rgb(250,250,250)">
    <div class="container-fluid mt--7 mb--7" style="background: rgb(250,250,250); width: 95%">
      <div class="row">
        <div class="col">
          <transactions-table :title="$t('blockinfo.txnsList')"></transactions-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TransactionsTable from "./TransactionsTable";
export default {
  name: "tables",
  components: {
    TransactionsTable,
  },

};
</script>
<style></style>
