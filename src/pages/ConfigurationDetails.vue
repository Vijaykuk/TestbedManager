<script>
export default {
  name: "ConfigurationDetails",
  props: ["config_data", "projectid"],
  data() {
    return {};
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
  },
};
</script>
<template>
  <div>
    <div
      style="margin-top: 54px;margin-right: 52px;position: absolute;right: 0;"
    >
      <a href="#" onclick="downloadConfigData('configDiv')">download</a>
    </div>
    <div class="row summaryrow" style="width:98%">
      <div
        id="configDiv"
        style="margin: 15px;
    margin-top: 400px;
    border: 2px solid #f1c752;
    border-radius: 20px;"
      >
        <div
          id="configurationDetails"
          style="padding-left: 30px;
              padding-top: 20px;
    line-height: 20px;
    border-radius: 20px;
    font: 500 1rem ui-sans-serif !important;
    background-color: #fff;"
        >
          {{ config_data }}
        </div>
      </div>
    </div>
  </div>
</template>
