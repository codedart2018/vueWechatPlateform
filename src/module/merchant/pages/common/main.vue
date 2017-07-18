<style src="../../assets/style/common/manage.less" lang="less" scoped></style>
<style src="../../assets/style/common/iconfont.css" lang="less" scoped></style>
<template>
    <div>
        <!--第一屏 欢迎光临-->
        <div class="welcome">
            <div class="sub-box">
                <div class="avatar">
                    <img src="https://avatars.githubusercontent.com/u/12706830?v=3" alt="头像">
                </div>
                <div class="info">
                    <div style="font-size: 16px; font-weight: bold;"><span>你好，{{data.name}} 欢迎你回来！</span>
                    </div>
                    <div style="font-size: 16px; font-weight: bold; color: #e74b3c;">
                        myxingke@126.com
                    </div>
                    <div>
                        已绑定手机：150****2861
                    </div>
                </div>
                <div class="auth">
                    <div>商户认证：已认证</div>
                    <div>商户等级：普通商户</div>
                    <!--<div>商户等级：增加商户</div>-->
                    <!--<div>商户等级：超级商户</div>-->
                    <!--<div>商户等级：无限商户</div>-->
                    <div>商户有期期：2019-10-20</div>
                    <div>您可通过安全设置提高</div>
                </div>

            </div>
        </div>
        <!--第三屏 财务信息-->
        <div class="finance">
            <div class="left-box">
                <div class="title">
                    财务信息
                </div>
                <div style="flex: 1;">
                    <div class="pre">
                        帐户余额：
                    </div>
                    <div class="row">
                        <div class="money">
                            {{data.balance}} 元
                        </div>
                        <div class="recharge">
                            <router-link to="/expense/account">帐户充值</router-link>
                        </div>
                        <div class="list">
                            <div class="right-line">
                                <router-link to="/expense/bills">财务明细</router-link>
                            </div>
                            <div class="right-line">
                                索取发票
                            </div>
                            <div>
                                收款提现
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="margin-left: 15px; border: 1px solid #dedede; border-radius: 3px; flex: 1; display: flex; justify-content: space-around; padding: 10px; flex-direction: row">
                <div style="border-right: 1px dotted #dedede; display: flex; flex-direction: column; align-items: center; width: 50%">
                    <i class="iconfont icon-jifen" style="font-size: 60px; color: #f15a4a;"></i>
                    <div style="font-size: 14px; font-weight: 600; padding-top: 5px;">消费：<span style="color: #ED3C4C;">{{data.consume}}</span> 元</div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; width: 50%">
                    <i class="iconfont icon-jifen1" style="font-size: 60px; color: #ea9518;"></i>
                    <div style="font-size: 14px; font-weight: 600; padding-top: 5px;">积分：<span style="color: #ED3C4C;">{{data.integral}}</span> 个</div>
                </div>
            </div>
        </div>

        <!--快捷图标-->
        <!--<div class="express">-->
            <!--<div class="icon">-->
                <!--<router-link to="/public/list" style="color: #657180;">-->
                    <!--<div class="hover">-->
                        <!--<i class="iconfont icon-gongzhonghao" style="font-size: 60px;"></i>-->
                        <!--<h3>公众号</h3>-->
                    <!--</div>-->
                <!--</router-link>-->
            <!--</div>-->
            <!--<div class="icon">-->
                <!--<div class="hover">-->
                    <!--<i class="iconfont icon-jiaocheng"></i>-->
                    <!--<h3>运营教程</h3>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="icon">-->
                <!--<div class="hover">-->
                    <!--<i class="iconfont icon-gongdan"></i>-->
                    <!--<h3>工单管理</h3>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="icon">-->
                <!--<div class="hover">-->
                    <!--<i class="iconfont icon-caiwu"></i>-->
                    <!--<h3>财务中心</h3>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="icon">-->
                <!--<div class="hover">-->
                    <!--<i class="iconfont icon-shezhi"></i>-->
                    <!--<h3>商户设置</h3>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="icon">-->
                <!--<div class="hover">-->
                    <!--<i class="iconfont icon-icon"></i>-->
                    <!--<h3>操作日志</h3>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="icon">-->
                <!--<div class="hover">-->
                    <!--<i class="iconfont icon-gonggao"></i>-->
                    <!--<h3>公告</h3>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="icon">-->
                <!--<div class="hover">-->
                    <!--<i class="iconfont icon-gerenzhongxin"></i>-->
                    <!--<h3>个人中心</h3>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->

        <!--文章-->
        <div class="panel">

            <div style="flex: 1;">
                <div class="notice">
                    <Alert show-icon>
                        <template slot="desc">
                            <div class="scroll-wrap">
                                <ul class="scroll-content" :style="{ top }">
                                    <li v-for="item in prizeList">{{item.name}}</li >
                                </ul>
                            </div>

                        </template>
                    </Alert>
                </div>

                <div class="public" style=" width: 100%; min-height: 200px; margin-top: 15px;">
                    <Table :columns="columns7" :data="data6"></Table>
                    <div style="border-left: 1px solid #dedede; border-right: 1px solid #dedede; border-bottom: 1px solid #dedede; min-height: 100px;">
                        <p style="height: 40px; line-height: 40px; padding-left: 50px; font-size: 14px;">你的帐号属于 <span style="color: orangered;">【普通商户组】</span>，
                            最多只能添加<span style="color: orangered;">【1】</span>个微信公众号。
                        </p>
                        <p class="text-align-right" style="padding-right: 30px;margin-top: 10px;">
                            <Button type="info">帐号升级</Button>
                            &nbsp;&nbsp;
                            <router-link to="/public/bind">
                                <Button type="success">授权绑定</Button>
                            </router-link>
                            &nbsp;&nbsp;
                            <router-link to="/public/list">
                                <Button>管理列表</Button>
                            </router-link>
                        </p>
                    </div>
                </div>
            </div>

            <div class="box-right">
                <div class="article">
                    <div class="heading">
                        <span class="title">平台动态</span>
                        <span class="more">更多</span>
                    </div>
                    <div class="list-body">
                        <ul>
                            <li><a><span class="date">[2017-07-12]</span>线下吸粉利器微信连WIFI功能全新上线拉></a></li>
                            <li><a><span class="date">[2017-07-04]</span>幸运答题功能增加答题积分自动加入会员积分中分自动加入会员积分中</a></li>
                            <li><a><span class="date">[2017-06-28]</span>超级投票升级为V6.0版本新增投票滑动验证</a></li>
                            <li><a><span class="date">[2017-05-31]</span>会员卡功能正式升为了V8.0版本</a></li>
                            <li><a><span class="date">[2016-07-12]</span>平台代收【平台支付提现规则、费率标准】说明</a></li>
                            <li><a><span class="date">[2016-03-01]</span>微信外部链接内容管理规范（务必阅读遵守）</a></li>
                            <li><a><span class="date">[2014-07-01]</span>给需要官方咨询通道用户的公开信</a></li>
                            <li><a><span class="date">[2014-07-01]</span>给需要官方咨询通道用户的公开信</a></li>
                            <li><a><span class="date">[2014-07-01]</span>给需要官方咨询通道用户的公开信</a></li>
                            <li><a><span class="date">[2017-07-01]</span>给需要官方咨询通道用户的公开信</a></li>
                        </ul>
                    </div>
                </div>

                <div class="article" style="margin-bottom: 0">
                    <div class="heading">
                        <span class="title">常见问题</span>
                        <span class="more">更多</span>
                    </div>
                    <div class="list-body">
                        <ul>
                            <li><a><span class="date">[2017-07-12]</span>线下吸粉利器微信连WIFI功能全新上线拉></a></li>
                            <li><a><span class="date">[2017-07-04]</span>幸运答题功能增加答题积分自动加入会员积分中分自动加入会员积分中</a></li>
                            <li><a><span class="date">[2017-06-28]</span>超级投票升级为V6.0版本新增投票滑动验证</a></li>
                            <li><a><span class="date">[2017-05-31]</span>会员卡功能正式升为了V8.0版本</a></li>
                            <li><a><span class="date">[2016-07-12]</span>平台代收【平台支付提现规则、费率标准】说明</a></li>
                            <li><a><span class="date">[2016-03-01]</span>微信外部链接内容管理规范（务必阅读遵守）</a></li>
                            <li><a><span class="date">[2014-07-01]</span>给需要官方咨询通道用户的公开信</a></li>
                            <li><a><span class="date">[2014-07-01]</span>给需要官方咨询通道用户的公开信</a></li>
                            <li><a><span class="date">[2014-07-01]</span>给需要官方咨询通道用户的公开信</a></li>
                            <li><a><span class="date">[2017-07-01]</span>给需要官方咨询通道用户的公开信</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
            	data: {},
                columns7: [
                    {
                        title: ' ',
                        width: 50,
                        align: 'center',
                        render: (h, params) => {
                            return h('img', {
                                // 正常的 HTML 特性
                                attrs: {
                                    src: 'https://avatars.githubusercontent.com/u/12706830?v=3',
                                    title: 'hello'
                                },
                                style: {
                                    marginTop: "5px",
                                    width: "38px",
                                    height: "38px",
                                    borderRadius: "50%"
                                },
                            })
                        }
                    },
                    {
                        title: '公众号名称',
                        key: 'age'
                    },
                    {
                        title: '粉丝数量',
                        width: 130,
                        key: 'number'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 130,
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
                                            this.show(params.index)
                                        }
                                    }
                                }, '管理'),
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '开放API')
                            ]);
                        }
                    }
                ],
                data6: [
                    {
                        name: '王小明',
                        age: 18,
                        number: '50000'
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        number: '20330'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        number: '13230223'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        number: '32300'
                    }
                ],
                prizeList: [
                    { name: 0 },
                    { name: 1 },
                    { name: 2 },
                    { name: 3 },
                    { name: 4 }
                ],
                activeIndex: 0
            }
        },
        computed: {
            top() {
                return - this.activeIndex * 40 + 'px';
            }
        },
        methods: {
            //获取公共信息
            getData() {
                this.request("MerchantCommonMain", {}, false).then((res) => {
                    if(res.status) {
                        this.data = res.data;
                    } else {
                        this.$Message.error(res.msg);
                    }
                }).catch((err) => {
                    this.$Message.error(err);
                })
            }
        },
        mounted() {
            //获取服务数据
            this.getData();
            setInterval(() => {
                if(this.activeIndex < this.prizeList.length) {
                    this.activeIndex += 1;
                } else {
                    this.activeIndex = 0;
                }
            }, 1000);
        }
    }
</script>
