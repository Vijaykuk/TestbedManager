<script>
import { router } from "@/router";
import { store } from "../store/store";
import TestcaseList from "./testcaseList";
import { options } from "@/assets/options";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment-timezone";
import { testcaseService } from "@/core/services/testcaseService";
import ContextMenu from "../components/global/ContextMenu/ContextMenu";
import { Tabs, Tab } from "vue-tabs-component";
import ContextMenuItem from "../components/global/ContextMenu/ContextMenuItem";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import Chart from "./Chart";
import GanttChart from "./GanttChart";

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

export default {
  name: "CustomerReleasesPage",
  props: {customerId: {
      type: Number,
      // Object or array defaults must be returned from
      // a factory function
      default: function () {
        return 1;
      }
    }},
  data() {
    return {
      cfdsLoaded:false,
      lang: {
        days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: [
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
        placeholder: {
          date: "Select Date",
          dateRange: "Select Date Range",
        },
      },
      weeklyReport:[],
      oneLineGantt:false,
      format:"YYYY-MM-DDTHH:mm:ss",
      chartShow:true,
      deleteObj:{},
      deleteConfirmed:false,
      deleteType:"",
      showExecutionPie:false,
      modalConfirmMessage:"",
      deleteConfirmParams:[],
      deleteConfirmFunction:"",
      showConfirmModal:false,
      testcases:[],
      releaseDetails:{},
      selectedTestcases:[],
      testcaseDefects:[],
      selectedRelId: "",
      addCFD:false,
      selectedCFDRelease:"",
      cfdFeatureDataList:[],
      pagination: false,
      custReleaseArray:[],
      cfdPageNumber: 0,
      showCFDModal: false,
      cfdDataList: [],
      selectedPrId: "",
      releaseFlag: "folder",
      folderName:"",
      showTestcases: false,
      sidebarHidden: true,
      totalTestcases: 0,
      totalFeatures: 0,
      totalDuration: 0,
      totalCompletedDuration: 0,
      totalDefects: 0,
      day:1000 * 60 * 60 * 24,
      totalAutomated:0,
      showPie:true,
      totalPlatforms: 0,
      totalExecuted:0,
      totalQuality:0,
      totalRoles: 0,
      totalRegression: 0,
      totalCFD: 0,
      featureSummary: {},
      testcaseDefectSummary:{},
      roleSummary: {},
      platformRoleSummary:{},
      platformSummary: {},
      srcSummary:{},
      userSummary:{},
      cfdSummary: {},
      defectSummary: {},
      qualitySummary:[],
      qualityPlatformSummary:[],
      qualityProjectedPlatformSummary:[],
      qualityRoleSummary:[],
      qualityFeatureSummary:[],
      qualitySrcSummary:[],
      testcasesWithLogs: 0,
      selectedRelease: "",
      selectedReleaseName: "",
      folder_name: "",
      folders: [],
      folderList: [],
      releases: [],
      releaseObj: {
        start_date:new Date(),
      },
      project_obj: {},
      error: false,
      errorMessage: "",
      loading: false,
      loadingMessage: "",
      modalInfoMessage: "",
      showInfoModal: false,
      showInfoModalClass: "",
      showErrorModal: false,
      modalErrorMessage: "",
      customerName: "",
      createUpdateRelName:"Create",
      showCreateReleaseModal: false,
      showEventModalflag:false,
      eventObj:{
        release_id:"",
        event_name:"",
        event_start_date:null,
        event_end_date:null,
        event_description:""
      },
      showCreateProjectModal: false,
      editProject: false,
      editRelease:false,
      projects: {},
      featureOption: {},
      platformRoleOption:{},
      showSummaryInfoModal: false,
      showCFDSummaryInfoModal: false,
      summaryInfoTitle: "",
      summaryDetailsObj: {},
      summaryInfoArray: [],
      chart_slides: [],
      cdets: [],
      mhDefects:[],
      cdetsReleaseFolderName:"",
      testcaseCdets:[],
      selectedCdets:[],
      selectedCdetsCopy:[],
      cdetsBySubmitter: [],
      cdetsByComponents: [],
      testcaseCdetsByComponents:[],
      cdetsByStatus: [],
      cdets_submitter_data: [],
      cdets_component_data: [],
      testcase_cdets_component_data:[],
      cdets_status_data: [],
      componentOption: {},
      submitterOption: {},
      mhOption:{},
      statusOption: {},
      testcasesFlag:0,
      qualityOption:{},
       qualityPlatformOption:{},
        qualityRoleOption:{},
        qualityFeatureOption:{},
        qualitySrcOption:{},
      srcOption:{},
      syncFlag: 0,
     pie_option:options.pie_option,
     pie_option2:options.pie_option2,
      platformRoleColors:[
         "#F47A1F",
          "#FDBB2F",
          "#377B2B",
          "#7AC142",
          "#007CC3",
          "#00529B",
        "#00876c",
"#40986e",
"#66a871",
"#89b875",
"#adc77b",
"#d1d585",
"#f5e392",
"#f3ca79",
"#f1b066",
"#ed9558",
"#e77a51",
"#df5d4f",
"#d43d51"
      ],
      featureColors: [
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
      ],
      ganttOptions:{
         chart: {
        spacingLeft: 1
    },
        title: {
        text: 'Project Plan'
    },
    yAxis:{
type:"category"
    },
     credits: false,
    xAxis:{
        type: 'datetime',
       
        labels: {
           style: {
          "font-size":"10px"
        },
            format: '{value:%Y-%m-%d}',
            rotation: 30,
            borderWidth:0
         }
    },
     tooltip: {
        xDateFormat: '%a %b %d'
    },
   /*  yAxis: {
        type: 'category',
        categories: ['Phase'],
      
    },*/
     plotOptions: {
        series: {
            animation: false, // Do not animate dependency connectors
            dragDrop: {
                draggableX: true,
                draggableY: true,
                dragMinY: 0,
                dragMaxY: 2,
                dragPrecisionX: this.day / 3 // Snap to eight hours
            },
            dataLabels: {
                enabled: true,
                format: '{point.name} {point.completed.amount}',
                style: {
                    color:"#000",
                    cursor: 'default',
                    pointerEvents: 'none'
                }
            },
            allowPointSelect: true,
            point: {
                events: {
                    select: this.updateRemoveButtonStatus,
                    unselect: this.updateRemoveButtonStatus,
                    remove: this.updateRemoveButtonStatus
                }
            }
        }
    },
   series:[]
},
      cvtOptions: {
    chart: {
      zoomType: "xy",
    },
    title: {
      text: "Defect Chart",
      align: "center",
    },
    credits: false,

    xAxis: {
        categories: [
        
        ],
         rotation: -45,
          crosshair: true,
       },
   yAxis: 
      {
        // Primary yAxis
       
        title: {
          text: "Count",
          style: {
            color: colors[2],
          },
        },
      }
      /*,
      {
        // Secondary yAxis
        gridLineWidth: 0,
        title: {
          text: "Observed",
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
          text: "Found",
          style: {
            color: colors[1],
          },
        },
       
      },*/
    ,
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
        data: [],
      },
      {
        name: "CVT Found",
        type: "spline",
        yAxis: 2,
        data: [],
        marker: {
          enabled: false,
        },
        dashStyle: "shortdot",
      },
      {
        name: "CVT Observed",
        type: "spline",
        data: [],
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
      text: "Execution Chart",
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
       
      ],
    },

    tooltip: {
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

    series: [],

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
      bar_option:{
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
  cdets_Options1:{
        chart: {
        type: 'cylinder',
        options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            depth: 50,
            viewDistance: 25
        }
    },
    xAxis: {
      categories: [],
    },
    title: {
        text: 'CVT defects'
    },
     subtitle: {
      text: "By Component",
    },
     credits: false,
    plotOptions: {
        series: {
            depth: 25,
            colorByPoint: true
        },
        showInLegend:false
    },
       series: []

       },
       cdetsOptions1: {
         title: {
      text: "CVT defects",
    },
    subtitle: {
      text: "By Component",
    },
    type: "pie",
    options3d: {
      enabled: true, //Use 3d function
      alpha: 45,
      beta: 15,
    },
    legend: {
     enable:false,
    },
    tooltip: {
      pointFormat: "{point.label}: <b>{point.y}</b>",
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
              this.updateSelectedCdetsList(e, "component");
            },
          },
        },
        data: [],
      },
    ],
  },
  cdetsOptions2: {
    title: {
      text: "CVT defects",
    },
    subtitle: {
      text: "By Submitter",
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
         point: {
          events: {
            click: (e) => {
              this.updateSelectedCdetsList(e, "submitter");
            },
          },
        },
        data: [],
      },
    ],
  },
  cdetsOptions3: {
    title: {
      text: "CVT defects",
    },
    subtitle: {
      text: "By Status",
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
         point: {
          events: {
            click: (e) => {
              this.updateSelectedCdetsList(e, "status");
            },
          },
        },
        data: [],
      },
    ],
  },
     pie_option1:{
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
      pointFormat: "{point.label}: <b>{point.y}</b>",
    },
    colors: ["#00bdeb", "#3846ae", "#005073", "#007dad"],
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
     pie_option3:{
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
      pointFormat: "{point.label}: <b>{point.y}</b>",
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
    platformRole_bar_option:{
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
      role_bar_option:{
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
      platform_bar_option:{
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
      quality_role_bar_option:{
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
      quality_platformRole_bar_option:{
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
      quality_platformRole_bar_option1:{
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
      quality_platformRole_bar_option2:{
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
      quality_platformRole_bar_option3:{
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
      quality_platformRole_bar_option4:{
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
      testcases_defects_by_users_bar_option:{
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
        pointPadding: 0.2,
        borderWidth: 0,
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
      userOption:{
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
      summaryOptions:{
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
          events: {
             click: (e) => {
              this.updateTestcasesForExecutionSummary(e);
            },
          },
        },
      },
    ],
  },
      summaryOptions1:{
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
        point: {
          events: {
             click: (e) => {
              this.updateTestcasesForProjectedExecutionSummary(e);
            },
          },
        },
      },
    ],
  },
       summaryOptions2:{
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
      pointFormat: "{point.label}: <b>{point.y}</b>",
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
      timeLineOption:options.timeLineOption,
      platformOption: {},
      mhHaveOption:{},
      defectOption:{},
      roleOption: {},
      roleOption1:{},
      executionSummaryOption: {},
      executionSummaryOption1: {},
      testcaseDefectsByUsersOption:{},
    };
  },
  components: {
    ContextMenu,
    ContextMenuItem,
    DatePicker,
    Chart,
    GanttChart,
    Splide,
    SplideSlide,
    TestcaseList,
     tabs: Tabs,
    tab: Tab,
  },
  directives: {
    tabs: Tabs.directive,
    tab: Tab.directive,
  },
  mounted() {
    this.loadCustomerDetails();
    this.loadReleases();
    //this.loadCFDS();
  
    },
  computed: {
     cfdHasPrevious() {
      if (this.cfdPageNumber <= 0) return false;
      else return true;
    },
    cfdHasNext() {
      if (this.cfdPageNumber >= this.cfdPageCount - 1) return false;
      else return true;
    },
    cfdPageCount() {
      return Math.ceil(this.cfdFeatureDataList.length / 10);
    },
      cfdHasPagination() {
      if (this.cfdFeatureDataList.length > 10) {
        return true;
      } else {
        return false;
      }
    },
    cfdPaginatedData() {
      if (this.cfdFeatureDataList.length > 0) {
        let arr = JSON.parse(JSON.stringify(this.cfdFeatureDataList));
        let start = this.cfdPageNumber * 10;
        let end =
          start + 10 > this.cfdFeatureDataList.length
            ? this.cfdFeatureDataList.length
            : start + 10;

        let arr1 = [];
        for (let i = start; i < end; i++) {
          arr[i]["index"]=i+1;
          arr1.push(arr[i]);
        }
        return arr1;
      }
      return [];
    },
  },
  methods: {
    onChildInteraction(args, payload) {
      switch (args) {
        case "showDashboard":
        //  this.showTestcases = false;
          break;
        case updateSelectedTestcases:
          updateSelectedTestcases(payload);
      }
    },
    goToPage(num) {
      this.cfdPageNumber = num - 1;
    },
    paginationClass(num) {
      if (this.cfdPageNumber === num - 1) return "activePage";
      else return "inactivePage";
    },
    nextPage() {
      if (this.cfdPageNumber <= this.cfdPageCount - 1) {
        this.cfdPageNumber++;
      }
    },
    prevPage() {
      if (this.cfdPageNumber > 0) {
        this.cfdPageNumber--;
      }
    },
    updateCFDClicked(){
      this.addCFDObj={
        defect_id:"",
        customer_release:this.selectedCFDRelease,
        category:"",
        GISO_Version:"",
      };
      this.addCFD=true;
    },
    addCFDClicked(){
      this.addCFDObj={
        defect_id:"",
        customer_release:this.selectedCFDRelease,
        category:"",
        GISO_Version:"",
      };
      this.addCFD=true;
    },
    editCFDClicked(cfdObj){
      this.addCFDObj={
         defect_id:cfdObj.defect_id,
        customer_release:cfdObj.defect_id,
        category:cfdObj.category,
        GISO_Version:cfdObj.GISO_Version,
      }
       this.addCFD=true;
    },
    deleteCFDClicked(cfdObj){
      
    },
    saveCFD(){
      this.loading = false;
      this.loadingMessage = "Adding Cfd";
       testcaseService.addCFD(this.addCFDObj).then(
        (data) => {
          self.loading = false;
          self.loadingMessage = "";
          this.addCFD=false;
      this.addCFDObj={};
      this.loadCFDS();
      },
        (error) => {
          self.loading = false;
          self.loadingMessage = "";
          self.showErrorModal = true;
          self.modalErrorMessage = "Error while loading CFD details";
        }
      );
    },
    CancelCFD(){
      this.addCFD=false;
      this.addCFDObj={};
    },
    updateRemoveButtonStatus(){
      debugger;
    },
    loadCFDS() {
      this.loading = false;
      this.loadingMessage = "Loading Cfds";
      testcaseService.loadCFDDetails().then(
        (data) => {
          this.loading = false;
          this.loadingMessage = "";
          this.cfdsLoaded=true;
          this.cfdDataList = data;
          let custReleases=[];
          for(let i=0;i<this.cfdDataList.length;i++){
           custReleases.push(this.cfdDataList[i].customer_release);
          }
          let custReleaseArray = [...new Set(custReleases)];
          this.custReleaseArray=custReleaseArray;
          this.refreshCFDTab();
        },
        (error) => {
          self.loading = false;
          self.loadingMessage = "";
          self.showErrorModal = true;
          self.modalErrorMessage = "Error while loading CFD details";
        }
      );
    },
    refreshCFDTab(){
     if(this.selectedCFDRelease){
     let tempList=[];
     for(let i=0;i<this.cfdDataList.length;i++){
       if(this.cfdDataList[i].customer_release===this.selectedCFDRelease){
         tempList.push(this.cfdDataList[i]);
       }
     }
     this.cfdFeatureDataList=tempList;
     this.cfdPageNumber=0;
     }
    },
    cfdTabChanged(selectedTab){
     let selectedTabName=selectedTab.tab.name;
     this.selectedCFDRelease=selectedTabName;
     let tempList=[];
     for(let i=0;i<this.cfdDataList.length;i++){
       if(this.cfdDataList[i].customer_release===selectedTabName){
         tempList.push(this.cfdDataList[i]);
       }
     }
     this.cfdFeatureDataList=tempList;
     this.cfdPageNumber=0;
     },
    cfdTabClicked(selectedTab){
       let selectedTabName=selectedTab.tab.name;
       this.selectedCFDRelease=selectedTabName;
     let tempList=[];
     for(let i=0;i<this.cfdDataList.length;i++){
       if(this.cfdDataList[i].customer_release===selectedTabName){
         tempList.push(this.cfdDataList[i]);
       }
     }
     this.cfdFeatureDataList=tempList;
     this.cfdPageNumber=0;
    },
    showTestcaseClicked() {
      this.showTestcases = true;
    },
    loadCustomerDetails() {
      this.loading = true;
      this.loadingMessage = "Loading Customer details...";
      testcaseService.getCustomerById(this.customerId).then(
        (data) => {
          this.loading = false;
          this.loadingMessage = "";
          this.customerName = data.name;
        },
        (error) => {
          this.loading = false;
          this.loadingMessage = "";
        }
      );
    },
    backButtonClicked() {
      router
        .push({
          name: "CustomerListPage",
        })
        .catch(() => {});
    },
   deleteFolderClicked(fname) {
     self1.$refs.fmenu.close();
      if(this.deleteConfirmed===true){
        this.deleteConfirmed=false;
         this.showConfirmModal=false;
        this.deleteType="";
        this.deleteObj={};
        this.modalConfirmMessage="";
      this.$refs.fmenu.close();
      this.loading = true;
      this.loadingMessage = "Deleting Folder..";
      let self = this;
      testcaseService.deleteFolder(fname).then(
        (data) => {
          self.loading = false;
          self.loadingMessage = "";
          self.loadReleases();
        },
        (error) => {
          self.loading = false;
          self.loadingMessage = "";
          self.showErrorModal = true;
          self.modalErrorMessage =
            "Error while deleting Folder, Please try again later";
        }
      );
       }
      else{
        this.showConfirmModal=true;
         this.deleteType="folder";
        this.deleteObj={"name":fname};
        this.modalConfirmMessage="Are you sure you want to delete "+fname;
      }
    },
    deleteReleaseClicked(robj) {
      this.$refs.rmenu.close();
      if(this.deleteConfirmed===true){
        this.deleteObj={};
        this.deleteConfirmed=false;
         this.showConfirmModal=false;
        this.deleteType="";
       this.modalConfirmMessage="";
      this.$refs.rmenu.close();
      this.loading = true;
      this.loadingMessage = "Deleting Release..";
      let self = this;
      testcaseService.deleteRelease(robj.rid).then(
        (data) => {
          self.loading = false;
          self.loadingMessage = "";
          self.loadReleases();
        },
        (error) => {
          self.loading = false;
          self.loadingMessage = "";
          self.showErrorModal = true;
          self.modalErrorMessage =
            "Error while deleting Release, Please try again later";
        }
      );
      }
      else{
        this.showConfirmModal=true;
        this.deleteType="release"
        this.deleteObj=robj;
        this.modalConfirmMessage="Are you sure you want to delete "+robj.rname;
      }
      event.preventDefault();
    },
    EditProjectClicked(e, pObj) {
      this.$refs.pmenu.close();
      this.project_obj["name"] = pObj.pname;
      this.project_obj["id"] = pObj.pid;
      this.project_obj["tims_id"] = pObj.timsId;
      this.project_obj["r_id"] = pObj.rid;
      this.project_obj["r_name"] = pObj.rname;
      this.editProject = true;
      this.showCreateProjectModal = true;
      e.preventDefault();
    },
    syncBtnClicked(e, proj) {
      this.$refs.pmenu.close();
      this.loading = true;
      this.loadingMessage = "Sync with Tims in progress..";
      testcaseService.projectSyncWithTims(proj.pid).then(
        (data) => {
          this.loading = false;
          this.loadingMessage = "";
          this.showInfoModal = true;
          this.syncFlag += 1;
          this.modalInfoMessage = "Sync with Tims completed.";
        },
        (error) => {
          this.loading = false;
          this.loadingMessage = "";
          this.showErrorModal = true;
          this.modalErrorMessage = "Error while sync, Please try again later";
        }
      );
      e.preventDefault();
    },
    relSyncBtnClicked(robj){
       this.$refs.rmenu.close();
      this.loading = true;
      this.loadingMessage = "Sync with Tims in progress..";
      testcaseService.releaseSyncWithTims(robj.rid).then(
        (data) => {
          this.loading = false;
          this.loadingMessage = "";
          this.showInfoModal = true;
          this.syncFlag += 1;
          this.modalInfoMessage = "Sync with Tims completed.";
        },
        (error) => {
          this.loading = false;
          this.loadingMessage = "";
          this.showErrorModal = true;
          this.modalErrorMessage = "Error while sync, Please try again later";
        }
      );
      e.preventDefault();
    },
    uploadRelSyncBtnClicked(e,robj){
      
        this.$refs.rmenu.close();
      this.loading = true;
      this.loadingMessage = "Sync with Tims in progress..";
      testcaseService.uploadReleaseSyncWithTims(robj.rid).then(
        (data) => {
          this.loading = false;
          this.loadingMessage = "";
          this.showInfoModal = true;
          this.syncFlag += 1;
          this.modalInfoMessage = "Sync with Tims completed.";
        },
        (error) => {
          this.loading = false;
          this.loadingMessage = "";
          this.showErrorModal = true;
          this.modalErrorMessage = "Error while sync, Please try again later";
        }
      );
      e.preventDefault();
    },
     uploadPrSyncBtnClicked(e,pobj){
      this.$refs.rmenu.close();
      this.loading = true;
      this.loadingMessage = "Sync with Tims in progress..";
      testcaseService.uploadProjectSyncWithTims(pobj.pid).then(
        (data) => {
          this.loading = false;
          this.loadingMessage = "";
          this.showInfoModal = true;
          this.syncFlag += 1;
          this.modalInfoMessage = "Sync with Tims completed.";
        },
        (error) => {
          this.loading = false;
          this.loadingMessage = "";
          this.showErrorModal = true;
          this.modalErrorMessage = "Error while sync, Please try again later";
        }
      );
      e.preventDefault();
    },
    deleteProjectClicked(pobj) {
       this.$refs.pmenu.close();
      if(this.deleteConfirmed===true){
        this.deleteConfirmed=false;
        this.showConfirmModal=false;
        this.deleteType="";
        this.deleteObj={};
        this.modalConfirmMessage="";
      this.$refs.pmenu.close();
      this.loading = true;
      this.loadingMessage = "Deleting project..";
      let self = this;
      testcaseService.deleteProject(pobj.pid).then(
        (data) => {
          self.loading = false;
          self.loadingMessage = "";
          self.loadReleases();
        },
        (error) => {
          self.loading = false;
          self.loadingMessage = "";
          self.showErrorModal = true;
          self.modalErrorMessage =
            "Error while deleting project, Please try again later";
        }
      );
        }
      else{
        this.showConfirmModal=true;
        this.deleteType="project";
        this.deleteObj=pobj;
        this.modalConfirmMessage="Are you sure you want to delete "+pobj.pname;
      }
      event.preventDefault();
    },
    showCFDTable() {
      this.showCFDModal = true;
    },
    closeCFDModal(e) {
      this.showCFDModal = false;
      e.preventDefault();
    },
    loadCFDCount(type,id){
      testcaseService.getCFDCount(type,id).then(
        (data) => {
          this.loading = false;
          this.loadingMessage = "";
         this.totalCFD=data.count;
        },
        (error) => {
          this.loading = false;
          this.loadingMessage = "";
          this.showErrorModal = true;
          this.modalErrorMessage = "Error while loading cfd count";
        });
    },
    calculateCFDSummary(){
      let testcases=this.testcases,
       testcaseCFD = [];
      for (let i = 0; i < testcases.length; i++) {
        let tempStr = testcases[i].tc_cfd ? testcases[i].tc_cfd.split(",") : [];
        testcaseCFD = testcaseCFD.concat(tempStr);
        for(let r=0;r<testcaseCFD.length;r++){
          testcaseCFD[r]=testcaseCFD[r].trim(); 
        }
      }
      let allCFD = [...new Set(testcaseCFD)];
      this.totalCFD = allCFD.length;

      let cfdSummaryDetails = {};
      for (let l = 0; l < allCFD.length; l++) {
        cfdSummaryDetails[allCFD[l]] = { count:0, headline:"", component:"", product:"",testcaseId:[]};
      }
      let temp124 = [];
      for (let kb = 0; kb < testcases.length; kb++) {
        temp124 = testcases[kb].tc_cfd ? testcases[kb].tc_cfd.split(",") : [];
        for (let b = 0; b < temp124.length; b++) {
          temp124[b]=temp124[b].trim();
        }
        for (let s = 0; s < temp124.length; s++) {
         cfdSummaryDetails[temp124[s]]["count"]+=1;
        cfdSummaryDetails[temp124[s]]["testcaseId"].push(testcases[kb].id);
          for(let h=0;h<this.cfdDataList.length;h++){
            if(this.cfdDataList[h].defect_id===temp124[s]){
              cfdSummaryDetails[temp124[s]]["headline"]=this.cfdDataList[h].headline;
              cfdSummaryDetails[temp124[s]]["component"]=this.cfdDataList[h].component;
              cfdSummaryDetails[temp124[s]]["product"]=this.cfdDataList[h].product;
            }
          }
        }
      }
      this.cfdSummary = cfdSummaryDetails; 
    },
    loadSummaryData(testcases) {
      let testcaseDuration = 0,
        testcasefeatures = [],
        testcaseCompletedDuration = 0,
        testcasePlatforms = [],
        testcaseDefects = [],
        testcaseCFD = [],
        testcaseRoles = [],
        testcasesWithLogs = 0,
        testcasesRegression = 0,
        totalAutomated=0,
        testcaseUsers=[],
        testcaseSrc=[],
        testcaseExecuted=0,
        testcasePassed=0,
        platformRoles=[];
        
      for (let i = 0; i < testcases.length; i++) {
        if(testcases[i].tc_result != "pending" ){
            testcaseExecuted+=1;
          }
         if((testcases[i].tc_result === "pass" ||
          testcases[i].tc_result === "passed" || testcases[i].tc_result === "passx") && testcases[i].tc_result!="dropped"){
            testcasePassed+=1;
          }
        testcasefeatures.push(testcases[i].tc_feature);
        testcaseDuration += testcases[i].tc_duration;
        testcasePlatforms.push(testcases[i].tc_platform);
        testcaseUsers.push(testcases[i].tc_testExecOwner);
        testcaseSrc.push(testcases[i].tc_source);
        platformRoles.push(testcases[i].tc_platform+"_"+testcases[i].tc_role);
        let tempStr = testcases[i].tc_cfd ? testcases[i].tc_cfd.split(",") : [];
        testcaseCFD = testcaseCFD.concat(tempStr);
        for(let r=0;r<testcaseCFD.length;r++){
          testcaseCFD[r]=testcaseCFD[r].trim(); 
        }
        let tempStr1 = testcases[i].tc_defects
          ? testcases[i].tc_defects.split(",")
          : [];
        if(tempStr1.length){
          for(let x=0;x<tempStr1.length;x++){
           tempStr1[x]=tempStr1[x].substring(0,10);
          }
          testcaseDefects = testcaseDefects.concat(tempStr1);
        }
       testcaseRoles.push(testcases[i].tc_role);

        if (testcases[i].tc_regression === 1) {
          testcasesRegression += 1;
        }
        if(testcases[i].tc_exectution_method &&
          testcases[i].tc_exectution_method === "auto"){
            totalAutomated+=1;
          }
        if (
          (
            testcases[i].tc_logFileName != null &&
            testcases[i].tc_logFileName != undefined &&
            testcases[i].tc_logFileName != "" 
          )
        ) {
          testcasesWithLogs += 1;
        }
      }
    
      let allFeatures = [...new Set(testcasefeatures)];
      let allUsers = [...new Set(testcaseUsers)];
      let allSource=[...new Set(testcaseSrc)];
      this.totalFeatures = allFeatures.length;
      this.totalDuration = testcaseDuration;
      this.totalCompletedDuration = testcaseCompletedDuration;
      let allCFD = [...new Set(testcaseCFD)];
      this.totalCFD = allCFD.length;
      let allDefects = [...new Set(testcaseDefects)];
      this.totalDefects = allDefects.length;
      this.totalAutomated=totalAutomated;
      let allRoles = [...new Set(testcaseRoles)];
      let allPlatformRoles=[...new Set(platformRoles)];
      this.totalRoles = allRoles.length;
      let allPlatforms = [...new Set(testcasePlatforms)];
      this.totalPlatforms = allPlatforms.length;
      this.totalExecuted=parseInt(testcaseExecuted/this.totalTestcases*100);
      this.ganttOptions.series[0].data[1].completed.amount=this.totalExecuted;
      this.totalQuality=parseInt(testcasePassed/this.totalTestcases*100);

      this.totalRegression = testcasesRegression;
      this.testcasesWithLogs = testcasesWithLogs;
      

      let defectByTestcaseOwners=0;
      let testcaseCDETS=[];
      let defectByOthers=0;
      let Str1=this.cdetsReleaseFolderName+"_ss";
      let Str2=this.cdetsReleaseFolderName+"-ss";
      let mhDefects=[];
      for(let ra=0;ra<this.cdets.length;ra++){
        if((this.cdets[ra].status!='R' && this.cdets[ra].status!='C' && this.cdets[ra].status!='M' && this.cdets[ra].status!='J')&&
        (this.cdets[ra].attribute && (this.cdets[ra].attribute.indexOf(Str1)>-1 || this.cdets[ra].attribute && this.cdets[ra].attribute.indexOf(Str2)>-1))){
        
          mhDefects.push(this.cdets[ra]);
        }
       testcaseCDETS.push(this.cdets[ra]);
        if(allUsers.indexOf(this.cdets[ra].submitter)>-1){
          defectByTestcaseOwners+=1;
       }
        else{
          defectByOthers+=1;
        }
      }


      this.mhDefects=mhDefects;
      this.testcaseCdets=testcaseCDETS;
      let testcaseDefectSummaryDeatils=[["Found",defectByTestcaseOwners],["Observed",defectByOthers]];
      this.testcaseDefectSummary=testcaseDefectSummaryDeatils;


      let fesatureSummaryDeatils = {};
      for (let l = 0; l < allFeatures.length; l++) {
        fesatureSummaryDeatils[allFeatures[l]] = 0;
      }
      for (let k = 0; k < testcases.length; k++) {
        fesatureSummaryDeatils[testcases[k].tc_feature] += 1;
      }
      this.featureSummary = fesatureSummaryDeatils;

      let userSummaryDetails = {};
      let userArray=[];
      for (let l = 0; l < allUsers.length; l++) {
        allUsers[l] = allUsers[l] === null ? "null" : allUsers[l];
        userSummaryDetails[allUsers[l]] = 10;
        }
    
       let colors = this.featureColors;
       let obj={};
      for(let u=0;u<allUsers.length;u++){
         if(allUsers[u] != null){
         obj={};
        obj["value"]=userSummaryDetails[allUsers[u]];
        obj["name"]=allUsers[u];  
        obj["color"]=colors[u % colors.length];
        userArray.push(obj);
        }
      }
      this.userSummary = userArray;

      let platformSummaryDetails = {};
      for (let l = 0; l < allPlatforms.length; l++) {
        allPlatforms[l] = allPlatforms[l] === null ? "null" : allPlatforms[l];
        platformSummaryDetails[allPlatforms[l]] = 0;
      }
      for (let k = 0; k < testcases.length; k++) {
        platformSummaryDetails[testcases[k].tc_platform] += 1;
      }
      this.platformSummary = platformSummaryDetails;

      let srcSummaryDetails = {};
      for (let l = 0; l < allSource.length; l++) {
        allSource[l] = allSource[l] === null ? "null" : allSource[l];
        srcSummaryDetails[allPlatforms[l]] = 0;
      }
      for (let k = 0; k < testcases.length; k++) {
        srcSummaryDetails[testcases[k].tc_source] += 1;
      }
      this.srcSummary = srcSummaryDetails;

      let roleSummaryDetails = {};
      for (let l = 0; l < allRoles.length; l++) {
        allRoles[l] = allRoles[l] === null ? "null" : allRoles[l];
        roleSummaryDetails[allRoles[l]] = 0;
      }
      for (let k = 0; k < testcases.length; k++) {
        roleSummaryDetails[testcases[k].tc_role] += 1;
      }
      this.roleSummary = roleSummaryDetails;

      let platformRoleSummaryDetails = {};
      let qualityPlatformRoleSummaryDetails=[];
      let qualityPlatformSummaryDetails=[];
      let qualityRoleSummaryDetails=[];
      let qualityFeatureSummaryDetails=[];
       let qualitySrcSummaryDetails=[];
      for (let l = 0; l < allPlatformRoles.length; l++) {
        allPlatformRoles[l] = allPlatformRoles[l] === null ? "null" : allPlatformRoles[l];
        platformRoleSummaryDetails[allPlatformRoles[l]] = 0;
      }
      let tempObj={};
      let tempObj1={};
      let tempObj2={};
      let tempObj3={};
      let tempObj4={};
      let result="";
      for (let kt = 0; kt < testcases.length; kt++) {
        if (
          testcases[kt].tc_result === "pass" ||
          testcases[kt].tc_result === "fail" ||
          testcases[kt].tc_result === "passed" ||
          testcases[kt].tc_result === "passx" ||
          testcases[kt].tc_result === "failed"
        ){
        if(Object.keys(tempObj).indexOf(testcases[kt].tc_platform+"_"+testcases[kt].tc_role)>-1){
             tempObj[testcases[kt].tc_platform+"_"+testcases[kt].tc_role]["Executed"]+=1;
        if( testcases[kt].tc_result === "pass" ||
          testcases[kt].tc_result === "passed" ||
          testcases[kt].tc_result === "passx"){
             tempObj[testcases[kt].tc_platform+"_"+testcases[kt].tc_role]["Passed"]+=1;
          }
        else if( testcases[kt].tc_result === "fail" ||
          testcases[kt].tc_result === "failed"){
             result=this.checkPassOrFail(testcases[kt]);
             if(result==="pass"){
                tempObj[testcases[kt].tc_platform+"_"+testcases[kt].tc_role]["Passed1"]+=1;
             }
           }
        }
        else{
           tempObj[testcases[kt].tc_platform+"_"+testcases[kt].tc_role]={"Executed":1,"Passed":0,"Passed1":0};
           if( testcases[kt].tc_result === "pass" ||
          testcases[kt].tc_result === "passed" ||
          testcases[kt].tc_result === "passx"){
            tempObj[testcases[kt].tc_platform+"_"+testcases[kt].tc_role]["Passed"]+=1;
          }
          else if( testcases[kt].tc_result === "fail" ||
          testcases[kt].tc_result === "failed"){
            result=this.checkPassOrFail(testcases[kt]);
             if(result==="pass"){
                 tempObj[testcases[kt].tc_platform+"_"+testcases[kt].tc_role]["Passed1"]+=1;
             }
          }
        }

         if(Object.keys(tempObj1).indexOf(testcases[kt].tc_platform)>-1){
             tempObj1[testcases[kt].tc_platform]["Executed"]+=1;
        if( testcases[kt].tc_result === "pass" ||
          testcases[kt].tc_result === "passed" ||
          testcases[kt].tc_result === "passx"){
             tempObj1[testcases[kt].tc_platform]["Passed"]+=1;
          }
         else  if( testcases[kt].tc_result === "fail" ||
          testcases[kt].tc_result === "failed"){
             result=this.checkPassOrFail(testcases[kt]);
             if(result==="pass"){
                 tempObj1[testcases[kt].tc_platform]["Passed1"]+=1;
             }
          }
        }
        else{
           tempObj1[testcases[kt].tc_platform]={"Executed":1,"Passed":0,"Passed1":0};
           if( testcases[kt].tc_result === "pass" ||
          testcases[kt].tc_result === "passed" ||
          testcases[kt].tc_result === "passx"){
            tempObj1[testcases[kt].tc_platform]["Passed"]+=1;
          }
          else  if( testcases[kt].tc_result === "fail" ||
          testcases[kt].tc_result === "failed"){
             result=this.checkPassOrFail(testcases[kt]);
             if(result==="pass"){
                 tempObj1[testcases[kt].tc_platform]["Passed1"]+=1;
             }
          }
        }

         if(Object.keys(tempObj4).indexOf(testcases[kt].tc_source)>-1){
             tempObj4[testcases[kt].tc_source]["Executed"]+=1;
        if( testcases[kt].tc_result === "pass" ||
          testcases[kt].tc_result === "passed" ||
          testcases[kt].tc_result === "passx"){
             tempObj4[testcases[kt].tc_source]["Passed"]+=1;
          }
         else  if( testcases[kt].tc_result === "fail" ||
          testcases[kt].tc_result === "failed"){
             result=this.checkPassOrFail(testcases[kt]);
             if(result==="pass"){
                 tempObj1[testcases[kt].tc_source]["Passed1"]+=1;
             }
          }
        }
        else{
           tempObj4[testcases[kt].tc_source]={"Executed":1,"Passed":0,"Passed1":0};
           if( testcases[kt].tc_result === "pass" ||
          testcases[kt].tc_result === "passed" ||
          testcases[kt].tc_result === "passx"){
            tempObj4[testcases[kt].tc_source]["Passed"]+=1;
          }
          else  if( testcases[kt].tc_result === "fail" ||
          testcases[kt].tc_result === "failed"){
             result=this.checkPassOrFail(testcases[kt]);
             if(result==="pass"){
                 tempObj4[testcases[kt].tc_source]["Passed1"]+=1;
             }
          }
        }

         if(Object.keys(tempObj2).indexOf(testcases[kt].tc_role)>-1){
             tempObj2[testcases[kt].tc_role]["Executed"]+=1;
        if( testcases[kt].tc_result === "pass" ||
          testcases[kt].tc_result === "passed" ||
          testcases[kt].tc_result === "passx"){
             tempObj2[testcases[kt].tc_role]["Passed"]+=1;
          }
         else if( testcases[kt].tc_result === "fail" ||
          testcases[kt].tc_result === "failed"){
              result=this.checkPassOrFail(testcases[kt]);
             if(result==="pass"){
                tempObj2[testcases[kt].tc_role]["Passed1"]+=1;
             }
          }
        }
        else{
           tempObj2[testcases[kt].tc_role]={"Executed":1,"Passed":0,"Passed1":0};
           if( testcases[kt].tc_result === "pass" ||
          testcases[kt].tc_result === "passed" ||
          testcases[kt].tc_result === "passx"){
            tempObj2[testcases[kt].tc_role]["Passed"]+=1;
          }
          else  if( testcases[kt].tc_result === "fail" ||
          testcases[kt].tc_result === "failed"){
             result=this.checkPassOrFail(testcases[kt]);
             if(result==="pass"){
                tempObj2[testcases[kt].tc_role]["Passed1"]+=1;
             }
          }
        }

         if(Object.keys(tempObj3).indexOf(testcases[kt].tc_feature)>-1){
             tempObj3[testcases[kt].tc_feature]["Executed"]+=1;
        if( testcases[kt].tc_result === "pass" ||
          testcases[kt].tc_result === "passed" ||
          testcases[kt].tc_result === "passx"){
             tempObj3[testcases[kt].tc_feature]["Passed"]+=1;
          }
        else if( testcases[kt].tc_result === "fail" ||
          testcases[kt].tc_result === "failed"){
             result=this.checkPassOrFail(testcases[kt]);
             if(result==="pass"){
               tempObj3[testcases[kt].tc_feature]["Passed1"]+=1;
             }
          }
        }
        else{
           tempObj3[testcases[kt].tc_feature]={"Executed":1,"Passed":0,"Passed1":0};
           if( testcases[kt].tc_result === "pass" ||
          testcases[kt].tc_result === "passed" ||
          testcases[kt].tc_result === "passx"){
            tempObj3[testcases[kt].tc_feature]["Passed"]+=1;
          }
          else if( testcases[kt].tc_result === "fail" ||
          testcases[kt].tc_result === "failed"){
            result=this.checkPassOrFail(testcases[kt]);
             if(result==="pass"){
               tempObj3[testcases[kt].tc_feature]["Passed1"]+=1;
             }
          }
        }
      }
       platformRoleSummaryDetails[testcases[kt].tc_platform+"_"+testcases[kt].tc_role] += 1;
      }
      for(let sh=0;sh<allPlatformRoles.length;sh++){
        obj={};
        let passed=tempObj[allPlatformRoles[sh]]?tempObj[allPlatformRoles[sh]].Passed:0;
         let passed1=tempObj[allPlatformRoles[sh]]?tempObj[allPlatformRoles[sh]].Passed1:0;
        let executed=tempObj[allPlatformRoles[sh]]?tempObj[allPlatformRoles[sh]].Executed:0;
         let perc=passed/executed*100;
         let perc1=(parseInt(passed)+parseInt(passed1))/executed*100;
          obj["name"]=allPlatformRoles[sh];
          obj["count"]=parseInt(perc);
          obj["count1"]=parseInt(perc1);
          qualityPlatformRoleSummaryDetails.push(obj);
       }

        for(let sk=0;sk<allFeatures.length;sk++){
        obj={};
        let passed=tempObj3[allFeatures[sk]]?tempObj3[allFeatures[sk]].Passed:0;
        let passed1=tempObj3[allFeatures[sk]]?tempObj3[allFeatures[sk]].Passed1:0;
        let executed=tempObj3[allFeatures[sk]]?tempObj3[allFeatures[sk]].Executed:0;
         let perc=passed/executed*100;
        let perc1=(parseInt(passed)+parseInt(passed1))/executed*100;
          obj["name"]=allFeatures[sk];
          obj["count"]=parseInt(perc);
          obj["count1"]=parseInt(perc1);
          qualityFeatureSummaryDetails.push(obj);
       }

         for(let st=0;st<allSource.length;st++){
        obj={};
        let passed=tempObj4[allSource[st]]?tempObj4[allSource[st]].Passed:0;
        let passed1=tempObj4[allSource[st]]?tempObj4[allSource[st]].Passed1:0;
        let executed=tempObj4[allSource[st]]?tempObj4[allSource[st]].Executed:0;
         let perc=passed/executed*100;
        let perc1=(parseInt(passed)+parseInt(passed1))/executed*100;
          obj["name"]=allSource[st];
          obj["count"]=parseInt(perc);
          obj["count1"]=parseInt(perc1);
          qualitySrcSummaryDetails.push(obj);
       }

        for(let sa=0;sa<allPlatforms.length;sa++){
        obj={};
        let passed=tempObj1[allPlatforms[sa]]?tempObj1[allPlatforms[sa]].Passed:0;
        let passed1=tempObj1[allPlatforms[sa]]?tempObj1[allPlatforms[sa]].Passed1:0;
        let executed=tempObj1[allPlatforms[sa]]?tempObj1[allPlatforms[sa]].Executed:0;
         let perc=passed/executed*100;
         let perc1=(parseInt(passed)+parseInt(passed1))/executed*100;
          obj["name"]=allPlatforms[sa];
          obj["count"]=parseInt(perc);
          obj["count1"]=parseInt(perc1);
          qualityPlatformSummaryDetails.push(obj);
       }

        for(let sb=0;sb<allRoles.length;sb++){
        obj={};
        let passed=tempObj2[allRoles[sb]]?tempObj2[allRoles[sb]].Passed:0;
        let passed1=tempObj2[allRoles[sb]]?tempObj2[allRoles[sb]].Passed1:0;
        let executed=tempObj2[allRoles[sb]]?tempObj2[allRoles[sb]].Executed:0;
         let perc=passed/executed*100;
         let perc1=(parseInt(passed)+parseInt(passed1))/executed*100;
          obj["name"]=allRoles[sb];
          obj["count"]=parseInt(perc);
          obj["count1"]=parseInt(perc1);
          qualityRoleSummaryDetails.push(obj);
       }

       this.qualitySummary=qualityPlatformRoleSummaryDetails;
       this.qualityPlatformSummary=qualityPlatformSummaryDetails;
       this.qualityRoleSummary=qualityRoleSummaryDetails;
       this.qualityFeatureSummary=qualityFeatureSummaryDetails;
       this.qualitySrcSummary=qualitySrcSummaryDetails;
      this.platformRoleSummary = platformRoleSummaryDetails;
    
     let defectsSummaryDetails = {};
      for (let l = 0; l < allDefects.length; l++) {
        defectsSummaryDetails[allDefects[l]] = { count:0, headline:"", component:"",status:"", testcaseId:[]};
      }
      let temp123 = [];
      for (let kg = 0; kg < testcases.length; kg++) {
        temp123 = testcases[kg].tc_defects ? testcases[kg].tc_defects.split(",") : [];
        for (let ab = 0; ab < temp123.length; ab++) {
          temp123[ab]=temp123[ab].trim();
          temp123[ab]=temp123[ab].substring(0,10);
        }
        for (let s = 0; s < temp123.length; s++) {
          defectsSummaryDetails[temp123[s]]["count"]+=1;
          defectsSummaryDetails[temp123[s]]["testcaseId"].push(testcases[kg].id);
           for(let h=0;h<this.cdets.length;h++){
            if(this.cdets[h].defect_id===temp123[s]){
              defectsSummaryDetails[temp123[s]]["headline"]+=this.cdets[h].headline;
              defectsSummaryDetails[temp123[s]]["component"]+=this.cdets[h].component;
              defectsSummaryDetails[temp123[s]]["status"]+=this.cdets[h].status;
            }
          }
        }
      }
      this.defectSummary = defectsSummaryDetails;

      let cfdSummaryDetails = {};
      for (let l = 0; l < allCFD.length; l++) {
        cfdSummaryDetails[allCFD[l]] = { count:0, headline:"", component:"", product:"",testcaseId:[]};
      }
      let temp124 = [];
      for (let kb = 0; kb < testcases.length; kb++) {
        temp124 = testcases[kb].tc_cfd ? testcases[kb].tc_cfd.split(",") : [];
        for (let b = 0; b < temp124.length; b++) {
          temp124[b]=temp124[b].trim();
        }
        for (let s = 0; s < temp124.length; s++) {
         cfdSummaryDetails[temp124[s]]["count"]+=1;
        cfdSummaryDetails[temp124[s]]["testcaseId"].push(testcases[kb].id);
          for(let h=0;h<this.cfdDataList.length;h++){
            if(this.cfdDataList[h].defect_id===temp124[s]){
              cfdSummaryDetails[temp124[s]]["headline"]=this.cfdDataList[h].headline;
              cfdSummaryDetails[temp124[s]]["component"]=this.cfdDataList[h].component;
              cfdSummaryDetails[temp124[s]]["product"]=this.cfdDataList[h].product;
            }
          }
        }
      } 

      //   for(let d=0;d<this.cfdDataList.length;d++){
          
       //   }
    
      this.cfdSummary = cfdSummaryDetails;

      let testcasesFeatureData = this.loadBarChartData(testcases,"tc_feature");
      let testcasesPlatformData = this.loadBarChartData(testcases,"tc_platform");
      let testcasesRoleData = this.loadBarChartData(testcases,"tc_role");
     let testcaseAndDefectsData=this.loadMultiBarChartDataForUser(testcases,allUsers);
      let qualityData=this.loadProjectedQualityData("platformRole");
      let qualityPlatformData=this.loadProjectedQualityData("platform");
      let qualityRoleData=this.loadProjectedQualityData("role");
      let qualityFeatureData=this.loadProjectedQualityData("feature");
      let qualitySrcData=this.loadProjectedQualityData("source");
      let testcasesSrcData = this.loadChartData(testcases, "tc_source");
      //let testcasesPlatformData = this.loadChartData(testcases, "tc_platform");
     // let testcasesRoledata = this.loadChartData(testcases, "tc_role");
      let testcasesPlatformRoledata = this.loadPlatformRoleChartData(testcases);
      //let executionSummaryData = this.loadChartData(testcases, "tc_result");
      let projectedSummaryData=this.loadProjectedSummaryChartData(testcases);
       let executionSummaryData = this.loadSummaryChartData(testcases, "tc_result");
       let splineSummaryData=this.loadSplineSummaryData(testcases);
       let userData = this.userSummary;

      this.bar_option.series = testcasesFeatureData;
      this.featureOption = this.bar_option;
      
      this.platformRole_bar_option.series = testcasesPlatformRoledata;
      this.platformRoleOption = this.platformRole_bar_option;

     // this.pie_option.series[0].data = testcasesPlatformData;
      //this.platformOption = this.pie_option;

      this.role_bar_option.series=testcasesRoleData;
      this.roleOption=this.role_bar_option;

      this.platform_bar_option.series=testcasesPlatformData;
      this.platformOption = this.platform_bar_option;

      this.pie_option3.series[0].data=this.loadTestcaseCDETSData();
      this.mhHaveOption=this.pie_option3;

      this.pie_option2.series[0].data=this.testcasesSrcData;
      this.srcOption=this.pie_option2;

      //here
      this.pie_option1.series[0].data=this.testcaseDefectSummary;
      this.defectOption=this.pie_option1;

      this.quality_platformRole_bar_option.xAxis.categories=allPlatformRoles;
      this.quality_platformRole_bar_option.series = qualityData;
      this.qualityOption = this.quality_platformRole_bar_option;

      this.quality_platformRole_bar_option1.xAxis.categories=allPlatforms;
      this.quality_platformRole_bar_option1.series = qualityPlatformData;
      this.qualityPlatformOption = this.quality_platformRole_bar_option1;

      this.quality_platformRole_bar_option2.xAxis.categories=allRoles;
      this.quality_platformRole_bar_option2.series = qualityRoleData;
      this.qualityRoleOption = this.quality_platformRole_bar_option2;

      this.quality_platformRole_bar_option3.xAxis.categories=allFeatures;
      this.quality_platformRole_bar_option3.series = qualityFeatureData;
      this.qualityFeatureOption = this.quality_platformRole_bar_option3;

      this.quality_platformRole_bar_option4.xAxis.categories=allSource;
      this.quality_platformRole_bar_option4.series = qualitySrcData;
      this.qualitySrcOption = this.quality_platformRole_bar_option4;
      let self=this;
   
      this.summaryOptions.series[0].data=executionSummaryData;
      this.executionSummaryOption = this.summaryOptions;

      this.userOption.series[0].data=userData;

      this.testcases_defects_by_users_bar_option.xAxis.categories=allUsers;
      this.testcases_defects_by_users_bar_option.series=testcaseAndDefectsData;
      this.testcaseDefectsByUsersOption=this.testcases_defects_by_users_bar_option;

     // this.executionSummaryOption.redraw();


      this.summaryOptions1.series[0].data=projectedSummaryData;
      this.executionSummaryOption1 = this.summaryOptions1;
      
    /*   const div = document.querySelector("#chart1Div");
      [].slice.call(div.children).forEach((child) => div.removeChild(child));
      div.innerHTML+='<pie id="chart1" :option="executionSummaryOption"></pie>'*/




     // this.executionSummaryOption1.redraw();

      this.loadingMessage = "";
      this.loading = false;
    },
    hideSidebar() {
      this.sidebarHidden = true;
      document.querySelector(".releasesDiv").classList.add("hideReleaseDiv");
      document
        .querySelector(".releasesListDiv")
        .classList.add("hideReleasesListDiv");
    },
    showSidebar() {
      if(this.sidebarHidden){
      this.sidebarHidden = false;
      document.querySelector(".releasesDiv").classList.remove("hideReleaseDiv");
      document
        .querySelector(".releasesListDiv")
        .classList.remove("hideReleasesListDiv");
      }
      else{
         this.sidebarHidden = true;
      document.querySelector(".releasesDiv").classList.add("hideReleaseDiv");
      document
        .querySelector(".releasesListDiv")
        .classList.add("hideReleasesListDiv");
      }
    },
    loadQualityData(type){
      let summaryArr=[];
      if(type==="platform"){
        summaryArr=this.qualityPlatformSummary;
      }
      else if(type==="role"){
        summaryArr=this.qualityRoleSummary;
      }
      else if(type==="feature"){
        summaryArr=this.qualityFeatureSummary;
      }
      else if(type==="source"){
        summaryArr=this.qualitySrcSummary;
      }
      else if(type==="platformRole"){
         summaryArr=this.qualitySummary;
      }
        let colors=this.featureColors;
        let ft=[];
        for (let m = 0; m < summaryArr.length; m++) {
        ft.push({
          name: summaryArr[m].name,
          color: colors[m % colors.length],
          data: [
            {
              name: summaryArr[m].name,
              x: m + 1,
              y: summaryArr[m].count,
            },
          ],
        });
      }

     return ft;
    },
    loadProjectedQualityData(type){
      let summaryArr=[];
      if(type==="platform"){
        summaryArr=this.qualityPlatformSummary;
      }
      else if(type==="role"){
        summaryArr=this.qualityRoleSummary;
      }
      else if(type==="feature"){
        summaryArr=this.qualityFeatureSummary;
      }
       else if(type==="source"){
        summaryArr=this.qualitySrcSummary;
      }
      else if(type==="platformRole"){
         summaryArr=this.qualitySummary;
      }
      let arr=[],projectedArr=[];
       for (let m = 0; m < summaryArr.length; m++) {
         arr.push(parseInt(summaryArr[m].count));
         projectedArr.push(parseInt(summaryArr[m].count1));
       }
        let colors=this.featureColors;
        let ft=[
             {
             name:"Projected "+type,
          color: '#acdf87',
          data:projectedArr,
           pointPadding: 0.2,
        pointPlacement: -0.2
          },{
          name:type,
          color: '#1e5637',
          data:arr,
          pointPadding: 0.4,
          pointPlacement: -0.2
          },
       ];
       return ft;
    },
    loadMultiBarChartDataForUser(testcases,allUsers){
      let testcasesArr=[],defectsArr=[];
      for (let j = 0; j < allUsers.length; j++) {
        testcasesArr.push({
          name: allUsers[j],
          count: 0,
        });
        defectsArr.push({
          name: allUsers[j],
          count: 0,
        });
       }
        for (let k = 0; k < testcases.length; k++) {
        for (let l = 0; l < testcasesArr.length; l++) {
          if (testcases[k]["tc_testExecOwner"] === testcasesArr[l].name) {
            testcasesArr[l].count += 1;
          }
        }
      }
     for(let ra=0;ra<this.cdets.length;ra++){
       for (let la = 0; la < defectsArr.length; la++) {
          if(this.cdets[ra].submitter===defectsArr[la].name){
          defectsArr[la].count += 1;
       }
       }
     }
      let testcaseList=[],defectList=[];
     for(let g=0;g<testcasesArr.length;g++){
       testcaseList.push(testcasesArr[g].count);
       defectList.push(defectsArr[g].count)
     }
    
      let arr=[];
       arr.push({
         name:"Testcases",
         data: testcaseList,
         })
         arr.push({
         name:"Defects",
         data: defectList,
         })
      return arr;
    },
    loadBarChartData(testcases,key) {
      let testcasefeatures = [];
      for (let i = 0; i < testcases.length; i++) {
        testcasefeatures.push(testcases[i][key]);
      }
      let testcasefeatures1 = [...new Set(testcasefeatures)];
      let features = [],
        fe1 = [];
      for (let j = 0; j < testcasefeatures1.length; j++) {
        features.push({
          name: testcasefeatures1[j],
          count: 0,
        });
      }
      for (let k = 0; k < testcases.length; k++) {
        for (let l = 0; l < features.length; l++) {
          if (testcases[k][key] === features[l].name) {
            features[l].count += 1;
          }
        }
      }
      let colors = this.featureColors;
      for (let m = 0; m < features.length; m++) {
        fe1.push({
          name: features[m].name,
          color: colors[m % colors.length],
          data: [
            {
              name: features[m].name,
              x: m + 1,
              y: features[m].count,
            },
          ],
        });
      }
      return fe1;
    },
    loadPlatformRoleChartData(testcases) {
      let testcasePlatformRoles = [];
      let key1 = "tc_platform";
      let key2="tc_role";
      let val="";
      for (let i = 0; i < testcases.length; i++) {
        val=testcases[i][key1]+"_"+testcases[i][key2]
        testcasePlatformRoles.push(val);
      }
      let testcasePlatformRoles1 = [...new Set(testcasePlatformRoles)];
      let platformRoles = [],
        fe1 = [];
      for (let j = 0; j < testcasePlatformRoles1.length; j++) {
        platformRoles.push({
          name: testcasePlatformRoles1[j],
          count: 0,
        });
      }
      for (let k = 0; k < testcases.length; k++) {
        for (let l = 0; l < platformRoles.length; l++) {
          val=testcases[k][key1]+"_"+testcases[k][key2]
          if (val === platformRoles[l].name) {
            platformRoles[l].count += 1;
          }
        }
      }
      let colors = this.platformRoleColors;
      for (let m = 0; m < platformRoles.length; m++) {
        fe1.push({
          name: platformRoles[m].name,
          color: colors[m % colors.length],
          data: [
            {
              name: platformRoles[m].name,
              x: m + 1,
              y: platformRoles[m].count,
            },
          ],
        });
      }
      return fe1;
    },
     loadChartData(testcases, key) {
      let testcasefeatures = [];
      let val="";
      for (let i = 0; i < testcases.length; i++) {
        if(key==="tc_platformRole"){
          val=testcases[i]["tc_platform"]+_+testcases[i]["tc_role"];
          testcasefeatures.push(val);
        }
        else{
           testcasefeatures.push(testcases[i][key]);
        }
       
      }
      let testcasefeatures1 = [...new Set(testcasefeatures)];
      let features = [],
        fe1 = [];
   
        for (let j = 0; j < testcasefeatures1.length; j++) {
        features.push({
          name: testcasefeatures1[j],
          count: 0,
          });
          }
      
      for (let k = 0; k < testcases.length; k++) {
        for (let l = 0; l < features.length; l++) {
          if(key==="tc_platformRole"){
             val=testcases[i]["tc_platform"]+_+testcases[i]["tc_role"];
             if(val===features[l].name) {
            features[l].count += 1;
          }
          }
          else{
          if (testcases[k][key] === features[l].name) {
            features[l].count += 1;
          }
          }
        }
      }
      let arr = [];
      for (let l = 0; l < features.length; l++) {
        arr = [];
        let tempVal = features[l].name === null ? "null" : features[l].name;
        arr.push(tempVal);
        arr.push(features[l].count);
        fe1.push(arr);
      }
      return fe1;
    },
    loadSplineSummaryData(testcases){
      let planned=testcases.length,actual=0,passed=0,failed=0;
      let data=  [{
        name: "Planned",
        data: [],
        color: this.featureColors[2],
      },
      {
        name: "Actual",
        data: [],
        dashStyle: "ShortDashDot",
        color: this.featureColors[0],
      },
      {
        name: "Pass",
        data: [],
        dashStyle: "ShortDot",
        color: this.featureColors[1],
      },
      {
        name: "Fail",
        data: [],
        dashStyle: "Dash",
        color: this.featureColors[9],
      }];
      for(let k=0;k<testcases.length;k++){
         if( testcases[k].tc_result === "pass" ||
          testcases[k].tc_result === "fail" ||
          testcases[k].tc_result === "passed" ||
          testcases[k].tc_result === "passx" ||
          testcases[k].tc_result === "failed"){
            actual+=1;
          }
           if( testcases[k].tc_result === "pass" ||
          testcases[k].tc_result === "passed" ||
          testcases[k].tc_result === "passx"){
            passed+=1;
          }
           if( testcases[k].tc_result === "fail" ||
          testcases[k].tc_result === "failed"){
            failed+=1;
          }
      }
      for(let i=0;i<6;i++){
      
      }
    },
    checkPassOrFail(testcase){
      let temp123=[];
      if(testcase.tc_result==="passed" || testcase.tc_result==="pass"){
        return "pass";
      }
      else if(testcase.tc_result==="failed" || testcase.tc_result==="fail"){
         temp123 =testcase.tc_defects ? testcase.tc_defects.split(",") : [];
        let testcasepass=false;
        for (let ab = 0; ab < temp123.length; ab++) {
         temp123[ab]=temp123[ab].trim();
         temp123[ab]=temp123[ab].substring(0,10);
         for(let h=0;h<this.cdets.length;h++){
            if(this.cdets[h].defect_id===temp123[ab]){
             if(this.cdets[h].status==='R' || this.cdets[h].status==='M' || this.cdets[h].status==='V' || this.cdets[h].status==='J'){
               testcasepass=true;
             }
             else{
               testcasepass=false;
             }
            }
          }
        }
         if(testcasepass){
          return "pass";
        }
        else{
          return "fail";
        }
      }
    },
    loadProjectedSummaryChartData(testcases){
      let actual=this.loadSummaryChartData(testcases,"tc_result")
       let testcaseArr = [],passed=0,failed=0, temp123="";;
        for (let i = 0; i < testcases.length; i++) {
        if(testcases[i].tc_result==="passed" || testcases[i].tc_result==="pass"){
          passed+=1;
        }
        else  if(testcases[i].tc_result==="failed" || testcases[i].tc_result==="fail"){
          temp123 = this.testcases[i].tc_defects ? this.testcases[i].tc_defects.split(",") : [];
          let testcasepass=false;
        for (let ab = 0; ab < temp123.length; ab++) {
         temp123[ab]=temp123[ab].trim();
         temp123[ab]=temp123[ab].substring(0,10);
         for(let h=0;h<this.cdets.length;h++){
            if(this.cdets[h].defect_id===temp123[ab]){
             if(this.cdets[h].status==='R' || this.cdets[h].status==='M' || this.cdets[h].status==='V' || this.cdets[h].status==='J'){
               testcasepass=true;
             }
             else{
               testcasepass=false;
             }
            }
          }
        }
        if(testcasepass){
          passed+=1;
        }
        else{
          failed+=1;
        }
        }
      }
      let color={"pass":"#76B947","fail":"#F51720","pending":"#2094df","failed":"#F51720","passed":"#76B947"}
      let projectedSummary=[{name:"passed",color:color["passed"],y:passed},{name:"failed",color:color["failed"],y:failed}]
       for(let k=0;k<actual.length;k++){
        if(actual[k].name!=="passed" && actual[k].name!=="failed"){
          projectedSummary.push(actual[k]);
        }
      }
      return projectedSummary;
    },
     loadSummaryChartData(testcases, key) {
      let testcasefeatures = [];
      for (let i = 0; i < testcases.length; i++) {
        testcasefeatures.push(testcases[i][key]);
      }
      let testcasefeatures1 = [...new Set(testcasefeatures)];
      let color={"pass":"#76B947","fail":"#F51720","pending":"#2094df","failed":"#F51720","passed":"#76B947"}
      let features = [],
        fe1 = [];
     for (let j = 0; j < testcasefeatures1.length; j++) {
        features.push({
          name: testcasefeatures1[j],
          y: 0,
          color: color[testcasefeatures1[j]]
        });
      }
    
      for (let k = 0; k < testcases.length; k++) {
        for (let l = 0; l < features.length; l++) {
          if (testcases[k][key] === features[l].name) {
            features[l].y += 1;
          }
        }
      }
     /* let arr = [];
      for (let l = 0; l < features.length; l++) {
        arr = [];
        let tempVal = features[l].name === null ? "null" : features[l].name;
        arr.push(tempVal);
        arr.push(features[l].count);
        fe1.push(arr);
      }
      return fe1;*/
      return features;
    },
    closeInfoModal() {
      this.showInfoModal = false;
      this.showInfoModalClass = "";
      this.modalInfoMessage = "";
    },
     closeConfirmModal() {
      this.showConfirmModal = false;
      this.modalConfirmMessage = "";
       this.deleteType=""
        this.deleteObj={};
        this.deleteConfirmed=false;
        
    },
    confirmDelete(){
      this.deleteConfirmed=true;
      if(this.deleteType==="release"){
      this.deleteReleaseClicked(this.deleteObj);
      }
      else if(this.deleteType==="folder"){
        this.deleteFolderClicked(this.deleteObj.name);
       }
      else if(this.deleteType==="project"){
        this.deleteProjectClicked(this.deleteObj);
      }
    },

    closeSummaryInfoModal() {
      this.showSummaryInfoModal = false;
      this.summaryInfoTitle = "";
      this.summaryInfoArray = [];
    },
    closeCFDSummaryInfoModal(){
       this.showCFDSummaryInfoModal = false;
      this.summaryInfoTitle = "";
      this.summaryInfoArray = [];
    },
    closeErrorModal() {
      this.modalErrorMessage = "";
      this.showErrorModal = false;
    },
    updateTestcasesForExecutionSummary(e){
      let filterName=e.point.name;
      let selectedTestcases=[];
      if(filterName==="passed"){
       for(let k=0;k<this.testcases.length;k++){
          if(this.testcases[k].tc_result==="passed" || this.testcases[k].tc_result==="pass"){
            selectedTestcases.push(this.testcases[k]);
          }
        }
      }
      else if(filterName==="failed"){
         for(let k=0;k<this.testcases.length;k++){
          if(this.testcases[k].tc_result==="failed" || this.testcases[k].tc_result==="fail"){
            selectedTestcases.push(this.testcases[k]);
          }
        }
      }
      else{
         for(let k=0;k<this.testcases.length;k++){
          if(this.testcases[k].tc_result===filterName){
            selectedTestcases.push(this.testcases[k]);
          }
        }
      }
      this.selectedTestcases=selectedTestcases;
    },
     updateTestcasesForProjectedExecutionSummary(e){
      let filterName=e.point.name;
      let result=false;
      let selectedTestcases=[];
      if(filterName==="passed"){
       for(let k=0;k<this.testcases.length;k++){
          if(this.testcases[k].tc_result==="passed" || this.testcases[k].tc_result==="pass"){
            selectedTestcases.push(this.testcases[k]);
          }
           if(this.testcases[k].tc_result==="fail" || this.testcases[k].tc_result==="failed"){
             result=this.checkPassOrFail(this.testcases[k]);
             if(result){
               selectedTestcases.push(this.testcases[k]);
             }
            
          }
        }
      }
      else if(filterName==="failed"){
         for(let k=0;k<this.testcases.length;k++){
           if(this.testcases[k].tc_result==="fail" || this.testcases[k].tc_result==="failed"){
           result=this.checkPassOrFail(this.testcases[k]);
             if(!result){
               selectedTestcases.push(this.testcases[k]);
             }
           }
        }
      }
      else{
         for(let k=0;k<this.testcases.length;k++){
          if(this.testcases[k].tc_result===filterName){
            selectedTestcases.push(this.testcases[k]);
          }
        }
      }
      this.selectedTestcases=selectedTestcases;
    },
    updateSelectedCdetsList(e,type){
      let name=e.point.name;
      if(type==="component"){
        name=e.point.category;
      }
      this.selectedCdets=[];
        for(let k=0;k<this.selectedCdetsCopy.length;k++){
          if(this.selectedCdetsCopy[k][type]===name){
            this.selectedCdets.push(this.selectedCdetsCopy[k]);
          }
        }
      
    },
    loadTestcaseCDETSData(){
      let cdets=this.mhDefects;
      let cdet_components = [], cdet_components2 = [];
         for (let i = 0; i < cdets.length; i++) {
           cdet_components.push(cdets[i].component);
          }
           let cdet_components1 = [...new Set(cdet_components)];
            for (let k = 0; k < cdet_components1.length; k++) {
            cdet_components2.push({
              name: cdet_components1[k],
              count: 0,
            });
          }
           for (let n = 0; n < cdets.length; n++) {
            for (let p = 0; p < cdet_components2.length; p++) {
              if (cdets[n]["component"] === cdet_components2[p].name) {
                cdet_components2[p].count += 1;
              }
            }
           }
           let cdetsArr=[];
           for(let q=0;q<cdet_components2.length;q++){
             cdetsArr.push([cdet_components2[q].name,cdet_components2[q].count])
           }
           return cdetsArr;

    },
    loadGanttChart(relId){
       let self=this;
       testcaseService.getReleaseDetailsByReleaseId(relId).then(
          (data) => {
           self.releaseDetails=data[0];
           let rdata=data[0];
           let revents=data[1];
            let start_date={
              year:new Date(rdata.start_date).getFullYear(),
              month:new Date(rdata.start_date).getMonth(),
              date:new Date(rdata.start_date).getDate()
            };
            let fcs_date={
             year: new Date(rdata.fcs_date).getFullYear(),
             month:new Date(rdata.fcs_date).getMonth(),
             date:new Date(rdata.fcs_date).getDate()
            };
            let tcfa_date={
              year:new Date(rdata.tcfa_date).getFullYear(),
              month:new Date(rdata.tcfa_date).getMonth(),
              date:new Date(rdata.tcfa_date).getDate()
            };
            let retest_start_date={
              year:new Date(rdata.retest_start_date).getFullYear(),
              month:new Date(rdata.retest_start_date).getMonth(),
              date:new Date(rdata.retest_start_date).getDate()
            };
            let retest_end_date={
              year:new Date(rdata.retest_end_date).getFullYear(),
              month:new Date(rdata.retest_end_date).getMonth(),
              date:new Date(rdata.retest_end_date).getDate()
            };
            let longevity_start_date={
              year:new Date(rdata.longevity_start_date).getFullYear(),
              month:new Date(rdata.longevity_start_date).getMonth(),
              date:new Date(rdata.longevity_start_date).getDate()
            };
            let longevity_end_date={
              year:new Date(rdata.longevity_end_date).getFullYear(),
              month:new Date(rdata.longevity_end_date).getMonth(),
              date:new Date(rdata.longevity_end_date).getDate()
            };
            
            self.ganttOptions.xAxis.min=Date.UTC(start_date.year,start_date.month,start_date.date);
            self.ganttOptions.xAxis.max=Date.UTC(fcs_date.year,fcs_date.month,fcs_date.date+1);
           self.ganttOptions.series= [{
        name: 'Project 1',
        data: [
          {
            name: 'Planned',
            id:'planned',
            pointWidth: 0,
            y:0
        },
          {
             parent: 'planned',
            name: 'Executed',
            id:"Executed",
            start: Date.UTC(start_date.year,start_date.month,start_date.date),
            end: Date.UTC(tcfa_date.year,tcfa_date.month,tcfa_date.date),
            completed: {
              amount:self.totalExecuted/100,
              fill:"green",
            },
               y:1,
            color:"lightgreen",
         }, {
            parent: 'planned',
            name: 'Retest',
            id:"Retest",
            dependency:"Executed",
            start: Date.UTC(retest_start_date.year,retest_start_date.month,retest_start_date.date),
            end: Date.UTC(retest_end_date.year,retest_end_date.month,retest_end_date.date),
            dependency: 'Executed',
              color:"#2094df",
              y:1
        }, {
           parent: 'planned',
            name: 'Longevity',
            id:"Longevity",
            dependency:"Retest",
            start: Date.UTC(longevity_start_date.year,longevity_start_date.month,longevity_start_date.date),
            end: Date.UTC(longevity_end_date.year,longevity_end_date.month,longevity_end_date.date),
            dependency:"Retest",
             color:"orange",
             y:1
        }, {
           parent: 'planned',
            name: 'FCS',
            milestone: true,
            start: Date.UTC(fcs_date.year,fcs_date.month,fcs_date.date),
            end: Date.UTC(fcs_date.year,fcs_date.month,fcs_date.date),
            dependency:"Longevity",
            color:"brown",
            y: 1
        }]
    }];

    if(revents){
      self.ganttOptions.series[0].data.push({
           name: 'Events',
            id:'events',
            pointWidth: 0
      });
      let event_start_date={},event_end_date={};
       for(let k=0;k<revents.length;k++){
         event_start_date={
              year:new Date(revents[k].event_start_date).getFullYear(),
              month:new Date(revents[k].event_start_date).getMonth(),
              date:new Date(revents[k].event_start_date).getDate()
            };
             event_end_date={
              year:new Date(revents[k].event_end_date).getFullYear(),
              month:new Date(revents[k].event_end_date).getMonth(),
              date:new Date(revents[k].event_end_date).getDate()
            };
           self.ganttOptions.series[0].data.push({
             parent: 'events',
             name: revents[k].event_name,
             start: Date.UTC(event_start_date.year,event_start_date.month,event_start_date.date),
            end: Date.UTC(event_end_date.year,event_end_date.month,event_end_date.date),
            y:k+2
         });
       }
    }

           },
          (error) => {
            self.loading = false;
            self.loadingMessage = "";
            self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while loading Release Details, Please try again later";
          }
        );

    },
    loadWeeklyReport(relId){
      let self=this;
        testcaseService.getWeeklyReportByReleaseId(relId).then(
          (data) => {
            self.loading = false;
            self.loadingMessage = "";
            self.weeklyReport=data;
            let categories=[],mhHave=[],cvtFound=[],cvtObserved=[],planned=[],actual=[],passed=[],failed=[],cvtTotal=[];
            let mhHaveCount=0,cvtFoundCount=0,cvtObservedCount=0,plannedCount=0,actualCount=0,passedCount=0,failedCount=0,cvtTotalCount=0;
            for(let i=0;i<data.length;i++){
              categories.push(data[i].start_date.substring(0,10));
              mhHaveCount=(data[i].must_have_defects);
              cvtFoundCount=data[i].defects_found_CVT;
              cvtObservedCount=data[i].defects_observed;
              cvtTotalCount=data[i].defects_found_CVT+data[i].defects_observed;
              mhHave.push(mhHaveCount);
              cvtTotal.push(cvtTotalCount);
              cvtFound.push(cvtFoundCount);
              cvtObserved.push(cvtObservedCount);

              plannedCount=data[i].planned;
              actualCount=data[i].executed;
              passedCount=data[i].passed;
              failedCount=data[i].failed;
              planned.push(plannedCount);
              actual.push(actualCount);
              passed.push(passedCount);
              failed.push(failedCount);
            }
            let weeklyReportData=[
      {
        name: "Must have",
        type: "column",
       data: mhHave,
      },
       {
        name: "Total",
        type: "spline",
       data: cvtTotal,
        dashStyle: "shortdot",
      },
      {
        name: "Found",
        type: "spline",
        data: cvtFound,
         dashStyle: "shortdot",
      },
      {
        name: "Observed",
        type: "spline",
       data: cvtObserved,
      },
    ];
    let weeklyReportData1=[
      {
        name: "Planned",
        data: planned,
        color: "#4272f5",
      },
      {
        name: "Actual",
        data: actual,
        dashStyle: "ShortDashDot",
        color: "#00bdeb",
      },
      {
        name: "Pass",
        data: passed,
        dashStyle: "ShortDot",
        color: "green",
      },
      {
        name: "Fail",
        data: failed,
        dashStyle: "Dash",
        color: "red",
      },
    ];
    this.cvtOptions.xAxis.categories=categories;
    this.cvtOptions.series=weeklyReportData;
    this.splineOptions.xAxis.categories=categories;
    this.splineOptions.series=weeklyReportData1;
  
     },
          (error) => {
            self.loading = false;
            self.loadingMessage = "";
            self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while loading Weekly Report, Please try again later";
          }
        );
    },
    loadCDETSData(relId,folderName) {
      let self = this;
      this.cdetsReleaseFolderName=folderName;
      testcaseService.getCDETSDetails(relId).then(
        (data) => {
          self.loading = true;
          self.loadingMessage = "updating charts";
          self.cdets = data;
          let submitters = [],
            cdet_components = [],
            cdet_status = [];
          for (let i = 0; i < self.cdets.length; i++) {
            submitters.push(self.cdets[i].submitter);
            cdet_components.push(self.cdets[i].component);
            cdet_status.push(self.cdets[i].status);
            self.cdets[i]["tcCount"]=0;
          }
           self.selectedCdets=self.cdets;
           self.selectedCdetsCopy=self.cdets;
          let submitters1 = [...new Set(submitters)];
          let cdet_components1 = [...new Set(cdet_components)];
          let cdet_status1 = [...new Set(cdet_status)];

          let submitters2 = [],
            cdet_components2 = [],
            cdet_status2 = [];

          for (let j = 0; j < submitters1.length; j++) {
            submitters2.push({
              name: submitters1[j],
              count: 0,
            });
          }
          for (let k = 0; k < cdet_components1.length; k++) {
            cdet_components2.push({
              name: cdet_components1[k],
              count: 0,
            });
          }
          for (let m = 0; m < cdet_status1.length; m++) {
            cdet_status2.push({
              name: cdet_status1[m],
              count: 0,
            });
          }

          for (let n = 0; n < self.cdets.length; n++) {
            for (let o = 0; o < submitters2.length; o++) {
              if (self.cdets[n]["submitter"] === submitters2[o].name) {
                submitters2[o].count += 1;
              }
            }
            for (let p = 0; p < cdet_components2.length; p++) {
              if (self.cdets[n]["component"] === cdet_components2[p].name) {
                cdet_components2[p].count += 1;
              }
            }
            for (let q = 0; q < cdet_status2.length; q++) {
              if (self.cdets[n]["status"] === cdet_status2[q].name) {
                cdet_status2[q].count += 1;
              }
            }
          }

          let arr = [],
            fe1 = [];
          for (let r = 0; r < submitters2.length; r++) {
            arr = [];
            arr.push(submitters2[r].name);
            arr.push(submitters2[r].count);
            fe1.push(arr);
          }
          self.cdets_submitter_data = fe1;
          self.cdetsOptions2.series[0].data = fe1;
          self.submitterOption = self.cdetsOptions2;

          let fe2 = [],arr1=[],cdet1names=[];
          for (let s = 0; s < cdet_components2.length; s++) {
            arr = [];
            arr.push(cdet_components2[s].name);
            arr.push(cdet_components2[s].count);
            arr1.push(cdet_components2[s].count);
            cdet1names.push(cdet_components2[s].name);
            fe2.push(arr);
          }
          self.cdets_component_data = fe2;
          self.cdetsOptions1.series[0].data = fe2;
           self.cdets_Options1.xAxis.categories=cdet1names;
          self.cdets_Options1.series=[{
           data:arr1,
           showInLegend: false,
            point: {
          events: {
            click: (e) => {
              this.updateSelectedCdetsList(e, "component");
            },
          },
        },
          }];
         
          self.componentOption = self.cdets_Options1;

          let fe3 = [];
          for (let t = 0; t < cdet_status2.length; t++) {
            arr = [];
            arr.push(cdet_status2[t].name);
            arr.push(cdet_status2[t].count);
            fe3.push(arr);
          }
          self.cdets_status_data = fe3;
          this.cdetsOptions3.series[0].data = fe3;
          this.statusOption = this.cdetsOptions3;

          self.loading = false;
          self.loadingMessage = "";
        },
        (error) => {
          self.loading = false;
          self.loadingMessage = "";
          self.showErrorModal = true;
          self.modalErrorMessage =
            "Error while loading CDETS, Please try again later";
        }
      );
    },
    drawChart(id,type) {
        let self = this;
      if (type === "Release") {
        let relId = id;
      
        // for (let i = 0; i < projects.length; i++) {
        testcaseService.getTestcaseListByReleaseId(relId).then(
          (data) => {
            self.loading = false;
            self.loadingMessage = "";
            let testcases = data;
            self.testcases=data;
            self.selectedTestcases=data;
            self.showTestcases=true;
            self.testcasesFlag+=1;
            self.totalTestcases = testcases.length;
            self.updateCdetsDetails();
            self.loadSummaryData(testcases);
            self.loading = false;
            self.loadingMessage = "";
          },
          (error) => {
            self.loading = false;
            self.loadingMessage = "";
            self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while loading Testcases, Please try again later";
          }
        );
      } else  if (type === "Folder") {
         self.loading = true;
          self.loadingMessage = "updating charts";
         testcaseService.getTestcaseListByFolderName(id).then(
          (data) => {
            self.loading = false;
            self.loadingMessage = "";
            let testcases = data;
             self.testcases = data;
             self.selectedTestcases=data;
             self.showTestcases=true;
             self.testcasesFlag+=1;
             self.updateCdetsDetails();
            self.totalTestcases = testcases.length;
            self.loadSummaryData(testcases);
            self.loading = false;
            self.loadingMessage = "";
          },
          (error) => {
            self.loading = false;
            self.loadingMessage = "";
            self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while loading Testcases, Please try again later";
          }
        );
    }
      else if(type === "Project"){
        let prId = id;
         self.loading = true;
            self.loadingMessage = "updating charts";
        testcaseService.getTestcaseList(prId).then(
          (data) => {
            self.loading = false;
            self.loadingMessage = "";
            let testcases = data;
             self.testcases=data;
             self.selectedTestcases=data;
             self.showTestcases=true;
             self.testcasesFlag+=1;
             self.updateCdetsDetails();
            self.totalTestcases = testcases.length;
            self.loadSummaryData(testcases);
            self.loading = false;
            self.loadingMessage = "";
          },
          (error) => {
            self.loading = false;
            self.loadingMessage = "";
            self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while loading Testcases, Please try again later";
          }
        );
      }

      // }
    },
    createProjectClicked(e,robj) {
      this.$refs.rmenu.close();
      this.project_obj["r_id"] = robj.rid;
      this.project_obj["r_name"] = robj.rname;
      this.project_obj["project_name"] = "";
      this.project_obj["tims_id"] = "";
      this.showCreateProjectModal = true;
      e.preventDefault
    },
    updateCdetsDetails(){
      let temp123="";
      let testcaseOwers=[];
      for(let x=0;x<this.testcases.length;x++){
        temp123 = this.testcases[x].tc_defects ? this.testcases[x].tc_defects.split(",") : [];
        for (let ab = 0; ab < temp123.length; ab++) {
          temp123[ab]=temp123[ab].trim();
           temp123[ab]=temp123[ab].substring(0,10);
          for(let h=0;h<this.selectedCdets.length;h++){
            if(this.selectedCdets[h].defect_id===temp123[ab]){
              this.selectedCdets[h]["tcCount"]+=1;
            }
          }
        }
      }
      this.selectedCdetsCopy=this.selectedCdets;
    },
    editReleaseClicked(e,robj) {

      this.$refs.rmenu.close();
      this.showCreateReleaseModal = true;
      this.createUpdateRelName="Update";
      this.releaseObj = {
        id: robj.rid,
        customer_id: this.customerId,
        name: robj.rname,
        tims_id: robj.rtimsid,
        attribute: robj.rattribute,
        release_attribute: robj.release_attribute,
        start_date:robj.start_date!="null"?(robj.start_date):null,
        tcfa_date:robj.tcfa_date!="null"?(robj.tcfa_date):null,
        fcs_date:robj.fcs_date!="null"?(robj.fcs_date):null,
        retest_start_date:robj.retest_start_date!="null"?(robj.retest_start_date):null,
        retest_end_date:robj.retest_end_date!="null"?(robj.retest_end_date):null,
        longevity_start_date:robj.longevity_start_date!="null"?(robj.longevity_start_date):null,
        longevity_end_date:robj.longevity_end_date!="null"?(robj.longevity_end_date):null,
        folder_name: robj.folder_name,
     };
      this.editRelease=true;
      e.preventDefault();
    },

    toggleGanttOptions(){
      if(this.oneLineGantt){
        this.oneLineGantt=false;
        delete this.ganttOptions["yAxis"];
      }
      else{
         this.oneLineGantt=true;
          this.ganttOptions["yAxis"]={
          type:"category",
          min:0
        }
      }
    },

    createProject() {
      this.loading = true;
      this.showCreateProjectModal = false;
      if (this.project_obj.name != "") {
        let temp_obj = {
          name: this.project_obj.name,
          release_id: this.project_obj.r_id,
          tims_id: this.project_obj.tims_id,
        };
        if (this.editProject === false) {
          //  if (temp_obj.tims_id === "") {
          this.loadingMessage = "Creating project..";
          testcaseService.createProject([temp_obj]).then(
            (data) => {
              if (data) {
                this.loading = false;
                this.loadingMessage = "";
                this.loadReleases();
              }
            },
            (error) => {
              this.loading = false;
              this.loadingMessage = "";
              this.showErrorModal = true;
              this.modalErrorMessage =
                "Error while creating Project, Please try again later";
            }
          );
        } else {
          this.loadingMessage = "Updating project..";
          testcaseService.updateProject([temp_obj], this.project_obj.id).then(
            (data) => {
              if (data) {
                this.loading = false;
                this.editProject = false;
                this.loadingMessage = "";
                this.loadReleases();
              }
            },
            (error) => {
              this.loading = false;
              this.loadingMessage = "";
              this.showErrorModal = true;
              this.modalErrorMessage =
                "Error while updating Project, Please try again later";
            }
          );
        }
      } else {
        this.loading = false;
        this.loadingMessage = "";
        this.showErrorModal = true;
        this.modalErrorMessage =
          "Error while creating Project, Please try again later";
      }
    },

    loadReleases() {
      this.loading = true;
      this.loadingMessage = "Loading Customer releases...";
      let self1 = this;
      testcaseService.getReleasesList(self1.customerId).then(
        (data) => {
          self1.loading = false;
          self1.loadingMessage = "";
          self1.releases = data;
          let folders = [];
          let folderTemplate = "";
          let releasesBtnlist = document.querySelector(".releasesBtnlist");
           
          for (let i = 0; i < data.length; i++) {
            let fl = data[i].folder_name ? data[i].folder_name : "Unnamed";
            folders.push(fl);
            //testing
            //let fl = data[i].folder_name ? data[i].folder_name : "731";
            //folders.push(fl);
          }
          self1.folders = [...new Set(folders)];
          this.loadCDETSData(data[0].id,folders[0]);
          this.loadWeeklyReport(data[0].id);
          this.loadGanttChart(data[0].id);
          this.folderName=self1.folders[0];
          let folderList = {};
          for (let k = 0; k < self1.folders.length; k++) {
            folderTemplate +=
              '<button type="button" class="collapsibleFolders to-right"';
            folderTemplate +=
              'id="folder_' +
              self1.folders[k] +
              '"><span style="width:90%">' +
              self1.folders[k] +
              '</span></button>';
            folderList[k] = [];
          }
          releasesBtnlist.innerHTML = folderTemplate;
          for (let j = 0; j < data.length; j++) {
            for (let l = 0; l < self1.folders.length; l++) {
              if (
                data[j].folder_name === self1.folders[l] ||
                (data[j].folder_name === null && self1.folders[l] === "Unnamed")
              ) {
                //for testing
                folderList[l].push(data[j]);
              }
            }
          }
         self1.drawChart(self1.folders[0],"Folder");
         self1.loadCFDCount("folder",self1.folders[0]);
          
          self1.folderList = folderList;
          let releasestemplete = "",
            data1 = {},
            folderDivIdName = "";
          for (let a = 0; a < self1.folders.length; a++) {
            releasestemplete = "<div class='folderContent'>";
            for (let m = 0; m < self1.folderList[a].length; m++) {
              data1 = self1.folderList[a][m];
              let data1Str=JSON.stringify(data1);
              let timsid = data1.tims_id ? data1.tims_id : "na";
              let attr = data1.attribute ? data1.attribute : "na";
              let flName = data1.folder_name;
              let reltcfaDate=data1.tcfa_date;
              let relsDate=data1.start_date;
              let relfcsDate=data1.fcs_date;
              let relrSDate=data1.retest_start_date;
              let relrEDate=data1.retest_end_date;
              let rellSDate=data1.longevity_start_date;
              let rellEDate=data1.longevity_end_date;
              let relAttr = data1.release_attribute
                ? data1.release_attribute
                : "na";
              releasestemplete +=
                '<button type="button" class="collapsibleReleases to-right" data-rellSDate="'+rellSDate+'"  data-rellEDate="'+rellEDate+'"  data-timsid="' +
                timsid+'" data-relrSDate="'+relrSDate+'" data-relrEDate="'+relrEDate+'" data-attr="'+attr+'" data-reltcfaDate="'+reltcfaDate+'" data-folder="'+
                flName+'" data-relsDate="'+relsDate+'" data-relfcsDate="'+relfcsDate+'" data-relAttr="'+relAttr+'" id="release_' +
              data1.id +
              '"><span style="width:90%">' +
                data1.name +
                '</span></button>';
            }
            releasestemplete += "</div>";
            folderDivIdName = "folder_" + this.folders[a];
            let folderDiv = document.querySelector("#" + folderDivIdName);
            folderDiv.insertAdjacentHTML("afterend", releasestemplete);
            let folderContent = document.querySelectorAll(".folderContent");
            for (let h = 0; h < folderContent.length; h++) {
              folderContent[h].style.display = "none";
            }
          }
          var fol1 = document.getElementsByClassName("collapsibleFolders");
          for (let t = 0; t < fol1.length; t++) {
            let self = this;
            /* fol1[t].addEventListener(
              "dblclick",
              function(e) {
                let temp = this.id.split("_");
                self.selectedRelId = temp[temp.length - 1];
                self.releaseFlag = true;
                self.showTestcases = true;
                e.preventDefault();
                e.stopPropagation();
              },
              true
            );*/
            fol1[t].addEventListener(
              "click",
              function(e) {
                // self.showTestcases = false;
                //self.selectedRelease = this.id;
                //self.selectedReleaseName = this.innerText;
                let tempName=e.currentTarget.id.substring(7);
                self1.drawChart(tempName,"Folder");
                self1.loadCFDCount("folder",tempName);
                self1.releaseFlag="folder";
                self1.folderName=tempName;
                self1.$refs.fmenu.close();
                let temp = document.querySelectorAll(".activePR");
                for (let i = 0; i < temp.length; i++) {
                  temp[i].classList.remove("activePR");
                }
                this.classList.add("activePR");
               this.classList.toggle("activeBtn");
               /* if (this.classList.value.indexOf("activeBtn") > -1) {
                
                } else {
                  this.lastElementChild.children[0].classList.add(
                    "icon-chevron-right"
                  );
                  this.lastElementChild.children[0].classList.remove(
                    "icon-chevron-down"
                  );
                }*/

                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                  content.style.display = "none";
                } else {
                  content.style.display = "block";
                }
                e.preventDefault();
                e.stopPropagation();
              },
              true
            );
            fol1[t].addEventListener("contextmenu", (e) => {
              let fname = e.currentTarget.innerText;
              self1.$refs.pmenu.close();
              self1.$refs.rmenu.close();
              self1.$refs.fmenu.open(e, fname);
              e.preventDefault();
            });
        
          }
          
          var coll = document.getElementsByClassName("collapsibleReleases");
          for (let b = 0; b < coll.length; b++) {
            coll[b].addEventListener(
              "dblclick",
              function(e) {
               let temp = this.id.split("_");
                self1.selectedRelId = temp[temp.length - 1];
                self1.releaseFlag = "release";
                self1.showTestcases = true;
                e.preventDefault();
                e.stopPropagation();
              },
              true
            );
            coll[b].addEventListener(
              "click",
              function(e) {
                 let temp12 = this.id.split("_");
                let relId = temp12[temp12.length - 1];
                self1.selectedRelId = temp12[temp12.length - 1];
                self1.selectedRelease = this.id;
                 let folderName = e.currentTarget.getAttribute("data-folder"); 
                self1.loadCDETSData(relId,folderName);
                self1.releaseFlag="release";
                self1.loadWeeklyReport(relId);
                self1.loadGanttChart(relId);
               self1.selectedReleaseName = this.innerText;
                let temp = document.querySelectorAll(".activePR");
                for (let i = 0; i < temp.length; i++) {
                  temp[i].classList.remove("activePR");
                }

                this.classList.add("activePR");
                self1.drawChart(relId,"Release");
                self1.loadCFDCount("release",relId);
                this.classList.toggle("activeBtn");
              /*  if (this.classList.value.indexOf("activeBtn") > -1) {
                  this.lastElementChild.children[0].classList.remove(
                    "icon-chevron-right"
                  );
                  this.lastElementChild.children[0].classList.add(
                    "icon-chevron-down"
                  );
                } else {
                  this.lastElementChild.children[0].classList.add(
                    "icon-chevron-right"
                  );
                  this.lastElementChild.children[0].classList.remove(
                    "icon-chevron-down"
                  );
                }*/

                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                  content.style.display = "none";
                } else {
                  content.style.display = "block";
                }
                e.preventDefault();
                e.stopPropagation();
              },
              true
            );
            coll[b].addEventListener("contextmenu", (e) => {
              let temp = e.currentTarget.getAttribute("data-orig");
              let timsId = e.currentTarget.getAttribute("data-timsid");
              let attr = e.currentTarget.getAttribute("data-attr");
              let relAttr = e.currentTarget.getAttribute("data-relAttr");
              let relsDate = e.currentTarget.getAttribute("data-relsDate");
              let reltcfaDate = e.currentTarget.getAttribute("data-reltcfaDate");
              let relfcsDate = e.currentTarget.getAttribute("data-relfcsDate");
              let relrSDate = e.currentTarget.getAttribute("data-relrSDate");
              let relrEDate = e.currentTarget.getAttribute("data-relrEDate");
              let rellSDate = e.currentTarget.getAttribute("data-rellSDate");
              let rellEDate = e.currentTarget.getAttribute("data-rellEDate");
              let folderName = e.currentTarget.getAttribute("data-folder"); 
              let robj = {
                rid: e.currentTarget.id.substring(
                  e.currentTarget.id.lastIndexOf("_") + 1
                ),
                rname: e.currentTarget.innerText.split("\n")[0],
                rtimsid: timsId === "na" ? "" : timsId,
                rattribute: attr === "na" ? "" : attr, //temp[1],
                release_attribute: relAttr === "na" ? "" : relAttr,
                start_date:relsDate,
                tcfa_date:reltcfaDate,
                fcs_date:relfcsDate,
                retest_start_date:relrSDate,
                retest_end_date:relrEDate,
                longevity_start_date:rellSDate,
                longevity_end_date:rellEDate,
                folder_name: folderName,
              };
              self1.$refs.rmenu.open(e, robj);
              self1.$refs.pmenu.close();
              self1.$refs.fmenu.close();
              e.preventDefault();
            });
          }
         for (let s = 0; s < self1.releases.length; s++) {
            testcaseService.getProjectListByReleaseId(self1.releases[s].id).then(
              (pdata) => {
                let releaseDivIdName = "release_" + self1.releases[s].id;
                let releaseDiv = document.querySelector("#" + releaseDivIdName);
                /* releaseDiv.getElementsByClassName(
                  "release_count"
                )[0].innerText = pdata.length;*/
                self1.projects[
                  self1.releases[s].name + "_" + self1.releases[s].id
                ] = pdata;
                if (self1.selectedRelease === "") {
                  self1.selectedRelease = "release_" + self1.releases[s].id;
                  self1.selectedReleaseName = self1.releases[s].name;
                }
                let p_template = '<div class="releaseContent">';
                for (let m = 0; m < pdata.length; m++) {
                  p_template +=
                    '<div class="r_projects" data-relId="'+self1.releases[s].id+'" data-relName="'+self1.releases[s].name+'" data-id="'+pdata[m].id+'" data-timsId="'+pdata[m].tims_id+'" id="' +
                    pdata[m].name +
                    "_" +
                    pdata[m].tims_id +
                    "_" +
                    pdata[m].id +
                    '"><i class="icon icon-circle"></i><span class="pname">' +
                    pdata[m].name +
                    "</span></div>";
                }
                p_template += "</div>";
                releaseDiv.insertAdjacentHTML("afterend", p_template);
                let relId = self1.releases[s].id;
                let relName = self1.releases[s].name;
                let customerId = parseInt(this.customerId);
                let prs = document.getElementsByClassName("r_projects");
                for (let z = 0; z < prs.length; z++) {
                  let self = this;
                   prs[z].removeEventListener("dblclick",function(){});
                  prs[z].addEventListener("dblclick", function(e) {
                      let pr_id = this.id.substring(this.id.lastIndexOf("_") + 1);
                       self1.selectedPrId=pr_id;
                      self1.chartShow=false;
                    self1.hideSidebar();

                   self1.selectedPrId = pr_id;

                    self1.releaseFlag = "project";
                    e.preventDefault();
                    e.stopPropagation();
                  });
                  prs[z].removeEventListener("click",function(){});
                  prs[z].addEventListener("click", function(e) {
                     let pr_id = this.id.substring(this.id.lastIndexOf("_") + 1);
                    if(self1.chartShow==="false" || self1.selectedPrId!=pr_id){
                      self1.selectedPrId=pr_id;
                      self1.chartShow=true;
                    let prs = this.id.split("_");
                    self1.releaseFlag = "project";
                    self1.selectedRelease = "project_" + prs[prs.length - 1];
                    self1.selectedReleaseName = this.innerText;
                    self1.drawChart(pr_id,"Project");
                    self1.loadCFDCount("project",pr_id);
                    }
                    e.preventDefault();
                    e.stopPropagation();
                  });
                  prs[z].removeEventListener("contextmenu",function(){});
                  prs[z].addEventListener("contextmenu", function(e) {
                    //hardcoded
                    //let prs = this.id.split("_");
                    let pr_id = e.currentTarget.getAttribute('data-id');
                    let pr_timsId = e.currentTarget.getAttribute('data-timsId');
                    let pr_relId = e.currentTarget.getAttribute('data-relId');
                    let pr_relName = e.currentTarget.getAttribute('data-relName');

                    let pr_name = this.innerText;
                    let pobj = {
                      pid: pr_id,
                      pname: pr_name,
                      rid: pr_relId,
                      rname: relName,
                      timsId: pr_timsId,
                    };
                    self.$refs.pmenu.open(e, pobj);
                    self1.$refs.fmenu.close();
                    self1.$refs.rmenu.close();
                    e.preventDefault();
                    e.stopPropagation(); 
                  });
                }
              },
              (error) => {
                self1.loading = false;
                self1.loadingMessage = "";
              }
            );
          }
        },
        (error) => {
          self1.loading = false;
          self1.loadingMessage = "";
        }
      );
    },
    toTimestamp(strDate){
 var datum = Date.parse(strDate);
 return datum;
},
showEventModal:function(e){
this.showEventModalflag=true;
 this.eventObj={
        release_id:this.releaseDetails.id,
        event_name:"",
        event_start_date:null,
        event_end_date:null,
        event_description:""
      };
      e.preventDefault();
},
closeEventModal:function(){
  this.showEventModalflag=false;
   this.eventObj={
        release_id:"",
        event_name:"",
        event_start_date:null,
        event_end_date:null,
        event_description:""
      };
},
createEvent:function(e){
  if(this.validateEventObj){
   this.showEventModalflag=true;
   let self2=this;
     testcaseService.createEvent([this.eventObj]).then(
          (data) => {
            if (data) {
              self2.loading = false;
              self2.loadingMessage = "";
               let relId=self2.eventObj.release_id;
              self2.closeEventModal();
              self2.loadGanttChart(relId);
            }
          },
          (error) => {
            self2.loading = false;
            self2.loadingMessage = "";
            self2.showErrorModal = true;
            self2.modalErrorMessage =
              "Error while creating event, Please try again later";
          }
        );

e.preventDefault();
  }
},
validateEventObj(){
if(this.eventObj.name=="" || this.eventObj.name===undefined || this.eventObj.name===null||
      this.eventObj.event_start_date===null || this.eventObj.event_start_date===undefined||
      this.eventObj.event_end_date === null || this.eventObj.event_end_date===undefined
      ){
        return false;
        }
      else{
        return true;
      }
},
    createReleaseClicked: function() {
      this.showCreateReleaseModal = true;
      let date = new Date(),
      r_startDate = new Date(),
       r_endDate = new Date(),
       l_startDate = new Date(),
       l_endDate  = new Date();
      r_startDate=r_startDate.setDate(date.getDate()+1);
      r_endDate=r_endDate.setDate(new Date(r_startDate).getDate()+15);
      l_startDate=l_startDate.setDate(new Date(r_endDate).getDate()+1);
      l_endDate=l_endDate.setDate(new Date(l_startDate).getDate()+7);
      this.releaseObj = { customer_id: this.customerId,  retest_start_date: r_startDate,
      retest_end_date:r_endDate,longevity_start_date:l_startDate,longevity_end_date:l_endDate };
    },
    checkNull:function(data){
      if(data==="" || data === null || data==="null" || data===undefined){
        return false;
      }
      else{
        return true;
      }
    },
    rackConfigClicked:function(e){
      location.href="http://csmart-lnx:8082/TestbedManger/#/rackConfigPage/1";
      e.preventDefault();
    },
    addDateRack(e){
      
    },
    closeReleaseCustomerModal: function() {
      this.showCreateReleaseModal = false;
        this.editRelease = false;
      this.createUpdateRelName="Create";
      this.releaseObj = {};
    },
    closeProjectReleaseModal: function() {
      this.showCreateProjectModal = false;
      this.editProject = false;
      this.project_obj = {};
    },
    showSummary(type) {
      this.summaryInfoTitle = type;
      if (type === "Features") {
        this.summaryDetailsObj = this.featureSummary;
        this.showSummaryInfoModal = true;
      } else if (type === "Roles") {
        this.summaryDetailsObj = this.roleSummary;
        this.showSummaryInfoModal = true;
      }else if (type === "PlatfromRoles") {
        this.summaryDetailsObj = this.platformRoleSummary;
        this.showSummaryInfoModal = true;
      }  
      else if (type === "Platforms") {
        this.summaryDetailsObj = this.platformSummary;
        this.showSummaryInfoModal = true;
      } else if (type === "Defects") {
        this.summaryDetailsObj = this.defectSummary;
        this.showCFDSummaryInfoModal = true;
      }
      else if (type === "CFDs") {
       if(this.cfdsLoaded===true){
        this.summaryDetailsObj = this.cfdSummary;
        this.showCFDSummaryInfoModal = true;
        }
        else{
          this.loadCFDS();
          this.calculateCFDSummary();
          this.summaryDetailsObj = this.cfdSummary;
          this.showCFDSummaryInfoModal = true;
        }

    }
     
    },
    openTestcase:function(str){
      
      this.closeCFDSummaryInfoModal();

    },
    chartB1TabClicked(){

    },
    chartB1TabChanged(){

    },
    validateReleaseObj(){
      if(this.releaseObj.name=="" || this.releaseObj.name===undefined || this.releaseObj.name===null||
      this.releaseObj.start_date===null || this.releaseObj.start_date===undefined||
      this.releaseObj.tcfa_date === null || this.releaseObj.tcfa_date===undefined||
      this.releaseObj.fcs_date===null || this.releaseObj.fcs_date===undefined){
        return false;
        }
      else{
        return true;
      }
    },
    createRelease: function(e) {
       this.showCreateReleaseModal = false;
        if(this.validateReleaseObj()){
         if(this.editRelease===false){
        let releaseName = this.releaseObj.name;
        let releaseNames = [];
      if (this.releases.length > 0) {
        for (let i = 0; i < this.releases.length; i++) {
          releaseNames.push(this.releases[i].name);
        }
      }
      if (
        (releaseNames.length > 0 && releaseNames.indexOf(releaseName) < 0) ||
        releaseNames.length <= 0
      ) {
        testcaseService.createRelease([this.releaseObj]).then(
          (data) => {
            if (data) {
              this.loading = false;
              this.loadingMessage = "";
              this.closeReleaseCustomerModal();
              this.loadReleases();
            }
          },
          (error) => {
            this.loading = false;
            this.loadingMessage = "";
            this.showErrorModal = true;
            this.modalErrorMessage =
              "Error while creating Release, Please try again later";
          }
        );
      } else {
        this.loading = false;
        this.loadingMessage = "";
        this.showErrorModal = true;
        this.modalErrorMessage = "Duplicate Releases not allowed.";
      }
      setTimeout(function() {
        this.loading = false;
        this.loadingMessage = "";
      }, 100);
      let releasesBtnlist = document.querySelector(".releasesBtnlist");
      let releasestemplete = "";
      releasestemplete +=
        '<button type="button" class="collapsibleReleases loaderRelease to-right"><span style="margin-left:10px">' +
        this.releaseObj.name +
        '</span><span class="loader1" style="float:right;margin-left:70px;"></span></button>';
      releasesBtnlist.innerHTML += releasestemplete;
      }
      else{
       let relId=this.releaseObj.id;
       this.editRelease=false;
        this.loading="";
        this.loadingMessage="Updating Release.."
        testcaseService.updateRelease([this.releaseObj],relId).then(
          (data) => {
            if (data) {
              this.loading = false;
              this.loadingMessage = "";
              this.closeReleaseCustomerModal();
              this.loadReleases();
            }
          },
          (error) => {
            this.loading = false;
            this.loadingMessage = "";
            this.showErrorModal = true;
            this.modalErrorMessage =
              "Error while updating Release, Please try again later";
          }
        );
     
      }
       }
      else{
         this.loading = false;
        this.loadingMessage = "";
        this.showErrorModal = true;
        this.modalErrorMessage = "Required Error";
      }
        
      e.preventDefault();
    },
  },
};
</script>
<template>
  <div class="customerReleaseDiv">
    <div class="buttonsdiv">
           <button
          class="btn btn--secondary cm_addBtn"
          @click="showSidebar"
        >
          <span
            v-tooltip.right="{
              html: 'showContent',
              class: 'cisco-tooltip',
            }"
          >
            <i class="icon icon-list-menu"> </i>
          </span>
          <div id="showContent">
            Show Sidebar
          </div>
        </button>
        <button class="btn btn--primary cm_addBtn" @click="backButtonClicked">
            <span
              v-tooltip.right="{
                html: 'backButtonContent',
                class: 'cisco-tooltip',
              }"
            >
              <i class="icon icon-back"> </i>
            </span>
            <div id="backButtonContent">
              Back
            </div>
          </button>
          <button
            class="btn btn--primary cm_addBtn"
            @click="createReleaseClicked"
          >
            <span
              v-tooltip.right="{
                html: 'viewTopoContent',
                class: 'cisco-tooltip',
              }"
            >
              <i class="icon icon-plus"> </i>
            </span>
            <div id="viewTopoContent">
              Create Project
            </div>
          </button>
        
          <!--<button class="btn btn--primary cm_addBtn" @click="hideSidebar">
            <span
              v-tooltip.right="{
                html: 'hideContent',
                class: 'cisco-tooltip',
              }"
            >
              <i class="icon icon-chevron-left-double"> </i>
            </span>
            <div id="hideContent">
              Hide
            </div>
          </button>-->
          <button class="btn btn--primary cm_addBtn" @click="showCFDTable">
            <span
              v-tooltip.right="{
                html: 'cfdContent',
                class: 'cisco-tooltip',
              }"
            >
              <i class="icon icon-tables"> </i>
            </span>
            <div id="cfdContent">
              CFD's
            </div>
          </button>
    </div>
    <div class="mainDiv">
    <div class="releasesDiv hideReleaseDiv">
      <div class="releasesListDiv">
        <div class="createReleaseBtn">
        
        </div>
        <div class="releasesBtnlist"></div>
      </div>
    </div>
    <div class="dashboardDiv">
      <div>
        <div class="row releaseSummaryDiv">
       <!-- <div class="col-lg-3 col-md-3" style="padding-right: 5px;">
         <div class="r_chartDiv" id="chart1Div">
              <chart   v-on:child="onChildInteraction" id="chart1" :option="executionSummaryOption"></Chart>
        </div>
         <div class="r_chartDiv">
              <chart   v-on:child="onChildInteraction" id="chart2" :option="executionSummaryOption1"></Chart>
            </div>
          <div class="r_chartDiv">
              <chart   v-on:child="onChildInteraction" id="chartab2" :option=" platformRoleOption"></Chart>
            </div>
          <div class="r_chartDiv">
              <chart   v-on:child="onChildInteraction" id="chartab1" :option="userOption"></Chart>
            </div>
        </div>-->
        <div class="col-lg-12 col-md-12">
        <div class="slidesBtn">
           <button class="r_summaryDiv c_testcases">
                <div class="totalCount">{{ totalTestcases }}</div>
                <div class="">Testcases</div>
           </button>
           <button class="r_summaryDiv c_executionSummary">
                <div class="totalCount">{{ totalExecuted }}%</div>
                <div class="">Executed</div>
           </button>
           <button class="r_summaryDiv c_qualitySummary">
                <div class="totalCount">{{ totalQuality }}%</div>
                <div class="">Quality</div>
           </button>
              <button
                class="r_summaryDiv c_platforms"
                @click="showSummary('Platforms')"
              >
                 <div class="totalCount">{{ totalPlatforms }}</div>
                <div class="">Platforms</div>
              </button>
               <button
                class="r_summaryDiv c_roles"
                @click="showSummary('Roles')"
              >
                 <div class="totalCount">{{ totalRoles }}</div>
                <div class="">Roles</div>
              </button>
               <button
                class="r_summaryDiv c_features"
                @click="showSummary('Features')"
              >
                <div class="totalCount">{{ totalFeatures }}</div>
                <div class="">Features</div>
             </button>
               <button
                class="r_summaryDiv c_defects"
                @click="showSummary('Defects')"
              >
                <div class="totalCount">{{ totalDefects }}</div>
                <div class=""> Defects</div>
              </button>
               <button class="r_summaryDiv c_cfd" @click="showSummary('CFDs')">
                <div class="totalCount">{{ totalCFD }}</div>
                <div class="">CFDs</div>
               </button>
                <button class="r_summaryDiv c_logs">
                <div class="totalCount">{{ testcasesWithLogs }}</div>
                <div class="">Logs</div>
               </button>
               <button class="r_summaryDiv c_duration">
               <div class="totalCount">{{totalAutomated}}</div>
                <div class="">Automated</div>
              </button>
              
            </div>
            <div class="belowCharts row">
            <div class="width30Per">
                <div class="r_chartDiv">
               <button
            class="btn btn--primary grphBtn"
            @click="showExecutionPie=!showExecutionPie"
              >
            <span>
              <i class="icon icon-graph"> </i>
            </span>
          </button>  
              <chart   v-on:child="onChildInteraction" id="chart_a1" class="chartsA"  v-show="showExecutionPie" :option="executionSummaryOption"></Chart>
              <chart   v-on:child="onChildInteraction" id="chart_a2" class="chartsA" v-show="!showExecutionPie" :option="executionSummaryOption1"></Chart>
             </div>
            </div>
            <div class="width70Per">
               <div class="contentGraph">
                <button
            class="btn btn--primary grphBtn"
            @click="toggleGanttOptions"
              >
            <span>
              <i class="icon icon-graph"> </i>
            </span>
          </button>  
       <GanttChart   v-on:child="onChildInteraction" id="timeLineChart" :option="ganttOptions"></GanttChart>
       <div id="buttonGroup" class="button-row">
        <button class="btn btn--primary addEventBtn" id="btnShowDialog" @click="showEventModal">
            <i class="icon icon-plus"></i>
            Add Event
        </button>
        <button class="btn btn--primary addEventBtn" id="btnRemoveSelected" disabled="removeEventdisabled">
            <i class="icon icon-delete"></i>
            Remove selected
        </button>
        </div>
      </div>

            </div>
            </div>
            <div class="belowCharts1 row">
             <div class="width40Per">
               <div class="b_chartDiv">
            <tabs
          id="chartB1Tabs"
          name="chartB1Tabs"
          :options="{ useUrlFragment: false }"
          @clicked="chartB1TabClicked"
          @changed="chartB1TabChanged">
           <tab
            name="Role"
            class="qualityRoleChart"
            ref="Role"
          >
          <chart   v-on:child="onChildInteraction" id="chart_b1" class="chartsB" :option="qualityOption"></Chart>
          </tab>
           <tab
            name="Platform"
            class="qualityPlatformChart"
            ref="Platform"
          >
          <chart   v-on:child="onChildInteraction" id="chart_b2" class="chartsB" :option="qualityPlatformOption"></Chart>
          </tab>
           <tab
            name="Source"
            class="qualityPlatformChart"
            ref="Source"
          >
          <chart   v-on:child="onChildInteraction" id="chart_b3" class="chartsB" :option="qualitySrcOption"></Chart>
          </tab>
           <tab
            name="Feature"
            class="qualityRoleChart"
            ref="Feature"
          >
          <chart   v-on:child="onChildInteraction" id="chart_b4" class="chartsB" :option="qualityFeatureOption"></Chart>
          </tab>
         </tabs>
            </div>
             </div>
             <div class="width30Per">
              <div class="b_chartDiv">
              <chart   v-on:child="onChildInteraction" id="chart_c1" class="chartsA" :option="defectOption"></Chart>
            </div>
             </div> 
              <div class="width30Per">
               <div class="b_chartDiv">
              <chart   v-on:child="onChildInteraction" id="chart_c2" class="chartsA" :option="mhHaveOption"></Chart>
            </div>
             </div> 

            </div>
        </div>

        
        </div>
      </div>
     <div class="secondpage">
     
      <div class="row">
      <div class="cvtChart width50Per">
      <chart   v-on:child="onChildInteraction" id="cvtChart" :option="cvtOptions"></Chart>
      </div>
      <div class="testcaseLineChart width40Per">
       <chart   v-on:child="onChildInteraction" id="splineChart" :option="splineOptions"></Chart>
      </div>
      </div>
      <div class="row" style="margin-left: 30px;margin-right: 10px;">
      <div class="width40Per">
               <div class="b_chartDiv">
                <tabs
          id="chartB2Tabs"
          name="chartB2Tabs"
          :options="{ useUrlFragment: false }"
          @clicked="chartB1TabClicked"
          @changed="chartB1TabChanged">
           <tab
            name="Role"
            class="qualityRoleChart"
            ref="Role"
          >
          <chart   v-on:child="onChildInteraction" id="chart_b5" class="chartsB" :option="roleOption"></Chart>
          </tab>
           <tab
            name="Platform"
            class="qualityPlatformChart"
            ref="Platform"
          >
          <chart   v-on:child="onChildInteraction" id="chart_b6" class="chartsB" :option="platformOption"></Chart>
          </tab>
           <tab
            name="Source"
            class="qualityPlatformChart"
            ref="Source"
          >
          <chart   v-on:child="onChildInteraction" id="chart_b7" class="chartsB" :option="srcOption"></Chart>
          </tab>
           <tab
            name="Feature"
            class="qualityRoleChart"
            ref="Feature"
          >
          <chart   v-on:child="onChildInteraction" id="chart_b8" class="chartsB" :option="featureOption"></Chart>
          </tab>
         </tabs>
               </div>
      </div>
      <div class="width30Per">
              <div class="b_chartDiv">
                <chart   v-on:child="onChildInteraction" id="chart8" :option="componentOption"></Chart>
             </div>
      </div>
      <div class="width30Per">
              <div class="b_chartDiv">
               <chart   v-on:child="onChildInteraction" id="chart9" :option="statusOption"></Chart>
              </div>
      </div>
               
      </div>
      </div>
      <div class="thirdPage">
      <div class="row defectChartContainer">
      <div class="defectChart">
       <button
            class="btn btn--primary grphBtn"
            @click="showPie=!showPie"
              >
            <span>
              <i class="icon icon-graph"> </i>
            </span>
          </button> 
              <chart   v-on:child="onChildInteraction" id="chart_a31" class="chartsA" :option="userOption" v-show="showPie"></Chart>
              <chart   v-on:child="onChildInteraction" id="chart_a32" class="chartsA" :option="testcaseDefectsByUsersOption" v-show="!showPie"></Chart>
            
      </div>
       <div class="defectChart">
        <chart   v-on:child="onChildInteraction" id="chart7" :option="submitterOption"></Chart>
      </div>
       <div class="defectChart">
       
      </div>
      </div>
      <div class="row defectTablecontainer">
       <div class="cdetsTable">
        <table id="cdetsTable" class="table table--highlight secondaryTable">
            <tr>
            <th class="stickyTh" style="width:10%;text-align:center;">Identifier</th>
            <th class="stickyTh" style="width:35%;text-align:left;">Headline</th>
            <th class="stickyTh" style="width:15%;text-align:left;">Component</th>
            <th class="stickyTh" style="width:15%;text-align:left;">Submitter</th>
            <th class="stickyTh" style="width:15%;text-align:left;">Status</th>
            <th class="stickyTh" style="width:10%;text-align:center;">#TCs</th>
            </tr>
            <template class="cdetsTr" v-for="(cdetObj,index) in selectedCdets">
            <tr :key="index">
              <td style="width:10%;text-align:center;">{{cdetObj.defect_id}}</td>
              <td style="width:35%;text-align:left;padding-left:20px">{{cdetObj.headline}}</td>
              <td style="width:15%;text-align:left;padding-left:20px">{{cdetObj.component}}</td>
              <td style="width:15%;text-align:left;padding-left:20px">{{cdetObj.submitter}}</td>
              <td style="width:15%;text-align:left;padding-left:20px">{{cdetObj.status}}</td>
              <td style="width:10%;text-align:center;">{{cdetObj.tcCount}}</td>
            </tr>
            </template>
       </table>
       </div>
      </div>
      </div>
      <div>
        <TestcaseList
         v-if="showTestcases"
         :testcaseArrayFlag="testcasesFlag"
          :testcaseArray="selectedTestcases"
         :projectId="selectedPrId"
          :customerId="customerId"
          :customerName="customerName"
          :releaseId="selectedRelId"
          :releaseFlag="releaseFlag"
          :folderName="folderName"
          :syncFlag="syncFlag"
          v-on:child="onChildInteraction"
        ></TestcaseList>
      </div>
    
    </div>
    </div>
    <div class="context_modals">
      <ContextMenu ref="fmenu" class="fmenu">
        <template slot-scope="{ contextData }">
          <ContextMenuItem @click.native="deleteFolderClicked(contextData)">
            Delete Release
          </ContextMenuItem>
        </template>
      </ContextMenu>
      <ContextMenu ref="rmenu" class="rmenu">
        <template slot-scope="{ contextData }">
          <ContextMenuItem @click.native="createProjectClicked($event,contextData)">
            Create Folder
          </ContextMenuItem>
          <ContextMenuItem @click.native="editReleaseClicked($event,contextData)">
            Edit Project
          </ContextMenuItem>
          <ContextMenuItem @click.native="deleteReleaseClicked(contextData)">
            Delete Project
          </ContextMenuItem>
          <ContextMenuItem @click.native="relSyncBtnClicked($event,contextData)">
            Sync from Tims
          </ContextMenuItem>
          <ContextMenuItem @click.native="uploadRelSyncBtnClicked($event,contextData)">
            Upload to Tims
          </ContextMenuItem>
        </template>
      </ContextMenu>
      <ContextMenu ref="pmenu" class="pmenu">
        <template slot-scope="{ contextData }">
          <ContextMenuItem
            @click.native="EditProjectClicked($event, contextData)"
          >
            Edit Folder
          </ContextMenuItem>
          <ContextMenuItem
            @click.native="deleteProjectClicked(contextData)"
          >
            Delete Folder
          </ContextMenuItem>
          <ContextMenuItem @click.native="syncBtnClicked($event, contextData)">
            Sync from Tims
          </ContextMenuItem>
           <ContextMenuItem @click.native="uploadPrSyncBtnClicked($event, contextData)">
           Upload to Tims
          </ContextMenuItem>
        </template>
      </ContextMenu>
    </div>
    <div v-if="showEventModalflag" class="createEventModal">
       <div class="modal__body" style="display:flex; justify-content:center;">
        <form class="create_event">
         <div class="modal_title">Create Event</div>
          <span
          class="icon-close icon-small interaction closeBtn"
          v-on:click="closeEventModal()"
         ></span>
         <div class="form-group__text tm-form__text">
            <label class="cm-label">
              Event Name
            </label>
            <input
              type="text"
              name="eventName"
              style="width: 100%;"
              v-model="eventObj.event_name"
            />
          </div>
          <div class="form-group__text tm-form__text" style="position:relative;">
            <label class="cm-label">
             Event Start Date
            </label>
             <date-picker
              v-model="eventObj.event_start_date"
               @change="addDateRack"
                 :format="format" value-type="format"
              :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
            <div class="form-group__text tm-form__text" style="position:relative;">
            <label class="cm-label">
             Event End Date
            </label>
             <date-picker
              v-model="eventObj.event_end_date"
               @change="addDateRack"
                 :format="format" value-type="format"
              :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
            <div class="form-group tm-form-group">
          <div class="form-group__text tm-form__text">
            <textarea
              v-model="eventObj.event_description"
              style="display: block;
            "
            ></textarea>
            <label class="tm-label">
              Description
            </label>
          </div>
        </div>
         <div class="tm_btn-container">
            <button
              class="btn btn--secondary tmBtn"
              @click="closeEventModal()"
              style="font-size:1.4rem;"
            >
              Cancel
            </button>
            <button
              class="btn btn--secondary tmBtn"
              @click="createEvent"
              style="font-size:1.4rem;"
            >
              Create
            </button>
            
          </div>
        </form>
    </div>
    </div>
    <div v-if="showCreateReleaseModal" class="createCustomerModal">
      <div class="modal__body" style="display:flex; justify-content:center;">
        <form class="create_customer">
         <div class="modal_title">Create Project</div>
      <span
          class="icon-close icon-small interaction closeBtn"
          v-on:click="closeReleaseCustomerModal()"
        ></span>
          <div class="form-group__text tm-form__text">
            <label class="cm-label">
              Release Name
            </label>
            <input
              type="text"
              v-model="releaseObj.folder_name"
              list="folders"
              style="width: 100%;"
            />
            <datalist id="folders" style="width: 100%;">
              <option v-for="(folder_name, index) in folders" :key="index">{{
                folder_name
              }}</option>
            </datalist>
          </div>
          <div class="form-group__text tm-form__text">
            <label class="cm-label">
              Project Name
            </label>
            <input
              type="text"
              name="release"
              style="width: 100%;"
              v-model="releaseObj.name"
            />
          </div>
          <div class="form-group__text tm-form__text">
            <label class="cm-label">
              Attribute
            </label>
            <input
              type="text"
              v-model="releaseObj.attribute"
              style="width: 100%;"
            />
          </div>
          <div class="form-group__text tm-form__text">
            <label class="cm-label">
              Release Attribute
            </label>
            <input
              type="text"
              v-model="releaseObj.release_attribute"
              style="width: 100%;"
            />
          </div>
          <div class="form-group__text tm-form__text">
            <label class="cm-label">
              Tims Id
            </label>
            <input
              type="text"
              :readonly="checkNull(releaseObj.timsId)"
              name="releaseObj.tims_id"
              style="width: 100%;"
              v-model="releaseObj.tims_id"
            />
          </div>
        
           <div class="form-group__text tm-form__text" style="position:relative;">
            <label class="cm-label">
              Start Date
            </label>
             <date-picker
              v-model="releaseObj.start_date"
               @change="addDateRack"
                 :format="format" value-type="format"
              :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
             <div class="form-group__text tm-form__text" style="position:relative;">
            <label class="cm-label">
              TCFA Date
            </label>
             <date-picker
               :format="format" value-type="format"
              v-model="releaseObj.tcfa_date"
               :lang="lang"
              style="width: 100%;"
            ></date-picker>
            </div>
             <div class="form-group__text tm-form__text" style="position:relative;">
            <label class="cm-label">
              Retest Start
            </label>
             <date-picker
               :format="format" value-type="format"
              v-model="releaseObj.retest_start_date"
               :lang="lang"
              style="width: 100%;"
            ></date-picker>
            </div>
             <div class="form-group__text tm-form__text" style="position:relative;">
            <label class="cm-label">
              Retest End
            </label>
             <date-picker
               :format="format" value-type="format"
              v-model="releaseObj.retest_end_date"
               :lang="lang"
              style="width: 100%;"
            ></date-picker>
            </div>
              <div class="form-group__text tm-form__text" style="position:relative;">
            <label class="cm-label">
              Longevity Start
            </label>
             <date-picker
               :format="format" value-type="format"
              v-model="releaseObj.longevity_start_date"
               :lang="lang"
              style="width: 100%;"
            ></date-picker>
            </div>
               <div class="form-group__text tm-form__text" style="position:relative;">
            <label class="cm-label">
              Longevity End
            </label>
             <date-picker
               :format="format" value-type="format"
              v-model="releaseObj.longevity_end_date"
               :lang="lang"
              style="width: 100%;"
            ></date-picker>
            </div>
               <div class="form-group__text tm-form__text" style="position:relative;">
            <label class="cm-label">
              FCS Date
            </label>
             <date-picker
               :format="format" value-type="format"
              v-model="releaseObj.fcs_date"
               :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
             <div class="form-group__text tm-form__text">
            <label class="cm-label">
             Resources
            </label>
            <input
              type="text"
              v-model="releaseObj.resources"
              list="folders"
              style="width: 100%;"
            />
            <datalist id="resources" style="width: 100%;">
              <option v-for="(resource, index) in userSummary" :key="index">{{
                resource.name
              }}</option>
            </datalist>
          </div>

          <div class="form-group__text tm-form__text">
            <label class="cm-label">
              Customer Name
            </label>
            <input
              type="text"
              disabled
              style="width: 100%;"
              name="customer"
              v-model="customerName"
            />
          </div>
          <div class="tm_btn-container">
            <button
              class="btn btn--secondary tmBtn"
              @click="closeReleaseCustomerModal()"
              style="font-size:1.4rem;"
            >
              Cancel
            </button>
            <button
              class="btn btn--secondary tmBtn"
              @click="createRelease"
              style="font-size:1.4rem;"
            >
              {{createUpdateRelName}}
            </button>
            
          </div>
        </form>
      </div>
    </div>
    <div v-if="showCreateProjectModal" class="createCustomerModal">
      <div
        class="modal__header"
        style="display:flex; justify-content:space-between; margin-bottom:5px;"
      >
        <div class="modal_title">Create Folder</div>
        <span
          class="icon-close icon-small interaction"
          v-on:click="closeProjectReleaseModal()"
        ></span>
      </div>
      <div class="modal__body" style="display:flex; justify-content:center;">
        <form class="create_customer">
          <div class="form-group__text tm-form__text">
            <label class="cm-label">
              Folder Name
            </label>
            <input type="text" name="release" style="width:100%" v-model="project_obj.name" />
          </div>
          <div class="form-group__text tm-form__text">
            <label class="cm-label">
              TIMS Id
            </label>
            <input
              type="text"
              name="timsId"
              style="width:100%"
              :readonly="checkNull(project_obj.tims_id)"
              v-model="project_obj.tims_id"
            />
          </div>
          <div class="form-group__text tm-form__text">
            <label class="cm-label">
              Project Name
            </label>
            <input
              type="text"
              disabled
              name="customer"
              style="width:100%"
              v-model="project_obj.r_name"
            />
          </div>
          <div class="tm_btn-container">
            <button
              class="btn btn--secondary tmBtn"
              @click="closeProjectReleaseModal()"
              style="font-size:1.4rem;"
            >
              Cancel
            </button>
            <button
              class="btn btn--secondary createProjectBtn tmBtn"
              @click="createProject"
              style="font-size:1.4rem;"
              v-if="editProject"
            >
              Update
            </button>
            <button
              class="btn btn--secondary createProjectBtn tmBtn"
              @click="createProject"
              style="font-size:1.4rem;"
              v-else
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
    <div
      v-if="loading"
      class="loadingModal"
      style=" height: 60px !important;
        position: absolute !important;     z-index: 100000;"
    >
      <div class="modal__body" style="display:flex; justify-content:center;">
        {{ loadingMessage }}
      </div>
    </div>
    <div v-if="showErrorModal" class="ErrorModal">
      <div
        class="modal__header"
        style="display:flex; justify-content:space-between; margin-bottom:5px;"
      >
        <div class="modal_title">Error</div>
        <span
          class="icon-close icon-small interaction"
          v-on:click="closeErrorModal()"
        ></span>
      </div>
      <div class="modal__body" style="display:flex; justify-content:center;">
        {{ modalErrorMessage }}
      </div>
    </div>
    <div v-if="showInfoModal" class="ErrorModal">
      <div
        class="modal__header"
        style="display:flex; justify-content:space-between; margin-bottom:5px;"
      >
        <div class="modal_title">Info</div>
        <span
          class="icon-close icon-small interaction"
          v-on:click="closeInfoModal()"
        ></span>
      </div>
      <div class="modal__body" style="display:flex; justify-content:center;">
        <div :class="showInfoModalClass">{{ modalInfoMessage }}</div>
      </div>
    </div>
    <div v-if="showConfirmModal" class="confirmModal">
          <div
            class="modal__header"
            style="display:flex; justify-content:space-between; margin-bottom:5px;"
          >
            <div class="modal_title">Confirm</div>
            <span
              class="icon-close icon-small interaction"
              v-on:click="closeConfirmModal()"
            ></span>
          </div>
          <div
            class="modal__body"
            style="display:flex; justify-content:center;"
          >
            <div style="width:100%">{{ modalConfirmMessage }}</div>
			<div class="tm_btn-container" style="width:100%">
              <button
                class="btn btn--secondary tmBtn"
                @click="closeConfirmModal()"
                style="font-size:1.4rem;"
              >
                Cancel
              </button>
              <button
                class="btn btn--secondary tmBtn"
                @click="confirmDelete()"
                style="font-size:1.4rem;"
              >
                OK
              </button>
            </div>
          </div>
		  
        </div>
    <div v-if="showSummaryInfoModal" class="summaryDisplayModal">
      <div
        class="modal__header"
        style="display:flex; justify-content:space-between; margin-bottom:5px;"
      >
        <div class="modal_title">{{ summaryInfoTitle }}</div>
        <span
          class="icon-close icon-small interaction"
          v-on:click="closeSummaryInfoModal()"
        ></span>
      </div>
      <div class="modal__body" style="display:flex; justify-content:center;">
        <table class="table table--highlight secondaryTable">
          <tr
            v-for="(value, propertyName, index) in summaryDetailsObj"
            :key="index"
          >
            <td style="text-align: left;">{{ propertyName }}</td>
            <td>{{ value }}</td>
          </tr>
        </table>
      </div>
    </div>
     <div v-if="showCFDSummaryInfoModal" class="cfdSummaryDisplayModal">
      <div
        class="modal__header"
        style="display:flex; justify-content:space-between; margin-bottom:5px;"
      >
        <div class="modal_title">{{ summaryInfoTitle }}</div>
        <span
          class="icon-close icon-small interaction"
          v-on:click="closeCFDSummaryInfoModal()"
        ></span>
      </div>
      <div class="modal__body" style="display:flex; justify-content:center;">
        <table class="table table--highlight secondaryTable">
        <tr>
        <th style="text-align: left;">{{summaryInfoTitle}}
        </th>
        <th style="text-align: left;">Count</th>
         <th style="text-align: left;">Testcases</th>
           <th style="text-align: left;">Component</th>
             <th style="text-align: left;" v-if="summaryInfoTitle==='CFDs'">Product</th>
              <th style="text-align: left;" v-if="summaryInfoTitle==='Defects'">Status</th>
          <th style="text-align: left;white-space:pre-wrap;width:25%">Headline</th>
        </tr>
          <tr
            v-for="(item,propertyname,index) in summaryDetailsObj"
            :key="index"
          >
            <td style="text-align: left;">{{ propertyname }}</td>
            <td style="text-align: left;">{{ item.count }}</td>
            <td style="text-align: left;"><template v-for="str,index1 in item.testcaseId"><span :key="index1" v-if="index1>0">,</span><a style="margin-left: 5px;" :key="'a'+index1" @click="openTestcase(str)">{{ str }}</a></template></td>
             <td style="text-align: left;">{{ item.component }}</td>
             <td style="text-align: left;white-space:pre-wrap;" v-if="summaryInfoTitle==='CFDs'">{{item.product}}</td>
              <td style="text-align: left;white-space:pre-wrap;"  v-if="summaryInfoTitle==='Defects'">{{ item.status }}</td>
            <td style="text-align: left;white-space:pre-wrap;width:25%">{{ item.headline }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div v-if="showCFDModal" class="CFDTableModal">
      
     <div
        class="modal__header"
        style="display:flex; justify-content:space-between;float: right; background:#fff; padding-bottom:0px; border-bottom:none;height:0px;"
      >
        <span
          class="icon-close icon-small interaction"
          v-on:click="closeCFDModal($event)"
        ></span>
      </div>
      <div class="modal__body" style="display:block !important; justify-content:center;margin: 10px;margin-top:0 !important;margin-left: 5px;">
     
          <div style="width:98%;">
            <tabs
          id="custReleaseTables"
          name="Tabs"
          :options="{ useUrlFragment: false }"
          @clicked="cfdTabClicked"
          @changed="cfdTabChanged"
         
        >
        <template v-for="(custRelease, index) in custReleaseArray" >
        <tab
            :name="custRelease"
            class="chart1Tab"
            :ref="custRelease"
             :key="index"

          >
           <div style="text-align: right;">
      <button
            class="btn btn--primary cm_addBtn"
            @click="addCFDClicked"
          >
            <span>
              <i class="icon icon-plus"> </i>
            </span>
          </button>
          </div>
          <table class="table table--highlight secondaryTable">
          <tr>
            <th style="text-align: left;width:15%">
              SL NO
            </th>
            <th style="text-align: left;width:15%">
              DDTS Id
            </th>
            <th style="text-align: left;width:15%">
              Category
            </th>
            <th style="text-align: left;width:15%">
              GISO Version
            </th>
            <th style="text-align: left;width:15%">
              Component
            </th>
            <th style="text-align: left;width:15%">
              Headline
            </th>
          </tr>
          <template v-if="addCFD">
            <tr>
            <td style="text-align: left;width:12%;margin-left:5px;">
              
            </td>
             <td style="text-align: left;width:10%;margin-left:5px;">
             Defect Id
            </td>
             <td style="text-align: left;width:10%;margin-left:5px;">
              Customer Release
            </td>
             <td style="text-align: left;width:10%;margin-left:5px;">
              Category
           </td>
             <td style="text-align: left;width:10%;margin-left:5px;">
              GISO Version
            </td>
             <td  style="text-align: left;width:14%;">
              </td>
              </tr>
          <tr>
            <td style="text-align: left;width:12%;margin-left:5px;">
              
            </td>
             <td style="text-align: left;width:11%;margin-left:5px;">
              <input type="text" name="defect_id" v-model="addCFDObj.defect_id" />
            </td>
             <td style="text-align: left;width:11%;margin-left:5px;">
               <input type="text" name="customer_release" v-model="addCFDObj.customer_release" />
            </td>
             <td style="text-align: left;width:11%;margin-left:5px;">
              <input type="text" name="category" v-model="addCFDObj.category" />
            </td>
             <td style="text-align: left;width:11%;margin-left:5px;">
              <input type="text" name="GISO_Version" v-model="addCFDObj.GISO_Version" />
            </td>
             <td  style="text-align: left;width:15%;">
                 <button type="button" @click="saveCFD($event)" style="padding: 6px 12px;" class="btn btn-success"><i class="icon icon-save"></i></button>
            <button type="button" @click="CancelCFD($event)"  style="padding: 6px 12px;" class="btn btn-danger"><i class="icon icon-close"></i></button>
              </td>
             </tr>
             </template>
          <tr v-for="(cfdObj, index) in cfdPaginatedData" :key="index">
           <td style="text-align: center;width:15%;margin-left:5px;">
              {{ cfdObj.index }}
            </td>
            <td style="text-align: left;width:15%;margin-left:5px;">
              {{ cfdObj.defect_id }}
            </td>
             <td style="text-align: left;width:15%;margin-left:5px;">
              {{ cfdObj.category }}
            </td>
            <td style="text-align: left;width:15%;margin-left:5px;">
              {{ cfdObj.GISO_Version }}
            </td>
            <td style="text-align: left;width:15%;margin-left:5px;">
              {{ cfdObj.component }}
            </td>
            <td style="text-align: left;width:15%;margin-left:5px;">
              {{ cfdObj.headline }}
            </td>
           </tr>
        </table>
        <transition name="fade">
          <div v-if="cfdHasPagination" class="paginationWrapper">
            <div class="flex flex-center paginationDiv">
              <div class="base-margin-bottom">
                <ul class="pagination pagination--small">
                  <li class="invertedColoring" v-if="cfdHasPrevious">
                    <a @click="prevPage">Prev</a>
                  </li>
                  <li
                    class="invertedColoring"
                    v-for="page in cfdPageCount"
                    v-bind:key="page"
                  >
                    <a :class="paginationClass(page)" @click="goToPage(page)">
                      {{ page }}
                    </a>
                  </li>
                  <li class="invertedColoring" v-if="cfdHasNext">
                    <a @click="nextPage">Next</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </transition>
         </tab>
          </template>
           </tabs>

        <!---->
          </div>
          <!-- -->
      </div>
    </div>
  </div>
</template>
<style scoped>
.mx-datepicker-range {
  border: none;
  margin-right: 20px;
  margin-top: 5px;
  width: 240px !important;
  min-width: 240px !important;
  max-width: 240px !important;
  z-index: 1000000;
}
</style>
