
<script>
import { router } from "@/router";
import { store } from "../store/store";
import TestcaseList from "./testcaseList";
import UniqueTestcaseCharts from "./uniquesTestcaseCharts";
import { options } from "@/assets/options";
import DatePicker from "vue2-datepicker";
import VueBootstrapTable from "vue2-bootstrap-table2";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import "vue2-datepicker/index.css";
import moment from "moment-timezone";
import { testcaseService } from "@/core/services/testcaseService";

import ContextMenu from "../components/global/ContextMenu/ContextMenu";
import { Tabs, Tab } from "vue-tabs-component";
import ContextMenuItem from "../components/global/ContextMenu/ContextMenuItem";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import Chart from "./Chart";
import MiniChart from "./MiniChart";
import GanttChart from "./GanttChart";
import Highcharts from "highcharts";
import { VueEditor } from "vue2-editor";
import ExecutionSummaryTable from './ExecutionSummaryTable.vue';
import ReleaseNoteWeeklyReport from './ReleaseNoteWeeklyReport.vue';
import UpgradeMatrixTable from './UpgradeMatrixTable.vue';
import TriggerMatrixTable from './TriggerMatrixTable.vue';

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
      mainCdets:[],
      statusTabs:[],
      statusTabsArr:{},
      execProjects:[],
      execrelName:"",
      proj_cust_Selected:false,
      applyChangesTo:"project",
      showExecSummaryModal:false,
      showUpgradeMatrixModal:false,
      showTriggerMatrixModal:false,
      showRelModal:false,
      custTotalReleases:[],
      custSelectedReleases:[],
      custSelectedReleasesForAHA:[],
      custSelected:false,
      editingRow:false,
       editing1Row:false,
       editingAha:false,
      showZoomChart:false,
      showSplineDataTable:false,
      showCVTDataTable:false,
      zoomChartOptions:{},
      ganttChartPointWidth:"35",
      weeklyReportFlag:"",
       custSplideOptions: {
        rewind: true,
        width: "100%",
        perPage: 3,
        gap: "1rem",
        perMove: 1,
        speed: 600,
        autoplay: true,
      },
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
      showingUnique:false,
      copyOfSelectedTestcases:[],
      mhDefectsCount:0,
      showCdetsTable:false,
      showCustGraphs:false,
      showReleaseSummary:false,
      showAHASummary:false,
      showReleaseDefectSummary:false,
      colorscheme:"default-scheme",
      releaseBarExpanded:false,
      projectBarExpanded:false,
      weeklyReport:[],
      selectedWeekData:{},
      selectedWeekData1:{},
      weekIndex:0,
      weekIndex1:0,
      oneLineGantt:false,
      format:"YYYY-MM-DDTHH:mm:ss",
      showTims:false,
      timsUrl:"",
      deleteObj:{},
      deleteConfirmed:false,
      deleteType:"",
      selectedMenu:"",
      showExecutionPie:false,
      modalConfirmMessage:"",
      deleteConfirmParams:[],
      deleteConfirmFunction:"",
      showConfirmModal:false,
      testcases:[],
      releaseDetails:{},
      releaseDetails1:{},
      plannedReleaseDetails:{},
      plannedDetailsAdded:false,
      selectedTestcases:[],
      testcaseDefects:[],
      selectedRelId: "",
      selectedCustomerName:"",
      addCFD:false,
      selectedCFDRelease:"",
      cfdFeatureDataList:[],
      pagination: false,
      custReleaseArray:[],
      cfdPageNumber: 0,
      showCFDModal: false,
      cfdDataList: [],
      selectedAHARows:[],
      selectedAHAList:[],
      selectedPrId: "",
      releaseFlag: "release",
      summaryButtonsDetails:{
        totalTestcases:0,
testcasesExecuted:{count:0,percentage:0},
testcasesPending:{count:0,percentage:0},
resultQuality:{
  resultQuality:0,
  projectedResultQuality:0
},
totalPlatforms:0,
totalRoles:0,
totalFeatures:0,
totalDefects:0,
totalCFD:0,
logDetails: {
Automation: 0,
Manual: 0,
totalLogs: 0
},
emptyProcedure:0,
totalAutomatedTestcases:0,
unique_testcases:0,
defects:{},
feature:{},
platform:{},
role:{},

      },
      folderName:"",
      showTestcases: false,
      gotoTestcase:false,
      sidebarHidden: true,
      totalTestcases: 0,
      totalFeatures: 0,
      totalDuration: 0,
      totalCompletedDuration: 0,
      totalDefects: 0,
      day:1000 * 60 * 60 * 24,
      totalAutomated:0,
      totalAutomatedCount:0,
      showPie:true,
      totalPlatforms: 0,
      totalExecuted:0,
      totalPending:0,
      totalExecutedCount:0,
      totalQuality:0,
      totalActualQuality:0,
      totalProjectedQuality:0,
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
      testcasesWithoutProcedure:0,
      selectedRelease: "",
      selectedReleaseName: "",
      selectedProjectName:"",
      folder_name: "",
      folders: [],
      folderList: [],
      releases: [],
      releaseObj: {
        start_date:new Date(),
      },
      project_obj: {},
      summary_customers:[{
 customer_name:"",
 onTrackDelay:"",
 options:{},
 executionSummary:{
  "summary":"",
 "passed":0,
 "failed":0,
 "executed":0,
 "pending":0
 }
},
{
customer_name:"",
onTrackDelay:"delay",
options:{},
 executionSummary:{
   "summary":"",
"passed":0,
 "failed":0,
 "executed":0,
 "pending":0
 }
},
{
 customer_name:"",
 onTrackDelay:"",
 options:{},
 executionSummary:{
 "passed":0,
 "failed":0,
 "executed":0,
 "pending":0
 }
},
{
customer_name:"",
onTrackDelay:"delay",
options:{},
 executionSummary:{
"passed":0,
 "failed":0,
 "executed":0,
 "pending":0
 }
},
{
 customer_name:"",
 onTrackDelay:"",
 options:{},
 executionSummary:{
 "passed":0,
 "failed":0,
 "executed":0,
 "pending":0
 }
},
{
customer_name:"",
onTrackDelay:"delay",
options:{},
 executionSummary:{
"passed":0,
 "failed":0,
 "executed":0,
 "pending":0
 }
},
{
 customer_name:"",
 onTrackDelay:"",
 options:{},
 executionSummary:{
 "passed":0,
 "failed":0,
 "executed":0,
 "pending":0
 }
},
{
customer_name:"",
onTrackDelay:"delay",
options:{},
 executionSummary:{
"passed":0,
 "failed":0,
 "executed":0,
 "pending":0
 }
}],
      error: false,
      showAhaTable:false,
      ahaList:[],
      uniqueChartsData:{},
      uniqueCount:0,
      ahaTableColumns:[],
      errorMessage: "",
      loading: false,
      loadingMessage: "",
      loading1: false,
      loadingMessage1: "",
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
      fcsStatus:"",
      summaryObj:{
      summary:"",
      defectSummary:"",
      },
      currentPhase:"",
      nextmilestone:"",
      nextmilestoneStatus:"",
      removeEventdisabled:true,
      selectedEvents:[],
      selectedEventIds:[],
      showCreateProjectModal: false,
      editProject: false,
      editRelease:false,
      showProjectPlanForm:false,
      projects: {},
      seletedUsers:"",
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
      ahaImageUploaded:false,
      syncFlag: 0,
     pie_option:options.pie_option,
     pie_option2:options.pie_option2,
     cdetsTableColumns:[
       {
         title:"Identifier",
         visible: true,
         filterable: true,
         sortable: true
       },
        {
         title:"Headline",
         visible: true,
         filterable: true,
         sortable: true
       },
        {
         title:"Component",
         visible: true,
         filterable: true,
         sortable: true
       },
        {
         title:"Submitter",
         visible: true,
         filterable: true,
         sortable: true
       },
        {
         title:"Status",
         visible: true,
         filterable: true,
         sortable: true
       },
       {
         title:"#TCs",
         visible: true,
         filterable: true,
         sortable: true
       }
     ],

     
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
    
      ganttOptionFlag:false,
      ganttOptions:{
         chart: {
        backgroundColor: null,
        spacingLeft: 10,
        spacingBottom:20,
        spacingTop:20,
         events: {
       load: (e) => {
       }
    }
    },
        title: {
        text: 'Project Plan'
    },
    yAxis:{
type:"category",
 categories:["-","Planned","Actual","Events","-","-","-","-","-","-","-","-"],
 visible: true,
    },
     credits: false,
    xAxis:[{
        type: 'datetime',
        tickInterval: 1000 * 60 * 60 * 24 * 7,
        fill:"blue",
        labels: {
           style: {
          "font-size":"10px"
        },
            format: '{value:%Y-%m-%d}',
            rotation: 30,
            borderWidth:0
         }
    },{
       fill:"green",
    }],
     tooltip: {
        xDateFormat: '%a %b %d'
    },
     plotOptions: {
        series: {
            pointWidth: 40,
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
                style: {
                     color:"#fff !important",
                    fill:"#fff !important",
                    cursor: 'default',
                    pointerEvents: 'none',
                    textOutline: 'transparent',
                    "font-size":"16px"
                },
               // format: '{point.name} {point.completed.amount} %',
                formatter: function() {
                  if(this.point.completed){
                    let val=parseInt(this.point.completed.amount *100);
                    return this.point.name+" "+val+"%"
                  }
                  else{
                     return this.point.name
                  }
                      
                    },
                     text:{
                  style:{
                    color:"#fff !important",
                    fill:"#fff !important"
                  }
                },
                
            },
            allowPointSelect: true,
            point: {
               events: {
                    select: this.updateRemoveButtonStatus,
                    unselect: this.updateRemoveButtonStatus,
                  
                }
            }
        }
    },
   series:[]
},
ganttOptions1:{
         chart: {
           backgroundColor: null,
         spacingLeft: 10,
        spacingBottom:20,
        spacingTop:20,
         events: {
       render: (e) => {
       }
    }
    },
        title: {
        text: 'Project Plan'
    },
    yAxis:{
      type:"category",
      categories:["Actual"],
      visible: true,
    },
     credits: false,
    xAxis:[{
        type: 'datetime',
        tickInterval: 1000 * 60 * 60 * 24 * 7,
        fill:"blue",
        style:{
          fill:"blue",
        },
        labels: {
           style: {
          "font-size":"10px"
        },
            format: '{value:%Y-%m-%d}',
            rotation: 30,
            borderWidth:0
         }
    },{
      fill:"blue",
    }],
     tooltip: {
        xDateFormat: '%a %b %d'
    },
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
                  text:{
                  style:{
                    color:"#fff !important",
                    fill:"#fff !important"
                  }
                },
               // format: '{point.name} {point.completed.amount} %',
                formatter: function() {
                  if(this.point.completed){
                   let val=parseInt(this.point.completed.amount *100);
                    return this.point.name+" "+val+"%"
                  }
                  else{
                     return this.point.name
                  }
                },
                style: {
                    color:"#fff !important",
                    fill:"#fff !important",
                    cursor: 'default',
                    pointerEvents: 'none',
                     textOutline: 'transparent'
                }
            },
           
        }
    },
   series:[]
},
      cvtOptions: {
    chart: {
      zoomType: "xy",
      backgroundColor: null,
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
     ,
    tooltip: {
      shared: true,
    },
      legend: {
              floating: false,
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
              x: 0,
              y: 0,
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
              backgroundColor: null,
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
      backgroundColor: null,
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
              backgroundColor: null,
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
      backgroundColor: null,
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
           style: {
        textOutline: 'transparent'
      }
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
          backgroundColor: null,
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
         chart:{
           backgroundColor: null,
         },
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
    chart:{
      backgroundColor: null,
    },
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
    colors: [ "#003f5c",
      "#2f4b7c",
      "#665191",
      "#a05195",
      "#d45087",
      "#f95d6a",
      "#ff7c43",
      "#ffa600",],
    plotOptions: {
      pie: {
        depth: 35,
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}",
           style: {
        textOutline: 'transparent'
      }
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
    chart:{
      backgroundColor: null,
    type: "pie",
    options3d: {
      enabled: true, //Use 3d function
      alpha: 45,
      beta: 15,
    },
    },
    tooltip: {
      pointFormat: "{point.label}: <b>{point.y}</b>",
    },
    colors:  [
    "#F66D44","#FEAE65","#E6F69D","#AADEA7","#64C2A6","#2D87BB"
    ],
    plotOptions: {
      pie: {
        depth: 35,
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}",
           style: {
        textOutline: 'transparent'
      }
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
    chart:{
      backgroundColor: null,
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
           style: {
        textOutline: 'transparent'
      }
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
    chart:{
      backgroundColor: null,
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
           style: {
             textOutline: 'transparent'
         }
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
           style: {
        textOutline: 'transparent'
      }
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
    source_bar_option:{
    chart: {
      type: "column",
    },
    legend: {
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
      text: "Testcases per Source",
    },
    plotOptions: {
      column: {
        depth: 20,
        dataLabels: {
          enabled: true,
           style: {
        textOutline: 'transparent'
      }
        },
        grouping: false,
      },
    },

    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Sources",
        data: [],
      },
    ],
  },
      platform_bar_option:{
    chart: {
      type: "column",
      backgroundColor: null,
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
           style: {
        textOutline: 'transparent'
      }
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
      backgroundColor: null,
    },
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
      backgroundColor: null,
    },
    /*  legend: {
      align: "right",
      verticalAlign: "top",
      layout: "vertical",
      y: 30,
    },*/
    xAxis: {
      type: "category",
       minPadding: 0,
    maxPadding: 0
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
  commonPieOption:{
    chart: {
    type: "pie",
    backgroundColor: null,
     },
      title: {
     text: "",
      verticalAlign: 'middle',
      floating: true,
      text: 'CENTERED<br>TEXT',
      style: { "font-size": "40px", "margin-top" :"10px" },
    },
    tooltip: {
      style: { "font-size": "40px !important" },
    },
    plotOptions: {
      pie: {
        size: 300,
        allowPointSelect: true,
        innerSize: 150,
        cursor: "pointer",
      },
       size:'100%',
    },
     dataLabels:{
      enabled: false,
    },
    credits: false,
    xAxis:{
      minPadding: 0,
    maxPadding: 0
    },
    series: [
      {
        type: "pie",
        data: [],
      },
    ],
  },
  commonBarOption:{
    chart: {
      type: "column",
      backgroundColor: null,
       spacingTop: 0,
            spacingRight: 0,
            spacingBottom: 0,
            spacingLeft: 0,
            plotBorderWidth: 0,
            marginRight: 0,//-60, //this does move the chart but you'll need to recompute it
            marginLeft: 0,//-60,  //whenever the page changes width
            marginTop: 0,
            marginBottom: 0,
      options3d: {
        enabled: true,
        alpha: 10,
        beta: 5,
        depth: 50,
        viewDistance: 25,
      },
    },
     title: {
     text: "",
    },
    tooltip: {
      style: { "font-size": "40px !important" },
    },
    xAxis: {
      type: "category",
    },
    yAxis:{
       visible: false,
    },
    plotOptions: {
      column: {
        grouping: false,
      },
    },
    
    legend: {
      enabled: false,
    },
    dataLabels:{
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
       data: [],
      },
    ],
     exporting: {
        enabled: false
    }
  },
      quality_platform_bar_option:{
    chart: {
      type: "column",
      backgroundColor: null,
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
      backgroundColor: null,
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
      quality_feature_bar_option:{
    chart: {
      type: "column",
      backgroundColor: null,
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
      quality_source_bar_option:{
    chart: {
      type: "column",
      backgroundColor: null,
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
        type: 'column'
    },
    title: {
      style: {
        color: "#264991",
      },
      text: "Testcases Vs Defects",
    },
   
    plotOptions: {
        series: {
            grouping: true,
            borderWidth: 0
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        shared: true,
        headerFormat: '<span style="font-size: 12px">{point.point.name}</span><br/>',
        pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>'
    },
    xAxis: {
        type: 'category',
        categories:[],
     },
    yAxis: [{
        showFirstLabel: false
    }],
    series: [{
        color: 'blue',
        pointPlacement: -0.2,
        dataLabels: [{
            enabled: true,
            style: {
                fontSize: '12px'
            }
        }],
        linkedTo: 'main',
        data: [],
        name: 'Executed'
    }, {
        name: 'planned',
        id: 'main',
       dataLabels: [{
            enabled: true,
            style: {
                fontSize: '12px'
            }
        }],
        data: []
    }],
  },
      userOption:{
    chart: {
      borderColor: "#fff",
      type: "packedbubble",
      backgroundColor: null,
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
    chart: {
     type: "pie",
     backgroundColor: null,
    options3d: {
      enabled: true, //Use 3d function
      alpha: 45,
      beta: 0,
    },
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
          format: "<b>{point.name}</b>: <b>{point.percentage:.1f}%</b>",
           style: {
        textOutline: 'transparent'
      }
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
    chart:{
      backgroundColor: null,
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
          format: "<b>{point.name}</b>: <b>{point.percentage:.1f}%</b>",
           style: {
        textOutline: 'transparent'
      }
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
  separator:',',
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
           style: {
        textOutline: 'transparent'
      }
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
  guageOptions:{},
  heatMapOptions:{},
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
    MiniChart,
    GanttChart,
    Splide,
    SplideSlide,
    TestcaseList,
    UniqueTestcaseCharts,
     tabs: Tabs,
    tab: Tab,
    VueBootstrapTable: VueBootstrapTable,
    VueEditor,
    FontAwesomeIcon,
    ExecutionSummaryTable,
    ReleaseNoteWeeklyReport,
    UpgradeMatrixTable,
    TriggerMatrixTable
  },
  directives: {
    tabs: Tabs.directive,
    tab: Tab.directive,
  },
  mounted() {
    this.loadCustomerDetails();
    this.loadReleases();
    //this.loadCFDS();
   // this.loadDatalist();
    },
  watch:{
    showExecutionPie:function(newVal){
      if(!newVal){
        this.totalActualQuality=this.summaryButtonsDetails.resultQuality.resultQuality;
      }
      else{
        this.totalActualQuality=this.summaryButtonsDetails.resultQuality.projectedResultQuality;
      }
    },
    selectedCdets:{
    immediate: true,
    deep: true,
    handler(selectedCdets) {
      this.statusTabs=["All"];
      this.statusTabsArr={"All":[]};
      for(let i=0;i<selectedCdets.length;i++){
         if(this.statusTabs.indexOf(selectedCdets[i].status+" Bugs")>=0){
           this.statusTabsArr[selectedCdets[i].status+" Bugs"].push(selectedCdets[i]);
           this.statusTabsArr["All"].push(selectedCdets[i]);
         }
         else{
           this.statusTabs.push(selectedCdets[i].status+" Bugs");
           this.statusTabsArr[selectedCdets[i].status+" Bugs"]=[];
            this.statusTabsArr[selectedCdets[i].status+" Bugs"].push(selectedCdets[i]);
           this.statusTabsArr["All"].push(selectedCdets[i]);
         }
       }
    }
    },
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
        //window.location.hash = "customerReleaseDiv";
        document.getElementById('customerReleaseDiv').scrollIntoView(true);
          break;
        case "updateSelectedTestcases":
          updateSelectedTestcases(payload);
          break;
        case "showChartPopup":
        this.showChartPopup(payload);
        break;
        case "toggleChart":
          this[payload]=!this[payload]
          break;
        case "gotoUniquetcs":
          this.loadUniqueTcs();
          break;
        case "closeExecSummaryTable":
          this.showExecSummaryModal=false;
          break;
        case "closeUpgardeMatrixModal":
          this.showUpgradeMatrixModal=false;
          break;
        case "closeExecSummaryTable":
          this.showExecSummaryModal=false;
          break;
        case "closeTriggerMatrixModal":
          this.showTriggerMatrixModal=false;
          break;

        }
    },
    cdetsStatusTabClicked(){

    },
    execSummaryLinkClicked(){
      let cdets=[...this.cdets];
      let relName="";
      let sortedCdets=this.sortByValue(cdets,"tcCount");
      let temp=[];
      for(let u=0;u<sortedCdets.length;u++){
        if(sortedCdets[u].tcCount>=2){
          temp.push(sortedCdets[u]);
        }
      }
      if(temp.length>5){
        this.mainCdets=[...temp];
      }
      else{
         this.mainCdets=sortedCdets.slice(0,5);
      }

     
       for (let s = 0; s < this.releases.length; s++) {
         if(this.releases[s].id==this.selectedRelId){
           relName=this.releases[s].name+"_"+this.selectedRelId;
            this.execrelName=this.releases[s].name;
         }
       }
      
      this.execProjects=this.projects[relName]
      this.showExecSummaryModal=true;
    },

    relLinkClicked(){
         this.showRelModal=true;
    },
    
  
     openAhaMenu: function(id) {
      if (
        this.selectedAHARows.length &&
        this.selectedAHARows.indexOf(id) >= 0
      ) {
        this.$refs.ahamenu.open(event, id);
      } else {
        this.selectedRows = [];
        this.selectedTestcases = [];
        this.removeSelection();
      }
      event.preventDefault();
    },
     ahaRowSelect(ahaObj, event) {
      if (event.currentTarget.classList.contains("selectedAHARows")) {
        event.currentTarget.classList.remove("selectedAHARows");
        for (let i = 0; i < this.selectedAHARows.length; i++) {
          if (this.selectedAHARows[i] === ahaObj.id) {
            this.selectedAHARows.splice(i, 1);
            this.selectedAHAList.splice(i, 1);
          }
        }
      } else {
        event.currentTarget.classList.add("selectedAHARows");
        this.selectedAHARows.push(ahaObj.id);
        this.selectedAHAList.push(ahaObj);
      }
      this.selectedAHARows = [...new Set(this.selectedAHARows)];
    },
    
   
     deleteAhafeature() {
      this.$refs.ahamenu.close();
      this.loading = true;
      let self=this;
      this.loadingMessage = "Deleting Features..";
      for (let i = 0; i < this.selectedAHARows.length; i++) {
        let aid = this.selectedAHARows[i];
        testcaseService.deleteAhafeature(aid).then(
          (data) => {
             self.loadAhaList(self.selectedRelId);
          },
          (error) => {
            this.loading = false;
            this.loadingMessage = "";
            this.showErrorModal = true;
            this.modalErrorMessage =
              "Error while deleting Testcase, Please try again later";
          }
        );
      }
      this.loading = false;
      this.loadingMessage = "";
      this.loadTestCaseList();
    },
    automationLinkClicked(){
      this.loadUniqueTcs();
    },
    eftLinkClicked(){

    },
    upgradeMtxLinkClicked(){
      this.showUpgradeMatrixModal=true;
    },
    triMtxLinkClicked(){
      this.showTriggerMatrixModal=true;
    },
    defectsLinkClicked(){

    },
    cfdLickClicked(){

    },
    adjustMarginOfDashboardDiv(){
        document.querySelector(".dashboardDiv").style.marginLeft=document.querySelector(".releasesDiv").offsetWidth+"px";
    },
    applyChangeFunc(){
      debugger;
      let arr=[];
        for(let k=0;k<this.releases.length;k++){
          if(this.releases[k].customerName===this.selectedCustomerName && this.releases[k].folder_name===this.folderName){
            arr.push({id:this.releases[k].id,name:this.releases[k].name});
          }
        }
        this.custTotalReleases={...arr};
        this.custSelectedReleases.push(this.selectedRelId.toString());
     },
     applyChangeFuncForAHA(){
      debugger;
      let arr=[];
        for(let k=0;k<this.releases.length;k++){
          if(this.releases[k].customerName===this.selectedCustomerName && this.releases[k].folder_name===this.folderName){
            arr.push({id:this.releases[k].id,name:this.releases[k].name});
          }
        }
        this.custTotalReleases={...arr};
        this.custSelectedReleasesForAHA.push(this.selectedRelId.toString());
     },
     loadAhaList(rid){
       this.loading = false;
      this.loadingMessage = "Loading AHA feature list";
      let self=this;
      testcaseService.loadAHAList(rid).then(
        (data) => {
          self.loading = false;
          self.loadingMessage = "";
          if(data.length>0){
          self.ahaList=[...data];
          for(let k=0;k<self.ahaList.length;k++){
            if(self.ahaList[k].enablement_ETA){
            if(new Date(self.ahaList[k].enablement_ETA)<new Date){
               if(self.ahaList[k].enablement_status && self.ahaList[k].enablement_status.toLowerCase()==="completed"){
                 self.ahaList[k]["enablement_status_color"]="greenText"
               }
               else  if(self.ahaList[k].enablement_status && self.ahaList[k].enablement_status.toLowerCase()==="inprogress"){
                 self.ahaList[k]["enablement_status_color"]="redText"
               }
               else  if(self.ahaList[k].enablement_status && self.ahaList[k].enablement_status.toLowerCase()==="pending"){
                 self.ahaList[k]["enablement_status_color"]="redText"
               }
            }
            else{
                if(self.ahaList[k].enablement_status && self.ahaList[k].enablement_status.toLowerCase()==="completed"){
                 self.ahaList[k]["enablement_status_color"]="greenText"
               }
               else  if(self.ahaList[k].enablement_status && self.ahaList[k].enablement_status.toLowerCase()==="inprogress"){
                 self.ahaList[k]["enablement_status_color"]="skyBlueText"
               }
               else  if(self.ahaList[k].enablement_status && self.ahaList[k].enablement_status.toLowerCase()==="pending"){
                 self.ahaList[k]["enablement_status_color"]="redText"
               }
            }
          }
          else{
             self.ahaList[k]["enablement_status_color"]="skyBlueText"
          }

          if(self.ahaList[k].feature_relatedTCs==="" || self.ahaList[k].feature_relatedTCs===null || self.ahaList[k].feature_relatedTCs === undefined){
             self.ahaList[k]["noRelatedTcsFlag"]="yellowHighlight";
          }
          else{
            self.ahaList[k]["noRelatedTcsFlag"]="noHighlight";
          }

          }
          
          self.ahaTableColumns=Object.keys(data[0]);
          self.showAhaTable=true;
          }
          else{
          self.ahaList=[];
          self.ahaTableColumns=[];
          self.showAhaTable=false;
          }
        },
        (error) => {
          self.loading = false;
          self.loadingMessage = "";
          self.showErrorModal = true;
          self.modalErrorMessage = "Error while loading AHA List";
        }
      );
      self.applyChangeFuncForAHA();
    },
    checkAhaList(){
      if(this.ahaList.length>0){
        return false;
      }
      else{
        return true;
      }
    },
    getColorForPerc(count1,type,diff){
      let count=parseInt(count1);
      if(type==="quality"){
        if(count >= 95){
          return "green";
        }
        else if(count >= 85){
          return "yellow";
        }
        else {
          return "red";
        }
      }
      else if(type==="execution"){
        if(diff <= 5){
           return "green";
        }
        else if(diff <= 15){
          return "yellow";
        }
        else{
          return "red";
        }

      }
},

renderIcons() {
 // Move icon
    if (!this.guageOptions.series[0].icon) {
        this.guageOptions.series[0].icon = this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
            .attr({
                stroke: '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                zIndex: 10
            })
            .add(this.guageOptions.series[2].group);
    }
    this.guageOptions.series[0].icon.translate(
        this.chartWidth / 2 - 10,
        this.plotHeight / 2 - this.guageOptions.series[0].points[0].shapeArgs.innerR -
            (this.guageOptions.series[0].points[0].shapeArgs.r - this.guageOptions.series[0].points[0].shapeArgs.innerR) / 2
    );

    // Exercise icon
    if (!this.guageOptions.series[1].icon) {
        this.guageOptions.series[1].icon = this.renderer.path(
            ['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8,
                'M', 8, -8, 'L', 16, 0, 8, 8]
        )
            .attr({
                stroke: '#ffffff',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                zIndex: 10
            })
            .add(this.guageOptions.series[2].group);
    }
    this.guageOptions.series[1].icon.translate(
        this.chartWidth / 2 - 10,
        this.plotHeight / 2 - this.guageOptions.series[1].points[0].shapeArgs.innerR -
            (this.guageOptions.series[1].points[0].shapeArgs.r - this.guageOptions.series[1].points[0].shapeArgs.innerR) / 2
    );

    // Stand icon
    if (!this.guageOptions.series[2].icon) {
        this.guageOptions.series[2].icon = this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
            .attr({
                stroke: '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                zIndex: 10
            })
            .add(this.guageOptions.series[2].group);
    }

    this.guageOptions.series[2].icon.translate(
        this.chartWidth / 2 - 10,
        this.plotHeight / 2 - this.guageOptions.series[2].points[0].shapeArgs.innerR -
            (this.guageOptions.series[2].points[0].shapeArgs.r - this.guageOptions.series[2].points[0].shapeArgs.innerR) / 2
    );
},

    getPointCategoryName(point, dimension) {
    var series = point.series,
        isY = dimension === 'y',
        axis = series[isY ? 'yAxis' : 'xAxis'];
    return axis.categories[point[isY ? 'y' : 'x']];
},
    getIdForRelease(name){
      for(let i=0;i<this.releases.length;i++){
        if(this.releases[i].name===name){
          return this.releases[i].id;
        }
      }
    },
   loadDatalist(){
       for (const input of document.getElementsByTagName("input")) {
        if (!input.multiple) {
            continue;
        }
        if (input.list instanceof HTMLDataListElement) {
            const optionsValues = Array.from(input.list.options).map(opt => opt.value);
            let valueCount = input.value.split(this.separator).length;
            input.addEventListener("input", () => {
                const currentValueCount = input.value.split(this.separator).length;
                // Do not update list if the user doesn't add/remove a this.separator
                // Current value: "a, b, c"; New value: "a, b, cd" => Do not change the list
                // Current value: "a, b, c"; New value: "a, b, c," => Update the list
                // Current value: "a, b, c"; New value: "a, b" => Update the list
                if (valueCount !== currentValueCount) {
                    const lsIndex = input.value.lastIndexOf(this.separator);
                    const str = lsIndex !== -1 ? input.value.substr(0, lsIndex) + this.separator : "";
                    filldatalist(input, optionsValues, str);
                    valueCount = currentValueCount;
                }
            });
        }
    }
    function filldatalist(input, optionValues, optionPrefix) {
        const list = input.list;
        if (list && optionValues.length > 0) {
            list.innerHTML = "";
            const usedOptions = optionPrefix.split(this.separator).map(value => value.trim());
            for (const optionsValue of optionValues) {
                if (usedOptions.indexOf(optionsValue) < 0) {
                    const option = document.createElement("option");
                    option.value = optionPrefix + optionsValue;
                    list.append(option);
                }
            }
        }
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
      let type=event.point.selected?"unselect":"select";
      if(type==='select'){
        this.removeEventdisabled=false;
        this.selectedEvents.push(event.point.name);
         this.selectedEventIds.push(event.point.slNum);
      }
      else if(type==='unselect'){
       if(this.selectedEvents.indexOf(event.point.name)>-1){
         let ind=this.selectedEvents.indexOf(event.point.name);
          this.selectedEvents.splice(ind,1);
           this.selectedEventIds.splice(ind,1);
          if(this.selectedEvents.length === 0){
             this.removeEventdisabled=true;
         }
         else{
           this.removeEventdisabled=false;
         }
        }
      }
      else if(this.selectedEvents.length === 0){
         this.removeEventdisabled=true;
      }
 },
    drawXAxisBackground(e) {
  var chart = e.target,
    xAxis = chart.xAxis[1],
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
    custBoxClicked(type,custName){
      debugger;
      if(type==="customer")
      {
      let self=this;
      self.proj_cust_Selected=true;
      let custlist=self.summary_customers;
      self.selectedCustomerName=custName;
      self.releaseFlag="customer";
       self.loadSummaryButtonDetails();
       self.drawChart(custName,"Customer");
       this.loadWeeklyReportByCustomerName(self.folderName,custName);
          self.ganttOptions.title.text="Project Plan - <span style='font-size:15px'>"+ custName+"</span>"
          self.ganttOptions1.title.text="Project Plan - <span style='font-size:15px'>"+ custName+"</span>"
       self.summaryObj.summary=self.getRelSummary(custName);
       self.summaryObj.defectSummary=self.getRelDefectSummary(custName);
     }
    else if(type==="project"){
         var coll = document.getElementsByClassName("collapsibleReleases");
          for (let b = 0; b < coll.length; b++) {
            if(coll[b].innerText===custName){
             coll[b].click();
            }
          }
    }
    },
    weekChange(weekNum){
             this.selectedWeekData={...this.weeklyReport[weekNum]};
        },
     weekChange1(weekNum){
            this.selectedWeekData1={...this.weeklyReport[weekNum]};
        },

    loadActualTestcases(){
      debugger;
      let self=this;
      if(this.showingUnique){
     self.selectedTestcases=[...self.copyOfSelectedTestcases]
     self.showingUnique=false;
      self.testcasesFlag+=1;
      }
    },
    loadUniqueTcs(){
        let self=this;
     //   self.proj_cust_Selected=false;
      let id=self.releaseId;
       if(self.releaseFlag==="release"){
        id=self.selectedRelId;
      }
      else if(self.releaseFlag==="project"){
        id=self.selectedPrId;
      }
      else if(self.releaseFlag==="folder"){
        id=self.folderName;
        }
       else if(self.releaseFlag==="customer"){
         id=self.folderName+","+self.selectedCustomerName;
         //id=self.selectedCustomerName;
       }
       self.loading=true;
       self.loadingMessage = "Loading unique testcases...";
        testcaseService.loadUniqueTestcases(self.releaseFlag,id).then(
          (data) => {
            self.loading=false;
           self.loadingMessage ="";
           self.copyOfSelectedTestcases=[...self.selectedTestcases];
           self.showingUnique=true;
           self.selectedTestcases=data.data1;
           self.uniqueChartsData=data.data0;
           self.uniqueCount=data.data1.length;
           self.testcasesFlag+=1;
          },
       (error)=>{
         self.loading = false;
            self.loadingMessage = "";
            self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while loading unique testcases, Please try again later";
       });
    },
 
    loadSummaryBoxDetails(data){
      let self=this;
      if(Object.keys(data).length>1){
       let executionOptions={};
          let execution1Options={};
       let qualityOptions={};
         let summaryKeys=Object.keys(data);
         for(let k=0;k<summaryKeys.length;k++){
          self.summary_customers[k]={};
           this.summary_customers[k]["execution1Options"]={};
         this.summary_customers[k]["executionOptions"]={};
         this.summary_customers[k]["qualityOptions"]={};
            self.summary_customers[k]["name"]=summaryKeys[k];
            self.summary_customers[k]["type"]=data[summaryKeys[k]].type;
            self.summary_customers[k]["customer_name"]=data[summaryKeys[k]].executionSummary.customer_name;
            self.summary_customers[k]["failed"]=data[summaryKeys[k]].executionSummary.failed;
            self.summary_customers[k]["passed"]=data[summaryKeys[k]].executionSummary.passed;
            self.summary_customers[k]["pending"]=data[summaryKeys[k]].executionSummary.pending;
            self.summary_customers[k]["executed"]=data[summaryKeys[k]].executionSummary.executed;
            self.summary_customers[k]["planned"]=data[summaryKeys[k]].executionSummary.planned;
            self.summary_customers[k]["summary"]=data[summaryKeys[k]].executionSummary.summary;
            self.summary_customers[k]["total"]=data[summaryKeys[k]].executionSummary.executed+data[summaryKeys[k]].executionSummary.pending;
            self.summary_customers[k]["qualityClass"]="";
            self.summary_customers[k]["onTrackDelay"]="";
            self.summary_customers[k]["executedPerc"]=parseInt(self.summary_customers[k]["executed"]/self.summary_customers[k]["total"]*100)
            self.summary_customers[k]["plannedPerc"]=parseInt(self.summary_customers[k]["planned"]/self.summary_customers[k]["total"]*100)
            self.summary_customers[k]["quality"]=parseInt(data[summaryKeys[k]].executionSummary.passed/data[summaryKeys[k]].executionSummary.executed*100);
            let Quality=parseInt(data[summaryKeys[k]].executionSummary.passed/data[summaryKeys[k]].executionSummary.executed*100);
            let mhCount=data[summaryKeys[k]].executionSummary.mhCount;
            if(Quality>95 && mhCount===0){
              self.summary_customers[k]["qualityClass"]="green";
            }
            else if(Quality>85 && mhCount>0){
              self.summary_customers[k]["qualityClass"]="yellow";
            }
            else if(Quality<=85){
              self.summary_customers[k]["qualityClass"]="red";
            }

            let OnTrack=parseInt((data[summaryKeys[k]].executionSummary.planned-data[summaryKeys[k]].executionSummary.executed)/data[summaryKeys[k]].executionSummary.planned*100);
            if(OnTrack == 0){
              self.summary_customers[k]["onTrackDelay"]="dark_green";
            }
            else if(OnTrack<=5){
              self.summary_customers[k]["onTrackDelay"]="light_green";
            }
            else if(OnTrack<=15){
              self.summary_customers[k]["onTrackDelay"]="yellow";
            }
            else if(OnTrack>15){
              self.summary_customers[k]["onTrackDelay"]="red";
            }

             this.summary_customers[k]["chart_id"]=summaryKeys[k]+"_"+k;
        //qualityOptions=JSON.parse(JSON.stringify(self.commonPieOption));
        executionOptions=JSON.parse(JSON.stringify(self.commonBarOption));
        let diff=self.summary_customers[k]["plannedPerc"]-self.summary_customers[k]["executedPerc"];
        execution1Options=self.loadGuageOptions(self.summary_customers[k]["executedPerc"],"execution",diff);
        qualityOptions=self.loadGuageOptions(self.summary_customers[k]["quality"],"quality");
        //qualityOptions.series[0].data=[{color:"#35ccfa",y:self.summary_customers[k]["quality"]}]
        executionOptions.series[0].data= [
            {
              name: "passed",
              x: 1,
              color:"green",
              y: self.summary_customers[k]["passed"],
            },
            {
              name: "failed",
              x: 2,
              color:"red",
              y: self.summary_customers[k].failed,
            },
            {
              name: "pending",
              x: 3,
              color:"blue",
              y: self.summary_customers[k].pending,
            }]
         this.summary_customers[k]["execution1Options"]= execution1Options;
         this.summary_customers[k]["executionOptions"]= executionOptions;
         this.summary_customers[k]["qualityOptions"]=qualityOptions;
        }
      }
    },
      loadCustomersSummary(folderName){
          this.loading = true;
      this.loadingMessage = "Loading Customer Summary details...";
       let self=this;
      // testcaseService.projectExecutionSummary(folderName).then(
       testcaseService.customerExecutionSummary(folderName).then(
        (data1) => {
          self.loading = false;
          self.loadingMessage = "";
          for(let x=0;x<Object.keys(data1).length;x++){
            data1[Object.keys(data1)[x]]["type"]="customer";
          }
        //  let data=Object.assign(data1);
         testcaseService.projectExecutionSummary(folderName).then(
        (data2) => {
           for(let x1=0;x1<Object.keys(data2).length;x1++){
            data2[Object.keys(data2)[x1]]["type"]="project";
          }
          if(Object.keys(data2).length>1){
           self.summary_customers=[];
           let data=Object.assign(data1, data2);
        let keys=Object.keys(data);
            let childObj={};
           for(let m=0;m<keys.length;m++){
            childObj=data[keys[m]]
             if(Object.keys(childObj).length<=0){
               delete data[keys[m]]
             }
           }
          self.loadSummaryBoxDetails(data);
          }
          else{
            let x={};
            self.loadSummaryBoxDetails(data1);
          }
        },
        (error) => {
          this.loading = false;
          this.loadingMessage = "";
        }
      );
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
    relSyncBtnClicked(e,robj){
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
         this.summaryButtonsDetails["totalCFD"]=data.count;
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
      this.summaryButtonsDetails["totalCFD"] = allCFD.length;

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
    loadGuageOptions(count,type,diff){
      let seriesList=[{
        name: '',
        data: [{
            color: this.getColorForPerc(count,type,diff),
            radius: '112%',
            innerRadius: '88%',
            y: count,
            dataLabels:{
              x:0,
              y:-15
            }
        }]
    }];

    let options={
       chart: {
           backgroundColor: 'transparent',
       type: 'solidgauge',
        height: '110%',
        events: {
           render: (e) => {
            
 // Move icon
    if (!seriesList[0].icon) {
        seriesList[0].icon = this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
            .attr({
                stroke: '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                zIndex: 10
            })
            .add(seriesList[2].group);
    }
    seriesList[0].icon.translate(
        this.chartWidth / 2 - 10,
        this.plotHeight / 2 - seriesList[0].points[0].shapeArgs.innerR -
            (seriesList[0].points[0].shapeArgs.r - seriesList[0].points[0].shapeArgs.innerR) / 2
    );

    // Exercise icon
    if (!seriesList[1].icon) {
        seriesList[1].icon = this.renderer.path(
            ['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8,
                'M', 8, -8, 'L', 16, 0, 8, 8]
        )
            .attr({
                stroke: '#ffffff',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                zIndex: 10
            })
            .add(seriesList[2].group);
    }
    seriesList[1].icon.translate(
        this.chartWidth / 2 - 10,
        this.plotHeight / 2 - seriesList[1].points[0].shapeArgs.innerR -
            (seriesList[1].points[0].shapeArgs.r - seriesList[1].points[0].shapeArgs.innerR) / 2
    );

    // Stand icon
    if (!seriesList[2].icon) {
        seriesList[2].icon = this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
            .attr({
                stroke: '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                zIndex: 10
            })
            .add(seriesList[2].group);
    }

    seriesList[2].icon.translate(
        this.chartWidth / 2 - 10,
        this.plotHeight / 2 - seriesList[2].points[0].shapeArgs.innerR -
            (seriesList[2].points[0].shapeArgs.r - seriesList[2].points[0].shapeArgs.innerR) / 2
    );
           }
        }
    },
   title: {
        text: null,
    },
     credits: false,
    pane: {
        startAngle: 0,
        endAngle: 360,
        background: [{ // Track for Move
            outerRadius: '112%',
            innerRadius: '88%',
            backgroundColor: Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0.3)
                .get(),
            borderWidth: 0
        }]
    },

    yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: [],
        labels: {
           x: 5, y: 8,
        }
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
           borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
       style: {
         textShadow: "none", 
            fontSize: '18px',
            color:"#fff",
            textOutline:"none",
          text:{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "600",
                fill: "#fff",
                textShadow: "0 0 transparent",
          }
        },
        pointFormat: '{point.y}%',
       
            },
            linecap: 'round',
            stickyTracking: false,
            rounded: true
        }
    },

    series: seriesList,
     exporting: {
        enabled: false
    }
      }

    return options;
    },
    loadHeatMapColors(e){
      let points=e.target.series[0].data;
       $.each(points, function(i, p){
         if(p.x===0){
           if(p.value===0 || p.value === null){
             p.color="red";
           }
           else{
             p.color="green";
           }
         }
       });
       this.isDirty = true;
                    this.redraw();
    },
    loadHeatMapOptions(){
      return {
    chart: {
        type: 'heatmap',
        backgroundColor: null,
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 1,
        series:[{
         dataLabels: {
         enabled: true,
       formatter: function() {
          return '<span style="color: #000;text-outline:#000;">' + this.value + '</span>';
       }
     }
      }],
       credits: {
        enabled: true
    },
    },


    title: {
        text: 'Execution Summary'
    },

    xAxis: {
        categories: [],
         title: null,
    },

    yAxis: {
        categories: [],
        title: null,
        reversed: true
    },

    accessibility: {
        point: {
            descriptionFormatter: (point) => {
                var ix = point.index + 1,
                    xName = this.getPointCategoryName(point, 'x'),
                    yName = this.getPointCategoryName(point, 'y'),
                    val = point.value;
                return ix + '. ' + xName + ' ' + yName + ', ' + val + '.';
            }
        }
    },

    colorAxis: {
        min: 0,
      },

    legend: {
 enabled: false
},

    tooltip: {
        formatter:() => {
       }
    },

    series: [{
        name: 'Project Summary',
        borderWidth: 1,
        data: [[0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]],
        dataLabels: {
            enabled: true,
            color: '#000000',
            background: "pink"
        }
    }],
    }
    },
    loadSummaryButtonDetails(){
      let self=this;
      let id=self.releaseId;
       if(self.releaseFlag==="release"){
        id=self.selectedRelId;
      }
      else if(self.releaseFlag==="project"){
        id=self.selectedPrId;
      }
      else if(self.releaseFlag==="folder"){
        id=self.folderName;
        }
       else if(self.releaseFlag==="customer"){
         id=self.folderName+","+self.selectedCustomerName;
       }
        testcaseService.fetchSummaryBtnDetails(self.releaseFlag,id).then(
          (data) => {
            self.summaryButtonsDetails=data;
            self.loadSummaryData();
       },
       (error)=>{
         self.loading = false;
            self.loadingMessage = "";
            self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while summary button Details, Please try again later";
       });
    },
    loadSummaryData() {
      // for execution summary pie chart

      let allFeatures = Object.keys(this.summaryButtonsDetails.feature);
      let allUsers =  Object.keys(this.summaryButtonsDetails.tc_execution_owners);
      let allSource=Object.keys(this.summaryButtonsDetails.source);
      let allCFD = Object.keys(this.summaryButtonsDetails.cfds);
      let allDefects = Object.keys(this.summaryButtonsDetails.defects);
      let allRoles =Object.keys(this.summaryButtonsDetails.role);
     // let allPlatformRoles=Object.keys(this.summaryButtonsDetails.platform_role);
      let allPlatforms = Object.keys(this.summaryButtonsDetails.platform);

       let executionSummaryData = [{
         name:"passed",
         color:"#76B947",
         y:this.summaryButtonsDetails.testcasesPassed.count
       },
       {
         name:"failed",
         color:"#F51720",
         y:this.summaryButtonsDetails.testcasesFailed.count
       },
       {
         name:"pending",
         color:"#2094df",
         y:this.summaryButtonsDetails.testcasesPending.count
       }
       ]

       this.summaryOptions.series[0].data=executionSummaryData;
      this.executionSummaryOption = this.summaryOptions;

    // projected execution summary pie chart

       let projectedSummaryData = [{
         name:"passed",
         color:"#76B947",
         y:this.summaryButtonsDetails.testcasesPassed.count
       },
       {
         name:"failed",
         color:"#F51720",
         y:this.summaryButtonsDetails.testcasesFailed.count
       },
       {
         name:"pending",
         color:"#2094df",
         y:this.summaryButtonsDetails.testcasesPending.count
       }
       ]

      this.summaryOptions1.series[0].data=projectedSummaryData;
      this.executionSummaryOption1 = this.summaryOptions1;
       
       let colors = this.featureColors;
       let dataArr=[], qualityArr=[], projectedQualityArr=[];
      //platform role bar chart
     //todo change to platform role
      this.quality_platformRole_bar_option.xAxis.categories=allRoles;
      this.role_bar_option.xAxis.categories=allRoles;

     dataArr=[], qualityArr=[], projectedQualityArr=[];
      for(let pr=0;pr<allRoles.length;pr++){
       qualityArr.push(this.summaryButtonsDetails.role[allRoles[pr]].quality);
        projectedQualityArr.push(this.summaryButtonsDetails.role[allRoles[pr]].projectedQuality);

         dataArr.push({
          name: allRoles[pr],
          color: colors[pr % colors.length],
          data: [
            {
              name: allRoles[pr],
              x: pr + 1,
              y: this.summaryButtonsDetails.role[allRoles[pr]].count,
            },
          ],
        });

      }

      let roleQualityData= [{
      "name": "Projected Quality",
      "color": "#acdf87",
      "data":projectedQualityArr,
      },
      {
         "name": "Quality",
      "color": "#acdf87",
      "data":qualityArr,
      }];

      let rolesData=[...dataArr];

      this.quality_platformRole_bar_option.series = roleQualityData;
      this.qualityOption = this.quality_platformRole_bar_option;

      this.role_bar_option.series=rolesData;
      this.roleOption=this.role_bar_option;

       //platform and platform quality bar charts

      this.quality_platform_bar_option.xAxis.categories=allPlatforms;
      this.platform_bar_option.xAxis.categories=allPlatforms;

       dataArr=[], qualityArr=[], projectedQualityArr=[];
      for(let p=0;p<allPlatforms.length;p++){
        qualityArr.push(this.summaryButtonsDetails.platform[allPlatforms[p]].quality);
        projectedQualityArr.push(this.summaryButtonsDetails.platform[allPlatforms[p]].projectedQuality);

        dataArr.push({
          name: allPlatforms[p],
          color: colors[p % colors.length],
          data: [
            {
              name: allPlatforms[p],
              x: p + 1,
              y: this.summaryButtonsDetails.platform[allPlatforms[p]].count,
            },
          ],
        });
      }

      let qualityPlatformData= [{
      "name": "Projected Quality",
      "color": "#acdf87",
      "data":projectedQualityArr,
      },
      {
         "name": "Quality",
      "color": "#acdf87",
      "data":qualityArr,
      }];

      let platformData=[...dataArr];

      this.quality_platform_bar_option.series = qualityPlatformData;
      this.qualityPlatformOption = this.quality_platform_bar_option;
     
      this.platform_bar_option.series=platformData;
      this.platformOption = this.platform_bar_option;

     //feature and feature quality bar charts

       this.quality_feature_bar_option.xAxis.categories=allFeatures;
    
       dataArr=[], qualityArr=[], projectedQualityArr=[];
      for(let f=0;f<allFeatures.length;f++){
        qualityArr.push(this.summaryButtonsDetails.feature[allFeatures[f]].quality);
        projectedQualityArr.push(this.summaryButtonsDetails.feature[allFeatures[f]].projectedQuality);

        dataArr.push({
          name: allFeatures[f],
          color: colors[f % colors.length],
          data: [
            {
              name: allFeatures[f],
              x: f + 1,
              y: this.summaryButtonsDetails.feature[allFeatures[f]].count,
            },
          ],
        });
      }

      let qualityFeatureData= [{
      "name": "Projected Quality",
      "color": "#acdf87",
      "data":projectedQualityArr,
      },
      {
         "name": "Quality",
      "color": "#acdf87",
      "data":qualityArr,
      }];

      let featureData=[...dataArr];

    
      this.quality_feature_bar_option.series = qualityFeatureData;
      this.qualityFeatureOption = this.quality_feature_bar_option;

      this.bar_option.series = featureData;
      this.featureOption = this.bar_option;

      //Source and Source quality bar charts

       this.quality_source_bar_option.xAxis.categories=allSource;
       this.source_bar_option.xAxis.categories=allSource;
      
       dataArr=[], qualityArr=[], projectedQualityArr=[];
      for(let ft=0;ft<allSource.length;ft++){
       qualityArr.push(this.summaryButtonsDetails.source[allSource[ft]].quality);
        projectedQualityArr.push(this.summaryButtonsDetails.source[allSource[ft]].projectedQuality);
        dataArr.push({
          name: allSource[ft],
          color: colors[ft % colors.length],
          data: [
            {
              name: allSource[ft],
              x: ft + 1,
              y: this.summaryButtonsDetails.source[allSource[ft]].count,
            },
          ],
        });
      }

      let qualitySrcData= [{
      "name": "Projected Quality",
      "color": "#acdf87",
      "data":projectedQualityArr,
      },
      {
         "name": "Quality",
      "color": "#acdf87",
      "data":qualityArr,
      }];

      let sourceData=[...dataArr];
     
      this.quality_source_bar_option.series = qualitySrcData;
      this.qualitySrcOption = this.quality_source_bar_option;

      this.source_bar_option.series = sourceData;
      this.srcOption = this.source_bar_option;

      //defect charts

       let defectByTestcaseOwners=0;
      let testcaseCDETS=[];
      let defectByOthers=0;
      let Str1=this.cdetsReleaseFolderName+"_ss";
      let Str2=this.cdetsReleaseFolderName+"-ss";
      let mhDefects=[];
      for(let ra=0;ra<this.cdets.length;ra++){
        if((this.cdets[ra].status==='A' || this.cdets[ra].status==='I' || this.cdets[ra].status==='N' || this.cdets[ra].status==='O')&&
        (this.cdets[ra].attribute && (this.cdets[ra].attribute.indexOf(Str1)>-1 || this.cdets[ra].attribute && this.cdets[ra].attribute.indexOf(Str2)>-1))){
        
          mhDefects.push(this.cdets[ra]);
        }
        this.mhDefectsCount=mhDefects.length;
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

      this.pie_option1.series[0].data=this.testcaseDefectSummary;
      this.defectOption=this.pie_option1;

      this.pie_option3.series[0].data=this.loadTestcaseCDETSData();
      this.mhHaveOption=this.pie_option3;

//user chart
      let userArray=[];

      let obj={};
      for(let u=0;u<allUsers.length;u++){
         if(allUsers[u] != null){
         obj={};
        obj["value"]=10;
        obj["name"]=allUsers[u];  
        obj["color"]=colors[u % colors.length];
        userArray.push(obj);
        }
      }
      this.userSummary = userArray;

      this.userOption.series[0].data=this.userSummary;

  //defect testcase user chart

      this.testcases_defects_by_users_bar_option.xAxis.categories=allUsers;
      this.testcases_defects_by_users_bar_option.series=this.loadMultiBarChartDataForUser();
      this.testcaseDefectsByUsersOption=this.testcases_defects_by_users_bar_option;
    },
    hideSidebar() {
      this.sidebarHidden = true;
      document.querySelector(".releasesDiv").classList.add("hideReleaseDiv");
      document
        .querySelector(".releasesListDiv")
        .classList.add("hideReleasesListDiv");
          this.adjustMarginOfDashboardDiv();
    },
    showSidebar() {
      if(this.sidebarHidden){
       
      this.sidebarHidden = false;
      document.querySelector(".releasesDiv").classList.remove("hideReleaseDiv");
      document
        .querySelector(".releasesListDiv")
        .classList.remove("hideReleasesListDiv");
        this.adjustMarginOfDashboardDiv();
      }
      else{
         this.sidebarHidden = true;
      document.querySelector(".releasesDiv").classList.add("hideReleaseDiv");
      document
        .querySelector(".releasesListDiv")
        .classList.add("hideReleasesListDiv");
        this.adjustMarginOfDashboardDiv();
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
        // summaryArr=this.qualitySummary;
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
        // summaryArr=this.qualitySummary;
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
    loadMultiBarChartDataForUser(){
      //here
    let userList=this.summaryButtonsDetails.tc_execution_owners;
    let allUsers=Object.keys(this.summaryButtonsDetails.tc_execution_owners);
      let testcaseList=[],defectList=[];
       for (let j = 0; j < allUsers.length; j++) {
         testcaseList.push(userList[allUsers[j]].testcase_id.split(',').length);
       defectList.push(userList[allUsers[j]].defects.split(',').length)
       }
    
      let arr=[];
       arr.push({
         name:"Testcases",
         data: testcaseList,
         stack:"Testcases"
         })
         arr.push({
         name:"Defects",
         data: defectList,
           stack:"Defects"
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
      features=this.sortByValue(features,"count");
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
      let total=passed+failed;
      let color={"pass":"#76B947","fail":"#F51720","pending":"#2094df","failed":"#F51720","passed":"#76B947"}
      let projectedSummary=[{name:"passed",color:color["passed"],y:passed},{name:"failed",color:color["failed"],y:failed}]
       for(let k=0;k<actual.length;k++){
        if(actual[k].name!=="passed" && actual[k].name!=="failed"){
          projectedSummary.push(actual[k]);
        }
      }

      this.totalProjectedQuality=parseInt(passed/total*100);
      return projectedSummary;
    },
     loadSummaryChartData(key) {
     
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
      this.showingUnique=false;
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
      this.showingUnique=false;
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
    datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
},
    compareDates(rdata){
      let startDate=new Date(rdata.start_date);
      let fcsDate=new Date(rdata.fcs_date);
      let tcfaDate=new Date(rdata.tcfa_date);
      let retestStartDate=new Date(rdata.retest_start_date);
      let retestEndDate=new Date(rdata.retest_end_date);
      let longevityStartDate=new Date(rdata.longevity_start_date);
      let longevityEndDate=new Date(rdata.longevity_start_date);
     
      this.fcsStatus="";
      let currentDate=new Date();

      if(currentDate>fcsDate){
        this.fcsStatus="FCS Completed"
      }
      else{
        let diff=this.datediff(currentDate,fcsDate);
        this.fcsStatus=diff+" days left for FCS";
       }

      if(currentDate>startDate){
        if(currentDate<retestStartDate){
          this.currentPhase="Execution Started";
          document.querySelector('.currentPhaseStatus').innerHTML='<div class="pendingIcon"></div>';
          this.nextmilestone="Retest";
          this.nextmilestoneStatus=this.datediff(currentDate,retestStartDate)+" days left for TCFA";
        }
        if(currentDate>retestStartDate && currentDate<retestEndDate){
          this.currentPhase="Retest Started";
          this.nextmilestone="Longevity";
          document.querySelector('.currentPhaseStatus').innerHTML='<div class="inProgressIcon"></div>';
          this.nextmilestoneStatus=this.datediff(currentDate,longevityStartDate)+" days left for Longevity";
        }
        else if(currentDate>retestEndDate && currentDate<longevityStartDate){
          this.currentPhase="Retest Completed";
           this.nextmilestone="Longevity";
           document.querySelector('.currentPhaseStatus').innerHTML='<div class="inProgressIcon"></div>';
          this.nextmilestoneStatus=this.datediff(currentDate,longevityStartDate)+" days left for Longevity";
        }
        else if(currentDate>longevityStartDate && currentDate<longevityEndDate){
           this.currentPhase="Longevity Started";
          this.nextmilestone="TCFA";
          document.querySelector('.currentPhaseStatus').innerHTML='<div class="inProgressIcon"></div>';
          this.nextmilestoneStatus=this.datediff(currentDate,tcfaDate)+" days left for TCFA";
        }
        else if(currentDate>longevityEndDate && currentDate<tcfaDate){
           this.currentPhase="Longevity Completed";
          this.nextmilestone="TCFA";
          document.querySelector('.currentPhaseStatus').innerHTML='<div class="inProgressIcon"></div>';
          this.nextmilestoneStatus=this.datediff(currentDate,tcfaDate)+" days left for TCFA";
        }
        else if(currentDate>tcfaDate && currentDate<fcsDate){
           this.currentPhase="Completed";
          this.nextmilestone="";
          document.querySelector('.currentPhaseStatus').innerHTML='<div class="completedIcon"></div>';
          this.nextmilestoneStatus="";
        }
        else if(currentDate>fcsDate){
            this.currentPhase="Completed";
             this.nextmilestone="";
             document.querySelector('.currentPhaseStatus').innerHTML='<div class="completedIcon"></div>';
          this.nextmilestoneStatus="";
        }
      }
      else{
        document.querySelector('.currentPhaseStatus').innerHTML='<div class="pendingIcon"></div>';
        this.currentPhase="Not Started";//icons inprogress, completed, pending(not started) 
      }
     },
    loadGanttChart(relId){
       let self=this;
       testcaseService.getReleaseDetailsByReleaseId(relId).then(
          (data) => {
          self.releaseDetails=data[0];
          let rdata={...self.releaseDetails};
          rdata.actual_start_date=rdata.actual_start_date?rdata.actual_start_date:rdata.start_date;
          rdata.actual_fcs_date=rdata.actual_fcs_date?rdata.actual_fcs_date:rdata.fcs_date;
          rdata.actual_tcfa_date=rdata.actual_tcfa_date?rdata.actual_tcfa_date:rdata.tcfa_date;
          rdata.actual_retest_start_date=rdata.actual_retest_start_date?rdata.actual_retest_start_date:rdata.retest_start_date;
          rdata.actual_retest_end_date=rdata.actual_retest_end_date?rdata.actual_retest_end_date:rdata.retest_end_date;
          rdata.actual_longevity_start_date=rdata.actual_longevity_start_date?rdata.actual_longevity_start_date:rdata.longevity_start_date;
          rdata.actual_longevity_end_date=rdata.actual_longevity_end_date?rdata.actual_longevity_end_date:rdata.longevity_end_date;
          rdata.actual_giso_date=rdata.actual_giso_date?rdata.actual_giso_date:rdata.giso_date;
          rdata.actual_eotr_date=rdata.actual_eotr_date?rdata.actual_eotr_date:rdata.eotr_date;
         
         self.releaseDetails1={...rdata};
      
          self.selectedCustomerName=data[0].customerName;
          //let revents=[{"event_name":"test","event_start_date":rdata.start_date,"event_end_date":rdata.fcs_date,"event_id":12}]
           let revents=data[1];
           self.showTims=true;
           self.timsId=rdata.tims_id;
           self.timsUrl=rdata.tims_url;
           self.currentPhase="";
            self.compareDates(rdata);
            let planned_start_date={
              year:new Date(rdata.start_date).getFullYear(),
              month:new Date(rdata.start_date).getMonth(),
              date:new Date(rdata.start_date).getDate()
            };
            let planned_fcs_date={
             year: new Date(rdata.fcs_date).getFullYear(),
             month:new Date(rdata.fcs_date).getMonth(),
             date:new Date(rdata.fcs_date).getDate()
            };
            let planned_tcfa_date={
              year:new Date(rdata.tcfa_date).getFullYear(),
              month:new Date(rdata.tcfa_date).getMonth(),
              date:new Date(rdata.tcfa_date).getDate()
            };
            let planned_retest_start_date={
              year:new Date(rdata.retest_start_date).getFullYear(),
              month:new Date(rdata.retest_start_date).getMonth(),
              date:new Date(rdata.retest_start_date).getDate()
            };
            let planned_retest_end_date={
              year:new Date(rdata.retest_end_date).getFullYear(),
              month:new Date(rdata.retest_end_date).getMonth(),
              date:new Date(rdata.retest_end_date).getDate()
            };
            let planned_longevity_start_date={
              year:new Date(rdata.longevity_start_date).getFullYear(),
              month:new Date(rdata.longevity_start_date).getMonth(),
              date:new Date(rdata.longevity_start_date).getDate()
            };
            let planned_longevity_end_date={
              year:new Date(rdata.longevity_end_date).getFullYear(),
              month:new Date(rdata.longevity_end_date).getMonth(),
              date:new Date(rdata.longevity_end_date).getDate()
            };

              let planned_giso_date={
              year:new Date(rdata.giso_date).getFullYear(),
              month:new Date(rdata.giso_date).getMonth(),
              date:new Date(rdata.giso_date).getDate()
            };
              let planned_eotr_date={
              year:new Date(rdata.eotr_date).getFullYear(),
              month:new Date(rdata.eotr_date).getMonth(),
              date:new Date(rdata.eotr_date).getDate()
            };

             let actual_start_date={
              year:rdata.actual_start_date?new Date(rdata.actual_start_date).getFullYear():new Date(rdata.start_date).getFullYear(),
              month:rdata.actual_start_date?new Date(rdata.actual_start_date).getMonth():new Date(rdata.start_date).getMonth(),
              date:rdata.actual_start_date?new Date(rdata.actual_start_date).getDate():new Date(rdata.start_date).getDate(),
            };
            let actual_fcs_date={
             year:rdata.actual_fcs_date?new Date(rdata.actual_fcs_date).getFullYear():new Date(rdata.fcs_date).getFullYear(),
             month:rdata.actual_fcs_date?new Date(rdata.actual_fcs_date).getMonth():new Date(rdata.fcs_date).getMonth(),
             date:rdata.actual_fcs_date?new Date(rdata.actual_fcs_date).getDate():new Date(rdata.fcs_date).getDate(),
            };
            let actual_tcfa_date={
              year:rdata.actual_tcfa_date?new Date(rdata.actual_tcfa_date).getFullYear():new Date(rdata.tcfa_date).getFullYear(),
             month:new Date(rdata.actual_tcfa_date)?new Date(rdata.actual_tcfa_date).getMonth():new Date(rdata.tcfa_date).getMonth(),
             date:new Date(rdata.actual_tcfa_date)?new Date(rdata.actual_tcfa_date).getDate():new Date(rdata.tcfa_date).getDate(),
            };
            let actual_retest_start_date={
                 year:rdata.actual_retest_start_date?new Date(rdata.actual_retest_start_date).getFullYear():new Date(rdata.retest_start_date).getFullYear(),
             month:rdata.actual_retest_start_date?new Date(rdata.actual_retest_start_date).getMonth():new Date(rdata.retest_start_date).getMonth(),
             date:rdata.actual_retest_start_date?new Date(rdata.actual_retest_start_date).getDate():new Date(rdata.retest_start_date).getDate(),
           
            };
            let actual_retest_end_date={
                 year:rdata.actual_retest_end_date?new Date(rdata.actual_retest_end_date).getFullYear():new Date(rdata.retest_end_date).getFullYear(),
             month:rdata.actual_retest_end_date?new Date(rdata.actual_retest_end_date).getMonth():new Date(rdata.retest_end_date).getMonth(),
             date:rdata.actual_retest_end_date?new Date(rdata.actual_retest_end_date).getDate():new Date(rdata.retest_end_date).getDate(),
           
            };
            let actual_longevity_start_date={
                 year:rdata.actual_longevity_start_date?new Date(rdata.actual_longevity_start_date).getFullYear():new Date(rdata.longevity_start_date).getFullYear(),
             month:rdata.actual_longevity_start_date?new Date(rdata.actual_longevity_start_date).getMonth():new Date(rdata.longevity_start_date).getMonth(),
             date:rdata.actual_longevity_start_date?new Date(rdata.actual_longevity_start_date).getDate():new Date(rdata.longevity_start_date).getDate(),
           
            };
            let actual_longevity_end_date={
                 year:new Date(rdata.actual_longevity_end_date)?new Date(rdata.actual_longevity_end_date).getFullYear():new Date(rdata.longevity_end_date).getFullYear(),
             month:new Date(rdata.actual_longevity_end_date)?new Date(rdata.actual_longevity_end_date).getMonth():new Date(rdata.longevity_end_date).getMonth(),
             date:new Date(rdata.actual_longevity_end_date)?new Date(rdata.actual_longevity_end_date).getDate():new Date(rdata.longevity_end_date).getDate(),
           
            };

            let actual_giso_date={
                 year:new Date(rdata.actual_giso_date)?new Date(rdata.actual_giso_date).getFullYear():new Date(rdata.giso_date).getFullYear(),
             month:new Date(rdata.actual_giso_date)?new Date(rdata.actual_giso_date).getMonth():new Date(rdata.giso_date).getMonth(),
             date:new Date(rdata.actual_giso_date)?new Date(rdata.actual_giso_date).getDate():new Date(rdata.giso_date).getDate(),
           
            };

            let actual_eotr_date={
                 year:new Date(rdata.actual_eotr_date)?new Date(rdata.actual_eotr_date).getFullYear():new Date(rdata.eotr_date).getFullYear(),
             month:new Date(rdata.actual_eotr_date)?new Date(rdata.actual_eotr_date).getMonth():new Date(rdata.eotr_date).getMonth(),
             date:new Date(rdata.actual_eotr_date)?new Date(rdata.actual_eotr_date).getDate():new Date(rdata.eotr_date).getDate(),
            };
            
            self.ganttOptions1.xAxis[0].min=Date.UTC(actual_start_date.year,actual_start_date.month,actual_start_date.date);
            self.ganttOptions1.xAxis[0].max=Date.UTC(actual_eotr_date.year,actual_eotr_date.month,actual_eotr_date.date+7);
            self.ganttOptions1.xAxis[1].min=Date.UTC(actual_start_date.year,actual_start_date.month,actual_start_date.date);
           // self.ganttOptions1.xAxis[1].max=Date.UTC(actual_eotr_date.year,actual_eotr_date.month,actual_eotr_date.date+7);
            self.ganttOptions1.xAxis[1].max=Date.UTC(actual_eotr_date.year,actual_eotr_date.month,actual_eotr_date.date+7);
           // self.ganttOptions.xAxis[2].min=Date.UTC(start_date.year,start_date.month,start_date.date);
           // self.ganttOptions.xAxis[2].max=Date.UTC(fcs_date.year,fcs_date.month,fcs_date.date+7);
            self.ganttOptions.xAxis[0].min=Date.UTC(planned_start_date.year,planned_start_date.month,planned_start_date.date);
            self.ganttOptions.xAxis[0].max=Date.UTC(actual_eotr_date.year,actual_eotr_date.month,actual_eotr_date.date+7);
             self.ganttOptions.xAxis[1].min=Date.UTC(planned_start_date.year,planned_start_date.month,planned_start_date.date);
            //self.ganttOptions.xAxis[1].max=Date.UTC(actual_eotr_date.year,actual_eotr_date.month,actual_eotr_date.date+7);
            self.ganttOptions.xAxis[1].max=Date.UTC(actual_eotr_date.year,actual_eotr_date.month,actual_eotr_date.date+7);
           //  self.ganttOptions1.xAxis[2].min=Date.UTC(start_date.year,start_date.month,start_date.date);
            //self.ganttOptions1.xAxis[2].max=Date.UTC(fcs_date.year,fcs_date.month,fcs_date.date+7);
           self.ganttOptions.series= [{
        name: 'Project 1',
        data: [
          {
            name: 'Planned',
            id:'planned',
            y:0
        },
         {
             parent: 'planned',
            name: 'Executed',
            id:"Planned_Executed",
            start: Date.UTC(planned_start_date.year,planned_start_date.month,planned_start_date.date),
            end: Date.UTC(planned_tcfa_date.year,planned_tcfa_date.month,planned_tcfa_date.date),
             pointWidth: self.ganttChartPointWidth,
           
            y:1,
            color:"lightgreen",
            dataLabels: {
                color:"#fff",
                 "text-outline":"#fff",
                 fill:"#fff"
            }
         },
          {
             parent: 'planned',
            name: 'Executed',
            id:"Executed",
            start: Date.UTC(actual_start_date.year,actual_start_date.month,actual_start_date.date),
            end: Date.UTC(actual_tcfa_date.year,actual_tcfa_date.month,actual_tcfa_date.date),
             pointWidth: self.ganttChartPointWidth,
           completed: {
              amount:self.summaryButtonsDetails.testcasesExecuted.percentage/100,
              fill:"green",
               pointWidth: self.ganttChartPointWidth,
            },
            y:2,
            color:"lightgreen",
            dataLabels: {
                color:"#fff",
                 "text-outline":"#fff",
                 fill:"#fff"
            }
         },
         {
            parent: 'planned',
            name: 'Retest',
            id:"Planned_Retest",
            dependency:"Planned_Executed",
            start: Date.UTC(planned_retest_start_date.year,planned_retest_start_date.month,planned_retest_start_date.date),
            end: Date.UTC(planned_retest_end_date.year,planned_retest_end_date.month,planned_retest_end_date.date),
             pointWidth: self.ganttChartPointWidth,
              color:"#2094df",
             y:1,
              dataLabels: {
                color:"#fff",
                "text-outline":"#fff"
            }
        },
       
         {
            parent: 'planned',
            name: 'Retest',
            id:"Retest",
            dependency:"Executed",
            start: Date.UTC(actual_retest_start_date.year,actual_retest_start_date.month,actual_retest_start_date.date),
            end: Date.UTC(actual_retest_end_date.year,actual_retest_end_date.month,actual_retest_end_date.date),
             pointWidth: self.ganttChartPointWidth,
              color:"#2094df",
             y:2,
              dataLabels: {
                color:"#fff",
                "text-outline":"#fff"
            }
        }, 
        {
           parent: 'planned',
            name: 'Longevity',
            id:"Planned_Longevity",
            dependency:"Planned_Retest",
            start: Date.UTC(planned_longevity_start_date.year,planned_longevity_start_date.month,planned_longevity_start_date.date),
            end: Date.UTC(planned_longevity_end_date.year,planned_longevity_end_date.month,planned_longevity_end_date.date),
            pointWidth: self.ganttChartPointWidth,
             color:"orange",
             y:1,
              dataLabels: {
                color:"#fff"
            }
        },
        {
           parent: 'planned',
            name: 'Longevity',
            id:"Longevity",
            dependency:"Retest",
            start: Date.UTC(actual_longevity_start_date.year,actual_longevity_start_date.month,actual_longevity_start_date.date),
            end: Date.UTC(actual_longevity_end_date.year,actual_longevity_end_date.month,actual_longevity_end_date.date),
            pointWidth: self.ganttChartPointWidth,
             color:"orange",
             y:2,
              dataLabels: {
                color:"#fff"
            }
        }, 
        {
           parent: 'planned',
            name: 'FCS',
            milestone: true,
            start: Date.UTC(planned_fcs_date.year,planned_fcs_date.month,planned_fcs_date.date),
            end: Date.UTC(planned_fcs_date.year,planned_fcs_date.month,planned_fcs_date.date),
            dependency:"Planned_Longevity",
            color:"green",
            pointWidth: self.ganttChartPointWidth,
            y: 1,
             dataLabels: {
                color:"#fff"
            }
        },
       
        {
           parent: 'planned',
            name: 'FCS',
            milestone: true,
            start: Date.UTC(actual_fcs_date.year,actual_fcs_date.month,actual_fcs_date.date),
            end: Date.UTC(actual_fcs_date.year,actual_fcs_date.month,actual_fcs_date.date),
            dependency:"Longevity",
            color:"green",
            pointWidth: self.ganttChartPointWidth,
            y: 2,
             dataLabels: {
                color:"#fff"
            }
        },
         {
           parent: 'planned',
            name: 'GISO',
            milestone: true,
            start: Date.UTC(planned_giso_date.year,planned_giso_date.month,planned_giso_date.date),
            end: Date.UTC(planned_giso_date.year,planned_giso_date.month,planned_giso_date.date),
            dependency:"Planned_Longevity",
            color:"#2094df",
            pointWidth: self.ganttChartPointWidth,
            y: 1,
             dataLabels: {
                color:"#fff"
            }
        },
        {
           parent: 'planned',
            name: 'GISO',
            milestone: true,
            start: Date.UTC(actual_giso_date.year,actual_giso_date.month,actual_giso_date.date),
            end: Date.UTC(actual_giso_date.year,actual_giso_date.month,actual_giso_date.date),
            dependency:"Longevity",
            color:"#2094df",
            pointWidth: self.ganttChartPointWidth,
            y: 2,
             dataLabels: {
                color:"#fff"
            }
        },
         {
           parent: 'planned',
            name: 'EoTR',
            milestone: true,
            start: Date.UTC(planned_eotr_date.year,planned_eotr_date.month,planned_eotr_date.date),
            end: Date.UTC(planned_eotr_date.year,planned_eotr_date.month,planned_eotr_date.date),
            dependency:"Planned_Longevity",
            color:"#2094df",
            pointWidth: self.ganttChartPointWidth,
            y: 1,
             dataLabels: {
                color:"#fff"
            }
        },
        {
           parent: 'planned',
            name: 'EoTR',
            milestone: true,
            start: Date.UTC(actual_eotr_date.year,actual_eotr_date.month,actual_eotr_date.date),
            end: Date.UTC(actual_eotr_date.year,actual_eotr_date.month,actual_eotr_date.date),
            dependency:"Longevity",
            color:"#2094df",
            pointWidth: self.ganttChartPointWidth,
            y: 2,
             dataLabels: {
                color:"#fff"
            }
        },]
    }];

    self.ganttOptions1.series=[{
        name: 'Project 1',
        data: [
          {
             parent: 'planned',
            name: 'Executed',
            id:"Executed",
            start: Date.UTC(actual_start_date.year,actual_start_date.month,actual_start_date.date),
            end: Date.UTC(actual_tcfa_date.year,actual_tcfa_date.month,actual_tcfa_date.date),
             pointWidth:  self.ganttChartPointWidth,
            completed: {
              amount:self.summaryButtonsDetails.testcasesExecuted.percentage/100,
              fill:"green",
            },
               y:0,
            color:"lightgreen",
             dataLabels: {
                color:"#fff"
            }
         }, 
         {
            parent: 'planned',
            name: 'Retest',
            id:"Retest",
            dependency:"Executed",
            start: Date.UTC(actual_retest_start_date.year,actual_retest_start_date.month,actual_retest_start_date.date),
            end: Date.UTC(actual_retest_end_date.year,actual_retest_end_date.month,actual_retest_end_date.date),
            pointWidth: self.ganttChartPointWidth,
              color:"#2094df",
              y:0,
               dataLabels: {
                color:"#fff"
            }
        },
        
         {
           parent: 'planned',
            name: 'Longevity',
            id:"Longevity",
            dependency:"Retest",
            start: Date.UTC(actual_longevity_start_date.year,actual_longevity_start_date.month,actual_longevity_start_date.date),
            end: Date.UTC(actual_longevity_end_date.year,actual_longevity_end_date.month,actual_longevity_end_date.date),
             color:"orange",
              pointWidth: self.ganttChartPointWidth,
             y:0,
              dataLabels: {
                color:"#fff"
            }
        }, 
         
        {
           parent: 'planned',
            name: 'FCS',
            milestone: true,
            start: Date.UTC(actual_fcs_date.year,actual_fcs_date.month,actual_fcs_date.date),
            end: Date.UTC(actual_fcs_date.year,actual_fcs_date.month,actual_fcs_date.date),
            dependency:"Longevity",
           color:"green",
            pointWidth: self.ganttChartPointWidth,
            y: 0,
             dataLabels: {
                color:"#fff"
            }
        },
        {
           parent: 'planned',
            name: 'GISO',
            milestone: true,
            start: Date.UTC(actual_giso_date.year,actual_giso_date.month,actual_giso_date.date),
            end: Date.UTC(actual_giso_date.year,actual_giso_date.month,actual_giso_date.date),
            dependency:"Longevity",
           color:"#2094df",
            pointWidth: self.ganttChartPointWidth,
            y: 0,
             dataLabels: {
                color:"#fff"
            }
        },
         {
           parent: 'planned',
            name: 'EoTR',
            milestone: true,
            start: Date.UTC(actual_eotr_date.year,actual_eotr_date.month,actual_eotr_date.date),
            end: Date.UTC(actual_eotr_date.year,actual_eotr_date.month,actual_eotr_date.date),
            dependency:"Longevity",
           color:"#2094df",
            pointWidth: self.ganttChartPointWidth,
            y: 0,
             dataLabels: {
                color:"#fff"
            }
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
             slNum: revents[k].id,
             start: Date.UTC(event_start_date.year,event_start_date.month,event_start_date.date),
            end: Date.UTC(event_end_date.year,event_end_date.month,event_end_date.date),
            y:k+4
         });
       }
    }
    self.applyChangeFunc();
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
    loadHeatMapOptionDetails(data){
       let categories=[],weekDates=[];
        let total=[],mhHave=[],cvtFound=[],cvtObserved=[],planned=[],actual=[],passed=[],failed=[],cvtTotal=[],executed=[],pending=[];
            let valueArray=[],valueObj=[];
            categories=[ 'Planned','Executed', 'Quality', 'Defects', 'Found',  'Observed','MH Defects',"Automation"];
          let categorynames=['planned','executed', 'quality', 'cvtTotal', 'cvtFound',  'cvtObserved','mhHave',"tc_automated"];
          let categoryObj={};
            
            for(let i=0;i<data.length;i++){
              categoryObj={};
               weekDates.push(data[i].start_date.substring(0,10));
             //  categoryObj["total"]=data[i].executed+data[i].pending;
               categoryObj["planned"]=(data[i].executed+data[i].pending) != 0 ? parseInt((data[i].planned/(data[i].executed+data[i].pending))*100):0;
               categoryObj["executed"]=(data[i].executed+data[i].pending) != 0 ? parseInt((data[i].executed/(data[i].executed+data[i].pending))*100):0;
               categoryObj["quality"]=((data[i].executed)!=0 && (data[i].executed!=null)) ? parseInt((data[i].passed/data[i].executed)*100) : 0;
               let mhdefects=data[i].must_have_defects!=null?data[i].must_have_defects:0;
               let observed=data[i].defects_observed!=null?data[i].defects_observed:0;
               let found=data[i].defects_found_CVT!=null?data[i].defects_found_CVT:0;
               categoryObj["cvtTotal"]=observed+found;
               categoryObj["cvtFound"]=found;
               categoryObj["cvtObserved"]=observed;
               categoryObj["mhHave"]=mhdefects;
               categoryObj["tc_automated"]=0;
             
            for(let k=0;k<categorynames.length;k++){
              valueObj={};
              valueObj["x"]=i;
              valueObj["y"]=k;
              valueObj["value"]=categoryObj[categorynames[k]];
              if(categoryObj[categorynames[k]]===0 || categoryObj[categorynames[k]] === null){
                 valueObj["color"]="red";
              }
              else{
                valueObj["color"]="green";
              }
             
              valueArray.push(valueObj);
            }
       }

    
     let heatMapOptions=this.loadHeatMapOptions();

     heatMapOptions.xAxis.categories=weekDates;
     heatMapOptions.yAxis.categories=categories;

     heatMapOptions.series[0].data=valueArray;
     
     this.heatMapOptions=heatMapOptions;
    },
    loadWeeklyReportDetails(data){
      let self=this;
       self.weeklyReport=data;
       self.selectedWeekData=data[0];
        self.selectedWeekData1=data[0];
            self.loadHeatMapOptionDetails(data);
            let categories=[],mhHave=[],cvtFound=[],cvtObserved=[],planned=[],actual=[],passed=[],failed=[],cvtTotal=[],plannedDdts=[];
            let mhHaveCount=0,cvtFoundCount=0,cvtObservedCount=0,plannedCount=0,actualCount=0,passedCount=0,failedCount=0,cvtTotalCount=0,plannedDdtsCount=[];
            for(let i=0;i<data.length;i++){
             categories.push(data[i].start_date.substring(0,10));
              mhHaveCount=data[i].must_have_defects!="null"?data[i].must_have_defects:null;
              cvtFoundCount=data[i].defects_found_CVT!="null"?data[i].defects_found_CVT:null;
              plannedDdtsCount=data[i].planned_ddts_count!="null"?data[i].planned_ddts_count:null;
              cvtObservedCount=data[i].defects_observed!="null"?data[i].defects_observed:null;
              if((data[i].defects_found_CVT === "null" || data[i].defects_observed === "null")){
                 cvtTotalCount=null;
              }
              else{
                 cvtTotalCount=data[i].defects_found_CVT+data[i].defects_observed!=0?data[i].defects_found_CVT+data[i].defects_observed:null;
              }
              mhHave.push(mhHaveCount);
             
              cvtTotal.push(cvtTotalCount);
              cvtFound.push(cvtFoundCount);
              plannedDdts.push(plannedDdtsCount);
              cvtObserved.push(cvtObservedCount);
              self.weeklyReport[i]["cvtTotal"]=cvtTotalCount;
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
        name: "Planned",
        type: "spline",
       data: plannedDdts,
        dashStyle: "shortdot",
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
    editSplinetableRow(){
      this.editingRow=true;
    },
    editCVTtableRow(){
      this.editing1Row=true;
    },
    editAhatableRow(){
       this.editingAha=true;
    },
    cancleUpdateSplinetableRow(){
      this.editingRow=false;
    },
    cancleUpdateAhaTableRow(){
      this.editingAha=false;
    },
    cancleUpdateCVTtableRow(){
      this.editing1Row=false;
    },
    
    updateReleaseDetails(){
      let self=this;
      this.plannedDetailsAdded=true;
      this.plannedReleaseDetails={...this.releaseDetails1};

        this.releaseDetails1["selectedProjectsForChange"]= [...new Set(this.custSelectedReleases)];
      testcaseService.updateRelease([this.releaseDetails1],self.selectedRelId).then(
          (data) => {
            self.loadGanttChart(self.selectedRelId);
            self.showProjectPlanForm=false;
           self.releaseDetails1["selectedProjectsForChange"]=[];
          },(error)=>{
             self.loading = false;
            self.loadingMessage = "";
            self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while updating Release details, Please try again later";
          });
    },
    updateAhaTableRow(){
      let self=this;
      let obj={"selectedProjectsForChange":[...new Set(this.custSelectedReleasesForAHA)],ahaList:this.ahaList}
      testcaseService.updateAhaReportByReleaseId(obj,self.selectedRelId).then(
          (data) => {
             self.editingAha=false;
              self.showAhaTable=false;
              self.loadAhaList(self.selectedRelId);
          },
           (error) => {
            self.loading = false;
            self.loadingMessage = "";
            self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while updating Weekly Report, Please try again later";
          }
        );
    },
    updateSplinetableRow(){
      let self=this;
      let weeklyreport=JSON.parse(JSON.stringify(this.weeklyReport));
      for(let i=0;i<weeklyreport.length;i++){delete weeklyreport[i].cvtTotal}
      if(self.weeklyReportFlag==="relId"){
       testcaseService.updateWeeklyReportByReleaseId(weeklyreport,self.selectedRelId).then(
          (data) => {
             self.editingRow=false;
             self.editing1Row=false;
              self.showSplineDataTable=false;
              self.showCVTDataTable=false;
              self.loadWeeklyReport(self.selectedRelId);
          },
           (error) => {
            self.loading = false;
            self.loadingMessage = "";
            self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while updating Weekly Report, Please try again later";
          }
        );
      }
      else if(self.weeklyReportFlag==="customerName"){
        let custname=self.selectedCustomerName;
        let folderName=self.folderName;
         testcaseService.updateWeeklyReportByCustomer(weeklyreport,folderName,custname).then(
          (data) => {
             self.editingRow=false;
             self.editing1Row=false;
              self.showSplineDataTable=false;
              self.showCVTDataTable=false;
              self.loadWeeklyReportByCustomerName(self.folderName,self.selectedCustomerName);
          },
           (error) => {
            self.loading = false;
            self.loadingMessage = "";
            self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while updating Weekly Report, Please try again later";
          }
        );
      }
    },
    checkRowUpdating(index){
      if(this.editingRow===index){
        return true;
      }
      else{
        return false;
      }
    },
    checkRow1Updating(index){
      if(this.editing1Row===index){
        return true;
      }
      else{
        return false;
      }
    },
    loadWeeklyReportByCustomerName(folderName,custName){
         let self=this;
        testcaseService.getWeeklyReportByCustomer(folderName,custName).then(
          (data) => {
            self.loading = false;
            self.loadingMessage = "";
            self.weeklyReportFlag="customerName"
            self.loadWeeklyReportDetails(data);
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
     loadWeeklyReport(relId){
      let self=this;
        testcaseService.getWeeklyReportByReleaseId(relId).then(
          (data) => {
            self.loading = false;
            self.loadingMessage = "";
            self.weeklyReportFlag="relId"
            self.loadWeeklyReportDetails(data);
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
          self.cdetsOptions2.colors= [
     "#003f5c",
      "#2f4b7c",
      "#665191",
      "#a05195",
      "#d45087",
      "#f95d6a",
      "#ff7c43",
      "#ffa600",
    ];
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
          self.cdetsOptions1.colors=self.featureColors;
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
    loadTestcases(id){



    },

    drawChart(id,type) {
        let self = this;
           let pageNumber=1;
           let pageNumbers=0;
      if (type === "Release") {
        let relId = id;
         //self.loading1 = true;
         // self.loadingMessage1 = "Loading testcases and updating charts";
          self.showLoadingTestcases=true;

        let q='?\page='+pageNumber;
        // for (let i = 0; i < projects.length; i++) {
        testcaseService.getTestcaseListByReleaseId(relId,q).then(
          (res) => {
              let data=res.data;
            let testcases = data;
            let meta=res.meta;
            pageNumbers=meta.pages-1;
            if(meta.pages>1){
              for(let sh=2;sh<=meta.pages;sh++){
                pageNumber=sh;
               q='?\page='+pageNumber;
          testcaseService.getTestcaseListByReleaseId(relId,q).then(
          (res) => {
            pageNumbers=pageNumbers-1;
            data=res.data;
            testcases=testcases.concat(data);
            if(pageNumbers===0){
              self.loading1 = false;
            self.loadingMessage1 = "";
            self.testcases=testcases;
            self.selectedTestcases=testcases;
            self.showingUnique=false;
            self.testcasesFlag+=1;
            self.totalTestcases = testcases.length;
            self.updateCdetsDetails();
          //  self.loadSummaryData(testcases);
            }
           },
          (error) => {
            self.loading1 = false;
            self.loadingMessage1 = "";
            self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while loading Testcases, Please try again later";
          });
          }
            }
            else{
              self.loading1 = false;
            self.loadingMessage1 = "";
              self.testcases=testcases;
               self.selectedTestcases=testcases;
               self.showingUnique=false;
            self.testcasesFlag+=1;
            self.totalTestcases = testcases.length;
            self.updateCdetsDetails();
           // self.loadSummaryData(testcases);
            }
        },
          (error) => {
            self.loading1 = false;
            self.loadingMessage1 = "";
            self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while loading Testcases, Please try again later";
          }
        );
      } else  if (type === "Folder") {
        //  self.loading1 = true;
         // self.loadingMessage1 = "Loading testcases and updating charts";
          self.showLoadingTestcases=true;
         let q='?\page='+pageNumber;
         testcaseService.getTestcaseListByFolderName(id,q).then(
          (res) => {
            let data=res.data;
            let testcases = data;
            let meta=res.meta;
            pageNumbers=meta.pages-1;
            if(meta.pages>1){
              for(let sh=2;sh<=meta.pages;sh++){
                pageNumber=sh;
               q='?\page='+pageNumber;
          testcaseService.getTestcaseListByFolderName(id,q).then(
          (res) => {
            pageNumbers=pageNumbers-1;
            data=res.data;
            testcases=testcases.concat(data);
            if(pageNumbers===0){
              self.loading1 = false;
            self.loadingMessage1 = "";
            self.testcases = testcases;
             self.selectedTestcases=testcases;
             self.showingUnique=false;
            self.testcasesFlag+=1;
             self.updateCdetsDetails();
            self.totalTestcases = testcases.length;
           // self.loadTopSummaryData(testcases);
           // self.loadSummaryData(testcases);
            }
           },(error)=>{
              self.loading1 = false;
            self.loadingMessage1 = "";
                self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while loading Testcases, Please try again later";
          });


              }

            }
            else{
              self.loading1 = false;
            self.loadingMessage1 = "";
              self.testcases = testcases;
             self.selectedTestcases=testcases;
             self.showingUnique=false;
            self.testcasesFlag+=1;
             self.updateCdetsDetails();
            self.totalTestcases = testcases.length;
           // self.loadTopSummaryData(testcases);
         //   self.loadSummaryData(testcases);
            }

           
           
             
          },
          (error) => {
            self.loading1 = false;
            self.loadingMessage1 = "";
            self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while loading Testcases, Please try again later";
          }
        );
    }
    else  if (type === "Customer") {
        //  self.loading1 = true;
         // self.loadingMessage1 = "Loading testcases and updating charts";
          self.showLoadingTestcases=true;
         let q='?\page='+pageNumber;
         testcaseService.getTestcaseListByCustomerFolderName(id,self.folderName,q).then(
          (res) => {
            let data=res.data;
            let testcases = data;
            let meta=res.meta;
            pageNumbers=meta.pages-1;
            if(meta.pages>1){
              for(let sh=2;sh<=meta.pages;sh++){
                pageNumber=sh;
               q='?\page='+pageNumber;
          testcaseService.getTestcaseListByCustomerFolderName(id,self.folderName,q).then(
          (res) => {
            pageNumbers=pageNumbers-1;
            data=res.data;
            testcases=testcases.concat(data);
            if(pageNumbers===0){
              self.loading1 = false;
            self.loadingMessage1 = "";
            self.testcases = testcases;
             self.selectedTestcases=testcases;
             self.showingUnique=false;
            self.testcasesFlag+=1;
             self.updateCdetsDetails();
            self.totalTestcases = testcases.length;
           // self.loadTopSummaryData(testcases);
           // self.loadSummaryData(testcases);
            }
           },(error)=>{
              self.loading1 = false;
            self.loadingMessage1 = "";
                self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while loading Testcases, Please try again later";
          });


              }

            }
            else{
              self.loading1 = false;
            self.loadingMessage1 = "";
              self.testcases = testcases;
             self.selectedTestcases=testcases;
             self.showingUnique=false;
            self.testcasesFlag+=1;
             self.updateCdetsDetails();
            self.totalTestcases = testcases.length;
           // self.loadTopSummaryData(testcases);
           // self.loadSummaryData(testcases);
            }

           
           
             
          },
          (error) => {
            self.loading1 = false;
            self.loadingMessage1 = "";
            self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while loading Testcases, Please try again later";
          }
        );
    }
      else if(type === "Project"){
        let prId = id;
         self.loading1 = true;
          //  self.loadingMessage1 = "Loading testcases and updating charts";
           // self.showLoadingTestcases=true;
             let q='?\page='+pageNumber;
        testcaseService.getTestcaseList(prId,q).then(
          (res) => {
              let data=res.data;
            let testcases = data;
            let meta=res.meta;
             pageNumbers=meta.pages-1;
            if(meta.pages>1){
              for(let sh=2;sh<=meta.pages;sh++){
                pageNumber=sh;
               q='?\page='+pageNumber;
              testcaseService.getTestcaseList(prId,q).then(
          (res) => {  
             pageNumbers=pageNumbers-1;
            self.showLoadingTestcases=false;
            data=res.data;
            testcases=testcases.concat(data);
            if(pageNumbers===0){
              self.loading1 = false;
            self.loadingMessage1 = "";
             self.testcases=testcases;
             self.selectedTestcases=testcases;
             self.showingUnique=false;
             self.testcasesFlag+=1;
             self.updateCdetsDetails();
            self.totalTestcases = testcases.length;
           // self.loadSummaryData(testcases);
            }
          },
           (error) => {
            self.loading1 = false;
            self.loadingMessage1 = "";
            self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while loading Testcases, Please try again later";
          }
          );
              }
            }
            else{
              self.loading1 = false;
            self.loadingMessage1 = "";
               self.testcases=testcases;
             self.selectedTestcases=testcases;
             self.showingUnique=false;
             self.testcasesFlag+=1;
             self.updateCdetsDetails();
            self.totalTestcases = testcases.length;
          //  self.loadSummaryData(testcases);
            }
          },
          (error) => {
            self.loading1 = false;
            self.loadingMessage1 = "";
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
        name: robj.rname,
        tims_id: robj.rtimsid,
        attribute: robj.rattribute,
        release_attribute: robj.release_attribute,
        customerName:robj.customerName,
        start_date:robj.start_date!="null"?(robj.start_date):null,
        tcfa_date:robj.tcfa_date!="null"?(robj.tcfa_date):null,
        fcs_date:robj.fcs_date!="null"?(robj.fcs_date):null,
        retest_start_date:robj.retest_start_date!="null"?(robj.retest_start_date):null,
        retest_end_date:robj.retest_end_date!="null"?(robj.retest_end_date):null,
        longevity_start_date:robj.longevity_start_date!="null"?(robj.longevity_start_date):null,
        longevity_end_date:robj.longevity_end_date!="null"?(robj.longevity_end_date):null,
        giso_date:robj.giso_date!="null"?(robj.giso_date):null,
        eotr_date:robj.eotr_date!="null"?(robj.eotr_date):null,
        resources:robj.resources!="null"?robj.resources:null,
        folder_name: robj.folder_name,
     };
      this.editRelease=true;
      e.preventDefault();
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
    addBackgroundForSelected(selectedDiv){
      let selectList=document.querySelectorAll('.selectedName');
                for(let u=0;u<selectList.length;u++){
                  selectList[u].classList.remove('selectedName');
                }
                selectedDiv.classList.add('selectedName');
    },
    sortByDate(arr,key){
      return arr.sort(function(a,b){
         var dateA = new Date(a[key]).getTime();
         var dateB = new Date(b[key]).getTime();
          return dateA < dateB ? 1 : -1;  
      });
    },
    sortByValue(arr,key){
      return arr.sort(function(a,b){
          return a[key] < b[key] ? 1 : -1;  
      });
    },
    getRelSummary(relname){
      for(let i=0;i<this.releases.length;i++){
        if(this.releases[i].name===relname){
          return this.releases[i].summary;
        }
      }
        return "";
   },
   getRelDefectSummary(relname){
      for(let i=0;i<this.releases.length;i++){
        if(this.releases[i].name===relname){
          return this.releases[i].defect_summary;
        }
      }
        return "";
   },
   getCustomerForRelease(relId){
     debugger;
   },
   updateExecutionDefectSummary(type){
      this.loading = true;
      this.loadingMessage = "Loading Customer releases...";

      testcaseService.updateWeeklyReportByReleaseId(this.weekly,this.selectedRelId).then(
        (data) => {
           this.loading = false;
              this.loadingMessage = "";
            

        },(error)=>{
           this.loading = false;
              this.loadingMessage = "";
              this.showErrorModal = true;
              this.modalErrorMessage =
                "Error while updating summary, Please try again later";
        });
   },
    loadReleases() {
      this.loading = true;
      this.loadingMessage = "Loading Customer releases...";
      let self1 = this;
      testcaseService.getReleasesList().then(
        (data) => {
          self1.loading = false;
          self1.loadingMessage = "";
          self1.releases = data;
          //this.sortByDate(data,"fcs_date")
          let folders = [];
          let folderTemplate = "";
          let releasesBtnlist = document.querySelector(".releasesBtnlist");

          let sortedData=this.sortByDate(data,"fcs_date")
          for (let i = 0; i < sortedData.length; i++) {
            if(i==0){

            }
            let fl = sortedData[i].folder_name ? sortedData[i].folder_name : "Unnamed";
            folders.push(fl);
          }
          
          self1.folders = [...new Set(folders)];
          this.loadCDETSData(data[0].id,folders[0]);
          this.selectedRelId=data[0].id;
           this.selectedCustomerName="";
              
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
         self1.loadCustomersSummary(self1.folders[0]);
        //---- self1.drawChart(self1.folders[0],"Folder");
         //self1.drawChart("733","Folder");
        //--- self1.loadCFDCount("folder",self1.folders[0]);

      
        
    
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
              let custName= data1.customerName ? data1.customerName : "na";
              let attr = data1.attribute ? data1.attribute : "na";
              let flName = data1.folder_name;
              let reltcfaDate=data1.tcfa_date;
              let relsDate=data1.start_date;
              let relfcsDate=data1.fcs_date;
              let relrSDate=data1.retest_start_date;
              let relrEDate=data1.retest_end_date;
              let rellSDate=data1.longevity_start_date;
              let rellEDate=data1.longevity_end_date;
              let relgisoDate=data1.giso_date;
              let releotrDate=data1.eotr_date;
              let relAttr = data1.release_attribute ? data1.release_attribute
                : "na";
              let resources = data1.resources;
               
              releasestemplete +=
                '<button type="button" class="collapsibleReleases to-right" data-rellSDate="'+rellSDate+'"  data-rellEDate="'+rellEDate+'" data-custName="'+custName+'"  data-timsid="' +
                timsid+'" data-relrSDate="'+relrSDate+'" data-relrEDate="'+relrEDate+'" data-attr="'+attr+'" data-reltcfaDate="'+reltcfaDate+'" data-folder="'+
                flName+'" data-resources="'+resources+'" data-relgisoDate="'+relgisoDate+'" data-releotrDate="'+releotrDate+'" data-relsDate="'+relsDate+'" data-relfcsDate="'+relfcsDate+'" data-relAttr="'+relAttr+'" id="release_' +
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
                
                self1.showTims=false;
               // self1.gotoTestcase=false;
               self1.proj_cust_Selected=false;
                self1.addBackgroundForSelected(e.currentTarget);
                let tempName=e.currentTarget.id.substring(7);
                self1.loadCustomersSummary(tempName);
                 self1.releaseFlag="folder";
                self1.folderName=tempName;
                self1.loadSummaryButtonDetails();
                self1.drawChart(tempName,"Folder");
                self1.loadCFDCount("folder",tempName);
                self1.selectedCustomerName="";
                self1.$refs.fmenu.close();
                //self1.loadWeeklyReport(relId);//Todo
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
                self1.adjustMarginOfDashboardDiv();
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
                self1.proj_cust_Selected=true;
                self1.custSelectedReleases=[];
                 self1.custSelectedReleasesForAHA=[];
                 self1.showTims=false;
                 self1.adjustMarginOfDashboardDiv();
                 self1.addBackgroundForSelected(e.currentTarget);
               let temp = this.id.split("_");
                self1.selectedRelId = temp[temp.length - 1];
                self1.selectedCustomerName="";
              
                self1.releaseFlag = "release";
                self1.showTestcases = true;
               // self1.gotoTestcase =true;
                self1.ganttOptions.title.text="Project Plan - <span style='font-size:15px'>"+ this.innerText+"</span>"
                self1.ganttOptions1.title.text="Project Plan - <span style='font-size:15px'>"+ this.innerText+"</span>"
                self1.summaryObj.summary=self1.getRelSummary(this.innerText);
                self1.summaryObj.defectSummary=self1.getRelDefectSummary(this.innerText);
                self1.rel_aha_list=self1.loadAhaList(self1.selectedRelId);
                e.preventDefault();
                e.stopPropagation();
              },
              true
            );
            coll[b].addEventListener(
              "click",
              function(e) {
                 self1.showTims=false;
                 self1.proj_cust_Selected=true;
                 self1.custSelectedReleases=[];
                  self1.custSelectedReleasesForAHA=[];
                  self1.showTestcases = true;
                  self1.adjustMarginOfDashboardDiv();
                 // self1.gotoTestcase=false;
                 let temp12 = this.id.split("_");
                let relId = temp12[temp12.length - 1];
                 self1.addBackgroundForSelected(e.currentTarget);
                self1.selectedRelId = temp12[temp12.length - 1];
               self1.selectedRelease = this.id;
                 let folderName = e.currentTarget.getAttribute("data-folder"); 
                self1.loadCDETSData(relId,folderName);
                self1.releaseFlag="release";
                self1.loadWeeklyReport(relId);
                self1.loadGanttChart(relId);
               self1.selectedReleaseName = this.innerText;
                 self1.ganttOptions.title.text="Project Plan - <span style='font-size:15px'>"+ this.innerText+"</span>"
                self1.ganttOptions1.title.text="Project Plan - <span style='font-size:15px'>"+ this.innerText+"</span>"
                 self1.summaryObj.summary=self1.getRelSummary(this.innerText);
                 self1.summaryObj.defectSummary=self1.getRelDefectSummary(this.innerText);
                 self1.rel_aha_list=self1.loadAhaList(self1.selectedRelId);
                let temp = document.querySelectorAll(".activePR");
                for (let i = 0; i < temp.length; i++) {
                  temp[i].classList.remove("activePR");
                }

                this.classList.add("activePR");
                 self1.loadSummaryButtonDetails();
                self1.drawChart(relId,"Release");
                self1.loadCFDCount("release",relId);
                this.classList.toggle("activeBtn");
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
              let custName = e.currentTarget.getAttribute("data-custName");
              let attr = e.currentTarget.getAttribute("data-attr");
              let relAttr = e.currentTarget.getAttribute("data-relAttr");
              let relsDate = e.currentTarget.getAttribute("data-relsDate");
              let reltcfaDate = e.currentTarget.getAttribute("data-reltcfaDate");
              let relfcsDate = e.currentTarget.getAttribute("data-relfcsDate");
              let relrSDate = e.currentTarget.getAttribute("data-relrSDate");
              let relrEDate = e.currentTarget.getAttribute("data-relrEDate");
              let rellSDate = e.currentTarget.getAttribute("data-rellSDate");
              let rellEDate = e.currentTarget.getAttribute("data-rellEDate");
              let relgisoDate= e.currentTarget.getAttribute("data-relgisoDate");
              let releotrDate = e.currentTarget.getAttribute("data-releotrDate");
              let folderName = e.currentTarget.getAttribute("data-folder"); 
              let resources = e.currentTarget.getAttribute("data-resources"); 
              let robj = {
                rid: e.currentTarget.id.substring(
                  e.currentTarget.id.lastIndexOf("_") + 1
                ),
                rname: e.currentTarget.innerText.split("\n")[0],
                rtimsid: timsId === "na" ? "" : timsId,
                rattribute: attr === "na" ? "" : attr, //temp[1],
                release_attribute: relAttr === "na" ? "" : relAttr,
                customerName:custName,
                start_date:relsDate,
                tcfa_date:reltcfaDate,
                fcs_date:relfcsDate,
                retest_start_date:relrSDate,
                retest_end_date:relrEDate,
                longevity_start_date:rellSDate,
                giso_date:relgisoDate,
                eotr_date:releotrDate,
                longevity_end_date:rellEDate,
                resources:resources,
                folder_name: folderName,
              };
              self1.$refs.rmenu.open(e, robj);
              self1.$refs.pmenu.close();
              self1.$refs.fmenu.close();
              e.preventDefault();
            });
          }
          coll[0].click();

          testcaseService.getFolderByProjectIds().then(
              (fdata) => {
                  for (let s = 0; s < self1.releases.length; s++) {
                  let pdata=fdata[self1.releases[s].id];
                  let releaseDivIdName = "release_" + self1.releases[s].id;
                  let releaseDiv = document.querySelector("#" + releaseDivIdName);
                  self1.projects[
                  self1.releases[s].name + "_" + self1.releases[s].id
                ] = pdata;
                if (self1.selectedRelease === "") {
                  self1.selectedRelease = "release_" + self1.releases[s].id;
                  self1.selectedReleaseName = self1.releases[s].name;

                     self1.ganttOptions.title.text="Project Plan - <span style='font-size:15px'>"+self1.selectedReleaseName+"</span>"
                     self1.ganttOptions1.title.text="Project Plan - <span style='font-size:15px'>"+self1.selectedReleaseName+"</span>"
                      self1.summaryObj.summary=self1.getRelSummary(self1.selectedReleaseName);
                      self1.summaryObj.defectSummary=self1.getRelDefectSummary(self1.selectedReleaseName);
                      self1.ahaList=self1.loadAhaList(self1.selectedRelId);
     
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
                    self1.proj_cust_Selected=false;
                     self1.showTims=false;
                    // self1.gotoTestcase=true;
                    self1.addBackgroundForSelected(e.currentTarget);
                      let pr_id = this.id.substring(this.id.lastIndexOf("_") + 1);
                       self1.selectedPrId=pr_id;
                   // self1.hideSidebar();

                   self1.selectedPrId = pr_id;

                    self1.releaseFlag = "project";
                    e.preventDefault();
                    e.stopPropagation();
                  });
                  prs[z].removeEventListener("click",function(){});
                  prs[z].addEventListener("click", function(e) {
                    self1.proj_cust_Selected=true;
                     self1.showTims=false;
                      self1.showTestcases = true;
                     // self1.gotoTestcase=false;
                     self1.addBackgroundForSelected(e.currentTarget);
                     let pr_id = this.id.substring(this.id.lastIndexOf("_") + 1);
                      self1.selectedProjectName=this.innerText;;
                      self1.selectedPrId=pr_id;
                    let prs = this.id.split("_");
                    self1.releaseFlag = "project";
                    self1.selectedRelease = "project_" + prs[prs.length - 1];
                    self1.selectedReleaseName = this.innerText;
                     self1.ganttOptions.title.text="Project Plan - <span style='font-size:15px'>"+ this.innerText+"</span>"
                     self1.ganttOptions1.title.text="Project Plan - <span style='font-size:15px'>"+ this.innerText+"</span>"
                      self1.summaryObj.summary=self1.getRelSummary(this.innerText);
                      self1.summaryObj.defectSummary=self1.getRelDefectSummary(this.innerText);
                     self1.loadAhaList(self1.selectedRelId);
                      self1.loadSummaryButtonDetails();
                    self1.drawChart(pr_id,"Project");
                    self1.loadCFDCount("project",pr_id);
                    
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
             
                }
              },(error)=>{
                 self1.loading = false;
                self1.loadingMessage = "";
                  this.showErrorModal = true;
              this.modalErrorMessage =
                "Error while loading folders by project ids";
              });
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
onUserChange(event){

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
changeScheme(className,addClassName,removeClassName){
 var cDivs=document.querySelectorAll(className);
 var clist=[];
  for(let i=0;i<cDivs.length;i++){
  clist=cDivs[i].classList;
  clist.remove(removeClassName);
  if(addClassName!=''){
    clist.add(addClassName);
    }
  }
 },
toggleScheme(scheme){
var temp=document.querySelectorAll('.tabs-component-tabs');
var temp1=document.querySelectorAll('.tabs-component-panels');
if(this.colorscheme!=scheme){
this.colorscheme=scheme;
if(scheme === "dark-scheme"){
  this.changeScheme('.belowCharts','belowChartsDark','belowChartsLight');
  this.changeScheme('.belowCharts','','belowChartsDefault');
  this.changeScheme('.belowCharts1','belowCharts1Dark','belowCharts1Light');
  this.changeScheme('.belowCharts1','','belowCharts1Default');
  this.changeScheme('.secondPage','secondPageDark','secondPageLight');
   this.changeScheme('.secondPage','','secondPageDefault');
  this.changeScheme('.thirdPage','thirdPageDark','thirdPageLight');
  this.changeScheme('.thirdPage','','thirdPageDefault');
   this.changeScheme('.r_chartDiv','darkBackground','lightBackground');
    this.changeScheme('.r_chartDiv','','defaultBackground');
   this.changeScheme('.b_chartDiv','darkBackground','lightBackground');
    this.changeScheme('.b_chartDiv','','defaultBackground');
   this.changeScheme('.testcaseLineChart','darkBackground','lightBackground');
   this.changeScheme('.testcaseLineChart','','defaultBackground');
    this.changeScheme('.defectChart','darkBackground','lightBackground');
   this.changeScheme('.defectChart','','defaultBackground');
   this.changeScheme('.cvtChart','darkBackground','lightBackground');
   this.changeScheme('.cvtChart','','defaultBackground');

  for(let i=0;i<temp.length;i++){
     if(temp[i].parentElement.id==="chartB1Tabs" || temp[i].parentElement.id==="chartB2Tabs"){
       temp[i].classList.add("darkBackground");
       temp[i].classList.remove("lightBackground");
       temp[i].classList.remove("defaultBackground");
     }
   }
   for(let i=0;i<temp1.length;i++){
     if(temp1[i].parentElement.id==="chartB1Tabs" || temp1[i].parentElement.id==="chartB2Tabs"){
       temp1[i].classList.add("darkBackground");
       temp1[i].classList.remove("lightBackground");
       temp1[i].classList.remove("defaultBackground");
     }
   }
 }
else if(scheme === "light-scheme"){
this.changeScheme('.belowCharts','belowChartsLight','belowChartsDark');
this.changeScheme('.belowCharts','','belowChartsDefault');
  this.changeScheme('.belowCharts1','belowCharts1Light','belowCharts1Dark');
  this.changeScheme('.belowCharts1','','belowCharts1Default');
  this.changeScheme('.secondPage','secondPageLight','secondPageDark');
   this.changeScheme('.secondPage','','secondPageDefault');
  this.changeScheme('.thirdPage','thirdPageLight','thirdPagedark');
  this.changeScheme('.thirdPage','','thirdPageDefault');
   this.changeScheme('.r_chartDiv','lightBackground','darkBackground');
    this.changeScheme('.r_chartDiv','','defaultBackground');
   this.changeScheme('.b_chartDiv','lightBackground','darkBackground');
    this.changeScheme('.b_chartDiv','','defaultBackground');
   this.changeScheme('.testcaseLineChart','lightBackground','darkBackground');
    this.changeScheme('.testcaseLineChart','','defaultBackground');
     this.changeScheme('.defectChart','lightBackground','darkBackground');
    this.changeScheme('.defectChart','','defaultBackground');
    this.changeScheme('.cvtChart','lightBackground','darkBackground');
    this.changeScheme('.cvtChart','','defaultBackground');


   for(let i=0;i<temp.length;i++){
     if(temp[i].parentElement.id==="chartB1Tabs" || temp[i].parentElement.id==="chartB2Tabs"){
       temp[i].classList.remove("darkBackground");
       temp[i].classList.add("lightBackground");
       temp[i].classList.remove("defaultBackground");
     }
   }
   for(let i=0;i<temp1.length;i++){
     if(temp1[i].parentElement.id==="chartB1Tabs" || temp1[i].parentElement.id==="chartB2Tabs"){
       temp1[i].classList.remove("darkBackground");
       temp1[i].classList.add("lightBackground");
       temp1[i].classList.remove("defaultBackground");
     }
   }
}
else{
  this.changeScheme('.belowCharts','belowChartsDefault','belowChartsLight');
  this.changeScheme('.belowCharts','','belowChartsDark');
  this.changeScheme('.belowCharts1','belowCharts1Default','belowCharts1Light');
  this.changeScheme('.belowCharts1','','belowCharts1Dark');
  this.changeScheme('.secondPage','secondPageDefault','secondPageDark');
  this.changeScheme('.secondPage','','secondPageLight');
  this.changeScheme('.thirdPage','thirdPageDefault','thirdPagedark');
  this.changeScheme('.thirdPage','','thirdPageLight');
   this.changeScheme('.r_chartDiv','defaultBackground','darkBackground');
    this.changeScheme('.r_chartDiv','','lightBackground');
   this.changeScheme('.b_chartDiv','defaultBackground','darkBackground');
   this.changeScheme('.b_chartDiv','','lightBackground');
   this.changeScheme('.testcaseLineChart','defaultBackground','darkBackground');
    this.changeScheme('.testcaseLineChart','','lightBackground');
     this.changeScheme('.defectChart','defaultBackground','darkBackground');
    this.changeScheme('.defectChart','','lightBackground');
    this.changeScheme('.cvtChart','defaultBackground','darkBackground');
    this.changeScheme('.cvtChart','','lightBackground');

    for(let i=0;i<temp.length;i++){
     if(temp[i].parentElement.id==="chartB1Tabs" || temp[i].parentElement.id==="chartB2Tabs"){
       temp[i].classList.add("defaultBackground");
       temp[i].classList.remove("lightBackground");
       temp[i].classList.remove("darkBackground");
     }
   }
    for(let i=0;i<temp1.length;i++){
     if(temp1[i].parentElement.id==="chartB1Tabs" || temp1[i].parentElement.id==="chartB2Tabs"){
       temp1[i].classList.add("defaultBackground");
       temp1[i].classList.remove("lightBackground");
       temp1[i].classList.remove("darkBackground");
     }
   }
}
}
},
   autoResize() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    },
showChartPopup(options){
 this.showZoomChart=true;
 this.zoomChartOptions=options;
},
closeZoomChart(){
this.showZoomChart=false;
 this.zoomChartOptions={};
},
onAhaFileChange(e) {
   const file = e.target.files[0];
   this.ahaListFile = file;
   let fileName = file.name.split(".")[0];
   this.ahaImageUploaded = true;
},
handleAhaFileUpload(e){
  var form_data = new FormData();
    if (this.onAhaFileChange) {
      form_data.append("file", this.ahaListFile);
    }
     this.loading = true;
     this.loadingMessage = "Uploading AHA List..";
     let self=this;
     testcaseService.uploadAHAList(form_data, this.selectedRelId).then(
            (data) => {
              self.loadAhaList(self.selectedRelId);
            },(error)=>{
              this.loading = false;
              this.loadingMessage = "";
              this.showErrorModal = true;
              this.modalErrorMessage =
                "Error while uploading AHA file, Please try again later";
            });
},
removeEvent:function(){
  let relId=this.releaseDetails.id;
  let eventIds=this.selectedEventIds;
  let self=this;
  testcaseService.deleteEvent(eventIds).then(
        (data) => {
          self.loading = false;
          self.loadingMessage = "";
          let ind=-1;
          for(let k=0;k<eventIds.length;k++){
           ind=this.selectedEventIds.indexOf(eventIds[k]);
           self.selectedEvents.splice(ind,1);
           self.selectedEventIds.splice(ind,1);
          }
          self.loadGanttChart(relId);
        },
        (error) => {
          self.loading = false;
          self.loadingMessage = "";
          self.showErrorModal = true;
          self.modalErrorMessage =
            "Error while deleting Event, Please try again later";
        }
      );
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
        l_gisoDate  = new Date();
         l_eotrDate  = new Date();
      r_startDate=r_startDate.setDate(date.getDate()+1);
      r_endDate=r_endDate.setDate(new Date(r_startDate).getDate()+15);
      l_startDate=l_startDate.setDate(new Date(r_endDate).getDate()+1);
      l_endDate=l_endDate.setDate(new Date(l_startDate).getDate()+7);
      this.releaseObj = {  retest_start_date: r_startDate,
      retest_end_date:r_endDate,longevity_start_date:l_startDate,longevity_end_date:l_endDate,
      giso_date:l_gisoDate, eotr_date:l_eotrDate};
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
       this.plannedDetailsAdded=true;
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
    showSummaryDetails(type,obj){
      let temp={};
      for(let k=0;k<Object.keys(obj).length;k++){
         temp[Object.keys(obj)[k]]=obj[Object.keys(obj)[k]].count;
      }
      this.summaryInfoTitle=type;
      this.summaryDetailsObj=temp;
      this.showSummaryInfoModal = true;
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
    getFilteredDate(date1){
      return date1.substring(0,10)
    },
    showSchemeMenu:function(e){
       this.$refs.schememenu.open(e);
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
  <div class="customerReleaseDiv" id="customerReleaseDiv">
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
           <button class="btn btn--primary cm_addBtn" @click="showSchemeMenu($event)">
            <span
              v-tooltip.right="{
                html: 'schemeContent',
                class: 'cisco-tooltip schememenu',
              }"
            >
              <i class="icon icon-picture-in-picture"> </i>
            </span>
            <div id="schemeContent">
              <ul style="list-style-type: none;">
              <li class="schemeli"><a @click="toggleScheme('dark-scheme')">Dark Scheme</a></li>
              <li class="schemeli"><a @click="toggleScheme('light-scheme')">Light Scheme</a></li>
              <li class="schemeli"><a @click="toggleScheme('default-scheme')">Default Scheme</a></li></ul>
            </div>
          </button>
          <button class="btn btn--primary cm_addBtn" @click="showCustGraphs=!showCustGraphs">
            <span
              v-tooltip.right="{
                html: 'graphContent',
                class: 'cisco-tooltip',
              }"
            >
              <i class="icon icon-graph"> </i>
            </span>
            <div id="graphContent">
              Graph
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
      <div class="row custSummaryDiv" v-show="summary_customers.length>1">
     <!-- <template v-for="(summary_obj,index) in summary_customers" > -->
      <splide :options="custSplideOptions" :slides="summary_customers" class="mySlides">
       <splide-slide
              class="customerSlides"
              v-for="(summary_obj,index) in summary_customers"
              :key="index"
            >

     <!-- <div class="summaryBox" :key="index">
       <div :class="'custBox cust_box'+index%7"  style="pointer:cursor;" @click="releaseBoxClicked(summary_obj.name)">
       <div class="row custSummeryTitleDiv">
          <div :class="'cust_title'+index%7+' custTitle'" style="width:100%">
           {{summary_obj.name}}
          </div>
          
          <div  :class="summary_obj.onTrackDelay +' onTrackOrDelay'"   style="width:50%;">
          Execution
          </div>
          <div  :class="summary_obj.qualityClass +' custQuality'"  style="width:50%;">
          Quality
          </div>
       </div>
       <div class="row custSummaryChartDiv">
       <div class="summaryButtonCharts">
         <MiniChart  class="chartSummary"  v-on:child="onChildInteraction" :id="'chartSummary_'+index" :option="summary_obj.executionOptions"></MiniChart>
       </div>
       <div class="summaryButtonCharts">
       <MiniChart  class="chartSummary"  v-on:child="onChildInteraction" :id="'chartSummary1_'+index" :option="summary_obj.qualityOptions"></MiniChart>
       </div>
       </div>
       </div>
      </div>-->
      <div class="summaryBox" :key="index">
         <div :class="'custBox cust_box'+index%7"  style="pointer:cursor;" @click="custBoxClicked(summary_obj.type,summary_obj.name)">
             <div class="row custSummeryTitleDiv">
                <div class="custTitle" style="width:100%">
           {{summary_obj.name}}
          </div>
             </div>
             <div class="summaryDetails">
             <div class="summaryData">
             <div class="summaryData1">
              <MiniChart  class="chartSummary"  v-on:child="onChildInteraction" :id="'chartGuage1_'+index" :option="JSON.stringify(summary_obj.execution1Options)"></MiniChart>
            <!-- <div class="circleBorder">
                {{summary_obj.executedPerc}}
             </div>-->
             <div class="circleBoxdata">
             Execution
             </div>
             </div>
              <div class="summaryData2">
            <!-- <div class="circleBorder">
                {{summary_obj.quality}}
             </div>-->
             <MiniChart  class="chartSummary"  v-on:child="onChildInteraction" :id="'chartGuage2_'+index" :option="JSON.stringify(summary_obj.qualityOptions)"></MiniChart>
             <div class="circleBoxdata">
             Quality
             </div>
             </div>
             </div>
             <div class="summaryChart">
              <div class="summaryButtonCharts">
               <MiniChart  class="chartSummary"  v-on:child="onChildInteraction" :id="'chartSummary_'+index" :option="JSON.stringify(summary_obj.executionOptions)"></MiniChart>
           </div>
             </div>
             </div>
         </div>
      </div>
       </splide-slide>
      </splide>
           </div>
      </div>
      <div class="row modalLinks" v-show="proj_cust_Selected">
      <div class="mLinks">
      <a href="#" class="mlink" @click="execSummaryLinkClicked">Exec Summary</a>
      <a href="#" class="mlink" @click="relLinkClicked">Release note</a>
      <a href="#" class="mlink" @click="automationLinkClicked">Automation</a>
      <a href="#" class="mlink" @click="eftLinkClicked">EFT</a>
      <a href="#" class="mlink" @click="upgradeMtxLinkClicked">Upgrade matrix </a>
      <a href="#" class="mlink" @click="triMtxLinkClicked">Trigger matrix</a>
      <a href="#" class="mlink" @click="defectsLinkClicked">Defects</a>
      <a href="#" class="mlink" @click="cfdLickClicked">CFDs</a>

      </div>

      </div>

      <div>
        <div class="row releaseSummaryDiv" v-show="showCustGraphs">
        <div class="col-lg-12 col-md-12">
        <!--<div class="slidesBtn">
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
              <button class="r_summaryDiv c_mhCount">
               <div class="totalCount">{{mhDefectsCount}}</div>
                <div class="">MH Defects</div>
              </button>
              
            </div>-->
            <div class="belowCharts row belowChartsLight">
            <div class="row" style="width:100%">
            <div class="contentGraph">
            <div v-show="!showProjectPlanForm">
             <GanttChart   v-on:child="onChildInteraction" id="timeLineChart" v-show="!ganttOptionFlag" :colorscheme="colorscheme" :option="ganttOptions1" toggleTableOption="showProjectPlanForm" toggleOption="ganttOptionFlag"></GanttChart>
       <GanttChart   v-on:child="onChildInteraction" id="timeLineChart1" v-show="ganttOptionFlag" :colorscheme="colorscheme" :option="ganttOptions" toggleTableOption="showProjectPlanForm"  toggleOption="ganttOptionFlag"></GanttChart>
       </div>
        <div v-show="showProjectPlanForm">
         <button
            class="btn btn--primary tableGrphBtn"
            @click="showProjectPlanForm=!showProjectPlanForm"
              >
            <span>
              <i class="icon icon-graph"> </i>
            </span>
          </button>
          <button
            class="btn btn--primary tableGrphBtn"
              @click="updateReleaseDetails()"
            >
           <span 
              class="icon-save icon-small clickable tableIcons"
            ></span>
          </button>
          
        <form class="projectPlanForm">
         <div class="dateHeadings">Planned</div>
         <div class="form-group tm-form-group1 row releaseDatesContainer">
           <div class="projectField">
           <div class="form-group__text tm-form__text projectDateField" style="position:relative;">
            <label class="cm-label">
              Start
            </label>
             <date-picker
              v-model="releaseDetails1.start_date"
               @change="addDateRack"
                 :format="format" value-type="format"
              :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
           </div>
           <div class="projectField">
           <div class="form-group__text tm-form__text projectDateField"  style="position:relative;">
            <label class="cm-label">
              TCFA
            </label>
             <date-picker
              v-model="releaseDetails1.tcfa_date"
               @change="addDateRack"
                 :format="format" value-type="format"
              :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
           </div>
           <div class="projectField">
           <div class="form-group__text tm-form__text projectDateField" style="position:relative;">
            <label class="cm-label">
              Retest Start
            </label>
             <date-picker
              v-model="releaseDetails1.retest_start_date"
               @change="addDateRack"
                 :format="format" value-type="format"
              :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
           </div>
            <div class="projectField">
           <div class="form-group__text tm-form__text projectDateField" style="position:relative;">
            <label class="cm-label">
              Retest End
            </label>
             <date-picker
              v-model="releaseDetails1.retest_end_date"
               @change="addDateRack"
                 :format="format" value-type="format"
              :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
           </div>
             <div class="projectField">
           <div class="form-group__text tm-form__text projectDateField" style="position:relative;">
            <label class="cm-label">
              Logevity Start
            </label>
             <date-picker
              v-model="releaseDetails1.longevity_start_date"
               @change="addDateRack"
                 :format="format" value-type="format"
              :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
           </div>
           <div class="projectField">
           <div class="form-group__text tm-form__text projectDateField" style="position:relative;">
            <label class="cm-label">
              Logevity End
            </label>
             <date-picker
              v-model="releaseDetails1.longevity_end_date"
               @change="addDateRack"
                 :format="format" value-type="format"
              :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
           </div>
            <div class="projectField">
           <div class="form-group__text tm-form__text projectDateField" style="position:relative;">
            <label class="cm-label">
              FCS
            </label>
             <date-picker
              v-model="releaseDetails1.fcs_date"
               @change="addDateRack"
                 :format="format" value-type="format"
              :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
           </div>
           <div class="projectField">
           <div class="form-group__text tm-form__text projectDateField" style="position:relative;">
            <label class="cm-label">
              GISO
            </label>
             <date-picker
              v-model="releaseDetails1.giso_date"
               @change="addDateRack"
                 :format="format" value-type="format"
              :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
           </div>
           <div class="projectField">
           <div class="form-group__text tm-form__text projectDateField" style="position:relative;">
            <label class="cm-label">
              EoTR
            </label>
             <date-picker
              v-model="releaseDetails1.eotr_date"
               @change="addDateRack"
                 :format="format" value-type="format"
              :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
           </div>
           </div>
           

            <div class="dateHeadings">Actual</div>
           <div class="form-group tm-form-group1 row releaseDatesContainer">
           
           <div class="projectField">
           <div class="form-group__text tm-form__text projectDateField" style="position:relative;">
            <label class="cm-label">
               Start
            </label>
             <date-picker
              v-model="releaseDetails1.actual_start_date"
               @change="addDateRack"
                 :format="format" value-type="format"
              :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
           </div>
           <div class="projectField">
           <div class="form-group__text tm-form__text projectDateField"  style="position:relative;">
            <label class="cm-label">
              TCFA
            </label>
             <date-picker
              v-model="releaseDetails1.actual_tcfa_date"
               @change="addDateRack"
                 :format="format" value-type="format"
              :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
           </div>
           <div class="projectField">
           <div class="form-group__text tm-form__text projectDateField" style="position:relative;">
            <label class="cm-label">
               Retest Start
            </label>
             <date-picker
              v-model="releaseDetails1.actual_retest_start_date"
               @change="addDateRack"
                 :format="format" value-type="format"
              :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
           </div>
            <div class="projectField">
           <div class="form-group__text tm-form__text projectDateField" style="position:relative;">
            <label class="cm-label">
              Retest End
            </label>
             <date-picker
              v-model="releaseDetails1.actual_retest_end_date"
               @change="addDateRack"
                 :format="format" value-type="format"
              :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
           </div>
             <div class="projectField">
           <div class="form-group__text tm-form__text projectDateField" style="position:relative;">
            <label class="cm-label">
             Logevity Start
            </label>
             <date-picker
              v-model="releaseDetails1.actual_longevity_start_date"
               @change="addDateRack"
                 :format="format" value-type="format"
              :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
           </div>
           <div class="projectField">
           <div class="form-group__text tm-form__text projectDateField" style="position:relative;">
            <label class="cm-label">
              Logevity End
            </label>
             <date-picker
              v-model="releaseDetails1.actual_longevity_end_date"
               @change="addDateRack"
                 :format="format" value-type="format"
              :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
           </div>
            <div class="projectField">
           <div class="form-group__text tm-form__text projectDateField" style="position:relative;">
            <label class="cm-label">
              FCS
            </label>
             <date-picker
              v-model="releaseDetails1.actual_fcs_date"
               @change="addDateRack"
                 :format="format" value-type="format"
              :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
           </div>
            <div class="projectField">
           <div class="form-group__text tm-form__text projectDateField" style="position:relative;">
            <label class="cm-label">
              GISO
            </label>
             <date-picker
              v-model="releaseDetails1.actual_giso_date"
               @change="addDateRack"
                 :format="format" value-type="format"
              :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
           </div>
            <div class="projectField">
           <div class="form-group__text tm-form__text projectDateField" style="position:relative;">
            <label class="cm-label">
              EoTR
            </label>
             <date-picker
              v-model="releaseDetails1.actual_eotr_date"
               @change="addDateRack"
                 :format="format" value-type="format"
              :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
           </div>
           </div>

          <div class="form-group tm-form-group1 row" style="width:95%">
          <div class="projectDateField applyChangesField" style="position:relative;">
           <label class="cm-label" style="width:100%">
              Apply changes to
            </label>
           <!-- <div class="radioTypesWrapper">
          <div class="radioTypes" style="padding-left:20px;">
            <input @change="applyChangeFunc" type="radio" name="applyChangesTo" value="customer" v-model="applyChangesTo"><label for="customer" style="padding:10px">Customer</label>
            </div>
             <div class="radioTypes" style="padding-left:20px;">
             <input @change="applyChangeFunc" type="radio" name="applyChangesTo" value="release"  v-model="applyChangesTo"><label for="release" style="padding:10px">Release</label>
             </div>
              <div class="radioTypes" style="padding-left:20px;">
             <input @change="applyChangeFunc" type="radio" name="applyChangesTo" value="project"  v-model="applyChangesTo"><label for="project" style="padding:10px">Project</label>
             </div>
             </div>-->
          </div>
          <div class="radioTypesWrapper" >
          <template v-for="(rel,ih) in custTotalReleases">
          <div class="chkRel" :key="ih">
             <input
                type="checkbox"
                v-model="custSelectedReleases"
                :value="rel.id"
                class="form-check-input tchk"
              />
              <label class="form-check-label">{{rel.name}}</label>
              </div>
          </template>
          </div>
          </div>

        </form>
         </div>
       <div class="row">
       <div class="col-lg-6">
       <div class="currentPhaseBox">
       <div class="nextMilestone" v-show="currentPhase!=''">Current Phase: <div class="currentPhaseStatus"></div> {{currentPhase}}</div>
       </div>
       </div>
       <div class="col-lg-6">
       <div class="timeLeftDetailsBox">
       <div class="nextMilestone timeDetailsBox" v-if="nextmilestone!=''">{{nextmilestoneStatus}}</div>
       <div class="timeLeftForFCS timeDetailsBox" v-if="fcsStatus!=''">{{fcsStatus}}</div>
       </div>
      </div>
      </div>
       <div id="buttonGroup" class="button-row" v-if="ganttOptionFlag">
        <button class="btn btn--primary addEventBtn" id="btnShowDialog" @click="showEventModal">
            <i class="icon icon-plus"></i>
            Add Event
        </button>
        <button class="btn btn--primary addEventBtn" id="btnRemoveSelected" :disabled="removeEventdisabled" @click="removeEvent">
            <i class="icon icon-delete"></i>
            Remove selected
        </button>
        </div>
      </div>
            </div>
            </div>
        </div>
        </div>
        <div class="row releaseSummaryDiv" v-show="showCustGraphs">
        <div class="col-lg-12 col-md-12">
              <div class="belowCharts row belowChartsLight">
            <div class="width25Per">
                <div class="r_chartDiv aa defaultBackground">
           <div class="summaryCharts">
              <chart   :colorscheme="colorscheme"  v-on:child="onChildInteraction" id="chart_a1" class="chartsA"  v-show="!showExecutionPie" :option="executionSummaryOption" toggleOption="showExecutionPie"></Chart>
              <chart   :colorscheme="colorscheme"  v-on:child="onChildInteraction" id="chart_a2" class="chartsA" v-show="showExecutionPie" :option="executionSummaryOption1" toggleOption="showExecutionPie"></Chart>
          </div>
          <div class="summary_Data">
            
              <div class="projectedSummaryData">

              <div class="summary_li">
              <div class="coloredCircleBorder coloredBorder1">
              {{summaryButtonsDetails.totalTestcases}}
              </div>
              <div class="coloredCircleBoxdata">
              Total
              </div>
              </div>
              <div class="summary_li">
              <div class="coloredCircleBorder coloredBorder2">
              {{summaryButtonsDetails.testcasesExecuted.percentage}}%
              </div>
               <div class="coloredCircleBoxdata">
               Executed
              </div>
              </div>
              <div class="summary_li">
              <div class="coloredCircleBorder coloredBorder3">
              {{summaryButtonsDetails.resultQuality.resultQuality}}%
              </div>
               <div class="coloredCircleBoxdata">
                Quality
              </div>
              </div>


              </div>
              </div>
            </div>
            </div>
             <div class="testcaseLineChart defaultBackground width43Per">
       <chart   :colorscheme="colorscheme" v-show="!showSplineDataTable" v-on:child="onChildInteraction" id="splineChart" :option="splineOptions" toggleTableOption="showSplineDataTable"></Chart>
       <div v-show="showSplineDataTable" class="weeklyExecutionTable">
            <button
            class="btn btn--primary tableGrphBtn"
            @click="showSplineDataTable=!showSplineDataTable"
              >
            <span>
              <i class="icon icon-graph"> </i>
            </span>
          </button>
          <button
            class="btn btn--primary tableGrphBtn"
            v-if="editingRow"
              @click="updateSplinetableRow()"
              >
           <span 
              class="icon-save icon-small clickable tableIcons"
            ></span>
          </button>
           <button
            class="btn btn--primary tableGrphBtn"
           v-if="editingRow"
            @click="cancleUpdateSplinetableRow()"
              >
             <span 
              class="icon-close icon-small clickable tableIcons"
            ></span>
          </button>
          <button
            class="btn btn--primary tableGrphBtn"
            v-if="!editingRow"
              @click="editSplinetableRow"
              >
            <span
              class="icon-edit icon-small clickable tableIcons"
            ></span>
          </button>
          <div  class="weeklyExecTable1">
          <table class="weeklyExecTable table--highlight secondaryTable">
            <tr>
            <th>
            Week
            </th>
            <th>
            Planned
            </th>
            <th>
            Actual
            </th>
             <th>
            Passed
            </th>
             <th>
            Failed
            </th>
            </tr>
            <template v-for="(w_obj,index) in weeklyReport">
            <tr v-if="!editingRow"  :key="index">
             <td class="weeklyExecTd">
             {{w_obj.start_date.substring(0,10)}}
             </td>
             <td  class="weeklyExecTd">
              {{w_obj.planned}}
             </td>
             <td  class="weeklyExecTd">
              {{w_obj.executed}}
             </td>
             <td  class="weeklyExecTd">
              {{w_obj.passed}}
             </td>
             <td  class="weeklyExecTd">
              {{w_obj.failed}}
             </td>
             </tr>
             <tr v-if="editingRow"  :key="index+'a'">
              <td>
              <input type="text" class="weeklyTableText" v-model="w_obj.start_date" readonly="true">
             </td>
             <td>
             <input type="text" class="weeklyTableText" v-model="w_obj.planned" >
             </td>
             <td>
              <input type="text" class="weeklyTableText" v-model="w_obj.executed" >
             </td>
             <td>
              <input type="text" class="weeklyTableText" v-model="w_obj.passed" >
             </td>
             <td>
             <input type="text" class="weeklyTableText" v-model="w_obj.failed" >
             </td>
              </tr>
            </template>
          </table>
          </div>
       </div>
      </div>
      <div class="cvtWrapper defaultBackground width30Per">

             <div class="cvtChart" v-show="!showCVTDataTable">
      <chart :colorscheme="colorscheme" v-on:child="onChildInteraction" id="cvtChart" :option="cvtOptions" toggleTableOption="showCVTDataTable"></Chart>
      </div>
     <div class="cvtData" v-show="!showCVTDataTable">
      <div class="projectedSummaryData">
      <div class="summary_li">
              <div class="coloredCircleBorder coloredBorder1">
              {{summaryButtonsDetails.totalDefects}}
              </div>
              <div class="coloredCircleBoxdata">
              Defects
              </div>
              </div>
               <div class="summary_li">
              <div class="coloredCircleBorder coloredBorder2">
              {{mhDefectsCount}}
              </div>
              <div class="coloredCircleBoxdata">
              MH Defects
              </div>
              </div>
              </div>
     </div>
      <div v-show="showCVTDataTable" class="weeklyExecutionTable">
            <button
            class="btn btn--primary tableGrphBtn"
            @click="showCVTDataTable=!showCVTDataTable"
              >
            <span>
              <i class="icon icon-graph"> </i>
            </span>
          </button>
          <button
            class="btn btn--primary tableGrphBtn"
            v-if="editing1Row"
              @click="updateSplinetableRow()"
              >
           <span 
              class="icon-save icon-small clickable tableIcons"
            ></span>
          </button>
           <button
            class="btn btn--primary tableGrphBtn"
           v-if="editing1Row"
            @click="cancleUpdateCVTtableRow()"
              >
             <span 
              class="icon-close icon-small clickable tableIcons"
            ></span>
          </button>
          <button
            class="btn btn--primary tableGrphBtn"
            v-if="!editing1Row"
              @click="editCVTtableRow"
              >
            <span
              class="icon-edit icon-small clickable tableIcons"
            ></span>
          </button>
          <div  class="weeklyExecTable1">
          <table class="weeklyExecTable table--highlight secondaryTable">
            <tr>
            <th>
            Week
            </th>
            <th>
            Total
            </th>
            <th>
            Planned
            </th>
            <th>
            Found
            </th>
             <th>
            Observed
            </th>
             <th>
            MH Defect
            </th>
            </tr>
            <template v-for="(w_obj,index) in weeklyReport">
            <tr v-if="!editing1Row"  :key="index">
             <td class="weeklyExecTd">
             {{w_obj.start_date.substring(0,10)}}
             </td>
             <td  class="weeklyExecTd">
              {{w_obj.cvtTotal}}
             </td>
             <td  class="weeklyExecTd">
              {{w_obj.planned_ddts_count}}
             </td>
             <td  class="weeklyExecTd">
              {{w_obj.defects_found_CVT}}
             </td>
             <td  class="weeklyExecTd">
              {{w_obj.defects_observed}}
             </td>
             <td  class="weeklyExecTd">
              {{w_obj.must_have_defects}}
             </td>
             </tr>
             <tr v-if="editing1Row"  :key="index+'a'">
              <td>
              <input type="text" class="weeklyTableText" :value="getFilteredDate(w_obj.start_date)" readonly="true">
             </td>
             <td>
             <input type="text" class="weeklyTableText" v-model="w_obj.cvtTotal" readonly="true" >
             </td>
             <td>
             <input type="text" class="weeklyTableText" v-model="w_obj.planned_ddts_count">
             </td>
             <td>
              <input type="text" class="weeklyTableText" v-model="w_obj.defects_found_CVT" >
             </td>
             <td>
              <input type="text" class="weeklyTableText" v-model="w_obj.defects_observed" >
             </td>
             <td>
             <input type="text" class="weeklyTableText" v-model="w_obj.must_have_defects">
             </td>
             </tr>
            </template>
          </table>
          </div>
       </div>
     </div>

      
            </div>
            </div>
        </div>
     <div class="secondPage secondPageLight" v-show="showCustGraphs">
            <div class="belowCharts1 row belowCharts1Default">
             <div class="width40Per">
               <div class="b_chartDiv  defaultBackground ">
            <tabs
          id="chartB1Tabs"
          name="chartB1Tabs"
          :options="{ useUrlFragment: false, defaultTabHash: 'qualityRoleChart' }"
          @clicked="chartB1TabClicked"
          @changed="chartB1TabChanged">
           <tab
            name="Role"
            id="qualityRoleChart"
            class="qualityRoleChart"
            ref="Role"
          >
          <chart :colorscheme="colorscheme" v-on:child="onChildInteraction" id="chart_b1" class="chartsB" :option="qualityOption"></Chart>
          
          </tab>
           <tab
            name="Platform"
            id="qualityPlatformChart"
            class="qualityPlatformChart"
            ref="Platform"
          >
          <chart   :colorscheme="colorscheme" v-on:child="onChildInteraction" id="chart_b2" class="chartsB" :option="qualityPlatformOption"></Chart>
         
          </tab>
           <tab
            name="Source"
            id="qualitySrcChart"
            class="qualitySrcChart"
            ref="Source"
          >
          <chart   :colorscheme="colorscheme" v-on:child="onChildInteraction" id="chart_b3" class="chartsB" :option="qualitySrcOption"></Chart>
         
          </tab>
           <tab
            name="Feature"
            id="qualityFeatureChart"
            class="qualityFeatureChart"
            ref="Feature"
          >
          <chart   :colorscheme="colorscheme" v-on:child="onChildInteraction" id="chart_b4" class="chartsB" :option="qualityFeatureOption"></Chart>
         
          </tab>
         </tabs>
            </div>
             </div>
             <div class="width30Per">
              <div class="b_chartDiv  defaultBackground aa">
              <chart   :colorscheme="colorscheme" v-on:child="onChildInteraction" id="chart_c1" class="chartsA" :option="defectOption"></Chart>
          
            </div>
             </div> 
              <div class="width30Per">
               <div class="b_chartDiv  defaultBackground aa">
              <chart   :colorscheme="colorscheme" v-on:child="onChildInteraction" id="chart_c2" class="chartsA" :option="mhHaveOption"></Chart>
           
            </div>
             </div> 

            </div>
     
        
      
      <div class="row belowCharts1 belowCharts1Default" >
      <div class="width40Per">
               <div class="b_chartDiv  defaultBackground aa">
                <tabs
          id="chartB2Tabs"
          name="chartB2Tabs"
          :options="{ useUrlFragment: false, defaultTabHash:'testcaseFeatureChart' }"
          @clicked="chartB1TabClicked"
          @changed="chartB1TabChanged">
           <tab
            name="Role"
            id="testcaseRoleChart"
            class="qualityRoleChart"
            ref="Role"
          >
          <chart   :colorscheme="colorscheme" v-on:child="onChildInteraction" id="chart_b5" class="chartsB" :option="roleOption"></Chart>
        
          </tab>
           <tab
            name="Platform"
            id="testcasePlatformChart"
            class="qualityPlatformChart"
            ref="Platform"
          >
          <chart   :colorscheme="colorscheme" v-on:child="onChildInteraction" id="chart_b6" class="chartsB" :option="platformOption"></Chart>
         
          </tab>
           <tab
            name="Source"
            id="testcaseSrcChart"
            class="qualityPlatformChart"
            ref="Source"
          >
          <chart   :colorscheme="colorscheme" v-on:child="onChildInteraction" id="chart_b7" class="chartsB" :option="srcOption"></Chart>
         
          </tab>
           <tab
            name="Feature"
            id="testcaseFeatureChart"
            class="qualityRoleChart"
            ref="Feature"
          >
          <chart   :colorscheme="colorscheme" v-on:child="onChildInteraction" id="chart_b8" class="chartsB" :option="featureOption"></Chart>
        
          </tab>
         </tabs>
               </div>
      </div>
      <div class="width30Per">
              <div class="b_chartDiv  defaultBackground aa">
                <chart   :colorscheme="colorscheme" v-on:child="onChildInteraction" id="chart8" :option="componentOption"></Chart>
           
             </div>
      </div>
      <div class="width30Per">
              <div class="b_chartDiv  defaultBackground aa">
               <chart   :colorscheme="colorscheme" v-on:child="onChildInteraction" id="chart9" :option="statusOption"></Chart>
             
              </div>
      </div>
               
      </div>
      <div class="row belowCharts1 belowCharts1Default">
      <div class="width30Per">
      <div class="defectChart defaultBackground">
      <!-- <button
            class="btn btn--primary grphBtn"
             style="margin-left:20px;"
            @click="showPie=!showPie"
              >
            <span>
              <i class="icon icon-graph"> </i>
            </span>
          </button> -->
              <chart :colorscheme="colorscheme" v-show="showPie"  v-on:child="onChildInteraction" id="chart_a31" class="chartsA" :option="userOption" toggleOption="showPie"></Chart>
              <chart :colorscheme="colorscheme" v-show="!showPie"  v-on:child="onChildInteraction" id="chart_a32" class="chartsA" :option="testcaseDefectsByUsersOption" toggleOption="showPie" ></Chart>  
              </div>
          </div>
           <div class="width30Per">
       <div class="defectChart defaultBackground">
        <chart   :colorscheme="colorscheme" v-on:child="onChildInteraction" id="chart7" :option="submitterOption"></Chart>
       </div>
      </div>
       <div class="width40Per">
       <div class="defectChart defaultBackground">
       <chart   :colorscheme="colorscheme" v-on:child="onChildInteraction" id="heatChart" :option="heatMapOptions"></Chart>
      </div>
       </div>
      </div>
       </div>
          </div>
      <div class="thirdPage thirdPageLight" v-show="showCustGraphs">
      <div class="defectTableTitle">
        Weekly Update <span
          v-if="!showReleaseSummary"
          class="icon-chevron-right interaction"
          style="margin-top:-3p;margin-left: 10px;"
          v-on:click="showReleaseSummary=!showReleaseSummary"
         ></span>
         <span
          v-if="showReleaseSummary"
          class="icon-chevron-down interaction"
           style="margin-top:-3p;margin-left: 10px;"
          v-on:click="showReleaseSummary=!showReleaseSummary"
         ></span>
      </div>
     
       <div class="row defectTablecontainer showRelContainer" v-if="showReleaseSummary" style="margin-top:-20px;">
        <div class="defectSummaryTitle">Execution Summary</div>
        <div class="saveButtonContainer">
         <button
            class="btn btn--primary tableGrphBtn"
              @click="updateSplinetableRow()"
              >
           <span 
              class="icon-save icon-small clickable tableIcons"
            ></span>
          </button>
        </div>
          <div class="row relWeeks">
      <template v-for="(wObj,index1) in weeklyReport">
      <a href="#" class="relWeekLink" @click="weekIndex=index1" :key="index1+'a'">{{wObj.start_date.substring(0,10)}}</a>
     </template>
    </div>
      <vue-editor id="rel_summary"  class="proceduretextarea rel_summary" v-model="weeklyReport[weekIndex].summary"  @enter="autoResize"
              @change="autoResize"
              @load="autoResize"></vue-editor>
        <!-- <textarea
              v-model="rel_summary"
              style="display: block;"
              class="proceduretextarea rel_summary"
              @enter="autoResize"
              @change="autoResize"
              @load="autoResize"
              height="200px"
            ></textarea>-->
      </div>

      
       <div class="row defectTablecontainer showRelContainer" v-if="showReleaseSummary" style="margin-top:-20px;">
       <div class="defectSummaryTitle">Open Issues</div>
        <div class="saveButtonContainer">
          <button
            class="btn btn--primary tableGrphBtn"
              @click="updateSplinetableRow()"
              >
           <span 
              class="icon-save icon-small clickable tableIcons"
            ></span>
          </button>
          </div>
           <div class="row relWeeks">
      <template v-for="(wObj,index1) in weeklyReport">
      <a href="#" class="relWeekLink" @click="weekIndex1=index1" :key="index1+'a'">{{wObj.start_date.substring(0,10)}}</a>
     </template>
    </div>
          <vue-editor id="rel_defect_summary"  class="proceduretextarea rel_summary" v-model="weeklyReport[weekIndex1].issues"  @enter="autoResize"
              @change="autoResize"
              @load="autoResize"></vue-editor>
       </div>
      </div>

       <div class="thirdPage thirdPageLight" v-show="showCustGraphs">
      <div class="defectTableTitle">
        Features <span
          v-if="!showAHASummary"
          class="icon-chevron-right interaction"
          style="margin-top:-3p;margin-left: 10px;"
          v-on:click="showAHASummary=!showAHASummary"
         ></span>
         <span
          v-if="showAHASummary"
          class="icon-chevron-down interaction"
           style="margin-top:-3p;margin-left: 10px;"
          v-on:click="showAHASummary=!showAHASummary"
         ></span>
      </div>
       <div class="row defectTablecontainer showRelContainer" v-if="showAHASummary" style="margin-top:-20px;">
       <div class="ahaListFileUpload" v-show="!showAhaTable">
            <input
                type="file"
                class="aha_file"
                @change="onAhaFileChange"
              />
              <button
            @click="handleAhaFileUpload($event)"
            class="tmBtn btn btn--secondary aha_file_btn"
            style="font-size:1.4rem;"
            v-if="ahaImageUploaded"
          >
            Upload
          </button>

       </div>
       <div class="" v-show="showAhaTable">
        <div class="ahaheaderWrapper" style="diaply:flex"> 
        <div  v-if="editingAha" class="form-group tm-form-group1 row" style="width:75%">
    <div class="projectDateField applyChangesField" style="position:relative;">
        <label class="cm-label" style="width:100%">
              Apply changes to
         </label>
	</div>
	<div class="radioTypesWrapper" >
         <template v-for="(rel,ih) in custTotalReleases">
            <div class="chkRel" :key="ih">
             <input
                type="checkbox"
                v-model="custSelectedReleasesForAHA"
                :value="rel.id"
                class="form-check-input tchk"
              />
              <label class="form-check-label">{{rel.name}}</label>
            </div>
         </template>
     </div>
</div>

        <div class="ahaButtonContainer">
        <button
            class="btn btn--primary tableGrphBtn"
            v-if="editingAha"
              @click="updateAhaTableRow()"
              >
           <span 
              class="icon-save icon-small clickable tableIcons"
            ></span>
          </button>
           <button
            class="btn btn--primary tableGrphBtn"
           v-if="editingAha"
            @click="cancleUpdateAhaTableRow()"
              >
             <span 
              class="icon-close icon-small clickable tableIcons"
            ></span>
          </button>
          <button
            class="btn btn--primary tableGrphBtn"
            v-if="!editingAha"
              @click="editAhatableRow"
              >
            <span
              class="icon-edit icon-small clickable tableIcons"
            ></span>
          </button>
          </div>
          </div>
        <div class="ahaTable">
        <table id="ahaTable" class="table table--highlight secondaryTable">
            <tr>
            <th class="stickyTh ahaTableTh">Feature</th>
            <th class="stickyTh ahaTableTh">Aha ID</th>
            <th class="stickyTh ahaTableTh">Name</th>
            <th class="stickyTh ahaTableTh">POC-Dev Manager</th>
            <th class="stickyTh ahaTableTh">POC-Test Manager</th>
            <th class="stickyTh ahaTableTh">PIPD</th>
             <th class="stickyTh ahaTableTh">SWFS</th>
              <th class="stickyTh ahaTableTh">Platforms Planned</th>
              <th class="stickyTh ahaTableTh">Enablement Date</th>
              <th class="stickyTh ahaTableTh">Comments</th>
               <th class="stickyTh ahaTableTh">Enablement Owner</th>
               <th class="stickyTh ahaTableTh">Enablement Status</th>
            </tr>
            <template class="cdetsTr" v-for="(aObj,index) in ahaList">
            <tr v-if="!editingAha"  :key="index" style="cursor: pointer;" @contextmenu="openAhaMenu(aObj.id)"  @click="ahaRowSelect(aObj, $event)">
            <td class="ahaTableTd"><span :class="aObj.noRelatedTcsFlag">{{aObj.featureId}}</span></td>
              <td class="ahaTableTd">{{aObj.ahaId}}</td>
              <td class="ahaTableTd">{{aObj.name}}</td>
              <td class="ahaTableTd">{{aObj.poc_dev_manager}}</td>
              <td class="ahaTableTd">{{aObj.poc_test_manager}}</td>
              <td class="ahaTableTd">{{aObj.pipd}}</td>
              <td class="ahaTableTd">{{aObj.swfs}}</td>
              <td class="ahaTableTd">{{aObj.platforms_need}}</td>
              <td class="ahaTableTd">{{aObj.enablement_date}}</td>
              <td class="ahaTableTd">{{aObj.comments}}</td>
              <td class="ahaTableTd">{{aObj.feature_owner}}</td>
              <td :class="'ahaTableTd '+aObj.enablement_status_color">{{aObj.enablement_status}}</td>
             </tr>
             <tr v-if="editingAha"  :key="index+'a'">
              <td>
              <input type="text" class="weeklyTableText" v-model="aObj.featureId" readonly="true">
             </td>
             <td>
             <input type="text" class="weeklyTableText" v-model="aObj.ahaId" readonly="true">
             </td>
             <td>
              <input type="text" class="weeklyTableText" v-model="aObj.name" >
             </td>
             <td>
              <input type="text" class="weeklyTableText" v-model="aObj.poc_dev_manager" >
             </td>
             <td>
              <input type="text" class="weeklyTableText" v-model="aObj.poc_test_manage" >
             </td>
             <td>
              <input type="text" class="weeklyTableText" v-model="aObj.pipd" >
             </td>
             <td>
              <input type="text" class="weeklyTableText" v-model="aObj.swfs" >
             </td>
             <td>
              <input type="text" class="weeklyTableText" v-model="aObj.platforms_need" >
             </td>
             <td>
              <date-picker
              v-model="aObj.enablement_date"
               @change="addDateRack"
              :format="format" value-type="format"
              :lang="lang"
             style="width: 100%;"
            ></date-picker>
             </td>
             <td>
             <input type="text" class="weeklyTableText" v-model="aObj.comments" >
             </td>
              <td>
             <input type="text" class="weeklyTableText" v-model="aObj.enablement_owner" >
             </td>
              <td>
              <select
                v-model="aObj.enablement_status"
                class="weeklyTableText"
              >
                <option value="pending">pending</option>
                <option value="blocked">blocked</option>
                 <option value="dropped">dropped</option>
                <option value="inprogress">inprogress</option>
                <option value="completed">completed</option>
              </select>
            </td>
              </tr>
            </template>
         </table>
      </div>

       </div>
        <!-- <textarea
              v-model="rel_summary"
              style="display: block;"
              class="proceduretextarea rel_summary"
              @enter="autoResize"
              @change="autoResize"
              @load="autoResize"
              height="200px"
            ></textarea>-->
      </div>


      </div>
      <div class="thirdPage thirdPageLight" v-show="showCustGraphs">
      <div class="defectTableTitle">
        CDETS <span
          v-if="!showCdetsTable"
          class="icon-chevron-right interaction"
          style="margin-top:-3p;margin-left: 10px;"
          v-on:click="showCdetsTable=!showCdetsTable"
         ></span>
         <span
          v-if="showCdetsTable"
          class="icon-chevron-down interaction"
           style="margin-top:-3p;margin-left: 10px;"
          v-on:click="showCdetsTable=!showCdetsTable"
         ></span>
      </div>
      <div class="row defectTablecontainer" v-if="showCdetsTable">
        <div class="cdetsTable" v-show="statusTabs.length>1">
        <tabs
          id="cdetsStatusTables"
          name="Tabs"
          :options="{ useUrlFragment: false }"
          @clicked="cdetsStatusTabClicked"
          @changed="cdetsStatusTabClicked"
         >
        <template v-for="(StatusTab, index) in statusTabs" >
        <tab
            :name="StatusTab"
            class="StatusTab"
            :ref="StatusTab"
             :key="index"
           >
            <div class="cdetsTable1">
          <table id="cdetsTable" class="table table--highlight secondaryTable">
            <tr>
            <th class="stickyTh" style="width:10%;text-align:center;">Identifier</th>
            <th class="stickyTh" style="width:35%;text-align:left;">Headline</th>
            <th class="stickyTh" style="width:15%;text-align:left;">Component</th>
            <th class="stickyTh" style="width:15%;text-align:left;">Submitter</th>
            <th class="stickyTh" style="width:15%;text-align:left;">Status</th>
            <th class="stickyTh" style="width:10%;text-align:center;">#TCs</th>
            </tr>
            <template class="cdetsTr" v-for="(cdetObj,index) in statusTabsArr[StatusTab]">
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
        </tab>
        </template>
        </tabs>
       </div>
      </div>
      </div>
      <div>
      <!--unique testcase charts-->
       <UniqueTestcaseCharts
        v-if="showingUnique"
        :chartData="uniqueChartsData"
        :uniqueCount="uniqueCount"
       >  </UniqueTestcaseCharts>
      <div class="row">
      <div class="slidesBtn">
           <button class="r_summaryDiv c_testcases" @click="loadActualTestcases()">
                <div class="totalCount">{{ summaryButtonsDetails.totalTestcases }}</div>
                <div class="summaryname">Testcases</div>
           </button>
           <button class="r_summaryDiv c_executionSummary"  v-tooltip.right="{
                   html: 'showTotalExecuted',
                  class: 'cisco-tooltip',
            }">
                <div class="totalCount">{{ summaryButtonsDetails.testcasesExecuted.percentage }}%</div>
                <div class="summaryname">Executed</div>
                
          <div id="showTotalExecuted">
             {{ summaryButtonsDetails.testcasesExecuted.count }}
          </div>
           </button>
           
           <button class="r_summaryDiv c_qualitySummary">
                <div class="totalCount">{{ summaryButtonsDetails.resultQuality.resultQuality }}%</div>
                <div class="summaryname">Quality</div>
           </button>
              <button
                class="r_summaryDiv c_platforms"
                @click="showSummaryDetails('Platforms',summaryButtonsDetails.platform)"
              >
                 <div class="totalCount">{{ summaryButtonsDetails.totalPlatforms }}</div>
                <div class="summaryname">Platforms</div>
              </button>
               <button
                class="r_summaryDiv c_roles"
                @click="showSummaryDetails('Roles',summaryButtonsDetails.role)"
              >
                 <div class="totalCount">{{ summaryButtonsDetails.totalRoles }}</div>
                <div class="summaryname">Roles</div>
              </button>
               <button
                class="r_summaryDiv c_features"
                @click="showSummaryDetails('Features',summaryButtonsDetails.feature)"
              >
                <div class="totalCount">{{ summaryButtonsDetails.totalFeatures }}</div>
                <div class="summaryname">Features</div>
             </button>
               <button
                class="r_summaryDiv c_defects"
                @click="showSummary('defects')"
              >
                <div class="totalCount">{{ summaryButtonsDetails.totalDefects }}</div>
                <div class="summaryname"> Defects</div>
              </button>
               <button class="r_summaryDiv c_cfd" @click="showSummary('CFDs')">
                <div class="totalCount">{{ summaryButtonsDetails.totalCFD }}</div>
                <div class="summaryname">CFDs</div>
               </button>
                <button class="r_summaryDiv c_logs"  v-tooltip.right="{
                   html: 'showManualLogsCount',
                  class: 'cisco-tooltip',
                 }">
                <div class="totalCount">{{ summaryButtonsDetails.logDetails.totalLogs }}</div>
                <div class="summaryname">Logs</div>
               <div id="showManualLogsCount">
                   <div>Manual: {{summaryButtonsDetails.logDetails.Manual}}</div>
                   <div>Automation: {{summaryButtonsDetails.logDetails.Automation}}</div>
               </div>
               </button>
               <button class="r_summaryDiv c_aha">
                <div class="totalCount">{{ ahaList.length }}</div>
                <div class="summaryname">AHA</div>
               </button>
               <button class="r_summaryDiv c_noProcedure">
                <div class="totalCount">{{ summaryButtonsDetails.emptyProcedure }}</div>
                <div class="summaryname" style="font-size: 1.2rem;white-space: nowrap;">Empty Procedure</div>
               </button>
               <button class="r_summaryDiv c_pending" v-tooltip.right="{
                   html: 'showPending',
                  class: 'cisco-tooltip',}">
                <div class="totalCount">{{ summaryButtonsDetails.testcasesPending.percentage }}%</div>
                <div class="summaryname">Pending</div>
                 <div id="showPending">{{summaryButtonsDetails.testcasesPending.count}}</div>
               </button>
               <button class="r_summaryDiv c_duration"  v-tooltip.right="{
                   html: 'showTotalAutomated',
                  class: 'cisco-tooltip',
            }">
               <div class="totalCount" >{{summaryButtonsDetails.totalAutomatedTestcases}}</div>
                <div class="summaryname">Automated</div>
                <div id="showTotalAutomated">{{summaryButtonsDetails.totalAutomatedTestcases}}</div>
              </button>
              <button class="r_summaryDiv c_mhCount">
               <div class="totalCount">{{mhDefectsCount}}</div>
                <div class="">MH</div>
              </button>
             <button class="r_summaryDiv c_unique" @click="loadUniqueTcs">
               <div class="totalCount">{{summaryButtonsDetails.unique_testcases}}</div>
                <div class="">Unique TCs</div>
              </button>
            </div>
      </div>
        <TestcaseList
         v-if="showTestcases"
         :testcaseArrayFlag="testcasesFlag"
          :testcaseArray="selectedTestcases"
         :projectId="selectedPrId"
         :selectedCustomerName="selectedCustomerName"
         :selectedReleaseName="selectedReleaseName"
        :selectedProjectName="selectedProjectName"
          :customerId="customerId"
          :customerName="customerName"
          :releaseId="selectedRelId"
          :releaseFlag="releaseFlag"
          :folderName="folderName"
          :syncFlag="syncFlag"
          :showLoading="showLoadingTestcases"
          :showTims="showTims"
          :timsUrl="timsUrl"
          :timsId="timsId"
          :gotoTestcase="gotoTestcase"
          :executionSummaryOption="executionSummaryOption"
          :splineOptions="splineOptions"
          :qualityOption="qualityOption"
          :qualityPlatformOption="qualityPlatformOption"
          :defectOption="defectOption"
          :componentOption="componentOption"
          :featureOption="featureOption"
          :cvtOptions="cvtOptions"
          :qualityFeatureOption="qualityFeatureOption"
          :qualitySrcOption="qualitySrcOption"
          :mhHaveOption="mhHaveOption"
          :roleOption="roleOption"
          :platformOption="platformOption"
          :srcOption="srcOption"
          :statusOption="statusOption"
          :submitterOption="submitterOption"
          :userOption="userOption"
          :testcaseDefectsByUsersOption="testcaseDefectsByUsersOption"
          :heatMapOptions="heatMapOptions"
          :showingUnique="showingUnique"
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
       <ContextMenu ref="ahamenu" class="fmenu">
        <template slot-scope="{ contextData }">
          <ContextMenuItem @click.native="deleteAhafeature(contextData)">
            Delete
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
        <ContextMenu ref="schememenu" class="schememenu">
        <template>
          <ContextMenuItem @click.native="changeScheme($event,'Dark')">
            Dark-Scheme
          </ContextMenuItem>
          <ContextMenuItem @click.native="changeScheme($event,'Light')">
            Light-Scheme
          </ContextMenuItem>
          <ContextMenuItem @click.native="changeScheme($event,'Default')">
           Defeault-Scheme
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
          <div class="row" style="100%;margin-left:0;margin-right:0;">
          <div style="width:50%">
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
          </div>
           <div style="width:50%">
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
           </div>
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
         <div class="tm_btn-container" style="margin-top:10px">
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
    <div v-show="showZoomChart" class="zoomChartModal" >
        <div class="modal__body" style="display:flex; justify-content:center;">
         <span
          class="icon-close icon-small interaction closeBtn"
          v-on:click="closeZoomChart()"
        ></span>
         <chart id="zoomChart" class="zoomChart" :option="zoomChartOptions"></chart>
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
        <div class="form-group tm-form-group1 row" style="width:100%">
         <div style="width:25%">
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
            <datalist id="folders" style="width: 100%;" >
              <option v-for="(folder_name, index) in folders" :key="index">{{
                folder_name
              }}</option>
            </datalist>
          </div>
          </div>
          <div style="width:25%">
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
          </div>
          <div style="width:25%">
            <div class="form-group__text tm-form__text">
            <label class="cm-label">
              Customer
            </label>
            <input
              type="text"
              style="width: 100%;"
              name="customer"
              v-model="releaseObj.customerName"
            />
            </div>
            </div>
          <div style="width:25%">
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
          </div>
        </div>
         <div class="form-group tm-form-group1 row" style="width:100%">
         <div style="width:50%">
          <div class="form-group__text tm-form__text">
            <label class="cm-label">
              Project Attribute
            </label>
            <input
              type="text"
              v-model="releaseObj.attribute"
              style="width: 100%;"
            />
          </div>
         </div>
          <div style="width:50%">
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
          </div>
         </div>
            <div class="dateHeadings">Planned</div>
            <div class="form-group tm-form-group1 row releaseDatesContainer">
            <div class="projectField">
           <div class="form-group__text tm-form__text" style="position:relative;">
            <label class="cm-label">
              Start
            </label>
             <date-picker
              v-model="releaseObj.start_date"
               @change="addDateRack"
                 :format="format" value-type="format"
              :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
           </div>
           <div class="projectField">
             <div class="form-group__text tm-form__text" style="position:relative;">
            <label class="cm-label">
              TCFA
            </label>
             <date-picker
               :format="format" value-type="format"
              v-model="releaseObj.tcfa_date"
               :lang="lang"
              style="width: 100%;"
            ></date-picker>
            </div>
           </div>
           <div class="projectField">
             <div class="form-group__text tm-form__text" style="position:relative;">
            <label class="cm-label">
              Retest
            </label>
             <date-picker
               :format="format" value-type="format"
              v-model="releaseObj.retest_start_date"
               :lang="lang"
              style="width: 100%;"
            ></date-picker>
            </div>
            </div>
             <div class="projectField">
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
             </div>
              <div class="projectField">
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
              </div>
               <div class="projectField">
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
              </div>
               <div class="projectField">
           <div class="form-group__text tm-form__text" style="position:relative;">
            <label class="cm-label">
              FCS
            </label>
             <date-picker
               :format="format" value-type="format"
              v-model="releaseObj.fcs_date"
               :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
           </div>
                <div class="projectField">
                <div class="form-group__text tm-form__text" style="position:relative;">
            <label class="cm-label">
             GISO
            </label>
             <date-picker
               :format="format" value-type="format"
              v-model="releaseObj.giso_date"
               :lang="lang"
              style="width: 100%;"
            ></date-picker>
            </div>
              </div>
                <div class="projectField">
                <div class="form-group__text tm-form__text" style="position:relative;">
            <label class="cm-label">
              EoTR
            </label>
             <date-picker
               :format="format" value-type="format"
              v-model="releaseObj.eotr_date"
               :lang="lang"
              style="width: 100%;"
            ></date-picker>
            </div>
              </div>
         </div>
          <div class="dateHeadings">Actual</div>
          <div class="form-group tm-form-group1 row releaseDatesContainer">
          
             <div class="projectField">
           <div class="form-group__text tm-form__text" style="position:relative;">
            <label class="cm-label">
               Start
            </label>
             <date-picker
              v-model="releaseObj.actual_start_date"
               @change="addDateRack"
                 :format="format" value-type="format"
              :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
           </div>
           <div class="projectField">
             <div class="form-group__text tm-form__text" style="position:relative;">
            <label class="cm-label">
             TCFA
            </label>
             <date-picker
               :format="format" value-type="format"
              v-model="releaseObj.actual_tcfa_date"
               :lang="lang"
              style="width: 100%;"
            ></date-picker>
            </div>
           </div>
            <div class="projectField">
             <div class="form-group__text tm-form__text" style="position:relative;">
            <label class="cm-label">
             Retest Start
            </label>
             <date-picker
               :format="format" value-type="format"
              v-model="releaseObj.actual_retest_start_date"
               :lang="lang"
              style="width: 100%;"
            ></date-picker>
            </div>
            </div>
             <div class="projectField">
             <div class="form-group__text tm-form__text" style="position:relative;">
            <label class="cm-label">
              Retest End
            </label>
             <date-picker
               :format="format" value-type="format"
              v-model="releaseObj.actual_retest_end_date"
               :lang="lang"
              style="width: 100%;"
            ></date-picker>
            </div>
             </div>
              <div class="projectField">
               <div class="form-group__text tm-form__text" style="position:relative;">
            <label class="cm-label">
              Longevity Start
            </label>
             <date-picker
               :format="format" value-type="format"
              v-model="releaseObj.actual_longevity_start_date"
               :lang="lang"
              style="width: 100%;"
            ></date-picker>
            </div>
              </div>
               <div class="projectField">
                <div class="form-group__text tm-form__text" style="position:relative;">
            <label class="cm-label">
              Longevity End
            </label>
             <date-picker
               :format="format" value-type="format"
              v-model="releaseObj.actual_longevity_end_date"
               :lang="lang"
              style="width: 100%;"
            ></date-picker>
            </div>
              </div>
               <div class="projectField">
           <div class="form-group__text tm-form__text" style="position:relative;">
            <label class="cm-label">
             FCS
            </label>
             <date-picker
               :format="format" value-type="format"
              v-model="releaseObj.actual_fcs_date"
               :lang="lang"
             style="width: 100%;"
            ></date-picker>
            </div>
           </div>
              <div class="projectField">
                <div class="form-group__text tm-form__text" style="position:relative;">
            <label class="cm-label">
              GISO
            </label>
             <date-picker
               :format="format" value-type="format"
              v-model="releaseObj.actual_giso_date"
               :lang="lang"
              style="width: 100%;"
            ></date-picker>
            </div>
              </div>
              <div class="projectField">
                <div class="form-group__text tm-form__text" style="position:relative;">
            <label class="cm-label">
             EoTR
            </label>
             <date-picker
               :format="format" value-type="format"
              v-model="releaseObj.actual_eotr_date"
               :lang="lang"
              style="width: 100%;"
            ></date-picker>
            </div>
              </div>
         </div>
              <div class="form-group tm-form-group1 row" style="width:100%">
               <div style="width:50%">
                 <div class="form-group__text tm-form__text">
            <label class="cm-label">
             Resources
            </label>
            <input
              type="text"
              v-model="releaseObj.resources"
              style="width: 100%;"
            />
             <!--<select v-model="seletedUsers"  @change="onUserChange($event)"  multiple>
              <option v-for="(user1, index1) in userSummary" :key="index1" :value="user1.name">{{
                user1.name
              }}</option>
              </select>-->
          </div>
               </div>
                <div style="width:50%">
                 <div class="tm_btn-container" style="margin-top: 30px; margin-right: 30px;margin-bottom: 30px;">
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
                </div>
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
    <div
      v-if="loading1"
      class="loadingModal"
      style=" height: 60px !important;
        position: absolute !important;     z-index: 100000;"
    >
      <div class="modal__body" style="display:flex; justify-content:center;">
        {{ loadingMessage1 }}
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
    <div v-if="showRelModal" class="execSummaryModal">
      <ReleaseNoteWeeklyReport :weeklyReport="weeklyReport" v-on:child="onChildInteraction">
      </ReleaseNoteWeeklyReport>
    </div>
    <div v-if="showExecSummaryModal" class="execSummaryModal">
    <ExecutionSummaryTable :weeklyReport="weeklyReport" :mainCdets="mainCdets" :execrelName="execrelName" :execProjects="execProjects" v-on:child="onChildInteraction">
    </ExecutionSummaryTable>
    </div>
    <div v-if="showUpgradeMatrixModal" class="upgradeMatrixModal">
    <UpgradeMatrixTable v-on:child="onChildInteraction">
    </UpgradeMatrixTable>
    </div>
    <div v-if="showTriggerMatrixModal" class="triggerMatrixModal">
    <TriggerMatrixTable  v-on:child="onChildInteraction">
    </TriggerMatrixTable>
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
