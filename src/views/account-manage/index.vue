<template>
  <div style="height: 100%">
    <div style="margin-bottom: 15px;text-align: right;">
      <el-button class="import" @click="add">新增账号</el-button>
    </div>
    <base-table :columns="tableColumns" :data="tableData" height="66vh">
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit-outline" @click="updataRow(scope.row)">修改</el-button>
          <el-button type="text" icon="el-icon-delete" @click="deleteRow(scope.row)">删除</el-button>
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
    <updataModal ref="updataModal"></updataModal>
  </div>
</template>

<script>
import updataModal from './update';
import wdsbServer from '@/api/user-server.js';

export default {
  components: { updataModal },
  data () {
    return {
      tableColumns: [
        {
          prop: 'username',
          label: '客服名',
          filter: true,
          filterData: []
        }
        // {
        //   prop: 'stats',
        //   label: '状态',
        //   sortable: true
        // }
      ],
      tableData: [],
      current: 1,
      total: 0,
      page_size: 10
    }
  },
  methods: {
    add () {
      this.$refs.updataModal.open('add');
    },
    updataRow (row) {
      this.$refs.updataModal.open('updata', row);
      console.log('111')
    },
    // 删除
    deleteRow (row) {
      const url = 'api/user/modify/' + row.id + '/';
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        wdsbServer.deleteAccount(url).then(res => {
          if (res.status === 204) {
            this.$message.success('删除成功！');
            this.getData();
          }
        }).catch(error => {
          console.log(error.request);
          this.$message.error(error.request.response);
        })
      })
    },
    getData (page) {
      wdsbServer.getAccount({ is_vip: 1, page: page, page_size: this.page_size }).then(res => {
        if (res.status === 200) {
          this.tableData = res.data.results;
          this.total = res.data.count;
        }
      }).catch(error => {
        console.log(error.request);
        this.$message.error(error.request.response);
      })
    },
    // 分页
    handleSizeChange (val) {
      console.log(this.parms)
      this.page_size = val;
      this.getData(this.val);
    },
    handleCurrentChange (val) {
      this.current = val;
      this.getData(val);
    }
  },
  mounted () {
    this.getData(1);
  }
}
</script>

<style lang="less" scoped>
// /deep/ .el-table__row {
//   height: 52px !important;
// }
</style>
