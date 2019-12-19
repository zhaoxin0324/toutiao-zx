<template>
<!-- 全局容器 -->
  <el-container>
    <!-- 左侧边栏 -->
    <el-aside style="width:231px">
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧容器 -->
    <el-container>
      <!-- 右侧头部 -->
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
