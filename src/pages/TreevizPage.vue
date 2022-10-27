<script>
import * as Treeviz from "treeviz";
import Popper from "popper.js";
import ClickOutside from "vue-click-outside";

var data = [
  { id: 1, text_1: "Father", father: null },
  { id: 2, text_1: "Child A", father: 1 },
  { id: 3, text_1: "Child B", father: 1 },
  { id: 4, text_1: "Subchild C", father: 2 },
];

export default {
  name: "TreevizPage",
  props: [
    "idvalue",
    "nodeClass",
    "treeData",
    "isHorizantal",
    "revChartFlag",
    "revReleases",
    "selectedR_Release",
  ],
  data() {
    return {
      boundariesElement: null,
      isPopperVisible: false,
      myTree: {},
    };
  },
  components: [Popper, ClickOutside],
  mounted() {
    // Define and configure a tree object
    let self = this;
    
    self.myTree = Treeviz.create({
      htmlId: this.idvalue,
      idKey: "id",
      colorField: "#fff",
      hasFlatData: true,
      relationnalField: "father",
      hasPan: false,
      hasZoom: false,
      nodeWidth: 65,
      nodeHeight: 25,
      mainAxisNodeSpacing: 2,
      isHorizontal: false,
      renderNode: function(node) {
        if (this.isHorizontal === "true") {
          return (
            "<div class='box " +
            this.nodeClass +
            "' style='border-color:#ddd;box-shadow: none;font-size:13px;cursor:pointer;height:" +
            node.settings.nodeHeight +
            "px; width:" +
            node.settings.nodeWidth +
            "px;display:flex;flex-direction:column;justify-content:center;align-items:center;background-color:" +
            node.data.color +
            ";border-radius:5px;line-height: 20px !important;'><div><strong>" +
            node.data.text_1 +
            "</strong></div></div>"
          );
        } else {
          return (
            "<div class='box " +
            this.nodeClass +
            "'' style='border-color:#ddd;box-shadow: none;font-size:13px;cursor:pointer;height:" +
            node.settings.nodeHeight +
            "px; width:" +
            node.settings.nodeWidth +
            "px;display:flex;flex-direction:column;justify-content:center;align-items:center;background-color:" +
            node.data.color +
            ";border-radius:5px;line-height: 20px !important;'><div><strong>" +
            node.data.text_1 +
            "</strong></div></div>"
          );
        }
      },

      linkWidth: (nodeData) => 2,
      linkShape: "quadraticBeziers",
      linkColor: (nodeData) => "#B0BEC5",
      onNodeClick: (e, nodeData) => {
        self.isPopperVisible = true;
        self.boundariesElement = e.currentTarget;
        self.treeNodePopper(e);
        debugger;
      },
    });
    if(self.treeData.length>0)
     self.myTree.refresh(self.treeData);
    

    // Display the tree based on the data
   
  },
  watch: {
    treeData: {
      handler(treeData) {
        this.myTree.refresh(treeData);
      },
      deep: true,
    },
  },
  methods: {
    emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
    r_releaseClicked(rel) {
      this.isPopperVisible = false;
      this.emitToParent("r_releaseClicked", rel);
    },
    treeNodePopper(evt) {
      if (this.popper) {
        this.popper.destroy();
      }

      this.popper = new Popper(
        this.referenceObject(evt),
        this.$refs.rel_popup,
        {
          placement: "right-start",
          modifiers: {
            preventOverflow: {
              boundariesElement: evt.currentTarget,
            },
          },
        }
      );

      let otherRels = document.querySelectorAll("other_rel");
      for (let k = 0; k < otherRels.length; k++) {
        otherRels[t].removeEventListener("click", function() {});
        otherRels[t].addEventListener("click", function(e) {
          console.log("clicked");
          debugger;
        });
        debugger;
      }

      // Recalculate position
      this.$nextTick(() => {
        debugger;
        this.popper.scheduleUpdate();
      });
    },
    close() {
      this.isPopperVisible = false;
      this.opened = false;
      this.contextData = null;
    },
    referenceObject(evt) {
      let left = evt.clientX;
      let top = evt.clientY;
      let right = left;
      let bottom = top;
      const clientWidth = 1;
      const clientHeight = 1;
      if (evt.currentTarget.classList[0] === "collapsibleReleases") {
      }

      if (evt.currentTarget.classList[0] === "logFiles") {
        right =
          evt.currentTarget.offsetParent.offsetParent.offsetParent.offsetTop;
        bottom =
          evt.currentTarget.offsetParent.offsetParent.offsetParent.offsetLeft;
      }

      function getBoundingClientRect() {
        return {
          left,
          top,
          right,
          bottom,
        };
      }

      let obj = {
        getBoundingClientRect,
        clientWidth,
        clientHeight,
      };
      return obj;
    },
  },
};
</script>
<template>
  <div class="treeVizWrapper">
    <div class="treeChart" :id="idvalue" style="height:450px;width:550px;padding-left:30px;padding-top:20px;"></div>
    <div
      v-if="isHorizantal === 'false' && isPopperVisible"
      ref="rel_popup"
      class="relNodes"
      v-click-outside="close"
    >
      <div
        v-for="(rel, inc) in Object.keys(revReleases)"
        class="rels"
        :key="'rel_' + inc"
      >
        <a
          @click="r_releaseClicked(rel)"
          class="other_rel"
          style=""
          v-if="selectedR_Release != rel"
          >{{ rel }}</a
        >
      </div>
    </div>
  </div>
</template>
<style>
.relNodes {
  top: 30px !important;
  left: 80px !important;
  width: 90px !important;
  text-align: center;
  background: #87ceeb !important;
  border: 1px solid #6d6b6b !important;
}
.other_rel {
  padding: 2px !important;
  border-bottom: 1px solid rgb(109, 107, 107) !important;
  text-decoration: none !important;
  width: 95% !important;
  padding-left: 25px !important;
}
.other_rel:hover {
  text-decoration: aqua !important;
}
</style>
