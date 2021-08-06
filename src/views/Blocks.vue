<template>
  <div>
    <div class="container-fluid mt--7" >
      <div class="row">
        <div class="col">
          <blocks-table :title="$t('blockinfo.title')"></blocks-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BlocksTable from "./Tables/BlocksTable";
export default {
  name: "Blocks",
  components: {
    BlocksTable,
  },
};
</script>
<style></style>
