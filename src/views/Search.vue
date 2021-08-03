<template>
  <section class="page-content">
    <div class="search-content">
      <div class="h2 font-weight-bold mb-0">
        {{ 'Sorry, Your search height, hash, address, asset or transaction id does not exist.' }}
      </div>
      <div class="row mt-3"></div>
      <div class="h2 font-weight-bold mb-0">{{ 'Try going back to where you were or heading to the home page.' }}</div>
      <div class="row mt-3"></div>
      <div>
        <base-button type="primary"  @click="toHomePage()">Back Home</base-button>
      </div>
    </div>
  </section>

</template>

<script>
import BaseButton from "../components/BaseButton";
export default {
  name: "Home",
  components: {BaseButton},
  data() {
  },
  methods: {
    toHomePage(){
      this.$router.push({
        path: `/homepage`,
      });
    }
  }
}
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
