<template>
  <div class="container m-5">
          <div
      v-if="loading"
      class="loadingModal"
      style=" height: 60px !important;
        position: absolute !important;     z-index: 100000;"
    >
      <div class="modal__body" style="display:flex; justify-content:center; padding-top:12px !important">
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
    <div v-if="showConfirmModal" class="confirmModal">
      <div
        class="modal__header"
        style="display:flex; justify-content:space-between; margin-bottom:5px;"
      >
        <div class="modal_title">Confirm</div>
        <span
          class="icon-close icon-small interaction"
          v-on:click="closeConfirmModal()"
        ></span>
      </div>
      <div class="modal__body" style="display:flex; justify-content:center;">
        <div style="width:100%">{{ modalConfirmMessage }}</div>
        <div class="tm_btn-container" style="width:100%;display:flex">
          <button
            class="btn btn--secondary tmBtn"
            @click="closeConfirmModal()"
            style="font-size:1.4rem;"
          >
            Cancel
          </button>
          <button
            class="btn btn--secondary tmBtn"
            @click="confirmCallBack()"
            style="font-size:1.4rem;"
          >
            OK
          </button>
        </div>
      </div>
    </div>

    <div class="row">
        <div class="col-md-12">
                 <div class="card">
            <div class="card-header">
                <h3>Add CFD</h3>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="addItem">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group ">
                        <label>CFD IDs:</label>
                        <textarea type="text" rows="6" class="form-control form-control-lg" v-model="addCFDObj.defect_id">
                        </textarea>
                    </div>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-md-2">
                         <div class="form-group">
                        <label>Customer Name:</label>
                        <input type="text" class="form-control" v-model="addCFDObj.customer_name"/>
                    </div>

                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                        <label>Customer Release:</label>
                        <input type="text" class="form-control" v-model="addCFDObj.customer_release"/>
                    </div>
                    </div>
                    
                  </div>
                  <div class="row" style="margin-top: 20px;">
                    <div class="col-sm-1 text-left">
                         <div class="form-group">
                          <button>
                            <!-- class="btn btn-primary btn-lg btn-block btn" -->
                              <router-link to="/cfds">
                        Back
                        </router-link>
                          </button>
                      

                    </div>

                    </div>
                    <div class="col-sm-1">
                         <div class="form-group">

                          <button>
                            <!--  class="btn btn-primary"  -->
                             <!-- <input type="submit" value="Add CFD"/> -->
                             Add CFD
                          </button>
                       
                    </div>

                    </div>
                  </div>
                </form>
            </div>
        </div>
    </div>
    </div>
   </div>
</template>

<script>
import { testcaseService } from "@/core/services/testcaseService";
import { router } from "@/router";
export default {
  components: {
      name: 'AddItem'
  },
  data() {
      return {
          addCFDObj:{
            defect_id: '',
            customer_release: '',
            
          },
      errorMessage: "",
      loading: false,
      loadingMessage: "",
      loading1: false,
      loadingMessage1: "",
      modalInfoMessage: "",
      showInfoModal: false,
      showInfoModalClass: "",
      showErrorModal: false,
      showConfirmModal: false,
      modalErrorMessage: "",

      }
  },

  methods: {
      closeInfoModal() {
      this.showInfoModal = false;
      this.showInfoModalClass = "";
      this.modalInfoMessage = "";
    },
     closeErrorModal() {
      this.modalErrorMessage = "";
      this.showErrorModal = false;
    },

    closeConfirmModal() {
      this.showConfirmModal = false;
      this.modalConfirmMessage = "";
      this.deleteType = "";
      this.deleteObj = {};
      this.deleteConfirmed = false;
    },

      addItem() {
        debugger;
        let self =this;
        this.loading =true;
        this.loadingMessage ="Adding CFds Please wait...."
        this.addCFDObj.defect_id = this.addCFDObj.defect_id.replace(/\n|\r|,/g, ",");

       let addCFDdata = JSON.parse(JSON.stringify(this.addCFDObj));
      //  console.log(addCFDdata);
          testcaseService.addCFD(addCFDdata).then(
            (data) => {
            
              if (data) {
            self.loading = false;
            self.loadingMessage = "";
            self.showInfoModal = true;
            self.modalInfoMessage = "CFD Added successfully";
               return this.$router.push('/cfds');
               

              }
              else{
                return this.$router.push('/cfds/add');
              }
            },
              (error) => {
                 this.loading = false;
                 this.loadingMessage = "";
                 this.showErrorModal = true;
                if(error.message){
                      this.modalErrorMessage =error.message;
                  }
                  else{ 
                      this.modalErrorMessage = "Error while Adding CFD Please Check ";
                  }
        }
          )
        }
    }
}
</script>

<style scoped>
button {
  display: inline-block;
                outline: 0;
                border: none;
                cursor: pointer;
                height: 40px;
                padding: 12px 17px;
                border-radius: 50px;
                background-color: #2222220d;
                color: #222;
                font-size: 16px;
                font-weight: 500;
               
	/* background: none;
	border: none;
	cursor: pointer;
	outline: inherit; */
}
button :hover {
                    background-color: #2222221a;
                }

</style>