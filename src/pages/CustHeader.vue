<script>
import { router } from "@/router";
import { authenticationService } from "@/core/services/auth";

export default {
  name: "CustHeader",
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
    onChildInteraction(args) {
      if (args === "resetScroll") {
        this.resetScroll();
      }
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
     
   
    
   <!---<div v-if="showUserModal" class="userModal">
      <div
        class="modal__header"
        style="display:flex; justify-content:space-between; margin-bottom:5px;"
      >
        <div class="modal_title">User Account</div>
        <span
          class="icon-close icon-small interaction"
          v-on:click="closeUserModal($event)"
        ></span>
      </div>
      <div class="modal__body" style="display:flex; justify-content:center;">
        <div class="username">
          <h2>{{ currentUser }}</h2>
        </div>
        <div class="userFunctions">
          <ul class="userList">
            <li class="userfunc"><a>Change Password</a></li>
            <li class="userfunc" v-if="isAdmin">
              <a>Change Password for others</a>
            </li>
            <li class="userfunc" v-if="isAdmin">
              <a @click="createuser($event)">Create User</a>
            </li>
            <li class="userfunc">
              <a @click="updateToken($event)">Update Token</a>
            </li>
            <li class="userfunc" v-if="isAdmin">
              <a @click="updateToken($event)">Create Token for others</a>
            </li>
          </ul>
          <div class="addUserBlk" v-if="adduser">
            <div style="color:#005073;font-weight:bold;">
              <h5>{{userTitle}}</h5>
            </div>
            <form
              class="createUser"
              style="padding-left: 30px;
    margin-top: 20px;"
            >
              <div
                class="form-group tm-form-group1 row"
                style="width:100%;display:inline-block;position:relative;margin-bottom: 10px"
              >
                <label class="tm-label" style="width:40%">
                  Username
                </label>
                <input
                  type="text"
                  style="width: 50%;"
                  name="username"
                  :disabled="editEnable"
                  v-model="newUser.username"
                />
              </div>
              <div
                class="form-group tm-form-group1 row"
                style="width:100%;display:inline-block;position:relative;margin-bottom: 10px"
              >
                <label class="tm-label" style="width:40%">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  style="width: 50%;"
                  v-model="newUser.password"
                />
              </div>
              <div
                class="form-group tm-form-group1 row"
                style="width:100%;display:inline-block;position:relative;margin-bottom: 10px"
              >
                <label class="tm-label" style="width:40%">
                  Token Id
                </label>
                <input
                  type="token"
                  name="token"
                  style="width: 50%;"
                  v-model="newUser.token"
                />
              </div>
              <div
                class="form-group tm-form-group1 row"
                style="width:100%;display:inline-block;position:relative;margin-bottom: 10px"
              >
                <label class="tm-label" style="width:40%">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  style="width: 50%;"
                  v-model="newUser.email"
                />
              </div>
              <div
                class="form-group tm-form-group1 row"
                style="width:100%;display:inline-block;position:relative;margin-bottom: 10px"
              >
                <label class="tm-label" style="width:40%">
                  Role
                </label>
                <select
                  v-model="newUser.role"
                  class="type"
                  style="width: 50%;height:24px;"
                >
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </select>
              </div>
              <span style="font-size: 11px;color: #017cad;"
                >Note:Please get token id from "http://tims.cisco.com/" > tools>
                Automation token</span
              >
              <div class="tm_btn-container" style="margin-top:20px">
                <button
                  @click="closeForm($event)"
                  class="btn btn--secondary tmBtn"
                  style="font-size:1.4rem;"
                >
                  Cancel
                </button>
                <button
                 @click="handleSubmit($event)"
                 class="tmBtn btn btn--secondary"
                  style="font-size:1.4rem;"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div class="createTokenBlk" v-if="showCreateToken">
            <div style="color:#005073;font-weight:bold;">
              <h5>{{userTitle}}</h5>
            </div>
            <form
              class="createToken"
              style="padding-left: 30px;
    margin-top: 20px;"
           >
              <div
                class="form-group tm-form-group1 row"
                style="width:100%;display:inline-block;position:relative;margin-bottom: 10px"
              >
                <label class="tm-label" style="width:40%">
                  Username
                </label>
                <input
                  type="text"
                  style="width: 50%;"
                  name="username"
                  disabled="editEnable"
                  v-model="newToken.username"
                />
              </div>
              <div
                class="form-group tm-form-group1 row"
                style="width:100%;display:inline-block;position:relative;margin-bottom: 10px"
              >
                <label class="tm-label" style="width:40%">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  style="width: 50%;"
                  v-model="newUser.password"
                />
              </div>
                <div
                class="form-group tm-form-group1 row"
                style="width:100%;display:inline-block;position:relative;margin-bottom: 10px"
              >
                <label class="tm-label" style="width:40%">
                  Token Id
                </label>
                <input
                  type="token"
                  name="token"
                  style="width: 50%;"
                  v-model="newUser.token"
                />
              </div>
              <div
                class="form-group tm-form-group1 row"
                style="width:100%;display:inline-block;position:relative;margin-bottom: 10px"
              >
                <label class="tm-label" style="width:40%">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  style="width: 50%;"
                  v-model="newUser.email"
                />
              </div>
              <div
                class="form-group tm-form-group1 row"
                style="width:100%;display:inline-block;position:relative;margin-bottom: 10px"
              >
                <label class="tm-label" style="width:40%">
                  Role
                </label>
                <select
                  v-model="newUser.role"
                  class="type"
                  style="width: 50%;height:24px;"
                >
                  <option value="admin">admin</option>
                  <option value="staff">staff</option>
                </select>
              </div>
              <div class="tm_btn-container" style="margin-top:10px">
                <button
                  class="btn btn--secondary tmBtn"
                  @click="closeCreateToken($event)"
                  style="font-size:1.4rem;"
                >
                  Cancel
                </button>
                <button
                 @click="updateTokenClicked($event)"
                  class="tmBtn btn btn--secondary"
                  style="font-size:1.4rem;"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div v-if="isAdmin" style="margin-top: 150px;">
          <h4>Users</h4>
          <div class="allUsers">
            <div
              class="userObj"
              style="width: 110px;display:inline-block;text-align: center;"
              v-for="(user, index) in userList"
              :key="index"
            >
              <img
                :src="getImgUrl()"
                height="50px"
                width="50px"
                style="background-size:100% 100%;margin:30px;margin-bottom: 20px; "
              />
              <div class="customerName" :id="user.id">
                {{ user.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>-->
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
