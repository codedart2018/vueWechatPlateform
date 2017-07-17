<!--百度编辑器组件-->
<template>
    <div>
        <script :id="randomNumber" v-html="content" type="text/plain"></script>
    </div>
</template>

<script>
    //主体文件引入
    import '../../static/ueditor/ueditor.config.js';
    import '../../static/ueditor/ueditor.all.js';
    import '../../static/ueditor/lang/zh-cn/zh-cn.js';
    //主体文件引入

    export default{
        props: {
            //配置可以传递进来
            config: {
                type: Object,
                default:() => {}
            },
            content: {
                type: String,
                default: ''
            }
        },
        data(){
            return{
                //每个编辑器生成不同的id,以防止冲突
                randomNumber: 'editor_' + Math.random().toString(6).substring(2),
                //实例
                instance: null,
            }
        },
        //挂载实例
        mounted () {
            this.initEditor();
        },
        methods: {
            initEditor () {
                //把dom元素挂载上去
                this.$nextTick(() => {
                    this.instance = UE.getEditor(this.randomNumber, this.config);
                    // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
                    this.instance.addListener('ready', () => {
                        this.$emit('ready', this.instance);
                    })
                })
            },
            //追加内容
            setContent(text) {
                this.instance.setContent(text, true);
            },
            //清空文本
            setEmptyContent() {
                this.instance.setContent('');
            },
            //插入HTML内容
            insertHtml(content) {
                this.instance.execCommand('insertHtml', content);
            }
        },
        beforeDestroy () {
            // 组件销毁的时候，要销毁 UEditor 实例
            if (this.instance !== null && this.instance.destroy) {
                this.instance.destroy();
            }
        },
        components:{

        }
    }
</script>
