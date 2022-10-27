<script>
 import Vue from "vue";

export default {
    name: "ReleaseNoteWeeklyReport",
    props: ["weeklyReport"],
     data() {
    return {
     weekData:[],
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
      loadReleaseNoteTable(){
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
          this.weekData={...arr};
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
        <div class="modal_title">Release Note</div>
        <span
          class="icon-close icon-small interaction"
          v-on:click="closeRelModal()"
        ></span>
</div>
   <div class="modal__body" style="display:flex; justify-content:center;">
    <div class="execSummaryTable">
    <div class="row relWeeks">
     <template v-for="(wObj,index) in weekData">
      <a href="#" @click="weekChange" :key="index">{{wObj.weekDates}}</a>
     </template>
    </div>
     <div class="releaseNoteForWeek">
     </div>
    </div>
   </div>
</div>
</template>