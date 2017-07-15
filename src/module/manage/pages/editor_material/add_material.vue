<style src="../../assets/style/editor_material/phone_preview.less" lang="less" scoped></style>
<template>
    <div>
        <Card dis-hover>
            <Row>
                <Col span="12">
                    <Form ref="formField" :model="formField" :rules="ruleValidate" :label-width="80">
                        <Form-item label="素材标题" prop="title" style="width: 400px;">
                            <Input v-model="formField.title" placeholder="请输入姓名"></Input>
                        </Form-item>
                        <Form-item label="素材分类" prop="c_id" style="width: 400px;">
                            <Select v-model="formField.c_id" placeholder="请选择">
                                <Option value="">请选择</Option>
                                <Option v-for="item in cate" :value="item.id" :key="item.id">{{ item.name }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="素材状态" prop="status">
                            <Radio-group v-model="formField.status">
                                <Radio label="1">正常</Radio>
                                <Radio label="0">锁定</Radio>
                            </Radio-group>
                        </Form-item>

                        <Form-item label="素材内容" prop="content">
                            <div style="line-height: normal">
                                <UEditor ref="editor" @ready="editorReady" v-model="formField.content" :config="config"></UEditor>
                            </div>
                        </Form-item>
                        <Form-item>
                            <Button type="primary" @click="handleSubmit('formField')">提交</Button>
                            <Button type="ghost" @click="handleReset('formField')" style="margin-left: 8px">重置</Button>
                            <Button type="ghost" @click="goBack" style="margin-left: 8px">返回</Button>
                        </Form-item>
                    </Form>
                </Col>
                <Col span="12">
                    <div class="preview-box">
                        <div class="title">代码兔，我们专注于微信公众号</div>
                        <div class="tips">
                            <em style="color: rgb(140, 140, 140); font-size: 12px; font-style: normal;">2020-02-02</em>
                            <a style="color: rgb(96, 127, 166); font-size: 12px;" href="">代码兔 www.daimatu.cn</a>
                        </div>
                        <div class="preview">
                            <div id="content">
                                <div v-html="formField.content"></div>
                            </div>
                            <div>
                                <a style="font-size:12px;color:#607fa6" href="" target="_blank" id="post-user">阅读原文</a> <em style="color:#8c8c8c;font-style:normal;font-size:12px;">阅读 100000+</em>
                                <span class="fr"><a style="font-size:12px;color:#607fa6" href="" target="_blank">我要举报</a></span>
                            </div>
                        </div>
                    </div>
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
                    c_id: '',
                    status: "1",
                    content: ''
                },
                //验证规则
                ruleValidate: {
                    title: [
                        { required: true, message: '素材标题不能为空', trigger: 'blur' },
                        { type: 'string', min: 2, message: '素材名称不能少于2个字符', trigger: 'blur' },
                        { type: 'string', max: 20, message: '素材名称不能大于20个字符', trigger: 'blur' }
                    ],
                    c_id: [
                        { required: true, message: '请选择素材分类', trigger: 'change' }
                    ],
                    status: [
                        { required: true, message: '请选择状态', trigger: 'change' }
                    ],
                    content: [
                        { required: true, message: '请编写素材内容', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                    	this.request('AddEditorMaterial', this.formField).then((res) => {
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
                this.request('AdminEditorMaterialCate', {type: 1}, true).then((res) => {
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
