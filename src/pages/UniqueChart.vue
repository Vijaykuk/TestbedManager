<template>
  <section class="charts">
 <!-- <div v-show="gtype">
  <div :id="id" :constructor-type="'ganttChart'" :option="a_option" ></div>
  </div>
  <div v-show="!gtype">-->
    
  <div :id="id" :class="a_colorscheme" @dblclick="showZoomChartPopup"  :option="a_option" ></div>
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
import exporting from "highcharts/modules/exporting";
import offlineExporting from "highcharts/modules/offline-exporting";
import Cylinder from 'highcharts/modules/cylinder';
import More from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';
import HighchartsVue from "highcharts-vue";
import HighchartsNoData from "highcharts/modules/no-data-to-display";

exporting(Highcharts);
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
  props: ["disbleExport","id", "option","colorscheme", "toggleOption"],
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
   a_option: function() {
      if (this.option) {
        if (this.disbleExport !== "true") {
          let self = this;
          let xpos = -30;
          if (this.toggleOption) {
            xpos = -30;
            if (this.pos === 0) {
              xpos = -30;
            } else {
              xpos = this.pos * xpos;
              this.pos += 1;
            }
            this.option.exporting = {
              buttons: {
                customButton1: {
                  x: -30,
                  onclick: (e) => {
                    this.emitToParent("toggleChart", self.toggleOption);
                  },
                  symbol: "circle",
                },
              },
            };
          }
          if (this.toggleTableOption) {
            xpos = -30;
            if (this.pos === 0) {
              xpos = -30;
            } else {
              xpos = this.pos * xpos;
              this.pos += 1;
            }
            this.option.exporting = {
              buttons: {
                customButton2: {
                  x: xpos,
                  onclick: (e) => {
                    this.emitToParent("toggleChart", self.toggleTableOption);
                  },
                  symbol: "square",
                },
              },
            };
          }
           this.option["exporting"]["enabled"] = true;
        } 
        else{
           this.option["exporting"] = {
            enabled: false,
          };
        }
        return this.option;
      } else {
        return {};
      }
    },
    a_colorscheme:function(){
      return this.colorscheme;
    }
  },
  mounted() {
    debugger;
    Highcharts.chart(this.id, this.a_option);
  },
  methods:{
     emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
    showZoomChartPopup(){
      this.emitToParent("showChartPopup",this.a_option);
    },
  }
}
</script>