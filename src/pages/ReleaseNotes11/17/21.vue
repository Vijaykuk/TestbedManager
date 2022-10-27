<script>
import { releaseNotes } from "../assets/releaseNotes";
export default {
  name: "ReleaseNotes",
  props: ["projectid"],
  data() {
    return {
      releaseNotes: [],
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
    getParsedString(str) {
      if (typeof str === "string") {
        let str1 = str.replaceAll("\\t", "    ");
        str1 = str1.replaceAll("\\n", "<br>");
        str1 = str1.replaceAll("\t", "    ");
        str1 = str1.replaceAll("\n", "<br>");
        return str1;
      }
    },
    loadReleaseNotes() {
      this.releaseNotes = this.getParsedString(releaseNotes);
      debugger;
    },
  },
};
</script>
<template>
  <div>
  
    <div class="row summaryrow">
      <div
        id="releaseNoteDiv"
        style="margin: 15px;
    margin-top: 400px;
        border: 2px solid #9aaba8;
    border-radius: 20px;
    width: 95%;"
      >
        <div
          id="releaseNoteDetails"
          style="
    line-height: 20px;
    font: font: 400 13px ui-sans-serif !important;
    background-color: #fff;
    min-height:300px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 20px;"
        >
          <!--
          {{ releaseNotes }}
          -->
          <iframe
            src="./assets/Release_Note.pdf"
            style="width:100%;height:100%;"
            type="application/pdf"
          />
        </div>
      </div>
    </div>
  </div>
</template>
