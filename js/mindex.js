// 用Map保存从playlist2中读取到的{歌单id: {name: 歌单名, up:创建者}}信息
let list_up_map = new Map();
// 用Set保存今天获取到的歌单列表
let today_lists = new Set();
// 出现次数前50的关键词
let keywords = [];
// 保存(关键词与出现次数)的Map
let word_freq = new Map();
// 关键词统计-柱状图的图元数据
let kwSeriesData = [];

$.ajax('./data/word_freq.csv').then(data => {
    data = $.csv.toObjects(data);
    for (i = 0; i < 20; i++){
        datum = data[i];
        word_freq.set(datum['关键词'], +(datum['次数']));
        keywords.push(datum['关键词']);
        kwSeriesData[i] = {
            name: datum['关键词'],
            type: 'bar',
            // stack: '总量',
            data: [0,0,0,0],
        }
        if (+(datum['次数']) < 100)
            kwSeriesData[i].stack = '少于100次的关键词';
        else
            kwSeriesData[i].stack = '多于100次的关键词';

    }
});
$.ajax('./data/playlist2.csv').then(data => {
    json = $.csv.toObjects(data);
    json.forEach(datum => {
        list_up_map.set(datum['歌单id'], new Object({ name: datum['歌单名'], up: datum['创建者'] }));
    })
    allups = new Set(json.map(datum => datum['创建者']));
});

// 播放量小于10k, 100k, 1m, 大于1m的歌单集合
let list_lt_10k = new Set();
let list_lt_100k = new Set();
let list_lt_1m = new Set();
let list_gt_1m = new Set();
// 歌单播放量数据文件
const csv_file_API = './data/amoutOfPlaylist.csv';
// 存放(要查询的列表)的数组
let queryCollection = ['4933141282', '4884876852','4984514920'];
// 存放[(要查询的列表)的数据]的数组
let finalData;
// 获取到的全部数据集
let json;
// 关键词统计-柱状图的x轴数据
// let xAxisData4keywords = ['播放量<1w','1w=<播放量<10w','10w=<播放量<100w','大于100w',];

$.get(csv_file_API).then(data => {
    json = $.csv.toObjects(data);
    finalData = [[], [], []];
    alldates = new Set();
    // dt = new Date();
    // date  = dt.getDate();
    // month = dt.getMonth() + 1;
    day = 9;
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
            listName = list_up_map.get(datum['歌单id']).name;
            var amountLevel;
            if (datum['播放量'] < 10000) {
                list_lt_10k.add(datum['歌单id']);
                list1.add(new Option(listName, datum['歌单id']));
                amountLevel = 0;
            } else if (datum['播放量'] < 100000) {
                list_lt_100k.add(datum['歌单id']);
                list2.add(new Option(listName, datum['歌单id']));
                amountLevel = 1;
            } else if (datum['播放量'] < 1000000) {
                list_lt_1m.add(datum['歌单id']);
                list3.add(new Option(listName, datum['歌单id']));
                amountLevel = 2;
            } else {
                list_gt_1m.add(datum['歌单id']);
                list4.add(new Option(listName, datum['歌单id']));
                amountLevel = 3;
            }

            wordsContained = '';
            keywords.forEach((keyword, i) => {
                if (listName.indexOf(keyword) != -1) {
                    wordsContained += keyword + ' ';
                    // kwSeriesData[i][amountLevel] += 1;
                    kwSeriesData[i].data[amountLevel] += 1;
                }
            })
        }
    })
    document.getElementById('type-list-count').innerHTML = list_up_map.size;
    document.getElementById('type-up-count').innerHTML = allups.size;
    console.log(today_lists);
    refresh_linechart();
    refresh_selected_lists();
    load_keywordChart();
});

// 刷新已选歌单列表框
function refresh_selected_lists(){
    var ul = document.getElementById('list-selected');
    ul.innerHTML = '';
    function addLi(list_id) {
        var newButton = document.createElement('button');
        newButton.setAttribute('value', list_id);
        newButton.className = 'del-btn';
        newButton.innerHTML = '删除';
        newButton.style = 'float:right;margin-top:0.1rem';
        var newLine = document.createElement('h2');
        newLine.style = 'text-align:center;display:inline-block;width:80%;overflow: hidden;white-space :nowrap;text-overflow:ellipsis;';
        newLine.textContent = list_up_map.get(list_id).name;
        var newLi = document.createElement('li');
        newLi.appendChild(newLine);
        newLi.appendChild(newButton);
        newLi.setAttribute('style', 'font-size:0.2rem');
        ul.appendChild(newLi);
    }
    queryCollection.forEach(query => {
        addLi(query);
    })
}
// let preOption;
// 刷新页面中间折线图
function refresh_linechart() {
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
    preOption = myChart.getOption();
    preOption.series = seriesResult;
    preOption.xAxis[0].data = Array.from(alldates);
    preOption.tooltip[0].trigger= 'axis';
    myChart.setOption(preOption, true);
}
// 加载关键词-柱状图
function load_keywordChart() {
    preOption = keywordChart.getOption();
    preOption.series = kwSeriesData;
    preOption.xAxis[0].data = ['[0,1w)','[1w,10w)','[10w,100w)','[100w,∞)',];
    keywordChart.setOption(preOption);
}

// 设置添加/删除按钮事件, 事件最后会触发刷新事件
var refreshTool = $('#refreshTool');
$('.add-btn').on('click', function() {
    if (queryCollection.indexOf($(this).prev().val()) != -1) return;
    if (queryCollection.length >= 6) { alert('已达到可选歌单数量上限!');return;}
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
    refresh_linechart();
    refresh_selected_lists();
    console.log(queryCollection);
})

function openClose(obj) {
    // obj.innerHTML = obj.innerHTML == "隐藏" ? "展开" : "隐藏";
    // listsBar = document.getElementById('listsBar');
    // console.log(listsBar.style.display);
    // listsBar.style.display = listsBar.style.display ==  "" ? "none" : "";
    // rightTop1 = document.getElementById('rightTop1');
    // rightTop1.style.display = rightTop1.style.display ==  "" ? "none" : "";
    // listsBar.style.backgroundColor= 'rgba(25, 186, 139, 0.17)';

    rightTop1 = document.getElementById('rightTop1');
    rightTop2 = document.getElementById('rightTop2');
    if (obj.innerHTML == "隐藏") {
        // obj.innerHTML == "展开";
        rightTop1.style.display = "none";
        rightTop2.style.display = "";
    } else {
        // obj.innerHTML == "展开";
        rightTop1.style.display = "";
        rightTop2.style.display = "none";
    }
}
