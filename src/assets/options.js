const colors = [
  "#005073",
  "#007dad",
  "#00bdeb",
  "#65bce4",

  "#adcbe3",
  "#fe9c8f",
  "#feb2a8",
  "#fec8c1",
  "#eddd54",
  "#e3ed54",
  "#f0e695",
];

export const options = {
  c_splideOptions: {
    rewind: true,
    width: "100%",
    perPage: 4,
    gap: "1rem",
    perMove: 1,
    autoplay: true,
    speed: 150,
    pagination: false,
  },
  chart_splideOptions: {
    rewind: true,
    width: "100%",
    perPage: 3,
    gap: "1rem",
    perMove: 1,
    autoplay: true,
    speed: 150,
    pagination: false,
  },
  timeLineOption: {
    chart: {
      type: "timeline",
    },
    accessibility: {
      screenReaderSection: {
        beforeChartFormat:
          "<h5>{chartTitle}</h5>" +
          "<div>{typeDescription}</div>" +
          "<div>{chartSubtitle}</div>" +
          "<div>{chartLongdesc}</div>" +
          "<div>{viewTableButton}</div>",
      },
      point: {
        valueDescriptionFormat: "{index}. {point.label}. {point.description}.",
      },
    },
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: false,
    },
    title: {
      text: "Timeline of Project",
    },
    colors: ["#4185F3", "#427CDD", "#406AB2", "#3E5A8E", "#3B4A68", "#363C46"],
    credits: false,
    series: [
      {
        data: [
          {
            name: "Project Created",
            label: "2 Aug: Project created",
            description: "2 Aug 2021 Project created",
          },
          {
            name: "20 Testcases Added",
            label: "5 Aug: 20 Testcases added",
            description: "5 Aug 2021, 20 Testcases added",
          },
          {
            name: "40 Testcases Added",
            label: "6 Aug: 40 Testcases added",
            description: "6 Aug 2021, 40 Testcases added",
          },
          {
            name: "Testcases Executed",
            label: "7 Aug: Testcases executed",
            description: "7 August 2021, Testcases executed",
          },
          {
            name: "Project Closed",
            label: "8 Aug: Project Closed",
            description: "8 Aug 2021, Project closed",
          },
        ],
      },
    ],
  },
  pie_option: {
    title: {
      text: "Test Cases per Platform",
    },
    type: "pie",
    options3d: {
      enabled: true, //Use 3d function
      alpha: 45,
      beta: 15,
    },
    tooltip: {
      pointFormat: "{point.label}: <b>{point.total}</b>",
    },
    colors: ["#fe9c8f", "#feb2a8", "#fec8c1", "#eddd54", "#e3ed54", "#76B947"],
    plotOptions: {
      pie: {
        depth: 35,
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}",
        },
        showInLegend: true, // Set whether the pie chart is displayed in the legend
      },
    },
    credits: false,
    series: [
      {
        type: "pie",
        data: [],
      },
    ],
  },
  pie_option3: {
    title: {
      text: "MH Defects",
    },
    type: "pie",
    options3d: {
      enabled: true, //Use 3d function
      alpha: 45,
      beta: 15,
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "{point.label}: <b>{point.total}</b>",
    },
    colors: [
      "#488f31",
      "#83af70",
      "#bad0af",
      "#f1f1f1",
      "#f0b8b8",
      "#e67f83",
      "#de425b",
    ],
    plotOptions: {
      pie: {
        depth: 35,
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}",
        },
        showInLegend: true, // Set whether the pie chart is displayed in the legend
      },
    },
    credits: false,
    series: [
      {
        type: "pie",
        data: [],
      },
    ],
  },
  bar_option: {
    chart: {
      type: "column",
      options3d: {
        enabled: true,
        alpha: 0,
        beta: 5,
        depth: 50,
        viewDistance: 25,
      },
    },
    legend: {
      /* layout: "vertical",
      align: "right",
      verticalAlign: "top",
      y: 10,
      x: 10,*/
      enabled: false,
    },
    xAxis: {
      type: "category",
    },
    tooltip: {
      pointFormat: "<b>{point.y}</b>",
    },
    title: {
      style: {
        color: "#264991",
      },
      text: "Testcases Count per Feature",
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
        },
        depth: 45,
      },
    },

    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Features",
        data: [],
      },
    ],
  },
  role_bar_option: {
    chart: {
      type: "column",
    },
    legend: {
      /* align: "right",
      verticalAlign: "top",
      layout: "vertical",
      y: 10,
      x: 10,*/
      enabled: false,
    },
    xAxis: {
      type: "category",
    },
    tooltip: {
      pointFormat: "<b>{point.y}</b>",
    },
    title: {
      style: {
        color: "#264991",
      },
      text: "Testcases per Role",
    },
    plotOptions: {
      column: {
        depth: 20,
        dataLabels: {
          enabled: true,
        },
        grouping: false,
      },
    },

    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Roles",
        data: [],
      },
    ],
  },
  platform_bar_option: {
    chart: {
      type: "column",
    },
    legend: {
      /* align: "right",
      verticalAlign: "top",
      layout: "vertical",
      y: 10,
      x: 10,*/
      enabled: false,
    },
    xAxis: {
      type: "category",
    },
    tooltip: {
      pointFormat: "<b>{point.y}</b>",
    },
    title: {
      style: {
        color: "#264991",
      },
      text: "Testcases per Platform",
    },
    plotOptions: {
      column: {
        depth: 20,
        dataLabels: {
          enabled: true,
        },
        grouping: false,
      },
    },

    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Platforms",
        data: [],
      },
    ],
  },
  platformRole_bar_option: {
    chart: {
      type: "column",
    },
    legend: {
      /* align: "right",
      verticalAlign: "top",
      layout: "vertical",
      y: 10,
      x: 10,*/
      enabled: false,
    },
    xAxis: {
      type: "category",
    },
    tooltip: {
      pointFormat: "<b>{point.y}</b>",
    },
    title: {
      style: {
        color: "#264991",
      },
      text: "Per Platform Role",
    },
    plotOptions: {
      column: {
        depth: 20,
        dataLabels: {
          enabled: true,
        },
        grouping: false,
      },
    },

    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Platform Roles",
        data: [],
      },
    ],
  },
  platformRole_bar_option: {
    chart: {
      type: "column",
    },
    legend: {
      /* align: "right",
      verticalAlign: "top",
      layout: "vertical",
      y: 10,
      x: 10,*/
      enabled: false,
    },
    xAxis: {
      type: "category",
    },
    tooltip: {
      pointFormat: "<b>{point.y}</b>",
    },
    title: {
      style: {
        color: "#264991",
      },
      text: "Per Platform Role",
    },
    plotOptions: {
      column: {
        depth: 20,
        dataLabels: {
          enabled: true,
        },
        grouping: false,
      },
    },

    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Platform Roles",
        data: [],
      },
    ],
  },
  quality_platformRole_bar_option: {
    chart: {
      type: "column",
    },
    /*  legend: {
      align: "right",
      verticalAlign: "top",
      layout: "vertical",
      y: 30,
    },*/
    xAxis: {
      type: "category",
    },
    title: {
      style: {
        color: "#264991",
      },
      text: "Quality",
    },
    plotOptions: {
      column: {
        depth: 20,
        dataLabels: {
          enabled: true,
        },
        grouping: false,
      },
    },
    legend: {
      enabled: false,
    },

    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Quality Per Platform Roles",
        data: [],
      },
    ],
  },
  quality_platformRole_bar_option1: {
    chart: {
      type: "column",
    },
    /*  legend: {
      align: "right",
      verticalAlign: "top",
      layout: "vertical",
      y: 30,
    },*/
    xAxis: {
      type: "category",
    },
    title: {
      style: {
        color: "#264991",
      },
      text: "Quality",
    },
    plotOptions: {
      column: {
        grouping: false,
      },
    },
    legend: {
      enabled: false,
    },

    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Quality Per Platform",
        data: [],
      },
    ],
  },
  quality_role_bar_option: {
    chart: {
      type: "column",
    },
    /*  legend: {
      align: "right",
      verticalAlign: "top",
      layout: "vertical",
      y: 30,
    },*/
    xAxis: {
      type: "category",
    },
    title: {
      style: {
        color: "#264991",
      },
      text: "Quality",
    },
    plotOptions: {
      column: {
        grouping: false,
      },
    },
    legend: {
      enabled: false,
    },

    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Quality Per Roles",
        data: [],
      },
    ],
  },
  testcases_defects_by_users_bar_option: {
    chart: {
      type: "column",
      backgroundColor: null,
      stacking: "normal",
    },

    /*  legend: {
      align: "right",
      verticalAlign: "top",
      layout: "vertical",
      y: 30,
    },*/
    xAxis: {
      categories: [],
    },
    title: {
      style: {
        color: "#264991",
      },
      text: "Testcases Vs Defects",
    },
    plotOptions: {
      column: {
        stacking: "normal",
      },
    },
    legend: {
      enabled: false,
    },

    credits: {
      enabled: false,
    },
    series: [
      {
        name: "",
        data: [],
      },
    ],
  },
  quality_platformRole_bar_option2: {
    chart: {
      type: "column",
    },
    /*  legend: {
      align: "right",
      verticalAlign: "top",
      layout: "vertical",
      y: 30,
    },*/
    xAxis: {
      type: "category",
    },
    title: {
      style: {
        color: "#264991",
      },
      text: "Quality",
    },
    plotOptions: {
      column: {
        grouping: false,
      },
    },
    legend: {
      enabled: false,
    },

    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Quality Per Roles",
        data: [],
      },
    ],
  },
  quality_platformRole_bar_option3: {
    chart: {
      type: "column",
    },
    /*  legend: {
      align: "right",
      verticalAlign: "top",
      layout: "vertical",
      y: 30,
    },*/
    xAxis: {
      type: "category",
    },
    title: {
      style: {
        color: "#264991",
      },
      text: "Quality",
    },
    plotOptions: {
      column: {
        grouping: false,
      },
    },
    legend: {
      enabled: false,
    },

    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Quality Per Feature",
        data: [],
      },
    ],
  },
  quality_platformRole_bar_option4: {
    chart: {
      type: "column",
    },
    /*  legend: {
      align: "right",
      verticalAlign: "top",
      layout: "vertical",
      y: 30,
    },*/
    xAxis: {
      type: "category",
    },
    title: {
      style: {
        color: "#264991",
      },
      text: "Quality",
    },
    plotOptions: {
      column: {
        grouping: false,
      },
    },
    legend: {
      enabled: false,
    },

    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Quality Per Source",
        data: [],
      },
    ],
  },
  userOption: {
    chart: {
      borderColor: "#fff",
      type: "packedbubble",
      plotBorderWidth: 0,
    },
    legend: {
      enabled: false,
    },
    title: {
      text: "Resources",
    },
    plotOptions: {
      packedbubble: {
        dataLabels: {
          enabled: true,
          format: "{point.name}",
          style: {
            color: "black",
            textOutline: "none",
            fontWeight: "normal",
          },
        },
        minPointSize: 5,
      },
    },
    tooltip: {
      pointFormat: "<b>{point.name}</b>",
    },
    credits: false,
    series: [
      {
        name: "Resources",
        data: [],
      },
    ],
  },
  summaryOptions: {
    title: {
      text: "Execution Summary",
    },
    type: "pie",
    options3d: {
      enabled: true, //Use 3d function
      alpha: 45,
      beta: 0,
    },
    tooltip: {
      style: { "font-size": "14px" },
      pointFormat: "{point.label}: <b>{point.y}</b>",
    },
    plotOptions: {
      pie: {
        depth: 45,
        size: 200,
        allowPointSelect: true,
        innerSize: 70,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}",
        },
        showInLegend: false, // Set whether the pie chart is displayed in the legend
      },
    },
    credits: false,
    series: [
      {
        type: "pie",
        data: [],
        point: {
          events: {},
        },
      },
    ],
  },
  summaryOptions1: {
    title: {
      text: "Projected Summary",
    },
    type: "pie",
    options3d: {
      enabled: true, //Use 3d function
      alpha: 45,
      beta: 15,
    },
    tooltip: {
      pointFormat: "{point.label}: <b>{point.y}</b>",
    },
    colors: ["#76B947", "#F51720", "#ECF87F", "#A49393"],
    plotOptions: {
      pie: {
        depth: 35,
        size: 200,
        innerSize: 100,
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}",
        },
        showInLegend: false, // Set whether the pie chart is displayed in the legend
      },
    },
    credits: false,
    series: [
      {
        type: "pie",
        data: [],
      },
    ],
  },
  summaryOptions2: {
    title: {
      text: "Quality",
    },
    type: "pie",
    options3d: {
      enabled: true, //Use 3d function
      alpha: 45,
      beta: 0,
    },
    tooltip: {
      pointFormat: "{point.label}: <b>{point.total}</b>",
    },
    plotOptions: {
      pie: {
        depth: 45,
        size: 170,
        allowPointSelect: true,
        innerSize: 70,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}",
        },
        showInLegend: true, // Set whether the pie chart is displayed in the legend
      },
    },
    credits: false,
    series: [
      {
        type: "pie",
        data: [],
      },
    ],
  },
  cdetsOptions1: {
    title: {
      text: "CVT defects by Component",
    },
    type: "pie",
    options3d: {
      enabled: true, //Use 3d function
      alpha: 45,
      beta: 15,
    },
    legend: {
      align: "right",
      verticalAlign: "top",
      layout: "vertical",
      y: 30,
    },
    tooltip: {
      pointFormat: "{point.label}: <b>{point.total}</b>",
    },
    colors: [
      "#003f5c",
      "#2f4b7c",
      "#665191",
      "#a05195",
      "#d45087",
      "#f95d6a",
      "#ff7c43",
      "#ffa600",
    ],
    plotOptions: {
      pie: {
        depth: 35,
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}",
        },
        showInLegend: false, // Set whether the pie chart is displayed in the legend
      },
    },
    credits: false,
    series: [
      {
        type: "pie",
        point: {
          events: {
            click: (e) => {
              debugger;
              this.emitToParent(e, "component");
            },
          },
        },
        data: [],
      },
    ],
  },
  cdetsOptions2: {
    title: {
      text: "CVT defects by Submitter",
    },
    type: "pie",
    options3d: {
      enabled: true, //Use 3d function
      alpha: 45,
      beta: 15,
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      y: 30,
    },
    tooltip: {
      pointFormat: "{point.label}: <b>{point.total}</b>",
    },
    colors: [
      "#488f31",
      "#83af70",
      "#bad0af",
      "#f1f1f1",
      "#f0b8b8",
      "#e67f83",
      "#de425b",
    ],
    plotOptions: {
      pie: {
        depth: 35,
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}",
        },
        showInLegend: false, // Set whether the pie chart is displayed in the legend
      },
    },
    credits: false,
    series: [
      {
        type: "pie",
        data: [],
      },
    ],
  },
  cdetsOptions3: {
    title: {
      text: "CVT defects by Status",
    },
    type: "pie",
    options3d: {
      enabled: true, //Use 3d function
      alpha: 45,
      beta: 15,
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      y: 30,
    },
    tooltip: {
      pointFormat: "{point.label}: <b>{point.total}</b>",
    },
    colors: ["#F47A1F", "#FDBB2F", "#377B2B", "#7AC142", "#007CC3", "#00529B"],
    plotOptions: {
      pie: {
        depth: 35,
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}",
        },
        showInLegend: false, // Set whether the pie chart is displayed in the legend
      },
    },
    credits: false,
    series: [
      {
        type: "pie",
        data: [],
      },
    ],
  },
  pie_option1: {
    title: {
      text: "Defect Breakdown",
    },
    type: "pie",
    options3d: {
      enabled: true, //Use 3d function
      alpha: 45,
      beta: 15,
    },
    tooltip: {
      pointFormat: "{point.label}: <b>{point.total}</b>",
    },
    colors: ["#00bdeb", "#65bce4", "#005073", "#007dad"],
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 35,
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}",
        },
        showInLegend: false, // Set whether the pie chart is displayed in the legend
      },
    },
    credits: false,
    series: [
      {
        type: "pie",
        data: [],
      },
    ],
  },
  pie_option2: {
    title: {
      text: "Source",
    },
    type: "pie",
    options3d: {
      enabled: true, //Use 3d function
      alpha: 45,
      beta: 15,
    },
    tooltip: {
      pointFormat: "{point.label}: <b>{point.total}</b>",
    },
    colors: ["#F47A1F", "#FDBB2F", "#377B2B", "#7AC142"],
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 35,
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}",
        },
        showInLegend: true, // Set whether the pie chart is displayed in the legend
      },
    },
    credits: false,
    series: [
      {
        type: "pie",
        data: [],
      },
    ],
  },
  cvtOptions: {
    chart: {
      zoomType: "xy",
    },
    title: {
      text: "CVT Report",
      align: "center",
    },
    credits: false,

    xAxis: [
      {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        crosshair: true,
      },
    ],
    yAxis: [
      {
        // Primary yAxis
        labels: {
          format: "{value}",
          style: {
            color: colors[2],
          },
        },
        title: {
          text: "MH have",
          style: {
            color: colors[2],
          },
        },
        opposite: true,
      },
      {
        // Secondary yAxis
        gridLineWidth: 0,
        title: {
          text: "CVT Observed",
          style: {
            color: colors[0],
          },
        },
        labels: {
          format: "{value}",
          style: {
            color: colors[0],
          },
        },
      },
      {
        // Tertiary yAxis
        gridLineWidth: 0,
        title: {
          text: "CVT Found",
          style: {
            color: colors[1],
          },
        },
        labels: {
          format: "{value}",
          style: {
            color: colors[1],
          },
        },
        opposite: true,
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {
      layout: "vertical",
      align: "left",
      x: 80,
      verticalAlign: "top",
      y: 55,
      floating: true,
      backgroundColor: "rgba(255,255,255,0.25)",
    },
    series: [
      {
        name: "MH have",
        type: "column",
        yAxis: 1,
        data: [70, 90, 120, 130, 150, 180, 140, 138, 120, 100, 55, 45],
      },
      {
        name: "CVT Found",
        type: "spline",
        yAxis: 2,
        data: [49, 71, 106, 120, 134, 150, 135, 148, 96, 94, 95, 54],
        marker: {
          enabled: false,
        },
        dashStyle: "shortdot",
      },
      {
        name: "CVT Observed",
        type: "spline",
        data: [55, 80, 120, 135, 150, 182, 150, 152, 106, 100, 100, 60],
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              floating: false,
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
              x: 0,
              y: 0,
            },
            yAxis: [
              {
                labels: {
                  align: "right",
                  x: 0,
                  y: -6,
                },
                showLastLabel: false,
              },
              {
                labels: {
                  align: "left",
                  x: 0,
                  y: -6,
                },
                showLastLabel: false,
              },
              {
                visible: false,
              },
            ],
          },
        },
      ],
    },
  },
  splineOptions: {
    chart: {
      type: "spline",
    },
    credits: false,

    legend: {
      symbolWidth: 40,
    },

    title: {
      text: "Testcase Quality",
    },
    yAxis: {
      title: {
        text: "Number of Testcases",
      },
      accessibility: {
        description: "Number of Testcases",
      },
    },

    xAxis: {
      title: {
        text: "Time",
      },
      accessibility: {
        description: "Time from September 2020 to September 2021",
      },
      categories: [
        "September 2020",
        "November 2020",
        "January 2021",
        "March 2021",
        "May 2021",
        "July 2021",
      ],
    },

    tooltip: {
      valueSuffix: "%",
    },

    plotOptions: {
      series: {
        point: {
          events: {
            /*click: function() {
              window.location.href = this.series.options.website;
            },*/
          },
        },
        // cursor: "pointer",
      },
    },

    series: [
      {
        name: "Planned",
        data: [34.8, 43.0, 51.2, 41.4, 64.9, 72.4],
        color: colors[2],
      },
      {
        name: "Actual",
        data: [69.6, 63.7, 63.9, 43.7, 66.0, 61.7],
        dashStyle: "ShortDashDot",
        color: colors[0],
      },
      {
        name: "Pass",
        data: [20.2, 30.7, 36.8, 30.9, 39.6, 47.1],
        dashStyle: "ShortDot",
        color: colors[1],
      },
      {
        name: "Fail",
        data: [null, null, null, null, 21.4, 30.3],
        dashStyle: "Dash",
        color: colors[9],
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 550,
          },
          chartOptions: {
            chart: {
              spacingLeft: 3,
              spacingRight: 3,
            },
            legend: {
              itemWidth: 150,
            },
            xAxis: {
              categories: [
                "September 2020",
                "November 2020",
                "January 2021",
                "March 2021",
                "May 2021",
                "July 2021",
              ],
              title: "",
            },
            yAxis: {
              visible: false,
            },
          },
        },
      ],
    },
  },
};
