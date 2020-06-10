var tag_data;

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "data/music_message.csv",
        dataType: "text",
        success: function(data) {
          data = $.csv.toObjects(data);
          // console.log(data);
          var map = new Map();
          data.forEach(datum=>{
            var tag_list = datum.tag.split('-');
            // console.log(tag_list);
            for (t of tag_list) {
              if (!map.has(t)) {
                  // map[t] = 1;
                  map.set(t, 1);
              } else {
                  // map[t] = map[t] + 1;
                  map.set(t, map.get(t) + 1);
              }
            }


          })
          // console.log(map);
          var arrayObj=Array.from(map);
          // console.log(arrayObj);
          arrayObj.sort(function(a,b){return b[1]-a[1]});
          // console.log(arrayObj);
        }
   });
});





(function() {
    var myChart = echarts.init(document.querySelector(".left-pie .chart"));



    option = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            show: true,
            right: 0,
            bottom: 0,
            type: 'scroll',
            orient: 'vertical',
            data: ["欧美", "流行", "电子", "影视原声", "说唱", "华语"],
            textStyle:{
              color: "rgba(255,255,255,.6) "
            }
        },
        series : [
            {
                name: '华语',
                type: 'pie',
                radius : ['5%', '10%'],
                // label: {
                //     normal: {
                //         position: 'inner'
                //     }
                // },
                label: {
                    show: false,
                    position: 'outer',
                    alignTo: 'edge'
                },

                data:[
                    {
                        value:'89',
                        name:'华语',
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                normal: {
                                    color: '#dc1439'
                                }
                            }
                        }
                    },
                    {
                        value:'150',
                        itemStyle: {
                            normal: {
                                color: 'transparent'
                            }
                        }
                    }
                ]
            },  {
                name: '说唱',
                type: 'pie',
                radius : ['15%', '20%'],
                label: {
                    show: false
                },
                data:[
                    {
                        value:'118',
                        name:'说唱',
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                normal: {
                                    color: '#dc1439'
                                }
                            }
                        }
                    },
                    {
                        value:'150',
                        itemStyle: {
                            normal: {
                                color: 'transparent'
                            }
                        }
                    }
                ]

            },  {
                name: '影视原声',
                type: 'pie',
                radius : ['25%', '30%'],
                label: {
                    show: false
                },
                data:[
                    // {value:1078, name:'生物'}
                    {
                        value:'129',
                        name:'影视原声',
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                normal: {
                                    color: '#dc1439'
                                }
                            }
                        }
                    },
                    {
                        value:'150',
                        itemStyle: {
                            normal: {
                                color: 'transparent'
                            }
                        }
                    }

                ]
            },  {
                name: '电子',
                type: 'pie',
                radius : ['35%', '40%'],
                label: {
                    show: false
                },
                data:[
                    // {value:981, name:'政治'}
                    {
                        value:'300',
                        name:'电子',
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                normal: {
                                    color: '#dc1439'
                                }
                            }
                        }
                    },
                    {
                        value:'150',
                        itemStyle: {
                            normal: {
                                color: 'transparent'
                            }
                        }
                    }
                ]
            },  {
                name: '流行',
                type: 'pie',
                radius : ['45%', '50%'],
                label: {
                    show: false
                },
                data:[
                    // {value:877, name:'历史'}
                    {
                        value:'351',
                        name:'流行',
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                normal: {
                                    color: '#dc1439'
                                }
                            }
                        }
                    },
                    {
                        value:'150',
                        itemStyle: {
                            normal: {
                                color: 'transparent'
                            }
                        }
                    }
                ]
            },  {
                name: '欧美',
                type: 'pie',
                radius : ['55%', '60%'],
                label: {
                    show: false
                },
                data:[
                    // {value:939, name:'地理'}
                    {
                        value:'1302',
                        name:'欧美',
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                normal: {
                                    color: '#dc1439'
                                }
                            }
                        }
                    },
                    {
                        value:'150',
                        itemStyle: {
                            normal: {
                                color: 'transparent'
                            }
                        }
                    }
                ]
            },
        ]
    };



    myChart.setOption(option);
    // 监听浏览器缩放，图表对象调用缩放resize函数
    window.addEventListener("resize", function() {
      myChart.resize();
    });
  })();
