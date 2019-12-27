<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="material">
      <div class="select-img-list">
          <!-- 生成图片列表 -->
        <el-card class="img-card" v-for="(item,index) in list" :key="index">
            <img :src="item.url" alt="" @click="getImgToCover(item.url)">
            <!-- 为每个图片上点击事件 将图片的url传到父组件 -->
        </el-card>
      </div>
      <!-- 分页组件 -->
      <el-row type="flex" justify="center">
        <el-pagination background layout="prev, pager, next"
         :total="page.total"
         :current-page="page.currenPage"
         :page-size="page.pageSize"
         @current-change="changePage"
        ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">
        <!-- 上传图片组件 -->
        <el-upload :http-request="uploadImg" action="" :show-file-list="false" class="upload">
            <i class='el-icon-plus'></i>
        </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material',
      list: [],
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    uploadImg () {},
    getImgToCover (url) {
      this.$emit('imgToCover', url)
    },
    //   分页组件切换页面
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    //   获取全部图片素材
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        // console.log(res)
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang='less' scoped>
.select-img-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .img-card{
        width: 120px;
        height: 120px;
        margin: 10px 20px;
        img{
            width: 100%;
            height:100%;
        }
    }
};
.upload{
    font-size: 50px;
    text-align: center;
    i{
        display: block;
        border: 1px dashed #ccc;
        height: 200px;
        width: 200px;
        line-height: 200px
    }
}
</style>
