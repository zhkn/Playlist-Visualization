let word_freq = new Map();
let kwArray = [];
$.ajax({
    type: 'GET',
    url: './data/word_freq.csv',
    dataType: 'text',
    success: function(data) {
        data = $.csv.toObjects(data);
        data.forEach(datum => {
            word_freq.set(datum['关键词'], +(datum['次数']));
            kwArray.push(datum['关键词']);
        });
    }
    
});