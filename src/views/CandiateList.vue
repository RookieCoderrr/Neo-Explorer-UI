<template>
  <div>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <candidates-table title="Candidate List"></candidates-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CandidatesTable from "./Tables/CandidatesTable";

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
