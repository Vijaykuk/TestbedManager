/* eslint-disable import/prefer-default-export */
// these are the sorting methods for sorting tracelogger nodes

function sortName(arr, decision = false) {
  return arr.sort((a, b) => {
    let re = /[*.:&%$+=]/gi;
    let hA;
    let hB;
    if (!a.name) {
      hA = 0;
    } else {
      hA = a.name.replace(re, "");
    }
    if (!b.name) {
      hB = 0;
    } else {
      hB = b.name.replace(re, "");
    }

    let h1 = typeof hA === "string" ? hA.toLowerCase() : hA.toString();
    let h2 = typeof hB === "string" ? hB.toLowerCase() : hB.toString();

    if (decision) {
      return h1.localeCompare(h2);
    } else {
      return h2.localeCompare(h1);
    }
  });
}

function sortDescription(arr, decision = false) {
  return arr.sort((a, b) => {
    let re = /[*.:&%$+=]/gi;
    let hA;
    let hB;
    if (!a.description) {
      hA = 0;
    } else {
      hA = a.description.replace(re, "");
    }
    if (!b.description) {
      hB = 0;
    } else {
      hB = b.description.replace(re, "");
    }

    let h1 = typeof hA === "string" ? hA.toLowerCase() : hA.toString();
    let h2 = typeof hB === "string" ? hB.toLowerCase() : hB.toString();

    if (decision) {
      return h1.localeCompare(h2);
    } else {
      return h2.localeCompare(h1);
    }
  });
}
function sortDataCenter(arr, decision = false) {
  return arr.sort((a, b) => {
    let nameA;
    let nameB;
    if (!a.data_center) {
      nameA = 0;
    } else {
      nameA = a.data_center.name;
    }
    if (!b.data_center) {
      nameB = 0;
    } else {
      nameB = b.data_center.name;
    }
    let h1 = typeof nameA === "string" ? nameA.toLowerCase() : nameA.toString();
    let h2 = typeof nameB === "string" ? nameB.toLowerCase() : nameB.toString();

    if (decision) {
      return h1.localeCompare(h2);
    } else {
      return h2.localeCompare(h1);
    }
  });
}
function sortSftpCredentials(arr, decision = false) {
  return arr.sort((a, b) => {
    let nameA;
    let nameB;
    if (!a.sftp_credentials) {
      nameA = 0;
    } else {
      nameA = a.sftp_credentials.name;
    }
    if (!b.sftp_credentials) {
      nameB = 0;
    } else {
      nameB = b.sftp_credentials.name;
    }
    let h1 = typeof nameA === "string" ? nameA.toLowerCase() : nameA.toString();
    let h2 = typeof nameB === "string" ? nameB.toLowerCase() : nameB.toString();

    if (decision) {
      return h1.localeCompare(h2);
    } else {
      return h2.localeCompare(h1);
    }
  });
}
function sortNodeType(arr, decision = false) {
  return arr.sort((a, b) => {
    let hA;
    let hB;
    if (!a.node_type) {
      hA = 0;
    } else {
      hA = a.node_type.description;
    }
    if (!b.node_type) {
      hB = 0;
    } else {
      hB = b.node_type.description;
    }

    let h1 = typeof hA === "string" ? hA.toLowerCase() : hA.toString();
    let h2 = typeof hB === "string" ? hB.toLowerCase() : hB.toString();

    if (decision) {
      return h1.localeCompare(h2);
    } else {
      return h2.localeCompare(h1);
    }
  });
}
function sortHostname(arr, decision = false) {
  return arr.sort((a, b) => {
    let re = /[.:]/gi;
    let hA;
    let hB;
    if (!a.hostname) {
      hA = 0;
    } else {
      hA = a.hostname.replace(re, "");
    }
    if (!b.hostname) {
      hB = 0;
    } else {
      hB = b.hostname.replace(re, "");
    }

    let h1 = typeof hA === "string" ? hA.toLowerCase() : hA.toString();
    let h2 = typeof hB === "string" ? hB.toLowerCase() : hB.toString();

    if (decision) {
      return h1.localeCompare(h2);
    } else {
      return h2.localeCompare(h1);
    }
  });
}
function sortStatus(arr, decision = false) {
  return arr.sort((a, b) => {
    let comparison = 0;
    if (decision) {
      if (a.status && b.status) {
        if (a.status === "Ready" && b.status !== "Ready") {
          comparison = 1;
        } else if (
          a.status_label_class === "label--success" &&
          b.status_label_class !== "label--success"
        ) {
          comparison = 1;
        } else {
          comparison = -1;
        }
      } else {
        comparison = 0;
      }
      return comparison;
    } else {
      if (a.status && b.status) {
        if (b.status !== "Ready") {
          comparison = -1;
        } else if (
          a.status_label_class === "label--success" &&
          b.status_label_class !== "label--success"
        ) {
          comparison = -1;
        } else {
          comparison = 1;
        }
      } else {
        comparison = 0;
      }
      return comparison;
    }
  });
}
function sortMaintenanceMode(arr, decision = false) {
  return arr.sort((a, b) => {
    let comparison = 0;
    if (decision) {
      if (a === true && b === false) {
        comparison = 1;
      } else if (a === b) {
        comparison = 0;
      } else {
        comparison = -1;
      }
      return comparison;
    } else {
      if (b === true && a === false) {
        comparison = -1;
      } else if (b === a) {
        comparison = 0;
      } else {
        comparison = -1;
      }
      return comparison;
    }
  });
}
// sort service definition
export const sortService = {
  sortName,
  sortDescription,
  sortDataCenter,
  sortSftpCredentials,
  sortNodeType,
  sortHostname,
  sortStatus,
  sortMaintenanceMode
};
