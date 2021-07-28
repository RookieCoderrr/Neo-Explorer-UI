<template>
  <div>
    <div class="container-fluid mt--9">
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
