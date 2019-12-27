<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">账户信息</template>
      </bread-crumb>
      <!-- 左侧表单组件 并且需要手动校验-->
      <el-form label-width="100px" style="margin-left:100px" :model="formData" :rules="rules" ref="myForm">
          <el-form-item label="用户名" prop="name">
              <el-input style="width:25%" v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="intro">
              <el-input style="width:25%" v-model="formData.intro"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
              <el-input style="width:25%" v-model="formData.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
              <el-input style="width:25%" v-model="formData.mobile" disabled=""></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="saveUserInfo">保存信息</el-button>
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
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空' }, { min: 1, max: 7, message: '1-7个字符' }],
        intro: [{ required: true, message: '简介不能为空' }],
        email: [{ required: true, message: '邮箱不能为空' }, {
          pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
          message: '邮箱格式不正确'
        }]
      }
    }
  },
  methods: {
    //   保存用户信息
    saveUserInfo () {
      this.$refs.myForm.validate(isOK => {
        if (isOK) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(res => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
          })
        }
      })
    },
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
