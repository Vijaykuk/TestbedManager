<script>
import { router } from "@/router";
import { store } from "../store/store";
import { testcaseService } from "@/core/services/testcaseService";
import ContextMenu from "../components/global/ContextMenu/ContextMenu";
import ContextMenuItem from "../components/global/ContextMenu/ContextMenuItem";

export default {
  name: "projectListPage",
  data() {
    return {
      projects: [],
      showErrorModal: false,
      loadingMessage: "",
      loading: false,
      modalErrorMessage: "",
      createdTime: "",
      updatedtime: "",
    };
  },
  components: {
    ContextMenu,
    ContextMenuItem,
  },
  mounted() {
    this.loadProjects();
  },
  watch: {},
  methods: {
    loadProjects: function() {
      this.loading = true;
      this.loadingMessage = "Loading Project details...";
      testcaseService.getProjectList().then(
        (data) => {
          this.loading = false;
          this.loadingMessage = "";
          this.projects = data;
          for (let i = 0; i < this.projects.length; i++) {
            this.loadProjectDetails(this.projects[i].id);
          }
        },
        (error) => {
          this.loading = false;
          this.loadingMessage = "";
        }
      );
    },
    formatDate: function(d) {
      let date = new Date(d);
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? "pm" : "am";
      hours %= 12;
      hours = hours || 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      let strTime = `${hours}:${minutes}${ampm}`;
      return `${date.getMonth() +
        1}/${date.getDate()}/${date.getFullYear()} ${strTime}`;
    },
    openmenu: function(e, prid) {
      this.$refs.pmenu.open(e, prid);
      e.preventDefault();
    },
    closeErrorModal: function() {
      this.modalErrorMessage = "";
      this.showErrorModal = false;
    },
    loadProjectDetails(id) {
      let index = 0;
      let deviceCount = 0;
      let pr = document.getElementsByClassName("projectSlide");
      for (let j = 0; j < this.projects.length; j++) {
        if (this.projects[j].id === id) {
          index = j;
        }
      }
      let self = this;
      testcaseService.getTestcaseList(id).then((data) => {
        if (pr[index].getElementsByClassName("projectrow").length > 0) {
          pr[index].getElementsByClassName("projectrow")[0].innerText =
            "Testcases: " + data.length;
        }
      });
    },
    getProjectInitials(projectName) {
     let prArray = projectName.split("_");
      let prInitials = prArray[0][0].toUpperCase() + prArray[0][1].toUpperCase;
      if (prArray[1]) {
        prInitials =
          prArray[0][0].toUpperCase() +
          prArray[0][1].toUpperCase() +
          prArray[1][0];
      }
      return prInitials;
    },
    deleteProject(contextData) {
      let pid = contextData;
      this.$refs.pmenu.close();
      let project = parseInt(contextData);
      this.loading = true;
      this.loadingMessage = "Deleting Project..";
      testcaseService.deleteProject(pid).then(
        (data) => {
          if (data) {
            this.loading = false;
            this.loadingMessage = "";
            this.loadProjects();
          }
        },
        (error) => {
          this.loading = false;
          this.loadingMessage = "";
          this.showErrorModal = true;
          this.modalErrorMessage =
            "Error while deleting Project, Please try again later";
        }
      );
    },
    updatePrName: function(event) {
      let ele = event.currentTarget;
      let projectId = parseInt(
        ele.nextSibling.href[ele.nextSibling.href.length - 1],
        10
      );
      for (let m = 0; m < this.projects.length; m++) {
        if (this.projects[m].id === projectId) {
          this.projects[m].name = ele.innerHTML;
          let pobj = {
            id: this.projects[m].id,
            name: this.projects[m].name,
            location: "",
          };
          this.loading = true;
          this.loadingMessage = "Updating Project..";
          testcaseService.updateProject(pobj, projectId).then(
            (data) => {
              if (data) {
                this.loading = false;
                this.loadingMessage = "";
                return;
              }
            },
            (error) => {
              this.loading = false;
              this.loadingMessage = "";
              this.showErrorModal = true;
              this.modalErrorMessage =
                "Error while updating project, Please try again later";
            }
          );
        }
      }
    },
    createProject: function() {
      let projectName = "";
      if (this.projects.length > 0) {
        let projectNames = [];
        for (let i = 0; i < this.projects.length; i++) {
          projectNames.push(this.projects[i].name);
        }
        let i = 1;
        do {
          i += 1;
          projectName = "Project_" + i;
        } while (projectNames.indexOf(projectName) > -1);
      } else {
        projectName = "Project_1";
      }
      let pObj = [{ name: projectName, release_id: 1, location: "" }];
      this.loading = true;
      this.loadingMessage = "Creating project..";
      testcaseService.createProject(pObj).then(
        (data) => {
          if (data) {
            this.loading = false;
            this.loadingMessage = "";
            this.loadProjects();
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
    },
  },
};
</script>
<template>
  <div id="project_list_page">
    <div id="project-main-content">
      <div class="labImage"></div>
      <div class="p_buttons">
        <button class="btn btn--primary p_button" @click="createProject">
          <i class="icon icon-plus "> </i>
        </button>
      </div>
      <div id="projectList">
        <div v-for="(project, index) in projects" :key="index" class="projects">
          <div
            :to="{ name: 'TestcaseList', params: { projectId: project.id } }"
            class="pNode"
          >
            <div
              class="projectSlide"
              @contextmenu="openmenu($event, project.id)"
            >
              <div class="projectName" contenteditable @blur="updatePrName">
                {{ project.name }}
              </div>
              <router-link
                :to="{
                  name: 'TestcaseList',
                  params: { projectId: project.id, projectname: project.name },
                }"
                class="pr_slide"
              >
                <div
                  class="table projectTable table--highlight"
                  style="width: 100%;height: 100%;margin: 0;"
                >
                  <div class="projectrow">
                    Testcases: 0
                  </div>
                  <div class="projectrow">
                    Created:
                    {{ formatDate(project.created_at) }}
                  </div>
                  <div class="projectrow">
                    Last Updated:
                    {{ formatDate(project.updated_at) }}
                  </div>
                </div>
              </router-link>
            </div>

            <!--<div><button class="btn btn--primary projectButton">
             {{getProjectInitials(project.name)}}
        </button></div>
        <div class="prLabel">{{project.name}}</div>-->
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="prloadingModal">
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
    <div class="modals">
      <ContextMenu ref="pmenu">
        <template slot-scope="{ contextData }">
          <ContextMenuItem @click.native="deleteProject(contextData)">
            Delete
          </ContextMenuItem>
        </template>
      </ContextMenu>
    </div>
  </div>
</template>
