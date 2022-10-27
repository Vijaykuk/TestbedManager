<template>
<div>
<div
        class="modal__header"
        style="display:flex; justify-content:space-between; margin-bottom:5px;"
      >
        <div class="modal_title">Execution Summary</div>
        <span
          class="icon-close icon-small interaction"
          v-on:click="closeExecSummaryModal()"
        ></span>
</div>
         <div class="modal__body" style="display:flex; justify-content:center;">
          <div class="execSummaryTable">
                <table id="execTable" class="table table--highlight secondaryTable">
                 <tr>
                    <th class="uTableTh">Week</th>
                    <th class="uTableTh">Date</th>
                    <th class="uTableTh">Image</th>
                    <th class="uTableTh">Planned</th>
                    <th class="uTableTh">Executed</th>
                    <th class="uTableTh">Pass</th>
                    <th class="uTableTh">Fail</th>
                    <th class="uTableTh">Quality</th>
              <th class="uTableTh">Projected Quality</th>
              <th class="uTableTh">Pending Enablement</th>
              <th class="uTableTh">CVT Raised</th>
               <th class="uTableTh">Total</th>
                <th class="uTableTh">Open MH</th>
               </tr>
               <template v-for="(tObj,ik) in tableArray">
               <tr :key='ik'>
                 <td class="uTableTd">{{tObj.weekNumber}}</td>
                  <td class="uTableTd">{{tObj.weekDates}}</td>
                   <td class="uTableTd">{{tObj.image}}</td>
                    <td class="uTableTd">{{tObj.planned}}</td>
                    <td class="uTableTd">{{tObj.executed}}</td>
                     <td class="uTableTd">{{tObj.passed}}</td>
                      <td class="uTableTd">{{tObj.failed}}</td>
                       <td class="uTableTd">{{tObj.quality}}</td>
                        <td class="uTableTd">{{tObj.projectedQuality}}</td>
                         <td class="uTableTd">{{tObj.pendingEnablement}}</td>
                          <td class="uTableTd">{{tObj.cvtFound}}</td>
                           <td class="uTableTd">{{tObj.cvtTotal}}</td>
                           <td class="uTableTd">{{tObj.mhHave}}</td>
               </tr>

               </template>
               <tr><td class="uTableTd" style="text-align:center" colspan="2">Summary</td><td class="uTableTd" colspan="11"></td></tr>
               <tr><td class="uTableTd" style="text-align:center" colspan="2">Top Issues</td>
               <td colspan="11" class="uTableTd">
               <div class="issuesTable">
               <table id="issuesTable">
               <tr>
               <th class="uTableTh issuesTh">DDTS</th>
               <th class="uTableTh issuesTh">Headline</th>
               <th class="uTableTh issuesTh">Component</th>
               <th class="uTableTh issuesTh">TC Failures</th>
                <th class="uTableTh issuesTh">TC Blokers</th>
               </tr>
               <template v-for="(cObj,ic) in mainCdets">
               <tr :key="ic">
                    <td class="uTableTd">{{cObj.defect_id}}</td>
                    <td class="uTableTd">{{cObj.headline}}</td>
                   <td class="uTableTd">{{cObj.component}}</td>
                    <td class="uTableTd">{{cObj.tcCount}}</td>
                    <td class="uTableTd">{{cObj.tcCount}}</td>
               </tr>
               </template>
               </table>
               </div>
               </td></tr>
               <tr><td class="uTableTd" style="text-align:center" colspan="2">Customers</td><td class="uTableTd" colspan="11">EFT-</td></tr>
              </table>
              <table id="execRelTable" class="table table--highlight secondaryTable">
                <tr>
                <th class="rTableTh ">Folders</th>
                 <th class="rTableTh "> <span class="dot pendingDot"></span>Pending</th>
                  <th class="rTableTh "> <span class="dot blockedDot"></span>Blocked</th>
                   <th class="rTableTh "> <span class="dot passedDot"></span>Passed</th>
                    <th class="rTableTh "> <span class="dot passedxDot"></span>Passed w/x</th>
                     <th class="rTableTh "> <span class="dot failedDot"></span>Failed</th>
                      <th class="rTableTh "> <span class="dot droppedDot"></span>Dropped</th>
                       <th class="rTableTh ">Total</th>
             </tr>
             <tr>
              <th class="rTableTh projectTh"><span class="foldericon"><i class="icon icon-folder"></i></span><span class="projName">{{execrelName}}</span></th>
                 <td class="rTableTd ">0 (0.0 %)</td>
                  <td class="rTableTd ">0 (0.0 %)</td>
                   <td class="rTableTd ">0 (0.0 %)</td>
                    <td class="rTableTd "> 0 (0.0 %)</td>
                     <td class="rTableTd ">0 (0.0 %)</td>
                      <td class="rTableTd ">0 (0.0 %)</td>
                      <td class="rTableTd ">0 (0.0 %)</td>
             </tr>
             <template v-for="(pobj,ip) in execProjects">
                <tr :key="ip">
              <th class="rTableTh projectTd"><span class="projectFolder"></span><span class="foldericon"><i class="icon icon-folder"></i></span><span class="projName">{{pobj.name}}</span></th>
                 <td class="rTableTd ">0 (0.0 %)</td>
                  <td class="rTableTd ">0 (0.0 %)</td>
                   <td class="rTableTd ">0 (0.0 %)</td>
                    <td class="rTableTd "> 0 (0.0 %)</td>
                     <td class="rTableTd ">0 (0.0 %)</td>
                      <td class="rTableTd ">0 (0.0 %)</td>
                      <td class="rTableTd ">0 (0.0 %)</td>
             </tr>
             </template>
              </table>
          </div>
         </div>
      </div>
</template>
<script>
 import Vue from "vue";

export default {
    name: "ExecSummaryPage",
    props: ["weeklyReport","mainCdets","","execrelName","execProjects"],
     data() {
    return {
     tableArray:[],
    };
  },
  mounted() {
      this.loadExecTable();
  },
  methods: {
      emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
      closeExecSummaryModal(){
        this.emitToParent("closeExecSummaryTable");
      },
      loadExecTable(){
        let data=JSON.parse(JSON.stringify(this.weeklyReport));
        let arr=[],categoryObj={};
        for(let i=0;i<data.length;i++){
              categoryObj={};
               categoryObj["weekNumber"]=i+1;
               categoryObj["weekDates"]=data[i].start_date.substring(0,10);
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
          this.tableArray={...arr};
        },
}
}
</script>