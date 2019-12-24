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
            <el-option v-for="item in list" :key="item.value"></el-option>
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
      <el-row class="articleContent">
        <el-col :span="3" class="articleImg">
          <img src="../../assets/header.jpg" alt style="width:100% " />
        </el-col>
        <el-col :span="17">
          <el-row>
            <div class="articleText">
              <div>假如我年少有为不自卑</div>
              <el-tag style="width:60px">标签一</el-tag>
              <div>日期</div>
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
      value1: 0
    }
  },
  methods: {
    getArticles () {
      this.$axios({
        url: '/articles'
      }).then(res => {
        console.log(res)
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
          margin: 0 10px;
          cursor: pointer;
      }
  }
}
</style>
