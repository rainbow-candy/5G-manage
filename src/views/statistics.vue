<template>
  <div style="height: 100%;">
    <el-card class="box-card">
      <div class="title">功能点击量</div>
      <ve-histogram  :data="clickData" :extend="chartExtend" :legend-visible="false" height="100%"></ve-histogram>
    </el-card>
    <el-card class="box-card twoStatic">
      <div class="title">客户使用量</div>
      <ve-histogram  :data="execData" :extend="chartExtend" :legend-visible="false" height="100%"></ve-histogram>
    </el-card>
  </div>
</template>

<script>
import wdsbServer from '@/api/user-server.js';

export default {
  data () {
    this.chartExtend = {
      // y轴宽度
      series (v) {
        v.forEach(i => {
          i.barWidth = 40
        })
        return v
      },
      color: ['#7cd1f2'],
      // x轴字体大小
      xAxis: {
        axisLabel: {
          fontSize: 15
        }
      },
      // 设置条形图在画布中的位置
      grid: {
        bottom: 30,
        top: 20
      }
    }
    this.xAxis = [
      {
        axisLabel: {
          show: true,
          textStyle: {
            fontSize: 18
          }
        }
      }
    ];
    return {
      clickData: {
        columns: ['task_num', '点击量'],
        rows: []
      },
      execData: {
        columns: ['task_num', '使用量'],
        rows: []
      },
      data: []
    }
  },
  methods: {
    getData () {
      const _this = this;
      wdsbServer.getStatistics().then(res => {
        if (res.status === 200) {
          res.data.map((value) => {
            this.data.push({ 'task_num': value.task_num, '点击量': value.click_num, '使用量': value.exec_num })
          });
          this.clickData.rows = this.data;
          this.execData.rows = this.data;
        }
      }, function () {
        _this.$message({
          type: 'error',
          message: '服务异常！'
        });
      })
    }
  },
  mounted () {
    this.getData();
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 20px;
  text-align: center;
  font-weight: bolder;
}
.box-card {
  height: 47%;
}
.twoStatic {
  margin-top: 2%;
}
/deep/ .el-card__body {
  height: 100%;
  padding: 20px 20px 0;
  margin-bottom: -20px;
}
</style>
