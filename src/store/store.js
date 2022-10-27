/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import { sortService } from "@/core/services/sorting";

Vue.use(Vuex);

const baseTaskPayload = () => {
  return {
    log_collection: {
      name: "",
      collection_devices: [],
      run_type: null,
      timeout_minutes: 5,
      meta: {
        log_types: [],
        run_duration: {
          start_time: null,
          end_time: null,
          time_zone: null
        }
      },
      cluster: null,
      device: null,
      start_time: null,
      time_zone: null
    },
    command_output: {
      name: "",
      collection_devices: [],
      run_type: null,
      timeout_minutes: 5,
      meta: {
        command: "cli",
        commands: []
      },
      cluster: null,
      device: null,
      start_time: null,
      time_zone: null
    },
    log_level: {
      name: "",
      collection_devices: [],
      run_type: null,
      timeout_minutes: 5,
      meta: {
        command: "setserviceloglevel",
        servicelist: [],
        tracelevel: null,
        run_duration: {
          start_time: null,
          end_time: null,
          time_zone: null
        }
      },
      cluster: null,
      device: null,
      start_time: null,
      time_zone: null
    }
  };
};
const baseTaskData = () => {
  return {
    name: "",
    cluster: null,
    collection_devices: [],
    services: [],
    task_type: null,
    run_now_later: null,
    run_time: null
  };
};

export const store = new Vuex.Store({
  state: {
    currentCustomer: null,
    rediscArray: [],
    rediscStatusArray: [],
    comingFromOtherPage: false,
    hideAssets: true,
    traceloggerNodes: {
      edge: [],
      central: []
    },
    currentUser: {},
    tasksPayload: {
      log_collection: {
        name: "",
        collection_devices: [],
        run_type: null,
        timeout_minutes: 5,
        meta: {
          log_types: [],
          run_duration: {
            start_time: null,
            end_time: null,
            time_zone: null
          }
        },
        cluster: null,
        device: null,
        start_time: null,
        time_zone: null
      },
      command_output: {
        name: "",
        collection_devices: [],
        run_type: null,
        timeout_minutes: 5,
        meta: {
          command: "cli",
          commands: []
        },
        cluster: null,
        device: null,
        start_time: null,
        time_zone: null
      },
      log_level: {
        name: "",
        collection_devices: [],
        run_type: null,
        timeout_minutes: 5,
        meta: {
          command: "setserviceloglevel",
          servicelist: [],
          tracelevel: null,
          run_duration: {
            start_time: null,
            end_time: null,
            time_zone: null
          }
        },
        cluster: null,
        device: null,
        start_time: null,
        time_zone: null
      }
    },
    tasksCommonData: {
      name: "",
      cluster: null,
      collection_devices: [],
      services: [],
      task_type: null,
      run_now_later: null,
      run_time: null,
      logging_level: null
    },
    currentClusterData: {},
    globalFeedbackMessages: [],
    idToAnalyze: null,
    utcTimeNow: "",
    clockRunning: {},
    cucmPage: 1,
    cucmSelectedClusterName: null,
    sipLadder: {
      callids: null,
      data: null
    },
    taskNameSelected: "",
    taskRunIdsSelected: []
  },
  mutations: {
    startClock(state, utcTimeNow, clockRunning) {
      function addZero(i) {
        return i < 10 ? `0${i}` : i;
      }
      state.clockRunning = setInterval(() => {
        let d = new Date();
        let monthMap = {
          0: "Jan",
          1: "Feb",
          2: "Mar",
          3: "Apr",
          4: "May",
          5: "Jun",
          6: "Jul",
          7: "Aug",
          8: "Sep",
          9: "Oct",
          10: "Nov",
          11: "Dec"
        };
        state.utcTimeNow = `${d.getUTCDate()} ${
          monthMap[d.getMonth()]
        } ${d.getUTCFullYear()} ${addZero(d.getUTCHours())}:${addZero(
          d.getUTCMinutes()
        )}:${addZero(d.getUTCSeconds())} UTC`;
      }, 1000);
    },
    stopClock(state) {
      clearInterval(state.clockRunning);
    },
    currentlyRedisc(state, rediscStatus) {
      state.rediscStatus = rediscStatus;
    },
    addToRediscList(state, rediscArray) {
      let oldArray = state.rediscArray;
      let newArray = oldArray.push(rediscArray);
      state.rediscArray = newArray;
    },
    updateRediscStatus(state, rediscStatusObj) {
      for (let i = 0; i < state.rediscStatusArray.length; i++) {
        if (
          state.rediscStatusArray[i].clusterId === rediscStatusObj.clusterId
        ) {
          state.rediscStatusArray.splice(i, 1);
        }
      }
      state.rediscStatusArray.push(rediscStatusObj);
    },
    updateComingFromOtherPage(state, value) {
      state.comingFromOtherPage = value;
    },
    hideAssetsInfo(state) {
      state.hideAssets = !state.hideAssets;
    },
    modifyGlobalFeedbackMessages(state, payload) {
      if (payload.action === "clear") {
        state.globalFeedbackMessages = [];
      }
      if (payload.action === "add") {
        state.globalFeedbackMessages = payload.arr;
      }
    },
    mutateTraceloggerNodes(state, payload) {
      let array = JSON.parse(payload.arr);
      let typeSwitch;
      switch (payload.key) {
        case "edge":
          typeSwitch = "Edge Node";
          break;
        case "central":
          typeSwitch = "Central Node";
          break;
        default:
          typeSwitch = "Edge Node";
          break;
      }
      if (payload.action === "add") {
        let isDup;

        array.forEach(value => {
          isDup = state.traceloggerNodes[payload.key].filter(
            d => d.name === value.name
          );

          if (
            isDup.length === 0 &&
            value.node_type.description === typeSwitch
          ) {
            state.traceloggerNodes[payload.key].push(value);

            state.traceloggerNodes[payload.key] = sortService.sortName(
              state.traceloggerNodes[payload.key],
              true
            );
          }
        });
      } else if (payload.action === "remove") {
        array.forEach(value => {
          let newState = state.traceloggerNodes[payload.key].filter(
            d => d.id !== value.id
          );

          state.traceloggerNodes[payload.key] = sortService.sortName(
            newState,
            true
          );
        });
      } else if (payload.action === "update") {
        let updateNode = state.traceloggerNodes[payload.key].filter(
          d => d.id === payload.updateid
        );
        if (updateNode[0]) {
          let newNode = updateNode[0];
          newNode.name = array.name;
          newNode.description = array.description;
          newNode.data_center = array.data_center;
          newNode.hostname = array.hostname;
          newNode.sftp_hostname = array.hostname;
          newNode.online = array.online;
          newNode.sftp_credentials = array.sftp_credentials;

          let index = state.traceloggerNodes[payload.key].findIndex(
            x => x.id === payload.updateid
          );
          state.traceloggerNodes[payload.key][index] = newNode;

          state.traceloggerNodes[payload.key] = sortService.sortName(
            state.traceloggerNodes[payload.key],
            true
          );
        }
      }
    },
    updateTasksPayload(state, payload) {
      if (payload.final) {
        state.tasksPayload[payload.key_value] = payload.value;
      } else if (payload.meta) {
        state.tasksPayload[payload.name].meta[payload.meta] = payload.value;
      } else if (payload.run_duration) {
        if (state.tasksCommonData.run_time) {
          if (state.tasksCommonData.run_time.id === 2) {
            state.tasksPayload[payload.name].meta.run_duration =
              payload.run_duration;
          } else {
            state.tasksPayload[payload.name].meta.run_duration =
              payload.run_duration;
            if (payload.run_duration.start_time) {
              state.tasksPayload[payload.name].start_time =
                payload.run_duration.start_time;
            }
            if (state.tasksPayload[payload.name].time_zone) {
              state.tasksPayload[payload.name].time_zone =
                payload.run_duration.time_zone;
            }
          }
        }
      } else {
        if (payload.key_value !== undefined) {
          state.tasksPayload[payload.name][payload.key_value] = payload.value;
        }
      }
    },
    updateTasksCommonData(state, payload) {
      state.tasksCommonData[payload.name] = payload.value;
    },
    clearTaskPayloadData(state) {
      state.tasksPayload = baseTaskPayload();
    },
    clearTaskData(state) {
      state.tasksCommonData = baseTaskData();
    },
    setCurrentClusterData(state, payload) {
      state.currentClusterData = payload;
    },
    setCallID(state, payload) {
      state.idToAnalyze = payload;
    },
    setCurrentCustomer(state, payload) {
      state.currentCustomer = payload;
    },
    clearCustomer(state) {
      state.currentCustomer = null;
    },
    setCurrentUser(state, payload) {
      state.currentUser = payload;
    },
    clearCurrentUser(state) {
      state.currentUser = null;
    },
    setCUCMPage(state, page) {
      state.cucmPage = page;
    },
    setCUCMSelectedClusterName(state, payload) {
      state.cucmSelectedClusterName = payload;
    },
    setSIPLadder(state, payload) {
      state.sipLadder.callids = payload.callids;
      state.sipLadder.data = payload.data;
    },
    setTaskNameSelected(state, payload) {
      state.taskNameSelected = payload;
    },
    removeTaskNameSekected(state) {
      state.taskNameSelected = "";
    },
    updateTaskRunIdsSelected(state, payload) {
      let currentIds = state.taskRunIdsSelected;
      const indexOfIncoming = currentIds.findIndex(i => i.id === payload.id);
      if (indexOfIncoming === -1) {
        currentIds.push(payload);
      } else {
        currentIds.splice(indexOfIncoming, 1);
      }
      state.taskRunIdsSelected = currentIds;
    },
    emptyTaskRunIdsSelected(state) {
      state.taskRunIdsSelected = [];
    }
  },
  actions: {
    saveToRediscList(context, value) {
      context.commit("addToRediscList", value);
    },
    saveRediscStatus(context, value) {
      context.commit("updateRediscStatus", value);
    },
    saveComingFromOtherPage(context, value) {
      context.commit("updateComingFromOtherPage", value);
    },
    clearAllAssets(context) {
      context.commit("hideAssetsInfo");
    },
    clearTaskPayload(context) {
      context.commit("clearTaskPayloadData");
    },
    clearTaskDataStore(context) {
      context.commit("clearTaskData");
    }
  },
  getters: {
    rediscStatus: state => state.rediscStatus,
    rediscArray: state => state.rediscArray,
    rediscStatusArray: state => state.rediscStatusArray,
    comingFromOtherPage: state => state.comingFromOtherPage,
    hideAssets: state => state.hideAssets,
    getTraceloggerNodes: state => state.traceloggerNodes,
    getTasksPayload: state => state.tasksPayload,
    getTasksCommonData: state => state.tasksCommonData,
    getClusterData: state => state.currentClusterData,
    globalFeedbackMessages: state => state.globalFeedbackMessages,
    getSetCallID: state => state.idToAnalyze,
    getCustomer: state => JSON.parse(state.currentCustomer),
    getCurrentUser: state => state.currentUser,
    getUtcTimeNow: state => state.utcTimeNow,
    getCUCMPage: state => state.cucmPage,
    getCucmSelectedCluster: state => state.cucmSelectedClusterName,
    getSIPLadder: state => state.sipLadder,
    getSelectedTaskName: state => state.taskNameSelected,
    getTaskRunsIdsSelected: state => state.taskRunIdsSelected
  }
});
