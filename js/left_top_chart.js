var music_data = [];

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "data/music_message.csv",
        dataType: "text",
        success: function(d) {
          d = $.csv.toObjects(d);
          music_data = Array.from(d.slice(0, 10));
          // console.log(music_data);

          init_chart1();
        }
   });
});




function  init_chart1() {
    // 1实例化对象
    var myChart = echarts.init(document.querySelector(".left-radial .chart"));
    // console.log(data.play);

    // 2. 指定配置项和数据
    option = {
        // color: ['#70e7ef', '#3a64e9', '#f34646', '#e43185', '#b53edd', '#cddc39', '#ff9800'],
        angleAxis: {
            type: 'category',
            // data: ["a", "b", "c", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
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
            }


        },
        tooltip: {},
        polar: {},
        legend: {
            show: true,
            right: 0,
            bottom: 0,
            type: 'scroll',
            orient: 'vertical',
            data: ['播放量', '收藏量', '评论数', '歌曲数'],
            textStyle:{
              color: "rgba(255,255,255,.6) "
            }
        },
        series: [
          // radius: [20, 400],
          {
            type: 'bar',
            radius : [20, 110],
            // data: [6.16, 6.84, 8.49, 8.11, 8.78, 7.13, 5.7, 4.28, 3.79, 4.07, 4.46, 5.76, 7.26, 6.92, 6.92, 5.32],
            data: getParamValues("play_million"),
            coordinateSystem: 'polar',
            name: '播放量',
            stack: 'a'
        }, {
            type: 'bar',
            // data: [5.82, 8.0, 12.36, 11.77, 9.38, 6.19, 4.61, 3.87, 3.44, 3.17, 2.45, 3.58, 6.91, 6.47, 6.47, 5.5],

            data: getParamValues("collection_ten_thousand"),
            coordinateSystem: 'polar',
            name: '收藏量',
            stack: 'a'
        }, {
            type: 'bar',
            // data: [3.4, 7.37, 16.29, 12.56, 7.37, 5.04, 1.84, 1.11, 1.89, 2.97, 1.82, 4.11, 10.41, 10.01, 10.01, 3.81],
            // data: data.comments,
            data: getParamValues("comments_hundred"),
            coordinateSystem: 'polar',
            name: '评论数',
            stack: 'a'
        }, {
            type: 'bar',
            // data: [6.16, 6.84, 8.49, 8.11, 8.78, 7.13, 5.7, 4.28, 3.79, 4.07, 4.46, 5.76, 7.26, 6.92, 6.92, 5.32],
            data: getParamValues("songs"),
            coordinateSystem: 'polar',
            name: '歌曲数',
            stack: 'a'
        }]
    };

    // 3. 把配置项给实例对象
    myChart.setOption(option);
    // 4. 让图表跟随屏幕自动的去适应
    window.addEventListener("resize", function() {
      myChart.resize();
    });
};


function getParamValues(name) {
      var ret = [];
      for (var i = 0; i < music_data.length; i++) {
          ret.push(music_data[i][name])
      }
      // console.log(name);
      // console.log(ret);
      return ret;
}
