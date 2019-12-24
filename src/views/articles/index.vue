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
          <el-radio-group v-model="radio">
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
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in list" :key="item.value" :value="item.value"></el-option>
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
              v-model="value1"
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
        <template>共找到1000条符合条件的内容</template>
      </div>
      <el-row class="articleContent" v-for="item in list" :key="item.id.toString()">
        <el-col :span="3" class="articleImg">
          <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt style="width:100% " />
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
              <i class="el-icon-delete"></i>删除
            </span>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
  <!-- 状态选择区域 -->

  <!-- 文章显示区域 -->
</template>

<script>
export default {
  data () {
    return {
      radio: 5,
      list: [],
      value1: 0,
      value: 0,
      defaultImg: require('../../assets/header.jpg') // 当没有图片时 显示默认图片
    }
  },
  filters: {
    filterStatus (val) {
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
    }
  },
  methods: {
    getArticles () {
      this.$axios({
        url: '/articles' // 请求地址
      }).then(res => {
        console.log(res)
        this.list = res.data.results // 文章数据
      })
    }
  },
  created () {
    this.getArticles()
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
      height: 120px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .articleRight{
      i{
          margin: 0 15px;
          cursor: pointer;
      }
  }
}
</style>
