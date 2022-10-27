<script>
import { testcaseService } from "@/core/services/testcaseService";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import { requestOptions } from "@/core/helpers/request";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
export default {
  name: "ExportTablePage",
  props: ["features", "projectId", "topologyList"],
  data() {
    return {
      primaryOptions: {
        type: "loop",
        width: 800,
        pagination: false,
      },
      secondaryOptions: {
        type: "slide",
        rewind: true,
        width: 800,
        gap: "1rem",
        pagination: false,
        fixedWidth: 110,
        fixedHeight: 70,
        cover: true,
        focus: "center",
        isNavigation: true,
      },
      slides: [],
      topoList: [],
    };
  },
  mounted() {
    this.loading = true;
    this.loadingMessage = "Loading Topologies..";
    let self = this;
    testcaseService.getAllTopologyNames(this.projectId).then(
      (data) => {
        let list = [];
        for (let k = 0; k < data.length; k++) {
          list[k] = data[k].split(".")[0];
        }
        self.topoList = list;
        self.slides = [];
        let obj = {};
        for (let i = 0; i < data.length; i++) {
          obj = {};
          obj["src"] =
            requestOptions.apiUrl() +
            "/get_topology/" +
            self.projectId +
            "_" +
            data[i];
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
    );
  },
  methods: {
    getParsedString(str) {
      let str1 = str.replaceAll("\\t", "    ");
      str1 = str1.replaceAll("\\n", "<br>");
      str1 = str1.replaceAll("\t", "    ");
      str1 = str1.replaceAll("\n", "<br>");
      return str1;
    },
    changeSlide() {
      debugger;
    },
    getTopologyName(filename) {
      let list = [];
      for (let k = 0; k < this.topologyList.length; k++) {
        list[k] = this.topologyList[k].split(".")[0];
      }
      for (let i = 0; i < list.length; i++) {
        if (list[i] === filename) {
          return (
            requestOptions.apiUrl() +
            "/get_topology/" +
            this.projectId +
            "_" +
            this.topologyList[i]
          );
        }
      }
    },
    getFilePath(str) {
      if (str) {
        let arr = [];
        let str1 = "",
          str2 = "";
        let strList = str.split(", ");
        for (let i = 0; i < strList.length; i++) {
          str1 = strList[i].split("detail_documents/")[1];
          str2 = "./" + str1;
          arr.push(str2);
        }
        return arr;
      } else {
        return "";
      }
    },
    getFilename(str) {
      if (str) {
        let arr1 = [];
        let strList = str.split(", ");
        for (let i = 0; i < strList.length; i++) {
          arr1.push("log_" + i);
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
      style="position: relative; margin: 30px; height: 100%;overflow: scroll;"
    >
      <div
        style="background-color: #D4F1F4;
    height: 270px;
    width: 94%;
    z-index: 1000;
    position: fixed;
    border-top: 100px solid #050569;"
      >
        <button
          class="tm_landing-welcome-text navBtn summaryBtn"
          @click="changeSlide"
          style="
    border-bottom: 20px solid #006994;"
        >
          Summary
        </button>
        <button
          class="tm_landing-welcome-text navBtn configurationBtn"
          @click="changeSlide"
          style="
    border-bottom: 20px solid #AD50CD"
        >
          Configuration
        </button>
        <button
          class="tm_landing-welcome-text navBtn testresultBtn"
          @click="changeSlide"
          style="
    border-bottom: 20px solid #faeb68;"
        >
          Test Results
        </button>
        <button
          class="tm_landing-welcome-text navBtn scalematrixBtn"
          @click="changeSlide"
          style="
    border-bottom: 20px solid #f8ba56;"
        >
          Scale Matrix
        </button>
        <button
          class="tm_landing-welcome-text navBtn inventoryBtn"
          @click="changeSlide"
          style="
            border-bottom: 20px solid #9ccc65;"
        >
          Inventory
        </button>
        <button
          class="tm_landing-welcome-text navBtn releasenoteBtn"
          @click="changeSlide"
          style="
    border-bottom: 20px solid #b54b99;"
        >
          Release Note
        </button>
      </div>
      <div
        class="summariseDiv"
        style="
        height: 100px;
    width: 50%;
    position: fixed;
    margin-top: 200px;
    z-index: 100000;
    margin-left: 30px;
"
      >
        <template v-for="(ft, index) in features">
          <div
            class="col-lg-3 col-md-3"
            style="width: 33%;display: inline-grid;"
            :key="index"
          >
            {{ ft.feature }} : {{ ft.count }}
          </div>
        </template>
      </div>
      <div
        class="topoDiv"
        style="position: fixed;
    z-index: 1000;
    display: inline-block;
    margin-top: 130px;
    margin-left: 690px;
    text-align: right;"
      >
        <div class="slidercontainer">
          <template v-for="slide in slides">
            <div class="showSlider fade" :key="slide.src">
              <img
                :src="slide.src"
                style="background-size: 100% 100%;
    height: 200px;
    width: 400px;
    box-shadow: 0px 0px 6px #2396f5 !important;
    -webkit-box-shadow: 5px 4px 3px #c1c1c1 !important;"
              />
              <div class="slideContent">{{ slide.src }}</div>
            </div>
          </template>
          <!-- Navigation arrows -->
          <a class="left" onclick="nextSlide(-1)">❮</a>
          <a class="right" onclick="nextSlide(1)">❯</a>
        </div>
      </div>
      <div
        class="testcaseTable showSlide"
        style="   max-height: 650px;
    position: relative;
    overflow: scroll;
    margin-bottom: 20px;
    margin-top: 345px;
    z-index: 10;"
      >
        <table
          class="table table--highlight mainTable"
          style="width: 100%;height: 100%;margin: 0;table-layout: fixed;border-spacing: 0px;"
        >
          <tbody>
            <!--<tr
              class="featureValues tableHeadings"
              style="width:100%;height:20px !important;
                      color:#fff"
            >
              <th
                class="testcase_td1"
                style="width:10%;;border-right: 1px solid #dfdfdf;font-weight: 400;font-size: 1 rem;"
              >
                Id
              </th>
              <th
                class="testcase_td1"
                style="width:40%;;border-right: 1px solid #dfdfdf;font-weight: 400;font-size: 1 rem;"
              >
                Title
              </th>
              <th
                class="testcase_td1"
                style="width:40%;;border-right: 1px solid #dfdfdf;font-weight: 400;font-size: 1 rem;"
              >
                Log File
              </th>
              <th
                class="testcase_td1"
                style="width:10%;;border-right: 1px solid #dfdfdf;font-weight: 400;font-size: 1 rem;"
              >
                Result
              </th>
            </tr>-->
            <template v-for="(ft, index) in features">
              <tr
                style="font-size: 14px !important;height:20px !important;background: #fff !important;color: #000;border: 1px solid #fff;"
                :key="index"
                class="summaryTablesValues1 featureValues"
              >
                <td
                  style="width: 90%;
    overflow-wrap: break-word;
    background-color: #017cad;
    padding-left: 1em;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;"
                  colspan="3"
                >
                  {{ ft.feature }}
                </td>
                <td
                  style="width:5%; text-align:center; background-color: #017cad; padding-left:1em;border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;"
                >
                  {{ ft.count }}
                </td>
              </tr>
              <tr style="width:100%;padding:0;height:30px;" :key="'A' + index">
                <td class="mainFirstTd" colspan="4" style="padding:0;">
                  <table
                    class="table table--highlight secondaryTable"
                    style="font-size: 14px !important;width: 100%;height: 100%;margin: 0;table-layout: fixed;"
                  >
                    <template v-for="(fobj, index1) in ft.list">
                      <tr
                        class="featureTr featureValues"
                        :key="index1"
                        style="text-align:center; height:30px;width:100%;box-shadow: 0 3px 3px -2px #c1c1c1;"
                      >
                        <td class="testcase_td" style="width:10%;">
                          {{ fobj.id }}
                        </td>
                        <td
                          class="testcase_td"
                          style="width:40%;text-align:left !important;"
                        >
                          {{ fobj.tc_title }}
                        </td>
                        <td
                          class="testcase_td attach"
                          style="width:40%;text-align:left !important;"
                        >
                          <template
                            v-for="(fname, inx) in getFilePath(
                              fobj.tc_logFileName
                            )"
                          >
                            <a :href="fname" :key="inx"
                              >{{ getFilename(fobj.tc_logFileName)[inx] }}
                            </a>
                          </template>
                        </td>
                        <td class="testcase_td" style="width:10%;">
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
                            style="height: 98%;padding-left: 30px;"
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
                                  style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
                                >
                                  Title:
                                </label>
                                <div style="width: 97%;">
                                  {{ fobj.tc_title }}
                                </div>
                              </div>
                            </div>
                            <div class="form-group tm-form-group">
                              <div class="form-group__text tm-form__text">
                                <label
                                  class="tm-label"
                                  style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
                                >
                                  Description:
                                </label>
                                <div style="width: 97%;">
                                  {{ fobj.tc_description }}
                                </div>
                              </div>
                            </div>
                            <div class="form-group tm-form-group1 row">
                              <div class="col-lg-4 col-md-4">
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
                                  >
                                    Feature:
                                  </label>
                                  <div>{{ fobj.tc_feature }}</div>
                                </div>
                              </div>
                              <div class="col-lg-4 col-md-4">
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
                                  >
                                    Type:
                                  </label>
                                  <div>{{ fobj.tc_type }}</div>
                                </div>
                              </div>
                              <div class="col-lg-4 col-md-4">
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
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
                              <div class="col-lg-4 col-md-4">
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
                                  >
                                    DUT:
                                  </label>
                                  <div>{{ fobj.tc_dut }}</div>
                                </div>
                              </div>
                              <div class="col-lg-4 col-md-4">
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
                                  >
                                    Role:
                                  </label>
                                  <div>{{ fobj.tc_role }}</div>
                                </div>
                              </div>
                              <div class="col-lg-4 col-md-4">
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
                                  >
                                    Platform:
                                  </label>
                                  <div>{{ fobj.tc_platform }}</div>
                                </div>
                              </div>
                              <div class="col-lg-4 col-md-4">
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
                                  >
                                    Tag:
                                  </label>
                                  <div>{{ fobj.tc_tag }}</div>
                                </div>
                              </div>
                            </div>
                            <div class="form-group tm-form-group">
                              <div class="form-group__text tm-form__text">
                                <label
                                  class="tm-label"
                                  style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
                                >
                                  Procedure:
                                </label>
                                <div style="width: 97%;">
                                  {{ getParsedString(fobj.tc_procedure) }}
                                </div>
                              </div>
                            </div>
                            <div class="form-group tm-form-group">
                              <div class="form-group__text tm-form__text">
                                <label
                                  class="tm-label"
                                  style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
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
                            <div class="form-group tm-form-group">
                              <div class="form-group__text tm-form__text">
                                <label
                                  class="tm-label"
                                  style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
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
                              <div class="col-lg-4 col-md-4">
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
                                  >
                                    Execution method:
                                  </label>
                                  <div>{{ fobj.tc_exectution_method }}</div>
                                </div>
                              </div>
                              <div class="col-lg-4 col-md-4">
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
                                  >
                                    Priority:
                                  </label>
                                  <div>{{ fobj.tc_priority }}</div>
                                </div>
                              </div>
                              <div class="col-lg-4 col-md-4">
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
                                  >
                                    Regression:
                                  </label>
                                  <div>{{ fobj.tc_regression }}</div>
                                </div>
                              </div>
                              <div class="col-lg-4 col-md-4">
                                <div class="form-group__text tm-form__text">
                                  <label class="switch">
                                    Smoke:
                                  </label>
                                  <div>{{ fobj.tc_smoke }}</div>
                                </div>
                              </div>
                            </div>
                            <div class="form-group tm-form-group2">
                              <div class="form-group__text tm-form__text">
                                <label
                                  class="tm-label"
                                  style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
                                >
                                  Result:
                                </label>
                                <div>{{ fobj.tc_result }}</div>
                              </div>
                            </div>
                            <div class="form-group tm-form-group1 row">
                              <div class="col-lg-4 col-md-4">
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
                                  >
                                    Version:
                                  </label>
                                  <div>{{ fobj.tc_version }}</div>
                                </div>
                              </div>
                              <div class="col-lg-4 col-md-4">
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
                                  >
                                    Release:
                                  </label>
                                  <div class="release">
                                    {{ fobj.tc_release }}
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-4 col-md-4">
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
                                  >
                                    Customer:
                                  </label>
                                  <div class="customer">
                                    {{ fobj.tc_customer }}
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-4 col-md-4">
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
                                  >
                                    Rally Id:
                                  </label>
                                  <div class="featureId">
                                    {{ fobj.tc_featureId }}
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-4 col-md-4">
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
                                  >
                                    Testcase Owner:
                                  </label>
                                  <div class="testcaseOwner">
                                    {{ fobj.tc_testcaseOwner }}
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-4 col-md-4">
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
                                  >
                                    Test Exec Owner:
                                  </label>
                                  <div class="testExecOwner">
                                    {{ fobj.tc_testExecOwner }}
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-4 col-md-4">
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
                                  >
                                    IFD:
                                  </label>
                                  <div class="ifd">
                                    {{ fobj.tc_ifd }}
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-4 col-md-4">
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
                                  >
                                    CFD:
                                  </label>
                                  <div class="cfd">
                                    {{ fobj.tc_cfd }}
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-4 col-md-4">
                                <div class="form-group__text tm-form__text">
                                  <label
                                    class="tm-label"
                                    style="top: 10px;text-align: left;display: inline-block;max-width: 100%;margin-bottom: 5px;font-weight: 700;"
                                  >
                                    Defects:
                                  </label>
                                  <div class="defects">
                                    {{ fobj.tc_defects }}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="form-group tm-form-group">
                              <div class="form-group__text tm-form__text">
                                <label class="tm-label" for="ddts">
                                  DDTS:
                                </label>
                                <div>{{ fobj.tc_ddts }}</div>
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
      </div>
      <div class="configuration hideSlide">
        Configuration:This Page is under construction.
      </div>
      <div class="testresults hideSlide">
        Test Results: this page is under construction
      </div>
      <div class="scalematrix hideSlide">
        Scale Matrix:This Page is under construction.
      </div>
      <div class="inventory hideSlide">
        Inventory: this page is under construction
      </div>
    </div>
  </div>
</template>
