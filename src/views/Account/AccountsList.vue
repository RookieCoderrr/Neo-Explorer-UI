<template>
  <div style="padding-bottom: 10%!important; background: rgb(250,250,250)">
    <div class="container-fluid mt--7 mb--7" style="background: rgb(250,250,250); width: 95%">
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
