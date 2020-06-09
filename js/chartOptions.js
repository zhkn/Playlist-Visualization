let option4LineChart = {
    // title: {
    //     text:'折线图',
    //     textStyle: {
    //         fontStyle: 'normal',
    //         color: 'white',
    //     }
    // },
    color: [
        "#00f2f1",
        "#ed3f35",
        "#f99289",
        "#fec8a5",
        "#febbc4",
        "#f888c6",
        "#ab9cc5",
        "#9d6c87",
        "#86d9e2",
        "#a1dbcb",
        "#d5dcbd",
        "#fffab0",
    ],
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        textStyle: {
            color: "#4c9bfd"
        },
        right: "0%",
        left: '20%',
    },
    grid: {
        top: '10%',
        left: '2%',
        right: '7%',
        bottom: '8%',
        show: true,
        borderColor: "#012f4a",
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisTick: {
            show: false
        },
        axisLabel: {
            color: '#4c9bfd'
        },
        axisLine: {
            show: false
        },
        nameLocation: 'end',
        name: '日期',
        nameTextStyle: {
            color: 'white',
            fontSize: 20,
        },
    },
    yAxis: {
        type: 'value',
        axisTick: {
            show: false
        },
        axisLabel: {
            color: '#4c9bfd'
        },
        axisLine: {
            show: false
        },
        splitLine: {
            lineStyle: {
                color: 'white'
            }
        },
        nameLocation: 'end',
        name: '播放量',
        nameTextStyle: {
            color: 'white',
            fontSize: 20,
        },
    },
    series: []
};
let myChart = echarts.init(document.querySelector('.map .chart'));
myChart.setOption(option4LineChart);
window.addEventListener("resize", myChart.resize);

let option4KeywordChart = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        type: 'scroll',
        orient: 'horizontal',
        right: 10,
        top: 10,
        // bottom: 20,
        textStyle: {
            color: "#4c9bfd"
        },
    },
    grid: {
        left: '3%',
        right: '5%',
        top: '23%',
        bottom: '5%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: [],
            nameLocation: 'center',
            name: '播放量区间',
            nameTextStyle: {
                color: 'white',
                padding: 5,
            },
            axisLabel: {
                color: 'white',
            }                
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {
                color: 'white',
            },
            nameLocation: 'end',
            name: '次数',
            nameTextStyle: {
                color: 'white',
            },
        }
    ],
    series: [],
};

let keywordChart = echarts.init(document.getElementById('keywordChart'));
keywordChart.setOption(option4KeywordChart);
window.addEventListener("resize", keywordChart.resize);