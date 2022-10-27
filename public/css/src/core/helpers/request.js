/* eslint-disable */
import moment from "moment";
import { authenticationService } from "@/core/services/auth";
import { router } from "@/router";
/*
 Helper functions to make HTTP requests
 */

export const requestOptions = {
  get() {
    return {
      method: "GET",
      ...headers(),
    };
  },
  get_admin() {
    return {
      method: "GET",
      ...headers("login"),
    };
  },
  post(body) {
    return {
      method: "POST",
      ...headers(),
      body: JSON.stringify(body),
    };
  },
  login_post(body) {
    return {
      method: "POST",
      ...headers("login"),
      body: JSON.stringify(body),
    };
  },
  postFile(file) {
    return {
      method: "POST",
      ...fileHeaders(),
      body: file,
    };
  },
  postZip(file) {
    return {
      method: "POST",
      ...zipHeaders(),
      body: file,
    };
  },
  login_post(body) {
    return {
      method: "POST",
      ...headers(),
      body: JSON.stringify(body),
    };
  },
  patch(body) {
    return {
      method: "PATCH",
      ...headers(),
      body: JSON.stringify(body),
    };
  },
  put(body) {
    return {
      method: "PUT",
      ...headers(),
      body: JSON.stringify(body),
    };
  },
  delete(body) {
    return {
      method: "DELETE",
      ...headers(),
      body: JSON.stringify(body),
    };
  },
  apiUrl() {
    return `http://csmart-lnx:5007`;
  },
  getUser() {
    let currentUser = authenticationService.currentUserValue;
    if (currentUser === null || currentUser === undefined) {
      debugger;
      authenticationService.logout();
      router.push({ name: "login" });
    } else {
      return currentUser.username;
    }
  },
};

/*
 * Helper promise function that handles responses
 * that are received from the DRF-based API
 * backend in a generic way
 */
export function handleResponse(response) {
  if (
    response.ok === false &&
    response.status === 403 &&
    response.statusText === "FORBIDDEN"
  ) {
    authenticationService.logout();
    router.push({ name: "login" });
  } else {
    if (localStorage.getItem("currentUser") !== null) {
      let currUser = JSON.parse(localStorage.getItem("currentUser"));
      let currToken = currUser.token;
      let diff = moment(currUser.expiration_delta_time).diff(
        moment()
          .utc()
          .unix()
      );
      if (diff < 120) {
        authenticationService.logout();
        router.push({ name: "login" });
      }
    }
    if (
      response.url.indexOf("export_testcases") >= 0 ||
      response.url.indexOf("get_topologies") >= 0 ||
      response.url.indexOf("export_excel") >= 0 ||
      response.url.indexOf("download_logfile") >= 0
    ) {
      return response;
    } else {
      return response.text().then((text) => {
        if (text === "Success") {
          return { success: true };
        } else {
          if (text === "NO DATA") {
            return [];
          } else {
            const data = text && JSON.parse(text);
            // Check for non 200 HTTP responses
            if (!response.ok) {
              // Automatically log user out if 401 Unauthorized or
              // 401 Unauthorized response is returned by the API

              if (response.status === 504) {
                return Promise.reject({ message: "The request has timed out" });
              }
              // In the case of DRF, the data payload will contain
              // field and non-field errors from backend validation
              // so reject the promise with the data, as-is
              return Promise.reject(data);
            }
            // All good... return the payload

            return data;
          }
        }
      });
    }
  }
}

/*
 * Helper function to build headers for the HTTP
 * request with Authorization and Content-Type
 * set appropriately
 */
function headers(login) {
  if (login !== "login") {
    const currentUser = authenticationService.currentUserValue;
    if (currentUser === null) {
      authenticationService.logout();
    } else {
      const authHeader = currentUser.token
        ? { Authorization: currentUser.token }
        : authenticationService.logout();
      const irisUser = currentUser.id
        ? { "X-Iris-User-ID": currentUser.id }
        : {};
      return {
        headers: {
          ...authHeader,
          "Content-Type": "application/json",
          pragma: "no-cache",
          "cache-control": "no-cache",
        },
      };
    }
  }
  return {
    headers: {
      ...{},
      ...{},
      "Content-Type": "application/json",
      pragma: "no-cache",
      "cache-control": "no-cache",
    },
  };
}

function fileHeaders(login) {
  debugger;
  if (login !== "login") {
    const currentUser = authenticationService.currentUserValue;
    console.log("8888888888888888" + currentUser.id);
    if (currentUser === null) {
      authenticationService.logout();
    } else {
      const authHeader = currentUser.token
        ? { Authorization: currentUser.token }
        : authenticationService.logout();
      const irisUser = currentUser.id
        ? { "X-Iris-User-ID": currentUser.id }
        : {};
      return {
        headers: {
          ...authHeader,
          enctype: "application/json",
          pragma: "no-cache",
          "cache-control": "no-cache",
        },
      };
    }
  }
  return {
    headers: {
      ...{},
      ...{},
      enctype: "application/json",
      pragma: "no-cache",
      "cache-control": "no-cache",
    },
  };
}

function zipHeaders(login) {
  if (login !== "login") {
    const currentUser = authenticationService.currentUserValue;
    console.log("====" + currentUser.id);
    if (currentUser === null) {
      authenticationService.logout();
    } else {
      const authHeader = currentUser.token
        ? { Authorization: currentUser.token }
        : authenticationService.logout();
      const irisUser = currentUser.id
        ? { "X-Iris-User-ID": currentUser.id }
        : {};
      return {
        headers: {
          ...authHeader,
          enctype: "multipart/form-data",
          pragma: "no-cache",
          "cache-control": "no-cache",
        },
      };
    }
  }
  return {
    headers: {
      ...{},
      ...{},
      enctype: "multipart/form-data",
      pragma: "no-cache",
      "cache-control": "no-cache",
    },
  };
}
