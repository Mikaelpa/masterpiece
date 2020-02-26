
import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
require("highcharts/modules/heatmap")(Highcharts)
require("highcharts/modules/exporting")(Highcharts)
require("highcharts/modules/boost")(Highcharts)

function getPointCategoryName(point, dimension) {
  var series = point.series,
      isY = dimension === 'y',
      axis = series[isY ? 'yAxis' : 'xAxis'];
  return axis.categories[point[isY ? 'y' : 'x']];
}

const formatData = (d) => { 
    let data = d.data
    let arr2D = new Array(4);
    for (var i = 0; i < arr2D.length; i++) { 
        arr2D[i] = new Array(5); 
    } 
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 4; j++) {
            arr2D[j][i] = 0;
        }
    }

    for (let i = 0; i < data.length; i++) {
        const day = new Date(data[i].date)
        for (let j = 0; j < 5; j++) {
            if (day.getDay() === j + 1) {
                arr2D[0][j] += data[i].conversation_count
                arr2D[1][j] += data[i].user_message_count
                arr2D[2][j] += data[i].missed_chat_count
                arr2D[3][j] += data[i].visitors_with_conversation_count
            }
        }
    }
    var helperArray = new Array(20)
    let pointer = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 4; j++) {
            helperArray[pointer] = [j,i,arr2D[j][i]]
            pointer++;
        }
    }

  return (helperArray)
}

const Graph = ({ data }) => {
  const list = formatData({data})
  const options = {
    chart: {
      type: 'heatmap',
      marginTop: 40,
      marginBottom: 80,
      plotBorderWidth: 1
  },  
  title: {
      text: 'Heatmap for each day of the week'
  },

  credits: {
    text: ""
  },

  xAxis: {
      categories: ['missed_chat_count', 'visitor_message_count', 'user_message_count', 'conversation_count', 'chats_from_visitor_count', 'chats_from_user_coun', 'chats_from_autosuggest_count', 'visitors_with_chat_count', 'visitors_autosuggested_count', 'visitors_with_conversation_count']
  },

  yAxis: {
      categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      title: null
  },


  colorAxis: {
      min: 0,
      minColor: '#FFFFFF',
      maxColor: Highcharts.getOptions().colors[0]
  },

  legend: {
      align: 'right',
      layout: 'vertical',
      margin: 0,
      verticalAlign: 'top',
      y: 25,
      symbolHeight: 280
  },

  tooltip: {
      formatter: function () {
          return '<b>' + getPointCategoryName(this.point, 'x') + '</b> on <br><b>' + getPointCategoryName(this.point, 'y') + 's</b> combined total is </br><b>'
              + this.point.value + '</b>';
      }
  },

  series: [{
      name: 'Heatmap',
      borderWidth: 1,
      data: list,
      dataLabels: {
          enabled: true,
          color: '#000000'
      }
  }],

  responsive: {
      rules: [{
          condition: {
              maxWidth: 500
          },
          chartOptions: {
              yAxis: {
                  labels: {
                      formatter: function () {
                          return this.value.charAt(0);
                      }
                  }
              }
          }
      }]
  }
}


  return (
    <div className="sankey-container">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'chart'}
        options={options}
      />
    </div>
  )
}

export default Graph
