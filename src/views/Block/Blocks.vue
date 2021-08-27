<template>
  <div style="padding-bottom: 10%!important; background: rgb(250,250,250)">
    <div class="container-fluid mt--7 mb--7" style="background: rgb(250,250,250); width: 95%">
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
