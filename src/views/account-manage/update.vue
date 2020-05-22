<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="500px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号：" prop="username">
          <el-input v-model="ruleForm.username" :readonly="this.type === 'updata'"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password1">
          <el-input v-model="ruleForm.password1"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="import" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { crypto } from '@/utils/crypto.js';
import wdsbServer from '@/api/user-server.js';

export default {
  name: 'updataModal',
  data () {
    return {
      dialogVisible: false,
      ruleForm: {
        username: '',
        password1: '',
        is_vip: 1
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password1: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      type: '',
      title: ''
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.type === 'add') {
            this.add();
          } else {
            this.update();
          }
        }
      })
    },
    add () {
      this.ruleForm.password = crypto.encryptByDES(this.ruleForm.password1)
      delete this.ruleForm.password1;
      wdsbServer.addAccount(this.ruleForm).then(res => {
        if (res.status === 201) {
          this.$message.success('新增成功！');
          this.dialogVisible = false;
          this.$parent.getData();
        }
      }).catch(error => {
        this.$message.error(error.request.response);
      })
    },
    update () {
      const url = 'api/user/modify/' + this.ruleForm.id + '/';
      const parms = {
        id: this.ruleForm.id,
        password: crypto.encryptByDES(this.ruleForm.password1)
      }
      wdsbServer.updateAccount(url, parms).then(res => {
        if (res.status === 200) {
          this.$message.success('修改成功！');
          this.dialogVisible = false;
          this.$parent.getData();
        }
      }).catch(error => {
        this.$message.error(error.request.response);
      })
    },
    open (type, row) {
      this.type = type;
      if (type === 'add') {
        this.ruleForm = {
          username: '',
          password: '',
          is_vip: 1
        }
        this.title = '新增客服账号信息';
      } else {
        this.ruleForm = Object.assign({}, row);
        this.title = '修改客服账号信息';
      }
      this.dialogVisible = true
    }
  }
}
</script>

<style>
</style>
