<template>
    <div class="login_container" style="text-align: center;">
        <img src="../assets/imgs/left-back.png" alt="" class="left-back">
        <img src="../assets/imgs/right-back.png" alt="" class="right-back">
        <div class="content">
          <img src="../assets/imgs/newlogo.png" alt="" style="margin-top: 10%;width: 200px">
          <h1 class="title">后台管理系统</h1>
          <!-- 登录表单区域 -->
          <el-form :model="loginForm" label-width="0px" class="login_form" :rules="rules" ref="loginFormRef">
              <el-form-item prop="username">
                  <el-input placeholder="请输入账号" prefix-icon="iconfont icon-user" v-model="loginForm.username" @keyup.enter.native="onSubmit"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                  <el-input placeholder="请输入密码" prefix-icon="iconfont icon-3702mima" v-model="loginForm.password" type="password" @keyup.enter.native="onSubmit" show-password></el-input>
              </el-form-item>
              <el-row class="btns">
                  <el-button type="primary" @click="onSubmit">登录</el-button>
                  <el-button  type="info" @click="resetLoginForm">重置</el-button>
              </el-row>
          </el-form>
        </div>
    </div>
</template>

<script>
import { crypto } from '@/utils/crypto.js';
import loginServer from '@/api/login-server.js';
import { App } from '@/utils/auth';
import jwtDecode from 'jwt-decode'

export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loading: false,
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },

    // 提交
    onSubmit () {
      this.$refs.loginFormRef.validate((valid) => {
        this.loading = true;
        if (valid) {
          const params = {
            username: this.loginForm.username,
            password: crypto.encryptByDES(this.loginForm.password)
          };
          loginServer
            .login(params)
            .then((res) => {
              if (res.data.token) {
                const parameter = {
                  token: 'JWT ' + res.data.token
                };
                window.sessionStorage.setItem('token', parameter.token);
                location.reload();
                App.setToken(jwtDecode(parameter.token));
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.error
                });
              }
            }).catch(error => {
              console.log(error.request)
              this.$message({
                type: 'error',
                message: error.request.response
              });
            })
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #fff;
  height: 100%;
  .left-back {
    position: absolute;
    left: 0;
    height: 100%;
  }
  .right-back {
    position: absolute;
    right: 0;
    height: 100%;
  }
}
.title {
  font-size: 53px;
  color: #97392c;
  letter-spacing: 5px;
  margin-top: 20px;
}
.login_form {
  width: 450px;
  background-color: #fff;
  border-radius: 3px;
  position: relative;
  left: 50%;
  top: 150px;
  transform: translate(-50%, -50%);
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: center;
  /deep/ .el-button {
    width: 50%;
  }
  /deep/ .el-button--primary {
    background-color: #97392b;
    border-color: #97392b;
  }
}
</style>
