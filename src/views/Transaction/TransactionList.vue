<template>
  <div style="padding-bottom: 10%!important; background: #f7f8fa">
    <div class="container-fluid mt--8" style="background: #f7f8fa; width: 85%">
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
