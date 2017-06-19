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
            <span class="expand-key">姓名：</span>
            <span class="expand-value">{{ row.job }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">电话：</span>
            <span class="expand-value">{{ row.interest }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">生日：</span>
            <span class="expand-value">{{ row.birthday }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="8">
            <span class="expand-key">余额：</span>
            <span class="expand-value">《{{ row.book }}》</span>
            </Col>
            <Col span="8">
            <span class="expand-key">积分：</span>
            <span class="expand-value">{{ row.movie }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">地区：</span>
            <span class="expand-value">{{ row.music }}</span>
            </Col>
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
