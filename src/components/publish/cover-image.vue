<template>
  <div class="cover-image">
      <!-- 根据images数组的长度 渲染除几个图片 images数据在父组件中，通过子父传值 传递到子组件中 -->
      <div class="cover-item" v-for="(item,index) in list" :key="index">
          <img :src='item ? item : defaultImg' alt="">
      </div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png')
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
