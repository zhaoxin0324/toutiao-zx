<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">账户信息</template>
      </bread-crumb>
      <!-- 左侧表单组件 并且需要手动校验-->
      <el-form label-width="60px" style="margin-left:100px">
          <el-form-item label="用户名">
              <el-input style="width:25%" v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="简介">
              <el-input style="width:25%" v-model="formData.intro"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
              <el-input style="width:25%" v-model="formData.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
              <el-input style="width:25%" v-model="formData.mobile" disabled=""></el-input>
          </el-form-item>
      </el-form>
      <!-- 右侧上传图片组件 -->
      <el-upload class="uploadImg" action="" :show-file-list="false">
          <img src="../../assets/header.jpg" alt="">
      </el-upload>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: '' // 手机号
      }
    }
  },
  methods: {
    // 获取用户信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        this.formData = res.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.uploadImg{
    position: absolute;
    width: 180px;
    height: 180px;
    right: 250px;
    top: 140px;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
}
</style>
