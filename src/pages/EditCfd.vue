<template>
  <div class="container">
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

        <div class="card" style="margin: 40px;" >
            <div class="card-header">
                <h3>Edit CFDs </h3>

            </div>
            <div class="card-body"></div>
                <form v-on:submit.prevent="updateItem">
                  <!-- Row 1 -->
                  <div class="row">
                    <div class="col-md-2">
                      <div class="form-group">
                        <label>CFD IDs:</label>
                        <input type="text" class="form-control" v-model="updateCFDObj.defect_id" disabled/>
                    </div>
                    </div>
                     <div class="col-md-2">
                      <div class="form-group">
                        <label>Product:</label>
                        <input type="text" class="form-control" v-model="updateCFDObj.product" disabled/>
                    </div>
                    </div>
                     <div class="col-md-2">
                      <div class="form-group">
                        <label>Severity:</label>
                        <input type="text" class="form-control" v-model="updateCFDObj.severity" disabled/>
                    </div>
                    </div>
                     <div class="col-md-2">
                      <div class="form-group">
                        <label>Component:</label>
                        <input type="text" class="form-control" v-model="updateCFDObj.component" disabled />
                    </div>
                    </div>
                     <div class="col-md-2">
                      <div class="form-group">
                        <label>Version:</label>
                        <input type="text" class="form-control" v-model="updateCFDObj.version" disabled/>
                    </div>
                    </div>
                     <div class="col-md-2">
                      <div class="form-group">
                        <label>Status:</label>
                        <input type="text" class="form-control" v-model="updateCFDObj.status" disabled/>
                    </div>
                    </div>

                  </div>
                   
                  <!-- Row 2 -->
                  <div class="row" style="margin-top: 20px;">
                    <div class="col-md-2">
                      <div class="form-group">
                        <label>DE Mgr:</label>
                        <input type="text" class="form-control" v-model="updateCFDObj.de_mgr" disabled/>
                    </div>
                    </div>
                    <div class="col-md-2">
                      <div class="form-group">
                        <label>Original Found:</label>
                        <input type="text" class="form-control" v-model="updateCFDObj.original_found" disabled/>
                    </div>
                    </div>
                    <div class="col-md-2">
                      <div class="form-group">
                        <label>Customer Name:</label>
                        <input type="text" class="form-control" v-model="updateCFDObj.customer_release" disabled/>
                    </div>
                    </div>
                    <div class="col-md-2">
                      <div class="form-group">
                        <label>Service request:</label>
                        <input type="text" class="form-control" v-model="updateCFDObj.service_request" disabled/>
                    </div>
                    </div>
                     <div class="col-md-4">
                      <div class="form-group">
                        <label>TEACAT:</label>
                        <input type="text" class="form-control" v-model="updateCFDObj.teacat" disabled/>
                    </div>
                    </div>

                  </div>
                  <!-- Row 3 -->
                  <div class="row"  style="margin-top: 20px;">
                     <div class="col-md-3">
                      <div class="form-group">
                        <label>CFD Phase:</label>
                        <input type="text" class="form-control" v-model="updateCFDObj.cfd_phase"/>
                    </div>
                    </div>
                     <div class="col-md-3">
                      <div class="form-group">
                        <label>Escape Owner:</label>
                        <input type="text" class="form-control" v-model="updateCFDObj.escape_owner"/>
                    </div>
                    </div>
                     <div class="col-md-3">
                      <div class="form-group">
                        <label>Escape Analysis:</label>
                        <input type="text" class="form-control" v-model="updateCFDObj.escape_analysis"/>
                    </div>
                    </div>
                     <div class="col-md-3">
                      <div class="form-group">
                        <label>Analysis Status:</label>
                        <input type="text" class="form-control" v-model="updateCFDObj.analysis_status"/>
                    </div>
                    </div>

                  </div>
                    <!-- Row 4 -->
                  <div class="row" style="margin-top: 20px;">
                     <div class="col-md-6">
                      <div class="form-group">
                        <label>Headline:</label>
                        <textarea  rows="4"   class="form-control" v-model="updateCFDObj.headline" disabled>
                         </textarea>
                    </div>
                    </div>
                     <div class="col-md-6">
                      <div class="form-group">
                        <label>Escape Reason:</label>
                        <textarea  rows="4" class="form-control" v-model="updateCFDObj.escape_reason">">
                         </textarea>
                    </div>
                    </div>
                  </div>
                  <div class="row" style="margin-top: 20px;">
                    <div class="col-sm-1">
                         <div class="form-group">
                        <router-link to="/cfds" class="btn btn-primary btn-lg btn-block btn">
                        Back

                        </router-link>

                    </div>
                    

                    </div>
                       <div class="form-group text-right">
                        <input type="submit" class="btn btn-primary" value="Update CFD"/>
                    </div>
                  </div>
                </form>
            </div>
        </div>
       
</template>

<script>

import { testcaseService } from "@/core/services/testcaseService";
import { router } from "@/router";

export default {

  props:["cfds"],
  
  components: {
      name: 'updateItem'
  },
  data() {
      return {
        editcfd:this.$route.params.cfdId,

          updateCFDObj:{
            defect_id:'',
            headline:'',
            product:'',
            severity:'',
            component:'',
            version:'',
            status:'',
            de_mgr:'',
            original_found:'',
            customer_release:'',
            service_request:'',
            teacat:'',
            cfd_phase:'',
            escape_reason:'',
            escape_analysis:'',
            escape_owner:'',
            analysis_status:'',
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
 mounted(){
    this.getCfd();

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


    getCfd(){
          testcaseService.viewCFDById(this.editcfd).then(
        (data) =>{
                 
                     this.updateCFDObj =data;
                    console.log(data);
    }
        
     )
    },
    
      updateItem() {
        let self =this;
        this.loading =true;
        this.loadingMessage ="Updating CFd...."

       let updateCFDdata = JSON.parse(JSON.stringify(this.updateCFDObj));

          testcaseService.updateCFD(updateCFDdata).then(
            (data) => {
              if (data) {
            self.loading = false;
            self.loadingMessage = "";
            self.showInfoModal = true;
            self.modalInfoMessage = "CFD Updated successfully";
                return this.$router.push('/cfds');
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
                      this.modalErrorMessage = "Error while updating CFD  ";
                  }
                  return router.push(`/cfds/view/${id}`);
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