var founder_data;

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "data/founder_info.csv",
        dataType: "text",
        success: function(d) {
          d = $.csv.toObjects(d);
          console.log(d);

          founder_data = Array.from(d.slice(0, 60));
          // founder_data = Array.from(d);
          console.log(founder_data);

          init_chart();
        }
   });
});





function init_chart() {
    var myChart = echarts.init(document.querySelector(".left-bar .chart"));

    var xAxisData = getParamValues1("founder");
    // var xAxisData = Array.from(new Array(31).keys()).slice(1, 31);
    var data1 = getParamValues1("fan_count");
    var data2 = getParamValues1("follow_count");
    var data3 = getParamValues1("event_count");
    // for (var i = 0; i < 100; i++) {
        // xAxisData.push('类目' + i);
        // data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
        // data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
    // }

    var option = {
        legend: {
            data: ['粉丝数', '关注数', '动态数'],
            selected: {
                '粉丝数': true,
                '关注数': true,
                '动态数':false
            },
            textStyle:{
              color: "rgba(255,255,255,.6) "
            },
            orient: 'vertical',
            right: 0,
            bottom: 0,
        },
        toolbox: {
            // y: 'bottom',
            feature: {
                magicType: {
                    type: ['stack', 'tiled']
                },
            }
        },
        dataZoom: [
          {
              show: true,
              height: 10,
              start: 0,
              end: 30,
              bottom:"0.0000001%",
          },
          // {
          //     show: true,
          //     yAxisIndex: 0,
          //     // filterMode: 'empty',
          //     width: 10,
          //     // height: '80%',
          //     // showDataShadow: false,
          //     // left: '93%'
          // }
        ],
        tooltip: {},
        grid: {
          // left: "0%",
          // top: "10px",
          // right: "0%",
          // bottom: "4%",
          left: 0,
          top: '5%',
          right: '20%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
            data: xAxisData,
            splitLine: {
                show: false
            },
            // 不显示x坐标轴的样式
            axisTick: {
              alignWithLabel: true
            },
            // 修改刻度标签 相关样式
            axisLabel: {
              show: false,
              color: "rgba(255,255,255,.6) ",
              fontSize: "12"
            }

        },
        yAxis: {
          type:'log',
          splitLine: {
              show: false
          },
          // 不显示坐标轴的样式
          axisTick: {
            alignWithLabel: true
          },
          // 修改刻度标签 相关样式
          axisLabel: {
            color: "rgba(255,255,255,.6) ",
            fontSize: "12",
            formatter: function(value, index){
              if (value === 0.01) return 0;
              else return value;
            }
          }
        },
        series: [{
            name: '粉丝数',
            type: 'bar',
            data: data1,
            animationDelay: function (idx) {
                return idx * 10;
            },
            itemStyle: {
                    "normal": {
                        "color": '#fe8c00'
                    }
            }
        }, {
            name: '关注数',
            type: 'bar',
            data: data2,
            animationDelay: function (idx) {
                return idx * 10 + 100;
            },
            itemStyle: {
                    "normal": {
                        "color": '#595959'
                    }
            }
        },{
            name: '动态数',
            type: 'bar',
            data: data3,
            animationDelay: function (idx) {
                return idx * 10 + 100;
            },
            itemStyle: {
                    "normal": {
                        "color": '#e3ddbd'
                    }
            }
        }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 5;
        }
    };
    myChart.setOption(option);
    // 监听浏览器缩放，图表对象调用缩放resize函数
    window.addEventListener("resize", function() {
      myChart.resize();
    });
}


  function getParamValues1(name) {
        var ret = [];
        for (var i = 0; i < founder_data.length; i++) {
            ret.push(founder_data[i][name]);
        }
        // console.log(name);
        // console.log(ret);
        return ret;
  }
