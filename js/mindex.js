// 用Map保存从playlist2中读取到的{歌单id: {name: 歌单名, up:创建者}}信息
let list_up_map = new Map();
// 用Set保存今天获取到的歌单列表
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

// 播放量小于10k, 100k, 1m, 大于1m的歌单集合
let list_lt_10k = new Set();
let list_lt_100k = new Set();
let list_lt_1m = new Set();
let list_gt_1m = new Set();
var csv_file_API = './data/amoutOfPlaylist.csv';
// 存放(要查询的列表)的数组
let queryCollection = ['4933141282', '4884876852','4984514920'];
// 存放[(要查询的列表)的数据]的数组
let finalData;
// 获取到的全部数据集
let json;
$.ajax({
    type: 'GET',
    url: csv_file_API,
    dataType: 'text',
    error: function (e) {
        alert('An error occurred while processing API calls');
    },
    success: function (data) {
        json = $.csv.toObjects(data);
        finalData = [[], [], []];
        alldates = new Set();
        // dt = new Date();
        // date  = dt.getDate();
        // month = dt.getMonth() + 1;
        day = 3;
        month = 6;
        var list1 = document.getElementById('list1');
        var list2 = document.getElementById('list2');
        var list3 = document.getElementById('list3');
        var list4 = document.getElementById('list4');
        json.forEach(datum => {
            datum_date = new Date(datum['日期']);
            // 只为用户显示(今天获取到的歌单列表)与(之前保存过的歌单列表信息)的交集
            if (datum_date.getDate() === day && (datum_date.getMonth() + 1) === month && list_up_map.has(datum['歌单id'])) {
                today_lists.add(datum['歌单id']);
                if (datum['播放量'] < 10000) {
                    list_lt_10k.add(datum['歌单id']);
                    list1.add(new Option(list_up_map.get(datum['歌单id']).name,datum['歌单id']));
                } else if (datum['播放量'] < 100000) {
                    list_lt_100k.add(datum['歌单id']);
                    list2.add(new Option(list_up_map.get(datum['歌单id']).name, datum['歌单id']));
                } else if (datum['播放量'] < 1000000) {
                    list_lt_1m.add(datum['歌单id']);
                    list3.add(new Option(list_up_map.get(datum['歌单id']).name, datum['歌单id']));
                } else {
                    list_gt_1m.add(datum['歌单id']);
                    list4.add(new Option(list_up_map.get(datum['歌单id']).name, datum['歌单id']));
                }
            }
        })
        document.getElementById('type-list-count').innerHTML = list_up_map.size;
        document.getElementById('type-up-count').innerHTML = allups.size;
        console.log(today_lists);
        refresh();
        refresh_selected_lists();
    } // end: Ajax success API call
}); // end: of Ajax call

// 刷新已选歌单列表框
function refresh_selected_lists(){
    var ul = document.getElementById('list-selected');
    ul.innerHTML = '';
    function addLi(list_id) {
        var newButton = document.createElement('button');
        newButton.setAttribute('value', list_id);
        newButton.className = 'del-btn';
        newButton.innerHTML = '删除';
        newButton.style = 'float:right;';
        var newLine = document.createElement('h2');
        newLine.style = 'text-align:center;';
        newLine.textContent = list_up_map.get(list_id).name;
        newLine.appendChild(newButton);
        var newLi = document.createElement('li');
        newLi.appendChild(newLine);
        newLi.setAttribute('style', 'font-size:0.2rem');
        ul.appendChild(newLi);
    }
    queryCollection.forEach(query => {
        addLi(query);
    })
}

// 刷新页面中间折线图
function refresh() {
    finalData = [];
    queryCollection.forEach((d, i) => { finalData[i] = []; });
    json.forEach(datum => {
        for (i = 0; i < queryCollection.length; i++) {
            if (queryCollection[i] === datum['歌单id']) {
                finalData[i].push(datum['播放量']);
                alldates.add(datum['日期']);
                break;
            }
        }
    });
    seriesResult = [];
    for (i = 0; i < queryCollection.length; i++) {
        seriesResult.push(new Object(
            {
                name: list_up_map.get(queryCollection[i]).name,
                type: 'line',
                smooth: true,
                data: finalData[i]
            }
        ));
    }
    // 为myChart刷新设置, 更新了x轴的数据和series
    var preOption = myChart.getOption();
    myChart.clear();
    preOption.series = seriesResult;
    preOption.xAxis.data = Array.from(alldates);
    myChart.setOption(preOption);
}

// 设置添加/删除按钮事件, 事件最后会触发刷新事件
var refreshTool = $('#refreshTool');
$('.add-btn').on('click', function() {
    if (queryCollection.indexOf($(this).prev().val()) != -1) return;
    queryCollection.push($(this).prev().val());
    refreshTool.trigger('change');
})
$('#list-selected').on('click', '.del-btn', function() {
    queryCollection.remove($(this)[0].value);
    refreshTool.trigger('change');
})
// 用于实现刷新的工具对象, 并不真实显示在页面中
$('#refreshTool').change(function() {
    console.log('changed');
    refresh();
    refresh_selected_lists();
    console.log(queryCollection);
})