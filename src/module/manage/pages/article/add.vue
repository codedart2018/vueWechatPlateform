<template>
    <div>
        <Card dis-hover>
            <Row>
                <Col span="12">
                    <Form ref="formField" :model="formField" :rules="ruleValidate" :label-width="80">
                        <Form-item label="文章标题" prop="title" style="width: 400px;">
                            <Input v-model="formField.title" placeholder="请输入姓名"></Input>
                        </Form-item>
                        <Form-item label="文章分类" prop="cate_id" style="width: 400px;">
                            <Select v-model="formField.cate_id" placeholder="请选择">
                                <Option value="">请选择</Option>
                                <div v-for="item in cate" >
                                    <Option :value="item.id" :key="item.id" v-html="item._name" v-if="item.is_father == 1" disabled></Option>
                                    <Option :value="item.id" :key="item.id" v-html="item._name" v-else-if="item.is_father == 0"></Option>
                                </div>
                            </Select>
                        </Form-item>
                        <Form-item label="缩略图片" prop="thumbnail" style="width: 400px;">
                            <Upload action="//jsonplaceholder.typicode.com/posts/" success="uploadSuccess">
                                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                            </Upload>
                        </Form-item>
                        <Form-item label="外链地址" prop="rel_url" style="width: 400px;">
                            <Input v-model="formField.rel_url" placeholder="请输入姓名"></Input>
                        </Form-item>
                        <Form-item label="文章内容" prop="content">
                            <UEditor ref="editor" @ready="editorReady" v-model="formField.content" :config="config" style="line-height: normal"></UEditor>
                        </Form-item>
                        <Form-item label="文章排序" prop="sort" style="width: 400px;">
                            <Input v-model="formField.sort" placeholder="排序只能是数字"></Input>
                        </Form-item>
                        <Form-item label="文章状态" prop="status">
                            <Radio-group v-model="formField.status">
                                <Radio label="1">正常</Radio>
                                <Radio label="0">删除</Radio>
                            </Radio-group>
                        </Form-item>
                        <Form-item>
                            <Button type="primary" @click="handleSubmit('formField')">提交</Button>
                            <Button type="ghost" @click="handleReset('formField')" style="margin-left: 8px">重置</Button>
                            <Button type="ghost" @click="goBack" style="margin-left: 8px">返回</Button>
                        </Form-item>
                    </Form>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script>
    import UEditor from '@/components/editor';

    export default {
        data () {
            return {
                //编辑器配置
                config: {
                    initialFrameHeight: 450, // 高度
                    toolbars: [["undo","redo","bold","italic","forecolor","backcolor","paragraph","fontfamily","fontsize","autotypeset",'insertorderedlist',"lineheight","inserttable","removeformat",'insertvideo','link',"insertimage","justifyleft","justifycenter","justifyright",'justifyjustify', "indent",'source']],
                    zIndex: 0, // 编辑器层级
                    charset:"utf-8", //编码
                    saveInterval: 5000,
                    autoHeightEnabled: false,
                    enableAutoSave: false
                },
                //分类数据
                cate: [],
                //表单字段
                formField: {
                    title: '',
                    cate_id: '',
                    rel_url: '',
                    thumbnail: '',
                    status: "1",
                    content: ''
                },
                //验证规则
                ruleValidate: {
                    title: [
                        { required: true, message: '文章标题不能为空', trigger: 'blur' },
                        { type: 'string', min: 2, message: '文章名称不能少于2个字符', trigger: 'blur' },
                        { type: 'string', max: 50, message: '文章名称不能大于50个字符', trigger: 'blur' }
                    ],
                    rel_url: [
                        { type: 'url', message: '外链地址不正确', trigger: 'blur' }
                    ],
                    cate_id: [
                        { required: true, message: '请选择文章分类', trigger: 'change' }
                    ],
                    status: [
                        { required: true, message: '请选择状态', trigger: 'change' }
                    ],
                    content: [
                        { required: true, message: '请编写文章内容', trigger: 'change' }
                    ],
                    sort: [
                        { type: 'string', message: '排序只能数字', trigger: 'blur', pattern: /^[0-9]+$/}
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.request('AdminArticleAdd', this.formField).then((res) => {
                            if(res.status) {
                                this.$Message.success(res.msg);
                                this.$router.go(-1)
                            } else {
                                this.$Message.error(res.msg);
                            }
                        })
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            //获得分类数据
            getCate() {
                this.request('AdminCategoryList', {type: 1}, true).then((res) => {
                    if(res.status) {
                        this.cate = res.data;
                    }
                })
            },
            //初始化编辑器
            editorReady(instance) {
                instance.setContent('');
                instance.addListener('contentChange', () => {
                    this.formField.content = instance.getContent();
                });
            },
            //后退海阔天空
            goBack() {
                this.$router.go(-1);
            },
            //上传成功要执行的方法
            uploadSuccess() {

            }
        },
        mounted() {
            this.getCate();
        },
        components: {
            UEditor
        }
    }
</script>
