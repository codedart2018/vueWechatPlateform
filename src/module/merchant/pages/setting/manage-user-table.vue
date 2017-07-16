<!--粉丝专用表格-->
<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="8">
                <span class="expand-key">手机号：</span>
                <span class="expand-value">{{ row.mobile }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">电子邮箱：</span>
                <span class="expand-value">{{ row.email }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">最后登陆IP：</span>
                <span class="expand-value">{{ row.last_login_ip }}</span>
            </Col>
        </Row>
        <Row>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>
