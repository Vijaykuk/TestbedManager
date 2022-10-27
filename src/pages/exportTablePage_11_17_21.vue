<script>
import { testcaseService } from "@/core/services/testcaseService";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { Tabs, Tab } from "vue-tabs-component";
import SummaryDetails from "./SummaryDetails";
import ReleaseNotes from "./ReleaseNotes";
import ScaleDetails from "./ScaleDetails";
import ConfigurationDetails from "./ConfigurationDetails";
export default {
  name: "ExportTablePage",
  props: [
    "tableColumns",
    "exportColumns",
    "testcases",
    "features",
    "projectId",
    "topologyList",
    "inventory",
    "config_data",
     "selectedCharts"
  ],
  data() {
    return {
      testcaseArrayList:[],
      ftList: [],
      slides: [],
      topoList: [],
      topoData: [],
      date1: new Date(),
      release_note: "release notes",
      total: {},
      primaryOptions:{
        rewind: true,
        width: "100%",
        perPage: 2,
        gap: "50px",
        perMove: 1,
        autoplay: true,
        speed: 150,
        pagination: false,
      },
    };
  },
  mounted() {
    this.loading = true;
    this.loadingMessage = "Loading Topologies..";
    let self = this;
    self.slides = [];
        let obj = {};
     for (let i = 0; i < this.selectedCharts.length; i++) {
       obj = {};
          obj["src"] = "./charts/chartImages_" +i+".png";
          self.slides.push(obj);
     }

  /*  testcaseService.getAllTopologyNames(this.projectId).then(
      (data) => {
        let list = [];
        for (let k = 0; k < data.length; k++) {
          list[k] = data[k].split(".")[0];
        }
        self.topoList = list;
        self.topoData = data;
        self.slides = [];
        let obj = {};
        for (let i = 0; i < data.length; i++) {
          obj = {};
          obj["src"] = "./topology/" + data[i];
          self.slides.push(obj);
        }
      },
      (error) => {
        this.loading = false;
        this.loadingMessage = "";
        this.showErrorModal = true;
        this.modalErrorMessage =
          "Error while fetching topologies. Please try again later.";
      }
    );*/
  },
  components: {
    SummaryDetails,
    ReleaseNotes,
    ScaleDetails,
    ConfigurationDetails,
    tabs: Tabs,
    tab: Tab,
  },
  directives: {
    tabs: Tabs.directive,
    tab: Tab.directive,
  },
  computed: {
    featuresList: function() {
      let arr = [];
      let obj = {};
      let auto = 0;
      let manual = 0;
      let pass = 0,
      withLogs =0,
        fail = 0;
      let total = { count: 0, pass: 0, fail: 0, auto: 0, manual: 0, withLogs: 0 };
      for (let i = 0; i < this.features.length; i++) {
        obj = {};
        pass = 0;
        fail = 0;
        auto = 0;
        manual = 0;
        withLogs = 0;
        obj["name"] = this.features[i].feature;
        obj["count"] = this.features[i].count;
        for (let j = 0; j < this.features[i].list.length; j++) {
          total.count += 1;
          if (this.features[i].list[j].tc_result.toLowerCase() === "pass") {
            total.pass += 1;
            pass = pass + 1;
          } else {
            total.fail += 1;
            fail = fail + 1;
          }
          if (this.features[i].list[j].tc_exectution_method === "auto") {
            total.auto += 1;
            auto += 1;
          } else {
            total.manual += 1;
            manual += 1;
          }
          if (this.features[i].list[j].fobj.tc_logFileName.length>0) {
            total.withLogs += 1;
            withLogs += 1;
          } 
        }
        obj["pass"] = pass;
        obj["fail"] = fail;
        obj["auto"] = auto;
        obj["manual"] = manual;
        obj["withLogs"]=withLogs;
        arr.push(obj);
      }
      this.total = total;
      return arr;
    },
    },
    watch:{
      selectedCharts:{
        handler(){
          this.slides = [];
        let obj = {};
     for (let i = 0; i < this.selectedCharts.length; i++) {
       obj = {};
          obj["src"] = "./charts/chartImages_" +i+".png";
          this.slides.push(obj);
     }
        },
        deep:true
      },
     /*  exportColumns:{
      immediate: true,
    deep: true,
    handler(exportColumns) {
         debugger;
      let tc_list=[];
      if(exportColumns.tc_with_logs){
        for(let k=0;k<this.testcases.length;k++){
          if(this.testcases[k].tc_logFileName != null &&
            this.testcases[k].tc_logFileName != undefined &&
            this.testcases[k].tc_logFileName != "") {
              tc_list.push(this.testcases[k]);
            }
        }
        this.export_testcase_list=tc_list;
      }
      else{
         this.export_testcase_list=this.testcases;
      }
    }
  },*/
      testcases:{
         handler() {
           debugger;
        let platformRoles=[];
         let PRSummaryDetails = [],obj={};
        
         for (let i = 0; i < this.testcases.length; i++) {
           platformRoles.push(this.testcases[i].tc_platform+"_"+this.testcases[i].tc_role);
         }
         let allPlatformRoles=[...new Set(platformRoles)];
           for (let l = 0; l < allPlatformRoles.length; l++) {
             obj={};
        obj["platformRole"] = allPlatformRoles[l] ;
        obj["plist"]=[];
        obj["testcases"]=[];
        PRSummaryDetails.push(obj);
      }

        for(let m=0;m<PRSummaryDetails.length;m++){
          for(let k=0;k<this.testcases.length;k++){
            if(this.testcases[k].tc_platform+"_"+this.testcases[k].tc_role === PRSummaryDetails[m].platformRole){
              PRSummaryDetails[m].testcases.push(this.testcases[k]);
            }
           }
        }

         for(let m=0;m<allPlatformRoles.length;m++){
              allPlatformRoles[m] = allPlatformRoles[m] === null ? "null" : allPlatformRoles[m];
              PRSummaryDetails[m].platformRole=allPlatformRoles[m] === null ? "null" : allPlatformRoles[m];
         }

          for(let a=0;a<PRSummaryDetails.length;a++){
            let tlist=PRSummaryDetails[a].testcases;
            let features=[],allFeatures=[],fname="";
            for(let b=0;b<tlist.length;b++){
              fname=tlist[b].tc_feature===""?"unknown":tlist[b].tc_feature;
              features.push(fname);
            }
            allFeatures=[...new Set(features)]
            for(let c=0;c<allFeatures.length;c++){
              obj={};
              obj["feature"]=allFeatures[c];
              obj["flist"]=[];
              PRSummaryDetails[a].plist.push(obj);
            }

             for(let d=0;d<tlist.length;d++){
               for(let e=0;e<allFeatures.length;e++){
                 if(allFeatures[e]===tlist[d].tc_feature){
                   PRSummaryDetails[a].plist[e].flist.push(tlist[d]);
                 }
              }
             }
         }
      this.testcaseArrayList=PRSummaryDetails;
    },
    deep: true
      }
    },
   methods: {
    onChildInteraction(args) {},
    platformRoleTabsClicked(){

    },
    getParsedString(str) {
      if (typeof str === "string") {
        let str1 = str.replaceAll("\\t", "    ");
        str1 = str1.replaceAll("\\n", "<br>");
        str1 = str1.replaceAll("\t", "    ");
        str1 = str1.replaceAll("\n", "<br>");
        return str1;
      }
    },
    formatDate: function() {
      let date = new Date();
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    },
    getImageName(str) {
      let str1 = str.split("/");
      let str2 = str1[str1.length - 1].split(".")[0];
      return str2;
    },
    changeSlide() {
      let tabName = event.currentTarget;
      debugger;
    },
    getTopologyName(filename) {
      if (this.topoList.indexOf(filename) > -1) {
        for (let i = 0; i < this.topoList.length; i++) {
          if (this.topoList[i] === filename) {
            return "./topology/" + this.topoData[i];
          }
        }
      } else {
        return "";
      }
    },
    getLogoName() {
      return "./assets/CiscoLogo.png";
    },
    getFilePath(st) {
      return "";
      if (st) {
        //let st1 = st.replaceAll(":", "_");
        let str = st.replace(/docx/gi, "pdf");
        let arr = [];
        let str1 = "",
          strTemp = "",
          str2 = "";
        let strList = str.split(", ");
        for (let i = 0; i < strList.length; i++) {
          str1 = strList[i].split("detail_documents/")[1];
          strTemp = str1.substring(str1.indexOf("/") + 1);
          str2 = "./" + strTemp;
          arr.push(str2);
        }
        return arr;
      } else {
        return "";
      }
    },
    getFilename(str) {
      return "";
      if (str) {
        let arr1 = [];
        let strList = str.split(", ");
        for (let i = 0; i < strList.length; i++) {
          strList[i] = strList[i].replace(/docx/gi, "pdf");
          arr1.push(strList[i].substring(strList[i].lastIndexOf("/") + 1));
        }
        return arr1;
      } else {
        return "-";
      }
    },

    showHide(key) {},
  },
};
</script>
<template>
  <div id="export-content">
    <div
      id="tm_home-main-content"
      style="position: relative;
    margin: 30px;
    height: 100%;
    overflow: scroll;"
    >
      <div
        class="logoImage"
        style="margin-bottom: 10px;
    position: absolute;"
      >
        <img
          style="background-size: 100% 100%;
    width: 60px;
    height: 30px;
    margin-left: 20px;"
          :src="getLogoName()"
        />
        <h1
          style="
    display: inline;
    margin-left: 20px;
    color: #474A4B;"
        >
          Google CVT 731 End of Test Report
        </h1>
      </div>
      <div
        class="commonDiv"
        style="margin-top: 50px;
    background-color:#fff;
    height: 350px;
    width: 95.4%;
    z-index: 1000;
    position: absolute;
    border: 2px solid #9aaba8;
    border-top: 55px solid #37BEB0;
    border-radius: 20px;
    text-align:center"
      >
        <!-- <button
          class="tm_landing-welcome-text navBtn summaryBtn"
          @click="changeSlide"
          style="
    border-bottom: 20px solid #f78d9a;"
        >
          Summary
        </button>-->
        <button
          class="tm_landing-welcome-text navBtn releasenotesBtn"
          @click="changeSlide"
          style="
    border-bottom:20px solid #4285F4;margin-left: 0 !important;"
        >
          Release Info
        </button>
        <button
          class="tm_landing-welcome-text navBtn testresultsBtn active1"
          @click="changeSlide"
          style="
    border-bottom:20px solid #40E0D0;"
        >
          Testcase Logs
        </button>
        <button
          class="tm_landing-welcome-text navBtn configurationBtn"
          @click="changeSlide"
          style="
    border-bottom: 20px solid #F4B400;"
        >
          Configuration
        </button>
        <button
          class="tm_landing-welcome-text navBtn inventoryBtn"
          @click="changeSlide"
          style="
            border-bottom: 20px solid #0F9D58;"
        >
          Inventory
        </button>
        <button
          class="tm_landing-welcome-text navBtn scalematrixBtn"
          @click="changeSlide"
          style="
    border-bottom: 20px solid #800080;"
        >
          Router Profile
        </button>
        <!--<button
          class="tm_landing-welcome-text navBtn telemetryBtn"
          @click="changeSlide"
          style="
    border-bottom:20px solid #DB4437;"
        >
          Telemetry
        </button>-->
        <div class="row" style="text-align:center;">
        <!--  <div
            class="summariseDiv"
            style="
     height: 100px;
    width: 60%;
    position: absolute;
    margin-top: 40px;
    z-index: 100000;
 "
          >
            <table
              class="summaryTable"
              style="border: 1px solid black;
    background-color: rgb(255, 255, 255);
    width: 70%;
    min-height: 200px;
    box-shadow: rgb(193 193 193) 5px 4px 3px;
    font-size: 13px !important;
    transition: all 0.5s;
    margin-left: 100px;"
            >
              <tr
                style="box-shadow: 0 3px 3px -2px #c1c1c1;
    text-align: center;"
              >
                <th
                  style="text-align: left;
    padding-left: 35px; width:25%"
                >
                  Feature Name
                </th>
                <th style="width:15%">Count</th>
                <th style="width:15%">Pass</th>
                <th style="width:15%">Fail</th>
                <th style="width:15%">Automated</th>
                <th style="width:15%">Manual</th>
              </tr>
              <tr
                style="box-shadow: 0 3px 3px -2px #c1c1c1;
    text-align: center;line-height: 25px;"
              >
                <td
                  style="text-align: left;
    padding-left: 35px;width:25%;white-space: nowrap;"
                >
                  Total
                </td>
                <td style="width:15%">
                  {{ total.count }}
                </td>
                <td style="width:15%">
                  {{ total.pass }}
                </td>
                <td style="width:15%">
                  {{ total.fail }}
                </td>
                <td style="width:15%">
                  {{ total.auto }}
                </td>
                <td style="width:15%">
                  {{ total.manual }}
                </td>
              </tr>
              <tr
                v-for="(farr, index) in featuresList"
                :key="index"
                style="box-shadow: 0 3px 3px -2px #c1c1c1;
    text-align: center;line-height: 25px;"
              >
                <td
                  style="text-align: left;
    padding-left: 35px;width:25%;white-space: nowrap;"
                >
                  {{ farr.name }}
                </td>
                <td style="width:15%">
                  {{ farr.count }}
                </td>
                <td style="width:15%">
                  {{ farr.pass }}
                </td>
                <td style="width:15%">
                  {{ farr.fail }}
                </td>
                <td style="width:15%">
                  {{ farr.auto }}
                </td>
                <td style="width:15%">
                  {{ farr.manual }}
                </td>
              </tr>
            </table>
          </div>-->
          <div
            class="topoDiv"
           
          >

          <div class="topo_splideContainer">
          
      <splide :slides="slides" :options="primaryOptions" class="mySlides" id="mySlides">
        <splide-slide v-for="slide in slides" :key="slide.src"   class="topoSlides">
          <img :src="slide.src"   style="background-size: 100% 100%;
    height: 240px;
    width: 450px;
    
    transition:all 0.5s;
    border:1px solid #c1c1c1;
   "/>
        </splide-slide>
      </splide>
          </div>




            <!--<div class="slidercontainer" style="margin-left:20px">
              <template v-for="slide in slides">
                <div class="showSlider fade" :key="slide.src">
                  <img
                    :src="slide.src"
                    class="middleImage"
                    style="background-size: 100% 100%;
    height: 210px;
    width: 500px;
    box-shadow: 0px 0px 6px #2396f5 !important;
    transition:all 0.5s;
    -webkit-box-shadow: 5px 4px 3px #c1c1c1 !important;"
                  />
                  <div class="slideContent">{{ getImageName(slide.src) }}</div>
                </div>
              </template>
    
              <a class="left" onclick="nextSlide(-1)">❮</a>
              <a class="right" onclick="nextSlide(1)">❯</a>
            </div>-->
          </div>
        </div>
      </div>

      <div
        class="dateContent"
        style="margin-top:420px;right:100px;color:#0C6170;z-index: 10000;
    position: absolute;"
      >
        Report generated on : {{ formatDate() }}
      </div>
     
      <div
        class="testresults showSlide slidePage"
        style=" Height: 800px;
    position: relative;
    margin-bottom: 20px;
    margin-top: 475px;
    margin-left: 10px;
    z-index: 10;"
      >
       <div
      style="margin-top: 10px;margin-right: 60px;position: absolute;right: 0;z-index:10000;"
    >
      <a href="https://docs.google.com/document/d/1tPsx0CFK6Scl7HPB78RH8AsStohpBYjFW26S76QV0Po/edit"><i class="fa fa-download"></i></a>
    </div>
    <div class="tabsContainer proleTabs">
      <tabs
          id="platformRoleTabs"
          name="platformRoleTabs"
          :options="{ useUrlFragment: false }"
          @clicked="platformRoleTabsClicked"
          @changed="platformRoleTabsClicked">
        <template v-for="(platformRoles,ind) in testcaseArrayList" >
        <tab
            :name="platformRoles.platformRole"
            :id="'platformRoles'+ind"
            :ref="platformRoles.platformRole"
            :key="ind"
          >
           <table
          class="table table--highlight mainTable testcaseTable"
          style="width: 97%;
    margin: 0px;
    table-layout: fixed;
    border-spacing: 0px;
    border: 2px solid #9aaba8;"
        >
          <tbody>
            <template v-for="(ft, index) in platformRoles.plist">
              <tr
                oncontextmenu="showpopupmenu"
                style="font-size: 1.6rem !important;
    height: 30px !important;
    background: #dbf5f0 !important;
    color: #fff;
    border: 1px solid rgb(255, 255, 255);
    padding-top: 40px;
    padding-bottom: 20px;"
                :key="index"
                class="summaryTablesValues1 featureValues"
              >
                <td
                  style="width: 90%;
    overflow-wrap: break-word;
    padding-left: 1em !important;
    background-color: #dbf5f0;
    color: #000;
    font-size: 1.1rem;
    font-weight: 600 !important;"
                  colspan="4"
                >
                  {{ ft.feature }}
                </td>
              </tr>
              <tr
                oncontextmenu="showpopupmenu"
                style="width:100%;padding:0;height:30px;"
                :key="'A' + index"
              >
                <td class="mainFirstTd" colspan="4" style="padding:0;">
                  <table
                    class="table table--highlight secondaryTable"
                    style="font-size: 14px !important;width: 100%;height: 100%;margin: 0;table-layout: fixed;"
                  >
                    <template v-for="(fobj, index1) in ft.flist">
                      <tr
                        class="featureTr featureValues"
                        :key="index1"
                        style="text-align:center; height:30px !important;width:100%;box-shadow: 0 3px 3px -2px #c1c1c1;"
                      >
                        <td
                          class="testcase_td"
                          style="width:10%;font-size: 1rem; font-weight: 400 !important;"
                        >
                          {{ fobj.sl_num }}
                        </td>
                        <td
                          class="testcase_td"
                          style="width:40%;text-align:left !important;font-size: 1rem; font-weight: 400 !important;"
                        >
                          {{ fobj.tc_title }}
                        </td>
                         <td
                          class="testcase_td"
                          style="width:10%;font-size: 1rem; font-weight: 400 !important;"
                          v-if="tableColumns.feature"
                        >
                          {{ fobj.tc_feature }}
                        </td>
                        <td
                          class="testcase_td"
                          style="width:10%;font-size: 1rem; font-weight: 400 !important;"
                          v-if="tableColumns.type"
                        >
                          {{ fobj.tc_type }}
                        </td>
                        <td
                          class="testcase_td"
                          style="width:10%;font-size: 1rem; font-weight: 400 !important;"
                          v-if="tableColumns.topology"
                        >
                          {{ fobj.tc_topology }}
                        </td>
                        <td
                          class="testcase_td"
                          style="width:10%;font-size: 1rem; font-weight: 400 !important;"
                          v-if="tableColumns.DUT"
                        >
                          {{ fobj.tc_dut }}
                        </td>
                        <td
                          class="testcase_td"
                          style="width:10%;font-size: 1rem; font-weight: 400 !important;"
                          v-if="tableColumns.role"
                        >
                          {{ fobj.tc_role }}
                        </td>
                        <td
                          class="testcase_td"
                          style="width:10%;font-size: 1rem; font-weight: 400 !important;"
                          v-if="tableColumns.platform"
                        >
                          {{ fobj.tc_platform }}
                        </td>
                        <td
                          class="testcase_td attach"
                          style="width:40%;text-align:left !important;font-size: 1rem; font-weight: 400 !important;"
                          v-if="tableColumns.logFile"
                        >
                          <template
                            v-for="(fname, inx) in getFilePath(
                              fobj.tc_logFileName
                            )"
                          >
                            <a :href="fname" :key="inx">{{
                              getFilename(fobj.tc_logFileName)[inx]
                            }}</a>
                            <!--  <a
                              href="#"
                              :data-orig="fname"
                              onclick="openFile()"
                              :key="inx"
                              >{{ getFilename(fobj.tc_logFileName)[inx] }}
                            </a>-->
                          </template>
                        </td>
                        <td
                          class="testcase_td"
                          style="width:10%;font-size: 1rem; font-weight: 400 !important;"
                          v-if="tableColumns.version"
                        >
                          {{ fobj.tc_version }}
                        </td>
                        <td
                          class="testcase_td"
                          style="width:10%;font-size: 1rem; font-weight: 400 !important;"
                          v-if="tableColumns.release"
                        >
                          {{ fobj.tc_release }}
                        </td>
                        <td
                          class="testcase_td"
                          style="width:10%;font-size: 1rem; font-weight: 400 !important;"
                          v-if="tableColumns.execMethod"
                        >
                          {{ fobj.tc_exectution_method }}
                        </td>
                        <td
                          class="testcase_td"
                          style="width:10%;font-size: 1rem; font-weight: 400 !important;"
                        >
                          {{ fobj.tc_result }}
                        </td>
                      </tr>
                      <tr
                        style="width:100%;padding:0;cursor:default;background:#fff !important"
                        :key="'A' + index1"
                        class="hideTr tr1div"
                      >
                        <td colspan="12" style="padding:0;border-left: none;">
                          <form
                            class="testCaseForm"
                            style="height: 98%;padding-left: 30px;padding-top: 40px;"
                          >
                            <div
                              class="form-group tm-form-group"
                              style="padding-right: 10px;margin-bottom: 0 !important;display: flex;position: relative;flex-direction: column; margin: 0;"
                            >
                              <div
                                class="form-group__text tm-form__text"
                                style="justify-content: space-between;margin-bottom: 25px;position: relative;display: flex;flex-direction: column;"
                              >
                                <label
                                  class="tm-label"
                                  style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                >
                                  Title:
                                </label>
                                <div style="width: 97%;">
                                  {{ fobj.tc_title }}
                                </div>
                              </div>
                            </div>
                            <div
                              class="form-group tm-form-group"
                              v-if="exportColumns.tc_description"
                            >
                              <div class="form-group__text tm-form__text">
                                <label
                                  class="tm-label"
                                  style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                >
                                  Description:
                                </label>
                                <div style="width: 97%;">
                                  {{ fobj.tc_description }}
                                </div>
                              </div>
                            </div>
                            <div
                              class="form-group tm-form-group1 row"
                              v-if="exportColumns.tc_feature"
                            >
                              <div class="col-lg-4 col-md-4">
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                  >
                                    Feature:
                                  </label>
                                  <div>{{ fobj.tc_feature }}</div>
                                </div>
                              </div>
                              <div
                                class="col-lg-4 col-md-4"
                                v-if="exportColumns.tc_type"
                              >
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                  >
                                    Type:
                                  </label>
                                  <div>{{ fobj.tc_type }}</div>
                                </div>
                              </div>
                              <div
                                class="col-lg-4 col-md-4"
                                v-if="exportColumns.tc_topology"
                              >
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                  >
                                    Topology:
                                  </label>
                                  <div>
                                    <div>
                                      <img
                                        style="height:300px;width:400px; border:1 px solid #c1c1c1"
                                        :src="getTopologyName(fobj.tc_topology)"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="form-group tm-form-group1 row">
                              <div
                                class="col-lg-4 col-md-4"
                                v-if="exportColumns.tc_dut"
                              >
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                  >
                                    DUT:
                                  </label>
                                  <div>{{ fobj.tc_dut }}</div>
                                </div>
                              </div>
                              <div
                                class="col-lg-4 col-md-4"
                                v-if="exportColumns.tc_role"
                              >
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                  >
                                    Role:
                                  </label>
                                  <div>{{ fobj.tc_role }}</div>
                                </div>
                              </div>
                              <div
                                class="col-lg-4 col-md-4"
                                v-if="exportColumns.tc_platform"
                              >
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                  >
                                    Platform:
                                  </label>
                                  <div>{{ fobj.tc_platform }}</div>
                                </div>
                              </div>
                              <div
                                class="col-lg-4 col-md-4"
                                v-if="exportColumns.tc_tag"
                              >
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                  >
                                    Tag:
                                  </label>
                                  <div>{{ fobj.tc_tag }}</div>
                                </div>
                              </div>
                            </div>
                            <div
                              class="form-group tm-form-group"
                              v-if="exportColumns.tc_procedure"
                            >
                              <div class="form-group__text tm-form__text">
                                <label
                                  class="tm-label"
                                  style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                >
                                  Procedure:
                                </label>
                                <div style="width: 97%;">
                                  {{ getParsedString(fobj.tc_procedure) }}
                                </div>
                              </div>
                            </div>
                            <div
                              class="form-group tm-form-group"
                              v-if="exportColumns.tc_pass_fail_criteria"
                            >
                              <div class="form-group__text tm-form__text">
                                <label
                                  class="tm-label"
                                  style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                >
                                  Pass/Fail Criteria:
                                </label>
                                <div style="width: 97%;">
                                  {{
                                    getParsedString(fobj.tc_pass_fail_criteria)
                                  }}
                                </div>
                              </div>
                            </div>
                            <div
                              class="form-group tm-form-group"
                              v-if="exportColumns.tc_logs"
                            >
                              <div class="form-group__text tm-form__text">
                                <label
                                  class="tm-label"
                                  style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                >
                                  Logs
                                </label>
                                <div>
                                  <a :href="getFilePath(fobj.tc_logFileName)">{{
                                    getFilename(fobj.tc_logFileName)
                                  }}</a>
                                </div>
                              </div>
                            </div>
                            <div class="form-group tm-form-group1 row">
                              <div
                                class="col-lg-4 col-md-4"
                                v-if="exportColumns.tc_exectution_method"
                              >
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                  >
                                    Execution method:
                                  </label>
                                  <div>{{ fobj.tc_exectution_method }}</div>
                                </div>
                              </div>
                              <div
                                class="col-lg-4 col-md-4"
                                v-if="exportColumns.tc_priority"
                              >
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                  >
                                    Priority:
                                  </label>
                                  <div>{{ fobj.tc_priority }}</div>
                                </div>
                              </div>
                              <div
                                class="col-lg-4 col-md-4"
                                v-if="exportColumns.tc_regression"
                              >
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                  >
                                    Regression:
                                  </label>
                                  <div>{{ fobj.tc_regression }}</div>
                                </div>
                              </div>
                              <div
                                class="col-lg-4 col-md-4"
                                v-if="exportColumns.tc_smoke"
                              >
                                <div class="form-group__text tm-form__text">
                                  <label class="switch">
                                    Smoke:
                                  </label>
                                  <div>{{ fobj.tc_smoke }}</div>
                                </div>
                              </div>
                            </div>
                            <div class="form-group tm-form-group2">
                              <div
                                class="form-group__text tm-form__text"
                                v-if="exportColumns.tc_result"
                              >
                                <label
                                  class="tm-label"
                                  style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                >
                                  Result:
                                </label>
                                <div>{{ fobj.tc_result }}</div>
                              </div>
                            </div>
                            <div class="form-group tm-form-group1 row">
                              <div
                                class="col-lg-4 col-md-4"
                                v-if="exportColumns.tc_version"
                              >
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                  >
                                    Version:
                                  </label>
                                  <div>{{ fobj.tc_version }}</div>
                                </div>
                              </div>
                              <div
                                class="col-lg-4 col-md-4"
                                v-if="exportColumns.tc_release"
                              >
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                  >
                                    Release:
                                  </label>
                                  <div class="release">
                                    {{ fobj.tc_release }}
                                  </div>
                                </div>
                              </div>
                              <div
                                class="col-lg-4 col-md-4"
                                v-if="exportColumns.tc_customer"
                              >
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                  >
                                    Customer:
                                  </label>
                                  <div class="customer">
                                    {{ fobj.tc_customer }}
                                  </div>
                                </div>
                              </div>
                              <div
                                class="col-lg-4 col-md-4"
                                v-if="exportColumns.tc_featureId"
                              >
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                  >
                                    Rally Id:
                                  </label>
                                  <div class="featureId">
                                    {{ fobj.tc_featureId }}
                                  </div>
                                </div>
                              </div>
                              <div
                                class="col-lg-4 col-md-4"
                                v-if="exportColumns.tc_testcaseOwner"
                              >
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                  >
                                    Testcase Owner:
                                  </label>
                                  <div class="testcaseOwner">
                                    {{ fobj.tc_testcaseOwner }}
                                  </div>
                                </div>
                              </div>
                              <div
                                class="col-lg-4 col-md-4"
                                v-if="exportColumns.tc_testExecOwner"
                              >
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                  >
                                    Test Exec Owner:
                                  </label>
                                  <div class="testExecOwner">
                                    {{ fobj.tc_testExecOwner }}
                                  </div>
                                </div>
                              </div>
                              <div
                                class="col-lg-4 col-md-4"
                                v-if="exportColumns.tc_duration"
                              >
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                  >
                                    Duration:
                                  </label>
                                  <div class="duration">
                                    {{ fobj.tc_duration }}
                                  </div>
                                </div>
                              </div>
                              <div
                                class="col-lg-4 col-md-4"
                                v-if="exportColumns.tc_source"
                              >
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                  >
                                    Source:
                                  </label>
                                  <div class="source">
                                    {{ fobj.tc_source }}
                                  </div>
                                </div>
                              </div>
                              <div
                                class="col-lg-4 col-md-4"
                                v-if="exportColumns.tc_ifd"
                              >
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                  >
                                    IFD:
                                  </label>
                                  <div class="ifd">
                                    {{ fobj.tc_ifd }}
                                  </div>
                                </div>
                              </div>
                              <div
                                class="col-lg-4 col-md-4"
                                v-if="exportColumns.tc_cfd"
                              >
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                  >
                                    CFD:
                                  </label>
                                  <div class="cfd">
                                    {{ fobj.tc_cfd }}
                                  </div>
                                </div>
                              </div>
                              <div
                                class="col-lg-4 col-md-4"
                                v-if="exportColumns.tc_defects"
                              >
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 600;font-size: 1rem;"
                                  >
                                    Defects:
                                  </label>
                                  <div class="defects">
                                    {{ fobj.tc_defects }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </td>
                      </tr>
                    </template>
                  </table>
                </td>
              </tr>
            </template>
          </tbody>
        </table>

          </tab>
     </template>

      </tabs>
    </div>
      <!-- -->
        <div class="showpopupmenu">
          <div class="checkBoxesMenu">
            <div></div>
          </div>
        </div>
      </div>
      <div
        class="configuration hideSlide slidePage"
        style="-webkit-animation: slide 0.5s forwards;
    -webkit-animation-delay: 2s;
    animation: slide 0.5s forwards;
    animation-delay: 2s;"
      >
        <ConfigurationDetails
          :projectid="this.projectId"
          :config_data="getParsedString(config_data)"
          v-on:child="onChildInteraction"
        />
      </div>
      <div
        class="releasenotes hideSlide slidePage"
        style="-webkit-animation: slide 0.5s forwards;
    -webkit-animation-delay: 2s;
    animation: slide 0.5s forwards;
    animation-delay: 2s;"
      >
        <ReleaseNotes
          :projectid="this.projectId"
          v-on:child="onChildInteraction"
        />
      </div>
      <div
        class="scalematrix hideSlide slidePage"
        style="-webkit-animation: slide 0.5s forwards;
    -webkit-animation-delay: 2s;
    animation: slide 0.5s forwards;
    animation-delay: 2s;"
      >
        <ScaleDetails
          :projectid="this.projectId"
          v-on:child="onChildInteraction"
        />
      </div>
      <div
        class="inventory hideSlide slidePage"
        style="-webkit-animation: slide 0.5s forwards;
    -webkit-animation-delay: 2s;
    animation: slide 0.5s forwards;
    animation-delay: 2s;"
      >
        <SummaryDetails
          :projectid="this.projectId"
          :inventory="inventory"
          v-on:child="onChildInteraction"
        />
      </div>
      <div
        class="telemetry hideSlide slidePage"
        style="-webkit-animation: slide 0.5s forwards;
    -webkit-animation-delay: 2s;
    animation: slide 0.5s forwards;
    animation-delay: 2s;"
      >
        <!--Telemetry Div Comes Here -->
      </div>
    </div>
  </div>
</template>
<style scoped>
.tabs-component-tabs {
    padding: 0 !important;
    border: 0;
    align-items: stretch;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 0px;
    height: 30px !important;
    width: 95% !important;
    margin-left: 20px !important;
}

.tabs-component-tab{
    background-color: #fff !important;
    border-radius: 6px 6px 0 0;
    border-bottom: none !important;
    z-index: 2;
    transform: translateY(0);
    font-size: 12px !important;
    border: 1px solid #000 !important;
    /* box-shadow: 0 0 15px #939393; */
}

</style>
