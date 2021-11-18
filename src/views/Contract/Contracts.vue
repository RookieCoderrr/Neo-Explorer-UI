<template>
  <div style="padding-bottom: 10%!important; background: #f7f8fa">
    <div class="container-fluid mt--8" style="background: #f7f8fa; width: 85%">
      <div class="row">
        <div class="col">
          <contracts-table :title="$t('contract.title')"></contracts-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ContractsTable from "./ContractsTable";
export default {
  name: "contracts",
  components: {
    ContractsTable,
  },
};
</script>
<style></style>
