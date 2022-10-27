<script>
import HighCharts from "highcharts";
export default {
  name: "PieChartTemplate",
  props: ["divId", "option"],
  mounted() {
    HighCharts.chart(this.divId, this.option);
  },
};
</script>
<template>
  <div>
    <div :id="divId" :option="option"></div>
  </div>
</template>
