<script>
// The default is PostAuth layout 
const defaultLayout = "PostAuth";

export default {
  computed: {
    layout() {
      return `${this.$route.meta.layout || defaultLayout}Layout`;
    }
  }
};
</script>

<template>
  <div id="app">
    <component :is="layout" />
  </div>
</template>
