<script>
   import { router } from "@/router";
   import GanttChart from "./GanttChart";
   import Chart from "./Chart";
   import ContextMenu from "../components/global/ContextMenu/ContextMenu";
import ContextMenuItem from "../components/global/ContextMenu/ContextMenuItem";
   import { requestOptions } from "@/core/helpers/request";
   export default {
     name: "HomePage",
   
   data() {
       return {
           subMenus:[],
           menus:["Releases","Customers","Platform","Team", "Inventory"],
           releases:["653","712", "731", "7315","732", "733", "734", "751", "752", "753", "754"],
           customers:["Google", "Microsoft", "Charter", "Comcast", "Facebook", "Apple", "RJIL","Airtel","SFR","AT&T"],
           platform:["ASR9000", "NCS5500", "8000", "NCS500"],
           selectedCustomerNotes:"Google is a corporation that was formed to provide internet-based search services, providing accessibility to the world's online information.",
           showCustomerNotes:false,
           colorscheme:"default-scheme",
           c_releases:{
               Google:["653","712","731", "732", "733","734","752", "753",,"754"],
               Microsoft:["7315", "733", "734", "751","754"],
               Charter:["733", "734", "751", "752"],
               Comcast:["751", "752", "753", "754"],
               Facebook:["731", "733", "734", "751","754"],
               Apple:["712", "731", "732", "733", "734", "751"],
               RJIL:["732", "733", "734"]
           },
           homeGanttOptions:{"chart":{"backgroundColor":null,"spacingLeft":10,"spacingBottom":20,"spacingTop":20,"events":{}},"title":{"text":"Project Plan - <span style='font-size:15px'>Google_CVT_SF</span>"},"yAxis":{"type":"category","categories":["-","Planned","Actual","Events","-","-","-","-","-","-","-","-"],"visible":true},"credits":false,"xAxis":[{"type":"datetime","tickInterval":604800000,"fill":"blue","labels":{"style":{"font-size":"10px"},"format":"{value:%Y-%m-%d}","rotation":30,"borderWidth":0},"min":1631491200000,"max":1640736000000},{"fill":"green","min":1631491200000,"max":1640736000000}],"tooltip":{"xDateFormat":"%a %b %d"},"plotOptions":{"series":{"pointWidth":40,"animation":false,"dragDrop":{"draggableX":true,"draggableY":true,"dragMinY":0,"dragMaxY":2,"dragPrecisionX":null},"dataLabels":{"enabled":true,"style":{"color":"#fff !important","fill":"#fff !important","cursor":"default","pointerEvents":"none","textOutline":"transparent","font-size":"16px"},"text":{"style":{"color":"#fff !important","fill":"#fff !important"}}},"allowPointSelect":true,"point":{"events":{}}}},"series":[{"name":"Project 1","data":[{"name":"Planned","id":"planned","y":0},{"parent":"planned","name":"Executed","id":"Planned_Executed","start":1631491200000,"end":1637884800000,"pointWidth":"35","y":1,"color":"lightgreen","dataLabels":{"color":"#fff","text-outline":"#fff","fill":"#fff"}},{"parent":"planned","name":"Executed","id":"Executed","start":1631491200000,"end":1637884800000,"pointWidth":"35","completed":{"amount":1,"fill":"green","pointWidth":"35"},"y":2,"color":"lightgreen","dataLabels":{"color":"#fff","text-outline":"#fff","fill":"#fff"}},{"parent":"planned","name":"Retest","id":"Planned_Retest","dependency":"Planned_Executed","start":1636934400000,"end":1637712000000,"pointWidth":"35","color":"#2094df","y":1,"dataLabels":{"color":"#fff","text-outline":"#fff"}},{"parent":"planned","name":"Retest","id":"Retest","dependency":"Executed","start":1636934400000,"end":1637712000000,"pointWidth":"35","color":"#2094df","y":2,"dataLabels":{"color":"#fff","text-outline":"#fff"}},{"parent":"planned","name":"Longevity","id":"Planned_Longevity","dependency":"Planned_Retest","start":1638144000000,"end":1638662400000,"pointWidth":"35","color":"orange","y":1,"dataLabels":{"color":"#fff"}},{"parent":"planned","name":"Longevity","id":"Longevity","dependency":"Retest","start":1638144000000,"end":1638662400000,"pointWidth":"35","color":"orange","y":2,"dataLabels":{"color":"#fff"}},{"parent":"planned","name":"FCS","milestone":true,"start":1640131200000,"end":1640131200000,"dependency":"Planned_Longevity","color":"#73c34b","pointWidth":"35","y":1,"dataLabels":{"color":"#fff"}},{"parent":"planned","name":"FCS","milestone":true,"start":1640131200000,"end":1640131200000,"dependency":"Longevity","color":"#73c34b","pointWidth":"35","y":2,"dataLabels":{"color":"#fff"}},{"name":"Events","id":"events","pointWidth":0}]}],"exporting":{}},
           weeklyExecSummaryOptions:{"chart":{"type":"spline","backgroundColor":null},"credits":false,"legend":{"symbolWidth":40},"title":{"text":"Execution Chart"},"yAxis":{"title":{"text":"Number of Testcases"},"accessibility":{"description":"Number of Testcases"}},"xAxis":{"title":{"text":"Time"},"accessibility":{"description":"Time from September 2020 to September 2021"},"categories":["2021-09-13","2021-09-20","2021-09-27","2021-10-04","2021-10-11","2021-10-18","2021-10-25","2021-11-01","2021-11-08","2021-11-15","2021-11-22","2021-11-29","2021-12-06","2021-12-13","2021-12-20"]},"tooltip":{},"plotOptions":{"series":{"point":{"events":{}}}},"series":[{"name":"Planned","data":[31,62,93,124,155,186,217,248,279,310,343,343,343,343,343],"color":"#4272f5"},{"name":"Actual","data":[0,0,2,68,114,164,191,222,253,303,343,343,343,null,null],"dashStyle":"ShortDashDot","color":"#00bdeb"},{"name":"Pass","data":[0,0,2,62,95,139,161,186,209,251,268,267,266,null,null],"dashStyle":"ShortDot","color":"green"},{"name":"Fail","data":[0,0,0,6,19,25,30,36,44,36,71,72,73,null,null],"dashStyle":"Dash","color":"red"}],"responsive":{"rules":[{"condition":{"maxWidth":550},"chartOptions":{"chart":{"backgroundColor":null,"spacingLeft":3,"spacingRight":3},"legend":{"itemWidth":150},"xAxis":{"categories":[],"title":""},"yAxis":{"visible":false}},"_id":"highcharts-kilgowr-188"}]},"exporting":{}},
           cvtSummaryOptions:{"chart":{"zoomType":"xy","backgroundColor":null},"title":{"text":"Defect Chart","align":"center"},"credits":false,"xAxis":{"categories":["2021-09-13","2021-09-20","2021-09-27","2021-10-04","2021-10-11","2021-10-18","2021-10-25","2021-11-01","2021-11-08","2021-11-15","2021-11-22","2021-11-29","2021-12-06","2021-12-13","2021-12-20"],"rotation":-45,"crosshair":true},"yAxis":{"title":{"text":"Count","style":{"color":"#00bdeb"}}},"tooltip":{"shared":true},"legend":{"floating":false,"layout":"horizontal","align":"center","verticalAlign":"bottom","x":0,"y":0},"series":[{"name":"Must have","type":"column","data":[2,40,40,0,0,0,0,43,36,33,35,null,null,null,null]},{"name":"Total","type":"spline","data":[null,null,2,28,28,38,54,92,103,116,123,null,null,null,null],"dashStyle":"shortdot"},{"name":"Found","type":"spline","data":[0,0,1,10,10,19,28,50,56,63,69,null,null,null,null],"dashStyle":"shortdot"},{"name":"Observed","type":"spline","data":[0,0,1,18,18,19,26,42,47,53,54,null,null,null,null]}],"responsive":{"rules":[{"condition":{"maxWidth":500},"chartOptions":{"legend":{"floating":false,"backgroundColor":null,"layout":"horizontal","align":"center","verticalAlign":"bottom","x":0,"y":0},"yAxis":[{"labels":{"align":"right","x":0,"y":-6},"showLastLabel":false},{"labels":{"align":"left","x":0,"y":-6},"showLastLabel":false},{"visible":false}]},"_id":"highcharts-kilgowr-253"}]},"exporting":{}},
           execSummaryChartOptions:{"title":{"text":"Execution Summary"},"chart":{"type":"pie","backgroundColor":null,"options3d":{"enabled":true,"alpha":45,"beta":0}},"tooltip":{"style":{"font-size":"14px"},"pointFormat":"{point.label}: <b>{point.y}</b>"},"plotOptions":{"pie":{"depth":45,"size":200,"allowPointSelect":true,"innerSize":70,"cursor":"pointer","dataLabels":{"enabled":true,"format":"<b>{point.name}</b>: <b>{point.percentage:.1f}%</b>","style":{"textOutline":"transparent"}},"showInLegend":false}},"credits":false,"series":[{"type":"pie","data":[{"name":"failed","y":73,"color":"#F51720"},{"name":"passed","y":264,"color":"#76B947"},{"name":"passx","y":2},{"name":"dropped","y":4}],"point":{"events":{}}}],"exporting":{}}
          }
   },
   mounted() {
    
   },
    computed: {
       utcTimeNow: function() {
         let d1 = new Date();
         return d1;
       },
       currentUser: function() {
         if (localStorage.getItem("currentUser") !== null) {
           return JSON.parse(localStorage.getItem("currentUser")).username;
         }
       },
       isAdmin: function() {
         if (localStorage.getItem("currentUser") !== null) {
           if (
             JSON.parse(
               localStorage.getItem("currentUser")
             ).role.toLowerCase() === "admin"
           ) {
             return true;
           }
         }
         return false;
       },
     },
    components: {
     GanttChart,
     Chart,
     ContextMenu,
    ContextMenuItem,
    },
    methods: {
        navChanged(e){
            // let subMenuStr=e.currentTarget.innerText.toLowerCase();
             //this.subMenus=this[subMenuStr];
             let clList=document.querySelectorAll('.activeCustomer');
             for(let m=0;m<clList.length;m++){
                 clList[m].classList.remove('activeCustomer');
             }
              e.currentTarget.classList.add('activeCustomer');
   
             let fList=document.querySelectorAll('.fmenuItem');
             for(let n=0;n<fList.length;n++){
                 let fname=fList[n].innerText;
                 if(this.c_releases[e.currentTarget.innerText].indexOf(fname)>-1){
                      if(!fList[n].classList.contains('fmenuItemActive')){
                          fList[n].classList.add('fmenuItemActive');
                      }
                 }
                 else{
                     fList[n].classList.remove('fmenuItemActive');
                 }
             }
            this.showCustomerNotes=true;
   
            setTimeout(function() {
              debugger;
              if(document.querySelector('customerNotes').classList.contains('highlightNotes')){
                document.querySelector('customerNotes').classList.remove('highlightNotes');
                }
                else{
                  document.querySelector('customerNotes').classList.add('highlightNotes');
                }
         }, 100);
             e.preventDefault();
        },
   
        addRowAbove(){
   
        },
        deleteRow(){
   
        },
         getImgUrl(image) {
          if (image != "") {
         let pic=image.toLowerCase()+"Logo.png";
           let pic1 = pic.substring(pic.lastIndexOf("/") + 1);
           return requestOptions.apiUrl() + "/get_customer_logo/admin/" + pic1;
         } else {
           return require("../assets/images/default.png");
         }
       },
        homeClicked(e){
              router.push({ name: "/releases/customer_1" });
            e.preventDefault();
        },
        onChildInteraction(args){
   
        },
        openTableMenu(){
           this.$refs.table_menu.open(event);
            event.preventDefault();
        }
    }
   }
</script>
<template>
   <div class="homeMain">
      <header id="rackHeader" class="header header--compressed">
         <div class="header-bar__main">
            <div class="header-heading">
               <router-link to="/releases/customer_1">
                  <img
                     class="main-logo"
                     src="../../public/images/Cisco_Logo_no_TM_Midnight_Blue-RGB.png"
                     />
               </router-link>
            </div>
         </div>
         <div class="header-bar container rackHeaderBar1">
            <div class="postauth-header postauth-header1 header-toolbar row" style="width:92%;">
               <div class="topnav" style="width:90%">
                  <template v-for="(mName,index) in customers">
                     <a class="fmenuItem12" :key="index" @click="navChanged($event)" style="flex-direction: column;">
                     <img
                        :src="getImgUrl(mName)"
                        height="40px"
                        width="40px"
                        style="background-size:100% 100%;margin:10px;"
                        />
                     {{mName}}
                     </a>
                  </template>
               </div>
               <div class="firstHeader" style="margin-top: 50px;">
                  <a v-if="currentUser"
                     ><span class="half-margin-right">
                  <strong>{{ currentUser }}</strong>
                  </span></a
                     >
                  <a v-else @click="logout($event)"
                     ><span class="half-margin-right">
                  <strong>Login</strong>
                  </span></a
                     >
                  <button
                     v-if="currentUser"
                     class="btn btn--primary lg_addBtn lg_addBtn1 logoutBtn"
                     @click="logoutClicked($event)"
                     >
                     <span
                        v-tooltip.right="{
                        html: 'logoutContent',
                        class: 'cisco-tooltip',
                        }"
                        >
                     <i class="icon icon-sign-out"> </i>
                     </span>
                     <div id="logoutContent">
                        Logout
                     </div>
                  </button>
               </div>
            </div>
         </div>
      </header>
      <div class="bottomnav">
         <div class="customerNotesContainer row" v-if="showCustomerNotes">
            <div class="customerNotes" >{{selectedCustomerNotes}}</div>
         </div>
         <template v-for="(sName,index) in releases">
            <a class="fmenuItem" :key="index" @click="navChanged($event)">
            {{sName}}
            </a>
         </template>
      </div>
      <div class="ganttChartDiv">
         <GanttChart   v-on:child="onChildInteraction" id="homeTimeLineChart"  :colorscheme="colorscheme" :option="homeGanttOptions"></GanttChart>
      </div>
      <div class="secondMenu">
         <div class="firstSection">
            <chart   v-on:child="onChildInteraction" id="chart_h1" class="chartsA" :option="execSummaryChartOptions" homePage="true"></Chart>
         </div>
         <div class="secondSection">
            <chart   v-on:child="onChildInteraction" id="splineChart_h1" :option="weeklyExecSummaryOptions" homePage="true"></Chart>
         </div>
         <div class="thirdSection">
            <chart  v-on:child="onChildInteraction" id="cvtChart_h1" :option="cvtSummaryOptions" homePage="true"></Chart>
         </div>
      </div>
      <div class="thirdMenu">
         <div class="col-lg-4 dynamicTable">
            <div class="firstTableButtons tableButtons"></div>
            <table class="first_table dynamic_table">
               <tr>
                  <td @contextmenu="openTableMenu()">
                  </td>
                  <td @contextmenu="openTableMenu()">
                  </td>
                   <td @contextmenu="openTableMenu()">
                  </td>
                  <td @contextmenu="openTableMenu()">
                  </td>
               </tr>
                <tr>
                  <td @contextmenu="openTableMenu()">
                  </td>
                  <td @contextmenu="openTableMenu()">
                  </td>
               </tr>
           
            </table>
         </div>
         <div class="col-lg-4 dynamicTable">
            <div class="firstTableButtons tableButtons"></div>
            <table class="second_table dynamic_table">
               <tr>
                  <td @contextmenu="openTableMenu()">
                  </td>
                  <td @contextmenu="openTableMenu()">
                  </td>
               </tr>
                <tr>
                  <td @contextmenu="openTableMenu()">
                  </td>
                  <td @contextmenu="openTableMenu()">
                  </td>
               </tr>
                <tr>
                  <td @contextmenu="openTableMenu()">
                  </td>
                  <td @contextmenu="openTableMenu()">
                  </td>
               </tr>
               <tr>
                  <td @contextmenu="openTableMenu()">
                  </td>
                  <td @contextmenu="openTableMenu()">
                  </td>
               </tr>
            </table>
         </div>
         <div class="col-lg-4 dynamicTable">
            <div class="firstTableButtons tableButtons"></div>
            <table class="third_table dynamic_table">
               <tr>
                  <td @contextmenu="openTableMenu()">
                  </td>
                  <td @contextmenu="openTableMenu()">
                  </td>
               </tr>
                <tr>
                  <td @contextmenu="openTableMenu()">
                  </td>
                  <td @contextmenu="openTableMenu()">
                  </td>
               </tr>
                <tr>
                  <td @contextmenu="openTableMenu()">
                  </td>
                  <td @contextmenu="openTableMenu()">
                  </td>
               </tr>
               <tr>
                  <td @contextmenu="openTableMenu()">
                  </td>
                  <td @contextmenu="openTableMenu()">
                  </td>
               </tr>
            </table>
         </div>
      </div>
       <ContextMenu class="tableMenu" ref="table_menu">
          <template
            style="width:100%;height:200px"
            slot-scope="{ contextData }"
          >
            <ContextMenuItem
              @click.native="addRow()"
            >
              Add Table Name
            </ContextMenuItem>
            <ContextMenuItem
              @click.native="addRow()"
            >
              Add Row
            </ContextMenuItem>
            <ContextMenuItem
              @click.native="deleteRow()"
            >
              Delete Row
            </ContextMenuItem>
             <ContextMenuItem
              @click.native="addColoumn()"
            >
              Add Column
            </ContextMenuItem>
            <ContextMenuItem
              @click.native="deleteColoumn()"
            >
              Delete Column
            </ContextMenuItem>
            <ContextMenuItem
              @click.native="saveTable()"
            >
              saveTable
            </ContextMenuItem>
          </template>
       </ContextMenu>

        </div>
  
</template>
<style scoped>
   .dynamicTable{
   background: #fff;
   border: 1px solid #ddd;
   margin: 11px;
   padding:0;
   }
   .dynamic_table td{
   border:1px solid #ddd;
   }
   .addDeletebuttons{
   width:4%;
   }
   .highlightNotes{
   background: rgb(202, 233, 140);
   }
   .rackHeaderBar1{
   height: fit-content !important;
   box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2); 
   float: right;
   text-align: right;
   padding-bottom: 5px;
   }
   .postauth-header1{
   display: block !important;
   width: 100% !important;
   }
   .topnav {
   width: 80%;
   float: left;
   margin-left: 120px;
   overflow: hidden;
   background: #fff;
   height:fit-content;
   text-align: center;
   }
   .bottomnav{
   background-color:transparent;
   margin: 20px;
   height: fit-content;
   text-align: center;
   margin-bottom: 0px;
   }
   .lg_addBtn1{
   height: 30px !important;
   width: 30px !important;
   border-radius: 40px !important;
   padding: 0px !important;
   margin: 10px !important;
   background: #fff !important;
   border: 1px solid #015871 !important;
   color: #017cad !important;
   font-weight: 800 !important;
   font-size: 16px !important;
   }
   .homeBtn{
   float: left;
   }
   .topnav a {
   color: #007493;
   text-align: center;
   padding: 16px 30px;
   text-decoration: none;
   font-size: 17px;
   }
   .header-heading a{
   padding: 0 !important;
   margin-top: 60px !important;
   }
   .topnav a:hover {
   text-decoration: none;
   color: #007493;
   font-weight: bold !important;
   }
   .topnav a.active {
   text-decoration: underline;
   color: #007493;
   }
   .bottomnav a {
   color: #5c5959;
   text-align: center;
   padding: 16px 30px;
   text-decoration: none;
   font-size: 17px;
   border:3px solid #5c5959;;
   border-radius: 20px;
   margin:20px;
   }
   .bottomnav a:hover {
   text-decoration: none;
   border:3px solid #000;
   color: #000;
   }
   .customerNotesContainer {
   width: 100%;
   height: fit-content;
   margin: 0 auto;
   background: #fff;
   min-height: 40px;
   padding: 20px;
   flex-wrap: wrap;
   text-align: center !important;
   border: 1px solid #ddd;
   }
   .firstSection{
   width: 25%;
   /*background-image: url(../../public/images/gp_background.jpg) !important; */
   background: #fff;
   border: 2px solid #ddd;
   height: 300px;
   margin: 10px;
   margin-left: 20px !important;
   min-height: 300px;
   display: inline-flex;
   flex-direction: column;
   }
   .secondSection {
   width: 35%;
   /* background-image: url(../../public/images/gp_background.jpg) !important; */
   background: #fff;
   border: 2px solid #ddd;
   height: 300px;
   margin: 10px;
   margin-left: 20px !important;
   min-height: 300px;
   display: inline-flex;
   flex-direction: column;
   /* margin: 20px; */
   }
   .thirdSection {
   width: 35%;
   /* background-image: url(../../public/images/gp_background.jpg) !important; */
   background: #fff;
   border: 2px solid #ddd;
   height: 300px;
   margin: 10px;
   margin-left: 20px !important;
   min-height: 300px;
   display: inline-flex;
   flex-direction: column;
   /* margin: 20px; */
   }
   .ganttChartDiv{
   min-height: 150px !important;
   max-height: 300px !important;
   width: 100%;
   margin: 10px;
   margin-left: 20px;
   margin-right: 0px;
   background: #fff !important;
   overflow: scroll;
   margin-bottom: 25px;
   border-radius: 20px;
   }
   .homeMain{
   background: #fff !important;
   height: 700px;
   overflow: scroll;
   }
   .homeMain::-webkit-scrollbar{
   display:none !important;
   }
   .ganttChartDiv ::-webkit-scrollbar{
   display:none !important;
   }
   .secondMenu{
   height:max-content;
   display:flex;
   background: #fff;
   }
   .thirdMenu{
   height: 200px;
   width: 95%;
   display: flex;
   /* margin-right: 20px; */
   background: #fff;
   }
   .secondMenu::-webkit-scrollbar{
   display:none;
   }
   .subSection1{
   height:20%;
   background: #fff;
   border: 2px solid #ddd;
   margin-bottom: 20px;
   }
   .subSection2{
   height:50%;
   background: #fff;
   border: 2px solid #ddd;
   margin-bottom: 20px;
   }
   .subSection3{
   height:28%;
   background: #fff;
   border: 2px solid #ddd;
   }
   .fmenuItem {
   background: #fff;
   }
   .fmenuItemActive {
   color: #fff !important;
   background: #8a8d8f !important;
   }
   #homeTimeLineChart {
   width: 100%;
   height: 300px;
   }
   .customerNotes {
   width: 100%;
   color: #000;
   font-size: 13px;
   }
   .activeCustomer {
   text-decoration: underline !important;
   color: #007493;
   font-weight: bold !important;
   }
   .tableButtons{
   height:30px;
   width:100%;
   box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
   }
   .adddeleteRowIcon{
   border: 1px solid #fff;
   background: #126291;
   color: #fff;
   border-radius: 20px;
   margin: 5px;
   font-size: 10px;
   padding: 2px;
   padding-left: 6px;
   padding-right: 6px;
   }
</style>