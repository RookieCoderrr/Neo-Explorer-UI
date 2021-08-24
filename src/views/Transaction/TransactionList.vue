<template>
  <div style="padding-bottom: 10%!important; background: #F2F2F2">
    <div class="container-fluid mt--7 mb--7" style="background: #F2F2F2; width: 95%">
      <div class="row">
        <div class="col">
          <transactions-table title="Transaction List"></transactions-table>
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
