<template>
  <section class="charts">
 <!-- <div v-show="gtype">
  <div :id="id" :constructor-type="'ganttChart'" :option="a_option" ></div>
  </div>
  <div v-show="!gtype">-->
    
  <div :id="id" :class="a_colorscheme"  :option="a_option" ></div>
 <!-- <div :id="id" v-if="colorscheme==='light-scheme'" :class="a_colorscheme" :option="a_option" ></div>-->
 
  <!--</div>-->
    </section>
</template>
<script>
 
import Vue from "vue";
import Highcharts from "highcharts";
import Highcharts3d from "highcharts/highcharts-3d";
import Timeline from 'highcharts/modules/timeline';
import SeriesLabel from 'highcharts/modules/series-label';
import Cylinder from 'highcharts/modules/cylinder';
import More from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';
import HighchartsVue from "highcharts-vue";
import HighchartsNoData from "highcharts/modules/no-data-to-display";

Highcharts3d(Highcharts);
Timeline(Highcharts);
Cylinder(Highcharts);
SeriesLabel(Highcharts);
SolidGauge(Highcharts);
More(Highcharts);
HighchartsNoData(Highcharts);
Vue.use(HighchartsVue);
Vue.use(Highcharts);

export default {
  props: ["id", "option","colorscheme"],
  data() {
    return {
      gtype:false,
    };
  },
  watch: {
    a_option:{
      handler() {
     Highcharts.chart(this.id, this.a_option);
    },
    deep: true
    },
    a_colorscheme:{
       handler() {
     Highcharts.chart(this.id, this.a_option);
    }
    }
  },
  computed:{
    a_option:function(){
    if(this.option != "" && this.option != undefined)
     { 
      return JSON.parse(this.option);
     }
      else
      return {};
    },
    a_colorscheme:function(){
      return this.colorscheme;
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