<script>
import { router } from "@/router";
import { store } from "../store/store";
import { testcaseService } from "@/core/services/testcaseService";
import { Donut3D } from "@/core/services/Donut3D";

const d3 = require("d3");

export default {
  name: "TestcasesFeatureChart",
  props: ["projectId", "title", "testcaseCountList", "divId", "color"],
  data() {
    return {
      legendId: "",
    };
  },
  mounted() {
    this.legendId = this.divId + "DonutLegends";
    this.buildchart();
  },
  watch: {
    testcaseCountList() {
      this.buildchart();
    },
  },
  methods: {
    buildchart() {
      let innerRadius = 0,
        rx = 140,
        x = 175,
        y = 150,
        h = 30,
        ry = 80;
      if (this.testcaseCountList.length > 0) {
        var svg = d3
          .select("#" + this.divId)
          .append("svg")
          .attr("width", 380)
          .attr("height", 300);
        svg.append("g").attr("id", this.divId + "Donut");
        if (
          this.divId === "executionSummaryDiv" ||
          this.divId === "projectedSummaryDiv"
        ) {
          innerRadius = 0.4;
          rx = 100;
          ry = 100;
          y = 160;
          x = 175;
          h = 15;
        }
        if (this.divId === "cvtDefectsDiv") {
          innerRadius = 0.2;
          rx = 100;
          ry = 100;
          y = 170;
          x = 170;
          h = 0;
        }
        Donut3D.draw(
          this.divId + "Donut",
          this.pieData(),
          x,
          y,
          rx,
          ry,
          h,
          innerRadius
        );
      }
    },
    pieData() {
      let self = this;
      let data = this.testcaseCountList.map(function(d, index) {
        let st = index % self.color.length;
        return {
          label: d.name,
          value: d.total,
          color: self.color[st],
          divId: self.divId,
        };
      });
      return data;
    },
  },
};
</script>
<template>
  <div>
    <div class="chartTitle">{{ title }}</div>
    <div class="testcaseFeatureDiv" :id="divId"></div>
    <div :id="legendId"></div>
  </div>
</template>
