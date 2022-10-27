<template>
  <section class="charts">
  <div class="ganttChartDiv" @dblclick="showGanttZoomChartPopup">
  <highcharts :id="id" :class="a_colorscheme" :constructor-type="'ganttChart'" :options="a_option" ></highcharts>

     <div v-if="zoomChart" class="zoomChartModal">
      <div class="modal__body" style="display:flex; justify-content:center;">
       <span
          class="icon-close icon-small interaction closeBtn"
          v-on:click="closeZoomChartModal()"
        ></span>
        <div class="chart">
        </div>
      </div>
    </div>
  </div>
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

/*(function(H) {
  H.Renderer.prototype.symbols.diamond = H.Renderer.prototype.symbols.circle
})(Highcharts);*/

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
  props: ["id","option","colorscheme","toggleOption","toggleTableOption","disbleExport"],
  data() {
    return {
       pos:0,
      gtype:false,
       zoomChart:false,
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
     if(this.option){
      let self=this;
     let xpos=-30;
     if(this.disbleExport!=="true"){
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
     }
     else{
       this.option['exporting']={
          enabled: false
       };
     }
      return this.option;
     }
     else {
       return {};
     }
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
    showGanttZoomChartPopup(){
      debugger;
      this.emitToParent("showGanttChartPopup",this.a_option);
    },
      closeZoomChartModal(){
      this.zoomChart=false;
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