<script>
import { testcaseService } from "@/core/services/testcaseService";
import Chart from "./Chart";
export default {
     name: "DefectsDetails",
      props:["releases","showExtraPage","testcases"],
       mounted() {
         this.loadInit();
         this.loadCFDS();
         },
       components:{
         Chart
       },
       computed:{
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
       data() {
    return {
      showDefects:false,
       cfdPageNumber: 0,
      colorscheme:"dark-scheme",
      custOrRelease:"customer",
      showPlatformPie:false,
       cfdDataList: [],
        cfdSummary: {},
       cfdFeatureDataList:[],
       addCFDObj:{},
       addCFD:false,
       selectedCFDRelease:"",
showTypePie:false,
showComponentPie:true,
showStatusPie:true,
showSubmitterPie:true,
showSubmitterMgrPie:true,
showIStatePie:true,
showDeMgrPie:true,
      customers:[],
      showReleases:true,
      showDefectContent:true,
      custReleases:[],
      custReleaseArray:[],
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
       selectedCustomers:[],
         showProjectData:false,
     projectidForname:{},
     selectedAllProjects:[],
       showErrorModal:false,
     modalErrorMessage:"",
      showProjects:false,
       selectedRelease:"",
      tabLabels:[],
       releasesArray:[],
         projectsArray:[],
      selectedProjects:[],
      tableArray:{},
      testTypeOptions:{},
      testTypeData:[],
      statusOptions:{},
      statusData:[],
      componentData:[],
      componentOptions:{},
      engineerData:[],
      engineerOptions:{},
      productData:[],
      platformOptions:{},
      deManagerData:[],
      deManagerOptions:{},
      submitterManagerData:[],
      submitterManagerOptions:{},
      submitterData:[],
      submitterOptions:{},
      iStateData:[],
      iStateOptions:{},

       testTypeBarOptions:{},
      statusBarOptions:{},
      componentBarOptions:{},
      engineerBarOptions:{},
     platformBarOptions:{},
     deManagerBarOptions:{},
      submitterManagerBarOptions:{},
      submitterBarOptions:{},
     iStateBarOptions:{},
      
    }
       },
        watch:{
     
         selectedRelease:function(selectedRelease){
           this.loadDashboardData(selectedRelease);
         },
        },
        methods:{
      emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
    onChildInteraction(args, payload) {
      switch (args) {
         case "toggleChart":
          this[payload]=!this[payload]
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
      saveCFD(){
        let self=this;
      this.loading = false;
      this.loadingMessage = "Adding Cfd";
       testcaseService.addCFD(this.addCFDObj).then(
        (data) => {
          self.loading = false;
          self.loadingMessage = "";
          self.addCFD=false;
      self.addCFDObj={};
      self.loadCFDS();
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
     loadCFDS() {
      let self=this;
      this.loading = false;
      this.loadingMessage = "Loading Cfds";
      testcaseService.loadCFDDetails().then(
        (data) => {
          self.loading = false;
          self.loadingMessage = "";
         self.cfdDataList = data;
          let custReleases=[];
          for(let i=0;i<self.cfdDataList.length;i++){
           custReleases.push(self.cfdDataList[i].customer_release);
          }
          let custReleaseArray = [...new Set(custReleases)];
          self.custReleaseArray=custReleaseArray;

          self.refreshCFDTab();
           self.calculateCFDSummary();
          self.summaryDetailsObj = self.cfdSummary;
         
        },
        (error) => {
          self.loading = false;
          self.loadingMessage = "";
          self.showErrorModal = true;
          self.modalErrorMessage = "Error while loading CFD details";
        }
      );
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
     // this.summaryButtonsDetails["totalCFD"] = allCFD.length;

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
    closeDefectDetailsModal(){
        this.emitToParent("closeDefectDetailsModal");
      },
       loadInit(){
      let releases=this.releases;
      this.customers=[];
      this.custReleases={};
      let tempArr=[],tempObj=[];
      for(let k=0;k<releases.length;k++){
      //  if(tempArr.indexOf(releases[k].customerName)>-1){
          if(tempObj.indexOf(releases[k].folder_name)<0)
          tempObj.push(releases[k].folder_name)
      //  }
      /*  else{
          tempArr.push(releases[k].customerName);
          tempObj[releases[k].customerName]=[];
          if(tempObj[releases[k].customerName].indexOf(releases[k].folder_name)<0)
          tempObj[releases[k].customerName].push(releases[k].folder_name)
        }*/
      }
      this.customers=tempArr;
      this.releasesArray=tempObj;
      this.selectedRelease=this.releasesArray[0];
    },
    loadBarChartOptions(){
      return {
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
  }
    },
    loadPieChartOptions(){
      return  {
    title: {
      text: "chart",
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
           style: {
        textOutline: 'transparent',
        color:"#fff !important",
        fill:"#fff !important",
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
  };
    },
    loadDashboardData(){
      let self=this;
      this.loading=true;
      this.loadingMessage="Loading Defect Charts";
     
     this.testTypeBarOptions=this.loadBarChartOptions();
      this.testTypeBarOptions.title.text="Test Phase";

      this.statusBarOptions=this.loadBarChartOptions();
      this.statusBarOptions.title.text="Status";

       this.componentBarOptions=this.loadBarChartOptions();
      this.componentBarOptions.title.text="Component";

      this.engineerBarOptions=this.loadBarChartOptions();
      this.engineerBarOptions.title.text="Enginner";

      this.platformBarOptions=this.loadBarChartOptions();
      this.platformBarOptions.title.text="Platform";

       this.deManagerBarOptions=this.loadBarChartOptions();
      this.deManagerBarOptions.title.text="De Manager";

      this.submitterManagerBarOptions=this.loadBarChartOptions();
      this.submitterManagerBarOptions.title.text="Submitter Manager";

      this.submitterBarOptions=this.loadBarChartOptions();
      this.submitterBarOptions.title.text="Submitter";

       this.iStateBarOptions=this.loadBarChartOptions();
      this.iStateBarOptions.title.text="I State Transition";

      ///-----------------

      this.testTypeOptions=this.loadPieChartOptions();
      this.testTypeOptions.title.text="Test Phase";

      this.statusOptions=this.loadPieChartOptions();
      this.statusOptions.title.text="Status";

       this.componentOptions=this.loadPieChartOptions();
      this.componentOptions.title.text="Component";

      this.engineerOptions=this.loadPieChartOptions();
      this.engineerOptions.title.text="Enginner";

      this.platformOptions=this.loadPieChartOptions();
      this.platformOptions.title.text="Platform";

       this.deManagerOptions=this.loadPieChartOptions();
      this.deManagerOptions.title.text="De Manager";

      this.submitterManagerOptions=this.loadPieChartOptions();
      this.submitterManagerOptions.title.text="Submitter Manager";

      this.submitterOptions=this.loadPieChartOptions();
      this.submitterOptions.title.text="Submitter";

       this.iStateOptions=this.loadPieChartOptions();
      this.iStateOptions.title.text="I State Transition";

       testcaseService.getDefectDetails(this.selectedRelease).then(
          (data) => {
          if(data){
            if(data.found_during_data.found_during_count>0){
              let fdArr=Object.keys(data.found_during_data.found_during);
            self.testTypeData=[];
          for(let a=0;a<fdArr.length;a++){
            let obj={};
            obj['name']=fdArr[a];
            obj['color']=self.colors[a%self.colors.length];
            obj['y']=data.found_during_data.found_during[fdArr[a]].count;
            self.testTypeData.push(obj);
            self.testTypeOptions.series[0].data=self.testTypeData;
            self.testTypeBarOptions.series[0].data=self.testTypeData;
            }
          }

          /** Status code */
           if(data.status.status_count>0){
              let stArr=Object.keys(data.status.status);
            self.statusData=[];
          for(let a=0;a<stArr.length;a++){
            let obj={};
            obj['name']=stArr[a];
            obj['color']=self.colors[a%self.colors.length];
            obj['y']=data.status.status[stArr[a]].count;
            self.statusData.push(obj);
            self.statusOptions.series[0].data=self.statusData;
             self.statusBarOptions.series[0].data=self.statusData;
            }
          }

           /** Component code */
           if(data.component.component_count>0){
              let cArr=Object.keys(data.component.component);
            self.componentData=[];
          for(let a=0;a<cArr.length;a++){
            let obj={};
            obj['name']=cArr[a];
            obj['color']=self.colors[a%self.colors.length];
            obj['y']=data.component.component[cArr[a]].count;
            self.componentData.push(obj);
            self.componentOptions.series[0].data=self.componentData;
            self.componentBarOptions.series[0].data=self.componentData;
            }
          }

           /** Component code */
           if(data.engineers_data.engineers_count>0){
              let sArr=Object.keys(data.engineers_data.engineer);
            self.engineerData=[];
          for(let a=0;a<sArr.length;a++){
            let obj={};
            obj['name']=sArr[a];
            obj['color']=self.colors[a%self.colors.length];
            obj['y']=data.engineers_data.engineer[sArr[a]].count;
            self.engineerData.push(obj);
            self.engineerOptions.series[0].data=self.engineerData;
            self.engineerBarOptions.series[0].data=self.engineerData;
            }
          }

          if(data.product.product_count>0){
              let sArr=Object.keys(data.product.product);
            self.productData=[];
          for(let a=0;a<sArr.length;a++){
            let obj={};
            obj['name']=sArr[a];
            obj['color']=self.colors[a%self.colors.length];
            obj['y']=data.product.product[sArr[a]].count;
            self.productData.push(obj);
            self.platformOptions.series[0].data=self.productData;
            self.platformBarOptions.series[0].data=self.productData;
            }
          }

          if(data.de_manager_data.de_manager_count>0){
              let sArr=Object.keys(data.de_manager_data.de_manager);
            self.deManagerData=[];
          for(let a=0;a<sArr.length;a++){
            let obj={};
            obj['name']=sArr[a];
            obj['color']=self.colors[a%self.colors.length];
            obj['y']=data.de_manager_data.de_manager[sArr[a]].count;
            self.deManagerData.push(obj);
            self.deManagerOptions.series[0].data=self.deManagerData;
            self.deManagerBarOptions.series[0].data=self.deManagerData;
            }
          }

          if(data.submitter_manager.submitter_manager_count>0){
              let sArr=Object.keys(data.submitter_manager.submitter_manager);
            self.submitterManagerData=[];
          for(let a=0;a<sArr.length;a++){
            let obj={};
            obj['name']=sArr[a];
            obj['color']=self.colors[a%self.colors.length];
            obj['y']=data.submitter_manager.submitter_manager[sArr[a]].count;
            self.submitterManagerData.push(obj);
            self.submitterManagerOptions.series[0].data=self.submitterManagerData;
            self.submitterManagerBarOptions.series[0].data=self.submitterManagerData;
            }
          }

           if(data.submitter.submitter_count>0){
              let sArr=Object.keys(data.submitter.submitter);
            self.submitterData=[];
          for(let a=0;a<sArr.length;a++){
            let obj={};
            obj['name']=sArr[a];
            obj['color']=self.colors[a%self.colors.length];
            obj['y']=data.submitter.submitter[sArr[a]].count;
            self.submitterData.push(obj);
            self.submitterOptions.series[0].data=self.submitterData;
            self.submitterBarOptions.series[0].data=self.submitterData;
            }
          }

           if(data.Num_i_state_change.istate_count>0){
              let sArr=Object.keys(data.Num_i_state_change.istatechages);
            self.iStateData=[];
          for(let a=0;a<sArr.length;a++){
            let obj={};
            obj['name']=sArr[a];
            obj['color']=self.colors[a%self.colors.length];
            obj['y']=data.Num_i_state_change.istatechages[sArr[a]];
            self.iStateData.push(obj);
            self.iStateOptions.series[0].data=self.iStateData;
            self.iStateBarOptions.series[0].data=self.iStateData;
            }
          }

          }
          },
          (error)=>{
            debugger;
          });
    
    },
    releaseChanged(rel){
      this.selectedRelease=rel;
      let rels=document.querySelectorAll('.relForDefects');
      for(let m=0;m<rels.length;m++){
        if(rels[m].classList.contains('activeRel')){
          rels[m].classList.remove('activeRel');
        }
      }
      event.currentTarget.classList.add('activeRel');
    },
      maximizeModal(){
        this.emitToParent('maximize');
      },
      minimizeModal(){
         this.emitToParent('minimize');
      },
    chageCustRelease(){
      if(this.custOrRelease==="customer"){
        this.custOrRelease="release";
        document.querySelector('.selectCust')[0].classList.remove('btn--primary');
        document.querySelector('.selectCust')[0].classList.add('btn--secondary');

        document.querySelector('.selectRel')[0].classList.remove('btn--secondary');
        document.querySelector('.selectRel')[0].classList.add('btn--primary');
      }
      else if(this.custOrRelease==="release"){
        this.custOrRelease="customer";
        document.querySelector('.selectRel')[0].classList.remove('btn--primary');
        document.querySelector('.selectRel')[0].classList.add('btn--secondary');

        document.querySelector('.selectCust')[0].classList.remove('btn--secondary');
        document.querySelector('.selectCust')[0].classList.add('btn--primary');
      }
    }
    },
    
}
</script>
<template>
 <div id="defect-detail-content-wrapper" style="width:100%">
<div
        class="modal__header"
        style="display:flex; justify-content:space-between; margin-bottom:5px;"
      >
        <div class="modal_title">Defect details</div>
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
          v-on:click="closeDefectDetailsModal()"
        ></span>
        </span>
        </div>
         <div class="modal__body" style="display:flex; justify-content:center;">
        
         <div class="defectMainWrapper">
         <div class="defectsOrCFD row" style="width=100%;float:right;margin-bottom: 20px;">
          <button v-if="!showDefects" class="btn btn--primary" @click="showDefects=!showDefects">DDTS</button>
           <button v-if="showDefects" class="btn btn--primary" @click="showDefects=!showDefects">CFD's</button>
         </div>
          <div v-if="showDefects">
          <div class="custReleaseBtns row" style="width:100%;float:right;flex-direction: row-reverse;margin-bottom: 33px;">
         <button class="btn btn--primary selectCust" @click="chageCustRelease">Customer</button>
         <button class="btn btn--secondary selectRel"  @click="chageCustRelease">Release</button>
         </div>
         <div class=" row selectionWindow">
            <div  v-if="showReleases" class="selectReleaseWrapper" style="width: 50%;margin: 20px;">
             <div style="display:flex">
            <template v-for="(rel,index) in releasesArray">
            <button class="relForDefects" :key="index" @click="releaseChanged(rel)">{{rel}}</button>
            </template>
             </div>
            </div>
         </div>
         <div class="defectdashboardWrapper" v-show="showDefectContent">
         <div class="defectFirstRow row1">
           <div id="defect_f4_chart">
            <chart  disbleExport=false :colorscheme="colorscheme"  v-on:child="onChildInteraction" id="defect_f4"  :option="platformOptions" v-show="showPlatformPie" toggleOption="showPlatformPie"></Chart>
            <chart  disbleExport=false :colorscheme="colorscheme"  v-on:child="onChildInteraction" id="a_defect_f4"  :option="platformBarOptions" v-show="!showPlatformPie" toggleOption="showPlatformPie"></Chart>
         </div>
         <div id="defect_f1_chart">
            <chart  disbleExport=false :colorscheme="colorscheme"  v-on:child="onChildInteraction" id="defect_f1"  :option="testTypeOptions" v-show="showTypePie" toggleOption="showTypePie"></Chart>
             <chart  disbleExport=false :colorscheme="colorscheme"  v-on:child="onChildInteraction" id="a_defect_f1"  :option="testTypeBarOptions" v-show="!showTypePie" toggleOption="showTypePie"></Chart>
         </div>
         </div>
           <div class="defectFirstRow row1">
          
         <div id="defect_s3_chart">
            <chart  disbleExport=false :colorscheme="colorscheme"  v-on:child="onChildInteraction" id="defect_s3"  :option="componentOptions" v-show="showComponentPie" toggleOption="showComponentPie"></Chart>
             <chart  disbleExport=false :colorscheme="colorscheme"  v-on:child="onChildInteraction" id="a_defect_s3"  :option="componentBarOptions" v-show="!showComponentPie" toggleOption="showComponentPie"></Chart>
         </div>
        
          <div id="defect_s2_chart">
            <chart  disbleExport=false :colorscheme="colorscheme"  v-on:child="onChildInteraction" id="defect_s2"  :option="statusOptions" v-show="showStatusPie" toggleOption="showStatusPie"></Chart>
            <chart  disbleExport=false :colorscheme="colorscheme"  v-on:child="onChildInteraction" id="a_defect_s2"  :option="statusBarOptions" v-show="!showStatusPie" toggleOption="showStatusPie"></Chart>
         </div>
         </div>
          <div class="defectFirstRow row1">
            <div id="defect_s1_chart">
             <chart  disbleExport=false :colorscheme="colorscheme"  v-on:child="onChildInteraction" id="defect_s1"  :option="submitterOptions" v-show="showSubmitterPie" toggleOption="showSubmitterPie"></Chart>
              <chart  disbleExport=false :colorscheme="colorscheme"  v-on:child="onChildInteraction" id="a_defect_s1"  :option="submitterBarOptions" v-show="!showSubmitterPie" toggleOption="showSubmitterPie"></Chart>
         </div>
           <div id="defect_f3_chart">
            <chart  disbleExport=false :colorscheme="colorscheme"  v-on:child="onChildInteraction" id="defect_f3"  :option="submitterManagerOptions" v-show="showSubmitterMgrPie" toggleOption="showSubmitterMgrPie"></Chart>
            <chart  disbleExport=false :colorscheme="colorscheme"  v-on:child="onChildInteraction" id="a_defect_f3"  :option="submitterManagerBarOptions" v-show="!showSubmitterMgrPie" toggleOption="showSubmitterMgrPie"></Chart>
         </div>

          </div>
         <div class="defectFirstRow row1">
          <div id="defect_f2_chart">
            <chart  disbleExport=false :colorscheme="colorscheme"  v-on:child="onChildInteraction" id="defect_f2"  :option="deManagerOptions" v-show="showDeMgrPie" toggleOption="showDeMgrPie"></Chart>
             <chart  disbleExport=false :colorscheme="colorscheme"  v-on:child="onChildInteraction" id="a_defect_f2"  :option="deManagerBarOptions" v-show="!showDeMgrPie" toggleOption="showDeMgrPie"></Chart>
         </div>
         <div id="defect_f5_chart">
            <chart  disbleExport=false :colorscheme="colorscheme"  v-on:child="onChildInteraction" id="defect_f5"  :option="iStateOptions" v-show="showIStatePie" toggleOption="showIStatePie"></Chart>
             <chart  disbleExport=false :colorscheme="colorscheme"  v-on:child="onChildInteraction" id="a_defect_f5"  :option="iStateBarOptions" v-show="!showIStatePie" toggleOption="showIStatePie"></Chart>
         </div>
         
         </div>
           
         </div>
         </div>
         <div v-else>
           <table class="table table--highlight secondaryTable">
        <tr>
        <th style="text-align: left;">CFD's
        </th>
        <th style="text-align: left;">Count</th>
         <th style="text-align: left;">Testcases</th>
           <th style="text-align: left;">Component</th>
             <th style="text-align: left;">Product</th>
            <th style="text-align: left;white-space:pre-wrap;width:25%">Headline</th>
        </tr>
          <tr
            v-for="(item,propertyname,index) in cfdSummary"
            :key="index"
          >
            <td style="text-align: left;">{{ propertyname }}</td>
            <td style="text-align: left;">{{ item.count }}</td>
            <td style="text-align: left;"><template v-for="str,index1 in item.testcaseId"><span :key="index1" v-if="index1>0">,</span><a style="margin-left: 5px;" :key="'a'+index1" @click="openTestcase(str)">{{ str }}</a></template></td>
             <td style="text-align: left;">{{ item.component }}</td>
             <td style="text-align: left;white-space:pre-wrap;">{{item.product}}</td>
            <td style="text-align: left;white-space:pre-wrap;width:25%">{{ item.headline }}</td>
          </tr>
        </table>
         </div>
         </div>
         </div>
 </div>
</template>
