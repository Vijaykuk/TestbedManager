/* eslint-disable import/prefer-default-export */
import Vue from "vue";
import { BehaviorSubject } from "rxjs";
import moment from "moment-timezone";
// import { auditService } from "@/core/services/audit";
import { authenticate } from "ldap-authentication";
import { requestOptions, handleResponse } from "@/core/helpers/request";
import { Role } from "@/core/auth";
import VueCryptojs from "vue-cryptojs";

Vue.use(VueCryptojs);

const derived_key = Vue.CryptoJS.enc.Base64.parse(
  "LefjQ2pEXmiy/nNZvEJ43i8hJuaAnzbA1Cbn1hOuAgA="
);

// Subscribe to current user in local storage
// as a behavior subject
const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

/**
 * 
 * ldap_server cisco {
url "ldaps://ds.cisco.com:636/ou=Employees,ou=Cisco Users,dc=cisco,dc=com?cn?one";
binddn "cn=XXXXX,ou=Generics,ou=Cisco Users,dc=cisco,dc=com";
binddn_passwd "";
require valid_user;
}
 */
async function authorize() {
  // auth with admin
  let options = {
    ldapOpts: {
      // url: 'ldaps://dsdev.cisco.com:636/ou=Employees,ou=Cisco Users,dc=cisco,dc=com?cn?one',
      url: "ldap://dsdev.cisco.com:389/ou=Cisco Users,dc=dev,dc=cisco,dc=com?cn?sub",
      tlsOptions: { rejectUnauthorized: false },
    },
    AuthLDAPBindDN:
      "cn=shabpash,ou=Generics,ou=Cisco Users,dc=dev,dc=cisco,dc=com",
    AuthLDAPBindPassword: "H1bah@1111",
    userDn: "cn=shabpash,ou=Generics,ou=Cisco Users,dc=dev,dc=cisco,dc=com",
    userPassword: "H1bah@1111",
    /*    userSearchBase: 'cn=XXXXX,ou=Generics,ou=Cisco Users,dc=cisco,dc=com',
    usernameAttribute: 'uid',
    username: 'shabpash',*/
    starttls: false,
  };

  let user = await authenticate(options);
  console.log(user);

  // auth with regular user
  /* options = {
    ldapOpts: {
      url: 'ldaps://ds.cisco.com:636/ou=Employees,ou=Cisco Users,dc=cisco,dc=com?cn?one',
      // tlsOptions: { rejectUnauthorized: false }
    },
    adminDn: 'cn=read-only-admin,dc=cisco,dc=com',
    adminPassword: 'cisco123',
    userDn: 'uid=shabpash,dc=cisco,dc=com',
    userPassword: 'H1bah@1111',
    userSearchBase: 'dc=cisco,dc=com',
    usernameAttribute: 'uid',
    username: 'shabpash',
    // starttls: false
  }*/

  // user = await authenticate(options)
  //console.log(user)
}

function Generate_key() {
  var key = "";
  var hex = "UkXp2s5v8y/B?E(H+MbQeThWmYq3t6w9";

  for (let i = 0; i < 16; i++) {
    key += hex.charAt(Math.floor(Math.random() * 16));
    //Initially this was charAt(chance.integer({min: 0, max: 15}));
  }
  return key;
}
// Login function
function login(username, password) {
  if (window.location.origin.split("//")[1] === "kyc.cisco.com") {
    const endpoint = `${requestOptions.apiUrl()}/loginAD`;
    let iv = Generate_key();
    var tempiv = Vue.CryptoJS.enc.Utf8.parse(iv);
    var ciphertext = Vue.CryptoJS.AES.encrypt(password, derived_key, {
      iv: tempiv,
      mode: Vue.CryptoJS.mode.CBC,
    }).toString();
    return (
      fetch(endpoint, requestOptions.login_post({ username, ciphertext, iv }))
        /* return fetch(endpoint, requestOptions.login_post({ username, password }))*/
        .then(handleResponse)
        .then((user) => {
          let timeOut = moment()
            .utc()
            .add(60 * 60 * 24, "seconds")
            .unix();
          user.expiration_delta_time = timeOut;

          localStorage.setItem("currentUser", JSON.stringify(user));
          currentUserSubject.next(user);
          return user;
        })
    );
  } else {
    const endpoint1 = `${requestOptions.apiUrl()}/login`;
    return fetch(endpoint1, requestOptions.login_post({ username, password }))
      .then(handleResponse)
      .then((user) => {
        let timeOut = moment()
          .utc()
          .add(60 * 60 * 24, "seconds")
          .unix();
        user.expiration_delta_time = timeOut;

        localStorage.setItem("currentUser", JSON.stringify(user));
        currentUserSubject.next(user);
        return user;
      });
  }
}

// get project list
function getUserList() {
  const endpoint = `${requestOptions.apiUrl()}/get_users/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function createUser(body) {
  const endpoint = `${requestOptions.apiUrl()}/create_user/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.login_post(body)).then(handleResponse);
}

function updateUserToken(body) {
  const endpoint = `${requestOptions.apiUrl()}/update_usertoken/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}



// Refresh function
function refresh(token) {
  const endpoint = `${requestOptions.apiUrl()}/token/refresh/`;
  return fetch(endpoint, requestOptions.post({ token: token }))
    .then(handleResponse)
    .then((data) => {
      let timeOut = moment()
        .utc()
        .add(data.expiration_delta_seconds, "seconds")
        .unix();
      const user = {
        // @ts-ignore
        token: data.token,
        id: data.user.id,
        username: data.user.username,
        role: data.user.role,
        is_staff: data.user.is_staff,
        parentCustomer: data.user.customers.parent_customer,
        customer: data.user.customers.customer,
        defaultTimezone: data.user.timezone,
        expiration_delta_time: timeOut,
      };
      // Store user in local storage to keep user logged in
      // between page refreshes
      localStorage.setItem("currentUser", JSON.stringify(user));
      currentUserSubject.next(user);
      return user;
    });
}

// Logout function
function logout() {
  // Remove JWT token and user from local storage to
  // effectively log user out
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}

// Permission helper to check if user is an admin
function isAdmin(user) {
  return user && user.is_staff === Role.ADMIN;
}

function checkadmin() {
  const endpoint = `${requestOptions.apiUrl()}/check_admin/`;
  return fetch(endpoint, requestOptions.get_admin()).then(handleResponse);
}

// Permission helper to check if user is an admin for
// the primary customer
function isPrimaryAdmin(user) {
  return isAdmin(user) && user.customer.id === 1;
}

// Authentication service definition
export const authenticationService = {
  login,
  logout,
  refresh,
  getUserList,
  checkadmin,
  createUser,
  updateUserToken,

  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    if (localStorage.getItem("currentUser") === null) {
      currentUserSubject.next(null);
      return null;
    } else {
      return currentUserSubject.value;
    }
  },
  isAdmin,
  isPrimaryAdmin,
};
