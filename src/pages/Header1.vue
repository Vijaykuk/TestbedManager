<script>
import { router } from "@/router";
import { authenticationService } from "@/core/services/auth";

export default {
  name: "Header1",
  components: {
   
  },
  data() {
    return {
      userTitle:"",
      editEnable: false,
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
    customer: function() {
      if (localStorage.getItem("customer") !== null) {
        return localStorage.getItem("customer");
      }
      else{
      return "";
      }
    },
    showAppTitle: function(){
       if (localStorage.getItem("customer") === null || localStorage.getItem("customer") === undefined) {
       return false;
       }
       else{
       return true;
       }
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
       emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
    onChildInteraction(args) {
      if (args === "resetScroll") {
        this.resetScroll();
      }
    },
    showMaster(){
       this.emitToParent("showMaster");
    },
    showSidebar(){
      this.emitToParent("showSidebar");
    },
    showMenubar(){
       this.emitToParent("showMenubar");
    },
    themeClicked(){
      this.emitToParent('themeClicked')
    },
    showCustGraphs(){
      this.emitToParent("showGraphs");
    },
    homeClicked(){
       router.push({ name: "HomePage" });
    },
    logoutClicked(e) {
      this.logout(e);
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
    showUserAccount(e) {
      this.showUserModal = true;
      this.adduser=false;
      this.loadUsers();
      e.preventDefault();
    },
    getImgUrl() {
      return require("../assets/images/default.png");
    },
    loadUsers() {
      let self = this;
      if (this.currentUser.toLowerCase() === "admin") {
        authenticationService.getUserList().then(
          (data) => {
            self.userList = data;
          },
          (error) => {}
        );
      }
    },
    closeUserModal(e) {
      this.showUserModal = false;
      this.adduser=false;
      e.preventDefault();
    },
    logout(e) {
      authenticationService.logout();
      router.push({ name: "login" });
      e.preventDefault();
    },
    createuser(e) {
      this.userTitle="Create User";
      this.adduser = true;
       this.newUser = {
        username: "",
        password: "",
        token: "",
        email: "",
        role: "user",
      };
      e.preventDefault();
    },
    updateToken(e) {
      this.editEnable = true;
      this.newUser = { username: this.currentUser, token: "" };
      this.editEnable=true;
      this.userTitle="Update Token";
      this.adduser=true;
      e.preventDefault();
    },
    closeCreateToken() {
      this.newToken = { username: "", token: "" };
      this.showCreateToken = false;
    },
    updateTokenClicked(e) {
      // code here this.adduser = true;
      e.preventDefault();
    },
    createtokenforothers() {},
    changepassword() {},
    changepasswordforothers() {},
    closeForm(e) {
      this.adduser = false;
      this.newUser = {
        username: "",
        password: "",
        token: "",
        email: "",
        role: "user",
      };
      e.preventDefault();
    },
    gotoLandingPage(){
         router
        .push({
          name: "LandingPage",
        })
        .catch(() => {});
    },
      gotoCfdsListPage(){
         router
        .push({
          name: "CfdsListPage",
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSubmit(e) {
      let self = this;
      let user = this.newUser;
      if (user.name != "" || user.password != "") {
        this.loading = true;
        this.loadingMessage = "Creating user..";
        authenticationService.createUser(user).then(
          (data) => {
            self.adduser = false;
            self.loading = false;
            self.loadUsers();
          },
          (error) => {
            self.loading = false;
            self.showErrorModal = true;
            self.modalErrorMessage =
              "Error while creating user, Please try again later";
          }
        );
      }
      e.preventDefault();
    },
  },
  watch: {},
};
</script>

<template>
  <div>
      <header id="rackHeader" class="header header--compressed">
        <div class="header-bar container rackHeaderBar">
          <div class="header-bar__main">
            <div class="header-heading">
              <router-link to="HomePage">
                <img
                  class="main-logo"
                  src="../../public/images/Cisco_Logo_no_TM_Midnight_Blue-RGB.png"
                />
              </router-link>
             
            </div>
          </div>
          <div class="postauth-header header-toolbar">
          <!--<div class="firstHeader">
            <a v-if="currentUser" @click="showUserAccount($event)"
              ><span class="half-margin-right">
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
          </div>-->
          <div class="secondHeader">
          <span style="    margin-right: 35px;">
          <a @click="gotoLandingPage()">
            Home
          </a>
          </span>
           <span style="margin-right:35px;margin-left:10px">
           <a @click="showSidebar()">
          Releases
          </a></span>
           <span style="margin-right:35px;margin-left:10px">
           <a @click="showMaster()">
          Master
          </a></span>

            <span style="margin-right:35px;margin-left:10px">
           <a @click="gotoCfdsListPage()">
          CFDs
          </a></span>
            <span style="margin-right:35px;margin-left:10px">
           <!-- <a href="http://csmart-lnx:8082/TestbedManger/#/rackConfigPage/1"> -->
           Device Manager
          <!-- </a> -->
          </span>

          <div class="menuIcons">
         <span style="margin-right:10px;margin-left:10px">
           <a  @click="showCustGraphs()">
             <i class="icon icon-graph"> </i>
          </a></span>
         <span style="margin-right:10px;margin-left:10px">
           <!-- <a  @click="homeClicked()"> -->
             <i class="icon icon-home"> </i>
          <!-- </a> -->
          </span>
           <span style="margin-right:10px;margin-left:10px">
           <a  @click="themeClicked()">
             <i class="icon icon-picture-in-picture"> </i>
          </a></span>
          <span style="margin-right:10px;margin-left:10px">
           <a  @click="showMenubar()">
             <i class="icon icon-more"> </i>
          </a></span></div>
          </div>
          </div>
        </div>
      </header>
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
