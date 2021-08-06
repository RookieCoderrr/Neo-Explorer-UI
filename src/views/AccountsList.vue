<template>
  <div class="container-fluid mt--7">
    <div class="row">
      <div class="col">
        <accounts-table :title="$t('addressPage.accountsTable')"></accounts-table>
      </div>
    </div>
  </div>
</template>
<script>
import AccountsTable from "./Tables/AccountsTable";
export default {
  name: "accounts-list",
  components: {
    AccountsTable,
  },
};
</script>
<style></style>
