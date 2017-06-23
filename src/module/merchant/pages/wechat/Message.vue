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
            <wx-reply-message ref="reply"></wx-reply-message>
            <div slot="footer">
                <Button type="primary" @click="reply">发送</Button>
            </div>
        </Modal>
    </div>
</template>

<script>

    import WxReplyMessage from '@/components/wx-message-reply.vue'

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
                                            this.view(params.row.id)
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
                //获取回复组件内容
                const content = this.$refs.reply.replyContent
                if (!this.replyData.id || !this.replyData.openid) {
                    this.$Message.error('请选择一个粉丝回复消息!')
                    return
                }
                if (!content || this.$refs.reply.wordsNumber < 0) {
                    this.$Message.error('请填写600字以内的消息内容!')
                    return
                }
                this.request('MerchantWxSendMessage', {
                    type: 'text',
                    openid: this.replyData.openid,
                    id: this.replyData.id,
                    content: content
                }, '发送中...').then((res) => {
                    if (res.status) {
                        this.replyModal = false
                        this.$refs.reply.replyContent = ''
                        this.$Message.success(res.msg)
                        // notice 是否要从后台重新接取数据 后台记得处理emoji
                    } else {
                        this.$Message.error(res.msg)
                    }
                })
            },
            //详情路由跳转
            view(id) {
            	//这儿到时候直接传用户的身份ID 后台不用再进行一次查找用户身份信息
                this.$router.push({ path: '/wechat/message_view/' + id, params: { id: id }})
            },
        },
        components: {
            'wx-reply-message': WxReplyMessage
        },
        mounted() {
            //服务端获取数据
            this.getData()
        }
    }
</script>

