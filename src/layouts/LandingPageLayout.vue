<script>
import moment from "moment";
import { SlideXRightTransition } from "vue2-transitions";
import { router } from "@/router";
import ScrollToTop from "../components/global/ScrollToTop";
import { store } from "../store/store";
import { authenticationService } from "@/core/services/auth";

export default {
  name: "LandingPageLayout",
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
     logoutClicked(e) {
      this.logout(e);
      e.preventDefault();
    },
     logout(e) {
      authenticationService.logout();
      router.push({ name: "login" });
      e.preventDefault();
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
     <header id="rackHeader" class="header header1 header--compressed">
        <div class="header-bar header-bar1 container rackHeaderBar">
          <div class="postauth-header header-toolbar header-toolbar1">
            <a v-if="currentUser"
              ><span class="half-margin-right" style="color:black">
                <strong>{{ currentUser }}</strong>
              </span></a
            >
            <a v-else @click="logout($event)"
              ><span class="half-margin-right">
                <strong>Login</strong>
              </span></a
            >
            <button
              v-if="currentUser"
              class="btn btn--primary lg_addBtn"
              @click="logoutClicked($event)"
            >
              <span
                v-tooltip.right="{
                  html: 'logoutContent',
                  class: 'cisco-tooltip',
                }"
              >
                <i class="icon icon-sign-out"> </i>
              </span>
              <div id="logoutContent">
                Logout
              </div>
            </button>
          </div>
        </div>
      </header>
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
