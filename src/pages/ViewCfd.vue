<template>
  <div class="container">
        <div class="card" style="margin: 40px;" >
            <div class="card-header">
                <h3>CFD Data </h3>

            </div>
            <div class="card-body"></div>
                <form>
                  <!-- Row 1 -->
                  <div class="row">
                    <div class="col-md-2">
                      <div class="form-group">
                        <label>CFD IDs:</label>
                        {{cfdsObj.defect_id}}
                    </div>
                    </div>
                     <div class="col-md-2">
                      <div class="form-group">
                        <label>Product:</label>
                        {{cfdsObj.product}}
                        
                    </div>
                    </div>
                     <div class="col-md-2">
                      <div class="form-group">
                        <label>Severity:</label>
                        {{cfdsObj.severity}}
                       
                    </div>
                    </div>
                     <div class="col-md-2">
                      <div class="form-group">
                        <label>Component:</label>
                        {{cfdsObj.component}}
                       
                    </div>
                    </div>
                     <div class="col-md-2">
                      <div class="form-group">
                        <label>Version:</label>
                        {{cfdsObj.orginal_version}}
                       
                    </div>
                    </div>
                     <div class="col-md-2">
                      <div class="form-group">
                        <label>Status:</label>
                        {{cfdsObj.status}}
                    </div>
                    </div>

                  </div>
                   
                  <!-- Row 2 -->
                  <div class="row" style="margin-top: 20px;">
                    <div class="col-md-2">
                      <div class="form-group">
                        <label>DE Mgr:</label>
                        {{cfdsObj.de_mgr}}

                    
                    </div>
                    </div>
                    <div class="col-md-2">
                      <div class="form-group">
                        <label>Original Found:</label>
                        {{cfdsObj.original_found}}
                        
                    </div>
                    </div>
                    <div class="col-md-2">
                      <div class="form-group">
                        <label>Customer:</label>
                        {{cfdsObj.customer_name}}
                        
                    </div>
                    </div>
                    <div class="col-md-2">
                      <div class="form-group">
                        <label>Service Request:</label>
                        {{cfdsObj.service_request}}
                        
                    </div>
                    </div>
                     <div class="col-md-4">
                      <div class="form-group">
                        <label>TEACAT:</label>
                        {{cfdsObj.teacat}}
                        
                    </div>
                    </div>

                  </div>
                  <!-- Row 3 -->
                  <div class="row"  style="margin-top: 20px;">
                     <div class="col-md-3">
                      <div class="form-group">
                        <label>CFD Phase:</label>
                        {{cfdsObj.cfd_Phase}}
                        
                    </div>
                    </div>
                     <div class="col-md-3">
                      <div class="form-group">
                        <label>Escape Owner:</label>
                        {{cfdsObj.escape_owner}}
                        
                    </div>
                    </div>
                     <div class="col-md-3">
                      <div class="form-group">
                        <label>Escape Analysis:</label>
                        {{cfdsObj.escape_analysis}}
                       
                    </div>
                    </div>
                     <div class="col-md-3">
                      <div class="form-group">
                        <label>Analysis Status:</label>
                        {{cfdsObj.analysis_status}}
                        
                    </div>
                    </div>

                  </div>
                    <!-- Row 4 -->
                  <div class="row" style="margin-top: 20px;">
                     <div class="col-md-6">
                      <div class="form-group">
                        <label>Headline:</label>
                        {{cfdsObj.headline}}
                       
                    </div>
                    </div>
                     <div class="col-md-6">
                      <div class="form-group">
                        <label>Escape Reason:</label>
                        {{cfdsObj.escape_reason}}
                        
                    </div>
                    </div>
                  </div>
                  <div class="row" style="margin-top: 20px; padding: 10px;">
                    <div class="col-md-4">
                      <div class="col-md-2">
                        <div class="form-group">
                          <!-- class="btn btn-primary btn-lg btn-block btn" -->
                          <button>
                            <router-link to="/cfds" >
                        Back
                        </router-link>

                          </button>
                        
                    </div>
                    </div>
                        <div class="col-md-2">
                        <div class="form-group">
                          <!-- class="btn btn-primary btn-lg btn-block btn" -->
                          <button>
                             <router-link :to="`/cfds/edit/${cfds}`">
                        Edit
                        </router-link>

                          </button>
                           
                    </div>
                    </div>
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
    name: "viewItem",
    data(){
        return {
            cfds:this.$route.params.cfdId,
            cfdsObj:{

            },


        }
    },
    mounted(){
        this.loadCfdById();
    },

   
    methods:{
        loadCfdById(){
             testcaseService.viewCFDById(this.cfds).then(
                (data)=>{
                    this.cfdsObj = data;
                   
                },
                (error)=>{
                    console.log(error);
                }

            )
            
        },
        editcfd(){
          return router.push(`/cfds/edit/${cfds.id}`);
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