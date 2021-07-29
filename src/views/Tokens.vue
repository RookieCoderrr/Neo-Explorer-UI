<template>
  <div>
    <div class="container-fluid mt--9">
      <div class="row">
        <div class="col">
          <tokens-table title="Tokens List"></tokens-table>
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
