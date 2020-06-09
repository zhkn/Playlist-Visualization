from wordcloud import WordCloud
import pandas as pd
import jieba

df = pd.read_csv('./data/music_message.csv', header=None)

text = ''
for line in df[2]:
    text += ' '.join(jieba.cut(line))
for line in df[0]:
    text += ' '.join(jieba.cut(line))
stopwords = set('')
stopwords.update(['封面', 'The', 'none介绍', '介绍', '歌单', '歌曲', '音乐','我们','一个', '一种','以及','自己','评论', '没有', '就是', '可以', '知道', '一起', '不是', '因为', '什么', '时候', '还是', '如果', '不要', '那些', '那么', '那个', '所有', '一样', '一直', '不会', '现在', '他们', '这样', '最后', '这个', '只是', '有些', '其实', '开始', '曾经', '所以', '不能', '你们', '已经', '后来', '一切', '一定', '这些', '一些', '只有', '还有'])
# stopwords.update(['The', '', '', '', '', '',])
# 看看词频高的有哪些,把无用信息去除
process_word = WordCloud.process_text(WordCloud(stopwords=stopwords).generate_from_text(text), text)
sort = sorted(process_word.items(), key=lambda e:e[1], reverse=True)
# print(sort[:1500])
with open('./data/word_freq.csv', 'a') as f:
    for datum in sort[:1500]:
        f.write(datum[0] + ',' + str(datum[1]) +'\n')
# with open('./data/keywords.csv', 'a') as f:
#     for datum in sort[:50]:
#         f.write(datum[0] + '\n')