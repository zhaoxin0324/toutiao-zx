<template>
  <!-- 面包屑的内容 -->
  <el-breadcrumb separator='>'>
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
          <!--具名 插槽 -->
        <slot name="title"></slot>
      </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
