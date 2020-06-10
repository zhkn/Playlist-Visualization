var data;

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "data/music_message.csv",
        dataType: "text",
        success: function(d) {
          d = $.csv.toObjects(d);
          console.log(d);
          data = d;
        }
   });
});




(function() {
    // 1实例化对象
    var myChart = echarts.init(document.querySelector(".left-radial .chart"));
    // console.log(data.play);

    // 2. 指定配置项和数据
    option = {
        // color: ['#70e7ef', '#3a64e9', '#f34646', '#e43185', '#b53edd', '#cddc39', '#ff9800'],
        angleAxis: {
            type: 'category',
            // data: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            // data: [],
            boundaryGap: false,
            axisLine: {
                show: false
            },
            axisTick: {
                alignWithLabel: false,
                show: false
            },
            // axisLine: {
            //     lineStyle: {
            //         color: '#30465D'
            //     }
            // },
            splitLine: {
                show: false
            },
            minorTick: {
              show: false
            },
            minorSplitLine: {
              show: false
            },

        },
        radiusAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            // axisLabel: {
            //     formatter: '{value}%',
            //     showMaxLabel: false,
            //     color: '#30465D'
            // },
            // z: 10
            splitLine: {
                show: false
            },
            minorTick: {
              show: false
            },
            minorSplitLine: {
              show: false
            },


        },
        tooltip: {},
        polar: {},
        legend: {
            show: true,
            right: 0,
            bottom: 0,
            type: 'scroll',
            orient: 'vertical',
            data: ['<0.5m/s', '0.5-2m/s', '2-4m/s', '4-6m/s', '6-8m/s', '8-10m/s', '>10m/s']
        },
        series: [
        {
            name: '半径模式',
            type: 'bar',
            coordinateSystem: 'polar',
            clockWise: false ,
            radius: [20, 400],
            center: ['40%', '60%'],
            roseType: 'area',
      			encode: {
                  itemName: 'title',
                  value: 'play'
      					}
        }]
        series: [
          radius: [20, 400],
          {
            type: 'bar',
            data: [6.16, 6.84, 8.49, 8.11, 8.78, 7.13, 5.7, 4.28, 3.79, 4.07, 4.46, 5.76, 7.26, 6.92, 6.92, 5.32],
            // data: data[play],
            coordinateSystem: 'polar',
            name: '0.5m/s',
            stack: 'a'
        }, {
            type: 'bar',
            data: [5.82, 8.0, 12.36, 11.77, 9.38, 6.19, 4.61, 3.87, 3.44, 3.17, 2.45, 3.58, 6.91, 6.47, 6.47, 5.5],
            // data: data.collection,
            coordinateSystem: 'polar',
            name: '0.5-2m/s',
            stack: 'a'
        }, {
            type: 'bar',
            data: [3.4, 7.37, 16.29, 12.56, 7.37, 5.04, 1.84, 1.11, 1.89, 2.97, 1.82, 4.11, 10.41, 10.01, 10.01, 3.81],
            // data: data.comments,
            coordinateSystem: 'polar',
            name: '2-4m/s',
            stack: 'a'
        }, {
            type: 'bar',
            data: [6.16, 6.84, 8.49, 8.11, 8.78, 7.13, 5.7, 4.28, 3.79, 4.07, 4.46, 5.76, 7.26, 6.92, 6.92, 5.32],
            coordinateSystem: 'polar',
            name: '>10m/s',
            stack: 'a'
        }]
    };

    // 3. 把配置项给实例对象
    myChart.setOption(option);
    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener("resize", function() {
      myChart.resize();
    });
  })();
