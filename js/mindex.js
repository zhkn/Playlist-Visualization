let list_up_map = new Map();
let today_lists = new Set();
$.ajax({
    type: 'GET',
    url: './data/playlist2.csv',
    dataType: 'text',
    success: function (data) {
        json = $.csv.toObjects(data);
        json.forEach(datum => {
            list_up_map.set(datum['歌单id'], new Object({name: datum['歌单名'],up:datum['创建者']}));
        })
        allups = new Set(json.map(datum => datum['创建者']));
        document.getElementById('type-list-count').innerHTML = list_up_map.size;
        document.getElementById('type-up-count').innerHTML = allups.size;
    } 
}); 
var myChart = echarts.init(document.querySelector('.map .chart'));
var option = {
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
        right: "0%"
    },
    grid: {
        top: '10%',
        left: '0%',
        right: '5%',
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
        }
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
        }
    },
    series: [
        {
            type: 'line',
            smooth: true,
        },
        {
            type: 'line',
            smooth: true,
        },
        {
            type: 'line',
            smooth: true,
        }
    ]
};

myChart.setOption(option);
window.addEventListener("resize", function () {
    myChart.resize();
});

// $('#list1').on('change', function() {
//     queryCollection.add($('#list1').val());
// })
let finalData;
var csv_file_API = './data/amoutOfPlaylist.csv';
let queryCollection = ['4933141282', '4884876852','4984514920'];
// let queryCollection = [];
$.ajax({
    type: 'GET',
    url: csv_file_API,
    dataType: 'text',
    error: function (e) {
        alert('An error occurred while processing API calls');
    },
    success: function (data) {
        var json = $.csv.toObjects(data);
        finalData = [[], [], []];
        // queryCollection.forEach(datum => finalData.push([]));
        alldates = new Set();
        // dt = new Date();
        // date  = dt.getDate();
        // month = dt.getMonth() + 1;
        day = 3;
        month = 6;
        json.forEach(datum => {
            datum_date = new Date(datum['日期']);
            if (datum_date.getDate() === day && (datum_date.getMonth() + 1) === month) {
                today_lists.add(datum['歌单id']);
                // if (list_up_map.has(datum['歌单id'])){
                //     $("#list1").append("<option value="+ datum['歌单id'] +">"+ list_up_map.get(datum['歌单id']).name +"<option>")
                //     $("#list2").append("<option value="+ datum['歌单id'] +">"+ list_up_map.get(datum['歌单id']).name +"<option>")
                //     $("#list3").append("<option value="+ datum['歌单id'] +">"+ list_up_map.get(datum['歌单id']).name +"<option>")
                // }

            }
        })
        console.log(today_lists);
        json.forEach(datum => {
            for (i = 0; i < queryCollection.length; i++) {
                // if (queryCollection[i] === datum['歌单id'] && today_lists.has(datum['歌单id'])) {
                if (queryCollection[i] === datum['歌单id']) {
                    finalData[i].push(datum['播放量']);
                    alldates.add(datum['日期']);
                    break;
                }
            }
        });
        console.log(finalData);
        seriesResult = [];
        for (i = 0; i < queryCollection.length; i++) {
            console.log(list_up_map.get(queryCollection[i]));
            seriesResult.push(new Object(
                {
                    name: list_up_map.get(queryCollection[i]).name,
                    smooth: true,
                    data: finalData[i]
                }
            ));
        }
        myChart.setOption({
            xAxis: {
                data: Array.from(alldates)
            },
            series: seriesResult
        });
    } // end: Ajax success API call
}); // end: of Ajax call
