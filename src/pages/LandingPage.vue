<script>
   import { router } from "@/router";
   import { testcaseService } from "@/core/services/testcaseService";
   import ChartA from "./ChartA";
   import DetailsWeeklyReportCharts from "./DetailsWeeklyReportCharts";
   import { authenticationService } from "@/core/services/auth";
   
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
     name: "LandingPage",
   
     data() {
       return {
         filteredRels:[],
         displayDetails:"",
         activeFlagDetails:{},
         showTabdetails:true,
         selectedExecOptions:{},
         showSummaryChart:true,
         customerListArray:{},
         summaryListArray:{},
         projectedCustListArray:{},
         showCustDetails:false,
          colorscheme: "dark-scheme",
         folderExecutionArray:{},
         execChartsList:[],
         folderFlagCount:0,
         showBuubleChart:false,
         platformBubbleChartOptions: {},
         platformBubbleChartOptions1: {},
         packedBubbleOptions: {
           chart: {
             type: "packedbubble",
             height: "100%",
           },
           title: {
             text: "",
           },
           tooltip: {
             useHTML: true,
             pointFormat: "<b>{point.name}:</b>",
           },
           plotOptions: {
             series: {
               point: {
                 cursor: "pointer",
                 events: {
                   click: function(event) {
                  /*   let redirectname = this.name;
                     if (this.name === undefined) {
                       redirectname = this.series.name;
                       router.push({
                         name: "CustomerReleasesPage",
                         params: {
                           redirectToName: redirectname,
                           redirectToType: "release",
                         },
                       });
                     } else {
                       router.push({
                         name: "CustomerReleasesPage",
                         params: {
                           redirectToName: redirectname,
                           redirectToType: "project",
                         },
                       });
                     }
                     event.preventDefault();*/
                   },
                 },
               },
             },
             packedbubble: {
               /*  cursor: 'pointer',
               events: {
                   click: function (event) {
                      alert("156")
                     
                   }
                   },*/
               //  useSimulation: false,
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
                   fontSize: "40px",
                   textOutline: "none",
                   fontWeight: "normal",
                 },
               },
             },
           },
           series: [],
         },
       };
     },
     mounted() {
       this.loadCharts();
     },
     
     components: {
       ChartA,
       DetailsWeeklyReportCharts
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
     methods: {
       onChildInteraction(args, payload) {
         switch (args) {
           case "toggleChart":
             this[payload] = !this[payload];
             break;
           case "showDetailedChartPopup":
             this.loadDetailedChartPopup(payload);
             break;
           case "closeDetailCharts":
             this.closeDetailCharts();
             break;
   
         }
       },
        logout(e) {
      authenticationService.logout();
      router.push({ name: "login" });
      e.preventDefault();
    },
      logoutClicked(e) {
      this.logout(e);
      e.preventDefault();
    },
       testManagerClicked(){
          let redirectname = this.name;
                     if (this.name === undefined) {
                       redirectname = this.series.name;
                       router.push({
                         name: "CustomerReleasesPage",
                         params: {
                           redirectToName: redirectname,
                           redirectToType: "release",
                         },
                       });
                     } else {
                       router.push({
                         name: "CustomerReleasesPage",
                         params: {
                           redirectToName: redirectname,
                           redirectToType: "project",
                         },
                       });
                     }
                     event.preventDefault();
       },
       closeDetailCharts(){
         this.displayDetails="";
       },
       showDetailsDisplay(relname){
         this.displayDetails=relname;
       },
       showDetails(relName){
         if(this.displayDetails[relName] && this.displayDetails[relName]===true){
           return true;
         }
         else {
           return false;
         }
       },
       loadDetailedChartPopup(relObj){
        // this.displayDetails=relname;
      if(relObj.type === "folder"){
       let redirectName= relObj.name.split('_')[0];
                       router.push({
                         name: "CustomerReleasesPage",
                         params: {
                           redirectToName: relObj.name,
                           redirectToType: "release",
                         },
                       });
      }
      else{
        let temp=relObj.name+'__'+relObj.folder;
                       router.push({
                         name: "CustomerReleasesPage",
                         params: {
                           redirectToName: temp,
                           redirectToType: "project",
                         },
                       });
      }
       },
       summaryViewButtonClicked(){
         this.showBuubleChart=false;
         this.showSummaryChart=true;
       },
       releasesViewButtonClicked(){
         this.showBuubleChart=true;
         this.showSummaryChart=false;
       },
           sortByDate(arr, key) {
      return arr.sort(function(a, b) {
        if(a[key]===""){
          return 1;
        }
        else if(b[key]===""){
          return 1;
        }
        var dateA = new Date(a[key]).getTime();
        var dateB = new Date(b[key]).getTime();
        return dateA < dateB ? 1 : -1;
      });
    },

       getExecOptions(execDataArray,execkey){
         return execDataArray[this.selectedExecOptions[execkey].name];
       },
       loadExecutionSummaryDetails( newResolve, newReject){
          this.loading = true;
         this.loadingMessage = "Loading Project Summary details...";
         let self = this;
         let customerListArray={};
         let summaryListArray={};
         let projectedCustListArray={};
         let customerSummary={}, projectSummary={};
         testcaseService.customerExecutionChartsSummary().then(
           (data1) => {
             let tempData=[];
             Object.entries(data1).forEach(([name,val]) => {
               val["folder"]=name;
                val["filterDate"]=null;
               let projects=val.ProjectSummary;
                 Object.entries(projects).forEach(([pname,pval]) => {
                    if(val["filterDate"]===null){
                       val["filterDate"]= pval.executionSummary.dates.fcs_date;
                    }
                   else if(pval.executionSummary.dates.fcs_date>val["filterDate"]){
                     val["filterDate"]= pval.executionSummary.dates.fcs_date;
                   }
                  });
              tempData.push(val)
               });
               let data = self.sortByDate(tempData, "filterDate");
               let rarr=[];
               for(let d=0;d<data.length;d++){
                 rarr.push(data[d].folder);
               }
               self.filteredRels=rarr;
              if(Object.keys(data).length>0){
                Object.entries(data).forEach(([index,folderValue]) => {
                  let folderName=folderValue.folder;
                  customerListArray[folderName]={};
                  summaryListArray[folderName]={};
                  projectedCustListArray[folderName]={};
                  customerSummary=folderValue.CustomerSummary;
                  projectSummary=folderValue.ProjectSummary;
                  Object.entries(customerSummary).forEach(([custName,custSummary]) => {
                   customerListArray[folderName][custName+'_'+folderName]={};
                   summaryListArray[folderName][custName+'_'+folderName]={};
                   projectedCustListArray[folderName][custName+'_'+folderName]={};
                   let objOptions=self.loadExecSummaryOptionsForData(custName+'_'+folderName,custSummary);
                   let pobjOptions=self.loadProjectedExecSummaryOptionsForData(custName+'_'+folderName,custSummary);
                   let summaryObj=self.loadSummaryDetailsFordata(custName+'_'+folderName,custSummary);
                   customerListArray[folderName][custName+'_'+folderName][folderName]={};
                   customerListArray[folderName][custName+'_'+folderName][folderName]=objOptions;
                   summaryListArray[folderName][custName+'_'+folderName][folderName]={};
                   summaryListArray[folderName][custName+'_'+folderName][folderName]=summaryObj;
                   projectedCustListArray[folderName][custName+'_'+folderName]=pobjOptions;
   
                    self.selectedExecOptions[custName+'_'+folderName]={};
                    self.selectedExecOptions[custName+'_'+folderName]["name"]=folderName;
                    self.selectedExecOptions[custName+'_'+folderName]["type"]="folder";
                     self.selectedExecOptions[custName+'_'+folderName]["folder"]=folderName;
                     
                 });
                  Object.entries(projectSummary).forEach(([prName,prSummary]) => {
                    let objOptions1=self.loadExecSummaryOptionsForData(prName,prSummary);
                    let summaryObj1=self.loadSummaryDetailsFordata(prName,prSummary);
                    let cust_name=prSummary.executionSummary.customer_name;
                    if(customerListArray[folderName][cust_name+'_'+folderName]){
                    customerListArray[folderName][cust_name+'_'+folderName][prName]={};
                    customerListArray[folderName][cust_name+'_'+folderName][prName]=objOptions1;
                    summaryListArray[folderName][cust_name+'_'+folderName][prName]={};
                    summaryListArray[folderName][cust_name+'_'+folderName][prName]=summaryObj1;
                   }
                  });
                });
                  self.customerListArray=customerListArray;
                   self.summaryListArray=summaryListArray;
                  self.projectedCustListArray=projectedCustListArray;
                  newResolve("OK");
              }
             
           },
            (error) => {
                 this.loading = false;
                 this.loadingMessage = "";
               });
        },
      /* loadCustomerExecutionSummary( newResolve, newReject) {
         this.loading = true;
         this.loadingMessage = "Loading Project Summary details...";
         let self = this;
         testcaseService.customerExecutionChartsSummary().then(
           (data) => {
              if(Object.keys(data).length>0){
             Object.entries(data).forEach(([key,value]) => {
               let folderName=key;
                let obj=self.loadExecSummaryOptionsForData(folderName,value);
                  if(Object.keys(self.customerListArray).indexOf(key)<0){
                 self.customerListArray[key]={};
                 self.customerListArray[key][key+'_'+folderName]={};
                 let objOptions=self.loadExecSummaryOptionsForData(key+'_'+folderName,value);
                 self.customerListArray[key][key+'_'+folderName][folderName]={}
                 self.customerListArray[key][key+'_'+folderName][folderName]=objOptions;
                 self.selectedExecOptions[key+'_'+folderName]='';
                 self.selectedExecOptions[key+'_'+folderName]=folderName;
                }
               else{
                  self.customerListArray[key][key+'_'+folderName]={};
                 let objOptions=self.loadExecSummaryOptionsForData(key+'_'+folderName,value);
                 self.customerListArray[key][key+'_'+folderName][folderName]={}
                 self.customerListArray[key][key+'_'+folderName][folderName]=objOptions;
                 self.selectedExecOptions[key+'_'+folderName]='';
                 self.selectedExecOptions[key+'_'+folderName]=folderName;
                }
             });
   
             //code here for weekly report loadWeeklyReportByCustomerName
   
   
   
             self.folderFlagCount-=1;
            if(self.folderFlagCount===0){
             newResolve("OK");
             }
             }
           },
            (error) => {
                 this.loading = false;
                 this.loadingMessage = "";
               });
          },*/
       /* loadProjectExecutionSummary(folderName, new1Resolve, new1Reject) {
         this.loading = true;
         this.loadingMessage = "Loading Project Summary details...";
         let self = this;
   
         testcaseService.projectExecutionSummary(folderName).then(
           (data2) => {
             self.exeSummaryArr = {};
             self.exeSummaryArr = data2;
           if (Object.keys(data2).length > 0) {
              self.summary_Arr = [];
              let keys = Object.keys(data2);
              let childObj = {};
              for (let m = 0; m < keys.length; m++) {
                     childObj = data2[keys[m]];
                     if (Object.keys(childObj).length <= 0) {
                       delete data2[keys[m]];
                  }
               }
                  Object.entries(data2).forEach(([key1,value1]) => {
                     let custname=value1.executionSummary.customer_name;
                      let objOptions=self.loadExecSummaryOptionsForData(key1,value1);
                     self.customerListArray[custname][custname+'_'+folderName][key1]=objOptions;
                   });
                
                 self.folderFlagCount-=1;
                 if(self.folderFlagCount===0){
                  new1Resolve("OK");
                 }
                }
               },
               (error) => {
                 this.loading = false;
                 this.loadingMessage = "";
               }
             );
          
       },*/
       loadExecutionSummaryOptions(){
         return  {
           title: {
             text: "Summary",
           },
           chart: {
             type: "pie",
             reflow: false,
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
               size: 250,
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
              
               },
             },
           ],
            responsive: {
             rules: [
               {
                 condition: {
                   maxWidth: 300,
                 },
                 chartOptions: {
                   plotOptions: {
                     series: {
                    
                     },
                   },
                 },
               },
             ],
           },
         }
       },
       loadProjectedExecSummaryOptionsForData(keyname,data){
         let pexecOptions={};
         let executionSummaryData=[];
         pexecOptions=JSON.parse(JSON.stringify(this.loadExecutionSummaryOptions()));
         pexecOptions.title.text=keyname;
           executionSummaryData = [
              {
             name: "passed",
             color: "#76B947",
             y: data.executionSummary.passed.projected_count,
              },
           {
             name: "failed",
             color: "#F51720",
             y:data.executionSummary.failed.projected_count,
           },
           {
             name: "pending",
             color: "#2094df",
             y:data.executionSummary.pending.projected_count,
           },
         ];
           pexecOptions.series[0].data = executionSummaryData;
           return pexecOptions;
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
       loadSummaryDetailsFordata(keyname,data){
         let summaryobj={};
         summaryobj["total"]=data.executionSummary.totalTestcases;
         summaryobj["executed"]=data.executionSummary.executed.percentage;
         summaryobj["quality"]=data.executionSummary.resultQuality.resultQuality;
         summaryobj["defects"]=20;
         summaryobj["mh"]=6;
         let planned=data.executionSummary.planned?data.executionSummary.planned:data.executionSummary.executed.count+10;
         let total=data.executionSummary.totalTestcases;
         let plannedPerc = parseInt((planned / total) * 100);
         let execPerc = data.executionSummary.executed.percentage;
         let diff = plannedPerc - execPerc;
         let executionCircleColor = this.getColorForExecution(diff);
         summaryobj["executionCircleColor"]=executionCircleColor;
         return summaryobj;
       },
       loadExecSummaryOptionsForData(keyname,data){
         let execOptions={};
         let executionSummaryData=[];
         execOptions=JSON.parse(JSON.stringify(this.loadExecutionSummaryOptions()));
         execOptions.title.text=keyname;
           executionSummaryData = [
              {
             name: "passed",
             color: "#76B947",
             y: data.executionSummary.passed.count,
              },
           {
             name: "failed",
             color: "#F51720",
             y:data.executionSummary.failed.count,
           },
           {
             name: "pending",
             color: "#2094df",
             y:data.executionSummary.pending.count,
           },
         ];
           execOptions.series[0].data = executionSummaryData;
           return execOptions;
       },
       loadAllExecCharts(){
        let execChartsList=[],obj={},execOptions={},executionSummaryData=[];
        Object.entries(this.folderExecutionArray).forEach(([foldername, folderPrs]) =>{
           Object.entries(folderPrs).forEach(([prname, prValues]) =>{
             execOptions={};
             executionSummaryData=[];
             execOptions=JSON.parse(JSON.stringify(this.loadExecutionSummaryOptions()));
   
            if(prname.indexOf(prValues.executionSummary.customer_name)>-1){
               execOptions.title.text=prname;
             }
             else{
               if(prname.indexOf(foldername)>-1){
                 execOptions.title.text=prValues.executionSummary.customer_name+'_'+prname;
               }
               else{
               execOptions.title.text=prValues.executionSummary.customer_name+'_'+foldername+'_'+prname;
               }
             }
              executionSummaryData = [
              {
             name: "passed",
             color: "#76B947",
             y: prValues.executionSummary.passed,
              },
           {
             name: "failed",
             color: "#F51720",
             y:prValues.executionSummary.failed,
           },
           {
             name: "pending",
             color: "#2094df",
             y:prValues.executionSummary.pending,
           },
         ];
           execOptions.series[0].data = executionSummaryData;
           execChartsList.push(execOptions);
          });
         });
         this.execChartsList=execChartsList;
       },
       getPrBtnStatus(rel,pr){
         let temp=pr;
         if(rel===pr){
           temp=rel.split('_')[0];
         }
          if(this.activeFlagDetails[temp]){
           return "prBtnActive";
         }
         else{
           return "prBtnInactive";
         }

       },
       getActiveStatusColor(relname){
         if(this.activeFlagDetails[relname]){
           return "green";
         }
         else{
           return "red";
         }
       },
      getActiveFlagDetail(relname){
         if(this.activeFlagDetails[relname]){
           return "Active";
         }
         else{
           return "Inactive";
         }
      },
       loadCharts() {
         this.loading = true;
         this.loadingMessage = "Loading Customer releases...";
         let self1 = this;
         testcaseService.getReleasesList().then(
           (data) => {
             self1.loading = false;
             self1.loadingMessage = "";
             self1.releases = data;
             let folders = [];
             let folderArr = {};
             for (let i = 0; i < data.length; i++) {
               self1.activeFlagDetails[data[i].name]=data[i].active_flag;
               if(Object.entries(self1.activeFlagDetails).indexOf(data[i].folder_name)<0){
                 self1.activeFlagDetails[data[i].folder_name]=data[i].active_flag;
               }
               else{
                 if(data[i].active_flag){
                   self1.activeFlagDetails[data[i].folder_name]=data[i].active_flag;
                 }
               }
              let fl = data[i].folder_name ? data[i].folder_name : "Unnamed";
               if (folders.indexOf(fl) < 0) {
                 folders.push(fl);
                 folderArr[fl] = [];
                 folderArr[fl].push(data[i].name);
               } else {
                 folderArr[fl].push(data[i].name);
               }
             }
             self1.folders = folders;
             self1.folderArr = folderArr;
             
             self1.folderFlagCount=folders.length;
   
             self1.customerListArray={};
             let newPromise = new Promise(function(newResolve, newReject) {
              self1.loadExecutionSummaryDetails(newResolve, newReject);
             });
              newPromise.then(function() {
               //self1.summaryViewButtonClicked();
               self1.showCustDetails=true;
            
             });
            
           
             let platformBubbleChartOptions = { ...this.packedBubbleOptions };
             let optionSeries = [];
             for (let d = 0; d < self1.folders.length; d++) {
               let obj = {};
               obj["name"] = self1.folders[d];
               obj["data"] = [];
               for (let b = 0; b < self1.folderArr[self1.folders[d]].length; b++) {
                 let temp = {};
                 temp["name"] = self1.folderArr[self1.folders[d]][b];
                 temp["value"] = 300;
                 obj["data"].push(temp);
               }
               optionSeries.push(obj);
             }
             platformBubbleChartOptions.series = optionSeries;
             self1.platformBubbleChartOptions = platformBubbleChartOptions;
           },
           (error) => {
             console.log("error");
           }
         );
   
         /* this.platformBubbleChartOptions1={...this.packedBubbleOptions}; 
               this.platformBubbleChartOptions2={...this.packedBubbleOptions}
                  this.platformBubbleChartOptions3={...this.packedBubbleOptions}
                   this.platformBubbleChartOptions4={...this.packedBubbleOptions}*/
       },
       changeprclicked(relName,prname){
         this.showTabdetails=!this.showTabdetails;
         this.showTabdetails=!this.showTabdetails;
         if(prname===this.selectedExecOptions[relName].folder){
           this.selectedExecOptions[relName].name=prname;
           this.selectedExecOptions[relName].type="folder";
           }
         else{
            this.selectedExecOptions[relName].name=prname;
           this.selectedExecOptions[relName].type="release";
         }
         
         },
       getKeys(rArray,rkey){
         let keylist=Object.keys(rArray);
         let arr=[];
         for(let k=0;k<keylist.length;k++){
           if(this.selectedExecOptions[rkey].name!=keylist[k]){
              arr.push(keylist[k]);
           }
         }
         return arr;
       },
       getAllKeys(rArray,rkey){
         let keylist=Object.keys(rArray);
         let arr=[];
         for(let k=0;k<keylist.length;k++){
              arr.push(keylist[k]);
         }
         return arr;
       },
   
     },
   };
</script>
<template>
   <div class="homeMain" style="width:100%;height:100%">
    <div class="firstHeader" >
            <a v-if="currentUser"
              ><span class="half-margin-right" style="color:black">
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
      <div v-show="showBuubleChart" class="bottomnav1" style="width:100%;height:100%">

         <div class="summaryViewButton">
            <button class="bn632-hover bn26 mainButton"    @click="summaryViewButtonClicked()"  style="position: absolute;right: 0px;width:fit-content;"
               >     Summary View</button>
               <button class="bn632-hover bn26 mainButton"  @click="testManagerClicked()"  style="position: absolute;right: 0px;width:fit-content;"
               > Test Manager</button>
         </div>
         <div
            class=""
            style="width:100%;height:100%;margin:0 auto !important;"
            >
            <ChartA
               disbleExport="true"
               v-on:child="onChildInteraction"
               id="bubbleChart1"
               :option="platformBubbleChartOptions"
               ></ChartA>
         </div>
      </div>
      <div v-show="showSummaryChart" class="bottomnav1 summaryMainPage" style="width:100%;height:100%">
         <div class="summaryViewButton">
            <button class="bn632-hover bn26 mainButton"  @click="releasesViewButtonClicked()"  style="position: absolute;right: 0px;width:fit-content;"
               > All Releases</button>
            <button class="bn632-hover bn26 mainButton"  @click="testManagerClicked()"  style="position: absolute;right: 0px;width:fit-content;"
               > Test Manager</button>
         </div>
         <div class="execChartsWrapper">
            <template v-if="showCustDetails">
               <template v-for="(folderName) in filteredRels" class="custGroup">
                  <template v-for="(relArray,relName) in customerListArray[folderName]">
                     <div v-if="displayDetails===relName" :key="relName"  class="detailChartBoxDiv">
                        <DetailsWeeklyReportCharts  v-on:child="onChildInteraction" :relName="relName"  :colorscheme="colorscheme" :execOptions="getExecOptions(relArray,relName)" :projectedExecOptions="projectedCustListArray[folderName][relName]">
                        </DetailsWeeklyReportCharts>
                     </div>
                     <div v-else :key="relName"  class="e_chartBox">
                        <div  class="chartBoxDiv landingCharts">
                             <div>
                                 <!-- <div
                                    :class="
                                    'summaryCircle4 coloredCircleBorder ' +
                                    getActiveStatusColor(selectedExecOptions[relName].name)
                                    " >
                                   
                                 </div> -->
                                 <div class="coloredCircleBoxdata1" style="margin-left:-15px;">
                                    Status :  {{getActiveFlagDetail(selectedExecOptions[relName].name)}}
                                 </div>
                              </div>
                           <div v-for="(prname,ind) in Object.keys(relArray)" :key="prname+'_pr_'+ind">
                              <div class="homeCharts" v-show="selectedExecOptions[relName].name==prname && showTabdetails">
                                 <chartA
                                    disbleExport="true"
                                    v-on:child="onChildInteraction"
                                    :id="prname+'exec_chart_'+relName"
                                    class="chartsA"
                                    :option="relArray[selectedExecOptions[relName].name]"
                                    :custRel="relName"
                                    :chartName="selectedExecOptions[relName]"
                                    ></chartA>
                              </div>
                           </div>
                        </div>
                        <div class="summary_Data">
                           <div class="projectedSummaryData1">
                              <div class="summary_li landingCharts">
                                 <div
                                    class="summaryCircle1 coloredCircleBorder coloredBorder1"
                                    >
                                    {{summaryListArray[folderName][relName][selectedExecOptions[relName].name].total}}
                                 </div>
                                 <div class="coloredCircleBoxdata2">
                                    Total
                                 </div>
                              </div>
                              <div class="summary_li landingCharts">
                                 <div
                                    :class="
                                    'summaryCircle1 coloredCircleBorder ' +
                                    summaryListArray[folderName][relName][selectedExecOptions[relName].name].executionCircleColor
                                    "
                                    >
                                    {{summaryListArray[folderName][relName][selectedExecOptions[relName].name].executed}}%
                                 </div>
                                 <div class="coloredCircleBoxdata3">
                                    Executed
                                 </div>
                              </div>
                              <div class="summary_li landingCharts">
                                 <div
                                    :class="
                                    'summaryCircle1  coloredCircleBorder ' +
                                    getColorClassForQuality(
                                    summaryListArray[folderName][relName][selectedExecOptions[relName].name].quality
                                    )
                                    "
                                    >
                                    {{summaryListArray[folderName][relName][selectedExecOptions[relName].name].quality}}%
                                 </div>
                                 <div
                                    class="coloredCircleBoxdata4"
                                    style="margin-left: 5px;"
                                    >
                                    Quality
                                 </div>
                              </div>
                              <div class="summary_li landingCharts">
                                 <div
                                    class="summaryCircle1 coloredCircleBorder coloredBorder2"
                                    >
                                    {{summaryListArray[folderName][relName][selectedExecOptions[relName].name].defects}}
                                 </div>
                                 <div class="coloredCircleBoxdata5">
                                    Defects
                                 </div>
                              </div>
                              <div class="summary_li landingCharts">
                                 <div
                                    class="summaryCircle1 coloredCircleBorder qualityRed"
                                    >
                                    {{summaryListArray[folderName][relName][selectedExecOptions[relName].name].mh}}
                                 </div>
                                 <div class="coloredCircleBoxdata6" style="margin-left:10px;">
                                    MH
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="detailBtnWrapper" :key="relName">
                         <div class="detailsBtn">
                            <div class="" style="width: 100%;">
          <button
            class="btn btn--secondary pBtn"
            @click="showDetailsDisplay(relName)"
            style="font-size:1.4rem;"
          >
            <!-- <i class="icon icon-list-menu"> </i> -->
            <b-icon icon="bar-chart-fill"></b-icon>
          </button>
                            </div>
                           </div>
                        <div class="proListDiv">
                           <div class="prs">
                              <div v-for="(prname,ind) in getKeys(relArray,relName)" :key="'p_'+ind">
                                 <a @click="changeprclicked(relName,prname)" :class="'prBtn '+getPrBtnStatus(relName,prname) ">{{prname}}</a>
                              </div>
                           </div>
                        </div>
                        </div>
                     </div>
                  </template>
               </template>
            </template>
         </div>
      </div>
   </div>
</template>
<style>
   .bottomnav1{
   /*background: #08c3fe !important;*/
   background: #fff !important;
   }

   .execChartsWrapper{
   margin-bottom: 400px;
   height: 1100px;
   width: 100%;
   overflow: scroll;
   position: absolute;
   padding-top:40px;
   padding-left:40px;
   padding-right:20px;
   }

   .execChartsWrapper::-webkit-scrollbar{
   display:none !important;
   }
   .homeCharts .homeCharts .chartsA .highcharts-container{
   height:350px !important;
   }
   
   .e_chartBox{
   width: 31% !important;
   display: inline-grid !important;
   border: 2px solid #21213d !important;
   margin: 20px;
   height: 400px !important;
   /*background: #91f6f5 !important;*/
   background: #fff;
   border-radius: 20px;
   position: relative;
   }

    
     .coloredBorder1{
    background: #ffff;
    border: 2px solid rgb(20,112,173);
    color: rgb(20,112,173);

     }
    
     .qualityRed {
    background: #ffff;
    border: 2px solid #c41b1b;
    color: #c41b1b;
     }

      .coloredBorder2{
    background: #ffff;
    border: 2px solid  rgb(207, 152, 33);
    color:  rgb(207, 152, 33);
     }

  .qualityGreen {
    background: #ffff;
    border: 2px solid green;
    color: green;
     }

     .qualityYellow {
    background: #ffff;
    border: 2px solid yellow;
    color: yellow;
}



   @media (min-width:500px){

        .execChartsWrapper{
    margin-bottom: 800px !important;
    height: 420vh !important;
       }
  .e_chartBox{
      
    width: 31% !important;
    margin: 5px !important;
    height: 180px !important;
   }
   .homeCharts .chartsA .highcharts-container{
      height: 150px !important;
    width: 1200px !important;
    margin-left: -525px;
    padding-bottom: 20px;
    padding-top: 10px;
    margin-top: -10px;
   }

    .projectedSummaryData1{
    width: 100% !important;
    margin-top: -35px !important;
    margin-left: -260px !important;

   }
   .summary_Data {
    margin-top: 5px !important;
    font-size: 4px !important;
    margin-left: -15px !important;
}

    /* .summary_Data {
    font-size: 12px !important; 
} */

.projectedSummaryData1 .summary_li{
    margin-top: 60px !important;
    margin-left: 20px !important;
    margin-right: -70px !important;
    width: 12%;
     }
.summaryCircle4 {
    height: 70px !important;
    width: 100px !important;
    margin-top: -50px !important;
    padding: 25px !important;
}
.projectedSummaryData1 .summary_li .summaryCircle1 {
      height: 20px !important;
    width: 20px !important;
    padding-left: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 10px;
    margin-top: -40px !important;
    font-size: 4px !important;
    border-radius: 100% !important;
}
/* .projectedSummaryData1 .summary_li .summaryCircle2 {
    height: 70px !important;
    width: 70px !important;
    margin-top: -50px !important;
    padding-top: 25px !important;
    margin-left: 10px !important;
} */


 .coloredCircleBorder1{
    margin-top: -100px !important;
    margin-left: -35px !important;
    text-align: center !important;
}

/* .landingCharts .coloredCircleBoxdata{
  padding-top:30px !important;
  margin-left:10px !important;
}  */
.landingCharts .coloredCircleBoxdata1{
      margin-top: 2px !important;
    margin-left: 60px !important;
    font-size: 4px !important;
    font-weight: 500 !important;
}
   .landingCharts .coloredCircleBoxdata2{
  margin-top: -25px !important;
    margin-left: 4px !important;

   }
   .landingCharts .coloredCircleBoxdata3{
   margin-top: -25px !important;
    margin-left: 4px !important;

   }
   .landingCharts .coloredCircleBoxdata4{
    margin-top: -25px !important;
    margin-left: 4px !important;
   }
   .landingCharts .coloredCircleBoxdata5{
    margin-top: -25px !important;
    margin-left: 4px !important;
}
  
   .landingCharts .coloredCircleBoxdata6{
    margin-top: -25px !important;
    margin-left: 6px !important;
   }
 .prBtn{
    min-width: 50px !important;
    min-height: 10px !important;
    font-size: 4px !important;
    padding: 1px 1px !important;
    margin: 2px 0px !important;
    margin-top: 0px !important;
    line-height: 1em !important;
    margin-right: -34px !important;
    border-radius: 50px !important;
     }
     .detailBtnWrapper{
      margin: 30px !important;
     margin-top: 12px !important;

     }
     .pBtn {
     width: 2px !important;
    margin-top: -20px !important;
    font-size: 10px !important;
    margin-bottom: 0px !important;
    padding-left: 10px !important;
    margin-left: 0px !important;
    margin-right: -40px !important;
    height: 40px !important;

     }
     .highcharts-title{
       font-size: 20px !important;
       
     }
   }


   @media (min-width:700px){
        .execChartsWrapper{
    margin-bottom: 800px !important;
    height: 400vh !important;
       }
     .e_chartBox{
      
    width: 30% !important;
    margin: 5px !important;
    height: 180px !important;
   }
   .homeCharts .chartsA .highcharts-container{
   height: 180px !important;
    width: 1200px !important;
    margin-left: -520px !important;
    padding-bottom: 40px;
    padding-top: 10px;
    margin-top: -10px !important;
   }

    .projectedSummaryData1{
   width: 100% !important;
    margin-top: -80px !important;
    margin-left: -230px !important;

   }
   .summary_Data {
    margin-top: 5px !important;
    font-size: 6px !important;
    margin-left: 0px !important;
}

    /* .summary_Data {
    font-size: 12px !important; 
} */

.projectedSummaryData1 .summary_li{
    margin-top: 60px !important;
    margin-left: -10px !important;
    margin-right: -20px !important;
    width: 10%;
     }
/* .summaryCircle4 {
    height: 70px !important;
    width: 100px !important;
    margin-top: -50px !important;
    padding: 25px !important;
} */
.projectedSummaryData1 .summary_li .summaryCircle1 {
        height: 25px !important;
    width: 25px !important;
    padding-left: 0px !important;
    padding-top: 0px !important;
    margin-top: -28px !important;
    font-size: 6px !important;
    border-radius: 100% !important;
}
/* .projectedSummaryData1 .summary_li .summaryCircle2 {
    height: 70px !important;
    width: 70px !important;
    margin-top: -50px !important;
    padding-top: 25px !important;
    margin-left: 10px !important;
} */


.coloredCircleBorder1{
    margin-top: -100px !important;
    margin-left: -35px !important;
    text-align: center !important;
}
/* .landingCharts .coloredCircleBoxdata{
  padding-top:30px !important;
  margin-left:10px !important;
} */
.landingCharts .coloredCircleBoxdata1{
    
    margin-top: 5px !important;
    margin-left: 60px !important;
    font-size: 6px !important;
    font-weight: 500 !important;

}
   .landingCharts .coloredCircleBoxdata2{
   margin-top: -8px !important;
    margin-left: 5px !important;

   }
   .landingCharts .coloredCircleBoxdata3{
   margin-top: -8px !important;
    margin-left: 0px !important;

   }
   .landingCharts .coloredCircleBoxdata4{
    margin-top: -8px !important;
    margin-left: 3px !important;
   }
   .landingCharts .coloredCircleBoxdata5{
    margin-top: -8px !important;
    margin-left: 2px !important;
}
  
   .landingCharts .coloredCircleBoxdata6{
    margin-top: -8px !important;
    margin-left: 8px !important;
   }
 .prBtn{
    min-width: 50px !important;
    min-height: 10px !important;
    font-size: 4px !important;
    padding: 2px 2px !important;
    margin-top: 10px !important;
    margin: 2px 0px !important;
    margin-top: 0px !important;
    line-height: 1em !important;
    margin-right: -30px !important;
    border-radius: 50px !important;
     }
     .detailBtnWrapper{
      margin: 30px !important;
     }
     .pBtn {
    width: 2px !important;
    margin-top: -20px !important;
    font-size: 10px !important;
    margin-bottom: 0px !important;
    padding-left: 10px !important;
    margin-left: 0px !important;
    margin-right: -40px !important;
    height: 40px !important;

     }
     .highcharts-title{
       font-size: 20px !important
     }
   }


    @media (min-width:1000px){

         .execChartsWrapper{
    margin-bottom: 800px !important;
    height: 400vh !important;
    padding-bottom:200px !important;
       }

     .e_chartBox{
       width:30% !important;
       margin: 15px !important;
       height:280px !important;

   }
  .homeCharts .chartsA .highcharts-container{
    height: 300px !important;
    width: 1200px !important;
    margin-left: -470px !important;
    padding-bottom: 80px !important;
    padding-top: 10px !important;
    margin-top: -10px !important;
   }

    .projectedSummaryData1{
    width: 100% !important;
    margin-top: -100px !important;
    margin-left: -230px !important;
   }
   .summary_Data {
    margin-top: 5px !important;
    font-size: 10px !important;
    margin-left: 10px !important;
}

    /* .summary_Data {
    font-size: 12px !important; 
} */

.projectedSummaryData1 .summary_li{
    margin-top: 60px !important;
    margin-left: 14px !important;
    margin-right: -40px !important;
    width: 12%;
     }
/* .summaryCircle4 {
    height: 70px !important;
    width: 100px !important;
    margin-top: -50px !important;
    padding: 25px !important;
} */
.projectedSummaryData1 .summary_li .summaryCircle1 {
    height: 36px !important;
    width: 36px !important;
    padding-left: 0px !important;
    padding-top: 6px !important;
    margin-top: -50px !important;
    font-size: 10px !important;
    border-radius: 100% !important;
}
/* .projectedSummaryData1 .summary_li .summaryCircle2 {
    height: 70px !important;
    width: 70px !important;
    margin-top: -50px !important;
    padding-top: 25px !important;
    margin-left: 10px !important;
} */


.coloredCircleBorder1{
    margin-top: -100px !important;
    margin-left: -35px !important;
    text-align: center !important;
}
/* .landingCharts .coloredCircleBoxdata{
  padding-top:30px !important;
  margin-left:10px !important;
} */
.landingCharts .coloredCircleBoxdata1{
    margin-top: 15px !important;
    margin-left: 100px !important;
    font-size: 10px !important;
    font-weight: 500 !important;
}
   .landingCharts .coloredCircleBoxdata2{
   margin-top: -15px !important;
    margin-left: 5px !important;

   }
   .landingCharts .coloredCircleBoxdata3{
    margin-top: -15px !important;
    margin-left: 0px !important;

   }
   .landingCharts .coloredCircleBoxdata4{
    margin-top: -15px !important;
    margin-left: 0px !important;
   }
   .landingCharts .coloredCircleBoxdata5{
    margin-top: -15px !important;
    margin-left: 0px !important;
}
  
   .landingCharts .coloredCircleBoxdata6{
    margin-top: -15px !important;
    margin-left: 10px !important;
   }
 .prBtn{
   min-width: 70px !important;
    min-height: 0px !important;
    font-size: 5px !important;
    padding: 6px 2px !important;
    margin: 2px 0px!important;
    margin-top: 4px !important;
    line-height: 1% !important;
    margin-right: -30px !important;
    border-radius: 50px !important;
     }
     .detailBtnWrapper{
      margin: 30px !important;
     }
     .pBtn {
    width: 20px !important;
    margin-top: -30px !important;
    font-size: 15px !important;
    margin-bottom: -10px !important;
    padding-left: -10px !important;
    margin-left: 0px !important;
    margin-right: -30px !important;
    height: 30px !important;

     }
     .highcharts-title{
       font-size: 20px !important
     }
   }


   @media (min-width:1200px){
        .execChartsWrapper{
    margin-bottom: 800px !important;
    height: 400vh !important;
    padding-bottom:200px !important;
       }
     .e_chartBox{
      
       width:30% !important;
       height:300px !important;
   }
 
     .homeCharts .chartsA .highcharts-container{
    height: 300px !important;
    width: 1200px !important;
    margin-left: -450px !important;
    padding-bottom: 0px;
    padding-top: 10px;
    margin-top: -10px !important;
   }

    .projectedSummaryData1{
    width: 100% !important;
    margin-top: -80px !important;
    margin-left: -200px !important;
   }
   .summary_Data {
    margin-top: 5px !important;
    font-size: 10px !important;
    margin-left: 10px !important;
}

    /* .summary_Data {
    font-size: 12px !important; 
} */

.projectedSummaryData1 .summary_li{
    margin-top: 60px !important;
    margin-left: 20px !important;
    margin-right: -40px !important;
    width: 12%;
     }
.summaryCircle4 {
    height: 70px !important;
    width: 100px !important;
    margin-top: -50px !important;
    padding: 25px !important;
}
.projectedSummaryData1 .summary_li .summaryCircle1 {
    height: 40px !important;
    width: 40px !important;
    padding-left: 2px !important;
    padding-top: 10px !important;
    margin-top: -50px !important;
    font-size: 12px !important;
    border-radius: 100% !important;
}
.projectedSummaryData1 .summary_li .summaryCircle2 {
    height: 70px !important;
    width: 70px !important;
    margin-top: -50px !important;
    padding-top: 25px !important;
    margin-left: 10px !important;
}


.coloredCircleBorder1{
    margin-top: -100px !important;
    margin-left: -35px !important;
    text-align: center !important;
}
.landingCharts .coloredCircleBoxdata{
  padding-top:30px !important;
  margin-left:10px !important;
}
.landingCharts .coloredCircleBoxdata1{
    margin-top: 20px !important;
    margin-left: 120px !important;
    font-size: 10px !important;
    font-weight: 500 !important;
}
   .landingCharts .coloredCircleBoxdata2{
   margin-top: -10px !important;
    margin-left: 5px !important;

   }
   .landingCharts .coloredCircleBoxdata3{
    margin-top: -10px !important;
    margin-left: 0px !important;

   }
   .landingCharts .coloredCircleBoxdata4{
    margin-top: -10px !important;
    margin-left: 0px !important;
   }
   .landingCharts .coloredCircleBoxdata5{
    margin-top: -10px !important;
    margin-left: 0px !important;
}
  
   .landingCharts .coloredCircleBoxdata6{
    margin-top: -10px !important;
    margin-left: 10px !important;
   }
 .prBtn{
   min-width: 100px !important;
    min-height: 10px !important;
    font-size: 8px !important;
    padding: 4px 2px !important;
    margin-top: 4px !important;
    line-height: 1em !important;
    margin-right: -30px !important;
    border-radius: 50px !important;
     }
     .detailBtnWrapper{
      margin: 30px !important;
     }
     .pBtn {
    width: 20px !important;
    margin-top: -30px !important;
    font-size: 15px !important;
    margin-bottom: 0px !important;
    padding-left: -10px !important;
    margin-left: 0px !important;
    margin-right: -30px !important;
    height: 30px !important;

     }
     .highcharts-title{
       font-size: 20px !important
     }

   }

   @media (min-width:1500px){

        .execChartsWrapper{
    margin-bottom: 800px;
    height: 400vh !important;
    padding-bottom:200px !important;
       }

     .e_chartBox{
        width:30% !important;
       height:360px !important;
   }

     .homeCharts .chartsA .highcharts-container{
   height: 300px !important;
    width: 1200px !important;
    margin-left: -400px !important;
    padding-bottom: 0px;
    padding-top: 20px;
    margin-top: -10px !important;
   }

    .projectedSummaryData1{
    width: 100% !important;
    margin-top: -40px !important;
    margin-left: -180px !important;
   }
   .summary_Data {
    margin-top: 5px !important;
    font-size: 12px !important;
    margin-left: 10px !important;
}

    /* .summary_Data {
    font-size: 12px !important; 
} */

.projectedSummaryData1 .summary_li{
    margin-top: 50px !important;
    margin-left: 30px !important;
    margin-right: -50px !important;
    width: 14%;
     }
.summaryCircle4 {
    height: 70px !important;
    width: 100px !important;
    margin-top: -50px !important;
    padding: 25px !important;
}
.projectedSummaryData1 .summary_li .summaryCircle1 {
    height: 50px !important;
    width: 50px !important;
    padding-left: 2px !important;
    padding-top: 14px !important;
    margin-top: -50px !important;
    font-size: 14px !important;
    border-radius: 100% !important;
}
.projectedSummaryData1 .summary_li .summaryCircle2 {
    height: 70px !important;
    width: 70px !important;
    margin-top: -50px !important;
    padding-top: 25px !important;
    margin-left: 10px !important;
}


.coloredCircleBorder1{
    margin-top: -100px !important;
    margin-left: -35px !important;
    text-align: center !important;
}
.landingCharts .coloredCircleBoxdata{
  padding-top:30px !important;
  margin-left:10px !important;
}
.landingCharts .coloredCircleBoxdata1{
    margin-top: 25px !important;
    margin-left: 160px !important;
    font-size: 12px !important;
    font-weight: 500 !important;
}
   .landingCharts .coloredCircleBoxdata2{
    margin-top: 0px !important;
    margin-left: 10px !important;

   }
   .landingCharts .coloredCircleBoxdata3{
    margin-top: 0px !important;
    margin-left: 0px !important;

   }
   .landingCharts .coloredCircleBoxdata4{
    margin-top: 0px !important;
    margin-left: 5px !important;
   }
   .landingCharts .coloredCircleBoxdata5{
    margin-top: 0px !important;
    margin-left: 5px !important;
}
  
   .landingCharts .coloredCircleBoxdata6{
    margin-top: 0px !important;
    margin-left: 14px !important;
   }
 .prBtn{
    min-width: 150px !important;
    min-height: 10px !important;
    font-size: 10px !important;
    padding: 4px 4px !important;
    margin-top: 6px !important;
    line-height: 1em !important;
    margin-right: -30px !important;
    border-radius: 50px !important;
     }
     .detailBtnWrapper{
      margin: 30px !important;
     }
     .pBtn {
    width: 30px !important;
    margin-top: -10px !important;
    font-size: 20px !important;
    margin-bottom: 0px !important;
    padding-left: 0px !important;
    margin-left: 0px !important;
    margin-right: -20px !important;
    height: 50px !important;

     }
     .highcharts-title{
       font-size: 25px !important
     }


   }

   @media (min-width:1800px){
        .execChartsWrapper{
    margin-bottom: 800px !important;
    height: 350vh !important;
    padding-bottom: 300px !important;
       }
     .e_chartBox{
   
       width:30% !important;
       height:400px !important;
       margin:20px !important;
   }
    .homeCharts .chartsA .highcharts-container{
    height: 350px !important;
    width: 1200px !important;
    margin-left: -360px !important;
    padding-bottom: 20px;
    margin-top: 0px !important;
   }

    .projectedSummaryData1{
   width: 100% !important;
    margin-top: -50px !important;
    margin-left: -180px !important;
   }
   .summary_Data {
    margin-top: 5px !important;
    font-size: 14px !important;
    margin-left: 10px !important;
}
      /* .summary_Data {
    font-size: 12px !important; 
} */
.projectedSummaryData1 .summary_li{
    margin-top: 30px !important;
    margin-left: 45px !important;
    margin-right: -60px !important;
    width: 14%;
     }
.summaryCircle4 {
    height: 70px !important;
    width: 100px !important;
    margin-top: -50px !important;
    padding: 25px !important;
}
.projectedSummaryData1 .summary_li .summaryCircle1 {
    height: 60px !important;
    width: 60px !important;
    padding-left: 2px !important;
    padding-top: 20px !important;
    margin-top: -50px !important;
    font-size: 16px !important;
    border-radius: 100% !important;
}
.projectedSummaryData1 .summary_li .summaryCircle2 {
    height: 70px !important;
    width: 70px !important;
    margin-top: -50px !important;
    padding-top: 25px !important;
    margin-left: 10px !important;
}


.coloredCircleBorder1{
    margin-top: -100px !important;
    margin-left: -35px !important;
    text-align: center !important;
}
.landingCharts .coloredCircleBoxdata{
  padding-top:30px !important;
  margin-left:10px !important;
}
.landingCharts .coloredCircleBoxdata1{
    margin-top: 45px !important;
    margin-left: 190px !important;
    font-size: 14px !important;
    font-weight: 400 !important;
}
   .landingCharts .coloredCircleBoxdata2{
   margin-top: 12px !important;
    margin-left: 10px !important;

   }
   .landingCharts .coloredCircleBoxdata3{
    margin-top: 12px !important;
    margin-left: 0px !important;

   }
   .landingCharts .coloredCircleBoxdata4{
    margin-top: 12px !important;
    margin-left: 5px !important;
   }
   .landingCharts .coloredCircleBoxdata5{
    margin-top: 12px !important;
    margin-left: 5px !important;
}
  
   .landingCharts .coloredCircleBoxdata6{
    margin-top: 12px !important;
    margin-left: 18px !important;
   }
 .prBtn{
       min-width: 150px !important;
    min-height: 2px !important;
    font-size: 10px !important;
    padding: 4px 0px !important;
    margin-top: 6px !important;
    line-height: 1em !important;
    margin-right: -30px !important;
    border-radius: 50px !important;
     }
     .detailBtnWrapper{
      margin: 30px !important;
     }
     .pBtn {
    width: 30px !important;
    margin-top: -10px !important;
    font-size: 25px !important;
    margin-bottom: 0px !important;
    padding-left: 0px !important;
    margin-left: 0px !important;
    margin-right: -20px !important;
    height: 50px !important;

     }
     .highcharts-title{
       font-size: 25px !important
     }
   }

/* 50% of the browser window */
   @media (min-width:2500px){
    .execChartsWrapper{
    margin-bottom: 800px !important;
    height: 350vh !important;
    padding-bottom:300px !important;
       }
     .e_chartBox{
       
       width:30% !important;
       height:500px !important;
       margin:30px !important;
       border-radius: 40px !important;
   }
    .homeCharts .chartsA .highcharts-container{
    height: 400px !important;
    width: 1200px !important;
    margin-left: -260px !important;
    margin-top: 0px !important;
   }
     .projectedSummaryData1{
    width: 100% !important;
    margin-top: -30px !important;
    margin-left: -140px !important;
   }
   .summary_Data {
    margin-top: 5px !important;
    font-size: 20px !important;
    margin-left: 10px !important;
}
   /* .summary_Data {
    font-size: 16px !important; 
} */
.projectedSummaryData1 .summary_li{
   margin-top: 30px !important;
    margin-left: 60px !important;
    margin-right: -60px !important;
    width: 14%;
     }
.summaryCircle4 {
    height: 70px !important;
    width: 100px !important;
    margin-top: -50px !important;
    padding: 25px !important;
}
.projectedSummaryData1 .summary_li .summaryCircle1 {
    height: 70px !important;
    width: 70px !important;
    padding-left: 2px !important;
    padding-top: 25px !important;
    margin-top: -50px !important;
    font-size: 20px !important;
    border-radius: 100% !important;
}
.projectedSummaryData1 .summary_li .summaryCircle2 {
    height: 70px !important;
    width: 70px !important;
    margin-top: -50px !important;
    padding-top: 25px !important;
    margin-left: 10px !important;
}

.coloredCircleBorder1{
    margin-top: -100px !important;
  margin-left: -180px !important;
    
}

.landingCharts .coloredCircleBoxdata1{
    margin-top: 50px !important;
    margin-left: 280px !important;
    font-size: 18px !important;
    font-weight: 500 !important;
}
   .landingCharts .coloredCircleBoxdata2{
   margin-top: 30px !important;
    margin-left: 10px !important;

   }
   .landingCharts .coloredCircleBoxdata3{
    margin-top: 30px !important;
    margin-left: -10px !important;

   }
   .landingCharts .coloredCircleBoxdata4{
    margin-top: 30px !important;
    margin-left: 0px !important;
   }
   .landingCharts .coloredCircleBoxdata5{
    margin-top: 30px !important;
    margin-left: 0px !important;
}
  
   .landingCharts .coloredCircleBoxdata6{
    margin-top: 30px !important;
    margin-left: 20px !important;
   }
 .prBtn{
   min-width: 200px !important;
    min-height: 10px !important;
    font-size: 12px !important;
    padding: 6px 10px !important;
    margin-top: 6px !important;
    line-height: 1em !important;
    margin-right: -30px !important;
    border-radius: 50px !important;
     }
     .detailBtnWrapper{
      margin: 30px !important;
     }
     .pBtn {
    width: 30px !important;
    margin-top: -10px !important;
    font-size: 25px !important;
    margin-bottom: 0px !important;
    padding-left: 0px !important;
    margin-left: 0px !important;
    margin-right: -20px !important;
    height: 50px !important;

     }
     .highcharts-title{
       font-size: 25px !important
     }
   }
 
/* 33% of the browser window */
     @media (min-width:3500px){
       .execChartsWrapper{
    margin-bottom: 800px;
    height: 350vh !important;
    width: 100% !important;
    position: absolute;
    padding-top: 150px;
    padding-left: 150px;
    padding-right: 0px;
    padding-bottom:300px !important;
       }

     .e_chartBox{
     
       width:30% !important;
       height:850px !important;
       margin: 40px !important;
        border-radius: 50px !important;
   }
   .homeCharts .chartsA .highcharts-container{
    height: 800px !important;
    width: 1600px !important;
    margin-left: -320px !important;
    margin-top: -80px !important;
   }
    .projectedSummaryData1{
    width: 100% !important;
    margin-top: -30px !important;
     margin-left: 0px !important;
   }
   .summary_Data {
    margin-top: 5px !important;
    font-size: 28px !important;
    margin-left: 10px !important;
}

.projectedSummaryData1 .summary_li{
   margin-top: -40px !important;
    margin-left: -10px !important;
    margin-right: 80px !important;
    width: 12%;
     }
/* .summaryCircle4 {
    height: 80px !important;
    width: 130px !important;
    padding: 30px !important;
} */
.projectedSummaryData1 .summary_li .summaryCircle1 {
    height: 95px !important;
    width: 95px !important;
    padding: 40px 0px !important;
    /* padding-top: 40px !important; */
    font-size: 26px !important;
    border-radius: 100% !important;
}

/* data for */

/* .summaryCircle4 {
    height: 80px !important;
    width: 130px !important;
    padding: 30px !important;
} */

.coloredCircleBorder1{
    margin-top: -100px !important;
  margin-left: -180px !important;
    
}

.landingCharts .coloredCircleBoxdata1{
    margin-top: 75px !important;
    margin-left: 380px !important;
    font-size: 30px !important;
    font-weight: 500 !important;
}
   .landingCharts .coloredCircleBoxdata2{
    margin-top: 60px !important;
    margin-left: 10px !important;

   }
   .landingCharts .coloredCircleBoxdata3{
    margin-top: 60px !important;
    margin-left: -15px !important;

   }
   .landingCharts .coloredCircleBoxdata4{
    margin-top: 60px !important;
    margin-left: 0px !important;
   }
   .landingCharts .coloredCircleBoxdata5{
    margin-top: 60px !important;
    margin-left: 0px !important;
}
  
   .landingCharts .coloredCircleBoxdata6{
    margin-top: 60px !important;
    margin-left: 22px !important;
   }
 .prBtn{
       min-width: 300px !important;
    min-height: 10px !important;
    font-size: 20px !important;
    padding: 10px 10px !important;
    margin-top: 10px !important;
    line-height: 1.1em !important;
    border-radius: 50px !important;
     }
     .detailBtnWrapper{
      margin: 40px !important;
     }
     .pBtn {
    width: 80px !important;
    margin-top: 10px !important;
    font-size: 40px !important;
    margin-bottom: 10px !important;
    padding-left: 0px !important;
    margin-left: 0px !important;
    height: 50px !important;

     }

.highcharts-title{
       font-size: 25px !important
     }
   

   }
   /* 25 % of the browser window */
       @media (min-width:4000px){
    .execChartsWrapper{
    margin-bottom: 800px !important;
    height: 350vh !important;
    width: 100% !important;
    position: absolute !important;
    padding-top: 150px !important;
    padding-left: 200px !important;
    padding-right: 0px !important;
    padding-bottom:300px !important;
       }

     .e_chartBox{
       
       width:30% !important;
       height:850px !important;
       margin: 50px !important;
       border-radius: 50px !important;
   }
    .homeCharts .chartsA .highcharts-container{
    height: 800px !important;
    width: 2200px !important;
    margin-left: -400px !important;
    margin-top: -60px !important;
   }

   .projectedSummaryData1{
     width:100% !important;
     margin-top: -60px !important;
      margin-left: 0px !important;
   }
   .summary_Data {
   margin-top: 5px !important;
    font-size: 35px !important;
    margin-left: 10px !important;
}
.projectedSummaryData1 .summary_li{
    margin-top: -20px !important;
    margin-left: -60px !important;
    margin-right: 60px !important;
    width: 16% !important;
     }
.projectedSummaryData1 .summary_li .summaryCircle1 {
    height: 125px !important;
    width: 125px !important;
    padding-left: 2px !important;
    padding-top: 50px !important;
    font-size: 1.10em !important;
    border-radius: 50% !important;
}
/* .projectedSummaryData1 .summary_li .summaryCircle2 {
       height: 120px !important;
    width: 120px !important;
    padding-left: 30px !important;
    padding-top: 50px !important;
    font-size: 1.2em !important;
    border-radius: 50% !important;
} */
.summaryCircle4 {
    height: 80px !important;
    width: 130px !important;
    padding: 30px !important;
}

.coloredCircleBorder1{
    margin-top: -100px !important;
  margin-left: -180px !important;
    
}

.landingCharts .coloredCircleBoxdata1{
    margin-top: 105px !important;
    margin-left: 570px !important;
    font-size: 35px !important;
    font-weight: 500 !important;
}
   .landingCharts .coloredCircleBoxdata2{
    margin-top: 90px !important;
    margin-left: 10px !important;
   }
   .landingCharts .coloredCircleBoxdata3{
    margin-top: 90px !important;
    margin-left: -20px !important;

   }
   .landingCharts .coloredCircleBoxdata4{
    margin-top: 90px !important;
    margin-left: -10px !important;
   }
   .landingCharts .coloredCircleBoxdata5{
   margin-top: 90px !important;
    margin-left: 0px !important;
}
  
   .landingCharts .coloredCircleBoxdata6{
    margin-top: 90px !important;
    margin-left: 30px !important;
   }
 .prBtn{
    min-width: 320px !important;
    min-height: 10px !important;
    font-size: 24px !important;
    padding: 10px 10px !important;
    margin-top: 10px !important;
    line-height: 1.5em !important;
    border-radius: 50px !important;
     }
     .detailBtnWrapper{
      margin: 40px !important;
     }
     .pBtn {
    width: 80px !important;
    margin-top: 10px !important;
    font-size: 40px !important;
    margin-bottom: 10px !important;
    padding-left: 0px !important;
    margin-left: 0px !important;
    height: 50px !important;

     }
     .highcharts-title{
       font-size: 20px !important
     }
    
   }

 
   
   


   /*  */

   .chartBoxDiv{
     padding-top:10px;
   }
   .detailChartBoxDiv{
   width: 96% !important;
   display: inline-grid !important;
   border: 2px solid #21213d !important;
   margin: 20px;
   min-height: 400px !important;
   /*background: #91f6f5 !important;*/
   background: #fff !important;
   border-radius: 20px;
   position: relative;
   }
   .custGroup{
   padding:20px;
   }
   .relGroup{
   display:inline-grid;
   }
   .detailBtnWrapper{
    margin: 10px;
    position: absolute;
   background: transparent;
   right: 0;
   }
   .proListDiv{
   margin-top: 50px;
    margin: 5px;
    position: absolute;
    background: transparent;
    right: 0;
   }
   #bubbleChart1 {
   height: 800px !important;
   width: 100% !important;
   background: #fff;
   background-size: cover !important;
   }
   #bubbleChart1 > .highcharts-container {
   height: 100% !important;
   width: 100% !important;
   }
   .mainButton{
   position: absolute !important;
   right: 30px !important;
   font-size: 1.2rem !important;
   height: 30px !important;
   width: 110px !important;
   line-height: 2rem !important;
   padding: 6px 10px !important;
   margin-top: -40px !important;
   z-index: 10000 !important;
   }
   .prBtnActive{
     background-image: linear-gradient(to right, #00bf8f 0%, #001510  51%, #00bf8f  100%) !important;
   }
   .prBtnInactive{
     background-image: linear-gradient(to right, #c4111a 0%, #001510  51%, #c44b4b  100%) !important;
   }
   .prBtn{
   
   display: block !important;
   margin: 15px 0;
   padding: 3px 10px;
   min-width: 150px;
   min-height: 30px;
   font-size: 14px;
   cursor: pointer !important;
   text-align: center;
   text-transform: uppercase;
   transition: 0.5s;
   background-size: 200% auto !important;
   color: white !important;            
   box-shadow: 0 0 20px #eee;
   border-radius: 10px;
   }
   .prBtn:hover {
   background-position: right center !important; /* change the direction of the change here */
   color: #fff !important;
   text-decoration: none !important;
   }
   .prBtn123{
   display: block !important;
   margin: 15px 0;
   padding: 3px 10px;
   min-width: 150px;
   min-height: 30px;
   border: none;
   background-color: #60abab  !important;
   color: #fff !important;
   font-size: 14px;
   border-radius: 6px !important;
   outline: none;
   cursor: pointer !important;
   transition: .3s linear;
   }
   .landingCharts .coloredCircleBoxdata2{
      position: absolute;
   margin-top: -5px;
   margin-left: 5px;
   }
   .landingCharts .coloredCircleBoxdata3{
      position: absolute;
   margin-top: -5px;
   margin-left: 5px;
   }
   .landingCharts .coloredCircleBoxdata4{
      position: absolute;
   margin-top: -5px;
   margin-left: 5px;
   }
   .landingCharts .coloredCircleBoxdata5{
      position: absolute;
   margin-top: -5px;
   margin-left: 5px;
   }
   .landingCharts .coloredCircleBoxdata6{
      position: absolute;
   margin-top: -5px;
   margin-left: 5px;
   }

   .summary_Data{
      margin-top: 5px !important;
   }

 .landingCharts .coloredCircleBoxdata1{
      position: absolute;
    margin-top: -5px;
    
   }

   .firstHeader {
      position: absolute;
    /* margin-top: 25px; */
    z-index: 10000;
    right: 0;
    color: #fff;
}

.firstHeader a{
  color: #fff !important;
}
.pBtn{
    font-size: 1rem;
    width: 17px;
    padding-left: 20px !important;
   box-shadow: none !important;
}
</style>