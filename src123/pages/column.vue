<template>
  <div>
    <div :id="id" :option="a_option"></div>
  </div>
</template>
<script>
import Vue from "vue";
import Highcharts from "highcharts";
import Highcharts3d from "highcharts/highcharts-3d";
import HighchartsVue from "highcharts-vue";

Highcharts3d(Highcharts);
Vue.use(Highcharts);

import HighchartsNoData from "highcharts/modules/no-data-to-display";
HighchartsNoData(Highcharts);

export default {
  props: ["id", "option"],
  data() {
    return {
     
    };
  },
  watch: {
    a_option:{
      handler() {
     Highcharts.chart(this.id, this.a_option);
    },
    deep: true
    }
   
  },
  computed:{
    a_option:function(){
      return this.option;
    }
  },
  mounted() {
    Highcharts.chart(this.id, this.a_option);
  },
};
</script>
<style scoped>
/* Container */
.container {
  width: 1000px;
  height: 550px;
}
</style>
