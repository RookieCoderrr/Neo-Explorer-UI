<template>
  <div style="padding-bottom: 10%!important; background: #f7f8fa">
    <div class="container-fluid mt--8 list" style="background: #f7f8fa; width: 85%">
    <div class="row">
      <div class="col">
        <accounts-table
          :title="$t('addressPage.accountsTable')"
        ></accounts-table>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import AccountsTable from "./AccountsTable";
export default {
  name: "accounts-list",
  components: {
    AccountsTable,
  },
};
</script>
<style>
</style>
