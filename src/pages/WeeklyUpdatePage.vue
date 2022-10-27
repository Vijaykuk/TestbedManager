<script>
import { VueEditor } from "vue2-editor";
import { testcaseService } from "@/core/services/testcaseService";
export default {
  name: "WeeklyUpdatePage",
  props: [
    "displayName",
    "weeklyReportFlag",
    "releaseId",
    "customerName",
    "folderName",
    "weeklyReport",
    "custTotalReleases",
    "custSelectedReleases",
    "showExtraPage",
  ],
  mounted() {
    this.tempCustSelectedReleases = this.custSelectedReleases;
    if (this.weeklyReport.length > 0) {
      for (let k = 0; k < Object.keys(this.weeklyReport).length; k++) {
        this.weeklyReport[Object.keys(this.weeklyReport)[k]][
          "highlights"
        ] = this.weeklyReport[Object.keys(this.weeklyReport)[k]]["highlights"]
          ? this.weeklyReport[Object.keys(this.weeklyReport)[k]]["highlights"]
          : "";
        this.weeklyReport[Object.keys(this.weeklyReport)[k]]["lowlights"] = this
          .weeklyReport[Object.keys(this.weeklyReport)[k]]["lowlights"]
          ? this.weeklyReport[Object.keys(this.weeklyReport)[k]]["lowlights"]
          : "";
        this.weeklyReport[Object.keys(this.weeklyReport)[k]][
          "customer_eft"
        ] = this.weeklyReport[Object.keys(this.weeklyReport)[k]]["customer_eft"]
          ? this.weeklyReport[Object.keys(this.weeklyReport)[k]]["customer_eft"]
          : "";
      }
    }
  },
  components: {
    VueEditor,
  },
  data() {
    return {
      weekIndex: 0,
      tempCustSelectedReleases: [],
      selectedHighlights: "",
      selectedLowlights: "",
      selectedCustomerEft: "",
    };
  },
  methods: {
    emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
    checkDate(obj) {
      if (
        new Date(obj.end_date) < new Date() ||
        new Date(obj.start_date) < new Date()
      ) {
        return true;
      } else {
        return false;
      }
    },
    autoResize() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
      debugger;
    },
    closeWeeklyUpdateModal() {
      this.emitToParent("closeWeeklyUpdateModal");
    },
    addActiveClass(ind) {
      if (ind === this.weekIndex) {
        return "activeDate btn btn--primary";
      } else {
        return "otherDate";
      }
    },
    weekChanged(index1) {
      this.weekIndex = index1;
      this.selectedHighlights = this.weeklyReport[index1].highlights;
      this.selectedLowlights = this.weeklyReport[index1].lowlights;
      this.selectedCustomerEft = this.weeklyReport[index1].customer_eft;
    },
    maximizeModal() {
      this.emitToParent("maximize");
    },
    minimizeModal() {
      this.emitToParent("minimize");
    },
    updateSplinetableRow() {
      let self = this;
      let weeklyreport = JSON.parse(JSON.stringify(this.weeklyReport));
      weeklyreport[this.weekIndex].lowlights = this.selectedLowlights;
      weeklyreport[this.weekIndex].highlights = this.selectedHighlights;
      weeklyreport[this.weekIndex].customer_eft = this.selectedCustomerEft;
      weeklyreport["selectedProjectsForChange"] = this.tempCustSelectedReleases;
      for (let i = 0; i < weeklyreport.length; i++) {
        delete weeklyreport[i].cvtTotal;
      }
      if (self.weeklyReportFlag === "relId") {
        self.emitToParent("loading", "Updating weekly report");
        testcaseService
          .updateWeeklyReportByReleaseId(weeklyreport, self.releaseId)
          .then(
            (data) => {
              self.emitToParent("stopLoading");
              self.emitToParent("info", "Updated successfully");
              self.emitToParent("loadWeeklyReport");
            },
            (error) => {
              self.emitToParent("stopLoading");
              self.emitToParent(
                "showError",
                "Error while updating Weekly Report, Please try again later"
              );
            }
          );
      } else if (self.weeklyReportFlag === "customerName") {
        let custname = self.customerName;
        let folderName = self.folderName;
        self.emitToParent("loading", "Updating weekly report");
        testcaseService
          .updateWeeklyReportByCustomer(weeklyreport, folderName, custname)
          .then(
            (data) => {
              self.emitToParent("loadWeeklyReportByCustomerName");
              self.emitToParent("stopLoading");
              self.emitToParent("info", "Updated successfully");
            },
            (error) => {
              self.emitToParent("stopLoading");
              self.emitToParent(
                "showError",
                "Error while updating Weekly Report, Please try again later"
              );
            }
          );
      }
    },
  },
};
</script>
<template>
  <div id="weekly-update-content-wrapper" style="width:100%">
    <div
      class="modal__header"
      style="display:flex; justify-content:space-between; margin-bottom:5px;"
    >
      <div class="modal_title">Weekly Update - {{ displayName }}</div>
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
          v-on:click="closeWeeklyUpdateModal()"
        ></span>
      </span>
    </div>
    <div class="modal__body" style="display:flex; justify-content:center;">
      <div
        class="row defectTablecontainer showRelContainer"
        style="margin-top:-20px;"
      >
        <div class="saveButtonContainer">
          <button class="btn btn--primary" @click="updateSplinetableRow()">
            Save
          </button>
        </div>
        <div class="form-group tm-form-group1 row" style="width:95%">
          <div
            class="projectDateField applyChangesField"
            style="position:relative;"
          >
            <label class="cm-label" style="width:100%">
              Apply changes to
            </label>
            <!-- <div class="radioTypesWrapper">
          <div class="radioTypes" style="padding-left:20px;">
            <input @change="applyChangeFunc" type="radio" name="applyChangesTo" value="customer" v-model="applyChangesTo"><label for="customer" style="padding:10px">Customer</label>
            </div>
             <div class="radioTypes" style="padding-left:20px;">
             <input @change="applyChangeFunc" type="radio" name="applyChangesTo" value="release"  v-model="applyChangesTo"><label for="release" style="padding:10px">Release</label>
             </div>
              <div class="radioTypes" style="padding-left:20px;">
             <input @change="applyChangeFunc" type="radio" name="applyChangesTo" value="project"  v-model="applyChangesTo"><label for="project" style="padding:10px">Project</label>
             </div>
             </div>-->
          </div>
          <div class="radioTypesWrapper">
            <template v-for="(rel, ih) in custTotalReleases">
              <div class="chkRel" :key="ih">
                <input
                  type="checkbox"
                  v-model="tempCustSelectedReleases"
                  :value="rel.id"
                  class="form-check-input tchk"
                />
                <label class="form-check-label">{{ rel.name }}</label>
              </div>
            </template>
          </div>
        </div>
        <div class="row relWeeks" v-if="weeklyReport.length > 0">
          <template v-for="(wObj, index1) in weeklyReport">
            <a
              href="#"
              :class="'relWeekLink ' + addActiveClass(index1)"
              v-if="checkDate(wObj)"
              @click="weekChanged(index1)"
              :key="index1 + 'a'"
              >{{ wObj.end_date.substring(0, 10) }}</a
            >
          </template>
        </div>
        <div class="defectSummaryTitle">Highlights</div>
        <vue-editor
          id="rel_summary"
          class="proceduretextarea rel_summary"
          v-model="selectedHighlights"
          @enter="autoResize"
          @change="autoResize"
          @load="autoResize"
        ></vue-editor>
        <div class="defectSummaryTitle">Lowlights</div>
        <vue-editor
          id="rel_defect_summary"
          class="proceduretextarea rel_summary"
          v-model="selectedLowlights"
          @enter="autoResize"
          @change="autoResize"
          @load="autoResize"
        ></vue-editor>
        <div class="defectSummaryTitle">Customer-Eft</div>
        <vue-editor
          id="rel_defect_summary"
          class="proceduretextarea rel_summary"
          v-model="selectedCustomerEft"
          @enter="autoResize"
          @change="autoResize"
          @load="autoResize"
        ></vue-editor>
      </div>
    </div>
  </div>
</template>
