<template>
  <div>
    <div class="container-fluid mt--9">
      <div class="row">
        <div class="col">
          <candidates-table title="Candidate List"></candidates-table>
        </div>
      </div>
      <!--      <div class="row mt-5">-->
      <!--        <div class="col">-->
      <!--          <candidates-table type="dark" title="Candidate List"></candidates-table>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>

  </div>
</template>
<script>

import CandidatesTable from "./Tables/CandidatesTable";

export default {
  components:{
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
