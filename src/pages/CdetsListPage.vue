<script>
import { testcaseService } from "@/core/services/testcaseService";
import { Tabs, Tab } from "vue-tabs-component";
export default {
  name: "CdetsListPage",
  props: ["selectedCdets", "showExtraPage"],
  mounted() {},
  components: {
    tabs: Tabs,
    tab: Tab,
  },
  data() {
    return {
      statusTabsArr: {},
      statusTabs: [],
    };
  },
  watch: {
    selectedCdets: {
      immediate: true,
      deep: true,
      handler(selectedCdets) {
        this.statusTabs = ["All"];
        this.statusTabsArr = { All: [] };
        for (let i = 0; i < selectedCdets.length; i++) {
          if (this.statusTabs.indexOf(selectedCdets[i].status + " Bugs") >= 0) {
            this.statusTabsArr[selectedCdets[i].status + " Bugs"].push(
              selectedCdets[i]
            );
            this.statusTabsArr["All"].push(selectedCdets[i]);
          } else {
            this.statusTabs.push(selectedCdets[i].status + " Bugs");
            this.statusTabsArr[selectedCdets[i].status + " Bugs"] = [];
            this.statusTabsArr[selectedCdets[i].status + " Bugs"].push(
              selectedCdets[i]
            );
            this.statusTabsArr["All"].push(selectedCdets[i]);
          }
        }
      },
    },
  },
  methods: {
    emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
    maximizeModal() {
      this.emitToParent("maximize");
    },
    minimizeModal() {
      this.emitToParent("minimize");
    },
    closeCdetsTableModal() {
      this.emitToParent("closeCdetsTableModal");
    },
    cdetsStatusTabClicked() {},
  },
};
</script>

<template>
  <div>
    <div
      class="modal__header"
      style="display:flex; justify-content:space-between; margin-bottom:5px;"
    >
      <div class="modal_title">CDETs</div>
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
          v-on:click="closeCdetsTableModal()"
        ></span>
      </span>
    </div>
    <div class="modal__body" style="display:flex; justify-content:center;">
      <div class="cdetsTable" v-show="statusTabs.length > 1">
        <tabs
          id="cdetsStatusTables"
          name="Tabs"
          :options="{ useUrlFragment: false }"
          @clicked="cdetsStatusTabClicked"
          @changed="cdetsStatusTabClicked"
        >
          <template v-for="(StatusTab, index) in statusTabs">
            <tab
              :name="StatusTab"
              class="StatusTab"
              :ref="StatusTab"
              :key="index"
            >
              <div class="cdetsTable1">
                <table
                  id="cdetsTable"
                  class="table table--highlight secondaryTable"
                >
                  <tr>
                    <th class="stickyTh" style="width:10%;text-align:center;">
                      Identifier
                    </th>
                    <th class="stickyTh" style="width:35%;text-align:left;">
                      Headline
                    </th>
                    <th class="stickyTh" style="width:15%;text-align:left;">
                      Component
                    </th>
                    <th class="stickyTh" style="width:15%;text-align:left;">
                      Submitter
                    </th>
                    <th class="stickyTh" style="width:15%;text-align:left;">
                      Status
                    </th>
                    <th class="stickyTh" style="width:10%;text-align:center;">
                      #TCs
                    </th>
                  </tr>
                  <template
                    class="cdetsTr"
                    v-for="(cdetObj, index) in statusTabsArr[StatusTab]"
                  >
                    <tr :key="index">
                      <td style="width:10%;text-align:center;">
                        {{ cdetObj.defect_id }}
                      </td>
                      <td style="width:35%;text-align:left;padding-left:20px">
                        {{ cdetObj.headline }}
                      </td>
                      <td style="width:15%;text-align:left;padding-left:20px">
                        {{ cdetObj.component }}
                      </td>
                      <td style="width:15%;text-align:left;padding-left:20px">
                        {{ cdetObj.submitter }}
                      </td>
                      <td style="width:15%;text-align:left;padding-left:20px">
                        {{ cdetObj.status }}
                      </td>
                      <td style="width:10%;text-align:center;">
                        {{ cdetObj.tcCount }}
                      </td>
                    </tr>
                  </template>
                </table>
              </div>
            </tab>
          </template>
        </tabs>
      </div>
    </div>
  </div>
</template>
