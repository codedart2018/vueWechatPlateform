<template>
    <div>
        <Card dis-hover>
            <Row>
                <Form ref="formField" :model="formField" :rules="ruleValidate" :label-width="80">
                    <Form-item label="文章标题" prop="title" style="width: 400px;">
                        <Input v-model="formField.title" placeholder="请输入姓名"></Input>
                    </Form-item>
                    <Form-item label="副标题" prop="subtitle" style="width: 400px;">
                        <Input v-model="formField.subtitle" placeholder="50字内的副标题"></Input>
                    </Form-item>
                    <Form-item label="文章分类" prop="cate_id" style="width: 400px;">
                        <Select v-model="formField.cate_id" placeholder="请选择">
                            <Option value="">请选择</Option>
                            <div v-for="item in cate">
                                <Option :value="item.id" :key="item.id" v-html="item._name" v-if="item.is_father == 1"
                                        disabled></Option>
                                <Option :value="item.id" :key="item.id" v-html="item._name"
                                        v-else-if="item.is_father == 0"></Option>
                            </div>
                        </Select>
                    </Form-item>
                    <Form-item label="缩略图片" prop="thumbnail" style="width: 400px;">
                        <Upload action="//jsonplaceholder.typicode.com/posts/" success="uploadSuccess">
                            <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                        </Upload>
                    </Form-item>
                    <Form-item label="关键词" prop="keyword" style="width: 400px;">
                        <Input v-model="formField.keyword" placeholder="多个关键词请用 空格 分隔"></Input>
                    </Form-item>
                    <Form-item label="内容简要" prop="description" style="width: 400px; height: 116px;">
                        <Input v-model="formField.description" type="textarea" placeholder="填写250个字符内的简要内容..." :autosize="{minRows: 5}"></Input>
                    </Form-item>
                    <Form-item label="文章内容" prop="content">
                        <wx-editor ref="content" :initContent="formField.content"></wx-editor>
                    </Form-item>
                    <Form-item label="作者" prop="author" style="width: 400px;">
                        <Input v-model="formField.author" placeholder="作者默认公众号名称"></Input>
                    </Form-item>
                    <Form-item label="外链地址" prop="rel_url" style="width: 400px;">
                        <Input v-model="formField.rel_url" placeholder="请输入姓名"></Input>
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
                        <Row>
                            <Col span="16">
                                <Button type="primary" @click="handleSubmit('formField')">提交保存</Button>
                                <Button type="ghost" @click="handleReset('formField')" style="margin-left: 8px">重置表单</Button>
                            </Col>
                            <Col span="8">
                                <Button type="info" @click="syncWeChat('formField')">保存同步微信</Button>
                                <Button type="success" style="margin-left: 8px">保存并群发</Button>
                                <Button type="ghost" @click="goBack" style="margin-left: 8px">返回</Button>
                            </Col>
                        </Row>
                    </Form-item>
                </Form>
            </Row>
        </Card>
    </div>
</template>

<script>
    import WxEditor from '@/components/wx-editor.vue'

    export default{
        data(){
            return{
                //分类数据
                cate: [],
                //表单字段
                formField: {
                	content: '',
                    status: 1
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
                this.formField.content = this.$refs.content.content
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.request('ArchivesEdit', this.formField).then((res) => {
                            if(res.status) {
                                this.$Message.success(res.msg)
                                this.$router.go(-1)
                            } else {
                                this.$Message.error(res.msg)
                            }
                        })
                    } else {
                        this.$Message.error('表单验证失败!')
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields()
            },
            //获得分类数据
            getCate() {
                this.request('ArchivesCategoryList', {type: 1}, true).then((res) => {
                    if(res.status) {
                        this.cate = res.data
                    }
                })
            },
            //获取数据
            getData() {
                let id = this.$route.params.id
                this.apiGet('/merchants/archives/edit',{id: id}).then((res) => {
                    if(res.status) {
                        this.formField = res.data
                        this.$refs.content.insertHtml(res.data.content)
                    } else {
                        this.$Message.error(res.msg)
                    }
                })
            },
            //后退海阔天空
            goBack() {
                this.$router.go(-1)
            },
            //上传成功要执行的方法
            uploadSuccess() {

            },
            //保存数据同步微信
            syncWeChat(name) {
                this.formField.content = this.$refs.content.content
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.request('ArchivesSaveSyncMaterialNews', this.formField).then((res) => {
                            if(res.status) {
                                this.$Message.success(res.msg)
                                this.$router.go(-1)
                            } else {
                                this.$Message.error(res.msg)
                            }
                        })
                    } else {
                        this.$Message.error('表单验证失败!')
                    }
                })
            }
        },
        mounted() {
            this.getCate()
            this.getData()
        },
        components: {
            'wx-editor': WxEditor
        },

    }
</script>
