<script>
import { router } from "@/router";
import GanttChart from "./GanttChart";
import { testcaseService } from "@/core/services/testcaseService";
import ExecutionSummaryPageHome from "./ExecutionSummaryPageHome.vue";
import CreateCustomerPage from "./CreateCustomerPage.vue";
import TreevizPage from "./TreevizPage.vue";
import { customer_list } from "../assets/customer_array";
import OrganizationChart from "vue-organization-chart";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "vue-organization-chart/dist/orgchart.css";

import Chart from "./Chart";
import ContextMenu from "../components/global/ContextMenu/ContextMenu";
import ContextMenuItem from "../components/global/ContextMenu/ContextMenuItem";
import { requestOptions } from "@/core/helpers/request";

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
  name: "HomePage",

  data() {
    return {
      custObj: {},
      platformRoleReleaseDetails:[],
       treeSplideOptions: {
        rewind: true,
        width: "100%",
        perPage: 2,
        gap: "1rem",
        perMove: 2,
        speed: 150,
        autoplay: true,
      },
      relColors:[
        "#4EA1D3",
        "#F4A4A4",
        "#6474E5",
        "#9AA4EC",
        "#F8C8C6",
        "#C97184",
        "#5EE6EB",
        "#F2FA5A",
        "#9254C8",
        "#6EDCD9",
        "#C1F4C5"
      ],
      showAddCustomerModal: false,
      selectedR_Release: "",
      platformColors: {
        ASR9K: "#FFAEBC",
        NCS5500: "#A0E7E5",
        NCS5K: "#B4F8C8",
        _8000: "#FBE7C6",
      },
      platformListColor: {
        chassisList: "#E56997",
        cardList: "#AAD6A0",
      },
      rolesColors: {
        BX: "#A4E8E0",
        CX: "#BD97CB",
        EC: "#FBC740",
        PF: "#E56997",
        ME: "#F7CAC9",
        EX: "#AAD6A0",
        BX: "#A1AFA0",
      },
      treeDataList: {
        treeData0:[],
        treeData1:[],
        treeData2:[],
      },
      treeDataArray:[],
      superTreeDataList:[],
      r_treeData: [
        { id: 1, text_1: "712", text_2: "", father: null, color: "#015871" },
        { id: 2, text_1: "ASR9K", text_2: 10, father: 1, color: "#00BCD4" },
        { id: 3, text_1: "NCS5500", text_2: 10, father: 1, color: "#00BCD4" },
        { id: 4, text_1: "NCS5K", text_2: 10, father: 1, color: "#00BCD4" },
        { id: 10, text_1: "Rev1", text_2: 10, father: 2, color: "#FFC107" },
        { id: 11, text_1: "Rev2", text_2: 10, father: 2, color: "#FFC107" },
        { id: 12, text_1: "Rev3", text_2: 10, father: 2, color: "#FFC107" },
        { id: 13, text_1: "Rev1", text_2: 10, father: 3, color: "#FFC107" },
        { id: 14, text_1: "Rev2", text_2: 10, father: 3, color: "#FFC107" },
        { id: 15, text_1: "Rev5", text_2: 10, father: 4, color: "#FFC107" },
        { id: 16, text_1: "Rev6", text_2: 10, father: 4, color: "#FFC107" },
        { id: 17, text_1: "Rev7", text_2: 10, father: 4, color: "#FFC107" },
        { id: 18, text_1: "Rev8", text_2: 10, father: 4, color: "#FFC107" },
      ],
      ASR9K: ["rev1", "rev2", "rev3", "rev4"],
      NCS55500: ["rev1", "rev2", "rev3", "rev4"],
      NCS5K: ["rev1", "rev2", "rev3"],
      revReleases: {
        "712": [
          { id: 1, text_1: "712", text_2: "", father: null, color: "#015871" },
          { id: 2, text_1: "ASR9K", text_2: 10, father: 1, color: "#00BCD4" },
          { id: 3, text_1: "NCS5500", text_2: 10, father: 1, color: "#00BCD4" },
          { id: 4, text_1: "NCS5K", text_2: 10, father: 1, color: "#00BCD4" },
          { id: 10, text_1: "Rev1", text_2: 10, father: 2, color: "#FFC107" },
          { id: 11, text_1: "Rev2", text_2: 10, father: 2, color: "#FFC107" },
          { id: 12, text_1: "Rev3", text_2: 10, father: 2, color: "#FFC107" },
          { id: 13, text_1: "Rev1", text_2: 10, father: 3, color: "#FFC107" },
          { id: 14, text_1: "Rev2", text_2: 10, father: 3, color: "#FFC107" },
          { id: 15, text_1: "Rev5", text_2: 10, father: 4, color: "#FFC107" },
          { id: 16, text_1: "Rev6", text_2: 10, father: 4, color: "#FFC107" },
          { id: 17, text_1: "Rev7", text_2: 10, father: 4, color: "#FFC107" },
          { id: 18, text_1: "Rev8", text_2: 10, father: 4, color: "#FFC107" },
        ],
        "731": [
          { id: 1, text_1: "731", text_2: "", father: null, color: "#015871" },
          { id: 2, text_1: "ASR9K", text_2: 10, father: 1, color: "#00BCD4" },
          { id: 3, text_1: "NCS5500", text_2: 10, father: 1, color: "#00BCD4" },
          { id: 4, text_1: "NCS5K", text_2: 10, father: 1, color: "#00BCD4" },
          { id: 10, text_1: "Rev1", text_2: 10, father: 2, color: "#FFC107" },
          { id: 11, text_1: "Rev2", text_2: 10, father: 2, color: "#FFC107" },
          { id: 12, text_1: "Rev3", text_2: 10, father: 2, color: "#FFC107" },
          { id: 13, text_1: "Rev1", text_2: 10, father: 3, color: "#FFC107" },
          { id: 14, text_1: "Rev2", text_2: 10, father: 3, color: "#FFC107" },
          { id: 15, text_1: "Rev5", text_2: 10, father: 4, color: "#FFC107" },
          { id: 16, text_1: "Rev6", text_2: 10, father: 4, color: "#FFC107" },
          { id: 17, text_1: "Rev7", text_2: 10, father: 4, color: "#FFC107" },
          { id: 18, text_1: "Rev8", text_2: 10, father: 4, color: "#FFC107" },
        ],
        "734": [
          { id: 1, text_1: "734", text_2: "", father: null, color: "#015871" },
          { id: 2, text_1: "ASR9K", text_2: 10, father: 1, color: "#00BCD4" },
          { id: 3, text_1: "NCS5500", text_2: 10, father: 1, color: "#00BCD4" },
          { id: 4, text_1: "NCS5K", text_2: 10, father: 1, color: "#00BCD4" },
          { id: 10, text_1: "Rev1", text_2: 10, father: 2, color: "#FFC107" },
          { id: 11, text_1: "Rev2", text_2: 10, father: 2, color: "#FFC107" },
          { id: 12, text_1: "Rev3", text_2: 10, father: 2, color: "#FFC107" },
          { id: 13, text_1: "Rev1", text_2: 10, father: 3, color: "#FFC107" },
          { id: 14, text_1: "Rev2", text_2: 10, father: 3, color: "#FFC107" },
          { id: 15, text_1: "Rev5", text_2: 10, father: 4, color: "#FFC107" },
          { id: 16, text_1: "Rev6", text_2: 10, father: 4, color: "#FFC107" },
          { id: 17, text_1: "Rev7", text_2: 10, father: 4, color: "#FFC107" },
          { id: 18, text_1: "Rev8", text_2: 10, father: 4, color: "#FFC107" },
        ],
      },

      tree1Data: [
        { id: 1, text_1: "ASR9K", text_2: 10, father: null, color: "#8BC34A" },
        { id: 2, text_1: "9904", text_2: 10, father: 1, color: "#00BCD4" },
        { id: 3, text_1: "9922", text_2: 10, father: 1, color: "#00BCD4" },
        { id: 4, text_1: "BB,RB", text_2: 10, father: 2, color: "#FFC107" },
        { id: 5, text_1: "BX,BD, BB", text_2: 10, father: 3, color: "#FFC107" },
      ],
      tree2Data: [
        {
          id: 1,
          text_1: "NCS5500",
          text_2: 10,
          father: null,
          color: "#8BC34A",
        },
        { id: 2, text_1: "55A1", text_2: 10, father: 1, color: "#00BCD4" },
        { id: 3, text_1: "5501", text_2: 10, father: 1, color: "#00BCD4" },
        { id: 4, text_1: "5508", text_2: 10, father: 1, color: "#00BCD4" },
        { id: 5, text_1: "PF,CX", text_2: 10, father: 2, color: "#FFC107" },
        { id: 6, text_1: "PF", text_2: 10, father: 3, color: "#FFC107" },
        {
          id: 7,
          text_1: "CX,ME,BX,DX,EX,PF",
          text_2: 10,
          father: 4,
          color: "#FFC107",
        },
      ],
      tree3Data: [
        {
          id: 1,
          text_1: "NCS5011",
          text_2: 10,
          father: null,
          color: "#8BC34A",
        },
        { id: 2, text_1: "SR", text_2: 10, father: 1, color: "#00BCD4" },
        { id: 3, text_1: "EC", text_2: 10, father: 1, color: "#00BCD4" },
      ],
      tree4Data: [
        {
          id: 1,
          text_1: "8000 8808",
          text_2: 10,
          father: null,
          color: "#8BC34A",
        },
        { id: 2, text_1: "BX", text_2: 10, father: 1, color: "#00BCD4" },
        { id: 3, text_1: "CX", text_2: 10, father: 1, color: "#00BCD4" },
      ],

      ganttOptions: {},
      componentOptions: {},
      revSMUChartOptions:{},
      componentData: [],
      productOptions: {},
      productData: [],
      cfdDataList: [],
      cfdSummary: {},
      showCustomerFlag: true,
      weeklyReport: [],
      mainCdets: [],
      executionSummaryOption: {},
      showExecutionHeatMap: false,
      showCVTExecution: false,
      heatMapOptions1: {},
      heatMapOptions2: {},
      executionCircleColor: "yellow",
      summaryButtonsDetails: {
        totalTestcases: 0,
        testcasesExecuted: { count: 0, percentage: 0 },
        testcasesPending: { count: 0, percentage: 0 },
        resultQuality: {
          resultQuality: 0,
          projectedResultQuality: 0,
        },
        totalPlatforms: 0,
        totalRoles: 0,
        totalFeatures: 0,
        totalDefects: 0,
        totalCFD: 0,
        logDetails: {
          Automation: 0,
          Manual: 0,
          totalLogs: 0,
        },
        emptyProcedure: 0,
        totalAutomatedTestcases: 0,
        unique_testcases: 0,
        defects: {},
        feature: {},
        platform: {},
        role: {},
      },

      revData: {
        "712": {
          ASR9K: ["rev1", "rev2", "rev3", "rev4"],
          NCS55500: ["rev1", "rev2", "rev3", "rev4"],
          NCS5K: ["rev1", "rev2", "rev3"],
          _8000: [],
        },
        "653": {
          ASR9K: [],
          NCS55500: [],
          NCS5K: [],
          _8000: ["rev1", "rev2", "rev3"],
        },
        "731": {
          ASR9K: ["rev1", "rev2", "rev3", "rev4", "rev9"],
          NCS55500: ["rev1", "rev2", "rev3", "rev4", "rev10"],
          NCS5K: ["rev1", "rev2", "rev3"],
          _8000: [],
        },
      },
      links: {
        "Gold Configuration": "",
        "GISO Images": "",
        "Scale sheet": "",
        "CVT wiki": "",
      },
      funnelChartOptions: {},
      funnelOptions: {
        chart: {
          type: "pyramid",
        },
        title: {
          text: "Devices",
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: <b>{point.percentage:.1f}%</b>",
              softConnector: true,
            },
            center: ["40%", "50%"],
            width: "80%",
          },
        },
        legend: {
          enabled: false,
        },
        series: [
          {
            name: "Unique users",
            data: [
              ["NCS5000", 15654],
              ["NCS5500", 4064],
              ["ASR9000", 1987],
              ["8000", 976],
            ],
          },
        ],

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                plotOptions: {
                  series: {
                    dataLabels: {
                      inside: true,
                    },
                    center: ["50%", "50%"],
                    width: "100%",
                  },
                },
              },
            },
          ],
        },
      },
      platformBubbleChartOptions: {},
      rolesBubbleChartOptions: {},
      imageBubbleChartOptions: {},
      opticsChartOptions: {},
      treeviewChartOptions:{
    series: [{
        type: "treemap",
        layoutAlgorithm: 'stripes',
        alternateStartingDirection: true,
        levels: [{
            level: 1,
            layoutAlgorithm: 'sliceAndDice',
            dataLabels: {
                enabled: true,
                align: 'left',
                verticalAlign: 'top',
                style: {
                    fontSize: '15px',
                    fontWeight: 'bold'
                }
            }
        }],
        data: []
    }],
    title: {
        text: 'Optics'
    },
    credits:false
},
      packedBubbleOptions: {
        chart: {
          type: "packedbubble",
          height: "100%",
        },
        title: {
          text: "",
        },
        credits:false,
        tooltip: {
          useHTML: true,
          pointFormat: "<b>{point.name}:</b>",
        },
        plotOptions: {
          series: {
            point: {
              cursor: "pointer",
            },
          },
          packedbubble: {
            minSize: "20%",
            maxSize: "100%",
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
              gravitationalConstant: 0.05,
              splitSeries: true,
              seriesInteraction: false,
              dragBetweenSeries: true,
              parentNodeLimit: true,
              enableSimulation: false,
            },
            dataLabels: {
              enabled: true,
              format: "{point.name}",
              style: {
                color: "black",
                fontSize: "16px",
                textOutline: "none",
                fontWeight: "normal",
              },
            },
          },
        },
        series: [],
      },
      allPlatforms: {
        ASR9K: ["BB", "BX", "RB"],
        NCS5500: ["ME|EX", "CX", "DX", "BX"],
        NCS5K: ["SR", "EC", "VT"],
      },
      supportedPlatformData: {
        BGP: {
          ASR9K: ["BB", "BX", "RB"],
          NCS5500: ["ME|EX", "CX", "DX", "BX"],
          NCS5K: ["SR", "EC", "VT"],
        },
        ISIS: {
          ASR9K: ["BB", "BX", "RB"],
          NCS5500: ["ME|EX", "CX", "DX", "BX"],
          NCS5K: ["SR", "EC", "VT"],
        },
        SR: {
          ASR9K: ["BB", "BX", "RB"],
          NCS5500: ["ME|EX", "CX", "DX", "BX"],
          NCS5K: ["SR", "EC", "VT"],
        },
        SRTE: {
          ASR9K: ["BB", "BX", "RB"],
          NCS5500: ["ME|EX", "CX", "DX", "BX"],
          NCS5K: ["SR", "EC", "VT"],
        },
        "MPLS TE": {
          ASR9K: ["BB", "BX", "RB"],
          NCS5500: ["ME|EX", "CX", "DX", "BX"],
          NCS5K: ["SR", "EC", "VT"],
        },
        "Dark Bandwidth": {
          ASR9K: ["BB", "RB"],
          NCS5500: ["ME|EX", "CX", "DX", "BX"],
          NCS5K: ["SR", "EC"],
        },
        "MPLS Static": {
          ASR9K: ["BB", "RB"],
          NCS5500: ["DX", "BX"],
          NCS5K: ["SR", "EC"],
        },
        GRE: {
          ASR9K: ["BB", "RB"],
          NCS5500: [],
          NCS5K: [],
        },
        QoS: {
          ASR9K: ["BB", "RB"],
          NCS5500: [],
          NCS5K: [],
        },
      },
      summaryOptions: {
        title: {
          text: "Summary",
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
                textOutline: "transparent",
              },
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
                  //this.updateTestcasesForExecutionSummary(e);
                },
              },
            },
          },
        ],
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
          categories: [],
          rotation: -45,
          crosshair: true,
        },
        yAxis: {
          // Primary yAxis

          title: {
            text: "Count",
            style: {
              color: colors[2],
            },
          },
        },
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
          categories: [],
        },

        tooltip: {},

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
                  categories: [],
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
      tileMapOptions: {
        chart: {
          type: "tilemap",
          height: 350,
          reflow: false,
          margin: 0,
          spacing: 0,
        },

        plotOptions: {
          series: {
            pointRange: 0.5,
            pointPadding: 1,
            dataLabels: {
              enabled: true,
              format: "{point.name}",
              color: "#000000",
              style: {
                textOutline: false,
              },
            },
          },
          tilemap: {
            allowPointSelect: true,
            animation: true,
            cursor: "pointer",
            tileShape: "hexagon",
            states: { hover: { brightness: -0.2, halo: { size: 2 } } },
          },
        },
        credits: false,
        title: { text: "Optics" },
        xAxis: { visible: false, minPadding: 0, maxPadding: 0 },
        yAxis: { visible: false, min: 1, max: 5 },
         colorAxis: {
        dataClasses: []
    },
        tooltip: {
          headerFormat: "",
          pointFormat: "<b>{point.name}</b>",
        },
        series: [
          {
            name: "",
            data: [],
          },
        ],
      },
      subMenus: [],
      releasesArray: [],
      currentPhase: "",
      fcsStatus: "",
      nextmilestone: "",
      nextmilestoneStatus: "",
      releaseDetails: {},
      menus: ["Releases", "Customers", "Platform", "Team", "Inventory"],
      releases: [
        "653",
        "712",
        "731",
        "7315",
        "732",
        "733",
        "734",
        "751",
        "752",
        "753",
        "754",
      ],
      customers: [
        "Google",
        "Microsoft",
        "Charter",
        "Comcast",
        "Facebook",
        "Apple",
        "RJIL",
        "Airtel",
        "SFR",
        "AT&T",
      ],
      platform: ["ASR9000", "NCS5500", "8000", "NCS500"],
      selectedCustomerNotes:
        "Production Release – 712 (ASR9k, NCS5500, NCS5K), 731 (8000) ; Next Upgrade Release – 734 ; Upcoming EFT – 734 (4/1), 752 (3/31) ; Upcoming NPI – CX-8808(734), SR|EC-8202-32FH(752)",
      showCustomerNotes: false,
      colorscheme: "dark-scheme",
      inactiveBtns: [],
      selectedCustomer: "",
      selectedFolderName: "",
      c_releases: {
        Google: ["653", "712", "731", "732", "733", "734", "752", "753", "754"],
        Microsoft: ["7315", "733", "734", "751", "754"],
        Charter: ["733", "734", "751", "752"],
        Comcast: ["751", "752", "753", "754"],
        Facebook: ["731", "733", "734", "751", "754"],
        Apple: ["712", "731", "732", "733", "734", "751"],
        RJIL: ["732", "733", "734"],
      },
      homeGanttOptions: {
        chart: {
          backgroundColor: null,
          spacingLeft: 10,
          spacingBottom: 20,
          spacingTop: 20,
          events: {},
        },
        title: {
          text:
            "Project Plan - <span style='font-size:15px'>Google_CVT_SF</span>",
        },
        yAxis: {
          type: "category",
          categories: [
            "-",
            "Planned",
            "Actual",
            "Events",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
            "-",
          ],
          visible: true,
        },
        credits: false,
        xAxis: [
          {
            type: "datetime",
            tickInterval: 604800000,
            fill: "blue",
            labels: {
              style: { "font-size": "10px" },
              format: "{value:%Y-%m-%d}",
              rotation: 30,
              borderWidth: 0,
            },
            min: 1631491200000,
            max: 1640736000000,
          },
          { fill: "green", min: 1631491200000, max: 1640736000000 },
        ],
        tooltip: { xDateFormat: "%a %b %d" },
        plotOptions: {
          series: {
            pointWidth: 40,
            animation: false,
            dragDrop: {
              draggableX: true,
              draggableY: true,
              dragMinY: 0,
              dragMaxY: 2,
              dragPrecisionX: null,
            },
            dataLabels: {
              enabled: true,
              style: {
                color: "#fff !important",
                fill: "#fff !important",
                cursor: "default",
                pointerEvents: "none",
                textOutline: "transparent",
                "font-size": "16px",
              },
              text: {
                style: { color: "#fff !important", fill: "#fff !important" },
              },
            },
            allowPointSelect: true,
            point: { events: {} },
          },
        },
        series: [
          {
            name: "Project 1",
            data: [
              { name: "Planned", id: "planned", y: 0 },
              {
                parent: "planned",
                name: "Executed",
                id: "Planned_Executed",
                start: 1631491200000,
                end: 1637884800000,
                pointWidth: "35",
                y: 1,
                color: "lightgreen",
                dataLabels: {
                  color: "#fff",
                  "text-outline": "#fff",
                  fill: "#fff",
                },
              },
              {
                parent: "planned",
                name: "Executed",
                id: "Executed",
                start: 1631491200000,
                end: 1637884800000,
                pointWidth: "35",
                completed: { amount: 1, fill: "green", pointWidth: "35" },
                y: 2,
                color: "lightgreen",
                dataLabels: {
                  color: "#fff",
                  "text-outline": "#fff",
                  fill: "#fff",
                },
              },
              {
                parent: "planned",
                name: "Retest",
                id: "Planned_Retest",
                dependency: "Planned_Executed",
                start: 1636934400000,
                end: 1637712000000,
                pointWidth: "35",
                color: "#2094df",
                y: 1,
                dataLabels: { color: "#fff", "text-outline": "#fff" },
              },
              {
                parent: "planned",
                name: "Retest",
                id: "Retest",
                dependency: "Executed",
                start: 1636934400000,
                end: 1637712000000,
                pointWidth: "35",
                color: "#2094df",
                y: 2,
                dataLabels: { color: "#fff", "text-outline": "#fff" },
              },
              {
                parent: "planned",
                name: "Longevity",
                id: "Planned_Longevity",
                dependency: "Planned_Retest",
                start: 1638144000000,
                end: 1638662400000,
                pointWidth: "35",
                color: "orange",
                y: 1,
                dataLabels: { color: "#fff" },
              },
              {
                parent: "planned",
                name: "Longevity",
                id: "Longevity",
                dependency: "Retest",
                start: 1638144000000,
                end: 1638662400000,
                pointWidth: "35",
                color: "orange",
                y: 2,
                dataLabels: { color: "#fff" },
              },
              {
                parent: "planned",
                name: "FCS",
                milestone: true,
                start: 1640131200000,
                end: 1640131200000,
                dependency: "Planned_Longevity",
                color: "#73c34b",
                pointWidth: "35",
                y: 1,
                dataLabels: { color: "#fff" },
              },
              {
                parent: "planned",
                name: "FCS",
                milestone: true,
                start: 1640131200000,
                end: 1640131200000,
                dependency: "Longevity",
                color: "#73c34b",
                pointWidth: "35",
                y: 2,
                dataLabels: { color: "#fff" },
              },
              { name: "Events", id: "events", pointWidth: 0 },
            ],
          },
        ],
        exporting: {},
      },
      weeklyExecSummaryOptions: {
        chart: { type: "spline", backgroundColor: null },
        credits: false,
        legend: { symbolWidth: 40 },
        title: { text: "Execution Chart" },
        yAxis: {
          title: { text: "Number of Testcases" },
          accessibility: { description: "Number of Testcases" },
        },
        xAxis: {
          title: { text: "Time" },
          accessibility: {
            description: "Time from September 2020 to September 2021",
          },
          categories: [
            "2021-09-13",
            "2021-09-20",
            "2021-09-27",
            "2021-10-04",
            "2021-10-11",
            "2021-10-18",
            "2021-10-25",
            "2021-11-01",
            "2021-11-08",
            "2021-11-15",
            "2021-11-22",
            "2021-11-29",
            "2021-12-06",
            "2021-12-13",
            "2021-12-20",
          ],
        },
        tooltip: {},
        plotOptions: { series: { point: { events: {} } } },
        series: [
          {
            name: "Planned",
            data: [
              31,
              62,
              93,
              124,
              155,
              186,
              217,
              248,
              279,
              310,
              343,
              343,
              343,
              343,
              343,
            ],
            color: "#4272f5",
          },
          {
            name: "Actual",
            data: [
              0,
              0,
              2,
              68,
              114,
              164,
              191,
              222,
              253,
              303,
              343,
              343,
              343,
              null,
              null,
            ],
            dashStyle: "ShortDashDot",
            color: "#00bdeb",
          },
          {
            name: "Pass",
            data: [
              0,
              0,
              2,
              62,
              95,
              139,
              161,
              186,
              209,
              251,
              268,
              267,
              266,
              null,
              null,
            ],
            dashStyle: "ShortDot",
            color: "green",
          },
          {
            name: "Fail",
            data: [0, 0, 0, 6, 19, 25, 30, 36, 44, 36, 71, 72, 73, null, null],
            dashStyle: "Dash",
            color: "red",
          },
        ],
        responsive: {
          rules: [
            {
              condition: { maxWidth: 550 },
              chartOptions: {
                chart: {
                  backgroundColor: null,
                  spacingLeft: 3,
                  spacingRight: 3,
                },
                legend: { itemWidth: 150 },
                xAxis: { categories: [], title: "" },
                yAxis: { visible: false },
              },
              _id: "highcharts-kilgowr-188",
            },
          ],
        },
        exporting: {},
      },
      cvtSummaryOptions: {
        chart: { zoomType: "xy", backgroundColor: null },
        title: { text: "Defect Chart", align: "center" },
        credits: false,
        xAxis: {
          categories: [
            "2021-09-13",
            "2021-09-20",
            "2021-09-27",
            "2021-10-04",
            "2021-10-11",
            "2021-10-18",
            "2021-10-25",
            "2021-11-01",
            "2021-11-08",
            "2021-11-15",
            "2021-11-22",
            "2021-11-29",
            "2021-12-06",
            "2021-12-13",
            "2021-12-20",
          ],
          rotation: -45,
          crosshair: true,
        },
        yAxis: { title: { text: "Count", style: { color: "#00bdeb" } } },
        tooltip: { shared: true },
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
            name: "Must have",
            type: "column",
            data: [
              2,
              40,
              40,
              0,
              0,
              0,
              0,
              43,
              36,
              33,
              35,
              null,
              null,
              null,
              null,
            ],
          },
          {
            name: "Total",
            type: "spline",
            data: [
              null,
              null,
              2,
              28,
              28,
              38,
              54,
              92,
              103,
              116,
              123,
              null,
              null,
              null,
              null,
            ],
            dashStyle: "shortdot",
          },
          {
            name: "Found",
            type: "spline",
            data: [
              0,
              0,
              1,
              10,
              10,
              19,
              28,
              50,
              56,
              63,
              69,
              null,
              null,
              null,
              null,
            ],
            dashStyle: "shortdot",
          },
          {
            name: "Observed",
            type: "spline",
            data: [
              0,
              0,
              1,
              18,
              18,
              19,
              26,
              42,
              47,
              53,
              54,
              null,
              null,
              null,
              null,
            ],
          },
        ],
        responsive: {
          rules: [
            {
              condition: { maxWidth: 500 },
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
                    labels: { align: "right", x: 0, y: -6 },
                    showLastLabel: false,
                  },
                  {
                    labels: { align: "left", x: 0, y: -6 },
                    showLastLabel: false,
                  },
                  { visible: false },
                ],
              },
              _id: "highcharts-kilgowr-253",
            },
          ],
        },
        exporting: {},
      },
      execSummaryChartOptions: {
        title: { text: "Execution Summary" },
        chart: {
          type: "pie",
          backgroundColor: null,
          options3d: { enabled: true, alpha: 45, beta: 0 },
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
              style: { textOutline: "transparent" },
            },
            showInLegend: false,
          },
        },
        credits: false,
        series: [
          {
            type: "pie",
            data: [
              { name: "failed", y: 73, color: "#F51720" },
              { name: "passed", y: 264, color: "#76B947" },
              { name: "passx", y: 2 },
              { name: "dropped", y: 4 },
            ],
            point: { events: {} },
          },
        ],
        exporting: {},
      },
    };
  },
  mounted() {
    debugger;
    console.log("customer_list__" + customer_list);
    this.loadReleases();
    this.loadCustomers();
   },
  computed: {
    utcTimeNow: function() {
      let d1 = new Date();
      return d1;
    },
    currentUser: function() {
      if (localStorage.getItem("currentUser") !== null) {
        return JSON.parse(localStorage.getItem("currentUser")).username;
      }
    },
    isAdmin: function() {
      if (localStorage.getItem("currentUser") !== null) {
        if (
          JSON.parse(
            localStorage.getItem("currentUser")
          ).role.toLowerCase() === "admin"
        ) {
          return true;
        }
      }
      return false;
    },
  },

  components: {
    GanttChart,
    Chart,
    OrganizationChart,
    ContextMenu,
    ContextMenuItem,
    ExecutionSummaryPageHome,
    CreateCustomerPage,
    TreevizPage,
    Splide,
    SplideSlide,
  },
  methods: {
    onChildInteraction(args, payload) {
      switch (args) {
        case "r_releaseClicked":
          this.r_releaseClicked(payload);
          break;
        case "toggleChart":
          this[payload] = !this[payload];
          break;
        case "closeAddCustomerModal":
          this.closeAddCustomerModal();
          break;
      }
    },

    parseHTML(html) {
    var t = document.createElement('template');
    t.innerHTML = html;
    return t;
   },

    loadImageDetails(htmlData,id){
      const parser = new DOMParser();
      var htmlDoc = parser.parseFromString(htmlData, 'text/html');
     return htmlDoc;
    },

    sortByDateAsc(arr, key) {
      return arr.sort(function(a, b) {
        var dateA = new Date(a[key]).getTime();
        var dateB = new Date(b[key]).getTime();
        return dateA > dateB ? 1 : -1;
      });
    },
    loadCustomers() {
      for (let k = 0; k < customer_list.length; k++) {
        if (this.customers.indexOf(customer_list[k].name) < 0) {
          this.customers.push(customer_list[k].name);
        }
      }
    },
    addRowProdImage() {
      this.custObj.push();
    },
    onConfigFileChange(platform_name, role_name) {},
    addCustomer() {
      this.showAddCustomerModal = true;
    },
    getColorForPerc(count1, type, diff) {
      let count = parseInt(count1);
      if (type === "quality") {
        if (count >= 95) {
          return "green";
        } else if (count >= 85) {
          return "yellow";
        } else {
          return "#c41b1b";
        }
      } else if (type === "execution") {
        if (diff <= 5) {
          return "green";
        } else if (diff <= 15) {
          return "yellow";
        } else {
          return "#c41b1b";
        }
      }
    },
    getColorForDefects(defectCount) {
      if (defectCount === 0) {
        return "green";
      } else if (defectCount < 5) {
        return "#a5f3a5";
      } else if (defectCount < 10) {
        return "yellow";
      } else {
        return "#c41b1b";
      }
    },
    loadGanttOptionTemplate() {
      return {
        chart: {
          backgroundColor: null,
          spacingLeft: 10,
          spacingBottom: 20,
          spacingTop: 20,
          events: {
            render: (e) => {},
          },
        },
        title: {
          text: "Project Plan",
        },
        yAxis: {
          type: "category",
          categories: ["Planned", "Actual"],
          max: 1,
          visible: true,
        },
        credits: false,
        xAxis: [
          {
            type: "datetime",
            tickInterval: 1000 * 60 * 60 * 24 * 7,
            fill: "blue",
            style: {
              fill: "blue",
            },
            labels: {
              style: {
                "font-size": "10px",
              },
              format: "{value:%Y-%m-%d}",
              rotation: 30,
              borderWidth: 0,
            },
          },
          {
            fill: "blue",
          },
        ],
        tooltip: {
          xDateFormat: "%a %b %d",
        },
        plotOptions: {
          series: {
            animation: false, // Do not animate dependency connectors
            dragDrop: {
              draggableX: true,
              draggableY: false,
              dragMinY: 0,
              dragMaxY: 2,
              dragPrecisionX: this.day / 3, // Snap to eight hours
            },
            dataLabels: {
              enabled: true,
              text: {
                style: {
                  color: "#fff !important",
                  fill: "#fff !important",
                },
              },
              // format: '{point.name} {point.completed.amount} %',
              formatter: function() {
                if (this.point.completed) {
                  let val = parseInt(this.point.completed.amount * 100);
                  return this.point.name + " " + val + "%";
                } else {
                  return this.point.name;
                }
              },
              style: {
                color: "#fff !important",
                fill: "#fff !important",
                cursor: "default",
                pointerEvents: "none",
                textOutline: "transparent",
              },
            },
          },
        },
        series: [],
      };
    },
    toggleClassMethod(class1,class2){
       let tempelem=document.querySelector('.'+class1);
           let tempelem1=document.querySelector('.'+class2);
           tempelem.parentElement.classList.add('selectedDetails')
          if(tempelem.classList.contains('activeDetails')){
            tempelem.classList.remove('activeDetails');
            tempelem1.classList.add('activeDetails');
           tempelem.classList.remove(class1);
           tempelem.classList.add(class2);
           tempelem1.classList.remove(class2);
           tempelem1.classList.add(class1);
          }
          else{
            tempelem.classList.add('activeDetails');
            tempelem1.classList.remove('activeDetails');
          tempelem.classList.remove(class2);
          tempelem.classList.add(class1);
          tempelem1.classList.remove(class1);
          tempelem1.classList.add(class2);
          }
    },

    scrollToTargetAdjusted(elem) {
      debugger;
      var custElem=document.querySelector('.custDetails');
      var topPos = custElem.offsetTop;
      var element = document.querySelector(elem);
      element.scrollTop = "700";
      
  },

    displayDetails(type){
      let selectedDetailsElement=document.querySelector('.selectedDetails');
      if(selectedDetailsElement){
        selectedDetailsElement.classList.remove('selectedDetails');
      }
      let displayElement=document.querySelector('.'+type);
      if(displayElement){
          this.scrollToTargetAdjusted('.'+type);
         // displayElement.scrollIntoView(true);
         // displayElement.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
          if(type==="custDetails"){
          this.toggleClassMethod('defaultCustDetails','activeCustDetails');
        }
        else if(type==="prodImageDetails"){
          this.toggleClassMethod('defaultProdDetails','activeProdDetails');
        }
         else if(type==="featureDetails"){
          this.toggleClassMethod('defaultFeatureDetails','activeFeatureDetails');
        }
         else if(type==="usecaseDetails"){
          this.toggleClassMethod('defaultUsecaseDetails','activeUsecaseDetails');
        }
      }
       displayElement.scrollIntoView(true);
      event.preventDefault();
      event.stopPropagation();
    },

    loadGroupedBarChartOptions(){
      return {
        chart: {
          type: "column",
        },
        title: {
          style: {
            color: "#264991",
          },
          text: "",
        },
        credits:false,
        plotOptions: {
          series: {
            grouping: true,
            borderWidth: 0,
          },
          column: {
            dataLabels: {
              enabled: true,
              style: {
                textOutline: "transparent",
              },
            },
          },
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          shared: true,
          headerFormat:
            '<span style="font-size: 12px">{point.point.name}</span><br/>',
          pointFormat:
            '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
        },
        xAxis: {
          type: "category",
          categories: [],
        },
        yAxis: [
          {
            showFirstLabel: false,
          },
        ],
        series: [
          {
            color: "blue",
            pointPlacement: -0.2,
            dataLabels: [
              {
                enabled: true,
                style: {
                  fontSize: "12px",
                },
              },
            ],
            linkedTo: "main",
            data: [],
            name: "Executed",
          },
          {
            name: "planned",
            id: "main",
            dataLabels: [
              {
                enabled: true,
                style: {
                  fontSize: "12px",
                },
              },
            ],
            data: [],
          },
        ],
      }
    },

    loadPieChartOptions() {
      return {
        title: {
          text: "chart",
        },
        chart: {
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
        colors: [],
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
      };
    },
    loadDefectsDetails() {
      let self = this;
      self.componentOptions = {};

      let smuDetails=this.custObj.smuDetails;
      
      let smuRels=Object.keys(smuDetails);
      let relPrs=[],prRevs=[],templist=[],temp="";
      let allRevs=[],allPrs=[];

      for(let k=0;k<smuRels.length;k++){
        relPrs=Object.keys(smuDetails[smuRels[k]]);
        for(let l=0;l<relPrs.length;l++){
          prRevs=Object.keys(smuDetails[smuRels[k]][relPrs[l]]);
          for(let m=0;m<prRevs.length;m++){
            if(smuDetails[smuRels[k]][relPrs[l]][prRevs[m]] != ""){
              temp=smuDetails[smuRels[k]][relPrs[l]][prRevs[m]].split(',');
              templist=templist.concat(temp);
            }
          }
        }
      }

    /**  code for grouped  column chart */
	   let chartList={};

     for(var k=0;k<smuRels.length;k++){
       relPrs=Object.keys(smuDetails[smuRels[k]]);
       allPrs=allPrs.concat(relPrs);
        allPrs=[...new Set(allPrs)];
      }

      for(var l=0;l<allPrs.length;l++){
        chartList[allPrs[l]]={}
      }

       for(var k=0;k<smuRels.length;k++){
         relPrs=Object.keys(smuDetails[smuRels[k]]);
         for(var ar=0;ar<relPrs.length;ar++){
           if(smuDetails[smuRels[k]][relPrs[ar]]){
             prRevs=Object.keys(smuDetails[smuRels[k]][relPrs[ar]]);
             console.log(prRevs);
             allRevs=allRevs.concat(prRevs);
             allRevs=[...new Set(allRevs)];
             }
             }
             }
        
        for(var k=0;k<smuRels.length;k++){
	 for(var l=0;l<allPrs.length;l++){
	 if(smuDetails[smuRels[k]][allPrs[l]]){
	   for(var re=0;re<allRevs.length;re++){
	     if(smuDetails[smuRels[k]][allPrs[l]][allRevs[re]]){
		   chartList[allPrs[l]][allRevs[re]]=[];
		   chartList[allPrs[l]][allRevs[re]]=smuDetails[smuRels[k]][allPrs[l]][allRevs[re]].split(',');
		  }
	  	}
	  }
  	}
	}
      
    let result={};for(var r=0;r<allRevs.length;r++)
   { 
     result[allRevs[r]]=[]; 
    for(var pl=0;pl<allPrs.length;pl++)
    { 
      if(chartList[allPrs[pl]][allRevs[r]]) 
    { 
      result[allRevs[r]].push(chartList[allPrs[pl]][allRevs[r]].length)}
    else{
      result[allRevs[r]].push(0)
      } 
      }
      }
      

      debugger;
      let smulist=[...new Set(templist)];
      console.log('SMU'+smulist);

      let revSMUChartOptions=this.loadGroupedBarChartOptions();
      revSMUChartOptions.xAxis.categories=allPrs;
      revSMUChartOptions.title.text="SMU Count"
      let smuChartData=[];
      let obj={};
      Object.entries(result).forEach(([key, value]) =>{
        obj={};
        obj['name']=key;
        obj['data']=value;
        obj['stack']=key;
        smuChartData.push(obj);
      });

      revSMUChartOptions.series=smuChartData;
      this.revSMUChartOptions={...revSMUChartOptions}

      self.componentOptions = this.loadPieChartOptions();
      self.componentOptions.title.text = "Component";

      self.statusOptions = {};
      self.statusOptions = this.loadPieChartOptions();
      self.statusOptions.title.text = "Status";

      self.productOptions = this.loadPieChartOptions();
      self.productOptions.title.text = "Product";

      testcaseService.loadSmuDetails(smulist).then(
        (data) => {
          let components=[],products=[],status=[];
            let smuDetailsArray={ components :{},products:{},status:{}};
          if (data) {
            debugger;
             for(let s=0;s<data.length;s++){
              if(data[s])
              if(components.indexOf(data[s].component)<0){
                components.push(data[s].component);
                smuDetailsArray.components[data[s].component]=[];
                smuDetailsArray.components[data[s].component].push(data[s].defect_id);
              }
              else{
                smuDetailsArray.components[data[s].component].push(data[s].defect_id);
              }

              if(products.indexOf(data[s].product)<0){
                products.push(data[s].product);
                smuDetailsArray.products[data[s].product]=[];
                smuDetailsArray.products[data[s].product].push(data[s].defect_id);
              }
              else{
                smuDetailsArray.products[data[s].product].push(data[s].defect_id);
              }
            }
          }
           if (components.length > 0) {
              self.componentData = [];
              for (let a = 0; a < components.length; a++) {
                let obj = {};
                obj["name"] = components[a];
                obj["color"] = colors[a % colors.length];
                obj["y"] = smuDetailsArray.components[components[a]].length;
                self.componentData.push(obj);
              }
                 self.componentOptions.series[0].data = self.componentData;
             }

            if (products.length > 0) {
              self.productData = [];
              for (let p = 0; p < products.length; p++) {
                let obj = {};
                obj["name"] = products[p];
                obj["color"] = colors[p % colors.length];
                obj["y"] = smuDetailsArray.products[products[p]].length;
                self.productData.push(obj);
               }
                self.productOptions.series[0].data = self.productData;
               }

        },
        (error) => {
          console.log("error");
        }
      );
    },
    r_releaseClicked(rel) {
      this.selectedR_Release = rel;
      this.r_treeData = this.revReleases[rel];
    },
    loadReleases() {
      this.loading = true;
      this.loadingMessage = "Loading Customer releases...";
      let self1 = this;
      testcaseService.getReleasesList().then(
        (data) => {
          self1.selectedR_Release = Object.keys(self1.revReleases)[0];
          self1.r_treeData = self1.revReleases[self1.selectedR_Release];
          self1.releasesArray = data;
          let custs = document.querySelectorAll(".fmenuItem12");
          custs[0].click();
          debugger;
          let cArray = {},
            fArray = [];
          for (let k = 0; k < self1.releasesArray.length; k++) {
            if (
              Object.keys(cArray).indexOf(self1.releasesArray[k].customerName) <
              0
            ) {
              cArray[self1.releasesArray[k].customerName] = [];
              cArray[self1.releasesArray[k].customerName].push(
                self1.releasesArray[k].folder_name
              );
            } else {
              if (
                cArray[self1.releasesArray[k].customerName].indexOf(
                  self1.releasesArray[k].folder_name
                ) < 0
              ) {
                cArray[self1.releasesArray[k].customerName].push(
                  self1.releasesArray[k].folder_name
                );
              }
            }
          }
          for (let t = 0; t < Object.keys(cArray).length; t++) {
            for (let r = 0; r < Object.keys(self1.c_releases).length; r++) {
              if (Object.keys(cArray)[t] === Object.keys(self1.c_releases)[r]) {
                self1.c_releases[Object.keys(self1.c_releases)[r]] =
                  cArray[Object.keys(cArray)[t]];
                let rels = cArray[Object.keys(cArray)[t]];
                for (let s = 0; s < rels.length; s++) {
                  if (self1.releases.indexOf(rels[s]) < 0) {
                    self1.releases.push(rels[s]);
                  }
                }
              }
            }
          }
        },
        (error) => {}
      );
    },
    loadWeeklyReportByCustomerName(folderName, custName) {
      let self = this;
      testcaseService.getWeeklyReportByCustomer(folderName, custName).then(
        (data) => {
          self.loading = false;
          self.loadingMessage = "";
          self.weeklyReportFlag = "customerName";
          let data1 = self.sortByDateAsc(data);
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
    loadHeatMapOptions() {
      return {
        chart: {
          type: "heatmap",
          backgroundColor: null,
          marginTop: 40,
          marginBottom: 80,
          plotBorderWidth: 1,
          series: [
            {
              dataLabels: {
                enabled: true,
                color: "#000",
                formatter: function() {
                  return "<span>" + this.value + "</span>";
                },
              },
            },
          ],
          credits: {
            enabled: true,
          },
        },

        title: {
          text: "Trend",
        },

        xAxis: {
          categories: [],
          labels: {
            style: {
              fontSize: "8px",
            },
          },
          title: null,
        },

        yAxis: {
          categories: [],
          title: null,
          reversed: true,
        },

        accessibility: {
          point: {
            descriptionFormatter: (point) => {
              var ix = point.index + 1,
                xName = this.getPointCategoryName(point, "x"),
                yName = this.getPointCategoryName(point, "y"),
                val = point.value;
              return ix + ". " + xName + " " + yName + ", " + val + ".";
            },
          },
        },

        colorAxis: {
          min: 0,
        },

        legend: {
          enabled: false,
        },

        tooltip: {
          formatter: () => {},
        },

        series: [
          {
            name: "Project Summary",
            borderWidth: 1,
            borderColor: "#000",
            data: [
              [0, 0, 10],
              [0, 1, 19],
              [0, 2, 8],
              [0, 3, 24],
              [0, 4, 67],
              [1, 0, 92],
              [1, 1, 58],
              [1, 2, 78],
              [1, 3, 117],
              [1, 4, 48],
              [2, 0, 35],
              [2, 1, 15],
              [2, 2, 123],
              [2, 3, 64],
              [2, 4, 52],
              [3, 0, 72],
              [3, 1, 132],
              [3, 2, 114],
              [3, 3, 19],
              [3, 4, 16],
              [4, 0, 38],
              [4, 1, 5],
              [4, 2, 8],
              [4, 3, 117],
              [4, 4, 115],
              [5, 0, 88],
              [5, 1, 32],
              [5, 2, 12],
              [5, 3, 6],
              [5, 4, 120],
              [6, 0, 13],
              [6, 1, 44],
              [6, 2, 88],
              [6, 3, 98],
              [6, 4, 96],
              [7, 0, 31],
              [7, 1, 1],
              [7, 2, 82],
              [7, 3, 32],
              [7, 4, 30],
              [8, 0, 85],
              [8, 1, 97],
              [8, 2, 123],
              [8, 3, 64],
              [8, 4, 84],
              [9, 0, 47],
              [9, 1, 114],
              [9, 2, 31],
              [9, 3, 48],
              [9, 4, 91],
            ],
            dataLabels: {
              enabled: true,
              color: "#000",
              style: {
                color: "#000 !important",
                fill: "#000 !important",
                cursor: "default",
                pointerEvents: "none",
                textOutline: "transparent",
              },
            },
          },
        ],
      };
    },
    loadHeatMapOptionDetails(data) {
      let categories1 = [],
        categories2 = [],
        weekDates = [],
        categoryObj = {};
      let total = [],
        mhHave = [],
        cvtFound = [],
        cvtObserved = [],
        planned = [],
        actual = [],
        passed = [],
        failed = [],
        cvtTotal = [],
        executed = [],
        pending = [];
      let valueArray1 = [],
        valueArray2 = [],
        valueObj = [];
      // categories1=[ 'Planned','Executed', 'Quality', "Auto",'Defects','MH Defects'];
      categories1 = ["Planned", "Executed", "Quality", "Defects", "MH Defects"];
      categories2 = ["Planned", "Defects", "Found", "Observed", "MH Defects"];
      //  let categorynames1=['planned','executed', 'quality', "tc_automated",'cvtTotal','mhHave'];
      let categorynames1 = [
        "planned",
        "executed",
        "quality",
        "cvtTotal",
        "mhHave",
      ];
      let categorynames2 = [
        "plannedDDts",
        "cvtTotal",
        "cvtFound",
        "cvtObserved",
        "mhHave",
      ];

      for (let i = 0; i < data.length; i++) {
        categoryObj = {};
        weekDates.push(data[i].end_date.substring(0, 10));

        //  categoryObj["total"]=data[i].executed+data[i].pending;
        categoryObj["planned"] = {};
        categoryObj["planned"]["count"] = data[i].planned; //(data[i].executed+data[i].pending) != 0 ? parseInt((data[i].planned/(data[i].executed+data[i].pending))*100):0;
        categoryObj["planned"]["color"] = "#2094df"; //(data[i].executed+data[i].pending) != 0 ? parseInt((data[i].planned/(data[i].executed+data[i].pending))*100):0;

        categoryObj["plannedDDts"] = {};
        categoryObj["plannedDDts"]["count"] = data[i].planned; //(data[i].executed+data[i].pending) != 0 ? parseInt((data[i].planned/(data[i].executed+data[i].pending))*100):0;
        categoryObj["plannedDDts"]["color"] = "#2094df"; //(data[i].executed+data[i].pending) != 0 ? parseInt((data[i].planned/(data[i].executed+data[i].pending))*100):0;

        if (
          new Date(data[i].start_date) < new Date() ||
          new Date(data[i].end_date) < new Date()
        ) {
          categoryObj["executed"] = {};
          categoryObj["executed"]["count"] = data[i].executed; //(data[i].executed+data[i].pending) != 0 ? parseInt((data[i].executed/(data[i].executed+data[i].pending))*100):0;
          let executedcount =
            (data[i].executed / data[i].total_testcases) * 100;
          let plannedcount = (data[i].planned / data[i].total_testcases) * 100;
          let diff = plannedcount - executedcount;
          categoryObj["executed"]["color"] = this.getColorForPerc(
            data[i].executed,
            "execution",
            diff
          );

          categoryObj["quality"] = {};
          let qualityPerc =
            data[i].executed != 0 && data[i].executed != null
              ? parseInt((data[i].passed / data[i].executed) * 100)
              : 0;
          categoryObj["quality"]["count"] = qualityPerc;
          categoryObj["quality"]["color"] = this.getColorForPerc(
            qualityPerc,
            "quality",
            diff
          );

          let mhdefects =
            data[i].must_have_defects != null ? data[i].must_have_defects : 0;
          let observed =
            data[i].defects_observed != null ? data[i].defects_observed : 0;
          let found =
            data[i].defects_found_CVT != null ? data[i].defects_found_CVT : 0;

          categoryObj["cvtTotal"] = {};
          categoryObj["cvtTotal"]["count"] = observed + found;
          categoryObj["cvtTotal"]["color"] = this.getColorForDefects(
            observed + found
          );

          categoryObj["cvtFound"] = {};
          categoryObj["cvtFound"]["count"] = found;
          categoryObj["cvtFound"]["color"] = this.getColorForDefects(found);

          categoryObj["cvtObserved"] = {};
          categoryObj["cvtObserved"]["count"] = observed;
          categoryObj["cvtObserved"]["color"] = this.getColorForDefects(
            observed
          );

          categoryObj["mhHave"] = {};
          categoryObj["mhHave"]["count"] = mhdefects;
          categoryObj["mhHave"]["color"] = this.getColorForDefects(mhdefects);

          categoryObj["tc_automated"] = {};
          categoryObj["tc_automated"]["count"] = 0;
          categoryObj["tc_automated"]["color"] = "#2094df";
        } else {
          categoryObj["executed"] = {};
          categoryObj["executed"]["count"] = ""; //(data[i].executed+data[i].pending) != 0 ? parseInt((data[i].executed/(data[i].executed+data[i].pending))*100):0;
          categoryObj["executed"]["color"] = "#fff";

          categoryObj["quality"] = {};
          categoryObj["quality"]["count"] = "";
          categoryObj["quality"]["color"] = "#fff";

          categoryObj["cvtTotal"] = {};
          categoryObj["cvtTotal"]["count"] = "";
          categoryObj["cvtTotal"]["color"] = "#fff";

          categoryObj["cvtFound"] = {};
          categoryObj["cvtFound"]["count"] = "";
          categoryObj["cvtFound"]["color"] = "#fff";

          categoryObj["cvtObserved"] = {};
          categoryObj["cvtObserved"]["count"] = "";
          categoryObj["cvtObserved"]["color"] = "#fff";

          categoryObj["mhHave"] = {};
          categoryObj["mhHave"]["count"] = "";
          categoryObj["mhHave"]["color"] = "#fff";

          categoryObj["tc_automated"] = {};
          categoryObj["tc_automated"]["count"] = "";
          categoryObj["tc_automated"]["color"] = "#fff";
        }

        for (let k = 0; k < categorynames1.length; k++) {
          valueObj = {};
          valueObj["x"] = i;
          valueObj["y"] = k;
          valueObj["value"] = categoryObj[categorynames1[k]]["count"];
          valueObj["color"] = categoryObj[categorynames1[k]]["color"];
          valueArray1.push(valueObj);
        }
        for (let kl = 0; kl < categorynames2.length; kl++) {
          valueObj = {};
          valueObj["x"] = i;
          valueObj["y"] = kl;
          valueObj["value"] = categoryObj[categorynames2[kl]]["count"];
          valueObj["color"] = categoryObj[categorynames2[kl]]["color"];
          valueArray2.push(valueObj);
        }
      }

      let heatMapOptions1 = this.loadHeatMapOptions();
      let heatMapOptions2 = this.loadHeatMapOptions();

      heatMapOptions1.title.text = "Execution Trend";
      heatMapOptions2.title.text = "Defects Trend";
      heatMapOptions1.xAxis.categories = weekDates;
      heatMapOptions2.xAxis.categories = weekDates;

      heatMapOptions1.yAxis.categories = [];
      heatMapOptions2.yAxis.categories = [];
      heatMapOptions1.yAxis.categories = categories1;
      heatMapOptions2.yAxis.categories = categories2;

      heatMapOptions1.series[0].data = valueArray1;
      heatMapOptions2.series[0].data = valueArray2;

      this.heatMapOptions1 = heatMapOptions1;
      this.heatMapOptions2 = heatMapOptions2;
    },
    loadWeeklyReportDetails(data) {
      let self = this;
      self.weeklyReport = data;
      self.selectedWeekData = data[0];
      self.selectedWeekData1 = data[0];
      //  self.loadHeatMapOptionForUsers(data);
      self.loadHeatMapOptionDetails(data);
      let categories = [],
        mhHave = [],
        cvtFound = [],
        cvtObserved = [],
        planned = [],
        actual = [],
        passed = [],
        failed = [],
        cvtTotal = [],
        plannedDdts = [];
      let mhHaveCount = 0,
        cvtFoundCount = 0,
        cvtObservedCount = 0,
        plannedCount = 0,
        actualCount = 0,
        passedCount = 0,
        failedCount = 0,
        cvtTotalCount = 0,
        plannedDdtsCount = [];
      for (let i = 0; i < data.length; i++) {
        categories.push(data[i].end_date.substring(0, 10));
        mhHaveCount =
          data[i].must_have_defects != "null"
            ? data[i].must_have_defects
            : null;
        cvtFoundCount =
          data[i].defects_found_CVT != "null"
            ? data[i].defects_found_CVT
            : null;
        plannedDdtsCount =
          data[i].planned_ddts_count != "null"
            ? data[i].planned_ddts_count
            : null;
        cvtObservedCount =
          data[i].defects_observed != "null" ? data[i].defects_observed : null;
        if (
          data[i].defects_found_CVT === "null" ||
          data[i].defects_observed === "null"
        ) {
          cvtTotalCount = null;
        } else {
          cvtTotalCount =
            data[i].defects_found_CVT + data[i].defects_observed != 0
              ? data[i].defects_found_CVT + data[i].defects_observed
              : null;
        }
        mhHave.push(mhHaveCount);

        cvtTotal.push(cvtTotalCount);
        cvtFound.push(cvtFoundCount);
        plannedDdts.push(plannedDdtsCount);
        cvtObserved.push(cvtObservedCount);
        self.weeklyReport[i]["cvtTotal"] = cvtTotalCount;
        plannedCount = data[i].planned;
        actualCount = data[i].executed;
        passedCount = data[i].passed;
        failedCount = data[i].failed;
        planned.push(plannedCount);
        actual.push(actualCount);
        passed.push(passedCount);
        failed.push(failedCount);
      }
      let weeklyReportData = [
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
      let weeklyReportData1 = [
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
      this.cvtOptions.xAxis.categories = categories;
      this.cvtOptions.series = weeklyReportData;
      this.splineOptions.xAxis.categories = categories;
      this.splineOptions.series = weeklyReportData1;
    },
    getColorClassForQuality(count1) {
      let count = parseInt(count1);
      if (count >= 95) {
        return "qualityGreen";
      } else if (count >= 85) {
        return "qualityYellow";
      } else {
        return "qualityRed";
      }
    },
    getColorForExecution(diff) {
      if (diff <= 5) {
        return "qualityGreen";
      } else if (diff <= 15) {
        return "qualityYellow";
      } else {
        return "qualityRed";
      }
    },
    loadSummaryButtonDetails(type, id) {
      let self = this;

      testcaseService.fetchSummaryBtnDetails(type, id).then(
        (data) => {
          self.summaryButtonsDetails = data;
          let executionSummaryData = [
            {
              name: "passed",
              color: "#76B947",
              y: self.summaryButtonsDetails.testcasesPassed.count,
            },
            {
              name: "failed",
              color: "#F51720",
              y: self.summaryButtonsDetails.testcasesFailed.count,
            },
            {
              name: "pending",
              color: "#2094df",
              y: self.summaryButtonsDetails.testcasesPending.count,
            },
          ];
          self.summaryOptions.series[0].data = executionSummaryData;
          self.executionSummaryOption = self.summaryOptions;
        },
        (error) => {
          self.loading = false;
          self.loadingMessage = "";
          self.showErrorModal = true;
          self.modalErrorMessage =
            "Error while summary button Details, Please try again later";
        }
      );
    },

    checkActiveBtn(fname) {
      if (
        this.inactiveBtns.indexOf(fname) < 0 &&
        this.selectedCustomer === ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    relClicked(e, fname) {
      this.showCustomerFlag = false;
      if (this.selectedCustomer === "Google") {
        this.selectedFolderName = fname;
        this.loadGanttChart(fname);
        this.loadSummaryButtonDetails("folder", fname);
        this.loadWeeklyReportByCustomerName(fname, "Google");
        //myTree.refresh(treeData)
      }
    },
    datediff(first, second) {
      // Take the difference between the dates and divide by milliseconds per day.
      // Round to nearest whole number to deal with DST.
      return Math.round((second - first) / (1000 * 60 * 60 * 24));
    },
    getExampleCustObj() {
      debugger;
      return customers;
    },
    customerClicked(e, custName) {
      this.custObj = customer_list[0]; //default behaviour with first obj
      for (let k = 0; k < customer_list.length; k++) {
        if (customer_list[k].name === custName) {
          this.custObj = customer_list[k];
        }
      }
      debugger;
       this.platformRoleReleaseDetails={...this.custObj.platformRoleReleaseDetails};
     
      this.showCustomerFlag = true;
      let platformBubbleChartOptions = JSON.parse(JSON.stringify(this.packedBubbleOptions));
     let platformSeries = [];
      let platforms = Object.keys(this.custObj.platformDetails);
      for (let p = 0; p < platforms.length; p++) {
        if (
          this.custObj.platformDetails[platforms[p]].chassisList != "" ||
          this.custObj.platformDetails[platforms[p]].cardList != ""
        ) {
          let obj = {};
          obj["name"] = platforms[p];
          obj["color"] = this.platformColors[platforms[p]];
          obj["data"] = [];
          let tempChassisList = this.custObj.platformDetails[platforms[p]]
            .chassisList;
          let chassisList =
            tempChassisList != "" ? tempChassisList.split(",") : [];
          let tempCardList = this.custObj.platformDetails[platforms[p]]
            .chassisList;
          let cardList = tempCardList != "" ? tempCardList.split(",") : [];
          for (let k = 0; k < chassisList.length; k++) {
            obj.data.push({
              name: chassisList[k],
              color: this.platformListColor["chassisList"],
              value: 300,
            });
          }
          for (let k1 = 0; k1 < cardList.length; k1++) {
            obj.data.push({
              name: cardList[k1],
              color: this.platformListColor["cardList"],
              value: 300,
            });
          }
          platformSeries.push(obj);
        }
      }
      platformBubbleChartOptions.series = platformSeries;
      this.platformBubbleChartOptions = { ...platformBubbleChartOptions };
      this.platformBubbleChartOptions.title.text="Platforms";
      let rolesBubbleChartOptions = JSON.parse(JSON.stringify(this.packedBubbleOptions));

      /** code to remove empty chassis list from roles*/
      let tempList = [];
      let prList = [];
      let rolesSummaryList = [];
      let roleDetails = { ...this.custObj.roleDetails };
      let roles = Object.keys(this.custObj.roleDetails);
      let obj = {},
        obj1 = {},
        obj2 = {},
        rls = [],
        clist = [];

      for (let kt1 = 0; kt1 < roles.length; kt1++) {
        prList = Object.keys(this.custObj.roleDetails[roles[kt1]]);
        for (let m = 0; m < prList.length; m++) {
          if (
            this.custObj.roleDetails[roles[kt1]][prList[m]].chassisList === ""
          ) {
            delete roleDetails[roles[kt1]][prList[m]];
          }
        }
        tempList = Object.keys(roleDetails[roles[kt1]]);
        if (tempList.length === 0) {
          delete roleDetails[roles[kt1]];
        }
      }

      let prs = Object.keys(roleDetails);
      for (let s1 = 0; s1 < prs.length; s1++) {
         obj1 = {};
         obj1["name"] = prs[s1];
         obj1["data"] = [];
         rls = Object.keys(roleDetails[prs[s1]]);
        for (let s2 = 0; s2 < rls.length; s2++) {
            obj2 = {};
            obj2["name"] = rls[s2];
            obj2["value"] = 200;
            obj1["data"].push(obj2);
        }
          rolesSummaryList.push(obj1);
       }
      rolesBubbleChartOptions.title.text="Roles"
      rolesBubbleChartOptions.series = rolesSummaryList;
      this.rolesBubbleChartOptions = { ...rolesBubbleChartOptions };
      this.rolesBubbleChartOptions.title.text="Roles";

      this.loadDefectsDetails();

      let imageBubbleChartOptions = JSON.parse(JSON.stringify(this.packedBubbleOptions));

      let imageDetails = this.custObj.prodImages;
      let revlist = [];
      let imageSummaryList = [];

      let prls = Object.keys(imageDetails);
      for (let i1 = 0; i1 < prls.length; i1++) {
        rls = Object.keys(imageDetails[prls[i1]]);
        for (let i2 = 0; i2 < rls.length; i2++) {
          obj1 = {};
          obj1["name"] = prls[i1] + "_" + rls[i2];
          obj1["data"] = [];
          revlist = imageDetails[prls[i1]][rls[i2]].revs.split(",");
          for (let i3 = 0; i3 < revlist.length; i3++) {
            obj2 = {};
            obj2["name"] = revlist[i3];
            obj2["value"] = 200;
            obj1["data"].push(obj2);
          }
          imageSummaryList.push(obj1);
        }
      }

      imageBubbleChartOptions.series = imageSummaryList;
      this.imageBubbleChartOptions = { ...imageBubbleChartOptions };
      this.imageBubbleChartOptions.title.text="Prod Images";
      let opticsChartOptions = { ...this.treeviewChartOptions };
      let opticsList = [],
        tempOpsList = [];
      let colors = ["#12a5b8", "#3d41b8", "#3d95b8", "#9fb83d", "#B68D40"];
      let opticsDetails = this.custObj.opticDetails;
      let optPrs = Object.keys(opticsDetails);
      let colorAxis={dataClasses:[]};
       for (let o1 = 0; o1 < optPrs.length; o1++) {
            opticsList.push({id:'platform'+o1,name:optPrs[o1],color:colors[(o1 + 1) % colors.length]})
       }
        for (let o_1 = 0; o_1 < optPrs.length; o_1++) {
            tempOpsList =
          opticsDetails[optPrs[o_1]].optics !== ""
            ? opticsDetails[optPrs[o_1]].optics.split(",")
            : [];
            for (let o2 = 0; o2 < tempOpsList.length; o2++) {
          obj = {};
          obj["name"] = tempOpsList[o2];
          (obj["value"] = 3+o_1),
          (obj["parent"]='platform'+o_1),
          opticsList.push(obj);
        }
       }

    /*  for (let o1 = 0; o1 < optPrs.length; o1++) {
        tempOpsList =
          opticsDetails[optPrs[o1]].optics !== ""
            ? opticsDetails[optPrs[o1]].optics.split(",")
            : [];
        
        //colorAxis.dataClasses.push({color:colors[(o1 + 1) % colors.length],name:optPrs[o1]});
        for (let o2 = 0; o2 < tempOpsList.length; o2++) {
          obj = {};
          obj["name"] = tempOpsList[o2];
          (obj["value"] = 3),
            (obj["x"] = o1 + 1),
            (obj["y"] = o2 + 1),
            (obj["color"] = colors[(o1 + 1) % colors.length]);
          opticsList.push(obj);
        }
      }*/
     // opticsChartOptions.colorAxis={...colorAxis};
      opticsChartOptions.series[0].data = opticsList;
      this.opticsChartOptions = { ...opticsChartOptions };
      let featureId=0,platformId=0;
      let featureDetails = this.custObj.featureDetails;
      let ftList = Object.keys(featureDetails);
    /*  let superTreeDataList=[];
      let tempTreeList=[];
      let tempf1=0,y=1;
    
       
        tempTreeList.push({"id":1,father:null,"text_1":"Features","text_2":20,"color":"#26646b"});
       for (let f1 = 0; f1 < ftList.length; f1++) {
         obj = {};
         obj["id"]=tempTreeList.length+1;
         obj["text_1"] = ftList[f1];
         obj["text_2"] = 10;
        obj["father"] = 1;
        obj["color"]="#8BC34A";
         featureId=tempTreeList.length+1;
        tempTreeList.push(obj);
        let ftPrs = Object.keys(featureDetails[ftList[f1]]);
        for (let f2 = 0; f2 < ftPrs.length; f2++) {
          obj1 = {};
          obj1["id"] = tempTreeList.length+1;
          obj1["text_1"] = ftPrs[f2];
          obj1["text_2"] = 10;
          obj1["father"] = featureId;
          obj1["color"] = "#00BCD4";
          platformId = tempTreeList.length+1;
           tempTreeList.push(obj1);
            let prRoles =
            featureDetails[ftList[f1]][ftPrs[f2]].roles != ""
              ? featureDetails[ftList[f1]][ftPrs[f2]].roles.split(",")
              : [];
          for (let f3 = 0; f3 < prRoles.length; f3++) {
             obj2 = {};
             obj2["id"] = tempTreeList.length+1;
              obj2["text_1"] = prRoles[f3];
            obj2["text_2"] = 10;
            obj2["father"] = platformId;
            obj2["color"] = "#FFC107";
            tempTreeList.push(obj2);
          }
        }
       }
       superTreeDataList.push(tempTreeList);
     
      console.log(superTreeDataList)
       this.superTreeDataList=[...superTreeDataList];
      */
      // seperate tree code

      let treeDataList = {

      };
        for (let f1 = 0; f1 < ftList.length; f1++) {
        treeDataList["treeData" + f1] = [];
        obj = {};
        (obj["id"] = treeDataList["treeData" + f1].length + 1),
          (obj["text_1"] = ftList[f1]);
        obj["text_2"] = 10;
        obj["father"] = null;
        obj["color"] = "#8BC34A";
        featureId = treeDataList["treeData" + f1].length + 1;
        treeDataList["treeData" + f1].push(obj);
        let ftPrs = Object.keys(featureDetails[ftList[f1]]);
        for (let f2 = 0; f2 < ftPrs.length; f2++) {
          obj1 = {};
          (obj1["id"] = treeDataList["treeData" + f1].length + 1),
            (obj1["text_1"] = ftPrs[f2]);
          obj1["text_2"] = 10;
          obj1["father"] = featureId;
          obj1["color"] = "#00BCD4";
          platformId = treeDataList["treeData" + f1].length + 1;
          treeDataList["treeData" + f1].push(obj1);

          let prRoles =
            featureDetails[ftList[f1]][ftPrs[f2]].roles != ""
              ? featureDetails[ftList[f1]][ftPrs[f2]].roles.split(",")
              : [];
          for (let f3 = 0; f3 < prRoles.length; f3++) {
            obj2 = {};
            (obj2["id"] = treeDataList["treeData" + f1].length + 1),
              (obj2["text_1"] = prRoles[f3]);
            obj2["text_2"] = 10;
            obj2["father"] = platformId;
            obj2["color"] = "#FFC107";
            treeDataList["treeData" + f1].push(obj2);
          }
        }
      }
      console.log(JSON.stringify(treeDataList));
      this.treeDataList = { ...treeDataList };
      let treeDataArray=[];
      let treeKeys=Object.keys(treeDataList);
      for(let kd=0;kd<treeKeys.length;kd++){
        treeDataArray.push(treeDataList[treeKeys[kd]]);
      }
      this.treeDataArray=[...treeDataArray];
      
     
     // this.treeData = JSON.stringify(this.tree1Data);
      let clList = document.querySelectorAll(".activeCustomer");
      for (let m = 0; m < clList.length; m++) {
        clList[m].classList.remove("activeCustomer");
      }
      e.currentTarget.classList.add("activeCustomer");
      this.selectedCustomer = e.currentTarget.innerText;

      let fList = document.querySelectorAll(".fmenuItem");
      for (let n = 0; n < fList.length; n++) {
        let fname = fList[n].innerText;
        if (this.c_releases[e.currentTarget.innerText].indexOf(fname) > -1) {
          if (fList[n].classList.contains("fmenuItemInactive")) {
            fList[n].classList.remove("fmenuItemInactive");
            let ind = this.inactiveBtns.indexOf(fname);
            if (ind >= 0) this.inactiveBtns.splice(ind, 1);
          }
        } else {
          if (!fList[n].classList.contains("fmenuItemInactive")) {
            fList[n].classList.add("fmenuItemInactive");
            this.inactiveBtns.push(fname);
          }
        }
      }
      this.showCustomerNotes = true;

     
      e.preventDefault();
    },
    compareDates(rdata) {
      let startDate = new Date(rdata.start_date);
      let fcsDate = new Date(rdata.fcs_date);
      let tcfaDate = new Date(rdata.tcfa_date);
      let retestStartDate = new Date(rdata.retest_start_date);
      let retestEndDate = new Date(rdata.retest_end_date);
      let longevityStartDate = new Date(rdata.longevity_start_date);
      let longevityEndDate = new Date(rdata.longevity_start_date);

      this.fcsStatus = "";
      let currentDate = new Date();

      if (currentDate > fcsDate) {
        this.fcsStatus = "FCS Completed";
      } else {
        let diff = this.datediff(currentDate, fcsDate);
        this.fcsStatus = diff + " days left for FCS";
      }

      if (currentDate > startDate) {
        if (currentDate < retestStartDate) {
          this.currentPhase = "Execution In Progress";
          document.querySelector(".currentPhaseStatus").innerHTML =
            '<div class="pendingIcon"></div>';
          this.nextmilestone = "Retest";
          this.nextmilestoneStatus =
            this.datediff(currentDate, retestStartDate) + " days left for TCFA";
        }
        if (currentDate > retestStartDate && currentDate < retestEndDate) {
          this.currentPhase = "Retest Started";
          this.nextmilestone = "Longevity";
          document.querySelector(".currentPhaseStatus").innerHTML =
            '<div class="inProgressIcon"></div>';
          this.nextmilestoneStatus =
            this.datediff(currentDate, longevityStartDate) +
            " days left for Longevity";
        } else if (
          currentDate > retestEndDate &&
          currentDate < longevityStartDate
        ) {
          this.currentPhase = "Retest Completed";
          this.nextmilestone = "Longevity";
          document.querySelector(".currentPhaseStatus").innerHTML =
            '<div class="inProgressIcon"></div>';
          this.nextmilestoneStatus =
            this.datediff(currentDate, longevityStartDate) +
            " days left for Longevity";
        } else if (
          currentDate > longevityStartDate &&
          currentDate < longevityEndDate
        ) {
          this.currentPhase = "Longevity Started";
          this.nextmilestone = "TCFA";
          document.querySelector(".currentPhaseStatus").innerHTML =
            '<div class="inProgressIcon"></div>';
          this.nextmilestoneStatus =
            this.datediff(currentDate, tcfaDate) + " days left for TCFA";
        } else if (currentDate > longevityEndDate && currentDate < tcfaDate) {
          this.currentPhase = "Longevity Completed";
          this.nextmilestone = "TCFA";
          document.querySelector(".currentPhaseStatus").innerHTML =
            '<div class="inProgressIcon"></div>';
          this.nextmilestoneStatus =
            this.datediff(currentDate, tcfaDate) + " days left for TCFA";
        } else if (currentDate > tcfaDate && currentDate < fcsDate) {
          this.currentPhase = "Completed";
          this.nextmilestone = "";
          document.querySelector(".currentPhaseStatus").innerHTML =
            '<div class="completedIcon"></div>';
          this.nextmilestoneStatus = "";
        } else if (currentDate > fcsDate) {
          this.currentPhase = "Completed";
          this.nextmilestone = "";
          document.querySelector(".currentPhaseStatus").innerHTML =
            '<div class="completedIcon"></div>';
          this.nextmilestoneStatus = "";
        }
      } else {
        document.querySelector(".currentPhaseStatus").innerHTML =
          '<div class="pendingIcon"></div>';
        this.currentPhase = "Not Started"; //icons inprogress, completed, pending(not started)
      }
    },
    loadGanttChart(fname) {
      let self = this;
      testcaseService.getReleasesList().then(
        (data) => {
          let relDetails = {},
            relNotCopied = true;
          for (let m = 0; m < data.length; m++) {
            if (relNotCopied) {
              if (data[m].folder_name === fname) {
                relNotCopied = false;
                relDetails = { ...data[m] };
              }
            }
          }

          self.releaseDetails = relDetails;
          let rdata = { ...self.releaseDetails };
          rdata.actual_start_date = rdata.actual_start_date
            ? rdata.actual_start_date
            : rdata.start_date;
          rdata.actual_fcs_date = rdata.actual_fcs_date
            ? rdata.actual_fcs_date
            : rdata.fcs_date;
          rdata.actual_tcfa_date = rdata.actual_tcfa_date
            ? rdata.actual_tcfa_date
            : rdata.tcfa_date;
          rdata.actual_retest_start_date = rdata.actual_retest_start_date
            ? rdata.actual_retest_start_date
            : rdata.retest_start_date;
          rdata.actual_retest_end_date = rdata.actual_retest_end_date
            ? rdata.actual_retest_end_date
            : rdata.retest_end_date;
          rdata.actual_longevity_start_date = rdata.actual_longevity_start_date
            ? rdata.actual_longevity_start_date
            : rdata.longevity_start_date;
          rdata.actual_longevity_end_date = rdata.actual_longevity_end_date
            ? rdata.actual_longevity_end_date
            : rdata.longevity_end_date;
          rdata.actual_giso_date = rdata.actual_giso_date
            ? rdata.actual_giso_date
            : rdata.giso_date;
          rdata.actual_eotr_date = rdata.actual_eotr_date
            ? rdata.actual_eotr_date
            : rdata.eotr_date;

          //let revents=[{"event_name":"test","event_start_date":rdata.start_date,"event_end_date":rdata.fcs_date,"event_id":12}]
          // let revents=data[1];
          self.currentPhase = "";
          self.compareDates(rdata);
          let planned_start_date = {
            year: new Date(rdata.start_date).getFullYear(),
            month: new Date(rdata.start_date).getMonth(),
            date: new Date(rdata.start_date).getDate(),
          };
          let planned_fcs_date = {
            year: new Date(rdata.fcs_date).getFullYear(),
            month: new Date(rdata.fcs_date).getMonth(),
            date: new Date(rdata.fcs_date).getDate(),
          };
          let planned_tcfa_date = {
            year: new Date(rdata.tcfa_date).getFullYear(),
            month: new Date(rdata.tcfa_date).getMonth(),
            date: new Date(rdata.tcfa_date).getDate(),
          };
          let planned_retest_start_date = {
            year: new Date(rdata.retest_start_date).getFullYear(),
            month: new Date(rdata.retest_start_date).getMonth(),
            date: new Date(rdata.retest_start_date).getDate(),
          };
          let planned_retest_end_date = {
            year: new Date(rdata.retest_end_date).getFullYear(),
            month: new Date(rdata.retest_end_date).getMonth(),
            date: new Date(rdata.retest_end_date).getDate(),
          };
          let planned_longevity_start_date = {
            year: new Date(rdata.longevity_start_date).getFullYear(),
            month: new Date(rdata.longevity_start_date).getMonth(),
            date: new Date(rdata.longevity_start_date).getDate(),
          };
          let planned_longevity_end_date = {
            year: new Date(rdata.longevity_end_date).getFullYear(),
            month: new Date(rdata.longevity_end_date).getMonth(),
            date: new Date(rdata.longevity_end_date).getDate(),
          };

          let planned_giso_date = {
            year: new Date(rdata.giso_date).getFullYear(),
            month: new Date(rdata.giso_date).getMonth(),
            date: new Date(rdata.giso_date).getDate(),
          };

          let planned_eotr_date = {
            year: new Date(rdata.eotr_date).getFullYear(),
            month: new Date(rdata.eotr_date).getMonth(),
            date: new Date(rdata.eotr_date).getDate(),
          };

          let xdate = rdata.longevity_end_date;
          let sanityStartDate = new Date(
            new Date(xdate).setDate(new Date(xdate).getDate() + 1)
          );

          let xdate1 = rdata.fcs_date;
          let sanityEndDate = new Date(
            new Date(xdate1).setDate(new Date(xdate1).getDate() - 1)
          );

          let planned_sanity_start_date = {
            year: new Date(sanityStartDate).getFullYear(),
            month: new Date(sanityStartDate).getMonth(),
            date: new Date(sanityStartDate).getDate(),
          };

          let planned_sanity_end_date = {
            year: new Date(sanityEndDate).getFullYear(),
            month: new Date(sanityEndDate).getMonth(),
            date: new Date(sanityEndDate).getDate(),
          };

          let xdate2 = rdata.fcs_date;
          let fcsRegStartDate = new Date(
            new Date(xdate2).setDate(new Date(xdate2).getDate() + 1)
          );

          let xdate3 = rdata.giso_date;
          let fcsRegEndDate = new Date(
            new Date(xdate3).setDate(new Date(xdate3).getDate() - 1)
          );

          let planned_fcs_regression_start_date = {
            year: new Date(fcsRegStartDate).getFullYear(),
            month: new Date(fcsRegStartDate).getMonth(),
            date: new Date(fcsRegStartDate).getDate(),
          };

          let planned_fcs_regression_end_date = {
            year: new Date(fcsRegEndDate).getFullYear(),
            month: new Date(fcsRegEndDate).getMonth(),
            date: new Date(fcsRegEndDate).getDate(),
          };

          let xdate4 = rdata.giso_date;
          let gisoStartDate = new Date(
            new Date(xdate4).setDate(new Date(xdate4).getDate() + 1)
          );

          let xdate5 = rdata.eotr_date;
          let gisoEndDate = new Date(
            new Date(xdate5).setDate(new Date(xdate5).getDate() - 1)
          );

          let planned_eotr_start_date = {
            year: new Date(gisoStartDate).getFullYear(),
            month: new Date(gisoStartDate).getMonth(),
            date: new Date(gisoStartDate).getDate(),
          };

          let planned_eotr_end_date = {
            year: new Date(gisoEndDate).getFullYear(),
            month: new Date(gisoEndDate).getMonth(),
            date: new Date(gisoEndDate).getDate(),
          };

          let actual_start_date = {
            year: rdata.actual_start_date
              ? new Date(rdata.actual_start_date).getFullYear()
              : new Date(rdata.start_date).getFullYear(),
            month: rdata.actual_start_date
              ? new Date(rdata.actual_start_date).getMonth()
              : new Date(rdata.start_date).getMonth(),
            date: rdata.actual_start_date
              ? new Date(rdata.actual_start_date).getDate()
              : new Date(rdata.start_date).getDate(),
          };
          let actual_fcs_date = {
            year: rdata.actual_fcs_date
              ? new Date(rdata.actual_fcs_date).getFullYear()
              : new Date(rdata.fcs_date).getFullYear(),
            month: rdata.actual_fcs_date
              ? new Date(rdata.actual_fcs_date).getMonth()
              : new Date(rdata.fcs_date).getMonth(),
            date: rdata.actual_fcs_date
              ? new Date(rdata.actual_fcs_date).getDate()
              : new Date(rdata.fcs_date).getDate(),
          };
          let actual_tcfa_date = {
            year: rdata.actual_tcfa_date
              ? new Date(rdata.actual_tcfa_date).getFullYear()
              : new Date(rdata.tcfa_date).getFullYear(),
            month: new Date(rdata.actual_tcfa_date)
              ? new Date(rdata.actual_tcfa_date).getMonth()
              : new Date(rdata.tcfa_date).getMonth(),
            date: new Date(rdata.actual_tcfa_date)
              ? new Date(rdata.actual_tcfa_date).getDate()
              : new Date(rdata.tcfa_date).getDate(),
          };
          let actual_retest_start_date = {
            year: rdata.actual_retest_start_date
              ? new Date(rdata.actual_retest_start_date).getFullYear()
              : new Date(rdata.retest_start_date).getFullYear(),
            month: rdata.actual_retest_start_date
              ? new Date(rdata.actual_retest_start_date).getMonth()
              : new Date(rdata.retest_start_date).getMonth(),
            date: rdata.actual_retest_start_date
              ? new Date(rdata.actual_retest_start_date).getDate()
              : new Date(rdata.retest_start_date).getDate(),
          };
          let actual_retest_end_date = {
            year: rdata.actual_retest_end_date
              ? new Date(rdata.actual_retest_end_date).getFullYear()
              : new Date(rdata.retest_end_date).getFullYear(),
            month: rdata.actual_retest_end_date
              ? new Date(rdata.actual_retest_end_date).getMonth()
              : new Date(rdata.retest_end_date).getMonth(),
            date: rdata.actual_retest_end_date
              ? new Date(rdata.actual_retest_end_date).getDate()
              : new Date(rdata.retest_end_date).getDate(),
          };
          let actual_longevity_start_date = {
            year: rdata.actual_longevity_start_date
              ? new Date(rdata.actual_longevity_start_date).getFullYear()
              : new Date(rdata.longevity_start_date).getFullYear(),
            month: rdata.actual_longevity_start_date
              ? new Date(rdata.actual_longevity_start_date).getMonth()
              : new Date(rdata.longevity_start_date).getMonth(),
            date: rdata.actual_longevity_start_date
              ? new Date(rdata.actual_longevity_start_date).getDate()
              : new Date(rdata.longevity_start_date).getDate(),
          };
          let actual_longevity_end_date = {
            year: new Date(rdata.actual_longevity_end_date)
              ? new Date(rdata.actual_longevity_end_date).getFullYear()
              : new Date(rdata.longevity_end_date).getFullYear(),
            month: new Date(rdata.actual_longevity_end_date)
              ? new Date(rdata.actual_longevity_end_date).getMonth()
              : new Date(rdata.longevity_end_date).getMonth(),
            date: new Date(rdata.actual_longevity_end_date)
              ? new Date(rdata.actual_longevity_end_date).getDate()
              : new Date(rdata.longevity_end_date).getDate(),
          };

          let actual_giso_date = {
            year: new Date(rdata.actual_giso_date)
              ? new Date(rdata.actual_giso_date).getFullYear()
              : new Date(rdata.giso_date).getFullYear(),
            month: new Date(rdata.actual_giso_date)
              ? new Date(rdata.actual_giso_date).getMonth()
              : new Date(rdata.giso_date).getMonth(),
            date: new Date(rdata.actual_giso_date)
              ? new Date(rdata.actual_giso_date).getDate()
              : new Date(rdata.giso_date).getDate(),
          };

          let actual_eotr_date = {
            year: new Date(rdata.actual_eotr_date)
              ? new Date(rdata.actual_eotr_date).getFullYear()
              : new Date(rdata.eotr_date).getFullYear(),
            month: new Date(rdata.actual_eotr_date)
              ? new Date(rdata.actual_eotr_date).getMonth()
              : new Date(rdata.eotr_date).getMonth(),
            date: new Date(rdata.actual_eotr_date)
              ? new Date(rdata.actual_eotr_date).getDate()
              : new Date(rdata.eotr_date).getDate(),
          };

          let xadate = rdata.actual_longevity_end_date;
          let actualSanityStartDate = new Date(
            new Date(xadate).setDate(new Date(xadate).getDate() + 1)
          );

          let xadate1 = rdata.actual_fcs_date;
          let actualSanityEndDate = new Date(
            new Date(xadate1).setDate(new Date(xadate1).getDate() - 1)
          );

          let actual_sanity_start_date = {
            year: new Date(actualSanityStartDate).getFullYear(),
            month: new Date(actualSanityStartDate).getMonth(),
            date: new Date(actualSanityStartDate).getDate(),
          };

          let actual_sanity_end_date = {
            year: new Date(actualSanityEndDate).getFullYear(),
            month: new Date(actualSanityEndDate).getMonth(),
            date: new Date(actualSanityEndDate).getDate(),
          };

          let xadate2 = rdata.actual_fcs_date;
          let actualFcsRegStartDate = new Date(
            new Date(xadate2).setDate(new Date(xadate2).getDate() + 1)
          );

          let xadate3 = rdata.actual_giso_date;
          let actualFcsRegEndDate = new Date(
            new Date(xadate3).setDate(new Date(xadate3).getDate() - 1)
          );

          let actual_fcs_regression_start_date = {
            year: new Date(actualFcsRegStartDate).getFullYear(),
            month: new Date(actualFcsRegStartDate).getMonth(),
            date: new Date(actualFcsRegStartDate).getDate(),
          };

          let actual_fcs_regression_end_date = {
            year: new Date(actualFcsRegEndDate).getFullYear(),
            month: new Date(actualFcsRegEndDate).getMonth(),
            date: new Date(actualFcsRegEndDate).getDate(),
          };

          let xadate4 = rdata.actual_giso_date;
          let actualGisoStartDate = new Date(
            new Date(xadate4).setDate(new Date(xadate4).getDate() + 1)
          );

          let xadate5 = rdata.actual_eotr_date;
          let actualGisoEndDate = new Date(
            new Date(xadate5).setDate(new Date(xadate5).getDate() - 1)
          );

          let actual_eotr_start_date = {
            year: new Date(actualGisoStartDate).getFullYear(),
            month: new Date(actualGisoStartDate).getMonth(),
            date: new Date(actualGisoStartDate).getDate(),
          };

          let actual_eotr_end_date = {
            year: new Date(actualGisoEndDate).getFullYear(),
            month: new Date(actualGisoEndDate).getMonth(),
            date: new Date(actualGisoEndDate).getDate(),
          };
          let ganttOptions = self.loadGanttOptionTemplate();

          // ganttOptions.xAxis[2].min=Date.UTC(start_date.year,start_date.month,start_date.date);
          // ganttOptions.xAxis[2].max=Date.UTC(fcs_date.year,fcs_date.month,fcs_date.date+7);
          ganttOptions.xAxis[0].min = Date.UTC(
            planned_start_date.year,
            planned_start_date.month,
            planned_start_date.date
          );
          ganttOptions.xAxis[0].max = Date.UTC(
            actual_eotr_date.year,
            actual_eotr_date.month,
            actual_eotr_date.date + 7
          );
          ganttOptions.xAxis[1].min = Date.UTC(
            planned_start_date.year,
            planned_start_date.month,
            planned_start_date.date
          );
          //ganttOptions.xAxis[1].max=Date.UTC(actual_eotr_date.year,actual_eotr_date.month,actual_eotr_date.date+7);
          ganttOptions.xAxis[1].max = Date.UTC(
            actual_eotr_date.year,
            actual_eotr_date.month,
            actual_eotr_date.date + 7
          );
          //  ganttOptions1.xAxis[2].min=Date.UTC(start_date.year,start_date.month,start_date.date);
          //ganttOptions1.xAxis[2].max=Date.UTC(fcs_date.year,fcs_date.month,fcs_date.date+7);
          ganttOptions.series = [
            {
              name: "Project 1",
              data: [
                {
                  name: "Executed",
                  id: "Planned_Executed",
                  start: Date.UTC(
                    planned_start_date.year,
                    planned_start_date.month,
                    planned_start_date.date
                  ),
                  end: Date.UTC(
                    planned_tcfa_date.year,
                    planned_tcfa_date.month,
                    planned_tcfa_date.date
                  ),
                  pointWidth: self.ganttChartPointWidth,
                  y: 0,
                  color: "lightgreen",
                  dataLabels: {
                    color: "#fff",
                    "text-outline": "#fff",
                    fill: "#fff",
                  },
                },
                {
                  name: "Executed",
                  id: "Executed",
                  start: Date.UTC(
                    actual_start_date.year,
                    actual_start_date.month,
                    actual_start_date.date
                  ),
                  end: Date.UTC(
                    actual_tcfa_date.year,
                    actual_tcfa_date.month,
                    actual_tcfa_date.date
                  ),
                  pointWidth: self.ganttChartPointWidth,
                  completed: {
                    amount:
                      self.summaryButtonsDetails.testcasesExecuted.percentage /
                      100,
                    fill: "green",
                    pointWidth: self.ganttChartPointWidth,
                  },
                  y: 1,
                  color: "lightgreen",
                  dataLabels: {
                    color: "#fff",
                    "text-outline": "#fff",
                    fill: "#fff",
                  },
                },
                {
                  name: "Retest",
                  id: "Planned_Retest",
                  dependency: "Planned_Executed",
                  start: Date.UTC(
                    planned_retest_start_date.year,
                    planned_retest_start_date.month,
                    planned_retest_start_date.date
                  ),
                  end: Date.UTC(
                    planned_retest_end_date.year,
                    planned_retest_end_date.month,
                    planned_retest_end_date.date
                  ),
                  pointWidth: self.ganttChartPointWidth,
                  color: "#2094df",
                  y: 0,
                  dataLabels: {
                    color: "#fff",
                    "text-outline": "#fff",
                  },
                },

                {
                  name: "Retest",
                  id: "Retest",
                  dependency: "Executed",
                  start: Date.UTC(
                    actual_retest_start_date.year,
                    actual_retest_start_date.month,
                    actual_retest_start_date.date
                  ),
                  end: Date.UTC(
                    actual_retest_end_date.year,
                    actual_retest_end_date.month,
                    actual_retest_end_date.date
                  ),
                  pointWidth: self.ganttChartPointWidth,
                  color: "#2094df",
                  y: 1,
                  dataLabels: {
                    color: "#fff",
                    "text-outline": "#fff",
                  },
                },
                {
                  name: "Longevity",
                  id: "Planned_Longevity",
                  dependency: "Planned_Retest",
                  start: Date.UTC(
                    planned_longevity_start_date.year,
                    planned_longevity_start_date.month,
                    planned_longevity_start_date.date
                  ),
                  end: Date.UTC(
                    planned_longevity_end_date.year,
                    planned_longevity_end_date.month,
                    planned_longevity_end_date.date
                  ),
                  pointWidth: self.ganttChartPointWidth,
                  color: "#2094df",
                  y: 0,
                  dataLabels: {
                    color: "#fff",
                  },
                },
                {
                  name: "Longevity",
                  id: "Longevity",
                  dependency: "Retest",
                  start: Date.UTC(
                    actual_longevity_start_date.year,
                    actual_longevity_start_date.month,
                    actual_longevity_start_date.date
                  ),
                  end: Date.UTC(
                    actual_longevity_end_date.year,
                    actual_longevity_end_date.month,
                    actual_longevity_end_date.date
                  ),
                  pointWidth: self.ganttChartPointWidth,
                  color: "#2094df",
                  y: 1,
                  dataLabels: {
                    color: "#fff",
                  },
                },
                {
                  name: "Sanity",
                  id: "Planned_Sanity",
                  dependency: "Planned_Longevity",
                  start: Date.UTC(
                    planned_sanity_start_date.year,
                    planned_sanity_start_date.month,
                    planned_sanity_start_date.date
                  ),
                  end: Date.UTC(
                    planned_sanity_end_date.year,
                    planned_sanity_end_date.month,
                    planned_sanity_end_date.date
                  ),
                  pointWidth: self.ganttChartPointWidth,
                  color: "#2094df",
                  y: 0,
                  dataLabels: {
                    color: "#fff",
                  },
                },
                {
                  name: "Sanity",
                  id: "Sanity",
                  dependency: "Longevity",
                  start: Date.UTC(
                    actual_sanity_start_date.year,
                    actual_sanity_start_date.month,
                    actual_sanity_start_date.date
                  ),
                  end: Date.UTC(
                    actual_sanity_end_date.year,
                    actual_sanity_end_date.month,
                    actual_sanity_end_date.date
                  ),
                  pointWidth: self.ganttChartPointWidth,
                  color: "#2094df",
                  y: 1,
                  dataLabels: {
                    color: "#fff",
                  },
                },
                {
                  name: "FCS",
                  id: "planned_fcs",
                  milestone: true,
                  start: Date.UTC(
                    planned_fcs_date.year,
                    planned_fcs_date.month,
                    planned_fcs_date.date
                  ),
                  end: Date.UTC(
                    planned_fcs_date.year,
                    planned_fcs_date.month,
                    planned_fcs_date.date
                  ),
                  dependency: "Planned_Sanity",
                  color: "blue",
                  pointWidth: self.ganttChartPointWidth,
                  y: 0,
                  dataLabels: {
                    color: "#fff",
                  },
                },

                {
                  name: "FCS",
                  id: "fcs",
                  milestone: true,
                  start: Date.UTC(
                    actual_fcs_date.year,
                    actual_fcs_date.month,
                    actual_fcs_date.date
                  ),
                  end: Date.UTC(
                    actual_fcs_date.year,
                    actual_fcs_date.month,
                    actual_fcs_date.date
                  ),
                  dependency: "Sanity",
                  color: "blue",
                  pointWidth: self.ganttChartPointWidth,
                  y: 1,
                  dataLabels: {
                    color: "#fff",
                  },
                },
                {
                  name: "FCS Regression",
                  id: "planned_fcs_regression",
                  start: Date.UTC(
                    planned_fcs_regression_start_date.year,
                    planned_fcs_regression_start_date.month,
                    planned_fcs_regression_start_date.date
                  ),
                  end: Date.UTC(
                    planned_fcs_regression_end_date.year,
                    planned_fcs_regression_end_date.month,
                    planned_fcs_regression_end_date.date
                  ),
                  dependency: "planned_fcs",
                  color: "#2094df",
                  pointWidth: self.ganttChartPointWidth,
                  y: 0,
                  dataLabels: {
                    color: "#fff",
                  },
                },

                {
                  name: "FCS Regression",
                  id: "fcs_regression",
                  start: Date.UTC(
                    actual_fcs_regression_start_date.year,
                    actual_fcs_regression_start_date.month,
                    actual_fcs_regression_start_date.date
                  ),
                  end: Date.UTC(
                    actual_fcs_regression_end_date.year,
                    actual_fcs_regression_end_date.month,
                    actual_fcs_regression_end_date.date
                  ),
                  dependency: "fcs",
                  color: "#2094df",
                  pointWidth: self.ganttChartPointWidth,
                  y: 1,
                  dataLabels: {
                    color: "#fff",
                  },
                },

                {
                  name: "GISO",
                  milestone: true,
                  id: "planned_giso",
                  start: Date.UTC(
                    planned_giso_date.year,
                    planned_giso_date.month,
                    planned_giso_date.date
                  ),
                  end: Date.UTC(
                    planned_giso_date.year,
                    planned_giso_date.month,
                    planned_giso_date.date
                  ),
                  dependency: "planned_fcs_regression",
                  color: "blue",
                  pointWidth: self.ganttChartPointWidth,
                  y: 0,
                  dataLabels: {
                    color: "#fff",
                  },
                },
                {
                  name: "GISO",
                  id: "giso",
                  milestone: true,
                  start: Date.UTC(
                    actual_giso_date.year,
                    actual_giso_date.month,
                    actual_giso_date.date
                  ),
                  end: Date.UTC(
                    actual_giso_date.year,
                    actual_giso_date.month,
                    actual_giso_date.date
                  ),
                  dependency: "fcs_regression",
                  color: "blue",
                  pointWidth: self.ganttChartPointWidth,
                  y: 1,
                  dataLabels: {
                    color: "#fff",
                  },
                },
                {
                  name: "EoTR",
                  id: "planned_eotr",
                  start: Date.UTC(
                    planned_eotr_start_date.year,
                    planned_eotr_start_date.month,
                    planned_eotr_start_date.date
                  ),
                  end: Date.UTC(
                    planned_eotr_end_date.year,
                    planned_eotr_end_date.month,
                    planned_eotr_end_date.date
                  ),
                  dependency: "planned_giso",
                  color: "#2094df",
                  pointWidth: self.ganttChartPointWidth,
                  y: 0,
                  dataLabels: {
                    color: "#fff",
                  },
                },
                {
                  name: "EoTR",
                  id: "eotr",
                  start: Date.UTC(
                    actual_eotr_start_date.year,
                    actual_eotr_start_date.month,
                    actual_eotr_start_date.date
                  ),
                  end: Date.UTC(
                    actual_eotr_end_date.year,
                    actual_eotr_end_date.month,
                    actual_eotr_end_date.date
                  ),
                  dependency: "giso",
                  color: "#2094df",
                  pointWidth: self.ganttChartPointWidth,
                  y: 1,
                  dataLabels: {
                    color: "#fff",
                  },
                },
                {
                  name: "EoTR",
                  milestone: true,
                  start: Date.UTC(
                    planned_eotr_date.year,
                    planned_eotr_date.month,
                    planned_eotr_date.date
                  ),
                  end: Date.UTC(
                    planned_eotr_date.year,
                    planned_eotr_date.month,
                    planned_eotr_date.date
                  ),
                  dependency: "planned_eotr",
                  color: "blue",
                  pointWidth: self.ganttChartPointWidth,
                  y: 0,
                  dataLabels: {
                    color: "#fff",
                  },
                },
                {
                  name: "EoTR",
                  milestone: true,
                  start: Date.UTC(
                    actual_eotr_date.year,
                    actual_eotr_date.month,
                    actual_eotr_date.date
                  ),
                  end: Date.UTC(
                    actual_eotr_date.year,
                    actual_eotr_date.month,
                    actual_eotr_date.date
                  ),
                  dependency: "eotr",
                  color: "blue",
                  pointWidth: self.ganttChartPointWidth,
                  y: 1,
                  dataLabels: {
                    color: "#fff",
                  },
                },
              ],
            },
          ];
          debugger;
          self.ganttOptions = self.loadGanttOptionTemplate;
          self.ganttOptions = { ...ganttOptions };
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

    addRowAbove() {},
    deleteRow() {},
    getTopoImgUrl(pic) {
      if (pic != "") {
        return requestOptions.apiUrl() + "/get_topology_images/admin/" + pic;
      } else {
        return require("../assets/images/default.png");
      }
    },
    getImage(pic) {
      if (pic != "") {
        return requestOptions.apiUrl() + "/get_image/admin/" + pic;
      } else {
        return require("../assets/images/default.png");
      }
    },
    getImgUrl(image) {
      if (image != "") {
        let pic = image.toLowerCase() + "Logo.png";
        let pic1 = pic.substring(pic.lastIndexOf("/") + 1);
        return requestOptions.apiUrl() + "/get_customer_logo/admin/" + pic1;
      } else {
        return require("../assets/images/default.png");
      }
    },
    closeAddCustomerModal() {
      this.showAddCustomerModal = false;
    },
    homeClicked(e) {
      router.push({ name: "/releases/customer_1" });
      e.preventDefault();
    },
    openTableMenu() {
      this.$refs.table_menu.open(event);
      event.preventDefault();
    },
  },
};
</script>
<template>
  <div class="homeMain">
    <header id="rackHeader" class="header header--compressed">
      <div class="header-bar__main">
        <div class="header-heading">
          <router-link to="/releases/customer_1">
            <img
              class="main-logo"
              src="../../public/images/Cisco_Logo_no_TM_Midnight_Blue-RGB.png"
            />
            <div id="tl-title1" class="page-title">
              XR CVT
            </div>
          </router-link>
        </div>
      </div>
      <div class="header-bar container rackHeaderBar1">
        <div
          class="postauth-header postauth-header1 header-toolbar row"
          style="width:92%;"
        >
          <div class="topnav" style="width:90%">
            <template v-for="(mName, index) in customers">
              <a
                class="fmenuItem12"
                :key="index"
                @click="customerClicked($event, mName)"
                style="flex-direction: column;"
              >
                <img
                  :src="getImgUrl(mName)"
                  height="35px"
                  width="35px"
                  style="background-size:100% 100%;margin:10px;margin-bottom:2px;"
                />
                {{ mName }}
              </a>
            </template>
           <!-- <a
              class="fmenuItem12"
              :key="index"
              @click="addCustomer($event)"
              style="flex-direction: column;height:35px;width:35px;"
            >
              <div style="flex-direction: column;height:35px;width:35px;">
                <i
                  class="icon icon-plus"
                  height="35px"
                  width="35px"
                  style="background-size:100% 100%;margin:10px;margin-bottom:2px;font-weight:bold"
                >
                </i>
                Add
              </div>
            </a>-->
          </div>
          <div class="firstHeader" style="margin-top: 25px;">
            <a v-if="currentUser"
              ><span class="half-margin-right">
                <strong>{{ currentUser }}</strong>
              </span></a
            >
            <a v-else @click="logout($event)"
              ><span class="half-margin-right">
                <strong>Login</strong>
              </span></a
            >
            <button
              v-if="currentUser"
              class="btn btn--primary lg_addBtn lg_addBtn1 logoutBtn"
              @click="logoutClicked($event)"
            >
              <span
                v-tooltip.right="{
                  html: 'logoutContent',
                  class: 'cisco-tooltip',
                }"
              >
                <i class="icon icon-sign-out"> </i>
              </span>
              <div id="logoutContent">
                Logout
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
    <div class="bottomnav">
      <div class="customerNotesContainer row" v-if="showCustomerNotes">
        <marquee class="customerNotes highlightNotes">{{ custObj.headline }}</marquee>
      </div>
      <div class="relNav">
      <template v-for="(sName, index) in releases">
        <a
          class="fmenuItem"
          :key="index"
          @click="relClicked($event, sName)"
          :disabled="checkActiveBtn(sName)"
        >
          {{ sName }}
        </a>
      </template>
      </div>
       <div class="customerNotesContainer row">
           <div class="custmenuWrapper" style="border-right: 1px solid #ddd;"> 
     <div class="cust_buttons">
     <button class="custMenuButtons" @click="displayDetails('custDetails')">
     <button class="insideButton" @click="displayDetails('custDetails')">Customer Details</button>
     </button>
     <button class="custMenuButtons" @click="displayDetails('prodImageDetails')">
     <button class="insideButton" @click="displayDetails('prodImageDetails')">Prod Image</button>
     </button>
     <button class="custMenuButtons" @click="displayDetails('cvtDetails')">
     <button class="insideButton" @click="displayDetails('cvtDetails')">CVT</button>
     </button>
     <button class="custMenuButtons" @click="displayDetails('featureDetails')">
     <button class="insideButton" @click="displayDetails('featureDetails')">Features</button>
     </button>
     <button class="custMenuButtons" @click="displayDetails('usecaseDetails')">
     <button class="insideButton" @click="displayDetails('usecaseDetails')">Usecases</button>
     </button>
     <button class="custMenuButtons" @click="displayDetails('cfdDetails')">
     <button class="insideButton" @click="displayDetails('cfdDetails')">CFD</button>
     </button>
     <button class="custMenuButtons" @click="displayDetails('documentDetails')">
     <button class="insideButton" @click="displayDetails('documentDetails')">Documents</button>
     </button>
     <button class="custMenuButtons" @click="displayDetails('teamDetails')">
     <button class="insideButton" @click="displayDetails('teamDetails')">Team</button>
     </button>
     </div>
    </div>
       </div>
    </div>
    <div class="pageContentDiv" v-show="!showCustomerFlag">
      <div class="row releaseSummaryDiv darkBg">
        <div class="col-lg-12 col-md-12">
          <div class="belowCharts row belowChartsLight">
            <div class="row" style="width:100%">
              <div class="contentGraph">
                <GanttChart
                  disbleExport="true"
                  v-on:child="onChildInteraction"
                  id="homeTimeLineChart"
                  :colorscheme="colorscheme"
                  :option="ganttOptions"
                ></GanttChart>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="currentPhaseBox">
                      <div class="nextMilestone" v-show="currentPhase != ''">
                        <div class="currentPhaseStatus"></div>
                        {{ currentPhase }}
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="timeLeftDetailsBox">
                      <div
                        class="nextMilestone timeDetailsBox"
                        v-if="nextmilestone != ''"
                      >
                        {{ nextmilestoneStatus }}
                      </div>
                      <div
                        class="timeLeftForFCS timeDetailsBox"
                        v-if="fcsStatus != ''"
                      >
                        {{ fcsStatus }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row releaseSummaryDiv1">
        <div class="col-lg-12 col-md-12">
          <div class="belowCharts row belowChartsLight">
            <div class="width25Per">
              <div class="r_chartDiv aa darkBackground">
                <div class="summaryCharts">
                  <chart
                    disbleExport="true"
                    v-on:child="onChildInteraction"
                    id="home_chart_a1"
                    class="chartsA"
                    :option="executionSummaryOption"
                  ></chart>
                </div>
                <div class="summary_Data">
                  <div class="projectedSummaryData3 ">
                    <div class="summary_li darkBg">
                      <div
                        class="summaryCircle1 coloredCircleBorder coloredBorder1"
                      >
                        {{ summaryButtonsDetails.totalTestcases }}
                      </div>
                      <div class="coloredCircleBoxdata">
                        Total
                      </div>
                    </div>
                    <div class="summary_li darkBg">
                      <div
                        :class="
                          'summaryCircle2 coloredCircleBorder ' +
                            executionCircleColor
                        "
                      >
                        {{
                          summaryButtonsDetails.testcasesExecuted.percentage
                        }}%
                      </div>
                      <div class="coloredCircleBoxdata">
                        Executed
                      </div>
                    </div>
                    <div class="summary_li darkBg">
                      <div
                        :class="
                          'summaryCircle2  coloredCircleBorder ' +
                            getColorClassForQuality(
                              summaryButtonsDetails.resultQuality.resultQuality
                            )
                        "
                      >
                        {{ summaryButtonsDetails.resultQuality.resultQuality }}%
                      </div>

                      <div
                        class="coloredCircleBoxdata"
                        style="margin-left: 5px;"
                      >
                        Quality
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="testcaseLineChart darkBackground width36Per">
              <chart
                disbleExport="true"
                :colorscheme="colorscheme"
                toggleOption="showCVTExecution"
                v-show="!showCVTExecution"
                v-on:child="onChildInteraction"
                id="home_splineChart"
                :option="splineOptions"
              ></chart>
              <chart
                disbleExport="true"
                :colorscheme="colorscheme"
                toggleOption="showCVTExecution"
                v-show="showCVTExecution"
                v-on:child="onChildInteraction"
                id="cvtChart"
                :option="cvtOptions"
              ></chart>
            </div>
            <div class="cvtWrapper darkBackground width36Per">
              <chart
                disbleExport="true"
                v-show="!showExecutionHeatMap"
                toggleOption="showExecutionHeatMap"
                v-on:child="onChildInteraction"
                id="heatChart1home"
                :option="heatMapOptions1"
              ></chart>
              <chart
                disbleExport="true"
                v-show="showExecutionHeatMap"
                toggleOption="showExecutionHeatMap"
                v-on:child="onChildInteraction"
                id="heatChart2home"
                :option="heatMapOptions2"
              ></chart>
            </div>
          </div>
        </div>
      </div>
      <div
        class="execSummarypageWrapper"
        style="margin-left: 40px;
    margin-right: 50px;"
      >
        <ExecutionSummaryPageHome
          v-if="selectedFolderName != ''"
          :customerName="selectedCustomer"
          releaseFlag="customer"
          :folderName="selectedFolderName"
          :weeklyReport="weeklyReport"
          :currentWeekData="summaryButtonsDetails"
          mhDefectsCount="0"
          :mainCdets="mainCdets"
          v-on:child="onChildInteraction"
        >
        </ExecutionSummaryPageHome>
      </div>
    </div>
    <div class="pageContentDiv" v-show="showCustomerFlag" style="display:flex;">
   
    <div class="custMainWrapper">
       <div class="custrow row custDetails">
       <div class="defaultCustDetails  activeDetails tilerow">
        <div class="funnelChart" style="width:30%">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="platformBubbleChart"
            :option="platformBubbleChartOptions"
          ></chart>
          
        </div>
        <div class="funnelChart" style="width:30%">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="roleBubbleChart"
            :option="rolesBubbleChartOptions"
          ></chart>
        </div>
        <div class="milestoneImge funnelChart" style="width:35%;">
          <div
            class="mileStoneDiagramWrapper"
            style="height:300px;margin-bottom:40px;width: 94%;"
          >
            <img
              :src="getTopoImgUrl(custObj.mileStoneImage)"
              height="350px"
              width="100%"
              style="background-size:100% 100%;margin:30px;margin-bottom: 20px; "
            />
          </div>
        </div>
      </div>
       <div class="activeCustDetails tilerow">
        <div class="funnelChart" style="width:30%">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="platformBubbleChart1"
            :option="platformBubbleChartOptions"
          ></chart>
        </div>
        <div class="funnelChart" style="width:30%">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="roleBubbleChart1"
            :option="rolesBubbleChartOptions"
          ></chart>
        </div>
        <div class="milestoneImge funnelChart" style="width:35%;">
          <div
            class="mileStoneDiagramWrapper"
            style="height:300px;margin-bottom:40px;width: 94%;"
          >
            <img
              :src="getTopoImgUrl(custObj.mileStoneImage)"
              height="350px"
              width="100%"
              style="background-size:100% 100%;margin:30px;margin-bottom: 20px; "
            />
          </div>
        </div>
        </div>
        <div class="row" style="width:100%;margin-top:40px;display:flex;">
        <div class="" style="width:32%">
        <table class="graphTable">
          <tr>
          <td class="pTableTh">Role</td>
          <td class="pTableTh">Platforms</td>
          <td class="pTableTh">Role Desc</td>
          <td class="pTableTh">Vendors</td>
          <td class="pTableTh">Curr Release</td>
          <td class="pTableTh">Next Release</td>
          </tr>
          <template v-for="(tobj,tindex) in platformRoleReleaseDetails">
          <tr :key="'t_'+tindex">
          <td class="pTableTd">{{tobj.role}}
          </td>
          <td class="pTableTd">{{tobj.platform}}
          </td>
          <td class="pTableTd">{{tobj.role_desc}}
          </td>
          <td class="pTableTd">{{tobj.vendors}}
          </td>
          <td class="pTableTd">{{tobj.current_release}}
          </td>
          <td class="pTableTd">{{tobj.next_release}}
          </td>
          </tr>
          </template>
        
          </table>
        </div>
        <div class="" style="width:32%">
        <table class="graphTable">
          <tr>
          <td class="pTableTd">Role</td>
          <td class="pTableTd">Platforms</td>
          <td class="pTableTd">Role Desc</td>
          <td class="pTableTd">Vendors</td>
          <td class="pTableTd">Curr Release</td>
          <td class="pTableTd">Next Release</td>
          </tr>
          <template v-for="(tobj,tindex) in custObj.platformRoleReleaseDetails">
          <tr :key="'t_'+tindex">
          <td class="pTableTd">{{tobj.role}}
          </td>
          <td class="pTableTd">{{tobj.platform}}
          </td>
          <td class="pTableTd">{{tobj.role_desc}}
          </td>
          <td class="pTableTd">{{tobj.vendors}}
          </td>
          <td class="pTableTd">{{tobj.current_release}}
          </td>
          <td class="pTableTd">{{tobj.next_release}}
          </td>
          </tr>
          </template>
        
          </table>
        </div>
        <div class="" style="width:32%">
        <table class="graphTable">
          <tr>
          <td class="pTableTd">Role</td>
          <td class="pTableTd">Platforms</td>
          <td class="pTableTd">Role Desc</td>
          <td class="pTableTd">Vendors</td>
          <td class="pTableTd">Curr Release</td>
          <td class="pTableTd">Next Release</td>
          </tr>
          <template v-for="(tobj,tindex) in custObj.platformRoleReleaseDetails">
          <tr :key="'t_'+tindex">
          <td class="pTableTd">{{tobj.role}}
          </td>
          <td class="pTableTd">{{tobj.platform}}
          </td>
          <td class="pTableTd">{{tobj.role_desc}}
          </td>
          <td class="pTableTd">{{tobj.vendors}}
          </td>
          <td class="pTableTd">{{tobj.current_release}}
          </td>
          <td class="pTableTd">{{tobj.next_release}}
          </td>
          </tr>
          </template>
        
          </table>
        </div>
        </div>
      </div>
      <div class="custrow row prodImageDetails" style="justify-content: space-between;">
        <div class="defaultProdDetails  activeDetails">
        <div class="funnelChart" style="width:24%">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="imgeChart"
            :option="imageBubbleChartOptions"
          ></chart>
        </div>
        <div class="funnelChart" style="width:24%">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="ddtsPlatformChart"
            :option="revSMUChartOptions"
          ></chart>
        </div>
        <div class="funnelChart" style="width:24%">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="ddtsProductChart"
            :option="productOptions"
          ></chart>
        </div>
        <div class="funnelChart" style="width:25%">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="ddtsComponentChart"
            :option="componentOptions"
          ></chart>
        </div>
        </div>
         <div class="activeProdDetails">
        <div class="funnelChart" style="width:25%">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="imgeChart1"
            :option="imageBubbleChartOptions"
          ></chart>
        </div>
        <div class="funnelChart" style="width:25%">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="ddtsPlatformChart1"
            :option="revSMUChartOptions"
          ></chart>
        </div>
        <div class="funnelChart" style="width:25%">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="ddtsProductChart1"
            :option="productOptions"
          ></chart>
        </div>
        <div class="funnelChart" style="width:25%">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="ddtsComponentChart1"
            :option="componentOptions"
          ></chart>
        </div>
        </div>
      </div>
      <div class="custrow row featureDetails" style="justify-content: space-between;">
      <div class="defaultFeatureDetails  activeDetails">
      <div class="treeVizChart" style="width:73%;margin-right: 30px;margin-left: 30px;">
      <div class="funnelChart1" style="width:100%;margin-bottom:20px;display:flex;justify-content: space-between;">
      <div
          class="treeWrapper"
           style="overflow:scroll !important;padding-top: 30px;padding-left: 20px;text-align:center;"
        >
        <div style="margin-bottom:20px !important;font-size:18px;font-weight:700;">Features</div>
        <div style="height:500px;width:100% !important;">
         <splide
                :options="treeSplideOptions"
                :slides="treeDataArray"
                class="mySlides"
              >
                <splide-slide
                  class="customerSlides"
                  v-for="(treeObj, ind) in treeDataArray"
                  :key="ind"
                >
            <TreevizPage
              class="treeChart"
              :idvalue="'treeObj_'+ind"
              :treeData="treeObj"
              isHorizantal="true"
              revChartFlag="false"
            >
            </TreevizPage>
                </splide-slide>
         </splide>
          </div>
           
        </div>
    
        </div>
      </div>
          <div style="width: 23%;
    margin-bottom: 20px;
    margin-right: 30px;">
        <div class="opticsWrapper funnelChart1" >
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="opticsChart"
            :option="opticsChartOptions"
          ></chart>
        </div>
        </div>
      </div>
      <div  class="activeFeatureDetails">
       <div class="treeVizChart" style="width:73%;margin-right: 30px;margin-left: 30px;">
      <div class="funnelChart1" style="width:100%;margin-bottom:20px;display:flex;justify-content: space-between;">
      <div
          class="treeWrapper"
           style="overflow:scroll !important;padding-top: 30px;padding-left: 20px;text-align:center;"
        >
        <div style="margin-bottom:20px !important;font-size:18px;font-weight:700;">Features</div>
        <div style="height:500px;width:100% !important;">
         <splide
                :options="treeSplideOptions"
                :slides="treeDataArray"
                class="mySlides"
              >
                <splide-slide
                  class="customerSlides"
                  v-for="(treeObj, ind) in treeDataArray"
                  :key="'ind_'+ind"
                >
            <TreevizPage
              class="treeChart"
              :idvalue="'treeObj_a_'+ind"
              :treeData="treeObj"
              isHorizantal="true"
              revChartFlag="false"
            >
            </TreevizPage>
                </splide-slide>
         </splide>
          </div>
           
        </div>
    
        </div>
      </div>
          <div style="width: 23%;
    margin-bottom: 20px;
    margin-right: 30px;">
        <div class="opticsWrapper funnelChart1" >
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="opticsChart1"
            :option="opticsChartOptions"
          ></chart>
        </div>
        </div>
      </div>
      
      </div>
      <div class="custrow row usecaseDetails" style="justify-content: space-between;
    ">
     <div class="defaultUsecaseDetails  activeDetails">
    <template v-for="(imageObj,inx) in custObj.imageDetailsArray">
     <template v-if="inx%2==0"> 
      <div style="width:100%;display:flex !important;"  :key="'a1_'+inx">
        <div
          class="networkDiagramWrapper"
          style="height:300px;width:60%;margin-bottom:40px;"
        >
          <img
            :src="getTopoImgUrl(imageObj.image)"
            height="300px"
            width="100%"
            style="background-size:100% 100%;"
          />
        </div>
        <div
          :class="'topoDiagramWrapper imageText'+inx"
          style="height:300px;width: 38%;margin-bottom:40px;color: #fff;
    padding: 30px;"
    v-html="imageObj.imageDetails"
        >
        
        </div>
      </div>
        </template>
        <template v-else> 
         <div style="width:100%;display:flex !important;"  :key="'a1_'+inx">
         <div
         :class="'topoDiagramWrapper imageText'+inx"
          style="height:300px;width: 38%;margin-bottom:40px;color: #fff;
    padding: 30px;"
     v-html="imageObj.imageDetails"
        >
        </div>
        <div
          class="networkDiagramWrapper"
          style="height:300px;width:60%;margin-bottom:40px;"
        >
          <img
            :src="getTopoImgUrl(imageObj.image)"
            height="300px"
            width="100%"
            style="background-size:100% 100%;"
          />
        </div>
         </div>
        </template>
    </template>
     </div>
     <div class="activeUsecaseDetails">
        <template v-for="(imageObj,inx) in custObj.imageDetailsArray">
        <template v-if="inx%2==0"> 
        <div style="width:100%;display:flex !important;"  :key="'a_'+inx">
        <div
          class="networkDiagramWrapper"
          style="height:300px;width:60%;margin-bottom:40px;"
        >
          <img
            :src="getTopoImgUrl(imageObj.image)"
            height="300px"
            width="100%"
            style="background-size:100% 100%;"
          />
        </div>
        <div
         :class="'topoDiagramWrapper imageText'+inx"
          style="height:300px;width: 38%;margin-bottom:40px;color: #fff;
    padding: 30px;"
    v-html="imageObj.imageDetails"
        >
        
        </div>
        </div>
        </template>
        <template v-else> 
         <div style="width:100%;display:flex !important;"  :key="'a_'+inx">
         <div
         :class="'topoDiagramWrapper imageText'+inx"
          style="height:300px;width: 38%;margin-bottom:40px;color: #fff;
    padding: 30px;"
     v-html="imageObj.imageDetails"
        >
        </div>
        <div
          class="networkDiagramWrapper"
          style="height:300px;width:60%;margin-bottom:40px;"
        >
          <img
            :src="getTopoImgUrl(imageObj.image)"
            height="300px"
            width="100%"
            style="background-size:100% 100%;"
          />
        </div>
         </div>
        </template>
    </template>
     </div>
      </div>

      <div
        class="custrow teamDetails"
        style="margin-left:42px;margin-top:20px;display:flex;"
      >
    
        <table
          class="orgTable"
          style="height: 240px;border: 2px solid #378fa6;margin:10px;width:34%;background:#bbf1f1;color:#000;line-height:50px"
        >
          <tr>
            <td style="text-align: center;">
              <h5>
                Hassan Sheik
              </h5>
              <div style="line-height: 24px;">
                CVT Director
              </div>
            </td>
            <td style="text-align: center;">
              <h5>
                Vivek Mehta
              </h5>
              <div style="line-height: 24px;">
                CVT Manager
              </div>
            </td>
            <td style="text-align: center;">
              <h5>
                Amit Agarwal
              </h5>
              <div style="line-height: 24px;">
                Engineering Sponsor
              </div>
            </td>
          </tr>
          <tr>
            <td style="text-align: center;">
              <h5>
                Audrey Teeratananon
              </h5>
              <div style="line-height: 24px;">
                AT Manager
              </div>
            </td>
            <td style="text-align: center;">
              <h5>
                JSON Houx
              </h5>
              <div style="line-height: 24px;">
                SE Manager
              </div>
            </td>
          </tr>
        </table>

        <table
          class="orgTable"
          style="height: 240px;border: 2px solid #378fa6;margin:10px;width:34%;background:#bbf1f1;color:#000;line-height:50px"
        >
          <tr>
            <td style="text-align: center;">
              <h5>
                Anoop K V
              </h5>
              <div style="line-height: 24px;">
                Project Lead
              </div>
            </td>
            <td style="text-align: center;">
              <h5>
                Chandra Shekhar
              </h5>
              <div style="line-height: 24px;">
                CVT Tech Lead
              </div>
            </td>
            <td style="text-align: center;">
              <h5>
                Kiran Kumar
              </h5>
              <div style="line-height: 24px;">
                CVT Tech Lead
              </div>
            </td>
            <td style="text-align: center;">
              <h5>
                Victor
              </h5>
              <div style="line-height: 24px;">
                CVT Eng
              </div>
            </td>
          </tr>
          <tr>
            <td style="text-align: center;">
              <h5>
                Venkat Nagarajan
              </h5>
              <div style="line-height: 24px;">
                Deply and Esc Lead
              </div>
            </td>
            <td style="text-align: center;">
              <h5>
                Milo
              </h5>
              <div style="line-height: 24px;">
                CVT Tech Lead
              </div>
            </td>
            <td style="text-align: center;">
              <h5>
                Nighat Agra
              </h5>
              <div style="line-height: 24px;">
                CVT Tech Lead
              </div>
            </td>
            <td style="text-align: center;">
              <h5>
                Chaitanya
              </h5>
              <div style="line-height: 24px;">
                CVT Tech Lead
              </div>
            </td>
          </tr>
        </table>

        <table
          class="orgTable"
          style="height: 240px;border: 2px solid #378fa6;margin:10px;width:34%;background:#bbf1f1;color:#000;line-height:50px"
        >
          <tr>
            <td style="text-align: center;">
              <h5>
                Kartik Subramanian
              </h5>
              <div style="line-height: 24px;">
                SE – BX, CX, BB|BD, RB
              </div>
            </td>
            <td style="text-align: center;">
              <h5>
                Sarah Gonzales
              </h5>
              <div style="line-height: 24px;">
                SE - Telemetry
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">
              <h5>
                Mohit Vashisht
              </h5>
              <div style="line-height: 24px;">
                SE – PF, SR|EC
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    </div>

    <div
      v-if="showAddCustomerModal"
      class="showAddCustomerModal"
      style="width:80%;height:600px;top:100px;left:100px;"
    >
      <CreateCustomerPage
        :releases="releases"
        v-on:child="onChildInteraction"
      ></CreateCustomerPage>
    </div>
  </div>
</template>
<style scoped>
.cust_buttons{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    background: #cce0ee;;
 }
 .relNav{
  display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    background: #0c2f4a;
 }

.activeCustDetails, .activeProdDetails, .activeFeatureDetails, .activeUsecaseDetails{
position: absolute;
    width: 100%;
    display: flex;
}

.activeUsecaseDetails, .defaultUsecaseDetails{
display:block !important;
}
.defaultCustDetails, .defaultProdDetails, .defaultFeatureDetails, .defaultUsecaseDetails{
    width: 100%;
    display: flex;
}

.activeDetails{

transition: all;

}
.custMenuButtons{
margin: 15px 20px;
    height: 50px;
    border: none;
    width: 90px;
    border-radius: 10px;
    box-shadow: rgb(255 255 255 / 10%) 0px 1px 1px 0px inset, rgb(50 50 93 / 25%) 0px 50px 100px -20px, rgb(0 0 0 / 30%) 0px 30px 60px -30px;
    background-color: #7696b0;
  }
#tl-title1 {
  margin-top: 3px !important;
  font-size: 15px !important;
  font-weight: 700 !important;
  margin-left: 10px !important;
  color: #043d54 !important;
}
.revTable {
  width: 55% !important;
  height: 400px !important;
  margin: 30px !important;
  line-height: 35px !important;
  color: #000 !important;
  overflow: scroll !important;
  display: flex !important;
  /*  border: 2px solid #43c5e0 !important;*/
}
.revTable::-webkit-scrollbar {
  display: none;
}
.linkBox {
  border: 2px solid #43c5e0 !important;
  margin-left: 20px;
  width: 10%;
  margin: 30px;
}
.dynamicTable {
  background: #fff;
  margin: 11px;
  padding: 0;
}

.dynamic_table td {
  border: 1px solid #ddd;
}
.addDeletebuttons {
  width: 4%;
}
.highlightNotes {
 background: #f4efeb;
    width: 100%;
    padding-top: 8px;
    font-weight: bold;
}
.uTableTh {
  background: #43c5e0 !important;
  text-align: center !important;
}

.uTableTd {
  text-align: center !important;
}

#rackHeader{
position:fixed;
width:100%;
}


.rackHeaderBar1 {
  height: fit-content !important;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  float: right;
  text-align: right;
  padding-bottom: 5px;
}
.postauth-header1 {
  display: block !important;
  width: 100% !important;
}
.topnav {
  width: 80%;
  float: left;
  margin-left: 120px;
  overflow: hidden;
  background: #fff;
  height: fit-content;
  text-align: center;
}
.bottomnav {
  background-color: #fff;
  height: fit-content;
  text-align: center;
  margin-bottom: 0px;
  position:fixed;
  width:100%;
  margin-top: 80px;
  z-index: 10000;
}
.pageContentDiv{
    margin-top: 270px;
    /* padding-top: 300px; */
    margin-left: 0px;
    position: fixed;
    height: 700px;
    overflow: scroll;
    width: 100%;
}
.tilerow{
margin: 50px;
    width: 100%;
}
.custMainWrapper{
width: 100%;
    position: relative;
}
.pageContentDiv ::-webkit-scrollbar{
display: none !important;
}
.insideButton{
margin: 5px;
    height: 50px;
    width: 100px;
    border: 2px solid #fff;
    box-shadow: rgb(255 255 255 / 10%) 0px 1px 1px 0px inset, rgb(50 50 93 / 25%) 0px 50px 100px -20px, rgb(0 0 0 / 30%) 0px 30px 60px -30px;
    border-radius: 10px;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    background: linear-gradient(90deg, #1dc3cb, #1bafb6, #189ba2, #15888e, #13767b, #106468, #0d5256, #0a4144);
    }
.lg_addBtn1 {
  height: 23px !important;
  width: 23px !important;
  border-radius: 40px !important;
  padding: 0px !important;
  margin: 5px !important;
  margin-right: 20px !important;
  background: #fff !important;
  border: 1px solid #015871 !important;
  color: #017cad !important;
  font-weight: 800 !important;
  font-size: 12px !important;
}
.homeBtn {
  float: left;
}

.topnav a {
  color: #007493;
  text-align: center;
  padding: 0px 30px;
  text-decoration: none;
  font-size: 17px;
}
.header-heading a {
  padding: 0 !important;
  margin-top: 100px !important;
  display: grid;
}
.topnav a:hover {
  text-decoration: none;
  color: #007493;
  font-weight: bold !important;
}
.topnav a.active {
  text-decoration: underline;
  color: #007493;
}
.bottomnav a {
 background: linear-gradient(90deg, rgba(8,195,254,1) 13%, rgba(37,147,227,1) 71%);
    color: #fff;
    cursor: pointer;
    text-align: center;
    padding: 5px 15px;
    text-decoration: none;
    font-size: 17px;
    font-weight: 600;
    border-radius: 20px;
    border: 2px solid #fff;
    margin: 20px;
}

.graphTable{
    margin: 0px 30px;
}
.bottomnav a:hover {
  background: #91daf0;
  text-decoration: none;
  border: 1px solid #000;
  color: #000;
}
.custmenuWrapper{
    width: 100%;
}
.customerNotesContainer {
  width: 100%;
  height: fit-content;
  margin: 0 auto;
  background: #fff;
  min-height: 40px;
  flex-wrap: wrap;
  text-align: center !important;
  border: 1px solid #ddd;
}
.firstHeader {
  margin-top: 25px;
  font-size: 12px;
}
.firstSection {
  width: 25%;
  /*background-image: url(../../public/images/gp_background.jpg) !important; */
  background: #fff;
  border: 2px solid #ddd;
  height: 300px;
  margin: 10px;
  margin-left: 20px !important;
  min-height: 300px;
  display: inline-flex;
  flex-direction: column;
}
.secondSection {
  width: 35%;
  /* background-image: url(../../public/images/gp_background.jpg) !important; */
  background: #fff;
  border: 2px solid #ddd;
  height: 300px;
  margin: 10px;
  margin-left: 20px !important;
  min-height: 300px;
  display: inline-flex;
  flex-direction: column;
  /* margin: 20px; */
}
.custrow {
width: 100%;
min-height:700px;
position:relative;
    margin-left: 0 !important;
    margin-right:0 !important;
    padding-left: 40px;
    padding-right: 40px !important;
    padding-top: 100px;
    padding-bottom: 60px;
    text-align: left;
    animation-name: example;
    animation-duration: 4s;
    justify-content: space-between;
   /* transition: all .25s rotateY(0deg);
    transform: rotateY(0deg);
    transition: transform .25s cubic-bezier(0.645, 0.045, 0.355, 1);
    transform-origin: 0% 0%;*/
}

.custDetails{
 margin-top: 0px !important;
 padding-top:0px !important;
}


.defaultCustDetails, .defaultProdDetails, .defaultFeatureDetails, .defaultUsecaseDetails{
 transition: transform 0.4s ease;
    transform-origin: center center -50px;
    -webkit-transform-origin: center center -50px;
    width: 100%;
}
.defaultCustDetails, .defaultProdDetails, .defaultFeatureDetails, .defaultUsecaseDetails {
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
}
.activeCustDetails, .activeProdDetails, .activeFeatureDetails, .activeUsecaseDetails{
    background: #85d7e6;
    transform: perspective(1000px) rotateX(-90deg) rotateY(0deg) rotateZ(0deg);
}


.activeDetails{
 -webkit-animation: slide 0.5s forwards;
-webkit-animation-delay: 2s;
animation: slide 0.5s forwards;
animation-delay: 2s;
}
.box {
  box-shadow: none !important;
}
.thirdSection {
  width: 35%;
  /* background-image: url(../../public/images/gp_background.jpg) !important; */
  background: #fff;
  border: 2px solid #ddd;
  height: 300px;
  margin: 10px;
  margin-left: 20px !important;
  min-height: 300px;
  display: inline-flex;
  flex-direction: column;
  /* margin: 20px; */
}
.ganttChartDiv {
  min-height: 150px !important;
  max-height: 300px !important;
  width: 100%;
  margin: 10px;
  margin-left: 20px;
  margin-right: 0px;
  overflow: scroll;
  margin-bottom: 25px;
  border-radius: 20px;
}
.homeMain {
  background: #13325b !important;
  padding-bottom: 1000px;
  overflow: scroll;
}
.homeMain::-webkit-scrollbar {
  display: none !important;
}
.ganttChartDiv ::-webkit-scrollbar {
  display: none !important;
}
.secondMenu {
  height: max-content;
  display: flex;
  background: #fff;
}
.thirdMenu {
  height: 200px;
  width: 95%;
  display: flex;
  /* margin-right: 20px; */
  background: #fff;
}
.secondMenu::-webkit-scrollbar {
  display: none;
}
.subSection1 {
  height: 20%;
  background: #fff;
  border: 2px solid #ddd;
  margin-bottom: 20px;
}
.subSection2 {
  height: 50%;
  background: #fff;
  border: 2px solid #ddd;
  margin-bottom: 20px;
}
.uTableTd {
  color: #000 !important;
  font-size: 15px;
  font-weight: 500;
  border: 1px solid #ddd;
}
.subSection3 {
  height: 28%;
  background: #fff;
  border: 2px solid #ddd;
}
.fmenuItem {
  background: #08c3fe;
}
.fmenuItemInactive {
  background: linear-gradient(
      to left top,
      transparent 47.75%,
      currentColor 49.5%,
      currentColor 50.5%,
      transparent 52.25%
    ),
    linear-gradient(
      to right bottom,
      transparent 47.75%,
      currentColor 49.5%,
      currentColor 50.5%,
      transparent 52.25%
    ) !important;
  background-color: #ddd !important;
}
#homeTimeLineChart {
  width: 100%;
  height: 300px;
}

.activeCustomer {
  text-decoration: underline !important;
  color: #007493;
  font-weight: bold !important;
}
.tableButtons {
  height: 30px;
  width: 100%;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
}
.adddeleteRowIcon {
  border: 1px solid #fff;
  background: #126291;
  color: #fff;
  border-radius: 20px;
  margin: 5px;
  font-size: 10px;
  padding: 2px;
  padding-left: 6px;
  padding-right: 6px;
}

#platformBubbleChart > .highcharts-container,
#roleBubbleChart > .highcharts-container,
#platformBubbleChart1 > .highcharts-container,
#roleBubbleChart1 > .highcharts-container
 {
  height: 380px !important;
}

#imgeChart > .highcharts-container,
#ddtsPlatformChart > .highcharts-container,
#ddtsProductChart > .highcharts-container,
#ddtsComponentChart > .highcharts-container{
 height: 340px !important;
}

#opticsChart > .highcharts-container,
#opticsChart1 > .highcharts-container{
 height: 380px !important;
}

#treeChart1,
#treeChart2,
#treeChart3,
#treeChart4,
#treeChart5,
#treeChart6 {
  height: 400px !important;
  width: 400px !important;
}
</style>
