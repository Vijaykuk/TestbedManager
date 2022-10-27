<script>
import { router } from "@/router";
import { testcaseService } from "@/core/services/testcaseService";
import GanttChart from "./GanttChart";
import ChartA from "./ChartA";
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
  name: "DetailsWeeklyReportCharts",
  props:["relName","colorscheme","execOptions","projectedExecOptions","executed"],
  data() {
    return {
          releasesArray: [],
           weeklyReport: [],
            heatMapOptions1: {},
      heatMapOptions2: {},
      currentPhase: "",
      fcsStatus: "",
      nextmilestone: "",
      nextmilestoneStatus: "",
      releaseDetails: {},
      testcasesExecuted:0,
      ganttChartPointWidth: "35",
      ganttOptions: {},
      execChartOptions:{},
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
    }
  },
  watch:{
      relName:function(){
           this.loadWeeklyCharts();
      }
  },
  mounted() {
    this.loadWeeklyCharts();
  },
   computed: {},
  components: {
    ChartA,
    GanttChart
  },
   methods: {
      emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
    onChildInteraction(args, payload) {
      switch (args) {
        case "toggleChart":
          this[payload] = !this[payload];
          break;
       }
    },
    closeDetailCharts(){
        this.emitToParent('closeDetailCharts');
    },
    loadWeeklyCharts(){
        let temp=this.relName.split('_');
        let custName=temp[0];
        let relId=temp[1];
        this.loadGanttChart(relId);
        this.execChartOptions=JSON.parse(JSON.stringify(this.execOptions));
        this.execChartOptions.title.text="Execution Summary"
        this.loadWeeklyReportByCustomerName(relId,custName);
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
           credits: false,
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
    sortByDateAsc(arr, key) {
      return arr.sort(function(a, b) {
        var dateA = new Date(a[key]).getTime();
        var dateB = new Date(b[key]).getTime();
        return dateA > dateB ? 1 : -1;
      });
    },
     loadWeeklyReportByCustomerName(folderName, custName) {
      let self = this;
      testcaseService.getWeeklyReportByCustomer(folderName, custName).then(
        (data) => {
          self.loading = false;
          self.loadingMessage = "";
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
     // this.cvtOptions.xAxis.categories = categories;
      //this.cvtOptions.series = weeklyReportData;
      this.splineOptions.xAxis.categories = categories;
      this.splineOptions.series = weeklyReportData1;
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
        credits: false,
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
    datediff(first, second) {
      // Take the difference between the dates and divide by milliseconds per day.
      // Round to nearest whole number to deal with DST.
      return Math.round((second - first) / (1000 * 60 * 60 * 24));
    },
     compareDates(rdata) {
      let startDate = new Date(rdata.start_date);
      let fcsDate = new Date(rdata.fcs_date);
      let tcfaDate = new Date(rdata.tcfa_date);
      let retestStartDate = new Date(rdata.retest_start_date);
      let retestEndDate = new Date(rdata.retest_end_date);
      let longevityStartDate = new Date(rdata.longevity_start_date);
      let longevityEndDate = new Date(rdata.longevity_start_date);

  /*    this.fcsStatus = "";
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
      }*/
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
          ganttOptions.title.text="Project Plan - "+this.relName;
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
                      self.testcasesExecuted.percentage /
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
     },
};
</script>
<template>
<div class="detailChartsWrapper">

<div class="detailGanttChart">
                <div class="closeBtnWrapper">
                <span
                    class="icon-close icon-small interaction closeBtn"
                     v-on:click="closeDetailCharts()"
                     ></span>
                </div>
                <div class="contentGraphClass" style="width:95% !important">
                
                 <GanttChart
                  disbleExport="true"
                  v-on:child="onChildInteraction"
                  :id="'ganttChart_'+relName"
                  :option="ganttOptions"
                ></GanttChart>
               <!-- <div class="row">
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
                </div>-->
              </div>
</div>
<div class="detailWeeklyCharts">
<div class="detailExecChart">
 <chartA
                          disbleExport="true"
                          v-on:child="onChildInteraction"
                          :id="'execchart_'+relName"
                          class="chartsA"
                         :option="execChartOptions"
                         :custRel="relName"
                        ></chartA>
</div>
<div class="detailWeeklyChart">
 <chartA
                disbleExport="true"
                v-on:child="onChildInteraction"
                :id="'splineChart'+relName"
                :option="splineOptions"
              ></chartA>
</div>
<div class="detailHeatMap">
 <chartA
                disbleExport="true"
                v-on:child="onChildInteraction"
                :id="'heatChart'+relName"
                :option="heatMapOptions1"
              ></chartA>
</div>
</div>

</div>
</template>
<style scoped>
.detailChartsWrapper{
width:100% !important;
}
.detailGanttChart{
width:100%;
}
.detailWeeklyCharts{
width:100%;
display:flex;
}
.closeBtnWrapper{
position: absolute;
    right: 10px;
    top: 30px;}
</style>