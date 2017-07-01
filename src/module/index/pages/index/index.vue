<style src="../../assets/style/index/index.less" lang="less"></style>
<template>
    <div>
        <nav class="navigation-bar">
            <div class="container">
                <Row>
                    <Col span="5">代码兔微信公众号第三方管理平台</Col>
                    <Col span="19">
                        <div class="bar">
                            <div class="left">
                                <ul class="ul-bar">
                                    <li><a href="">功能介绍</a></li>
                                    <li class="dropdown">
                                        <Dropdown>
                                            <a href="javascript:void(0)">
                                                解决方案
                                                <Icon type="arrow-down-b"></Icon>
                                            </a>
                                            <Dropdown-menu slot="list">
                                                <Dropdown-item>驴打滚</Dropdown-item>
                                                <Dropdown-item>炸酱面</Dropdown-item>
                                                <Dropdown-item>豆汁儿</Dropdown-item>
                                                <Dropdown-item>冰糖葫芦</Dropdown-item>
                                                <Dropdown-item>北京烤鸭</Dropdown-item>
                                            </Dropdown-menu>
                                        </Dropdown>
                                    </li>
                                    <li><a href="">关于我们</a></li>
                                </ul>
                            </div>
                            <div class="right">
                                <div style="width: 120px;"></div>
                                <ul class="ul-bar">
                                    <li><a href="./manage.html">后台</a></li>
                                    <li><a href="./merchant.html">登陆</a></li>
                                    <li><a href="./merchant.html#/register">注册</a></li>
                                    <li><a href="#">关注我们<span></span></a></li>
                                    <li class="dropdown">
                                        <Dropdown>
                                            <a href="javascript:void(0)">
                                                帮助中心
                                                <Icon type="arrow-down-b"></Icon>
                                            </a>
                                            <Dropdown-menu slot="list">
                                                <Dropdown-item>驴打滚</Dropdown-item>
                                                <Dropdown-item>炸酱面</Dropdown-item>
                                                <Dropdown-item>豆汁儿</Dropdown-item>
                                                <Dropdown-item>冰糖葫芦</Dropdown-item>
                                                <Dropdown-item>北京烤鸭</Dropdown-item>
                                            </Dropdown-menu>
                                        </Dropdown>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </nav>
        <!--幻灯片-->
        <div>
            <Carousel autoplay v-model="value2">
                <Carousel-item>
                    <div class="carousel">1</div>
                </Carousel-item>
                <Carousel-item>
                    <div class="carousel">2</div>
                </Carousel-item>
                <Carousel-item>
                    <div class="carousel">3</div>
                </Carousel-item>
                <Carousel-item>
                    <div class="carousel">4</div>
                </Carousel-item>
            </Carousel>
        </div>
        <!--幻灯片结束-->
        <div class="center-bar">
            <ul class="container">
                <li class="f1"><i></i>宣传展示</li>
                <li class="f2"><i></i>营销互动</li>
                <li class="f3"><i></i>推广吸粉</li>
                <li class="f4"><i></i>电商交易</li>
                <li class="f5"><i></i>会员转化</li>
                <li class="f6"><i></i>智慧收银</li>
            </ul>
        </div>

        <div class="body-box">
            <div class="container">
                <div id="intro">
                    <div class="text-brief">
                        <h2>轻巧、智能的公众号服务系统</h2>
                        <div class="get-start">
                            <a class="apply-entry" href="./merchant.html#/register">立即注册</a>
                        </div>
                        <p>新用户享15天免费试用权</p>
                    </div>
                    <div class="product-brief fn-clear">
                        <div class="product-brief-item marketing-brief fn-left">
                            <em></em>
                            <h3 class="brief-title">
                                营销系统
                            </h3>
                            <p class="detail">
                                提供从展示、互动、活动、辅助、统计的完整营销系统。
                            </p>
                            <a href=""><i></i><span>了解详情</span></a>
                        </div>
                        <div class="product-brief-item pay-sulotion-brief fn-left">
                            <em></em>
                            <h3 class="brief-title">
                                支付解决方案
                            </h3>
                            <p class="detail">
                                基于微信支付，提供表单、商城，收款多种形式的支付解决方案。
                            </p>
                            <a href=""><i></i><span>了解详情</span></a>
                        </div>
                        <div class="product-brief-item wx-crm-brief fn-left">
                            <em></em>
                            <h3 class="brief-title">
                                微信CRM
                            </h3>
                            <p class="detail">
                                结合积分与会员卡，提高粘性，沉淀客户行为数据，做个性化营销。
                            </p>
                            <a href=""><i></i><span>了解详情</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--合作伙伴-->
        <div id="partner">
            <div class="partner-wrap">
                <h3>合作伙伴</h3>
                <ul class="fn-clear">
                    <li>
                        <a href="http://www.qcloud.com/event/cdn_wx_main.html" title="腾讯云" target="_blank">
                            <img src="">
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <!--页脚-->
        <div id="footer">
            <div class="footer-wrap">
                <div class="copyright">
                    <em class="logo"></em>
                    <div class="copyright-info">
                        <p>渝ICP备08102562号-6</p>
                        <p>© 2017 代码兔微信平台</p>
                    </div>
                </div>
                <div class="rest">
                    <div class="help">
                        <h3>帮助</h3>
                        <ul>
                            <li><a href="" target="_blank">帮助中心</a></li>
                            <li><a href="" target="_blank">服务价格</a></li>
                            <li><a href="" target="_blank">用户协议</a></li>
                        </ul>
                    </div>
                    <div class="hot-functions">
                        <h3>热门应用</h3>
                        <ul>
                            <li><a href="" target="_blank">微暗号</a></li>
                            <li><a href="" target="_blank">微表单</a></li>
                        </ul>
                    </div>
                    <div class="about">
                        <h3>关于</h3>
                        <ul>
                            <li><a href="" target="_blank">关于我们</a></li>
                            <li><a href="" target="_blank">联系我们</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<!--晨-->
<!--华灯未眠晨未曦-->
<!--细雨烟云两岸坪-->
<!--闻莹林间啼声脆-->
<!--遥望山尖闺梦人-->
<style scoped>


</style>

<script>
    export default{
        data(){
            return{
                msg:'hello vue',
                value2: 0
            }
        },
        components:{
        }
    }
</script>
