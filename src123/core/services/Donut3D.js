const d3 = require("d3");

function pieTop(d, rx, ry, ir) {
  if (d.endAngle - d.startAngle == 0) return "M 0 0";
  var sx = rx * Math.cos(d.startAngle),
    sy = ry * Math.sin(d.startAngle),
    ex = rx * Math.cos(d.endAngle),
    ey = ry * Math.sin(d.endAngle);

  var ret = [];
  ret.push(
    "M",
    sx,
    sy,
    "A",
    rx,
    ry,
    "0",
    d.endAngle - d.startAngle > Math.PI ? 1 : 0,
    "1",
    ex,
    ey,
    "L",
    ir * ex,
    ir * ey
  );
  ret.push(
    "A",
    ir * rx,
    ir * ry,
    "0",
    d.endAngle - d.startAngle > Math.PI ? 1 : 0,
    "0",
    ir * sx,
    ir * sy,
    "z"
  );
  return ret.join(" ");
}

function pieOuter(d, rx, ry, h) {
  var startAngle = d.startAngle > Math.PI ? Math.PI : d.startAngle;
  var endAngle = d.endAngle > Math.PI ? Math.PI : d.endAngle;

  var sx = rx * Math.cos(startAngle),
    sy = ry * Math.sin(startAngle),
    ex = rx * Math.cos(endAngle),
    ey = ry * Math.sin(endAngle);

  var ret = [];
  ret.push(
    "M",
    sx,
    h + sy,
    "A",
    rx,
    ry,
    "0 0 1",
    ex,
    h + ey,
    "L",
    ex,
    ey,
    "A",
    rx,
    ry,
    "0 0 0",
    sx,
    sy,
    "z"
  );
  return ret.join(" ");
}

function pieInner(d, rx, ry, h, ir) {
  var startAngle = d.startAngle < Math.PI ? Math.PI : d.startAngle;
  var endAngle = d.endAngle < Math.PI ? Math.PI : d.endAngle;

  var sx = ir * rx * Math.cos(startAngle),
    sy = ir * ry * Math.sin(startAngle),
    ex = ir * rx * Math.cos(endAngle),
    ey = ir * ry * Math.sin(endAngle);

  var ret = [];
  ret.push(
    "M",
    sx,
    sy,
    "A",
    ir * rx,
    ir * ry,
    "0 0 1",
    ex,
    ey,
    "L",
    ex,
    h + ey,
    "A",
    ir * rx,
    ir * ry,
    "0 0 0",
    sx,
    h + sy,
    "z"
  );
  return ret.join(" ");
}

function getPercent(d) {
  let text = "",
    num = 0;
  if (
    d.data.divId === "executionSummaryDiv" ||
    d.data.divId === "projectedSummaryDiv"
  ) {
    text = d.data.value > 0 ? d.data.value : "";
  } else if (d.endAngle - d.startAngle > 0.2) {
    let perc =
      Math.round((1000 * (d.endAngle - d.startAngle)) / (Math.PI * 2)) / 10 +
      "%";
    text = perc;
  }
  return text;
}

function transition(id, data, rx, ry, h, ir) {
  function arcTweenInner(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
      return pieInner(i(t), rx + 0.5, ry + 0.5, h, ir);
    };
  }
  function arcTweenTop(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
      return pieTop(i(t), rx, ry, ir);
    };
  }
  function arcTweenOuter(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
      return pieOuter(i(t), rx - 0.5, ry - 0.5, h);
    };
  }
  function textTweenX(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
      return 0.6 * rx * Math.cos(0.5 * (i(t).startAngle + i(t).endAngle));
    };
  }
  function textTweenY(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
      return 0.6 * rx * Math.sin(0.5 * (i(t).startAngle + i(t).endAngle));
    };
  }

  var _data = d3.layout
    .pie()
    .sort(null)
    .value(function(d) {
      return d.value;
    })(data);

  d3.select("#" + id)
    .selectAll(".innerSlice")
    .data(_data)
    .transition()
    .duration(750)
    .attrTween("d", arcTweenInner);

  d3.select("#" + id)
    .selectAll(".topSlice")
    .data(_data)
    .transition()
    .duration(750)
    .attrTween("d", arcTweenTop);

  d3.select("#" + id)
    .selectAll(".outerSlice")
    .data(_data)
    .transition()
    .duration(750)
    .attrTween("d", arcTweenOuter);

  d3.select("#" + id)
    .selectAll(".percent")
    .data(_data)
    .transition()
    .duration(750)
    .attrTween("x", textTweenX)
    .attrTween("y", textTweenY)
    .text(getPercent)
    .call(wrap, 380);
}

function draw(
  id,
  data,
  x /*center x*/,
  y /*center y*/,
  rx /*radius x*/,
  ry /*radius y*/,
  h /*height*/,
  ir /*inner radius*/
) {
  var _data = d3.layout
    .pie()
    .sort(null)
    .value(function(d) {
      return d.value;
    })(data);

  var slices = d3
    .select("#" + id)
    .append("g")
    .attr("transform", "translate(" + x + "," + y + ")")
    .attr("class", "slices");

  slices
    .selectAll(".innerSlice")
    .data(_data)
    .enter()
    .append("path")
    .attr("class", "innerSlice")
    .style("fill", function(d) {
      return d3.hsl(d.data.color).darker(0.7);
    })
    .attr("d", function(d) {
      return pieInner(d, rx + 0.5, ry + 0.5, h, ir);
    })
    .each(function(d) {
      this._current = d;
    });

  slices
    .selectAll(".topSlice")
    .data(_data)
    .enter()
    .append("path")
    .attr("class", "topSlice")
    .style("fill", function(d) {
      return d.data.color;
    })
    .style("stroke", function(d) {
      return d.data.color;
    })
    .attr("d", function(d) {
      return pieTop(d, rx, ry, ir);
    })
    .each(function(d) {
      this._current = d;
    })
    .on("mouseover", function(d, i) {
      this.style.strokeWidth = "6px";
      this.style.border = "2px solid #c1c1c1";
      this.style.stroke = "#c1c1c1";

      debugger;
    })
    .on("mouseout", function(d, i) {
      this.style.strokeWidth = "0";
      this.style.stroke = d.data.color;
      this.style.border = "none";
    });

  slices
    .selectAll(".outerSlice")
    .data(_data)
    .enter()
    .append("path")
    .attr("class", "outerSlice")
    .style("fill", function(d) {
      return d3.hsl(d.data.color).darker(0.7);
    })
    .attr("d", function(d) {
      return pieOuter(d, rx - 0.5, ry - 0.5, h);
    })
    .each(function(d) {
      this._current = d;
    });

  slices
    .selectAll(".percent")
    .data(_data)
    .enter()
    .append("text")
    .attr("class", function(d, i) {
      return "percent " + id + "label" + i;
    })
    .attr("x", function(d) {
      return 1.3 * rx * Math.cos(0.5 * (d.startAngle + d.endAngle));
    })
    .attr("y", function(d) {
      return 1.3 * ry * Math.sin(0.5 * (d.startAngle + d.endAngle));
    })
    .text(getPercent)
    .each(function(d) {
      this._current = d;
    });

  let div1 = document.querySelector("#" + id + "Legends");
  if (div1) {
    [].slice.call(div1.children).forEach((child) => div1.removeChild(child));
  }
  let legendlen = data.length / 2;

  let legendHeight = (80 * data.length) / 3;

  let itemWidth = 28;
  let itemHeight = 10;

  let viewboxStr = `-5 -5 100 50`;

  let legends = d3
    .select("#" + id + "Legends")
    .append("svg")
    .attr("id", "legendsBox")
    .attr("viewBox", viewboxStr);

  let legendG = legends.selectAll(".legend").data(data);

  let legendEnter = legendG
    .enter()
    .append("g")
    .attr("transform", function(d, i) {
      return (
        "translate(" +
        (i % 3) * itemWidth +
        "," +
        Math.floor(i / 3) * itemHeight +
        ")"
      );
    })
    .attr("class", "legend pieLegend");

  legendEnter
    .append("circle")
    .attr("r", 2)
    .attr("fill", function(d) {
      return d.color;
    });

  legendEnter
    .append("text")
    .text(function(d) {
      return d.label;
    })
    .style("font-size", "4px")
    .attr("y", 2)
    .attr("x", 4)
    .call(wrap, 30)
    .on("mouseover", function(d, i) {
      let path = document.querySelector("#" + id).querySelectorAll(".topSlice")[
        i
      ];
      path.style.strokeWidth = "6px";
      path.style.border = "2px solid #000";
      path.style.stroke = "#c1c1c1";
    })
    .on("mouseout", function(d, i) {
      let path = document.querySelector("#" + id).querySelectorAll(".topSlice")[
        i
      ];
      path.style.strokeWidth = "0";
      path.style.stroke = d.color;
      path.style.border = "none";
    });
}

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
      words = text
        .text()
        .split(/\s+/)
        .reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1, // ems
      x = text.attr("x"),
      y = text.attr("y"),
      dy = 0, //parseFloat(text.attr("dy")),
      tspan = text
        .text(null)
        .append("tspan")
        .attr("x", x)
        .attr("y", y)
        .attr("dy", dy + "em");
    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", ++lineNumber * lineHeight + dy + "em")
          .text(word);
      }
    }
  });
}

export const Donut3D = {
  pieTop,
  pieOuter,
  pieInner,
  draw,
  transition,
  getPercent,
};
