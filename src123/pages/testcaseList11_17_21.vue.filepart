<script>
import { router } from "@/router";
import { store } from "../store/store";
import { testcaseService } from "@/core/services/testcaseService";
import { requestOptions } from "@/core/helpers/request";
import AddTestCase from "./addTestcase";
import ContextMenu from "../components/global/ContextMenu/ContextMenu";
import ContextMenuItem from "../components/global/ContextMenu/ContextMenuItem";
import TestcasesFeatureChart from "./TestcasesFeatureChart";
import Chart from "./Chart";
import ExportTablePage from "./exportTablePage.vue";
import Html2canvas from "html2canvas";
import { scaleDetails } from "../assets/scaleDetails";
import { releaseNotes } from "../assets/releaseNotes";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
const d3 = require("d3");

export default {
  name: "TestcaseList",
  props: [
    "testcaseArrayFlag",
    "testcaseArray",
    "projectId",
    "customerId",
    "customerName",
    "releaseId",
    "releaseFlag",
    "folderName",
    "syncFlag",
    "showLoading",
    "showTims",
    "timsUrl",
    "timsId",
    "gotoTestcase",
    "executionSummaryOption",
    "splineOptions",
    "qualityOption",
    "qualityPlatformOption",
    "defectOption",
    "componentOption",
    "featureOption",
    "cvtOptions",
    "qualityFeatureOption",
    "qualitySrcOption",
    "mhHaveOption",
    "roleOption",
    "platformOption",
    "srcOption",
    "statusOption",
    "submitterOption",
    "userOption",
    "testcaseDefectsByUsersOption",
    "heatMapOptions"
  ],
  data() {
    return {
      testcaseArrayList:[],
      showForm: false,
      showPassChecklist: false,
      checklistError: false,
      editForm: false,
      error: false,
      errorMessage: "",
      loading: false,
      loadingMessage: "",
      modalInfoMessage: "",
      showInfoModal: false,
      showInfoModalClass: "",
      showErrorModal: false,
      modalErrorMessage: "",
      testcases: [],
      export_testcase_list:[],
      features: [],
      expanded: "",
      featureSelected: "",
      expandedRow: "",
      formValues: {},
      bulkValues: {},
      chartImages:[],
      topologies: [],
      showImportModal: false,
      allFeatures: [],
      featureTestcases: [],
      allTestcases: [],
      selectedOtherTestcases: [],
      selectedCheckboxes: [],
      tableColumns: {
        id: true,
        title: true,
        result: true,
        feature: false,
        type: false,
        topology: false,
        DUT: false,
        role: false,
        platform: false,
        logFile: true,
        version: false,
        release: false,
        customer: false,
        executionMethod:false,
        testcaseOwner:false,
        testExecOwner:false,
        automated:false,
        smoke:false,
        defects:false,
      },
      exportColumns: {
        tc_title: true,
        tc_description: true,
        tc_feature: true,
        tc_type: false,
        tc_dut: false,
        tc_priority: false,
        tc_role: false,
        tc_regression: false,
        tc_customer: true,
        tc_tag: false,
        tc_smoke: false,
        tc_platform: false,
        tc_release: true,
        tc_version: false,
        tc_topology: false,
        tc_exectution_method: false,
        tc_result: true,
        tc_featureId: false,
        tc_testcaseOwner: false,
        tc_testExecOwner: false,
        tc_duration: false,
        tc_source: false,
        tc_procedure: false,
        tc_pass_fail_criteria: false,
        tc_logs: true,
        tc_ifd: false,
        tc_cfd: false,
        tc_defects: false,
        automation_flag:false,
        tc_with_logs:false
      },
      tempExportCharts:{
	    	executionSummary:true,
	    	weeklyExecutionSummary:true,
	    	platformRoleQuality:true,
	    	platformQuality:true,
	    	defectsBreakdown:true,
	    	defectsByComponent:true,
	    	featureChart:true,
        weeklyDefectChart:true,
        featureQuality:true,
        sourceQuality:false,
        mhDefect:false,
        roleChart:false,
        platformChart:false,
        sourceChart:false,
        defectsByStatus:false,
        defectsBySubmitter:false,
        userChart:false,
        userTestcaseDefectsChart:false,
        heatMap:false
	    },
      selectedCharts:[],
      oldResult: "",
      newResult: "",
      defaultCheckList: {
        Traffic: false,
        Telemetry: false,
        Crash_Traceback: false,
        Syslog: false,
        Background_CLIs: false,
        System_stability: false,
        Interface_flaps: false,
        Memory_leak: false,
        CPU_Hog: false,
      },
      passCheckList: {
        Traffic: false,
        Telemetry: false,
        Crash_Traceback: false,
        Syslog: false,
        Background_CLIs: false,
        System_stability: false,
        Interface_flaps: false,
        Memory_leak: false,
        CPU_Hog: false,
      },
      tempExportColumn: {},
      columnsCount: 3,
      url: requestOptions.apiUrl() + "/upload_file",
      headers: { "Content-Type": "multipart/form-data" },
      filesUploaded: [],
      lastCreatedTestcase: {},
      selectedRows: [],
      selectedTestcases: [],
      selectedImportRows: [],
      selectedImportTestcases: [],
      editTestcasemodal: false,
      topologyimage: null,
      topoImageuploaded: false,
      topoList: [],
      topologyList: [],
      releaseNote: "",
      scaleDetails: "",
      releaseNoteBackup: "",
      showEditReleaseNoteModal: false,
      headings: ["PID", "Count on 7.0.13", "Count on 7.0.14"],
      inventory: [],
      config_data: "",
      inventoryDevices: [],
      barDevicesList: {},
      showChart: false,
      barChartImg: null,
      barchartCreated: false,
      showExportMenu: false,
      showEditExport: false,
      showsummarycount: false,
      featureCountList: [],
      featureDurationList: [],
      execSummaryCountList: [],
      projectedSummaryCountList: [],
      csvDefectsCountList: [],
      totalCountList: {},
      totalCount: 0,
      showGraph: false,
      updatedResultTestcases: [],
      chartList:[
        {name:"ExecutionSummaryChart",option:"executionSummaryOption",sname:"executionSummary"},
        {name:"ExecutionSplineChart",option:"splineOptions",sname:"weeklyExecutionSummary"},
        {name:"QualityPlatformRoleChart",option:"qualityOption",sname:"platformRoleQuality"},
        {name:"QualityPlatformChart",option:"qualityPlatformOption",sname:"platformQuality"},
        {name:"DefectChart",option:"defectOption",sname:"defectsBreakdown"},
        {name:"DefectComponentChart",option:"componentOption",sname:"defectsByComponent"},
        {name:"FeatureChart",option:"featureOption",sname:"featureChart"},

         {name:"WeeklyDefectChart",option:"cvtOptions",sname:"weeklyDefectChart"},
         {name:"QualityFeatureChart",option:"qualityFeatureOption",sname:"featureQuality"},
         {name:"QualitySourceChart",option:"qualitySrcOption",sname:"sourceQuality"},
         {name:"MHDefects",option:"mhHaveOption",sname:"mhDefect"},
        {name:"RoleChart",option:"roleOption",sname:"roleChart"},
        {name:"PlatformChart",option:"platformOption",sname:"platformChart"},
         {name:"SourceChart",option:"srcOption",sname:"sourceChart"},
          {name:"DefectStatusChart",option:"statusOption",sname:"defectsByStatus"},
            {name:"DefectSubmitterChart",option:"submitterOption",sname:"defectsBySubmitter"},

       {name:"UserChart",option:"userOption",sname:"userChart"},
       {name:"UserTestcaseDefectsChart",option:"testcaseDefectsByUsersOption",sname:"userTestcaseDefectsChart"},
       {name:"ExecutionHeatMap",option:"heatMapOptions",sname:"heatMap"},
        ],
      featureDurationColors: [
        "#fe9c8f",
        "#feb2a8",
        "#fec8c1",
        "#eddd54",
        "#e3ed54",
        "#76B947",
        "#F51720",
        "#ECF87F",
        "#A49393",
        "#f0e695",
        "#005073",
        "#007dad",
        "#00bdeb",
        "#65bce4",
        "#adcbe3",
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
      execSummaryColors: ["#76B947", "#F51720", "#ECF87F", "#A49393"],
      csvDefectsColors: ["#0A7029", "#FEDE00", "#C8DF52", "#DBE8D8"],
      summaryOptions: {
        title: {
          text: "Execution Summary",
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
        colors: ["#76B947", "#F51720", "#ECF87F", "#A49393"],
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
      getColorForResult(result){
        if(result.toLowerCase()==="passed" || result.toLowerCase()==="pass" || result.toLowerCase()==="pass_x"){
          return "greenText";
        }
        else if(result.toLowerCase()==="failed" || result.toLowerCase()==="fail"){
          return "redText";
        }
        else if(result.toLowerCase()==="pending"){
          return "blueText";
        }
      },
      summaryColumnOptions: {
        title: {
          text: "Execution Summary",
        },
        type: "column",
        options3d: {
          enabled: true, //Use 3d function
          alpha: 45,
          beta: 15,
        },
        tooltip: {
          pointFormat: "{point.label}: <b>{point.total}</b>",
        },
        colors: ["#76B947", "#F51720", "#ECF87F", "#A49393"],
        plotOptions: {
          column: {
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
            type: "column",
            data: [],
          },
        ],
      },
      execSummaryOptions: {},
      projectedSummaryOptions: {},
      csvDefectsOptions: {},
      featureOptions: {},
      featureDurationOptions: {},

      splideOptions: {
        rewind: true,
        width: "100%",
        perPage: 3,
        gap: "1rem",
        perMove: 1,
        autoplay: true,
      },
    };
  },
  watch: {
   syncFlag: function(val) {
     debugger;
    //  this.loadTestCaseList();
    },
    showLoading:function(val){
      if(val){
        //this.loading=true;
        //this.loadingMessage="Loading...";
      }
      else{
       // this.loading=false;
       // this.loadingMessage="";
      }
    },
    gotoTestcase:{
      immediate: true,
    deep: true,
    handler(gotoTestcase) {
       if(document.getElementById('testcasesPage'))
       document.getElementById('testcasesPage').scrollIntoView(true);
    }
    },
  
     testcaseArray: {
    // Will fire as soon as the component is created
    immediate: true,
    deep: true,
    handler(testcaseArray) {
      // Fetch data about the movie
       this.testcaseArrayList = testcaseArray;
       this.loadtestcasedetails(this.testcaseArrayList);
      // window.location.hash = "testcasesPage";
     
    }
  },
  exportColumns:{
immediate: true,
    deep: true,
    handler(exportColumns) {
      let tc_list=[];
      if(exportColumns.tc_with_logs){
        for(let k=0;k<this.testcases.length;k++){
          if(this.testcases[k].tc_logFileName != null &&
            this.testcases[k].tc_logFileName != undefined &&
            this.testcases[k].tc_logFileName != "") {
              tc_list.push(this.testcases[k]);
            }
        }
        this.export_testcase_list=tc_list;
      }
      else{
         this.export_testcase_list=this.testcases;
      }
    }
  },
  
  },
  mounted() {
    this.loadtestcasedetails(this.testcaseArrayList);
    //this.loadTestCaseList();
    //this.loadOtherTestcases();
    //this.loadReleaseNote();
    this.loadConfigData();
    debugger;
    this.releaseNote = releaseNotes;
    this.scaleDetails = scaleDetails;
  },
  components: {
    ContextMenu,
    ContextMenuItem,
    AddTestCase,
    ExportTablePage,
    TestcasesFeatureChart,
    Chart,
    Splide,
    SplideSlide,
  },
  computed: {
    timsUpdateFlag: function() {
      if (this.updatedResultTestcases.length > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
    onChildInteraction(args, payload) {
      switch (args) {
        case "closeForm":
          this.closeAddForm();

          this.loadTestCaseList();
          break;
        case "closePassChecklist":
          this.closePassChecklist();
          break;
        case "showPassChecklist":
          this.showPassChecklist = true;
          this.checklistError = false;
          break;
      }
    },
    closeCheckListModal() {
      this.showPassChecklist = false;
      this.checklistError = false;
      let temp = Object.keys(this.passCheckList);
      for (let i = 0; i < temp.length; i++) {
        this.passCheckList[temp[i]] === false;
      }
    },
    loadConfigData() {
      let self = this;
     /* testcaseService.getConfigData(this.projectId).then(
        (data) => {
          let config_data1 = data[0].data[0].config_data;
          let config_data2 = config_data1.substring(1);
          self.config_data = config_data2.substring(
            config_data2.indexOf("\n") + 1
          );
        },
        (error) => {
          console.log("fetching config error");
        }
      );*/
    },
    editOtherTestcases(testcases){
      let self=this;
      this.allTestcases = testcases;
          let testcasefeatures = [];
          for (let i = 0; i < testcases.length; i++) {
            testcasefeatures.push(testcases[i].tc_feature);
          }
          let testcasefeatures1 = [...new Set(testcasefeatures)];

          for (let j = 0; j < testcasefeatures1.length; j++) {
            self.featureTestcases.push({
              feature: testcasefeatures1[j],
              list: [],
            });
          }
          for (let k = 0; k < testcases.length; k++) {
            for (let l = 0; l < self.featureTestcases.length; l++) {
              if (
                testcases[k].tc_feature ===
                self.featureTestcases[l].feature
              ) {
                self.featureTestcases[l].list.push(testcases[k]);
              }
            }
          }
          let tmpArr = [];
          for (let k = 0; k < self.featureTestcases.length; k++) {
            if (self.featureTestcases[k].list.length > 0) {
              tmpArr.push(self.featureTestcases[k]);
            }
          }
          self.featureTestcases = tmpArr;
    },
    loadOtherTestcases() {
      let pageNumber=1;
           let pageNumbers=0;

      this.loading = true;
      this.featureTestcases = [];
      let testcases = [];
      this.loadingMessage = "Loading testcases for import...";
      let self = this;
       let q='?\page='+pageNumber;
      testcaseService.getAllTestcases(q).then(
        (res) => {
            let data=res.data;
            testcases = data;
            let meta=res.meta;
            pageNumbers=meta.pages-1;
           if(meta.pages>1){
              for(let sh=2;sh<=meta.pages;sh++){
                 pageNumber=sh;
               q='?\page='+pageNumber;
         testcaseService.getAllTestcases(q).then(
           (res) => {    
          pageNumbers=pageNumbers-1;
            self.loading = false;
            self.loadingMessage = "";
            data=res.data;
            testcases=testcases.concat(data);
             if(pageNumbers===0){
              this.editOtherTestcases(testcases);
             }
          },
        (error) => {
          this.loading = false;
          this.loadingMessage = "";
        }
      );
        }
        }
        else{
            this.editOtherTestcases(testcases);
        }

        },
        (error) => {
          this.loading = false;
          this.loadingMessage = "";
        }
      );
    },
    createSummaryOptions(title, data, colors) {
      let summaryOptions = {};
      if (title === "Testcase Count Per Feature") {
        summaryOptions = JSON.parse(JSON.stringify(this.summaryColumnOptions));
        summaryOptions.series[0].name = "Testcase Features";
      } else {
        summaryOptions = JSON.parse(JSON.stringify(this.summaryOptions));
      }
      if (title === "CVT Found Defects Status") {
        summaryOptions.plotOptions.pie["innerSize"] = 100;
      }
      summaryOptions.title.text = title;
      summaryOptions.series[0].data = data;
      summaryOptions.colors = colors;
      return summaryOptions;
    },
    createSummaryData(arrList) {
      let arr = [],
        fe1 = [];
      for (let l = 0; l < arrList.length; l++) {
        arr = [];
        arr.push(arrList[l].name);
        arr.push(arrList[l].total);
        fe1.push(arr);
      }
      return fe1;
    },
    loadSummaryDetails() {
      let self = this;
      this.showChart = true;
       self.barchartCreated = true;
    /*  testcaseService.getInventoryData(this.projectId).then(
        (data) => {
          self.inventory = data[0].data[0].inventory;
          let devicePidList = [];
          for (let i = 0; i < self.inventory.length; i++) {
            devicePidList.push({ pid: self.inventory[i].PID });
          }
          let devicePids = [...new Set(devicePidList.map((item) => item.pid))];
          let deviceList = [];
          for (let j = 0; j < devicePids.length; j++) {
            deviceList.push({ name: "", count: 0, pid: devicePids[j] });
          }
          for (let m = 0; m < devicePids.length; m++) {
            for (let n = 0; n < self.inventory.length; n++) {
              if (devicePids[m] === self.inventory[n].PID) {
                deviceList[m].count += 1;
                deviceList[m].name = self.inventory[n].NAME;
                deviceList[m].hostname = self.inventory[n].hostname;
                deviceList[m].sn = self.inventory[n].SN;
                deviceList[m].vid = self.inventory[n].VID;
                deviceList[m].descr = self.inventory[n].DESCR;
              }
            }
          }

          self.inventoryDevices = JSON.parse(JSON.stringify(deviceList));

          for (let j = 0; j < self.inventoryDevices.length; j++) {
            let count = self.inventoryDevices[j].count;
            let random = Math.floor(Math.random() * 16) - 10;
            if (count + random > 0) {
              self.inventoryDevices[j]["count1"] = count + random;
            } else {
              self.inventoryDevices[j]["count1"] = count;
            }
          }
          self.barDevicesList["barChart1"] = self.inventoryDevices;
         
          //self.drawChart(self.inventoryDevices, "#barChart1", true, "count1");
        },
        (error) => {
          console.log("fetching inventory error");
        }
      );*/
    },
    showLogFileName(id,filename){
      let url=requestOptions.apiUrl()+"/download_logfile/"+requestOptions.getUser()+"/"+id+"/"+filename;
      return url;
    },
    showLogFiles(id,filename) {
      debugger;
      testcaseService
        .downloadLogFile(id,filename)
        .then((response) => response.text())
        .then((data) => {
          let bl = null;
          if(filename.indexOf("pdf")>=0){
            bl=new Blob([data], { type: "text/plain" });
          }
          else{
             bl=new Blob([data], { type: "application/pdf" });
          }
            
            let elm = document.createElement("a");
            elm.href = URL.createObjectURL(bl);
            elm.setAttribute("download", filename);
            elm.click();
            self.loading = false;
            self.loadingMessage = "";
          },
          (error) => {
            self.loading = false;
            self.loadingMessage = "";
            self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while exporting Testplan sheet, Please try again later";
          }
        );


    },
    closeEditModal() {
      this.bulkValues = {};
      this.editTestcasemodal = false;
    },
    saveExportForm() {
      this.showEditExport = false;
      this.exportColumns = this.tempExportColumn;
    },
    
    closeEditExportModal() {
      this.showEditExport = false;
    },
    removeSelection() {
      let rows = document.getElementsByClassName("selectedRows");
      while (rows.length > 0) {
        rows[0].classList.remove("selectedRows");
      }
    },
    rowSelect(fobj, event) {
      if (event.currentTarget.classList.contains("selectedRows")) {
        event.currentTarget.classList.remove("selectedRows");
        for (let i = 0; i < this.selectedRows.length; i++) {
          if (this.selectedRows[i] === fobj.id) {
            this.selectedRows.splice(i, 1);
            this.selectedTestcases.splice(i, 1);
          }
        }
      } else {
        event.currentTarget.classList.add("selectedRows");
        this.selectedRows.push(fobj.id);
        this.selectedTestcases.push(fobj);
      }
      this.selectedRows = [...new Set(this.selectedRows)];
    },
    importRowSelect(fobj, event) {
      if (this.selectedCheckboxes.indexOf(fobj.id) >= 0) {
        let ind = this.selectedCheckboxes.indexOf(fobj.id);
        this.selectedCheckboxes.splice(ind, 1);
      } else {
        this.selectedCheckboxes.push(fobj.id);
      }
      if (event.currentTarget.classList.contains("selectedRows")) {
        event.currentTarget.classList.remove("selectedRows");
        for (let i = 0; i < this.selectedImportRows.length; i++) {
          if (this.selectedImportRows[i] === fobj.tc_uuid) {
            this.selectedImportRows.splice(i, 1);
            this.selectedImportTestcases.splice(i, 1);
          }
        }
      } else {
        event.currentTarget.classList.add("selectedRows");
        this.selectedImportRows.push(fobj.tc_uuid);
        this.selectedImportTestcases.push(fobj);
      }
    },
    thumbUrl(file) {
      return file.myThumbUrlProperty;
    },
    viewTopologies() {
      this.$router.push({
        name: "topologySlides",
        params: { projectId: this.projectId },
      });
      return;
    },
    getColspan() {
      let keys = Object.keys(this.tableColumns);
      let count = 0;
      for (let i = 0; i < keys.length; i++) {
        if (this.tableColumns[keys[i]]) {
          count++;
        }
      }
      return count;
    },
    editExportTestcase() {
      this.showExportMenu = false;
      this.showEditExport = true;
      this.tempExportColumn = this.exportColumns;
    },
    importTestcases() {
      debugger;
      this.loading = true;
      this.loadingMessage = "Importing testcases..";
      debugger;
      let testArr = [];
      for (let i = 0; i < this.selectedImportRows.length; i++) {
        testArr.push({ tc_uuid: this.selectedImportRows[i] });
      }
      testcaseService.importTestcases(testArr,this.projectId).then(
        (data) => {
          if (data) {
            this.selectedImportRows=[];
            this.loading = false;
            this.loadingMessage = "";
            this.closeImportModal();
            this.loadTestCaseList();
          }
        },
        (error) => {
          this.loading = false;
          this.loadingMessage = "";
          this.showErrorModal = true;
          this.modalErrorMessage =
            "Error while importing Testcases, Please try again later";
        }
      );
    },
    exportExcel() {
      debugger;
      let self = this;
      this.loading = true;
      this.loadingMessage = "Exporting testplan sheet..";
      let id=this.projectId;
      if(this.releaseFlag==="release"){
        id=this.releaseId;
      }
      else if(this.releaseFlag==="project"){
        id=this.projectId;
      }
      else if(this.releaseFlag==="folder"){
        id=this.folderName;
      }
      testcaseService
        .exportExcel(this.releaseFlag,id)
        .then((response) => response.blob())
        .then(
          (bytes) => {
            let elm = document.createElement("a");
            elm.href = URL.createObjectURL(bytes);
            elm.setAttribute("download", "731_Test_plan.xlsx");
            elm.click();
            self.loading = false;
            self.loadingMessage = "";
            self.showInfoModal = true;
            self.modalInfoMessage = "Testplan sheet Downloaded successfully";
          },
          (error) => {
            self.loading = false;
            self.loadingMessage = "";
            self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while exporting Testplan sheet, Please try again later";
          }
        );
    },

    loadChartImages(pos,len,){
      let self=this;
      let options=null;
       //here
   /*   if(len-pos<1){
        let newPromise = new Promise(function(newResolve, newReject) {
          let flen=0;
         for(let k=pos;k<self.selectedCharts.length;k++){
           options={};
           flen+=1;
           let series=[];
           console.log('self.selectedCharts---'+self.selectedCharts[k].name)
           options=JSON.parse(JSON.stringify(self[self.selectedCharts[k].option]));
           if(self.selectedCharts[k].name==="QualityPlatformChart" || self.selectedCharts[k].name==="QualityPlatformRoleChart"){
            series=[];
            series.push(options.series[1]);
            options.series=series;
            options.plotOptions.column["dataLabels"]={enabled: true, format: '{point.y}%', style: { textOutline: 'transparent'}};
           if(self.selectedCharts[k].name==="QualityPlatformChart"){
              options.title.text="Platform Quality";
            }
            else{
              options.title.text="Platform Role Quality";
            }
        }
         if(self.selectedCharts[k].name==="DefectComponentChart"){
            options.chart.type="column";
         }
        var data = {
		      type: 'POST',
          options: JSON.stringify(options),
          filename: self.selectedCharts[k].name+'.png',
          type: 'image/png',
          async: true
       };
    

     var exportUrl = 'https://export.highcharts.com/'
     $.post(exportUrl, data, async function(data) {
     var imageUrl = exportUrl + data;
      await fetch(imageUrl).then(response => response.blob()).then(data => {
    	  var bl=new Blob([data], { type: "image/png" });
        self.chartImages.push(bl);
        flen=flen-1;
        if(flen===0)
        newResolve("OK");
    })
    })
    }
     });
      newPromise.then(function(){
         if(pos===len){
            myResolve("OK");
         }
       });
      }
      else{*/

        let newPromise = new Promise(function(newResolve, newReject) {
          let flen=0;
           //here
         //for(let kt=pos;kt<pos+1;kt++){
           let kt=pos;
           options={};
           flen+=1;
           let series=[];
           console.log('self.selectedCharts---'+self.selectedCharts[kt].name)
           options=JSON.parse(JSON.stringify(self[self.selectedCharts[kt].option]));
           if(self.selectedCharts[kt].name==="QualityPlatformChart" || self.selectedCharts[kt].name==="QualityPlatformRoleChart"){
            series=[];
            series.push(options.series[1]);
            options.series=series;
            options.plotOptions.column["dataLabels"]={enabled: true, format: '{point.y}%', style: { textOutline: 'transparent'}};
           if(self.selectedCharts[kt].name==="QualityPlatformChart"){
              options.title.text="Platform Quality";
            }
            else{
              options.title.text="Platform Role Quality";
            }
        }
         if(self.selectedCharts[kt].name==="DefectComponentChart"){
            options.chart.type="column";
         }
        var data = {
		      type: 'POST',
          options: JSON.stringify(options),
          filename: self.selectedCharts[kt].name+'.png',
          type: 'image/png',
          async: true
       };
    

     var exportUrl = 'https://export.highcharts.com/'
     $.post(exportUrl, data, async function(data) {
     var imageUrl = exportUrl + data;
      await fetch(imageUrl).then(response => response.blob()).then(data => {
    	  var bl=new Blob([data], { type: "image/png" });
        self.chartImages.push(bl);
        flen=flen-1;
        if(flen===0){
          if(pos>8){
          setTimeout(function(){ 
            newResolve("OK");
             }, 500);
        }
        else{ 
         newResolve("OK");
        }
        }
    })
    })
    
     });
       newPromise.then(function(){
         //here
         if(pos===len){
           return true;
         }
        self.loadChartImages(pos+1,len);
       });

     // }
    },
    exportTestCases() {
      debugger;
      this.showExportMenu = false;
        this.loading = true;
        let self = this;
        let len=0,options=null;
        let bpos=0;
          self.chartImages=[];
      this.loadingMessage = "Exporting testplan..";
      debugger;

       for(let k=0;k<self.chartList.length;k++){
          if(self.tempExportCharts[self.chartList[k].sname]){
           len=len+1;
          self.selectedCharts.push(self.chartList[k]);
          }
       }
      let myPromise = new Promise(function(myResolve, myReject) {
         self.loadChartImages(0,len);
        });


    myPromise.then(function(){
        self.selectedRows = [];
      fetch("/TestbedManger/css/test.css")
        .then((response) => response.text())
        .then((data) => {
          let scriptTag =
            "<script type='text/javascript' src='./assets/main.js'><\/script>";
          scriptTag  +='<script src="./assets/Splide/splide.js"><\/script>';
          scriptTag  +='<script src="./assets/tabs-component.css"><\/script>';
          scriptTag +='<link rel="stylesheet" href="./assets/Splide/splide.min.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">';
          let htmlFirstTags =
            '<html class="cui" lang="en"><head><meta charset="utf-8"><meta name="language" content="en"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><style>';
          let htmlMiddleTags =
            ".testCaseForm .form-group__text.tm-form__text{width:100% !important;}" +
            "</style>" +
            scriptTag +
            "</head><body style='font:600 13px ui-sans-serif !important;background: #ffffff !important;'>";
          let htmlEndTags = "</body></html>";
          let mainDiv = document
            .getElementById("export-content")
            .cloneNode(true);
        /*  let customer = mainDiv
            .getElementsByClassName("customer")[0]
            .innerText.trim();
          let release = mainDiv
            .getElementsByClassName("release")[1]
            .innerText.trim()
            .replaceAll(".", "");*/
          let zipfilename = "google" + "_" + "testing" + "_EoTR.zip";
          let divCtnt = mainDiv.innerHTML;
          let divContent1 = divCtnt.replaceAll("display: none;", "");

          let divContent = divContent1.replaceAll("&lt;br&gt;", "<br>");
          let htmlContent =
            htmlFirstTags + data + htmlMiddleTags + divContent + htmlEndTags;

          let bl = new Blob([htmlContent], { type: "text/plain" });

          var form_data = new FormData();
          form_data.append("exportFields", self.exportColumns);
          form_data.append("htmlfile", bl);
          if (self.barChartImg) {
            form_data.append("barchart", self.barChartImg);
          }
          if(self.chartImages.length>0){
            for(let m=0;m<self.chartImages.length;m++){
                form_data.append("chartImages_"+m, self.chartImages[m]);
            }
          }

            let id=self.projectId;
      if(self.releaseFlag==="release"){
        id=self.releaseId;
      }
      else if(self.releaseFlag==="project"){
        id=self.projectId;
      }
      else if(self.releaseFlag==="folder"){
        id=self.folderName;
      }

          testcaseService
            .exportTestCases(id, self.releaseFlag, form_data)
            .then((response) => response.blob())
            .then(
              (bytes) => {
                let elm = document.createElement("a");
                elm.href = URL.createObjectURL(bytes);
                elm.setAttribute("download", zipfilename);
                elm.click();
                self.loading = false;
                self.loadingMessage = "";
                self.showInfoModal = true;
                self.modalInfoMessage = "Testplan Downloaded successfully";
              },
              (error) => {
                self.loading = false;
                self.loadingMessage = "";
                self.showErrorModal = true;
                self.modalErrorMessage =
                  "Error while exporting Testcases, Please try again later";
              }
            );
         });

      });
     
     
    },
    onReleaseNoteChange(e) {
      const file = e.target.files[0];
      var form_data = new FormData();
      form_data.append("file", file);
      this.formValues["releaseNoteUrl"] = URL.createObjectURL(file);
      this.loading = true;
      this.loadingMessage = "Uploading Release Note..";
      testcaseService.uploadReleaseNote(form_data, this.projectId).then(
        (data) => {
          this.loading = false;
          this.loadingMessage = "";
          this.showInfoModal = true;
          this.modalInfoMessage = "Release Note uploaded successfully";
          this.loadReleaseNote();
        },
        (error) => {
          this.loading = false;
          this.loadingMessage = "";
          this.showErrorModal = true;
          this.modalErrorMessage =
            "Error while uploading Release Note, Please try again later";
        }
      );
    },

    getFilePath(str) {
      if (str && str != "None" && str != null) {
        let arr = [];
        let str1 = "",
          strTemp = "",
          str2 = "";
        let strList = str.split(", ");
        for (let i = 0; i < strList.length; i++) {
          if(strList[i].indexOf("detail_documents")>-1){
          str1 = strList[i].split("detail_documents/")[1];
          strTemp = str1.substring(str1.indexOf("/") + 1);
          str2 = "./" + strTemp;
          arr.push(str2);
        }
         else if(strList[i].indexOf("EXTERNAL_LOG")>-1){
          str1 = strList[i].split("EXTERNAL_LOG/")[1];
          strTemp = str1.substring(str1.indexOf("/") + 1);
          str2 = "./" + strTemp;
          arr.push(str2);
        }
        else{
           return "";
        }
       }
         return arr;
      } else {
        return "";
      }
    },
    finder(cmp, arr, attr) {
      if (arr && arr.length > 0) {
        let val = arr[0][attr];
        let obj = arr[0];
        let val1 = 0;
        if (arr.length === 1) {
          return arr[0];
        } else {
          for (let i = 1; i < arr.length; i++) {
            val1 = val;
            val = cmp(val1, arr[i][attr]);
            if (val1 !== val) {
              obj = arr[i];
            }
          }
        }
        return obj;
      }
      return {};
    },

    getFilename(str) {
      if (str) {
        let arr1 = [];
        let str1="";
        let strList = str.split(",");
        for (let i = 0; i < strList.length; i++) {
          str1=strList[i];
          arr1.push(str1.substring(str1.lastIndexOf("/") + 1));
        }
        return arr1;
      } else {
        return "-";
      }
    },
    onImgChange(e) {
      const file = e.target.files[0];
      var form_data = new FormData();
      form_data.append("file", file);
      this.formValues["imageUrl"] = URL.createObjectURL(file);
      this.loading = true;
      this.loadingMessage = "Uploading Testcases..";
      this.barchartCreated = false;
      let self = this;
      testcaseService.uploadFile(form_data, this.projectId).then(
        (data) => {
          self.loading = false;
          self.loadingMessage = "";
          self.loadTestCaseList();
        },
        (error) => {
          self.loading = false;
          self.loadingMessage = "";
          self.showErrorModal = true;
          self.modalErrorMessage =
            "Error while uploading Testcases, Please try again later";
        }
      );
    },
    closeAddForm() {
      this.showForm = false;
      // this.showGraph = true;
      this.expandedRow = "";
    },

    loadCounts(data) {
      this.totalCount = data.length;
      if (data.length <= 0) {
        //  this.showGraph = false;
      } else {
        //  this.showGraph = true;
      }
      let tempFeatures = {},
        features = [],
        featureNames = [];
      let types = {},
        typeNames = [];
      let releases = {},
        releaseNames = [];
      let execMethods = {},
        execMethodNames = [];
      for (let i = 0; i < data.length; i++) {
        if (featureNames.indexOf(data[i].tc_feature) >= 0) {
          tempFeatures[data[i].tc_feature] += 1;
        } else {
          featureNames.push(data[i].tc_feature);
          tempFeatures[data[i].tc_feature] = 1;
        }
      }
      let obj = {};
      let totalObj = {};
      totalObj["name"] = "Total";
      totalObj["total"] = data.length;
      totalObj["duration"] = 0;
      totalObj["manual"] = 0;
      totalObj["auto"] = 0;
      totalObj["ifd"] = 0;
      totalObj["cfd"] = 0;
      totalObj["defects"] = 0;
      totalObj["pass"] = 0;
      totalObj["fail"] = 0;
      totalObj["pending"] = 0;
      let tempStr = "";
      for (let t = 0; t < data.length; t++) {
        if (data[t].tc_duration != "" && data[t].tc_duration != null) {
          totalObj.duration += parseInt(data[t].tc_duration);
        }
        if (
          data[t].tc_exectution_method &&
          data[t].tc_exectution_method === "auto"
        ) {
          totalObj.auto += 1;
        } else {
          totalObj.manual += 1;
        }
        if (data[t].tc_result && (data[t].tc_result.toLowerCase() === "pass" || data[t].tc_result.toLowerCase() === "passed")) {
          totalObj.pass += 1;
        } else if (
          data[t].tc_result &&
          (data[t].tc_result.toLowerCase() === "fail" || data[t].tc_result.toLowerCase() === "failed")
        ) {
          totalObj.fail += 1;
        } else {
          totalObj.pending += 1;
        }

        if (data[t].tc_ifd != "" && data[t].tc_ifd != null) {
          tempStr = data[t].tc_ifd.split(",");
          totalObj.ifd += tempStr.length;
        }
        if (data[t].tc_cfd != "" && data[t].tc_cfd != null) {
          tempStr = data[t].tc_cfd.split(",");
          totalObj.cfd += tempStr.length;
        }
        if (data[t].tc_defects != "" && data[t].tc_defects != null) {
          tempStr = data[t].tc_defects.split(",");
          totalObj.defects += tempStr.length;
        }
      }

      for (let j = 0; j < featureNames.length; j++) {
        obj = {};
        obj["name"] = featureNames[j];
        obj["total"] = tempFeatures[featureNames[j]];
        obj["duration"] = 0;
        obj["manual"] = 0;
        obj["auto"] = 0;
        obj["ifd"] = 0;
        obj["cfd"] = 0;
        obj["defects"] = 0;
        obj["pass"] = 0;
        obj["fail"] = 0;
        obj["pending"] = 0;
        for (let k = 0; k < data.length; k++) {
          if (data[k].tc_feature === featureNames[j]) {
            if (data[k].tc_duration != "" && data[k].tc_duration != null) {
              obj.duration += parseInt(data[k].tc_duration);
            } else {
              obj.duration += 10;
            }
            if (
              data[k].tc_exectution_method &&
              data[k].tc_exectution_method === "auto"
            ) {
              obj.auto += 1;
            } else {
              obj.manual += 1;
            }
            if (
              data[k].tc_result &&
              (data[k].tc_result.toLowerCase() === "pass" || data[k].tc_result.toLowerCase() === "passed")
            ) {
              obj.pass += 1;
            } else if (
              data[k].tc_result &&
              (data[k].tc_result.toLowerCase() === "fail" || data[k].tc_result.toLowerCase() === "failed")
            ) {
              obj.fail += 1;
            } else {
              obj.pending += 1;
            }

            if (data[k].tc_ifd != "" && data[k].tc_ifd != null) {
              tempStr = data[k].tc_ifd.split(",");
              obj.ifd += tempStr.length;
            }
            if (data[k].tc_cfd != "" && data[k].tc_cfd != null) {
              tempStr = data[k].tc_cfd.split(",");
              obj.cfd += tempStr.length;
            }
            if (data[k].tc_defects != "" && data[k].tc_defects != null) {
              tempStr = data[k].tc_defects.split(",");
              obj.defects += tempStr.length;
            }
          }
        }
        features.push(obj);
      }
      let feDurationList = [];
      for (let d = 0; d < features.length; d++) {
        let ob = {};
        ob["name"] = features[d].name;
        ob["total"] = features[d].duration;
        feDurationList.push(ob);
      }
      feDurationList = [
        { name: "Completed", total: 63 },
        { name: "Pending", total: 27 },
      ];
      let execCountObj = [
        { name: "Pass", total: 171 },
        { name: "Fail", total: 20 },
        { name: "Pending", total: 5 },
        { name: "Blocked", total: 3 },
      ];
      let CountObj = [
        { name: "Pass", total: 179 },
        { name: "Fail", total: 0 },
        { name: "Pending", total: 20 },
        { name: "Blocked", total: 0 },
      ];
      let csvDefectsList = [
        { name: "R,M,V", total: 82 },
        { name: "JUDC", total: 67 },
        { name: "A,N,I", total: 50 },
      ];

      this.execSummaryCountList = execCountObj;
      this.projectedSummaryCountList = CountObj;
      this.csvDefectsCountList = csvDefectsList;
      this.featureCountList = features;
      this.featureDurationList = feDurationList;
      this.totalCountList = totalObj;

      this.execSummaryOptions = this.createSummaryOptions(
        "Execution Summary",
        this.createSummaryData(this.execSummaryCountList),
        this.execSummaryColors
      );

      this.projectedSummaryOptions = this.createSummaryOptions(
        "Projected Summary",
        this.createSummaryData(this.projectedSummaryCountList),
        this.execSummaryColors
      );

      this.csvDefectsOptions = this.createSummaryOptions(
        "CVT Found Defects Status",
        this.createSummaryData(this.csvDefectsCountList),
        this.csvDefectsColors
      );

      this.featureOptions = this.createSummaryOptions(
        "Testcase Count Per Feature",
        this.createSummaryData(this.featureCountList),
        this.featureColors
      );
      this.featureDurationOptions = this.createSummaryOptions(
        "Testcase Duration Per Feature",
        this.createSummaryData(this.featureDurationList),
        this.featureDurationColors
      );
    },

    loadTestCaseList() {
      this.loading = true;
      this.loadingMessage = "Loading Testcases..";
      let self = this;
      let pageNumber=1;
      let pageNumbers=0;
    /*  testcaseService.getAllTopologies("1").then(
        (data) => {},
        (error) => {}
      );
      testcaseService.getAllTopologyNames("1").then(
        (data) => {
          let list = [];
          for (let k = 0; k < data.length; k++) {
            list[k] = data[k].split(".")[0];
          }
          self.topoList = list;
          self.topologyList = data;
        },
        (error) => {
          self.loading = false;
          self.loadingMessage = "";
          self.showErrorModal = true;
          self.modalErrorMessage =
            "Error while fetching topologies. Please try again later.";
        }
      );*/
      if (this.releaseFlag==="project") {
         let q='?\page='+pageNumber;
        testcaseService.getTestcaseList(this.projectId,q).then(
          (res) => {
           let data=res.data;
            let testcases = data;
           let meta=res.meta;
           pageNumbers=meta.pages-1;
            if(meta.pages>1){
               for(let sh=2;sh<=meta.pages;sh++){
                pageNumber=sh;
                q='?\page='+pageNumber;
                testcaseService.getTestcaseList(this.projectId,q).then(
                        (res) => {
                         pageNumbers=pageNumbers-1;
                         testcases=testcases.concat(res.data);
                          if(pageNumbers===0){
                            self.loading = false;
                            self.loadingMessage = "";
                           self.loadtestcasedetails(testcases);
                          }
                   },
                   (error)=>{
                      self.loading = false;
                      self.loadingMessage = "";
                   });
               }
            }
            else{
               self.loading = false;
            self.loadingMessage = "";
              self.loadtestcasedetails(testcases);
            }
          },
          (error) => {
            self.loading = false;
            self.loadingMessage = "";
            self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while loading Testcases, Please try again later";
          }
        );
      } else if(this.releaseFlag==="release"){
         let q='?\page='+pageNumber;
         testcaseService.getTestcaseListByReleaseId(this.releaseId,q).then(
          (res) => {
         let data=res.data;
         let testcases = data;
         let meta=res.meta;
         pageNumbers=meta.pages-1;
         if(meta.pages>1){
               for(let sh=2;sh<=meta.pages;sh++){
                pageNumber=sh;
                q='?\page='+pageNumber;
         testcaseService.getTestcaseListByReleaseId(this.releaseId,q).then(
          (res) => {
            self.loading = false;
            self.loadingMessage = "";
             pageNumbers=pageNumbers-1;
                         testcases=testcases.concat(res.data);
                          if(pageNumbers===0){
                            self.loading = false;
                            self.loadingMessage = "";
                            self.loadtestcasedetails(testcases);
                          }
          },
          (error)=>{
             self.loading = false;
            self.loadingMessage = "";
            self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while loading Testcases, Please try again later";
          });
               }
         }
         else{
            self.loading = false;
            self.loadingMessage = "";
           self.loadtestcasedetails(testcases);
         }
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
      else if(this.releaseFlag==="folder"){
         let q='?\page='+pageNumber;
         testcaseService.getTestcaseListByFolderName(this.folderName,q).then(
          (res) => {
            let data=res.data;
         let testcases = data;
         let meta=res.meta;
         pageNumbers=meta.pages-1;
         if(meta.pages>1){
               for(let sh=2;sh<=meta.pages;sh++){
                pageNumber=sh;
                q='?\page='+pageNumber;
         testcaseService.getTestcaseListByFolderName(this.folderName,q).then(
          (res) => {
             self.loading = false;
            self.loadingMessage = "";
             pageNumbers=pageNumbers-1;
                         testcases=testcases.concat(res.data);
                          if(pageNumbers===0){
            self.loading = false;
            self.loadingMessage = "";
            self.loadtestcasedetails(testcases);
                          }
          },(error)=>{
             self.loading = false;
            self.loadingMessage = "";
            self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while loading Testcases, Please try again later";
          });
               }
         }
         else{
            self.loading = false;
            self.loadingMessage = "";
           self.loadtestcasedetails(testcases);
         }
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
    },
    loadtestcasedetails(data) {

       let tc_list=[];
      if(this.exportColumns.tc_with_logs){
        for(let k=0;k<data.length;k++){
          if(data[k].tc_logFileName != null &&
            data[k].tc_logFileName != undefined &&
            data[k].tc_logFileName != "") {
              tc_list.push(data[k]);
            }
        }
        this.export_testcase_list=tc_list;
      }
      else{
         this.export_testcase_list=data;
      }
    

      this.testcases = this.export_testcase_list;
      this.loadCounts(this.testcases);
      let testcasefeatures = [];
      for (let i = 0; i < this.testcases.length; i++) {
        testcasefeatures.push(this.testcases[i].tc_feature);
      }
      let testcasefeatures1 = [...new Set(testcasefeatures)];
      this.features = [];
      for (let j = 0; j < testcasefeatures1.length; j++) {
        this.features.push({
          feature: testcasefeatures1[j],
          count: 0,
          list: [],
        });
      }
      for (let k = 0; k < this.testcases.length; k++) {
        for (let l = 0; l < this.features.length; l++) {
          if (this.testcases[k].tc_feature === this.features[l].feature) {
            this.features[l].count += 1;
            this.testcases[k].tc_result = this.testcases[k].tc_result
              ? this.testcases[k].tc_result.toLowerCase()
              : "";
            if(this.testcases[k].tc_result === "pass"){this.testcases[k].tc_result="passed"}
             if(this.testcases[k].tc_result === "fail"){this.testcases[k].tc_result="failed"}
            this.features[l].list.push(this.testcases[k]);
          }
        }
      }
      let i = 1;
      for (let m = 0; m < this.features.length; m++) {
        for (let n = 0; n < this.features[m].list.length; n++) {
          this.features[m].list[n]["sl_num"] = i;
          i = i + 1;
        }
      }
      this.featureSelected = testcasefeatures1[0];
      this.loadSummaryDetails();
    },
    columnsChange(event) {
      this.$refs.column_menu.close();
      if (event.currentTarget.checked) {
        this.columnsCount += 1;
      } else {
        this.columnsCount -= 1;
      }
      if (this.columnsCount > 5) {
        document.querySelector(".titleColumn").style.width = "50%";
      }
    },
    isBulkSelection(testcaseid) {
      if (this.selectedRows.indexOf(testcaseid) >= 0) {
        return true;
      } else {
        return false;
      }
    },
    checkResultUpdated(tid) {
      if (this.updatedResultTestcases.indexOf(tid) >= 0) {
        return true;
      } else {
        false;
      }
    },
    checkResultUpdate1() {
      let completed = false;

      let temp = Object.keys(this.passCheckList);
      for (let i = 0; i < temp.length; i++) {
        if (
          this.passCheckList[temp[i]] === false ||
          this.passCheckList[temp[i]] === "false"
        ) {
          this.checklistError = true;
          this.bulkValues.tc_result = this.oldResult;
          return;
        } else {
          this.showPassChecklist = false;
        }
      }
      this.updatedResultTestcases = JSON.parse(
        JSON.stringify(this.selectedRows)
      );
      this.bulkValues.tc_result = this.newResult;
      this.updatedResultTestcases = JSON.parse(
        JSON.stringify(this.selectedRows)
      );
    },
    isOnlyFeatureSelection(testcaseid) {
      let features = new Set();
      for (let i = 0; i < this.selectedTestcases.length; i++) {
        features.add(this.selectedTestcases[i].tc_feature);
      }
      if (features.size > 1) {
        return false;
      } else if (features.size === 1) {
        return true;
      }
    },
    getSelectedFeatureName(testcaseid) {
      for (let i = 0; i < this.selectedTestcases.length; i++) {
        if (testcaseid === this.selectedTestcases[i].id) {
          return "Select " + this.selectedTestcases[i].tc_feature;
        }
      }
    },
    bulkEditTestcases() {
      this.$refs.test_menu.close();
      this.editTestcasemodal = true;
    },
    deleteTestcase() {
      this.$refs.test_menu.close();
      this.loading = true;
      this.loadingMessage = "Deleting Testcase..";
      for (let i = 0; i < this.selectedRows.length; i++) {
        let testcaseid = this.selectedRows[i];
        testcaseService.deleteTestCase(testcaseid).then(
          (data) => {},
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
    closeForm() {
      this.resetForm();
      this.showForm = false;
    },
    searchHandler(event) {
      this.featureTestcases = [];
      let searchKey = event.currentTarget.value.toLowerCase();
      let tempArr = [];
      for (let d = 0; d < this.allTestcases.length; d++) {
        if (
          (this.allTestcases[d].tc_customer &&
            this.allTestcases[d].tc_customer
              .toLocaleLowerCase()
              .indexOf(searchKey) > -1) ||
          (this.allTestcases[d].tc_release &&
            this.allTestcases[d].tc_release
              .toLocaleLowerCase()
              .indexOf(searchKey) > -1) ||
          (this.allTestcases[d].tc_platform &&
            this.allTestcases[d].tc_platform
              .toLocaleLowerCase()
              .indexOf(searchKey) > -1) ||
          (this.allTestcases[d].tc_feature &&
            this.allTestcases[d].tc_feature
              .toLocaleLowerCase()
              .indexOf(searchKey) > -1) ||
          (this.allTestcases[d].tc_title &&
            this.allTestcases[d].tc_title
              .toLocaleLowerCase()
              .indexOf(searchKey) > -1) ||
          (this.allTestcases[d].tc_type &&
            this.allTestcases[d].tc_type
              .toLocaleLowerCase()
              .indexOf(searchKey) > -1) ||
          (this.allTestcases[d].tc_uuid &&
            this.allTestcases[d].tc_uuid
              .toLocaleLowerCase()
              .indexOf(searchKey) > -1) ||
          (this.allTestcases[d].tc_role &&
            this.allTestcases[d].tc_role
              .toLocaleLowerCase()
              .indexOf(searchKey) > -1) ||
          (this.allTestcases[d].tc_exectution_method &&
            this.allTestcases[d].tc_exectution_method
              .toLocaleLowerCase()
              .indexOf(searchKey) > -1) ||
          (this.allTestcases[d].tc_result &&
            this.allTestcases[d].tc_result
              .toLocaleLowerCase()
              .indexOf(searchKey) > -1)
        ) {
          tempArr.push(this.allTestcases[d]);
        }
      }
      let testcases = tempArr;
      let testcasefeatures = [];
      for (let i = 0; i < testcases.length; i++) {
        testcasefeatures.push(testcases[i].tc_feature);
      }
      let testcasefeatures1 = [...new Set(testcasefeatures)];
      for (let j = 0; j < testcasefeatures1.length; j++) {
        this.featureTestcases.push({
          feature: testcasefeatures1[j],
          list: [],
        });
      }
      for (let k = 0; k < this.testcases.length; k++) {
        for (let l = 0; l < this.featureTestcases.length; l++) {
          if (
            this.testcases[k].tc_feature === this.featureTestcases[l].feature
          ) {
            this.featureTestcases[l].list.push(this.testcases[k]);
          }
        }
      }
      let tmpArr = [];
      for (let k = 0; k < this.featureTestcases.length; k++) {
        if (this.featureTestcases[k].list.length > 0) {
          tmpArr.push(this.featureTestcases[k]);
        }
      }
      this.featureTestcases = tmpArr;
    },
    openTestMenu: function(testcaseid) {
      debugger;
      if (
        this.selectedRows.length &&
        this.selectedRows.indexOf(testcaseid) >= 0
      ) {
        this.$refs.test_menu.open(event, testcaseid);
      } else {
        this.selectedRows = [];
        this.selectedTestcases = [];
        this.removeSelection();
      }
      event.preventDefault();
    },
    openMenu: function(event) {
      this.$refs.column_menu.open(event);
      event.preventDefault();
    },
    openReleaseEditmenu(event) {
      this.$refs.release_edit_menu.open(event);
      event.preventDefault();
    },
    closeImportModal() {
      this.showImportModal = false;
      this.selectedOtherTestcases = [];
    },
    importTestCase() {
      this.showImportModal = true;
      this.selectedOtherTestcases = [];
    },
    addTestCase() {
      // this.showGraph = false;
      this.showForm = true;

      if (this.testcases && this.testcases.length > 0) {
        let formValues = this.testcases[this.testcases.length - 1];
        let keys = Object.keys(formValues);
        let newObj = {};
        let notToDisplayKeys = [
          "id",
          "tc_description",
          "tc_title",
          "tc_procedure",
          "tc_pass_fail_criteria",
          "tc_logs",
          "tc_result",
          "tc_ifd",
          "tc_cfd",
          "tc_defects",
        ];
        for (let i = 0; i < keys.length; i++) {
          if (notToDisplayKeys.indexOf(keys[i]) < 0) {
            newObj[keys[i]] = formValues[keys[i]];
          }
        }
        this.lastCreatedTestcase = newObj;
      }
    },
    selectFeatureList(event) {
      this.$refs.test_menu.close();
      let fename = event.currentTarget.innerText.substring(7);
      this.selectedRows = [];
      this.selectedTestcases = [];
      for (let i = 0; i < this.features.length; i++) {
        if (this.features[i].feature && this.features[i].feature === fename) {
          for (let k = 0; k < this.features[i].list.length; k++) {
            this.selectedRows.push(this.features[i].list[k].id);
            this.selectedTestcases.push(this.features[i].list[k]);
          }
        }
      }
      let featureParent = document.getElementsByClassName("selectedRows")[0]
        .parentElement;
      for (let k = 1; k < featureParent.children.length; k++) {
        featureParent.children[k].classList.add("selectedRows");
      }
    },
    updateTims() {
      this.loading = true;
      this.loadingMessage = "updating Tims";
      testcaseService.updateTims(this.updatedResultTestcases).then(
        (data) => {
          debugger;
        },
        (error) => {
          console.log("error while updating Tims");
        }
      );
    },
    selectAll() {
      this.$refs.test_menu.close();
      this.selectedRows = [];
      this.selectedTestcases = [];
      for (let i = 0; i < this.features.length; i++) {
        for (let k = 0; k < this.features[i].list.length; k++) {
          this.selectedRows.push(this.features[i].list[k].id);
          this.selectedTestcases.push(this.features[i].list[k]);
        }
      }
      let rows = document.getElementsByClassName("featureTr");
      for (let l = 0; l < rows.length; l++) {
        if (!rows[l].classList.contains("selectedRows"))
          rows[l].classList.add("selectedRows");
      }
    },
    uploadTestCase() {
      this.showForm = false;
      document.getElementById("my_file").click();
    },
    closeInfoModal() {
      this.showInfoModal = false;
      this.showInfoModalClass = "";
      this.modalInfoMessage = "";
    },
    closeErrorModal() {
      this.modalErrorMessage = "";
      this.showErrorModal = false;
    },
    editReleaseNote() {
      this.releaseNoteBackup = this.releaseNote;
      this.showEditReleaseNoteModal = true;
    },
    closeEditReleaseForm() {
      this.releaseNote = this.releaseNoteBackup;
      this.releaseNoteBackup = "";
      this.showEditReleaseNoteModal = false;
    },
    saveReleaseNote() {
      let releaseFile = new Blob([this.releaseNote], {
        type: "application/pdf",
      });
      let fileOfBlob = new File([releaseFile], "releaseNote.pdf");
      var form_data = new FormData();
      form_data.append("file", fileOfBlob);
      this.formValues["releaseNoteUrl"] = URL.createObjectURL(fileOfBlob);
      this.loading = true;
      this.loadingMessage = "Uploading Release Note..";
      testcaseService.uploadReleaseNote(form_data, this.projectId).then(
        (data) => {
          this.loading = false;
          this.loadingMessage = "";
          this.showInfoModal = true;
          this.modalInfoMessage = "Release Note uploaded successfully";
          this.loadReleaseNote();
        },
        (error) => {
          this.loadTestCaseList();
          this.loading = false;
          this.loadingMessage = "";
          this.showErrorModal = true;
          this.modalErrorMessage =
            "Error while uploading Release Note, Please try again later";
        }
      );
    },
    expandRow(event,fobj) {
      debugger;
      if (this.expandedRow === fobj.id) {
        this.expandedRow = "";
      } else {
      this.loading = true;
      this.loadingMessage = "Loading testcase details...";
      let self=this;
        testcaseService.getTestcaseDetails(fobj.id).then(
          (data) => {
            self.loading = false;
            self.loadingMessage = "";

            if (data.tc_result.toLowerCase() === "pass") {
          data.tc_result = "passed";
        } else if (fobj.tc_result.toLowerCase() === "fail") {
          data.tc_result = "failed";
        }
        this.formValues = data;
        this.expandedRow = data.id;
        setTimeout(function() {
          let textFields = document.getElementsByTagName("textarea");
          for (let i = 0; i < textFields.length; i++) {
            textFields[i].rows = textFields[i].value.split("\n").length;
          }
        }, 500);

          },
          (error) => {
            self.loading = false;
            self.loadingMessage = "";
            self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while loading Testcase, Please try again later";
          }
        );
  }
    },
    checkJDefect(testcase){
      let notJdefect=false;
        let status="";
        if(testcase.tc_result.toLowerCase() === "failed" ||  testcase.tc_result.toLowerCase() === "fail"){
          if(testcase.tc_defects==="" || testcase.tc_defects == null){
            return "JdefectTestcase";
          }
          else{
            let status="";
            let defects =testcase.tc_defects ? testcase.tc_defects.split(",") : [];
             for (let ab = 0; ab < defects.length; ab++) {
               defects[ab]=defects[ab].trim();
                status=defects[ab][11];
                if(status!="J"){
                  notJdefect=true;
                }
             }
             if(notJdefect){
               return "";
             }
             else{
               return "JdefectTestcase";
             }
           }
         }
         else{
           return "";
         }
    },
    showDashboard() {
      this.emitToParent("showDashboard");
    },
    handleSubmit() {
      let json_obj = {};
      json_obj["project_id"] = this.projectId;
      var form_data = new FormData();
      json_obj["ids"] = this.selectedRows;
      if (this.bulkValues.tc_feature)
        json_obj["tc_feature"] = this.bulkValues.tc_feature;
      if (this.bulkValues.tc_type)
        json_obj["tc_type"] = this.bulkValues.tc_type;
      if (this.bulkValues.tc_topology)
        json_obj["tc_topology"] = this.bulkValues.tc_topology;
      if (this.bulkValues.tc_dut)
       json_obj["tc_dut"] = this.bulkValues.tc_dut;
      if (this.bulkValues.tc_role)
        json_obj["tc_role"] = this.bulkValues.tc_role;
      if (this.bulkValues.tc_platform)
        json_obj["tc_platform"] = this.bulkValues.tc_platform;
      if (this.bulkValues.tc_tag) 
      json_obj["tc_tag"] = this.bulkValues.tc_tag;
      if (this.bulkValues.tc_exectution_method)
        json_obj["tc_exectution_method"] = this.bulkValues.tc_exectution_method;
      if (this.bulkValues.tc_result)
        json_obj["tc_result"] = this.bulkValues.tc_result;

      if (this.bulkValues.tc_release)
        json_obj["tc_release"] = this.bulkValues.tc_release;
      if (this.bulkValues.tc_customer)
        json_obj["tc_customer"] = this.bulkValues.tc_customer;
      if (this.bulkValues.tc_smoke)
        json_obj["tc_smoke"] = this.bulkValues.tc_smoke;
      if (this.bulkValues.tc_priority)
        json_obj["tc_priority"] = this.bulkValues.tc_priority;
      if (this.bulkValues.tc_regression)
        json_obj["tc_regression"] = this.bulkValues.tc_regression;
      if (this.bulkValues.tc_duration)
        json_obj["tc_duration"] = this.bulkValues.tc_duration;
      if (this.bulkValues.tc_source)
        json_obj["tc_source"] = this.bulkValues.tc_source;
        if (this.bulkValues.tc_featureId)
        json_obj["tc_featureId"] = this.bulkValues.tc_featureId;
        if (this.bulkValues.tc_testcaseOwner)
        json_obj["tc_testcaseOwner"] = this.bulkValues.tc_testcaseOwner;
        if (this.bulkValues.tc_testExecOwner)
        json_obj["tc_testExecOwner"] = this.bulkValues.tc_testExecOwner;
        if (this.bulkValues.automation_flag)
        json_obj["automation_flag"] = this.bulkValues.automation_flag==="true"?true:false;

      if (this.bulkValues.tc_result) {
        if (this.bulkValues.tc_defects)
          json_obj["tc_defects"] = this.bulkValues.tc_defects; //.split(",");
        if (this.bulkValues.tc_version)
          json_obj["tc_version"] = this.bulkValues.tc_version;
         if (this.bulkValues.update_master)
          json_obj["update_master"] = this.bulkValues.update_master;
      }

      form_data.append("jsonObj", JSON.stringify(json_obj));
      if (this.topoImageuploaded) {
        form_data.append("topology_filename", this.topologyimage);
      }

      this.loading = true;
      this.loadingMessage = "Updating Testcases..";

      testcaseService.bulkUpdateTestCases(form_data).then(
        (data) => {
          if (data) {
            this.loading = false;
            this.loadingMessage = "";
            this.closeEditModal();
            this.loadTestCaseList();
          }
        },
        (error) => {
          this.loading = false;
          this.loadingMessage = "";
          this.showErrorModal = true;
          this.modalErrorMessage =
            "Error while updating Testcases, Please try again later";
        }
      );
    },
    uploadReleaseNote(event) {
      this.showForm = false;
      document.getElementById("release_file").click();
    },
    backButtonClicked() {
      router
        .push({
          name: "CustomerReleasesPage",
          params: {
            customerId: this.customerId,
          },
        })
        .catch(() => {});
    },
    onChange(event) {
      if (event.currentTarget.value === "newTopo") {
        document.querySelector(".topology_file1").click();
      } else if (event.currentTarget.className === "result") {
        if (
          event.currentTarget.value === "pass" ||
          event.currentTarget.value === "passed"
        ) {
          this.newResult = event.currentTarget.value;
          this.showPassChecklist = true;
          this.checklistError = false;
        } else {
          this.updatedResultTestcases = JSON.parse(
            JSON.stringify(this.selectedRows)
          );
        }
      }
    },
    onFocus(event) {
      if (event.currentTarget.className === "result") {
        this.oldResult = event.currentTarget.value;
      }
    },
    closeBulkEditForm() {
      this.closeEditModal();
    },
    autoResize() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    },
    onTopologyImgChange1(e) {
      this.imageSrc = "";
      const file = e.target.files[0];
      this.topologyimage = file;
      let fileName = file.name.split(".")[0];
      this.bulkValues["tc_topology"] = URL.createObjectURL(file);
      document.querySelector(".topology1").innerHTML +=
        "<option value=" + fileName + ">" + fileName + "</option>";
      this.bulkValues.tc_topology = fileName;
      this.topoImageuploaded = true;
      this.showTopo = true;
      this.imageSrc = URL.createObjectURL(file);
    },
    toggleShowGraph() {
     // this.showGraph = !this.showGraph;
    },
    toggleShowExportMenu() {
      this.showExportMenu = !this.showExportMenu;
    },
    toggleShowSummaryCount() {
      this.showsummarycount = !this.showsummarycount;
    },
    exportChart(chartList) {
      let self = this;
      let len=chartList.length;
     for(let k=0;k<chartList.length;k++){
      var data = {
		    type: 'POST',
        options: JSON.stringify(this[chartList[k].option]),
        filename: 'chartImages_'+k+'.png',
        type: 'image/png',
        async: true
    };
     var exportUrl = 'https://export.highcharts.com/'
     $.post(exportUrl, data, function(data) {
     var imageUrl = exportUrl + data
     fetch(imageUrl).then(response => response.blob()).then(data => {
    	  var bl=new Blob([data], { type: "image/png" });
        self.chartImages.push(bl);
        len=len-1;
        if(len===0)
        return;
    })
    })
    }
    },
    drawChart: function(data, chartDiv, compareChart, compareCountName) {
      if (data) {
        let self = this;
        let index = parseInt(chartDiv.substr(9));
        var margin = { top: 10, right: 30, bottom: 90, left: 40 },
          chart_width = 840 - margin.left - margin.right,
          chart_height = 450 - margin.top - margin.bottom;

        let div = document.querySelector(chartDiv);
        if (div) {
          [].slice
            .call(div.children)
            .forEach((child) => div.removeChild(child));
        }

        let svg = d3
          .select(chartDiv)
          .append("svg")
          .attr("width", chart_width + margin.left + margin.right)
          .attr("height", chart_height + margin.top + margin.bottom);

        this.chart = svg
          .append("g")
          .attr(
            "transform",
            "translate(" + margin.left + "," + margin.top + ")"
          );

        let yScale = d3
          .scaleLinear()
          .range([chart_height, 0])
          .domain([0, this.finder(Math.max, data, "count").count]);

        this.chart
          .append("g")
          .call(
            d3
              .axisLeft(yScale)
              .ticks(
                this.finder(Math.max, data, "count").count < 5
                  ? this.finder(Math.max, data, "count").count
                  : 5
              )
          );
        //.call(g => g.select(".domain").remove());

        d3.selectAll(".tick")
          .select("text")
          .attr("x", -3);

        d3.selectAll(".tick")
          .select("line")
          .attr("x2", 0);

        let xScale = d3
          .scaleBand()
          .range([0, chart_width])
          .domain(data.map((s) => s.pid))
          .padding(0.2);

        this.chart
          .append("g")
          .attr("transform", "translate(0," + chart_height + ")")
          .call(d3.axisBottom(xScale))
          .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");

        let barGroups = this.chart.selectAll("rect");

        if (chartDiv === "#barChart1") {
          barGroups
            .data(data)
            .enter()
            .append("text")
            .attr("class", "bar")
            .attr("x", (g) => xScale(g.pid) + 10)
            .attr("text-anchor", "middle")
            .text(function(d) {
              return d.count;
            })
            .attr("y", function(g) {
              if (yScale(g.count) - 10 > 0) return yScale(g.count) - 10;
              else return yScale(g.count);
            });

          barGroups
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (g) => xScale(g.pid))
            .attr("width", xScale.bandwidth() > 40 ? 40 : xScale.bandwidth())
            .attr("fill", "#09719a")
            .transition()
            .duration(100)
            .attr("y", (g) => yScale(g.count))
            .attr("height", (g) => chart_height - yScale(g.count))
            .delay(function(d, i) {
              return i * 20;
            });

          this.chart
            .selectAll("rect")
            .on("mouseover", function(e, d) {
              this.setAttribute("fill", "#D8D8D8");
              let chartindex = chartDiv[chartDiv.length - 1];
              let tooltipName = "#mainTooltip" + chartindex;
              d3.select(tooltipName)
                .style("left", e.pageX - 630 + "px")
                .style("top", e.pageY - 115 + "px")
                .style("z-index", 10)
                .select("#value")
                .html(function() {
                  return `<div>${d.pid}</div><div>count: ${d.count}</div>`;
                });
              d3.select(tooltipName).classed("hidden", false);
            })
            .on("mouseout", function(e, d) {
              let chartindex = chartDiv[chartDiv.length - 1];
              let tooltipName = "#mainTooltip" + chartindex;
              this.setAttribute("fill", "#09719a");
              d3.select(tooltipName).classed("hidden", true);
            });
        } else if (index > 1) {
          if (compareChart) {
            let indexCountName = compareCountName;
            barGroups
              .data(data)
              .enter()
              .append("text")
              .attr("class", "bar")
              .attr("x", (g) => xScale(g.pid) + 10)
              .attr("text-anchor", "middle")
              .text(function(d) {
                if (d.color === "red") {
                  return d.count;
                } else {
                  return d.count1;
                }
              })
              .attr("y", function(g) {
                if (yScale(g.count1) - 10 > 0) return yScale(g.count1) - 10;
                else return yScale(g.count1);
              });

            barGroups
              .data(data)
              .enter()
              .append("rect")
              .attr("class", "bar")
              .attr("x", (g) => xScale(g.pid))
              .attr("fill", function(d, i) {
                if (d.color === "green") {
                  return "#60a05b";
                } else if (d.color === "red") {
                  return "#c50e06";
                }
              })
              .attr("width", xScale.bandwidth() > 40 ? 40 : xScale.bandwidth())
              .style("cursor", "pointer")
              .transition()
              .duration(100)
              .attr("y", (g) => yScale(g.count1))
              .attr("height", (g) => chart_height - yScale(g.count1))
              .delay(function(d, i) {
                return i * 20;
              });

            barGroups
              .data(data)
              .enter()
              .append("rect")
              .attr("class", "bar")
              .attr("x", (g) => xScale(g.pid))

              .attr("fill", function(d, i) {
                return "#09719a";
              })
              .attr("width", xScale.bandwidth() > 40 ? 40 : xScale.bandwidth())
              .style("cursor", "pointer")
              .transition()
              .duration(100)
              .attr("y", (g) => yScale(g.count))
              .attr("height", (g) => chart_height - yScale(g.count))
              .delay(function(d, i) {
                return i * 20;
              });

            this.chart
              .selectAll("rect")
              .on("mouseover", function(e, d) {
                let tooltipName = "#mainTooltip" + index;
                d3.select(tooltipName)
                  .style("left", e.pageX - 630 + "px")
                  .style("top", e.pageY + 450 + "px")
                  .style("z-index", 10)
                  .select("#value")
                  .html(function() {
                    if (d.color === "red") {
                      return `<div>${d.pid}</div><div>count: ${d.count}</div>`;
                    } else {
                      return `<div>${d.pid}</div><div>count: ${d.count1}</div>`;
                    }
                  });
                d3.select(tooltipName).classed("hidden", false);
              })
              .on("mouseout", function(e, d) {
                let tooltipName = "#mainTooltip" + index;
                d3.select(tooltipName).classed("hidden", true);
              });
            //  document.querySelector(chartDiv).style.border="2px solid #c1c1c1";
            let dateDivName = "#date" + index;
            document.querySelector(dateDivName).innerHTML =
              "Date: " +
              self.previousDate[this.compareDate] +
              "<br>Compared Date:" +
              self.comparingDate;
          } else {
            barGroups
              .data(data)
              .enter()
              .append("text")
              .attr("class", "bar")
              .attr("x", (g) => xScale(g.pid) + 10)
              .attr("text-anchor", "middle")
              .text(function(d) {
                return d.count;
              })
              .attr("y", function(g) {
                if (yScale(g.count) - 10 > 0) return yScale(g.count) - 10;
                else return yScale(g.count);
              });

            barGroups
              .data(data)
              .enter()
              .append("rect")
              .attr("class", "bar")
              .attr("x", (g) => xScale(g.pid))
              .attr("width", xScale.bandwidth() > 40 ? 40 : xScale.bandwidth())
              .attr("fill", "#09719a")
              .transition()
              .duration(100)
              .attr("y", (g) => yScale(g.count))
              .attr("height", (g) => chart_height - yScale(g.count))
              .delay(function(d, i) {
                return i * 20;
              });

            this.chart
              .selectAll("rect")
              .on("mouseover", function(e, d) {
                this.setAttribute("fill", "#D8D8D8");
                let chartindex = chartDiv[chartDiv.length - 1];
                let tooltipName = "#mainTooltip" + chartindex;
                d3.select(tooltipName)
                  .style("left", e.pageX - 630 + "px")
                  .style("top", e.pageY - 115 + "px")
                  .style("z-index", 10)
                  .select("#value")
                  .html(function() {
                    return `<div>${d.pid}</div><div>count: ${d.count}</div>`;
                  });
                d3.select(tooltipName).classed("hidden", false);
              })
              .on("mouseout", function(e, d) {
                let chartindex = chartDiv[chartDiv.length - 1];
                let tooltipName = "#mainTooltip" + chartindex;
                this.setAttribute("fill", "#09719a");
                d3.select(tooltipName).classed("hidden", true);
              });

            let dateDivName = "#date" + index;
            document.querySelector(dateDivName).innerHTML =
              "Date: " + self.previousDate[this.compareDate];
          }
        }
      }
      let self = this;
      setTimeout(function() {
        self.exportChart();
        self.barchartCreated = true;
      }, 500);
    },
  },
};
</script>
<template>
  <div class="testcasesPage" id="testcasesPage">
    <div
      id="tm_home-main-content"
      style="position: relative; margin: 30px;margin-top:0; margin-bottom:0;height: 100%;overflow: scroll;"
    >
      <div class="listHeading">
        <h2
          id="tm_landing-welcome-text"
          style="color: #0C6170;
    font-weight: 600;
    margin-top: 30px;
    font-size: 26px;
    margin-bottom: 20px;
    display: inline-flex;"
        >
          Testcases
        </h2>
        <h5 v-show="showTims"  style="color: rgb(12, 97, 112);
    font-weight: 400;
    margin-top: 30px;
    margin-left: 14px;
    font-size: 15px;
    margin-bottom: 20px;
    display: inline-flex;">
        <a :href="timsUrl">({{timsId}})
        </a>
        </h5>
        <div v-if="!showForm" class="tm_btns">
          <button class="btn btn--primary tm_addBtn" @click="backButtonClicked">
            <span
              v-tooltip.right="{
                html: 'backButtonContent1',
                class: 'cisco-tooltip',
              }"
            >
              <i class="icon icon-back"> </i>
            </span>
            <div id="backButtonContent1">
              Back
            </div>
          </button>
          <button
            class="btn btn--primary tm_addBtn"
            @click="uploadReleaseNote"
            @contextmenu="openReleaseEditmenu"
          >
            <span
              v-tooltip.right="{
                html: 'releaseNoteContent',
                class: 'cisco-tooltip',
              }"
            >
              <i class="icon icon-notes"> </i>
            </span>
            <div id="releaseNoteContent">
              Upload Release Note
            </div>
          </button>
          <button class="btn btn--primary tm_addBtn" @click="viewTopologies">
            <span
              v-tooltip.right="{
                html: 'viewTopoContent1',
                class: 'cisco-tooltip',
              }"
            >
              <i class="icon icon-lifecycle"> </i>
            </span>
            <div id="viewTopoContent1">
              View Topology
            </div>
          </button>
          <button class="btn btn--primary tm_addBtn" @click="importTestCase">
            <span
              v-tooltip.right="{
                html: 'importContent',
                class: 'cisco-tooltip',
              }"
            >
              <i class="icon icon-download"> </i>
            </span>
            <div id="importContent">
              Import
            </div>
          </button>
          <button class="btn btn--primary tm_addBtn" @click="addTestCase">
            <span
              v-tooltip.right="{
                html: 'addContent',
                class: 'cisco-tooltip',
              }"
            >
              <i class="icon icon-plus "> </i>
            </span>
            <div id="addContent">
              Add
            </div>
          </button>
          <button class="btn btn--primary tm_addBtn" @click="uploadTestCase">
            <span
              v-tooltip.right="{
                html: 'uploadContent',
                class: 'cisco-tooltip',
              }"
            >
              <i class="icon icon-upload "> </i>
            </span>
            <div id="uploadContent">
              Upload
            </div>
          </button>
          <button
            class="btn btn--primary tm_addBtn"
            :disabled="!barchartCreated"
            @click="toggleShowExportMenu"
          >
            <span
              v-tooltip.right="{
                html: 'exportContent',
                class: 'cisco-tooltip',
              }"
            >
              <i class="icon icon-export "> </i>
            </span>
            <div id="exportContent">
              Export
            </div>
          </button>
          <button
            class="btn btn--primary tm_addBtn"
            @click="toggleShowSummaryCount"
          >
            <span
              v-tooltip.right="{
                html: 'summaryContent',
                class: 'cisco-tooltip',
              }"
            >
              <i class="icon icon-toggle-menu "> </i>
            </span>
            <div id="summaryContent">
              Summary
            </div>
          </button>
          <!--<button class="btn btn--primary tm_addBtn" @click="toggleShowGraph">-->
          <button class="btn btn--primary tm_addBtn" @click="showDashboard">
            <span
              v-tooltip.right="{
                html: 'graphContent',
                class: 'cisco-tooltip',
              }"
            >
              <i class="icon icon-graph"> </i>
            </span>
            <div id="graphContent">
              Grapgh
            </div>
          </button>
          <div v-if="showExportMenu" class="dd_menu">
            <a class="export-menu-item" href="#" @click="editExportTestcase"
              >Edit Export</a
            >
            <a class="export-menu-item" href="#" @click="exportTestCases"
              >Export As HTML</a
            >
            <a class="export-menu-item" href="#">Export As Docx</a>
            <a class="export-menu-item" href="#" @click="exportExcel"
              >Export As Excel</a
            >
            <a class="export-menu-item" href="#">Export As PDF</a>
          </div>
          <input type="file" id="release_file" @change="onReleaseNoteChange" />
          <input type="file" id="my_file" @change="onImgChange" />
        </div>
      </div>
      <div class="detailSummaryCount" v-if="showsummarycount">
        <div class="row">
          <div class="col-lg-12 col-md-12 summaryCol">
            <div class="countList">
              <table class="countTable">
                <tr style="border-top: 1px dotted #c1c1c1;">
                  <th class="countTd countFirstTD">
                    Features
                  </th>
                  <th class="countTd">Count</th>
                  <th class="countTd">Duration</th>
                  <th class="countTd">Automated</th>
                  <th class="countTd">Manual</th>
                  <th class="countTd">CFD</th>
                  <th class="countTd">IFD</th>
                  <th class="countTd">Defects</th>
                  <th class="countTd">Pass</th>
                  <th class="countTd">Fail</th>
                  <th class="countTd">Pending</th>
                </tr>
                <tr class="totalRow">
                  <td class="countTd countFirstTD">
                    Total
                  </td>
                  <td class="countTd">
                    {{ totalCountList.total }}
                  </td>
                  <td class="countTd">
                    {{ totalCountList.duration }}
                  </td>
                  <td class="countTd">
                    {{ totalCountList.auto }}
                  </td>
                  <td class="countTd">
                    {{ totalCountList.manual }}
                  </td>
                  <td class="countTd">
                    {{ totalCountList.cfd }}
                  </td>
                  <td class="countTd">
                    {{ totalCountList.ifd }}
                  </td>
                  <td class="countTd">
                    {{ totalCountList.defects }}
                  </td>
                  <td class="countTd">
                    {{ totalCountList.pass }}
                  </td>
                  <td class="countTd">
                    {{ totalCountList.fail }}
                  </td>
                  <td class="countTd">
                    {{ totalCountList.pending }}
                  </td>
                </tr>
                <tr v-for="(fr, key) in featureCountList" :key="key">
                  <td class="countTd countFirstTD">
                    {{ fr.name }}
                  </td>
                  <td class="countTd">{{ fr.total }}</td>
                  <td class="countTd">{{ fr.duration }}</td>
                  <td class="countTd">{{ fr.auto }}</td>
                  <td class="countTd">{{ fr.manual }}</td>
                  <td class="countTd">{{ fr.cfd }}</td>
                  <td class="countTd">{{ fr.ifd }}</td>
                  <td class="countTd">{{ fr.defects }}</td>
                  <td class="countTd">{{ fr.pass }}</td>
                  <td class="countTd">{{ fr.fail }}</td>
                  <td class="countTd">{{ fr.pending }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showGraph" class="graphdiv">
        <template>
          <splide :options="splideOptions" class="chartSlides">
            <splide-slide>
              <Chart
                id="chart_a1"
                class="chartBox"
                :option="execSummaryOptions"
              ></Chart>
            </splide-slide>
            <splide-slide>
              <Chart
                id="chart_a2"
                class="chartBox"
                :option="projectedSummaryOptions"
              ></Chart>
            </splide-slide>
            <splide-slide>
              <Chart
                id="chart_a4"
                class="chartBox"
                :option="featureOptions"
              ></Chart>
            </splide-slide>
            <splide-slide>
              <Chart
                id="chart_a5"
                class="chartBox"
                :option="featureDurationOptions"
              ></Chart>
            </splide-slide>
            <splide-slide>
              <Chart
                id="chart_a3"
                class="chartBox"
                :option="csvDefectsOptions"
              ></Chart>
            </splide-slide>
            <splide-slide>
              <Chart
                id="chart_a6"
                class="chartBox"
                :option="execSummaryOptions"
              ></Chart>
            </splide-slide>
          </splide>
        </template>
        <!--  <div class="graphDivBlock firstGraphDivBlock">

         <pie id="chart_a1" :option="execSummaryOptions"></pie>
         
        </div>
        <div class="graphDivBlock">
          <TestcasesFeatureChart
            :projectId="projectId"
            title="Projected Summary"
            :testcaseCountList="projectedSummaryCountList"
            divId="projectedSummaryDiv"
            :color="execSummaryColors"
          />
        </div>
        <div class="graphDivBlock">
          <TestcasesFeatureChart
            :projectId="projectId"
            title="CVT Found Defects Status"
            :testcaseCountList="csvDefectsCountList"
            divId="cvtDefectsDiv"
            :color="csvDefectsColors"
          />
        </div>
        <div class="graphDivBlock">
          <TestcasesFeatureChart
            :projectId="projectId"
            title="Testcase Count Per Feature"
            :testcaseCountList="featureCountList"
            divId="testcaseFeatureDiv"
            :color="featureColors"
          />
        </div>-->
      </div>
      <div
        v-if="!showForm"
        class="testcaseTable"
        id="testcaseTable"
        style="overflow: scroll;margin-bottom: 20px;"
      >
        <table
          class="table table--highlight mainTable"
          style="width: 100%;height: 100%;margin: 0;table-layout: fixed;margin-bottom: 500px;"
        >
          <tbody>
            <tr
              @contextmenu="openMenu"
              class="featureValues"
              style="width:100%;"
            >
              <th class="testcase_td1" style="width:10%;">
                Id
              </th>
              <th class="testcase_td1" style="width:70%;">
                Title
              </th>
              <th
                class="testcase_td1"
                style="width:10%;"
                v-show="tableColumns.feature"
              >
                Feature
              </th>
              <th
                class="testcase_td1"
                style="width:10%;"
                v-show="tableColumns.type"
              >
                Type
              </th>
              <th
                class="testcase_td1"
                style="width:10%;"
                v-show="tableColumns.topology"
              >
                Topology
              </th>
              <th
                class="testcase_td1"
                style="width:10%;"
                v-show="tableColumns.DUT"
              >
                DUT
              </th>
              <th
                class="testcase_td1"
                style="width:10%;"
                v-show="tableColumns.role"
              >
                Role
              </th>
              <th
                class="testcase_td1"
                style="width:10%;"
                v-show="tableColumns.platform"
              >
                Platform
              </th>
              <th class="testcase_td1" style="width:10%;">
                Log File
              </th>
              <th
                class="testcase_td1"
                style="width:10%;"
                v-show="tableColumns.version"
              >
                Version
              </th>
              <th
                class="testcase_td1"
                style="width:10%;"
                v-show="tableColumns.executionMethod"
              >
                Execution Method
              </th>
              <th
                class="testcase_td1"
                style="width:10%;"
                v-show="tableColumns.automated"
              >
                Automated
              </th>
               <th
                class="testcase_td1"
                style="width:10%;"
                v-show="tableColumns.smoke"
              >
                Smoke
              </th>
               <th
                class="testcase_td1"
                style="width:10%;"
                v-show="tableColumns.defects"
              >
                Defects
              </th>
              <th
                class="testcase_td1"
                style="width:10%;"
                v-show="tableColumns.testcaseOwner"
              >
                Testcase Owner
              </th>
              <th
                class="testcase_td1"
                style="width:10%;"
                v-show="tableColumns.testExecOwner"
              >
                Execution Owner
              </th>
              <th
                class="testcase_td1"
                style="width:10%;"
                v-show="tableColumns.release"
              >
                Release
              </th>
              <th class="testcase_td1" style="width:10%;">
                Result
              </th>
            </tr>
            <template v-for="(ft, index) in features">
              <tr :key="index" class="summaryTablesValues1 featureValues ">
                <td
                  :colspan="parseInt(getColspan()) - 1"
                  style="width: 90%; overflow-wrap: break-word; "
                >
                  {{ ft.feature }}
                </td>
                <td style="width:10%; text-align:center;">
                  {{ ft.count }}
                </td>
              </tr>
              <tr style="width:100%;padding:0;height:30px;" :key="'A' + index">
                <td
                  class="mainFirstTd"
                  style="padding:0;"
                  :colspan="parseInt(getColspan())"
                >
                  <table
                    class="table table--highlight secondaryTable"
                    style="width: 100%;height: 100%;margin: 0;table-layout: fixed;"
                  >
                    <template v-for="(fobj, index1) in ft.list">
                      <tr
                        @contextmenu="openTestMenu(fobj.id)"
                        :class="'featureTr featureValues '+checkJDefect(fobj)"
                        :key="index1"
                        style="text-align:center; height:30px;width:100%;box-shadow: 0 3px 3px -2px #c1c1c1;"
                        @dblclick="expandRow($event,fobj)"
                        @click="rowSelect(fobj, $event)"
                      >
                        <td class="firstTd testcase_td" style="width:10%;">
                          {{ fobj.sl_num }}
                        </td>
                        <td
                          class="testcase_td"
                          style="width:80%;text-align:left !important;"
                        >
                          {{ fobj.tc_title }}
                          <span
                            v-if="checkResultUpdated(fobj.id)"
                            style="color:red"
                            >*</span
                          >
                        </td>
                        <td
                          class="testcase_td"
                          style="width:10%;"
                          v-show="tableColumns.feature"
                        >
                          {{ fobj.tc_feature }}
                        </td>
                        <td
                          class="testcase_td"
                          style="width:10%;"
                          v-show="tableColumns.type"
                        >
                          {{ fobj.tc_type }}
                        </td>
                        <td
                          class="testcase_td"
                          style="width:10%;"
                          v-show="tableColumns.topology"
                        >
                          {{ fobj.tc_topology }}
                        </td>
                        <td
                          class="testcase_td"
                          style="width:10%;"
                          v-show="tableColumns.DUT"
                        >
                          {{ fobj.tc_dut }}
                        </td>
                        <td
                          class="testcase_td"
                          style="width:10%;"
                          v-show="tableColumns.role"
                        >
                          {{ fobj.tc_role }}
                        </td>
                        <td
                          class="testcase_td"
                          style="width:10%;"
                          v-show="tableColumns.platform"
                        >
                          {{ fobj.tc_platform }}
                        </td>
                        <td
                          class="testcase_td"
                          style="width:10%;"
                          v-show="tableColumns.logFile"
                         >
                          <template
                            v-for="(fname, inx) in getFilePath(
                              fobj.tc_logFileName
                            )"
                          >
                          <a style="margin-right='10px'" :key="inx"    @click="showLogFiles(fobj.id,getFilename(fobj.tc_logFileName)[inx])">
                          <!--  <a :href="showLogFileName(fobj.id,getFilename(fobj.tc_logFileName)[inx])" style="margin-right='10px'" :key="inx">-->
                              {{ getFilename(fobj.tc_logFileName)[inx] }}
                            </a>
                          </template>
                        </td>
                        <td
                          class="testcase_td"
                          style="width:10%;"
                          v-show="tableColumns.version"
                        >
                          {{ fobj.tc_version }}
                        </td>
                        <td
                          class="testcase_td"
                          style="width:10%;"
                          v-show="tableColumns.executionMethod"
                        >
                          {{ fobj.tc_exectution_method }}
                        </td> 
                        <td
                          class="testcase_td"
                          style="width:10%;"
                          v-show="tableColumns.automated"
                        >
                          {{ fobj.automation_flag }}
                        </td>
                        <td
                          class="testcase_td"
                          style="width:10%;"
                          v-show="tableColumns.smoke"
                        >
                          {{ fobj.tc_smoke }}
                        </td>
                        <td
                          class="testcase_td"
                          style="width:10%;"
                          v-show="tableColumns.defects"
                        >
                          {{ fobj.tc_defects }}
                        </td>
                        <td
                          class="testcase_td"
                          style="width:10%;"
                          v-show="tableColumns.testcaseOwner"
                        >
                          {{ fobj.tc_testcaseOwner }}
                        </td>
                        <td
                          class="testcase_td"
                          style="width:10%;"
                          v-show="tableColumns.testExecOwner"
                        >
                          {{ fobj.tc_testExecOwner }}
                        </td>
                        <td
                          class="testcase_td"
                          style="width:10%;"
                          v-show="tableColumns.release"
                        >
                          {{ fobj.tc_release }}
                        </td>
                        <td :class="getColorForResult(fobj.tc_result)+' testcase_td'" style="width:10%;">
                          {{ fobj.tc_result }}
                        </td>
                      </tr>
                      <tr
                        v-if="expandedRow === fobj.id"
                        style="width:100%;padding:0;cursor:default;"
                        :key="'A' + index1"
                      >
                        <td colspan="12" style="padding:0;border-left: none;">
                          <AddTestCase
                            :formValues="formValues"
                            :projectId="projectId"
                            :editForm="true"
                            :topologyList="topologyList"
                            :refid="fobj.id"
                            v-on:child="onChildInteraction"
                          />
                        </td>
                      </tr>
                    </template>
                  </table>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div v-if="showForm">
        <AddTestCase
          :formValues="lastCreatedTestcase"
          :projectId="projectId"
          :editForm="false"
          :topologyList="topologyList"
          :refid="0"
          v-on:child="onChildInteraction"
        />
      </div>
      <div class="modals">
        <ContextMenu ref="column_menu">
          <template style="width:100%;height:200px">
            <ContextMenuItem>
              <input
                type="checkbox"
                disabled
                v-model="tableColumns.id"
                class="form-check-input tchk"
              />
              <label class="form-check-label"> Id</label>
            </ContextMenuItem>
            <ContextMenuItem>
              <input
                type="checkbox"
                disabled
                v-model="tableColumns.title"
                class="form-check-input tchk"
              />
              <label class="form-check-label"> Title</label>
            </ContextMenuItem>
            <ContextMenuItem>
              <input
                type="checkbox"
                @change="columnsChange"
                v-model="tableColumns.feature"
                class="form-check-input tchk"
              />
              <label class="form-check-label"> Feature</label>
            </ContextMenuItem>
            <ContextMenuItem>
              <input
                type="checkbox"
                @change="columnsChange"
                v-model="tableColumns.type"
                class="form-check-input tchk"
              />
              <label class="form-check-label"> Type</label>
            </ContextMenuItem>
            <ContextMenuItem>
              <input
                type="checkbox"
                @change="columnsChange"
                v-model="tableColumns.topology"
                class="form-check-input tchk"
              />
              <label class="form-check-label"> Topology</label>
            </ContextMenuItem>
            <ContextMenuItem>
              <input
                type="checkbox"
                @change="columnsChange"
                v-model="tableColumns.DUT"
                class="form-check-input tchk"
              />
              <label class="form-check-label"> DUT</label>
            </ContextMenuItem>
            <ContextMenuItem>
              <input
                type="checkbox"
                @change="columnsChange"
                v-model="tableColumns.role"
                class="form-check-input tchk"
              />
              <label class="form-check-label"> Role</label>
            </ContextMenuItem>
            <ContextMenuItem>
              <input
                type="checkbox"
                @change="columnsChange"
                v-model="tableColumns.platform"
                class="form-check-input tchk"
              />
              <label class="form-check-label"> Platform</label>
            </ContextMenuItem>
            <ContextMenuItem>
              <input
                type="checkbox"
                @change="columnsChange"
                disabled
                v-model="tableColumns.logFile"
                class="form-check-input tchk"
              />
              <label class="form-check-label"> Log file</label>
            </ContextMenuItem>
            <ContextMenuItem>
              <input
                type="checkbox"
                @change="columnsChange"
                v-model="tableColumns.version"
                class="form-check-input tchk"
              />
              <label class="form-check-label"> Version</label>
            </ContextMenuItem>
            <ContextMenuItem>
              <input
                type="checkbox"
                @change="columnsChange"
                v-model="tableColumns.release"
                class="form-check-input tchk"
              />
              <label class="form-check-label"> Release</label>
            </ContextMenuItem>
             <ContextMenuItem>
              <input
                type="checkbox"
                @change="columnsChange"
                v-model="tableColumns.executionMethod"
                class="form-check-input tchk"
              />
              <label class="form-check-label">Execution Method</label>
            </ContextMenuItem>
            <ContextMenuItem>
              <input
                type="checkbox"
               v-model="tableColumns.testcaseOwner"
                class="form-check-input tchk"
              />
              <label class="form-check-label"> Testcase Owner</label>
            </ContextMenuItem>
             <ContextMenuItem>
              <input
                type="checkbox"
                v-model="tableColumns.testExecOwner"
                class="form-check-input tchk"
              />
              <label class="form-check-label"> Test Execution Owner</label>
            </ContextMenuItem>
            <ContextMenuItem>
              <input
                type="checkbox"
                v-model="tableColumns.automated"
                class="form-check-input tchk"
              />
              <label class="form-check-label"> Automated</label>
            </ContextMenuItem>
            <ContextMenuItem>
              <input
                type="checkbox"
                v-model="tableColumns.smoke"
                class="form-check-input tchk"
              />
              <label class="form-check-label"> Smoke</label>
            </ContextMenuItem>
            <ContextMenuItem>
              <input
                type="checkbox"
                v-model="tableColumns.defects"
                class="form-check-input tchk"
              />
              <label class="form-check-label"> Defects</label>
            </ContextMenuItem>
            <ContextMenuItem>
              <input
                type="checkbox"
                disabled
                v-model="tableColumns.result"
                class="form-check-input tchk"
              />
              <label class="form-check-label"> Result</label>
            </ContextMenuItem>
             </template>
        </ContextMenu>
        <ContextMenu class="logMenu" ref="release_edit_menu">
          <template>
            <ContextMenuItem @click.native="editReleaseNote()">
              Edit
            </ContextMenuItem>
          </template>
        </ContextMenu>
        <ContextMenu class="testMenu" ref="test_menu">
          <template
            style="width:100%;height:200px"
            slot-scope="{ contextData }"
          >
            <ContextMenuItem
              v-if="isBulkSelection(contextData)"
              @click.native="bulkEditTestcases()"
            >
              Edit
            </ContextMenuItem>
            <ContextMenuItem
              v-if="isBulkSelection(contextData)"
              @click.native="deleteTestcase(contextData)"
            >
              Delete
            </ContextMenuItem>
            <ContextMenuItem
              v-if="
                isBulkSelection(contextData) &&
                  isOnlyFeatureSelection(contextData)
              "
              @click.native="selectFeatureList($event)"
            >
              {{ getSelectedFeatureName(contextData) }}
            </ContextMenuItem>
            <ContextMenuItem
              v-if="isBulkSelection(contextData)"
              @click.native="selectAll()"
            >
              Select all
            </ContextMenuItem>
            <ContextMenuItem
              v-if="checkResultUpdated(contextData)"
              @click.native="updateTims()"
            >
              Update Tims
            </ContextMenuItem>
          </template>
        </ContextMenu>
         <ExportTablePage
          style="display:none;"
          :tableColumns="tableColumns"
          :exportColumns="exportColumns"
          :testcases="testcases"
          :features="features"
          :projectId="projectId"
          :topologyList="topologyList"
          :inventory="inventoryDevices"
          :config_data="config_data"
          :selectedCharts="selectedCharts"
        />
      </div>
      <!---->
      <div v-if="editTestcasemodal" class="editTestCaseModal">
        <div
          class="modal__header"
          style="display:flex; justify-content:space-between; margin-bottom:5px;"
        >
          <div class="modal_title">Edit Testcases</div>
          <span
            class="icon-close icon-small interaction"
            v-on:click="closeEditModal()"
          ></span>
        </div>
        <div class="modal__body" style="display:flex; justify-content:center;">
          <form
            class="testCaseForm"
            style="height: 98%;padding-left: 60px;"
            @submit.prevent="handleSubmit"
          >
            <div class="form-group tm-form-group1 row" style="width:97%">
              <div style="width:20%">
                <div class="form-group__text tm-form__text">
                  <select
                    v-model="bulkValues.tc_feature"
                    class="feature1"
                    @change="onChange($event)"
                  >
                    <option value="">Select</option>
                    <option value="MPLS TE">MPLS TE</option>
                    <option value="SRTE">SRTE</option>
                    <option value="ISIS">ISIS</option>
                    <option value="BGP">BGP</option>
                    <option value="Infra">Infra</option>
                    <option value="Install">Install</option>
                    <option value="QoS">QoS</option>
                    <option value="Netflow">Netflow</option>
                    <option value="ACL">ACL</option>
                    <option value="GRE">GRE</option>
                    <option value="MPLS">MPLS</option>
                    <option value="ARP/ND">ARP/ND</option>
                    <option value="Telemetry">Telemetry</option>
                    <option value="Config Management">Config Management</option>
                    <option value="Trigger">Trigger</option>
                    <option value="MPLS Static">MPLS Static</option>
                    <option value="Interface">Interface</option>
                  </select>

                  <label class="tm-label">
                    Feature
                  </label>
                </div>
              </div>
              <div style="width:20%">
                <div class="form-group__text tm-form__text">
                  <select
                    v-model="bulkValues.tc_type"
                    class="type"
                    @change="onChange($event)"
                  >
                    <option value="">Select</option>
                    <option value="Functional">Functional</option>
                    <option value="Negative">Negative</option>
                    <option value="Scale">Scale</option>
                    <option value="Stress">Stress</option>
                    <option value="Trigger">Trigger</option>
                    <option value="HA">HA</option>
                    <option value="Manageability">Manageability</option>
                    <option value="Convergence">Convergence</option>
                    <option value="Longevity">Longevity</option>
                  </select>
                  <label class="tm-label">
                    Type
                  </label>
                </div>
              </div>
              <div style="width:20%">
                <div class="form-group__text tm-form__text">
                  <input type="text" name="dut" v-model="bulkValues.tc_dut" />

                  <label class="tm-label">
                    DUT
                  </label>
                </div>
              </div>
              <div style="width:20%">
                <div class="form-group__text tm-form__text">
                  <select
                    v-model="bulkValues.tc_priority"
                    class="priority"
                    @change="onChange($event)"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">low</option>
                  </select>
                  <label class="tm-label">
                    Priority
                  </label>
                </div>
              </div>
              <div style="width:20%">
                <div class="form-group__text tm-form__text">
                  <input type="text" name="role" v-model="bulkValues.tc_role" />

                  <label class="tm-label">
                    Role
                  </label>
                </div>
              </div>
            </div>
            <div class="form-group tm-form-group1 row" style="width:97%">
              <div style="width:20%">
                <div class="form-group__text tm-form__text">
                  <select
                    v-model="bulkValues.tc_regression"
                    class="regression"
                    @change="onChange($event)"
                  >
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                  <label class="tm-label">
                    Regression
                  </label>
                </div>
              </div>
              <div style="width:20%">
                <div class="form-group__text tm-form__text">
                  <select
                    v-model="bulkValues.tc_customer"
                    class="customer"
                    @change="onChange($event)"
                  >
                    <option value="Google">Google</option>
                    <option value="Microsoft">Microsoft</option>
                  </select>
                  <label class="tm-label">
                    Customer
                  </label>
                </div>
              </div>
              <div style="width:20%">
                <div class="form-group__text tm-form__text">
                  <input type="text" name="tag" v-model="bulkValues.tc_tag" />
                  <label class="tm-label">
                    Tag
                  </label>
                </div>
              </div>
              <div style="width:20%">
                <div class="form-group__text tm-form__text">
                  <select
                    v-model="bulkValues.tc_smoke"
                    class="smoke"
                    @change="onChange($event)"
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  <label class="switch">
                    Smoke
                  </label>
                </div>
              </div>
              <div style="width:20%">
                <div class="form-group__text tm-form__text">
                  <select
                    v-model="bulkValues.tc_platform"
                    class="platform"
                    @change="onChange($event)"
                  >
                    <option value="">Select</option>
                    <option value="ASR9000">ASR9000</option>
                    <option value="NCS5000">NCS5000</option>
                    <option value="NCS5500">NCS5500</option>
                    <option value="8000">8000</option>
                  </select>
                  <label class="tm-label">
                    Platform
                  </label>
                </div>
              </div>
            </div>
            <div class="form-group tm-form-group1 row" style="width:97%">
              <div style="width:20%">
                <div class="form-group__text tm-form__text">
                  <select
                    v-model="bulkValues.tc_release"
                    class="release"
                    @change="onChange($event)"
                  >
                    <option value="7.1.2">7.1.2</option>
                    <option value="7.1.3">7.1.3</option>
                    <option value="7.3.1">7.3.1</option>
                    <option value="7.3.2">7.3.2</option>
                  </select>
                  <label class="tm-label">
                    Release
                  </label>
                </div>
              </div>
              <div style="width:20%">
                <div class="form-group__text tm-form__text">
                  <input
                    type="text"
                    name="version"
                    v-model="bulkValues.tc_version"
                  />
                  <label class="tm-label">
                    Version
                  </label>
                </div>
              </div>

              <div style="width:20%">
                <div class="form-group__text tm-form__text">
                  <select
                    v-model="bulkValues.tc_exectution_method"
                    class="execMethod"
                    @change="onChange($event)"
                  >
                    <option value="manual">manual</option>
                    <option value="auto">auto</option>
                  </select>
                  <label class="tm-label">
                    Execution method
                  </label>
                </div>
              </div>
              <div style="width:20%">
                <div class="form-group__text tm-form__text">
                  <select
                    v-model="bulkValues.tc_result"
                    class="result"
                    @change="onChange($event)"
                    @focus="onFocus($event)"
                  >
                    <option value="pending">Pending</option>
                    <option value="passed">Passed</option>
                    <option value="failed">Failed</option>
                    <option value="blocked">Blocked</option>
                    <option value="passes w/ exeption"
                      >Passes w/ Exeption</option
                    >
                  </select>
                  <label class="tm-label">
                    Result
                  </label>
                </div>
              </div>
              <div style="width:20%">
                <div class="form-group__text tm-form__text">
                  <input
                    type="text"
                    name="featureId"
                    v-model="bulkValues.tc_featureId"
                  />
                  <label class="tm-label">
                    Rally Id
                  </label>
                </div>
              </div>
            </div>
            <div class="form-group tm-form-group1 row" style="width:97%">
              <div style="width:20%">
                <div class="form-group__text tm-form__text">
                  <select
                    v-model="bulkValues.tc_topology"
                    class="topology1"
                    @change="onChange($event)"
                  >
                    <option value="newTopo">Create new</option>
                    <template v-for="(topo, ind) in topoList">
                      <option :key="ind" :value="topo">{{ topo }}</option>
                    </template>
                  </select>
                  <input
                    type="file"
                    class="topology_file1"
                    @change="onTopologyImgChange1($event)"
                  />
                  <label class="tm-label">
                    Topology
                  </label>
                </div>
              </div>
              <div style="width:20%">
                <div class="form-group__text tm-form__text">
                  <input
                    type="text"
                    name="testcaseOwner"
                    v-model="bulkValues.tc_testcaseOwner"
                  />
                  <label class="tm-label">
                    Testcase Owner
                  </label>
                </div>
              </div>
              <div style="width:20%">
                <div class="form-group__text tm-form__text">
                  <input
                    type="text"
                    name="testExecOwner"
                    v-model="bulkValues.tc_testExecOwner"
                  />
                  <label class="tm-label">
                    Test Exec Owner
                  </label>
                </div>
              </div>
              <div style="width:20%">
                <div class="form-group__text tm-form__text">
                  <input
                    type="text"
                    name="duration"
                    v-model="bulkValues.tc_duration"
                  />
                  <label class="tm-label">
                    Duration
                  </label>
                </div>
              </div>
              <div style="width:20%">
                <div class="form-group__text tm-form__text">
                  <select
                    v-model="bulkValues.tc_source"
                    class="source"
                    @change="onChange($event)"
                  >
                   <option value="CVT">CVT</option>
                <option value="CRD">CRD: Customer Requirements</option>
                <option value="CFD">CFD: Customer Found Defect</option>
                 <option value="CR">CR: Change Request</option>
                  </select>
                  <label class="tm-label">
                    Source
                  </label>
                </div>
              </div>
               <div style="width:20%">
                <div class="form-group__text tm-form__text">
                  <select
                    v-model="bulkValues.automation_flag"
                    class="automation_flag"
                    @change="onChange($event)"
                  >
                  <option value="true">Yes</option>
                 <option value="false">No</option>
                  </select>
                  <label class="tm-label">
                    Automated
                  </label>
                </div>
              </div>
            </div>
            <div class="form-group tm-form-group1 row" style="width:100%">
              <div class="form-group__text tm-form__text" style="width:100%">
                <textarea
                  v-model="bulkValues.tc_defects"
                  name="defects"
                  style="display: block;
            "
                ></textarea>
                <label class="tm-label" for="defects">
                  Defects
                </label>
              </div>
            </div>
           <div class="form-group tm-form-group" style="width:20%">
          <div class="">
            <input
              style="margin-right: 20px;"
              type="checkbox"
              name="update_master"
              v-model="bulkValues.update_master"
            />
            <label class="tm-label" for="update_master">
              Update Master
            </label>
          </div>
        </div>
            <div class="tm_btn-container" style="margin-top:35px;">
              <button
                class="btn btn--secondary tmBtn"
                @click="closeBulkEditForm"
                style="font-size:1.4rem;"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="tmBtn btn btn--secondary"
                style="font-size:1.4rem;"
              >
                Submit
              </button>
              <button
                v-if="timsUpdateFlag"
                @click="updateTims"
                class="tmBtn btn btn--secondary"
                style="font-size:1.4rem;"
              >
                Update Tims
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        v-if="showChart"
        id="bar1Div"
        class="barChart"
        style="min-width:800px;height:500px;"
      >
        <div id="barChart1"></div>
        <div id="mainTooltip1" class="hidden half-padding">
          <div class="flex-row">
            <div class="short-message-tooltip qtr-padding-top">
              <div class="alert__message" id="value"></div>
            </div>
          </div>
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
      <div v-if="showEditReleaseNoteModal" class="releaseNoteModal">
        <form
          class="EditReleaseNoteForm"
          style="height: 98%;padding-left: 180px;"
        >
          <textarea
            v-model="releaseNote"
            rows="30"
            cols="200"
            style="width: 90%;min-height: 200px !important;"
          />
          <div class="tm_btn-container">
            <button
              class="btn btn--secondary tmBtn"
              @click="closeEditReleaseForm"
              style="font-size:1.4rem;"
            >
              Cancel
            </button>
            <button
              class="btn btn--secondary tmBtn"
              @click="saveReleaseNote"
              style="font-size:1.4rem;"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <div v-if="showEditExport" class="editTestCaseModal">
        <div
          class="modal__header"
          style="display:flex; justify-content:space-between; margin-bottom:5px;"
        >
          <div class="modal_title">Select the fields to export</div>
          <span
            class="icon-close icon-small interaction"
            v-on:click="closeEditExportModal()"
          ></span>
        </div>
        <div class="modal__body" style="display:flex; justify-content:center;">
          <form
            class="exportTestCaseForm"
            style="height: 98%;padding-left: 60px;width: 100%;"
          >
            <div class="row" style="width:97%">
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_title"
                  disabled
                  checked
                  v-model="tempExportColumn.tc_title"
                />
                <label class="exportLabel" for="tc_title">Title</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  disabled
                  checked
                  name="tc_feature"
                  v-model="tempExportColumn.tc_feature"
                />
                <label class="exportLabel" for="tc_feature">Feature</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_description"
                  v-model="tempExportColumn.tc_description"
                />
                <label class="exportLabel" for="tc_description"
                  >Description</label
                >
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_type"
                  v-model="tempExportColumn.tc_type"
                />
                <label class="exportLabel" for="tc_type">Type</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_dut"
                  v-model="tempExportColumn.tc_dut"
                />
                <label class="exportLabel" for="tc_dut">DUT</label>
              </div>
            </div>
            <div class="row" style="width:97%">
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_priority"
                  v-model="tempExportColumn.tc_priority"
                />
                <label class="exportLabel" for="tc_priority">Priority</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_role"
                  v-model="tempExportColumn.tc_role"
                />
                <label class="exportLabel" for="tc_role">Role</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_regression"
                  v-model="tempExportColumn.tc_regression"
                />
                <label class="exportLabel" for="tc_regression"
                  >Regression</label
                >
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  disabled
                  checked
                  name="tc_customer"
                  v-model="tempExportColumn.tc_customer"
                />
                <label class="exportLabel" for="tc_customer">Customer</label>
              </div>

              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_tag"
                  v-model="tempExportColumn.tc_tag"
                />
                <label class="exportLabel" for="tc_tag">Tag</label>
              </div>
            </div>
            <div class="row" style="width:97%">
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_smoke"
                  v-model="tempExportColumn.tc_smoke"
                />
                <label class="exportLabel" for="tc_platform">Smoke</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_platform"
                  v-model="tempExportColumn.tc_platform"
                />
                <label class="exportLabel" for="tc_platform">Platform</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_release"
                  disabled
                  checked
                  v-model="tempExportColumn.tc_release"
                />
                <label class="exportLabel" for="tc_release">Release</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_version"
                  v-model="tempExportColumn.tc_version"
                />
                <label class="exportLabel" for="tc_version">Version</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_topology"
                  v-model="tempExportColumn.tc_topology"
                />
                <label class="exportLabel" for="tc_topology">Topology</label>
              </div>
            </div>
            <div class="row" style="width:97%">
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_exectution_method"
                  v-model="tempExportColumn.tc_exectution_method"
                />
                <label class="exportLabel" for="tc_exectution_method"
                  >Execution Method</label
                >
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  disabled
                  checked
                  name="tc_result"
                  v-model="tempExportColumn.tc_result"
                />
                <label class="exportLabel" for="tc_result">Result</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_featureId"
                  v-model="tempExportColumn.tc_featureId"
                />
                <label class="exportLabel" for="tc_featureId">Feature Id</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_testcaseOwner"
                  v-model="tempExportColumn.tc_testcaseOwner"
                />
                <label class="exportLabel" for="tc_testcaseOwner"
                  >Testcase Owner</label
                >
              </div>

              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_testExecOwner"
                  v-model="tempExportColumn.tc_testExecOwner"
                />
                <label class="exportLabel" for="tc_testExecOwner"
                  >Test Exec Owner</label
                >
              </div>
            </div>
            <div class="row" style="width:97%">
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_procedure"
                  v-model="tempExportColumn.tc_procedure"
                />
                <label class="exportLabel" for="tc_procedure">Procedure</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_pass_fail_criteria"
                  v-model="tempExportColumn.tc_pass_fail_criteria"
                />
                <label class="exportLabel" for="tc_pass_fail_criteria"
                  >Pass/Fail Criteria</label
                >
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_logs"
                  disabled
                  checked
                  v-model="tempExportColumn.tc_logs"
                />
                <label class="exportLabel" for="tc_logs">Logs</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_source"
                  v-model="tempExportColumn.tc_source"
                />
                <label class="exportLabel" for="tc_source"
                  >Testcase Source</label
                >
              </div>

              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_duration"
                  v-model="tempExportColumn.tc_duration"
                />
                <label class="exportLabel" for="tc_duration">Duration</label>
              </div>
            </div>
            <div class="row" style="width:97%">
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_ifd"
                  v-model="tempExportColumn.tc_ifd"
                />
                <label class="exportLabel" for="tc_ifd">IFD</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_cfd"
                  v-model="tempExportColumn.tc_cfd"
                />
                <label class="exportLabel" for="tc_cfd">CFD</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="tc_defects"
                  v-model="tempExportColumn.tc_defects"
                />
                <label class="exportLabel" for="tc_defects">Defects</label>
              </div>
            </div>
              <div class="row" style="width:97%">
              <div style="text-align: left;">
                <input
                  type="checkbox"
                  name="tc_with_logs"
                  v-model="tempExportColumn.tc_with_logs"
                />
                <label class="exportLabel" for="tc_with_logs">Testcases with Logs</label>
              </div>
              </div>
              <div class="modalTitle">Charts</div>
              <div class="row" style="width:97%">
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="executionSummary"
                  v-model="tempExportCharts.executionSummary"
                />
                <label class="exportLabel" for="executionSummary">Execution Summary</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="weeklyExecutionSummary"
                  v-model="tempExportCharts.weeklyExecutionSummary"
                />
                <label class="exportLabel" for="weeklyExecutionSummary">Weekly Execution Summary</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="platformRoleQuality"
                  v-model="tempExportCharts.platformRoleQuality"
                />
                <label class="exportLabel" for="platformRoleQuality">Platform Role Quality</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="platformQuality"
                  v-model="tempExportCharts.platformQuality"
                />
                <label class="exportLabel" for="platformQuality">Platform Quality</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="defectsBreakdown"
                  v-model="tempExportCharts.defectsBreakdown"
                />
                <label class="exportLabel" for="defectsBreakdown">Defects Breakdown</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="defectsByComponent"
                  v-model="tempExportCharts.defectsByComponent"
                />
                <label class="exportLabel" for="defectsByComponent">Defects By Component</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="featureChart"
                  v-model="tempExportCharts.featureChart"
                />
                <label class="exportLabel" for="featureChart">Testcases By Features</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="weeklyDefectChart"
                  v-model="tempExportCharts.weeklyDefectChart"
                />
                <label class="exportLabel" for="weeklyDefectChart">Defects By Weekly</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="featureQuality"
                  v-model="tempExportCharts.featureQuality"
                />
                <label class="exportLabel" for="featureQuality">Feature Quality</label>
              </div>
               <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="sourceQuality"
                  v-model="tempExportCharts.sourceQuality"
                />
                <label class="exportLabel" for="sourceQuality">Source Quality</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="mhDefect"
                  v-model="tempExportCharts.mhDefect"
                />
                <label class="exportLabel" for="mhDefect">MH Defects</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="roleChart"
                  v-model="tempExportCharts.roleChart"
                />
                <label class="exportLabel" for="roleChart">Testcases By Roles</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="platformChart"
                  v-model="tempExportCharts.platformChart"
                />
                <label class="exportLabel" for="platformChart">Testcases By Platforms</label>
              </div>
               <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="sourceChart"
                  v-model="tempExportCharts.sourceChart"
                />
                <label class="exportLabel" for="sourceChart">Testcases By Source</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="defectsByStatus"
                  v-model="tempExportCharts.defectsByStatus"
                />
                <label class="exportLabel" for="defectsByStatus">Defects By Status</label>
              </div>
              <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="defectsBySubmitter"
                  v-model="tempExportCharts.defectsBySubmitter"
                />
                <label class="exportLabel" for="defectsBySubmitter">Defects By Submitter</label>
              </div>
               <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="userChart"
                  v-model="tempExportCharts.userChart"
                />
                <label class="exportLabel" for="userChart">Users</label>
              </div>
               <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="userTestcaseDefectsChart"
                  v-model="tempExportCharts.userTestcaseDefectsChart"
                />
                <label class="exportLabel" for="userTestcaseDefectsChart">Testcases, Defects by Users</label>
              </div>
                <div style="width:20%;text-align: left;">
                <input
                  type="checkbox"
                  name="heatMap"
                  v-model="tempExportCharts.heatMap"
                />
                <label class="exportLabel" for="heatMap">Execution Summary Heat Map</label>
              </div>
             </div>


            <div class="tm_btn-container">
              <button
                class="btn btn--secondary tmBtn"
                @click="closeEditExportModal"
                style="font-size:1.4rem;"
              >
                Cancel
              </button>
              <button
                class="btn btn--secondary tmBtn"
                @click="saveExportForm"
                style="font-size:1.4rem;"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      <div v-if="showImportModal" class="importModal">
        <div
          class="modal__header"
          style="display:flex; justify-content:space-between; margin-bottom:5px;"
        >
          <div class="modal_title">Select the testcases to Import</div>
          <span
            class="icon-close icon-small interaction"
            v-on:click="closeImportModal()"
          ></span>
        </div>
        <div class="modal__body" style="display:flex; justify-content:center;">
          <form id="importTestcaseForm">
            <div class="searchBox">
              <span class="icon-search searchBtn"></span>
              <input
                id="searchInput"
                class="form-control"
                type="text"
                @keyup="searchHandler"
                placeholder="Search"
                autocomplete="off"
                maxlength="2000"
              />
            </div>
            <table
              class="table table--highlight mainTable importTable"
              style="width: 100%;height: 100%;margin: 0;table-layout: fixed;"
            >
              <tbody>
                <template v-for="(ft, index) in featureTestcases">
                  <tr
                    :key="index"
                    class="summaryTablesValues1 summaryTablesValues2 featureValues"
                  >
                    <td
                      :colspan="parseInt(getColspan()) - 1"
                      style="width: 100%; overflow-wrap: break-word; "
                    >
                      {{ ft.feature }}
                    </td>
                  </tr>
                  <tr
                    style="width:100%;padding:0;height:30px;"
                    :key="'A' + index"
                  >
                    <td
                      class="mainFirstTd"
                      style="padding:0;"
                      :colspan="parseInt(getColspan())"
                    >
                      <table
                        class="table table--highlight secondaryTable"
                        style="width: 100%;height: 100%;margin: 0;table-layout: fixed;"
                      >
                        <template v-for="(fobj, index1) in ft.list">
                          <tr
                            class="featureTr featureValues"
                            :key="index1"
                            style="text-align:center; height:30px;width:100%;box-shadow: 0 3px 3px -2px #c1c1c1;"
                            @click="importRowSelect(fobj, $event)"
                          >
                            <td>
                              <input
                                type="checkbox"
                                class="checkbox"
                                v-model="selectedCheckboxes"
                                :value="fobj.id"
                              />
                            </td>
                            <td
                              class="testcase_td"
                              style="width:96%;text-align:left !important;"
                            >
                              {{ fobj.tc_title }}
                            </td>
                          </tr>
                        </template>
                      </table>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </form>
          <div class="tm_btn-container importBtns">
            <button
              class="btn btn--secondary tmBtn"
              @click="closeImportModal"
              style="font-size:1.4rem;"
            >
              Cancel
            </button>
            <button
              class="tmBtn btn btn--secondary"
              style="font-size:1.4rem;"
              @click="importTestcases"
            >
              Import
            </button>
          </div>
        </div>
      </div>
      <div v-if="showPassChecklist" class="PassChecklistModal">
        <div
          class="modal__header"
          style="display:flex; justify-content:space-between; margin-bottom:5px;"
        >
          <div class="modal_title">Select the steps completed</div>
          <span
            class="icon-close icon-small interaction"
            v-on:click="closeCheckListModal()"
          ></span>
        </div>
        <div class="modal__body" style="display:flex; justify-content:center;">
          <form
            class="checklistForm"
            style="height: 98%;padding-left: 60px;width: 100%;"
          >
            <div style="text-align: left;">
              <input
                type="checkbox"
                name="Traffic"
                v-model="passCheckList.Traffic"
              />
              <label class="exportLabel" for="Traffic">Traffic</label>
            </div>
            <div style="text-align: left;">
              <input
                type="checkbox"
                name="Telemetry"
                v-model="passCheckList.Telemetry"
              />
              <label class="exportLabel" for="Telemetry">Telemetry</label>
            </div>
            <div style="text-align: left;">
              <input
                type="checkbox"
                name="Crash_Traceback"
                v-model="passCheckList.Crash_Traceback"
              />
              <label class="exportLabel" for="Crash_Traceback"
                >Crash/Traceback</label
              >
            </div>
            <div style="text-align: left;">
              <input
                type="checkbox"
                name="Syslog"
                v-model="passCheckList.Syslog"
              />
              <label class="exportLabel" for="Syslog">Syslog</label>
            </div>
            <div style="text-align: left;">
              <input
                type="checkbox"
                name="Background_CLIs"
                v-model="passCheckList.Background_CLIs"
              />
              <label class="exportLabel" for="Background_CLIs"
                >Background CLIs</label
              >
            </div>
            <div style="text-align: left;">
              <input
                type="checkbox"
                name="System_stability"
                v-model="passCheckList.System_stability"
              />
              <label class="exportLabel" for="System_stability"
                >System stability</label
              >
            </div>
            <div style="text-align: left;">
              <input
                type="checkbox"
                name="Interface_flaps"
                v-model="passCheckList.Interface_flaps"
              />
              <label class="exportLabel" for="Interface_flaps"
                >Interface flaps</label
              >
            </div>
            <div style="text-align: left;">
              <input
                type="checkbox"
                name="Memory_leak"
                v-model="passCheckList.Memory_leak"
              />
              <label class="exportLabel" for="Memory_leak">Memory leak</label>
            </div>
            <div style="text-align: left;">
              <input
                type="checkbox"
                name="CPU_Hog"
                v-model="passCheckList.CPU_Hog"
              />
              <label class="exportLabel" for="CPU_Hog">CPU Hog</label>
            </div>
            <div v-if="checklistError" class="checklistError">
              To Pass the testcase, above steps should be completed
            </div>

            <div class="tm_btn-container">
              <button
                class="btn btn--secondary tmBtn"
                @click="closeCheckListModal"
                style="font-size:1.4rem;"
              >
                Cancel
              </button>
              <button
                class="btn btn--secondary tmBtn"
                @click="checkResultUpdate1"
                style="font-size:1.4rem;"
              >
                OK
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
