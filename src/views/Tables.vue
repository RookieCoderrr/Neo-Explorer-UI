<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <tokens-table title="Token List"></tokens-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TokensTable from "./Tables/TokensTable";
export default {
  name: "tables",
  components: {
    TokensTable,
  },
};
</script>
<style></style>
