<script>
import { testcaseService } from "@/core/services/testcaseService";
import Chart from "./Chart";
import DatePicker from "vue2-datepicker";
import ContextMenu from "../components/global/ContextMenu/ContextMenu";
import ContextMenuItem from "../components/global/ContextMenu/ContextMenuItem";
import "vue2-datepicker/index.css";
import moment from "moment-timezone";
export default {
     name: "TriggerMatrixTable",
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
      showCreateTrigger:false,
      bulkEditFlag:false,
      editTrigger:false,
      tempSavedData:[],
     triggerMatrixData:{},
     triggerMatrixTotalData:{},
     allTriggerMatrixData:{},
     allTriggerMatrixTotalData:[],
     triggerPlatforms:[],
     platforms:[],
     selectedPlatform:"",
     selectedDate:"",
     weekDates:[],
     triggerHeatMapOptions:{},
     startEndDates:[],
     selectedStartDate:"",
     selectedEndDate:"",
     selectedWeekId:"",
     selectedTrId:"",
     selectedTrRows:[],
     selectedTrs:[],
     custOrRelease:""
    };
  },
  mounted() {
    this.loadTriggerMatrix();
    if(this.weeklyReportFlag==="customerName"){
    //  this.chageCustRelease('customer');
    }
    else{
    //  this.chageCustRelease('release');
    }
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
     editTr(tObj) {
      this.$refs.tr_menu.close();
        this.showCreateTrigger=true;
        this.triggerObj={
          start_date:tObj.start_date,
          end_date:tObj.end_date,
          week_id:this.selectedWeekId,
          trigger:tObj.trigger,
          platform:tObj.platform,
          pid:tObj.pid,
          img:tObj.img,
          planned:tObj.planned,
          actual:tObj.actual,
          defects:tObj.defects,
          passed:tObj.passed,
          failed:tObj.failed
        }
        this.editTrigger=true;
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
      this.loadingMessage = "Deleting Trigger..";
        testcaseService.deleteTrigger(tObj.id).then(
          (data) => {
            self.loadTriggerMatrix();
          },
          (error) => {
            this.selectedTrId="";
            this.loading = false;
            this.loadingMessage = "";
            this.showErrorModal = true;
            this.modalErrorMessage =
              "Error while deleting Trigger, Please try again later";
          });
    },
   
     cancelBulkEditTrigger(){
       this.bulkEditFlag=false;
       this.tempSavedData={};
     },
      closeTriggerMatrixModal(){
        this.emitToParent("closeTriggerMatrixModal");
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
    bulkEditTrigger(){
      this.bulkEditFlag=true;
      this.tempSavedData=JSON.parse(JSON.stringify(this.triggerMatrixData[this.selectedEndDate]));

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
      createTrigger(){
        this.showCreateTrigger=true;
        this.triggerObj={
          start_date:this.selectedStartDate,
          end_date:this.selectedEndDate,
          week_id:this.selectedWeekId,
          trigger:"",
          platform:"",
          pid:"",
          img:"",
          planned:0,
          actual:0,
          defects:"",
          passed:0,
          failed:0
        }
      },
      cancelCreateTrigger(){
         this.showCreateTrigger=false;
         this.editTrigger=false;
        this.triggerObj={
          start_date:this.selectedStartDate,
          end_date:this.selectedEndDate,
          week_id:this.selectedWeekId,
          trigger:"",
          platform:this.selectedPlatform,
          pid:"",
          img:"",
          planned:0,
          actual:0,
          defects:"",
          passed:0,
          failed:0
        }
      },
      checkDuplicateTest(trname){
        for(let k=0;k<this.triggerMatrixData[this.selectedEndDate].length;k++){
          if(this.triggerMatrixData[this.selectedEndDate][k].trigger===trname && this.triggerMatrixData[this.selectedEndDate][k].platform===platform && this.triggerMatrixData[this.selectedEndDate][k].pid===pid){
            return false
          }
        }
        return true;
      },
      checkBulkDuplicateTest(arr,ind){
        let trname=arr[ind].trigger;
        for(let k=0;k<arr.length;k++){
          if(ind!=k){
            if(trname===arr[k].trigger){
              return false
            }
          }
        }
        return true;
      },

       saveBulkTrigger(){
           let self=this;
            self.emitToParent("loading","Updating the tringgers");
            let noDuplicate=true, noDulpicateFlag=true; 
            for(let s=0;s<this.tempSavedData.length;s++){
              noDuplicate=this.checkBulkDuplicateTest(this.tempSavedData, s);
              if(noDuplicate===false){
                noDulpicateFlag=false;
              }
            }
            if(noDulpicateFlag){
               testcaseService.updateTriggerMatrix(this.tempSavedData,this.selectedWeekId).then(
            (data) => {
              self.tempSavedData={};
              self.emitToParent("stopLoading");
              self.bulkEditFlag=false;
              self.selectedTrId="";
              self.showCreateTrigger=false;
             self.loadTriggerMatrix();
            },
            (error) =>{
               self.emitToParent("stopLoading");
                self.emitToParent("showError","Error while loading");
            });
            }
            else{
               self.emitToParent("stopLoading");
              self.emitToParent("showError","Error- duplicate or empty values");
            }
      },
        maximizeModal(){
        this.emitToParent('maximize');
      },
      minimizeModal(){
         this.emitToParent('minimize');
      },

      saveCreateTrigger(){
        if(this.editTrigger){
           let self=this;
            self.emitToParent("loading","Updating the tringger");
          let  type="release",
               id=this.releaseId;
          let tempObj={...this.triggerObj}
          tempObj["id"]=this.selectedTrId;
          let weekId=this.triggerObj.week_id;
          let noDuplicate=this.checkDuplicateTest(tempObj.trigger,tempObj.platform,tempObj.pid);
           if(tempObj.trigger != "" && tempObj.platform != "" && tempObj.pid != "" && noDuplicate){
           testcaseService.updateTriggerMatrix([tempObj],weekId).then(
            (data) => {
              self.emitToParent("stopLoading");
              self.selectedTrId="";
              self.showCreateTrigger=false;
             self.loadTriggerMatrix();
            },
            (error) =>{
               self.emitToParent("stopLoading");
                self.emitToParent("showError","Error while loading");
            });
          }
          else{
             self.showCreateTrigger=false;
             self.emitToParent("stopLoading");
              self.emitToParent("showError","Error");
          }

        }
          else{
          let self=this;
            self.emitToParent("loading","Creating the tringger");
          let  type="release",
               id=this.releaseId;
          if(self.weeklyReportFlag==="relId"){
               type="release"
               id=this.releaseId;
             }
             else if(self.weeklyReportFlag==="customerName"){
               type="customer";
               id=this.folderName+","+this.customerName;
             }
            let noDuplicate=this.checkDuplicateTest(this.triggerObj.trigger,this.triggerObj.platform,this.triggerObj.pid);
           if(this.triggerObj.trigger != "" && this.triggerObj.platform != "" && this.triggerObj.pid != "" && noDuplicate){
           testcaseService.createTriggerMatrix([this.triggerObj],type,id).then(
            (data) => {
              self.emitToParent("stopLoading");
             self.showCreateTrigger=false;
             self.loadTriggerMatrix();
            },
            (error) =>{
              self.emitToParent("stopLoading");
                self.emitToParent("showError","Error while loading");
             });
          }
          else{
            self.showCreateTrigger=false;
             self.emitToParent("stopLoading");
              self.emitToParent("showError","Error");
          }
          }
          event.stopPropagation();
          event.preventDefault();
      },
      joinTriggerObjects(srcObj,destObj){
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
      sortByDateAsc(arr,key){
      return arr.sort(function(a,b){
         var dateA = new Date(a[key]).getTime();
         var dateB = new Date(b[key]).getTime();
          return dateA > dateB ? 1 : -1;  
      });
    },
      loadTriggerMatrix(){
         let self=this;
         this.triggerPlatforms=["Total"];
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
      this.loadingMessage = "Loading Trigger Matrix Details";
      testcaseService.loadTriggerMatrix(type,id).then(
        (data) => {
          debugger;
           self.triggerMatrixTotalData['Total']=[];
           self.triggerMatrixTotalData['Total']=data.data0;
           let platformTriggers=data.data1;
           
            for(let k=0;k<Object.keys(platformTriggers).length;k++){
              self.triggerMatrixTotalData[Object.keys(platformTriggers)[k]]=[]; 
               self.triggerMatrixTotalData[Object.keys(platformTriggers)[k]]=platformTriggers[Object.keys(platformTriggers)[k]];
            }
            self.triggerPlatforms=self.triggerPlatforms.concat(Object.keys(platformTriggers));
            self.platforms=Object.keys(platformTriggers);
            self.selectedPlatform='Total';
        },
        (error)=>{

        });
/** code for weekly trigger matrix */
         testcaseService.loadWeeklyTriggerMatrix(type,id).then(
        (data1) => {
         data=self.sortByDateAsc(data1,'start_date');
          debugger;
          let dates=[];
          self.weekDates=[];
          let triggerWeeklycountArray={};
          for(let m=0;m<Object.keys(data).length;m++){
            
            self.weekDates.push(data[Object.keys(data)[m]].end_date);
            triggerWeeklycountArray[data[Object.keys(data)[m]].end_date]=data[Object.keys(data)[m]].triggers.length;
            self.startEndDates.push({'start_date':data[Object.keys(data)[m]].start_date,'end_date':data[Object.keys(data)[m]].end_date,'week_id':Object.keys(data)[m]})
            self.triggerMatrixData[data[Object.keys(data)[m]].end_date]=[];
            self.triggerMatrixData[data[Object.keys(data)[m]].end_date]=data[Object.keys(data)[m]].triggers;
            if(new Date(data[Object.keys(data)[m]].start_date)<new Date()){
              self.selectedDate=data[Object.keys(data)[m]].end_date;
           }
           }
           

            let triggerHeatMapOptions=self.loadHeatMapOptions();
            triggerHeatMapOptions.title.text="";
            triggerHeatMapOptions.xAxis.categories=[];
            let totalTrs=[],trnames={},weekdates=[];
            for(let g=0;g<self.weekDates.length;g++){
              weekdates.push(self.weekDates[g].substring(0,10));
              triggerWeeklycountArray[self.weekDates[g].substring(0,10)]={};
              let tempTriggers=self.triggerMatrixData[self.weekDates[g]];
               trnames[self.weekDates[g].substring(0,10)]=[];
              for(let t=0;t<tempTriggers.length;t++){
                if(trnames[self.weekDates[g].substring(0,10)].indexOf(tempTriggers[t].trigger)>-1){
                   triggerWeeklycountArray[self.weekDates[g].substring(0,10)][tempTriggers[t].trigger]["count"]+=parseInt(tempTriggers[t].actual);
                   if(tempTriggers[t].failed>0){
                    triggerWeeklycountArray[self.weekDates[g].substring(0,10)][tempTriggers[t].trigger]["failed"]=true;
                  }
                }
                else{
                  if(totalTrs.indexOf(tempTriggers[t].trigger)<0){
                    totalTrs.push(tempTriggers[t].trigger);
                  }
                  trnames[self.weekDates[g].substring(0,10)].push(tempTriggers[t].trigger);
                  triggerWeeklycountArray[self.weekDates[g].substring(0,10)][tempTriggers[t].trigger]={count:parseInt(tempTriggers[t].actual),failed:false};
                  if(tempTriggers[t].failed>0){
                    triggerWeeklycountArray[self.weekDates[g].substring(0,10)][tempTriggers[t].trigger]["failed"]=true;
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
              valueObj["color"]=triggerWeeklycountArray[self.weekDates[i].substring(0,10)][totalTrs[j]]["failed"]?"#f0f062":"#42be07";
              valueObj["value"]=triggerWeeklycountArray[self.weekDates[i].substring(0,10)][totalTrs[j]]["count"];
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
            debugger;
            self.triggerHeatMapOptions=triggerHeatMapOptions;
           debugger;
        },
        (error)=>{

        });
      },
       chageCustRelease(relCust){
      if(relCust==="release"){
        this.custOrRelease="release";
        document.querySelector('.selectCust')[0].classList.remove('btn--primary');
        document.querySelector('.selectCust')[0].classList.add('btn--secondary');

        document.querySelector('.selectRel')[0].classList.remove('btn--secondary');
        document.querySelector('.selectRel')[0].classList.add('btn--primary');
      }
      else if(relCust==="customer"){
        this.custOrRelease="customer";
        document.querySelector('.selectRel')[0].classList.remove('btn--primary');
        document.querySelector('.selectRel')[0].classList.add('btn--secondary');

        document.querySelector('.selectCust')[0].classList.remove('btn--secondary');
        document.querySelector('.selectCust')[0].classList.add('btn--primary');
      }
    },
   
    
  }
}
</script>
<template>
<div>
 <div
        class="modal__header"
        style="display:flex; justify-content:space-between; margin-bottom:5px;"
      >
        <div class="modal_title">Trigger Matrix - {{displayName}}</div>
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
          v-on:click="closeTriggerMatrixModal()"
        ></span>
        </span>
</div>
  <div class="modal__body" style="display:flex; justify-content:center;">
  <div class="triggerMatrixWrapper">
  <!--<div class="custReleaseWrapper">
     <div class="custReleaseBtns row" style="width:100%;float:right;flex-direction: row-reverse;margin-bottom: 33px;">
         <button class="btn btn--primary selectCust" style="margin-right:3px;" @click="chageCustRelease('customer')">Customer</button>
         <button class="btn btn--secondary selectRel" style="margin-right:3px;" @click="chageCustRelease('release')">Release</button>
      </div>
  </div>-->
  <div class="triggermatrixplatforms">
  <div class="tm_btn-container" style="width: 100%;">
    <template v-for="(platform,indexP) in triggerPlatforms">
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
  <div class="allTriggerMatrix row">
   <div class="tGradeMatrixTable" style="width:100%">
      <table id="tMatrixTable" class="table table--highlight secondaryTable" style="width:100%">
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
      <template v-for="(tObj,index) in triggerMatrixTotalData[selectedPlatform]">
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
      <chart  disbleExport=false  v-on:child="onChildInteraction" id="heatChart3" :option="triggerHeatMapOptions"></Chart>
   </div>
  </div>
   <div class="weeklyTriggerMatrix">
    <div class="createTriggerButtonDiv">
      <div class="tm_btn-container" style="width: 100%;">
          <button
           v-if="!showCreateTrigger && !bulkEditFlag"
            class="btn btn--primary tmBtn"
            @click="createTrigger()"
            style="font-size:1.4rem;"
          >
            <i class="icon icon-plus"> </i>
          </button>
           <button
           v-if="!showCreateTrigger && !bulkEditFlag"
            class="btn btn--primary tmBtn"
            @click="bulkEditTrigger()"
            style="font-size:1.4rem;"
          >
            <i class="icon icon-edit"> </i>
          </button>
           <button
            v-if="showCreateTrigger && !bulkEditFlag"
            class="btn btn--primary tmBtn"
            @click="saveCreateTrigger()"
            style="font-size:1.4rem;"
          >
            <i class="icon icon-save"> </i>
          </button>
           <button
            v-if="bulkEditFlag && !showCreateTrigger"
            class="btn btn--primary tmBtn"
            @click="saveBulkTrigger()"
            style="font-size:1.4rem;"
          >
            <i class="icon icon-save"> </i>
          </button>
          <button
            v-if="bulkEditFlag && !showCreateTrigger"
            class="btn btn--secondary tmBtn"
            @click="cancelBulkEditTrigger()"
            style="font-size:1.4rem;"
          >
            <i class="icon icon-close"> </i>
          </button>
          <button
            v-if="showCreateTrigger && !bulkEditFlag"
            class="btn btn--secondary tmBtn"
            @click="cancelCreateTrigger()"
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
      <th class="uTableTh" style="width:13%">Trigger
      </th>
      <th class="uTableTh" style="width:8%">Platform
      </th>
      <th class="uTableTh" style="width:10%">PID
      </th>
      <th class="uTableTh" style="width:8%">Image
      </th>
      <th class="uTableTh" style="width:8%">Planned
      </th>
      <th class="uTableTh" style="width:8%">Actual
      </th>
      <th class="uTableTh" style="width:8%">Pass
      </th>
      <th class="uTableTh" style="width:8%">Fail
      </th>
      <th class="uTableTh" style="width:30%">Defects
      </th>
      </tr>
      <tr v-if="showCreateTrigger" class="editTr">
        <td style="width:13%"> <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="triggerObj.trigger">
      </td>
      <td style="width:8%"> <input  list="platforms" style="width: 100%;height:100%"  type="text" class="weeklyTableText" v-model="triggerObj.platform">
      <datalist id="platforms">
       <template v-for="(pl,ip) in platforms">
       <option :key="'key_'+ip" :value="pl">{{pl}}</option>
       </template>
      </datalist>
       </td>
      <td style="width:10%"> <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="triggerObj.pid">
      </td>
      <td style="width:8%"> <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="triggerObj.img">
      </td>
      <td style="width:8%"> <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="triggerObj.planned">
      </td>
      <td style="width:8%"> <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="triggerObj.actual">
      </td>
       <td style="width:8%"> <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="triggerObj.passed" >
      </td>
       <td style="width:8%"> <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="triggerObj.failed" >
      </td>
       <td style="width:30%"> <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="triggerObj.defects">
      </td>
      </tr>
      <template v-if="!bulkEditFlag">
     <template v-for="(tObj,index) in triggerMatrixData[selectedDate]">
       <tr :key="'XYZ_'+index" @contextmenu="openTrMenu(tObj)" @click="rowSelect(tObj, $event)" class="triggerTr">
      <td>{{tObj.trigger}}
      </td>
     
      <td>{{tObj.platform}}
      </td>
      <td >{{tObj.pid}}
      </td>
      <td >{{tObj.img}}
      </td>
      <td >{{tObj.planned}}
      </td>
      
      <td>{{tObj.actual}}
      </td>
      
      <td >{{tObj.passed}}
      </td>
      
      <td >{{tObj.failed}}
      </td>
      
      <td >{{tObj.defects}}
      </td>
       
      </tr>
      </template>
      </template>
      <template v-if="bulkEditFlag">
      <template v-for="(tObj,index) in tempSavedData">
         <tr :key="'XYZ_'+index" class="triggerTr">
       <td> <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="tObj.trigger">
      </td>
       <td><input  list="platforms" style="width: 100%;height:100%"  type="text" class="weeklyTableText" v-model="tObj.platform">
      <datalist id="platforms">
       <template v-for="(pl,ip) in platforms">
       <option :key="'key_'+ip" :value="pl">{{pl}}</option>
       </template>
      </datalist>
      </td>
      <td > <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="tObj.pid">
      </td>
      <td > <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="tObj.img">
      </td>
      <td ><input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="tObj.planned">
      </td>
      <td ><input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="tObj.actual">
      </td>
      <td ><input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="tObj.passed" >
      </td>
       <td > <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="tObj.failed" >
      </td>
      <td > <input  style="width: 100%;height:100%" type="text" class="weeklyTableText" v-model="tObj.defects">
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
