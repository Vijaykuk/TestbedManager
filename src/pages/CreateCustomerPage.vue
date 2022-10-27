<script>
import { testcaseService } from "@/core/services/testcaseService";

export default {
  name: "CreateCustomerPage",
  props: ["releases"],
  mounted() {},
  components: {},
  data() {
    return {
      logoFile: null,
      networkImage: null,
      topologyImage: null,
      configFiles: {},
      showSMUPrompt: false,
      selectedRelease: "",
      selectedPlatform: "",
      selectedRev: "",
      selectedSMUs: "",
      custObj: {
        name: "",
        franchise: "",
        releases: "",
        headline: "",
        platformDetails: {
          ASR9K: { roles: "", chassisList: "", cardList: "" },
          NCS5500: { roles: "", chassisList: "", cardList: "" },
          NCS5K: { roles: "", chassisList: "", cardList: "" },
          _8000: { roles: "", chassisList: "", cardList: "" },
        },
        roleDetails: {},
        prodImages: {
          "732": {
            ASR9K: {
              revs: "",
              status: "",
            },
          },
        },
        smuDetails: {
          "732": {
            ASR9K: {
              rev1: "",
              rev2: "",
            },
          },
        },
        opticDetails: {
          ASR9K: {
            optics: "",
          },
          NCS5500: {
            optics: "",
          },
        },
        orgDetails: {},
      },
      logoUploaded: false,
      networkImageUploaded: false,
      topologyImageUploaded: false,
      custPlatforms: ["ASR9K", "NCS5500", "NCS5K", "_8000"],
      prImages: [],
    };
  },
  methods: {
    emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
    addRowProdImage() {
      this.prImages.push({
        release: "",
        platform: "",
        revs: "",
        status: "inactive",
      });
    },
    showAddSmuModalClick(rel, platform, rev) {
      this.selectedRelease = rel;
      this.selectedPlatform = platform;
      this.selectedRev = rev;
      if (this.custObj["smuDetails"][rel][platform][rev]) {
        this.selectedSMUs = this.custObj["smuDetails"][rel][platform][rev];
      } else {
        this.selectedSMUs = "";
      }
      this.showSMUPrompt = true;
    },
    closeAddSMUModal() {
      this.selectedRelease = "";
      this.selectedPlatform = "";
      this.selectedRev = "";
      this.selectedSMUs = "";
      this.showSMUPrompt = false;
      event.preventDefault();
    },
    saveSMUs() {
      this.custObj["smuDetails"][this.selectedRelease][this.selectedPlatform][
        this.selectedRev
      ] = this.selectedSMUs;
      this.showSMUPrompt = false;
      event.preventDefault();
    },
    getRelsForPRImage() {
      let rels = this.custObj.releases.split(",");
      let platforms = this.custPlatforms;
      let tempRels = [];
      for (let i = 0; i < rels.length; i++) {
        let prRel = this.custObj["prodImages"][rels[i]];
        if (prRel) {
          let prs = Object.keys(prRel);
          let prFlag = true;
          for (let k = 0; k < platforms.length; k++) {
            if (prs.indexOf(platforms[k]) > -1) {
              prFlag = false;
            }
          }
          if (!prFlag) {
            tempRels.push(rels[i]);
          }
        } else {
          tempRels.push(rels[i]);
        }
      }
      return tempRels;
    },
    getPlatformsForPRImage(prRel) {
      let platforms = this.custPlatforms;
      let platforms1 = platforms;
      let tPlatforms = Object.keys(this.custObj["prodImages"][prRel]);
      let prFlag = false;
      if (tPlatforms) {
        for (let k = 0; k < tPlatforms.length; k++) {
          for (let s = 0; s < platforms.length; s++) {
            if (tPlatforms[k] === platforms[s]) {
              platforms1 = platforms1.splice(s, 1);
            }
          }
        }
      }
      return platforms1;
    },
    onConfigFileChange(platform, role) {
      const file = e.target.files[0];
      let fileName = platform + "_" + role;
      this.configFiles[fileName] = file;
    },
    logoFileUploded(e) {
      const file = e.target.files[0];
      this.logoFile = file;
      this.logoUploaded = true;
    },

    closeAddCustomerModal() {
      this.emitToParent("closeAddCustomerModal");
    },
    autoResize() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    },
    getDataListOptions() {
      let tempSelectedValues = this.custObj.releases;
      let releases = this.releases;
      let selectedValues = tempSelectedValues.split(",");
      let list = [];
      if (tempSelectedValues === "") {
        return releases;
      } else {
        for (let k = 0; k < releases.length; k++) {
          for (let j = 0; j < selectedValues.length; j++) {
            if (selectedValues.indexOf(releases[k]) < 0) {
              list.push(tempSelectedValues + "," + releases[k]);
            }
          }
        }
        this.list;
      }
    },
    getRolesForPlatforms() {
      let roles = [],
        roleList = [];
      let platforms = this.custPlatforms;
      if (Object.keys(this.custObj.roleDetails).length <= 0) {
        // let platforms=Object.keys(this.custObj.platformDetails);
        for (let s = 0; s < platforms.length; s++) {
          roles = this.custObj.platformDetails[platforms[s]].roles;
          roleList = roles ? roles.split(",") : [];
          if (roles != "") {
            for (let r = 0; r < roleList.length; r++) {
              this.custObj.roleDetails[roleList[r]] = {};
              this.custObj.roleDetails[roleList[r]][platforms[s]] = {
                chassisList: "",
              };
            }
          }
        }
      } else {
        // let platforms=Object.keys(this.custObj.platformDetails);
        for (let s = 0; s < platforms.length; s++) {
          roles = this.custObj.platformDetails[platforms[s]].roles;
          roleList = roles ? roles.split(",") : [];
          if (roles != "") {
            for (let r = 0; r < roleList.length; r++) {
              if (
                Object.keys(this.custObj.roleDetails).indexOf(roleList[r]) < 0
              ) {
                this.custObj.roleDetails[roleList[r]] = {};
                this.custObj.roleDetails[roleList[r]][platforms[s]] = {
                  chassisList: "",
                };
              } else {
                if (
                  Object.keys(this.custObj.roleDetails[roleList[r]]).indexOf(
                    platforms[s]
                  ) < 0
                ) {
                  this.custObj.roleDetails[roleList[r]][platforms[s]] = {
                    chassisList: "",
                  };
                }
              }
            }
          }
        }
      }
    },
    saveCustomer() {
      let json_obj = {};
      var form_data = new FormData();
      json_obj = { ...this.custObj };
      form_data.append("jsonObj", JSON.stringify(json_obj));
      if (this.logoUploaded) {
        form_data.append("logoFile", this.logoFile);
      }
      if (this.networkImageUploaded) {
        form_data.append("networkImage", this.networkImage);
      }
      if (this.topologyImageUploaded) {
        form_data.append("topologyImage", this.topologyImage);
      }
      if (Object.keys(this.configFiles).length > 0) {
        form_data.append("configFiles", this.configFiles);
      }
      this.loading = true;
      this.loadingMessage = "Updating Testcase...";
      testcaseService.createCustomerDetails(form_data).then(
        (data) => {
          debugger;
        },
        (error) => {
          alert("error", error);
        }
      );
    },
  },
};
</script>
<template>
  <div id="add-customer-wrapper" style="width:100%">
    <div
      class="modal__header"
      style="display:flex; justify-content:space-between; margin-bottom:5px;"
    >
      <div class="modal_title">Create Customer</div>
      <span
        class="icon-close icon-small interaction"
        v-on:click="closeAddCustomerModal()"
      ></span>
    </div>
    <div class="modal__body" style="display:flex; justify-content:center;">
      <div class="customerwrapper" style="width:100%">
        <div class="saveButtonContainer" style="float:right;position:absolute">
          <button
            class="btn btn--secondary tmBtn"
            @click="closeAddCustomerModal()"
            style="font-size:1.4rem;"
          >
            Cancel
          </button>
          <button
            class="btn btn--secondary tmBtn"
            @click="saveCustomer()"
            style="font-size:1.4rem;"
          >
            Save
          </button>
        </div>
        <div class="customerForm" style="width:50%; text-align:left;">
          <h4>Customer Details:</h4>
          <div class="form-group__text tm-form__text customerInputWrapper">
            <label class="tm-label customerLabel">
              Customer Name
            </label>
            <input
              type="text"
              name="customerName"
              class="customerInput"
              v-model="custObj.name"
            />
          </div>
          <div class="form-group__text tm-form__text customerInputWrapper">
            <label class="tm-label customerLabel">
              Franchise
            </label>
            <input
              type="text"
              name="customerFranchice"
              class="customerInput"
              v-model="custObj.franchise"
            />
          </div>
          <div class="form-group__text tm-form__text customerInputWrapper">
            <label class="tm-label customerLabel">
              Headline
            </label>
            <textarea
              v-model="custObj.headline"
              style="display: block;"
              class="customerTextArea"
              @enter="autoResize"
              @change="autoResize"
              @load="autoResize"
              height="200px"
            ></textarea>
          </div>
          <div class="form-group__text tm-form__text customerInputWrapper">
            <label class="tm-label customerLabel">
              Logo
            </label>
            <input
              type="file"
              name="customerLogo"
              class="customerInput"
              @change="logoFileUploded()"
            />
          </div>
          <div class="form-group__text tm-form__text customerInputWrapper">
            <label class="tm-label customerLabel">
              Release
            </label>
            <input
              type="text"
              @change="getDataListOptions(releases)"
              name="customerRelease"
              class="customerInput"
              v-model="custObj.releases"
              list="customerReleaseList"
              multiple
            />
            <datalist id="customerReleaseList">
              <template v-for="(rel, ind) in releasesList">
                <option :key="ind" :value="rel">{{ rel }}</option>
              </template>
            </datalist>
          </div>
        </div>
        <div
          class="platformForm"
          style="width:100%; text-align:left;margin-top:30px;"
        >
          <h4>Platform Details:</h4>
          <table class="custPlatformTable table--highlight secondaryTable">
            <tr>
              <th class="weeklyTableText1">
                Platform
              </th>
              <th class="weeklyTableText1">
                Roles
              </th>
              <th class="weeklyTableText1">
                Chassis List
              </th>
              <th class="weeklyTableText1">
                Card List
              </th>
            </tr>
            <template v-for="(pObj, inx) in custPlatforms">
              <tr :key="pObj + '_' + inx">
                <td class="weeklyTableText1">{{ pObj }}</td>
                <td class="weeklyTableText1">
                  <input
                    type="text"
                    @change="getRolesForPlatforms()"
                    class="weeklyTableText"
                    v-model="custObj['platformDetails'][pObj].roles"
                  />
                </td>
                <td class="weeklyTableText1">
                  <input
                    type="text"
                    class="weeklyTableText"
                    v-model="custObj['platformDetails'][pObj].chassisList"
                  />
                </td>
                <td class="weeklyTableText1">
                  <input
                    type="text"
                    class="weeklyTableText"
                    v-model="custObj['platformDetails'][pObj].cardList"
                  />
                </td>
              </tr>
            </template>
          </table>
        </div>

        <div
          class="rolesForm"
          style="width:100%; text-align:left;margin-top:30px;"
        >
          <h4>Roles Details:</h4>
          <table class="custPlatformTable table--highlight secondaryTable">
            <tr>
              <th class="weeklyTableText1">
                Roles
              </th>
              <th class="weeklyTableText1">
                Platform
              </th>
              <th class="weeklyTableText1">
                Chassis List
              </th>
              <th class="weeklyTableText1">
                Configuration
              </th>
            </tr>
            <template v-for="rObj in Object.keys(custObj['roleDetails'])">
              <template
                v-for="(pObj, index1) in Object.keys(
                  custObj['roleDetails'][rObj]
                )"
              >
                <tr :key="pObj + '_' + rObj + '_' + index1">
                  <td class="weeklyTableText1">{{ rObj }}</td>
                  <td class="weeklyTableText1">{{ pObj }}</td>
                  <td class="weeklyTableText1">
                    <input
                      type="text"
                      class="weeklyTableText"
                      v-model="custObj['roleDetails'][pObj][rObj].chassisList"
                    />
                  </td>
                  <td class="weeklyTableText1">
                    <input
                      type="file"
                      class="weeklyTableText"
                      @change="onConfigFileChange(rObj, pObj)"
                    />
                  </td>
                </tr>
              </template>
            </template>
          </table>
        </div>
        <div
          class="prodImagesForm"
          style="width:100%; text-align:left;margin-top:30px;"
        >
          <h4>
            Prod Images:<a
              @click="addRowProdImage"
              style="text-decoration:none !important;"
              ><span><i class="icon icon-plus"></i></span
            ></a>
            <a
              @click="saveRowProdImage"
              style="text-decoration:none !important;"
              ><span><i class="icon icon-save"></i></span
            ></a>
          </h4>
          <table class="custPlatformTable table--highlight secondaryTable">
            <tr>
              <th class="weeklyTableText1">
                Release
              </th>
              <th class="weeklyTableText1">
                Platform
              </th>
              <th class="weeklyTableText1">
                Revs
              </th>
              <th class="weeklyTableText1">
                Status
              </th>
            </tr>
            <template v-for="rlObj in Object.keys(custObj['prodImages'])">
              <template
                v-for="(plObj, ind1) in Object.keys(
                  custObj['prodImages'][rlObj]
                )"
              >
                <tr :key="rlObj + '_' + plObj + '_' + ind1">
                  <td class="weeklyTableText1">{{ rlObj }}</td>
                  <td class="weeklyTableText1">{{ plObj }}</td>
                  <td class="weeklyTableText1">
                    <template
                      v-for="(rev, inj) in custObj['prodImages'][rlObj][
                        plObj
                      ].revs.split(',')"
                    >
                      <a
                        :key="rlObj + '_' + plObj + '_' + rev + '_' + inj"
                        @click="showAddSmuModalClick(rlObj, plObj, rev)"
                        >{{ rev }}</a
                      >,
                    </template>
                  </td>
                  <td class="weeklyTableText1">
                    <select
                      v-model="custObj['prodImages'][rlObj][plObj].status"
                      class="customerInput"
                      @change="onChange($event)"
                    >
                      <option value="active">active</option>
                      <option value="inactive">inactive</option>
                    </select>
                    />
                  </td>
                </tr>
              </template>
            </template>

            <template v-for="(prImageObj, ins) in prImages">
              <tr :key="'prImages_' + ins">
                <td>
                  <select
                    v-model="prImageObj.release"
                    class="customerInput"
                    @change="onChange($event)"
                  >
                    <template v-for="(rel1, in1) in getRelsForPRImage()">
                      <option :key="'rel1_' + in1" :value="rel1">{{
                        rel1
                      }}</option>
                    </template>
                  </select>
                </td>
                <td>
                  <select
                    v-model="prImageObj.platform"
                    class="customerInput"
                    @change="onChange($event)"
                  >
                    <template
                      v-for="(p1, inp1) in getPlatformsForPRImage(
                        prImageObj.release
                      )"
                    >
                      <option :key="'plat1_' + inp1" :value="p1">{{
                        p1
                      }}</option>
                    </template>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    name="prodImageRevs"
                    class="customerInput"
                    v-model="prImageObj.revs"
                  />
                </td>
                <td>
                  <select
                    v-model="prImageObj.status"
                    class="customerInput"
                    @change="onChange($event)"
                  >
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                  </select>
                </td>
              </tr>
            </template>
          </table>
        </div>
        <div
          class="imageForm"
          style="width:100%; text-align:left;margin-top:30px;"
        >
          <h4>Network/Topology Diagrams:</h4>
        </div>

        <div
          class="orgForm"
          style="width:100%; text-align:left;margin-top:30px;"
        >
          <h4>Organition Details:</h4>
        </div>
        <div v-if="showSMUPrompt" class="addSMUModal">
          <div
            class="modal__header"
            style="display:flex; justify-content:space-between; margin-bottom:5px;"
          >
            <div class="modal_title">Add SMUs</div>
          </div>
          <div
            class="modal__body"
            style="display:flex; justify-content:center;"
          >
            <div style="width:100%">
              <div class="customerInputWrapper">
                <label class="tm-label customerLabel">
                  Release
                </label>
                <input
                  type="text"
                  name="release"
                  class="customerInput"
                  v-model="selectedRelease"
                  readonly
                />
              </div>
              <div class="customerInputWrapper">
                <label class="tm-label customerLabel">
                  Platform
                </label>
                <input
                  type="text"
                  name="platform"
                  class="customerInput"
                  v-model="selectedPlatform"
                  readonly
                />
              </div>
              <div class="customerInputWrapper">
                <label class="tm-label customerLabel">
                  REV Name
                </label>
                <input
                  type="text"
                  name="reName"
                  class="customerInput"
                  v-model="selectedRev"
                  readonly
                />
              </div>
              <div class="customerInputWrapper">
                <label class="tm-label customerLabel">
                  SMUs
                </label>
                <input
                  type="text"
                  name="smus"
                  class="customerInput"
                  v-model="selectedSMUs"
                />
                <div class="tm_btn-container" style="width:100%">
                  <button
                    class="btn btn--secondary tmBtn"
                    @click="closeAddSMUModal()"
                    style="font-size:1.4rem;"
                  >
                    Cancel
                  </button>
                  <button
                    class="btn btn--secondary tmBtn"
                    @click="saveSMUs()"
                    style="font-size:1.4rem;"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.customerNotes {
  width: 100%;
  color: #000;
  font-size: 13px;
  font-weight: 400;
  padding-top: 10px;
}
.weeklyTableText1 {
  text-align: center;
  border: 1px solid #ddd !important;
  height: 40px !important;
}
.weeklyTableText {
  text-align: center;
  width: 100% !important;
}
.custPlatformTable {
  width: 98%;
  margin-top: 20px;
  margin-left: 20px;
  border: 1px solid #d1d1d1;
}
.customerInputWrapper {
  margin: 15px;
  display: flex;
}
.customerLabel {
  width: 30%;
}
.customerTextArea {
  width: 70%;
}
.customerInput {
  width: 70%;
  line-height: 30px;
}
</style>
