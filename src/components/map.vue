<template>
    <div style="position: relative;">
        <div id="bdMap" :style="mapStyle"></div>
        <div :style="tips" v-show="show">
            <div class="tips-title">温馨提示</div>
            <div class="message">{{message}}</div>
            <div class="footer">
                <button type="button" class="btn" @click="close"><span>取消</span></button>
                <button type="button" class="btn btn-primary"><span>确定</span></button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .tips-title {
        height: 38px;
        line-height: 38px;
        font-size: 13px;
        border-bottom: 1px dashed #e9eaec;
    }

    .message {
        flex: 1;
        padding: 8px;
        font-size: 12px;
    }

    .footer {
        height: 38px;
        text-align: right;
        padding-right: 15px;
    }

    .btn {
        font-family: inherit;
        display: inline-block;
        margin-bottom: 0;
        font-weight: 400;
        text-align: center;
        vertical-align: middle;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        border: 1px solid transparent;
        white-space: nowrap;
        line-height: 1.5;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        padding: 5px 15px;
        font-size: 12px;
        border-radius: 4px;
        transition: color .2s linear, background-color .2s linear, border .2s linear;
        color: #495060;
        background-color: #f7f7f7;
        border-color: #dddee1;
    }

    .btn-primary {
        color: #fff;
        background-color: #2d8cf0;
        border-color: #2d8cf0;
    }
</style>

<script>
    import BMap from 'BMap';
    export default{
        data: function () {
            return {
                mapStyle: {
                    width: '100%',
                    height: this.mapHeight + 'px'
                },
                tips: {
                    position: 'absolute',
                    margin: 'auto',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    width: '300px',
                    height: '145px',
                    background: '#FFFFFF',
                    border: '1px solid #e9eaec',
                    borderRadius: '4px',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center'
                },
                message: '',
                show: false,
                map: {}
            }
        },
        props: {
            // 地图在该视图上的高度
            mapHeight: {
                type: Number,
                default: 500
            },
            // 经度
            longitude: {
                type: Number,
                default: 116.404
            },
            // 纬度
            latitude: {
                type: Number,
                default: 39.915
            },
            description: {
                type: String,
                default: '天安门'
            },
            enl: {
            	type: Number,
                default: 1
            },
            is_click: {
            	type: Number,
                default: 1
            }
        },
        mounted() {
            this.ready();
        },
        methods: {
            ready() {
                let map = new BMap.Map('bdMap');
                this.map = map;
                //默认重庆坐标
                //map.centerAndZoom("渝中区", 12);
                map.centerAndZoom(new BMap.Point(106.559693, 29.561139),12);
                //设置地图默认的鼠标指针样式
                map.setDefaultCursor("url('bird.cur')");
                //启用滚轮放大缩小，默认禁用
                map.enableScrollWheelZoom(true);
                //启用地图惯性拖拽，默认禁用
                map.enableContinuousZoom(true);

                /** 地图导航 **/
                // 添加带有定位的导航控件
                var navigationControl = new BMap.NavigationControl({
                    // 靠左上角位置
                    anchor: BMAP_ANCHOR_TOP_LEFT,
                    // LARGE类型
                    type: BMAP_NAVIGATION_CONTROL_LARGE,
                    // 启用显示定位
                    enableGeolocation: true
                });
                map.addControl(navigationControl);
                /** 地图导航 **/

                /** 全景地图 **/
                //覆盖区域图层
                map.addTileLayer(new BMap.PanoramaCoverageLayer());
                var stCtrl = new BMap.PanoramaControl(); //构造全景控件
                stCtrl.setOffset(new BMap.Size(20, 20));
                map.addControl(stCtrl);//添加全景控件
                /** 全景地图 **/

                /** 鼠标拖拽 **/
                if(this.enl) {
                    var myDrag = new BMapLib.RectangleZoom(map, {
                        followText: "拖拽鼠标进行操作"
                    });
                   // myDrag.open();  //开启拉框放大
                }
                /** 鼠标拖拽 **/

                /** 是否开启坐标识取 **/
                if(this.is_click) {
                    map.addEventListener("click", this.coordinates);
                }
            },
            coordinates(e) {
                this.show = true
                this.message = "您拾取了坐标：" + e.point.lng + ", " + e.point.lat;
            },
            close() {
                this.show = false
            }
        }
    }
</script>
