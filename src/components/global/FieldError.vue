<script>
import { FadeTransition } from "vue2-transitions";

export default {
  name: "FieldError",
  props: ["errorMessage", "errorStyle"],
  components: { FadeTransition }
};
</script>

<template>
  <fade-transition :duration="200">
    <span v-show="errorMessage" class="error" :style="errorStyle">{{
      errorMessage
    }}</span>
  </fade-transition>
</template>

<style scoped>
.error {
  color: red;
}
</style>
