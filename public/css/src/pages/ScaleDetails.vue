<script>
import { scaleDetails } from "../assets/scaleDetails";
export default {
  name: "ScaleDetails",
  props: ["projectid"],
  data() {
    return {
      scaleDetails: {},
      scaleKeys: [],
    };
  },
  mounted() {
    this.loadScaleDetails();
  },
  watch: {},
  computed: {},
  methods: {
    emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
    loadScaleDetails() {
      this.scaleDetails = scaleDetails;
      this.scaleKeys = Object.keys(this.scaleDetails);
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
  },
};
</script>
<template>
  <div>
    <div
      style="margin-top: 54px;margin-right: 50px;position: absolute;right: 0;"
    >
      <a href="#" onclick="downloadScaleDetails('scaleDetailsDiv')">download</a>
    </div>
    <div class="row summaryrow">
      <div
        id="scaleDetailsDiv"
        style="margin: 15px;
            border: 2px solid #943c9e;
    border-radius: 12px;
    margin-top: 400px;
    width:95%"
      >
        <div
          id="releaseNoteDetails"
          style="
    line-height: 20px;
     font: 400 13px ui-sans-serif !important;
    min-height:300px"
        >
          <table
            id="scaleDetailsTable"
            class="table table--highlight"
            style="height: 100%;width:100%;margin: 0;border-spacing: 0;font: 400 13px ui-sans-serif !important;"
          >
            <thead
              style="
    color: #000;
    font: 400 15px ui-sans-serif !important;"
            >
              <tr style="line-height: 36px;">
                <th
                  style="border-bottom:2px solid #943c9e;width:40%;padding:8px;padding-left:3em;text-align:left;font: 700 14px ui-sans-serif !important"
                >
                  Scale Parameters
                </th>
                <th
                  style="border-bottom:2px solid #943c9e;width:40%;text-align:left;font: 700 15px ui-sans-serif !important"
                >
                  Spitfire 8808 (7.3.1) DX
                </th>
              </tr>
            </thead>
            <tbody class="summaryTableBody">
              <template v-for="(key, index) in scaleKeys">
                <tr
                  :key="index"
                  class="summaryTablesValues"
                  style="line-height: 36px;box-shadow: 0 3px 3px -2px #c1c1c1"
                >
                  <td
                    colspan="2"
                    style="width:100%; word-wrap: break-word;padding:10px; padding-left:3em;text-align:left;font: 700 14px ui-sans-serif !important"
                  >
                    {{ key }}
                  </td>
                </tr>
                <tr
                  v-for="(row, index1) in scaleDetails[key]"
                  :key="index + '_' + index1"
                  class="summaryTablesValues"
                  style="line-height: 36px;box-shadow: 0 3px 3px -2px #c1c1c1"
                >
                  <td
                    style=" word-wrap: break-word; text-align: center;width:50%;padding-left:5em;text-align:left"
                  >
                    {{ row.feature }}
                  </td>
                  <td
                    style=" word-wrap: break-word; text-align: center;width:50%;padding-left:1em;text-align:left"
                  >
                    {{ getParsedString(row.value) }}
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
