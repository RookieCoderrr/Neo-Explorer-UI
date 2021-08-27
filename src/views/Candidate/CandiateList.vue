<template>
  <div style="padding-bottom: 10%!important; background: rgb(250,250,250)">
    <div class="container-fluid mt--7 mb--7" style="background: rgb(250,250,250); width: 95%">
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
