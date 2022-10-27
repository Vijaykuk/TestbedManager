<script>
import { releaseNotes } from "../assets/releaseNotes";
export default {
  name: "ReleaseNotes",
  props: ["projectid"],
  data() {
    return {
      releaseNotes1: [],
    };
  },
  mounted() {
    this.loadReleaseNotes();
  },
  watch: {},
  computed: {},
  methods: {
    emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
    loadReleaseNotes() {
      this.releaseNotes1 = releaseNotes;
    },
  },
};
</script>
<template>
  <div>
    <div
      style="margin-top: 54px;margin-right: 50px;position: absolute;right: 0;"
    >
      <a href="#" onclick="downloadReleaseNotes('releaseNoteDiv')">download</a>
    </div>
    <div class="row summaryrow">
      <div
        id="releaseNoteDiv"
        style="margin: 15px;
    margin-top: 400px;
        border: 2px solid #4285f4;
    border-radius: 12px;
    width: 95%;"
      >
        <div
          id="releaseNoteDetails"
          style="
    line-height: 20px;
    font: font: 400 13px ui-sans-serif !important;
    background-color: #fff;
    min-height:300px"
        >
        <!-- <iframe
            src="./assets/Release_Note.pdf"
            style="width:100%;height:100%;"
            type="application/pdf"
          />-->
         <!-- <table
            id="releaseNotesTable"
            class="table table--highlight"
            style="height: 100%;width:100%;margin: 0;border-spacing: 0;font: 400 13px ui-sans-serif !important;"
          >
            <thead
              style="
    color: #000;
    font: 400 13px ui-sans-serif !important;"
            >
              <tr class="summaryTableHeadings" style="line-height: 30px;">
                <th
                  style="border-bottom: 2px solid #4285f4;width:25%;padding: 8px;padding-left:3em;text-align:left"
                >
                  Id
                </th>
                <th
                  style="border-bottom: 2px solid #4285f4;width:75%;padding: 8px;padding-left:1em;text-align:left"
                >
                  Headline
                </th>
              </tr>
            </thead>
            <tbody class="summaryTableBody">
              <tr
                v-for="(row, index) in releaseNotes"
                :key="index"
                class="summaryTablesValues"
                style="line-height: 36px;box-shadow: 0 3px 3px -2px #c1c1c1"
              >
                <td
                  style="width:25%; word-wrap: break-word; padding-left:3em;text-align:left"
                >
                  {{ row.id }}
                </td>
                <td
                  style=" word-wrap: break-word; text-align: center;width:75%;padding-left:1em;text-align:left"
                >
                  {{ row.headline }}
                </td>
              </tr>
            </tbody>
          </table>-->
        </div>
      </div>
    </div>
  </div>
</template>
