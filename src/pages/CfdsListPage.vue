
<script>
import { testcaseService } from "@/core/services/testcaseService";
import Chart from "./Chart";
import { router } from "@/router";
import {EditCfd  } from "@/pages/EditCfd";


export default {
    components: {
    EditCfd,
    Chart
},
name: 'cfdsListPage',
props:["releases"],
  data(){
    return{
      colorscheme:"",
      selectedCFDS:[],
      cfdDataList: [],
       cfdSummary: {},
      cfdPageNumber: 0,
       pagination: false,
       showCFDModal: false,
       showCFDTable:false,
      showExtraPage: false,
      selectedCFDRelease: "",
       selectedRelease:"",
      
      cfdFeatureDataList: [],
      filterOpenFlag: false,
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
      deleteConfirmed: false,
      modalConfirmMessage:'',
      confirmCallBackName: "",
      cfdDelete:"",
      totalRows: 0,
      maxRows: 0,
      cfdTotal:0,
      cfdDisplay:0,
      viewInfo:false,
      checkBoxTicked:false,
      showAddButton:true,
      colors: [
        "#005073",
        "#007dad",
        "#00bdeb",
        "#65bce4",
        "#adcbe3",
        "#fe9c8f",
        "#feb2a8",
        "#fec8c1",
        "#eddd54",
        "#e3ed54",
        "#f0e695",
      ],

      lastSelectedRow:[],
      componentData:[],
      componentOptions:{},
      productData:[],
      platformOptions:{},
      releasesData:[],
      releasesOptions:{},
      teacatData:[],
      teacatOptions:{},
      customers:[],
      custReleases:[],
       releasesArray:[],
       custReleases:[],
      custReleaseArray:[],
      ReleaseName:'All'


    };
  },

  mounted() {
   this.loadCFDS();
  },
  
   computed: {
    cfdHasPrevious(){
      if (this.cfdPageNumber <= 0) return false;
      else return true;
    },
    cfdHasNext(){
      if (this.cfdPageNumber >= this.cfdPageCount - 1) return false;
      else return true;
    },
    cfdPageCount(){
      return Math.ceil(this.cfdFeatureDataList.length / 20);
    },
    cfdHasPagination(){
      if (this.cfdFeatureDataList.length > 20) {
        return true;
      } else {
        return false;
      }
    },

    cfdPaginatedData(){
      if (this.cfdFeatureDataList.length > 0) {
        let arr = JSON.parse(JSON.stringify(this.cfdFeatureDataList));
        let start = this.cfdPageNumber * 20;
        let end =
          start + 20 > this.cfdFeatureDataList.length
            ? this.cfdFeatureDataList.length
            : start + 20;
        let arr1 = [];
        for (let i = start; i < end; i++) {
          arr[i]["index"] = i + 1;
          arr1.push(arr[i]);
        }
        return arr1;
      }
      return [];
    },

   },
    watch:{
     
         selectedRelease:function(selectedRelease){
           this.loadDashboardData(selectedRelease);
         },
        },

  methods:{
    emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
    maximizeModal() {
      this.emitToParent("maximize");
    },
    minimizeModal() {
      this.emitToParent("minimize");
    },
    closeCfdsTableModal() {
      this.emitToParent("closeCfdsTableModal");
      this.showExtraPage = false;
    },


onChildInteraction(args, payload) {

switch(args){

       case "maximize":
          this.showExtraPage = true;
          break;
        case "minimize":
          this.showExtraPage = false;
          break;
        case "stopLoading":
          this.loading = false;
          this.loadingMessage = "";
          break;
        case "loading":
          this.loading = true;
          this.loadingMessage = payload;
          break;
        case "info":
          this.showInfoModal = true;
          this.modalInfoMessage = payload;
          break;
        case "showError":
          this.showErrorModal = true;
          this.modalErrorMessage = payload;
          break;

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

    closeConfirmModal() {
      this.showConfirmModal = false;
      this.modalConfirmMessage = "";
      this.cfdDelete ="";
      this.selectedCFDS=[];
      this.deleteConfirmed = false;
      this.unchechBox();
    },

     confirmCallBack() {
      eval("this." + this.confirmCallBackName + "(event)");
    },
     cfdDeleteConfirm(e) {
        debugger;
      this.deleteConfirmed = true;
      this.deleteCFDS(e,this.cfdDelete)

      
      
    },



    loadCFDS() {
      let self = this;
      this.loading = true;
      this.loadingMessage = "Loading CFDs...";

      testcaseService.loadCFDDetails().then(
        (data) => {
          debugger;
          this.loading =true;
          if(data.message){
            this.loadingMessage =data.message;
          }
          else{
            this.loadingMessage ="CFDs Loaded Successfully"
          }
          setTimeout(()=>{
          this.loading = false;
          this.loadingMessage = "";
          },1000);
          this.cfdDataList = data;
          this.showCFDTable =true ;
          this.loadDashboardData();
            setTimeout(() => {
            this.loadTables(); 
            this.getuniqueValuesFromColumn();
            this.getPagination('#myTable');
            },2000);

             let custReleases=[];
          for(let i=0;i<self.cfdDataList.length;i++){
           custReleases.push(self.cfdDataList[i].customer_release);
          }
          let custReleaseArray = [...new Set(custReleases)];
          self.custReleaseArray=custReleaseArray;

          let tempList = [];
          for (let i = 0; i < self.cfdDataList.length; i++) {
             tempList.push(this.cfdDataList[i]);
          }
        this.cfdFeatureDataList = tempList;
        this.cfdPageNumber = 0;
        },

        (error) => {
                 this.loading = false;
                 this.loadingMessage = "";
                 this.showErrorModal = true;
                if(error.message){
                      this.modalErrorMessage =error.message;
                  }
                  else{ 
                      this.modalErrorMessage = "Error while loading CFD details";
                  }
        }
      );
    },

    addCFDButton(e){
      this.CreateCFDModal =false;
      this.showCFDModal = true;
       this.showCFDTable = false; 
      e.preventDefault();
    },

     closeCFDModal(e) {
      this.showCFDModal = false;
      this.showCFDTable = true; 
      e.preventDefault();
    },

    unchechBox(){
      let chkBoxes =document.querySelectorAll('[name="cbx_cgl"]');
              for(let k=0;k<chkBoxes.length;k++){
                chkBoxes[k].checked =false ;
              }
    },
    

    deleteCFDS(e){
      debugger;
        let self =this;
        if(this.deleteConfirmed === true){
        this.deleteConfirmed = false;
        this.showConfirmModal = false;
         this.modalConfirmMessage = "";
        this.loading =true;
        this.loadingMessage ="Deleting CFds Please wait....";
        
       testcaseService.deleteCFD(this.cfdDelete).then(
        (data) => {
          if (data){
            self.loading = false;
            self.loadingMessage = "";
            self.showInfoModal = true;
            self.modalInfoMessage = "CFD Deleted successfully";

           

          }
          this.selectedCFDS = [];
          this.loadCFDS();
          this.loadDashboardData();
          this.checkBoxTicked =false;
          this.showAddButton= true;
          
        },
          (error) => {

                 this.loading = false;
                 this.loadingMessage = "";
                 this.showErrorModal = true;
                if(error.message){
                      this.modalErrorMessage =error.message;
                  }

                  else{ 
                      this.modalErrorMessage = "Error while Deleting CFD Please Check ";
                  }
        }

      );
      e.preventDefault();
            
        }
          else {
        this.showConfirmModal = true;
        this.confirmCallBackName = "cfdDeleteConfirm";
        this.cfdDelete = this.selectedCFDS;
        this.modalConfirmMessage =
          "Are you sure you want to delete selected CFDS.. ";
      }
             

    },

     exportCFD(e){

       let self = this;
      let exportCFDS=[];
      if(this.selectedCFDS== 0){
        for(let i=0;i<this.cfdDataList.length;i++){
            exportCFDS.push(this.cfdDataList[i].id)
            
          }
      }
      else if(this.selectedCFDS.length){
         exportCFDS =this.selectedCFDS
      }
       this.loading =true;
       this.loadingMessage ="Exporting CFds Please wait...."
      testcaseService.exportCFD(exportCFDS)
        .then((response) => response.blob())
        .then(
          (bytes) => {
            let elm = document.createElement("a");
            elm.href = URL.createObjectURL(bytes);
            elm.setAttribute("download", "CFD.xlsx");
            elm.click();
             self.loading = false;
            self.loadingMessage = "";
            self.showInfoModal = true;
            if(bytes.message){
              self.modalInfoMessage=bytes.message;
            }
            else{
              self.modalInfoMessage = "CFDs Exported Successfully";
            }
              this.selectedCFDS=[];
              this.loadCFDS();
              let chkBoxes =document.querySelectorAll('[name="cbx_cgl"]');
              for(let k=0;k<chkBoxes.length;k++){
                chkBoxes[k].checked =false ;
            }
            
          },
          
          (error) => {
            self.loading = false;
            self.loadingMessage = "";
            self.showErrorModal = true;
            if(error.message){
              self.modalErrorMessage =error.message;
            }
            else{
              self.modalErrorMessage =
              "Error while exporting CFDS, Please try again later";
            }
            
          }
        );    
    },

    getsrs(srList){
      if(srList !== '' && srList != null){
        return srList.split(" "); 
      }
      else{  
        return [];
      }
    },

    getFilePath(service_request){
      let regExp = new RegExp((/^[0-9]+$/));
      if(regExp.test(service_request)){
        return `http://mwz.cisco.com/${service_request}`;
      }
      else{
        return `https://clpsvs.cloudapps.cisco.com/services/clip/main/app/service/bems/engagement/${service_request}/engagement`;
      }
    },

    getTeacat(teacatList){
      if(teacatList != null && teacatList !==""){
        return teacatList.split(" ");
        }
        else{
          return "";
        }

    },

    getTeactPath(teacat){
      if(teacat !=='' &&  teacat !==null){
       return `https://cdetsng.cisco.com/summary/#/defect/${teacat}`
      }
      
    },

// Search data table...
    myFunction() {
  var input, filter, table, tr, td, i, cell;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    // Hide the row initially.
    tr[i].style.display = "none";
    td = tr[i].getElementsByTagName("td");
    for (var j = 0; j < td.length; j++) {
      cell = tr[i].getElementsByTagName("td")[j];
      if (cell) {
        if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break;
        } 
      }
    }
}
},

// // cfds Table Filtering...

   loadTables() {  
    if (this.cfdDataList.length > 0) {
    let data= document.querySelector("#myTable > tbody > tr:nth-child(n) > td:nth-child(n)").innerHTML;
    // console.log(data);
    }
    },
//get unique data from table rows...
    getuniqueValuesFromColumn(){
      debugger;

      let unique_Colums = {};
     let  allFilters  =document.querySelectorAll(".table-filter");
      allFilters.forEach(filter =>{ 
       let  col_index= filter.parentElement.getAttribute('col-index');

          let rows = document.querySelectorAll("#myTable > tbody > tr");
        rows.forEach((row) => {
          let cell_value=row.querySelector("td:nth-child("+col_index+")").innerHTML;
          if (col_index in unique_Colums){

            if(unique_Colums[col_index].includes(cell_value)){
            }
            else{
              unique_Colums[col_index].push(cell_value);          
            }

          }
          else{
            unique_Colums[col_index]=new Array(cell_value);  
          }

        });
        
         });  

       this.updateSelectedOptions(unique_Colums);

    },

    updateSelectedOptions(unique_Colums){
      debugger;
     
      let  allFilters  =document.querySelectorAll(".table-filter");
      allFilters.forEach(filter=>{ 
       let  col_index= filter.parentElement.getAttribute('col-index');
       unique_Colums[col_index].forEach( (i) =>{
        filter.innerHTML = filter.innerHTML + `<option value="${i}">${i}</option> `
       });

      }
    
    )},

    //table filter....

    filter_rows(e){
      debugger;
     let allFilters  =document.querySelectorAll(".table-filter");
     let filter_value_dict={}
     allFilters.forEach((filter_i)=>{
      let col_index = filter_i.parentElement.getAttribute("col-index");
      if(e.currentTarget.cellIndex ==11){
        if(e.target.value =='All'){
          this.selectedRelease ='';  
        }else{
          this.selectedRelease= e.target.value 
        }  
      }
      else{
        this.selectedRelease =''; 
      }
      // console.log("filter column index:"+col_index)
      let value =filter_i.value;
      if(value != "All"){
        filter_value_dict[col_index] = value;
     }

    });

    let col_cell_value_dict ={};
    let rows =document.querySelectorAll("#myTable > tbody > tr");
    rows.forEach((row)=>{
      let display_row = true;
      allFilters.forEach((filter_i)=>{
        let col_index= filter_i.parentElement.getAttribute("col-index");
        col_cell_value_dict[col_index ] = row.querySelector("td:nth-child(" +col_index+ ")").innerHTML;
      })
    
      for(let col_i in filter_value_dict) {
        let filter_value= filter_value_dict[col_i];
        let row_cell_value =col_cell_value_dict[col_i];

              this.selectedCFDS = [];
          for(let i=0;i<this.cfdDataList.length;i++){
            this.selectedCFDS.push(this.cfdDataList[i].id)
            
          }
          let chkBoxes =document.querySelectorAll('[name="cbx_cgl"]');
          for(let k=0;k<chkBoxes.length;k++){
            chkBoxes[k].checked =true ;
          }
        
        if(row_cell_value.indexOf(filter_value) == -1 && filter_value !="All") {
          display_row =false;
          break;
      }

      }

      if(display_row == true) {
        row.style.display ="table-row";
     

          // this.selectedCFDS = [];
          // for(let i=0;i<this.cfdDataList.length;i++){
          //   this.selectedCFDS.push(this.cfdDataList[i].id)
            
          // }
          // let chkBoxes =document.querySelectorAll('[name="cbx_cgl"]');
          // for(let k=0;k<chkBoxes.length;k++){
          //   chkBoxes[k].checked =true ;
          // }
      }
      else{
        row.style.display="none";
         let chkBoxes =document.querySelectorAll('[name="cbx_cgl"]');
          for(let k=0;k<chkBoxes.length;k++){
            chkBoxes[k].checked =false ;
          }
         
      }

    
         

      

    });

    },
    
   getPagination(table) {
    debugger;
  $('#maxRows').on('change', function() {
    $('.pagination').html(''); // reset pagination 
    var trnum = 0; // reset tr counter 
    var maxRows = parseInt($(this).val()); // get Max Rows from select option
    var totalRows = $(table + ' tbody tr').length;
   



    // numbers of rows 
    $(table + ' tr:gt(0)').each(function() { // each TR in  table and not the header
      trnum++; // Start Counter 
      if (trnum > maxRows) { // if tr number gt maxRows

        $(this).hide(); // fade it out 
      }
      if (trnum <= maxRows) {
        $(this).show();
      } // else fade in Important in case if it ..
    }); 


    //  was fade out to fade it in 
    if (totalRows > maxRows) { // if tr total rows gt max rows option
      var pagenum = Math.ceil(totalRows / maxRows); // ceil total(rows/maxrows) to get ..  

      // console.log("pagenum: " + pagenum + " rows: " + totalRows + " max rows: " + maxRows);
     
      //	numbers of pages 
      for (var i = 1; i <= pagenum;) { // for each page append pagination li 
        $('.pagination').append('<li class"wp" data-page="' + i + '">\
								      <span>' + i++ + '<span class="sr-only">(current)</span></span>\
								    </li>').show();
      } // end for i 
    } // end if row count > max rows
    $('.pagination li:first-child').addClass('active'); // add active class to the first li 
    $('.pagination li').on('click', function() { // on click each page
      var pageNum = $(this).attr('data-page'); // get it's number
      var trIndex = 0; // reset tr counter
      $('.pagination li').removeClass('active'); // remove active class from all li 
      $(this).addClass('active'); // add active class to the clicked 
      $(table + ' tr:gt(0)').each(function() { // each tr in table not the header
        trIndex++; // tr index counter 
        // if tr index gt maxRows*pageNum or lt maxRows*pageNum-maxRows fade if out
        if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
          $(this).hide();
        } else {
          $(this).show();
        } //else fade in 
      }); // end of for each tr in table
    }); // end of on click pagination list
  });
  // end of on select change 
  // END OF PAGINATION 
},

 RowClicked(e, id) {
  return router.push(`/cfds/view/${id}`);
},

SelAll_Chks(e){

  if(e.currentTarget.checked===true){
    this.selectedCFDS = [];
    for(let i=0;i<this.cfdDataList.length;i++){
      this.selectedCFDS.push(this.cfdDataList[i].id)
      
    }
    let chkBoxes =document.querySelectorAll('[name="cbx_cgl"]');
    for(let k=0;k<chkBoxes.length;k++){
      chkBoxes[k].checked =true ;
    }

  }
  
  else{
    this.selectedCFDS = [];
     let chkBoxes =document.querySelectorAll('[name="cbx_cgl"]');
    for(let k=0;k<chkBoxes.length;k++){
      chkBoxes[k].checked =false ;
    }
  }

  if(this.selectedCFDS.length >0){
    this.checkBoxTicked =true;
            this.showAddButton= false;

}else{
   this.checkBoxTicked =false;
            this.showAddButton= true;

}

        },

GetCount(e,id) {

if(e.currentTarget.checked === true){
  this.selectedCFDS.push(id);

}

else if(this.selectedCFDS.indexOf(id)>-1){
  this.selectedCFDS.splice(this.selectedCFDS.indexOf(id),1);

}
if(this.selectedCFDS.length >0){
    this.checkBoxTicked =true;
    this.showAddButton= false;

}else{
   this.checkBoxTicked =false;
   this.showAddButton= true;

}
          
        },

loadBarChartOptions(){
      return {
    chart: {
      backgroundColor: null,
      type: "column",
      options3d: {
        enabled: true,
        alpha: 0,
        beta: 5,
        depth: 50,
        viewDistance: 25,
      },
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      type: "category",
    },
    tooltip: {
      pointFormat: "<b>{point.y}</b>",
    },
    title: {
      style: {
        color: "#264991",
      },
      text: "Testcases",
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
           style: {
        textOutline: 'transparent'
      }
        },
        depth: 45,
      },
    },

    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Features",
        data: [],
      },
    ],
  }
    },

 loadPieChartOptions(){
      return  {
    title: {
      text: "chart",
    },
    chart:{
      backgroundColor: null,
    },
    type: "pie",
    options3d: {
      enabled: true, //Use 3d function
      alpha: 45,
      beta: 15,
    },
    tooltip: {
      pointFormat: "{point.label}: <b>{point.y}</b>",
    },
    colors: [],
    plotOptions: {
      pie: {
        depth: 35,
        size: 200,
        innerSize: 100,
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: <b>{point.percentage:.1f}%</b>",
           style: {
        textOutline: 'transparent',
        color:"#000 !important",
        fill:"#000 !important",
      }
        },
        showInLegend: false, // Set whether the pie chart is displayed in the legend
      },
    },
    credits: false,
    series: [
      {
        type: "pie",
        data: [],
       
      },
    ],
  };
    },
    
      loadDashboardData(){
      let self=this;
      this.loading=true;
      this.loadingMessage="Loading CFD Charts";

      // Bar charts Option //
      this.componentBarOptions=this.loadBarChartOptions();
      this.componentBarOptions.title.text="Per Component";

      this.releasesBarOptions=this.loadBarChartOptions();
      this.releasesBarOptions.title.text="Per Release";

      this.platformBarOptions=this.loadBarChartOptions();
      this.platformBarOptions.title.text="Per Platform";

      this.teacatBarOptions=this.loadBarChartOptions();
      this.teacatBarOptions.title.text="Per Teacat";

      // /----------------- Pie Charts///
      this.componentOptions=this.loadPieChartOptions();
      this.componentOptions.title.text="Per Component";
      this.platformOptions=this.loadPieChartOptions();
      this.platformOptions.title.text="per Platform";
      this.releasesOptions=this.loadPieChartOptions();
      this.releasesOptions.title.text="Per Release";
      this.teacatOptions=this.loadPieChartOptions();
      this.teacatOptions.title.text="Per Teacat";

       testcaseService.getCFDChartData(this.selectedRelease).then(
          (data) => {
          if(data){
             this.loading=false;
             this.loadingMessage=" ";

                  /** Component code */
            if(Object.keys(data.components).length >0){
              let cArr=Object.keys(data.components);
             self.componentData=[];
           for(let a=0;a<cArr.length;a++){
             let obj={};
            obj['name']=cArr[a];
             obj['color']=self.colors[a%self.colors.length];
             obj['x'] =a;  
            obj['y'] =data.components[cArr[0]];
            self.componentData.push(obj); 
             }
             self.componentOptions.series[0].data=self.componentData;
            self.componentBarOptions.series[0].data=self.componentData;
           }

                /** releases code */

           if(Object.keys(data.release).length >0){
              let sArr=Object.keys(data.release);
            self.releasesData=[];
          for(let a=0;a<sArr.length;a++){
            let obj={};
            obj['name']=sArr[a];
            obj['color']=self.colors[a%self.colors.length];
            obj['x'] =a;
            obj['y']=data.release[sArr[0]];
            self.releasesData.push(obj);
            self.releasesOptions.series[0].data=self.releasesData;
            self.releasesBarOptions.series[0].data=self.releasesData;
            }
          }
              // product code.....
              if(Object.keys(data.product).length >0){
              let pArr=Object.keys(data.product);
            self.productData=[];
          for(let a=0;a<pArr.length;a++){
            let obj={};
            obj['name']=pArr[a];
            obj['color']=self.colors[a%self.colors.length];
            obj['x'] =a;
            obj['y']=data.product[pArr[0]];
            self.productData.push(obj);
            self.platformOptions.series[0].data=self.productData;
            self.platformBarOptions.series[0].data=self.productData;
            }
          }

             /** Teacat code */
            if(Object.keys(data.teacat).length >0){
              let fdArr=Object.keys(data.teacat);
            self.teacatData=[];
          for(let a=0;a<fdArr.length;a++){
            let obj={};
            obj['name']=fdArr[a];
            obj['color']=self.colors[a%self.colors.length];
             obj['x'] =a;
            obj['y']=data.teacat[fdArr[0]];
            self.teacatData.push(obj);
            self.teacatOptions.series[0].data=self.teacatData;
            self.teacatBarOptions.series[0].data=self.teacatData;
            }
          }   
          
          }
          },
              (error) => {
            self.loading = false;
            self.loadingMessage = "";
            self.showErrorModal = true;
            if(error.message){
              self.modalErrorMessage =error.message;
            }
            else{
              self.modalErrorMessage =
              "Error while fetching CFDS charts";
            }
            
          }
          
          );
    
    },
  },
 
}

</script>




<template>
<!-- Main content -->
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


        <div v-if="cfdDataList.length" class="cfdHead">
        <div class="cfd_chart">
           <div id="cfd_f1_chart" style="width:25%">
         <chart  disbleExport=true :colorscheme="colorscheme"  v-on:child="onChildInteraction" id="#cfd_f1"  :option="releasesOptions" ></Chart>
           </div>

             <div  id="cfd_f2_chart" style="width:25%">
             <chart  disbleExport=true :colorscheme="colorscheme"  v-on:child="onChildInteraction" id="#cfd_f2"  :option="platformOptions" ></Chart>
           </div>

             <div id="cfd_f3_chart" style="width:25%">   
         <chart  disbleExport=true :colorscheme="colorscheme"  v-on:child="onChildInteraction" id="#cfd_f3"  :option="componentOptions" ></Chart>
           </div>

           <div id="cfd_f4_chart" style="width:25%">
         <chart  disbleExport=true :colorscheme="colorscheme"  v-on:child="onChildInteraction" id="#cfd_f4"  :option="teacatOptions" ></Chart>
           </div>

      </div>
      </div>
      
      <div v-show="showCFDTable">
          <div class="row tableHead">
           <div class="input col-md-1">
              <!--		Show Numbers Of Rows 		-->
              <select class="form-control" name="state" id="maxRows" style="width:110px;height:45px">
                <option value="5000">Show ALL</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="150">150</option>
              </select> 
            </div>
             <div class="col-md-9 ">
            <input type="search" id="myInput" autocomplete="off" v-on:keyup="myFunction()" class="search-input" placeholder="Search table Data...">
            </div>
             <div class="col-md-2 text-right">
              
            <!-- class="btn btn-default btn-xs" -->
                <button  @click="exportCFD($event)" style="margin-right:20px" >
                  Export
                </button>

                <!-- class="btn btn-default btn-xs" -->
               <button v-if="checkBoxTicked" @click="deleteCFDS($event)" >
                  Delete
                </button>

                <!-- class="btn btn-default btn-xs" -->
                <button v-if="showAddButton" style="color:black">
                    <router-link 
                to="/Cfds/add"> <i style="margin-right:5px ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                      </svg>
                  </i> Add CFD</router-link>
                </button>

          </div>
        </div>

      <div class="fixTableHead"> 
        <table class="table" id="myTable">
          <thead id="header">
            <tr class="table-row">

              <th col-index=1 class="table-head"  style="width:50px">               
                 <input 
                  type="checkbox"
                  id="checkAll"
                  name="cbx_cgl"
                  @click="SelAll_Chks($event)"
                  />
                </th>

              <th col-index=2 @change="filter_rows($event)" style="width:120px">
                DDTS ID
                <select class="table-filter" >
                  <option value="All"></option>
                </select>  
              </th>
               <th col-index=3 @change="filter_rows($event)" style="width:600px"> 
                Headline
                 <select class="table-filter">
                  <option value="All"></option>
                </select>    
              </th>
               <th  col-index=4 style="width:110px">
                Product
                 <select 
                 class="table-filter"
                  @change="filter_rows($event)"
                 >
                  <option value="All"></option>
                </select>      
              </th>
               <th col-index=5 @change="filter_rows($event)" style="width:110px">
                Severity
                 <select class="table-filter">
                  <option value="All"></option>
                </select>
              </th>
               <th col-index=6 @change="filter_rows($event)" style="width:150px">
                Component
                 <select class="table-filter">
                  <option value="All"></option>
                </select> 
              </th>
               <th col-index=7 @change="filter_rows($event)" style="width: 110px">
                Version
                 <select class="table-filter">
                  <option value="All"></option>
                </select>  
              </th>
               <th col-index=8 @change="filter_rows($event)" style="width: 110px">
                Status
                 <select class="table-filter">
                  <option value="All"></option>
                </select>  
              </th>
               <th col-index=9 @change="filter_rows($event)" style="width: 110px">
                DE Mgr
                 <select class="table-filter">
                  <option value="All"></option>
                </select>    
              </th>
               <th col-index=10 @change="filter_rows($event)" style="width:150px">
                Original Found
                 <select class="table-filter">
                  <option value="All"></option>
                </select>
              </th>
              <th  col-index=11 @change="filter_rows($event)" style="width: 160px">
                Customer
                 <select class="table-filter">
                  <option value="All"></option>
                </select>
              </th>
               <th col-index=12 @change="filter_rows($event)" style="width: 175px">
                Customer Release
                 <select class="table-filter">
                  <option value="All"></option>
                </select>
              </th>
                <th col-index=13 @change="filter_rows($event)" style="width: 150px">
                TEACAT Status
                 <select class="table-filter">
                  <option value="All"></option>
                </select>
              </th>
               <th col-index=14 @change="filter_rows($event)" style="width: 125px">
                CFD Phase
                 <select class="table-filter">
                  <option value="All"></option>
                </select>
              </th>
               <th col-index=15 @change="filter_rows($event)" style="width: 155px">
                Escape Reason
                 <select class="table-filter">
                  <option value="All"></option>
                </select>
              </th>
               <th col-index=16 @change="filter_rows($event)" style="width: 150px">
                Escape Owner
                 <select class="table-filter">
                  <option value="All"></option>
                </select>
              </th>
               <th col-index=17 @change="filter_rows($event)" style="width: 160px">
                Escape Analysis
                 <select class="table-filter">
                  <option value="All"></option>
                </select>
              </th>
               <th col-index=18 @change="filter_rows($event)" style="width: 152px">
                Analysis Status
                 <select class="table-filter">
                  <option value="All"></option>
                </select>
              </th>
                 <th col-index=19 @change="filter_rows($event)" style="width:200px">
                SRs
                 <select class="table-filter">
                  <option value="All"></option>
                </select>
              </th>
               <th col-index=20 @change="filter_rows($event)" style="width: 220px">
                TEACAT
                 <select class="table-filter">
                  <option value="All"></option>
                </select>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for = "cfds in cfdDataList" :key="cfds.id"  @dblclick="RowClicked($event,cfds.id);">
              <td >
              <input
								name="cbx_cgl"
								type="checkbox"
                @click="GetCount($event,cfds.id)"
                
							/> 
              </td>

               <!-- <td> -->
               <!-- <button>
                 <router-link :to="`/cfds/view/${cfds.id}`">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                         </svg>
                 </router-link>
                 </button> -->
                 <!-- <button>
                 <router-link :to="`/cfds/edit/${cfds.id}`">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                         <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                         <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                         </svg>

                  </router-link>
                  </button> -->

                <!-- <button  @click="deleteCFd(cfds.id)">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                         <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                         <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                         </svg>

                </button> -->
               
              <!-- </td> -->
              <td>
                <a :href="`https://cdetsng.cisco.com/summary/#/defect/`+cfds.defect_id" target="_blank">
                {{cfds.defect_id}}
                </a>
                &nbsp;
                </td>
                <td >
                <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                {{cfds.headline}} 
                </a>
                <div class="col">
                <div class="collapse multi-collapse" id="collapseExample">
                <div class="card card-body">
                  {{cfds.headline}}
                </div>
                </div>
                </div>
                </td>

              
              <td>{{cfds.product}}</td>
              <td>{{cfds.severity}}</td>
              <td>{{cfds.component}}</td>
              <td>{{cfds.GISO_Version}}</td>
              <td>{{cfds.status}}</td>
              <td>{{cfds.de_mgr}}</td>
              <td>{{cfds.original_found}}</td>
              <td>{{cfds.customer_name}}</td>
              <td>{{cfds.customer_release}}</td> 
              <td>{{cfds.teacat_status}}</td>
              <td>{{cfds.cfd_phase}}</td>
              <td>{{cfds.escape_reason}}</td>
              <td>{{cfds.escape_owner}}</td>
              <td>{{cfds.escape_analysis}}</td>
              <td>{{cfds.analysis_status}}</td>
              <td >
                <span v-for="(sr,ind) in getsrs( cfds.service_request)" :key="ind" class="">
                <a :href="getFilePath(sr)
                  " target="_blank">
                {{sr}}
                </a>
                &nbsp;
                  </span> 
              </td>
              <td>
                <span v-for="(teacat,ind) in getTeacat(cfds.teacat)" :key="ind" class="">
                <a :href="getTeactPath(teacat)" target="_blank">
                {{teacat}}
                </a>
                &nbsp;
                </span>
                </td>
              </tr>
          </tbody>
        </table>
        </div>



        <transition name="fade">
                  <div v-if="cfdHasPagination" class="paginationWrapper" style="margin: 20px">
                    <div class="flex flex-center paginationDiv">
                      <div class="base-margin-bottom">              
                        <ul class="pagination pagination--small" style="cursor: pointer">
                        </ul>
                      </div>
                      
                    </div>
                  </div>
                </transition>
      
                
      
</div>
<!-- end main div -->
</div>
</template>

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
/* .outer-table{
  border: 1px solid rgb(161, 160, 160);
  box-shadow: 0px 0px 3px rgb(83, 82, 82);
  margin: 20px;
  border-radius: 10px;
  padding: 5px;
  height: 700px;

} */
.cfdHead{
  background-color: #deecf4;
  border-radius: 30px;
  margin: 20px 40px 10px 30px;

}
.container{
  height:650vh !important;
}
.cfd_chart{
  display: flex;
}


.fixTableHead {
    overflow-x: scroll; 
    overflow-y: hidden;
    white-space: normal; 
    margin: 0px 40px 0px 30px;
    border-radius: 5px;
   
  
    }
    .fixTableHead thead th {
      position: sticky;
      top: 0;
     background-color: #16a085;
     color: #fff;
    }

    table {
    /* min-width: max-content; */
    /* position:absolute;
    left: 50%;
    top: 50%; */
    transform: translate(0%, 0%);
    border-collapse: collapse;
    border:1px solid #bdc3c7;
    box-shadow: 2px 2px 12px rgba(0,0,0,0.2),-1px -1px 8px rgba(0,0,0,0.2);

      min-width: 200px;
      table-layout:fixed;
      word-break: break-word;       
    }
  table  tr{
    transition: all .2s ease-in;
    cursor: pointer;
    }
    table th td{
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
  
   table tr:hover{
    background-color: #f5f5f5;
    /* transform: scale(1.05); */
    box-shadow:2px 2px 12px rgba(0,0,0,0.2),-1px -1px 8px rgba(0,0,0,0.2);

    }


table td{
 overflow: hidden;
 text-overflow: ellipsis;
 white-space: nowrap;
}
table a:hover, a:visited, a:link, a:active {
      text-decoration: none !important;
    }

    .selected {
    background: lightBlue
}

#myInput {
  background-position: 10px 10px;
  background-repeat: no-repeat;
  width: 100%;
  font-size: 16px;
  padding: 12px 20px 12px 40px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
}
.table-filter{
   background-position: 10px 10px;
  background-repeat: no-repeat;
  padding: 6px 12px 6px 12px;
  width: 20px;
  
} 
.tableHead{
  margin: 0px 30px 0px 20px;
}

</style>