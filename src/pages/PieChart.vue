<!--

Based on:
  https://bl.ocks.org/shimizu/f90651541575f348a129444003a73467

Links:
  Props: https://vuejs.org/v2/guide/components.html#Passing-Data-with-Props
  Methods: https://vuejs.org/v2/guide/events.html#Method-Event-Handlers

-->

<template>
  <!--<svg width="1000" height="600"></svg>-->
  <div>
    <div :id="divId"></div>
    <div id="mainTooltip" class="hidden half-padding">
      <div class="flex-row">
        <div class="short-message-tooltip qtr-padding-top">
          <div class="alert__message" id="value"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const d3 = require("d3");

export default {
  name: "PieChart",
  props: ["projectId", "title", "testcaseCountList", "divId", "color"],
  data() {
    return {
      width: 0,
      height: 0,
    };
  },
  mounted: function() {
    if (this.testcaseCountList.length > 0) {
      let pieData = this.pieData();
      this.drawChart(pieData);
    }
  },
  watch: {
    testcaseCountList: function(newData) {
      if (newData.length > 0) {
        let pieData = this.pieData();
        this.drawChart(newData);
      }
    },
  },
  methods: {
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
    drawChart: function(data) {
      let width = 380;
      let height = 380;
      let margin = 5;
      let str = "";

      // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
      let radius = Math.min(width, height) / 2 - margin;

      // append the svg object to the div called 'my_dataviz'
      const div = document.querySelector("#" + this.divId);
      [].slice.call(div.children).forEach((child) => div.removeChild(child));
      let svg = d3
        .select("#" + this.divId)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr(
          "transform",
          str
            .concat("translate(")
            .concat(width / 2)
            .concat(",")
            .concat(height / 2)
            .concat(")")
        );

      // Compute the position of each group on the pie:
      let pie = d3.layout
        .pie()
        .sort(null) // Do not sort group by size
        .value(function(d) {
          return d.value.value;
        });
      let data_ready = pie(d3.entries(data));

      // The arc generator
      let arc = d3
        .arc()
        .innerRadius(0) // This is the size of the donut hole
        .outerRadius(radius * 0.9);

      let arcOver = d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius * 0.9 + 20);

      // Another arc that won't be drawn. Just for labels positioning
      let outerArc = d3
        .arc()
        .innerRadius(radius * 0.9 + 50)
        .outerRadius(radius * 0.9);

      // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
      svg
        .selectAll("allSlices")
        .data(data_ready)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", function(d) {
          return d.data.value.color;
        })
        .style("stroke", "white")
        .style("stroke-width", 2)
        .on("mouseover", function(d) {
          d3.select(this)
            .transition()
            .duration(1000)
            .attr("d", arcOver)
            .style("stroke-width", 10);
          d3.select("#mainTooltip")
            .style("left", d3.event.offsetX.toString().concat("px"))
            .style("top", d3.event.offsetY.toString().concat("px"))
            .select("#value")
            .html(function() {
              return d.data.value.label + " " + d.data.vale.total;
            });
          d3.select("#mainTooltip").classed("hidden", false);
        })
        .on("mouseout", function() {
          d3.select(this)
            .transition()
            .duration(300)
            .attr("d", arc)
            .style("stroke-width", 2);
          d3.select("#mainTooltip").classed("hidden", true);
        });

      // Add the polylines between chart and labels:
      svg
        .selectAll("allPolylines")
        .data(data_ready)
        .enter()
        .append("polyline")
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr("points", function(d) {
          if (d.data.key !== "move") {
            let posA = arc.centroid(d); // line insertion in the slice
            let posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
            let posC = outerArc.centroid(d); // Label position = almost the same as posB
            let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
            posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
            if (d.data.value.index > 1) {
              posB[1] = posB[1] + d.data.value.index * 50 - 120;
              posC[1] = posC[1] + d.data.value.index * 50 - 120;
            }
            return [posA, posB, posC];
          }
        });
      function wrap(text, width) {
        text.each(function() {
          let text = d3.select(this);
          let words = text
            .text()
            .split(/\s+/)
            .reverse();
          let word;
          let line = [];
          let lineNumber = 0;
          let lineHeight = 1.1; // ems
          let x = text.attr("x");
          let y = text.attr("y");
          let dy = 1.1;
          let tspan = text
            .text(null)
            .append("tspan")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", dy.toString().concat("em"));
          word = words.pop();
          while (word) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().innerHTML.length > 42) {
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              tspan = text
                .append("tspan")
                .attr("x", x)
                .attr("y", y)
                .attr("dx", x - width)
                .attr(
                  "dy",
                  (++lineNumber * lineHeight + dy).toString().concat("em")
                )
                .text(word);
            }
            word = words.pop();
          }
        });
      }

      // Add the polylines between chart and labels:
      svg
        .selectAll("allLabels")
        .data(data_ready)
        .enter()
        .append("text")
        .text(function(d) {
          if (d.data.key !== "move") {
            return d.data.value.name
              .concat(" ")
              .concat(d.data.value.value.toFixed(2))
              .concat("%");
          }
        })
        .call(wrap, 300)

        .attr("transform", function(d) {
          if (d.data.key !== "move") {
            let pos = outerArc.centroid(d);
            let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            if (d.data.value.index > 1) {
              pos[1] = pos[1] + d.data.value.index * 50 - 145;
            }
            str = "";
            return str
              .concat("translate(")
              .concat(pos)
              .concat(")");
          }
        })
        .style("text-anchor", function(d) {
          let midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          return midangle < Math.PI ? "start" : "end";
        });
    },
  },
};
</script>
<style scoped>
polyline {
  opacity: 0.3;
  stroke: black;
  stroke-width: 2px;
  fill: none;
}
#mainTooltip {
  position: absolute;
  text-align: left;
  color: white;
  padding-left: 5px #1e4471;
  font: 12px sans-serif;
  background-color: #1e4471;
  border-radius: 5px;
  pointer-events: none;
  min-width: 180px;
}

#mainTooltip.hidden {
  display: none;
}

.tooltip-arrow {
  display: none !important;
  position: absolute;
  width: 0;
  height: 0;
}

.short-message-tooltip {
  width: 100px;
  max-height: 45px;
  display: flex;
}

.totalspace {
  float: right;
  font-size: 16px;
}

svg {
  left: -40px;
  position: relative;
}
</style>
