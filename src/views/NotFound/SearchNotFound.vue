<template>
  <div class="page-content" style="background-color: #f7f8fa">

      <div class="searchNotFound">
        <div class="row">
          <div class="col-4">
            <span style="font-size: 200px">&#128575;</span>
          </div>
          <div class="col-8">
            <div class="h2 font-weight-bold mb-0">
              {{ $t("search.information") }}
            </div>
            <div class="row mt-3"></div>
            <div class="h2 font-weight-bold mb-0">
              {{ $t("search.dataSupport") }}
            </div>
            <p class="text-muted font-weight-bold mb-0">
              {{ $t("search.block") }}
            </p>
            <p class="text-muted font-weight-bold mb-0">
              {{ $t("search.transaction") }}
            </p>
            <p class="text-muted font-weight-bold mb-0">
              {{ $t("search.account") }}
            </p>
            <p class="text-muted font-weight-bold mb-0">
              {{ $t("search.token") }}
            </p>
            <div class="row mt-3"></div>
            <div>
              <base-button type="primary" @click="toHomePage()">{{
                  $t("search.button")
                }}</base-button>
            </div>
          </div>
        </div>
      </div>
  </div>

</template>

<script>
import BaseButton from "../../components/BaseButton";
export default {
  name: "Home",
  components: { BaseButton },
  data() {},
  methods: {
    toHomePage() {
      this.$router.push({
        path: `/homepage`,
      });
    },
  },
};
</script>
<style>
.searchNotFound{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  background: #f7f8fa;
  border-radius: 4px;
  color: #282828;
  width: 100%;
  margin-top: 1%;

}
</style>
