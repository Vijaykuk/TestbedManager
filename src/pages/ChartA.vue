<template>
  <section class="charts">
    <!-- <div v-show="gtype">
  <div :id="id" :constructor-type="'ganttChart'" :option="a_option" ></div>
  </div>
  <div v-show="!gtype">-->

    <div
      :id="id"
      :class="a_colorscheme"
      @dblclick="showDetailedChartPopup"
      :option="a_option"
    ></div>
    <!-- <div :id="id" v-if="colorscheme==='light-scheme'" :class="a_colorscheme" :option="a_option" ></div>-->
    <div v-if="zoomChart" class="zoomChartModal">
      <div class="modal__body" style="display:flex; justify-content:center;">
        <span
          class="icon-close icon-small interaction closeBtn"
          v-on:click="closeZoomChartModal()"
        ></span>
        <div class="chart"></div>
      </div>
    </div>
    <!--</div>-->
  </section>
</template>
<script>
import Vue from "vue";
import Highcharts from "highcharts";
import Highcharts3d from "highcharts/highcharts-3d";
import Timeline from "highcharts/modules/timeline";
import SeriesLabel from "highcharts/modules/series-label";
import ExportData from "highcharts/modules/export-data";
import funnel from "highcharts/modules/funnel";
import HeatMap from "highcharts/modules/heatmap";
import TileMap from "highcharts/modules/tilemap";
import Treemap from "highcharts/modules/treemap";


import Accessibility from "highcharts/modules/accessibility";
import Cylinder from "highcharts/modules/cylinder";
import exporting from "highcharts/modules/exporting";
import offlineExporting from "highcharts/modules/offline-exporting";
import More from "highcharts/highcharts-more";

import HighchartsVue from "highcharts-vue";
import HighchartsNoData from "highcharts/modules/no-data-to-display";

Highcharts3d(Highcharts);
exporting(Highcharts);
offlineExporting(Highcharts);
HeatMap(Highcharts);
TileMap(Highcharts);
Treemap(Highcharts);
funnel(Highcharts);
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
  props: [
    "id",
    "option",
    "colorscheme",
    "toggleOption",
    "toggleTableOption",
    "homePage",
    "disbleExport",
    "chartName",
    "custRel"
  ],
  data() {
    return {
      pos: 0,
      gtype: false,
      zoomChart: false,
    };
  },
  watch: {
    a_option: {
      deep: true,
      handler() {
        Highcharts.chart(this.id, this.a_option);
      }
    },
    a_colorscheme: {
      handler() {
        Highcharts.chart(this.id, this.a_option );
      },
       deep: true,
    },
  },
  computed: {
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
        } else {
          this.option["exporting"] = {
            enabled: false,
          };
        }
        return this.option;
      } else {
        return {};
      }
    },
    a_colorscheme: function() {
      return this.colorscheme;
    },
  },
  mounted() {
    if(Highcharts){
      Highcharts.chart(this.id, this.a_option);
    }
  },
  methods: {
    emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
    showDetailedChartPopup() {
      this.emitToParent("showDetailedChartPopup", this.chartName);
    },
    closeZoomChartModal() {
      this.zoomChart = false;
    },
  },
};
</script>
