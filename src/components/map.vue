<template>
    <div>
        <div id="allmap" v-bind:style="mapStyle"></div>
    </div>
</template>
<style>

</style>

<script>
    import BMap from 'BMap';
    export default{
        data:function(){
            return{
                mapStyle:{
                    width:'100%',
                    height:this.mapHeight +'px'
                }
            }
        },
        props:{
            // 地图在该视图上的高度
            mapHeight:{
                type:Number,
                default:500
            },
            // 经度
            longitude:{
                type:Number,
                default:116.404
            },
            // 纬度
            latitude:{
                type:Number,
                default:39.915
            },
            description:{
                type:String,
                default:'天安门'
            }
        },
        mounted() {
            this.ready();
        },
        methods: {
            ready: function() {
                var map = new BMap.Map('allmap');
                var point = new BMap.Point(104.075796, 30.659684);
                map.centerAndZoom(new BMap.Point(104.047404, 30.696035), 14);
                map.addControl(new BMap.MapTypeControl());
                map.setCurrentCity('小龙坎火锅');
                map.enableScrollWheelZoom(true);
                map.enableDoubleClickZoom(true);
                var marker = new BMap.Marker(point);
                map.addOverlay(marker);

                map.addEventListener("click", function(){
                    alert("您点击了地图。");
                });
            }
        }
    }
</script>
