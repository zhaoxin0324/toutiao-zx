<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <!-- 左侧表单组件 并且需要手动校验-->
    <el-form
      label-width="100px"
      style="margin-left:100px"
      :model="formData"
      :rules="rules"
      ref="myForm"
    >
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
        <el-input style="width:25%" v-model="formData.mobile" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveUserInfo">保存信息</el-button>
      </el-form-item>
    </el-form>
    <!-- 右侧上传图片组件 -->
    <el-upload class="uploadImg" action :show-file-list="false" :http-request="uploadImg">
      <img :src="formData.photo? formData.photo:defaultImg" alt />
    </el-upload>
  </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus'
import { uploadImg, saveUserInfo, getUserInfo } from '../../actions/account.js'
export default {
  data () {
    return {
      defaultImg: require('../../assets/header.jpg'),
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: '' // 手机号
      },
      rules: {
        name: [
          { required: true, message: '用户名不能为空' },
          { min: 1, max: 7, message: '1-7个字符' }
        ],
        intro: [{ required: true, message: '简介不能为空' }],
        email: [
          { required: true, message: '邮箱不能为空' },
          {
            pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: '邮箱格式不正确'
          }
        ]
      }
    }
  },
  methods: {
    //   上传头像信息
    async  uploadImg (params) {
    //   定义表单formData
      let data = new FormData()
      data.append('photo', params.file)
      let res = await uploadImg(data)
      this.formData.photo = res.data.photo
      eventBus.$emit('updateUserInfo') // 自定义事件
    },
    //   保存用户信息
    saveUserInfo () {
      this.$refs.myForm.validate(async isOK => {
        if (isOK) {
          await saveUserInfo(this.formData)
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          eventBus.$emit('updateUserInfo') // 自定义事件 完成更新触发通知头部组件更换信息
        }
      })
    },
    // 获取用户信息
    async  getUserInfo () {
      let res = await getUserInfo()
      this.formData = res.data
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.uploadImg {
  position: absolute;
  right: 280px;
  top: 180px;
  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }
}
</style>
