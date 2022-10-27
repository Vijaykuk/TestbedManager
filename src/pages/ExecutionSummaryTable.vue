<script>
import Vue from "vue";
import { testcaseService } from "@/core/services/testcaseService";
import Chart from "./Chart";
import { Tabs, Tab } from "vue-tabs-component";
export default {
  name: "ExecSummaryPage",
  props: [
    "displayName",
    "customerName",
    "releaseId",
    "releaseFlag",
    "folderName",
    "weeklyReport",
    "currentWeekData",
    "mhDefectsCount",
    "mainCdets",
    "showExtraPage",
  ],
  data() {
    return {
      weekIndex: 0,
      caveatList:[],
      pending_enablement_total: 0,
      triggerMatrixTotalData: [],
      upgradeMatrixTotalData: [],
      triggerMatrixData: {},
      upgradeMatrixData: {},
      triggerHeatMapOptions: {},
      upgradeHeatMapOptions: {},
      tableArray: [],
      execProjects: {},
      execFolders: {},
      execCustomer: {},
      custflag: false,
      execrelName: "",
      showMh: false,
      cdetsArray: {},
      cdetsCommonArray: {},
      cdetsArrayTotal: [],
      mainCdetsArrayTotal: [],
      mainCdetsArray: {},
      summaryDetails: {
        blocked: {
          count: 0,
          percentage: 0,
        },
        dropped: {
          count: 0,
          percentage: 0,
        },
        failed: {
          count: 0,
          percentage: 0,
        },
        passed: {
          count: 0,
          percentage: 0,
        },
        passx: {
          count: 0,
          percentage: 0,
        },
        pending: {
          count: 0,
          percentage: 0,
        },
        total: 0,
      },
      issuesWeeklyData: {},
      selectedWeekData: {},
      showCount: false,
    };
  },
  components: {
    tabs: Tabs,
    tab: Tab,
    Chart,
  },
  directives: {
    tabs: Tabs.directive,
    tab: Tab.directive,
  },
  watch: {
    weeklyReport: {
      immediate: true,
      deep: true,
      handler() {
        this.loadExecTable();
      },
    },
    mainCdets: {
      immediate: true,
      deep: true,
      handler(mainCdets) {
        this.cdetsArray = {};
        this.mainCdetsArray = {};
        this.cdetsArrayTotal = [];
        this.mainCdetsArrayTotal = [];
        let prodnames = [];
        let prodnames1 = [];
        let mainCdets1 = [];
        let Str1 = "_ss";
        let Str2 = "-ss";
        for (let f = 0; f < mainCdets.length; f++) {
          if (
            (mainCdets[f].status === "A" ||
              mainCdets[f].status === "I" ||
              mainCdets[f].status === "N" ||
              mainCdets[f].status === "O") &&
            mainCdets[f].attribute &&
              (mainCdets[f].attribute.indexOf(Str1) > -1 ||
                (mainCdets[f].attribute &&
                  mainCdets[f].attribute.indexOf(Str2) > -1))
          ) {
            mainCdets1.push(mainCdets[f]);
          }
        }

        this.defectCount = mainCdets.length;
        this.mhCount = mainCdets1.length;

        this.mainCdetsArrayTotal = mainCdets;

        for (let k = 0; k < mainCdets.length; k++) {
          if (prodnames.indexOf(mainCdets[k].product) <= -1) {
            prodnames.push(mainCdets[k].product);
            this.mainCdetsArray[mainCdets[k].product] = [];
            this.mainCdetsArray[mainCdets[k].product].push(mainCdets[k]);
          } else {
            this.mainCdetsArray[mainCdets[k].product].push(mainCdets[k]);
          }
        }

        this.cdetsArrayTotal = mainCdets1;

        for (let k = 0; k < mainCdets1.length; k++) {
          if (prodnames1.indexOf(mainCdets1[k].product) <= -1) {
            prodnames1.push(mainCdets1[k].product);
            this.cdetsArray[mainCdets1[k].product] = [];
            this.cdetsArray[mainCdets1[k].product].push(mainCdets1[k]);
          } else {
            this.cdetsArray[mainCdets1[k].product].push(mainCdets1[k]);
          }
        }
        this.cdetsCommonArray = this.cdetsArray;
      },
    },
  },
  mounted() {
    this.loadExecTable();
    this.loadExecutionSummaryDetails();
    this.loadCaveatlist();
    this.loadTriggerMatrix();
    this.loadUpgradeMatrix();
  },
  methods: {
    onChildInteraction(args, payload) {
      switch (args) {
      }
    },
    emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
    toggleMHDefects() {
      if (this.showMh) {
        document.querySelector(".totalMHTab").click();
        this.cdetsCommonArray = this.cdetsArray;
      } else {
        document.querySelector(".totalDefectsTab").click();
        this.cdetsCommonArray = this.mainCdetsArray;
      }
      this.showMh = !this.showMh;
    },
    closeExecSummaryModal() {
      this.emitToParent("closeExecSummaryTable");
    },
    maximizeModal() {
      this.emitToParent("maximize");
    },
    minimizeModal() {
      this.emitToParent("minimize");
    },
    loadHeatMapOptions() {
      return {
        chart: {
          type: "heatmap",
          backgroundColor: null,
          marginTop: 40,
          marginBottom: 80,
          plotBorderWidth: 1,
          colorAxis: {
            min: 0,
            minColor: "#FFFFFF",
            maxColor: "#86e0fc",
          },
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
    loadExecutionSummaryDetails() {
      let self = this;
      if (self.releaseFlag === "release" || self.releaseFlag === "customer") {
        let id = self.releaseId;
        if (self.releaseFlag === "release") {
          id = self.releaseId;
        } else if (self.releaseFlag === "customer") {
          id = self.folderName + "," + self.customerName;
        }

        testcaseService.loadExecDetails(self.releaseFlag, id).then(
          (data) => {
            self.execFolders = {};
            self.execProjects = {};
            if (self.releaseFlag === "release") {
              self.custflag = false;
              let temp = {};
              let key = Object.keys(data)[0];
              let tmpProject = data[key][key];
              let tmp = data[key][key].summary;
              tmp["name"] = key;
              self.execProjects["parent"] = [];
              self.execProjects["parent"].push(tmp);
              let folders = [];
              folders = Object.keys(tmpProject);
              self.execFolders[key] = [];
              for (let f1 = 0; f1 < folders.length; f1++) {
                if (folders[f1] !== "summary") {
                  temp = {};
                  temp = tmpProject[folders[f1]];
                  temp["name"] = folders[f1];
                  self.execFolders[key].push(temp);
                }
              }
            } else if (self.releaseFlag === "customer") {
              self.custflag = true;
              let obj = {},
                fname = "",
                tmp = {},
                temp = {},
                tmpProject = {},
                folders = [];
              let data1 = {};
              self.execProjects = {};
              self.execCustomer = {};
              self.execFolders = {};
              let key = Object.keys(data)[0];
              self.execCustomer = data[key].summary;
              self.execCustomer["name"] = key;
              self.execProjects[key] = [];
              let projects = Object.keys(data[key]);
              for (let k = 0; k < projects.length; k++) {
                if (projects[k] !== "summary") {
                  tmp = {};
                  tmp = data[key][projects[k]].summary;
                  tmp["name"] = projects[k];
                  self.execProjects[key].push(tmp);
                  tmpProject = {};
                  tmpProject = data[key][projects[k]];
                  folders = [];
                  folders = Object.keys(tmpProject);
                  self.execFolders[projects[k]] = [];
                  for (let f = 0; f < folders.length; f++) {
                    if (folders[f] !== "summary") {
                      temp = {};
                      temp = tmpProject[folders[f]];
                      temp["name"] = folders[f];
                      self.execFolders[projects[k]].push(temp);
                    }
                  }
                }
              }
            }
          },
          (error) => {
            console.log("error");
          }
        );
      }
    },
    cdetsTabClicked() {},

    JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
      //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
      var arrData =
        typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;
      var CSV = "";
      //This condition will generate the Label/Header
      if (ShowLabel) {
        var row = "";

        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
          //Now convert each value to string and comma-seprated
          row += index + ",";
        }
        row = row.slice(0, -1);
        //append Label row with line break
        CSV += row + "\r\n";
      }

      //1st loop is to extract each row
      for (var i = 0; i < arrData.length; i++) {
        var row = "";
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
          row += '"' + arrData[i][index] + '",';
        }
        row.slice(0, row.length - 1);
        //add a line break after each row
        CSV += row + "\r\n";
      }

      if (CSV == "") {
        alert("Invalid data");
        return;
      }

      //this trick will generate a temp "a" tag
      var link = document.createElement("a");
      link.id = "lnkDwnldLnk";

      //this part will append the anchor tag and remove it after automatic click
      document.body.appendChild(link);

      var csv = CSV;
      var blob = new Blob([csv], { type: "text/csv" });
      var csvUrl = window.webkitURL.createObjectURL(blob);
      var filename = (ReportTitle || "UserExport") + ".csv";
      $("#lnkDwnldLnk").attr({
        download: filename,
        href: csvUrl,
      });

      $("#lnkDwnldLnk")[0].click();
      document.body.removeChild(link);
    },

    loadExecTable() {
      let data = JSON.parse(JSON.stringify(this.weeklyReport));
      let arr = [],
        categoryObj = {};
      /** code for by default for all the weeks before current week */
      for (let i = 0; i < data.length; i++) {
        categoryObj = {};
        categoryObj["weekNumber"] = i + 1;
        categoryObj["weekDates"] = data[i].end_date.substring(0, 10);
        let executed =
          data[i].executed != null ? parseInt(data[i].executed) : 0;
        let planned = data[i].planned != null ? parseInt(data[i].planned) : 0;
        let passed = data[i].passed != null ? parseInt(data[i].passed) : 0;
        let failed = data[i].failed != null ? parseInt(data[i].failed) : 0;
        let pending = data[i].pending != null ? parseInt(data[i].pending) : 0;
        let total =
          data[i].total_testcases != null
            ? parseInt(data[i].total_testcases)
            : 0;
        if (i === 6) {
          console.log("1234===" + data[i].pending);
          console.log("pending" + pending);
          console.log("executed" + executed);
          console.log("total" + total);
        }
        categoryObj["pending"] =
          total > 0 ? ((pending / total) * 100).toFixed(2) : 0;
        categoryObj["planned"] =
          total > 0 ? ((planned / total) * 100).toFixed(2) : 0;
        categoryObj["executed"] =
          total > 0 ? ((executed / total) * 100).toFixed(2) : 0;
        categoryObj["passed"] =
          total > 0 ? ((passed / total) * 100).toFixed(2) : 0;
        categoryObj["failed"] =
          total > 0 ? ((failed / total) * 100).toFixed(2) : 0;

        categoryObj["plannedCount"] = planned;
        categoryObj["executedCount"] = executed;
        categoryObj["passedCount"] = passed;
        categoryObj["failedCount"] = failed;
        categoryObj["pendingCount"] = pending;

        categoryObj["quality"] =
          data[i].quality_percentage != null
            ? data[i].quality_percentage.toFixed(2)
            : 0;
        categoryObj["projectedQuality"] =
          data[i].projected_percentage != null
            ? data[i].projected_percentage.toFixed(2)
            : 0;
        categoryObj["pendingEnablement"] = 0;
        let mhdefects =
          data[i].must_have_defects != null ? data[i].must_have_defects : 0;
        let observed =
          data[i].defects_observed != null ? data[i].defects_observed : 0;
        let found =
          data[i].defects_found_CVT != null ? data[i].defects_found_CVT : 0;
        categoryObj["cvtTotal"] = data[i].total_observed_found;
        categoryObj["cvtFound"] = data[i].cvt_raised_found;
        categoryObj["cvtObserved"] = observed;
        categoryObj["mhHave"] = data[i].open_mh;
        categoryObj["pending_enablement_total"] = data[i]
          .pending_enablement_total
          ? data[i].pending_enablement_total
          : 0;
        categoryObj["pending_enablement"] = data[i].pending_enablement;
        categoryObj["software_version"] = data[i].software_version;
        categoryObj["customer_eft"] = data[i].customer_eft;
        categoryObj["highlights"] = data[i].highlights;
        categoryObj["lowlights"] = data[i].lowlights;

        arr.push(categoryObj);
      }
      /** code for pending enablement (from current week) */

      let pendingFlag = false;
      for (let gt = 0; gt < data.length; gt++) {
        if (
          new Date(data[gt].end_date) >= new Date() &&
          new Date(data[gt].start_date) < new Date()
        ) {
          if (!pendingFlag) {
            this.pending_enablement_total = data[gt].pending_enablement_total;
            pendingFlag = true;
          }
        }
      }
      let pendingFlag1 = false;
      for (let g = 0; g < data.length; g++) {
        if (new Date(data[g].end_date) > new Date()) {
          if (!pendingFlag1) {
            this.weekChange(g + 1);
            this.currentWeek = g + 1;
            pendingFlag1 = true;
          } else {
            /** code for future weeks to remove 0's */
            categoryObj = {};
            let planned =
              data[g].planned != null ? parseInt(data[g].planned) : 0;
            let total =
              data[g].total_testcases != null
                ? parseInt(data[g].total_testcases)
                : 0;
            categoryObj["weekDates"] = data[g].end_date.substring(0, 10);
            categoryObj["pending"] = data[g].pending ? data[g].pending : "";
            categoryObj["planned"] =
              total > 0 ? ((planned / total) * 100).toFixed(2) : "";
            categoryObj["executed"] = data[g].executed ? data[g].executed : "";
            categoryObj["passed"] = data[g].passed ? data[g].passed : "";
            categoryObj["failed"] = data[g].failed ? data[g].failed : "";
            categoryObj["plannedCount"] = planned;
            categoryObj["executedCount"] = data[g].executed
              ? data[g].executed
              : "";
            categoryObj["passedCount"] = data[g].passed ? data[g].passed : "";
            categoryObj["failedCount"] = data[g].failed ? data[g].failed : "";
            categoryObj["pendingCount"] = data[g].pending
              ? data[g].pending
              : "";
            categoryObj["quality"] =
              data[g].quality_percentage != null
                ? data[g].quality_percentage.toFixed(2)
                : 0;
            categoryObj["projectedQuality"] =
              data[g].projected_percentage != null
                ? data[g].projected_percentage.toFixed(2)
                : 0;
            categoryObj["pendingEnablement"] = 0;
            let observed =
              data[g].defects_observed != null ? data[g].defects_observed : 0;
            let found =
              data[g].defects_found_CVT != null ? data[g].defects_found_CVT : 0;

            categoryObj["cvtTotal"] = categoryObj["cvtFound"] =
              data[g].cvt_raised_found;
            categoryObj["cvtObserved"] = observed;
            categoryObj["mhHave"] = data[g].open_mh ? data[g].open_mh : "";
            categoryObj["pending_enablement_total"] = data[g]
              .pending_enablement_total
              ? data[g].pending_enablement_total
              : 0;
            categoryObj["pending_enablement"] = data[g].pending_enablement;
            categoryObj["software_version"] = data[g].software_version;
            categoryObj["customer_eft"] = data[g].customer_eft;
            categoryObj["highlights"] = data[g].highlights;
            categoryObj["lowlights"] = data[g].lowlights;
            arr[g] = categoryObj;
          }
        }
      }
      this.tableArray = [...arr];
    },
    addActiveClass1(ind) {
      if (ind === this.currentWeek) {
        return "activeDateTr";
      } else {
        return "";
      }
    },
    addActiveClass(ind) {
      if (ind === this.weekIndex) {
        return "activeDate1";
      } else {
        return "";
      }
    },
    issuesWeekChange(weekNum) {
      for (let k = 0; k < this.tableArray.length; k++) {
        if (weekNum === this.tableArray[k].weekNumber) {
          this.issuesWeeklyData = { ...this.tableArray[k] };
        }
      }
    },
    tableToJSON: function(table) {
      let trs = table.rows,
        trl = trs.length,
        i = 0,
        j = 0,
        keys = [],
        obj,
        ret = [];

      for (; i < trl; i++) {
        if (i == 0) {
          for (; j < trs[i].children.length; j++) {
            keys.push(trs[i].children[j].innerHTML);
          }
        } else {
          obj = {};
          for (j = 0; j < trs[i].children.length; j++) {
            obj[keys[j]] = trs[i].children[j].innerHTML;
          }
          ret.push(obj);
        }
      }

      return ret;
    },
    weekChange(weekNum) {
      for (let k = 0; k < this.tableArray.length; k++) {
        if (weekNum === this.tableArray[k].weekNumber) {
          this.weekIndex = weekNum;
          this.selectedWeekData = { ...this.tableArray[k] };
          document.getElementById(
            "selectedWeekHighlights"
          ).innerHTML = this.tableArray[k].highlights;
          document.getElementById(
            "selectedWeekLowlights"
          ).innerHTML = this.tableArray[k].lowlights;
          document.getElementById(
            "selectedWeekCustEFT"
          ).innerHTML = this.tableArray[k].customer_eft;
          let highlightHeight = document.getElementById(
            "selectedWeekHighlights"
          ).parentElement.parentElement.offsetHeight;
          let lowlightHeight = document.getElementById("selectedWeekLowlights")
            .parentElement.parentElement.offsetHeight;
          let maxHeight =
            highlightHeight > lowlightHeight ? highlightHeight : lowlightHeight;
          document.getElementById(
            "selectedWeekHighlights"
          ).parentElement.parentElement.style.height = maxHeight + "px";
          document.getElementById(
            "selectedWeekLowlights"
          ).parentElement.parentElement.style.height = maxHeight + "px";
        }
      }
    },
    loadCaveatlist(){
       let self = this;
      let type = "release",
        id = "";
      type = "release";
      id = this.releaseId;

      if (self.releaseFlag === "release") {
        type = "release";
        id = this.releaseId;
      } else if (self.releaseFlag === "customer") {
        type = "customer";
        id = this.folderName + "," + this.customerName;
      }

       testcaseService.loadCaveatList(type, id).then(
        (data) => {
          debugger;
          self.caveatList = data;
        },
        (error) => {}
      );

    },
    loadTriggerMatrix() {
      let self = this;
      let type = "release",
        id = "";
      type = "release";
      id = this.releaseId;

      if (self.releaseFlag === "release") {
        type = "release";
        id = this.releaseId;
      } else if (self.releaseFlag === "customer") {
        type = "customer";
        id = this.folderName + "," + this.customerName;
      }
      // this.loading = false;
      //this.loadingMessage = "Loading Trigger Matrix Details";
      testcaseService.loadTriggerMatrix(type, id).then(
        (data) => {
          debugger;
          self.triggerMatrixTotalData = data.data0;
        },
        (error) => {}
      );
      /** code for weekly trigger matrix */
      testcaseService.loadWeeklyTriggerMatrix(type, id).then(
        (data) => {
          debugger;
          let dates = [];
          let trWeekDates = [];
          let triggerWeeklycountArray = {};
          for (let m = 0; m < Object.keys(data).length; m++) {
            trWeekDates.push(data[Object.keys(data)[m]].end_date);
            triggerWeeklycountArray[data[Object.keys(data)[m]].end_date] =
              data[Object.keys(data)[m]].triggers.length;
            self.triggerMatrixData[data[Object.keys(data)[m]].end_date] = [];
            self.triggerMatrixData[data[Object.keys(data)[m]].end_date] =
              data[Object.keys(data)[m]].triggers;
          }

          let triggerHeatMapOptions = self.loadHeatMapOptions();
          triggerHeatMapOptions.title.text = "";
          triggerHeatMapOptions.xAxis.categories = [];
          let totalTrs = [],
            trnames = {},
            weekdates = [];
          for (let g = 0; g < trWeekDates.length; g++) {
            weekdates.push(trWeekDates[g].substring(0, 10));
            triggerWeeklycountArray[trWeekDates[g].substring(0, 10)] = {};
            let tempTriggers = self.triggerMatrixData[trWeekDates[g]];
            trnames[trWeekDates[g].substring(0, 10)] = [];
            for (let t = 0; t < tempTriggers.length; t++) {
              if (
                trnames[trWeekDates[g].substring(0, 10)].indexOf(
                  tempTriggers[t].trigger
                ) > -1
              ) {
                triggerWeeklycountArray[trWeekDates[g].substring(0, 10)][
                  tempTriggers[t].trigger
                ]["count"] += parseInt(tempTriggers[t].actual);
                if (tempTriggers[t].failed > 0) {
                  triggerWeeklycountArray[trWeekDates[g].substring(0, 10)][
                    tempTriggers[t].trigger
                  ]["failed"] = true;
                }
              } else {
                if (totalTrs.indexOf(tempTriggers[t].trigger) < 0) {
                  totalTrs.push(tempTriggers[t].trigger);
                }
                trnames[trWeekDates[g].substring(0, 10)].push(
                  tempTriggers[t].trigger
                );
                triggerWeeklycountArray[trWeekDates[g].substring(0, 10)][
                  tempTriggers[t].trigger
                ] = { count: parseInt(tempTriggers[t].actual), failed: false };
                if (tempTriggers[t].failed > 0) {
                  triggerWeeklycountArray[trWeekDates[g].substring(0, 10)][
                    tempTriggers[t].trigger
                  ]["failed"] = true;
                }
              }
            }
          }

          let valueArray = [],
            valueObj = {};
          for (let i = 0; i < trWeekDates.length; i++) {
            for (let j = 0; j < totalTrs.length; j++) {
              if (
                trnames[trWeekDates[i].substring(0, 10)].indexOf(totalTrs[j]) >
                -1
              ) {
                valueObj = {};
                valueObj["x"] = i;
                valueObj["y"] = j;
                valueObj["color"] = triggerWeeklycountArray[
                  trWeekDates[i].substring(0, 10)
                ][totalTrs[j]]["failed"]
                  ? "#f0f062"
                  : "#42be07";
                valueObj["value"] =
                  triggerWeeklycountArray[trWeekDates[i].substring(0, 10)][
                    totalTrs[j]
                  ]["count"];
                valueArray.push(valueObj);
              } else {
                valueObj = {};
                valueObj["x"] = i;
                valueObj["y"] = j;
                valueObj["value"] = "";
                valueObj["color"] = "#fff";
                valueArray.push(valueObj);
              }
            }
          }
          triggerHeatMapOptions.yAxis.categories = totalTrs;
          triggerHeatMapOptions.xAxis.categories = weekdates;
          triggerHeatMapOptions.series[0].data = valueArray;
          self.triggerHeatMapOptions = triggerHeatMapOptions;
        },
        (error) => {}
      );
    },
    downloadCSVFile(excelData, filename) {
      var csv_file, download_link;
      csv_file = new Blob([excelData], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
      });
      download_link = document.createElement("a");
      download_link.download = filename;
      download_link.href = window.URL.createObjectURL(csv_file);
      download_link.style.display = "none";
      document.body.appendChild(download_link);
      download_link.click();
    },
    downloadTable(tableId) {
      let table1 = document.querySelector("#" + tableId);
      let jsonData = this.tableToJSON(table1);
      let keys = Object.keys(jsonData[0]);
      for (let k = 0; k < jsonData.length; k++) {
        for (let l = 0; l < keys.length; l++) {
          jsonData[k][keys[l]] = jsonData[k][keys[l]].replaceAll(
            '<a href="#" class="">',
            ""
          );
          jsonData[k][keys[l]] = jsonData[k][keys[l]].replaceAll(
            '<a href="#" class="activeDate1">',
            ""
          );
          jsonData[k][keys[l]] = jsonData[k][keys[l]].replaceAll("</a>", "");
          jsonData[k][keys[l]] = jsonData[k][keys[l]].replaceAll("<span>", "");
          jsonData[k][keys[l]] = jsonData[k][keys[l]].replaceAll("</span>", "");
        }
      }
      this.JSONToCSVConvertor(jsonData, "ExecutionSummary", true);
    },
    loadUpgradeMatrix() {
      let self = this;
      let type = "release",
        id = "";
      type = "release";
      id = this.releaseId;

      if (self.releaseFlag === "release") {
        type = "release";
        id = this.releaseId;
      } else if (self.releaseFlag === "customer") {
        type = "customer";
        id = this.folderName + "," + this.customerName;
      }

      this.loading = false;
      this.loadingMessage = "Loading Upgrade Matrix Details";
      testcaseService.loadUpgradeMatrix(type, id).then(
        (data) => {
          debugger;
          self.upgradeMatrixTotalData = [];
          self.upgradeMatrixTotalData = data.data0;
        },
        (error) => {}
      );
      /** code for weekly upgrade matrix */
      testcaseService.loadWeeklyUpgradeMatrix(type, id).then(
        (data) => {
          let dates = [];
          let trWeekDates = [];
          let upgradeWeeklycountArray = {};
          for (let m = 0; m < Object.keys(data).length; m++) {
            trWeekDates.push(data[Object.keys(data)[m]].end_date);
            upgradeWeeklycountArray[data[Object.keys(data)[m]].end_date] =
              data[Object.keys(data)[m]].upgrades.length;
            self.upgradeMatrixData[data[Object.keys(data)[m]].end_date] = [];
            self.upgradeMatrixData[data[Object.keys(data)[m]].end_date] =
              data[Object.keys(data)[m]].upgrades;
          }
          let upgradeHeatMapOptions = self.loadHeatMapOptions();
          upgradeHeatMapOptions.title.text = "";
          upgradeHeatMapOptions.xAxis.categories = [];
          let totalTrs = [],
            trnames = {},
            weekdates = [];
          for (let g = 0; g < trWeekDates.length; g++) {
            weekdates.push(trWeekDates[g].substring(0, 10));
            upgradeWeeklycountArray[trWeekDates[g].substring(0, 10)] = {};
            let tempUpgrades = self.upgradeMatrixData[trWeekDates[g]];
            trnames[trWeekDates[g].substring(0, 10)] = [];
            for (let t = 0; t < tempUpgrades.length; t++) {
              if (
                trnames[trWeekDates[g].substring(0, 10)].indexOf(
                  tempUpgrades[t].upgrade
                ) > -1
              ) {
                upgradeWeeklycountArray[trWeekDates[g].substring(0, 10)][
                  tempUpgrades[t].upgrade
                ]["count"] += parseInt(tempUpgrades[t].actual);
                if (tempUpgrades[t].failed > 0) {
                  upgradeWeeklycountArray[trWeekDates[g].substring(0, 10)][
                    tempUpgrades[t].upgrade
                  ]["failed"] = true;
                }
              } else {
                if (totalTrs.indexOf(tempUpgrades[t].upgrade) < 0) {
                  totalTrs.push(tempUpgrades[t].upgrade);
                }
                trnames[trWeekDates[g].substring(0, 10)].push(
                  tempUpgrades[t].upgrade
                );
                upgradeWeeklycountArray[trWeekDates[g].substring(0, 10)][
                  tempUpgrades[t].upgrade
                ] = { count: parseInt(tempUpgrades[t].actual), failed: false };
                if (tempUpgrades[t].failed > 0) {
                  upgradeWeeklycountArray[trWeekDates[g].substring(0, 10)][
                    tempUpgrades[t].upgrade
                  ]["failed"] = true;
                }
              }
            }
          }

          let valueArray = [],
            valueObj = {};
          for (let i = 0; i < trWeekDates.length; i++) {
            for (let j = 0; j < totalTrs.length; j++) {
              if (
                trnames[trWeekDates[i].substring(0, 10)].indexOf(totalTrs[j]) >
                -1
              ) {
                valueObj = {};
                valueObj["x"] = i;
                valueObj["y"] = j;
                valueObj["color"] = "#86e0fc";
                valueObj["color"] = upgradeWeeklycountArray[
                  trWeekDates[i].substring(0, 10)
                ][totalTrs[j]]["failed"]
                  ? "#f0f062"
                  : "#42be07";
                valueObj["value"] =
                  upgradeWeeklycountArray[trWeekDates[i].substring(0, 10)][
                    totalTrs[j]
                  ]["count"];
                valueArray.push(valueObj);
              } else {
                valueObj = {};
                valueObj["x"] = i;
                valueObj["y"] = j;
                valueObj["value"] = "";
                valueObj["color"] = "#fff";
                valueArray.push(valueObj);
              }
            }
          }
          upgradeHeatMapOptions.yAxis.categories = totalTrs;
          upgradeHeatMapOptions.xAxis.categories = weekdates;
          upgradeHeatMapOptions.series[0].data = valueArray;
          self.upgradeHeatMapOptions = upgradeHeatMapOptions;
          debugger;
        },
        (error) => {}
      );
    },
  },
};
</script>
<template>
  <div>
    <div
      class="modal__header"
      style="display:flex; justify-content:space-between; margin-bottom:5px;"
    >
      <div class="modal_title">Weekly Execution Report - {{ displayName }}</div>
      <span>
        <span
          v-if="!showExtraPage"
          class="icon-maximize icon-small interaction"
          style="margin-right:15px"
          v-on:click="maximizeModal()"
        ></span>
        <span
          v-if="showExtraPage"
          class="icon-minimize icon-small interaction"
          style="margin-right:15px"
          v-on:click="minimizeModal()"
        ></span>
        <span
          class="icon-close icon-small interaction"
          v-on:click="closeExecSummaryModal()"
        ></span>
      </span>
    </div>
    <div class="modal__body" style="display:flex; justify-content:center;">
      <div class="execWrapper" style="width:100%;">
        <div
          class="percCountBtn row"
          style="position:relative;margin-bottom: 10px;"
        >
          <button
            v-if="!showCount"
            class="btn btn--primary cm_addBtn1"
            @click="showCount = !showCount"
            style="position: absolute;right: 0px;"
          >
            Perc
          </button>
          <button
            v-if="showCount"
            class="btn btn--primary cm_addBtn1"
            @click="showCount = !showCount"
            style="position: absolute;right: 0px;"
          >
            Count
          </button>
        </div>
        <div class="row" style="margin-top:50px;">
          <div class="execSummaryTable">
            <table class="table table--highlight execTable secondaryTable">
              <tr>
                <td class="bg-primary tableHeading" colspan="100%">
                  <span style="align:center"> Weekly Execution Trend </span>
                  <span
                    class="icon-download icon-small interaction"
                    style="float:right"
                    v-on:click="downloadTable('weeklyExeTable')"
                  ></span>
                </td>
              </tr>
              <tr>
                <td colspan="100%">
                  <table id="weeklyExeTable" style="width:100%">
                    <tr>
                      <th class="uTableTh">Week</th>
                      <th class="uTableTh">Date</th>
                      <th class="uTableTh">Image</th>
                      <th class="uTableTh">Planned</th>
                      <th class="uTableTh">Executed</th>
                      <th class="uTableTh">Pending</th>
                      <th class="uTableTh">Pass</th>
                      <th class="uTableTh">Fail</th>
                      <th class="uTableTh">Quality</th>
                      <th class="uTableTh">Proj Quality</th>
                      <th class="uTableTh">
                        Pending Enable <br />(total-{{
                          pending_enablement_total
                        }}
                        )
                      </th>
                      <th class="uTableTh">CVT Raised</th>
                      <th class="uTableTh">Total</th>
                      <th class="uTableTh">Open MH</th>
                    </tr>
                    <template v-for="(tObj, ik) in tableArray">
                      <tr :key="ik" :class="addActiveClass1(ik + 1)">
                        <td class="uTableTd">{{ ik + 1 }}</td>
                        <td class="uTableTd">
                          <a
                            :class="addActiveClass(ik + 1)"
                            href="#"
                            @click="weekChange(ik + 1)"
                            >{{ tObj.weekDates }}</a
                          >
                        </td>
                        <td class="uTableTd">{{ tObj.software_version }}</td>
                        <td v-if="!showCount" class="uTableTd">
                          {{ tObj.plannedCount }}
                        </td>
                        <td v-if="!showCount" class="uTableTd">
                          {{ tObj.executedCount }}
                        </td>
                        <td v-if="!showCount" class="uTableTd">
                          {{ tObj.pendingCount }}
                        </td>
                        <td v-if="!showCount" class="uTableTd">
                          {{ tObj.passedCount }}
                        </td>
                        <td v-if="!showCount" class="uTableTd">
                          {{ tObj.failedCount }}
                        </td>
                        <td v-if="showCount" class="uTableTd">
                          {{ tObj.planned }}<span v-if="tObj.planned">%</span>
                        </td>
                        <td v-if="showCount" class="uTableTd">
                          {{ tObj.executed }}<span v-if="tObj.planned">%</span>
                        </td>
                        <td v-if="showCount" class="uTableTd">
                          {{ tObj.pending }}<span v-if="tObj.planned">%</span>
                        </td>
                        <td v-if="showCount" class="uTableTd">
                          {{ tObj.passed }}<span v-if="tObj.planned">%</span>
                        </td>
                        <td v-if="showCount" class="uTableTd">
                          {{ tObj.failed }}<span v-if="tObj.planned">%</span>
                        </td>
                        <td class="uTableTd">{{ tObj.quality }}</td>
                        <td class="uTableTd">
                          {{ tObj.projectedQuality
                          }}<span v-if="tObj.planned">%</span>
                        </td>
                        <td class="uTableTd">{{ tObj.pending_enablement }}</td>
                        <td class="uTableTd">{{ tObj.cvtFound }}</td>
                        <td class="uTableTd">{{ tObj.cvtTotal }}</td>
                        <td class="uTableTd">{{ tObj.mhHave }}</td>
                      </tr>
                    </template>
                  </table>
                </td>
              </tr>
            </table>

            <table class="execTable table table--highlight secondaryTable">
              <tr>
                <td class="bg-primary tableHeading" colspan="100%">
                  <span style="align:center"> Summary </span>
                </td>
              </tr>
              <tr>
                <td
                  class="bg-secondary"
                  style="width:50%;border: 1px solid #ddd;background: #b9e4b6;font-weight: 700;border:1px solid #a3bca2;padding: 5px !important;"
                >
                  Highlights
                </td>
                <td
                  class="bg-secondary"
                  style="width:50%;border: 1px solid #ddd;background: #f2d3c4;font-weight: 700;border: 1px solid #9a877e;padding: 5px !important;"
                >
                  Lowlights
                </td>
              </tr>
              <tr>
                <td class="uTableTd">
                  <div class="relWeekContentWrapper">
                    <div class="summaryContentForWeek">
                      <div id="selectedWeekHighlights"></div>
                    </div>
                  </div>
                </td>

                <td class="uTableTd">
                  <div class="relWeekContentWrapper">
                    <div class="summaryContentForWeek">
                      <div id="selectedWeekLowlights"></div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>

            <table class="execTable table table--highlight secondaryTable">
              <tr v-if="!showMh">
                <td class="bg-primary tableHeading" colspan="100%">
                  <span style="align:center">
                    Defects - {{ defectCount }}
                  </span>
                </td>
              </tr>
              <tr v-if="showMh">
                <td class="bg-primary tableHeading" colspan="100%">
                  <span style="align:center">
                    Must Have Defects - {{ mhCount }}
                  </span>
                </td>
              </tr>
              <tr>
                <td class="uTableTd">
                  <div
                    class="cdetsToggleButton"
                    style="position: relative;
    margin-right: 25px;"
                  >
                    <button
                      v-if="!showMh"
                      class="btn btn--primary cm_addBtn1"
                      @click="toggleMHDefects()"
                      style="position: absolute;right: 0px;width:fit-content;"
                    >
                      MH
                    </button>
                    <button
                      v-if="showMh"
                      class="btn btn--primary cm_addBtn1"
                      @click="showMh = !showMh"
                      style="position: absolute;right: 0px;width:fit-content;"
                    >
                      Defects
                    </button>
                  </div>
                  <div class="issuesTable" v-if="showMh">
                    <tabs
                      id="cdetsTabs"
                      name="cdetsTabs"
                      :options="{
                        useUrlFragment: false,
                        defaultTabHash: 'TotalMHDefects',
                      }"
                      @clicked="cdetsTabClicked"
                      @changed="cdetsTabClicked"
                    >
                      <tab
                        name="MH Defects"
                        id="TotalMHDefects"
                        ref="TotalMHDefects"
                        class="totalMHTab"
                      >
                        <table id="issuesTable">
                          <tr>
                            <th class="uTableTh issuesTh">DDTS</th>
                            <th class="uTableTh issuesTh" style="width:45%;">
                              Headline
                            </th>
                            <th class="uTableTh issuesTh">Product</th>
                            <th class="uTableTh issuesTh">Severity</th>
                            <th class="uTableTh issuesTh">Component</th>
                            <th class="uTableTh issuesTh">Status</th>
                            <th class="uTableTh issuesTh">Submitter</th>
                            <th class="uTableTh issuesTh">TC Failures</th>
                            <th class="uTableTh issuesTh">TC Blockers</th>
                          </tr>
                          <template v-for="(cObj, ic) in cdetsArrayTotal">
                            <tr :key="'total_mh' + '___' + ic">
                              <td class="uTableTd">{{ cObj.defect_id }}</td>
                              <td
                                class="uTableTd"
                                style="width:45%;text-align: left;"
                              >
                                {{ cObj.headline }}
                              </td>
                              <td class="uTableTd">{{ cObj.product }}</td>
                              <td class="uTableTd">{{ cObj.severity }}</td>
                              <td class="uTableTd">{{ cObj.component }}</td>
                              <td class="uTableTd">{{ cObj.status }}</td>
                              <td class="uTableTd">{{ cObj.submitter }}</td>
                              <td class="uTableTd">{{ cObj.tcFailures }}</td>
                              <td class="uTableTd">{{ cObj.tcBlockers }}</td>
                            </tr>
                          </template>
                        </table>
                      </tab>
                      <template
                        v-for="(cdetsObj, ic) in Object.keys(cdetsCommonArray)"
                      >
                        <tab
                          :key="'mh' + cdetsObj + '_' + ic"
                          :name="cdetsObj"
                          :id="'mh' + cdetsObj"
                          :ref="'mh' + cdetsObj"
                        >
                          <table id="issuesTable">
                            <tr>
                              <th class="uTableTh issuesTh">DDTS</th>
                              <th class="uTableTh issuesTh" style="width:45%;">
                                Headline
                              </th>
                              <th class="uTableTh issuesTh">Product</th>
                              <th class="uTableTh issuesTh">Severity</th>
                              <th class="uTableTh issuesTh">Component</th>
                              <th class="uTableTh issuesTh">Status</th>
                              <th class="uTableTh issuesTh">Submitter</th>
                              <th class="uTableTh issuesTh">TC Failures</th>
                              <th class="uTableTh issuesTh">TC Blockers</th>
                            </tr>
                            <template
                              v-for="(cObj, ic) in cdetsArray[cdetsObj]"
                            >
                              <tr :key="cdetsObj + '___' + ic">
                                <td class="uTableTd">{{ cObj.defect_id }}</td>
                                <td
                                  class="uTableTd"
                                  style="width:45%;text-align: left;"
                                >
                                  {{ cObj.headline }}
                                </td>
                                <td class="uTableTd">{{ cObj.product }}</td>
                                <td class="uTableTd">{{ cObj.severity }}</td>
                                <td class="uTableTd">{{ cObj.component }}</td>
                                <td class="uTableTd">{{ cObj.status }}</td>
                                <td class="uTableTd">{{ cObj.submitter }}</td>
                                <td class="uTableTd">{{ cObj.tcFailures }}</td>
                                <td class="uTableTd">{{ cObj.tcBlockers }}</td>
                              </tr>
                            </template>
                          </table>
                        </tab>
                      </template>
                    </tabs>
                  </div>
                  <div class="issuesTable" v-if="!showMh">
                    <tabs
                      id="cdets1Tabs"
                      name="cdets1Tabs"
                      :options="{
                        useUrlFragment: false,
                        defaultTabHash: 'df_Total',
                      }"
                      @clicked="cdetsTabClicked"
                      @changed="cdetsTabClicked"
                    >
                      <tab
                        name="Total"
                        id="df_Total"
                        ref="df_Total"
                        class="totalDefectsTab"
                      >
                        <table id="issuesTable">
                          <tr>
                            <th class="uTableTh issuesTh">DDTS</th>
                            <th class="uTableTh issuesTh" style="width:45%;">
                              Headline
                            </th>
                            <th class="uTableTh issuesTh">Product</th>
                            <th class="uTableTh issuesTh">Severity</th>
                            <th class="uTableTh issuesTh">Component</th>
                            <th class="uTableTh issuesTh">Status</th>
                            <th class="uTableTh issuesTh">TC Failures</th>
                            <th class="uTableTh issuesTh">TC Blockers</th>
                          </tr>
                          <template v-for="(cObj, ic) in mainCdetsArrayTotal">
                            <tr :key="'total_df___' + ic">
                              <td class="uTableTd">{{ cObj.defect_id }}</td>
                              <td
                                class="uTableTd"
                                style="width:45%;text-align: left;"
                              >
                                {{ cObj.headline }}
                              </td>
                              <td class="uTableTd">{{ cObj.product }}</td>
                              <td class="uTableTd">{{ cObj.severity }}</td>
                              <td class="uTableTd">{{ cObj.component }}</td>
                              <td class="uTableTd">{{ cObj.status }}</td>
                              <td class="uTableTd">{{ cObj.tcFailures }}</td>
                              <td class="uTableTd">{{ cObj.tcBlockers }}</td>
                            </tr>
                          </template>
                        </table>
                      </tab>

                      <template
                        v-for="(cdetsObj, ic) in Object.keys(cdetsCommonArray)"
                      >
                        <tab
                          :key="cdetsObj + '_' + ic"
                          :name="cdetsObj"
                          :id="cdetsObj"
                          :ref="cdetsObj"
                        >
                          <table id="issuesTable">
                            <tr>
                              <th class="uTableTh issuesTh">DDTS</th>
                              <th class="uTableTh issuesTh" style="width:45%;">
                                Headline
                              </th>
                              <th class="uTableTh issuesTh">Product</th>
                              <th class="uTableTh issuesTh">Severity</th>
                              <th class="uTableTh issuesTh">Component</th>
                              <th class="uTableTh issuesTh">Status</th>
                              <th class="uTableTh issuesTh">TC Failures</th>
                              <th class="uTableTh issuesTh">TC Blockers</th>
                            </tr>
                            <template
                              v-for="(cObj, ic) in mainCdetsArray[cdetsObj]"
                            >
                              <tr :key="cdetsObj + '___' + ic">
                                <td class="uTableTd">{{ cObj.defect_id }}</td>
                                <td
                                  class="uTableTd"
                                  style="width:45%;text-align: left;"
                                >
                                  {{ cObj.headline }}
                                </td>
                                <td class="uTableTd">{{ cObj.product }}</td>
                                <td class="uTableTd">{{ cObj.severity }}</td>
                                <td class="uTableTd">{{ cObj.component }}</td>
                                <td class="uTableTd">{{ cObj.status }}</td>
                                <td class="uTableTd">{{ cObj.tcFailures }}</td>
                                <td class="uTableTd">{{ cObj.tcBlockers }}</td>
                              </tr>
                            </template>
                          </table>
                        </tab>
                      </template>
                    </tabs>
                  </div>
                </td>
              </tr>
            </table>

            <table class="execTable table table--highlight secondaryTable">
              <tr>
                <td class="bg-primary tableHeading" colspan="100%">
                  <span style="align:center"> Customer/EFT </span>
                </td>
              </tr>

              <tr>
                <td class="uTableTd" colspan="18">
                  <div class="relWeekContentWrapper">
                    <div class="summaryContentForWeek">
                      <div id="selectedWeekCustEFT"></div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>

            <table class="execTable table table--highlight secondaryTable">
              <tr>
                <td class="bg-primary tableHeading" colspan="100%">
                  <span style="align:center"> Execution Summary </span>
                  <span
                    class="icon-download icon-small interaction"
                    style="float:right"
                    v-on:click="downloadTable('execRelTable')"
                  ></span>
                </td>
              </tr>
              <tr>
                <td class="uTableTd" colspan="18">
                  <table
                    id="execRelTable"
                    class="table table--highlight secondaryTable"
                  >
                    <tr>
                      <th class="rTableTh ">Folders</th>
                      <th class="rTableTh ">Total</th>
                      <th class="rTableTh ">
                        <span class="dot executedDot"></span>Executed
                      </th>
                      <th class="rTableTh ">
                        <span class="dot passedDot"></span>Quality
                      </th>
                      <th class="rTableTh ">
                        <span class="dot pendingDot"></span>Pending
                      </th>
                      <th class="rTableTh ">
                        <span class="dot passedDot"></span>Passed
                      </th>
                      <th class="rTableTh ">
                        <span class="dot passedxDot"></span>Passed w/x
                      </th>
                      <th class="rTableTh ">
                        <span class="dot failedDot"></span>Failed
                      </th>
                      <th class="rTableTh ">
                        <span class="dot droppedDot"></span>Dropped
                      </th>
                      <th class="rTableTh ">
                        <span class="dot blockedDot"></span>Blocked
                      </th>
                    </tr>
                    <template v-if="custflag">
                      <tr class="custInfo">
                        <th class="rTableTd folderTd">
                          <span class="foldericon"
                            ><i class="icon icon-folder"></i></span
                          ><span class="projName">{{ execCustomer.name }}</span>
                        </th>
                        <td class="rTableTd ">
                          {{ execCustomer.Total.count }}
                        </td>
                        <td class="rTableTd ">
                          {{ execCustomer.executed.count }}({{
                            execCustomer.executed.percentage
                          }}%)
                        </td>
                        <td class="rTableTd ">{{ execCustomer.quality }}%</td>
                        <td class="rTableTd ">
                          {{ execCustomer.pending.count }}({{
                            execCustomer.pending.percentage
                          }}%)
                        </td>

                        <td class="rTableTd ">
                          {{ execCustomer.passed.count }}({{
                            execCustomer.passed.percentage
                          }}%)
                        </td>
                        <td class="rTableTd ">
                          {{ execCustomer.passx.count }}({{
                            execCustomer.passx.percentage
                          }}%)
                        </td>
                        <td class="rTableTd ">
                          {{ execCustomer.failed.count }}({{
                            execCustomer.failed.percentage
                          }}%)
                        </td>
                        <td class="rTableTd ">
                          {{ execCustomer.dropped.count }}({{
                            execCustomer.dropped.percentage
                          }}%)
                        </td>
                        <td class="rTableTd ">
                          {{ execCustomer.blocked.count }}({{
                            execCustomer.blocked.percentage
                          }}%)
                        </td>
                      </tr>
                      <template
                        v-for="(sobj, ipf) in execProjects[execCustomer.name]"
                      >
                        <tr class="projectInfo" :key="ipf + '_aft'">
                          <th class="rTableTd folderTd">
                            <span class="foldericon" style="margin-left:10px;"
                              ><i class="icon icon-folder"></i></span
                            ><span class="projName">{{ sobj.name }}</span>
                          </th>
                          <td class="rTableTd ">{{ sobj.total.count }}</td>
                          <td class="rTableTd ">
                            {{ sobj.executed.count }} ({{
                              sobj.executed.percentage
                            }}%)
                          </td>
                          <td class="rTableTd ">{{ sobj.quality }}%</td>
                          <td class="rTableTd ">
                            {{ sobj.pending.count }} ({{
                              sobj.pending.percentage
                            }}%)
                          </td>

                          <td class="rTableTd ">
                            {{ sobj.passed.count }} ({{
                              sobj.passed.percentage
                            }}%)
                          </td>
                          <td class="rTableTd ">
                            {{ sobj.passx.count }} ({{
                              sobj.passx.percentage
                            }}%)
                          </td>
                          <td class="rTableTd ">
                            {{ sobj.failed.count }} ({{
                              sobj.failed.percentage
                            }}%)
                          </td>
                          <td class="rTableTd ">
                            {{ sobj.dropped.count }} ({{
                              sobj.dropped.percentage
                            }}%)
                          </td>
                          <td class="rTableTd ">
                            {{ sobj.blocked.count }} ({{
                              sobj.blocked.percentage
                            }}%)
                          </td>
                        </tr>
                        <template v-for="(pobj, ip) in execFolders[sobj.name]">
                          <tr :key="ip + '_abt'">
                            <th class="rTableTd folderTd">
                              <span class="foldericon" style="margin-left:20px;"
                                ><i class="icon icon-folder"></i></span
                              ><span class="projName">{{ pobj.name }}</span>
                            </th>
                            <td class="rTableTd ">{{ pobj.total }}</td>
                            <td class="rTableTd ">
                              {{ pobj.executed.count }} ({{
                                pobj.executed.percentage
                              }}%)
                            </td>
                            <td class="rTableTd ">{{ pobj.quality }}%</td>
                            <td class="rTableTd ">
                              {{ pobj.pending.count }} ({{
                                pobj.pending.percentage
                              }}%)
                            </td>

                            <td class="rTableTd ">
                              {{ pobj.passed.count }} ({{
                                pobj.passed.percentage
                              }}%)
                            </td>
                            <td class="rTableTd ">
                              {{ pobj.passx.count }} ({{
                                pobj.passx.percentage
                              }}%)
                            </td>
                            <td class="rTableTd ">
                              {{ pobj.failed.count }} ({{
                                pobj.failed.percentage
                              }}%)
                            </td>
                            <td class="rTableTd ">
                              {{ pobj.dropped.count }} ({{
                                pobj.dropped.percentage
                              }}%)
                            </td>
                            <td class="rTableTd ">
                              {{ pobj.blocked.count }} ({{
                                pobj.blocked.percentage
                              }}%)
                            </td>
                          </tr>
                        </template>
                      </template>
                    </template>

                    <template v-else>
                      <template v-for="(sobj, ipf) in execProjects['parent']">
                        <tr class="projectInfo" :key="ipf + '_aft'">
                          <th class="rTableTd folderTd">
                            <span class="foldericon" style="margin-left:10px;"
                              ><i class="icon icon-folder"></i></span
                            ><span class="projName">{{ sobj.name }}</span>
                          </th>
                          <td class="rTableTd ">{{ sobj.total.count }}</td>
                          <td class="rTableTd ">
                            {{ sobj.executed.count }} ({{
                              sobj.executed.percentage
                            }}%)
                          </td>
                          <td class="rTableTd ">{{ sobj.quality }}%</td>
                          <td class="rTableTd ">
                            {{ sobj.pending.count }} ({{
                              sobj.pending.percentage
                            }}%)
                          </td>

                          <td class="rTableTd ">
                            {{ sobj.passed.count }} ({{
                              sobj.passed.percentage
                            }}%)
                          </td>
                          <td class="rTableTd ">
                            {{ sobj.passx.count }} ({{
                              sobj.passx.percentage
                            }}%)
                          </td>
                          <td class="rTableTd ">
                            {{ sobj.failed.count }} ({{
                              sobj.failed.percentage
                            }}%)
                          </td>
                          <td class="rTableTd ">
                            {{ sobj.dropped.count }} ({{
                              sobj.dropped.percentage
                            }}%)
                          </td>
                          <td class="rTableTd ">
                            {{ sobj.blocked.count }} ({{
                              sobj.blocked.percentage
                            }}%)
                          </td>
                        </tr>
                        <template v-for="(pobj, ip) in execFolders[sobj.name]">
                          <tr :key="ip + '_ab'">
                            <th class="rTableTd folderTd">
                              <span class="foldericon" style="margin-left:20px;"
                                ><i class="icon icon-folder"></i></span
                              ><span class="projName">{{ pobj.name }}</span>
                            </th>
                            <td class="rTableTd ">{{ pobj.total }}</td>
                            <td class="rTableTd ">
                              {{ pobj.executed.count }} ({{
                                pobj.executed.percentage
                              }}%)
                            </td>
                            <td class="rTableTd ">{{ pobj.quality }}%</td>
                            <td class="rTableTd ">
                              {{ pobj.pending.count }} ({{
                                pobj.pending.percentage
                              }}%)
                            </td>

                            <td class="rTableTd ">
                              {{ pobj.passed.count }} ({{
                                pobj.passed.percentage
                              }}%)
                            </td>
                            <td class="rTableTd ">
                              {{ pobj.passx.count }} ({{
                                pobj.passx.percentage
                              }}%)
                            </td>
                            <td class="rTableTd ">
                              {{ pobj.failed.count }} ({{
                                pobj.failed.percentage
                              }}%)
                            </td>
                            <td class="rTableTd ">
                              {{ pobj.dropped.count }} ({{
                                pobj.dropped.percentage
                              }}%)
                            </td>
                            <td class="rTableTd ">
                              {{ pobj.blocked.count }} ({{
                                pobj.blocked.percentage
                              }}%)
                            </td>
                          </tr>
                        </template>
                      </template>
                    </template>
                  </table>
                </td>
              </tr>
            </table>

             <table class="execTable table table--highlight secondaryTable">
              <tr>
                <td class="bg-primary tableHeading" colspan="100%">
                  <span style="align:center"> Caveat List</span>
                  <span
                    class="icon-download icon-small interaction"
                    style="float:right"
                    v-on:click="downloadTable('caveatsTable')"
                  ></span>
                </td>
              </tr>
               <tr>
                <td class="uTableTd" colspan="18">
                  <div class="allTriggerMatrix row">
                    <div class="caveatsTable" style="width:100%">
                      <table
                        id="caveatsTable"
                        class="table table--highlight secondaryTable"
                        style="width:100%"
                      >
                        <tr>
                          <th class="uTableTh" style="width:10%">DDTS ID</th>
                          <th class="uTableTh" style="width:40%">Headline</th>
                          <th class="uTableTh" style="width:20%">Component</th>
                          <th class="uTableTh" style="width:20%">Product</th>
                          <th class="uTableTh" style="width:10%">State</th>
                         </tr>
                          <template
                          v-for="(cObj, index) in caveatList"
                        >
                          <tr :key="index">
                            <td class="uTableTd">{{ cObj.defect_id }}</td>
                            <td class="uTableTd">{{ cObj.headline }}</td>
                            <td class="uTableTd">{{ cObj.component }}</td>
                            <td class="uTableTd">{{ cObj.product }}</td>
                            <td class="uTableTd">{{ cObj.status }}</td>
                          </tr>

                          </template>

                        </table>
                    </div>
                  </div>
                        </td>
               </tr>
              </table>

            <table class="execTable table table--highlight secondaryTable">
              <tr>
                <td class="bg-primary tableHeading" colspan="100%">
                  <span style="align:center"> Trigger Matrix </span>
                  <span
                    class="icon-download icon-small interaction"
                    style="float:right"
                    v-on:click="downloadTable('tMatrixTable')"
                  ></span>
                </td>
              </tr>
              <tr>
                <td class="uTableTd" colspan="18">
                  <div class="allTriggerMatrix row">
                    <div class="tGradeMatrixTable" style="width:100%">
                      <table
                        id="tMatrixTable"
                        class="table table--highlight secondaryTable"
                        style="width:100%"
                      >
                        <tr>
                          <th class="uTableTh" style="width:15%">Trigger</th>
                          <th class="uTableTh" style="width:10%">Platform</th>
                          <th class="uTableTh" style="width:10%">PID</th>
                          <th class="uTableTh" style="width:10%">Planned</th>
                          <th class="uTableTh" style="width:10%">Actual</th>
                          <th class="uTableTh" style="width:40%">Defects</th>
                        </tr>
                        <template
                          v-for="(tObj, index) in triggerMatrixTotalData"
                        >
                          <tr :key="index">
                            <td>{{ tObj.trigger }}</td>
                            <td>{{ tObj.platform }}</td>
                            <td>{{ tObj.pid }}</td>
                            <td>{{ tObj.planned }}</td>
                            <td>{{ tObj.actual }}</td>
                            <td>{{ tObj.defects }}</td>
                          </tr>
                        </template>
                      </table>
                    </div>
                    <div class="defectsHeatMap" style="width:100%">
                      <chart
                        disbleExport="false"
                        v-on:child="onChildInteraction"
                        id="heatChart3"
                        :option="triggerHeatMapOptions"
                      ></chart>
                    </div>
                  </div>
                </td>
              </tr>
            </table>

            <table class="execTable table table--highlight secondaryTable">
              <tr>
                <td class="bg-primary tableHeading" colspan="100%">
                  <span style="align:center"> Upgrade Matrix </span>
                  <span
                    class="icon-download icon-small interaction"
                    style="float:right"
                    v-on:click="downloadTable('tUpgradeTable')"
                  ></span>
                </td>
              </tr>
              <tr>
                <td class="uTableTd" colspan="18">
                  <div class="allUpgradeMatrix row">
                    <div class="tGradeMatrixTable" style="width:100%">
                      <table
                        id="tUpgradeTable"
                        class="table table--highlight secondaryTable"
                        style="width:100%"
                      >
                        <tr>
                          <th class="uTableTh" style="width:10%">Platform</th>
                          <th class="uTableTh" style="width:10%">PID</th>
                          <th class="uTableTh" style="width:10%">Rel From</th>
                          <th class="uTableTh" style="width:10%">Rel To</th>
                          <th class="uTableTh" style="width:10%">Method</th>
                          <th class="uTableTh" style="width:10%">Total</th>
                          <th class="uTableTh" style="width:10%">Passed</th>
                          <th class="uTableTh" style="width:10%">Failed</th>
                          <th class="uTableTh" style="width:20%">Defects</th>
                        </tr>
                        <template
                          v-for="(tObj, index) in upgradeMatrixTotalData"
                        >
                          <tr :key="index">
                            <td>{{ tObj.platform }}</td>
                            <td>{{ tObj.pid }}</td>
                            <td>{{ tObj.release_from }}</td>
                            <td>{{ tObj.release_to }}</td>
                            <td>{{ tObj.method }}</td>
                            <td>
                              {{
                                parseInt(tObj.Passed) + parseInt(tObj.failed)
                              }}
                            </td>
                            <td>{{ tObj.Passed }}</td>
                            <td>{{ tObj.failed }}</td>
                            <td>{{ tObj.defects }}</td>
                          </tr>
                        </template>
                      </table>
                    </div>
                    <div class="defectsHeatMap" style="width:100%">
                      <chart
                        disbleExport="false"
                        v-on:child="onChildInteraction"
                        id="heatChart4"
                        :option="upgradeHeatMapOptions"
                      ></chart>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
