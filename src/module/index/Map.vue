<template>
    <div>
        <div>
            <bd-map></bd-map>
        </div>
    </div>
</template>
<style>

</style>

<script>
    import BdMap from '../../components/map.vue'
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
            'bd-map': BdMap,
        }
    }
</script>
