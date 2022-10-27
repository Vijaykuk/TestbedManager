<template>
  <section class="charts">
 <!-- <div v-show="gtype">
  <div :id="id" :constructor-type="'ganttChart'" :option="a_option" ></div>
  </div>
  <div v-show="!gtype">-->
  <div :id="id+'_a'" :option="a_option" ></div>
  <!--</div>-->
    </section>
</template>
<script>
 
import Vue from "vue";
import Highcharts from "highcharts";
import Highcharts3d from "highcharts/highcharts-3d";
import Timeline from 'highcharts/modules/timeline';
import SeriesLabel from 'highcharts/modules/series-label';
import ExportData from 'highcharts/modules/export-data';
import Accessibility from 'highcharts/modules/accessibility';
import Cylinder from 'highcharts/modules/cylinder';


import More from 'highcharts/highcharts-more';

import HighchartsVue from "highcharts-vue";
import HighchartsNoData from "highcharts/modules/no-data-to-display";

Highcharts3d(Highcharts);
Timeline(Highcharts);
Cylinder(Highcharts);
SeriesLabel(Highcharts);
ExportData(Highcharts);
Accessibility(Highcharts);
More(Highcharts);
HighchartsNoData(Highcharts);
Vue.use(HighchartsVue);
Vue.use(Highcharts);

export default {
  props: ["id", "option"],
  data() {
    return {
      gtype:false
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
   // Highcharts.chart(this.id, this.a_option);
  },
  methods:{
     emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
  }
}
</script>