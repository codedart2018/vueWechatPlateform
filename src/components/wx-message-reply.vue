<!--纯文本消息回复公共组件-->
<template>
    <div>
        <p>
            <Input :id="randomNumber" v-model="replyContent" type="textarea" :rows="4" placeholder="请输入回复内容,最多600个字符..."
                   @on-change="keyUp($event)"></Input>
        </p>
        <!--<div id="Text" class="test_box" contenteditable="true" v-html="replyContent" @click="saveRange"></div>-->
        <p>
        <ul class="emotions">
            <li class="emotions_item" v-for="(item, index) in emoji">
                <span class="icon_emotion_sprite" @click="changeEmoji(index, item)"
                      v-bind:style="{ backgroundPositionX: 0, backgroundPositionY: setPositionY(index) + 'px' }"></span>
            </li>
        </ul>
        </p>
        <p style="padding-top: 10px; text-align: right">还可以输入{{wordsNumber}}字, 按下Enter(回车键换行)键发送</p>
    </div>
</template>
<style>
    .emotions {
        width: 481px;
        margin-top: 10px;
        overflow: hidden;
        border-top: 1px solid #dddee1;
        border-right: 1px solid #dddee1;
        background-color: #e7e7eb;
    }

    .emotions_item {
        float: left;
        width: 24px;
        height: 24px;
        line-height: 24px;
        font-size: 0;
        text-align: center;
        border-bottom: 1px solid #dddee1;
        border-left: 1px solid #dddee1;
        background-color: #fff;
    }

    .icon_emotion_sprite {
        cursor: pointer;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        display: inline-block;
        background: transparent url(../assets/images/emotions.png) no-repeat 0 0;
        -webkit-background-size: 20px auto;
        background-size: 20px auto;
    }

    /** 暂停使用
    .test_box {
        margin-top: 1px;
        width: 488px;
        height: auto !important;
        _height: 120px;
        min-height: 120px;
        line-height: 24px;
        border: 1px solid #dddee1;
        border-radius: 3px;
        padding: 0 10px;
        outline: 0;
        font-size: 14px;
        word-wrap: break-word;
        overflow-x: hidden;
        overflow-y: auto;
        color: #495060;
        font-family: 微软雅黑;
    }

    .test_box:hover {
        border: 1px solid #bbbddd;
    }

    .test_box img {
        vertical-align: middle;
    }

    .icon_emotion_single {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        display: inline-block;
        -webkit-background-size: 20px auto;
        background-size: 20px auto;
    }
    **/
</style>
<script>
    export default{
        data(){
            return {
                //每个编辑器生成不同的id,以防止冲突
                randomNumber: 'reply' + Math.random().toString(6).substring(2),
                //表情数组
                emoji: ["[微笑]", "[撇嘴]", "[色]", "[发呆]", "[得意]", "[流泪]", "[害羞]", "[闭嘴]", "[睡]", "[大哭]", "[尴尬]", "[发怒]", "[调皮]", "[呲牙]", "[惊讶]", "[难过]", "[冷汗]", "[抓狂]", "[吐]", "[偷笑]", "[愉快]", "[白眼]", "[傲慢]", "[困]", "[惊恐]", "[流汗]", "[憨笑]", "[悠闲]", "[奋斗]", "[咒骂]", "[疑问]", "[嘘]", "[晕]", "[衰]", "[骷髅]", "[敲打]", "[再见]", "[擦汗]", "[抠鼻]", "[鼓掌]", "[坏笑]", "[左哼哼]", "[右哼哼]", "[哈欠]", "[鄙视]", "[委屈]", "[快哭了]", "[阴险]", "[亲亲]", "[可怜]", "[菜刀]", "[西瓜]", "[啤酒]", "[咖啡]", "[猪头]", "[玫瑰]", "[凋谢]", "[嘴唇]", "[爱心]", "[心碎]", "[蛋糕]", "[炸弹]", "[便便]", "[月亮]", "[太阳]", "[拥抱]", "[强]", "[弱]", "[握手]", "[胜利]", "[抱拳]", "[勾引]", "[拳头]", "[OK]", "[跳跳]", "[发抖]", "[怄火]", "[转圈]", "😄", "😷", "😂", "😝", "😳", "😱", "😔", "😒", "[嘿哈]", "[捂脸]", "[奸笑]", "[机智]", "[皱眉]", "[耶]", "👻", "🙏", "💪", "🎉", "[礼物]", "[红包]", "[鸡]"],
                //最大字数
                wordsNumber: 600,
                //内容
                replyContent: '',
            }
        },
        //挂载实例
        mounted () {
        },
        methods: {
            //属性计算方法
            setPositionY(index) {
                if (index == 0) {
                    return 0
                } else {
                    return -(index * 20)
                }
            },
            //点击获得选中的值
            changeEmoji(index, item) {
                //<img src="../../../../assets/images/emotions/smiley_1.png" class="icon_emotion_single icon_smiley_0" alt="mo-[微笑]">
                if (this.wordsNumber <= 0) return false
                var dom = document.getElementById(this.randomNumber).querySelector('textarea')
                var valueLen = dom.value.length
                if (typeof document.selection != "undefined") {
                    document.selection.createRange().text = item
                }
                else {
                    this.replyContent = dom.value.substr(0, dom.selectionStart) + item + dom.value.substring(dom.selectionStart, valueLen)
                }
                this.countWordsNumber()
                dom.focus()
            },
            //统计字数
            countWordsNumber() {
                //再获取一次长度
                let len = this.replyContent.length
                let value = this.replyContent
                let maxLen = 600
                let initLen = 0
                for (var i = 0; (i < len) && (initLen <= maxLen * 2); i++) {
                    if (value.charCodeAt(i) > 0 && value.charCodeAt(i) < 128)
                        initLen++
                    else
                        initLen += 1
                }
                this.wordsNumber = maxLen - initLen
            },
            //键盘事件 没有使用
            keyUp(e) {
                this.countWordsNumber()
                if (this.wordsNumber <= 0) {
                }
            },
            //获得光标位置 没有使用
            saveRange() {
                document.getElementById(this.randomNumber).focus()//获取焦点
                const selection = window.getSelection ? window.getSelection() : document.selection
                if (!selection.rangeCount) return
                const range = selection.createRange ? selection.createRange() : selection.getRangeAt(0)
                window._range = range
                this.cursorPosition = range.startOffset
            }
        },
        components: {}
    }
</script>
