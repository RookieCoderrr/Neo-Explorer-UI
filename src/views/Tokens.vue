<template>
  <div style="padding-bottom: 10%!important; background: #F2F2F2">
    <div class="container-fluid mt--7 mb--7" style="background: #F2F2F2; width: 95%">
      <div class="row">
        <div class="col">
          <tokens-table :title="$t('tokensTable.title')"></tokens-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TokensTable from "./Tables/TokensTable";

export default {
  name: "tokens",
  components: {
    TokensTable,
  },
};
</script>
<style></style>
