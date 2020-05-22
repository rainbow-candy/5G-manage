<template>
  <el-dialog title="复核" :visible.sync="dialogVisible" width="30%">
    <div style="text-align: center;">
      <el-radio v-model="radio" label="0">审核通过</el-radio>
      <el-radio v-model="radio" label="3">审核不通过</el-radio>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button class="import" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import wdsbServer from '@/api/user-server.js'

export default {
  name: 'reviewModal',
  data () {
    return {
      dialogVisible: false,
      radio: '1',
      ruleForm: {
        fh: 1,
        fh_id: '',
        conf_stats: ''
      }
    }
  },
  methods: {
    open (id) {
      this.ruleForm.fh_id = id
      this.dialogVisible = true
    },
    submit () {
      this.ruleForm.conf_stats = this.radio;
      wdsbServer
        .addAccount(this.ruleForm)
        .then(res => {
          if (res.status === 200) {
            this.$message.success('复核成功！')
            this.dialogVisible = false
            this.$parent.close()
          }
        })
        .catch(error => {
          this.$message.error(error.request.response)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.upload-demo {
  margin-left: 10px;
}
</style>
