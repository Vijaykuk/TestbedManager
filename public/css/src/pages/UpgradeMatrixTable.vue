<script>
export default {
     name: "UpgradeMatrixTable",
     data() {
    return {
    upgradeMatrixData:[{"Platform":"NCS-5500","PIDs_Covered":["NCS5501","NCS-55A1-36H-S","NCS5508 :  36x100G, 18H18F"],"releases":[{"releaseId":"712","method":"Install tar","total":3,"pass":3,"fail":0},{"releaseId":"711","method":"Install Replace","total":98,"pass":94,"fail":4}]},{"Platform":"ASR-9K","PIDs_Covered":["ASR9922 : 12x100G, 8x100G","ASR9904 : 12x100G, 8x100G"],"releases":[{"releaseId":"7014","method":"Install tar","total":1,"pass":1,"fail":0},{"releaseId":"731","method":"Install Replace","total":75,"pass":73,"fail":2}]},{"Platform":"NCS-5K","PIDs_Covered":["NCS-5011"],"releases":[{"releaseId":"7225","method":"Install tar","total":2,"pass":2,"fail":0},{"releaseId":"732","method":"Install Replace","total":6,"pass":6,"fail":0}]}]
    }
  },
  mounted() {
     
  },
  methods: {
       emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
      closeUpgardeMatrixModal(){
        this.emitToParent("closeUpgardeMatrixModal");
      },
      getSubArray(arr){
             const ar=arr.filter((item , index)=>{
                             return index > 0; //will return the array from the second value
                      })
                  return ar;
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
        <div class="modal_title">Execution Summary</div>
        <span
          class="icon-close icon-small interaction"
          v-on:click="closeUpgardeMatrixModal()"
        ></span>
</div>
  <div class="modal__body" style="display:flex; justify-content:center;">
   <div class="UpgradeMatrixTable">
        <table id="upMatrixTable" class="table table--highlight secondaryTable">
            <tr>
            <th rowspan="2">
            Platform
            </th>
            <th rowspan="2">
            PIDs Covered
            </th>
            <th rowspan="2">
            From
            </th>
            <th rowspan="2">
            Method
            </th>
            <th colspan="3">
           Test Summary
            </th>
         </tr>
         <tr>
            <th>
            Total
            </th>
            <th>
            Pass
            </th>
            <th>
            Fail
            </th>
         </tr>
         <template v-for="(ubj, index) in upgradeMatrixData">
         <tr :key='index'>
         <td :rowspan="ubj.releases.length">
         {{ubj.Platform}}
         </td>
         <td :rowspan="ubj.releases.length">
         <template v-for="(pobj,it) in ubj.PIDs_Covered">
         <div :key="it+'_ab'">
         {{pobj}}
         </div>
         </template>
         </td>
         <td>
          {{ubj.releases[0].releaseId}}
         </td>
         <td>
          {{ubj.releases[0].method}}
         </td>
         <td>
          {{ubj.releases[0].total}}
         </td>
         <td>
          {{ubj.releases[0].pass}}
         </td>
         <td>
          {{ubj.releases[0].fail}}
         </td>
         </tr>
          <template v-for="(robj,index) in getSubArray(ubj.releases)">
          <tr :key="index+'xyz'">
            <td>
          {{robj.releaseId}}
         </td>
         <td>
          {{robj.method}}
         </td>
         <td>
          {{robj.total}}
         </td>
         <td>
          {{robj.pass}}
         </td>
         <td>
          {{robj.fail}}
         </td>
         </tr>
          </template>
        
         </template>
        </table>
   </div>
  </div>
</div>
    
</template>