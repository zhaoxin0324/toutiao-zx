<template>
  <div class="home">
    <div class="echarts" ref="myChart"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  // 需要在渲染完成时间才可以获取到dom元素
  mounted () {
    var xAxisData = []
    var data1 = []
    var data2 = []
    for (var i = 0; i < 100; i++) {
      xAxisData.push('类目' + i)
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)
    }
    let myChart = echarts.init(this.$refs.myChart) // 获取到实例对象 初始化
    myChart.setOption({
      title: {
        text: '柱状图动画延迟'
      },
      legend: {
        data: ['bar', 'bar2'],
        align: 'left'
      },
      toolbox: {
        // y: 'bottom',
        feature: {
          magicType: {
            type: ['stack', 'tiled']
          },
          dataView: {},
          saveAsImage: {
            pixelRatio: 2
          }
        }
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false
        }
      },
      yAxis: {
      },
      series: [{
        name: 'bar',
        type: 'bar',
        data: data1,
        animationDelay: function (idx) {
          return idx * 10
        }
      }, {
        name: 'bar2',
        type: 'bar',
        data: data2,
        animationDelay: function (idx) {
          return idx * 10 + 100
        }
      }],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5
      }
    })
  }
}
</script>

<style lang='less' scoped>
.echarts{
  width: 600px;
  height: 400px;
}
</style>
