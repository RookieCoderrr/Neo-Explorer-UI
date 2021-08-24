<template>
  <div class="header bg-gradient-success py-7 py-lg-5"></div>

  <section class="page-content">
    <div class="row mt-6"></div>
    <div class="search-content">
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
  </section>
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
.search-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 380px;
  background: #fff;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  color: #282828;
  margin-top: 36px;
  width: 100%;
}
</style>
