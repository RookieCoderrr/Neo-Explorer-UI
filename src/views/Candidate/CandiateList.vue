<template>
  <div style="padding-bottom: 10%!important; background: #F2F2F2">
    <div class="container-fluid mt--7 mb--7" style="background: #F2F2F2; width: 95%">
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
