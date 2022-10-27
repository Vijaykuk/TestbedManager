/* eslint-disable import/prefer-default-export */
import { BehaviorSubject } from "rxjs";
import moment from "moment-timezone";
// import { auditService } from "@/core/services/audit";
import { requestOptions, handleResponse } from "@/core/helpers/request";
import { Role } from "@/core/auth";

// Subscribe to current user in local storage
// as a behavior subject
const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

// Login function
function login(username, password) {
  const endpoint = `${requestOptions.apiUrl()}/login`;
  return fetch(endpoint, requestOptions.login_post({ username, password }))
    .then(handleResponse)
    .then((user) => {
      let timeOut = moment()
        .utc()
        .add(60 * 60 * 24, "seconds")
        .unix();
      user.expiration_delta_time = timeOut;
      /* 

     
      const user = {
        token: data.token,
        id: data.user.id,
        username: data.user.username,
        role: data.user.role,
       /* is_staff: data.user.is_staff,
        parentCustomer: data.user.customers.parent_customer,
        customer: data.user.customers.customer,
        defaultTimezone: data.user.timezone,
        expiration_delta_time: timeOut,
      };

      // Store user in local storage to keep user logged in
      // between page refreshes*/
      localStorage.setItem("currentUser", JSON.stringify(user));
      currentUserSubject.next(user);
      return user;
    });
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
