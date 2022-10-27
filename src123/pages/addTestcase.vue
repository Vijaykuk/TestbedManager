<script>
import { router } from "@/router";
import { store } from "../store/store";
import { testcaseService } from "@/core/services/testcaseService";
import { requestOptions } from "@/core/helpers/request";
import ContextMenu from "../components/global/ContextMenu/ContextMenu";
import ContextMenuItem from "../components/global/ContextMenu/ContextMenuItem";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment-timezone";

export default {
  name: "AddTestCase",
  props: ["formValues", "projectId", "editForm", "topologyList", "selected_topology","refid","showingUnique","releaseFlag","idValue"],
  data() {
    return {
      desc: "",
      deletingfile: "",
      feature: "",
      type: "",
      topology: "",
      tag: "",
      dut: "",
      platform: "",
      procedure: "",
      passFailCriteria: "",
      logs: "",
      execMethod: "",
      result: "",
      version: "",
      release: "",
      role: "",
      customer: "",
      uploadImage: false,
      imageuploaded: false,
      topoImageuploaded: false,
      addLogs: true,
      logimage: [],
      topoImageUrl: null,
      topologyimage: null,
      imageUrl: null,
      error: false,
      errorMessage: "",
      showErrorModal: false,
      modalErrorMessage: "",
      loading: false,
      loadingMessage: "",
      showInfoModal: false,
      showInfoModalClass: "",
      showTopo: false,
      topoList: [],
      showPassChecklist: false,
      oldResult: "",
      newResult: "",
      checklistError: true,
      defaultCheckList: {
        Traffic: false,
        Telemetry: false,
        Crash_Traceback: false,
        Syslog: false,
        Background_CLIs: false,
        System_stability: false,
        Memory_leak: false,
        CPU_Hog: false,
      },
      passCheckList: {
        Traffic: false,
        Telemetry: false,
        Crash_Traceback: false,
        Syslog: false,
        Background_CLIs: false,
        System_stability: false,
        Memory_leak: false,
        CPU_Hog: false,
      },
      defectsValue: [],
      showDefects: false,
      listedDefects: [],
      update_master: false,
      assumedDefects: [],
      showLogDeleteButton:false,
      selectedDeleteObj:{},
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
    };
  },
  components: {
    ContextMenu,
    ContextMenuItem,
     DatePicker,
  },
  mounted() {
    let elms = document.querySelectorAll(".tm_testCase_Form");
    if (this.editForm) this.addLogs = true;
    for (let i = 0; i < elms.length; i++) {
      if (!this.editForm) {
        elms[i].classList.add("addForm1");
        elms[i].classList.remove("addForm2");
      } else {
        elms[i].classList.add("addForm2");
        elms[i].classList.remove("addForm1");
      }
    }
    let list = [];
    for (let k = 0; k < this.topologyList.length; k++) {
      list[k] = this.topologyList[k].split(".")[0];
    }
    this.topoList = list;
    if (this.refid) {
      let parentDiv = document.getElementsByClassName(
        "testcaseDiv" + this.refid
      )[0];
      let elements = parentDiv.getElementsByTagName("textarea");
      for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("input", autoResize, false);
        function autoResize() {
          this.style.height = "auto";
          this.style.height = this.scrollHeight + "px";
        }
      }
    }
  },
  computed: {
    testcaseRefId: function() {
      return "testcaseDiv" + this.refid;
    },
  },
  watch: {
    formValues: function(newVal) {
      let defStr = newVal.tc_defect_assumption;
      let defArr = defStr.split("\n");
      let arr = [],
        obj = {};
      for (let k = 0; k < defArr.length; k++) {
        obj = {};
        obj["id"] = defArr[k].substring(0, defArr[k].indexOf(" "));
        obj["desc"] = defArr[k].substring(defArr[k].indexOf(" ") + 3);
        arr.push(obj);
      }
      this.assumedDefects = arr;

    
    },
    editForm: function(newVal) {
      let elms = document.querySelectorAll(".tm_testCase_Form");
      if (newVal) this.addLogs = true;
      for (let i = 0; i < elms.length; i++) {
        if (!newVal) {
          elms[i].classList.add("addForm1");
          elms[i].classList.remove("addForm2");
        } else {
          elms[i].classList.add("addForm2");
          elms[i].classList.remove("addForm1");
        }
      }
    },
    topologyList: {
     immediate: true,
    deep: true,
    handler(topologyList) {
      let list = [];
      for (let k = 0; k < topologyList.length; k++) {
        list[k] = topologyList[k].split(".")[0];
      }
      this.topoList = list;
    }
    },
  },
  methods: {
    emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
    onDefectsChange() {
      let str = "";
      for (let k = 0; k < this.defectsValue.length; k++) {
        let str1=this.defectsValue[k].split(':')[0];
        str +=str1 + "  ";
      }
      this.formValues.tc_defects = str;
    },
    selectDefectsClicked(e) {
      this.showDefects = true;
      document.querySelector(".defectsDropdown").focus();
      //loadListedDefetcs from API
      e.preventDefault();
    },
    defectsSelected() {
      debugger;
      this.showDefects = false;
    },
    onChange(event) {
      if (event.currentTarget.className === "topology") {
        if (event.currentTarget.value === "newTopo") {
          document.querySelector(".topology_file").click();
        } else {
          this.imageSrc = "";
          this.showTopo = true;
          this.showTopoFilename =
            requestOptions.apiUrl() +
            "/get_topology/" +
            this.projectId +
            "_" +
            event.currentTarget.value +
            ".png";
        }
      } else if (event.currentTarget.className === "result") {
        if (
          event.currentTarget.value === "pass" ||
          event.currentTarget.value === "passed"
        ) {
          this.newResult = event.currentTarget.value;
          this.showPassChecklist = true;
          //  this.emitToParent("showPassChecklist");
        }
      }
    },
    onFocus(event) {
      if (event.currentTarget.className === "result") {
        this.oldResult = event.currentTarget.value;
      }
    },
    closeCheckListModal() {
      this.showPassChecklist = false;
      this.checklistError = true;
      let temp = Object.keys(this.passCheckList);
      for (let i = 0; i < temp.length; i++) {
        this.passCheckList[temp[i]] === false;
      }
    },
    checklistChange(){
      let temp = Object.keys(this.passCheckList);
      if(  event.currentTarget.value === "on"){
      for (let i = 0; i < temp.length; i++) {
        if ( temp[i]!=event.currentTarget.name &&(this.passCheckList[temp[i]] === false ||
          this.passCheckList[temp[i]] === "false")
        ){
          return;
        }
      }
      this.checklistError = false;
      }
     },
    checkResultUpdate() {
      this.formValues.tc_result = this.newResult;
      this.showPassChecklist = false;
      this.checklistError = true;
      let temp = Object.keys(this.passCheckList);
      for (let i = 0; i < temp.length; i++) {
        this.passCheckList[temp[i]] === false;
      }
      event.preventDefault();
    },
    getLogFiles(logFiles) {
      let filename = "";
      let logfile_elem = document.getElementsByClassName("logFileClass")[0];
      if (logfile_elem) logfile_elem.value = "";
      if (logFiles) {
        let logfileList = logFiles.split(",");
        let l_list = [];
        for (let i = 0; i < logfileList.length; i++) {
          filename = logfileList[i].substring(
            logfileList[i].lastIndexOf("/") + 1
          );
          if (filename != "LogFile.log") {
            l_list.push(filename);
          }
        }
        return l_list;
      } else {
        return null;
      }
    },
    adjustHeight() {
      let elements = document.getElementsByTagName("textarea");
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.height =
          elements[i].scrollHeight > elements[i].clientHeight
            ? elements[i].scrollHeight + "px"
            : "60px";
      }
    },
    closeErrorModal() {
      this.modalErrorMessage = "";
      this.showErrorModal = false;
    },
    tagChange() {
      let tags = this.tc_tag.split(",");
      this.formValues.tc_tag = tags;
    },
    onTopologyImgChange(e) {
      this.imageSrc = "";
      const file = e.target.files[0];
      this.topologyimage = file;
      let fileName = file.name.split(".")[0];
      this.formValues["tc_topology"] = fileName;
      document.querySelector(".topology").innerHTML +=
        "<option value=" + fileName + ">" + fileName + "</option>";
      this.formValues.tc_topology = fileName;
      this.topoImageuploaded = true;
      this.showTopo = true;
      this.imageSrc = URL.createObjectURL(file);
    },
    getTopologyName(topoName) {
      if (this.imageSrc === "") {
        let list = [];
        for (let k = 0; k < this.topologyList.length; k++) {
          list[k] = this.topologyList[k].split(".")[0];
        }
        for (let i = 0; i < list.length; i++) {
          if (list[i] === topoName) {
            return (
              requestOptions.apiUrl() +
              "/get_topology/" +
              this.projectId +
              "_" +
              this.topologyList[i]
            );
          }
        }
      } else {
        return this.imageSrc;
      }
    },
    resetForm(e) {
      this.formValues = {};
      e.preventDefault();

      /* this.desc="";
            this.feature="";
            this.type="";
            this.topology="";
            this.tag="";
            this.dut="";
            this.platform="";
            this.procedure="";
            this.passFailCriteria="";
            this.logs="";
            this.execMethod="";
            this.result="";
            this.version="";
            this.release="";
            this.customer="";
            this.image=null;
            this.imageUrl=null;*/
    },
    validateTestcaseForm() {
      if (!this.formValues.tc_title || !this.formValues.tc_feature) {
        return false;
      } else {
        return true;
      }
    },
    autoResize() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    },
    getHeight() {
      debugger;
    },
    handleSubmit(e) {
      this.error = false;
      this.errorMessage = "";
      if (this.validateTestcaseForm()) {
        let json_obj = {};
        var form_data = new FormData();
        json_obj["project_id"] = this.projectId;
        json_obj["tc_description"] = this.formValues.tc_description
          ? this.formValues.tc_description
          : "";
        json_obj["tc_title"] = this.formValues.tc_title;
        json_obj["tc_feature"] = this.formValues.tc_feature;
        json_obj["tc_type"] = this.formValues.tc_type
          ? this.formValues.tc_type
          : "";
        json_obj["tc_topology"] = this.formValues.tc_topology
          ? this.formValues.tc_topology
          : "";
        json_obj["tc_dut"] = this.formValues.tc_dut
          ? this.formValues.tc_dut
          : "";
        json_obj["tc_role"] = this.formValues.tc_role
          ? this.formValues.tc_role
          : "";
        json_obj["tc_platform"] = this.formValues.tc_platform
          ? this.formValues.tc_platform
          : "";
        json_obj["tc_tag"] = this.formValues.tc_tag
          ? this.formValues.tc_tag
          : "";
        json_obj["tc_procedure"] = this.formValues.tc_procedure
          ? this.formValues.tc_procedure
          : "";
        json_obj["tc_pass_fail_criteria"] = this.formValues
          .tc_pass_fail_criteria
          ? this.formValues.tc_pass_fail_criteria
          : "";
        json_obj["tc_exectution_method"] = this.formValues.tc_exectution_method
          ? this.formValues.tc_exectution_method
          : "";
        json_obj["tc_result"] = this.formValues.tc_result
          ? this.formValues.tc_result
          : "";
        json_obj["tc_version"] = this.formValues.tc_version
          ? this.formValues.tc_version
          : "";
        json_obj["tc_release"] = this.formValues.tc_release
          ? this.formValues.tc_release
          : "";
        json_obj["tc_customer"] = this.formValues.tc_customer
          ? this.formValues.tc_customer
          : "";
        json_obj["tc_smoke"] = this.formValues.tc_smoke
          ? this.formValues.tc_smoke
          : "";
        json_obj["tc_priority"] = this.formValues.tc_priority
          ? this.formValues.tc_priority
          : "";
        json_obj["tc_regression"] = this.formValues.tc_regression
          ? this.formValues.tc_regression
          : 1;
        json_obj["tc_featureId"] = this.formValues.tc_featureId
          ? this.formValues.tc_featureId
          : "";
        json_obj["tc_testcaseOwner"] = this.formValues.tc_testcaseOwner
          ? this.formValues.tc_testcaseOwner
          : "";
        json_obj["tc_testExecOwner"] = this.formValues.tc_testExecOwner
          ? this.formValues.tc_testExecOwner
          : "";
        json_obj["tc_duration"] = this.formValues.tc_duration
          ? this.formValues.tc_duration
          : "";
        json_obj["tc_source"] = this.formValues.tc_source
          ? this.formValues.tc_source
          : "";
        json_obj["tc_ifd"] = this.formValues.tc_ifd
          ? this.formValues.tc_ifd
          : "";
        json_obj["tc_cfd"] = this.formValues.tc_cfd
          ? this.formValues.tc_cfd
          : "";
        json_obj["tc_defects"] = this.formValues.tc_defects;
        /*  ? this.formValues.tc_defects.split(",")
          : [];*/
        json_obj["testcase_id"] = this.formValues.testcase_id
          ? this.formValues.testcase_id
          : "";
        json_obj["tc_logs"] = this.formValues.tc_logs
          ? this.formValues.tc_logs
          : "";
        json_obj["tims_id"] = this.formValues.tims_id
          ? this.formValues.tims_id
          : "";
        json_obj["automation_flag"] = this.formValues.automation_flag==="true"?true:false;

        json_obj["tc_automatable"] = this.formValues.tc_automatable
          ? this.formValues.tc_automatable
          : "";

        json_obj["tc_automation_owner"] = this.formValues.tc_automation_owner
          ? this.formValues.tc_automation_owner
          : "";
        json_obj["tc_automation_status"] = this.formValues.tc_automation_status
          ? this.formValues.tc_automation_status
          : "";
        json_obj["tc_automation_ETA"] = this.formValues.tc_automation_ETA
          ? this.formValues.tc_automation_ETA
          : "";
        

        
        
        if (this.editForm === true) {
          json_obj["tc_uuid"] = this.formValues.tc_uuid
            ? this.formValues.tc_uuid
            : "";
        }
        if (this.editForm === true) {
          json_obj["update_master"] = this.update_master;
        }

        form_data.append("jsonObj", JSON.stringify(json_obj));

        if (this.formValues.tc_logs) {
          let logcontent = this.formValues.tc_logs;
          let logFile = new Blob([logcontent], { type: "text/plain" });
          let fileOfBlob = new File([logFile], "LogFile.log");
          form_data.append("logFile_111", fileOfBlob);
        }

        if (this.imageuploaded) {
          for (let i = 0; i < this.logimage.length; i++) {
            let filename = "logFile_" + i;
            form_data.append(filename, this.logimage[i]);
          }
        }
        if (this.topoImageuploaded) {
          form_data.append("topology_filename", this.topologyimage);
        }

        if (this.editForm === true) {
          if(this.showingUnique===false){
          this.loading = true;
          this.loadingMessage = "Updating Testcase...";
          testcaseService.updateTestCase(form_data, this.formValues.id).then(
            (data) => {
              if (data) {
                this.update_master = false;
                this.loading = false;
                this.loadingMessage = "";
                this.showInfoModal = true;
                this.modalInfoMessage = data.message;
                this.emitToParent("closeForm");
                this.addLogs = true;
                this.uploadImage = false;
                this.imageuploaded=false;
                this.topoImageuploaded=false;
              }
            },
            (error) => {
              this.loading = false;
              this.loadingMessage = "";
               this.imageuploaded=false;
                this.topoImageuploaded=false;
              this.showErrorModal = true;
              this.modalErrorMessage =
                "Error while updating Testcase, Please try again later";
            }
          );
          }
          else if(this.showingUnique===true){
            //updating Unique testcases
          this.loading = true;
          this.loadingMessage = "Updating Testcases...";
          testcaseService.updateUniqueTestCases(form_data, this.formValues.id, this.releaseFlag,this.idValue).then(
            (data) => {
              if (data) {
                this.update_master = false;
                this.loading = false;
                this.loadingMessage = "";
                this.showInfoModal = true;
                this.modalInfoMessage = data.message;
                this.emitToParent("closeForm");
                this.addLogs = true;
                this.uploadImage = false;
                this.imageuploaded=false;
                this.topoImageuploaded=false;
              }
            },
            (error) => {
              this.loading = false;
              this.loadingMessage = "";
               this.imageuploaded=false;
                this.topoImageuploaded=false;
              this.showErrorModal = true;
              this.modalErrorMessage =
                "Error while updating Testcase, Please try again later";
            }
          );
          }
        } else {
          this.loading = true;
          this.loadingMessage = "Creating Testcases..";
          testcaseService.createTestCase(form_data).then(
            (data) => {
              if (data) {
                this.loading = false;
                this.loadingMessage = "";
                this.showInfoModal = true;
                 this.imageuploaded=false;
                this.topoImageuploaded=false;
                this.modalInfoMessage = data.message;
                this.emitToParent("closeForm");
                this.addLogs = true;
                this.uploadImage = false;
              }
            },
            (error) => {
              this.loading = false;
              this.loadingMessage = "";
              this.showErrorModal = true;
               this.imageuploaded=false;
                this.topoImageuploaded=false;
              this.modalErrorMessage =
                "Error while creating Testcase, Please try again later";
            }
          );
        }
      } else {
        this.error = true;
        if (!this.formValues.tc_title) {
          this.errorMessage = "Error, title is empty";
        } else if (!this.formValues.tc_feature) {
          this.errorMessage = "Error, feature is empty";
        } else {
          this.errorMessage = "Invalid form";
        }
      }
      e.preventDefault();
    },
    onImgChange(e) {
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        this.logimage.push(file);
        this.formValues["imageUrl"] += ", " + URL.createObjectURL(file);
      }
      this.imageuploaded = true;
    },
    getId(idName) {
      return idName;
    },
    uploadLog(e) {
      this.addLogs = false;
      this.uploadImage = true;
      let logfile_elem = document.getElementsByClassName("logFileClass")[0];
      if (logfile_elem) logfile_elem.value = "";
      e.preventDefault();
    },
    addLog(e) {
      this.addLogs = true;
      this.uploadImage = false;
      e.preventDefault();
    },
    captureLogImage() {
      //todo
    },
    closeForm(e) {
      this.emitToParent("closeForm");
      e.preventDefault();
    },
    openLogMenu(event, fileObj) {
      this.showLogDeleteButton=true;
      this.selectedDeleteObj=fileObj;
      setTimeout(function(){
         this.showLogDeleteButton=false;
      },300)
     // this.$refs.log_menu.open(event, fileObj);
      event.preventDefault();
    },
    deleteFile(e) {
      let fileObj=this.selectedDeleteObj;
      let obj = { id: fileObj.id };
      this.showLogDeleteButton=false;
      let files = fileObj.files.split(",");
      let filename = "";
      for (let i = 0; i < files.length; i++) {
        filename = files[i].substring(files[i].lastIndexOf("/") + 1);
        if (filename === fileObj.filename) {
          obj["filename"] = files[i];
        }
      }
      var self = this;
      this.deletingfile = fileObj.id + "_" + filename;
      this.loading = true;
          this.loadingMessage = "Deleting Log File";
      testcaseService.deleteFile(obj).then(
        (data) => {
          if (data) {
            self.loading = false;
          self.loadingMessage = "";
            self.selectedDeleteObj={};
          //  this.$refs.log_menu.close();
           // if(document.getElementsByClassName("logFileList"))
            let fileListDivs = document.getElementsByClassName("logFileList");
            this.deletingfile = "";
          }
        },
        (error) => {
          alert(this.deletingFile);
          alert(self.deletingFile);
          this.loading = false;
          this.loadingMessage = "";
          this.showErrorModal = true;
          this.deletingfile = "";
          this.modalErrorMessage =
            "Error while deleting file, Please try again later";
        }
      );
    },
  },
};
</script>
<template>
  <div :class="testcaseRefId">
    <div class="tm_testCase_Form addForm1">
      <form class="testCaseForm">
        <div class="form-group tm-form-group1 row" style="width:95%">
          <div style="width:30%">
            <div class="form-group__text tm-form__text">
              <label class="tm-label">
                Tims Id : {{ formValues.tims_id }}
              </label>
            </div>
          </div>
        </div>
        <div
          class="form-group tm-form-group"
          style="padding-right: 10px;margin-bottom: 10 !important;display: flex;position: relative;flex-direction: column; margin: 0;"
        >
          <div
            class="form-group__text tm-form__text"
            style="justify-content: space-between;margin-bottom: 0px;position: relative;display: flex;flex-direction: column;"
          >
            <textarea
              v-model="formValues.tc_title"
              style="width: 90%;display: block;"
            ></textarea>
            <label
              class="tm-label"
              style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
            >
              Title
            </label>
          </div>
        </div>
        <div class="form-group tm-form-group">
          <div class="form-group__text tm-form__text">
            <textarea
              v-model="formValues.tc_description"
              style="display: block;
            "
            ></textarea>
            <label class="tm-label">
              Description
            </label>
          </div>
        </div>

        <div class="form-group tm-form-group1 row" style="width:95%">
          <div style="width:20%">
            <div class="form-group__text tm-form__text">
               <input
              type="text"
              v-model="formValues.tc_feature"
                class="feature1"
              list="testcaseFeatures"
            />
            <datalist id="testcaseFeatures">
               <option value="MPLS TE">MPLS TE</option>
                <option value="SRTE">SRTE</option>
                <option value="ISIS">ISIS</option>
                <option value="BGP">BGP</option>
                <option value="Infra">Infra</option>
                <option value="Install">Install</option>
                <option value="QoS">QoS</option>
                <option value="Netflow">Netflow</option>
                <option value="ACL">ACL</option>
                <option value="GRE">GRE</option>
                <option value="MPLS">MPLS</option>
                <option value="ARP/ND">ARP/ND</option>
                <option value="Telemetry">Telemetry</option>
                <option value="Config Management">Config Management</option>
                <option value="Trigger">Trigger</option>
                <option value="MPLS Static">MPLS Static</option>
                <option value="Interface">Interface</option>
            </datalist>
              <label class="tm-label">
                Feature
              </label>
            </div>
          </div>
          <div style="width:20%">
            <div class="form-group__text tm-form__text">
               <input
              type="text"
              v-model="formValues.tc_type"
              list="testcaseTypes"
            />
            <datalist id="testcaseTypes">
               <option value="">Select</option>
                <option value="Functional">Functional</option>
                <option value="Negative">Negative</option>
                <option value="Scale">Scale</option>
                <option value="Stress">Stress</option>
                <option value="Trigger">Trigger</option>
                <option value="HA">HA</option>
                <option value="Manageability">Manageability</option>
                <option value="Convergence">Convergence</option>
                <option value="Longevity">Longevity</option>
               </datalist> 
              <label class="tm-label">
                Type
              </label>
            </div>
          </div>
          <div style="width:20%" v-if="!showingUnique">
            <div class="form-group__text tm-form__text">
              <input type="text" name="dut" v-model="formValues.tc_dut" />

              <label class="tm-label">
                DUT
              </label>
            </div>
          </div>
          <div style="width:20%">
            <div class="form-group__text tm-form__text">
              <select
                v-model="formValues.tc_priority"
                class="priority"
                @change="onChange($event)"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">low</option>
              </select>
              <label class="tm-label">
                Priority
              </label>
            </div>
          </div>
          <div style="width:20%" v-if="!showingUnique">
            <div class="form-group__text tm-form__text">
              <input type="text" name="role" v-model="formValues.tc_role" />

              <label class="tm-label">
                Role
              </label>
            </div>
          </div>
          <div style="width:20%">
            <div class="form-group__text tm-form__text">
              <select
                v-model="formValues.tc_regression"
                class="regression"
                @change="onChange($event)"
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
              <label class="tm-label">
                Regression
              </label>
            </div>
          </div>
          <div style="width:20%" v-if="!showingUnique">
            <div class="form-group__text tm-form__text">
              <input
                type="text"
                name="customer"
                v-model="formValues.tc_customer"
                disabled
              />
              <label class="tm-label">
                Customer
              </label>
            </div>
          </div>
          <div style="width:20%">
            <div class="form-group__text tm-form__text">
              <input type="text" name="tag" v-model="formValues.tc_tag" />
              <label class="tm-label">
                Tag
              </label>
            </div>
          </div>
          <div style="width:20%">
            <div class="form-group__text tm-form__text">
              <select
                v-model="formValues.tc_smoke"
                class="smoke"
                @change="onChange($event)"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <label class="switch">
                Smoke
              </label>
            </div>
          </div>
          <div style="width:20%" v-if="!showingUnique">
            <div class="form-group__text tm-form__text">
                <input
              type="text"
              v-model="formValues.tc_platform"
              list="testcasePlatforms"
            />
            <datalist id="testcasePlatforms">
               <option value="">Select</option>
                <option value="ASR9000">ASR9000</option>
                <option value="NCS5000">NCS5000</option>
                <option value="NCS5500">NCS5500</option>
                <option value="8000">8000</option>
            </datalist>
              <label class="tm-label">
                Platform
              </label>
            </div>
          </div>
        <div style="width:20%" v-if="!showingUnique">
            <div class="form-group__text tm-form__text">
              <input
                type="text"
                name="customer"
                v-model="formValues.tc_release"
              />
              <label class="tm-label">
                Release
              </label>
            </div>
          </div>
          <div style="width:20%" v-if="!showingUnique">
            <div class="form-group__text tm-form__text">
              <input
                type="text"
                name="version"
                v-model="formValues.tc_version"
              />
              <label class="tm-label">
                Version
              </label>
            </div>
          </div>
          <div style="width:20%">
            <div class="form-group__text tm-form__text">
              <select
                v-model="formValues.tc_exectution_method"
                class="execMethod"
                @change="onChange($event)"
              >
                <option value="manual">manual</option>
                <option value="auto">auto</option>
              </select>
              <label class="tm-label">
                Execution method
              </label>
            </div>
          </div>
          <div style="width:20%" v-if="!showingUnique">
            <div class="form-group__text tm-form__text">
              <select
                v-model="formValues.tc_result"
                class="result"
                @change="onChange($event)"
                @focus="onFocus($event)"
              >
                <option value="pending">Pending</option>
                <option value="passed">Passed</option>
                <option value="failed">Failed</option>
                <option value="blocked">Blocked</option>
                <option value="passes w/ exeption">Passes w/ Exeption</option>
              </select>
              <label class="tm-label">
                Result
              </label>
            </div>
          </div>
          <div style="width:20%">
            <div class="form-group__text tm-form__text">
              <input
                type="text"
                name="featureId"
                v-model="formValues.tc_featureId"
              />
              <label class="tm-label">
                Rally Id
              </label>
            </div>
          </div>
          <div style="width:20%" v-if="!showingUnique">
            <div class="form-group__text tm-form__text">
              <select
                v-model="selected_topology.name"
                class="topology"
                @change="onChange($event)"
              >
                <option value="newTopo">Create new</option>
                <template v-for="(topo, ind) in topoList">
                  <option :key="ind" :value="topo">{{ topo }}</option>
                </template>
              </select>
              <input
                type="file"
                class="topology_file"
                @change="onTopologyImgChange"
              />
              <label class="tm-label">
                Topology
              </label>
            </div>
            <div v-if="showTopo">
              <img
                id="topoImage"
                style="height:300px;width:400px; border:1 px solid #c1c1c1"
                :src="getTopologyName(formValues.tc_topology)"
              />
            </div>
          </div>
          <div style="width:20%">
            <div class="form-group__text tm-form__text">
              <input
                type="text"
                name="testcaseOwner"
                v-model="formValues.tc_testcaseOwner"
              />
              <label class="tm-label">
                Testcase Owner
              </label>
            </div>
          </div>
          <div style="width:20%" v-if="!showingUnique">
            <div class="form-group__text tm-form__text">
              <input
                type="text"
                name="testExecOwner"
                v-model="formValues.tc_testExecOwner"
              />
              <label class="tm-label">
                Test Exec Owner
              </label>
            </div>
          </div>
          <div style="width:20%">
            <div class="form-group__text tm-form__text">
              <input
                type="text"
                name="duration"
                v-model="formValues.tc_duration"
              />
              <label class="tm-label">
                Duration
              </label>
            </div>
          </div>
          <div style="width:20%">
            <div class="form-group__text tm-form__text">
              <select
                v-model="formValues.tc_source"
                class="source"
                @change="onChange($event)"
              >
               <option value="CVT">CVT</option>
                <option value="CRD">CRD: Customer Requirements</option>
                <option value="CFD">CFD: Customer Found Defect</option>
                 <option value="CR">CR: Change Request</option>
                 
               
              </select>
              <label class="tm-label">
                Source
              </label>
            </div>
          </div>
          <div style="width:20%">
            <div class="form-group__text tm-form__text">
              <select
                v-model="formValues.automation_flag"
                class="automation_flag"
                @change="onChange($event)"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              <label class="tm-label">
                Automated
              </label>
            </div>
          </div>
           <div style="width:20%">
            <div class="form-group__text tm-form__text">
              <select
                v-model="formValues.tc_automatable"
                class="tc_automatable"
                @change="onChange($event)"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="partial">Partial</option>
              </select>
              <label class="tm-label">
                Automatable
              </label>
            </div>
          </div>
           <div style="width:20%">
            <div class="form-group__text tm-form__text">
              <input
                type="text"
                name="tc_automation_owner"
                v-model="formValues.tc_automation_owner"
              />
              <label class="tm-label">
                Automation Owner
              </label>
            </div>
          </div>
          <div style="width:20%">
            <div class="form-group__text tm-form__text">
              <select
                v-model="formValues.tc_automation_status"
                class="tc_automation_status"
                @change="onChange($event)"
              >
                 <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="NA">NA</option>
              </select>
              <label class="tm-label">
                Automation Status
              </label>
            </div>
          </div>
           <div style="width:20%">
            <div class="form-group__text tm-form__text">
            <label class="tm-label">
                Automation ETA
              </label>
              <date-picker
             v-model="formValues.tc_automation_ETA"
                 :format="format" value-type="format"
              :lang="lang"
            ></date-picker>
              
            </div>
          </div>
          
          
          
        </div>
        <div class="form-group tm-form-group">
          <div class="form-group__text tm-form__text">
            <textarea
              v-model="formValues.tc_procedure"
              style="display: block;"
              class="proceduretextarea"
              @enter="autoResize"
              @change="autoResize"
              @load="autoResize"
              height="200px"
            ></textarea>
            <label class="tm-label">
              Procedure
            </label>
          </div>
        </div>
        <div class="form-group tm-form-group">
          <div class="form-group__text tm-form__text">
            <textarea
              v-model="formValues.tc_pass_fail_criteria"
              style="display: block;
            "
              height="200px"
            ></textarea>
            <label class="tm-label">
              Pass/Fail Criteria
            </label>
          </div>
        </div>
        <div class="form-group tm-form-group" v-if="!showingUnique">
          <div class="form-group__text tm-form__text">
            <input
              class="logFileClass"
              v-if="uploadImage"
              type="file"
              accept="*/*"
              @change="onImgChange"
              multiple
            />
            <textarea
              v-if="addLogs"
              v-model="formValues.tc_logs"
              style="display: block;
             border: 1px solid #c1c1c1"
            ></textarea>
            <label class="tm-label">
              Logs
              <a v-if="addLogs" href="#" class="logAnchor" @click="uploadLog($event)">
                Upload Logs
              </a>
              <a v-if="!addLogs" href="#" class="logAnchor" @click="addLog($event)">
                Add Logs
              </a>
              <button class="btn btn--primary tm_addBtn logDeleteBtn" v-if="showLogDeleteButton" href='#'  @click="deleteFile($event)">delete</button>
            </label>
            <div class="logFileList">
              <template
                v-for="(file1, ind) in getLogFiles(formValues.tc_logFileName)"
              >
                <a
                  href="#"
                  :key="ind"
                  class="logFiles"
                  :id="formValues.id + '_' + file1"
                  @contextmenu="
                    openLogMenu($event, {
                      id: formValues.id,
                      files: formValues.tc_logFileName,
                      filename: file1,
                    })
                  "
                >
                  {{ file1 }}
                </a>
              
              </template>

            </div>
          </div>
        </div>

        <div class="form-group tm-form-group">
          <div class="form-group__text tm-form__text">
            <textarea
              v-model="formValues.tc_ifd"
              name="ifd"
              style="display: block;
            "
            ></textarea>
            <label class="tm-label" for="ifd">
              IFD
            </label>
          </div>
        </div>
        <div class="form-group tm-form-group">
          <div class="form-group__text tm-form__text">
            <textarea
              v-model="formValues.tc_cfd"
              name="cfd"
              style="display: block;
            "
            ></textarea>
            <label class="tm-label" for="cfd">
              CFD
            </label>
          </div>
        </div>
        <div class="form-group tm-form-group" v-if="!showingUnique">
          <div class="form-group__text tm-form__text">
            <textarea
              v-model="formValues.tc_defects"
              name="defects"
              style="display: block;"
              @focus="selectDefectsClicked($event)"
            ></textarea>
            <select
              v-if="showDefects"
              v-model="defectsValue"
              class="source, defectsDropdown"
              style="width:90%"
              @change="onDefectsChange($event)"
              @focusout="defectsSelected"
              multiple
            >
              <option v-for="(def, index) in assumedDefects" :key="index"
                style="margin-top: 5px;font-size: 1.5rem;">{{ def.id }}: {{ def.desc }}</option
              >
            </select>
            <label class="tm-label" for="defects">
              Defects
            </label>
          </div>
        </div>
        <div v-if="editForm && !showingUnique" class="form-group tm-form-group">
          <div class="">
            <input
              style="margin-right: 20px;"
              type="checkbox"
              name="update_master"
              v-model="update_master"
            />
            <label class="tm-label" for="update_master">
              Update Master
            </label>
          </div>
        </div>
        <div v-if="error" class="errorContainer">{{ errorMessage }}</div>
        <div class="tm_btn-container">
          <button
            class="btn btn--secondary tmBtn"
            @click="closeForm($event)"
            style="font-size:1.4rem;"
          >
            Cancel
          </button>
          <button
            class="btn btn--secondary tmBtn"
            @click="resetForm($event)"
            style="font-size:1.4rem;"
            disabled
          >
            Reset
          </button>
          <button
            @click="handleSubmit($event)"
            class="tmBtn btn btn--secondary"
            style="font-size:1.4rem;"
          >
            Submit
          </button>
        </div>
      </form>
      <ContextMenu class="logMenu" ref="log_menu">
        <template style="width:40px;height:30px" slot-scope="{ contextData }">
          <ContextMenuItem @click.native="deleteFile(contextData)">
            Delete
          </ContextMenuItem>
        </template>
      </ContextMenu>
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
          <div
            class="modal__body"
            style="display:flex; justify-content:center;"
          >
            <div :class="showInfoModalClass">{{ modalInfoMessage }}</div>
          </div>
        </div>
      </div>
      <div v-if="showPassChecklist" class="PassChecklistModal">
        <div
          class="modal__header"
          style="display:flex; justify-content:space-between; margin-bottom:5px;"
        >
          <div class="modal_title">Select the steps completed</div>
          <span
            class="icon-close icon-small interaction"
            v-on:click="closeCheckListModal()"
          ></span>
        </div>
        <div class="modal__body" style="display:flex; justify-content:center;">
          <form
            class="checklistForm"
            style="height: 98%;padding-left: 30px;width: 100%;"
          >
            <div style="text-align: left;">
              <input
                type="checkbox"
                name="Traffic"
                  @click="checklistChange"
                v-model="passCheckList.Traffic"
              />
              <label class="exportLabel" for="Traffic">Traffic</label>
            </div>
            <div style="text-align: left;">
              <input
                type="checkbox"
                name="Telemetry"
                  @click="checklistChange"
                v-model="passCheckList.Telemetry"
              />
              <label class="exportLabel" for="Telemetry">Telemetry</label>
            </div>
            <div style="text-align: left;">
              <input
                type="checkbox"
                name="Crash_Traceback"
                  @click="checklistChange"
                v-model="passCheckList.Crash_Traceback"
              />
              <label class="exportLabel" for="Crash_Traceback"
                >Crash/Traceback</label
              >
            </div>
            <div style="text-align: left;">
              <input
                type="checkbox"
                name="Syslog"
                  @click="checklistChange"
                v-model="passCheckList.Syslog"
              />
              <label class="exportLabel" for="Syslog">Syslog</label>
            </div>
            <div style="text-align: left;">
              <input
                type="checkbox"
                name="Background_CLIs"
                  @click="checklistChange"
                v-model="passCheckList.Background_CLIs"
              />
              <label class="exportLabel" for="Background_CLIs"
                >Background CLIs</label
              >
            </div>
            <div style="text-align: left;">
              <input
                type="checkbox"
                name="System_stability"
                  @click="checklistChange"
                v-model="passCheckList.System_stability"
              />
              <label class="exportLabel" for="System_stability"
                >System stability</label
              >
            </div>
            <div style="text-align: left;">
              <input
                type="checkbox"
                name="Memory_leak"
                @click="checklistChange"
                v-model="passCheckList.Memory_leak"
              />
              <label class="exportLabel" for="Memory_leak">Memory leak</label>
            </div>
            <div style="text-align: left;">
              <input
                type="checkbox"
                name="CPU_Hog"
                @click="checklistChange"
                v-model="passCheckList.CPU_Hog"
              />
              <label class="exportLabel" for="CPU_Hog">CPU Hog</label>
            </div>
            <div  class="checklistError">
              To Pass the testcase, above steps should be completed
            </div>
            <div class="tm_btn-container">
              <button
                class="btn btn--secondary tmBtn"
                @click="closeCheckListModal"
                style="font-size:1.4rem;"
              >
                Cancel
              </button>
              <button
                class="btn btn--secondary tmBtn"
                :disabled="checklistError"
                @click="checkResultUpdate"
                style="font-size:1.4rem;"
              >
                OK
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
