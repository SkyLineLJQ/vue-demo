<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <div class="flexBox">
      <el-card class="box-card" style="width: 35%">
        <div slot="header" class="clearfix">
          <span>神奇小精靈</span>
        </div>
        <div class="text item">
          <div class="card-div"> 全国图鉴</div>
          <div class="card-div"> 招式列表</div>
          <div class="card-div"> 道具列表</div>
          <div class="card-div"> 地点列表</div>
          <el-divider></el-divider>
          <div class="card-div"> 全国图鉴</div>
          <div class="card-div"> 招式列表</div>
          <div class="card-div"> 道具列表</div>
          <div class="card-div"> 地点列表</div>
          <div class="card-div"> 个体值计算器</div>
          <div class="card-div"> 个体值计算器2</div>
          <div class="card-div"> 个体值计算器3</div>
        </div>
      </el-card>
      <el-card class="box-card" style="width: 65%">
        <div slot="header" class="clearfix">
          <span>体验人数</span>
        </div>
        <div>
          <div id="line" style="width: 100%;height:300px; "></div>
        </div>
      </el-card>
    </div>

    <el-divider></el-divider>

    <div class="flexBox">
      <div id="main" style="width: 600px;height:400px;"></div>
      <el-slider v-model="values" vertical height="200px"></el-slider>
      <div id="gauge" style="width: 600px;height:400px;"></div>
    </div>

    <el-divider></el-divider>

    <div class="infinite-list-wrapper" style="overflow:auto">
      <ul class="list">
        <li v-for="item in displayList" :key="item.key" class="list-item">
          <div class="flexBox">
            <el-card class="box-card">
              <div class="flexBox">
                <el-image style="width: 100px; height: 100px" lazy :src="item.imgUrl1" fit="fill">
                </el-image>
                <div style="width: 100%">
                  <div style="width: 100%;display:flex">
                    <div style="width: 40%;margin-left: 5%">
                      <span>HP</span>
                      <el-slider v-model="item.HP1" :max='500' style="width: 100%"></el-slider>
                    </div>
                    <div style="width: 40%;margin-left: 5%">
                      <span>攻击</span>
                      <el-slider v-model="item.AD1" :max='500' style="width: 100%"></el-slider>
                    </div>
                  </div>
                  <div style="width: 100%;display:flex">
                    <div style="width: 40%;margin-left: 5%">
                      <span>物防</span>
                      <el-slider v-model="item.WF1" :max='500' style="width: 100%"></el-slider>
                    </div>
                    <div style="width: 40%;margin-left: 5%">
                      <span>特防</span>
                      <el-slider v-model="item.TF1" :max='500' style="width: 100%"></el-slider>
                    </div>
                  </div>
                  <div style="width: 100%;display:flex">
                    <div style="width: 40%;margin-left: 5%">
                      <span>特攻</span>
                      <el-slider v-model="item.AP1" :max='500' style="width: 100%"></el-slider>
                    </div>
                    <div style="width: 40%;margin-left: 5%">
                      <span>速度</span>
                      <el-slider v-model="item.SP1" :max='500' style="width: 100%"></el-slider>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>

            <el-card class="box-card">
              <div class="flexBox">
                <el-image style="width: 100px; height: 100px" lazy :src="item.imgUrl2" fit="fill">
                </el-image>
                <div style="width: 100%">
                  <div style="width: 100%;display:flex">
                    <div style="width: 40%;margin-left: 5%">
                      <span>HP</span>
                      <el-slider v-model="item.HP2" :max='500' style="width: 100%"></el-slider>
                    </div>
                    <div style="width: 40%;margin-left: 5%">
                      <span>攻击</span>
                      <el-slider v-model="item.AD2" :max='500' style="width: 100%"></el-slider>
                    </div>
                  </div>
                  <div style="width: 100%;display:flex">
                    <div style="width: 40%;margin-left: 5%">
                      <span>物防</span>
                      <el-slider v-model="item.WF2" :max='500' style="width: 100%"></el-slider>
                    </div>
                    <div style="width: 40%;margin-left: 5%">
                      <span>特防</span>
                      <el-slider v-model="item.TF2" :max='500' style="width: 100%"></el-slider>
                    </div>
                  </div>
                  <div style="width: 100%;display:flex">
                    <div style="width: 40%;margin-left: 5%">
                      <span>特攻</span>
                      <el-slider v-model="item.AP2" :max='500' style="width: 100%"></el-slider>
                    </div>
                    <div style="width: 40%;margin-left: 5%">
                      <span>速度</span>
                      <el-slider v-model="item.SP2" :max='500' style="width: 100%"></el-slider>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </li>
      </ul>
      <p v-if="loading">加载中...</p>
      <p v-if="noMore">没有更多了</p>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import 'echarts-liquidfill'
  import echarts from 'echarts'

  export default {
    name: 'Dashboard',
    computed: {},
    mounted() {
      this.drawChart();
      this.drawGauge();
      this.drawLine();
      this.getOptionData();
      this.$nextTick(function () {
        window.addEventListener('scroll', this.onScroll)
      })
    },
    data() {
      return {
        values: 0,
        value: 0,
        lineX: ['2012年', '2013年', '2014年', '2015年', '2016年', '2017年', '2018年'],
        lineValue: [
          [451, 352, 303, 534, 95, 236, 217, 225],
          [360, 545, 80, 192, 330, 580, 192, 421]
        ],
        year: 2018,
        count: -1,
        loading: false,
        loadLimit: 10,
        displayList: [],
        photoUrl: 'https://www.serebii.net/sunmoon/pokemon/',
        photoIndex: 1, // 图片索引
        photoLink: ''
      }
    },
    watch: {
      values: function (newValue, oldValue) {
        this.value = newValue * 0.01
        this.drawChart()
        this.drawGauge()
        this.drawLine()
      },
    },
    computed: {
      noMore() {
        return this.count >= this.loadLimit
      },
    },
    methods: {
      // 获取滚动条当前的位置
      getScrollTop() {
        var scrollTop = 0
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop
        } else if (document.body) {
          scrollTop = document.body.scrollTop
        }
        return scrollTop.toFixed(0)
      },
      // 获取当前可视范围的高度
      getClientHeight() {
        var clientHeight = 0
        if (document.body.clientHeight && document.documentElement.clientHeight) {
          clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
        } else {
          clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
        }
        return clientHeight
      },

      // 获取文档完整的高度
      getScrollHeight() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
      },
      // 滚动事件触发下拉加载
      onScroll() {
        let self = this
        if (this.getScrollHeight() - this.getClientHeight() - this.getScrollTop() <= 20) {
          // 加载精灵列表
          self.loading = true
          if (self.count >= self.loadLimit) {
            self.loading = false
            return;
          }
          setTimeout(() => {
            self.count += 3
            self.displayList.push({
              imgUrl1: self.photoUrl + (Array(3).join(0) + (parseInt(self.photoIndex++))).slice(-3) + '.png',
              imgUrl2: self.photoUrl + (Array(3).join(0) + (parseInt(self.photoIndex++))).slice(-3) + '.png',
              HP1: parseInt(Math.random() * 500),
              HP2: parseInt(Math.random() * 500),
              AD1: parseInt(Math.random() * 500),
              AD2: parseInt(Math.random() * 500),
              WF1: parseInt(Math.random() * 500),
              WF2: parseInt(Math.random() * 500),
              TF1: parseInt(Math.random() * 500),
              TF2: parseInt(Math.random() * 500),
              SP1: parseInt(Math.random() * 500),
              SP2: parseInt(Math.random() * 500),
              AP1: parseInt(Math.random() * 500),
              AP2: parseInt(Math.random() * 500),
              key: Math.random()
            })
            self.displayList.push({
              imgUrl1: self.photoUrl + (Array(3).join(0) + (parseInt(self.photoIndex++))).slice(-3) + '.png',
              imgUrl2: self.photoUrl + (Array(3).join(0) + (parseInt(self.photoIndex++))).slice(-3) + '.png',
              HP1: parseInt(Math.random() * 500),
              HP2: parseInt(Math.random() * 500),
              AD1: parseInt(Math.random() * 500),
              AD2: parseInt(Math.random() * 500),
              WF1: parseInt(Math.random() * 500),
              WF2: parseInt(Math.random() * 500),
              TF1: parseInt(Math.random() * 500),
              TF2: parseInt(Math.random() * 500),
              SP1: parseInt(Math.random() * 500),
              SP2: parseInt(Math.random() * 500),
              AP1: parseInt(Math.random() * 500),
              AP2: parseInt(Math.random() * 500),
              key: Math.random()
            })
            self.loading = false
          }, 1000)
        }
      },

      drawChart() {
        let self = this
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById("main"));

        let data = []
        data.push(self.value)
        data.push(self.value)
        data.push(self.value)
        data.push(self.value)

        let option = {
          backgroundColor: '#1b2735',
          title: {
            text: '心动指数',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 25,
              color: 'rgb(97, 142, 205)'
            }
          },
          series: [{
            type: 'liquidFill',
            radius: '80%',
            data: data,
            backgroundStyle: {
              borderWidth: 5,
              borderColor: 'rgb(255,0,255,0.9)',
              color: 'rgb(255,0,255,0.01)'
            },
            label: {
              normal: {
                formatter: (self.value * 100).toFixed(2) + '%',
                textStyle: {
                  fontSize: 50
                }
              }
            }
          }]
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      drawGauge() {
        let self = this
        let myChart = this.$echarts.init(document.getElementById("gauge"));

        let option = {
          tooltip: {
            formatter: "{a} <br/>{b} : {c}%"
          },
          toolbox: {
            feature: {
              restore: {},
              saveAsImage: {}
            }
          },
          series: [{
            name: '心率',
            type: 'gauge',
            detail: {
              formatter: '{value}%'
            },
            data: [{
              value: 50,
              name: '心动指数'
            }]
          }]
        };
        option.series[0].data[0].value = self.values
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },

      getOptionData() {
        let self = this
        let timeOut = setInterval(function () {
          self.values = (Math.random() * 100).toFixed(2) - 0
          self.lineX.shift();
          self.lineX.push(++self.year + '年')
          self.lineValue[0].shift();
          self.lineValue[0].push(parseInt(Math.random() * 700))
          self.lineValue[1].shift()
          self.lineValue[1].push(parseInt(Math.random() * 700))
        }, 2000);
        setTimeout(() => {
          window.clearInterval(timeOut)
        }, 2000 * 30 * 2)
      },

      drawLine() {
        let self = this
        let myChart = this.$echarts.init(document.getElementById("line"));

        var charts = {
          unit: '户数',
          names: ['新增户数', '注销户数'],
          lineX: self.lineX,
          lineValue: self.lineValue

        }
        var color = ['rgba(23, 255, 243', 'rgba(119,61,190']
        var lineY = []

        for (var i = 0; i < charts.names.length; i++) {
          var x = i
          if (x > color.length - 1) {
            x = color.length - 1
          }
          var data = {
            name: charts.names[i],
            type: 'line',
            color: color[x] + ')',
            smooth: true,
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: color[x] + ', 0.3)'
                }, {
                  offset: 0.8,
                  color: color[x] + ', 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            symbol: 'circle',
            symbolSize: 5,
            data: charts.lineValue[i]
          }
          lineY.push(data)
        }

        lineY[0].markLine = {
          silent: true,
          data: [{
            yAxis: 5
          }, {
            yAxis: 100
          }, {
            yAxis: 200
          }, {
            yAxis: 300
          }, {
            yAxis: 400
          }]
        }
        var option = {
          backgroundColor: '#0d235e',
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: charts.names,
            textStyle: {
              fontSize: 12,
              color: 'rgb(0,253,255,0.6)'
            },
            right: '4%'
          },
          grid: {
            top: '14%',
            left: '4%',
            right: '4%',
            bottom: '12%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: charts.lineX,
            axisLabel: {
              textStyle: {
                color: 'rgb(0,253,255,0.6)'
              },
              formatter: function (params) {
                return params.split(' ')[0]
              }
            }
          },
          yAxis: {
            name: charts.unit,
            type: 'value',
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: 'rgb(0,253,255,0.6)'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgb(23,255,243,0.3)'
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgb(0,253,255,0.6)'
              }
            }
          },
          series: lineY
        }

        setInterval(() => {
          myChart.setOption({
            legend: {
              selected: {
                '出口': false,
                '入口': false
              }
            }
          })
          myChart.setOption({
            legend: {
              selected: {
                '出口': true,
                '入口': true
              }
            }
          })
        }, 10000)


        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
    },


  }

</script>

<style lang="scss" scoped>
  ul {
    padding: 0px;

    li {
      list-style: none;
    }
  }

  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }

  .flexBox {
    display: flex;
    justify-items: center;
    align-items: center;
  }

  .box-card {
    width: 100%;
    margin: 10px;
  }

  .card-div {
    margin: 5px auto
  }

</style>
