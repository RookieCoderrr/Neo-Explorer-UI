<template>
  <div style="padding-bottom: 10%!important; background: #F2F2F2">
    <div class="container-fluid mt--7 mb--7" style="background: #F2F2F2; width: 95%">
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
<style></style>
