<template>
    <div>
        <Row>
            <Form :model="formSearch" :label-width="80" inline label-position="right">
                <Form-item label="消息内容：">
                    <Input v-model="formSearch.keywords" placeholder="请输入消息内容"></Input>
                </Form-item>
                <Form-item label="发送日期：">
                    <Date-picker type="date" placeholder="选择日期" v-model="formSearch.date"></Date-picker>
                </Form-item>
                <Form-item label="是否回复：">
                    <Select v-model="formSearch.display" placeholder="请选择">
                        <Option value="">请选择</Option>
                        <Option value="1">显示</Option>
                        <Option value="0">隐藏</Option>
                    </Select>
                </Form-item>
                <Form-item :label-width="1">
                    <Button type="primary" @click="search('formSearch')" icon="ios-search">搜索</Button>
                </Form-item>
            </Form>
        </Row>
        <Row class="mb-15 table-no-padding-left">
            <Table :columns="columns" :data="list"></Table>
        </Row>
        <Row type="flex" justify="end">
            <Page :total="total" :page-size="pageSize" :current="pageNumber" show-total show-elevator
                  @on-change="changePage"></Page>
        </Row>

        <!--发送消息modal对话框 -->
        <Modal
            title="发送消息"
            v-model="replyModal"
            class-name="vertical-center-modal">
            <p>
                <Input id="Text" v-model="replyContent" type="textarea" :rows="4" placeholder="请输入回复内容,最多600个字符..."
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
            <div slot="footer">
                <Button type="primary" @click="reply">发送</Button>
            </div>
        </Modal>
    </div>
</template>

<style scoped>
    .search .ivu-form-item {
        margin-bottom: 0px;
        vertical-align: top;
        zoom: 1;
    }

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
        background: transparent url(../../../../assets/images/emotions.png) no-repeat 0 0;
        -webkit-background-size: 20px auto;
        background-size: 20px auto;
    }

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
</style>

<script>
    export default{
        data(){
            return {
                columns: [
                    {
                        type: 'selection',
                        width: 58,
                    },
                    {
                        title: ' ',
                        width: 50,
                        align: 'center',
                        render: (h, params) => {
                            return h('img', {
                                // 正常的 HTML 特性
                                attrs: {
                                    src: params.row.headimgurl + '64',
                                    title: params.row.nickname
                                },
                                style: {
                                    marginTop: "5px",
                                    width: "38px",
                                    height: "38px"
                                },
                            })
                        }
                    },
                    {
                        title: '呢称',
                        key: 'nickname',
                        width: 120,
                        align: 'left'
                    },
                    {
                        title: '消息内容',
                        align: 'left',
                        render: (h, params) => {
                            return h('div', {
                                // DOM 属性
                                domProps: {
                                    innerHTML: params.row.content
                                },
                                style: {
                                    padding: '8px'
                                },
                            })
                        }
                    },
                    {
                        title: '发送时间',
                        key: 'create_time',
                        width: 135,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', this.$formatDate(params.row.create_time, 'yyyy-MM-dd h:m'))
                        }
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        width: 170,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.replyModal = true
                                            this.replyData['id'] = params.row.id
                                            this.replyData['openid'] = params.row.from_user_name
                                        }
                                    }
                                }, '回复'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.index)
                                        }
                                    }
                                }, '详情'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.del(params.index, params.row.id)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                //列表数据
                list: [],
                //总共数据多少条
                total: 0,
                //每页多少条数据
                pageSize: 1,
                //当前页码
                pageNumber: 1,
                //搜索表单
                formSearch: {},
                //回复消息modal
                replyModal: false,
                //回复被选中数据信息
                replyData: [],
                //回复内容
                replyContent: '',
                emoji: ["[微笑]", "[撇嘴]", "[色]", "[发呆]", "[得意]", "[流泪]", "[害羞]", "[闭嘴]", "[睡]", "[大哭]", "[尴尬]", "[发怒]", "[调皮]", "[呲牙]", "[惊讶]", "[难过]", "[冷汗]", "[抓狂]", "[吐]", "[偷笑]", "[愉快]", "[白眼]", "[傲慢]", "[困]", "[惊恐]", "[流汗]", "[憨笑]", "[悠闲]", "[奋斗]", "[咒骂]", "[疑问]", "[嘘]", "[晕]", "[衰]", "[骷髅]", "[敲打]", "[再见]", "[擦汗]", "[抠鼻]", "[鼓掌]", "[坏笑]", "[左哼哼]", "[右哼哼]", "[哈欠]", "[鄙视]", "[委屈]", "[快哭了]", "[阴险]", "[亲亲]", "[可怜]", "[菜刀]", "[西瓜]", "[啤酒]", "[咖啡]", "[猪头]", "[玫瑰]", "[凋谢]", "[嘴唇]", "[爱心]", "[心碎]", "[蛋糕]", "[炸弹]", "[便便]", "[月亮]", "[太阳]", "[拥抱]", "[强]", "[弱]", "[握手]", "[胜利]", "[抱拳]", "[勾引]", "[拳头]", "[OK]", "[跳跳]", "[发抖]", "[怄火]", "[转圈]", "😄", "😷", "😂", "😝", "😳", "😱", "😔", "😒", "[嘿哈]", "[捂脸]", "[奸笑]", "[机智]", "[皱眉]", "[耶]", "👻", "🙏", "💪", "🎉", "[礼物]", "[红包]", "[鸡]"],
                wordsNumber: 600,
            }
        },
        methods: {
            //获取数据
            getData (params) {
                if (!params) params = {page: 1, mch_id: 1, platform_id: 800000}
                this.request('MerchantWxMessage', params, true).then((res) => {
                    if (res.status) {
                        //列表数据
                        this.list = res.data.list
                        //总页数
                        this.total = res.data.count
                        //每页多少条数据
                        this.pageSize = res.data.size
                    } else {
                        //列表数据
                        this.list = []
                        //总页数
                        this.total = 0
                        //每页多少条数据
                        this.pageSize = 0
                    }
                })
            },
            //分页切换页码
            changePage (page) {
                this.pageNumber = page
                let search = this.formSearch
                let query = Object.assign({page: page}, search)
                //分页
                this.$router.push({name: this.$router.currentRoute.name, query: {page: page}})
                //获取最新数据
                this.getData({page: page, params: search})
            },
            //消息回复
            reply() {
                if (!this.replyData.id || !this.replyData.openid) {
                    this.$Message.error('请选择一个粉丝回复消息!')
                    return
                }
                if (!this.replyContent || this.wordsNumber < 0) {
                    this.$Message.error('请填写600字以内的消息内容!')
                    return
                }
                this.request('MerchantWxSendMessage', {
                    type: 'text',
                    openid: this.replyData.openid,
                    id: this.replyData.id,
                    content: this.replyContent
                }, '发送中...').then((res) => {
                    if (res.status) {
                        this.replyModal = false
                        this.replyContent = ''
                        this.$Message.success(res.msg)
                    } else {
                        this.$Message.error(res.msg)
                    }
                })
            },
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
                var dom = document.getElementById("Text").querySelector('textarea');
                var valueLen = dom.value.length;
                if (typeof document.selection != "undefined") {
                    document.selection.createRange().text = item;
                }
                else {
                    this.replyContent = dom.value.substr(0, dom.selectionStart) + item + dom.value.substring(dom.selectionStart, valueLen);
                }
                this.countWordsNumber()
                dom.focus();
            },
            //统计字数
            countWordsNumber() {
                //再获取一次长度
                var len = this.replyContent.length
                var value = this.replyContent
                var maxLen = 600;
                var initLen = 0;
                for (var i = 0; (i < len) && (initLen <= maxLen * 2); i++) {
                    if (value.charCodeAt(i) > 0 && value.charCodeAt(i) < 128)
                        initLen++;
                    else
                        initLen += 1;
                }
                this.wordsNumber = maxLen - initLen
            },
            //键盘事件
            keyUp(e) {
                this.countWordsNumber()
                if (this.wordsNumber <= 0) {
                }
            },
            //获得光标位置
            saveRange() {
                document.getElementById('Text').focus();//获取焦点
                var selection = window.getSelection ? window.getSelection() : document.selection;
                if (!selection.rangeCount) return;
                var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
                window._range = range;
                this.cursorPosition = range.startOffset
            }
        },
        components: {},
        mounted() {
            //服务端获取数据
            this.getData()
        }
    }
</script>

