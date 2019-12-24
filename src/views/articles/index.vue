<template>
  <div>
    <el-card>
      <bread-crumb slot="header">
        <template slot="title">内容列表</template>
      </bread-crumb>
      <el-row class="statusRow">
        <el-col :span="3">
          <div class="artStatusList">文章状态:</div>
        </el-col>
        <el-col :span="10">
          <el-radio-group v-model="formData.status" @change="changeCondition">
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row class="channelRow" style="height:50px" type="flex" align="middle">
        <el-col :span="3">
          <div class="channelList">频道列表:</div>
        </el-col>
        <el-col :span="5">
          <el-select v-model="formData.channel_id" @change="changeCondition">
              <!-- 循环生成多个el-option
              label 指的是 el-option显示值
              value指的是 el-option的存储值
            -->
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="timeRow" style="height:50px" type="flex" align="middle">
        <el-col :span="3">
          <div class="selectTime">时间选择:</div>
        </el-col>
        <el-col :span="8">
          <div class="block">
            <el-date-picker
             @change="changeCondition"
              value-format="yyyy-MM-dd"
              v-model="formData.dateRange"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="contentList">
      <div slot="header">
        <template>共找到{{ page.total }}条符合条件的内容</template>
      </div>
      <el-row class="articleContent" v-for="item in list" :key="item.id.toString()">
        <el-col :span="3" class="articleImg">
          <img
            :src="item.cover.images.length ? item.cover.images[0] : defaultImg"
            alt
            style="width:100% "
          />
        </el-col>
        <el-col :span="17">
          <el-row>
            <div class="articleText">
              <div>{{ item.title}}</div>
              <!-- item.status状态为数字 ，需要判断并进行赋值 过滤器-->
              <el-tag style="width:60px">{{item.status | filterStatus}}</el-tag>
              <div>{{item.pubdate}}</div>
            </div>
          </el-row>
        </el-col>
        <el-col :span="4" class="articleRight">
          <el-row type="flex" justify="end">
            <span>
              <i class="el-icon-edit"></i>修改
            </span>
            <span>
              <i class="el-icon-delete" @click="delArticle(item.id)"></i>删除
            </span>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
    <!-- 分页组件 -->
     <el-row type='flex' justify="center" align="middle" style='height:60px'>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        @current-change="changePage"
        >
        </el-pagination>
    </el-row>
  </div>
  <!-- 状态选择区域 -->

  <!-- 文章显示区域 -->
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5,
        channel_id: null,
        dateRange: []
      },
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      list: [],
      channels: [],
      value1: 0,
      value: '请选择',
      defaultImg: require('../../assets/header.jpg') // 当没有图片时 显示默认图片
    }
  },
  filters: {

    filterStatus (val) {
      // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
      switch (val) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (val) {
      switch (val) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },
  methods: {
    delArticle (id) {
      this.$confirm('确定删除么?').then(res => {
        this.$axios({
          url: `/articles/${id.toString()}`,
          method: 'delete'
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          this.getConditionArticle() // 再次调用
        })
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage // 赋值当前页
      this.getConditionArticle()
    },
    changeCondition () {
      this.page.currentPage = 1
      this.getConditionArticle()
    },
    getConditionArticle () {
    //   alert(this.formData.status)
      let params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.formData.status === 5 ? null : this.formData.status, // 不传为全部 没有5这个值 碰到5不传
        channel_id: this.formData.channel_id,
        begin_pubdate: this.formData.dateRange.length ? this.formData.dateRange[0] : null, // 起始时间
        end_pubdate: this.formData.dateRange.length > 1 ? this.formData.dateRange[1] : null // 结束时间
      }
      this.getArticles(params)
    },
    //   获取频道列表
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    },
    getArticles (params) {
      this.$axios({
        url: '/articles', // 请求地址
        params
      }).then(res => {
        console.log(res)
        this.list = res.data.results // 文章数据
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getArticles()
    this.getChannels()
  }
}
</script>

<style lang="less" scoped>
.statusRow {
  .artStatusList {
    padding-left: 30px;
  }
}
.channelRow {
  margin: 30px 0;
  .channelList {
    padding-left: 30px;
  }
}
.timeRow {
  .selectTime {
    padding-left: 30px;
  }
}
.contentList {
  margin-top: 10px;
  .articleContent {
    height: 130px;
    .articleImg {
      height: 120px;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .articleText {
      padding-left: 5px;
      height: 120px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .articleRight {
    i {
      margin: 0 15px;
      cursor: pointer;
    }
  }
}
</style>
