<template>
  <el-card>
      <!-- 引用面包屑组件 -->
      <!-- 卡片头部组件 -->
      <bread-crumb slot="header"><!-- 卡片头部组件的插槽 -->
        <template slot="title">评论列表</template>  <!-- 面包屑组件的具名插槽 -->
      </bread-crumb>
      <el-table>
          <el-table-column label="标题" width="500"></el-table-column>
          <el-table-column label="评论状态"></el-table-column>
          <el-table-column label="总评论数"></el-table-column>
          <el-table-column label="粉丝评论数"></el-table-column>
          <el-table-column label="操作"></el-table-column>
      </el-table>
  </el-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
