<script>
import { router } from "@/router";
import { store } from "../store/store";
import { required } from "vuelidate/lib/validators";
import { testcaseService } from "@/core/services/testcaseService";
import { authenticationService } from "@/core/services/auth";

export default {
  name: "LoginPage",
  data() {
    return {
      showAdmin: false,
      username: "",
      password: "",
      username1: "admin",
      password1: "",
      token1: "",
      email1: "",
      loginsubmitted: false,
      adminsubmitted: false,
      loading: false,
      returnUrl: "",
      error: "",
      showCreateAdmin: false,
    };
  },
  mounted() {
    this.checkAdmin();
  },
  // eslint-disable-next-line consistent-return
  created() {
    // Redirect to the home page if user is already logged in
    if (authenticationService.currentUserValue) {
      return router.push({ name: "CustomerListPage" });
    }

    // Otherwise, set redirect URL to what's set in the
    // query or home if nothing is set
    this.returnUrl = this.$route.query.returnUrl || "/";
  },
  validations: {
    username: { required },
    password: { required },
    username1: { required },
    password1: { required },
  },
  methods: {
    checkAdmin() {
      debugger;
      authenticationService.checkadmin().then(
        (data) => {
          if (data.admin === "True" || data.admin === true) {
            this.showAdmin = false;
          } else {
            this.showAdmin = true;
          }
        },
        (error) => {}
      );
    },
    onSubmitCreateAdmin(event) {
      this.adminsubmitted = true;
      this.$v.$touch();
      if (this.$v.username1.$invalid && this.$v.password1.$invalid) {
        return;
      }
      // Set loading state
      this.loading = true;
      // Log in using auth service
      let self = this;
      let adminObj = {
        username: this.username1,
        password: this.password1,
        email: this.email1,
        token: this.token1,
        role: "admin",
      };
      authenticationService.createUser(adminObj).then(
        (user) => {
          debugger;
          router.push({ name: "login" });
          location.reload();
          //.let payload = user.id;
          // store.commit("setCurrentCustomer", payload);
        },
        (error) => {
          debugger;
          if (error.non_field_errors) {
            let [errors] = error.non_field_errors;
            this.error = errors;
          } else {
            if (error.message) {
              this.error = error.message;
            } else {
              this.error = error.error;
            }
          }
          this.loading = false;
        }
      );
      event.preventDefault();
    },
    onSubmit(event) {
      this.loginsubmitted = true;
      // Stop here if form is invalid
      this.$v.$touch();
      if (this.$v.username.$invalid && this.$v.password.$invalid) {
        return;
      }
      // Set loading state
      this.loading = true;
      // Log in using auth service
      let self = this;
      authenticationService.login(this.username, this.password).then(
        (user) => {
          debugger;
          router.push({ name: "CustomerReleasesPage" });
          //.let payload = user.id;
          // store.commit("setCurrentCustomer", payload);
        },
        (error) => {
          debugger;
          if (error.non_field_errors) {
            let [errors] = error.non_field_errors;
            this.error = errors;
          } else {
            if (error.message) {
              this.error = error.message;
            } else {
              this.error = error.error;
            }
          }
          this.loading = false;
        }
      );
      event.preventDefault();
    },
    createAdmin(e) {
      this.showCreateAdmin = true;
      e.preventDefault();
    },
  },
};
</script>

<template>
  <div>
    <div id="loginForm" v-if="!showCreateAdmin" class="centerBox">
      <div class="panel panel--raised half-margin-top half-margin-bottom">
        <div v-if="error" class="row">
          <div class="col-md-12">
            <div class="alert alert--danger" role="alert">
              <div class="alert__icon icon-error-outline"></div>
              <div class="alert__message">{{ error }}</div>
            </div>
          </div>
        </div>

        <form>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <div class="form-group__text">
                  <input
                    v-model.trim="$v.username.$model"
                    type="text"
                    name="username"
                    id="username"
                  />
                  <label for="username">Username</label>
                </div>
                <div
                  v-if="loginsubmitted && !$v.username.required"
                  class="help-block text-danger"
                  role="alert"
                >
                  <span>Username is required</span>
                </div>
              </div>

              <div class="form-group">
                <div class="form-group__text">
                  <input
                    v-model.trim="$v.password.$model"
                    type="password"
                    name="password"
                    id="password"
                  />
                  <label for="password">Password</label>
                </div>
                <div
                  v-if="loginsubmitted && !$v.password.required"
                  class="help-block text-danger"
                  role="alert"
                >
                  <span>Password is required</span>
                </div>
              </div>

              <button
                class="btn btn--primary base-margin-top"
                :disabled="loading"
                @click="onSubmit($event)"
              >
                <span>Login</span>
              </button>
              <button
                class="btn btn--primary base-margin-top"
                :disabled="loading"
                v-if="showAdmin"
                @click="createAdmin($event)"
              >
                <span>Create Admin</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div id="loginForm" v-if="showCreateAdmin" class="centerBox">
      <div class="panel panel--raised half-margin-top half-margin-bottom">
        <div v-if="error" class="row">
          <div class="col-md-12">
            <div class="alert alert--danger" role="alert">
              <div class="alert__icon icon-error-outline"></div>
              <div class="alert__message">{{ error }}</div>
            </div>
          </div>
        </div>

        <form>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <div class="form-group__text">
                  <input
                    v-model.trim="$v.username1.$model"
                    disabled
                    type="text"
                    name="username1"
                    id="username1"
                  />
                  <label for="username1">Username</label>
                </div>
                <div
                  v-if="adminsubmitted && !$v.username1.required"
                  class="help-block text-danger"
                  role="alert"
                >
                  <span>Username is required</span>
                </div>
              </div>

              <div class="form-group">
                <div class="form-group__text">
                  <input
                    v-model.trim="$v.password1.$model"
                    type="password"
                    name="password1"
                    id="password1"
                  />
                  <label for="password1">Password</label>
                </div>
                <div
                  v-if="adminsubmitted && !$v.password1.required"
                  class="help-block text-danger"
                  role="alert"
                >
                  <span>Password is required</span>
                </div>
              </div>

              <div class="form-group">
                <div class="form-group__text">
                  <input type="text" name="email1" id="email1" />
                  <label for="email1">Email</label>
                </div>
              </div>

              <div class="form-group">
                <div class="form-group__text">
                  <input type="text" name="token1" id="token1" />
                  <label for="token1">Token</label>
                </div>
                <span style="font-size: 10px;color: #017cad;"
                  >Note:Please get token id from "http://tims.cisco.com/" >
                  tools> Automation token</span
                >
              </div>

              <button
                class="btn btn--primary base-margin-top"
                :disabled="loading"
                @click="onSubmitCreateAdmin"
              >
                <span>Create</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
