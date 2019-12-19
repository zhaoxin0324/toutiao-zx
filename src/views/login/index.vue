<template>
  <div class="loginBgc">
    <el-card class="login-card" >
      <!-- 引入图片 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="" style="width:50%">
      </div>
      <!-- 表单容器 el-form -->
      <el-form style="margin-top:30px" :model="loginForm" :rules="loginRules" ref="myform">
        <!-- 表单域 el-form-item-->
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeHolder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- 表单域 验证码框和发送验证码按钮 -->
          <el-input v-model="loginForm.code" placeHolder="请输入验证码" style="width:65%"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <!-- 底部复选框 -->
        <!-- 表单域 -->
        <el-form-item prop="check">
          <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 登录按钮、 -->
        <!-- 表单域 -->
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="submitLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  // 在data中定义表单数据对象 并绑定到el-form上
  data () {
    return {
      // 定义一个表单数据对象
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false // 是否勾选
      },
      loginRules: {
        //   验证规则，验证登录表单的
        // require true 必填
        mobile: [{ required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确'
          }],
        code: [{ required: true, message: '请输入您的验证码' }, {
          pattern: /^\d{6}$/,
          message: '验证码格式不正确'
        }],
        check: [{ validator: function (rule, value, callback) {
          //   rule当前的规则 没什么用
          // value指的就是我们要校验的字段的值
          if (value) {
            callback()
          } else {
            //   认为校验不通过的提示信息
            callback(new Error('点上√'))
          }
        } }]
      }
    }
  },
  methods: {
    // 提交登录表单
    submitLogin () {
      this.$refs.myform.validate((isok) => {
        // validate 是一个方法 => 方法中传入的一个函数 两个校验参数  是否校验成功/未校验成功的字段
        if (isok) {
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then(res => {
            // console.log(res)
            // 设置令牌到本地储存
            window.localStorage.setItem('userInfo', res.data.data.token)
            // 跳转页面到home 用this.$router
            this.$router.push('/home')
          }).catch(() => {
            // 设置失败的弹窗信息 element-ui提供的方法  通过 $message设置
            this.$message({
              message: '不正确',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .loginBgc{
    background-image: url('../../assets/img/login_bg.jpg');
    background-size: cover;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card{
      width: 440px;
      height: 350px;
      .title{
        text-align: center;
      }
    }
  }
</style>
