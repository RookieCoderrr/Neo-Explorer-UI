<template>
  <div>
    <div class="container-fluid mt--9">
      <div class="row">
        <div class="col">
          <transactions-table title="Transaction List"></transactions-table>
        </div>
      </div>
<!--      <div class="row mt-5">-->
<!--        <div class="col">-->
<!--          <transactions-table type="dark" title="Transaction List"></transactions-table>-->
<!--        </div>-->
<!--      </div>-->
    </div>

<!--    <div class="container-fluid mt&#45;&#45;7">-->
<!--      <div class="row">-->
<!--        <div class="col">-->
<!--          <transfers-table title="Nep17Transfer List"></transfers-table>-->
<!--        </div>-->
<!--      </div>-->
<!--&lt;!&ndash;            <div class="row mt-5">&ndash;&gt;-->
<!--&lt;!&ndash;              <div class="col">&ndash;&gt;-->
<!--&lt;!&ndash;                <candidates-table type="dark" title="Candidate List"></candidates-table>&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--    </div>-->
  </div>
</template>
<script>
import TransactionsTable from "./Tables/TransactionsTable";
// import CandidatesTable from "./Tables/CandidatesTable";
// import TransfersTable from "./Tables/TransfersTable";
export default {
  name: "tables",
  components: {
    TransactionsTable,
    // CandidatesTable,
    // TransfersTable,
  },
};
</script>
<style></style>
