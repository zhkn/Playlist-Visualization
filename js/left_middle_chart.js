var founder_data;

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "data/founder_info.csv",
        dataType: "text",
        success: function(d) {
          d = $.csv.toObjects(d);
          console.log(d);

          founder_data = Array.from(d.slice(0, 30));
          console.log(founder_data);

          init_chart();
        }
   });
});





function init_chart() {
    var myChart = echarts.init(document.querySelector(".left-bar .chart"));

    var xAxisData = getParamValues1("founder");
    var data1 = getParamValues1("event_count");
    var data2 = getParamValues1("fan_count");
    var data3 = getParamValues1("follow_count");
    // for (var i = 0; i < 100; i++) {
        // xAxisData.push('类目' + i);
        // data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
        // data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
    // }

    var option = {
        legend: {
            data: ['bar', 'bar2'],
            textStyle:{
              color: "rgba(255,255,255,.6) "
            }
            // data: [{
            //           name: '系列1',
            //           // 设置文本为红色
            //           textStyle: {
            //               color: 'red'
            //           }
            //       }]
        },
        toolbox: {
            // y: 'bottom',
            feature: {
                magicType: {
                    type: ['stack', 'tiled']
                },
            }
        },
        tooltip: {},
        grid: {
          left: "0%",
          top: "10px",
          right: "0%",
          bottom: "4%",
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
              color: "rgba(255,255,255,.6) ",
              fontSize: "12"
            }

        },
        yAxis: {
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
            fontSize: "12"
          }
        },
        series: [{
            name: 'event_count',
            type: 'bar',
            data: data1,
            animationDelay: function (idx) {
                return idx * 10;
            }
        }, {
            name: 'fan_count',
            type: 'bar',
            data: data2,
            animationDelay: function (idx) {
                return idx * 10 + 100;
            }
        },{
            name: 'follow_count',
            type: 'bar',
            data: data3,
            animationDelay: function (idx) {
                return idx * 10 + 100;
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
