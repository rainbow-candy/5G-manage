<template>
  <div>
    <div style="margin-bottom: 15px;text-align: right;">
      <el-button class="import" @click="importFile">导出excel</el-button>
    </div>
    <base-table :columns="tableColumns" :data="tableData" height="66vh">
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit-outline" v-if="scope.row.conf_stats === 1" @click="reviewRow(scope.row)">复核</el-button>
        </template>
      </el-table-column>
    </base-table>
    <el-pagination
    ref="yhTable"
    class="xzyh-pagenation"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    :page-sizes="[10, 20, 50]"
    :page-size="10"
    layout="prev, pager, next, total, sizes, jumper"
    :total="total"
    :current-page="current"
    ></el-pagination>
    <reviewModal ref="reviewModal"></reviewModal>
  </div>
</template>

<script>
import reviewModal from './review';
import wdsbServer from '@/api/user-server.js';

export default {
  components: { reviewModal },
  data () {
    return {
      tableColumns: [
        {
          prop: 'username1',
          label: '客服账号',
          filter: true,
          filterData: []
        },
        {
          prop: 'wx_group',
          label: '微信群名'
        },
        {
          prop: 'wx_num',
          label: '微信号'
        },
        {
          prop: 'username',
          label: '用户账号',
          filter: true,
          filterData: []
        },
        {
          prop: 'date_joined',
          label: '创建时间',
          sortable: true,
          type: 'time'
        },
        {
          prop: 'pz_time',
          label: '批准时间',
          sortable: true
        },
        {
          prop: 'expire',
          label: '结束时间',
          sortable: true
        },
        {
          prop: 'expire_name',
          label: '状态',
          sortable: true
        },
        {
          prop: 'conf_name',
          label: '批准状态',
          sortable: true
        }
      ],
      tableData: [],
      current: 1,
      total: 0,
      page_size: 10
    }
  },
  methods: {
    importFile () {
      console.log('导出');
    },
    reviewRow (row) {
      this.$refs.reviewModal.open(row.id);
    },
    getData (page) {
      wdsbServer.getAccount({ cus: 1, page: page, page_size: this.page_size }).then(res => {
        if (res.status === 200) {
          if (res.data.results.length > 0) {
            const datas = res.data.results;
            this.total = res.data.count;
            datas.forEach((t) => {
              switch (t.conf_stats) {
                case 0:
                  t.conf_name = '申请成功';
                  break;
                case 1:
                  t.conf_name = '正在申请';
                  break;
                case 3:
                  t.conf_name = '申请失败';
                  break;
              }
              switch (t.expire_name) {
                case 'true':
                  t.conf_name = '无效';
                  break;
                case 'false':
                  t.conf_name = '有效';
                  break;
              }
              t.key = t.id;
            });
            this.tableData = datas;
            this.tableColumns[0].filterData = this.getFilter(this.tableData, 'username1');
            this.tableColumns[3].filterData = this.getFilter(this.tableData, 'username');
          } else {
            this.total = 0;
            this.tableData = []
          }
        }
      }).catch(error => {
        this.$message.error(error.request.response);
      })
    },
    // 分页
    handleSizeChange (val) {
      this.page_size = val;
      this.getData(this.val);
    },
    handleCurrentChange (val) {
      this.current = val;
      this.getData(val);
    },
    close () {
      this.current = 1;
      this.getData();
    },
    // 筛选
    getFilter (Arr, key) {
      var hash = {};
      Arr = Arr.reduce((arr, current) => {
        if (current[key]) {
          if (hash[current[key]] === undefined) {
            hash[current[key]] = true;
            arr.push(current);
          }
        }
        return arr;
      }, []);
      var Arr1 = [];
      Arr.forEach((item, index) => {
        Arr1.push(
          Object.assign({}, item, { text: item[key], value: item[key] })
        )
      })
      return Arr1;
    }
  },
  mounted () {
    this.getData(1);
  }
}
</script>

<style lang="less" scoped>

</style>
