<script>
import UniqueChart from "./UniqueChart";
export default {
  name: "UniqueTestcaseCharts",
   props: [ "chartData","uniqueCount" ],
    mounted() {
        debugger;
        this.loaduniqueCharts();
   },
   watch:{
       chartData:{
       immediate: true,
    deep: true,
    handler(chartData) {
         this.loaduniqueCharts();
    }
       } 
   },
    components: {
        UniqueChart
    
  },
  data() {
    return {
        showGrph:false,
        uniqueSplideOptions:{
           rewind: true,
        width: "100%",
        perPage: 4,
        gap: "1rem",
        perMove: 1,
        speed: 600,
        autoplay: true,
        },
           pie_chart_option1:{
    title: {
      text: "Auto_vs_maual",
      verticalAlign: 'bottom',
    },
    chart: {
     type: "pie",
     backgroundColor: null,
    options3d: {
      enabled: true, //Use 3d function
      alpha: 45,
      beta: 0,
    },
    },
    tooltip: {
      style: { "font-size": "14px" },
      pointFormat: "{point.label}: <b>{point.y}</b>",
    },
    plotOptions: {
      pie: {
        depth: 45,
        size: 200,
        allowPointSelect: true,
        innerSize: 70,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          crop: true,
        overflow: 'none',
          format: "<b>{point.name}</b>: <b>{point.y}</b>",
           style: {
        textOutline: 'transparent'
      }
        },
         legend: {
              floating: false,
              backgroundColor: null,
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
              x: 0,
              y: 0,
            },
        // Set whether the pie chart is displayed in the legend
      },
    },
    credits: false,
    series: [
      {
        type: "pie",
        data: [],
        point: {
          events: {
             click: (e) => {
            },
          },
        },
      },
    ],
     exporting: {
        enabled: false
    }
  },
   pie_chart_option2:{
    title: {
      text: "Automatable",
      verticalAlign: 'bottom',
    },
    chart: {
     type: "pie",
     backgroundColor: null,
    options3d: {
      enabled: true, //Use 3d function
      alpha: 45,
      beta: 0,
    },
    },
    tooltip: {
      style: { "font-size": "14px" },
      pointFormat: "{point.label}: <b>{point.y}</b>",
    },
    plotOptions: {
      pie: {
        depth: 45,
        size: 200,
        allowPointSelect: true,
        innerSize: 70,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
            crop: true,
        overflow: 'none',
          format: "<b>{point.name}</b>: <b>{point.y}</b>",
           style: {
        textOutline: 'transparent'
      }
        },
         legend: {
              floating: false,
              backgroundColor: null,
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
              x: 0,
              y: 0,
            }
      , // Set whether the pie chart is displayed in the legend
      },
    },
    credits: false,
    series: [
      {
        type: "pie",
        data: [],
        point: {
          events: {
             click: (e) => {
            },
          },
        },
      },
    ],
     exporting: {
        enabled: false
    }
  },
   pie_chart_option3:{
    title: {
      text: "Automation Owner",
      verticalAlign: 'bottom',
    },
    chart: {
     type: "pie",
     backgroundColor: null,
    options3d: {
      enabled: true, //Use 3d function
      alpha: 45,
      beta: 0,
    },
    },
    tooltip: {
      style: { "font-size": "14px" },
      pointFormat: "{point.label}: <b>{point.y}</b>",
    },
    plotOptions: {
      pie: {
        depth: 45,
        size: 200,
        allowPointSelect: true,
        innerSize: 70,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
            crop: true,
        overflow: 'none',
          format: "<b>{point.name}</b>: <b>{point.y}</b>",
           style: {
        textOutline: 'transparent'
      }
        },
         legend: {
              floating: false,
              backgroundColor: null,
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
              x: 0,
              y: 0,
            } // Set whether the pie chart is displayed in the legend
      },
    },
    credits: false,
    series: [
      {
        type: "pie",
        data: [],
        point: {
          events: {
             click: (e) => {
           },
          },
        },
      },
    ],
     exporting: {
        enabled: false
    }
  },
   pie_chart_option4:{
    title: {
      text: "Testcase Owner",
      verticalAlign: 'bottom',
    },
    chart: {
     type: "pie",
     backgroundColor: null,
    options3d: {
      enabled: true, //Use 3d function
      alpha: 45,
      beta: 0,
    },
    },
    tooltip: {
      style: { "font-size": "14px" },
      pointFormat: "{point.label}: <b>{point.y}</b>",
    },
    plotOptions: {
      pie: {
        depth: 45,
        size: 200,
        allowPointSelect: true,
        innerSize: 70,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
            crop: true,
        overflow: 'none',
         format: "<b>{point.name}</b>: <b>{point.y}</b>",
           style: {
        textOutline: 'transparent'
      }
        }, legend: {
              floating: false,
              backgroundColor: null,
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
              x: 0,
              y: 0,
            } // Set whether the pie chart is displayed in the legend
      },
    },
    credits: false,
    series: [
      {
        type: "pie",
        data: [],
        point: {
          events: {
             click: (e) => {
            },
          },
        },
      },
    ],
     exporting: {
        enabled: false
    }
  },
   pie_chart_option5:{
    title: {
      text: "Features",
      verticalAlign: 'bottom',
    },
    chart: {
     type: "pie",
     backgroundColor: null,
    options3d: {
      enabled: true, //Use 3d function
      alpha: 45,
      beta: 0,
    },
    },
    tooltip: {
      style: { "font-size": "14px" },
      pointFormat: "{point.label}: <b>{point.y}</b>",
    },
    plotOptions: {
      pie: {
        depth: 45,
        size: 200,
        allowPointSelect: true,
        innerSize: 70,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
            crop: true,
        overflow: 'none',
          format: "<b>{point.name}</b>: <b>{point.y}</b>",
           style: {
        textOutline: 'transparent'
      }
        },
         legend: {
              floating: false,
              backgroundColor: null,
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
              x: 0,
              y: 0,
            }, // Set whether the pie chart is displayed in the legend
      },
    },
    credits: false,
    series: [
      {
        type: "pie",
        data: [],
        point: {
          events: {
             click: (e) => {
            },
          },
        },
      },
    ],
     exporting: {
        enabled: false
    }
  },
     pie_chart_option6:{
    title: {
      text: "Empty Procedure",
      verticalAlign: 'bottom',
    },
    chart: {
     type: "pie",
     backgroundColor: null,
    options3d: {
      enabled: true, //Use 3d function
      alpha: 45,
      beta: 0,
    },
    },
    tooltip: {
      style: { "font-size": "14px" },
      pointFormat: "{point.label}: <b>{point.y}</b>",
    },
    plotOptions: {
      pie: {
        depth: 45,
        size: 200,
        allowPointSelect: true,
        innerSize: 70,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
            crop: true,
        overflow: 'none',
          format: "<b>{point.name}</b>: <b>{point.y}</b>",
           style: {
        textOutline: 'transparent'
      }
        },
         legend: {
              floating: false,
              backgroundColor: null,
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
              x: 0,
              y: 0,
            },
        // Set whether the pie chart is displayed in the legend
      },
    },
    credits: false,
    series: [
      {
        type: "pie",
        data: [],
        point: {
          events: {
             click: (e) => {
            },
          },
        },
      },
    ],
     exporting: {
        enabled: false
    }
  },
    pie_chart_option7:{
    title: {
      text: "Sources",
      verticalAlign: 'bottom',
    },
    chart: {
     type: "pie",
     backgroundColor: null,
    options3d: {
      enabled: true, //Use 3d function
      alpha: 45,
      beta: 0,
    },
    },
    tooltip: {
      style: { "font-size": "14px" },
      pointFormat: "{point.label}: <b>{point.y}</b>",
    },
    plotOptions: {
      pie: {
        depth: 45,
        size: 200,
        allowPointSelect: true,
        innerSize: 70,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
            crop: true,
        overflow: 'none',
          format: "<b>{point.name}</b>: <b>{point.y}</b>",
           style: {
        textOutline: 'transparent'
      }
        },
         legend: {
              floating: false,
              backgroundColor: null,
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
              x: 0,
              y: 0,
            },
        // Set whether the pie chart is displayed in the legend
      },
    },
    credits: false,
    series: [
      {
        type: "pie",
        data: [],
        point: {
          events: {
             click: (e) => {
            },
          },
        },
      },
    ],
     exporting: {
        enabled: false
    }
  },
  pie_chart_options1:"",
  pie_chart_options2:"",
  pie_chart_options3:"",
  pie_chart_options4:"",
  pie_chart_options5:"",
  pie_chart_options6:"",
   pie_chart_options7:"",
    }
  },
  methods:{
      onChildInteraction(args,payload){

      },
      loaduniqueCharts(){
          if(this.chartData){
              debugger;
              this.pie_chart_option1.series[0].data=  [{
                         "name": "Automated",
                         "y": this.chartData.Auto_vs_maual.Automated,
                         "color":"#52a7f0"
                        },
                        {
          "name": "Automated",
                         "y": this.chartData.Auto_vs_maual.Manual,
                         "color":"#d9b611"
        }];

             this.pie_chart_option2.series[0].data=  [{
                         "name": "Yes",
                         "y": this.chartData.Automatable.Yes,
                         "color":"#73c34b"
                        },
                        {
                          "name": "No",
                         "y": this.chartData.Automatable.No,
                          "color":"#f86393"
                         },
                        {
                          "name": "Partial",
                         "y": this.chartData.Automatable.Partial,
                         "color":"#56cbf8"
                        }];
            

         let owners=this.chartData.AutomationOwner.AutomationOwner;
         let obj={},arr=[];
         for(let i=0;i<Object.keys(owners).length;i++){
             obj={};
             obj["name"]=Object.keys(owners)[i];
             obj["y"]=owners[Object.keys(owners)[i]];
             arr.push(obj);
         }
         this.pie_chart_option3.series[0].data=[...arr];

         let engineers=this.chartData.Engineers.engineer;
         arr=[];
         for(let i=0;i<Object.keys(engineers).length;i++){
             obj={};
             obj["name"]=Object.keys(engineers)[i];
             obj["y"]=engineers[Object.keys(engineers)[i]];
             arr.push(obj);
         }
         this.pie_chart_option4.series[0].data=[...arr];

         let features=this.chartData.feature.features_list;
         arr=[];
         for(let i=0;i<Object.keys(features).length;i++){
             obj={};
             obj["name"]=Object.keys(features)[i];
             obj["y"]=features[Object.keys(features)[i]];
             arr.push(obj);
         }
         this.pie_chart_option5.series[0].data=[...arr];

        arr=[];
        let withProCount=this.uniqueCount-this.chartData.missing_procedure;
         arr.push({name:"Empty Procedure",y:this.chartData.missing_procedure});
        arr.push({name:"With Procedure",y:withProCount});
         this.pie_chart_option6.series[0].data=[...arr];

        let sources=this.chartData.source.sources_list;
         arr=[];
         for(let i=0;i<Object.keys(sources).length;i++){
             obj={};
             obj["name"]=Object.keys(sources)[i];
             obj["y"]=sources[Object.keys(sources)[i]];
             arr.push(obj);
         }
         this.pie_chart_option7.series[0].data=[...arr];

            this.pie_chart_options1=JSON.stringify(this.pie_chart_option5);     
              this.pie_chart_options2=JSON.stringify(this.pie_chart_option1);     
                this.pie_chart_options3=JSON.stringify(this.pie_chart_option2);     
                  this.pie_chart_options4=JSON.stringify(this.pie_chart_option3);     
                    this.pie_chart_options5=JSON.stringify(this.pie_chart_option4);  
                 this.pie_chart_options6=JSON.stringify(this.pie_chart_option6);    
                 this.pie_chart_options7=JSON.stringify(this.pie_chart_option7);             
        

             this.showGrph=true;
          }
          else{
              this.showGrph=false;
          }
      }
  }
  }
  </script>
  <template>
    <div v-if="showGrph">
     <splide :options="uniqueSplideOptions" class="uniqueSlides">
       <splide-slide
              class="uniqueSlides">
         <div class="uniqueChartDiv">
              <UniqueChart  class="chartSummaryUnique"  v-on:child="onChildInteraction" id="uniqueChart1" :option="pie_chart_options1"></UniqueChart>
          </div>
       </splide-slide>
        <splide-slide
              class="uniqueSlides">
         <div class="uniqueChartDiv">
              <UniqueChart  class="chartSummaryUnique"  v-on:child="onChildInteraction" id="uniqueChart2" :option="pie_chart_options2"></UniqueChart>
          </div>
       </splide-slide>
        <splide-slide
              class="uniqueSlides">
         <div class="uniqueChartDiv">
              <UniqueChart  class="chartSummaryUnique"  v-on:child="onChildInteraction" id="uniqueChart3" :option="pie_chart_options3"></UniqueChart>
          </div>
       </splide-slide>
        <splide-slide
              class="uniqueSlides">
         <div class="uniqueChartDiv">
              <UniqueChart  class="chartSummaryUnique"  v-on:child="onChildInteraction" id="uniqueChart4" :option="pie_chart_options4"></UniqueChart>
          </div>
       </splide-slide>
        <splide-slide
              class="uniqueSlides">
         <div class="uniqueChartDiv">
              <UniqueChart  class="chartSummaryUnique"  v-on:child="onChildInteraction" id="uniqueChart5" :option="pie_chart_options5"></UniqueChart>
          </div>
       </splide-slide>
        <splide-slide
              class="uniqueSlides">
         <div class="uniqueChartDiv">
              <UniqueChart  class="chartSummaryUnique"  v-on:child="onChildInteraction" id="uniqueChart6" :option="pie_chart_options6"></UniqueChart>
          </div>
       </splide-slide>
        <splide-slide
              class="uniqueSlides">
         <div class="uniqueChartDiv">
              <UniqueChart  class="chartSummaryUnique"  v-on:child="onChildInteraction" id="uniqueChart7" :option="pie_chart_options7"></UniqueChart>
          </div>
       </splide-slide>
      </splide>


    <!--<div class="row" style="margin:20px;display: flex;justify-content: space-between;">
   
     <div class="uniqueChartDiv">
      <UniqueChart  class="chartSummaryUnique"  v-on:child="onChildInteraction" id="uniqueChart2" :option="pie_chart_options2"></UniqueChart>
     </div>
      <div class="uniqueChartDiv">
       <UniqueChart  class="chartSummaryUnique"  v-on:child="onChildInteraction" id="uniqueChart3" :option="pie_chart_options3"></UniqueChart>
      </div>
       <div class="uniqueChartDiv">
        <UniqueChart  class="chartSummaryUnique"  v-on:child="onChildInteraction" id="uniqueChart4" :option="this.pie_chart_options4"></UniqueChart>
       </div>
        <div class="uniqueChartDiv">
         <UniqueChart  class="chartSummaryUnique"  v-on:child="onChildInteraction" id="uniqueChart5" :option="this.pie_chart_options5"></UniqueChart>
        </div>
         <div class="uniqueChartDiv">
         <UniqueChart  class="chartSummaryUnique"  v-on:child="onChildInteraction" id="uniqueChart6" :option="this.pie_chart_options6"></UniqueChart>
         </div>
          <div class="uniqueChartDiv">
         <UniqueChart  class="chartSummaryUnique"  v-on:child="onChildInteraction" id="uniqueChart7" :option="this.pie_chart_options7"></UniqueChart>
          </div>
    </div>-->
    </div>
  </template>
  <<style scoped>

  </style>