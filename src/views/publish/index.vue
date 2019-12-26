<template>
    <el-card>
        <bread-crumb slot="header">
            <template slot="title">发布文章</template>
        </bread-crumb>
        <el-form label-width="60px" style="margin-left:40px" :model="formData" :rules="publishRules" ref="publishForm">
            <el-form-item label="标题" prop="title">
                <el-input style="width:40%" v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <el-input type='textarea' :rows="4" v-model="formData.content"></el-input>
            </el-form-item>
            <el-form-item label="封面" prop="type">
                <el-radio-group v-model="formData.cover.type">
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="3">三图</el-radio>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道" prop="channel_id">
                <el-select v-model="formData.channel_id" >
                    <el-option  v-for="item in channels" :key="item.id"
                    :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="publishArticle()">发布</el-button>
                <el-button @click="publishArticle(false)">存入草稿</el-button>
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
        },
        channel_id: null // 频道id
      },
      publishRules: {
        title: [{ required: true, message: '输入标题' }, {
          min: 5, max: 30, message: '5-30字符'
        }],
        content: [{ required: true, message: '输入内容' }],
        channel_id: [{ required: true, message: '选择频道' }]
      } // 校验规格对象
    }
  },
  methods: {
    publishArticle (draft) {
    //  手动校验 ref 绑定表单 通过validate函数校验
      this.$refs.publishForm.validate(isOK => {
        // 校验成功调用接口
        if (isOK) {
          this.$axios({
            url: '/articles',
            method: 'post',
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
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>

</style>
