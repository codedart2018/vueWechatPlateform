<template>
    <div>
        <wx-ediotr></wx-ediotr>
    </div>
</template>

<script>
    import WxEditor from '@/components/wx-editor.vue'

    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
            'wx-ediotr': WxEditor
        }
    }
</script>
