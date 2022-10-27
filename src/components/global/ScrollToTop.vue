<script>
export default {
  name: "ScrollToTop",
  methods: {
    emitToParent(value) {
      this.$emit("child", value);
    },
    resetScroll() {
      this.emitToParent("resetScroll");
    }
  }
};
</script>

<template>
  <div id="scroll-to-top" class="interaction" @click="resetScroll">
    <span class="icon-arrow-up-tail icon-small"></span>
  </div>
</template>

<style scoped>
#scroll-to-top {
  right: 20px;
  top: 75%;
  height: 40px;
  width: 40px;
  display: block;
  position: absolute;
  border-radius: 50%;
  color: white;
  background-color: #0d274d;
  text-align: center;
  padding-top: 10px;
  margin-right: 25px;
  box-shadow: 2px 1px 5px 1px rgba(50, 50, 50, 0.7);
}
</style>
