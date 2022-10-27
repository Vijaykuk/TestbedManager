<template>
  <section class="charts">
 <!-- <div v-show="gtype">
  <div :id="id" :constructor-type="'ganttChart'" :option="a_option" ></div>
  </div>
  <div v-show="!gtype">-->
    
  <div :id="id" :class="a_colorscheme"  @dblclick="showZoomChartPopup"  :option="a_option" ></div>
 <!-- <div :id="id" v-if="colorscheme==='light-scheme'" :class="a_colorscheme" :option="a_option" ></div>-->
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
import HeatMap from 'highcharts/modules/heatmap';
import Accessibility from 'highcharts/modules/accessibility';
import Cylinder from 'highcharts/modules/cylinder';
import exporting from "highcharts/modules/exporting";
import offlineExporting from "highcharts/modules/offline-exporting";
import More from 'highcharts/highcharts-more';

import HighchartsVue from "highcharts-vue";
import HighchartsNoData from "highcharts/modules/no-data-to-display";

Highcharts3d(Highcharts);
exporting(Highcharts);
offlineExporting(Highcharts);
HeatMap(Highcharts);
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
  props: ["id", "option","colorscheme","toggleOption","toggleTableOption","homePage"],
  data() {
    return {
      pos:0,
      gtype:false,
      zoomChart:false,
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
      let self=this;
       let xpos=-30;
      if(this.toggleOption){
         xpos=-30;
         if(this.pos===0){
           xpos=-30;
         }
         else{
           xpos=(this.pos*xpos);
            this.pos+=1;
         }
      this.option.exporting={
            buttons: {
                customButton1: {
                    x: -30,
                      onclick: (e) => {
                       this.emitToParent("toggleChart",self.toggleOption);
                    },
                     symbol: 'circle',
                }
            }
          
        };
      }
       if(this.toggleTableOption){
        xpos=-30;
         if(this.pos===0){
           xpos=-30;
         }
         else{
           xpos=(this.pos*xpos);
            this.pos+=1;
         }
         this.option.exporting={
            buttons: {
                 customButton2: {
                    x: xpos,
                      onclick: (e) => {
                       this.emitToParent("toggleChart",self.toggleTableOption);
                    },
                     symbol: 'square',
                }
            }
          
        };
       }
      /*else{
         xpos=-30;
         if(this.pos===0){
           xpos=-30;
         }
         else{
           xpos=(this.pos*xpos);
            this.pos+=1;
         }
       this.option.exporting={
            buttons: {
                customButton: {
                    x: xpos,
                      onclick: (e) => {
                        alert("12345")
                      // this.emitToParent("toggleChart",this.toggleOption);
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
    if(this.homePage){
    Highcharts.chart(this.id, this.a_option);
    }
  },
  methods:{
     emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
    showZoomChartPopup(){
      this.emitToParent("showChartPopup",this.a_option);
    },
    closeZoomChartModal(){
      this.zoomChart=false;
    }
  }
}
</script>