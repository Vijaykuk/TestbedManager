<script>
import { router } from "@/router";
import GanttChart from "./GanttChart";
import { testcaseService } from "@/core/services/testcaseService";
import ExecutionSummaryPageHome from "./ExecutionSummaryPageHome.vue";
import CreateCustomerPage from "./CreateCustomerPage.vue";
import { Tabs, Tab } from "vue-tabs-component";
import TreevizPage from "./TreevizPage.vue";
import { customer_list } from "../assets/customer_array";
import OrganizationChart from "vue-organization-chart";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import "vue-organization-chart/dist/orgchart.css";

import Chart from "./Chart";
import ContextMenu from "../components/global/ContextMenu/ContextMenu";
import ContextMenuItem from "../components/global/ContextMenu/ContextMenuItem";
import { requestOptions } from "@/core/helpers/request";
import WorldMapChart from './WorldMapChart.vue';

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
      selectedProdRel:"",
      imageSummaryList:{},
      true:true,
      false:false,
      custObj: {},
      relPaths:[],
      ahaHeadings:[{
         label: 'Feature',
          field: 'featureId',
          filterOptions: {
          enabled: true,
          filterDropdownItems: []
                }
      },
	   {
         label: 'Aha ID',
          field: 'ahaId',
          filterOptions: {
          enabled: true,
          filterDropdownItems: []
                }
      },
	   {
         label: 'Name',
          field: 'name',
          filterOptions: {
          enabled: true,
          filterDropdownItems: []
                }
      }, {
         label: 'Platforms',
          field: 'platforms_need',
          filterOptions: {
          enabled: true,
          filterDropdownItems: []
                }
      }, {
         label: 'Status',
          field: 'enablement_status',
          filterOptions: {
          enabled: true,
          filterDropdownItems: []
                }
      }],
      caveatsHeadings:[
         {
         label: 'DDTS Id',
          field: 'defect_id',
          filterOptions: {
          enabled: true,
          filterDropdownItems: []
                }
      },
       {
         label: 'Headline',
          field: 'headline',
          filterOptions: {
          enabled: true,
          filterDropdownItems: []
                }
      },
       {
         label: 'Component',
          field: 'component',
          filterOptions: {
          enabled: true,
          filterDropdownItems: []
                }
      },
       {
         label: 'Product',
          field: 'product',
          filterOptions: {
          enabled: true,
          filterDropdownItems: []
                }
      }
      ],
      RelPathsHeadings:[{
         label: 'Release',
          field: 'release',
      },
      {
         label: 'Rev',
          field: 'rev',
},
{
 label: 'Platform',
          field: 'platform',
},
{ label: 'Image Location',
          field: 'image_location',

}],
      showRorAddRelModal:false,
      showRelPathModal:false,
      labDetails:{
        "Lab setup":"3-2xmanual, 1xregression",
        "Platforms":"ASR9K,NCS5500,NCS5K,8000",
        "Role":"PF,CX,SR|EC,ME,EX,BB",
        "Full Box":2,
        "Hardware Gap":"None",
        "TGEN":"Ixia,Spirent"
      },
      projectDetails:{
        B2:{
          location:"SJC Bangalore",
          res_count:"2"
        },
        B4:{
           location:"SanJose",
          res_count:"1+2(c)"
        }
      },
      selectedGrp:"customer",
      selectedGrpBtn:"custDetails",
      platformTableDetails:{},
      pTableDetails:{},
      summaryButtonsDetails:{},
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
      cdets:[],
      submitterDefectOption:{},
      componentDefectOption:{},
      statusDefectOption:{},
       ahaList: [],
       chartsData:[{
  "title": "nyc",
  "color":"0xffffff",
  "latitude": 40.641312,
  "longitude": -73.778137,
  "width": 30,
  "height": 30,
   "value":15,
   "labvalue":10
}, {
  "title": "london ",
  "color":"0xffffff",
  "latitude": 51.470020,
  "longitude": -0.454296,
  "width": 30,
  "height": 30,
 "value":5,
 "labvalue":10
}, {
  "title": "Beijing",
  "color":"0xffffff",
  "latitude": 40.072498,
  "longitude": 116.597504,
  "width": 30,
  "height": 30,
 "value":8,
 "labvalue":6
}, {
  "title": "Bangalore",
  "color":"0xffffff",
  "latitude":  12.972442,
  "longitude": 77.580643,
  "width": 30,
  "height": 30,
 "value":5,
 "labvalue":10
}],
mhDefects:[],
mhHaveOption:{},
      ahaTableColumns: [],
       triggerMatrixTotalData:[],
    upgradeMatrixTotalData:[],
    triggerMatrixData:{},
    upgradeMatrixData:{},
triggerHeatMapOptions:{},
upgradeHeatMapOptions:{},
caveatList:[],
      cust_buttons:{
        custDetails:"Customer",
        prodImageDetails:"Images",
        documents:"Documents",
        usecaseDetails:"Usecases",
        featureDetails:"Features",
        cfdDetails:"CFD",
       // smus:"SMU's",
        upcomingDetails:"Upcoming",
      },
      cvt_buttons:{
        //platformDetails:"Platform",
        //rolesDetails:"Roles",
        worldMapDetails:"CVT",
        ahaDetails:"New Features",
        executionDetails:"Execution",
        qualityDetails:"Quality",
        testPlanDetails:"Test Plan",
        topologyDetails:"Topology",
        caveatsDetails:"Caveats",
        upgradeMatrixDetails:"Upgrade Matrix",
        triggerMatrixDetails:"Trigger Matrix",
        readinessDetails:"Readiness",
        rorDetails:"ROR",
        postFcsDetails:"Post FCS"
      },
      platformReleaseDetails:{},
       qualityOption: {},
        roleOption: {},
      roleOption1: {},
      qualityPlatformOption: {},
      qualityRoleOption: {},
      qualityFeatureOption: {},
       featureOption: {},
      platformRoleOption: {},
      qualitySrcOption: {},
      srcOption: {},
       bar_option: {
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
          text: "Testcases",
        },
        plotOptions: {
          column: {
            dataLabels: {
              enabled: true,
              style: {
                textOutline: "transparent",
              },
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
            dataSorting: {
              enabled: true,
              sortKey: 'y'
            },
            data: [],
          },
        ],
      },
       quality_feature_bar_option: {
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
        yAxis: {
          min: 0,
          max: 100,
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
            dataLabels: {
              enabled: true,
            },
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
             dataSorting: {
               enabled: true,
               sortKey: 'y'
           },
            name: "Quality Per Feature",
            data: [],
          },
        ],
      },
      quality_source_bar_option: {
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
        yAxis: {
          min: 0,
          max: 100,
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
            dataLabels: {
              enabled: true,
            },
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
             dataSorting: {
               enabled: true,
               sortKey: 'y'
           },
            name: "Quality Per Source",
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
             dataSorting: {
               enabled: true,
               sortKey: 'y'
           },
            name: "Platform Roles",
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
          text: "Testcases",
        },
        plotOptions: {
          column: {
            depth: 20,
            dataLabels: {
              enabled: true,
              style: {
                textOutline: "transparent",
              },
            },
            grouping: false,
          },
        },

        credits: {
          enabled: false,
        },
        series: [
          {
             dataSorting: {
               enabled: true,
               sortKey: 'y'
           },
            name: "Roles",
            data: [],
          },
        ],
      },
      source_bar_option: {
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
          text: "Testcases",
        },
        plotOptions: {
          column: {
            depth: 20,
            dataLabels: {
              enabled: true,
              style: {
                textOutline: "transparent",
              },
            },
            grouping: false,
          },
        },

        credits: {
          enabled: false,
        },
        series: [
          {
             dataSorting: {
               enabled: true,
               sortKey: 'y'
           },
            name: "Sources",
            data: [],
          },
        ],
      },
         quality_platform_bar_option: {
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
        yAxis: {
          min: 0,
          max: 100,
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
            dataLabels: {
              enabled: true,
            },
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
             dataSorting: {
               enabled: true,
               sortKey: 'y'
           },
            name: "Quality Per Platform",
            data: [],
          },
        ],
      },
      platform_bar_option: {
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
          text: "Testcases",
        },
        plotOptions: {
          column: {
            depth: 20,
            dataLabels: {
              enabled: true,
              style: {
                textOutline: "transparent",
              },
            },
            grouping: false,
          },
        },

        credits: {
          enabled: false,
        },
        series: [
          {
             dataSorting: {
               enabled: true,
               sortKey: 'y'
           },
            name: "Platforms",
            data: [],
          },
        ],
      },
      quality_role_bar_option: {
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
            dataLabels: {
              enabled: true,
            },
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
             dataSorting: {
               enabled: true,
               sortKey: 'y'
           },
            name: "Quality Per Roles",
            data: [],
          },
        ],
      },
      quality_platformRole_bar_option: {
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
          maxPadding: 0,
        },
        yAxis: {
          min: 0,
          max: 110,
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
            dataLabels: {
              enabled: true,
            },
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
             dataSorting: {
               enabled: true,
               sortKey: 'y'
           },
            name: "Quality Per Roles",
            data: [],
          },
        ],
      },
       treeSplideOptions: {
        rewind: true,
        width: "100%",
        perPage: 1,
        gap: "1rem",
        perMove: 1,
        speed: 150,
        autoplay: true,
      },
       worldMapSplideOptions: {
        rewind: true,
        width: "100%",
        perPage: 1,
        perMove: 1,
        speed: 100,
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
      cfdDetails:[],
      cfdArrayList:{},
      cfdHeadings:[
        {
         label: 'DDTS Id',
          field: 'defect_id',
          filterOptions: {
          enabled: true,
          filterDropdownItems: []
                }
      },
      {
         label: 'Product',
          field: 'product',
          filterOptions: {
          enabled: true,
          filterDropdownItems: []
                }
      },
      {
         label: 'Version',
          field: 'version',
          filterOptions: {
          enabled: true,
          filterDropdownItems: []
                }
      },
      {
         label: 'Component',
          field: 'component',
          filterOptions: {
          enabled: true,
          filterDropdownItems: []
                }
      },
      {
         label: 'Headline',
          field: 'headline',
          filterOptions: {
          enabled: true,
          filterDropdownItems: []
                }
      },
      ],
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
      severityOptions:{},
      severityData:[],
      foundObservedOptions:{},
      foundObserveData:[],
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
           style: {
                color: "black",
                fontSize: "24px",
           }
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
                fontSize: "20px",
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
      selectedRelForCompare:"",
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
    VueGoodTable,
     tabs: Tabs,
    tab: Tab,
    Splide,
    SplideSlide,
    WorldMapChart,
  },
  watch:{
    selectedGrp:function(newval,oldval){
      debugger;
    }
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
    cfdFilterFn(data, filterString){
      debugger;
    },
    multiBtnClicked(type){
      debugger;
      let btns=document.querySelectorAll('.multi-button button');
      for(let k=0;k<btns.length;k++){
        if(event.currentTarget.isEqualNode(btns[k])){
          if(!(btns[k].classList.contains('selectedBtn'))){
            btns[k].classList.add('selectedBtn');
             this.selectedGrp=btns[k].innerText.toLowerCase();
          }
          }
        else{
            btns[k].classList.remove('selectedBtn');
         }
      }
      if(type==="customer"){
         this.displayDetails("custDetails");
         let temp=document.querySelector('.selectedRelBtn');
         temp.classList.remove('selectedRelBtn');
      }
      else if(type==="cvt"){
        this.displayDetails("worldMapDetails");
        let relClicked=false;
        for(let k=0;k<this.releases.length;k++){
          if(!this.checkActiveBtn(this.releases[k]) && !relClicked){
            relClicked=true;
            this.relClicked(this.releases[k]);
           }
        }
      }
      else if(type==="team"){
        this.selectedGrpBtn="teamDetails";
      }
    },
     chartB1TabClicked() {},
    defectTabClicked() {},
    chartB1TabChanged() {},
      loadUpgradeMatrix(){
        let self=this;
        let type="customer";
        let id = this.selectedFolderName + "," + this.selectedCustomer;
       this.loading = false;
      this.loadingMessage = "Loading Upgrade Matrix Details";
      testcaseService.loadUpgradeMatrix(type,id).then(
        (data) => {
          debugger;
           self.upgradeMatrixTotalData=[];
           self.upgradeMatrixTotalData=data.data0;
        },
        (error)=>{

        });
/** code for weekly upgrade matrix */
         testcaseService.loadWeeklyUpgradeMatrix(type,id).then(
        (data) => {
          let dates=[];
          let trWeekDates=[];
          let upgradeWeeklycountArray={};
          for(let m=0;m<Object.keys(data).length;m++){
          
            trWeekDates.push(data[Object.keys(data)[m]].end_date);
            upgradeWeeklycountArray[data[Object.keys(data)[m]].end_date]=data[Object.keys(data)[m]].upgrades.length;
            self.upgradeMatrixData[data[Object.keys(data)[m]].end_date]=[];
            self.upgradeMatrixData[data[Object.keys(data)[m]].end_date]=data[Object.keys(data)[m]].upgrades;
          }
            let upgradeHeatMapOptions=self.loadHeatMapOptions();
            upgradeHeatMapOptions.title.text="";
            upgradeHeatMapOptions.xAxis.categories=[];
            let totalTrs=[],trnames={},weekdates=[];
            for(let g=0;g<trWeekDates.length;g++){
              weekdates.push(trWeekDates[g].substring(0,10));
              upgradeWeeklycountArray[trWeekDates[g].substring(0,10)]={};
              let tempUpgrades=self.upgradeMatrixData[trWeekDates[g]];
               trnames[trWeekDates[g].substring(0,10)]=[];
              for(let t=0;t<tempUpgrades.length;t++){
                if(trnames[trWeekDates[g].substring(0,10)].indexOf(tempUpgrades[t].upgrade)>-1){
                   upgradeWeeklycountArray[trWeekDates[g].substring(0,10)][tempUpgrades[t].upgrade]["count"]+=parseInt(tempUpgrades[t].actual);
                    if(tempUpgrades[t].failed>0){
                    upgradeWeeklycountArray[trWeekDates[g].substring(0,10)][tempUpgrades[t].upgrade]["failed"]=true;
                  }
                }
                else{
                  if(totalTrs.indexOf(tempUpgrades[t].upgrade)<0){
                    totalTrs.push(tempUpgrades[t].upgrade);
                  }
                  trnames[trWeekDates[g].substring(0,10)].push(tempUpgrades[t].upgrade);
                  upgradeWeeklycountArray[trWeekDates[g].substring(0,10)][tempUpgrades[t].upgrade]={count:parseInt(tempUpgrades[t].actual),failed:false};
                  if(tempUpgrades[t].failed>0){
                    upgradeWeeklycountArray[trWeekDates[g].substring(0,10)][tempUpgrades[t].upgrade]["failed"]=true;
                  }
                }
              }
           }

          let valueArray=[],valueObj={};
           for(let i=0;i<trWeekDates.length;i++){
             for(let j=0;j<totalTrs.length;j++){
               if(trnames[trWeekDates[i].substring(0,10)].indexOf(totalTrs[j])>-1){
                  valueObj={};
              valueObj["x"]=i;
              valueObj["y"]=j;
              valueObj["color"]='#86e0fc';
             valueObj["color"]=upgradeWeeklycountArray[trWeekDates[i].substring(0,10)][totalTrs[j]]["failed"]?"#f0f062":"#42be07";
              valueObj["value"]=upgradeWeeklycountArray[trWeekDates[i].substring(0,10)][totalTrs[j]]["count"];
              valueArray.push(valueObj);
               }
               else{
                 valueObj={};
              valueObj["x"]=i;
              valueObj["y"]=j;
              valueObj["value"]="";
              valueObj["color"]='#fff';
              valueArray.push(valueObj);
               }
             }
           }
            upgradeHeatMapOptions.yAxis.categories=totalTrs;
            upgradeHeatMapOptions.xAxis.categories=weekdates;
            upgradeHeatMapOptions.series[0].data=valueArray;
            self.upgradeHeatMapOptions=upgradeHeatMapOptions;
        },
        (error)=>{

        });
      },
       loadCaveatlist(){
      let self=this;
         let type="customer";
          let id = this.selectedFolderName + "," + this.selectedCustomer;

       testcaseService.loadCaveatList(type, id).then(
        (data) => {
          debugger;
          self.caveatList = data;
        },
        (error) => {}
      );

    },
     loadTriggerMatrix(){
         let self=this;
         let type="customer";
          let id = this.selectedFolderName + "," + this.selectedCustomer;
      // this.loading = false;
      //this.loadingMessage = "Loading Trigger Matrix Details";
      testcaseService.loadTriggerMatrix(type,id).then(
        (data) => {
          debugger;
           self.triggerMatrixTotalData=data.data0;
          },
        (error)=>{

        });
/** code for weekly trigger matrix */
         testcaseService.loadWeeklyTriggerMatrix(type,id).then(
        (data) => {
         let dates=[];
          let trWeekDates=[];
          let triggerWeeklycountArray={};
          for(let m=0;m<Object.keys(data).length;m++){
            trWeekDates.push(data[Object.keys(data)[m]].end_date);
            triggerWeeklycountArray[data[Object.keys(data)[m]].end_date]=data[Object.keys(data)[m]].triggers.length;
            self.triggerMatrixData[data[Object.keys(data)[m]].end_date]=[];
            self.triggerMatrixData[data[Object.keys(data)[m]].end_date]=data[Object.keys(data)[m]].triggers;
           }
           

            let triggerHeatMapOptions=self.loadHeatMapOptions();
            triggerHeatMapOptions.title.text="";
            triggerHeatMapOptions.xAxis.categories=[];
            let totalTrs=[],trnames={},weekdates=[];
            for(let g=0;g<trWeekDates.length;g++){
              weekdates.push(trWeekDates[g].substring(0,10));
              triggerWeeklycountArray[trWeekDates[g].substring(0,10)]={};
              let tempTriggers=self.triggerMatrixData[trWeekDates[g]];
               trnames[trWeekDates[g].substring(0,10)]=[];
              for(let t=0;t<tempTriggers.length;t++){
                if(trnames[trWeekDates[g].substring(0,10)].indexOf(tempTriggers[t].trigger)>-1){
                   triggerWeeklycountArray[trWeekDates[g].substring(0,10)][tempTriggers[t].trigger]["count"]+=parseInt(tempTriggers[t].actual);
                   if(tempTriggers[t].failed>0){
                    triggerWeeklycountArray[trWeekDates[g].substring(0,10)][tempTriggers[t].trigger]["failed"]=true;
                  }
                }
                else{
                  if(totalTrs.indexOf(tempTriggers[t].trigger)<0){
                    totalTrs.push(tempTriggers[t].trigger);
                  }
                  trnames[trWeekDates[g].substring(0,10)].push(tempTriggers[t].trigger);
                  triggerWeeklycountArray[trWeekDates[g].substring(0,10)][tempTriggers[t].trigger]={count:parseInt(tempTriggers[t].actual),failed:false};
                  if(tempTriggers[t].failed>0){
                    triggerWeeklycountArray[trWeekDates[g].substring(0,10)][tempTriggers[t].trigger]["failed"]=true;
                  }
                }
              }
           }

          let valueArray=[],valueObj={};
           for(let i=0;i<trWeekDates.length;i++){
             for(let j=0;j<totalTrs.length;j++){
               if(trnames[trWeekDates[i].substring(0,10)].indexOf(totalTrs[j])>-1){
                  valueObj={};
              valueObj["x"]=i;
              valueObj["y"]=j;
              valueObj["color"]=triggerWeeklycountArray[trWeekDates[i].substring(0,10)][totalTrs[j]]["failed"]?"#f0f062":"#42be07";
              valueObj["value"]=triggerWeeklycountArray[trWeekDates[i].substring(0,10)][totalTrs[j]]["count"];
              valueArray.push(valueObj);
               }
               else{
                 valueObj={};
              valueObj["x"]=i;
              valueObj["y"]=j;
              valueObj["value"]="";
              valueObj["color"]='#fff';
              valueArray.push(valueObj);
               }
             }
           }
            triggerHeatMapOptions.yAxis.categories=totalTrs;
            triggerHeatMapOptions.xAxis.categories=weekdates;
            triggerHeatMapOptions.series[0].data=valueArray;
            self.triggerHeatMapOptions=triggerHeatMapOptions;
        },
        (error)=>{

        });
      },

       loadSummaryData() {
      // for execution summary pie chart
      let allUsers = [];
      let allFeatures = Object.keys(this.summaryButtonsDetails.feature);
      if (this.summaryButtonsDetails.tc_execution_owners) {
        allUsers = Object.keys(this.summaryButtonsDetails.tc_execution_owners);
      }
      let allSource = Object.keys(this.summaryButtonsDetails.source);
      let allCFD = Object.keys(this.summaryButtonsDetails.cfds);
      let allDefects = Object.keys(this.summaryButtonsDetails.defects);
      let allRoles = Object.keys(this.summaryButtonsDetails.role);
      // let allPlatformRoles=Object.keys(this.summaryButtonsDetails.platform_role);
      let allPlatforms = Object.keys(this.summaryButtonsDetails.platform);

      let executionSummaryData = [
        {
          name: "passed",
          color: "#76B947",
          y: this.summaryButtonsDetails.testcasesPassed.count,
        },
        {
          name: "failed",
          color: "#F51720",
          y: this.summaryButtonsDetails.testcasesFailed.count,
        },
        {
          name: "pending",
          color: "#2094df",
          y: this.summaryButtonsDetails.testcasesPending.count,
        },
      ];

      this.summaryOptions.series[0].data = executionSummaryData;
      this.executionSummaryOption = this.summaryOptions;

      // projected execution summary pie chart

    /*  let projectedSummaryData2 = [
        {
          name: "passed",
          color: "#76B947",
          y: this.summaryButtonsDetails.testcasesPassed.projected_count,
        },
        {
          name: "failed",
          color: "#F51720",
          y: this.summaryButtonsDetails.testcasesFailed.projected_count,
        },
        {
          name: "pending",
          color: "#2094df",
          y: this.summaryButtonsDetails.testcasesPending.projected_count,
        },
      ];

      this.summaryOptions1.series[0].data = projectedSummaryData;
      this.executionSummaryOption1 = this.summaryOptions1;*/

      let colors = this.featureColors;
      let dataArr = [],
        qualityArr = [],
        projectedQualityArr = [];
      //platform role bar chart
      //todo change to platform role
      this.quality_platformRole_bar_option.xAxis.categories = allRoles;
      this.role_bar_option.xAxis.categories = allRoles;

      (dataArr = []), (qualityArr = []), (projectedQualityArr = []);
      for (let pr = 0; pr < allRoles.length; pr++) {
        qualityArr.push(this.summaryButtonsDetails.role[allRoles[pr]].quality);
        projectedQualityArr.push(
          this.summaryButtonsDetails.role[allRoles[pr]].projectedQuality
        );

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

      let roleQualityData = [
        {
          name: "Projected Quality",
          color: "#acdf87",
          data: projectedQualityArr,
        },
        {
          name: "Quality",
          color: "#acdf87",
          data: qualityArr,
        },
      ];

      let rolesData = [...dataArr];

      this.quality_platformRole_bar_option.series = roleQualityData;
      this.qualityOption = this.quality_platformRole_bar_option;

      this.role_bar_option.series = rolesData;
      this.roleOption = this.role_bar_option;

      //platform and platform quality bar charts

      this.quality_platform_bar_option.xAxis.categories = allPlatforms;
      this.platform_bar_option.xAxis.categories = allPlatforms;

      (dataArr = []), (qualityArr = []), (projectedQualityArr = []);
      for (let p = 0; p < allPlatforms.length; p++) {
        qualityArr.push(
          this.summaryButtonsDetails.platform[allPlatforms[p]].quality
        );
        projectedQualityArr.push(
          this.summaryButtonsDetails.platform[allPlatforms[p]].projectedQuality
        );

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

      let qualityPlatformData = [
        {
          name: "Projected Quality",
          color: "#acdf87",
          data: projectedQualityArr,
        },
        {
          name: "Quality",
          color: "#acdf87",
          data: qualityArr,
        },
      ];

      let platformData = [...dataArr];

      this.quality_platform_bar_option.series = qualityPlatformData;
      this.qualityPlatformOption = this.quality_platform_bar_option;

      this.platform_bar_option.series = platformData;
      this.platformOption = this.platform_bar_option;

      //feature and feature quality bar charts

      this.quality_feature_bar_option.xAxis.categories = allFeatures;

      (dataArr = []), (qualityArr = []), (projectedQualityArr = []);
      for (let f = 0; f < allFeatures.length; f++) {
        qualityArr.push(
          this.summaryButtonsDetails.feature[allFeatures[f]].quality
        );
        projectedQualityArr.push(
          this.summaryButtonsDetails.feature[allFeatures[f]].projectedQuality
        );

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

      let qualityFeatureData = [
        {
          name: "Projected Quality",
          color: "#acdf87",
          data: projectedQualityArr,
        },
        {
          name: "Quality",
          color: "#acdf87",
          data: qualityArr,
        },
      ];

      let featureData = [...dataArr];

      this.quality_feature_bar_option.series = qualityFeatureData;
      this.qualityFeatureOption = this.quality_feature_bar_option;

      this.bar_option.series = featureData;
      this.featureOption = this.bar_option;

      //Source and Source quality bar charts

      this.quality_source_bar_option.xAxis.categories = allSource;
      this.source_bar_option.xAxis.categories = allSource;

      (dataArr = []), (qualityArr = []), (projectedQualityArr = []);
      for (let ft = 0; ft < allSource.length; ft++) {
        qualityArr.push(
          this.summaryButtonsDetails.source[allSource[ft]].quality
        );
        projectedQualityArr.push(
          this.summaryButtonsDetails.source[allSource[ft]].projectedQuality
        );
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

      let qualitySrcData = [
        {
          name: "Projected Quality",
          color: "#acdf87",
          data: projectedQualityArr,
        },
        {
          name: "Quality",
          color: "#acdf87",
          data: qualityArr,
        },
      ];

      let sourceData = [...dataArr];

      this.quality_source_bar_option.series = qualitySrcData;
      this.qualitySrcOption = this.quality_source_bar_option;

      this.source_bar_option.series = sourceData;
      this.srcOption = this.source_bar_option;

   
    
/*
      //defect charts

      let defectByTestcaseOwners = 0;
      let testcaseCDETS = [];
      let defectByOthers = 0;
      let Str1 = this.cdetsReleaseFolderName + "_ss";
      let Str2 = this.cdetsReleaseFolderName + "-ss";
      let mhDefects = [];
      for (let ra = 0; ra < this.cdets.length; ra++) {
        if (
          (this.cdets[ra].status === "A" ||
            this.cdets[ra].status === "I" ||
            this.cdets[ra].status === "N" ||
            this.cdets[ra].status === "O" ||
            this.cdets[ra].status === "H") &&
          this.cdets[ra].attribute &&
            (this.cdets[ra].attribute.indexOf(Str1) > -1 ||
              (this.cdets[ra].attribute &&
                this.cdets[ra].attribute.indexOf(Str2) > -1))
        ) {
          mhDefects.push(this.cdets[ra]);
        }
        this.mhDefectsCount = mhDefects.length;
        testcaseCDETS.push(this.cdets[ra]);
        if (allUsers.indexOf(this.cdets[ra].submitter) > -1) {
          defectByTestcaseOwners += 1;
        } else {
          defectByOthers += 1;
        }
      }

      this.mhDefects = mhDefects;
      this.testcaseCdets = testcaseCDETS;

      let testcaseDefectSummaryDeatils = [
        ["Found", defectByTestcaseOwners],
        ["Observed", defectByOthers],
      ];
      this.testcaseDefectSummary = testcaseDefectSummaryDeatils;

      this.pie_option1.series[0].data = this.testcaseDefectSummary;
      this.defectOption = this.pie_option1;


      //user chart
      let userArray = [];
      let colors1 = this.featureColors;
      let obj = {};
      for (let u = 0; u < allUsers.length; u++) {
        if (allUsers[u] != null) {
          obj = {};
          obj["value"] = 10;
          obj["name"] = allUsers[u];
          obj["color"] = colors1[u % colors1.length];
          userArray.push(obj);
        }
      }
      this.userSummary = userArray;

      this.userOption.series[0].data = this.userSummary;

      //defect testcase user chart

      this.testcases_defects_by_users_bar_option.xAxis.categories = allUsers;
      this.testcases_defects_by_users_bar_option.series = this.loadMultiBarChartDataForUser();
      this.testcaseDefectsByUsersOption = this.testcases_defects_by_users_bar_option;

      this.ganttOptions1.series[0].data[0].completed.amount =
        this.summaryButtonsDetails.testcasesExecuted.percentage / 100;
      this.ganttOptions.series[0].data[2].completed.amount =
        this.summaryButtonsDetails.testcasesExecuted.percentage / 100;
        */
    },

    
      
 loadSummaryButtonDetails() {
        let self=this;
         let type="customer";
          let id = this.selectedFolderName + "," + this.selectedCustomer;
      testcaseService.fetchSummaryBtnDetails(type, id).then(
        (data) => {
          self.summaryButtonsDetails = data;
          self.loadSummaryData();
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
    loadAhaList() {
      let self = this;
      let type = "customer";
      let id = this.selectedFolderName + "," + this.selectedCustomer;
      this.loading = false;
      this.loadingMessage = "Loading AHA feature list";
      testcaseService.loadAHAList(type, id).then(
        (data) => {
          self.loading = false;
          self.loadingMessage = "";
          if (data.length > 0) {
            self.ahaList = [...data];
            for (let k = 0; k < self.ahaList.length; k++) {
              if (self.ahaList[k].enablement_ETA) {
                if (new Date(self.ahaList[k].enablement_ETA) < new Date()) {
                  if (
                    self.ahaList[k].enablement_status &&
                    self.ahaList[k].enablement_status.toLowerCase() ===
                      "completed"
                  ) {
                    self.ahaList[k]["enablement_status_color"] = "greenText";
                  } else if (
                    self.ahaList[k].enablement_status &&
                    self.ahaList[k].enablement_status.toLowerCase() ===
                      "inprogress"
                  ) {
                    self.ahaList[k]["enablement_status_color"] = "redText";
                  } else if (
                    self.ahaList[k].enablement_status &&
                    self.ahaList[k].enablement_status.toLowerCase() ===
                      "pending"
                  ) {
                    self.ahaList[k]["enablement_status_color"] = "redText";
                  }
                } else {
                  if (
                    self.ahaList[k].enablement_status &&
                    self.ahaList[k].enablement_status.toLowerCase() ===
                      "completed"
                  ) {
                    self.ahaList[k]["enablement_status_color"] = "greenText";
                  } else if (
                    self.ahaList[k].enablement_status &&
                    self.ahaList[k].enablement_status.toLowerCase() ===
                      "inprogress"
                  ) {
                    self.ahaList[k]["enablement_status_color"] = "skyBlueText";
                  } else if (
                    self.ahaList[k].enablement_status &&
                    self.ahaList[k].enablement_status.toLowerCase() ===
                      "pending"
                  ) {
                    self.ahaList[k]["enablement_status_color"] = "redText";
                  }
                }
              } else {
                self.ahaList[k]["enablement_status_color"] = "skyBlueText";
              }

              if (
                self.ahaList[k].feature_relatedTCs === "" ||
                self.ahaList[k].feature_relatedTCs === null ||
                self.ahaList[k].feature_relatedTCs === undefined
              ) {
                self.ahaList[k]["noRelatedTcsFlag"] = "yellowHighlight";
              } else {
                self.ahaList[k]["noRelatedTcsFlag"] = "noHighlight";
              }
            }

            self.ahaTableColumns = Object.keys(data[0]);
            self.showAhaTable = true;
          } else {
            self.ahaList = [];
            self.ahaTableColumns = [];
            self.showAhaTable = false;
          }
        },
        (error) => {
          self.loading = false;
          self.loadingMessage = "";
          self.showErrorModal = true;
          self.modalErrorMessage = "Error while loading AHA List";
        }
      );
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
     sortByDate(arr, key) {
      return arr.sort(function(a, b) {
        var dateA = new Date(a[key]).getTime();
        var dateB = new Date(b[key]).getTime();
        return dateA < dateB ? 1 : -1;
      });
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
      if(tempelem && temp1elem1){
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

       this.relPaths=this.custObj.rel_paths;
      let pageContentDiv=document.querySelector('.pageContentDiv');
      pageContentDiv.classList.forEach(cname => {
        if(cname!="pageContentDiv" && cname !== type){
          pageContentDiv.classList.remove(cname)
          }
        });
      this.selectedGrpBtn=type;
      let selectedDetailsElement=document.querySelector('.selectedDetails');
      if(selectedDetailsElement){
        selectedDetailsElement.classList.remove('selectedDetails');
      }
      let custMainWrapper=document.querySelector('.custMainWrapper');
      let displayElement=document.querySelector('.'+type);
      if(displayElement){
         // this.scrollToTargetAdjusted('.'+type);
         // displayElement.scrollIntoView(true);
         // displayElement.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        
          if(type==="custDetails"){
          custMainWrapper.classList.add('custTopMargin');
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
         else if(type==="upcomingDetails"){
          this.toggleClassMethod('defaultUpcomingDetails','activeUpcomingDetails');
        }
        else if(type==="worldMapDetails"){
          this.toggleClassMethod('defaultWorldMapDetails','activeWorldMapDetails');
        }

         else if(type==="CFDDetails"){
          this.toggleClassMethod('defaultCFDDetails','activeCFDDetails');
        }
        

        else if(type==="rorDetails"){
          this.toggleClassMethod('defaultRorDetails','activeRorDetails');
        }
		else if(type==="ahaDetails"){
          this.toggleClassMethod('defaultAhaDetails','activeAhaDetails');
        }
		else if(type==="rolesDetails"){
          this.toggleClassMethod('defaultRolesDetails','activeRolesDetails');
        }
		else if(type==="platformDetails"){
          this.toggleClassMethod('defaultPlatformDetails','activePlatformDetails');
        }
		else if(type==="executionDetails"){
          this.toggleClassMethod('defaultExecutionDetails','activeExecutionDetails');
        }
		else if(type==="qualityDetails"){
          this.toggleClassMethod('defaultQualityDetails','activeQualityDetails');
        }
		else if(type==="testPlanDetails"){
          this.toggleClassMethod('defaultTestPlanDetails','activeTestPlanDetails');
        }
		else if(type==="topologyDetails"){
          this.toggleClassMethod('defaultTopologyDetails','activeTopologyDetails');
        }
		else if(type==="caveatsDetails"){
          this.toggleClassMethod('defaultCaveatsDetails','activeCaveatsDetails');
        }
		else if(type==="upgradeMatrixDetails"){
          this.toggleClassMethod('defaultUpgradeMatrixDetails','activeUpgradeMatrixDetails');
        }
		else if(type==="triggerMatrixDetails"){
          this.toggleClassMethod('defaultTriggerMatrixDetails','activeTriggerMatrixDetails');
        }
		else if(type==="readinessDetails"){
          this.toggleClassMethod('defaultReadinessDetails','activeReadinessDetails');
        }
		else if(type==="postFcsDetails"){
          this.toggleClassMethod('defaultPostFcsDetails','activePostFcsDetails');
        }

       if(type==="custDetails"){
         if(!custMainWrapper.classList.contains('custTopMargin')){
             custMainWrapper.classList.add('custTopMargin');
         }
         if(custMainWrapper.classList.contains('otherTopMargin')){
           custMainWrapper.classList.remove('otherTopMargin');
         }
       }
       else{
         if(!custMainWrapper.classList.contains('otherTopMargin')){
             custMainWrapper.classList.add('otherTopMargin');
         }
         if(custMainWrapper.classList.contains('custTopMargin')){
           custMainWrapper.classList.remove('custTopMargin');
         }
       }
    }
   //   displayElement.scrollIntoView(true);
    if(!pageContentDiv.classList.contains(type))
    {
      pageContentDiv.classList.add(type); 
    } 
    let custMenuButtons=document.querySelectorAll('.custMenuButtons');
     for(let m=0;m<custMenuButtons.length;m++){
       if(custMenuButtons[m].classList.contains("selectedOption")){
         custMenuButtons[m].classList.remove('selectedOption');
       }
     }
     let selectedDiv=document.querySelector('.'+type+'_div');
     selectedDiv.classList.add('selectedOption');
      event.preventDefault();
      event.stopPropagation();
    },

    cfdTabChanged(){

    },
    createRor(){
      this.showRorAddRelModal=true;
    },
    showRelPath(){
      this.showRelPathModal=true;
    },
    closeRelPathModal(){
       this.showRelPathModal=false;
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
          enabled: true,
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
    loadCylinderChartOption(){
    return {
        chart: {
          backgroundColor: null,
          type: "cylinder",
          options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            depth: 50,
            viewDistance: 25,
          },
        },
        xAxis: {
          categories: [],
         },
        title: {
          text: "",
          align: 'center',
        verticalAlign: 'bottom',
        },
        subtitle: {
          text: "",
        },
        credits: false,
        plotOptions: {
          series: {
            depth: 25,
            colorByPoint: true,
          },
          showInLegend: false,
        },
        series: [{
          data:[]
        }
        ],
      }
  },

    loadPieChartOptions() {
      return {
        title: {
          text: "chart",
        },
        subtitle:{
           text: "",
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
    getVersion(temp){
      if(temp){
     return temp.substring(0,temp.lastIndexOf('.'));
      }
      else{
        return "";
      }
    },
    loadDefectsDetails() {
      let self = this;
      self.componentOptions = {};

      let smuDetails=this.custObj.smuDetails;
      let cfdList=this.custObj.cfdDetails;
      
      let smuRels=Object.keys(smuDetails);
      let relPrs=[],prRevs=[],templist=[],temp="";
      let allRevs=[],allPrs=[];

        relPrs=Object.keys(smuDetails[this.selectedProdRel]);
        for(let l=0;l<relPrs.length;l++){
          prRevs=Object.keys(smuDetails[this.selectedProdRel][relPrs[l]]);
          for(let m=0;m<prRevs.length;m++){
            if(smuDetails[this.selectedProdRel][relPrs[l]][prRevs[m]] != ""){
              temp=smuDetails[this.selectedProdRel][relPrs[l]][prRevs[m]].split(',');
              templist=templist.concat(temp);
            }
          }
        }
      

    /**  code for grouped  column chart */
	   let chartList={};

      relPrs=Object.keys(smuDetails[this.selectedProdRel]);
       allPrs=relPrs;
        allPrs=[...new Set(allPrs)];
    
      for(var l=0;l<allPrs.length;l++){
        chartList[allPrs[l]]={}
      }

         relPrs=Object.keys(smuDetails[this.selectedProdRel]);
         for(var ar=0;ar<relPrs.length;ar++){
           if(smuDetails[this.selectedProdRel][relPrs[ar]]){
             prRevs=Object.keys(smuDetails[this.selectedProdRel][relPrs[ar]]);
             console.log(prRevs);
             allRevs=allRevs.concat(prRevs);
             allRevs=[...new Set(allRevs)];
             }
             }
        
    for(var l=0;l<allPrs.length;l++){
	 if(smuDetails[this.selectedProdRel][allPrs[l]]){
	   for(var re=0;re<allRevs.length;re++){
	     if(smuDetails[this.selectedProdRel][allPrs[l]][allRevs[re]]){
		   chartList[allPrs[l]][allRevs[re]]=[];
		   chartList[allPrs[l]][allRevs[re]]=smuDetails[this.selectedProdRel][allPrs[l]][allRevs[re]].split(',');
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
      revSMUChartOptions.title.text=this.selectedProdRel+"-SMU Count per Revs";
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
      self.componentOptions.title.text ="Component";
      self.componentOptions.subtitle.text = "defect distribution"

      self.statusOptions = {};
      self.statusOptions = this.loadPieChartOptions();
      self.statusOptions.title.text ="Status";
      self.statusOptions.subtitle.text = "defect distribution";

      self.productOptions = this.loadPieChartOptions();
      self.productOptions.title.text = "Product";
      self.productOptions.subtitle.text = "defect distribution";

      self.severityOptions = this.loadPieChartOptions();
      self.severityOptions.title.text = "Severity";
      self.severityOptions.subtitle.text =  "defect distribution";


      self.foundObservedOptions = this.loadPieChartOptions();
      self.foundObservedOptions.title.text = "Found During";
      self.foundObservedOptions.subtitle.text =  "defect distribution";
    
     testcaseService.loadCFDListDetails(cfdList).then(
        (data) => {
          self.cfdDetails=data;
          self.cfdArrayList=[...data];
          for(let i=0;i<self.cfdArrayList.length;i++){
            self.cfdArrayList[i]["version"]=this.getVersion(self.cfdArrayList[i].orginal_version);
          }
          for(let k=0;k<self.cfdHeadings.length;k++){
            for(let f=0;f<self.cfdArrayList.length;f++){
            let newData = {value: self.cfdArrayList[f][self.cfdHeadings[k].field], html: true, text:self.cfdArrayList[f][self.cfdHeadings[k].field]};
            self.cfdHeadings[k].filterOptions.filterDropdownItems.push(newData);
            }
          }
         },
        (error)=>{

        });


      testcaseService.loadSmuDetails(smulist).then(
        (data) => {
          let components=[],products=[],severity=[],foundDuring=[];
            let smuDetailsArray={ components :{},products:{},status:{},severity:{},foundDuring:{}};
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

              if(severity.indexOf(data[s].severity)<0){
                 severity.push(data[s].severity);
                smuDetailsArray.severity[data[s].severity]=[];
                smuDetailsArray.severity[data[s].severity].push(data[s].defect_id);
              }
              else{
                smuDetailsArray.severity[data[s].severity].push(data[s].defect_id);
              }

              if(foundDuring.indexOf(data[s].found_during)<0){
                 foundDuring.push(data[s].found_during);
                smuDetailsArray.foundDuring[data[s].found_during]=[];
                smuDetailsArray.foundDuring[data[s].found_during].push(data[s].defect_id);
              }
              else{
                smuDetailsArray.foundDuring[data[s].found_during].push(data[s].defect_id);
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

            if (severity.length > 0) {
              self.severityData = [];
              for (let sv = 0; sv < severity.length; sv++) {
                let obj = {};
                obj["name"] = severity[sv];
                obj["color"] = colors[sv % colors.length];
                obj["y"] = smuDetailsArray.severity[severity[sv]].length;
                self.severityData.push(obj);
               }
                self.severityOptions.series[0].data = self.severityData;
               }

               if (foundDuring.length > 0) {
              self.foundObserveData = [];
              for (let fd = 0; fd < foundDuring.length; fd++) {
                let obj = {};
                obj["name"] = foundDuring[fd];
                obj["color"] = colors[fd % colors.length];
                obj["y"] = smuDetailsArray.foundDuring[foundDuring[fd]].length;
                self.foundObserveData.push(obj);
               }
                self.foundObservedOptions.series[0].data = self.foundObserveData;
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
    sortByValue(arr, key) {
      return arr.sort(function(a, b) {
        return a[key] < b[key] ? 1 : -1;
      });
    },
    changerelclicked(rname){
    let imageBubbleChartOptions = JSON.parse(JSON.stringify(this.packedBubbleOptions));
    this.selectedProdRel=rname;
    imageBubbleChartOptions.series = this.imageSummaryList[rname];
    imageBubbleChartOptions.title.text="Prod Images -"+this.selectedProdRel;
      this.imageBubbleChartOptions = { ...imageBubbleChartOptions };
        this.loadDefectsDetails();
    },
      getImageRelKeys(){
         let keylist=Object.keys(this.imageSummaryList);
         let arr=[];
         for(let k=0;k<keylist.length;k++){
           if(this.selectedProdRel!=keylist[k]){
              arr.push(keylist[k]);
           }
         }
         return arr;
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
    loadWeeklyReportByCustomerName() {
      let self = this;
      testcaseService.getWeeklyReportByCustomer(this.selectedFolderName, this.selectedCustomer).then(
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
    getRelsForRor(){
      let releases=this.releases;
      let rels=[],rorversions=[];
      for(let i=0;i<this.rorlist.length;i++){
       rorversions.push(this.rorlist[i].release_version);
      }
      for(let k=0;k<releases.length;k++){
        if(!this.checkActiveBtn(releases[k]) && rorversions.indexOf(releases[k])<0){
           rels.push(releases[k]);
        }
      }
      return rels;
    },
    closeAddRorModal(){
       this.selectedRelForCompare="";
       this.showRorAddRelModal=false;
    },
    addToCompare(){
       let self=this;
      let type="customer";
      let id = this.selectedRelForCompare + "," + this.selectedCustomer;
      testcaseService.loadRorDetails(type, id).then(
        (data) => {
          let rorIds=[];
          for(let k=0;k<this.rorlist.length;k++){
            rorIds.push(this.rorlist.release_version);
          }
          if(rorIds.indexOf(data.release_version)<0){
             self.rorlist.push(data);
          }
             self.showRorAddRelModal=false;
      self.selectedRelForCompare="";
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
    getFilteredDate(d){
      if(d){
        return d.substring(0,10);
      }
      else{
       return '';
      }
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
    checkActiveBtn(fname) {
      if(this.selectedGrp==='cvt'){
      if (
        this.inactiveBtns.indexOf(fname) < 0 &&
        this.selectedCustomer != ""
      ) {
        return false;
      } else {
        return true;
      }
      }
      else{
        return true;
      }
    },
    loadTestcaseCDETSData() {
      let cdets = this.mhDefects;
      let cdet_components = [],
        cdet_components2 = [];
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
      let cdetsArr = [];
      for (let q = 0; q < cdet_components2.length; q++) {
        cdetsArr.push([cdet_components2[q].name, cdet_components2[q].count]);
      }
      return cdetsArr;
    },
      loadCDETSData() {
      let self = this;
     let type="customer";
      let id = this.selectedFolderName + "," + this.selectedCustomer;
        testcaseService.getCDETSDetails(type, id).then(
          (data) => {
            self.loading = true;
          //  self.loadingMessage = "updating charts";
            self.cdets = data;
            let submitters = [],
              cdet_components = [],
              cdet_status = [];
           let submitterWithFilters=[], componentWithFilter=[], statusWithFilter=[];

            for (let i = 0; i < self.cdets.length; i++) {
              submitters.push(self.cdets[i].submitter);
              cdet_components.push(self.cdets[i].component);
              cdet_status.push(self.cdets[i].status);
              self.cdets[i]["tcCount"] = 0;
              self.cdets[i]["tcFailures"] = 0;
              self.cdets[i]["tcBlockers"] = 0;
             }
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

            let cdetsOptions2=self.loadPieChartOptions();
            let cdetsOptions1=self.loadCylinderChartOption();
             let cdetsOptions3=self.loadPieChartOptions();

            let arr = [],few1=[],
              fe1 = [];
            for (let r = 0; r < submitters2.length; r++) {
              arr = [];
              arr.push(submitters2[r].name);
              arr.push(submitters2[r].count);
              fe1.push(arr);
            }
           // self.cdets_submitter_data = fe1;
            cdetsOptions2.series[0].data = fe1;
            cdetsOptions2.colors = [
              "#003f5c",
              "#2f4b7c",
              "#665191",
              "#a05195",
              "#d45087",
              "#f95d6a",
              "#ff7c43",
              "#ffa600",
            ];
            self.submitterDefectOption = cdetsOptions2;

          
            cdet_components2=self.sortByValue(cdet_components2,"count");
            let fe2 = [],
              arr1 = [],
              cdet1names = [];
            for (let s = 0; s < cdet_components2.length; s++) {
              arr = [];
              arr.push(cdet_components2[s].name);
              arr.push(cdet_components2[s].count);
              arr1.push(cdet_components2[s].count);
              cdet1names.push(cdet_components2[s].name);
              fe2.push(arr);
            }
           // self.cdets_component_data = fe2;
            cdetsOptions1.series[0].data = fe2;
            cdetsOptions1.colors = self.featureColors;
            cdetsOptions1.xAxis.categories = cdet1names;
            cdetsOptions1.series = [
              {
                data: arr1,
                showInLegend: false,
                point: {
                  events: {
                    click: (e) => {
                    //  this.updateSelectedCdetsList(e, "component");
                    },
                  },
                },
              },
            ];

            self.componentDefectOption = cdetsOptions1;
            
            let few2=[];
            
            let fe3 = [];
            for (let t = 0; t < cdet_status2.length; t++) {
              arr = [];
              arr.push(cdet_status2[t].name);
              arr.push(cdet_status2[t].count);
              fe3.push(arr);
            }
           // self.cdets_status_data = fe3;
            cdetsOptions3.series[0].data = fe3;
            self.statusDefectOption = cdetsOptions3;

              let defectByTestcaseOwners = 0;
      let testcaseCDETS = [];
      let defectByOthers = 0;
      let Str1 = self.selectedFolderName + "_ss";
      let Str2 = self.selectedFolderName + "-ss";
      let mhDefects = [];
      for (let ra = 0; ra < self.cdets.length; ra++) {
        if (
          (self.cdets[ra].status === "A" ||
            self.cdets[ra].status === "I" ||
            self.cdets[ra].status === "N" ||
            self.cdets[ra].status === "O" ||
            self.cdets[ra].status === "H") &&
          self.cdets[ra].attribute &&
            (self.cdets[ra].attribute.indexOf(Str1) > -1 ||
              (self.cdets[ra].attribute &&
                self.cdets[ra].attribute.indexOf(Str2) > -1))
        ) {
          mhDefects.push(self.cdets[ra]);
          
        }
      }
        self.mhDefects = mhDefects;
        let pie_option3=self.loadPieChartOptions();
       pie_option3.title.text="MH Defects";
       pie_option3.series[0].data = self.loadTestcaseCDETSData();
      self.mhHaveOption = pie_option3;
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
    relClicked(fname) {
      //this.showCustomerFlag = false;
     /* if (this.selectedCustomer === "Google") {
        this.selectedFolderName = fname;
      
        this.loadSummaryButtonDetails("folder", fname);
        this.loadWeeklyReportByCustomerName(fname, "Google");
        //myTree.refresh(treeData)
      }*/
        this.loadGanttChart(fname);
        this.loadCDETSData(fname);
      let allreldivs=document.querySelectorAll('.fmenuItem');
      for(let f=0;f<allreldivs.length;f++){
        if(allreldivs[f].classList.contains('selectedRelBtn')){
          allreldivs[f].classList.remove('selectedRelBtn');
        }
      }
      let selectedRelDiv=document.querySelector('.rel_'+fname);
      selectedRelDiv.classList.add('selectedRelBtn');
      this.selectedFolderName = fname;
      this.loadAhaList();
      this.loadCaveatlist();
    this.loadTriggerMatrix();
    this.loadUpgradeMatrix();
    this.loadSummaryButtonDetails();
    this.loadRorDetails();
    this.displayDetails('worldMapDetails');
    this.loadWeeklyReportByCustomerName();
    },
    getColoumnsForRelPaths(){
      let columns=[{
         label: 'Release',
          field: 'release',
      },
      {
         label: 'Rev',
          field: 'rev',
},
{
 label: 'Platform',
          field: 'platform',
},
{ label: 'Image Location',
          field: 'image_location',

}]
return columns;
    },
    loadRorDetails(){
      this.rorlist=[];
       let self=this;
      let type="customer";
      let id = this.selectedFolderName + "," + this.selectedCustomer;
      testcaseService.loadRorDetails(type, id).then(
        (data) => {
          if(data.id){
          let rorIds=[];
          for(let k=0;k<this.rorlist.length;k++){
            rorIds.push(this.rorlist.id);
          }
          if(rorIds.indexOf(data.id)<0){
             this.rorlist.push (data);
          }
          }
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
    datediff(first, second) {
      // Take the difference between the dates and divide by milliseconds per day.
      // Round to nearest whole number to deal with DST.
      return Math.round((second - first) / (1000 * 60 * 60 * 24));
    },
    getExampleCustObj() {
      debugger;
      return customers;
    },
    getPids(pName){
      return this.pTableDetails[pName].pids;
    },
    getCurrentRelease(pName){
      return this.platformReleaseDetails[pName].current_release;
    },
    getNextRelease(pName){
      return this.platformReleaseDetails[pName].next_release;
    },
    customerClicked(e, custName) {
      this.custObj = customer_list[0]; //default behaviour with first obj
        this.selectedCustomer = e.currentTarget.getAttribute('data-field');
      for (let k = 0; k < customer_list.length; k++) {
        if (customer_list[k].name === custName) {
          this.custObj = customer_list[k];
        }
      }
      debugger;
       this.platformReleaseDetails={...this.custObj.platformReleaseDetails};
     
      let platformTableDetails={...this.custObj.roleDetails};
      let pTableDetails={};
      let ptKeys=Object.keys(platformTableDetails);
      for(let pt=0;pt<ptKeys.length;pt++){
        let pkeyname=ptKeys[pt]
        if(ptKeys[pt]==="_8000"){
          pkeyname="8000"
        }
        pTableDetails[pkeyname]={};
        pTableDetails[pkeyname]["pids"]="";
        let pids=this.custObj.platformDetails[pkeyname].chassisList;
        if(pids!=""){
          pids+=",";
          }
          pids+=this.custObj.platformDetails[pkeyname].cardList
         pTableDetails[pkeyname]["pids"]=pids; 
      }

      this.platformTableDetails=platformTableDetails;
      this.pTableDetails=pTableDetails;

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

    
      let imageBubbleChartOptions = JSON.parse(JSON.stringify(this.packedBubbleOptions));

      let imageDetails = this.custObj.prodImages;
      let revlist = [];
      let imageSummaryList = {};

      let prls = Object.keys(imageDetails);
      this.selectedProdRel=prls[0];
      let imgArray=[];
      for (let i1 = 0; i1 < prls.length; i1++) {
        imgArray=[];
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
          imgArray.push(obj1);
        }
      imageSummaryList[prls[i1]]=[];
      imageSummaryList[prls[i1]]=imgArray;
      }
      this.imageSummaryList=imageSummaryList;
      imageBubbleChartOptions.series = imageSummaryList[this.selectedProdRel];
      this.imageBubbleChartOptions = { ...imageBubbleChartOptions };
      this.imageBubbleChartOptions.title.text="Prod Images -"+this.selectedProdRel;

      this.loadDefectsDetails();

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
    
      let fList = document.querySelectorAll(".fmenuItem");
      for (let n = 0; n < fList.length; n++) {
        let fname = fList[n].innerText;
        if (this.c_releases[e.currentTarget.innerText] && this.c_releases[e.currentTarget.innerText].indexOf(fname) > -1) {
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
      this.displayDetails('custDetails');
     
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
         // self.currentPhase = "";
         // self.compareDates(rdata);
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
          <div class="topnav" style="width:75%">
            <template v-for="(mName, index) in customers">
              <button
                class="fmenuItem12"
                :key="index"
                @click="customerClicked($event, mName)"
                style="flex-direction: column;"
                :data-field="mName"
              >
                <img
                  :src="getImgUrl(mName)"
                  height="50px"
                  width="50px"
                  style="background-size:100% 100%;"
                />
               <span style="display:none">{{ mName }}</span>
              </button>
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
           <div class="multi-button">
  <button name="ibuttons" type="button" class="selectedBtn" @click="multiBtnClicked('customer')"  id="custMBtn">
  <label for="customer">
  Customer</label></button>
  <button name="ibuttons" type="button" @click="multiBtnClicked('cvt')"  id="cvtMBtn" >
  <label for="cvt">
   CVT</label></button>
  <button name="ibuttons" type="button" @click="multiBtnClicked('team')" id="teamMBtn">
  <label for="team">
 Team</label></button>
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
          :class="'fmenuItem rel_'+sName"
          :key="index"
          @click="relClicked(sName)"
          :disabled="checkActiveBtn(sName)"
        >
          {{ sName }}
        </a>
      </template>
      </div>
       <div class="customerNotesContainer row">
      <div class="custmenuWrapper" style="border-right: 1px solid #ddd;"> 
      <div v-show="selectedGrp==='customer'">
       <div class="cust_buttons">
        <template v-for="(cbtn,cname,ind) in cust_buttons">
        <div class="outerClass" :key="'cust'+ind">
    <!--  <button :class="'custMenuButtons  '+cname+'_div'"  @click="displayDetails(cname)">-->
         <button :class="'insideButton custMenuButtons  '+cname+'_div'" @click="displayDetails(cname)">{{cbtn}}</button>
      <!-- </button>-->
       </div>
      </template>
       </div>
      </div>
      <div v-show="selectedGrp==='cvt'">
       <div class="cust_buttons">
        <template v-for="(c1btn,c1name,ind1) in cvt_buttons">
        <div class="outerClass" :key="'cust'+ind1">
      <!--  <button :class="'custMenuButtons  '+c1name+'_div'" :key="'cvt'+ind1" @click="displayDetails(c1name)">-->
         <button :class="'insideButton custMenuButtons  '+c1name+'_div'" @click="displayDetails(c1name)">{{c1btn}}</button>
      <!-- </button> -->
        </div>
        </template>
       </div>
      </div>
    <!-- <div class="cust_buttons">
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
     </div>-->
    </div>
       </div>
    </div>
    <!--<div class="pageContentDiv" v-show="!showCustomerFlag">
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
      </div>-->
     
      <!--<div
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
    </div>-->
    <div class="pageContentDiv" v-show="showCustomerFlag" style="display:flex;">
   
    <div class="custMainWrapper">
       <div v-if="selectedGrpBtn==='custDetails'" class="custrow row">
       <div class="defaultCustDetails  activeDetails ">
       <div class="pageTitle">{{selectedCustomer}} - Customer Details</div>
       <div class="platformTables" style="display:flex;">
       <template v-for="(pTableObj,pname,indp) in platformTableDetails">
        <div class="pTableDiv" :key="indp">
        <div class="pTableHeader">
        <div class="pTableTitle">
        {{pname}}
        </div>
        <div class="pTableImageDiv">
        <img
            :src="getTopoImgUrl('Series_'+pname+'.png')"
            height="150px"
            width="100%"
            style="background-size:100% 100%;"
          />
        </div>
        </div>
        <div class="pTableBody">
        <div class="pTablePids"   v-tooltip.right="{
                  html: pname+'_tooltipContent',
                  class: 'cisco-tooltip',
                }">
        PIDs:  <div class="pidDiv">{{getPids(pname)}}</div>
              <div :id="pname+'_tooltipContent'" class="pidTooltips">
                {{getPids(pname)}}
              </div>
        </div>

         <div class="pTableReleaseDetails">
        <div class="currRelease relDetailsText">
        <div class="releaseText">
        {{getCurrentRelease(pname)}}
        </div>
        <div>
        Current Release
        </div>
        </div>
        <div class="nextRelease relDetailsText">
          <div class="releaseText">
        {{getNextRelease(pname)}}
        </div>
        <div>
        Next Release
        </div>
        </div>
      </div>
        <div class="pTableRoleTable">
        <table class="pTableRTable">
        <tr>
        <th class="pTableRTableTH" style="width:30%">
        Role
        </th>
        <th class="pTableRTableTH" style="width:70%">
        PID
        </th>
        </tr>
        <template v-for="(roleObj,rolename,rind) in pTableObj" >
        <tr :key="rolename+rind">
        <td class="pTableRTableTd" style="width:30%">
        {{rolename}}
        </td>
        <td class="pTableRTableTd" style="width:70%">
         {{roleObj.chassisList}}
        </td>
        </tr>
        </template>
        </table>
        </div>
       
        </div>
        </div>
       </template>
       </div>
       <!-- <div class="funnelChart" style="width:50%">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="platformBubbleChart"
            :option="platformBubbleChartOptions"
          ></chart>
          
        </div>
        <div class="funnelChart" style="width:50%">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="roleBubbleChart"
            :option="rolesBubbleChartOptions"
          ></chart>
        </div>
       -->
      </div>
       <div class="activeCustDetails ">
       <div class="pageTitle">{{selectedCustomer}} - Customer Details</div>
        <div class="platformTables" style="display:flex;">
       <template v-for="(pTableObj,pname,indp) in platformTableDetails">
        <div class="pTableDiv" :key="indp">
        <div class="pTableHeader">
        <div class="pTableTitle">
        {{pname}}
        </div>
        <div class="pTableImageDiv">
        <img
            :src="getTopoImgUrl('Series_'+pname+'.png')"
            height="150px"
            width="100%"
            style="background-size:100% 100%;"
          />
        </div>
        </div>
        <div class="pTableBody">
        <div class="pTablePids">
        PIDs:  <div class="pidDiv">{{getPids(pname)}}</div>
        </div>
          <div class="pTableReleaseDetails">
        <div class="currRelease relDetailsText">
        <div class="releaseText">
        {{getCurrentRelease(pname)}}
        </div>
        <div>
        Current Release
        </div>
        </div>
        <div class="nextRelease relDetailsText">
          <div class="releaseText">
        {{getNextRelease(pname)}}
        </div>
        <div>
        Next Release
        </div>
        </div>
      </div>
        <div class="pTableRoleTable">
        <table class="pTableRTable">
        <tr>
        <th class="pTableRTableTH" style="width:30%">
        Role
        </th>
        <th class="pTableRTableTH" style="width:70%">
        PID
        </th>
        </tr>
        <template v-for="(roleObj,rolename,rind) in pTableObj" >
        <tr :key="rolename+rind">
        <td class="pTableRTableTd" style="width:30%">
        {{rolename}}
        </td>
        <td class="pTableRTableTd" style="width:70%">
         {{roleObj.chassisList}}
        </td>
        </tr>
        </template>
        </table>
        </div>
       
        </div>
        </div>
       </template>
       </div>
       
        </div>
      <!--  <div class="row" style="width:100%;margin-top:40px;display:flex;">
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
          <template v-for="(tobj,tindex) in platformReleaseDetails">
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
          <template v-for="(tobj,tindex) in custObj.platformReleaseDetails">
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
          <template v-for="(tobj,tindex) in custObj.platformReleaseDetails">
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
        </div>--->
      </div>
      <div v-if="selectedGrpBtn==='prodImageDetails'" class="custrow row" style="justify-content: space-between;">
      
        <div class="defaultProdDetails  activeDetails">
          <div class="pageTitle">{{selectedCustomer}} - Prod Images</div>
         <div class="row marginBottom20" >
        <div class="funnelChart" style="width:22%;display:flex;">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="imgeChart"
            :option="imageBubbleChartOptions"
          ></chart>
        
           <div class="proListDiv" >
              <div class="prs">
                 <div v-for="(rname,rind) in getImageRelKeys()" :key="rname+'_'+rind">
                                 <a @click="changerelclicked(rname)" class="prBtn">{{rname}}</a>
                              </div>
                           </div>
                        
           </div>
         </div>
        <div class="funnelChart" style="width:70%;position:relative;">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="ddtsPlatformChart"
            :option="revSMUChartOptions"
          ></chart>
          <div class="relPathLink">
           <a @click="showRelPath" style="font-size:18px;float:right;margin-left:20px;">Image Path</a>
           </div>
        </div>
         </div>
          <div class="row">
        <div class="funnelChart" style="width:22%">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="ddtsProductChart"
            :option="productOptions"
          ></chart>
        </div>
        <div class="funnelChart" style="width:22%">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="ddtsComponentChart"
            :option="componentOptions"
          ></chart>
        </div>
         <div class="funnelChart" style="width:22%">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="ddtsFoundChart"
            :option="severityOptions"
          ></chart>
        </div>
         <div class="funnelChart" style="width:22%">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="ddtsSeverityChart"
            :option="foundObservedOptions"
          ></chart>
        </div>
          </div>
        </div>
         <div class="activeProdDetails ">
          <div class="pageTitle">{{selectedCustomer}} - Prod Images</div>
         <div class="row marginBottom20">
        <div class="funnelChart" style="width:22%;display:flex;">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="imgeChart1"
            :option="imageBubbleChartOptions"
          ></chart>
           <div class="proListDiv" >
              <div class="prs">
                 <div v-for="(rname,rind) in getImageRelKeys()" :key="rname+'_'+rind">
                                 <a @click="changerelclicked(rname)" class="prBtn">{{rname}}</a>
                              </div>
                           </div>
                        
           </div>
        </div>
        <div class="funnelChart" style="width:70%">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="ddtsPlatformChart1"
            :option="revSMUChartOptions"
          ></chart>
           <div class="relPathLink">
           <a @click="showRelPath" style="font-size:18px;float:right;margin-left:20px;">Image Path</a>
           </div>
        </div>
         </div>
          <div class="row">
        <div class="funnelChart" style="width:22%">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="ddtsProductChart1"
            :option="productOptions"
          ></chart>
        </div>
        <div class="funnelChart" style="width:22%">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="ddtsComponentChart1"
            :option="componentOptions"
          ></chart>
        </div>
        <div class="funnelChart" style="width:22%">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="ddtsFoundChart1"
            :option="severityOptions"
          ></chart>
        </div>
        <div class="funnelChart" style="width:22%">
          <chart
            disbleExport="true"
            v-on:child="onChildInteraction"
            id="ddtsSeverityChart1"
            :option="foundObservedOptions"
          ></chart>
        </div>
          </div>
        </div>
      </div>
      <div v-if="selectedGrpBtn==='featureDetails'" class="custrow row" style="justify-content: space-between;">
      <div class="defaultFeatureDetails  activeDetails tilerow">
       <div class="pageTitle">{{selectedCustomer}} - Feature Details</div>
       <div style="display:flex" class="featureDetails">
      <div class="treeVizChart" style="width:70%;margin-right: 30px;margin-left: 30px;">
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
           <!-- <TreevizPage
              class="treeChart"
              :idvalue="'treeObj_'+ind"
              :treeData="treeObj"
              isHorizantal="true"
              revChartFlag="false"
            >
            </TreevizPage>-->
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
      </div>
      <div  class="activeFeatureDetails tilerow">
        <div class="pageTitle">{{selectedCustomer}} - Feature Details</div>
        <div style="display:flex">
       <div class="treeVizChart" style="width:70%;margin-right: 30px;margin-left: 30px;">
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
      
      </div>
      <div  v-if="selectedGrpBtn==='usecaseDetails'" class="custrow row" style="justify-content: space-between;
    ">
     <div class="defaultUsecaseDetails  activeDetails tilerow">
       <div class="pageTitle">{{selectedCustomer}} - Usecase Details</div>
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
     <div class="activeUsecaseDetails tilerow">
        <div class="pageTitle">{{selectedCustomer}} - Usecase Details</div>
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
      <div  v-if="selectedGrpBtn==='upcomingDetails'" class="custrow row" style="justify-content: space-between;">
         
       <div class="defaultUpcomingDetails  activeDetails tilerow">
       <div class="pageTitle">{{selectedCustomer}} - Upcoming Details</div>
         <div class="milestoneImge funnelChart" style="width:100%;">
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
       <div class="activeUpcomingDetails   tilerow">
          <div class="pageTitle">{{selectedCustomer}} - Upcoming Details</div>
         <div class="milestoneImge funnelChart" style="width:100%;">
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
      </div>

      <div  v-if="selectedGrpBtn==='worldMapDetails'" class="custrow row" style="justify-content: space-between;">
         <div class="defaultWorldMapDetails activeDetails ">
         <div class="pageTitle">{{selectedCustomer}} - CVT Details</div>
         <div class="worldMapImge" style="width:98%;">
         <div class="worldmapImageFirstRow" style="width:100%;display:flex !important;">
          <div class="activityDetails" style="width:20%">
          <div class="activityTitle">Deliverables:</div>
             <ul style="list-style-type:none;">
          <li>XR Release Qual</li>
        <li>Esc repro/triage Support</li>
        <li>Prod SMU Support</li>
        <li>Automation</li>
        <li>EoTR</li>
        <li>EFT H/W staging</li>
       <li>NPI Support</li>
        <li>Deployment Support</li>
    </ul>
  </div>
        
         <div class="forWorldMap" style="width:48%;height:700px">
         
         </div>
          <div
            class="worldMapDiagramWrapper"
          >
           <splide
                :options="worldMapSplideOptions"
                 class="mapSlides"
              >
                <splide-slide
                  class="mapSlide"
                 >
           <worldMapChart   v-on:child="onChildInteraction" :chartsData="chartsData" chartTitle="Resources count" 
           chartColor="08c3fe"
                    id="worldMapChart1"
                    class="worldchartsA">
          </worldMapChart>
                </splide-slide>
                 <splide-slide
                  class="mapSlide"
                 >
           <worldMapChart   v-on:child="onChildInteraction" :chartsData="chartsData" chartTitle="Lab count"
           chartColor="ffa500"
                    id="worldMapChartA1"
                    class="worldchartsA">
          </worldMapChart>
                </splide-slide>
           </splide>
          
          </div>
           <div
          class="labDetails"
          style="    width: 25%;
    margin-bottom: 40px;
    font-weight: 600;
   "
        >
            <div class="projectDetails">
          <table class="projectDetailsTable">
           <tr>
         <th>
         Project
         </th>
         <th>
         Location
         </th>
         <th>
         Resources
         </th>
         </tr>
         <template v-for="(pobj1,prname,pind) in projectDetails">
         <tr :key='prname+pind'>
        <td>
        {{prname}}
        </td>
        <td>
        {{pobj1.location}}
        </td>
        <td>
         {{pobj1.res_count}}
        </td>
        </tr>
         </template>
          </table>
        
         </div>
        <table class="labDeatilstable">
        <template v-for="(labObj,lname,lind) in labDetails">
        <tr :key='lname+lind'>
        <td>
        {{lname}}
        </td>
        <td style="padding-left:15px;">
        {{labObj}}
        </td>
        </tr>
        </template>
        </table>
          </div>
          </div>
          <div class="worldMaptables">
         
        <div class="deliveredReleasesTableDiv" style="width:25%;margin-right:50px;">
         <div class="tableHeading" style="background:green">
           Completed
          </div>
        <table class="deliveredReleasesTable" style="width:100%;font-size:20px;font-weight:500;text-align:center;">
        <tr>
        <td>
        Project
        </td>
        <td>
        Release
        </td>
        <td>
        Platforms
        </td>
        </tr>
         <tr>
        <td>
        B2
        </td>
        <td>
        7.1.2
        </td>
        <td>
        ASR9K, NCS5500
        </td>
        </tr>
         <tr>
        <td>
        B2
        </td>
        <td>
        7.3.2
        </td>
        <td>
        NCS5K
        </td>
        </tr>
         <tr>
        <td>
        B2
        </td>
        <td>
        7.3.1
        </td>
        <td>
        8000
        </td>
        </tr>
        </table>
        </div>
         <div class="ongoingTable" style="width:25%;margin-right:50px;">
         <div class="tableHeading" style="background:#1a93ab">
           Ongoing
          </div>
         <table class="deliveredReleasesTable">
        <tr>
        <td>
        Project
        </td>
        <td>
        Release
        </td>
        <td>
        Platforms
        </td>
        </tr>
         <tr>
        <td>
        B2
        </td>
        <td>
        7.1.2
        </td>
        <td>
        ASR9K, NCS5500
        </td>
        </tr>
         <tr>
        <td>
        B2
        </td>
        <td>
        7.3.2
        </td>
        <td>
        NCS5K
        </td>
        </tr>
         <tr>
        <td>
        B2
        </td>
        <td>
        7.3.1
        </td>
        <td>
        8000
        </td>
        </tr>
        </table>
        </div>
          <div class="upcomingTable" style="width:25%;margin-right:50px;">
         <div class="tableHeading" style="background:#8f7323">
           Upcoming
          </div>
        <table class="deliveredReleasesTable">
         
        <tr>
        <td>
        Project
        </td>
        <td>
        Release
        </td>
        <td>
        Platforms
        </td>
        </tr>
         <tr>
        <td>
        B2
        </td>
        <td>
        7.1.2
        </td>
        <td>
        ASR9K, NCS5500
        </td>
        </tr>
         <tr>
        <td>
        B2
        </td>
        <td>
        7.3.2
        </td>
        <td>
        NCS5K
        </td>
        </tr>
         <tr>
        <td>
        B2
        </td>
        <td>
        7.3.1
        </td>
        <td>
        8000
        </td>
        </tr>
        </table>
        </div>
        </div>
        </div> 
        
      </div>
       <div class="activeWorldMapDetails ">
       <div class="pageTitle">{{selectedCustomer}} - CVT Details</div>
         <div class="worldMapImge" style="width:98%;">
         <div class="worldmapImageFirstRow" style="width:100%;display:flex !important;">
          <div class="activityDetails" style="width:20%">
          <div class="activityTitle">Activities:</div>
             <ul>
          <li> XR Release Qual</li>
        <li>Esc repro/triage Support</li>
        <li>Prod SMU Support</li>
        <li>  Automation</li>
        <li>EoTR</li>
        <li>EFT H/W staging</li>
       <li>NPI Support</li>
        <li>Deployment Support</li>
    </ul>
     <div class="projectDetails">
          <table class="projectDetailsTable">
           <tr>
         <th>
         Project
         </th>
         <th>
         Location
         </th>
         <th>
         resCount
         </th>
         </tr>
         <template v-for="(pobj1,prname,pind) in projectDetails">
         <tr :key='prname+pind'>
        <td>
        {{prname}}
        </td>
        <td>
        {{pobj1.location}}
        </td>
        <td>
         {{pobj1.res_count}}
        </td>
        </tr>
         </template>
          </table>
        
         </div>
          </div>
        
         <div class="forWorldMap" style="width:48%;height:600px">
         </div>
          <div
            class="worldMapDiagramWrapper"
          >
           <worldMapChart   v-on:child="onChildInteraction" :chartsData="chartsData"
                    id="worldMapChart2"
                    class="worldchartsA">
          </worldMapChart>
          
          </div>
           <div
          class="labDetails"
          style="    width: 25%;
    margin-bottom: 40px;
    font-weight: 600;
   "
        >
        <table class="labDeatilstable">
        <template v-for="(labObj,lname,lind) in labDetails">
        <tr :key='lname+lind'>
        <td>
        {{lname}}
        </td>
        <td>
        {{labObj}}
        </td>
        </tr>
        </template>
        </table>
          </div>
          </div>
          <div class="worldMaptables">
         
        <div class="deliveredReleasesTableDiv" style="width:25%;margin-right:50px;">
         <div class="tableHeading" style="background:green">
            Delivered Releases
          </div>
        <table class="deliveredReleasesTable" style="width:100%;font-size:20px;font-weight:500;text-align:center;">
        <tr>
        <td>
        Project
        </td>
        <td>
        Release
        </td>
        <td>
        Platforms
        </td>
        </tr>
         <tr>
        <td>
        B2
        </td>
        <td>
        7.1.2
        </td>
        <td>
        ASR9K, NCS5500
        </td>
        </tr>
         <tr>
        <td>
        B2
        </td>
        <td>
        7.3.2
        </td>
        <td>
        NCS5K
        </td>
        </tr>
         <tr>
        <td>
        B2
        </td>
        <td>
        7.3.1
        </td>
        <td>
        8000
        </td>
        </tr>
        </table>
        </div>
         <div class="ongoingTable" style="width:25%;margin-right:50px;">
         <div class="tableHeading" style="background:blue">
           ongoing
          </div>
         <table class="deliveredReleasesTable">
        <tr>
        <td>
        Project
        </td>
        <td>
        Release
        </td>
        <td>
        Platforms
        </td>
        </tr>
         <tr>
        <td>
        B2
        </td>
        <td>
        7.1.2
        </td>
        <td>
        ASR9K, NCS5500
        </td>
        </tr>
         <tr>
        <td>
        B2
        </td>
        <td>
        7.3.2
        </td>
        <td>
        NCS5K
        </td>
        </tr>
         <tr>
        <td>
        B2
        </td>
        <td>
        7.3.1
        </td>
        <td>
        8000
        </td>
        </tr>
        </table>
        </div>
          <div class="upcomingTable" style="width:25%;margin-right:50px;">
         <div class="tableHeading" style="background:orange">
           Upcoming
          </div>
        <table class="deliveredReleasesTable">
         
        <tr>
        <td>
        Project
        </td>
        <td>
        Release
        </td>
        <td>
        Platforms
        </td>
        </tr>
         <tr>
        <td>
        B2
        </td>
        <td>
        7.1.2
        </td>
        <td>
        ASR9K, NCS5500
        </td>
        </tr>
         <tr>
        <td>
        B2
        </td>
        <td>
        7.3.2
        </td>
        <td>
        NCS5K
        </td>
        </tr>
         <tr>
        <td>
        B2
        </td>
        <td>
        7.3.1
        </td>
        <td>
        8000
        </td>
        </tr>
        </table>
        </div>
        </div>
        </div> 
       
        </div>
      </div>
       <div  v-if="selectedGrpBtn==='platformDetails'" class="custrow row" style="justify-content: space-between;">
        <div class="defaultPlatformDetails  activeDetails tilerow">
         
      </div>
       <div class="activePlatformDetails tilerow">
         
       
        </div>
       </div>
       <div  v-if="selectedGrpBtn==='rolesDetails'" class="custrow row" style="justify-content: space-between;">
        <div class="defaultRolesDetails  activeDetails tilerow">
         
      </div>
       <div class="activeRolesDetails tilerow">
         
       
        </div>
       </div>
       <div  v-if="selectedGrpBtn==='ahaDetails'" class=" row" style="justify-content: space-between;">
       
        <div class="defaultAhaDetails  activeDetails">
       <div class="pageTitle">{{selectedFolderName}} - {{selectedCustomer}} - New Features</div>
          <div style="width:95%">
           <vue-good-table
       id="ahaTable"
      :columns="ahaHeadings"
      :rows="ahaList"
      max-height="600px"
      :fixed-header="true"
      :line-numbers="true"
      row-style-class="#017cad"
   />
   </div>
  
                     
      <!--  <table id="ahaTable" class="table table--highlight secondaryTable">
              <tr>
                <th class="stickyTh ahaTableTh">Feature</th>
                <th class="stickyTh ahaTableTh">Aha ID</th>
                <th class="stickyTh ahaTableTh" style="width:15%">Name</th>
    <th class="stickyTh ahaTableTh">Platforms</th>
                 <th class="stickyTh ahaTableTh">Status</th>
              </tr>
              <template class="cdetsTr" v-for="(aObj, index) in ahaList">
                <tr
                 :key="index"
                 >
                  <td class="ahaTableTd">
                    <span  >{{ aObj.featureId }}</span>
                  </td>
                  <td class="ahaTableTd">{{ aObj.ahaId }}</td>
                  <td class="ahaTableTd" style="width:15%">{{ aObj.name }}</td>
                  <td class="ahaTableTd">{{ aObj.platforms_need }}</td>
                  <td :class="'ahaTableTd ' + aObj.enablement_status_color">
                    {{ aObj.enablement_status }}
                  </td>
                </tr>
              </template>
            </table>-->
      </div>
       <div class="activeAhaDetails tilerow">
       <div class="pageTitle">{{selectedFolderName}}-{{selectedCustomer}} - New Features</div>
        <div style="width:95%">
           <vue-good-table
       id="ahaTable"
      :columns="ahaHeadings"
      :rows="ahaList"
      max-height="600px"
      :fixed-header="true"
      :line-numbers="true"
      row-style-class="#017cad"
   />
   </div>
         
       
        </div>
       </div>
       <div  v-if="selectedGrpBtn==='cfdDetails'" class=" row" style="justify-content: space-between;">
        <div class="defaultCFDDetails  activeDetails tilerow">
        <div class="pageTitle"> {{selectedCustomer}} - CFD Details</div>
          <div style="    width: 92%;margin-left: 80px;">
           <vue-good-table
       id="cfdTable"
      :columns="cfdHeadings"
      :rows="cfdArrayList"
      max-height="500px"
      :fixed-header="true"
      :line-numbers="true"
      :filterFn="cfdFilterFn"
      row-style-class="#017cad"
   />
          

          <!---->
        </div>
         
      </div>
       <div class="activeCFDDetails tilerow">
       <div class="pageTitle"> {{selectedCustomer}} - CFD Details</div>
          <div style="    width: 92%;margin-left: 80px;">
 <vue-good-table
       id="cfdTable1"
      :columns="cfdHeadings"
      :rows="cfdArrayList"
      max-height="500px"
      :fixed-header="true"
      :line-numbers="true"
      row-style-class="cfdrow"
   /> 

          <!---->
        </div>
       
        </div>
       </div>
       <div  v-if="selectedGrpBtn==='rorDetails'" class="row" style="justify-content: space-between;">
        <div class="defaultRorDetails  activeDetails ">
        <div class="pageTitle">{{selectedFolderName}} - {{selectedCustomer}} - ROR Details</div>
         <div class="rorWrapper" style="">
        <div class="tm_btn-container" style="width: 100%;">
         <a @click="createRor" style="font-size:18px;color:#fff;float:right;margin-left:20px;">Compare</a>
         
          </div>
          <div class="rorTable">
           <table
                        id="rorTable"
                        class="table table--highlight secondaryTable"
                        style="width:100%"
                      >
                        <tr>
                          <th class="uTableTh" style="width:3%">Release</th>
                          <th class="uTableTh" style="width:3%">H/W NPI</th>
                          <th class="uTableTh" style="width:3%">Start</th>
                          <th class="uTableTh" style="width:3%">End</th>
                           <th class="uTableTh" style="width:3%"># weeks</th>
                          <th class="uTableTh" style="width:10%">Inventory</th>
                          <th class="uTableTh" style="width:10%">Topology</th>
                          <th class="uTableTh" style="width:10%">Platforms</th>
                            <th class="uTableTh" style="width:10%">Roles</th>
                          <th class="uTableTh" style="width:3%">New Features</th>
                          <th class="uTableTh" style="width:3%">CVT Resrcs</th>
                          <th class="uTableTh" style="width:3%">Total TCs</th>
                           <th class="uTableTh" style="width:3%">Unique TCs</th>
                             <th class="uTableTh" style="width:3%">Automated TCs</th>
                             <th class="uTableTh" style="width:3%">TCs per Eng</th>
                             <th class="uTableTh" style="width:3%">Defects Total</th>
                             <th class="uTableTh" style="width:3%">Defects rasied</th>
                              <th class="uTableTh" style="width:3%">Defects per Eng</th>
                               <th class="uTableTh" style="width:3%">FCS Quality</th>
                                  <th class="uTableTh" style="width:3%">SMU revs</th>
                                  </tr>
                                  <template v-for="(tobj,tind) in rorlist">
                                   <tr :key="'ror'+tind">
                          <td class="uTableTd" style="width:3%">{{tobj.release_version}}</td>
                          <td class="uTableTd" style="width:3%">{{tobj.hardware_npi}}</td>
                          <td class="uTableTd" style="width:3%">{{getFilteredDate(tobj.start_date)}}</td>
                           <td class="uTableTd" style="width:3%">{{getFilteredDate(tobj.end_date)}}</td>
                            <td class="uTableTd" style="width:3%">{{tobj.noOfweeks}}</td>
                         <td class="uTableTd" style="width:10%">{{tobj.inventory}}</td>
                          <td class="uTableTd" style="width:10%">{{tobj.topology}}</td>
                          <td class="uTableTd" style="width:10%">{{tobj.platforms}}</td>
                            <td class="uTableTd" style="width:10%">{{tobj.roles}}</td>
                         <td class="uTableTd" style="width:3%">{{tobj.new_features}}</td>
                           <td class="uTableTd" style="width:3%">{{tobj.cvt_releases}}</td>
                         <td class="uTableTd" style="width:3%">{{tobj.total_testcases}}</td>
                            <td class="uTableTd" style="width:3%">{{tobj.unique_testcases}}</td>
                           <td class="uTableTd" style="width:3%">{{tobj.automated_testcases}}</td>
                             <td class="uTableTd" style="width:3%"></td>
                              <td class="uTableTd" style="width:3%">{{tobj.total_defects}}</td>
                                <td class="uTableTd" style="width:3%">{{tobj.defects_raised}}</td>
                               <td class="uTableTd" style="width:3%">{{tobj.defect_per_engineer}}</td>
                                <td class="uTableTd" style="width:3%">{{tobj.fcs_quality}}</td>
                                <td class="uTableTd" style="width:3%">{{tobj.smus_revisions}}</td>   </tr>
                                  </template>
                                  </table>
  </div>
        </div>
      </div>
       <div class="activeRorDetails tilerow">
       <div class="pageTitle">{{selectedFolderName}} - {{selectedCustomer}} - ROR Details</div>
          <div class="rorWrapper" style="">
        <div class="tm_btn-container" style="width: 100%;">
          <button
            class="btn btn--primary tmBtn"
            @click="createRor()"
            style="font-size:1.4rem;"
          >
            <i class="icon icon-plus"> </i>
          </button>
          </div>
          <div class="rorTable">
           <table
                        id="rorTable"
                        class="table table--highlight secondaryTable"
                        style="width:100%"
                      >
                        <tr>
                          <th class="uTableTh" style="width:3%">Release</th>
                          <th class="uTableTh" style="width:3%">H/W NPI</th>
                          <th class="uTableTh" style="width:3%">Start</th>
                          <th class="uTableTh" style="width:3%">End</th>
                           <th class="uTableTh" style="width:3%"># weeks</th>
                          <th class="uTableTh" style="width:10%">Inventory</th>
                          <th class="uTableTh" style="width:10%">Topology</th>
                          <th class="uTableTh" style="width:10%">Platforms</th>
                            <th class="uTableTh" style="width:10%">Roles</th>
                          <th class="uTableTh" style="width:3%">New Features</th>
                          <th class="uTableTh" style="width:3%">CVT Resrcs</th>
                          <th class="uTableTh" style="width:3%">Total Ts</th>
                           <th class="uTableTh" style="width:3%">Unique Ts</th>
                             <th class="uTableTh" style="width:3%">Automated Ts</th>
                             <th class="uTableTh" style="width:3%">Ts per Eng</th>
                             <th class="uTableTh" style="width:3%">Defects Total</th>
                             <th class="uTableTh" style="width:3%">Defects rasied</th>
                              <th class="uTableTh" style="width:3%">Defects per Eng</th>
                               <th class="uTableTh" style="width:3%">FCS Quality</th>
                                  <th class="uTableTh" style="width:3%">SMU revs</th>
                                  </tr>
                                  <template v-for="(tobj,tind) in rorlist">
                                   <tr :key="'ror'+tind">
                          <td class="uTableTd" style="width:3%">{{tobj.release_version}}</td>
                          <td class="uTableTd" style="width:3%">{{tobj.hardware_npi}}</td>
                          <td class="uTableTd" style="width:3%">{{getFilteredDate(tobj.start_date)}}</td>
                           <td class="uTableTd" style="width:3%">{{getFilteredDate(tobj.end_date)}}</td>
                            <td class="uTableTd" style="width:3%">{{tobj.noOfweeks}}</td>
                         <td class="uTableTd" style="width:10%">{{tobj.inventory}}</td>
                          <td class="uTableTd" style="width:10%">{{tobj.topology}}</td>
                          <td class="uTableTd" style="width:10%">{{tobj.platforms}}</td>
                            <td class="uTableTd" style="width:10%">{{tobj.roles}}</td>
                         <td class="uTableTd" style="width:3%">{{tobj.new_features}}</td>
                           <td class="uTableTd" style="width:3%">{{tobj.cvt_releases}}</td>
                         <td class="uTableTd" style="width:3%">{{tobj.total_testcases}}</td>
                            <td class="uTableTd" style="width:3%">{{tobj.unique_testcases}}</td>
                           <td class="uTableTd" style="width:3%">{{tobj.automated_testcases}}</td>
                             <td class="uTableTd" style="width:3%"></td>
                              <td class="uTableTd" style="width:3%">{{tobj.total_defects}}</td>
                                <td class="uTableTd" style="width:3%">{{tobj.defects_raised}}</td>
                               <td class="uTableTd" style="width:3%">{{tobj.defect_per_engineer}}</td>
                                <td class="uTableTd" style="width:3%">{{tobj.fcs_quality}}</td>
                                <td class="uTableTd" style="width:3%">{{tobj.smus_revisions}}</td>   </tr>
                                  </template>
                                  </table>
  </div>
        </div>  
       
        </div>
       </div>
       <div  v-if="selectedGrpBtn==='executionDetails'" class="custrow row" style="justify-content: space-between;">
        <div class="defaultExecutionDetails  activeDetails tilerow" style="">
        <div class="pageTitle">{{selectedFolderName}} - {{selectedCustomer}} - Execution Details</div>
           <div class="execDetailsGnattChart" style="width:95%;">
                <div class="contentGraphClass">
                <GanttChart
                  disbleExport="true"
                  v-on:child="onChildInteraction"
                  id="homeTimeLineChart"
                  :option="ganttOptions"
                ></GanttChart>
               </div>
           </div>
            <div class="justify-content: space-between;">
            <div class="width25Per">
              <div class="r_chartDivClass aa ">
                <div class="summaryCharts">
                  <chart
                    disbleExport="true"
                    v-on:child="onChildInteraction"
                    id="execSummary_chart1"
                    class="chartsA"
                    :option="executionSummaryOption"
                  ></chart>
                </div>
                <div class="summary_Data">
                  <div class="projectedSummaryData">
                    <div class="summary_li ">
                      <div
                        class="summaryCircle1 coloredCircleBorder coloredBorder1"
                      >
                        {{ summaryButtonsDetails.totalTestcases }}
                      </div>
                      <div class="coloredCircleBoxdata">
                        Total
                      </div>
                    </div>
                    <div class="summary_li ">
                      <div
                        :class="
                          'summaryCircle1 coloredCircleBorder ' +
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
                    <div class="summary_li ">
                      <div
                        :class="
                          'summaryCircle1  coloredCircleBorder ' +
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
            </div>
            <div class="testcaseLineChartClass  width35Per">
              <chart
                disbleExport="true"
                toggleOption="showCVTExecution"
                v-show="!showCVTExecution"
                v-on:child="onChildInteraction"
                id="home_splineChart1"
                :option="splineOptions"
              ></chart>
              <chart
                disbleExport="true"
                toggleOption="showCVTExecution"
                v-show="showCVTExecution"
                v-on:child="onChildInteraction"
                id="cvtChart1"
                :option="cvtOptions"
              ></chart>
            </div>
            <div class="cvtWrapperClass  width35Per">
              <chart
                disbleExport="true"
                v-show="!showExecutionHeatMap"
                toggleOption="showExecutionHeatMap"
                v-on:child="onChildInteraction"
                id="cvtHeatMap1"
                :option="heatMapOptions1"
              ></chart>
              <chart
                disbleExport="true"
                v-show="showExecutionHeatMap"
                toggleOption="showExecutionHeatMap"
                v-on:child="onChildInteraction"
                id="cvtHeatMap2"
                :option="heatMapOptions2"
              ></chart>
            </div>
          
         
      </div>
       <div class="activeExecutionDetails tilerow" style="">
       <div class="pageTitle">{{selectedFolderName}} - {{selectedCustomer}} - Execution Details</div>
           <div class="execDetailsGnattChart" style="width:95%;">
               <div class="contentGraphClass">
                <GanttChart
                  disbleExport="true"
                  v-on:child="onChildInteraction"
                  id="homeTimeLineChart1"
                  :option="ganttOptions"
                ></GanttChart>
               
              </div>
           </div>
             <div class="justify-content: space-between;">
          <div class="width25Per">
              <div class="r_chartDivClass aa ">
                <div class="summaryCharts">
                  <chart
                    disbleExport="true"
                    v-on:child="onChildInteraction"
                    id="execSummary_chart2"
                    class="chartsA"
                    :option="executionSummaryOption"
                  ></chart>
                </div>
                <div class="summary_Data">
                  <div class="projectedSummaryData">
                    <div class="summary_li ">
                      <div
                        class="summaryCircle1 coloredCircleBorder coloredBorder1"
                      >
                        {{ summaryButtonsDetails.totalTestcases }}
                      </div>
                      <div class="coloredCircleBoxdata">
                        Total
                      </div>
                    </div>
                    <div class="summary_li ">
                      <div
                        :class="
                          'summaryCircle1 coloredCircleBorder ' +
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
                    <div class="summary_li ">
                      <div
                        :class="
                          'summaryCircle1  coloredCircleBorder ' +
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
            </div>
            <div class="testcaseLineChartClass  width35Per">
              <chart
                disbleExport="true"
                toggleOption="showCVTExecution"
                v-show="!showCVTExecution"
                v-on:child="onChildInteraction"
                id="home_splineChart2"
                :option="splineOptions"
              ></chart>
              <chart
                disbleExport="true"
                toggleOption="showCVTExecution"
                v-show="showCVTExecution"
                v-on:child="onChildInteraction"
                id="cvtChart2"
                :option="cvtOptions"
              ></chart>
            </div>
            <div class="cvtWrapperClass  width35Per">
              <chart
                disbleExport="true"
                v-show="!showExecutionHeatMap"
                toggleOption="showExecutionHeatMap"
                v-on:child="onChildInteraction"
                id="cvtHeatMap3"
                :option="heatMapOptions1"
              ></chart>
              <chart
                disbleExport="true"
                v-show="showExecutionHeatMap"
                toggleOption="showExecutionHeatMap"
                v-on:child="onChildInteraction"
                id="cvtHeatMap4"
                :option="heatMapOptions2"
              ></chart>
            </div>
         
       
        </div>
       </div>
       <div  v-if="selectedGrpBtn==='qualityDetails'" class="custrow row" style="justify-content: space-between;">
        <div class="defaultQualityDetails  activeDetails tilerow">
        <div class="pageTitle">{{selectedFolderName}} - {{selectedCustomer}} - Quality Details</div>
        <div class="qualityDefectWrapper" style="width:100%">
        <div class="defectWrapper" style="width:100%">
        <div class="funnelChart" style="width:30%">
           <chart
                          v-on:child="onChildInteraction"
                          id="chart8H"
                          :option="componentDefectOption"
                         ></chart>
          
          
        </div>
        <div class="funnelChart" style="width:30%">
               <chart
                          v-on:child="onChildInteraction"
                          id="chart9H"
                          :option="statusDefectOption"
                         ></chart>
          
          
        </div>
        <div class="funnelChart" style="width:30%">
            <chart
                          v-on:child="onChildInteraction"
                          id="chart7H"
                          :option="submitterDefectOption"
                         ></chart>
          
          
        </div>
             
        </div>
        <div class="qualityWrapper"  style="width:100%;display:flex;">
                  <div class="" style="    width: 68%;
    margin-right: 30px;
    margin-left: 20px;">
                    <tabs
                      id="chartB1Tabs"
                      name="chartB1Tabs"
                      :options="{
                        useUrlFragment: false,
                        defaultTabHash: 'qualityRoleChart',
                      }"
                      @clicked="chartB1TabClicked"
                      @changed="chartB1TabChanged"
                    >
                      <tab
                        name="Role"
                        id="qualityRoleChart"
                        class="qualityRoleChart"
                        ref="Role"
                      >
                        <chart
                          disbleExport="false"
                          v-on:child="onChildInteraction"
                          id="qualitychart_b1"
                          class="chartsB"
                          :option="qualityOption"
                        ></chart>
                      </tab>
                      <tab
                        name="Platform"
                        id="qualityPlatformChart"
                        class="qualityPlatformChart"
                        ref="Platform"
                      >
                        <chart
                          disbleExport="false"
                          v-on:child="onChildInteraction"
                          id="qualitychart_b2"
                          class="chartsB"
                          :option="qualityPlatformOption"
                        ></chart>
                      </tab>
                      <tab
                        name="Source"
                        id="qualitySrcChart"
                        class="qualitySrcChart"
                        ref="Source"
                      >
                        <chart
                          disbleExport="false"
                          v-on:child="onChildInteraction"
                          id="qualitychart_b3"
                          class="chartsB"
                          :option="qualitySrcOption"
                        ></chart>
                      </tab>
                      <tab
                        name="Feature"
                        id="qualityFeatureChart"
                        class="qualityFeatureChart"
                        ref="Feature"
                      >
                        <chart
                          disbleExport="false"
                          v-on:child="onChildInteraction"
                          id="qualitychart_b4"
                          class="chartsB"
                          :option="qualityFeatureOption"
                        ></chart>
                      </tab>
                    </tabs>
                  </div>
                  
 <div class="funnelChart" style="width:30%">
        <chart
                     v-on:child="onChildInteraction"
                      id="chart_MH"
                     :option="mhHaveOption"
                    ></chart>
          
          
        </div>

                  </div>
               
         
      </div>
      </div>
       <div class="activeQualityDetails tilerow">
       <div class="pageTitle">{{selectedFolderName}} - {{selectedCustomer}} - Quality Details</div>
                  <div class="qualityCharts">
                    <tabs
                      id="chartB1Tabs1"
                      name="chartB1Tabs1"
                      :options="{
                        useUrlFragment: false,
                        defaultTabHash: 'qualityRoleChart',
                      }"
                      @clicked="chartB1TabClicked"
                      @changed="chartB1TabChanged"
                    >
                      <tab
                        name="Role"
                        id="qualityRoleChart1"
                        class="qualityRoleChart"
                        ref="Role"
                      >
                        <chart
                          disbleExport="false"
                          v-on:child="onChildInteraction"
                          id="qualitychart_b1_1"
                          class="chartsB"
                          :option="qualityOption"
                        ></chart>
                      </tab>
                      <tab
                        name="Platform"
                        id="qualityPlatformChart1"
                        class="qualityPlatformChart"
                        ref="Platform"
                      >
                        <chart
                          disbleExport="false"
                          v-on:child="onChildInteraction"
                          id="qualitychart_b2_1"
                          class="chartsB"
                          :option="qualityPlatformOption"
                        ></chart>
                      </tab>
                      <tab
                        name="Source"
                        id="qualitySrcChart1"
                        class="qualitySrcChart"
                        ref="Source"
                      >
                        <chart
                          disbleExport="false"
                          v-on:child="onChildInteraction"
                          id="qualitychart_b3_1"
                          class="chartsB"
                          :option="qualitySrcOption"
                        ></chart>
                      </tab>
                      <tab
                        name="Feature"
                        id="qualityFeatureChart1"
                        class="qualityFeatureChart"
                        ref="Feature"
                      >
                        <chart
                          disbleExport="false"
                          v-on:child="onChildInteraction"
                          id="qualitychart_b4_1"
                          class="chartsB"
                          :option="qualityFeatureOption"
                        ></chart>
                      </tab>
                    </tabs>
                  </div>
               
         
       
        </div>
       </div>
       <div  v-if="selectedGrpBtn==='testPlanDetails'" class="custrow row" style="justify-content: space-between;">
       <div class="defaultTestPlanDetails  activeDetails tilerow">
       <div class="pageTitle">{{selectedFolderName}} - {{selectedCustomer}} - Testplan Details</div>
       <div class="qualityCharts">
                    <tabs
                      id="chartB2Tabs"
                      name="chartB2Tabs"
                      :options="{
                        useUrlFragment: false,
                        defaultTabHash: 'testcaseFeatureChart',
                      }"
                      @clicked="chartB1TabClicked"
                      @changed="chartB1TabChanged"
                    >
                      <tab
                        name="Role"
                        id="testcaseRoleChart"
                        class="qualityRoleChart "
                        ref="Role"
                      >
                        <chart
                          disbleExport="false"
                          v-on:child="onChildInteraction"
                          id="testcaseRole_Chart1"
                          class="chartsB"
                          :option="roleOption"
                        ></chart>
                      </tab>
                      <tab
                        name="Platform"
                        id="testcasePlatformChart"
                        class="qualityPlatformChart "
                        ref="Platform"
                      >
                        <chart
                          disbleExport="false"
                          
                          v-on:child="onChildInteraction"
                          id="testcasePlatform_Chart1"
                          class="chartsB"
                          :option="platformOption"
                        ></chart>
                      </tab>
                      <tab
                        name="Source"
                        id="testcaseSrcChart"
                        class="qualityPlatformChart "
                        ref="Source"
                      >
                        <chart
                          disbleExport="false"
                          
                          v-on:child="onChildInteraction"
                          id="testcaseSrc_Chart1"
                          class="chartsB"
                          :option="srcOption"
                        ></chart>
                      </tab>
                      <tab
                        name="Feature"
                        id="testcaseFeatureChart"
                        class="qualityRoleChart "
                        ref="Feature"
                      >
                        <chart
                          disbleExport="false"
                          
                          v-on:child="onChildInteraction"
                          id="testcaseFeature_Chart1"
                          class="chartsB"
                          :option="featureOption"
                        ></chart>
                      </tab>
                    </tabs>
                  </div>
         
      </div>
       <div class="activeTestPlanDetails tilerow">
       <div class="pageTitle">{{selectedFolderName}} - {{selectedCustomer}} - Testplan Details</div>
         <div class="qualityCharts">
                    <tabs
                      id="chartB2Tabs1"
                      name="chartB2Tabs"
                      :options="{
                        useUrlFragment: false,
                        defaultTabHash: 'testcaseFeatureChart',
                      }"
                      @clicked="chartB1TabClicked"
                      @changed="chartB1TabChanged"
                    >
                      <tab
                        name="Role"
                        id="testcaseRoleChart1"
                        class="qualityRoleChart "
                        ref="Role"
                      >
                        <chart
                          disbleExport="false"
                          v-on:child="onChildInteraction"
                          id="testcaseRole_Chart2"
                          class="chartsB"
                          :option="roleOption"
                        ></chart>
                      </tab>
                      <tab
                        name="Platform"
                        id="testcasePlatformChart1"
                        class="qualityPlatformChart "
                        ref="Platform"
                      >
                        <chart
                          disbleExport="false"
                          
                          v-on:child="onChildInteraction"
                          id="testcasePlatform_Chart2"
                          class="chartsB"
                          :option="platformOption"
                        ></chart>
                      </tab>
                      <tab
                        name="Source"
                        id="testcaseSrcChart1"
                        class="qualityPlatformChart "
                        ref="Source"
                      >
                        <chart
                          disbleExport="false"
                          
                          v-on:child="onChildInteraction"
                          id="testcaseSrc_Chart2"
                          class="chartsB"
                          :option="srcOption"
                        ></chart>
                      </tab>
                      <tab
                        name="Feature"
                        id="testcaseFeatureChart1"
                        class="qualityRoleChart "
                        ref="Feature"
                      >
                        <chart
                          disbleExport="false"
                          
                          v-on:child="onChildInteraction"
                          id="testcaseFeature_Chart2"
                          class="chartsB"
                          :option="featureOption"
                        ></chart>
                      </tab>
                    </tabs>
                  </div>
       
        </div>
       </div>
         <div  v-if="selectedGrpBtn==='topologyDetails'" class="custrow row" style="justify-content: space-between;">
          <div class="defaultTopologyDetails  activeDetails tilerow">
         
      </div>
       <div class="activeTopologyDetails tilerow">
         
       
        </div>
       </div>
         <div  v-if="selectedGrpBtn==='caveatsDetails'" class="custrow row" style="justify-content: space-between;">
         <div class="defaultCaveatsDetails  activeDetails tilerow">
         <div class="pageTitle">{{selectedFolderName}} - {{selectedCustomer}} - Caveats Details</div>
          <div class="caveatsTable" style="width:100%">
            <vue-good-table
       id="caveatsTable1"
      :columns="caveatsHeadings"
      :rows="caveatList"
      max-height="600px"
      :fixed-header="true"
      :line-numbers="true"
      row-style-class="#017cad"
   />

                     
                    </div>
         
      </div>
       <div class="activeCaveatsDetails tilerow">
       <div class="pageTitle">{{selectedFolderName}} - {{selectedCustomer}} - Caveats Details</div>
          <div class="caveatsTable" style="width:100%">
                     <vue-good-table
       id="caveatsTable2"
      :columns="caveatsHeadings"
      :rows="caveatList"
      max-height="600px"
      :fixed-header="true"
      :line-numbers="true"
      row-style-class="#017cad"
   />

                     
                    </div>
       
        </div>
       </div>
         <div  v-if="selectedGrpBtn==='upgradeMatrixDetails'" class="custrow row" style="justify-content: space-between;">
        
          <div class="defaultUpgradeMatrixDetails  activeDetails tilerow">
           <div class="pageTitle">{{selectedFolderName}} - {{selectedCustomer}} - Upgrade Matrix</div>
          <div class="tGradeMatrixTable" style="width:100%">
      <table id="tUpgradeTable1" class="table table--highlight secondaryTable" style="width:100%">
      <tr>
     <th class="uTableTh" style="width:10%">Platform
      </th>
      <th class="uTableTh" style="width:10%">PID
      </th>
      <th class="uTableTh" style="width:10%">Rel From
      </th>
      <th class="uTableTh" style="width:10%">Rel To
      </th>
      <th class="uTableTh" style="width:10%">Method
      </th>
      <th class="uTableTh" style="width:10%">Total
      </th>
      <th class="uTableTh" style="width:10%">Passed
      </th>
      <th class="uTableTh" style="width:10%">Failed
      </th>
      <th class="uTableTh" style="width:20%">Defects
      </th>
      </tr>
      <template v-for="(tObj,index) in upgradeMatrixTotalData">
       <tr :key="index">
      <td>{{tObj.platform}}
     </td>
      <td>{{tObj.pid}}
     </td>
     <td>{{tObj.release_from}}
     </td>
     <td>{{tObj.release_to}}
     </td>
     <td>{{tObj.method}}
     </td>
      <td>{{parseInt(tObj.Passed)+parseInt(tObj.failed)}}
     </td>
     <td>{{tObj.Passed}}
     </td>
     <td>{{tObj.failed}}
     </td>
      <td>{{tObj.defects}}
     </td>
      </tr>
      </template>
      </table>
   </div>
   <div class="defectsHeatMap" style="width:100%">
      <chart  disbleExport=false  v-on:child="onChildInteraction" id="homeUpgradeMatrixChart1" :option="upgradeHeatMapOptions"></Chart>
   </div>
         
      </div>
       <div class="activeUpgradeMatrixDetails tilerow">
       <div class="pageTitle">{{selectedFolderName}} - {{selectedCustomer}} - Upgrade Matrix</div>
       <div class="tGradeMatrixTable" style="width:100%">
      <table id="tUpgradeTable2" class="table table--highlight secondaryTable" style="width:100%">
      <tr>
     <th class="uTableTh" style="width:10%">Platform
      </th>
      <th class="uTableTh" style="width:10%">PID
      </th>
      <th class="uTableTh" style="width:10%">Rel From
      </th>
      <th class="uTableTh" style="width:10%">Rel To
      </th>
      <th class="uTableTh" style="width:10%">Method
      </th>
      <th class="uTableTh" style="width:10%">Total
      </th>
      <th class="uTableTh" style="width:10%">Passed
      </th>
      <th class="uTableTh" style="width:10%">Failed
      </th>
      <th class="uTableTh" style="width:20%">Defects
      </th>
      </tr>
      <template v-for="(tObj,index) in upgradeMatrixTotalData">
       <tr :key="index">
      <td>{{tObj.platform}}
     </td>
      <td>{{tObj.pid}}
     </td>
     <td>{{tObj.release_from}}
     </td>
     <td>{{tObj.release_to}}
     </td>
     <td>{{tObj.method}}
     </td>
      <td>{{parseInt(tObj.Passed)+parseInt(tObj.failed)}}
     </td>
     <td>{{tObj.Passed}}
     </td>
     <td>{{tObj.failed}}
     </td>
      <td>{{tObj.defects}}
     </td>
      </tr>
      </template>
      </table>
   </div>
   <div class="defectsHeatMap" style="width:100%">
      <chart  disbleExport=false  v-on:child="onChildInteraction" id="homeUpgradeMatrixChart2" :option="upgradeHeatMapOptions"></Chart>
   </div>
         
       
        </div>
       </div>
         <div  v-if="selectedGrpBtn==='triggerMatrixDetails'" class="custrow row" style="justify-content: space-between;">
         
          <div class="defaultTriggerMatrixDetails  activeDetails tilerow">
          <div class="pageTitle">{{selectedFolderName}} - {{selectedCustomer}} - Trigger Matrix</div>
          <div class="tGradeMatrixTable" style="width:100%">
      <table id="tMatrixTable1" class="table table--highlight secondaryTable" style="width:100%">
      <tr>
      <th class="uTableTh" style="width:15%">Trigger
      </th>
      <th class="uTableTh" style="width:10%">Platform
      </th>
      <th class="uTableTh" style="width:10%">PID
      </th>
      <th class="uTableTh" style="width:10%">Planned
      </th>
      <th class="uTableTh" style="width:10%">Actual
      </th>
      <th class="uTableTh" style="width:40%">Defects
      </th>
      </tr>
      <template v-for="(tObj,index) in triggerMatrixTotalData">
       <tr :key="index">
      <td>{{tObj.trigger}}
     </td>
      <td>{{tObj.platform}}
     </td>
      <td>{{tObj.pid}}
     </td>
       <td>{{tObj.planned}}
     </td>
      <td>{{tObj.actual}}
     </td>
      <td>{{tObj.defects}}
     </td>
      </tr>
      </template>
      </table>
   </div>
   <div class="defectsHeatMap" style="width:100%">
      <chart  disbleExport=false  v-on:child="onChildInteraction" id="homeTriggerMatrixChart1" :option="triggerHeatMapOptions"></Chart>
   </div>
         
      </div>
       <div class="activeTriggerMatrixDetails tilerow">
       <div class="pageTitle">{{selectedFolderName}} - {{selectedCustomer}} - Trigger Matrix</div>
         <div class="tGradeMatrixTable" style="width:100%">
      <table id="tMatrixTable2" class="table table--highlight secondaryTable" style="width:100%">
      <tr>
      <th class="uTableTh" style="width:15%">Trigger
      </th>
      <th class="uTableTh" style="width:10%">Platform
      </th>
      <th class="uTableTh" style="width:10%">PID
      </th>
      <th class="uTableTh" style="width:10%">Planned
      </th>
      <th class="uTableTh" style="width:10%">Actual
      </th>
      <th class="uTableTh" style="width:40%">Defects
      </th>
      </tr>
      <template v-for="(tObj,index) in triggerMatrixTotalData">
       <tr :key="index">
      <td>{{tObj.trigger}}
     </td>
      <td>{{tObj.platform}}
     </td>
      <td>{{tObj.pid}}
     </td>
       <td>{{tObj.planned}}
     </td>
      <td>{{tObj.actual}}
     </td>
      <td>{{tObj.defects}}
     </td>
      </tr>
      </template>
      </table>
   </div>
   <div class="defectsHeatMap" style="width:100%">
      <chart  disbleExport=false  v-on:child="onChildInteraction" id="homeTriggerMatrixChart2" :option="triggerHeatMapOptions"></Chart>
   </div>
       
        </div>
       </div>
         <div  v-if="selectedGrpBtn==='readinessDetails'" class="custrow row" style="justify-content: space-between;">
          <div class="defaultReadinessDetails  activeDetails tilerow">
         
      </div>
       <div class="activeReadinessDetails tilerow">
         
       
        </div>
       </div>
        <div  v-if="selectedGrpBtn==='postFcsDetails'" class="custrow row" style="justify-content: space-between;">
         <div class="defaultPostFcsDetails  activeDetails tilerow">
         
      </div>
       <div class="activePostFcsDetails tilerow">
         
       
        </div>
       </div>


      <div
        v-if="selectedGrpBtn==='teamDetails'"
        class="custrow teamDetails "
        style="margin-left:42px;margin-top:20px;"
      >
    <div class="pageTitle">{{selectedCustomer}} - Team</div>
    <div style="display:flex">
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
      <div v-if="showRelPathModal" class="relPathModal">
       <div
        class="modal__header"
        style="display:flex; justify-content:space-between; margin-bottom:5px;"
      >
        <div class="modal_title">Production Image Paths</div>
        <span
          class="icon-close icon-small interaction"
          v-on:click="closeRelPathModal()"
        ></span>
         </div>
       <div class="modal__body" style="display:flex; justify-content:center;">
       <div class="relPathTableWrapper" style="margin:30px;">
       <vue-good-table
       id="relPathTable"
      :columns="RelPathsHeadings"
      :rows="relPaths"
      max-height="300px"
      :fixed-header="true"
      :line-numbers="true"
      row-style-class="#017cad"
    :search-options="{
      enabled: true,
    trigger: 'enter',
    }"    
  />
       </div>
       </div>
      </div>
       <div v-if="showRorAddRelModal" class="rorModal">
      <div
        class="modal__header"
        style="display:flex; justify-content:space-between; margin-bottom:5px;"
      >
        <div class="modal_title">Add Release to Compare</div>
        <span
          class="icon-close icon-small interaction"
          v-on:click="closeAddRorModal()"
        ></span>
      </div>
      <div class="modal__body" style="display:flex; justify-content:center;">
      <div style="width:70%">
      <div style="width:100%;display:flex;">
        <div class="rellabel" style="width:50%;font-size: 18px;
    color: #000;
    font-weight: 600;">Release name:</div>
        <select  style="width:50%; height: 35px;font-size: 20px;" v-model="selectedRelForCompare" class="feature1">
        <template v-for="(robj,ind) in getRelsForRor()">
        <option :value="robj" :key="'rorkey'+ind">{{robj}}</option>
        </template>
        </select>
        </div>
        <div style="width:100%;">
          <div
                class="tm_btn-container"
                style="margin-top: 30px; margin-right: 30px;margin-bottom: 30px;"
              >
                <button
                  class="btn btn--secondary tmBtn"
                  @click="closeAddRorModal()"
                  style="font-size:1.4rem;"
                >
                  Cancel
                </button>
                <button
                  class="btn btn--secondary tmBtn"
                  @click="addToCompare"
                  style="font-size:1.4rem;"
                >
                  Add
                </button>
                </div>
                </div>
        </div>
      </div>
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
    margin-top: 30px;
  /*  background: #cce0ee;;*/
 }
 .relNav{
  display: flex;
    flex-direction: row;
    justify-content: space-evenly;
   /* background: #0c2f4a;*/
   background:#08c3fe;
 }

/*.custMenuButtons{
margin: 15px 20px;
    height: 130px;
    border: none;
    width: 130px;
    border-radius: 10px;
    box-shadow: rgb(255 255 255 / 10%) 0px 1px 1px 0px inset, rgb(50 50 93 / 25%) 0px 50px 100px -20px, rgb(0 0 0 / 30%) 0px 30px 60px -30px;
    background-color: #7696b0;
  }*/
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
 background: #fff;
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
  background:#fff !important;
}
.rorWrapper{
  width: 95%;
    text-align: right;
    margin-left: 20px;
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
  padding-bottom: 12px;
}
.postauth-header1 {
  display: block !important;
  width: 100% !important;
  margin-top: 10px !important;
}
.topnav {
  width: 75%;
    justify-content: space-between;
    max-height: 150px;
    display: flex;
    position: relative;
 float: left;
  margin-left: 120px;
  overflow: hidden;
  background: #fff;
  height: fit-content;
  text-align: center;
}
.bottomnav {
   height: fit-content;
  text-align: center;
  margin-bottom: 0px;
  position:fixed;
  width:100%;
  margin-top: 130px;
  z-index: 10000;
}

.custTopMargin{
  padding-top:20px;
}
.otherTopMargin{
  padding-top:60px;
}
.pageContentDiv{
    margin-top: 140px;
   padding-top: 200px; 
    margin-left: 0px;
    position: fixed;
    height:1050px;
    overflow: hidden;
    width: 100%;
}
.tilerow{
margin: 50px;
    width: 100%;
}
.teamDetails{
    width: 95%;
    height: 250vh;
    margin-top: -20px !important;

}
.modal_title {
    font-size: 17px;
    font-weight: 700;
    color: #fff !important;
    margin-left: 0 !important;
    margin-top: 5px;
    text-align: center;
}
.relPathModal{
  min-height: 100px;
    min-width: 450px;
    position: absolute;
    top: 150px;
    left: 850px;
    z-index: 12000;
    background: #fff;
    border: 1px solid #0c6170;
    box-shadow: 0px 0px 6px rgb(0 0 0 / 20%);
}
.rorModal{
  min-height: 100px;
    min-width: 450px;
    position: absolute;
    top: 100px;
    left: 885px;
    z-index: 12000;
    background: #fff;
    border: 1px solid #0c6170;
    box-shadow: 0px 0px 6px rgb(0 0 0 / 20%);
}
.execSummary_chart1, .execSummary_chart2{
border-radius: 20px;
}

.custMainWrapper{
width: 100%;
    position: relative;
       overflow-y: scroll;
    overflow-x: hidden;
}

.custMainWrapper ::-webkit-scrollbar{
  display: none !important;
}

.pageContentDiv ::-webkit-scrollbar{
display: none !important;
}
.insideButton{
margin: 5px;
    height: 70px;
    width: 130px;
    border: 2px solid #fff;
    box-shadow: rgb(255 255 255 / 10%) 0px 1px 1px 0px inset, rgb(50 50 93 / 25%) 0px 50px 100px -20px, rgb(0 0 0 / 30%) 0px 30px 60px -30px;
    border-radius: 10px;
    color: #fff;
    font-size: 18px;
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

.ahaTableTh, .ahaTableTd {
    border: 1px solid #ddd !important;
}

.ahaTableTh{

    background: #43c5e0 !important;
    text-align: center !important;

}

#ahaTable1, #ahaTable{
width: 98%;
    background: #fff !important;
   padding: 0px !important;
   margin: 40px;
}

.caveatsTable, .defectsHeatMap, .tGradeMatrixTable{
 background: #fff !important;
}

.platformTables{
display: flex;
    width: 100%;
    margin-top:-40px;
    }

.pTableHeader{
width:100%;
display: flex;
margin: 10px;
padding-right:10px !important;
}

.pTableDiv{
    width: 100%;
    margin: 20px;
    background: #fff;
    border:3px solid #0c2f4a;
    border-radius: 20px;
}

.pTableTitle{
   /* width: 28%; */
    font-size: 28px;
    margin: 0;
    color: #000;
    text-align: center;
    margin-top: 100px;
    font-weight: 700;
}
.pTableImageDiv{
width:70%;
}

.pTableImage{
width:100%;
background-size:100% 100%;
}

.pTableRTable{
  width: 100%;
    line-height: 35px;
    font-size: 20px;
    color: #000;
    font-weight: 600;
    text-align: center;
}
.activityTitle{
   font-size: 28px;
   font-weight:700;
}

.activityDetails{
   font-size: 24px;
   font-weight:600;
   margin-top:70px;
   margin-left:100px;
    color: #fff;
    width: 100px;
    height: 100px;
  
}

.cfdrow th{
  color:#000;
};

.activityDetails>ul{
  list-style-type: none !important;
}

.activityDetails>ul>li{
  margin:15px;
  font-weight: 500 !important;
}



.activityDetails>ul>li::before{
         content: "\00BB";
         margin-right:20px;
}

/*
.slide-in {
    animation: slide-in 0.5s forwards;
    -webkit-animation: slide-in 0.5s forwards;
}

@keyframes slide-in {
    100% { transform: translateX(0%); }
}

@-webkit-keyframes slide-in {
    100% { -webkit-transform: translateX(0%); }
}
*/

.tableHeading{
  width: 100%;
    border: 1px solid #ddd;
    background: orange;
    color: #fff;
    line-height: 40px;
      font-weight: 600;
    font-size: 20px;
    padding-left: 20px;
}  

.defectWrapper{
  width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 35px;
}

.pidDiv{
  height:40px;
  text-overflow: ellipsis;
    overflow: scroll;
}

.pTablePids{
width: 100%;
    border: 1px solid #ddd;
    background: orange;
    color: #fff;
    line-height: 40px;
    font-weight: 600;
    font-size: 18px;
    padding-left: 20px;
    min-height: 80px;
}

.pTableRTableTH{
  width:48%;
  text-align: center !important;
  white-space: nowrap !important;
  border: 1px solid #ddd;
  padding: 3px !important;
  font-weight: 700;
  color: #000;
 }

 .cfdTh{
  background: #9bead9 !important;
    text-align: center !important;
    white-space: nowrap !important;
    border: 1px solid #ddd;
    padding: 3px !important;
    font-weight: 700;
    line-height: 30px;
    font-size: 16px;
    color: #000;
 }

  .cfdTd{
   background: #fff;
   text-align: center !important;
  white-space: nowrap !important;
  border: 1px solid #ddd !important;
  padding: 3px !important;
  font-weight: 600;
  line-height: 30px;
    font-size: 16px;
    color: #000;
 }

.pTableRTableTd{
  width:48%;
  text-align: center !important;
  white-space: wrap !important;
  border: 1px solid #ddd;
  padding: 3px !important;
  font-weight: normal;
  color: #000;
 }

/*.pTableRTable tr:nth-child(odd) {background-color: #7a9999 !important;}*/


.fmenuItem12:hover,
.fmenuItem12:active {
    outline: 0 !important;
}

/* 3D Button */
.fmenuItem12 > img{
   background: transparent;
    height: 50px;
    margin: 7px !important;
    margin-bottom: 18px !important;
    width: 50px;
}

.fmenuItem12 {
     margin-right: 30px;
    margin-bottom: 20px;
    margin-top: 10px;
    margin-left: 30px;
    background: #fff !important;
    border: none !important;
    border-radius: 80px !important;
    box-shadow:  0 -4px 8px 4px hsla(0,0%,0%,.5) !important;
    color: #303030 !important;
    cursor: pointer !important;
    font: bold 40px/85px sans-serif !important;
    height: 90px !important;
    text-shadow: 0 1px 1px rgba(233, 225, 225, 0.25),
                 0 -1px 1px rgba(230, 225, 225, 0.75) !important;
    width: 90px !important;
}
.fmenuItem12:hover,
.fmenuItem12:focus {
    color: #0ab !important;
    text-shadow: 0 0 20px hsla(240,75%,75%,.5) ,
                 0 1px 1px hsla(0,0%,100%,.25) ,
                 0 -1px 1px hsla(0,0%,0%,.75) !important;
}
.fmenuItem12:active {
    box-shadow: inset 0 0 2px 2px hsla(0,0%,0%,.2),
                inset 0 0 2px 4px hsla(0,0%,0%,.2),
                inset 0 0 2px 6px hsla(0,0%,0%,.2),
                inset 0 0 1px 7px hsla(0,0%,0%,.5),
                inset 0 5px 15px 7px hsla(0,0%,0%,.15),
                inset 0 -4px 2px 3px hsla(0,0%,0%,.5),
                inset 0 1px 1px 7px hsla(0,0%,100%,.25),
                inset 0 -30px 30px hsla(0,0%,0%,.1),
                inset 0 30px 30px hsla(0,0%,0%,.2),
                0 -4px 8px 4px hsla(0,0%,0%,.5),
                0 5px 10px hsla(0,0%,0%,.25),
                0 0 2px 2px hsla(0,0%,0%,.2),
                0 0 2px 4px hsla(0,0%,0%,.2),
                0 0 2px 6px hsla(0,0%,0%,.2),
                0 0 2px 8px hsla(0,0%,0%,.5),
                0 1px 2px 8px hsla(0,0%,100%,.25),
                0 -1px 2px 8px hsla(0,0%,0%,.5);
    line-height: 86px;
}


.topnav a {
  text-align: center;
  padding: 0px 30px;
  text-decoration: none;
  font-size: 20px;
  font-weight: 600;
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
.worldMaptables{
  display: flex;
    width: 92%;
    margin-left: 100px;
    padding-bottom: 50px;
    margin-top: 20px;
    justify-content: space-between;
    color:#fff;
}
.bottomnav a {
 /*background: linear-gradient(90deg, rgba(8,195,254,1) 13%, rgba(37,147,227,1) 71%);*/
background: linear-gradient(90deg, #0d0f9f 13%, #0c0a48 71%);
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

#imageChart1, #imageChart{
  margin-left:80px !important;
}

.relPathLink{
      z-index: 10000000;
    position: absolute;
    top: 10px;
    right: 41px;
}

.relPathLink a{
  font-size: 18px;
    /* color: #000; */
    float: right;
    margin-left: 200px;
}

.proListDiv {
    margin: 10px;
    position: relative;
    background: transparent;
    right: 0;
    margin-left: 80px;
}
.selectedOption {
-webkit-animation: glowing 1300ms infinite;
        -moz-animation: glowing 1300ms infinite;
        -o-animation: glowing 1300ms infinite;
        animation: glowing 1300ms infinite;
            background: #0d5256 !important;
               text-decoration: underline !important;
         }

/*.selectedOption:after {
   /* content: "";
    position: absolute;
    width: 80px;
    height: 80px;
    background: #cce0ee;
    transform: rotate(45deg);
    z-index: -1;
    top: 180px;
    margin-left: -82px;
    box-shadow: -1px -1px 10px -2px rgb(0 0 0 / 50%);
}*/

.prBtn{
   background-image: linear-gradient(to right, #1d2f81 0%, #001510  51%, #96b3f1  100%) !important;
   display: block !important;
   margin: 15px 0;
   padding: 3px 10px;
   min-width: 70px;
   min-height: 30px;
   font-size: 14px;
   cursor: pointer !important;
   text-align: center;
   text-transform: uppercase;
   transition: 0.5s;
   background-size: 200% auto !important;
   color: white !important;            
   box-shadow: 0 0 20px #eee;
   border-radius: 10px !important;
   }

.pidTooltips{
  font-size:18px !important;
  line-height: 30px;
}
.worldMapImge{
    width: 98%;
    min-height: 600px;
    padding-top: 25px;
    background: transparent;
}


.projectDetailsTable, .labDetails{
    width: 100%;
    line-height: 30px;
    font-weight: 500;
   font-size: 24px !important;
    color: #fff;
}
.projectDetailsTable>tr>td, .projectDetailsTable>tr>th{
  border:1px solid #ddd;
  text-align: center;
}
.projectDetails{
      font-size: 24px;
    font-weight: 600;
    color: #0d5256;
    margin-bottom: 50px;
}
.labDetails{
      width: 25%;
    margin-bottom: 40px;
    margin-left: 50px;
    font-weight: 600;
    margin-top: 70px;
}
.forWorldMap{
  width: 48%;
    height: 600px;
}

.worldMapDiagramWrapper{
  position: absolute;
    margin-left: 550px;
    position: absolute;
    height: 700px;
    margin-bottom: 40px;
    width: 48%;
    margin-top: -100px;
}

.graphTable{
    margin: 0px 30px;
}
.bottomnav a:hover {
 text-decoration: none;
}
.custmenuWrapper{
    width: 100%;
}
.deliveredReleasesTable{
  width:100%;
  font-size:20px;
  font-weight:500;
  text-align:center;
  line-height: 35px;
}
.deliveredReleasesTable>tr>td{
  border:1px solid #ddd;
}
.customerNotesContainer {
  width: 100%;
  height: fit-content;
  margin: 0 auto;
  background: transparent;
  min-height: 40px;
  flex-wrap: wrap;
  text-align: center !important;
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
.pTableReleaseDetails{
width:100%;
display: flex;
    text-align: center;
}
.relDetailsText{
 font-size: 16px;
    font-weight: 700;
    font-style:italic;
    width: 100%;
    background: #0c606a;
    color: #fff;
    padding: 10px;
}
.releaseText{
  margin-bottom: 10px;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;

}
.marginBottom20{
margin-bottom:20px !important;
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
min-height:900px;
position:relative;
    margin-left: 0 !important;
    margin-right:0 !important;
    padding-left: 40px;
    padding-right: 40px !important;
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

.worldMapTypeButton{
  font-size: 20px;
    background: #5bb0ef;
    color: #fff;
    padding: 10px;
    border-radius: 10px;
    font-weight: 600;
    font-style: italic;
}

.worldMapType{
width:98%;
display:flex;
justify-content: space-between;
margin-bottom: 50px;
}
.activeCustDetails, .activeProdDetails, .activeFeatureDetails, .activeUsecaseDetails, .activeUpcomingDetails, .activeWorldMapDetails,
.activePlatformDetails, .activeRolesDetails, .activeAhaDetails, .activeRorDetails, .activeExecutionDetails,
.activeQualityDetails, .activeTestPlanDetails, .activeTopologyDetails, .activeCaveatsDetails, .activeUpgradeMatrixDetails,
.activeTriggerMatrixDetails, .activeReadinessDetails, .activePostFcsDetails, .activeCFDDetails{
position: absolute;
    width: 100%;
   
}
.pageTitle{
      margin: 30px;
    font-size: 35px;
    text-align: center;
    margin-bottom: 60px;
    color: #fff;
    font-weight: 600;
}



.activeUsecaseDetails, .defaultUsecaseDetails, .activeProdDetails, .defaultProdDetails, .defaultTriggerMatrixDetails,
.defaultUpgradeMatrixDetails, .defaultWorldMapDetails, .defaultCFDDetails, .activeExecutionDetails, .defaultExecutionDetails{ 
display:block !important;
}
.defaultCustDetails, .defaultProdDetails, .defaultFeatureDetails, .defaultUsecaseDetails, .defaultUpcomingDetails,
.defaultRorDetails, .defaultAhaDetails, .defaultRolesDetails, .defaultPlatformDetails, .defaultExecutionDetails,
.defaultQualityDetails, .defaultTestPlanDetails, .defaultTopologyDetails, .defaultCaveatsDetails, .defaultUpgradeMatrixDetails,
.defaultTriggerMatrixDetails, .defaultReadinessDetails, .defaultPostFcsDetails, .defaultWorldMapDetails, .defaultCFDDetails{
    width: 100%;
   
}

.defaultWorldMapDetails, .activeWorldMapDetails{
width: 95% !important;
    margin-top: 30px !important;
    }

.activeDetails{
margin-left:70px;
transition: all;

}

.defaultCustDetails, .defaultProdDetails, .defaultFeatureDetails, .defaultUsecaseDetails, .defaultUpcomingDetails,
.defaultRorDetails, .defaultAhaDetails, .defaultRolesDetails, .defaultPlatformDetails, .defaultExecutionDetails,
		.defaultQualityDetails, .defaultTestPlanDetails, .defaultTopologyDetails, .defaultCaveatsDetails, .defaultUpgradeMatrixDetails,
		.defaultTriggerMatrixDetails, .defaultReadinessDetails, .defaultPostFcsDetails, .defaultWorldMapDetails, .defaultCFDDetails{
 transition: transform 0.4s ease;
    transform-origin: center center -50px;
    -webkit-transform-origin: center center -50px;
    width: 100%;
}
.defaultCustDetails, .defaultProdDetails, .defaultFeatureDetails, .defaultUsecaseDetails, .defaultUpcomingDetails,
.defaultRorDetails, .defaultAhaDetails, .defaultRolesDetails, .defaultPlatformDetails, .defaultExecutionDetails,
		.defaultQualityDetails, .defaultTestPlanDetails, .defaultTopologyDetails, .defaultCaveatsDetails, .defaultUpgradeMatrixDetails,
		.defaultTriggerMatrixDetails, .defaultReadinessDetails, .defaultPostFcsDetails, .defaultWorldMapDetails,.defaultCFDDetails {
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
}
.activeCustDetails, .activeProdDetails, .activeFeatureDetails, .activeUsecaseDetails, .activeUpcomingDetails,
.activePlatformDetails, .activeRolesDetails, .activeAhaDetails, .activeRorDetails, .activeExecutionDetails,
		.activeQualityDetails, .activeTestPlanDetails, .activeTopologyDetails, .activeCaveatsDetails, .activeUpgradeMatrixDetails,
		.activeTriggerMatrixDetails, .activeReadinessDetails, .activePostFcsDetails, .activeWorldMapDetails, .activeCFDDetails{
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
      width: 98%;
    margin: 10px;
    margin-left: 20px;
    margin-right: 0px;
    margin-bottom: 25px;
    border-radius: 20px;
    border: 1px solid #fff !important;
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
 background: #0c2f4a;
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

.selectedRelBtn{
  -webkit-animation: glowing 1300ms infinite;
        -moz-animation: glowing 1300ms infinite;
        -o-animation: glowing 1300ms infinite;
        animation: glowing 1300ms infinite;
        background: #0c2f4a !important;
}

.activeCustomer {
    color: #007493;
    font-weight: bold !important;
    background: #adf0e0 !important;
    padding-bottom: 10px !important;
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

.qualityCharts{
width:100% !important;
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
.multi-button {
  --primary-1: 230, 15%, 22%; /* Neutral */
  --primary-2: 230, 15%, 20%; /* Dark */
  --primary-3: 230, 15%, 18%; /* Darker */
  --primary-4: 230, 15%, 45%; /* Lightest */
  --secondary: 166, 69%, 81%; /* Splash of Color */
  --transition: cubic-bezier(0.77, 0, 0.175, 1); 
}

.multi-button button{
    background: #0c2f4a;
    color: #fff;
    box-shadow: none;
    border: none;
    margin-right: 17px;
    padding-top: 7px;
    border-radius: 10px;
    }

.multi-button, .multi-button:before, .multi-button:after {
  box-sizing: border-box;
}

body {
  height: 100vh;
  
}

.btn__arrow {
    width: 50px;
    height: 25px;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    }
    .btn__arrow:after {
     content: "";
     position: absolute;
     width: 20px;
     height: 20px;
     background: white;
     transform: translateX(-50%) translateY(-50%) rotate(45deg);
     top: 0;
     left: 50%;
     box-shadow: 1px 1px 20px 0px rgba(0,0,0,0.6);
    }
  

.multi-button {
  --shadow: 286, 24%, 14% !important;
    right: 150px;
    margin-top: 10px;
    /* margin-right: 170px; */
  /*  position: absolute !important;*/
    padding: 0.2rem !important;
    /* background: hsl(var(--primary-1)) !important; */
    /* border: 1px solid hsl(var(--primary-2)); */
    /* border-radius: 4px; */
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.multi-button  label {
 display: inline-block;
    position: relative;
    padding: 0.8rem 1.4rem;
    color: hsl(var(--secondary)) !important;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    border: none;
    border-radius: 2px;
    background: none;
    transition: all .4s var(--transition);
    cursor: pointer;
}



.multi-button  label:before {
  content: '';
  position: absolute;
  height: 1px;
  width: 0;
  top: 20%;
  left: 50%;
  background: hsla(var(--secondary),.35);
  border-radius: 2px;  
  transition: all .25s var(--transition);
}

.multi-button  label:hover:before {
  width: 80%;
  left: 10%;
  border-top: 1px solid hsl(var(--secondary));
}

.multi-button .selectedBtn{
  background: hsl(var(--secondary)) !important;;
   color: #0c2f4a !important;
   border:3px solid #0c2f4a !important;
}

.multi-button  .selectedBtn label:before {
  height: 60%;
  bottom: 20%;
}

#relPathTable th{
  background: #0c2f4a !important;
  color:#fff !important;
}

.multi-button .selectedBtn label{  
  color: #0c2f4a !important;
  transition-delay: .1s;
}

.multi-button input[type="radio"] {
  display: none;
}
.featureDetails{
  margin-top:-40px !important;
}
.mileStoneDiagramWrapper img{
  height:250px;
  margin-bottom:40px;
  width: 94%;
}

/* Media Queries */

/* 200% */

@media (min-width:500px){
   #rackHeader{
    max-height: 90px !important;
  }
  .topnav{
    width:70% !important;
    max-height: 90px ! important;
    margin-top: -10px !important;
    margin-left: 90px !important;
    padding-left: 10px !important;
    padding-right: 10px !important;

/* background-color: orange !important; */
  }
  .fmenuItem12{
    height: 65px !important;
    width: 65px !important;
    margin-right: 0px !important;
    margin-top: 15px !important;
  }
   .fmenuItem12 > img{
    height: 50px !important;
    margin: 6px !important;
    margin-bottom: 40px !important;
    width: 50px !important;
    padding: 4px !important;
  }
   .multi-button{
    right: 100px !important;
    margin-top: -10px !important;
    margin-right: -10px !important;
    padding: 4px !important;
  }
   .multi-button button{
    margin-right:10px !important;
    padding-top:7px !important;

  }
    .header-heading a{
    margin-top: 80px !important;
  }
  .main-logo{
    width: 40px !important;
    margin-right: 10px !important;
  }
   #tl-title1{
    margin-top: 2px !important;
    font-size: 10px !important;
    margin-left: 0px !important;
  }
   .firstHeader{
    margin-top: -20px !important;
    font-size: 12px !important;
    margin-right: -10px !important;
    padding: 10px !important;
  }
  .lg_addBtn1{
    height: 30px !important;
    width: 30px !important;
  }
   .relNav{
    width: 100% !important;
    max-height: 60px !important;
    margin-top: -42px !important;
  }
  .bottomnav a{
    padding: 5px 10px !important;
    font-size: 12px !important;
    margin: 10px 10px !important;
  }

  .insideButton{
    margin-top: 10px !important;
    height: 45px !important;
    margin-right: 0px !important;
    margin-left: 0px !important;
    width: 80px !important;
    font-size: 12px !important;
    padding: 2px;
  }

   .pageContentDiv{
    margin-top: 20px;
    padding-top: 200px;
    height: 660px;
    width: 100%;
  }
  .platformTables{
    margin-left:0px !important;
  }
  .pageTitle{
   font-size: 15px !important;
    /* margin-bottom: 0px; */
  }
 

    .pTableDiv{
    width: 100% !important;
    margin: 5px !important;
  }
  .pTableHeader{
    margin: 5px !important;
  }
  .pTableTitle{
   font-size: 20px !important;
   padding:5px !important;
   font-weight: 500 !important;
  }
  .pTablePids{
    line-height: 30px !important;
    font-size: 14px !important;
    min-height: 60px !important;
  }
  .relDetailsText{
    font-size: 14px !important;
    font-weight: 600 !important;
  }
  .pTableRTable{
    font-size: 14px !important;
    line-height:20px !important;
  }
 
.marginBottom20{
  margin-bottom: 20px !important;
    margin-top: -40px !important;
}
  .funnelChart {
    height:310px !important;
    margin-right: 10px !important;
  }
  .prBtn{
    min-width: 0px !important;
    width: 40px;
    height: 20px;
    font-size: 10px !important;
    padding: 6px !important;
    margin-left: -50px !important;
  }
  .highcharts-container > svg {
    height:250px !important;

}
  .defaultCustDetails{
    margin-top: 20px !important;
    height: 250vh;
  }

  .defaultProdDetails{
   margin-top: 20px !important;
    height: 250vh;
}
.defaultCFDDetails{
   margin-top: 20px !important;
    height: 250vh;
}
.defaultUpcomingDetails{
   margin-top: 20px !important;
    height: 250vh;
}

.defaultFeatureDetails{
  margin-top: 80px !important;
    height: 250vh;
}
.featureDetails{
  margin-top: -40px !important;
  margin-left: -40px !important;
  width: 100% !important;
}



.mileStoneDiagramWrapper{
  height:250px !important;
  margin-bottom:40px !important;
  width: 100% !important;
}

.highcharts-background{
  height:380px !important;

}
.relPathModal{
  top: 100px !important;
  left: 550px !important;
  min-height: 100px !important;
  min-width: 450px !important;
}

.worldMaptables{
  width: 100% !important;
  margin-left: 40px !important;
  padding-bottom: 80px !important;
  margin-top: 20px !important;
}
.defaultWorldMapDetails{
    width: 100% !important;
    margin-top: -20px !important;
    margin-left: 0px !important;
    height: 250vh;

}
.worldmapImageFirstRow{
  width: 100% !important;
}
.defaultAhaDetails{
    width: 100%;
    margin-top: -20px;
    padding-left: 20px;
    padding-right: 30px;
    height: 250vh;
}
.defaultExecutionDetails{
     width: 100%;
    padding: 0px !important;
    margin-top: -20px !important;
    height: 250vh;
}

.projectedSummaryData2 {
    width: 100% !important;
    margin-top: -50px !important;
    margin-left: -30px !important;
}
.projectedSummaryData2 .summary_li {
    margin-top: 60px !important;
    margin-left: 20px !important;
    margin-right: 10px !important;
    width: 14%;
}
.summaryCircle1 {
    height: 40px !important;
    width: 40px !important;
    padding-left: 2px !important;
    padding-top: 10px !important;
    margin-top: -50px !important;
    font-size: 12px !important;
    border-radius: 100% !important;
}
.coloredCircleBoxdata {
    padding-top: 0px !important;
    margin-left: 0px !important;
}
.highcharts-container > svg {
    height: 85% !important;
}
.defaultQualityDetails{
    width: 100%;
    margin-top: -20px;
    height: 200vh;
}
.defaultTestPlanDetails{
   width: 100%;
    margin-top: -20px;
    height: 200vh;

}
.defaultCaveatsDetails{
    margin-top: -20px;
    height: 250vh;
}

.defaultUpgradeMatrixDetails{
    width: 100%;
    height: 250vh;
    margin-top: -20px;
}
.defaultTriggerMatrixDetails{
      width: 100%;
    height: 250vh;
    margin-top: -20px;
}
.defaultRorDetails{
    width: 100%;
    height: 250vh;
    margin-top: -20px;
} #rackHeader{
    max-height:100px !important;
    height: 100px;
    padding: 0px;
  }
  .postauth-header1{
    width: 100% !important;
    height: 100px;
    margin-top: 20px !important;
  }
  .topnav{
    max-height: 100px!important;
    margin-left: 80px !important;
    margin-top: -25px !important;
    width: 70% !important;
    /* background-color:#5cb7c7 !important; */
  }
   .fmenuItem12{
    height: 60px !important;
    margin-top: 20px !important;
    margin-bottom: 20px !important;
    margin-left: 10px !important;
    width: 60px !important;
    padding: 0px !important;
    border-radius: 100% !important;
    padding-left: 0px !important;
  }

   .fmenuItem12 > img{
    height: 50px !important;
    margin-top: 0px !important;
    margin-bottom: 30px !important;
    width: 50px !important;
    padding: 6px !important;
    padding-left: 6px !important;
  }
      .header-heading a{
    margin-top: 80px !important;
    margin-left: 0px !important;
  }
    .main-logo{
    width: 40px !important;
    margin-right: 10px !important;
  }
   #tl-title1{
    margin-top: 5px !important;
    font-size: 1rem !important;
    margin-left: 5px !important;

  }
   .multi-button{
    height: 90px;
    margin-top: -10px !important;
    padding: 0px !important;
    margin-left: 20px !important;
    margin-right: 20px !important;
  }

   .multi-button button{
    margin: 5px !important;
    padding-top: 0px !important;
    height: 40px !important;
    width: 80px !important;

  }
  .multi-button label{
    font-size: .8rem;
    font-weight: 600;
  }
  .firstHeader{
    margin-top: -40px !important;
    font-size: 1.4rem !important;
    margin-right: 10px !important;
    padding: 0px !important;
    padding-right: 10px !important;
  }
  .lg_addBtn1{
    height: 25px !important;
    width: 25px !important;
  }
  .bottomnav{
    margin-top: 80px;
    height: 90px;

  }

   .relNav{
    max-height: 90px !important;
    margin-top: 10px !important;
  }
  .bottomnav a{
    padding: 5px 20px !important;
    font-size: 1.4rem !important;
    margin: 10px !important;
  }

  .cust_buttons{
    margin-top:10px;
  }

  .insideButton{
    margin: 0px !important;
    margin-left: -20px !important;
    height: 40px !important;
    width: 85px !important;
    padding: 2px !important;
    font-size: 1.2rem !important;
  }

 .pageContentDiv{
    margin-top: 120px;
    padding-top: 80px;
    height: 350vh;
  }
   .pageTitle{
    font-size: 1.6rem !important;
    /* margin-bottom: 60px !important; */
  }

  .defaultCustDetails{
    margin-top: 80px !important;
    height: 3600px;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 0px;
    padding-right: 20px;
  }

   .pTableDiv{
    width: 30% !important;
    margin: 5px !important;
  }

  .pTableHeader{
    margin: 20px !important;
    padding: 0px;
    height: 120px;
  }

  .pTableTitle{
    font-size: 1.8rem !important;
    padding: 10px !important;
    font-weight: 500 !important;
  }

  .pTableImageDiv img{
    height: 120px;
    padding-right: 20px;
  }

  .pTablePids{
    line-height: 20px !important;
    font-size: 1.4rem !important;
    min-height: 0px !important
  }

  .relDetailsText{
    font-size: .8rem !important;
    height: 60px;
    font-weight: 500 !important;
    padding-top: 5px;
  }

  .pTableRTable{
    font-size: 1rem !important;
    line-height: 1.2rem !important;
  }

    .defaultProdDetails{
    margin-top: 80px !important;
    height: 600vh;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 0px;
    padding-right: 0px;
}
#ddtsPlatformChart .highcharts-container{
      height: 36vh !important;
}
#ddtsFoundChart .highcharts-container{
      height: 38vh !important;
      padding-bottom: 50px;
}

.marginBottom20{
    margin-bottom: 20px !important;
    margin-top: 0px !important;
}
  .funnelChart {
    height: 50vh !important;
    margin-right: 5px !important;
  }
  .prBtn{
    min-width: 0px !important;
    width: 6vh;
    height: 4vh;
    font-size: 1.2rem !important;
    padding: 8px !important;
    margin-right: 10px !important;
  }
  .highcharts-container > svg {
    width: 100% !important;
    height: 90% !important;
}
#imgeChart.highcharts-container{
  height: 40vh;
}

#ddtsPlatformChart .highcharts-container{
  height: 300px !important

}
.relPathModal{
    top: 150px !important;
    left: 700px !important;
    height: 30vh !important;
    width: 100vh !important;
}
.relPathModal.modal_title{
  font-size: 2.4rem;
}



.defaultUsecaseDetails {
    margin-top: 80px !important;
    height: 650vh;
    margin-left: -80px;
    margin-right: -10px;
    padding-left: 40px;
    padding-right: 20px;
}
.networkDiagramWrapper img{
  height: 35vh;

}
.topoDiagramWrapper{
    height: 35vh !important;
    padding: 20px !important;
    line-height: 1.4rem;
    font-size: 1.0rem;
}
.defaultFeatureDetails{
        margin-top: 150px !important;
    height: 650vh;
    margin-left: -100px;
    margin-right: -100px;
    padding-left: 100px;
    padding-right: 20px;
}
.highcharts-container > svg{
  height: 80%;
}

.featureDetails{
      margin-top: 30px !important;
    margin-left: -40px !important;
    width: 100% !important;
}
.funnelChart1 {
    height: 50vh;
   padding-top: 20px;
}
.defaultCFDDetails{
    margin-top: 80px !important;
    height: 600vh;
    margin-left: -40px;
    margin-right: -20px;
    padding-left: 40px;
    padding-right: 40px;
}

table.vgt-table{
  font-size: 24px !important;
}
input.vgt-input {
    font-size: 1.8rem !important;
}
.defaultUpcomingDetails{
    margin-top: 80px !important;
    height: 600vh;
    margin-left: -20px;
    margin-right: -10px;
    padding-left: 10px;
    padding-right: 40px;
}


.defaultUpcomingDetails.milestoneImge .funnelChart{
  height:50vh !important;
  margin-bottom:40px !important;
  width: 100% !important;
}


.mileStoneDiagramWrapper img{
    height: 30vh !important;
    margin-bottom: 0px !important;
    width: 100% !important;
    padding-right: 30px;
}

.defaultWorldMapDetails{
     margin-top: 40px !important;
    margin-left: 0px !important;
    height: 650vh;
    margin-right: 80px;
    padding-left: 10px;
    padding-right: 10px;

}
.defaultAhaDetails{
    margin-top: 40px;
    height: 650vh;
    margin-right: 0px;
    padding-left: 10px;
    padding-right: 60px;
}

.defaultExecutionDetails{
    margin-top: 40px !important;
    height: 650vh;
    margin-left: 0px !important;
    padding-left: 0px !important;
}

.contentGraphClass{
  min-height: 600px;
  max-height: 900px;
  
}

.highcharts-background{
  height:380px !important;

}


.worldMaptables{
  width: 100% !important;
  margin-left: 40px !important;
  padding-bottom: 80px !important;
  margin-top: 20px !important;
}

.worldmapImageFirstRow{
  width: 100% !important;
}

.summary_Data {
    margin-top: 5px !important;
    font-size: 20px !important;
    margin-left: 10px !important;
}
.projectedSummaryData2 {
    width: 100% !important;
    margin-top: -50px !important;
    margin-left: -30px !important;
}
.projectedSummaryData2 .summary_li {
    margin-top: 60px !important;
    margin-left: 20px !important;
    margin-right: 10px !important;
    width: 14%;
}
.summaryCircle1 {
    height: 60px !important;
    width: 60px !important;
    padding-left: 0px !important;
    padding-top: 30px !important;
    margin-top: -120px !important;
    font-size: 18px !important;
    border-radius: 100% !important;
}
.coloredCircleBoxdata {
    padding-top: 10px !important;
    margin-top: -50px !important;
}
.highcharts-container > svg {
    height: 85% !important;
}

.summaryCharts .chartsA .highcharts-container {
    height: 800px !important;
    width: 90% !important;
    margin-left: 0px !important;
    margin-top: -160px !important;
}




.defaultQualityDetails{
    margin-top: 40px;
    height: 600vh;
    margin-left: 0px;
    margin-right: 20px;
    padding-left: 20px;
    padding-right: 20px;
}
.defaultTestPlanDetails{
    margin-top: 40px;
    height: 650vh;
    margin-left: 20px;
    margin-right: 50px;
    padding-left: 10px;
    padding-right: 10px;

}
.defaultCaveatsDetails{
    margin-top: 40px;
    height: 650vh;
    margin-left: 20px;
    margin-right: 20px;
    padding-left: 10px;
    padding-right: 10px;
}

.defaultUpgradeMatrixDetails{
    margin-top: 40px;
    height: 650vh;
    margin-left: 20px;
    margin-right: 20px;
    padding-left: 20px;
    padding-right: 20px;
}
.defaultTriggerMatrixDetails{
    margin-top: 40px;
    height: 650vh;
    margin-left: 20px;
    margin-right: 20px;
    padding-left: 20px;
    padding-right: 20px;
}
.defaultRorDetails{
    margin-top: 40px;
    height: 650vh;
    margin-left: 10px;
    margin-right: 80px;
    padding-left: 20px;
    padding-right: 60px;

}

.teamDetails{
    margin-top: -80px !important;
    height: 650vh;
    margin-left: -20px !important;
    margin-right: 20px !important;
    padding-left: 20px !important;
    padding-right: 20px !important;
}

.orgTable {
    font-size: .8rem;
    height: 30vh !important;
}
  
}

/* 150% 175% */

@media (min-width:700px){
   #rackHeader{
    max-height:100px !important;
    height: 100px;
    padding: 0px;
  }
  .postauth-header1{
    width: 100% !important;
    height: 100px;
    margin-top: 20px !important;
  }
  .topnav{
    max-height: 100px!important;
    margin-left: 80px !important;
    margin-top: -25px !important;
    width: 70% !important;
    /* background-color:#5cb7c7 !important; */
  }
   .fmenuItem12{
    height: 60px !important;
    margin-top: 20px !important;
    margin-bottom: 20px !important;
    margin-left: 10px !important;
    width: 60px !important;
    padding: 0px !important;
    border-radius: 100% !important;
    padding-left: 0px !important;
  }

   .fmenuItem12 > img{
    height: 50px !important;
    margin-top: 0px !important;
    margin-bottom: 30px !important;
    width: 50px !important;
    padding: 6px !important;
    padding-left: 6px !important;
  }
      .header-heading a{
    margin-top: 80px !important;
    margin-left: 0px !important;
  }
    .main-logo{
    width: 40px !important;
    margin-right: 10px !important;
  }
   #tl-title1{
    margin-top: 5px !important;
    font-size: 1rem !important;
    margin-left: 5px !important;

  }
   .multi-button{
    height: 90px;
    margin-top: -10px !important;
    padding: 0px !important;
    margin-left: 20px !important;
    margin-right: 20px !important;
  }

   .multi-button button{
    margin: 5px !important;
    padding-top: 0px !important;
    height: 40px !important;
    width: 80px !important;

  }
  .multi-button label{
    font-size: .8rem;
    font-weight: 600;
  }
  .firstHeader{
    margin-top: -40px !important;
    font-size: 1.4rem !important;
    margin-right: 10px !important;
    padding: 0px !important;
    padding-right: 10px !important;
  }
  .lg_addBtn1{
    height: 25px !important;
    width: 25px !important;
  }
  .bottomnav{
    margin-top: 80px;
    height: 90px;

  }

   .relNav{
    max-height: 90px !important;
    margin-top: 10px !important;
  }
  .bottomnav a{
    padding: 5px 20px !important;
    font-size: 1.4rem !important;
    margin: 10px !important;
  }

  .cust_buttons{
    margin-top:10px;
  }

  .insideButton{
    margin: 0px !important;
    margin-left: -20px !important;
    height: 40px !important;
    width: 85px !important;
    padding: 2px !important;
    font-size: 1.2rem !important;
  }

 .pageContentDiv{
    margin-top: 120px;
    padding-top: 80px;
    height: 350vh;
  }
   .pageTitle{
    font-size: 1.6rem !important;
    /* margin-bottom: 60px !important; */
  }

  .defaultCustDetails{
    margin-top: 80px !important;
    height: 3600px;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 0px;
    padding-right: 20px;
  }

   .pTableDiv{
    width: 30% !important;
    margin: 5px !important;
  }

  .pTableHeader{
    margin: 20px !important;
    padding: 0px;
    height: 120px;
  }

  .pTableTitle{
    font-size: 1.8rem !important;
    padding: 10px !important;
    font-weight: 500 !important;
  }

  .pTableImageDiv img{
    height: 120px;
    padding-right: 20px;
  }

  .pTablePids{
    line-height: 20px !important;
    font-size: 1.4rem !important;
    min-height: 0px !important
  }

  .relDetailsText{
    font-size: .8rem !important;
    height: 60px;
    font-weight: 500 !important;
    padding-top: 5px;
  }

  .pTableRTable{
    font-size: 1rem !important;
    line-height: 1.2rem !important;
  }

    .defaultProdDetails{
    margin-top: 80px !important;
    height: 600vh;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 0px;
    padding-right: 0px;
}
#ddtsPlatformChart .highcharts-container{
      height: 36vh !important;
}
#ddtsFoundChart .highcharts-container{
      height: 38vh !important;
      padding-bottom: 50px;
}

.marginBottom20{
    margin-bottom: 20px !important;
    margin-top: 0px !important;
}
  .funnelChart {
    height: 50vh !important;
    margin-right: 5px !important;
  }
  .prBtn{
    min-width: 0px !important;
    width: 6vh;
    height: 4vh;
    font-size: 1.2rem !important;
    padding: 8px !important;
    margin-right: 10px !important;
  }
  .highcharts-container > svg {
    width: 100% !important;
    height: 90% !important;
}
#imgeChart.highcharts-container{
  height: 40vh;
}

#ddtsPlatformChart .highcharts-container{
  height: 300px !important

}
.relPathModal{
    top: 150px !important;
    left: 700px !important;
    height: 30vh !important;
    width: 100vh !important;
}
.relPathModal.modal_title{
  font-size: 2.4rem;
}



.defaultUsecaseDetails {
    margin-top: 80px !important;
    height: 650vh;
    margin-left: -80px;
    margin-right: -10px;
    padding-left: 40px;
    padding-right: 20px;
}
.networkDiagramWrapper img{
  height: 35vh;

}
.topoDiagramWrapper{
    height: 35vh !important;
    padding: 20px !important;
    line-height: 1.4rem;
    font-size: 1.0rem;
}
.defaultFeatureDetails{
        margin-top: 150px !important;
    height: 650vh;
    margin-left: -100px;
    margin-right: -100px;
    padding-left: 100px;
    padding-right: 20px;
}
.highcharts-container > svg{
  height: 80%;
}

.featureDetails{
      margin-top: 30px !important;
    margin-left: -40px !important;
    width: 100% !important;
}
.funnelChart1 {
    height: 50vh;
   padding-top: 20px;
}
.defaultCFDDetails{
    margin-top: 80px !important;
    height: 600vh;
    margin-left: -40px;
    margin-right: -20px;
    padding-left: 40px;
    padding-right: 40px;
}

table.vgt-table{
  font-size: 24px !important;
}
input.vgt-input {
    font-size: 1.8rem !important;
}
.defaultUpcomingDetails{
    margin-top: 80px !important;
    height: 600vh;
    margin-left: -20px;
    margin-right: -10px;
    padding-left: 10px;
    padding-right: 40px;
}


.defaultUpcomingDetails.milestoneImge .funnelChart{
  height:50vh !important;
  margin-bottom:40px !important;
  width: 100% !important;
}


.mileStoneDiagramWrapper img{
    height: 30vh !important;
    margin-bottom: 0px !important;
    width: 100% !important;
    padding-right: 30px;
}

.defaultWorldMapDetails{
     margin-top: 40px !important;
    margin-left: 0px !important;
    height: 650vh;
    margin-right: 80px;
    padding-left: 10px;
    padding-right: 10px;

}
.defaultAhaDetails{
    margin-top: 40px;
    height: 650vh;
    margin-right: 0px;
    padding-left: 10px;
    padding-right: 60px;
}

.defaultExecutionDetails{
    margin-top: 40px !important;
    height: 650vh;
    margin-left: 0px !important;
    padding-left: 0px !important;
}

.contentGraphClass{
  min-height: 600px;
  max-height: 900px;
  
}

.highcharts-background{
  height:380px !important;

}


.worldMaptables{
  width: 100% !important;
  margin-left: 40px !important;
  padding-bottom: 80px !important;
  margin-top: 20px !important;
}

.worldmapImageFirstRow{
  width: 100% !important;
}

.summary_Data {
    margin-top: 5px !important;
    font-size: 20px !important;
    margin-left: 10px !important;
}
.projectedSummaryData2 {
    width: 100% !important;
    margin-top: -50px !important;
    margin-left: -30px !important;
}
.projectedSummaryData2 .summary_li {
    margin-top: 60px !important;
    margin-left: 20px !important;
    margin-right: 10px !important;
    width: 14%;
}
.summaryCircle1 {
    height: 60px !important;
    width: 60px !important;
    padding-left: 0px !important;
    padding-top: 30px !important;
    margin-top: -120px !important;
    font-size: 18px !important;
    border-radius: 100% !important;
}
.coloredCircleBoxdata {
    padding-top: 10px !important;
    margin-top: -50px !important;
}
.highcharts-container > svg {
    height: 85% !important;
}

.summaryCharts .chartsA .highcharts-container {
    height: 800px !important;
    width: 90% !important;
    margin-left: 0px !important;
    margin-top: -160px !important;
}




.defaultQualityDetails{
    margin-top: 40px;
    height: 600vh;
    margin-left: 0px;
    margin-right: 20px;
    padding-left: 20px;
    padding-right: 20px;
}
.defaultTestPlanDetails{
    margin-top: 40px;
    height: 650vh;
    margin-left: 20px;
    margin-right: 50px;
    padding-left: 10px;
    padding-right: 10px;

}
.defaultCaveatsDetails{
    margin-top: 40px;
    height: 650vh;
    margin-left: 20px;
    margin-right: 20px;
    padding-left: 10px;
    padding-right: 10px;
}

.defaultUpgradeMatrixDetails{
    margin-top: 40px;
    height: 650vh;
    margin-left: 20px;
    margin-right: 20px;
    padding-left: 20px;
    padding-right: 20px;
}
.defaultTriggerMatrixDetails{
    margin-top: 40px;
    height: 650vh;
    margin-left: 20px;
    margin-right: 20px;
    padding-left: 20px;
    padding-right: 20px;
}
.defaultRorDetails{
    margin-top: 40px;
    height: 650vh;
    margin-left: 10px;
    margin-right: 80px;
    padding-left: 20px;
    padding-right: 60px;

}
.teamDetails{
    margin-top: -80px !important;
    height: 650vh;
    margin-left: -20px !important;
    margin-right: 20px !important;
    padding-left: 20px !important;
    padding-right: 20px !important;
}

.orgTable {
    font-size: .8rem;
    height: 30vh !important;
}
  
}

/* 115 % 125% */
@media (min-width:1000px){
 #rackHeader{
    max-height:80px !important;
    height: 80px;
    padding: 0px;
  }
  .postauth-header1{
    width: 100% !important;
    height: 90px;
    margin-top: 20px !important;
  }
  .topnav{
    max-height: 80px!important;
    margin-left: 80px !important;
    margin-top: -25px !important;
    width: 70% !important;
    /* background-color:#5cb7c7 !important; */
  }
   .fmenuItem12{
    height: 50px !important;
    margin-top: 20px !important;
    margin-bottom: 20px !important;
    margin-left: 10px !important;
    width: 50px !important;
    padding: 0px !important;
    border-radius: 100% !important;
    padding-left: 0px !important;
  }

   .fmenuItem12 > img{
    height: 50px !important;
    margin-top: 0px !important;
    margin-bottom: 30px !important;
    width: 50px !important;
    padding: 6px !important;
    padding-left: 6px !important;
  }
      .header-heading a{
    margin-top: 80px !important;
    margin-left: 0px !important;
  }
    .main-logo{
    width: 30px !important;
    margin-right: 10px !important;
  }
   #tl-title1{
    margin-top: -2px !important;
    font-size: .8rem !important;
    margin-left: 0px !important;

  }
   .multi-button{
    height: 90px;
    margin-top: -10px !important;
    padding: 0px !important;
    margin-left: 20px !important;
    margin-right: 20px !important;
  }

   .multi-button button{
    margin: 5px !important;
    padding-top: 0px !important;
    height: 40px !important;
    width: 80px !important;

  }
  .multi-button label{
    font-size: .8rem;
    font-weight: 600;
  }
  .firstHeader{
    margin-top: -40px !important;
    font-size: 1.4rem !important;
    margin-right: 10px !important;
    padding: 0px !important;
    padding-right: 10px !important;
  }
  .lg_addBtn1{
    height: 25px !important;
    width: 25px !important;
  }
  .bottomnav{
    margin-top: 80px;
    height: 90px;

  }

   .relNav{
    max-height: 90px !important;
    margin-top: 10px !important;
  }
  .bottomnav a{
    padding: 5px 20px !important;
    font-size: 1.4rem !important;
    margin: 10px !important;
  }

  .cust_buttons{
    margin-top:10px;
  }

  .insideButton{
    margin: 0px !important;
    margin-left: -20px !important;
    height: 40px !important;
    width: 85px !important;
    padding: 2px !important;
    font-size: 1.2rem !important;
  }

 .pageContentDiv{
    margin-top: 120px;
    padding-top: 80px;
    height: 350vh;
  }
   .pageTitle{
    font-size: 1.6rem !important;
    /* margin-bottom: 60px !important; */
  }

  .defaultCustDetails{
    margin-top: 80px !important;
    height: 3600px;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 0px;
    padding-right: 20px;
  }

   .pTableDiv{
    width: 30% !important;
    margin: 5px !important;
  }

  .pTableHeader{
    margin: 20px !important;
    padding: 0px;
    height: 120px;
  }

  .pTableTitle{
    font-size: 1.8rem !important;
    padding: 10px !important;
    font-weight: 500 !important;
  }

  .pTableImageDiv img{
    height: 120px;
    padding-right: 20px;
  }

  .pTablePids{
    line-height: 20px !important;
    font-size: 1.4rem !important;
    min-height: 0px !important
  }

  .relDetailsText{
    font-size: .8rem !important;
    height: 60px;
    font-weight: 500 !important;
    padding-top: 5px;
  }

  .pTableRTable{
    font-size: 1rem !important;
    line-height: 1.2rem !important;
  }

    .defaultProdDetails{
    margin-top: 80px !important;
    height: 600vh;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 0px;
    padding-right: 0px;
}
#ddtsPlatformChart .highcharts-container{
      height: 36vh !important;
}
#ddtsFoundChart .highcharts-container{
      height: 38vh !important;
      padding-bottom: 50px;
}

.marginBottom20{
    margin-bottom: 20px !important;
    margin-top: 0px !important;
}
  .funnelChart {
    height: 50vh !important;
    margin-right: 5px !important;
  }
  .prBtn{
    min-width: 0px !important;
    width: 6vh;
    height: 4vh;
    font-size: 1.2rem !important;
    padding: 8px !important;
    margin-right: 10px !important;
  }
  .highcharts-container > svg {
    width: 100% !important;
    height: 90% !important;
}
#imgeChart.highcharts-container{
  height: 40vh;
}

#ddtsPlatformChart .highcharts-container{
  height: 300px !important

}
.relPathModal{
    top: 150px !important;
    left: 700px !important;
    height: 30vh !important;
    width: 100vh !important;
}
.relPathModal.modal_title{
  font-size: 2.4rem;
}



.defaultUsecaseDetails {
    margin-top: 80px !important;
    height: 650vh;
    margin-left: -80px;
    margin-right: -10px;
    padding-left: 40px;
    padding-right: 20px;
}
.networkDiagramWrapper img{
  height: 35vh;

}
.topoDiagramWrapper{
    height: 35vh !important;
    padding: 20px !important;
    line-height: 1.4rem;
    font-size: 1.0rem;
}
.defaultFeatureDetails{
        margin-top: 150px !important;
    height: 650vh;
    margin-left: -100px;
    margin-right: -100px;
    padding-left: 100px;
    padding-right: 20px;
}
.highcharts-container > svg{
  height: 80%;
}

.featureDetails{
      margin-top: 30px !important;
    margin-left: -40px !important;
    width: 100% !important;
}
.funnelChart1 {
    height: 50vh;
   padding-top: 20px;
}
.defaultCFDDetails{
    margin-top: 80px !important;
    height: 600vh;
    margin-left: -40px;
    margin-right: -20px;
    padding-left: 40px;
    padding-right: 40px;
}

table.vgt-table{
  font-size: 24px !important;
}
input.vgt-input {
    font-size: 1.8rem !important;
}
.defaultUpcomingDetails{
    margin-top: 80px !important;
    height: 600vh;
    margin-left: -20px;
    margin-right: -10px;
    padding-left: 10px;
    padding-right: 40px;
}


.defaultUpcomingDetails.milestoneImge .funnelChart{
  height:50vh !important;
  margin-bottom:40px !important;
  width: 100% !important;
}


.mileStoneDiagramWrapper img{
    height: 30vh !important;
    margin-bottom: 0px !important;
    width: 100% !important;
    padding-right: 30px;
}

.defaultWorldMapDetails{
     margin-top: 40px !important;
    margin-left: 0px !important;
    height: 650vh;
    margin-right: 80px;
    padding-left: 10px;
    padding-right: 10px;

}
.defaultAhaDetails{
    margin-top: 40px;
    height: 650vh;
    margin-right: 0px;
    padding-left: 10px;
    padding-right: 60px;
}

.defaultExecutionDetails{
    margin-top: 40px !important;
    height: 650vh;
    margin-left: 0px !important;
    padding-left: 0px !important;
}

.contentGraphClass{
  min-height: 600px;
  max-height: 900px;
  
}

.highcharts-background{
  height:380px !important;

}


.worldMaptables{
  width: 100% !important;
  margin-left: 40px !important;
  padding-bottom: 80px !important;
  margin-top: 20px !important;
}

.worldmapImageFirstRow{
  width: 100% !important;
}

.summary_Data {
    margin-top: 5px !important;
    font-size: 20px !important;
    margin-left: 10px !important;
}
.projectedSummaryData2 {
    width: 100% !important;
    margin-top: -50px !important;
    margin-left: -30px !important;
}
.projectedSummaryData2 .summary_li {
    margin-top: 60px !important;
    margin-left: 20px !important;
    margin-right: 10px !important;
    width: 14%;
}
.summaryCircle1 {
    height: 60px !important;
    width: 60px !important;
    padding-left: 0px !important;
    padding-top: 30px !important;
    margin-top: -120px !important;
    font-size: 18px !important;
    border-radius: 100% !important;
}
.coloredCircleBoxdata {
    padding-top: 10px !important;
    margin-top: -50px !important;
}
.highcharts-container > svg {
    height: 85% !important;
}

.summaryCharts .chartsA .highcharts-container {
    height: 800px !important;
    width: 90% !important;
    margin-left: 0px !important;
    margin-top: -160px !important;
}




.defaultQualityDetails{
    margin-top: 40px;
    height: 600vh;
    margin-left: 0px;
    margin-right: 20px;
    padding-left: 20px;
    padding-right: 20px;
}
.defaultTestPlanDetails{
    margin-top: 40px;
    height: 650vh;
    margin-left: 20px;
    margin-right: 50px;
    padding-left: 10px;
    padding-right: 10px;

}
.defaultCaveatsDetails{
    margin-top: 40px;
    height: 650vh;
    margin-left: 20px;
    margin-right: 20px;
    padding-left: 10px;
    padding-right: 10px;
}

.defaultUpgradeMatrixDetails{
    margin-top: 40px;
    height: 650vh;
    margin-left: 20px;
    margin-right: 20px;
    padding-left: 20px;
    padding-right: 20px;
}
.defaultTriggerMatrixDetails{
    margin-top: 40px;
    height: 650vh;
    margin-left: 20px;
    margin-right: 20px;
    padding-left: 20px;
    padding-right: 20px;
}
.defaultRorDetails{
    margin-top: 40px;
    height: 650vh;
    margin-left: 10px;
    margin-right: 80px;
    padding-left: 20px;
    padding-right: 60px;

}
.teamDetails{
    margin-top: -80px !important;
    height: 650vh;
    margin-left: -20px !important;
    margin-right: 20px !important;
    padding-left: 20px !important;
    padding-right: 20px !important;
}

.orgTable {
    font-size: .8rem;
    height: 30vh !important;
}

}

/* 90% 100% */
@media (min-width:1200px){
   #rackHeader{
    max-height:100px !important;
    height: 100px;
    padding: 0px;
  }
  .postauth-header1{
    width: 100% !important;
    height: 100px;
    margin-top: 20px !important;
  }
  .topnav{
    max-height: 100px !important;
    margin-left: 80px !important;
    margin-top: -25px !important;
    width: 70% !important;
    /* background-color:#5cb7c7 !important; */
  }
   .fmenuItem12{
    height: 60px !important;
    margin-top: 20px !important;
    margin-bottom: 20px !important;
    margin-left: 10px !important;
    width: 60px !important;
    padding: 0px !important;
    border-radius: 100% !important;
    padding-left: 0px !important;
  }

   .fmenuItem12 > img{
    height: 80px !important;
    margin-top: 0px !important;
    margin-bottom: 30px !important;
    margin-left: 0px !important;
    width: 80px !important;
    padding: 0px !important;
    padding-bottom: 20px !important;
    padding-right: 0px !important;
  }
      .header-heading a{
    margin-top: 80px !important;
    margin-left: 0px !important;
  }
    .main-logo{
    width: 4rem !important;
    margin-right: 10px !important;
  }
   #tl-title1{
    margin-top: 0px !important;
    font-size: .8rem !important;
    margin-left: 5px !important;

  }
   .multi-button{
    height: 90px;
    margin-top: -16px !important;
    padding: 0px !important;
    margin-left: 20px !important;
    margin-right: 20px !important;
  }

   .multi-button button{
    margin:5px !important;
    padding-top: 0px !important;
    height: 40px !important;
    width: 80px !important;

  }
  .multi-button label{
    font-size: .8rem;
    font-weight: 600;
  }
  .firstHeader{
    margin-top: -45px !important;
    font-size: 1.4rem !important;
    margin-right: 10px !important;
    padding: 0px !important;
    padding-right: 10px !important;
  }
  .lg_addBtn1{
    height: 25px !important;
    width: 25px !important;
  }
  .bottomnav{
    margin-top: 80px;
    height: 90px;

  }

   .relNav{
    max-height: 90px !important;
    margin-top: 0px !important;
  }
  .bottomnav a{
    padding: 5px 20px !important;
    font-size: 1.4rem !important;
    margin: 10px !important;
  }

  .cust_buttons{
    margin-top:10px;
  }

  .insideButton{
    margin: 0px !important;
    margin-left: -20px !important;
    height: 40px !important;
    width: 85px !important;
    padding: 2px !important;
    font-size: 1.2rem !important;
  }

 .pageContentDiv{
    margin-top: 140px;
    padding-top: 80px;
    height: 3600px;
  }
   .pageTitle{
    font-size: 1.6rem !important;
    /* margin-bottom: 60px !important; */
  }

  .defaultCustDetails{
    margin-top: 80px !important;
    height: 3600px;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 0px;
    padding-right: 20px;
  }

   .pTableDiv{
    width: 30% !important;
    margin: 5px !important;
  }

  .pTableHeader{
    margin: 20px !important;
    padding: 0px;
    height: 120px;
  }

  .pTableTitle{
    font-size: 1.8rem !important;
    padding: 10px !important;
    font-weight: 500 !important;
  }

  .pTableImageDiv img{
    height: 120px;
    padding-right: 20px;
  }

  .pTablePids{
    line-height: 20px !important;
    font-size: 1.4rem !important;
    min-height: 0px !important
  }

  .relDetailsText{
    font-size: .8rem !important;
    height: 60px;
    font-weight: 500 !important;
    padding-top: 5px;
  }

  .pTableRTable{
    font-size: 1rem !important;
    line-height: 1.2rem !important;
  }

    .defaultProdDetails{
    margin-top: 90px !important;
    height: 4200px;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 0px;
    padding-right: 0px;
}
#ddtsPlatformChart .highcharts-container{
      height: 36vh !important;
}
#ddtsFoundChart .highcharts-container{
      height: 38vh !important;
      padding-bottom: 50px;
}

.marginBottom20{
    margin-bottom: 20px !important;
    margin-top: 0px !important;
}
  .funnelChart {
    height: 50vh !important;
    margin-right: 5px !important;
  }
  .prBtn{
    min-width: 0px !important;
    width: 6vh;
    height: 4vh;
    font-size: 1.2rem !important;
    padding: 8px !important;
    margin-right: 10px !important;
  }
  .highcharts-container > svg {
    width: 100% !important;
    height: 90% !important;
}
#imgeChart.highcharts-container{
  height: 40vh;
}

#ddtsPlatformChart .highcharts-container{
  height: 300px !important

}
.relPathModal{
    top: 150px !important;
    left: 700px !important;
    height: 30vh !important;
    width: 100vh !important;
}
.relPathModal.modal_title{
  font-size: 2.4rem;
}



.defaultUsecaseDetails {
    margin-top: 120px !important;
    height: 5200px;
    margin-left: -80px;
    margin-right: -10px;
    padding-left: 40px;
    padding-right: 20px;
}
.networkDiagramWrapper img{
  height: 200px;

}
.topoDiagramWrapper{
    height: 200px !important;
    padding: 20px !important;
    line-height: 1.4rem;
    font-size: 1.0rem;
}
.defaultFeatureDetails{
    margin-top: 200px !important;
    height: 4200px;
    margin-left: -100px;
    margin-right: -100px;
    padding-left: 100px;
    padding-right: 20px;
}
.highcharts-container > svg{
  height: 80%;
}

.featureDetails{
      margin-top: 30px !important;
    margin-left: -40px !important;
    width: 100% !important;
}
.funnelChart1 {
    height: 50vh;
   padding-top: 20px;
}
.defaultCFDDetails{
    margin-top: 80px !important;
    height: 4200px;
    margin-left: -40px;
    margin-right: -20px;
    padding-left: 40px;
    padding-right: 40px;
}

table.vgt-table{
  font-size: 24px !important;
}
input.vgt-input {
    font-size: 1.8rem !important;
}
.defaultUpcomingDetails{
    margin-top: 80px !important;
    height: 4200px;
    margin-left: -20px;
    margin-right: -10px;
    padding-left: 10px;
    padding-right: 40px;
}


.defaultUpcomingDetails.milestoneImge .funnelChart{
  height:50vh !important;
  margin-bottom:40px !important;
  width: 100% !important;
}


.mileStoneDiagramWrapper img{
    height: 30vh !important;
    margin-bottom: 0px !important;
    width: 100% !important;
    padding-right: 30px;
}

.defaultWorldMapDetails{
     margin-top: 40px !important;
    margin-left: 0px !important;
    height: 650vh;
    margin-right: 80px;
    padding-left: 10px;
    padding-right: 10px;

}
.defaultAhaDetails{
    margin-top: 40px;
    height: 4200px;
    margin-right: 0px;
    padding-left: 10px;
    padding-right: 60px;
}

.defaultExecutionDetails{
    margin-top: 40px !important;
    height: 4200px;
    margin-left: 0px !important;
    padding-left: 0px !important;
}

.contentGraphClass{
  min-height: 600px;
  max-height: 900px;
  
}

.highcharts-background{
  height:380px !important;

}


.worldMaptables{
  width: 100% !important;
  margin-left: 40px !important;
  padding-bottom: 80px !important;
  margin-top: 20px !important;
}

.worldmapImageFirstRow{
  width: 100% !important;
}

.summary_Data {
    margin-top: 5px !important;
    font-size: 20px !important;
    margin-left: 10px !important;
}
.projectedSummaryData2 {
    width: 100% !important;
    margin-top: -50px !important;
    margin-left: -30px !important;
}
.projectedSummaryData2 .summary_li {
    margin-top: 60px !important;
    margin-left: 20px !important;
    margin-right: 10px !important;
    width: 14%;
}
.summaryCircle1 {
    height: 60px !important;
    width: 60px !important;
    padding-left: 0px !important;
    padding-top: 30px !important;
    margin-top: -120px !important;
    font-size: 18px !important;
    border-radius: 100% !important;
}
.coloredCircleBoxdata {
    padding-top: 10px !important;
    margin-top: -50px !important;
}
.highcharts-container > svg {
    height: 85% !important;
}

.summaryCharts .chartsA .highcharts-container {
    height: 800px !important;
    width: 90% !important;
    margin-left: 0px !important;
    margin-top: -160px !important;
}




.defaultQualityDetails{
    margin-top: 40px;
    height: 4200px;
    margin-left: 0px;
    margin-right: 20px;
    padding-left: 20px;
    padding-right: 20px;
}
.defaultTestPlanDetails{
    margin-top: 40px;
    height: 4200px;
    margin-left: 20px;
    margin-right: 50px;
    padding-left: 10px;
    padding-right: 10px;

}
.defaultCaveatsDetails{
    margin-top: 40px;
    height: 4200px;
    margin-left: 20px;
    margin-right: 20px;
    padding-left: 10px;
    padding-right: 10px;
}

.defaultUpgradeMatrixDetails{
    margin-top: 40px;
    height: 4200px;
    margin-left: 20px;
    margin-right: 20px;
    padding-left: 20px;
    padding-right: 20px;
}
.defaultTriggerMatrixDetails{
    margin-top: 40px;
    height: 4200px;
    margin-left: 20px;
    margin-right: 20px;
    padding-left: 20px;
    padding-right: 20px;
}
.defaultRorDetails{
    margin-top: 40px;
    height: 4200px;
    margin-left: 10px;
    margin-right: 80px;
    padding-left: 20px;
    padding-right: 60px;

}
.teamDetails{
    margin-top: -80px !important;
    height: 4200px;
    margin-left: -20px !important;
    margin-right: 20px !important;
    padding-left: 20px !important;
    padding-right: 20px !important;
}

.orgTable {
    font-size: .8rem;
    height: 30vh !important;
}
/* end of 1200px */


  /* start of 1500px  */
}

/* 75% to 80% */
@media (min-width:1500px){
    #rackHeader{
    max-height: 120px !important;
    height: 120px;
    padding: 0px;
  }
  .postauth-header1{
    width: 100% !important;
    height: 100px;
    margin-top: 20px !important;
  }
  .topnav{
    max-height: 100px!important;
    margin-left: 110px !important;
    margin-top: -25px !important;
    /* background-color:#5cb7c7 !important; */
  }
   .fmenuItem12{
    height: 70px  !important;
    width: 70px  !important;
    margin-right: 0px !important;
    margin-bottom: 10px !important;
    margin-top: 20px !important;
    border-radius: 100% !important;
  }

   .fmenuItem12 > img{
    height: 80px !important;
    margin-top: 0px !important;
    margin-bottom: 30px !important;
    margin-left: 0px !important;
    width: 80px !important;
    padding: 0px !important;
    padding-bottom: 10px !important;
    padding-right: 0px !important;
  }
      .header-heading a{
    margin-top: 100px !important;
    margin-left: 20px !important;
  }
    .main-logo{
    width: 50px !important;
    margin-right: 10px !important;
  }
   #tl-title1{
    margin-top: 2px !important;
    font-size: 1.2rem !important;
    margin-left: 2px !important;

  }
   .multi-button{
    margin-top: -20px !important;
    padding: 10px !important;
    padding-right: 40px !important;
  }

   .multi-button button{
    margin-right: 5px !important;
    padding-top: 2px !important;
    height: 48px !important;
    width: 90px !important;

  }
  .multi-button label{
    font-size: 1rem;
    font-weight: 600;
  }
  .firstHeader{
    margin-top: -25px !important;
    font-size: 1.8rem !important;
    margin-right: 20px !important;
    padding: 0px !important;
    padding-right: 30px !important;
  }
  .lg_addBtn1{
    height: 30px !important;
    width: 30px !important;
  }
  .bottomnav{
    margin-top: 100px;
    height:100px;

  }

   .relNav{
     max-height: 80px !important;
    margin-top: 0px !important;
  }
  .bottomnav a{
    padding: 10px 20px !important;
    font-size: 1.4rem !important;
    margin: 10px !important;
  }
  .cust_buttons{
    margin-top:10px;
  }
  .insideButton{
    margin: 10px !important;
    margin-left: -20px !important;
    height: 50px !important;
    width: 120px !important;
    padding: 8px !important;
    font-size: 1.4rem !important;
  }



 .pageContentDiv{
    margin-top: 150px;
    padding-top: 80px;
    height: 3600px;
  }
   .pageTitle{
    font-size: 2rem !important;
    /* margin-bottom: 60px !important; */
  }
  .defaultCustDetails{
       margin-top: 150px !important;
    height: 4200px;
    margin-left: -100px;
    margin-right: -100px;
    padding-left: 20px;
    padding-right: 40px;
  }
   .pTableDiv{
    width: 100% !important;
    margin: 10px !important;
  }
  .pTableHeader{
    margin: 20px !important;
    padding: 10px;
    height: 20vh;
  }
  .pTableTitle{
   font-size:2.4rem !important;
    padding: 10px !important;
    font-weight: 500 !important;
  }
  .pTableImageDiv img{
    height: 20vh;
    padding-right: 20px;
  }
  .pTablePids{
    line-height: 30px !important;
    font-size: 1.8rem !important;
    min-height: 10vh !important
  }
  .relDetailsText{
    font-size: 1.8rem !important;
    height: 10vh;
    font-weight: 500 !important;
    padding-top: 20px;
  }
  .pTableRTable{
    font-size: 1.8rem !important;
    line-height: 1.8rem !important;
  }

    .defaultProdDetails{
    margin-top: 150px !important;
    height: 4200px ;
    margin-left: -100px;
    margin-right: -100px;
    padding-left: 20px;
    padding-right: 20px;
}
#ddtsPlatformChart .highcharts-container{
      height: 36vh !important;
}
#ddtsFoundChart .highcharts-container{
      height: 38vh !important;
      padding-bottom: 50px;
}

.marginBottom20{
    margin-bottom: 20px !important;
    margin-top: 0px !important;
}
  .funnelChart {
    height: 40vh !important;
    margin-right: 20px !important;
  }
  .prBtn{
    min-width: 0px !important;
    width: 6vh;
    height: 4vh;
    font-size: 1.4rem !important;
    padding: 8px !important;
    margin-right: 10px !important;
  }
  .highcharts-container > svg {
    width: 100% !important;
    height: 90% !important;
}
#imgeChart.highcharts-container{
  height: 40vh;
}

#ddtsPlatformChart.highcharts-container{
  height: 50vh !important;

}
.relPathModal{
    top: 150px !important;
    left: 700px !important;
    height: 30vh !important;
    width: 100vh !important;
}
.relPathModal.modal_title{
  font-size: 2.4rem;
}



.defaultUsecaseDetails {
    margin-top: 150px !important;
    height: 4800px;
    margin-left: -80px;
    margin-right: -100px;
    padding-left: 40px;
    padding-right: 40px;
}
.networkDiagramWrapper img{
  height: 40vh;

}
.topoDiagramWrapper{
    height: 40vh !important;
    padding: 40px !important;
    line-height: 1.6rem;
    font-size: 1.2rem;

}
.defaultFeatureDetails{
    margin-top: 250px !important;
    height: 4200px;
    margin-left: -100px;
    margin-right: -100px;
    padding-left: 100px;
    padding-right: 20px;
}

.featureDetails{
      margin-top: 30px !important;
    margin-left: -40px !important;
    width: 100% !important;
}
.funnelChart1 {
    height: 50vh;
   padding-top: 20px;
}
.defaultCFDDetails{
    margin-top: 150px !important;
    height: 4200px;
    margin-left: -80px;
    margin-right: -40px;
    padding-left: 40px;
    padding-right: 40px;
}

table.vgt-table{
  font-size: 30px !important;
}
input.vgt-input {
    font-size: 2.8rem !important;
}
.defaultUpcomingDetails{
    margin-top: 150px !important;
    height: 4200px;
    margin-left: -80px;
    margin-right: -10px;
    padding-left: 50px;
    padding-right: 50px;
}


.defaultUpcomingDetails.milestoneImge .funnelChart{
  height:50vh !important;
  margin-bottom:40px !important;
  width: 100% !important;
}


.mileStoneDiagramWrapper img{
    height: 30vh !important;
    margin-bottom: 0px !important;
    width: 100% !important;
    padding-right: 30px;
}

.defaultWorldMapDetails{
    margin-top: 80px !important;
    margin-left: 0px !important;
    height: 600vh;
    margin-right: -20px;
    padding-left: 10px;
    padding-right: 60px;

}
.defaultAhaDetails{
    margin-top: 80px;
    height: 600vh;
    margin-right: -10px;
    padding-left: 10px;
    padding-right: 100px;
}

.defaultExecutionDetails{
    margin-top: 80px !important;
    height: 600vh;
    margin-left: 40px !important;
    padding-left: 20px !important;
}

.contentGraphClass{
  min-height: 600px;
  max-height: 900px;
  
}

.highcharts-background{
  height:380px !important;

}


.worldMaptables{
  width: 100% !important;
  margin-left: 40px !important;
  padding-bottom: 80px !important;
  margin-top: 20px !important;
}

.worldmapImageFirstRow{
  width: 100% !important;
}

.summary_Data {
    margin-top: 5px !important;
    font-size: 20px !important;
    margin-left: 10px !important;
}
.projectedSummaryData2 {
    width: 100% !important;
    margin-top: -50px !important;
    margin-left: -30px !important;
}
.projectedSummaryData2 .summary_li {
    margin-top: 60px !important;
    margin-left: 20px !important;
    margin-right: 10px !important;
    width: 14%;
}
.summaryCircle1 {
    height: 60px !important;
    width: 60px !important;
    padding-left: 0px !important;
    padding-top: 30px !important;
    margin-top: -120px !important;
    font-size: 18px !important;
    border-radius: 100% !important;
}
.coloredCircleBoxdata {
    padding-top: 10px !important;
    margin-top: -50px !important;
}
.highcharts-container > svg {
    height: 85% !important;
}

.summaryCharts .chartsA .highcharts-container {
    height: 800px !important;
    width: 90% !important;
    margin-left: 0px !important;
    margin-top: -160px !important;
}




.defaultQualityDetails{
    margin-top: 80px;
    height: 600vh;
    margin-left: 10px;
    margin-right: 20px;
    padding-left: 10px;
    padding-right: 10px;
}
.defaultTestPlanDetails{
    margin-top: 80px;
    height: 600vh;
    margin-left: 20px;
    margin-right: 50px;
    padding-left: 10px;
    padding-right: 10px;

}
.defaultCaveatsDetails{
    margin-top: 80px;
    height: 600vh;
    margin-left: 20px;
    margin-right: 50px;
    padding-left: 10px;
    padding-right: 10px;
}

.defaultUpgradeMatrixDetails{
    margin-top: 80px;
    height: 600vh;
    margin-left: 20px;
    margin-right: 50px;
    padding-left: 20px;
    padding-right: 20px;
}
.defaultTriggerMatrixDetails{
    margin-top: 80px;
    height: 600vh;
    margin-left: 20px;
    margin-right: 50px;
    padding-left: 20px;
    padding-right: 20px;
}
.defaultRorDetails{
    margin-top: 80px;
    height: 600vh;
    margin-left: 10px;
    margin-right: 10px;
    padding-left: 10px;
    padding-right: 0px;

}
.teamDetails{
    margin-top: -80px !important;
    height: 3600px ;
    margin-left: 20px !important;
    margin-right: 20px !important;
    padding-left: 10px !important;
    padding-right: 50px !important;
}

.orgTable {
    font-size: 1.8rem;
    height: 30vh !important;
}


/* .mileStoneDiagramWrapper{
  height:250px !important;
  margin-bottom:40px !important;
  width: 100% !important;
} */


}
/* 67% */
@media (min-width:1800px){
   #rackHeader{
    max-height: 120px !important;
    height: 120px;
    padding: 0px;
  }
  .postauth-header1{
    width: 100% !important;
    height: 120px;
    margin-top: 20px !important;
  }
  .topnav{
    max-height: 150px!important;
    margin-left: 150px !important;
    margin-top: -10px !important;
    padding: 10px;
    /* background-color:#5cb7c7 !important; */
  }
   .fmenuItem12{
    height: 80px !important;
    width: 80px !important;
    margin-right: 0px !important;
    margin-bottom: 0px !important;
    margin-top: 0px !important;
    border-radius: 100% !important;
  }

   .fmenuItem12 > img{
    height: 80px !important;
    margin-top: 0px !important;
    margin-bottom: 30px !important;
    margin-left: 0px !important;
    width: 80px !important;
    padding: 0px !important;
    padding-bottom: 0px !important;
    padding-right: 0px !important;
  }
      .header-heading a{
    margin-top: 100px !important;
    margin-left: 40px !important;
  }
    .main-logo{
    width: 8vh !important;
    margin-right: 10px !important;
  }
   #tl-title1{
    margin-top: 10px !important;
    font-size:1.4rem !important;
    margin-left: 10px !important;

  }
   .multi-button{
    margin-top: -10px !important;
    padding: 10px !important;
    padding-right: 10px !important;
  }

   .multi-button button{
    margin-right: 10px !important;
    padding-top: 8px !important;
    height: 6vh !important;
    width: 12vh !important;

  }
  .multi-button label{
    font-size: 1.2rem;
    font-weight: 600;
  }
  .firstHeader{
    margin-top: -20px !important;
    font-size: 2.0rem !important;
    margin-right: 40px !important;
    padding: 0px !important;
    padding-right: 10px !important;
  }

  .lg_addBtn1{
    height: 40px !important;
    width: 40px !important;
  }
  .bottomnav{
    margin-top: 120px;
    height: 100px;

  }

   .relNav{
     max-height: 10vh !important;
    margin-top: 0px !important;
  }
  .bottomnav a{
    padding: 10px 20px !important;
    font-size: 1.8rem !important;
    margin: 10px !important;
  }
  .insideButton{
    margin: 10px !important;
    margin-left: -20px !important;
    height: 6vh !important;
    width: 14vh !important;
    padding: 10px !important;
    font-size: 1.6rem !important;
  }



 .pageContentDiv{
    margin-top: 180px;
    padding-top: 80px;
    height: 350vh;
  }
   .pageTitle{
    font-size: 2.4rem !important;
    /* margin-bottom: 60px !important; */
  }
  .defaultCustDetails{
    margin-top: 150px !important;
    height: 600vh;
    margin-left: -80px;
    margin-right: -100px;
    padding-left: 60px;
    padding-right: 60px;
  }
   .pTableDiv{
    width: 100% !important;
    margin: 10px !important;
  }
  .pTableHeader{
    margin: 20px !important;
    padding: 10px;
    height: 20vh;
  }
  .pTableTitle{
   font-size:2.4rem !important;
    padding: 30px !important;
    font-weight: 500 !important;
  }
  .pTableImageDiv img{
    height: 20vh;
    padding-right: 20px;
  }
  .pTablePids{
    line-height: 30px !important;
    font-size: 1.8rem !important;
    min-height: 10vh !important
  }
  .relDetailsText{
    font-size: 1.8rem !important;
    height: 10vh;
    font-weight: 500 !important;
    padding-top: 20px;
  }
  .pTableRTable{
    font-size: 1.8rem !important;
    line-height: 1.8rem !important;
  }

    .defaultProdDetails{
    margin-top: 150px !important;
    height: 600vh;
    margin-left: -80px;
    margin-right: -100px;
    padding-left: 80px;
    padding-right: 60px;
}
#ddtsPlatformChart .highcharts-container{
      height: 36vh !important;
}
#ddtsFoundChart .highcharts-container{
      height: 38vh !important;
      padding-bottom: 50px;
}

.marginBottom20{
    margin-bottom: 20px !important;
    margin-top: 0px !important;
}
  .funnelChart {
    height: 40vh !important;
    margin-right: 20px !important;
  }
  .prBtn{
    min-width: 0px !important;
    width: 6vh;
    height: 4vh;
    font-size: 1.8rem !important;
    padding: 8px !important;
    margin-right: 10px !important;
  }
  .highcharts-container > svg {
    width: 100% !important;
    height: 90% !important;
}
#imgeChart.highcharts-container{
  height: 40vh;
}

#ddtsPlatformChart.highcharts-container{
  height: 50vh !important;

}
.relPathModal{
    top: 150px !important;
    left: 700px !important;
    height: 30vh !important;
    width: 100vh !important;
}
.relPathModal.modal_title{
  font-size: 2.4rem;
}



.defaultUsecaseDetails {
    margin-top: 150px !important;
    height: 600vh;
    margin-left: -80px;
    margin-right: -100px;
    padding-left: 120px;
    padding-right: 40px;
}
.networkDiagramWrapper img{
  height: 40vh;

}
.topoDiagramWrapper{
    height: 40vh !important;
    padding: 40px !important;
    line-height: 1.8rem;
    font-size: 1.2rem;

}
.defaultFeatureDetails{
    margin-top: 300px !important;
    height: 600vh;
    margin-left: -80px;
    margin-right: -100px;
    padding-left: 120px;
    padding-right: 20px;
}

.featureDetails{
      margin-top: 30px !important;
    margin-left: -40px !important;
    width: 100% !important;
}
.funnelChart1 {
    height: 50vh;
   padding-top: 20px;
}
.defaultCFDDetails{
    margin-top: 140px !important;
    height: 600vh;
    margin-left: -80px;
    margin-right: -100px;
    padding-left: 40px;
    padding-right: 40px;
}

table.vgt-table{
  font-size: 30px !important;
}
input.vgt-input {
    font-size: 2.8rem !important;
}
.defaultUpcomingDetails{
    margin-top: 140px !important;
    height: 600vh;
    margin-left: -80px;
    margin-right: -100px;
    padding-left: 50px;
    padding-right: 50px;
}


.defaultUpcomingDetails.milestoneImge .funnelChart{
  height:50vh !important;
  margin-bottom:40px !important;
  width: 100% !important;
}


.mileStoneDiagramWrapper img{
    height: 30vh !important;
    margin-bottom: 0px !important;
    width: 100% !important;
    padding-right: 30px;
}

.defaultWorldMapDetails{
    margin-top: 120px !important;
    margin-left: 0px !important;
    height: 600vh;
    margin-right: -100px;
    padding-left: 10px;
    padding-right: 60px;

}
.defaultAhaDetails{
    margin-top: 120px;
    height: 600vh;
    margin-right: -100px;
    padding-left: 60px;
    padding-right: 100px;
}

.defaultExecutionDetails{
    margin-top: 120px !important;
    height: 600vh;
    margin-left: 120px !important;
    padding-left: 20px !important;
}

.contentGraphClass{
  min-height: 600px;
  max-height: 900px;
  
}

.highcharts-background{
  height:380px !important;

}


.worldMaptables{
  width: 100% !important;
  margin-left: 40px !important;
  padding-bottom: 80px !important;
  margin-top: 20px !important;
}

.worldmapImageFirstRow{
  width: 100% !important;
}

.summary_Data {
    margin-top: 5px !important;
    font-size: 20px !important;
    margin-left: 10px !important;
}
.projectedSummaryData2 {
    width: 100% !important;
    margin-top: -50px !important;
    margin-left: -30px !important;
}
.projectedSummaryData2 .summary_li {
    margin-top: 60px !important;
    margin-left: 20px !important;
    margin-right: 10px !important;
    width: 14%;
}
.summaryCircle1 {
    height: 60px !important;
    width: 60px !important;
    padding-left: 0px !important;
    padding-top: 30px !important;
    margin-top: -120px !important;
    font-size: 18px !important;
    border-radius: 100% !important;
}
.coloredCircleBoxdata {
    padding-top: 10px !important;
    margin-top: -50px !important;
}
.highcharts-container > svg {
    height: 85% !important;
}

.summaryCharts .chartsA .highcharts-container {
    height: 800px !important;
    width: 90% !important;
    margin-left: 0px !important;
    margin-top: -160px !important;
}




.defaultQualityDetails{
    margin-top: 120px;
    height: 600vh;
    margin-left: 50px;
    margin-right: 50px;
    padding-left: 10px;
    padding-right: 10px;
}
.defaultTestPlanDetails{
    margin-top: 120px;
    height: 600vh;
    margin-left: 50px;
    margin-right: 50px;
    padding-left: 50px;
    padding-right: 10px;

}
.defaultCaveatsDetails{
    margin-top: 120px;
    height: 600vh;
    margin-left: 50px;
    margin-right: 50px;
    padding-left: 50px;
    padding-right: 10px;
}

.defaultUpgradeMatrixDetails{
    margin-top: 120px;
    height: 600vh;
    margin-left: 50px;
    margin-right: 50px;
    padding-left: 50px;
    padding-right: 10px;
}
.defaultTriggerMatrixDetails{
    margin-top: 120px;
    height: 600vh;
    margin-left: 50px;
    margin-right: 50px;
    padding-left: 50px;
    padding-right: 10px;
}
.defaultRorDetails{
    margin-top: 120px;
    height: 600vh;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 85px;
    padding-right: 0px;
}
.teamDetails{
    margin-top: -80px !important;
    height: 400vh;
    margin-left: 50px !important;
    margin-right: 50px !important;
    padding-left: 50px !important;
    padding-right: 100px !important;
}

.orgTable {
    font-size: 1.8rem;
    height: 30vh !important;
}


/* .mileStoneDiagramWrapper{
  height:250px !important;
  margin-bottom:40px !important;
  width: 100% !important;
} */


}


/* 50% */
@media (min-width:2500px){

.homeMain{
  height:300vh;
}
  
     #rackHeader{
    max-height: 20vh !important;
    height: 14vh;
    padding: 0px;
  }
  .postauth-header1{
    width: 100% !important;
    height: 20vh;
    margin-top: 20px !important;
  }
  .topnav{
   max-height: 150px!important;
    margin-left: 200px !important;
    margin-top: -30px !important;
   padding: 10px;
    /* background-color:#5cb7c7 !important; */
  }
   .fmenuItem12{
    height: 10vh !important;
    width: 10vh !important;
    margin-right: 0px !important;
    margin-bottom: 0px !important;
    margin-top: 20px !important;
    border-radius: 100% !important;
  }

   .fmenuItem12 > img{
    height: 10vh !important;
    margin-top: 0px !important;
    margin-bottom: 30px !important;
    width: 10vh !important;
    padding: 20px !important;
    padding-left: 10px !important;
  }
      .header-heading a{
   margin-top: 180px !important;
    margin-left: 50px !important;
  }
    .main-logo{
    width: 8vh !important;
    margin-right: 10px !important;
  }
   #tl-title1{
    margin-top: 10px !important;
    font-size: 20px !important;
    margin-left: 10px !important;

  }
   .multi-button{
    margin-top: 0px !important;
    padding: 10px !important;
    padding-right: 40px !important;
  }

   .multi-button button{
    margin-right: 20px !important;
    padding-top: 0px !important;
    height: 6vh !important;
    width: 12vh !important;

  }
  .multi-button label{
    font-size: 1.8rem;
    font-weight: 600;
  }
  .firstHeader{
    margin-top: 0px !important;
    font-size: 2.0em !important;
    margin-right: 40px !important;
    padding: 0px !important;
    padding-right: 20px !important;
  }
  .lg_addBtn1{
    height: 40px !important;
    width: 40px !important;
  }
  .bottomnav{
    margin-top: 160px;
    height: 15vh;

  }

   .relNav{
     max-height: 10vh !important;
    margin-top: 0px !important;
  }
  .bottomnav a{
    padding: 12px 24px !important;
    font-size: 24px !important;
    margin: 20px !important;
  }
  .insideButton{
    margin: 0px !important;
    height: 80px !important;
    width: 200px !important;
    padding: 2px !important;
    font-size: 24px !important;
  }

 .pageContentDiv{
    margin-top: 200px;
    padding-top: 80px;
    height: 350vh;
  }
   .pageTitle{
    font-size: 30px !important;
    /* margin-bottom: 60px !important; */
  }
  .defaultCustDetails{
    margin-top: 300px !important;
    height: 600vh;
    margin-left: -80px;
    margin-right: -100px;
    padding-left: 100px;
    padding-right: 100px;
  }
   .pTableDiv{
    width: 100% !important;
    margin: 10px !important;
  }
  .pTableHeader{
    margin: 20px !important;
    padding: 10px;
    height: 20vh;
  }
  .pTableTitle{
   font-size: 40px !important;
    padding: 30px !important;
    font-weight: 500 !important;
  }
  .pTableImageDiv img{
    height: 20vh;
    padding-right: 20px;
  }
  .pTablePids{
    line-height: 30px !important;
    font-size: 1.8em !important;
    min-height: 10vh !important
  }
  .relDetailsText{
    font-size: 1.8em !important;
    height: 10vh;
    font-weight: 500 !important;
    padding-top: 30px;
  }
  .pTableRTable{
    font-size: 1.8em !important;
    line-height: 1.8em !important;
  }

    .defaultProdDetails{
    margin-top: 200px !important;
    height: 600vh;
    margin-left: -80px;
    margin-right: -100px;
    padding-left: 80px;
    padding-right: 60px;
}

.marginBottom20{
    margin-bottom: 20px !important;
    margin-top: 0px !important;
}
  .funnelChart {
    height: 40vh !important;
    margin-right: 20px !important;
  }
  .prBtn{
    min-width: 0px !important;
    width: 6vh;
    height: 40px;
    font-size: 1.8em !important;
    padding: 6px !important;
    margin-right: 10px !important;
  }
  .highcharts-container > svg {
    width: 100% !important;
    height: 90% !important;
}
#imgeChart.highcharts-container{
  height: 540px;
}

#ddtsPlatformChart.highcharts-container{
  height: 640px !important;

}
.relPathModal{
    top: 150px !important;
    left: 700px !important;
    height: 30vh !important;
    width: 100vh !important;
}
.relPathModal.modal_title{
  font-size: 2.4rem;
}



.defaultUsecaseDetails {
    margin-top: 200px !important;
    height: 600vh;
    margin-left: -80px;
    margin-right: -100px;
    padding-left: 120px;
    padding-right: 40px;
}
.networkDiagramWrapper img{
  height: 40vh;

}
.topoDiagramWrapper{
    height: 40vh !important;
    padding: 40px !important;
    line-height: 1.6em;
    font-size: 1.8rem;

}
.defaultFeatureDetails{
    margin-top: 550px !important;
    height: 600vh;
    margin-left: -80px;
    margin-right: -100px;
    padding-left: 120px;
    padding-right: 20px;
}
.funnelChart1 {
    height: 700px;
    background: #fff;
    border: 3px solid #0c2f4a;
    border-radius: 30px;
    padding-top: 20px;
}
.defaultCFDDetails{
    margin-top: 240px !important;
    height: 650vh;
    margin-left: -80px;
    margin-right: -100px;
    padding-left: 120px;
    padding-right: 40px;
}
table.vgt-table{
  font-size: 30px !important;
}
input.vgt-input {
    font-size: 2.8rem !important;
}
.defaultUpcomingDetails{
    margin-top: 240px !important;
    height: 650vh;
    margin-left: -80px;
    margin-right: -100px;
    padding-left: 100px;
    padding-right: 120px;
}

.defaultUpcomingDetails.milestoneImge .funnelChart{
  height:50vh !important;
  margin-bottom:40px !important;
  width: 100% !important;
}


.mileStoneDiagramWrapper img{
    height: 30vh !important;
    margin-bottom: 0px !important;
    width: 100% !important;
    padding-right: 30px;
}

.defaultWorldMapDetails{
    margin-top: 200px !important;
    margin-left: 0px !important;
    height: 600vh;
    margin-right: -100px;
    padding-left: 80px;
    padding-right: 120px;

}
.defaultAhaDetails{
    margin-top: 200px;
    height: 600vh;
    margin-right: -100px;
    padding-left: 100px;
    padding-right: 120px;
}

.defaultExecutionDetails{
   margin-top: 200px !important;
    height: 600vh;
    margin-left: 120px !important;
    padding-left: 120px !important;
}

.contentGraphClass{
  min-height: 600px;
  max-height: 900px;
  
}

.highcharts-background{
  height:380px !important;

}


.worldMaptables{
  width: 100% !important;
  margin-left: 40px !important;
  padding-bottom: 80px !important;
  margin-top: 20px !important;
}

.worldmapImageFirstRow{
  width: 100% !important;
}

.summary_Data {
    margin-top: 5px !important;
    font-size: 20px !important;
    margin-left: 10px !important;
}
.projectedSummaryData2 {
    width: 100% !important;
    margin-top: -50px !important;
    margin-left: -30px !important;
}
.projectedSummaryData2 .summary_li {
    margin-top: 60px !important;
    margin-left: 20px !important;
    margin-right: 10px !important;
    width: 14%;
}
.summaryCircle1 {
    height: 60px !important;
    width: 60px !important;
    padding-left: 0px !important;
    padding-top: 30px !important;
    margin-top: -120px !important;
    font-size: 18px !important;
    border-radius: 100% !important;
}
.coloredCircleBoxdata {
    padding-top: 10px !important;
    margin-top: -50px !important;
}
.highcharts-container > svg {
    height: 85% !important;
}

.summaryCharts .chartsA .highcharts-container {
    height: 800px !important;
    width: 90% !important;
    margin-left: 0px !important;
    margin-top: -160px !important;
}




.defaultQualityDetails{
    margin-top: 200px;
    height: 600vh;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 150px;
    padding-right: 180px;
}
.defaultTestPlanDetails{
    margin-top: 200px;
    height: 600vh;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 150px;
    padding-right: 180px;

}
.defaultCaveatsDetails{
    margin-top: 200px;
    height: 600vh;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 150px;
    padding-right: 180px;
}

.defaultUpgradeMatrixDetails{
    margin-top: 200px;
    height: 600vh;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 150px;
    padding-right: 180px;
}
.defaultTriggerMatrixDetails{
    margin-top: 200px;
    height: 600vh;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 150px;
    padding-right: 180px;
}
.defaultRorDetails{
    margin-top: 200px;
    height: 600vh;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 150px;
    padding-right: 180px;
}
.teamDetails{
    margin-top: -50px !important;
    height: 400vh;
    margin-left: 0px !important;
    margin-right: 0px !important;
    padding-left: 150px !important;
    padding-right: 180px !important;
}

.orgTable {
    font-size: 1.8rem;
    height: 30vh !important;
}

.featureDetails{
  margin-top: -40px !important;
  margin-left: -40px !important;
  width: 100% !important;
}

/* .mileStoneDiagramWrapper{
  height:250px !important;
  margin-bottom:40px !important;
  width: 100% !important;
} */
  
}
/*33% of the browser support*/
@media (min-width:3500px){

     #rackHeader{
    max-height: 20vh !important;
    height: 14vh;
    padding: 0px;
  }
  .postauth-header1{
    width: 100% !important;
    height: 20vh;
    margin-top: 20px !important;
  }
  .topnav{
    max-height: 300px!important;
    margin-left: 350px !important;
    padding: 10px;
    /* background-color:#5cb7c7 !important; */
  }
   .fmenuItem12{
   height: 160px !important;
    width: 160px !important;
    margin-right: 0px !important;
    margin-bottom: 0px !important;
    margin-top: 30px !important;
    border-radius: 100% !important;
  }

   .fmenuItem12 > img{
    height: 120px !important;
    margin-top: 20px !important;
    margin-bottom: 40px !important;
    width: 120px !important;
    padding: 10px !important;
    padding-left: 10px !important;
  }
      .header-heading a{
   margin-top: 180px !important;
    margin-left: 80px !important;
  }
    .main-logo{
    width: 120px !important;
    margin-right: 10px !important;
  }
   #tl-title1{
    margin-top: 20px !important;
    font-size: 28px !important;
    margin-left: 10px !important;

  }
   .multi-button{
    margin-top: 10px !important;
    padding: 10px !important;
    padding-right: 60px !important;
  }

   .multi-button button{
   margin-right: 40px !important;
    padding-top: 0px !important;
    height: 90px !important;
    width: 180px !important;

  }
  .multi-button label{
    font-size: 2.4rem;
    font-weight:800;
  }
  .firstHeader{
    margin-top: 40px !important;
    font-size: 2.4em !important;
    margin-right: 120px !important;
    padding: 0px !important;
    padding-right: 20px !important;
  }
  .lg_addBtn1{
    height: 60px !important;
    width: 60px !important;
  }

   .relNav{
       max-height: 20vh !important;
    margin-top: 80px !important;
  }
  .bottomnav a{
    padding: 20px 30px !important;
    font-size: 30px !important;
    margin: 30px !important;
  }
  .insideButton{
    margin: 30px !important;
    height: 90px !important;
    width: 250px !important;
    padding: 2px !important;
    font-size: 30px !important;
  }
   .pageContentDiv{
    margin-top: 300px;
    padding-top: 80px;
    height: 350vh;
  }
   .pageTitle{
    font-size: 30px !important;
    /* margin-bottom: 60px !important; */
  }
  .defaultCustDetails{
    margin-top: 300px !important;
    height: 350vh;
    margin-left: -80px;
    margin-right: -100px;
    padding-left: 120px;
    padding-right: 120px;
  }
   .pTableDiv{
    width: 100% !important;
    margin: 60px !important;
  }
  .pTableHeader{
    margin: 40px !important;
    padding: 20px;
    height: 20vh;
  }
  .pTableTitle{
   font-size: 50px !important;
    padding: 30px !important;
    font-weight: 500 !important;
  }
  .pTableImageDiv img{
    height: 20vh;
    padding-right: 60px;
  }
  .pTablePids{
    line-height: 50px !important;
    font-size: 36px !important;
    min-height: 180px !important;
  }
  .relDetailsText{
    font-size: 36px !important;
    height: 8vh;
    font-weight: 500 !important;
    padding-top: 60px;
  }
  .pTableRTable{
    font-size: 36px !important;
    line-height: 60px !important;
  }

    .defaultProdDetails{
   margin-top: 300px !important;
    height: 350vh;
    margin-left: -80px;
    margin-right: -100px;
    padding-left: 120px;
    padding-right: 120px;
}

.marginBottom20{
    margin-bottom: 20px !important;
    margin-top: 0px !important;
}
  .funnelChart {
    height: 40vh !important;
    margin-right: 10px !important;
  }
  .prBtn{
    min-width: 0px !important;
    width: 80px;
    height: 40px;
    font-size: 30px !important;
    padding: 6px !important;
    margin-left: 150px !important;
  }
  .highcharts-container > svg {
    width: 100% !important;
    height: 90% !important;
}
#imgeChart.highcharts-container{
  height: 540px;
}

#ddtsPlatformChart.highcharts-container{
  height: 640px !important;

}



.defaultUsecaseDetails {
    margin-top: 300px !important;
    height: 400vh;
    margin-left: -80px;
    margin-right: -100px;
    padding-left: 120px;
    padding-right: 20px;
    font-size: 2.2rem;
}
.networkDiagramWrapper img{
  height: 40vh;

}
.topoDiagramWrapper{
   height: 40vh !important;
    padding: 40px !important;
    line-height: 1.8;
    font-size: 3.4rem;

}
.defaultFeatureDetails{
    margin-top: 650px !important;
    height: 400vh;
    margin-left: -80px;
    margin-right: -100px;
    padding-left: 120px;
    padding-right: 20px;
}
.funnelChart1 {
    height: 700px;
    background: #fff;
    border: 3px solid #0c2f4a;
    border-radius: 30px;
    padding-top: 20px;
}
.defaultCFDDetails{
    margin-top: 300px !important;
    height: 350vh;
    margin-left: -80px;
    margin-right: -100px;
    padding-left: 120px;
    padding-right: 20px;
}
table.vgt-table{
  font-size: 30px !important;
}
input.vgt-input {
    font-size: 2.8rem !important;
}
.defaultUpcomingDetails{
    margin-top: 300px !important;
    height: 350vh;
    margin-left: -80px;
    margin-right: -100px;
    padding-left: 100px;
    padding-right: 120px;
}

/* .defaultUpcomingDetails.milestoneImge .funnelChart{
  height:400px !important;
  margin-bottom:40px !important;
  width: 100% !important;
} */


.mileStoneDiagramWrapper img{
  height:450px !important;
  margin-bottom:20px !important;
  width: 100% !important;
  padding-right: 30px;
}

.defaultWorldMapDetails{
   width: 100% !important;
    margin-top: 300px !important;
    margin-left: 0px !important;
    height: 400vh;
    margin-right: -100px;
    padding-left: 100px;
    padding-right: 120px;

}
.defaultAhaDetails{
     width: 100%;
    margin-top: 300px;
    height: 400vh;
    margin-right: -100px;
    padding-left: 100px;
    padding-right: 120px;
}

.defaultExecutionDetails{
    width: 100%;
    margin-top: 300px !important;
    height: 400vh;
    margin-left: 120px !important;
    padding-left: 120px !important;
}

.contentGraphClass{
  min-height: 600px;
  max-height: 900px;
  
}






.highcharts-background{
  height:380px !important;

}
.relPathModal{
  top: 100px !important;
  left: 550px !important;
  min-height: 100px !important;
  min-width: 450px !important;
}

.worldMaptables{
  width: 100% !important;
  margin-left: 40px !important;
  padding-bottom: 80px !important;
  margin-top: 20px !important;
}

.worldmapImageFirstRow{
  width: 100% !important;
}

.summary_Data {
    margin-top: 5px !important;
    font-size: 20px !important;
    margin-left: 10px !important;
}
.projectedSummaryData2 {
    width: 100% !important;
    margin-top: -50px !important;
    margin-left: -30px !important;
}
.projectedSummaryData2 .summary_li {
    margin-top: 60px !important;
    margin-left: 20px !important;
    margin-right: 10px !important;
    width: 14%;
}
.summaryCircle1 {
    height: 60px !important;
    width: 60px !important;
    padding-left: 0px !important;
    padding-top: 30px !important;
    margin-top: -120px !important;
    font-size: 18px !important;
    border-radius: 100% !important;
}
.coloredCircleBoxdata {
    padding-top: 10px !important;
    margin-top: -50px !important;
}
.highcharts-container > svg {
    height: 85% !important;
}

.summaryCharts .chartsA .highcharts-container {
    height: 800px !important;
    width: 90% !important;
    margin-left: 0px !important;
    margin-top: -160px !important;
}




.defaultQualityDetails{
    width: 100%;
    margin-top: 300px;
    height: 400vh;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 150px;
    padding-right: 180px;
}
.defaultTestPlanDetails{
    width: 100%;
    margin-top: 300px;
    height: 400vh;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 150px;
    padding-right: 180px;

}
.defaultCaveatsDetails{
    margin-top: 300px;
    height: 400vh;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 150px;
    padding-right: 180px;
}

.defaultUpgradeMatrixDetails{
    margin-top: 300px;
    height: 400vh;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 150px;
    padding-right: 180px;
}
.defaultTriggerMatrixDetails{
    margin-top: 300px;
    height: 400vh;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 150px;
    padding-right: 180px;
}
.defaultRorDetails{
    margin-top: 300px;
    height: 400vh;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 150px;
    padding-right: 180px;
}
.teamDetails{
    margin-top: 300px;
    height: 400vh;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 150px;
    padding-right: 180px;
}

.orgTable {
    font-size: 2em !important;
    height: 400px !important;
}

.featureDetails{
  margin-top: -40px !important;
  margin-left: -40px !important;
  width: 100% !important;
}

/* .mileStoneDiagramWrapper{
  height:250px !important;
  margin-bottom:40px !important;
  width: 100% !important;
} */

.highcharts-background{
  height:380px !important;

}
.relPathModal{
  top: 100px !important;
  left: 550px !important;
  min-height: 100px !important;
  min-width: 450px !important;
}

.worldMaptables{
  width: 100% !important;
  margin-left: 40px !important;
  padding-bottom: 80px !important;
  margin-top: 20px !important;
}


  
}

/* 25% */
@media (min-width:4500px){

     #rackHeader{
    max-height: 20vh !important;
    height: 16vh;
    padding: 0px;
  }
  .postauth-header1{
    width: 100% !important;
    height: 20vh;
    margin-top: 20px !important;
  }
  .topnav{
    max-height: 300px!important;
    margin-left: 400px !important;
    padding: 10px;
    /* background-color:#5cb7c7 !important; */
  }
   .fmenuItem12{
   height: 200px !important;
    width: 200px !important;
    margin-right: 0px !important;
    margin-bottom: 0px !important;
    margin-top: 20px !important;
    border-radius: 100% !important;
  }

   .fmenuItem12 > img{
    height: 150px !important;
    margin-top: 20px !important;
    margin-bottom: 40px !important;
    width: 150px !important;
    padding: 10px !important;
    padding-left: 20px !important;
  }
      .header-heading a{
   margin-top: 180px !important;
    margin-left: 120px !important;
  }
    .main-logo{
    width: 150px !important;
    margin-right: 10px !important;
  }
   #tl-title1{
    margin-top: 10px !important;
    font-size: 28px !important;
    margin-left: 20px !important;

  }
   .multi-button{
    margin-top: 20px !important;
    padding: 10px !important;
    padding-right: 180px !important;
  }

   .multi-button button{
   margin-right: 80px !important;
    padding-top: 0px !important;
    height: 120px !important;
    width: 200px !important;

  }
  .multi-button label{
    font-size: 2.4rem;
    font-weight:800;
  }
  .firstHeader{
    margin-top: 90px !important;
    font-size: 2.8em !important;
    margin-right: 200px !important;
    padding: 0px !important;
    padding-right: 20px !important;
  }
  .lg_addBtn1{
    height: 80px !important;
    width: 80px !important;
  }

   .relNav{
       max-height: 20vh !important;
    margin-top: 150px !important;
  }
  .bottomnav a{
    padding: 30px 40px !important;
    font-size: 36px !important;
    margin: 30px !important;
  }
  .insideButton{
    margin: 30px !important;
    height: 150px !important;
    width: 300px !important;
    padding: 4px !important;
    font-size: 38px !important;
  }
   .pageContentDiv{
    margin-top: 400px !important;
    padding-top: 120px;
    height: 450vh !important;
  }
   .pageTitle{
    font-size: 50px !important;
  }
  .defaultCustDetails{
   margin-top: 550px !important;
    height: 650vh;
    margin-left: -120px;
    margin-right: -120px;
    padding-left: 140px;
    padding-right: 120px;
  }
    .pTableDiv{
    width: 100% !important;
    margin: 60px !important;
  }
  .pTableHeader{
    margin: 40px !important;
    padding: 20px;
    height: 20vh;
  }
  .pTableTitle{
   font-size: 60px !important;
    padding: 30px !important;
    font-weight: 500 !important;
  }
  .pTableImageDiv img{
    height: 20vh;
    padding-right: 60px;
  }
  .pTablePids{
    line-height: 50px !important;
    font-size: 36px !important;
    min-height: 180px !important;
  }
  .relDetailsText{
    font-size: 36px !important;
    height: 8vh;
    font-weight: 500 !important;
    padding-top: 60px;
  }
  .pTableRTable{
    font-size: 36px !important;
    line-height: 60px !important;
  }

    .defaultProdDetails{
    margin-top: 550px !important;
    height: 650vh;
    margin-left: -160px;
    margin-right: -180px;
    padding-left: 200px;
    padding-right: 120px;
}

.marginBottom20{
    margin-bottom: 60px !important;
    margin-top: 20px !important;
}
  .funnelChart {
    height: 40vh !important;
    margin-right: 10px !important;
  }
  .prBtn{
    min-width: 0px !important;
    width: 80px;
    height: 40px;
    font-size: 30px !important;
    padding: 6px !important;
    margin-left: 150px !important;
  }
  .highcharts-container > svg {
    width: 100% !important;
    height: 90% !important;
}
#imgeChart.highcharts-container{
  height: 540px;
}

#ddtsPlatformChart.highcharts-container{
  height: 640px !important;

}



.defaultUsecaseDetails {
        margin-top: 600px !important;
    height: 650vh;
    margin-left: -80px;
    margin-right: -100px;
    padding-left: 180px;
    padding-right: 80px;
}
.networkDiagramWrapper img{
  height: 40vh;

}
.topoDiagramWrapper{
   height: 40vh !important;
    padding: 40px !important;
    line-height: 1.8;
    font-size: 3.4rem;

}
.defaultFeatureDetails{
    margin-top: 500px !important;
    height: 600vh;
    margin-left: -80px;
    margin-right: -150px;
    padding-left: 180px;
    padding-right: 20px;
}
.funnelChart1 {
   height: 50vh;
    padding-top: 20px;
}
.defaultCFDDetails{
    margin-top: 600px !important;
    height: 600vh;
    margin-left: -80px;
    margin-right: -100px;
    padding-left: 180px;
    padding-right: 20px;
}
.vgt-responsive{
     width: 100%;
    overflow-x: auto;
    max-height: 100vh !important;
    position: relative;
}
table.vgt-table{
  font-size: 3.8rem;
}
input.vgt-input {
    font-size: 2.8rem !important;
}
.defaultUpcomingDetails{
   margin-top: 500px !important;
    height: 600vh;
    margin-left: -80px;
    margin-right: -100px;
    padding-left: 180px;
    padding-right: 200px;
}

/* .defaultUpcomingDetails.milestoneImge .funnelChart{
  height:400px !important;
  margin-bottom:40px !important;
  width: 100% !important;
} */


.mileStoneDiagramWrapper img{
     height: 35vh !important;
    margin-bottom: 20px !important;
    width: 100% !important;
    padding-right: 30px;
}

.defaultWorldMapDetails{
    margin-top: 500px !important;
    margin-left: 0px !important;
    height: 600vh;
    margin-right: -100px;
    padding-left: 120px;
    padding-right: 140px;

}
.defaultAhaDetails{
    margin-top: 500px;
    height: 600vh;
    margin-right: -100px;
    padding-left: 140px;
    padding-right: 160px;
}

.defaultExecutionDetails{
    margin-top: 500px !important;
    height: 600vh;
    margin-left: 120px !important;
    padding-left: 120px !important;
}

.contentGraphClass{
     min-height: 50vh;
    max-height: 50vh;
  
}






.highcharts-background{
  height:380px !important;

}
.relPathModal{
  top: 100px !important;
  left: 550px !important;
  min-height: 100px !important;
  min-width: 450px !important;
}

.worldMaptables{
  width: 100% !important;
  margin-left: 40px !important;
  padding-bottom: 80px !important;
  margin-top: 20px !important;
}

.worldmapImageFirstRow{
  width: 100% !important;
}

.summary_Data {
    margin-top: 5px !important;
    font-size: 20px !important;
    margin-left: 10px !important;
}
.projectedSummaryData2 {
    width: 100% !important;
    margin-top: -50px !important;
    margin-left: -30px !important;
}
.projectedSummaryData2 .summary_li {
    margin-top: 60px !important;
    margin-left: 20px !important;
    margin-right: 10px !important;
    width: 14%;
}
.summaryCircle1 {
    height: 60px !important;
    width: 60px !important;
    padding-left: 0px !important;
    padding-top: 30px !important;
    margin-top: -120px !important;
    font-size: 18px !important;
    border-radius: 100% !important;
}
.coloredCircleBoxdata {
    padding-top: 10px !important;
    margin-top: -50px !important;
}
.highcharts-container > svg {
    height: 85% !important;
}

.summaryCharts .chartsA .highcharts-container {
    height: 800px !important;
    width: 90% !important;
    margin-left: 0px !important;
    margin-top: -160px !important;
}




.defaultQualityDetails{
    margin-top: 500px;
    height: 600vh;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 180px;
    padding-right: 220px;
}
.defaultTestPlanDetails{
    width: 100%;
    margin-top: 500px;
    height: 600vh;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 180px;
    padding-right: 220px;

}
.defaultCaveatsDetails{
    margin-top: 500px;
    height: 600vh;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 180px;
    padding-right: 220px;
}

.defaultUpgradeMatrixDetails{
       margin-top: 500px;
    height: 600vh;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 180px;
    padding-right: 220px;
}
.defaultTriggerMatrixDetails{
        margin-top: 500px;
    height: 600vh;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 180px;
    padding-right: 220px;
}
.defaultRorDetails{
    margin-top: 500px;
    height: 600vh;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 180px;
    padding-right: 220px;
}
.rorTable{
    font-size: 3.8rem;
    line-height: 2.8;
}
.rorWrapper .tm_btn-container a{
  font-size:3.8rem

}
.rorModal{
      left: 3500px;
      margin-top:300px;
}
.teamDetails{
    margin-top: 300px;
    height: 600vh;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 150px;
    padding-right: 180px;
}

.orgTable {
    font-size: 2em !important;
    height: 400px !important;
}

.featureDetails{
    font-size: 3em !important;
    line-height: 2rem !important;
    height: 30vh;
}
 
}
</style>
