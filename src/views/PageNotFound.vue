<template>
  <section class="page-content">
    <div class="search-content">
      <div class="row">
        <div class="col-4">
          <span style="font-size: 200px">&#128581;</span>
        </div>
        <div class="col-8">
          <div class="h1 font-weight-bold mb-3">
            {{ $t("pageNotFound.information_s") }}
          </div>
          <div class="h2 font-weight-bold mb-0">
            {{ $t("pageNotFound.information_t") }}
          </div>
          <div class="text">{{ $t("pageNotFound.information_v") }}</div>
        </div>
      </div>
      <div>
        <base-button type="primary" @click="toHomePage()">Home</base-button>
      </div>
    </div>
  </section>
</template>

<script>
import BaseButton from "../components/BaseButton";
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
