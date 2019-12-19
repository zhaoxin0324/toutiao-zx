<template>
<!-- 全局容器 -->
  <el-container>
    <!-- 左侧边栏 -->
    <el-aside style="width:230px;min-height:100vh;background-color:#323745" >
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧容器 -->
    <el-container>
      <!-- 右侧头部 -->
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main>
        <!-- 放置二级路由容器 -->
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
