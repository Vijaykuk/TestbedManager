<script>
import { router } from "@/router";
import { store } from "../store/store";
import { testcaseService } from "@/core/services/testcaseService";
import { requestOptions } from "@/core/helpers/request";
import ContextMenu from "../components/global/ContextMenu/ContextMenu";
import ContextMenuItem from "../components/global/ContextMenu/ContextMenuItem";
import { Splide, SplideSlide } from "@splidejs/vue-splide";

export default {
  name: "CustomerListPage",
  data() {
    return {
      custObj: {},
      custArray: [],
      error: false,
      errorMessage: "",
      loading: false,
      loadingMessage: "",
      modalInfoMessage: "",
      showInfoModal: false,
      showInfoModalClass: "",
      showErrorModal: false,
      modalErrorMessage: "",
      showCreateCustomerModal: false,
      createBtnName:"",
      createCustomerTitle:"",
      slides: [],
      splideOptions: {
        rewind: true,
        width: "100%",
        perPage: 3,
        gap: "1rem",
        perMove: 1,
        speed: 150,
        autoplay: true,
      },
      logoSrc: "",
      logoImage: null,
      imgUploaded: false,
      formValues: {},
    };
  },
  components: {
    ContextMenu,
    ContextMenuItem,
    Splide,
    SplideSlide,
  },
  mounted() {
    this.loadCustomers();
    localStorage.removeItem('customer');
  },
  watch: {},
  methods: {
    createCustomer: function(e) {
      var form_data = new FormData();
      if (this.editCustomer === true) {
        let custId= this.custObj.id;
        let custName=this.custObj.name;
         this.loading = true;
         this.loadingMessage = "Updating Customer..";
         let jsonObj = { name: custName };
          form_data.append("jsonObj", JSON.stringify(jsonObj));
          if (this.imgUploaded) {
            form_data.append("logo_image", this.logoImage);
          }
          testcaseService.updateCustomer(form_data,custId).then(
            (data) => {
              if (data) {
               this.imgUploaded = false;
                this.logoImage = null;
                this.loading = false;
                this.loadingMessage = "";
                this.closeCreateCustomerModal();
                  this.loadCustomers();
               
              }
            },
            (error) => {
              this.loading = false;
              this.loadingMessage = "";
              this.showErrorModal = true;
              this.modalErrorMessage =
                "Error while creating Customer, Please try again later";
            }
          );
        } else {
        let custName = this.custObj.name;
        let custNames = [];
        if (this.custArray.length > 0) {
          for (let i = 0; i < this.custArray.length; i++) {
            custNames.push(this.custArray[i].name);
          }
        }
        if (
          (custNames.length > 0 && custNames.indexOf(custName) < 0) ||
          custNames.length <= 0
        ) {
          this.loading = true;
          this.loadingMessage = "Creating Customer..";
          let jsonObj = { name: custName };
          form_data.append("jsonObj", JSON.stringify(jsonObj));
          if (this.imgUploaded) {
            form_data.append("logo_image", this.logoImage);
          }
          testcaseService.createCustomer(form_data).then(
            (data) => {
              if (data) {
                this.imgUploaded=false;
                this.imgUploaded = false;
                this.logoImage = null;
                this.loading = false;
                this.loadingMessage = "";
                this.closeCreateCustomerModal(); 
                this.loadCustomers();
               }
            },
            (error) => {
              this.loading = false;
              this.loadingMessage = "";
              this.showErrorModal = true;
              this.modalErrorMessage =
                "Error while creating Customer, Please try again later";
            }
          );
        } else {
          this.loading = false;
          this.loadingMessage = "";
          this.showErrorModal = true;
          this.modalErrorMessage = "Duplicate Customer names not allowed.";
        }
        e.preventDefault();
      }
    },
    openCustomerMenu(e, custObj) {
      this.$refs.cmenu.open(e, custObj);
      event.preventDefault();
    },
    editCustomerClicked(custObj) {
      this.$refs.cmenu.close();
      let temp = custObj.id.split("_");
      let custId = temp[temp.length - 1];
      this.custObj.id=custId;
      this.custObj.name = custObj.name;
      this.showCreateCustomerModal = true;
      this.createCustomerTitle="Edit Customer";
      this.createBtnName="Update";
      this.editCustomer = true;
    },
    deleteCustomerClicked(custObj) {
      this.$refs.cmenu.close();
      let temp = custObj.id.split("_");
      let custId = temp[temp.length - 1];

      this.loading = true;
      this.loadingMessage = "Deleting Customer..";
      testcaseService.deleteCustomer(custId).then(
        (data) => {},
        (error) => {
          this.loading = false;
          this.loadingMessage = "";
          this.showErrorModal = true;
          this.modalErrorMessage =
            "Error while deleting customer, Please try again later";
        }
      );
      this.loading = false;
      this.loadingMessage = "";
      this.loadCustomers();
      //delete API
    },
    uploadLogo: function(e) {
      this.logoSrc = "";
      const file = e.target.files[0];
      this.logoImage = file;
      let filename = file.name.split(".")[0];
      this.imgUploaded = true;
      this.formValues.logo = filename;
      this.logoSrc = URL.createObjectURL(file);
    },
    closeCreateCustomerModal: function() {
      this.showCreateCustomerModal = false;
      this.custObj = {};
      this.editCustomer = false;
    },
    createCustomerClicked: function() {
      this.showCreateCustomerModal = true;
      this.createCustomerTitle="Create Customer";
      this.createBtnName="Create";
      this.custObj = {};
    },

    getImgUrl(pic) {
      if (pic != "") {
        let pic1 = pic.substring(pic.lastIndexOf("/") + 1);
        return requestOptions.apiUrl() + "/get_customer_logo/admin/" + pic1;
      } else {
        return require("../assets/images/default.png");
      }
    },
    closeInfoModal() {
      this.showInfoModal = false;
      this.showInfoModalClass = "";
      this.modalInfoMessage = "";
    },
    closeErrorModal() {
      this.modalErrorMessage = "";
      this.showErrorModal = false;
    },
    loadCustomers: function() {
      this.slides = [];
      this.loading = true;
      this.loadingMessage = "Loading Customer details...";
      testcaseService.getCustomerList().then(
        (data) => {
          this.loading = false;
          this.loadingMessage = "";
          this.custArray = data;
          for (let i = 0; i < this.custArray.length; i++) {
            let obj = {};
            obj["name"] = this.custArray[i].name;
            obj["src"] = this.custArray[i].img ? this.custArray[i].img : "";
            if (this.custArray[i].name.toLowerCase() === "google") {
              obj["src"] = "googleLogo.png";
            }
            obj["id"] = this.custArray[i].name + "_" + this.custArray[i].id;
            this.slides.push(obj);
          }
          let customerBoxesList = document.querySelectorAll(".insideBox");
          for (let k = 0; k < customerBoxesList.length; k++) {
            customerBoxesList[k].addEventListener("click", (e) => {
              this.customerClicked(e);
              e.preventDefault();
            });
          }
        },
        (error) => {
          this.loading = false;
          this.loadingMessage = "";
        }
      );
    },
    formatDate: function(d) {
      let date = new Date(d);
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? "pm" : "am";
      hours %= 12;
      hours = hours || 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      let strTime = `${hours}:${minutes}${ampm}`;
      return `${date.getMonth() +
        1}/${date.getDate()}/${date.getFullYear()} ${strTime}`;
    },
    customerClicked(event) {
      debugger;
      let customerId = event.currentTarget.children[1].id.split("_")[1];
      let customerName = event.currentTarget.children[1].innerText;
      localStorage.setItem("customer", customerName);
      router.push({
        name: "CustomerReleasesPage",
        params: { customerId: customerId, customerName: customerName },
      });
    },
  },
};
</script>
<template>
  <div style="height:100%">
    <div class="custPage">
      <div class="ocean">
        <h1 class="apptitle">CVT Management System</h1>
        <div class="createCustomerBtn">
          <button
            class="btn btn--primary cm_addBtn"
            @click="createCustomerClicked"
          >
            <span
              v-tooltip.right="{
                html: 'viewTopoContent',
                class: 'cisco-tooltip',
              }"
            >
              <i class="icon icon-plus"> </i>
            </span>
            <div id="viewTopoContent">
              Create Customer
            </div>
          </button>
        </div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="customerDiv">
          <splide :options="splideOptions" :slides="slides" class="mySlides">
            <splide-slide
              class="customerSlides"
              v-for="slide in slides"
              :key="slide.src"
            >
              <div class="customer-module">
                <div
                  class="insideBox"
                  @click="customerClicked"
                  @contextmenu="openCustomerMenu($event, slide)"
                >
                  <img
                    :src="getImgUrl(slide.src)"
                    height="50px"
                    width="50px"
                    style="background-size:100% 100%;margin:30px;"
                  />
                  <div class="customerName" :id="slide.id">
                    {{ slide.name }}
                  </div>
                </div>
              </div>
            </splide-slide>
          </splide>
        </div>
      </div>
      <div class="secondryContainer">
        <div class="centralizedDiv secondryDiv">
          <div class="centralisedInnerDiv1 innerDiv1">
            <div class="box box1">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <div class="content">
                <h5>Centralized Test Plan</h5>
              </div>
            </div>
          </div>
          <div class="centralisedInnerDiv2 innerDiv2">
            <div class="centralisedText innerDivText">
              Centralized Test plan management. All test cases in one place,
              easy to collaborate, manage and organize the testcases from the
              master test plan Simple web interface to create new test plan from
              available test cases, option to read new test cases from excel &
              word doc Option to organize the test plan per release per customer
              strcuture
            </div>
          </div>
        </div>

        <div class="centralizedDiv secondryDiv">
          <div class="centralisedInnerDiv2 innerDiv2">
            <div class="centralisedText innerDivText">
              One click integration with TIMS to create new tims report One
              common web interface to update results to TIMS Generate projected
              vs actual execution report from execution status to help in
              prioritizing test cases
            </div>
          </div>
          <div class="centralisedInnerDiv1 innerDiv1">
            <div class="box box2">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <div class="content">
                <h5>TIMS Integration</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="centralizedDiv secondryDiv">
          <div class="centralisedInnerDiv1 innerDiv1">
            <div class="box box3">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <div class="content">
                <h5>Improve Productivity</h5>
              </div>
            </div>
          </div>
          <div class="centralisedInnerDiv2 innerDiv2">
            <div class="centralisedText innerDivText">
              Centralized Test plan management. All test cases in one place,
              easy to collaborate, manage and organize the testcases from the
              master test plan Simple web interface to create new test plan from
              available test cases, option to read new test cases from excel &
              word doc Option to organize the test plan per release per customer
              strcuture
            </div>
          </div>
        </div>

        <div class="centralizedDiv secondryDiv">
          <div class="centralisedInnerDiv2 innerDiv2">
            <div class="centralisedText innerDivText">
              Centralized Test plan management. All test cases in one place,
              easy to collaborate, manage and organize the testcases from the
              master test plan Simple web interface to create new test plan from
              available test cases, option to read new test cases from excel &
              word doc Option to organize the test plan per release per customer
              strcuture
            </div>
          </div>
          <div class="centralisedInnerDiv1 innerDiv1">
            <div class="box box4">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <div class="content">
                <h5>Test log Management</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="centralizedDiv secondryDiv">
          <div class="centralisedInnerDiv1 innerDiv1">
            <div class="box box5">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <div class="content" style="padding-top: 30px;">
                <h5>Result tracking across releases</h5>
              </div>
            </div>
          </div>
          <div class="centralisedInnerDiv2 innerDiv2">
            <div class="centralisedText innerDivText">
              Centralized Test plan management. All test cases in one place,
              easy to collaborate, manage and organize the testcases from the
              master test plan Simple web interface to create new test plan from
              available test cases, option to read new test cases from excel &
              word doc Option to organize the test plan per release per customer
              strcuture
            </div>
          </div>
        </div>

        <div class="centralizedDiv secondryDiv">
          <div class="centralisedInnerDiv2 innerDiv2">
            <div class="centralisedText innerDivText">
              Centralized Test plan management. All test cases in one place,
              easy to collaborate, manage and organize the testcases from the
              master test plan Simple web interface to create new test plan from
              available test cases, option to read new test cases from excel &
              word doc Option to organize the test plan per release per customer
              strcuture
            </div>
          </div>
          <div class="centralisedInnerDiv1 innerDiv1">
            <div class="box box6">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <div class="content">
                <h5>Customizable Test Report</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="centralizedDiv secondryDiv">
          <div class="centralisedInnerDiv1 innerDiv1">
            <div class="box box7">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <div class="content">
                <h5>Dashboard for various metrics</h5>
              </div>
            </div>
          </div>
          <div class="centralisedInnerDiv2 innerDiv2">
            <div class="centralisedText innerDivText">
              Centralized Test plan management. All test cases in one place,
              easy to collaborate, manage and organize the testcases from the
              master test plan Simple web interface to create new test plan from
              available test cases, option to read new test cases from excel &
              word doc Option to organize the test plan per release per customer
              strcuture
            </div>
          </div>
        </div>
      </div>
      <div v-if="showCreateCustomerModal" class="createCustomerModal">
        <div
          class="modal__header"
          style="display:flex; justify-content:space-between; margin-bottom:5px;"
        >
          <div class="modal_title">{{createCustomerTitle}}</div>
          <span
            class="icon-close icon-small interaction"
            v-on:click="closeCreateCustomerModal()"
          ></span>
        </div>
        <div class="modal__body" style="display:flex; justify-content:center;">
          <form class="create_customer">
            <div class="form-group__text tm-form__text row" style="width:100%">
              <label class="cm-label">
                Customer Name
              </label>
              <input
                class="custInput"
                type="text"
                name="customer"
                v-model="custObj.name"
              />
            </div>
            <div class="form-group__text tm-form__text row">
              <label class="cm-label">
                Upload Logo
              </label>
              <input
                type="file"
                class="logo_file logoBtnClass"
                @change="uploadLogo"
                style="display:inline-block"
              />
            </div>
            <div class="tm_btn-container">
              <button
                class="btn btn--secondary tmBtn"
                @click="closeCreateCustomerModal"
                style="font-size:1.4rem;"
              >
                Cancel
              </button>
              <button
                class="btn btn--secondary tmBtn"
                @click="createCustomer"
                style="font-size:1.4rem;"
              >
                {{createBtnName}}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        v-if="loading"
        class="loadingModal"
        style=" height: 60px !important;
        position: absolute !important;     z-index: 100000;"
      >
        <div class="modal__body" style="display:flex; justify-content:center;">
          {{ loadingMessage }}
        </div>
      </div>
      <div v-if="showErrorModal" class="ErrorModal">
        <div
          class="modal__header"
          style="display:flex; justify-content:space-between; margin-bottom:5px;"
        >
          <div class="modal_title">Error</div>
          <span
            class="icon-close icon-small interaction"
            v-on:click="closeErrorModal()"
          ></span>
        </div>
        <div class="modal__body" style="display:flex; justify-content:center;">
          {{ modalErrorMessage }}
        </div>
      </div>
      <div v-if="showInfoModal" class="ErrorModal">
        <div
          class="modal__header"
          style="display:flex; justify-content:space-between; margin-bottom:5px;"
        >
          <div class="modal_title">Info</div>
          <span
            class="icon-close icon-small interaction"
            v-on:click="closeInfoModal()"
          ></span>
        </div>
        <div class="modal__body" style="display:flex; justify-content:center;">
          <div :class="showInfoModalClass">{{ modalInfoMessage }}</div>
        </div>
      </div>
      <ContextMenu ref="cmenu" class="cmenu">
        <template slot-scope="{ contextData }">
          <ContextMenuItem @click.native="editCustomerClicked(contextData)">
            Edit
          </ContextMenuItem>
          <ContextMenuItem @click.native="deleteCustomerClicked(contextData)">
            Delete
          </ContextMenuItem>
        </template>
      </ContextMenu>
    </div>
  </div>
</template>
