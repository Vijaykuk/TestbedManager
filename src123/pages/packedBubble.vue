<template>
  <section class="charts">
     <vue-highcharts :options="options" :highcharts="Highcharts" ></vue-highcharts>
    </section>
</template>
<script>
import VueHighcharts from './VueHighcharts.vue'
import More from 'highcharts/highcharts-more'
import Highcharts from 'highcharts'
More(Highcharts)

const data = {
    chart: {
        type: 'packedbubble',
        plotBorderWidth: 1,
    },
    legend: {
        enabled: false
    },
    title: {
        text: 'Resources'
    },
    
    
    tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        pointFormat: '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>',
        footerFormat: '</table>',
        followPointer: true
    },
    plotOptions: {
        packedbubble: {
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            },
            minPointSize: 5
        }
    },
    series:  [{
        name: 'Coffee',
        data: [{
        	value: 10, name: 'Admin',color:'#2596be'
        }, {
          value: 10, name: 'Shabs',color:'#e28743'
        }, {
          value: 10, name: 'Chandra',color:'#76b5c5'
        }, {
        	value: 10, name: 'Dick' ,color:'pink'
        }]}]
}

export default {
  components: {
    VueHighcharts,
  },
  data() {
    return {
      options: data,
      Highcharts,
    }
  }
}
</script>