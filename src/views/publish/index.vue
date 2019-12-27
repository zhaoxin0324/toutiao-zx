<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <el-form
      label-width="60px"
      style="margin-left:40px"
      :model="formData"
      :rules="publishRules"
      ref="publishForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input style="width:40%" v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <quill-editor style="height:400px;" v-model="formData.content"></quill-editor>
      </el-form-item>
      <el-form-item label="封面" prop="type" style="margin-top:120px">
        <el-radio-group v-model="formData.cover.type" @change="changeType">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <!-- {{formData.cover}} -->
      </el-form-item>
      <!-- 通过子父传值将images数据传到子组件中 -->
      <cover-image :list="formData.cover.images" @imgToPublish="getImgInPublish"></cover-image>
      <!-- 获取cover-img组件传出的数据 -->
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publishArticle()">发布</el-button>
        <el-button @click="publishArticle(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      formData: {
        title: '', // 标题
        content: '', // 内容
        cover: {
          type: 0, // 封面内容
          images: [] // 存储图片地址
        }
        // channel_id: null // 频道id
      },
      publishRules: {
        title: [
          { required: true, message: '输入标题' },
          {
            min: 5,
            max: 30,
            message: '5-30字符'
          }
        ],
        content: [{ required: true, message: '输入内容' }],
        channel_id: [{ required: true, message: '选择频道' }]
      } // 校验规格对象
    }
  },
  watch: {
    // 监测是发布还是修改 动态路由 $router.params
    $route (to, form) {
      // to.params动态参数对象
      if (Object.keys(to.params).length) {
      } else {
        // 没有参数=》发布页面=》表单数据为空
        this.formData = {
          title: '', // 标题
          content: '', // 内容
          cover: {
            type: 0, // 封面内容
            images: [] // 存储图片地址
          }
        }
      }
    }
    // 通过type的值 将images数组的长度进行管理 这种方法只要type发生变化 images数组就会被清空，最开始的图片也无法显示，不合理
    // 利用el-radio-group  change事件监控  点击时触发
    // 'formData.cover.type': function () {
    //   if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
    //     // 无图  数组为空
    //     this.formData.cover.images = []
    //   } else if (this.formData.cover.type === 1) {
    //     this.formData.cover.images = ['']
    //   } else if (this.formData.cover.type === 3) {
    //     this.formData.cover.images = ['', '', '']
    //   }
    // }
  },
  methods: {
    getImgInPublish (url, index) {
      // alert(url)
      this.formData.cover.images.splice(index, 1, url)
    },
    changeType () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        // 无图  数组为空
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      }
    },
    publishArticle (draft) {
      //  手动校验 ref 绑定表单 通过validate函数校验
      this.$refs.publishForm.validate(isOK => {
        // 校验成功调用接口
        if (isOK) {
          // 获取articleId
          let { articleId } = this.$route.params
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft },
            data: this.formData
          }).then(res => {
            // 添加成功 跳转页面 编程时导航
            this.$router.push('/home/articles')
          })
        }
      })
    },
    // 获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    getArticleById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(res => {
        // debugger
        this.formData = res.data // 将文章数据给到formData 渲染到页面
      })
    }
  },
  created () {
    this.getChannels() // 获取频道数据
    // 获取id 无id为发布
    let { articleId } = this.$route.params // 获取动态路由id
    articleId && this.getArticleById(articleId) // 若有id 通过id获取该篇文章
  }
}
</script>

<style>
</style>
