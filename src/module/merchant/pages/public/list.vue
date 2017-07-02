<template>
    <div>
        <Table border :columns="columns" :data="data"></Table>
    </div>
</template>
<script>

    export default {
        data () {
            return {
                that: this,
                columns: [
                    {
                        title: '平台号',
                        width: 100,
                        key: 'id',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', '  ' + params.row.id)
                            ]);
                        }
                    },
                    {
                        title: '公众号名称',
                        key: 'public_name'
                    },
                    {
                        title: '粉丝数量',
                        key: 'id'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 120,
                        align: 'center',
                        render: (h, params) => {
                            const row = params.row;
                            const color = row.status == 1 ? 'green' : row.status == 0 ? 'yellow' : 'red'
                            const text = row.status == 1 ? '正常' : row.status == 0 ? '锁定' : '删除'
                            return h('Tag', {
                                props: {
                                    type: 'dot',
                                    color: color
                                }
                            }, text)
                        }
                    },
                    {
                        title: '添加时间',
                        key: 'create_time',
                        width: 135,
                        align: 'center',
                        render: (h, params) => {
                            return h('div',this.$formatDate(params.row.create_time, 'yyyy-MM-dd h:m'));
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
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
                                            this.show(params.index, params.row.id)
                                        }
                                    }
                                }, '管理'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                        	//todo 切换过去的时候先保存一份public_signal号在vuex数据里面后面的操作全在里面
                                            this.$router.push({ path: '/wechat/' + params.row.id })
                                        }
                                    }
                                }, '接口')
                            ]);
                        }
                    }
                ],
                data: []
            }
        },
        methods: {
            //获得数据
            getData() {
                this.request("MerchantPublicList", {mch_id: 1}, true).then((res) => {
                    if(res.status) {
                    	this.data = res.data
                    } else {
                        this.$Message.error(res.msg)
                    }
                })
            },
            show (index, id) {
                this.$Modal.confirm({
                    title: '温馨提示',
                    content: `您确定要切换到：《${this.data[index].public_name}》平台吗?`,
                    onOk: () => {
                        this.request("MerchantPublicSwitch", {id: id}, true).then((res) => {
                            if(res.status) {
                                //todo 切换过去的时候先保存一份public_signal号在vuex数据里面后面的操作全在里面
                                window.localStorage.setItem('platformNumber', id)
                                this.$Message.success("切换成功...")
                                this.$router.push({ path: '/wechat/main' })
                            } else {
                                this.$Message.error(res.msg)
                            }
                        })
                    },
                    onCancel: () => {
                        this.$Message.info('您取消了切换');
                    }
                })
            },
        },
        mounted() {
            //服务端获取数据
            this.getData();
        }
    }
</script>
