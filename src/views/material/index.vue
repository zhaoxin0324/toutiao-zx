<template>
  <!-- 卡片组件搭建框架 -->
  <el-card>
    <!-- 加入面包屑 通过插槽放到header-->
    <bread-crumb slot="header">
      <!-- 给面包屑中的插槽赋值 -->
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部素材" name="all"></el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect"></el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'collect'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style>
</style>
