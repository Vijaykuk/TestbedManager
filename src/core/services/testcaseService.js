/* eslint-disable import/prefer-default-export */
// @ts-ignore
import { requestOptions, handleResponse } from "@/core/helpers/request";

// get project list
function getProjectList() {
  const endpoint = `${requestOptions.apiUrl()}/project_details/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}
//load UserData....
function getUserData() {
  const endpoint = `${requestOptions.apiUrl()}/userData/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function deleteUserData(name) {
  const endpoint = `${requestOptions.apiUrl()}/delete_user/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.delete(name)).then(handleResponse);
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

//create Project Readiness Report
 function createProjectReadinessReport(cname,rversion){
   // @ts-ignore
   const endpoint =`${requestOptions.apiUrl()}/create_readiness_config/${requestOptions.getuser()}/${cname,rversion}`;
        // @ts-ignore
        return fetch(endpoint,requestOptions.post(body)).then(handleResponse)

 }

//get Project Readiness 

function loadReadinessDetails(name,id) {
  const endpoint =`${requestOptions.apiUrl()}/get_project_readiness/${requestOptions.getUser()}/${name}/${id}`;
      return fetch(endpoint,requestOptions.get()).then(handleResponse);
}

//update project Readiness
function geProjecttUpdateReadiness(rid) {
  const endpoint =`${requestOptions.apiUrl()}/update_readiness_config/${requestOptions.getUser()}/${rid}`;
      // @ts-ignore
      return fetch(endpoint,requestOptions.post(body)).then(handleResponse);
}

function getReleasesList(cust_id) {
  const endpoint = `${requestOptions.apiUrl()}/release_details/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function projectSyncWithTims(pid) {
  const endpoint = `${requestOptions.apiUrl()}/bulk_sync/${requestOptions.getUser()}/${pid}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function custSyncWithTims(customerName, folderName) {
  const endpoint = `${requestOptions.apiUrl()}/cutomer__sync/${requestOptions.getUser()}/${customerName}/${folderName}`;
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
   const endpoint = `${requestOptions.apiUrl()}/upload_to_Tims/${requestOptions.getUser()}/${rid}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function cloneProject(pid) {
  const endpoint = `${requestOptions.apiUrl()}/clone_project/${requestOptions.getUser()}/${pid}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function cloneRelease(rid) {
   const endpoint = `${requestOptions.apiUrl()}/clone_release/${requestOptions.getUser()}/${rid}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}


function updateCdets(rid) {
  const endpoint = `${requestOptions.apiUrl()}/update_cdets/${requestOptions.getUser()}/${rid}`;
 return fetch(endpoint, requestOptions.get()).then(handleResponse);
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

function getCDETSDetails(type, idValue) {
  const endpoint = `${requestOptions.apiUrl()}/cdets_fetch_requestvalue/${requestOptions.getUser()}/${type}/${idValue}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function loadCFDDetails() {
  const endpoint = `${requestOptions.apiUrl()}/fetch_cfds/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function viewCFDById(rel_id) {
  const endpoint = `${requestOptions.apiUrl()}/fetch_cfd_by_ID/${requestOptions.getUser()}/${rel_id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function addCFD(body) {
  const endpoint = `${requestOptions.apiUrl()}/add_cfds/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}
function updateCFD(body) {
  const endpoint = `${requestOptions.apiUrl()}/update_cfds/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}

function updatePassword(body) {
  const endpoint = `${requestOptions.apiUrl()}/update_adminPassword/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}

function deleteCFD(body) {
  const endpoint = `${requestOptions.apiUrl()}/delete_cfds/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.delete(body)).then(handleResponse);
}

function exportCFD(body) {
  const endpoint = `${requestOptions.apiUrl()}/export_cfds/${requestOptions.getUser()}`;
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



function updateUserToken(body) {
  const endpoint = `${requestOptions.apiUrl()}/update_usertoken/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}

function loadDatabaseDetails() {
  const endpoint = `${requestOptions.apiUrl()}/load_database_details/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

// get testcase list
function getTestcaseList(id, pNum) {
  const endpoint = `${requestOptions.apiUrl()}/testcase_details/${requestOptions.getUser()}/${id}/${pNum}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

// get testcase list
function getTestcaseListFeature(id, feature, pNum) {
  const endpoint = `${requestOptions.apiUrl()}/testcase_details_WithFeature/${requestOptions.getUser()}/${id}/${feature}/${pNum}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}


function getTestcaseListByReleaseId(id, pNum) {
  const endpoint = `${requestOptions.apiUrl()}/release_testcases_summary/${requestOptions.getUser()}/${id}/${pNum}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}


function getTestcaseListByReleaseIdFeature(id,feature, pNum) {
  const endpoint = `${requestOptions.apiUrl()}/release_testcases_summary_WithFeature/${requestOptions.getUser()}/${id}/${feature}/${pNum}`;
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


// get Master testcase details
function getMasterTestcaseDetails(id) {
  const endpoint = `${requestOptions.apiUrl()}/master_testcase_by_testcase_id/${requestOptions.getUser()}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}



//create_testcase;
function createTestCase(body) {
  const endpoint = `${requestOptions.apiUrl()}/create_testcase/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.postFile(body)).then(handleResponse);
}

//create_customer
function createCustomerDetails(body) {
  const endpoint = `${requestOptions.apiUrl()}/create_customer_label/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.postFile(body)).then(handleResponse);
}


//update_testcase;
function updateTestCase(body, testcaseId) {
  const endpoint = `${requestOptions.apiUrl()}/update_testcase/${requestOptions.getUser()}/${testcaseId}`;
  return fetch(endpoint, requestOptions.postFile(body)).then(handleResponse);
}

//update_unique_testcase;
function updateUniqueTestCases(body, testcaseId, type, idValue) {
  const endpoint = `${requestOptions.apiUrl()}/master_testcases_unique_update/${requestOptions.getUser()}/${testcaseId}/${type}/${idValue}`;
  return fetch(endpoint, requestOptions.postFile(body)).then(handleResponse);
}

//update_testcases;
function bulkUpdateTestCases(body) {
  const endpoint = `${requestOptions.apiUrl()}/bulk_update/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.postFile(body)).then(handleResponse);
}

//update_unique_testcases;
function bulkUpdateUniqueTestCases(body, type, idValue) {
  const endpoint = `${requestOptions.apiUrl()}/master_bulk_update_unique_testcases/${requestOptions.getUser()}/${type}/${idValue}`;
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

function uploadFile(file,type, id) {
  const endpoint = `${requestOptions.apiUrl()}/upload_file/${requestOptions.getUser()}/${type}/${id}`;
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

function loadReleaseNoteData(type, id) {
  const endpoint = `${requestOptions.apiUrl()}/release_notes/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}



//export_testcases;
function exportTestCases(id, type, body) {
  const endpoint = `${requestOptions.apiUrl()}/export_testcases/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.postZip(body)).then(handleResponse);
}

//export_mail;
function exportMail(body) {
  const endpoint = `${requestOptions.apiUrl()}/weekly_mail/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.postFile(body)).then(handleResponse);
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

//export_unique_testcases;
function exportUniqueExcel(type, id) {
  const endpoint = `${requestOptions.apiUrl()}/export_excel_unique_testcases/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

//export_unique_testcases;
function exportUniqueDocx(type, id) {
  const endpoint = `${requestOptions.apiUrl()}/exportdocx_unique_testcases/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

//export_testcases;
function exportDocx(type, id) {
  const endpoint = `${requestOptions.apiUrl()}/exportdocx/${requestOptions.getUser()}/${type}/${id}`;
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

function getTestcaseListByFolderNameFeature(fname, feature, page) {
  const endpoint = `${requestOptions.apiUrl()}/release_folder_level_summary_WithFeature/${requestOptions.getUser()}/${fname}/${feature}/${page}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function getTestcaseListByCustomerFolderName (cname, fname, page) {
   const endpoint = `${requestOptions.apiUrl()}/customer_folder_level_summary/${requestOptions.getUser()}/${fname}/${cname}/${page}`;
   return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function getTestcaseListByCustomerFolderNameFeature (fname, cname, feature, page) {
  const endpoint = `${requestOptions.apiUrl()}/customer_folder_level_summary_WithFeature/${requestOptions.getUser()}/${fname}/${cname}/${feature}/${page}`;
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

function customerExecutionChartsSummary() {
  const endpoint = `${requestOptions.apiUrl()}/execution_chart/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}



function loadAHAList(type,id) {
  const endpoint = `${requestOptions.apiUrl()}/ahalist_with_request_value/${requestOptions.getUser()}/${type}/${id}`;
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

function loadRorDetails(type, id) {
  const endpoint = `${requestOptions.apiUrl()}/create_release_ror/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}


function loadExecDetails(type, id) {
  const endpoint = `${requestOptions.apiUrl()}/folder_details_withpercentages/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function loadUniqueTestcases(type, id) {
  const endpoint = `${requestOptions.apiUrl()}/master_testcases_unique/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function loadAllMasterTestcaseDetails(type, id) {
  const endpoint = `${requestOptions.apiUrl()}/masterExapanAll/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}


function loadUniqueTestcasesDetails(type, id) {
  const endpoint = `${requestOptions.apiUrl()}/master_testcases_unique_withoutTcs/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function loadWithLogTestcasesDetails(type, id) {
  const endpoint = `${requestOptions.apiUrl()}/testcase_withlogs_withoutTcs/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function loadEmptyProcedureTestcasesDetails(type, id) {
  const endpoint = `${requestOptions.apiUrl()}/testcase_withoutprocedure_withoutTcs/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

// This API is to get all the master testcase deatils with feature:

function loadMasterTestcasesDetailsFeature(feature) {
  const endpoint = `${requestOptions.apiUrl()}/masterAllFeature/${requestOptions.getUser()}/${feature}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

//This API is to get all the master testcases 

function loadMasterTestcasesDetails() {
  const endpoint = `${requestOptions.apiUrl()}/masterAllWithoutTcs/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

//   This API to export excel all the master testcases

function exportExcelMastertestCases(type, id) {
  const endpoint = `${requestOptions.apiUrl()}/exportExcelMasterTestcases/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}


// This API to export all the testcases with docx

function exportMasterTestCasesDocx(type, id) {
  const endpoint = `${requestOptions.apiUrl()}/exportdocxMasterTestcases/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}



function loadUniqueTestcasesDetailsFeature(type, id, feature) {
  const endpoint = `${requestOptions.apiUrl()}/master_testcases_unique_WithFeature/${requestOptions.getUser()}/${type}/${id}/${feature}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function loadEmptyProcTestcasesDetailsFeature(type, id, feature) {
  const endpoint = `${requestOptions.apiUrl()}/testcase_withoutprocedure_WithFeature/${requestOptions.getUser()}/${type}/${id}/${feature}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}


function loadWithLogsTestcasesDetailsFeature(type, id, feature) {
  const endpoint = `${requestOptions.apiUrl()}/testcase_withlogs_WithFeature/${requestOptions.getUser()}/${type}/${id}/${feature}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function loadUniqueTestcasesGraphs(type, id) {
  const endpoint = `${requestOptions.apiUrl()}/unique_testcases_graphs/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function loadCaveatList(type, id) {
  const endpoint = `${requestOptions.apiUrl()}/cstate_defects/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function loadTriggerMatrix(type, id) {
  const endpoint = `${requestOptions.apiUrl()}/get_triggerMatrix/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function loadWeeklyTriggerMatrix(type, id) {
  const endpoint = `${requestOptions.apiUrl()}/getTriggerMatrix_weekly/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function loadSmuDetails(body) {
  const endpoint = `${requestOptions.apiUrl()}/smus/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}

function loadCFDListDetails(body) {
  const endpoint = `${requestOptions.apiUrl()}/cfds_customer_page/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}

function createTriggerMatrix(body,type,id) {
  const endpoint = `${requestOptions.apiUrl()}/create_triggerMatrix/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}

function updateTriggerMatrix(body,weekid) {
  const endpoint = `${requestOptions.apiUrl()}/update_triggerMatrix/${requestOptions.getUser()}/${weekid}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}

function deleteTrigger(trId) {
  const endpoint = `${requestOptions.apiUrl()}/delete_trigger/${requestOptions.getUser()}/${trId}`;
  return fetch(endpoint, requestOptions.delete()).then(handleResponse);
}

function loadUpgradeMatrix(type, id) {
  const endpoint = `${requestOptions.apiUrl()}/get_upgradeMatrix/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function loadWeeklyUpgradeMatrix(type, id) {
  const endpoint = `${requestOptions.apiUrl()}/getUpgradeMatrix_weekly/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function createUpgradeMatrix(body,type,id) {
  const endpoint = `${requestOptions.apiUrl()}/create_upgradeMatrix/${requestOptions.getUser()}/${type}/${id}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}

function updateUpgradeMatrix(body,weekId) {
  const endpoint = `${requestOptions.apiUrl()}/update_upgradeMatrix/${requestOptions.getUser()}/${weekId}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}

function deleteUpgrade(trId) {
  const endpoint = `${requestOptions.apiUrl()}/delete_upgrade/${requestOptions.getUser()}/${trId}`;
  return fetch(endpoint, requestOptions.delete()).then(handleResponse);
}

function getDefectDetails(id){
  const endpoint = `${requestOptions.apiUrl()}/ddtsdashdata/${requestOptions.getUser()}/${id}`;
  return fetch(endpoint, requestOptions.get()).then(handleResponse);
}

function getCFDChartData(body){
  const endpoint = `${requestOptions.apiUrl()}/cfdsDetails/${requestOptions.getUser()}`;
  return fetch(endpoint, requestOptions.post(body)).then(handleResponse);
}







// testcase config service definition
export const testcaseService = {
  loadAllMasterTestcaseDetails,
        loadMasterTestcasesDetailsFeature,
        loadMasterTestcasesDetails,
        getMasterTestcaseDetails,
        exportExcelMastertestCases,
        exportMasterTestCasesDocx,
        createProjectReadinessReport,
        loadReadinessDetails,
         geProjecttUpdateReadiness,
         projectSyncWithTims,
         updateReleaseDetailsByReleaseId,
         getProjectList,
         getUserData,
         deleteUserData,
         getProjectListByReleaseId,
         getProjectDetails,
         createProject,
         deleteProject,
         deleteRelease,
         deleteFile,
         updateProject,
         updateRelease,
         getTestcaseList,
         getTestcaseListFeature,
         getTestcaseDetails,
         createTestCase,
         updateTestCase,
         updateUniqueTestCases,
         deleteTestCase,
         loadExecDetails,
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
         loadReleaseNoteData,
         exportExcel,
         exportUniqueExcel,
         exportDocx,
         exportUniqueDocx,
         createCustomer,
         getCustomerList,
         getReleasesList,
         createRelease,
         getCustomerById,
         getTestcaseListByReleaseId,
         getTestcaseListByReleaseIdFeature,
         uploadReleaseSyncWithTims,
         updateCdets,
         cloneProject,
         cloneRelease,
         uploadProjectSyncWithTims,
         getAllTestcases,
         importTestcases,
         updateTims,
         updateUserToken,
         loadDatabaseDetails,
         getCDETSDetails,
         deleteCustomer,
         loadCFDDetails,
         releaseSyncWithTims,
         updateCustomer,
         addCFD,
         updateCFD,
         deleteCFD,
         viewCFDById,
         exportCFD,
         updatePassword,
         getTestcaseListByFolderName,
         getTestcaseListByFolderNameFeature,
         getCFDCount,
         getWeeklyReportByReleaseId,
         getReleaseDetailsByReleaseId,
         getTestcaseListByCustomerFolderName,
         getTestcaseListByCustomerFolderNameFeature,
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
		 loadRorDetails,
         getWeeklyReportByCustomer,
         loadUniqueTestcases,
         loadUniqueTestcasesDetails,
         loadUniqueTestcasesDetailsFeature,
         loadEmptyProcTestcasesDetailsFeature,
         loadWithLogsTestcasesDetailsFeature,
         loadUniqueTestcasesGraphs,
         exportMail,
         loadTriggerMatrix,
         loadWeeklyTriggerMatrix,
         createTriggerMatrix,
         updateTriggerMatrix,
         deleteTrigger,
         loadUpgradeMatrix,
         loadWeeklyUpgradeMatrix,
         createUpgradeMatrix,
         updateUpgradeMatrix,
         deleteUpgrade,
         getDefectDetails,
         getCFDChartData,
         createCustomerDetails,
         loadCaveatList,
         loadSmuDetails,
		  loadCFDListDetails,
         customerExecutionChartsSummary,
          loadWithLogTestcasesDetails,
         loadEmptyProcedureTestcasesDetails 
       };
