<script>
import { router } from "@/router";
import { store } from "../store/store";
import TestcaseList from "./testcaseList";
import { options } from "@/assets/options";
import { testcaseService } from "@/core/services/testcaseService";
import ContextMenu from "../components/global/ContextMenu/ContextMenu";
import { Tabs, Tab } from "vue-tabs-component";
import ContextMenuItem from "../components/global/ContextMenu/ContextMenuItem";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import Chart from "./Chart";

export default {
  name: "CustomerReleasesPage",
  props: ["customerId"],
  data() {
    return {
      chartShow:true,
      testcases:[],
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
      totalAutomated:0,
      totalPlatforms: 20,
      totalRoles: 5,
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
      testcasesWithLogs: 0,
      selectedRelease: "",
      selectedReleaseName: "",
      folder_name: "",
      folders: [],
      folderList: [],
      releases: [],
      releaseObj: {},
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
      showCreateReleaseModal: false,
      showCreateProjectModal: false,
      editProject: false,
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
      statusOption: {},
      testcasesFlag:0,
      qualityOption:{},
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
      bar_option:options.bar_option,
      platformRole_bar_option:options.platformRole_bar_option,
      quality_platformRole_bar_option:options.quality_platformRole_bar_option,
      userOption:options.userOption,
      summaryOptions:options.summaryOptions,
      summaryOptions1:options.summaryOptions1,
       summaryOptions2:options.summaryOptions2,
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
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
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
        showInLegend: true, // Set whether the pie chart is displayed in the legend
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
        showInLegend: true, // Set whether the pie chart is displayed in the legend
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
      text: "CVT defects by Status",
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
        showInLegend: true, // Set whether the pie chart is displayed in the legend
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
      timeLineOption:options.timeLineOption,
     pie_option1:options.pie_option1,
     cvtOptions:options.cvtOptions,
     splineOptions:options.splineOptions,
      platformOption: {},
      defectOption:{},
      roleOption: {},
      roleOption1:{},
      executionSummaryOption: {},
      executionSummaryOption1: {},
    };
  },
  components: {
    ContextMenu,
    ContextMenuItem,
    Chart,
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
    this.loadCFDS();
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
      debugger;
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
    loadCFDS() {
      this.loading = false;
      this.loadingMessage = "Loading Cfds";
      testcaseService.loadCFDDetails().then(
        (data) => {
          this.loading = false;
          this.loadingMessage = "";
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
    },
    deleteReleaseClicked(robj) {
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
    },
    EditProjectClicked(e, pObj) {
      this.$refs.rmenu.close();
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
    },
    syncBtnClicked(robj){
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
    },
    uploadSyncBtnClicked(robj){
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
    },
    deleteProjectClicked(e, pobj) {
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
      e.preventDefault();
    },
    showCFDTable() {
      this.showCFDModal = true;
    },
    closeCFDModal(e) {
      this.showCFDModal = false;
      e.preventDefault();
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
        platformRoles=[];
        
      for (let i = 0; i < testcases.length; i++) {
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
        testcaseDefects = testcaseDefects.concat(tempStr1);
        testcaseRoles.push(testcases[i].tc_role);

        if (testcases[i].tc_regression === 1) {
          testcasesRegression += 1;
        }
        if(testcases[i].tc_exectution_method &&
          testcases[i].tc_exectution_method === "auto"){
            totalAutomated+=1;
          }
        if (
          !(
            testcases[i].tc_logFileName === null ||
            testcases[i].tc_logFileName == undefined ||
            testcases[i].tc_logs === null ||
            testcases[i].tc_logs === undefined
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
      this.totalRegression = testcasesRegression;
      this.testcasesWithLogs = testcasesWithLogs;

      let defectByTestcaseOwners=0;
      let testcaseCDETS=[];
      let defectByOthers=0;
      for(let r=0;r<this.cdets.length;r++){
        testcaseCDETS.push(this.cdets[r]);
        if(allUsers.indexOf(this.cdets[r].submitter)>-1){
          defectByTestcaseOwners+=1;
       }
        else{
          defectByOthers+=1;
        }
      }

      this.testcaseCdets=testcaseCDETS;
      let testcaseDefectSummaryDeatils={"Testcase Found":defectByTestcaseOwners,"Testcase Observed":defectByOthers};
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
      for (let l = 0; l < allPlatformRoles.length; l++) {
        allPlatformRoles[l] = allPlatformRoles[l] === null ? "null" : allPlatformRoles[l];
        platformRoleSummaryDetails[allPlatformRoles[l]] = 0;
      }
      let tempObj={};
      for (let kt = 0; kt < testcases.length; kt++) {
        if (
          testcases[kt].tc_result === "pass" ||
          testcases[kt].tc_result === "fail" ||
          testcases[kt].tc_result === "passed" ||
          testcases[kt].tc_result === "failed"
        ){
        if(Object.keys(tempObj).indexOf(testcases[kt].tc_platform+"_"+testcases[kt].tc_role)>-1){
             tempObj[testcases[kt].tc_platform+"_"+testcases[kt].tc_role]["Executed"]+=1;
        if( testcases[kt].tc_result === "pass" ||
          testcases[kt].tc_result === "passed"){
             tempObj[testcases[kt].tc_platform+"_"+testcases[kt].tc_role]["Passed"]+=1;
          }
        }
        else{
           tempObj[testcases[kt].tc_platform+"_"+testcases[kt].tc_role]={"Executed":1,"Passed":0};
           if( testcases[kt].tc_result === "pass" ||
          testcases[kt].tc_result === "passed"){
            tempObj[testcases[kt].tc_platform+"_"+testcases[kt].tc_role]["Passed"]+=1;
          }
        }
        }
        
        platformRoleSummaryDetails[testcases[kt].tc_platform+"_"+testcases[kt].tc_role] += 1;
      }
      for(let sh=0;sh<allPlatformRoles.length;sh++){
        obj={};
         let perc=tempObj[allPlatformRoles[sh]].Passed/tempObj[allPlatformRoles[sh]].Executed*100;
          obj["name"]=allPlatformRoles[sh];
          obj["count"]=parseInt(perc);
          qualityPlatformRoleSummaryDetails.push(obj);
       }

       this.qualitySummary=qualityPlatformRoleSummaryDetails;
     
      this.platformRoleSummary = platformRoleSummaryDetails;
    
    let defectsSummaryDetails = {};
      for (let l = 0; l < allDefects.length; l++) {
        defectsSummaryDetails[allDefects[l]] = 0;
      }
      let temp123 = [];
      for (let kg = 0; kg < testcases.length; kg++) {
        temp123 = testcases[kg].tc_defects ? testcases[kg].tc_defects.split(",") : [];
        for (let ab = 0; ab < temp123.length; ab++) {
          temp123[ab]=temp123[ab].trim();
        }
        for (let s = 0; s < temp123.length; s++) {
          defectsSummaryDetails[temp123[s]] += 1;
        }
      }
      this.defectSummary = defectsSummaryDetails;

      let cfdSummaryDetails = {};
      for (let l = 0; l < allCFD.length; l++) {
        cfdSummaryDetails[allCFD[l]] = { count:0, headline:"", testcaseId:[]};
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
              cfdSummaryDetails[temp124[s]]["headline"]+=this.cfdDataList[h].headline;
            }
          }
        }
      } 

   //   for(let d=0;d<this.cfdDataList.length;d++){
          
   //   }
    
      this.cfdSummary = cfdSummaryDetails;

      let testcasesFeatureData = this.loadFeatureChartData(testcases);
      let qualityData=this.loadQualityData();
      let testcasesSrcData = this.loadChartData(testcases, "tc_source");
      let testcasesPlatformData = this.loadChartData(testcases, "tc_platform");
      let testcasesRoledata = this.loadChartData(testcases, "tc_role");
      let testcasesPlatformRoledata = this.loadPlatformRoleChartData(testcases);
      //let executionSummaryData = this.loadChartData(testcases, "tc_result");
       let executionSummaryData = this.loadSummaryChartData(testcases, "tc_result");
       let splineSummaryData=this.loadSplineSummaryData(testcases);
       let userData = this.userSummary;

      this.bar_option.series = testcasesFeatureData;
      this.featureOption = this.bar_option;
      debugger;
      this.platformRole_bar_option.series = testcasesPlatformRoledata;
      this.platformRoleOption = this.platformRole_bar_option;

      this.pie_option.series[0].data = testcasesPlatformData;
      this.platformOption = this.pie_option;

      this.pie_option2.series[0].data=this.testcasesSrcData;
      this.srcOption=this.pie_option2;

      //here
      this.pie_option1.series[0].data=this.testcaseDefectSummary;
      this.defectOption=this.pie_option1;

      this.quality_platformRole_bar_option.series = qualityData;
      this.qualityOption = this.quality_platformRole_bar_option;

      this.summaryOptions.series[0].data=executionSummaryData;
      this.executionSummaryOption = this.summaryOptions;

      this.userOption.series[0].data=userData;

     // this.executionSummaryOption.redraw();


      this.summaryOptions1.series[0].data=executionSummaryData;
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
    loadQualityData(){
        let colors=this.featureColors;
        let ft=[];
        for (let m = 0; m < this.qualitySummary.length; m++) {
        ft.push({
          name: this.qualitySummary[m].name,
          color: colors[m % colors.length],
          data: [
            {
              name: this.qualitySummary[m].name,
              x: m + 1,
              y: this.qualitySummary[m].count,
            },
          ],
        });
      }

     return ft;
    },
    loadFeatureChartData(testcases) {
      let testcasefeatures = [];
      let key = "tc_feature";
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
          testcases[k].tc_result === "failed"){
            actual+=1;
          }
           if( testcases[k].tc_result === "pass" ||
          testcases[k].tc_result === "passed"){
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
    updateSelectedCdetsList(e,type){
      let name=e.point.name;
      this.selectedCdets=[];
        for(let k=0;k<this.selectedCdetsCopy.length;k++){
          if(this.selectedCdetsCopy[k][type]===name){
            this.selectedCdets.push(this.selectedCdetsCopy[k]);
          }
        }
      debugger;
    },
    loadTestcaseCDETSData(){
      let cdets=this.testcaseCdets;
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

    },
    loadCDETSData(relId) {
      let self = this;
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

          let fe2 = [];
          for (let s = 0; s < cdet_components2.length; s++) {
            arr = [];
            arr.push(cdet_components2[s].name);
            arr.push(cdet_components2[s].count);
            fe2.push(arr);
          }
          self.cdets_component_data = fe2;
          self.cdetsOptions1.series[0].data = fe2;
          self.componentOption = self.cdetsOptions1;

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
            self.loading = true;
            self.loadingMessage = "updating charts";
            let testcases = data;
            self.testcases=data;
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
            self.loading = true;
            self.loadingMessage = "updating charts";
            let testcases = data;
             self.testcases = data;
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
        let self = self;
        testcaseService.getTestcaseList(prId).then(
          (data) => {
            self.loading = true;
            self.loadingMessage = "updating charts";
            let testcases = data;
             self.testcases=data;
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
    createProjectClicked(robj) {
      this.$refs.rmenu.close();
      this.project_obj["r_id"] = robj.rid;
      this.project_obj["r_name"] = robj.rname;
      this.project_obj["project_name"] = "";
      this.project_obj["tims_id"] = "";
      this.showCreateProjectModal = true;
    },
    updateCdetsDetails(){
      let temp123="";
      let testcaseOwers=[];
      for(let x=0;x<this.testcases.length;x++){
        temp123 = this.testcases[x].tc_defects ? this.testcases[x].tc_defects.split(",") : [];
        for (let ab = 0; ab < temp123.length; ab++) {
          temp123[ab]=temp123[ab].trim();
          for(let h=0;h<this.selectedCdets.length;h++){
            if(this.selectedCdets[h].defect_id===temp123[ab]){
              this.selectedCdets[h]["tcCount"]+=1;
            }
          }
        }
      }
      this.selectedCdetsCopy=this.selectedCdets;
    },
    editReleaseClicked(robj) {
      this.$refs.rmenu.close();
      this.showCreateReleaseModal = true;
      this.releaseObj = {
        id: robj.id,
        customer_id: this.customerId,
        name: robj.rname,
        timsId: robj.rtimsid,
        attribute: robj.rattribute,
        release_attribute: robj.release_attribute,
        query_string: robj.query_string,
        folder_name: robj.folder_name,
      };
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
           this.loadCDETSData(data[0].id);
          for (let i = 0; i < data.length; i++) {
            let fl = data[i].folder_name ? data[i].folder_name : "Unnamed";
            folders.push(fl);
            //testing
            //let fl = data[i].folder_name ? data[i].folder_name : "731";
            //folders.push(fl);
          }
          self1.folders = [...new Set(folders)];
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
          debugger;
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
              let relAttr = data1.release_attribute
                ? data1.release_attribute
                : "na";
              let queryStr = data1.query_string ? data1.query_string : "na";
              releasestemplete +=
                '<button type="button" class="collapsibleReleases to-right" data-timsid="' +
                timsid+'" data-attr="'+attr+'" data-queryStr="'+queryStr+'" data-folder="'+
                flName+'" data-relAttr="'+relAttr+'" id="release_' +
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
          debugger;
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
                self1.selectedRelease = this.id;
                self1.loadCDETSData(relId);
               self1.selectedReleaseName = this.innerText;
                let temp = document.querySelectorAll(".activePR");
                for (let i = 0; i < temp.length; i++) {
                  temp[i].classList.remove("activePR");
                }

                this.classList.add("activePR");
                self1.drawChart(relId,"Release");
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
              let qryStr = e.currentTarget.getAttribute("data-queryStr"); 
              let folderName = e.currentTarget.getAttribute("data-folder"); 
              let robj = {
                rid: e.currentTarget.id.substring(
                  e.currentTarget.id.lastIndexOf("_") + 1
                ),
                rname: e.currentTarget.innerText.split("\n")[0],
                rtimsid: timsId === "na" ? "" : timsId,
                rattribute: attr === "na" ? "" : attr, //temp[1],
                release_attribute: relAttr === "na" ? "" : relAttr,
                query_string: qryStr === "na" ? "" : qryStr,
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
                    '<div class="r_projects" id="' +
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
                    self1.selectedRelease = "project_" + prs[prs.length - 1];
                    self1.selectedReleaseName = this.innerText;
                    self1.drawChart(pr_id,"Project");
                    }
                    e.preventDefault();
                    e.stopPropagation();
                  });
                  prs[z].removeEventListener("contextmenu",function(){});
                  prs[z].addEventListener("contextmenu", function(e) {
                    //hardcoded
                    let prs = this.id.split("_");
                    let pr_id = prs[prs.length - 1];
                    let pr_timsId = prs[prs.length - 2];

                    let pr_name = this.innerText;
                    let pobj = {
                      pid: pr_id,
                      pname: pr_name,
                      rid: relId,
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
    createReleaseClicked: function() {
      this.showCreateReleaseModal = true;
      this.releaseObj = { customer_id: this.customerId };
    },
    checkNull:function(data){
      if(data===""){
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
    closeReleaseCustomerModal: function() {
      this.showCreateReleaseModal = false;
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
        this.showSummaryInfoModal = true;
      }
      else if (type === "CFDs") {
        this.summaryDetailsObj = this.cfdSummary;
        this.showCFDSummaryInfoModal = true;
    }
     
    },
    openTestcase:function(str){
      debugger;
      this.closeCFDSummaryInfoModal();

    },
    createRelease: function(e) {
      this.showCreateReleaseModal = false;
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
              Create Release
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
        <div class="col-lg-3 col-md-3" style="padding-right: 5px;">
         <div class="r_chartDiv" id="chart1Div">
              <Chart id="chart1" :option="executionSummaryOption"></Chart>
        </div>
         <div class="r_chartDiv">
              <Chart id="chart2" :option="executionSummaryOption1"></Chart>
            </div>
          <div class="r_chartDiv">
              <Chart id="chartab2" :option=" platformRoleOption"></Chart>
            </div>
          <div class="r_chartDiv">
              <Chart id="chartab1" :option="userOption"></Chart>
            </div>
        </div>
        <div class="col-lg-9 col-md-9" style="padding-left: 5px;">
        <div class="slidesBtn">
           <button class="r_summaryDiv c_testcases">
                <div class="totalCount">{{ totalTestcases }}</div>
                <div class="">Testcases</div>
           </button>
           <button
                class="r_summaryDiv c_features"
                @click="showSummary('Features')"
              >
                <div class="totalCount">{{ totalFeatures }}</div>
                <div class="">Features</div>
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
            <div class="belowCharts">
            <div class="col-lg-4 col-md-4">
                <div class="b_chartDiv">
              <Chart id="chart_a1" class="chartsA" :option="qualityOption"></Chart>
            </div>
             <div class="b_chartDiv">
              <Chart id="chart_a2" class="chartsA" :option="featureOption"></Chart>
            </div>
            </div>
            <div class="col-lg-4 col-md-4">
               <div class="b_chartDiv">
              <Chart id="chart_a3" class="chartsA" :option="defectOption"></Chart>
            </div>
             <div class="b_chartDiv">
              <Chart id="chart_a4" class="chartsA" :option="platformOption"></Chart>
            </div>
            </div>
            <div class="col-lg-4 col-md-4">
               <div class="b_chartDiv">
              <Chart id="chart_a5" class="chartsA" :option="componentOption"></Chart>
            </div>
             <div class="b_chartDiv">
              <Chart id="chart_a6" class="chartsA" :option="srcOption"></Chart>
            </div>
            </div>
            </div>
        </div>

        
        </div>
      </div>
        <div class="secondpage">
      <div class="contentGraph">
       <Chart id="timeLineChart" :option="timeLineOption"></Chart>
      </div>
      <div class="row">
      <div class="cvtChart col-lg-6 col-md-6">
      <Chart id="cvtChart" :option="cvtOptions"></Chart>
      </div>
      <div class="testcaseLineChart col-lg-5 col-md-5">
       <Chart id="splineChart" :option="splineOptions"></Chart>
      </div>
      </div>
      </div>
      <div class="thirdPage">
      <div class="row defectChartContainer">
      <div class="defectChart">
       <Chart id="chart7" :option="submitterOption"></Chart>
      </div>
       <div class="defectChart">
       <Chart id="chart8" :option="componentOption"></Chart>
      </div>
       <div class="defectChart">
        <Chart id="chart9" :option="statusOption"></Chart>
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
          :testcaseArray="testcases"
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
            Delete Folder
          </ContextMenuItem>
        </template>
      </ContextMenu>
      <ContextMenu ref="rmenu" class="rmenu">
        <template slot-scope="{ contextData }">
          <ContextMenuItem @click.native="createProjectClicked(contextData)">
            Create Project
          </ContextMenuItem>
          <ContextMenuItem @click.native="editReleaseClicked(contextData)">
            Edit Release
          </ContextMenuItem>
          <ContextMenuItem @click.native="deleteReleaseClicked(contextData)">
            Delete Release
          </ContextMenuItem>
          <ContextMenuItem @click.native="relSyncBtnClicked(contextData)">
            Sync from Tims
          </ContextMenuItem>
          <ContextMenuItem @click.native="uploadSyncBtnClicked(contextData)">
            Upload to Tims
          </ContextMenuItem>
        </template>
      </ContextMenu>
      <ContextMenu ref="pmenu" class="pmenu">
        <template slot-scope="{ contextData }">
          <ContextMenuItem
            @click.native="EditProjectClicked($event, contextData)"
          >
            Edit Project
          </ContextMenuItem>
          <ContextMenuItem
            @click.native="deleteProjectClicked($event, contextData)"
          >
            Delete Project
          </ContextMenuItem>
          <ContextMenuItem @click.native="syncBtnClicked($event, contextData)">
            Sync from Tims
          </ContextMenuItem>
           <ContextMenuItem @click.native="uploadSyncBtnClicked($event, contextData)">
           Upload to Tims
          </ContextMenuItem>
        </template>
      </ContextMenu>
    </div>
    <div v-if="showCreateReleaseModal" class="createCustomerModal">
      <div
        class="modal__header"
        style="display:flex; justify-content:space-between; margin-bottom:5px;"
      >
        <div class="modal_title">Create Release</div>
        <span
          class="icon-close icon-small interaction"
          v-on:click="closeReleaseCustomerModal()"
        ></span>
      </div>
      <div class="modal__body" style="display:flex; justify-content:center;">
        <form class="create_customer">
          <div class="form-group__text tm-form__text">
            <label class="cm-label">
              Release Name
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
              Query String
            </label>
            <textarea
              v-model="releaseObj.query_string"
              rows="1"
              cols="100"
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
              name="releaseObj.timsId"
              style="width: 100%;"
              v-model="releaseObj.tims_id"
            />
          </div>
          <div class="form-group__text tm-form__text">
            <label class="cm-label">
              Folder Name
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
              Create
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
        <div class="modal_title">Create Project</div>
        <span
          class="icon-close icon-small interaction"
          v-on:click="closeProjectReleaseModal()"
        ></span>
      </div>
      <div class="modal__body" style="display:flex; justify-content:center;">
        <form class="create_customer">
          <div class="form-group__text tm-form__text">
            <label class="cm-label">
              Project Name
            </label>
            <input type="text" name="release" v-model="project_obj.name" />
          </div>
          <div class="form-group__text tm-form__text">
            <label class="cm-label">
              TIMS Id
            </label>
            <input
              type="text"
              name="timsId"
              :disabled="editProject"
              v-model="project_obj.tims_id"
            />
          </div>
          <div class="form-group__text tm-form__text">
            <label class="cm-label">
              Release Name
            </label>
            <input
              type="text"
              disabled
              name="customer"
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
     <div v-if="showCFDSummaryInfoModal" class="summaryDisplayModal">
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
        <th style="text-align: left;">CFD
        </th>
        <th style="text-align: left;">Count</th>
         <th style="text-align: left;">Testcases</th>
          <th style="text-align: left;">Headline</th>
        </tr>
          <tr
            v-for="(item,propertyname,index) in summaryDetailsObj"
            :key="index"
          >
            <td style="text-align: left;">{{ propertyname }}</td>
            <td style="text-align: left;">{{ item.count }}</td>
            <td style="text-align: left;"><template v-for="str,index1 in item.testcaseId"><a :key="index1" @click="openTestcase(str)">{{ str }}</a><span :key="index1">&nbsp;</span></template></td>
            <td style="text-align: left;">{{ item.headline }}</td>
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
