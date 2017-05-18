<style src="../../assets/style/common/main.less" lang="less" scoped></style>

<template>
    <div>
        <Row type="flex">
            <Col span="24">

                <Row :gutter="17">
                    <Col span="17">
                        <div class="info-title">
                            <div class="pull-left">
                                <h4><strong>Administrator，</strong></h4>
                                <p>欢迎登录管理系统！</p>
                            </div>

                            <div class="pull-right" style="margin-left: 30px;">
                                <div>登陆时间：2017-04-09 15:23:22</div>
                                <div>登陆IP：127.0.0.1</div>
                                <div>浏览器：chorme</div>
                            </div>

                            <div class="pull-right" style="margin-left: 30px;">
                                <div>用户组：商家组</div>
                                <div>有效期至：2019-10-11</div>
                            </div>
                        </div>

                        <div style="background-color: #fff; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15); border: 1px solid #e3e8ee; padding: 10px; margin-bottom: 15px;">
                            <div class="title" style="font-size: 18px; margin-bottom: 10px; height: 50px; line-height: 50px;">今日数据</div>

                            <Row type="flex" justify="space-between" class="code-row-bg">
                                <Col span="4" style="height: 120px; text-align: center; background: #F5F5F6; border: 1px solid #F5F5F6; width: 18.666667%; overflow:hidden;">
                                <span style="display: block; height: 60px; font-size: 40px; margin-top: 18px;"><i>+</i> 110</span>
                                <span style="display: block; font-size: 14px;">总粉丝数</span>
                                </Col>
                                <Col span="4" style="height: 120px; text-align: center; background: #F5F5F6; border: 1px solid #F5F5F6; width: 18.666667%; overflow:hidden;">
                                <span style="display: block; height: 60px; font-size: 40px; margin-top: 18px;"><i>+</i> 110</span>
                                <span style="display: block; font-size: 14px;">新增粉丝</span>
                                </Col>
                                <Col span="4" style="height: 120px; text-align: center; background: #F5F5F6; border: 1px solid #F5F5F6; width: 18.666667%; overflow:hidden;">
                                <span style="display: block; height: 60px; font-size: 40px; margin-top: 18px;"><i>+</i> 110</span>
                                <span style="display: block; font-size: 14px;">新增会员</span>
                                </Col>
                                <Col span="4" style="height: 120px; text-align: center; background: #F5F5F6; border: 1px solid #F5F5F6; width: 18.666667%; overflow:hidden;">
                                <span style="display: block; height: 60px; font-size: 40px; margin-top: 18px;"><i>+</i> 110</span>
                                <span style="display: block; font-size: 14px;">消息下发</span>
                                </Col>
                                <Col span="4" style="height: 120px; text-align: center; background: #F5F5F6; border: 1px solid #F5F5F6; width: 18.666667%; overflow:hidden;">
                                <span style="display: block; height: 60px; font-size: 40px; margin-top: 18px;"><i>+</i> 110</span>
                                <span style="display: block; font-size: 14px;">接收消息</span>
                                </Col>
                            </Row>
                        </div>

                    </Col>

                    <Col span="7">
                        <Card dis-hover>
                            <p slot="title">系统公告</p>
                            <p>卡片内容</p>
                            <p>卡片内容</p>
                            <p>卡片内容</p>
                            <p>
                                <router-link to="/test" style="color: #000;">测试路由</router-link>
                            </p>
                        </Card>
                    </Col>
                </Row>

            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                columns1: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居'
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道'
                    }
                ]
            }
        },
        mounted() {
            //console.log(this.$router.options.routes);
        }
    }
</script>
