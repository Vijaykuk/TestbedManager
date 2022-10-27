<template>
  <section class="charts">
  <highcharts :id="id" :class="a_colorscheme" :constructor-type="'ganttChart'" :options="a_option" ></highcharts>
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
import Gantt from "highcharts/modules/gantt";


import More from 'highcharts/highcharts-more';

import HighchartsVue from "highcharts-vue";
import HighchartsNoData from "highcharts/modules/no-data-to-display";

(function(H) {
  H.Renderer.prototype.symbols.diamond = H.Renderer.prototype.symbols.circle
})(Highcharts);

Gantt(Highcharts);
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
  props: ["id","option","colorscheme","toggleOption","toggleTableOption"],
  data() {
    return {
       pos:0,
      gtype:false,
    };
  },
  watch: {
  /* a_option:{
      handler() {
     Highcharts.chart(this.id, this.a_option);
    },
    deep: true
    }*/
    
   
  },
  computed:{
   a_option:function(){
      let self=this;
     let xpos=-30;
     if(this.toggleOption){
         xpos=-30;
         if(this.pos===0){
           xpos=-30;
           this.pos=1;
         }
         else{
            this.pos+=1;
           xpos=(this.pos*xpos);
          }
      this.option.exporting={
            buttons: {
                customButton1: {
                    x: -30,
                      onclick: (e) => {
                       this.emitToParent("toggleChart",self.toggleOption);
                    },
                     symbol: 'circle',
                },
                 customButton2: {
                    x: -60,
                      onclick: (e) => {
                       this.emitToParent("toggleChart",self.toggleTableOption);
                    },
                     symbol: 'square',
                }
            }
          
        };
      }
    /* if(this.toggleTableOption){
        xpos=-30;
         if(this.pos===0){
           xpos=-30;
           this.pos=1;
         }
         else{
           this.pos+=1;
           xpos=(this.pos*xpos);
        }
         this.option.exporting={
            buttons: {
                 customButton2: {
                    x: -70,
                      onclick: (e) => {
                       this.emitToParent("toggleChart",self.toggleTableOption);
                    },
                     symbol: 'square',
                }
            }
          
        };
       }*/
      return this.option;
    },
    a_colorscheme:function(){
      return this.colorscheme;
    }
  },

  mounted() {
  
  },
  methods:{
     emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
    drawXAxisBackground() {
  var chart = this,
    xAxis = chart.xAxis[0],
    height = 47,
    position = {
      x: chart.plotLeft,
      y: chart.plotTop - height,
      width: xAxis.len,
      height: height
    };

  if (!xAxis.background) {
    xAxis.background = chart.renderer.rect().attr({
      fill: 'rgba(6, 6, 250, 0.6)',
      zIndex: 0
    }).attr(position).add();
  } else {
    xAxis.background.animate(position);
  }
}
  }
}
</script>