<template>
  <div style="padding-bottom: 10%!important; background: #f7f8fa">
    <div class="container-fluid mt--8" style="background: #f7f8fa; width: 85%">
      <div class="row">
        <div class="col">
          <blocks-table :title="$t('blockinfo.title')"></blocks-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BlocksTable from "./BlocksTable";
export default {
  name: "Blocks",
  components: {
    BlocksTable,
  },
};
</script>
<style></style>
