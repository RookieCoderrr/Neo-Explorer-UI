<template>
  <card class="card-stats" :show-footer-line="true">
    <div class="row">
      <div class="col">
        <slot>
          <h5
            class="card-title text-uppercase text-muted mb-0"
            style="color: #676c6c"
            v-if="title"
          >
            {{ title }}
          </h5>
          <span
            class="display-4 font-weight-bold mb-0"
            style="color: #343939"
            v-if="subTitle">
            <count-to :startVal='startVal' :endVal='parseInt(subTitle)' :duration='2000'></count-to>
          </span>
        </slot>
      </div>

      <div class="col-auto" v-if="$slots.icon || icon">
        <slot name="icon">
          <div
            class="icon icon-shape text-white rounded-circle shadow"
            :class="[`bg-${type}`, iconClasses]"
          >
            <i :class="icon"></i>
          </div>
        </slot>
      </div>
    </div>

    <p class="mt-3 mb-0 text-sm">
      <slot name="footer"> </slot>
    </p>
  </card>
</template>
<script>
import Card from "./Card.vue";
import CountTo from "./countTo.vue";

export default {
  name: "stats-card",
  components: {
    Card,
    CountTo,
  },
  props: {
    type: {
      type: String,
      default: "primary",
    },
    icon: String,
    title: String,
    subTitle: String,
    iconClasses: [String, Array],
  },
  data(){
    return {
      startVal:0,
    }

  }

};
</script>
<style></style>
