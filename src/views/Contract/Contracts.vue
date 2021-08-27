<template>
  <div style="padding-bottom: 10%!important; background: rgb(250,250,250)">
    <div class="container-fluid mt--7 mb--7" style="background: rgb(250,250,250); width: 95%">
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
