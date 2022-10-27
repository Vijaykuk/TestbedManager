
// @ts-ignore
import { requestOptions, handleResponse } from "@/core/helpers/request";

// get project list
function getProjectList() {
  const endpoint = `${requestOptions.apiUrl()}/project_details/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}
// get User list
function getUserList() {
  const endpoint = `${requestOptions.apiUrl()}/userData/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

// get project list
function getProjectListByReleaseId(rel_id) {
  const endpoint = `${requestOptions.apiUrl()}/projects_by_release_id/${requestOptions.getUser()}/${rel_id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

// get topologies
function getAllTopologyNames(id) {
  const endpoint = `${requestOptions.apiUrl()}/get_topology_names/${requestOptions.getUser()}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

// get topologies
function getAllTopologies(id) {
  const endpoint = `${requestOptions.apiUrl()}/get_topologies/${requestOptions.getUser()}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

// get project details
function getProjectDetails(id) {
  const endpoint = `${requestOptions.apiUrl()}/project_details/${requestOptions.getUser()}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

// get project details
function getCFDCount(type, id) {
  const endpoint = `${requestOptions.apiUrl()}/fetch_cfds_count/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function getReleasesList(cust_id) {
  const endpoint = `${requestOptions.apiUrl()}/release_details/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function projectSyncWithTims(pid) {
  const endpoint = `${requestOptions.apiUrl()}/bulk_sync/${requestOptions.getUser()}/${pid}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function releaseSyncWithTims(rid) {
  const endpoint = `${requestOptions.apiUrl()}/release_sync/${requestOptions.getUser()}/${rid}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function uploadProjectSyncWithTims(pid) {
  const endpoint = `${requestOptions.apiUrl()}/upload_project_to_Tims/${requestOptions.getUser()}/${pid}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function uploadReleaseSyncWithTims(rid) {
  // const endpoint = `${requestOptions.apiUrl()}/upload_to_Tims/${requestOptions.getUser()}/${rid}`;
  //return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

//create_release;
function createRelease(body) {
  const endpoint = `${requestOptions.apiUrl()}/create_release/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}

//create_event;
function createEvent(body) {
  const endpoint = `${requestOptions.apiUrl()}/create_timelineevent/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}

//create_event;
function deleteEvent(names) {
  const endpoint = `${requestOptions.apiUrl()}/delete_timelineevent/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.delete(names)).then(handleResponse);
}

//create_project;
function createProject(body) {
  const endpoint = `${requestOptions.apiUrl()}/create_project/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}

//create_customer;
function createCustomer(body) {
  const endpoint = `${requestOptions.apiUrl()}/create_customer/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.postFile(body)).then(handleResponse);
}

//update_customer;
function updateCustomer(body, custId) {
  const endpoint = `${requestOptions.apiUrl()}/update_customer/${requestOptions.getUser()}/${custId}`;
  return fetch(endpoint, requestOptions.postFile(body)).then(handleResponse);
}

function deleteCustomer(custId) {
  const endpoint = `${requestOptions.apiUrl()}/customer_delete/${requestOptions.getUser()}/${custId}`;
  return fetch(endpoint, requestOptions.delete()).then(handleResponse);
}

// get project details
function getCustomerList(id) {
  const endpoint = `${requestOptions.apiUrl()}/customer_details/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function getCustomerById(id) {
  const endpoint = `${requestOptions.apiUrl()}/customer_details/${requestOptions.getUser()}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function getCDETSDetails(attr) {
  const endpoint = `${requestOptions.apiUrl()}/cdets_fetch/${requestOptions.getUser()}/${attr}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function loadCFDDetails() {
  const endpoint = `${requestOptions.apiUrl()}/fetch_cfds/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function addCFD(body) {
  const endpoint = `${requestOptions.apiUrl()}/add_cfds/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}

function updateProject(body, projectId) {
  const endpoint = `${requestOptions.apiUrl()}/update_project/${requestOptions.getUser()}/${projectId}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}

function updateWeeklyReportByReleaseId(body, relId) {
  const endpoint = `${requestOptions.apiUrl()}/update_weekly_report/${requestOptions.getUser()}/${relId}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}

function updateWeeklyReportByCustomer(body, folderName,customerName) {
  const endpoint = `${requestOptions.apiUrl()}/update_customer_weekly_report/${requestOptions.getUser()}/${folderName}/${customerName}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}

function updateAhaReportByReleaseId(body, relId) {
  const endpoint = `${requestOptions.apiUrl()}/update_ahalist/${requestOptions.getUser()}/${relId}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}

function updateRelease(body, relId) {
  const endpoint = `${requestOptions.apiUrl()}/update_release/${requestOptions.getUser()}/${relId}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}

function deleteProject(pId) {
  const endpoint = `${requestOptions.apiUrl()}/project_delete/${requestOptions.getUser()}/${pId}`;
  return fetch(endpoint, requestOptions.delete()).then(handleResponse);
}

function deleteRelease(rel_id) {
  const endpoint = `${requestOptions.apiUrl()}/release_delete/${requestOptions.getUser()}/${rel_id}`;
  return fetch(endpoint, requestOptions.delete()).then(handleResponse);
}

function updateTims(body) {
  const endpoint = `${requestOptions.apiUrl()}/update_tims/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}
// get testcase list
function getTestcaseList(id, pNum) {
  const endpoint = `${requestOptions.apiUrl()}/testcase_details/${requestOptions.getUser()}/${id}/${pNum}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function getTestcaseListByReleaseId(id, pNum) {
  const endpoint = `${requestOptions.apiUrl()}/release_testcases_summary/${requestOptions.getUser()}/${id}/${pNum}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function projectExecutionSummary(id) {
  const endpoint = `${requestOptions.apiUrl()}/project_execution_summary/${requestOptions.getUser()}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function deleteFile(body) {
  const endpoint = `${requestOptions.apiUrl()}/delete_file/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}

// get testcase details
function getTestcaseDetails(id) {
  const endpoint = `${requestOptions.apiUrl()}/testcase_by_testcase_id/${requestOptions.getUser()}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

//create_testcase;
function createTestCase(body) {
  const endpoint = `${requestOptions.apiUrl()}/create_testcase/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.postFile(body)).then(handleResponse);
}

//update_testcase;
function updateTestCase(body, testcaseId) {
  const endpoint = `${requestOptions.apiUrl()}/update_testcase/${requestOptions.getUser()}/${testcaseId}`;
  return fetch(endpoint, requestOptions.postFile(body)).then(handleResponse);
}

//update_unique_testcase;
function updateUniqueTestCases(body, testcaseId, type, idValue) {
  const endpoint = `${requestOptions.apiUrl()}/testcases_unique_update/${requestOptions.getUser()}/${testcaseId}/${type}/${idValue}`;
  return fetch(endpoint, requestOptions.postFile(body)).then(handleResponse);
}

//update_testcases;
function bulkUpdateTestCases(body) {
  const endpoint = `${requestOptions.apiUrl()}/bulk_update/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.postFile(body)).then(handleResponse);
}

//update_unique_testcases;
function bulkUpdateUniqueTestCases(body, type, idValue) {
  const endpoint = `${requestOptions.apiUrl()}/bulk_update_unique_testcases/${requestOptions.getUser()}/${type}/${idValue}`;
  return fetch(endpoint, requestOptions.postFile(body)).then(handleResponse);
}


//delete_testcase
function deleteTestCase(testcaseId) {
  const endpoint = `${requestOptions.apiUrl()}/testcase_delete/${requestOptions.getUser()}/${testcaseId}`;
  return fetch(endpoint, requestOptions.delete()).then(handleResponse);
}

;
//delete_aha_feature
function deleteAhafeature(id) {
  const endpoint = `${requestOptions.apiUrl()}/deleteAHAList_withID/${requestOptions.getUser()}/${id}`;
  return fetch(endpoint, requestOptions.delete()).then(handleResponse);
}

function uploadFile(file, projectId) {
  const endpoint = `${requestOptions.apiUrl()}/upload_file/${requestOptions.getUser()}/${projectId}`;
  return fetch(endpoint, requestOptions.postFile(file)).then(handleResponse);
}

function uploadReleaseNote(file, projectId) {
  const endpoint = `${requestOptions.apiUrl()}/upload_relese_note/${requestOptions.getUser()}/${projectId}`;
  return fetch(endpoint, requestOptions.postFile(file)).then(handleResponse);
}

function getReleaseNotes(id) {
  const endpoint = `${requestOptions.apiUrl()}/get_release_note/${requestOptions.getUser()}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

//export_testcases;
function exportTestCases(id, type, body) {
  const endpoint = `${requestOptions.apiUrl()}/export_testcases/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.postZip(body)).then(handleResponse);
}

function exportCFD(body) {
  const endpoint = `${requestOptions.apiUrl()}/export_cfds/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}

function deleteCFD() {
  const endpoint = `${requestOptions.apiUrl()}/delete_cfds/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.body()).then(handleResponse);
}

//export_testcases;
function downloadLogFile(id, filename) {
  const endpoint =
    `${requestOptions.apiUrl()}/download_logfile/${requestOptions.getUser()}/${id}/` +
    filename;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

//export_testcases;
function exportExcel(type, id) {
  const endpoint = `${requestOptions.apiUrl()}/export_excel/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function getInventoryData(id) {
  const endpoint = `${requestOptions.apiUrl()}/project/inventory/${requestOptions.getUser()}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function getConfigData(id) {
  const endpoint = `${requestOptions.apiUrl()}/project/config/${requestOptions.getUser()}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function createConnection() {
  const endpoint = `${requestOptions.apiUrl()}/create_connection/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

// get testcase details
function getAllTestcases(page) {
  const endpoint = `${requestOptions.apiUrl()}/get_alltestcases/${requestOptions.getUser()}/${page}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function getTestcaseListByFolderName(fname, page) {
  const endpoint = `${requestOptions.apiUrl()}/release_folder_level_summary/${requestOptions.getUser()}/${fname}/${page}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function getTestcaseListByCustomerFolderName (cname, fname, page) {
   const endpoint = `${requestOptions.apiUrl()}/customer_folder_level_summary/${requestOptions.getUser()}/${fname}/${cname}/${page}`;
   return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function importTestcases(body, projectId) {
  const endpoint = `${requestOptions.apiUrl()}/createtestcases_from_repo/${requestOptions.getUser()}/${projectId}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}

function getWeeklyReportByReleaseId(id) {
  const endpoint = `${requestOptions.apiUrl()}/timeline_weekly_report/${requestOptions.getUser()}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function getWeeklyReportByCustomer(folderName,customerName) {
  const endpoint = `${requestOptions.apiUrl()}/timeline_customer_weekly_report/${requestOptions.getUser()}/${folderName}/${customerName}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function updateReleaseDetailsByReleaseId(body, rid) {
  const endpoint = `${requestOptions.apiUrl()}/update_Release_details/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}

function getReleaseDetailsByReleaseId(id) {
  const endpoint = `${requestOptions.apiUrl()}/release_details/${requestOptions.getUser()}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}
function customerExecutionSummary(id) {
  const endpoint = `${requestOptions.apiUrl()}/customer_execution_chart/${requestOptions.getUser()}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function loadAHAList(id) {
  const endpoint = `${requestOptions.apiUrl()}/ahalist_with_release_id/${requestOptions.getUser()}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function uploadAHAList(body, relId) {
  const endpoint = `${requestOptions.apiUrl()}/uploadAHAList/${requestOptions.getUser()}/${relId}`;
  return fetch(endpoint, requestOptions.postFile(body)).then(handleResponse);
}

function updateSummary(body, relId) {
  const endpoint = `${requestOptions.apiUrl()}/updateSummary/${requestOptions.getUser()}/${relId}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}

function getFolderByProjectIds() {
  const endpoint = `${requestOptions.apiUrl()}/folders_with_projectIds/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function fetchSummaryBtnDetails(type, id) {
  const endpoint = `${requestOptions.apiUrl()}/summarywithinput/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function loadUniqueTestcases(type, id) {
  const endpoint = `${requestOptions.apiUrl()}/unique_testcases/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function loadUniqueTestcasesGraphs(type, id) {
  const endpoint = `${requestOptions.apiUrl()}/unique_testcases_graphs/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}





// testcase config service definition
export const testcaseService = {
         projectSyncWithTims,
         updateReleaseDetailsByReleaseId,
         getProjectList,
         getProjectListByReleaseId,
         getProjectDetails,
         createProject,
         deleteProject,
         deleteRelease,
         deleteFile,
         updateProject,
         updateRelease,
         getTestcaseList,
         getTestcaseDetails,
         createTestCase,
         updateTestCase,
         updateUniqueTestCases,
         deleteTestCase,
         uploadFile,
         uploadReleaseNote,
         exportTestCases,
         bulkUpdateTestCases,
         bulkUpdateUniqueTestCases,
         getAllTopologyNames,
         getAllTopologies,
         getInventoryData,
         getConfigData,
         deleteAhafeature,
         createConnection,
         getReleaseNotes,
         exportExcel,
         exportCFD,
         deleteCFD,
         createCustomer,
         getCustomerList,
         getReleasesList,
         createRelease,
         getCustomerById,
         getUserList,
         getTestcaseListByReleaseId,
         uploadReleaseSyncWithTims,
         uploadProjectSyncWithTims,
         getAllTestcases,
         importTestcases,
         updateTims,
         getCDETSDetails,
         deleteCustomer,
         loadCFDDetails,
         releaseSyncWithTims,
         updateCustomer,
         addCFD,
         getTestcaseListByFolderName,
         getCFDCount,
         getWeeklyReportByReleaseId,
  getReleaseDetailsByReleaseId,
         getTestcaseListByCustomerFolderName,
         createEvent,
         deleteEvent,
         projectExecutionSummary,
         customerExecutionSummary,
         downloadLogFile,
         updateWeeklyReportByReleaseId,
         updateWeeklyReportByCustomer,
         updateAhaReportByReleaseId,
         loadAHAList,
         uploadAHAList,
         updateSummary,
         getFolderByProjectIds,
         fetchSummaryBtnDetails,
         getWeeklyReportByCustomer,
         loadUniqueTestcases,
         loadUniqueTestcasesGraphs,
       };
