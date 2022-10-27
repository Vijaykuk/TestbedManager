<script>
export default {
     name: "TriggerMatrixTable",
     data() {
    return {
     triggerMatrixData:[
        {
            "Trigger":"Router reload",
            "Planned":"500",
            "NCS5500":"400",
            "ASR9K":"250",
            "Defects":"CSCvv50960, CSCvu81094, CSCvu71320"
        },
        {
            "Trigger":"LC reload",
            "Planned":"500",
            "NCS5500":"400",
            "ASR9K":"300",
            "Defects":"CSCvu45534, CSCvu63880, CSCvu72060, CSCvu93964"
        },
        {
            "Trigger":"VM reload",
            "Planned":"100",
            "NCS5500":"100",
            "ASR9K":"60",
            "Defects":"CSCvt47254"
        },
        {
            "Trigger":"Bundle member flap",
            "Planned":"1000",
            "NCS5500":"1000",
            "ASR9K":"1000",
            "Defects":"CSCvt06530,CSCvu83336,CSCvv28505,CSCvb11748"
        },
        {
            "Trigger":"Commit replace",
            "Planned":"1000",
            "NCS5500":"300",
            "ASR9K":"600",
            "Defects":"CSCvu76097,CSCvu92358,CSCvu94905,CSCvu99139,CSCvv08970,CSCvv11492,CSCvv13983"
        }],
    };
  },
  mounted() {
     
  },
  methods: {
       emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
      closeTriggerMatrixModal(){
        this.emitToParent("closeTriggerMatrixModal");
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
        <div class="modal_title">Trigger Matrix</div>
        <span
          class="icon-close icon-small interaction"
          v-on:click="closeTriggerMatrixModal()"
        ></span>
</div>
  <div class="modal__body" style="display:flex; justify-content:center;">
   <div class="tGradeMatrixTable">
      <table id="tMatrixTable" class="table table--highlight secondaryTable">
      <tr>
      <th>Trigger
      </th>
      <th>Planned
      </th>
      <th>NCS5500
      </th>
      <th>ASR9K
      </th>
      <th>Defects
      </th>
      </tr>
      <template v-for="(tObj,index) in triggerMatrixData">
       <tr :key="index">
      <th>{{tObj.Trigger}}
      </th>
      <th>{{tObj.Planned}}
      </th>
      <th>{{tObj.NCS5500}}
      </th>
      <th>{{tObj.ASR9K}}
      </th>
      <th>{{tObj.Defects}}
      </th>
      </tr>
      </template>
      </table>
   </div>
  </div>
</div>
    
</template>
