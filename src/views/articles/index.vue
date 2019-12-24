<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-row class="statusRow">
      <el-col :span="3">
        <div class="artStatusList">文章状态:</div>
      </el-col>
      <el-col :span="10">
        <el-radio-group v-model="radio">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="channelRow" style="height:50px" type="flex" align="middle">
      <el-col :span="3">
        <div class="channelList">频道列表:</div>
      </el-col>
      <el-col :span="5">
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in list" :key="item.value"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="timeRow" style="height:50px" type="flex" align="middle">
      <el-col :span="3">
        <div class="selectTime">时间选择:</div>
      </el-col>
      <el-col :span="8">
        <div class="block">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      radio: 5,
      list: [],
      value1: 0
    }
  }
}
</script>

<style lang="less" scoped>
.statusRow {
  .artStatusList {
    padding-left: 30px;
  }
}
.channelRow {
  margin: 30px 0;
  .channelList {
    padding-left: 30px;
  }
}
.timeRow{
    .selectTime{
        padding-left: 30px;
    }
}
</style>
