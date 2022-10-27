/* eslint-disable */

import Vue from "vue";
import Router from "vue-router";
import { Role } from "@/core/auth";
import { authenticationService } from "@/core/services/auth";
import testcaseListPage from "@/pages/testcaseList";
import topologySlides from "@/pages/topologySlides";
import projectListPage from "@/pages/projectListPage";
import CustomerListPage from "@/pages/CustomerListPage";
import CustomerReleasesPage from "@/pages/CustomerReleasesPage";
import HomePage from "@/pages/HomePage";
import LandingPage from "@/pages/LandingPage";
import CfdsListPage from "@/pages/CfdsListPage";
import AddCfd from "@/pages/AddCfd.vue";
import EditCfd from "@/pages/EditCfd.vue";
import ViewCfd from "@/pages/ViewCfd.vue";

Vue.use(Router);

const testcaseList = {
  props: ["projectId", "customerId", "releaseId"],
  template: testcaseListPage,
};

const topologiesPage = {
  props: ["projectId"],
  template: topologySlides,
};

const CustomerReleases = {
  props: ["redirectToType", "redirectToName"],
  template: CustomerReleasesPage,
};

export const router = new Router({
  base: `/Testbed-Manager/`,
  routes: [
    buildRoute({
      path: "/login/",
      name: "login",
      component: () => import("@/pages/LoginPage.vue"),
      layout: "PreAuth",
    }),
    buildRoute({
      path: "/",
      name: "LandingPage",
      component: LandingPage,
      authorize: [Role.ADMIN, Role.USER],
      layout: "Home",
    }),

    // CFds...
    buildRoute({
      path: "/Cfds",
      name: "CfdsListPage",
      component: CfdsListPage,
      authorize: [Role.ADMIN, Role.USER],
      layout: "Cfds",
    }),

    buildRoute({
      path: "/Cfds/add",
      name: "AddCfd",
      component: AddCfd,
      authorize: [Role.ADMIN, Role.USER],
      layout: "Cfds",
    }),

    buildRoute({
      path: "/Cfds/edit/:cfdId",
      name: "EditCfd",
      component: EditCfd,
      authorize: [Role.ADMIN, Role.USER],
      layout: "Cfds",
    }),

    buildRoute({
      path: "/Cfds/view/:cfdId",
      name: "ViewCfd",
      component: ViewCfd,
      authorize: [Role.ADMIN, Role.USER],
      layout: "Cfds",
    }),

    /* buildRoute({
      path: "/",
      name: "/releases/customer_1",
      component: CustomerReleasesPage,
      layout: "Home",
      authorize: [Role.ADMIN, Role.USER],
      props: true,
    }),*/
    buildRoute({
      path: "/HomePage",
      name: "HomePage",
      component: HomePage,
      layout: "Home",
      props: true,
      authorize: [Role.ADMIN, Role.USER],
    }),
    buildRoute({
      path: "/LandingPage",
      name: "LandingPage",
      component: LandingPage,
      props: true,
      layout: "Home",
      authorize: [Role.ADMIN, Role.USER],
    }),
    buildRoute({
      path: "/releases/LandingPage",
      name: "LandingPage",
      component: LandingPage,
      props: true,
      layout: "Home",
      authorize: [Role.ADMIN, Role.USER],
    }),
    buildRoute({
      path: "/releases/HomePage",
      name: "HomePage",
      component: HomePage,
      layout: "Home",
      props: true,
      authorize: [Role.ADMIN, Role.USER],
    }),
    buildRoute({
      path: "/page/:redirectToType/:redirectToName",
      name: "CustomerReleasesPage",
      component: CustomerReleasesPage,
      props: true,
      layout: "Home",
      authorize: [Role.ADMIN, Role.USER],
    }),
    buildRoute({
      path: "/projects/project_:projectId",
      name: "testcaseListPage",
      component: testcaseListPage,
      props: true,
      authorize: [Role.ADMIN, Role.USER],
    }),
    buildRoute({
      path: "/projectListPage/",
      name: "projectListPage",
      component: projectListPage,
      authorize: [Role.ADMIN, Role.USER],
    }),
    buildRoute({
      path: "/topologies/:projectId",
      name: "topologySlides",
      component: topologySlides,
      props: true,
      authorize: [Role.ADMIN, Role.USER],
    }),
    buildRoute({
      path: "*",
      name: "404",
      component: () => import("@/pages/Http404Page.vue"),
    }),
  ],
});

/*
 * Helper function for building routes with repeating options
 * and meta attributes.
 */
function buildRoute(options) {
  let route = {
    path: options.path,
    name: options.name,
    component: options.component,
    props: options.props || false,
    meta: {},
    pathToRegexpOptions: {
      strict: true,
    },
  };
  // Optional authorize meta property
  if (options.authorize) {
    route.meta.authorize = options.authorize;
  }
  // Optional layout meta property
  if (options.layout) {
    route.meta.layout = options.layout;
  }

  // Return route
  return route;
}

/*
 * Route guard function that checks to make sure user is logged in
 * and whether user is authorized to view a protected page.
 */
router.beforeEach((to, from, next) => {
  const { authorize } = to.meta;
  const currentUser = authenticationService.currentUserValue;
  //store.dispatch("saveComingFromOtherPage", true);

  // If page has authorize meta attribute
  if (authorize) {
    // Check for active session
    // Redirect to login page if there isn't an active session
    if (!currentUser) {
      return next({ name: "login", query: { returnUrl: to.path } });
    }

    // Check if route is restricted by role for the current user
    // Redirect to home page if current user's role isn't in
    // the authorized roles list for this route
  }

  // Otherwise, route as usual
  next();
});
