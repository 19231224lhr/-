<template>
  <div>
    <h3>[填空] {{ message.title }}</h3>
    <div class="Echarts" style="margin-left: 150px">
      <div :id="message.id" style="width: 600px;height:500px;"></div>
    </div>
    <div class="Echarts" style="margin-left: 200px">
      <div :id="message.id + 117" style="width: 500px;height:300px;"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'AnalyseTiankong',
  data() {
    return {
     test_data: [],
     test_data1: [],
     test_data2: []
    }
  },
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(this.message.id));
      let myChart1 = this.$echarts.init(document.getElementById(this.message.id + 117));

      let option1 = {
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        title: {
          text: '填空题各答案数量柱状图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        xAxis: {
          type: 'category',
          data: this.test_data2
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.test_data1,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }]
      };
      // 指定图表的配置项和数据
      let option = {
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        title: {
          text: '填空内容趋势饼图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '选项内容',
            type: 'pie',
            radius: '50%',
            data: this.test_data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      myChart1.setOption(option1);
    }
  },
  mounted() {
    let i = 0
    let test = {}
    for (i = 0;i <= this.message.details.length - 1;i++) {

      test = {value: this.message.details[i][1] ,name: this.message.details[i][0] + "选项比例"}
      this.test_data1.push(this.message.details2[i])
      this.test_data2.push(this.message.details3[i])
      this.test_data.push(test)
    }
    console.log("填空题details:",this.test_data,this.test_data1,this.test_data2)
    this.myEcharts();
  },
  props: ['message']

}
</script>

<style>

</style>
