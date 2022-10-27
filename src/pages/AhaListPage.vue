<script>
import { testcaseService } from "@/core/services/testcaseService";
import ContextMenu from "../components/global/ContextMenu/ContextMenu";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment-timezone";
import ContextMenuItem from "../components/global/ContextMenu/ContextMenuItem";
export default {
  name: "AhaListPage",
  props: [
    "displayName",
    "weeklyReportFlag",
    "releaseId",
    "releases",
    "customerName",
    "folderName",
    "showExtraPage",
  ],
  mounted() {
    this.loadAhaList();
  },
  components: {
    ContextMenu,
    ContextMenuItem,
    DatePicker,
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
      format: "YYYY-MM-DDTHH:mm:ss",
      custSelectedReleasesForAHA: [],
      editingAha: false,
      showAHASummary: false,
      selectedAHARows: [],
      selectedAHAList: [],
      showAhaTable: false,
      ahaList: [],
      ahaTableColumns: [],
      ahaImageUploaded: false,
    };
  },
  methods: {
    editAhatableRow() {
      this.editingAha = true;
    },
    addDateRack(e) {},
    maximizeModal() {
      this.emitToParent("maximize");
    },
    minimizeModal() {
      this.emitToParent("minimize");
    },
    onAhaFileChangeFunc(e) {
      const file = e.target.files[0];
      this.ahaListFile = file;
      let fileName = file.name.split(".")[0];
      this.ahaImageUploaded = true;
    },
    cancleUpdateAhaTableRow() {
      this.editingAha = false;
    },
    updateAhaTableRow() {
      let self = this;
      let obj = {
        selectedProjectsForChange: [
          ...new Set(this.custSelectedReleasesForAHA),
        ],
        ahaList: this.ahaList,
      };
      testcaseService.updateAhaReportByReleaseId(obj, self.selectedRelId).then(
        (data) => {
          self.editingAha = false;
          self.showAhaTable = false;
          self.loadAhaList();
        },
        (error) => {
          self.loading = false;
          self.loadingMessage = "";
          self.showErrorModal = true;
          self.modalErrorMessage =
            "Error while updating Weekly Report, Please try again later";
        }
      );
    },
    deleteAhafeature() {
      this.$refs.ahamenu.close();
      this.loading = true;
      let self = this;
      this.loadingMessage = "Deleting Features..";
      for (let i = 0; i < this.selectedAHARows.length; i++) {
        let aid = this.selectedAHARows[i];
        testcaseService.deleteAhafeature(aid).then(
          (data) => {
            self.loadAhaList();
          },
          (error) => {
            this.loading = false;
            this.loadingMessage = "";
            this.showErrorModal = true;
            this.modalErrorMessage =
              "Error while deleting Testcase, Please try again later";
          }
        );
      }
      this.loading = false;
      this.loadingMessage = "";
      this.loadTestCaseList();
    },
    openAhaMenu: function(id) {
      if (
        this.selectedAHARows.length &&
        this.selectedAHARows.indexOf(id) >= 0
      ) {
        this.$refs.ahamenu.open(event, id);
      } else {
        this.selectedRows = [];
        this.selectedTestcases = [];
        this.removeSelection();
      }
      event.preventDefault();
    },

    ahaRowSelect(ahaObj, event) {
      if (event.currentTarget.classList.contains("selectedAHARows")) {
        event.currentTarget.classList.remove("selectedAHARows");
        for (let i = 0; i < this.selectedAHARows.length; i++) {
          if (this.selectedAHARows[i] === ahaObj.id) {
            this.selectedAHARows.splice(i, 1);
            this.selectedAHAList.splice(i, 1);
          }
        }
      } else {
        event.currentTarget.classList.add("selectedAHARows");
        this.selectedAHARows.push(ahaObj.id);
        this.selectedAHAList.push(ahaObj);
      }
      this.selectedAHARows = [...new Set(this.selectedAHARows)];
    },
    closeAhaListModal() {
      this.emitToParent("closeAhaListModal");
    },
    handleAhaFileUpload(e) {
      var form_data = new FormData();
      if (this.ahaImageUploaded) {
        form_data.append("file", this.ahaListFile);
      }
      this.loading = true;
      this.loadingMessage = "Uploading AHA List..";
      let self = this;
      testcaseService.uploadAHAList(form_data, this.releaseId).then(
        (data) => {
          self.loadAhaList();
        },
        (error) => {
          this.loading = false;
          this.loadingMessage = "";
          this.showErrorModal = true;
          this.modalErrorMessage =
            "Error while uploading AHA file, Please try again later";
        }
      );
    },
    loadAhaList() {
      let self = this;
      let type = "release",
        id = "";
      if (self.weeklyReportFlag === "relId") {
        type = "release";
        id = this.releaseId;
      } else if (self.weeklyReportFlag === "customerName") {
        type = "customer";
        id = this.folderName + "," + this.customerName;
      }
      this.loading = false;
      this.loadingMessage = "Loading AHA feature list";
      testcaseService.loadAHAList(type, id).then(
        (data) => {
          self.loading = false;
          self.loadingMessage = "";
          if (data.length > 0) {
            self.ahaList = [...data];
            for (let k = 0; k < self.ahaList.length; k++) {
              if (self.ahaList[k].enablement_ETA) {
                if (new Date(self.ahaList[k].enablement_ETA) < new Date()) {
                  if (
                    self.ahaList[k].enablement_status &&
                    self.ahaList[k].enablement_status.toLowerCase() ===
                      "completed"
                  ) {
                    self.ahaList[k]["enablement_status_color"] = "greenText";
                  } else if (
                    self.ahaList[k].enablement_status &&
                    self.ahaList[k].enablement_status.toLowerCase() ===
                      "inprogress"
                  ) {
                    self.ahaList[k]["enablement_status_color"] = "redText";
                  } else if (
                    self.ahaList[k].enablement_status &&
                    self.ahaList[k].enablement_status.toLowerCase() ===
                      "pending"
                  ) {
                    self.ahaList[k]["enablement_status_color"] = "redText";
                  }
                } else {
                  if (
                    self.ahaList[k].enablement_status &&
                    self.ahaList[k].enablement_status.toLowerCase() ===
                      "completed"
                  ) {
                    self.ahaList[k]["enablement_status_color"] = "greenText";
                  } else if (
                    self.ahaList[k].enablement_status &&
                    self.ahaList[k].enablement_status.toLowerCase() ===
                      "inprogress"
                  ) {
                    self.ahaList[k]["enablement_status_color"] = "skyBlueText";
                  } else if (
                    self.ahaList[k].enablement_status &&
                    self.ahaList[k].enablement_status.toLowerCase() ===
                      "pending"
                  ) {
                    self.ahaList[k]["enablement_status_color"] = "redText";
                  }
                }
              } else {
                self.ahaList[k]["enablement_status_color"] = "skyBlueText";
              }

              if (
                self.ahaList[k].feature_relatedTCs === "" ||
                self.ahaList[k].feature_relatedTCs === null ||
                self.ahaList[k].feature_relatedTCs === undefined
              ) {
                self.ahaList[k]["noRelatedTcsFlag"] = "yellowHighlight";
              } else {
                self.ahaList[k]["noRelatedTcsFlag"] = "noHighlight";
              }
            }

            self.ahaTableColumns = Object.keys(data[0]);
            self.showAhaTable = true;
          } else {
            self.ahaList = [];
            self.ahaTableColumns = [];
            self.showAhaTable = false;
          }
        },
        (error) => {
          self.loading = false;
          self.loadingMessage = "";
          self.showErrorModal = true;
          self.modalErrorMessage = "Error while loading AHA List";
        }
      );
      self.applyChangeFuncForAHA();
    },
    applyChangeFuncForAHA() {
      debugger;
      let arr = [];
      for (let k = 0; k < this.releases.length; k++) {
        if (
          this.releases[k].customerName === this.customerName &&
          this.releases[k].folder_name === this.folderName
        ) {
          arr.push({ id: this.releases[k].id, name: this.releases[k].name });
          if (this.weeklyReportFlag === "customerName") {
            this.custSelectedReleasesForAHA.push(
              this.releases[k].id.toString()
            );
          }
        }
      }
      this.custTotalReleases = { ...arr };
      if (this.weeklyReportFlag != "customerName") {
        this.custSelectedReleasesForAHA.push(this.releaseId.toString());
      }
    },
    checkAhaList() {
      if (this.ahaList.length > 0) {
        return false;
      } else {
        return true;
      }
    },
    emitToParent(value, payload) {
      this.$emit("child", value, payload);
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
      <div class="modal_title">AHA Features - {{ displayName }}</div>
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
          v-on:click="closeAhaListModal()"
        ></span>
      </span>
    </div>
    <div class="modal__body" style="display:flex; justify-content:center;">
      <div>
        <div class="ahaListFileUpload" v-show="!showAhaTable">
          <input type="file" class="aha_file" @change="onAhaFileChangeFunc" />
          <button
            @click="handleAhaFileUpload($event)"
            class="tmBtn btn btn--secondary aha_file_btn"
            style="font-size:1.4rem;"
            v-if="ahaImageUploaded"
          >
            Upload
          </button>
        </div>
        <div class="" v-show="showAhaTable">
          <div class="ahaheaderWrapper" style="diaply:flex">
            <div
              v-if="editingAha"
              class="form-group tm-form-group1 row"
              style="width:75%"
            >
              <div
                class="projectDateField applyChangesField"
                style="position:relative;"
              >
                <label class="cm-label" style="width:100%">
                  Apply changes to
                </label>
              </div>
              <div class="radioTypesWrapper">
                <template v-for="(rel, ih) in custTotalReleases">
                  <div class="chkRel" :key="ih">
                    <input
                      type="checkbox"
                      v-model="custSelectedReleasesForAHA"
                      :value="rel.id"
                      class="form-check-input tchk"
                    />
                    <label class="form-check-label">{{ rel.name }}</label>
                  </div>
                </template>
              </div>
            </div>

            <div class="ahaButtonContainer">
              <button
                class="btn btn--primary tableGrphBtn"
                v-if="editingAha"
                @click="updateAhaTableRow()"
              >
                <span class="icon-save icon-small clickable tableIcons"></span>
              </button>
              <button
                class="btn btn--primary tableGrphBtn"
                v-if="editingAha"
                @click="cancleUpdateAhaTableRow()"
              >
                <span class="icon-close icon-small clickable tableIcons"></span>
              </button>
              <button
                class="btn btn--primary tableGrphBtn"
                v-if="!editingAha"
                @click="editAhatableRow"
              >
                <span class="icon-edit icon-small clickable tableIcons"></span>
              </button>
            </div>
          </div>
          <div class="ahaTable">
            <div id="noRelatedContent">
              No Related Testcases
            </div>
            <table id="ahaTable" class="table table--highlight secondaryTable">
              <tr>
                <th class="stickyTh ahaTableTh">Feature</th>
                <th class="stickyTh ahaTableTh">Aha ID</th>
                <th class="stickyTh ahaTableTh" style="width:15%">Name</th>
                <th class="stickyTh ahaTableTh">Dev Mgr</th>
                <th class="stickyTh ahaTableTh">Test Mgr</th>
                <!--th class="stickyTh ahaTableTh">PIPD</th-->
                <th class="stickyTh ahaTableTh">SWFS</th>
                <th class="stickyTh ahaTableTh">Platforms</th>
                <!--th class="stickyTh ahaTableTh" colspan="3">Enablement</th-->
                <th class="stickyTh ahaTableTh">Enablement Date</th>
                <th class="stickyTh ahaTableTh">Owner</th>
                <th class="stickyTh ahaTableTh">Status</th>
                <th class="stickyTh ahaTableTh">Comments</th>
              </tr>
              <template class="cdetsTr" v-for="(aObj, index) in ahaList">
                <tr
                  v-if="!editingAha"
                  :key="index"
                  style="cursor: pointer;"
                  @contextmenu="openAhaMenu(aObj.id)"
                  @click="ahaRowSelect(aObj, $event)"
                >
                  <td class="ahaTableTd">
                    <span
                      :class="aObj.noRelatedTcsFlag"
                      v-tooltip.right="{
                        html: 'noRelatedContent',
                        class: 'cisco-tooltip',
                      }"
                      >{{ aObj.featureId }}</span
                    >
                  </td>
                  <td class="ahaTableTd">{{ aObj.ahaId }}</td>
                  <td class="ahaTableTd" style="width:15%">{{ aObj.name }}</td>
                  <td class="ahaTableTd">{{ aObj.poc_dev_manager }}</td>
                  <td class="ahaTableTd">{{ aObj.poc_test_manager }}</td>
                  <!--td class="ahaTableTd">{{aObj.pipd}}</td-->
                  <td class="ahaTableTd">{{ aObj.swfs }}</td>
                  <td class="ahaTableTd">{{ aObj.platforms_need }}</td>
                  <td class="ahaTableTd">{{ aObj.enablement_date }}</td>
                  <td class="ahaTableTd">{{ aObj.enablement_owner }}</td>
                  <td :class="'ahaTableTd ' + aObj.enablement_status_color">
                    {{ aObj.enablement_status }}
                  </td>
                  <td class="ahaTableTd">{{ aObj.comments }}</td>
                </tr>
                <tr v-if="editingAha" :key="index + 'a'">
                  <td>
                    <input
                      type="text"
                      class="weeklyTableText"
                      v-model="aObj.featureId"
                      readonly="true"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="weeklyTableText"
                      v-model="aObj.ahaId"
                      readonly="true"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="weeklyTableText"
                      v-model="aObj.name"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="weeklyTableText"
                      v-model="aObj.poc_dev_manager"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="weeklyTableText"
                      v-model="aObj.poc_test_manager"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="weeklyTableText"
                      v-model="aObj.pipd"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="weeklyTableText"
                      v-model="aObj.swfs"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="weeklyTableText"
                      v-model="aObj.platforms_need"
                    />
                  </td>
                  <td>
                    <date-picker
                      v-model="aObj.enablement_date"
                      @change="addDateRack"
                      :format="format"
                      value-type="format"
                      :lang="lang"
                      style="width: 100%;"
                    ></date-picker>
                  </td>
                  <td>
                    <input
                      type="text"
                      class="weeklyTableText"
                      v-model="aObj.enablement_owner"
                    />
                  </td>
                  <td>
                    <select
                      v-model="aObj.enablement_status"
                      class="weeklyTableText"
                    >
                      <option value="pending">pending</option>
                      <option value="blocked">blocked</option>
                      <option value="dropped">dropped</option>
                      <option value="inprogress">inprogress</option>
                      <option value="completed">completed</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      class="weeklyTableText"
                      v-model="aObj.comments"
                    />
                  </td>
                </tr>
              </template>
            </table>
          </div>
        </div>
      </div>
      <ContextMenu ref="ahamenu" class="fmenu">
        <template slot-scope="{ contextData }">
          <ContextMenuItem @click.native="deleteAhafeature(contextData)">
            Delete
          </ContextMenuItem>
        </template>
      </ContextMenu>
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
