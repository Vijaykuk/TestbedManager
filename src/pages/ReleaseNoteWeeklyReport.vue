<script>
 import Vue from "vue";
import { testcaseService } from "@/core/services/testcaseService";
export default {
    name: "ReleaseNoteWeeklyReport",
    props: ["displayName","releaseFlag","releaseId","folderName","customerName","showExtraPage"],
     data() {
    return {
     weekData:[],
     releaseData:"",
    };
  },
  mounted() {
      this.loadReleaseNoteTable();
  },
  methods: {
      emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
      closeRelModal(){
        this.emitToParent("closeRelNoteModal");
      },
          maximizeModal(){
        this.emitToParent('maximize');
      },
      minimizeModal(){
         this.emitToParent('minimize');
      },
      loadReleaseNoteTable(){
        this.releaseData="";

          let self=this;
       if(self.releaseFlag==="release" || self.releaseFlag==="customer"){
       let id=self.releaseId;
       if(self.releaseFlag==="release"){
        id=self.releaseId;
      }
      else if(self.releaseFlag==="customer"){
         id=self.folderName+","+self.customerName;
       }
       
        testcaseService.loadReleaseNoteData(self.releaseFlag,id).then(
          (data) => {
            self.releaseData=data;
          },
          (error)=>{

          });

        /*let data=JSON.parse(JSON.stringify(this.weeklyReport));
        let arr=[],categoryObj={};
        for(let i=0;i<data.length;i++){
              categoryObj={};
               categoryObj["weekNumber"]=i+1;
               categoryObj["weekDates"]=data[i].end_date.substring(0,10);
               categoryObj["planned"]=(data[i].executed+data[i].pending) != 0 ? parseInt((data[i].planned/(data[i].executed+data[i].pending))*100):0;
               categoryObj["executed"]=(data[i].executed+data[i].pending) != 0 ? parseInt((data[i].executed/(data[i].executed+data[i].pending))*100):0;
               categoryObj["passed"]=0;//(data[i].passed) != 0 ? parseInt((data[i].passed/(data[i].executed+data[i].pending))*100):0;
               categoryObj["failed"]=0;//(data[i].failed) != 0 ? parseInt((data[i].failed/(data[i].executed+data[i].pending))*100):0;
               categoryObj["quality"]=((data[i].executed)!=0 && (data[i].executed!=null)) ? parseInt((data[i].passed/data[i].executed)*100) : 0;
               categoryObj["projectedQuality"]=((data[i].executed)!=0 && (data[i].executed!=null)) ? parseInt((data[i].passed/data[i].executed)*100) : 0;
               categoryObj["pendingEnablement"]=0;
               let mhdefects=data[i].must_have_defects!=null?data[i].must_have_defects:0;
               let observed=data[i].defects_observed!=null?data[i].defects_observed:0;
               let found=data[i].defects_found_CVT!=null?data[i].defects_found_CVT:0;
               categoryObj["cvtTotal"]=observed+found;
               categoryObj["cvtFound"]=found;
               categoryObj["cvtObserved"]=observed;
               categoryObj["mhHave"]=mhdefects;
                arr.push(categoryObj);
          }
          this.weekData={...arr};*/
        }
      },
        weekChange(){
        
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
        <div class="modal_title">Release Note - {{displayName}}</div>
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
          v-on:click="closeRelModal()"
        ></span>
        </span>
</div>
   <div class="modal__body" style="display:flex; justify-content:center;">
    <div class="execSummaryTable" style="font-size: 14px;
    font-weight: 600;">
  
<div class="releasenote"  >
  <div>  
  <h4>Table of Contents</h4>
  <ul>
    <li>  Image details</li>
    <li> RevO SMUs</li>
    <li>New Features</li>
    <li>Platform, Roles Validated</li>
    <li>Upgrade Matrix</li>
    <li>Trigger Matrix</li>
    <li>Behavior changes</li>
    <li>Caveats</li>
    <li>FPD versions</li>
  </ul>
  <br>
  <h4>Image details</h4>
  <br>
  <h4>RevO SMUs</h4>
  </div>
  <br>
  

  <!-- New Features -->

  <h4>New Features</h4>
 <table class="table table-bordered" >
  <thead >
    <tr>
      <th scope="col" style="width:50%">Feature</th>
      <th scope="col"> Platforms</th>
    </tr>
  </thead>
  <tbody v-for="(value, key) in releaseData.ahaList" :key="key">
        <tr>
      <td>{{value.name}}</td>
      <td>{{value.platforms_need}}</td>
    </tr>
  </tbody>
</table> 

<!-- platform_roles -->

  <h4>Platform, Roles Validated</h4>
 <table class="table table-bordered" >
  <thead >
    <tr>
      <th scope="col" style="width:50%">Platform</th>
      <th scope="col"> Roles</th>
    </tr>
  </thead>
  <tbody v-for="(value, key) in releaseData.platform_roles" :key="key">
        <tr>
      <td>{{key}}</td>
      <td>{{value}}</td>
    </tr>
  </tbody>
</table> 

<!-- UpgradeMatrix -->
<h4>Behavior changes</h4>
  <br>

<h4>UpgradeMatrix</h4>

    <table class="table table-bordered">
  <thead >
    <tr>
        <th scope="col">PID</th>
        <th scope="col">PlatForm</th>
        <th scope="col">Release From</th>
        <th scope="col">Release To</th>
         <th scope="col">Method</th>
         <th scope="col">Passed</th>
         <th scope="col">Failed</th>
           <th scope="col">Defects</th>
    </tr>
  </thead>
  <tbody v-for="(value,key) in releaseData.UpgradeMatrix" :key="key.id">
        <tr>

          <td>{{value.pid}}</td>
          <td>{{value.platform}}</td>
          <td>{{value.release_from}}</td>
          <td>{{value.release_to}}</td>
           <td>{{value.method}}</td>
           <td>{{value.passed}}</td>
            <td>{{value.failed}}</td>
             <td>{{value.defects}}</td>
      
    </tr>
  </tbody>
  </table> 

  <!-- TriggerMatrix -->
  
  <h4>TriggerMatrix</h4>
    <table class="table table-bordered">
  <thead >
    <tr>
      <th scope="col">PID</th>
      <th scope="col">PlatForm</th>
      <th scope="col">Trigger</th>
       <th scope="col">Planned</th>
      <th scope="col">Actual</th>
      <th scope="col">Total</th>
      <th scope="col">Passed</th>
      <th scope="col">Failed</th>
      <th scope="col">Defects</th>
    </tr>
  </thead>
  <tbody v-for="(value,key) in releaseData.TriggerMatrix" :key="key">
        <tr>
      <td>{{value.pid}}</td>
     <td>{{value.platform}}</td>
      <td>{{value.trigger}}</td>
      <td>{{value.planned}}</td>
      <td>{{value.actual}} </td>  
      <td>{{value.count}}</td>
       <td>{{value.passed}}</td>
      <td>{{value.failed}}</td>
      <td>{{value.defects}}</td>


    </tr>
  </tbody>
  </table> 

  <h4>Caveats</h4>

 <table class="table table-bordered" >
  <thead >
    <tr>
      <th scope="col" style="width:10%">DDTS ID</th>
      <th scope="col" style="width:40%"> Headline</th>
      <th scope="col"> Product</th>
    </tr>
  </thead>
  <tbody v-for="(value, key) in releaseData.cavets" :key="key">
        <tr>
      <td>{{value.defect_id}}</td>
      <td>{{value.headline}}</td>
      <td>{{value.product}}</td>
    </tr>
  </tbody>
</table> 
<h4>FPD Versions</h4>

         </div>
    </div>
   </div>
</div>
</template>

<style scoped>
h4{
  text-align:left;
  color:#0e85ade8 !important;
}
h4:after {
    content:"\a";
    white-space: pre;
}
ul li{
  text-align:left;
  list-style-type: none;
  font-size:1em bold !important;

}
.releasenote{
  padding: 60px;
  /* border: 1px solid black; */
}
th{
  background-color:none !important;
  background:none;
}
</style>


     
    </div>
   </div>
</div>
</template>