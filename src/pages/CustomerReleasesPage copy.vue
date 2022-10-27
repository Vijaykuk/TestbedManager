<script>
import { router } from "@/router";
import { store } from "../store/store";
import { testcaseService } from "@/core/services/testcaseService";
import ContextMenu from "../components/global/ContextMenu/ContextMenu";
import ContextMenuItem from "../components/global/ContextMenu/ContextMenuItem";
import highcharts from "highcharts";
import pie from "./pie";

export default {
  name: "CustomerReleasesPage",
  props: ["customerId"],
  data() {
    return {
      selectedRelease: "",
      releases: [],
      releaseObj: {},
      project_obj: {},
      error: false,
      errorMessage: "",
      loading: false,
      loadingMessage: "",
      modalInfoMessage: "",
      showInfoModal: false,
      showInfoModalClass: "",
      showErrorModal: false,
      modalErrorMessage: "",
      customerName: "",
      showCreateReleaseModal: false,
      showCreateProjectModal: false,
      projects: {},
      featureOption: {},
      pie_option: {
        chart: {
          type: "pie", //pie chart
          options3d: {
            enabled: true, //Use 3d function
            alpha: 45,
            beta: 0,
          },
        },
        title: {
          text: "Test Cases per Platform",
        },
        tooltip: {
          pointFormat: "<b>{point.y}</b>",
        },
        plotoptions: {
          pie: {
            allowpointselect: true, //Can each sector be selected
            cursor: "pointer", //mouse pointer
            depth: 35,
            //The thickness of the pie chart
            datalabels: {
              enabled: true, //Whether to display the linear tip of the pie chart
            },
          },
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            type: "pie",
            name: "Platform",
            data: [],
          },
        ],
      },
      bar_option: {
        chart: {
          type: "column",
          options3d: {
            enabled: true,
            alpha: 5,
            beta: 0,
            depth: 20,
            viewDistance: 25,
          },
        },
        tooltip: {
          pointFormat: "<b>{point.y}</b>",
        },
        title: {
          text: "Testcases Count per Feature",
        },
        plotOptions: {
          column: {
            depth: 25,
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
      },

      pie_option1: {
        chart: {
          type: "pie", //pie chart
          options3d: {
            enabled: true, //Use 3d function
            alpha: 5, //inclination angle along the y-axis
            beta: 0,
          },
        },
        title: {
          text: "Test Cases per Role",
        },
        tooltip: {
          pointFormat: "<b>{point.y}</b>",
        },
        plotoptions: {
          pie: {
            allowpointselect: true, //Can each sector be selected
            cursor: "pointer", //mouse pointer
            depth: 25, //The thickness of the pie chart
            datalabels: {
              enabled: true, //Whether to display the linear tip of the pie chart
            },
          },
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            type: "pie",
            name: "Platform",
            data: [],
          },
        ],
      },
      platformOption: {},
      roleOption: {},
    };
  },
  components: {
    ContextMenu,
    ContextMenuItem,
    pie,
  },
  mounted() {
    this.loadCustomerDetails();
    this.loadReleases();
  },
  computed: {},
  methods: {
    loadCustomerDetails() {
      this.loading = true;
      this.loadingMessage = "Loading Customer details...";
      testcaseService.getCustomerById(this.customerId).then(
        (data) => {
          this.loading = false;
          this.loadingMessage = "";
          this.customerName = data.name;
        },
        (error) => {
          this.loading = false;
          this.loadingMessage = "";
        }
      );
    },
    backButtonClicked() {
      router
        .push({
          name: "CustomerListPage",
        })
        .catch(() => {});
    },
    DeleteReleaseClicked(robj) {
      this.$refs.rmenu.close();
      this.loading = true;
      this.loadingMessage = "Deleting Release..";
      let self = this;
      testcaseService.deleteRelease(robj.rid).then(
        (data) => {
          self.loading = false;
          self.loadingMessage = "";
          self.loadReleases();
        },
        (error) => {
          self.loading = false;
          self.loadingMessage = "";
          self.showErrorModal = true;
          self.modalErrorMessage =
            "Error while deleting Release, Please try again later";
        }
      );
    },
    deleteProjectClicked(pobj) {
      this.$refs.pmenu.close();
      this.loading = true;
      this.loadingMessage = "Deleting project..";
      let self = this;
      testcaseService.deleteProject(pobj.pid).then(
        (data) => {
          self.loading = false;
          self.loadingMessage = "";
          self.loadReleases();
        },
        (error) => {
          self.loading = false;
          self.loadingMessage = "";
          self.showErrorModal = true;
          self.modalErrorMessage =
            "Error while deleting project, Please try again later";
        }
      );
      e.preventDefault();
    },
    loadChartData(testcases, key) {
      let testcasefeatures = [];
      for (let i = 0; i < testcases.length; i++) {
        testcasefeatures.push(testcases[i][key]);
      }
      let testcasefeatures1 = [...new Set(testcasefeatures)];
      let features = [],
        fe1 = [];
      for (let j = 0; j < testcasefeatures1.length; j++) {
        features.push({
          name: testcasefeatures1[j],
          count: 0,
        });
      }
      for (let k = 0; k < testcases.length; k++) {
        for (let l = 0; l < features.length; l++) {
          if (testcases[k][key] === features[l].name) {
            features[l].count += 1;
          }
        }
      }
      let arr = [];
      for (let l = 0; l < features.length; l++) {
        arr = [];
        arr.push(features[l].name);
        arr.push(features[l].count);
        fe1.push(arr);
      }
      return fe1;
    },
    closeInfoModal() {
      this.showInfoModal = false;
      this.showInfoModalClass = "";
      this.modalInfoMessage = "";
    },
    closeErrorModal() {
      this.modalErrorMessage = "";
      this.showErrorModal = false;
    },
    drawChart() {
      let relId = this.selectedRelease.substring(
        this.selectedRelease.lastIndexOf("_") + 1
      );
      let testcases = [];
      let self = this;
      // for (let i = 0; i < projects.length; i++) {
      testcaseService.getTestcaseListByReleaseId(relId).then(
        (data) => {
          this.loading = false;
          this.loadingMessage = "updating charts";
          testcases = data;
          let testcasesFeatureData = this.loadChartData(
            testcases,
            "tc_feature"
          );
          let testcasesPlatformData = this.loadChartData(
            testcases,
            "tc_platform"
          );
          let testcasesRoledata = this.loadChartData(testcases, "tc_role");

          self.bar_option.series[0].data = testcasesFeatureData;
          self.featureOption = self.bar_option;

          self.pie_option.series[0].data = testcasesFeatureData;
          self.platformOption = self.pie_option;

          self.pie_option1.series[0].data = testcasesRoledata;
          self.roleOption = self.pie_option1;
        },
        (error) => {
          self.loading = false;
          self.loadingMessage = "";
          self.showErrorModal = true;
          self.modalErrorMessage =
            "Error while loading Testcases, Please try again later";
        }
      );
      // }
    },
    createProjectClicked(robj) {
      this.$refs.rmenu.close();
      this.project_obj["r_id"] = robj.rid;
      this.project_obj["r_name"] = robj.rname;
      this.project_obj["project_name"] = "";
      this.project_obj["tims_id"] = "";
      this.showCreateProjectModal = true;
    },

    editReleaseClicked(robj) {
      this.$refs.rmenu.close();
      this.showCreateReleaseModal = true;
      this.releaseObj = {
        customer_id: this.customerId,
        name: robj.rname,
        timsId: robj.rtimsid,
        attribute: robj.rattribute,
      };
    },

    createProject() {
      this.loading = true;
      this.showCreateProjectModal = false;
      this.loadingMessage = "Creating project..";
      if (this.project_obj.name != "") {
        let temp_obj = {
          name: this.project_obj.name,
          release_id: this.project_obj.r_id,
          tims_id: this.project_obj.tims_id,
        };
        //  if (temp_obj.tims_id === "") {
        testcaseService.createProject([temp_obj]).then(
          (data) => {
            if (data) {
              this.loading = false;
              this.loadingMessage = "";
              this.loadReleases();
            }
          },
          (error) => {
            this.loading = false;
            this.loadingMessage = "";
            this.showErrorModal = true;
            this.modalErrorMessage =
              "Error while creating Project, Please try again later";
          }
        );
        /*   } else {
          testcaseService.createProjectWithTims([temp_obj]).then(
            (data) => {
              if (data.success) {
                this.loading = false;
                this.loadingMessage = "";
                this.loadReleases();
              }
            },
            (error) => {
              this.loading = false;
              this.loadingMessage = "";
              this.showErrorModal = true;
              this.modalErrorMessage =
                "Error while creating Project, Please try again later";
            }
          );
        }*/
      } else {
        this.loading = false;
        this.loadingMessage = "";
        this.showErrorModal = true;
        this.modalErrorMessage =
          "Error while creating Project, Please try again later";
      }
    },

    loadReleases() {
      this.loading = true;
      this.loadingMessage = "Loading Customer releases...";
      let self = this;
      testcaseService.getReleasesList(this.customerId).then(
        (data) => {
          this.loading = false;
          this.loadingMessage = "";
          this.releases = data;
          let releasesBtnlist = document.querySelector(".releasesBtnlist");
          let releasestemplete = "";
          for (let i = 0; i < data.length; i++) {
            releasestemplete +=
              '<button type="button" class="collapsibleReleases to-right" data-orig="' +
              data[i].tims_id +
              "**" +
              data[i].attribute +
              '" id="release_' +
              data[i].id +
              '"><span style="margin-left:10px">' +
              data[i].name +
              '</span><span class="arrowButton" style="float:right;margin-left:70px;"><i class="icon icon-chevron-right"> </i></span></button>';
          }
          releasesBtnlist.innerHTML = releasestemplete;
          var coll = document.getElementsByClassName("collapsibleReleases");
          for (let j = 0; j < coll.length; j++) {
            coll[j].addEventListener("click", function() {
              this.classList.toggle("activeBtn");
              if (this.classList.value.indexOf("activeBtn") > -1) {
                this.lastElementChild.children[0].classList.remove(
                  "icon-chevron-right"
                );
                this.lastElementChild.children[0].classList.add(
                  "icon-chevron-down"
                );
              } else {
                this.lastElementChild.children[0].classList.add(
                  "icon-chevron-right"
                );
                this.lastElementChild.children[0].classList.remove(
                  "icon-chevron-down"
                );
              }

              var content = this.nextElementSibling;
              if (content.style.display === "block") {
                content.style.display = "none";
              } else {
                content.style.display = "block";
              }
            });
            coll[j].addEventListener("contextmenu", (e) => {
              //temp = e.currentTarget.getAttribute("data-orig").split("**");

              let robj = {
                rid: e.currentTarget.id.substring(
                  e.currentTarget.id.lastIndexOf("_") + 1
                ),
                rname: e.currentTarget.innerText.split("\n")[0],
                rtimsid: "Txh1928012f", //temp[0],
                rattribute: "", //temp[1],
              };
              this.$refs.rmenu.open(e, robj);
              e.preventDefault();
            });
          }
          let self = this;
          for (let k = 0; k < this.releases.length; k++) {
            testcaseService.getProjectListByReleaseId(this.releases[k].id).then(
              (data) => {
                debugger;
                let releaseDivIdName = "release_" + this.releases[k].id;
                let releaseDiv = document.querySelector("#" + releaseDivIdName);
                /* releaseDiv.getElementsByClassName(
                  "release_count"
                )[0].innerText = data.length;*/
                this.projects[
                  this.releases[k].name + "_" + this.releases[k].id
                ] = data;
                if (this.selectedRelease === "") {
                  this.selectedRelease =
                    this.releases[k].name + "_" + this.releases[k].id;
                  this.drawChart();
                }
                let p_template = '<div class="releaseContent">';
                for (let m = 0; m < data.length; m++) {
                  p_template +=
                    '<div class="r_projects" id="' +
                    data[m].name +
                    "_" +
                    data[m].id +
                    '"><i class="icon icon-circle"></i><span class="pname">' +
                    data[m].name +
                    "</span></div>";
                }
                p_template += "</div>";
                releaseDiv.insertAdjacentHTML("afterend", p_template);
                let relId = this.releases[k].id;
                let customerId = parseInt(this.customerId);
                let prs = document.getElementsByClassName("r_projects");
                for (let m = 0; m < prs.length; m++) {
                  prs[m].addEventListener("click", function() {
                    //hardcoded
                    let pr_id = this.id.substring(this.id.lastIndexOf("_") + 1);
                    router
                      .push({
                        name: "testcaseListPage",
                        params: {
                          projectId: pr_id,
                          customerId: customerId,
                          releaseId: relId,
                        },
                      })
                      .catch(() => {});
                  });
                  prs[m].addEventListener("contextmenu", function(e) {
                    //hardcoded
                    debugger;
                    let pr_id = this.id.substring(this.id.lastIndexOf("_") + 1);
                    let pobj = {
                      pid: pr_id,
                    };
                    self.$refs.pmenu.open(e, pobj);
                    e.preventDefault();
                  });
                }
              },
              (error) => {
                this.loading = false;
                this.loadingMessage = "";
              }
            );
          }
        },
        (error) => {
          this.loading = false;
          this.loadingMessage = "";
        }
      );
    },
    createReleaseClicked: function() {
      this.showCreateReleaseModal = true;
      this.releaseObj = { customer_id: this.customerId };
    },
    closeReleaseCustomerModal: function() {
      this.showCreateReleaseModal = false;
      this.releaseObj = {};
    },
    closeProjectReleaseModal: function() {
      this.showCreateProjectModal = false;
      this.project_obj = {};
    },
    createRelease: function(e) {
      this.showCreateReleaseModal = false;
      let releaseName = this.releaseObj.name;
      let releaseNames = [];
      if (this.releases.length > 0) {
        for (let i = 0; i < this.releases.length; i++) {
          releaseNames.push(this.releases[i].name);
        }
      }
      if (
        (releaseNames.length > 0 && releaseNames.indexOf(releaseName) < 0) ||
        releaseNames.length <= 0
      ) {
        this.loading = true;
        this.loadingMessage = "Creating Release..";
        testcaseService.createRelease([this.releaseObj]).then(
          (data) => {
            if (data) {
              this.loading = false;
              this.loadingMessage = "";
              this.closeReleaseCustomerModal();
              this.loadReleases();
            }
          },
          (error) => {
            this.loading = false;
            this.loadingMessage = "";
            this.showErrorModal = true;
            this.modalErrorMessage =
              "Error while creating Release, Please try again later";
          }
        );
      } else {
        this.loading = false;
        this.loadingMessage = "";
        this.showErrorModal = true;
        this.modalErrorMessage = "Duplicate Releases not allowed.";
      }
      setTimeout(function() {
        this.loading = false;
        this.loadingMessage = "";
      }, 100);
      let releasesBtnlist = document.querySelector(".releasesBtnlist");
      let releasestemplete = "";
      releasestemplete +=
        '<button type="button" class="collapsibleReleases loaderRelease to-right"><span style="margin-left:10px">' +
        this.releaseObj.name +
        '</span><span class="loader1" style="float:right;margin-left:70px;"></span></button>';
      releasesBtnlist.innerHTML += releasestemplete;
      e.preventDefault();
    },
  },
};
</script>
<template>
  <div class="customerReleaseDiv">
    <div class="releasesDiv">
      <div class="releasesListDiv">
        <div class="createReleaseBtn">
          <button class="btn btn--primary cm_addBtn" @click="backButtonClicked">
            <span
              v-tooltip.right="{
                html: 'backButtonContent',
                class: 'cisco-tooltip',
              }"
            >
              <i class="icon icon-back"> </i>
            </span>
            <div id="backButtonContent">
              Back
            </div>
          </button>
          <button
            class="btn btn--primary cm_addBtn"
            @click="createReleaseClicked"
          >
            <span
              v-tooltip.right="{
                html: 'viewTopoContent',
                class: 'cisco-tooltip',
              }"
            >
              <i class="icon icon-plus"> </i>
            </span>
            <div id="viewTopoContent">
              Create Release
            </div>
          </button>
        </div>
        <div class="releasesBtnlist"></div>
      </div>
    </div>
    <div class="dashboardDiv">
      <div class="releaseTitle">
        <h1 class="r_title">7.3.1</h1>
        <div class="row r_dashboard">
          <div class="r_chartDiv">
            <pie id="chart1" :option="featureOption"></pie>
          </div>
          <div class="r_chartDiv">
            <pie id="chart2" :option="platformOption"></pie>
          </div>
          <div class="r_chartDiv">
            <pie id="chart3" :option="roleOption"></pie>
          </div>
        </div>
        <div class="row">
          <div class="r_chartDiv">
            <pie id="chart4" :option="platformOption"></pie>
          </div>
          <div class="r_chartDiv">
            <pie id="chart5" :option="platformOption"></pie>
          </div>
          <div class="r_chartDiv">
            <pie id="chart6" :option="platformOption"></pie>
          </div>
        </div>
      </div>
    </div>
    <div class="context_modals">
      <ContextMenu ref="rmenu" class="rmenu">
        <template slot-scope="{ contextData }">
          <ContextMenuItem @click.native="createProjectClicked(contextData)">
            Create Project
          </ContextMenuItem>
          <ContextMenuItem @click.native="editReleaseClicked(contextData)">
            Edit Release
          </ContextMenuItem>
          <ContextMenuItem @click.native="DeleteReleaseClicked(contextData)">
            Delete Release
          </ContextMenuItem>
        </template>
      </ContextMenu>
      <ContextMenu ref="pmenu" class="pmenu">
        <template slot-scope="{ contextData }">
          <ContextMenuItem @click.native="deleteProjectClicked(contextData)">
            Delete Project
          </ContextMenuItem>
        </template>
      </ContextMenu>
    </div>
    <div v-if="showCreateReleaseModal" class="createCustomerModal">
      <div
        class="modal__header"
        style="display:flex; justify-content:space-between; margin-bottom:5px;"
      >
        <div class="modal_title">Create Release</div>
        <span
          class="icon-close icon-small interaction"
          v-on:click="closeReleaseCustomerModal()"
        ></span>
      </div>
      <div class="modal__body" style="display:flex; justify-content:center;">
        <form class="create_customer">
          <div class="form-group__text tm-form__text">
            <label class="cm-label">
              Release Name
            </label>
            <input
              type="text"
              name="release"
              style="width: 100%;"
              v-model="releaseObj.name"
            />
          </div>
          <div class="form-group__text tm-form__text">
            <label class="cm-label">
              Attribute
            </label>
            <textarea
              v-model="releaseObj.attribute"
              rows="3"
              cols="100"
              style="width: 100%;min-height: 100px !important;"
            />
          </div>
          <div class="form-group__text tm-form__text">
            <label class="cm-label">
              Tims Id
            </label>
            <input
              type="text"
              name="releaseObj.timsId"
              style="width: 100%;"
              v-model="releaseObj.tims_id"
            />
          </div>
          <div class="form-group__text tm-form__text">
            <label class="cm-label">
              Customer Name
            </label>
            <input
              type="text"
              disabled
              style="width: 100%;"
              name="customer"
              v-model="customerName"
            />
          </div>
          <div class="tm_btn-container">
            <button
              class="btn btn--secondary tmBtn"
              @click="closeReleaseCustomerModal()"
              style="font-size:1.4rem;"
            >
              Cancel
            </button>
            <button
              class="btn btn--secondary tmBtn"
              @click="createRelease"
              style="font-size:1.4rem;"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="showCreateProjectModal" class="createCustomerModal">
      <div
        class="modal__header"
        style="display:flex; justify-content:space-between; margin-bottom:5px;"
      >
        <div class="modal_title">Create Project</div>
        <span
          class="icon-close icon-small interaction"
          v-on:click="closeProjectReleaseModal()"
        ></span>
      </div>
      <div class="modal__body" style="display:flex; justify-content:center;">
        <form class="create_customer">
          <div class="form-group__text tm-form__text">
            <label class="cm-label">
              Project Name
            </label>
            <input type="text" name="release" v-model="project_obj.name" />
          </div>
          <div class="form-group__text tm-form__text">
            <label class="cm-label">
              TIMS Id
            </label>
            <input
              type="text"
              name="timsId"
              disbaled="editProject"
              v-model="project_obj.tims_id"
            />
          </div>
          <div class="form-group__text tm-form__text">
            <label class="cm-label">
              Release Name
            </label>
            <input
              type="text"
              disabled
              name="customer"
              v-model="project_obj.r_name"
            />
          </div>
          <div class="tm_btn-container">
            <button
              class="btn btn--secondary tmBtn"
              @click="closeProjectReleaseModal()"
              style="font-size:1.4rem;"
            >
              Cancel
            </button>
            <button
              class="btn btn--secondary tmBtn"
              @click="createProject"
              style="font-size:1.4rem;"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
    <div
      v-if="loading"
      class="loadingModal"
      style=" height: 60px !important;
        position: absolute !important;     z-index: 100000;"
    >
      <div class="modal__body" style="display:flex; justify-content:center;">
        {{ loadingMessage }}
      </div>
    </div>
    <div v-if="showErrorModal" class="ErrorModal">
      <div
        class="modal__header"
        style="display:flex; justify-content:space-between; margin-bottom:5px;"
      >
        <div class="modal_title">Error</div>
        <span
          class="icon-close icon-small interaction"
          v-on:click="closeErrorModal()"
        ></span>
      </div>
      <div class="modal__body" style="display:flex; justify-content:center;">
        {{ modalErrorMessage }}
      </div>
    </div>
    <div v-if="showInfoModal" class="ErrorModal">
      <div
        class="modal__header"
        style="display:flex; justify-content:space-between; margin-bottom:5px;"
      >
        <div class="modal_title">Info</div>
        <span
          class="icon-close icon-small interaction"
          v-on:click="closeInfoModal()"
        ></span>
      </div>
      <div class="modal__body" style="display:flex; justify-content:center;">
        <div :class="showInfoModalClass">{{ modalInfoMessage }}</div>
      </div>
    </div>
  </div>
</template>
