<script>
import moment from "moment";
import { SlideXRightTransition } from "vue2-transitions";
import { router } from "@/router";
import ScrollToTop from "../components/global/ScrollToTop";
import { store } from "../store/store";
import { authenticationService } from "@/core/services/auth";

export default {
  name: "PreAuthLayout",
  components: {
    ScrollToTop,
    SlideXRightTransition,
  },
  data() {
    return {
      scrollPosition: 0,
      showBTT: false,
      timeOut: null,
      currCust: null,
      tokenPoll: null,
      showUserModal: false,
      userList: [],
      adduser: false,
      showCreateToken: false,
      newToken: { username: "", token: "" },
      newUser: {
        username: "",
        password: "",
        token: "",
        email: "",
        role: "user",
      },
    };
  },
  computed: {
    utcTimeNow: function() {
      let d1 = new Date();
      return d1;
    },
    currentUser: function() {
      if (localStorage.getItem("currentUser") !== null) {
        return JSON.parse(localStorage.getItem("currentUser")).username;
      }
    },
    isAdmin: function() {
      if (localStorage.getItem("currentUser") !== null) {
        if (
          JSON.parse(
            localStorage.getItem("currentUser")
          ).role.toLowerCase() === "admin"
        ) {
          return true;
        }
      }
      return false;
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
      <header id="rackHeader" class="header header--compressed">
        <div class="header-bar container rackHeaderBar">
          <div class="header-bar__main">
            <div class="header-heading">
              <router-link to="/">
                <img
                  class="main-logo"
                  src="../../public/images/Cisco_Logo_no_TM_Midnight_Blue-RGB.png"
                />
              </router-link>
            </div>
          </div>
          <div class="postauth-header header-toolbar">
            <span class="half-margin-right text-muted">{{ utcTimeNow }}</span>
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
