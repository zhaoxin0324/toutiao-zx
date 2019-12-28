<template>
<!-- 全局容器 -->
  <el-container>
    <!-- 左侧边栏 -->
    <el-aside style="min-height:100vh;background-color:#323745" :style="{width:collaspse? '60px':'230px'}" >
      <!-- 将collaspse属性值传到侧边栏组件中  父传子 -->
      <layout-aside :collaspse='collaspse'></layout-aside>
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
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collaspse: false
    }
  },
  created () {
    eventBus.$on('changeCollapse', () => {
      this.collaspse = !this.collaspse
    })
  }
}
</script>

<style>

</style>
