<script>
import Vue from "vue";
import { Tabs, Tab } from "vue-tabs-component";
//import emailjs from '@emailjs/browser';
import GanttChart from "./GanttChart";
import Chart from "./Chart";
import Canvg from "canvg";
import { testcaseService } from "@/core/services/testcaseService";

export default {
  name: "MailSamplePage",
  props: ["releases", "ganttOptions"],
  components: {
    GanttChart,
    Chart,
    tabs: Tabs,
    tab: Tab,
  },
  mounted() {
    debugger;
    this.loadInit();
  },
  watch: {
    selectedCustomers: function(selectedCustomers) {
      if (selectedCustomers.length > 1) {
        this.selectedCustomers.splice(0, 1);
      }
      if (selectedCustomers.length > 0) {
        this.showReleases = true;
        this.releasesArray = this.custReleases[selectedCustomers[0]];
      } else {
        this.selectedReleases = [];
        this.showReleases = false;
      }
    },
    selectedProjects: function(selectedProjects) {
      if (selectedProjects.length > 0) {
        this.selectedAllProjects = [];
        this.showProjectData = true;
        this.tabLabels = selectedProjects;
        this.loadPageDetails(selectedProjects);
      }
    },
    selectedAllProjects: function(selectedAllProjects) {
      if (selectedAllProjects.length > 0) {
        this.selectedProjects = [];
        this.showProjectData = false;
        this.tabLabels = [];
        for (let i = 0; i < this.selectedCustomers.length; i++) {
          for (let j = 0; j < this.selectedReleases.length; j++) {
            this.tabLabels.push(
              this.selectedCustomers[i] + "_" + this.selectedReleases[j]
            );
          }
        }
        this.loadPageDetails(this.tabLabels);
      }
    },
    selectedReleases: function(selectedReleases) {
      if (selectedReleases.length > 0) {
        let prs = [];
        this.selectedAllProjects = ["All"];
        for (let h = 0; h < this.releases.length; h++) {
          for (let s = 0; s < selectedReleases.length; s++) {
            if (this.releases[h].folder_name === selectedReleases[s]) {
              prs.push(this.releases[h].name);
              this.projectidForname[this.releases[h].name] = this.releases[
                h
              ].id;
            }
          }
        }
        let tempPrs = [...new Set(prs)];
        this.projectsArray = tempPrs;
        this.showProjects = true;
        this.showMailContent = true;
        this.toNames = "";
        this.ccNames = "";
        this.tabLabels = [];
        for (let i = 0; i < this.selectedCustomers.length; i++) {
          for (let j = 0; j < selectedReleases.length; j++) {
            this.tabLabels.push(
              this.selectedCustomers[i] + "_" + selectedReleases[j]
            );
          }
        }
        this.loadPageDetails(this.tabLabels);
      } else {
        this.showProjects = false;
        this.selectedProjects = [];
      }
    },
    execProjects1: {
      deep: true,
      handler: function(execProjects) {
        this.execProjects = execProjects;
      },
    },
  },
  data() {
    return {
      bgColors: ["#ACDDDE", "#FEF8DD", "#E1F8DC", "#F7D8BA"],
      showProjectData: false,
      projectidForname: {},
      selectedAllProjects: [],
      customers: [],
      toNames: "",
      ccNames: "",
      showErrorModal: false,
      modalErrorMessage: "",
      showImage: false,
      showProjects: false,
      selectedTab: "",
      selectedReleases: [],
      receivers: [],
      custReleases: {},
      splineOptions: {},
      cvtOptions: {},
      tabLabels: [],
      releasesArray: [],
      selectedCustomers: [],
      projectsArray: [],
      selectedProjects: [],
      tableArray: {},
      tableData: {},
      cacheTableData: {},
      weeklyReports: [],
      execSummaryDetails: [],
      showReleases: false,
      showMailContent: false,
      execCustomer: {},
      execProjects: {},
      execFolders: {},
      colorscheme: "default-scheme",
      chartsList: {},
      colors: [
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
    };
  },
  methods: {
    emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
    closeErrorModal() {
      this.modalErrorMessage = "";
      this.showErrorModal = false;
    },
    onChildInteraction(args, payload) {},
    getGanttOptions() {
      return {
        chart: {
          backgroundColor: null,
          spacingLeft: 10,
          spacingBottom: 20,
          spacingTop: 20,
          events: {
            load: (e) => {},
          },
        },
        title: {
          text: "Project Plan",
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
            tickInterval: 1000 * 60 * 60 * 24 * 7,
            fill: "blue",
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
            fill: "green",
          },
        ],
        tooltip: {
          xDateFormat: "%a %b %d",
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
              dragPrecisionX: this.day / 3, // Snap to eight hours
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
              // format: '{point.name} {point.completed.amount} %',
              formatter: function() {
                if (this.point.completed) {
                  let val = parseInt(this.point.completed.amount * 100);
                  return this.point.name + " " + val + "%";
                } else {
                  return this.point.name;
                }
              },
              text: {
                style: {
                  color: "#fff !important",
                  fill: "#fff !important",
                },
              },
            },
            allowPointSelect: true,
            point: {},
          },
        },
        series: [],
      };
    },
    getCVTOptions() {
      return {
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
              color: this.colors[2],
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
      };
    },
    getSplineOptions() {
      return {
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
      };
    },

    SVG2PNG(svg, fname, len, resolve, reject) {
      let self = this;
      var svgData = new XMLSerializer().serializeToString(svg);
      var canvas = document.createElement("canvas");
      var svgSize = svg.getBoundingClientRect();
      canvas.width = svgSize.width * 3;
      canvas.height = svgSize.height * 3;
      canvas.style.width = svgSize.width;
      canvas.style.height = svgSize.height;
      var ctx = canvas.getContext("2d");
      ctx.scale(3, 3);
      var img = document.createElement("img");
      img.setAttribute(
        "src",
        "data:image/svg+xml;base64," +
          btoa(unescape(encodeURIComponent(svgData)))
      );
      img.onload = function() {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(function(blob) {
          // get content as JPEG blob
          self.chartsList[fname] = blob;
          let k = Object.keys(self.chartsList).length;
          if (k === len) {
            resolve("OK");
          }
          /*  var a = document.createElement("a");
       document.body.appendChild(a);
       var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download =fname;
        a.click();*/
        }, "image/png");
      };
    },

    download(canvas, filename) {
      var img_b64 = canvas.toDataURL("image/png");
      var bl = this.dataURItoBlob(img_b64);
      console.log(bl);
      // img = document.createElement("img");
      img.src = URL.createObjectURL(blob);
    },

    generateLink(fileName, data) {
      var link = document.createElement("a");
      link.download = fileName;
      link.href = data;
      return link;
    },
    dataURItoBlob(dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(",")[0].indexOf("base64") >= 0)
        byteString = atob(dataURI.split(",")[1]);
      else byteString = unescape(dataURI.split(",")[1]);

      // separate out the mime component
      var mimeString = dataURI
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];

      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], { type: mimeString });
    },
    loadInit() {
      let releases = this.releases;
      this.customers = [];
      this.custReleases = {};
      let tempArr = [],
        tempObj = {};
      for (let k = 0; k < releases.length; k++) {
        if (tempArr.indexOf(releases[k].customerName) > -1) {
          if (
            tempObj[releases[k].customerName].indexOf(releases[k].folder_name) <
            0
          )
            tempObj[releases[k].customerName].push(releases[k].folder_name);
        } else {
          tempArr.push(releases[k].customerName);
          tempObj[releases[k].customerName] = [];
          if (
            tempObj[releases[k].customerName].indexOf(releases[k].folder_name) <
            0
          )
            tempObj[releases[k].customerName].push(releases[k].folder_name);
        }
      }
      this.customers = tempArr;
      this.custReleases = tempObj;
    },
    tabClicked() {
      debugger;
      let label = event.currentTarget;
    },
    closeMailSample() {
      this.emitToParent("closeMailSample");
    },
    loadChartImagesForMail(resolve, reject) {
      let self = this;
      self.chartsList = {};
      let URL = window.URL || window.webkitURL || window;
      var svgTags = document.querySelectorAll("#mail-content svg");
      var k = svgTags.length;
      for (var i = 0; i < svgTags.length; i++) {
        debugger;
        let temp = svgTags[i].parentElement.parentElement.id;
        let fname = temp;
        let element = svgTags[i];
        self.SVG2PNG(element, fname, k, resolve, reject);
        /*img.then(function(){
           canvas.toBlob((blob) => {
                 k-=1;
                let file = new File([blob], fname, { type: "image/png" });
                self.chartsList[fname]=file;
                 if(k===0){
                   resolve("OK");
                  }
              }, 'image/png');
         },
         (error)=>{
           debugger;
         });*/
      }
    },
    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email));
    },
    validate(emails) {
      if (emails === "") {
        return true;
      } else {
        emails = emails.split(/[;,]/).map((x) => x.trim().toLocaleLowerCase());
        if (emails.length !== new Set(emails).size) return false;
        return emails.every(this.validateEmail);
      }
    },
    sendMail() {
      let self = this;
      if (
        this.toNames != "" &&
        this.validate(this.toNames) &&
        this.validate(this.ccNames)
      ) {
        const promise1 = new Promise((resolve, reject) => {
          self.loadChartImagesForMail(resolve, reject);
        });
        promise1.then(function() {
          fetch("/TestbedManger/css/mail.css")
            .then((response) => response.text())
            .then((data) => {
              let htmlFirstTags =
                '<html class="cui" lang="en"><head><meta charset="utf-8"><meta name="language" content="en"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><style>';
              let htmlFirstTags1 =
                '</style><script> window.onload = function() { document.getElementById("testing").innerHTML="testing email code" }<\/script></head><body style="font:600 13px ui-sans-serif !important;background: #ffffff !important;">';
              let htmlEndTags = "</body></html>";

              let mainDiv = document
                .getElementById("mail-content")
                .cloneNode(true);

              var svgTags = mainDiv.querySelectorAll("svg");
              for (let i = 0; i < svgTags.length; i++) {
                let temp = svgTags[i].parentElement.parentElement.id;
                let fname = temp;
                let elem = mainDiv.querySelector("#" + temp);
                let img = document.createElement("img");
                img.src = fname + ".png";
                img.setAttribute("style", "width:100%;height:360px;");
                elem.replaceWith(img);
              }
              //let tempArr=divCtnt.querySelectorAll('')
              let divCtnt = mainDiv.innerHTML;
              let divContent = divCtnt.replaceAll("&lt;br&gt;", "<br>");

              let htmlContent =
                htmlFirstTags +
                data +
                htmlFirstTags1 +
                divContent +
                htmlEndTags;

              let bl = new Blob([htmlContent], { type: "text/plain" });
              var form_data = new FormData();
              form_data.append("htmlfile", bl);

              let chartnames = Object.keys(self.chartsList);
              if (chartnames.length > 0) {
                for (let m = 0; m < chartnames.length; m++) {
                  let chname = chartnames[m].split(".")[0];
                  form_data.append(chname, self.chartsList[chartnames[m]]);
                }
              }
              form_data.append(
                "emailIds",
                JSON.stringify({ toNames: self.toNames, ccNames: self.ccNames })
              );
              testcaseService.exportMail(form_data).then(
                (data) => {
                  debugger;
                  console.log("sent success");
                },
                (error) => {
                  console.log("error------");
                }
              );
            });
        });
      } else {
        this.showErrorModal = true;
        this.modalErrorMessage = "Invalid email id";
      }
    },
    loadPageDetails(tabLabels) {
      let self = this;
      self.weeklyReportArr = {};
      self.weeklyDataArr = {};
      self.tableArray = {};
      for (let s = 0; s < tabLabels.length; s++) {
        if (this.showProjectData === false) {
          let temp = tabLabels[s].split("_");
          let custName = temp[0];
          let folderName = temp[1];
          if (
            Object.keys(self.tableArray).indexOf(tabLabels[s]) < 0 ||
            self.tableArray[tabLabels[s]].length === 0
          ) {
            testcaseService
              .getWeeklyReportByCustomer(folderName, custName)
              .then(
                (data) => {
                  self.loading = false;
                  self.loadingMessage = "";
                  self.weeklyReportArr[tabLabels[s]] = data;
                  self.loadExecTable(tabLabels[s], [...data]);
                  self.loadWeeklyReportDetails(tabLabels[s], [...data]);
                },
                (error) => {
                  self.loading = false;
                  self.loadingMessage = "";
                  self.showErrorModal = true;
                  self.modalErrorMessage =
                    "Error while loading Weekly Report, Please try again later";
                }
              );
          }

          //for exec data
          if (Object.keys(self.execCustomer).indexOf(tabLabels[s]) < 0) {
            let id = folderName + "," + custName;
            testcaseService.loadExecDetails("customer", id).then(
              (data) => {
                self.loading = false;
                self.loadingMessage = "";
                self.weeklyDataArr[tabLabels[s]] = data;
                self.loadExecutionSummaryDetails(tabLabels[s], { ...data });
                document
                  .querySelector(".custTabs")
                  .querySelector(".tabs-component-tab-a")
                  .click();
              },
              (error) => {
                self.loading = false;
                self.loadingMessage = "";
                self.showErrorModal = true;
                self.modalErrorMessage =
                  "Error while loading Weekly Report, Please try again later";
              }
            );
          }
        } else {
          if (
            Object.keys(self.tableArray).indexOf(tabLabels[s]) < 0 ||
            self.tableArray[tabLabels[s]].length === 0
          ) {
            let relid = self.projectidForname[tabLabels[s]];
            testcaseService.getWeeklyReportByReleaseId(relid).then(
              (data) => {
                self.loading = false;
                self.loadingMessage = "";
                self.weeklyReportArr[tabLabels[s]] = data;
                self.loadExecTable(tabLabels[s], [...data]);
                self.loadWeeklyReportDetails(tabLabels[s], [...data]);
              },
              (error) => {
                self.loading = false;
                self.loadingMessage = "";
                self.showErrorModal = true;
                self.modalErrorMessage =
                  "Error while loading Weekly Report, Please try again later";
              }
            );
          }
          //for exec data
          /*     if(Object.keys(self.execCustomer).indexOf(tabLabels[s])<0 ){
        let id=folderName+","+custName;
        testcaseService.loadExecDetails("customer",id).then(
          (data) => {
            self.loading = false;
            self.loadingMessage = "";
            self.weeklyDataArr[tabLabels[s]]=data;
            self.loadExecutionSummaryDetails(tabLabels[s],{...data});
            document.querySelector('.custTabs').querySelector('.tabs-component-tab-a').click();
           },
          (error) => {
            self.loading = false;
            self.loadingMessage = "";
            self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while loading Weekly Report, Please try again later";
          }
        );  
       }*/
        }
      }
    },

    loadExecutionSummaryDetails(label, data) {
      let self = this;
      let obj = {},
        fname = "",
        tmp = {},
        temp = {},
        tmpProject = {},
        folders = [];
      let data1 = {};
      let execProjects = {};
      let execCustomer = [];
      let execFolders = {};
      let key = Object.keys(data)[0];
      let t1 = data[key].summary;
      t1["name"] = key;
      execCustomer.push(t1);
      execProjects[key] = [];
      let projects = Object.keys(data[key]);
      for (let k = 0; k < projects.length; k++) {
        if (projects[k] !== "summary") {
          tmp = {};
          tmp = data[key][projects[k]].summary;
          tmp["name"] = projects[k];
          execProjects[key].push(tmp);
          tmpProject = {};
          tmpProject = data[key][projects[k]];
          folders = [];
          folders = Object.keys(tmpProject);
          execFolders[projects[k]] = [];
          for (let f = 0; f < folders.length; f++) {
            if (folders[f] !== "summary") {
              temp = {};
              temp = tmpProject[folders[f]];
              temp["name"] = folders[f];
              execFolders[projects[k]].push(temp);
            }
          }
        }
      }
      Vue.set(self.execProjects, label, execProjects);
      Vue.set(self.execCustomer, label, execCustomer);
      Vue.set(self.execFolders, label, execFolders);
    },
    loadWeeklyReportDetails(label, data) {
      let self = this;
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
      self.cvtOptions[label] = JSON.parse(JSON.stringify(self.getCVTOptions()));
      self.splineOptions[label] = JSON.parse(
        JSON.stringify(self.getSplineOptions())
      );
      self.cvtOptions[label].xAxis.categories = categories;
      self.cvtOptions[label].series = weeklyReportData;
      self.splineOptions[label].xAxis.categories = categories;
      self.splineOptions[label].series = weeklyReportData1;
    },
    loadExecTable(label, data) {
      let arr = [],
        categoryObj = {};
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

        let total = pending + executed;
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
          executed > 0 ? ((passed / executed) * 100).toFixed(2) : 0;
        categoryObj["projectedQuality"] =
          executed > 0 ? ((passed / executed) * 100).toFixed(2) : 0;
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
        arr.push(categoryObj);
        Vue.set(this.tableArray, label, arr);
      }
    },
  },
};
</script>
<template>
  <div id="mail-content-wrapper">
    <div
      class="modal__header"
      style="display:flex; justify-content:space-between; margin-bottom:5px;"
    >
      <div class="modal_title">Mail Sample</div>
      <span
        class="icon-close icon-small interaction"
        v-on:click="closeMailSample()"
      ></span>
    </div>
    <div class="modal__body" style="display:flex; justify-content:center;">
      <div style="width:100%">
        <div
          class="sendButton"
          style="width:100%;text-align: right;margin-bottom: 20px;"
        >
          <button class="btn btn--primary" @click="sendMail">send</button>
        </div>
        <img
          v-show="showImage"
          id="image"
          src=""
          style="height:400px;width:800px"
        />
        <div class="mailMainWrapper" style="width: 100%;">
          <div class=" row selectionWindow">
            <div class="selectCustomerWrapper" style="width: 40%;margin: 20px;">
              <div style="100%">
                <label
                  class="tm-label"
                  for="selectedCustomers"
                  style="width=100%"
                >
                  Pick Customer
                </label>
              </div>
              <div style="display:flex">
                <template v-for="(cust, index) in customers">
                  <div :key="index" style="margin-left:20px; display:flex;">
                    <input
                      type="checkbox"
                      name="selectedCustomers"
                      v-model="selectedCustomers"
                      :value="cust"
                      class="form-check-input tchk"
                    />
                    <label class="form-check-label">{{ cust }}</label>
                  </div>
                </template>
              </div>
            </div>
            <div
              v-if="showReleases"
              class="selectReleaseWrapper"
              style="width: 55%;margin: 20px;"
            >
              <div style="100%">
                <label
                  class="tm-label"
                  for="selectedReleases"
                  style="width=100%"
                >
                  Pick Release
                </label>
              </div>
              <div style="display:flex">
                <template v-for="(rel, index) in releasesArray">
                  <div :key="index" style="margin-left:20px;">
                    <input
                      type="checkbox"
                      name="selectedReleases"
                      v-model="selectedReleases"
                      :value="rel"
                      class="form-check-input tchk"
                    />
                    <label class="form-check-label">{{ rel }}</label>
                  </div>
                </template>
              </div>
            </div>
            <div
              v-if="showProjects"
              class="selectProjectWrapper"
              style="width: 97%;margin: 20px;"
            >
              <div style="100%">
                <label
                  class="tm-label"
                  for="selectedProjects"
                  style="width=100%"
                >
                  Pick Project
                </label>
              </div>
              <div style="display:flex;flex-wrap: wrap;">
                <div style="margin-left:20px;">
                  <input
                    type="checkbox"
                    name="selectedAllProjects"
                    v-model="selectedAllProjects"
                    value="All"
                    class="form-check-input tchk"
                  />
                  <label class="form-check-label" style="margin-right:10px;"
                    >All</label
                  >
                  <template v-for="(pr, indexk) in projectsArray">
                    <input
                      :key="indexk"
                      type="checkbox"
                      name="selectedProjects"
                      v-model="selectedProjects"
                      :value="pr"
                      class="form-check-input tchk"
                    />
                    <label
                      :key="indexk"
                      class="form-check-label"
                      style="margin-right:10px;"
                      >{{ pr }}</label
                    >
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div class=" row selectionWindow" v-show="showMailContent">
            <div
              class="form-group__text tm-form__text toNames"
              style="width:100%;"
            >
              <label
                class="tm-label"
                style="margin-right: 30px;margin-bottom: 20px;"
              >
                To
              </label>
              <input
                type="text"
                name="toNames"
                v-model="toNames"
                style="width: 90%;line-height: 1.8em;"
              />
            </div>
            <div
              class="form-group__text tm-form__text ccNames"
              style="width:100%;"
            >
              <label
                class="tm-label"
                style="margin-right: 30px;margin-bottom: 20px;"
              >
                Cc
              </label>
              <input
                type="text"
                name="ccNames"
                v-model="ccNames"
                style="width: 90%;line-height: 1.8em;"
              />
            </div>
          </div>
          <div
            id="mail-content"
            v-show="showMailContent"
            class="mailWrapper"
            style="width:100%"
          >
            <div class="tabsContainer custTabs">
              <template v-for="(tabname, ind) in tabLabels">
                <div
                  :id="tabname"
                  :key="ind"
                  :style="
                    'background:' +
                      bgColors[ind] +
                      ' !important;margin-bottom:30px'
                  "
                  :name="tabname"
                  :ref="tabname"
                >
                  <div
                    class="chartsContainer"
                    width="700"
                    style="border:2px solid #508398;"
                  >
                    <div class="firstChart" width="700">
                      <GanttChart
                        disbleExport="true"
                        v-on:child="onChildInteraction"
                        style="height:400px;width:100%;"
                        :id="'chart_gantt_' + tabname"
                        class="timeLineChart"
                        :colorscheme="colorscheme"
                        :option="ganttOptions"
                      ></GanttChart>
                    </div>
                    <div
                      id="testing"
                      class="execTitle"
                      style="text-align:center;font-size:16px;font-weight:600;background:#508398; color: #000;font-weight: 600;line-height: 40px;"
                    >
                      Execution Trend
                    </div>
                    <div>
                      <table class="execCharts" width="700" style="width:700">
                        <tr>
                          <td
                            class="secondChart"
                            width="350"
                            style="padding: 10px;"
                          >
                            <!--img style="height:300px;width:100%; border:1 px solid #c1c1c1;"
      src="chart2.png"/-->
                            <Chart
                              disbleExport="true"
                              :colorscheme="colorscheme"
                              class="execSummaryChart"
                              v-on:child="onChildInteraction"
                              style="height:400px;"
                              :id="'chart_spline_' + tabname"
                              :option="splineOptions[tabname]"
                            ></Chart>
                          </td>
                          <td
                            class="thirdChart"
                            width="350"
                            style="padding: 10px;"
                          >
                            <!--img style="height:300px;width:100%; border:1 px solid #c1c1c1"
      src="chart3.png"/-->
                            <Chart
                              disbleExport="true"
                              :colorscheme="colorscheme"
                              class="cdetsChart"
                              v-on:child="onChildInteraction"
                              style="height:400px;"
                              :id="'chart_cvt_' + tabname"
                              :option="cvtOptions[tabname]"
                            ></Chart>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div
                      class="execTitle"
                      width="700"
                      style="text-align:center;font-size:16px;font-weight:600;background:#508398;color: #000;font-weight: 600;line-height: 40px;"
                    >
                      Overall Summary
                    </div>
                    <div
                      class="summaryIssuesWrapper"
                      style="width:100%;padding:15px;display: flex;"
                    >
                      <div
                        class="heighlightWrapper"
                        style="margin:10px;border:1px solid #ddd;"
                      >
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          width="700"
                          align="center"
                          border="1"
                        >
                          <tr>
                            <td
                              class="execTitle"
                              width="350"
                              style="text-align:center;font-size:14px;font-weight:600;background:#96ebab;color:#000;line-height: 30px;"
                            >
                              Highlights
                            </td>
                            <td
                              class="execTitle"
                              width="350"
                              style="text-align:center;font-size:14px;font-weight:600;background:#ebcd96;color:#000;line-height: 30px;"
                            >
                              Lowlights
                            </td>
                          </tr>

                          <tr>
                            <td width="350" class="highlightContent">
                              <ul>
                                <li>CVT exit done for ASR9k profile</li>
                                <li>Delivered EFT code to Google</li>
                              </ul>
                            </td>
                            <td width="350">
                              <ul>
                                <li>GUE feature not ready</li>
                                <li>MPLS VPN completely broken</li>
                                <li>Pending new hardware</li>
                              </ul>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <div class="weeklyReport" width="700" style="padding:15px">
                      <div
                        class="subTitle"
                        style="text-aligh:left;font-size:16px;font-weight:600;color:#508398;text-align: left;padding-bottom: 10px;line-height: 40px;color: #000;"
                      >
                        Weekly Trend
                      </div>
                      <div class="weeklyreportTable">
                        <table
                          :id="'execRelTable1_' + tabname"
                          class="execRelTable table table--highlight secondaryTable"
                          cellpadding="0"
                          cellspacing="0"
                          width="700"
                          align="center"
                          border="1"
                        >
                          <tr>
                            <th class="uTableTh" width="30">Week</th>
                            <th class="uTableTh" width="40">Date</th>
                            <th class="uTableTh" width="40">Image</th>
                            <th class="uTableTh" width="40">Planned</th>
                            <th class="uTableTh" width="40">Executed</th>
                            <th class="uTableTh" width="40">Pending</th>
                            <th class="uTableTh" width="40">Pass</th>
                            <th class="uTableTh" width="40">Fail</th>
                            <th class="uTableTh" width="40">Quality</th>
                            <th class="uTableTh" width="50">
                              Projected Quality
                            </th>
                            <th class="uTableTh" width="50">
                              Pending Enablement
                            </th>
                            <th class="uTableTh" width="80">CVT Raised</th>
                            <th class="uTableTh" width="90">Total</th>
                            <th class="uTableTh" width="80">Open MH</th>
                          </tr>
                          <template v-for="(tObj, ik) in tableArray[tabname]">
                            <tr :key="ik + '_' + ind">
                              <td class="uTableTd" width="30">
                                {{ tObj.weekNumber }}
                              </td>
                              <td class="uTableTd" width="40">
                                {{ tObj.weekDates }}
                              </td>
                              <td class="uTableTd" width="40">
                                {{ tObj.software_version }}
                              </td>
                              <td class="uTableTd" width="40">
                                {{ tObj.plannedCount }}
                              </td>
                              <td class="uTableTd" width="40">
                                {{ tObj.executedCount }}
                              </td>
                              <td class="uTableTd" width="40">
                                {{ tObj.pendingCount }}
                              </td>
                              <td class="uTableTd" width="40">
                                {{ tObj.passedCount }}
                              </td>
                              <td class="uTableTd" width="40">
                                {{ tObj.failedCount }}
                              </td>
                              <td class="uTableTd" width="40">
                                {{ tObj.quality }}
                              </td>
                              <td class="uTableTd" width="50">
                                {{ tObj.projectedQuality }}
                              </td>
                              <td class="uTableTd" width="50">
                                {{ tObj.pendingEnablement }}
                              </td>
                              <td class="uTableTd" width="80">
                                {{ tObj.cvtFound }}
                              </td>
                              <td class="uTableTd" width="90">
                                {{ tObj.cvtTotal }}
                              </td>
                              <td class="uTableTd" width="80">
                                {{ tObj.mhHave }}
                              </td>
                            </tr>
                          </template>
                        </table>
                      </div>
                      <div
                        class="subTitle"
                        style="text-aligh:left;font-size:16px;font-weight:600;color:#508398;text-align: left;padding-bottom: 10px;"
                      >
                        Execution Summary
                      </div>
                      <div class="weeklyreportTable">
                        <table
                          :id="'execRelTable2_' + tabname"
                          class="execRelTable table table--highlight secondaryTable"
                          cellpadding="0"
                          cellspacing="0"
                          width="700"
                          align="center"
                          border="1"
                        >
                          <tr>
                            <th class="rTableTh ">Folders</th>
                            <th class="rTableTh ">
                              <span class="dot executedDot"></span>Executed
                            </th>
                            <th class="rTableTh ">
                              <span class="dot pendingDot"></span>Pending
                            </th>
                            <th class="rTableTh ">
                              <span class="dot blockedDot"></span>Blocked
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
                            <th class="rTableTh ">Total</th>
                          </tr>
                          <template
                            v-for="(cobj, icf) in execCustomer[tabname]"
                          >
                            <tr :key="icf + '_cft_' + ind">
                              <th class="rTableTh projectTh">
                                <span class="foldericon"
                                  ><i class="icon icon-folder"></i></span
                                ><span class="projName">{{ cobj.name }}</span>
                              </th>
                              <td class="rTableTd ">
                                {{ cobj.executed.count }}({{
                                  cobj.executed.percentage
                                }}%)
                              </td>
                              <td class="rTableTd ">
                                {{ cobj.pending.count }}({{
                                  cobj.pending.percentage
                                }}%)
                              </td>
                              <td class="rTableTd ">
                                {{ cobj.blocked.count }}({{
                                  cobj.blocked.percentage
                                }}%)
                              </td>
                              <td class="rTableTd ">
                                {{ cobj.passed.count }}({{
                                  cobj.passed.percentage
                                }}%)
                              </td>
                              <td class="rTableTd ">
                                {{ cobj.passx.count }}({{
                                  cobj.passx.percentage
                                }}%)
                              </td>
                              <td class="rTableTd ">
                                {{ cobj.failed.count }}({{
                                  cobj.failed.percentage
                                }}%)
                              </td>
                              <td class="rTableTd ">
                                {{ cobj.dropped.count }}({{
                                  cobj.dropped.percentage
                                }}%)
                              </td>
                              <td class="rTableTd ">{{ cobj.Total.count }}</td>
                            </tr>
                            <template
                              v-for="(sobj, ipf) in execProjects[tabname][
                                cobj.name
                              ]"
                            >
                              <tr :key="ipf + '_aft_' + ind">
                                <th class="rTableTh projectTh">
                                  <span
                                    class="foldericon"
                                    style="margin-left:10px;"
                                    ><i class="icon icon-folder"></i></span
                                  ><span class="projName">{{ sobj.name }}</span>
                                </th>
                                <td class="rTableTd ">
                                  {{ sobj.executed.count }} ({{
                                    sobj.executed.percentage
                                  }}%)
                                </td>
                                <td class="rTableTd ">
                                  {{ sobj.pending.count }} ({{
                                    sobj.pending.percentage
                                  }}%)
                                </td>
                                <td class="rTableTd ">
                                  {{ sobj.blocked.count }} ({{
                                    sobj.blocked.percentage
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
                                  {{ sobj.total.count }}
                                </td>
                              </tr>
                              <template
                                v-for="(pobj, ip) in execFolders[tabname][
                                  sobj.name
                                ]"
                              >
                                <tr :key="ip + '_abt_' + ind">
                                  <th class="rTableTh projectTd">
                                    <span
                                      class="foldericon"
                                      style="margin-left:20px;"
                                      ><i class="icon icon-folder"></i></span
                                    ><span class="projName">{{
                                      pobj.name
                                    }}</span>
                                  </th>
                                  <td class="rTableTd ">
                                    {{ pobj.executed.count }} ({{
                                      pobj.executed.percentage
                                    }}
                                    %)
                                  </td>
                                  <td class="rTableTd ">
                                    {{ pobj.pending.count }} ({{
                                      pobj.pending.percentage
                                    }}
                                    %)
                                  </td>
                                  <td class="rTableTd ">
                                    {{ pobj.blocked.count }} ({{
                                      pobj.blocked.percentage
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
                                  <td class="rTableTd ">{{ pobj.total }}</td>
                                </tr>
                              </template>
                            </template>
                          </template>
                        </table>
                      </div>
                      <div
                        class="subTitle"
                        style="text-aligh:left;font-size:16px;font-weight:600;color:#508398;text-align: left;padding-bottom: 10px;"
                      >
                        Open Must Have Defects
                      </div>
                      <div class="weeklyreportTable"></div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showErrorModal" class="ErrorModal" style="height: 130px;">
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
    </div>
  </div>
</template>
<style scoped>
.uTableTh {
  background: transparent !important;
}
.rTableTh {
  background: transparent !important;
}
.selectionWindow {
  height: fit-content;
  /* height: 400px; */
  text-align: left;
  border: 1px solid #ddd;
  padding: 30px 10px;
  font-size: 16px;
  margin-bottom: 30px;
  justify-content: left;
}
</style>
