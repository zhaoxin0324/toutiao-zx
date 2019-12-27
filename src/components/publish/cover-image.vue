<template>
  <div class="cover-image">
      <!-- 根据images数组的长度 渲染除几个图片 images数据在父组件中，通过子父传值 传递到子组件中 -->
      <div class="cover-item" v-for="(item,index) in list" :key="index">
          <img :src='item ? item : defaultImg' alt="" @click="openDialog(index)">
      </div>
      <el-dialog :visible="dialogVisible" @close="closeDialog">
          <select-image @imgToCover="imgGetInCover"></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      dialogVisible: false,
      defaultImg: require('../../assets/img/pic_bg.png'),
      selectIndex: -1
    }
  },
  methods: {
    imgGetInCover (url) {
      this.$emit('imgToPublish', url, this.selectIndex)
      //   alert(url)
      this.dialogVisible = false
    },
    //   显示图片选择组件
    openDialog (index) {
      this.dialogVisible = true
      this.selectIndex = index
    },
    // 关闭组件
    closeDialog () {
      this.dialogVisible = false
    }
  }

}
</script>

<style lang='less' scoped>
    .cover-image{
        display: flex;
        margin: 20px 0;
        margin-left: 58px;
        .cover-item{
            width: 250px;
            height: 250px;
            border: 1px solid #ccc;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
