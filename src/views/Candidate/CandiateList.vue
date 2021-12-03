<template>
  <div style="padding-bottom: 10%!important; background: #f7f8fa">
    <div class="container-fluid mt--8 list" style="background: #f7f8fa; width: 85%">
      <div class="row">
        <div class="col">
          <candidates-table :title="$t('candidate.title')"></candidates-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CandidatesTable from "./CandidatesTable";

export default {
  components: {
    CandidatesTable,
  },
  data() {
    return {
      nav: null,
    };
  },
};
</script>
<style></style>
