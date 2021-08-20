<template>
  <div style="padding-bottom: 10%!important; background: #F2F2F2">
    <div class="container-fluid mt--7 mb--7" style="background: #F2F2F2; width: 95%">
      <div class="row">
        <div class="col">
          <contracts-table title="Contract List"></contracts-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ContractsTable from "./Tables/ContractsTable";
export default {
  name: "contracts",
  components: {
    ContractsTable,
  },
};
</script>
<style></style>
