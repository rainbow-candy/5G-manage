<template>
  <div>
    <!-- <el-card class="box-card"> -->
      <base-table :columns="tableColumns" :data="tableData" height="66vh">
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit-outline" @click="supdataRow(scope.row)">修改</el-button>
          <el-button type="text" icon="el-icon-circle-check" @click="deleteRow(scope.row)">确认</el-button>
        </template>
      </el-table-column></base-table>
    <!-- </el-card> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableColumns: [
        {
          prop: 'name',
          label: '子账号'
        },
        {
          prop: 'password',
          label: '密码'
        },
        {
          prop: 'stats',
          label: '状态',
          sortable: true
        }
      ],
      tableData: [{
        name: 'heihezi',
        password: '123',
        stats: '正在执行'
      }]
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
