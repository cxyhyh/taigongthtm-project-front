<template>
  <div>
       <div id="myChart" class="charts-box" style="width: 100%;height: 420px;" />
  </div>
</template>

<script>

export default {
name: 'Home',
    mounted() {
        this.drawLine()
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.showLoading() // 开启 loading 效果
      setTimeout(() => {
        myChart.hideLoading() // 隐藏 loading 效果
      }, 2000)
      // 绘制图表
      myChart.setOption({
       title: { text: '浏览统计' }, // 为图表配置标题
        tooltip: {}, // 配置提示信息
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', '123', '456', '789', '111', '1231', '5555']
        }, // 配置要在 X 轴显示的项
        yAxis: {
          type: 'value'
        }, // 配置要在 Y 轴显示的项
        legend: {
          data: ['浏览量', '收藏量']
        }, // 图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示
        series: [
          {
            name: '浏览量', // 系列名称
            data: [820, 932, 901, 934, 1290, 1330, 1320, 1350, 1333, 2000, 100, 2500, 3333], // // 系列中的数据内容
            type: 'line' // // 系列图表类型
          },
          {
            name: '收藏量',
            data: [1000, 800, 3000, 93, 129, 133, 130, 135, 133, 200, 1000, 250],
            type: 'line'
          }
        ] // 系列列表
      })
    }
}
</script>

<style>

</style>