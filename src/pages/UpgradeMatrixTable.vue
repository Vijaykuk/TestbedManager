<script>
import { testcaseService } from "@/core/services/testcaseService";
import Chart from "./Chart";
import DatePicker from "vue2-datepicker";
import ContextMenu from "../components/global/ContextMenu/ContextMenu";
import ContextMenuItem from "../components/global/ContextMenu/ContextMenuItem";
import "vue2-datepicker/index.css";
import moment from "moment-timezone";
export default {
     name: "UpgradeMatrixTable",
     props:["displayName","weeklyReportFlag","releaseId","customerName","folderName","weekdates","showExtraPage"],
     components:{
        ContextMenu,
       ContextMenuItem,
       DatePicker,
       Chart
     },
     data() {
    return {
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
       format:"YYYY-MM-DDTHH:mm:ss",
      showCreateUpgrade:false,
      bulkEditFlag:false,
       tempSavedData:[],
      editUpgrade:false,
     upgradeMatrixData:{},
     upgradeMatrixTotalData:{},
     allUpgradeMatrixData:{},
     allUpgradeMatrixTotalData:[],
     upgradePlatforms:[],
     platforms:[],
     selectedPlatform:"",
     selectedDate:"",
     weekDates:[],
     upgradeHeatMapOptions:{},
     startEndDates:[],
     selectedStartDate:"",
     selectedEndDate:"",
     selectedWeekId:"",
     selectedTrId:"",
     selectedTrRows:[],
     selectedTrs:[]
    };
  },
  mounted() {
    this.loadUpgradeMatrix();
  },
  watch:{
    selectedDate:function(selectedDate){
      for(let k=0;k<this.startEndDates.length;k++){
        if(this.startEndDates[k].end_date===selectedDate){
          this.selectedStartDate=this.startEndDates[k].start_date;
          this.selectedEndDate=this.startEndDates[k].end_date;
          this.selectedWeekId=this.startEndDates[k].week_id;
        }
      }
    }
  },
  methods: {
     onChildInteraction(args, payload) {
      switch (args) {

      }
     },
       emitToParent(value, payload) {
      this.$emit("child", value, payload);
      },
      openTrMenu: function(tObj) {
      debugger;
      if (
        this.selectedTrRows.length &&
        this.selectedTrRows.indexOf(tObj.id) >= 0
      ) {
        this.$refs.tr_menu.open(event, tObj);
      } else {
        this.selectedTrRows = [];
        this.selectedTrs = [];
        this.removeSelection();
      }
      event.preventDefault();
    },

    removeSelection() {
      let rows = document.getElementsByClassName("selectedRows");
      while (rows.length > 0) {
        rows[0].classList.remove("selectedRows");
      }
    },

     rowSelect(tobj, event) {
      if (event.currentTarget.classList.contains("selectedRows")) {
        event.currentTarget.classList.remove("selectedRows");
        for (let i = 0; i < this.selectedTrRows.length; i++) {
          if (this.selectedTrRows[i] === tobj.id) {
            this.selectedTrRows.splice(i, 1);
            this.selectedTrs.splice(i, 1);
          }
        }
      } else {
        event.currentTarget.classList.add("selectedRows");
        this.selectedTrRows.push(tobj.id);
        this.selectedTrs.push(tobj);
      }
      this.selectedTrRows = [...new Set(this.selectedTrRows)];
    },
     cancelBulkEditUpgrade(){
       this.bulkEditFlag=false;
       this.tempSavedData={};
     },
     editTr(tObj) {
      this.$refs.tr_menu.close();
        this.showCreateUpgrade=true;
        this.upgradeObj={
          start_date:tObj.start_date,
          end_date:tObj.end_date,
          week_id:this.selectedWeekId,
          platform:tObj.platform,
          pid:tObj.pid,
          method:tObj.method,
          release_from:tObj.release_from,
          release_to:tObj.release_to,
          planned:tObj.planned,
          totalCount:tObj.totalCount,
          defects:tObj.defects,
          passed:tObj.passed,
          failed:tObj.failed
        }
        this.editUpgrade=true;
        this.selectedTrId=tObj.id;
    },
     selectAll(tObj) {
       debugger;
      this.$refs.tr_menu.close();
      this.selectedRows = [];
      this.selectedTestcases = [];
    },
    deleteTr(tObj){
      this.$refs.tr_menu.close();
      this.loading = true;
      let self=this;
      this.loadingMessage = "Deleting Upgrade..";
        testcaseService.deleteUpgrade(tObj.id).then(
          (data) => {
            self.loadUpgradeMatrix();
          },
          (error) => {
            this.selectedTrId="";
            this.loading = false;
            this.loadingMessage = "";
            this.showErrorModal = true;
            this.modalErrorMessage =
              "Error while deleting Upgrade, Please try again later";
          });
    },
      maximizeModal(){
        this.emitToParent('maximize');
      },
      minimizeModal(){
         this.emitToParent('minimize');
      },
     
      closeUpgradeMatrixModal(){
        this.emitToParent("closeUpgradeMatrixModal");
      },
       addDateRack(e){
     },
     platformChanged(platform){
       this.selectedPlatform=platform;
     },
     addActiveClass(date1){
        if(date1===this.selectedDate){
          return "activeDate btn btn--primary";
        }
        else{
          return 'otherDate';
        }
      },
     weekChanged(date1){
       this.selectedDate=date1;
     },
       isBulkSelection(e,tObj) {
      if (this.selectedTrRows.indexOf(tObj.id) >= 0) {
        return true;
      } else {
        return false;
      }
    },
    bulkEditUpgrade(){
      this.bulkEditFlag=true;
      this.tempSavedData=JSON.parse(JSON.stringify(this.upgradeMatrixData[this.selectedEndDate]));
    },  
      createUpgrade(){
        this.showCreateUpgrade=true;
        this.upgradeObj={
          start_date:this.selectedStartDate,
          end_date:this.selectedEndDate,
           week_id:this.selectedWeekId,
          upgrade:"",
          platform:"",
          pid:"",
          method:"",
          release_from:"",
          release_to:"",
          planned:0,
          totalCount:0,
          defects:"",
          passed:0,
          failed:0
        }
      },
      cancelCreateUpgrade(){
         this.showCreateUpgrade=false;
         this.editUpgrade=false;
        this.upgradeObj={
          start_date:this.selectedStartDate,
          end_date:this.selectedEndDate,
          week_id:this.selectedWeekId,
          platform:this.selectedPlatform,
          pid:"",
          method:"",
          release_from:"",
          release_to:"",
          planned:0,
          totalCount:0,
          defects:"",
          passed:0,
          failed:0
        }
      },
      noFutureDate(date1){
      let tempDate="";
      for(let i=0;i<this.startEndDates.length;i++){
        if(date1===this.startEndDates[i].end_date){
          tempDate=this.startEndDates[i].start_date;
        }
      }
      if(new Date(tempDate)<=new Date()){
        return true;
      }
      else{
        return false;
      }
    },
      checkDuplicateTest(upname){
        for(let k=0;k<this.upgradeMatrixData[this.selectedEndDate].length;k++){
          if(this.upgradeMatrixData[this.selectedEndDate][k].upgrade===upname){
            return false
          }
        }
        return true;
      },
      checkBulkDuplicateTest(arr,ind){
        let upname=arr[ind].upgrade;
        for(let k=0;k<arr.length;k++){
          if(ind!=k){
            if(upname===arr[k].upgrade){
              return false
            }
          }
        }
        return true;
      },
        saveBulkUpgrade(){
           let self=this;
            self.emitToParent("loading","Updating the upgrades");
            let noDuplicate=true, noDulpicateFlag=true; 
            /* for(let s=0;s<this.tempSavedData.length;s++){
              noDuplicate=this.checkBulkDuplicateTest(this.tempSavedData, s);
              if(noDuplicate===false){
                noDulpicateFlag=false;
              }
            }*/
            testcaseService.updateUpgradeMatrix(this.tempSavedData,this.selectedWeekId).then(
            (data) => {
              self.tempSavedData={};
              self.emitToParent("stopLoading");
              self.bulkEditFlag=false;
              self.selectedTrId="";
              self.showCreateUpgrade=false;
             self.loadUpgradeMatrix();
            },
            (error) =>{
               self.emitToParent("stopLoading");
                self.emitToParent("showError","Error while loading");
            });
          
      },
      sortByDateAsc(arr,key){
        return arr.sort(function(a,b){
         var dateA = new Date(a[key]).getTime();
         var dateB = new Date(b[key]).getTime();
          return dateA > dateB ? 1 : -1;  
      });
    },
      saveCreateUpgrade(){
         let self=this;
         if(self.editUpgrade){
            self.emitToParent("loading","Updating the upgrade");
          let  type="release",
               id=self.releaseId;
          let tempObj={...self.upgradeObj}
          tempObj["id"]=self.selectedTrId;
          let weekId=self.upgradeObj.week_id;
         // let noDuplicate=self.checkDuplicateTest(tempObj.upgrade);
          if( tempObj.method != "" && tempObj.release_from != "" && tempObj.release_to != ""){
           testcaseService.updateUpgradeMatrix([tempObj],weekId).then(
            (data) => {
               self.emitToParent("stopLoading");
              self.selectedTrId="";
              self.showCreateUpgrade=false;
             self.loadUpgradeMatrix();
            },
            (error) =>{
               self.emitToParent("stopLoading");
                self.emitToParent("showError","Error while loading");
              debugger;
            });
          }
          else{
                 self.showCreateUpgrade=false;
             self.emitToParent("stopLoading");
              self.emitToParent("showError","Error");
         }

        }
          else{
          self.emitToParent("loading","Creating the upgrade");
          let  type="release",
               id=self.releaseId;
          if(self.weeklyReportFlag==="relId"){
               type="release"
               id=self.releaseId;
             }
             else if(self.weeklyReportFlag==="customerName"){
               type="customer";
               id=self.folderName+","+self.customerName;
             }
           let tempObj={...self.upgradeObj}
         // let noDuplicate=self.checkDuplicateTest(tempObj.upgrade);
          if( self.upgradeObj.pid != "" && self.upgradeObj.method != "" && self.upgradeObj.release_from != "" && self.upgradeObj.release_to != ""){
           testcaseService.createUpgradeMatrix([self.upgradeObj],type,id).then(
            (data) => {
              self.emitToParent("stopLoading");
              self.showCreateUpgrade=false;
             self.loadUpgradeMatrix();
            },
            (error) =>{
               self.emitToParent("stopLoading");
                self.emitToParent("showError","Error while loading");
            });
          }
          else{
               self.showCreateUpgrade=false;
             self.emitToParent("stopLoading");
              self.emitToParent("showError","Error");
          }
          }
          event.stopPropagation();
          event.preventDefault();
      },
      joinUpgradeObjects(srcObj,destObj){
        let tempdefect=[];
       let src= JSON.parse(JSON.stringify(srcObj));
       let dest= JSON.parse(JSON.stringify(destObj));
       src.actual=src.actual===""?parseInt(dest.actual):parseInt(dest.actual)+parseInt(src.actual);
       let t_defects=dest.defects.split(',');
       for(let d=0;d<t_defects.length;d++){
          tempdefect=t_defects[d].trim();
          if(src.defects.indexOf(tempdefect)<0){
            src.defects=","+tempdefect;
          }
        }
        return src;
      },
       loadHeatMapOptions(){
      return {
    chart: {
        type: 'heatmap',
        backgroundColor: null,
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 1,
         colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        maxColor: "#86e0fc" 
    },
        series:[{
         dataLabels: {
         enabled: true,
            color: '#000',
       formatter: function() {
          return '<span>' + this.value + '</span>';
        }
     }
      }],
       credits: {
        enabled: true
    },
    },


    title: {
        text: 'Trend'
    },

    xAxis: {
        categories: [],
         labels: {
            style: {
                fontSize: '8px'
            }
        },
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
        borderColor:'#000',
        data: [[0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]],
        dataLabels: {
           enabled: true,
            color: '#000',
             style: {
                     color:"#000 !important",
                    fill:"#000 !important",
                    cursor: 'default',
                    pointerEvents: 'none',
                    textOutline: 'transparent',
                },
        }
    }],
    }
    },
      loadUpgradeMatrix(){
         let self=this;
         this.upgradePlatforms=["Total"];
         let type="release",id="";
                type="release"
               id=this.releaseId;

           if(self.weeklyReportFlag==="relId"){
               type="release"
               id=this.releaseId;
             }
             else if(self.weeklyReportFlag==="customerName"){
               type="customer";
               id=this.folderName+","+this.customerName;
             }
       this.loading = false;
      this.loadingMessage = "Loading Upgrade Matrix Details";
      testcaseService.loadUpgradeMatrix(type,id).then(
        (data) => {
          debugger;
           self.upgradeMatrixTotalData['Total']=[];
           for(let ka=0;ka<data.data0.length;ka++){
             data.data0[ka]["totalCount"]=data.data0[ka].passed+data.data0[ka].failed;
           }
           self.upgradeMatrixTotalData['Total']=data.data0;

           let platformUpgrades=data.data1;
           
            for(let k=0;k<Object.keys(platformUpgrades).length;k++){
              self.upgradeMatrixTotalData[Object.keys(platformUpgrades)[k]]=[]; 
              let tempPlatformUpgrades=platformUpgrades[Object.keys(platformUpgrades)[k]];
               for(let ka=0;ka<tempPlatformUpgrades.length;ka++){
                tempPlatformUpgrades[ka]["totalCount"]=tempPlatformUpgrades[ka].passed+tempPlatformUpgrades[ka].failed;
                 }
               self.upgradeMatrixTotalData[Object.keys(platformUpgrades)[k]]=tempPlatformUpgrades;
            }
            self.upgradePlatforms=self.upgradePlatforms.concat(Object.keys(platformUpgrades));
            self.platforms=Object.keys(platformUpgrades);
            self.selectedPlatform='Total';
        },
        (error)=>{

        });
/** code for weekly upgrade matrix */
         testcaseService.loadWeeklyUpgradeMatrix(type,id).then(
        (data1) => {
          debugger;
          let data=self.sortByDateAsc(data1,'start_date');
          let dates=[];
          self.weekDates=[];
          let upgradeWeeklycountArray={};
          for(let m=0;m<Object.keys(data).length;m++){
            if(data[Object.keys(data)[m]].upgrades.length>0){
              for(let f=0;f<data[Object.keys(data)[m]].upgrades.length;f++){
                data[Object.keys(data)[m]].upgrades[f]["totalCount"]= data[Object.keys(data)[m]].upgrades[f].passed+ data[Object.keys(data)[m]].upgrades[f].failed;
              }
                   
            }
           
           self.weekDates.push(data[Object.keys(data)[m]].end_date);
            upgradeWeeklycountArray[data[Object.keys(data)[m]].end_date]=data[Object.keys(data)[m]].upgrades.length;
            self.startEndDates.push({'start_date':data[Object.keys(data)[m]].start_date,'end_date':data[Object.keys(data)[m]].end_date,'week_id':Object.keys(data)[m]})
            self.upgradeMatrixData[data[Object.keys(data)[m]].end_date]=[];
            self.upgradeMatrixData[data[Object.keys(data)[m]].end_date]=data[Object.keys(data)[m]].upgrades;
             if(new Date(data[Object.keys(data)[m]].start_date)<new Date()){
              self.selectedDate=data[Object.keys(data)[m]].end_date;
           }
          }
            let upgradeHeatMapOptions=self.loadHeatMapOptions();
            upgradeHeatMapOptions.title.text="";
            upgradeHeatMapOptions.xAxis.categories=[];
            let totalTrs=[],trnames={},weekdates=[];
            for(let g=0;g<self.weekDates.length;g++){
              weekdates.push(self.weekDates[g].substring(0,10));
              upgradeWeeklycountArray[self.weekDates[g].substring(0,10)]={};
              let tempUpgrades=self.upgradeMatrixData[self.weekDates[g]];
               trnames[self.weekDates[g].substring(0,10)]=[];
              for(let t=0;t<tempUpgrades.length;t++){
                if(trnames[self.weekDates[g].substring(0,10)].indexOf(tempUpgrades[t].platform)>-1){
                   upgradeWeeklycountArray[self.weekDates[g].substring(0,10)][tempUpgrades[t].platform]["count"]+=parseInt(tempUpgrades[t].totalCount);
                    if(tempUpgrades[t].failed>0){
                    upgradeWeeklycountArray[self.weekDates[g].substring(0,10)][tempUpgrades[t].platform]["failed"]=true;
                  }
                }
                else{
                  if(totalTrs.indexOf(tempUpgrades[t].platform)<0){
                    totalTrs.push(tempUpgrades[t].platform);
                  }
                  trnames[self.weekDates[g].substring(0,10)].push(tempUpgrades[t].platform);
                  upgradeWeeklycountArray[self.weekDates[g].substring(0,10)][tempUpgrades[t].platform]={count:parseInt(tempUpgrades[t].totalCount),failed:false};
                  if(tempUpgrades[t].failed>0){
                    upgradeWeeklycountArray[self.weekDates[g].substring(0,10)][tempUpgrades[t].platform]["failed"]=true;
                  }
                }
              }
           }

          let valueArray=[],valueObj={};
           for(let i=0;i<self.weekDates.length;i++){
             for(let j=0;j<totalTrs.length;j++){
               if(trnames[self.weekDates[i].substring(0,10)].indexOf(totalTrs[j])>-1){
                  valueObj={};
              valueObj["x"]=i;
              valueObj["y"]=j;
              valueObj["color"]='#86e0fc';
             valueObj["color"]=upgradeWeeklycountArray[self.weekDates[i].substring(0,10)][totalTrs[j]]["failed"]?"#f0f062":"#42be07";
              valueObj["value"]=upgradeWeeklycountArray[self.weekDates[i].substring(0,10)][totalTrs[j]]["count"];
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
            debugger;
            self.upgradeHeatMapOptions=upgradeHeatMapOptions;
           debugger;
        },
        (error)=>{

        });
      }
  }
}
</script>
<template>
<div>
 <div
        class="modal__header"
        style="display:flex; justify-content:space-between; margin-bottom:5px;"
      >
        <div class="modal_title">Upgrade Matrix - {{displayName}}</div>
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
          v-on:click="closeUpgradeMatrixModal()"
        ></span>
        </span>
</div>
  <div class="modal__body" style="display:flex; justify-content:center;">
  <div class="upgradeMatrixWrapper">
  <div class="upgradematrixplatforms">
  <div class="tm_btn-container" style="width: 100%;">
    <template v-for="(platform,indexP) in upgradePlatforms">
      <button
            :key="indexP"
            class="btn btn--secondary tmBtn"
            @click="platformChanged(platform)"
            style="font-size:1.4rem;"
          >
           {{platform}}
          </button>
      </template>
     </div>
  </div>
  <div class="allUpgradeMatrix row">
   <div class="tGradeMatrixTable" style="width:100%">
      <table id="tMatrixTable" class="table table--highlight secondaryTable" style="width:100%">
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
      <template v-for="(tObj,index) in upgradeMatrixTotalData[selectedPlatform]">
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
      <td>{{tObj.totalCount}}
     </td>
     <td>{{tObj.passed}}
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
      <chart  disbleExport=false  v-on:child="onChildInteraction" id="heatChart3" :option="upgradeHeatMapOptions"></Chart>
   </div>
  </div>
   <div class="weeklyUpgradeMatrix">
    <div class="createUpgradeButtonDiv">
      <div class="tm_btn-container" style="width: 100%;">
          <button
           v-if="!showCreateUpgrade && !bulkEditFlag"
           class="btn btn--primary tmBtn"
            @click="createUpgrade()"
            style="font-size:1.4rem;"
          >
            <i class="icon icon-plus"> </i>
          </button>
           <button
           v-if="!showCreateUpgrade && !bulkEditFlag"
            class="btn btn--primary tmBtn"
            @click="bulkEditUpgrade()"
            style="font-size:1.4rem;"
          >
            <i class="icon icon-edit"> </i>
          </button>
           <button
            v-if="showCreateUpgrade && !bulkEditFlag"
            class="btn btn--primary tmBtn"
            @click="saveCreateUpgrade()"
            style="font-size:1.4rem;"
          >
            <i class="icon icon-save"> </i>
          </button>
            <button
            v-if="bulkEditFlag && !showCreateUpgrade"
            class="btn btn--primary tmBtn"
            @click="saveBulkUpgrade()"
            style="font-size:1.4rem;"
          >
            <i class="icon icon-save"> </i>
          </button>
          <button
            v-if="bulkEditFlag && !showCreateUpgrade"
            class="btn btn--secondary tmBtn"
            @click="cancelBulkEditUpgrade()"
            style="font-size:1.4rem;"
          >
            <i class="icon icon-close"> </i>
          </button>
          <button
            v-if="showCreateUpgrade && !bulkEditFlag"
            class="btn btn--secondary tmBtn"
            @click="cancelCreateUpgrade()"
            style="font-size:1.4rem;"
          >
            <i class="icon icon-close"> </i>
          </button>
       </div>
   </div>
   <div class="weeks row">
    <template v-for="(date1,indexd) in weekDates">
          <a
            :key="indexd"
            :class="addActiveClass(date1)"
            @click="weekChanged(date1)"
            style="font-size:1.4rem;border:none; margin-top:20px;"
             v-if="noFutureDate(date1)"
          >
           {{date1.substring(0,10)}}
          </a>
      </template>
   </div>
   <div class="tGradeMatrixMainTable">
      <table id="tMatrixTable" class="table table--highlight secondaryTable">
      <tr>
     <th class="uTableTh" style="width:10%">Platform
      </th>
      <th class="uTableTh" style="width:8%">PID
      </th>
       <th class="uTableTh" style="width:8%">Method
      </th>
       <th class="uTableTh" style="width:8%">Rel From
      </th>
      <th class="uTableTh" style="width:8%">Rel To
      </th>
     <th class="uTableTh" style="width:7%">Total
      </th>
      <th class="uTableTh" style="width:7%">Pass
      </th>
      <th class="uTableTh" style="width:7%">Fail
      </th>
      <th class="uTableTh" style="width:25%">Defects
      </th>
      </tr>
      <tr v-if="showCreateUpgrade" class="editTr">
      <td style="width:10%"> <input  list="platforms" style="width: 100%;height:100%"  type="text" class="weeklyTableText" v-model="upgradeObj.platform">
      <datalist id="platforms">
       <template v-for="(pl,ip) in platforms">
       <option :key="'key_'+ip" :value="pl">{{pl}}</option>
       </template>
      </datalist>
       </td>
      <td style="width:8%"> <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="upgradeObj.pid">
      </td>
       <td style="width:8%"> <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="upgradeObj.method">
      </td>
      <td style="width:8%"> <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="upgradeObj.release_from">
      </td>
      <td style="width:8%"> <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="upgradeObj.release_to">
      </td>
      <td style="width:7%"> <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" readonly="true" :value="upgradeObj.totalCount">
      </td>
       <td style="width:7%"> <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="upgradeObj.passed" >
      </td>
       <td style="width:7%"> <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="upgradeObj.failed" >
      </td>
       <td style="width:25%"> <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="upgradeObj.defects">
      </td>
      </tr>
         <template v-if="!bulkEditFlag">
       <template v-for="(tObj,index) in upgradeMatrixData[selectedDate]">
       <tr :key="'XYZ_'+index" @contextmenu="openTrMenu(tObj)" @click="rowSelect(tObj, $event)" class="upgradeTr">
      <td>{{tObj.platform}}
      </td>
      <td>{{tObj.pid}}
      </td>
      <td>{{tObj.method}}
      </td>
      <td>{{tObj.release_from}}
      </td>
      <td>{{tObj.release_to}}
      </td>
        <td>{{tObj.totalCount}}
      </td>
      <td>{{tObj.passed}}
      </td>
       <td>{{tObj.failed}}
      </td>
       <td>{{tObj.defects}}
      </td>
      </tr>
      </template>
         </template>
         <template v-if="bulkEditFlag">
      <template v-for="(tObj,index) in tempSavedData">
       <tr :key="'XYZ_'+index" class="upgradeTr">
      <td><input  list="platforms" style="width: 100%;height:100%"  type="text" class="weeklyTableText" v-model="tObj.platform">
      <datalist id="platforms">
       <template v-for="(pl,ip) in platforms">
       <option :key="'key_'+ip" :value="pl">{{pl}}</option>
       </template>
      </datalist>
      </td>
      <td> <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="tObj.pid">
      </td>
      <td> <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="tObj.method">
      </td>
      <td> <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="tObj.release_from">
      </td>
      <td> <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="tObj.release_to">
      </td>
      <td> <input  style="width: 100%;height:100%" type="text" class="weeklyTableText"  readonly="true" :value="tObj.totalCount">
      </td>
      <td><input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="tObj.passed" >
      </td>
       <td> <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="tObj.failed" >
      </td>
       <td><input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="tObj.defects">
      </td>
      </tr>
      </template>
         </template>
      </table>
   </div>
  </div>
    <ContextMenu class="testMenu" ref="tr_menu">
          <template
            style="width:100%;height:200px"
            slot-scope="{ contextData }"
          >
            <ContextMenuItem
              @click.native="editTr(contextData)"
            >
              Edit
            </ContextMenuItem>
            <ContextMenuItem
              @click.native="deleteTr(contextData)"
            >
              Delete
            </ContextMenuItem>
          </template>
    </ContextMenu>
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
