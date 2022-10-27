import Vue from "vue";
import Vue2Filters from "vue2-filters";
import Tooltip from "vue-directive-tooltip";
import VueLogger from "vuejs-logger";
import VueSweetalert2 from "vue-sweetalert2";
import FileUpload from "v-file-upload";
import VueSplide from "@splidejs/vue-splide";
import Vuelidate from "vuelidate";
import { mdbSelect, mdbContainer } from 'mdbvue';
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import OrganizationChart from 'vue-organization-chart'
import { IconsPlugin } from "bootstrap-vue";
import VueGoodTablePlugin from 'vue-good-table';

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle"
import "bootstrap-vue/dist/bootstrap-vue.css";
import 'vue-good-table/dist/vue-good-table.css'

import "bootstrap-vue/dist/bootstrap-vue-icons.min.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import App from "@/App.vue";
import { router } from "@/router";

import PostAuthLayout from "@/layouts/PostAuthLayout.vue";
import PostAuth1Layout from "@/layouts/PostAuth1Layout.vue";
import HomeLayout from "@/layouts/HomeLayout.vue";
import LandingPageLayout from "@/layouts/LandingPageLayout.vue";
import CfdsLayout from "@/layouts/CfdsLayout.vue";
import PreAuthLayout from "@/layouts/PreAuthLayout.vue";
import { store } from "./store/store";

import Highcharts from "highcharts";
import Highcharts3d from "highcharts/highcharts-3d";
import HighchartsVue from "highcharts-vue";

import * as Treeviz from 'treeviz';

import Canvg from "canvg";

//import * as mdbvue from 'mdbvue'

/*for (const component in mdbvue) {
  Vue.component(component, mdbvue[component])
}*/

library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Highcharts3d(Highcharts);
Vue.use(HighchartsVue);

Vue.use(Treeviz);



Vue.use(BootstrapVueIcons);
Vue.use(IconsPlugin);
Vue.use(VueSplide);
Vue.use(VueGoodTablePlugin);

// Enable Vue2Filters plugin
// https://www.npmjs.com/package/vue2-filters
Vue.use(Vue2Filters);

// Enable tooltips
// https://www.npmjs.com/package/v-tooltip
// Vue.use(VTooltip)
Vue.use(Tooltip);

// Enable Vuelidate plugin
// https://www.npmjs.com/package/vuelidate
Vue.use(Vuelidate);

// Enable fileupload
// https://github.com/dflourusso/v-file-upload
// Vue.use(FileUpload)
Vue.use(FileUpload);

// Enable VueLogger plugin
// https://www.npmjs.com/package/vuejs-logger
const loggerOptions = {
  isEnabled: true,
  logLevel: process.env.NODE_ENV === "production" ? "error" : "debug",
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: "|",
  showConsoleColors: true,
};
Vue.use(VueLogger, loggerOptions);

// Enable VueSweetalert2 plugin
// https://www.npmjs.com/package/vue-sweetalert2
const alertOptions = {
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
};
Vue.use(VueSweetalert2, alertOptions);

// Register global layouts
Vue.component("PostAuthLayout", PostAuthLayout);
Vue.component("PostAuth1Layout", PostAuth1Layout);
Vue.component("PreAuthLayout", PreAuthLayout);
Vue.component("HomeLayout", HomeLayout);
Vue.component("LandingPageLayout",LandingPageLayout);
Vue.component("CfdsLayout", CfdsLayout);

// Turn off production tip
Vue.config.productionTip = false;

// Instantiate Vue object
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

// Vue.http.headers.common["frame-ancestors"] = "None";
