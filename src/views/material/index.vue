<template>
  <!-- 卡片组件搭建框架 -->
  <el-card>
    <!-- 加入面包屑 通过插槽放到header-->
    <bread-crumb slot="header">
      <!-- 给面包屑中的插槽赋值 -->
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <!-- 全部素材内容 定制 -->
        <div class="img-list">
          <el-card v-for="item in list" :key="item.id" class="img-card">
            <img :src="item.url" alt />
            <!-- 卡片底部 el-row容易布局-->
            <el-row class="card-bottom" type="flex" justify="space-around" align="middle">
              <i class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
        <el-row  type="flex" justify="center" style="height:80px width:100%" align="middle">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="page.total"
              :page-size="page.pageSize"
              :current-page="page.currentPage"
              @current-change="changePage"
            ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
          <el-card v-for="item in list" :key="item.id" class="img-card">
            <img :src="item.url" alt />
          </el-card>
        </div>
        <el-row  type="flex" justify="center" style="height:80px width:100%" align="middle">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="page.total"
              :page-size="page.pageSize"
              :current-page="page.currentPage"
              @current-change="changePage"
            ></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认显示全部
      list: [], // 接收数据
      page: {
        currentPage: 1, // 当前页码
        pageSize: 8, // 每页条数
        total: 0 // 总条数
      }
    }
  },
  methods: {
    changePage (newPage) {
      // 改变页码 点击页码发送请求
      this.page.currentPage = newPage
      this.getMaterial()
    },
    changeTab () {
      this.page.currentPage = 1
      this.getMaterial()
    },
    getMaterial () {
      // 发送ajax请求图片数据
      this.$axios({
        url: 'user/images',
        params: {
          collect: this.activeName === 'collect',
          per_page: this.page.pageSize,
          page: this.page.currentPage
        }
      }).then(res => {
        // console.log(res)
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .img-card {
    width: 200px;
    height: 200px;
    margin: 20px 40px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .card-bottom {
      width: 100%;
      font-size: 18px;
      position: absolute;
      background-color: #f4f5f6;
      height: 30px;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
