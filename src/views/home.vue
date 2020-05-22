<template>
  <el-container>
  <el-header>
    <div class="logout">
      <i class="el-icon-switch-button"></i>
      <span @click="logout">退出登录</span>
    </div>
  </el-header>
  <img class="logo" src="@/assets/imgs/logo.png" />
  <el-container>
    <el-aside style="width: 200px;padding-top: 85px;">
      <!-- <div class="toggle-button" @click="toggleCollapse">|||</div> -->
      <el-menu background-color="#97392b" text-color="#fff" active-text-color="#409BFF"
      :collapse-transition="false" router unique-opened :default-active="$router.history.current.fullPath">
        <el-menu-item index="statistics" class="statis">
          <i class="el-icon-menu"></i>
          <span>首页</span>
        </el-menu-item>
        <el-submenu :index="index + ''" v-for="(menu, index) in menusList" :key="index">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{menu.authName}}</span>
          </template>
          <el-menu-item :index="chils.path" :key="index" v-for="(chils, index) in menu.children">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>{{chils.authName}}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import { App } from '@/utils/auth';

export default {
  data () {
    return {
      menusList: [{
        authName: '客服入口',
        children: [{
          path: '/userAccount-manage',
          authName: '用户账号管理'
        }]
      }, {
        authName: '超级管理员入口',
        children: [{
          path: '/account-manage',
          authName: '客服账号管理'
        }, {
          path: '/user-information',
          authName: '用户信息'
        }]
      }, {
        authName: '用户反馈',
        children: [{
          path: '/user-feedback',
          authName: '用户反馈'
        }]
      }]
    }
  },
  created () {
    // this.getMenuList()
    console.log(this.$router.his);
  },
  methods: {
    logout () {
      window.sessionStorage.clear();
      this.$router.push('/login')
      App.clear();
      // userAuth.clear();
    },
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menusList = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.logo {
  position: absolute;
  height: 100px;
  left: 37px;
  top: 18px;
}
.el-header{
  background-color: #97392b;
  color: #fff;
  .logout {
    height: 60px;
    cursor: pointer;
    font-size: 15px;
    line-height: 60px;
    position: absolute;
    right: 40px;
    > span {
      padding-left: 10px;
    }
  }
}
.el-aside{
  background-color: #97392b;
  .statis {
    border-top: 1px solid #ccc;
    .el-icon-menu {
      color: #fff;
    }
  }
  .el-menu {
    border-right: none;
    .el-submenu {
      border-top: 1px solid #ccc;
      .el-submenu__title {
        height: 50px;
        line-height: 50px;
      }
      /deep/.el-submenu__title i {
        color: #fff;
      }
    }
    .el-submenu:last-child {
      border-bottom: 1px solid #ccc;
    }
  }
}
.el-main{
  background-color: #fff;
}
.el-container{
  height: 100%;
}
.iconfont{
  margin-right: 10px;
}
.el-menu {
    border-right: none;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
