<template>
    <el-card>
        <bread-crumb slot="header">
            <template slot="title">发布文章</template>
        </bread-crumb>
        <el-form label-width="60px" style="margin-left:40px">
            <el-form-item label="标题">
                <el-input style="width:40%"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <el-input type='textarea' :rows="4"></el-input>
            </el-form-item>
            <el-form-item label="封面">
                <el-radio-group>
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="3">三图</el-radio>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道">
                <el-select>
                    <el-option  v-for="item in channels" :key="item.id"
                    :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">发布</el-button>
                <el-button>存入草稿</el-button>
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

      }
    }
  },
  methods: {
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
