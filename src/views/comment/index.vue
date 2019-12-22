<template>
  <el-card v-loading="loading">
    <!-- 引用面包屑组件 -->
    <!-- 卡片头部组件 -->
    <bread-crumb slot="header">
      <!-- 卡片头部组件的插槽 -->
      <template slot="title">评论列表</template>
      <!-- 面包屑组件的具名插槽 -->
    </bread-crumb>
    <el-table :data="list">
      <el-table-column label="标题" width="500" prop="title"></el-table-column>
      <el-table-column :formatter="formatterBool" label="评论状态" prop="comment_status"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button type="text" size="small">修改</el-button>
          <el-button
            type="text"
            size="small"
            @click="changeStatus(obj.row)"
          >{{ obj.row.comment_status ? '关闭评论' : '打开评论' }}</el-button>
        </template>
        <!-- 将每行数据的传入方法中 -->
      </el-table-column>
    </el-table>
    <!-- 插入分页组件 外层套一个el-row 容易布局 -->
    <el-row type="flex" justify="center" style="height:80px" align="middle">
      <el-pagination
      background layout="prev, pager, next"
      :total="page.total"
      :pageSize="page.pageSize"
      :currentPage="page.currentPage"
      @current-change="changePage"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        total: 0, // 数据总条数
        pageSize: 10, // 默认每页10条
        currentPage: 1 // 当前页数
      }
    }
  },
  methods: {
    changePage (newPage) {
      // 改变currentPage的值，调用接口
      this.page.currentPage = newPage
      this.getComment()
    },
    changeStatus (row) {
      // 需要用到状态类型,obj.row.comment_status 传递参数 根据当前状态获取需要改成的状态
      let mess = row.comment_status ? '关闭' : '打开'
      // 提示信息
      // console.log(row.id.toString()) // id被编辑成了数组 可用tostring方法转回数字
      // console.log(this)  $confirm遵循promise对象规则
      this.$confirm(`你确定要${mess}评论么？`).then(() => {
        // 确定之后发送请求
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(res => {
          // 提示信息
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          // 调用评论 刷新
          this.getComment()
        })
      })
    },
    getComment () {
      this.loading = true
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage }
      }).then(res => {
        console.log(res)
        this.page.total = res.data.total_count // 获取文章总条数
        this.list = res.data.results // 获取评论列表数据给本身data
        this.loading = false
      })
    },
    // 定义布尔值转换方法
    formatterBool (row, column, cellValue, index) {
      // cellValue 当前单元格的值
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
