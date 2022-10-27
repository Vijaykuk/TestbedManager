<template>
  <div class="chartDiv" ref="chartdiv">
  </div>
</template>

<script>
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5map from "@amcharts/amcharts5/map";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5geodata_continentsLow from "@amcharts/amcharts5-geodata/continentsLow";

export default {
  name: 'WorldMapChart',
  props:["chartsData","chartTitle","chartColor"],
  mounted() {
      this.displayWorldMap();
  },
  watch:{
      chartsData:function(){
            this.displayWorldMap();
      }
  },
   beforeDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  },
  methods:{
      displayWorldMap(){
          let root = am5.Root.new(this.$refs.chartdiv);
// Set themes
root.setThemes([
  am5themes_Animated.new(root)
]);


// ====================================
// Create map
// ====================================

var map = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: false,
    panY: false,
    wheelX :'none',
    wheelY: 'none',
    projection: am5map.geoNaturalEarth1()
  })
);

map.children.unshift(am5.Label.new(root, {
  text: this.chartTitle,
  fill:am5.color(0xffffff),
  fontSize: 20,
  fontWeight: "500",
  textAlign: "center",
  x: am5.percent(60),
  centerX: am5.percent(60),
  paddingTop: 100,
  paddingBottom: 0
}));


var color1=am5.color(0x08c3fe);
if(this.chartTitle==="Lab count"){
 color1=am5.color(0xffa500);
}
else{
 color1=am5.color(0x08c3fe);
}

// Create polygon series
var polygonSeries = map.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_continentsLow,
    exclude: ["antarctica"],
    fill: color1
    
  })
);




var pointSeries = map.series.push(
  am5map.MapPointSeries.new(root, {})
);


var colorSet = am5.ColorSet.new(root, {step:2});

pointSeries.bullets.push(function(root, series, dataItem) {
  var value = dataItem.dataContext.value;
  var labvalue = dataItem.dataContext.labvalue;

  var container = am5.Container.new(root, {});
  var color = colorSet.next();
  var radius = 15 + value / 20 * 20;
  var circle = container.children.push(am5.Circle.new(root, {
    radius: radius,
    fill: am5.color(0xffffff),
    dy: -radius * 2
  }))

  var pole = container.children.push(am5.Line.new(root, {
    stroke: color,
    height: -40,
    strokeGradient: am5.LinearGradient.new(root, {
      stops:[
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 0 }
      ]
    })
  }));



  var label = container.children.push(am5.Label.new(root, {
    text: value,
    fill: am5.color(0x000000),
    fontSize: "1.3em",
    fontWeight: "700",
    centerX: am5.p50,
    centerY: am5.p50,
    dy: -radius * 2
  }))

  var titleLabel = container.children.push(am5.Label.new(root, {
    text: dataItem.dataContext.title,
    fill:  am5.color(0xffffff),
    fontWeight: "700",
    fontSize: "1.3em",
    centerY: am5.p50,
    dy: -radius * 2,
    dx: radius
  }))


 
  return am5.Bullet.new(root, {
    sprite: container
  });
});




// ====================================
// Create pins
// ====================================

var data = this.chartsData;

for (var i = 0; i < data.length; i++) {
  var d = data[i];
  pointSeries.data.push({
    geometry: { type: "Point", coordinates: [d.longitude, d.latitude] },
    title: d.title,
    value: d.value
  });
}
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chartDiv {
  width: 100%;
  height: 800px;
}
</style>