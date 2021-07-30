<template>
  <section class="page-content">

  </section>

</template>

<script>
export default {
  name: "Home",
  data() {
    return {}
  },
  methods: {},
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
.search {
  width: 100%;
  max-width: 565px;
  height: 50px;
  position: relative;
}
.button {
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 1px;
  top: 1px;
  background: #00af92;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  width: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.img {
  width: 26px;
}

.over-ellipsis {
  width: 100%;
  height: 100%;
  padding-right: 61px;
  padding-left: 11px;
  font-size: 16px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(191, 191, 191, 1);
  border-radius: 4px;
  color: #282828;
}

</style>
