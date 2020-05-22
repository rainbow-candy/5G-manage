<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="500px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号：" prop="username">
          <el-input v-model="ruleForm.username" :readonly="this.type === 'updata'"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password1">
          <el-input v-model="ruleForm.password1"></el-input>
        </el-form-item>
        <el-form-item label="微信群名：">
          <el-input v-model="ruleForm.wx_group"></el-input>
        </el-form-item>
        <el-form-item label="微信号：">
          <el-input v-model="ruleForm.wx_num"></el-input>
        </el-form-item>
        <el-form-item label="抖音号：">
          <el-input v-model="ruleForm.dy_num"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="ruleForm.phone_num"></el-input>
        </el-form-item>
        <el-form-item label="结束时间：" prop="expire">
          <el-date-picker
            v-model="ruleForm.expire"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
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
        wx_group: '',
        wx_num: '',
        dy_num: '',
        phone_num: '',
        expire: '',
        conf_stats: ''
      },
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password1: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        expire: [{ required: true, message: '请选择结束时间', trigger: 'blur' }]
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
      this.ruleForm.password = crypto.encryptByDES(this.ruleForm.password1);
      delete this.ruleForm.password1;
      wdsbServer.addUser(this.ruleForm).then(res => {
        if (res.status === 201) {
          this.$message.success('新增成功！');
          this.dialogVisible = false;
          this.$parent.close();
        }
      }).catch(error => {
        this.$message.error(error.request.response);
      })
    },
    update () {
      const url = 'api/user/modify/' + this.ruleForm.id + '/';
      this.ruleForm.password = crypto.encryptByDES(this.ruleForm.password1);
      delete this.ruleForm.password1;
      wdsbServer.updateUser(url, this.ruleForm).then(res => {
        if (res.status === 200) {
          this.$message.success('修改成功！');
          this.dialogVisible = false;
          this.$parent.close();
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
          password1: '',
          wx_group: '',
          wx_num: '',
          dy_num: '',
          phone_num: '',
          expire: '',
          conf_stats: '1'
        }
        this.title = '新增用户账号信息';
      } else {
        this.ruleForm = Object.assign({}, row);
        this.title = '修改用户账号信息';
      }
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 100%;
}
</style>
