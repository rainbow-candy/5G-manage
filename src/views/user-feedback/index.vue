<template>
  <div style="height: 100%">
    <div style="margin-bottom: 15px;text-align: right;">
      <el-button class="import" @click="deleteAll" :disabled="selectTableRow.length === 0">批量删除</el-button>
    </div>
    <base-table :columns="tableColumns" :data="tableData" height="66vh" selection @selection-change="selectionRow">
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
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
  </div>
</template>

<script>
import wdsbServer from '@/api/user-server.js';

export default {
  data () {
    return {
      tableColumns: [
        {
          prop: 'username',
          label: '用户账号',
          width: '200'
        },
        {
          prop: 'content',
          label: '反馈内容'
        }
      ],
      tableData: [],
      total: 0,
      current: 1,
      selectTableRow: [],
      page_size: 10
    }
  },
  methods: {
    // 表格复选框选中
    selectionRow (data) {
      this.selectTableRow = data;
    },
    getList (page) {
      wdsbServer.feedback({ page: page, page_size: this.page_size }).then(res => {
        if (res.status === 200) {
          res.data.results.forEach((t) => {
            if (t.user) {
              t.username = t.user.username;
            }
          });
          this.tableData = res.data.results;
          this.total = res.data.count;
        }
      }).catch(error => {
        console.log(error)
        // this.$message.error(error.request.response);
      })
    },
    // 分页
    handleSizeChange (val) {
      this.page_size = val;
      this.getList(this.val);
    },
    handleCurrentChange (val) {
      this.current = val;
      this.$refs.yhTable.handleCurrentChange();
      this.getData(val);
    },
    // 批量删除
    deleteAll () {
      var ids = '';
      this.selectTableRow.forEach(t => {
        ids += t.id + ',';
      });
      ids = ids.substr(0, ids.length - 1);
      this.deleteRow({ id: ids });
    },
    // 删除
    deleteRow (row) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        wdsbServer.deleteFeedback({ id_list: row.id }).then(res => {
          if (res.status === 204) {
            this.$message.success('删除成功！');
            this.getList();
          }
        }).catch(error => {
          this.$message.error(error.request.response);
        })
      })
    }
  },
  mounted () {
    this.getList(1);
  }
}
</script>

<style>

</style>
