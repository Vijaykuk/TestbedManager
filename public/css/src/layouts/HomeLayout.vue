<script>
import moment from "moment";
import { SlideXRightTransition } from "vue2-transitions";
import { router } from "@/router";
import ScrollToTop from "../components/global/ScrollToTop";
import { store } from "../store/store";

export default {
  name: "HomeLayout",
  components: {
    ScrollToTop,
    SlideXRightTransition,
  },
  data() {
    return {
      currentUser: "Admin",
      scrollPosition: 0,
      showBTT: false,
      timeOut: null,
      currCust: null,
      tokenPoll: null,
    };
  },
  computed: {
    utcTimeNow: function() {
      let d1 = new Date();
      return d1;
    },
    customer: function() {
      if (localStorage.getItem("customer") !== null) {
        return localStorage.getItem("customer");
      }
    },
  },
  methods: {
    onChildInteraction(args) {
      if (args === "resetScroll") {
        this.resetScroll();
      }
    },
    setScrollPosition() {
      let element = document.getElementById("main-content-area");
      let scrollPosition = element.scrollTop;
      this.renderBTT(scrollPosition);
    },
    resetScroll() {
      let element = document.getElementById("main-content-area");
      element.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    renderBTT(position) {
      if (position > 900) {
        this.showBTT = true;
      } else {
        this.showBTT = false;
      }
    },
  },
  watch: {},
};
</script>

<template>
  <div class="content-fluid">
    <main>
      <div
        id="main-content-area"
        class="content base-margin-bottom"
        @scroll="setScrollPosition"
      >
        <div class="container">
          <router-view />
          <slide-x-right-transition>
            <ScrollToTop
              key="BTT"
              v-show="showBTT"
              v-on:child="onChildInteraction"
            />
          </slide-x-right-transition>
        </div>
      </div>
      <div class="clearfix">
        <br />
        <br />
        <br />
      </div>
    </main>
  </div>
</template>
<style scoped>
#main-content-area {
  overflow-y: scroll;
}
.postauth-header {
  font-size: 0.9em;
}
</style>
