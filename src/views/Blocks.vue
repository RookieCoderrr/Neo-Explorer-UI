<template>
  <div style="padding-bottom: 10%!important; background: #F2F2F2">
    <div class="container-fluid mt--7 mb--7" style="background: #F2F2F2; width: 95%">
      <div class=" row mt-3  mb-5  title1" > {{ $t('blockDetail') }} </div>
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
