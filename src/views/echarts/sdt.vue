<template>
  <div>
    <div>
      <div>
        <div style="height: 500px" id="china"></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { selectR7AndR28 } from "../../request/api";
export default {
  name: "sdt",
  data() {
    return {
      dataList: [],
    };
  },
  mounted: function () {
    this.selectR7AndR28();
  },
  methods: {
    selectR7AndR28() {
      selectR7AndR28({})
        .then((res) => {
          this.dataList = res.data;
          var myChart = echarts.init(document.getElementById("china"));
          window.onresize = myChart.resize;
          const markLineOpt = {
            animation: false,
            label: {
              formatter: "y = 1.0514x + 8.7225",
              align: "right",
            },
            lineStyle: {
              type: "solid",
            },
            tooltip: {
              formatter: "y = 1.0514x + 8.7225",
            },
            data: [
              [
                {
                  coord: [20, 30],
                  symbol: "none",
                },
                {
                  coord: [48, 60],
                  symbol: "none",
                },
              ],
            ],
          };
          var option = {
           
            legend: {
              bottom: 22,
            },
            grid: [{ left: "10%", top: "20%", width: "80%", height: "65%" }],
            tooltip: {
              formatter: "X:Y {a}({c})",
              axisPointer: {
                type: "cross",
               snap:true
              },
            },
            xAxis: [
              {
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: "blue",
                    width: 2, //这里是为了突出显示加上的
                  },
                },
                gridIndex: 0,
                min: 0,
                max: 50,
                splitNumber: 10,
                splitLine: {
                  show: false,
                },
              },
            ],
            yAxis: [
              {
                 axisLine: {
                  show: true,
                  lineStyle: {
                    color: "blue",
                    width: 2, //这里是为了突出显示加上的
                  },
                },
                gridIndex: 0,
                min: 0,
                max: 70,
                splitLine:{
                  lineStyle:{
                    color:"blue",
                    type:"dashed"
                  }
                }
              },
            ],
            series: [
              {
                name: "值",
                itemStyle: {
                  normal: {
                    color:"yellow",
                 
                  },
                },
                type: "scatter",
                data: this.dataList,
                symbolSize: 5,
                markLine: markLineOpt,
              },
            ],
          };
          myChart.setOption(option);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>
<style>
</style>