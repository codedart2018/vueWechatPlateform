<style src="../../assets/style/setting/authorize.less" lang="less" scoped></style>
<!--角色授权-->
<template>
    <div style="background:#eee;">
        <Card dis-hover>
            <p slot="title">角色授权分配</p>
            <Row>
                <Col span="24" class="mb-20">
                    <Row>
                        <Col span="22" push="2" class="col">
                        <Input placeholder="请输入..." style="width: 300px" v-model="name"></Input></Col>
                        <Col span="2" pull="22" class="text-align-right col pr-20">角色名称</Col>
                    </Row>
                </Col>
                <Col span="24">
                <Row>
                    <Col span="22" push="2">
                        <div class="rule-box">
                            <table class="table">
                                <tbody>
                                    <tr class="ng-scope" v-for="(item, index) in list" :key="item.id">
                                        <td class="col-td-1">
                                            <Icon type="network"></Icon>
                                            </i>&nbsp;{{item.name}}
                                        </td>
                                        <td class="col-td-2">
                                            <label class="checkbox-inline">
                                                <Checkbox
                                                    :indeterminate="item.status"
                                                    :value="item.select"
                                                    @click.prevent.native="checkAll(index)">全选
                                                </Checkbox>
                                            </label>
                                        </td>
                                        <td>
                                            <Checkbox v-for="(child, key) in item.children" :value="item.children[key].select"
                                                      :key="item.id" @on-change="changeData(index, key)">
                                                {{child.name}}
                                            </Checkbox>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Col>
                    <Col span="2" pull="22" class="text-align-right col pr-20">权限分配</Col>
                </Row>
                </Col>
                <Col span="24" class="text-align-right">
                    <Button type="primary" @click="save">保存权限</Button>&nbsp;&nbsp;&nbsp;&nbsp;<Button @click="goBack()">返回</Button>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script>
    export default{
        beforeCreate: function () {
            let id = this.$route.params.id;
            if (!id) {
                this.$Message.info("授权角色ID不存在");
                setTimeout(() => {
                    this.$router.go(-1);
                }, 2000);
            }
        },
        data(){
            return {
                //节点名称
                name: '',
                //节点列表数据
                list: [],
                //原后台取出已有权限数据
                rules: []
            }
        },
        methods: {
            changeData(index, key) {
                let t = this.list[index];
                let tk = t.children[key];
                //反转
                tk.select = !tk.select;
                //获取子菜单长度
                let len = t.children.length;
                let count = 0;
                //判断
                let is = false //全选状态
                for (let item of t.children) {
                    if (item.select == false) {
                        count++;
                        is = true; //总有一个反选
                    }
                }
                if (is && count != len) {
                    if (tk.select) {
                        this.rules.push(tk.id);
                        if (!this.inArray(t.id)) {
                            this.rules.push(t.id);
                        }
                    } else {
                        //删除指定值
                        this.removeByValue(tk.id);
                    }
                    t.status = true;
                    t.select = false;
                } else if (is && count == len) {
                    if (tk.select) {
                        this.rules.push(tk.id);
                    } else {
                        //移除当前父类ID
                        this.removeByValue(t.id);
                        this.removeByValue(tk.id);
                    }
                    //待有非常之功，必待非常之人
                    t.status = false;
                    t.select = false;
                } else {
                    t.status = false;
                    t.select = true;
                    this.rules.push(tk.id);
                }
            },
            //全不选 全选
            checkAll (index) {
                let t = this.list[index]
                if (t.status == false && t.select == true) {
                    t.status = false;
                    t.select = false;
                    this.reversal(index, false);
                    //删除父ID
                    this.removeByValue(t.id);
                } else if (t.status == false && t.select == false) {
                    t.status = false;
                    t.select = true;
                    this.rules.push(t.id);
                    this.reversal(index, true);
                } else {
                    t.status = false;
                    t.select = false;
                    this.reversal(index, false);
                    this.removeByValue(t.id);
                }
            },
            //反转所有
            reversal(index, select) {
                //我TMD 就不知道为什么第一个元素是空的
                if (this.rules && this.rules[0] == "") {
                    this.rules.splice(0, 1);
                }
                for (let item of this.list[index].children) {
                    if (select == true) {
                        this.rules.push(item.id);
                    } else {
                        this.removeByValue(item.id);
                    }
                    item.select = select;
                }
            },
            //删除指定值
            removeByValue(val) {
                for (let i = 0; i < this.rules.length; i++) {
                    if (this.rules[i] == val) {
                        this.rules.splice(i, 1);
                        break;
                    }
                }
            },
            //检查值是否已存在
            inArray(value) {
                var i = this.rules.length;
                while (i--) {
                    if (this.rules[i] === value) {
                        return true;
                    }
                }
                return false;
            },
            //请求后端数据
            getData() {
                let id = this.$route.params.id;
                if (id) {
                    this.request('MerchantAuthorize', {id: id}).then((res) => {
                        if (res.status) {
                            this.list = res.data.list;
                            this.rules = res.data.select;
                            this.name = res.data.name;
                        } else {
                            this.$Message.error(res.msg);
                        }
                    })
                }
            },
            //提交保存数据
            save() {
                let id = this.$route.params.id;
                if (id) {
                    this.request('MerchantSaveAuth', {id: id, rules: this.rules, name: this.name}).then((res) => {
                        if (res.status) {
                            this.$Message.success(res.msg);
                            this.$router.go(-1);
                        } else {
                            this.$Message.error(res.msg);
                        }
                    })
                }
            },
            goBack() {
                this.$router.go(-1);
            }
        },
        mounted() {
            //获取数据
            this.getData();
        },
        components: {}
    }
</script>
