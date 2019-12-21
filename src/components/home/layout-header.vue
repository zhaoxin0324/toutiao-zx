<template>
  <!-- layout布局 -->
  <el-row class="layout-header" type="flex" justify="space-between" align="middle">
    <el-col :span="6">
      <i class="el-icon-s-fold"></i>
      <span class="layout-left">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="4" class="layout-right">
      <!-- 下拉菜单 el-dropdown -->
      <!-- 设置头像和文字的对齐方式，可以在局部运用el-row组件 设置相关属性 -->
      <el-row type="flex" justify="end" align="middle">
        <img :src="userInfo.photo ? userInfo.photo : defaultImg" alt width="40px" />
        <!-- 通过el-dropdown设置下拉菜单 -->
        <el-dropdown @command="handle">
          <span>{{ userInfo.name }}</span>
          <!-- 下拉菜单，带具名插槽 -->
          <el-dropdown-menu slot="dropdown">
            <!-- 下拉内容 -->
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="git">git地址</el-dropdown-item>
            <el-dropdown-item command="lgout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/header.jpg') // 先把地址转换成变
    }
  },
  created () {
    // let token = window.localStorage.getItem('userInfo') // 获取令牌
    // 查询数据
    this.$axios({
      url: '/user/profile',
      methods: 'get'
      //   headers参数
      // headers: {
      //   Authorization: `Bearer ${token}` 在自定义axios文件中  设置拦截器 添加到请求配置文件config中了
      // }
    }).then(result => {
      this.userInfo = result.data.data // 获取用户个人信息
    })
  },
  methods: {
    handle (com) {
      if (com === 'lgout') {
        // 点击退出 清楚本地储存 跳转网页
        window.localStorage.removeItem('user-token')// 删除令牌
        this.$router.push('/login')
      } else if (com === 'git') {
        window.location.href = 'https://github.com/zhaoxin0324/toutiao-zx/commits/master'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.layout-header {
  height: 60px;
  .layout-left {
    font-size: 16px;
    margin-left: 5px;
  }
  .layout-right {
    img {
      width: 40px;
      border-radius: 50%;
    }
  }
}
</style>
