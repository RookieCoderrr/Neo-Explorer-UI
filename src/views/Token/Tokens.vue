<template>
  <div style="padding-bottom: 10%!important; background: rgb(250,250,250)">
    <div class="container-fluid mt--7 mb--7" style="background: rgb(250,250,250); width: 95%">
      <div class="row">
        <div class="col">
          <tokens-table :title="$t('tokensTable.title')"></tokens-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TokensTable from "./TokensTable";

export default {
  name: "tokens",
  components: {
    TokensTable,
  },
};
</script>
<style></style>
