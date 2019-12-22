<template>
<!-- 卡片组件搭建框架 -->
  <el-card>
      <!-- 加入面包屑 通过插槽放到header-->
    <bread-crumb slot="header">
        <!-- 给面包屑中的插槽赋值 -->
        <template slot="title">素材管理</template>
    </bread-crumb>
  </el-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
