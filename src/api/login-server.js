import { fetch } from '@/apiconfig/index'

const loginServer = {
  /*
   * 登录
   * params 登录参数
   */
  login (params) {
    return fetch('api/user/backend/', 'post', params)
  },
  /*
   * 退出登录
   * params 登录参数
   */
  logout (params) {
    return fetch('user/logout/', 'post', params)
  }
};

export default loginServer;
