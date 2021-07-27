<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>

    <div class="container-fluid mt--7">
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
