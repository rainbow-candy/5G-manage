import { fetch } from '@/apiconfig/index'

const wdsbServer = {
  // 点击量
  getStatistics (params) {
    return fetch('api/task/clicknum/', 'get', params)
  },

  // 获取用户
  getUser (params) {
    return fetch('api/user/vip_modify/', 'get', params)
  },
  // 新增用户账号
  addUser (params) {
    return fetch('api/user/vip_modify/', 'post', params)
  },
  // 修改用户账号
  updateUser (url, params) {
    return fetch(url, 'patch', params)
  },

  // 获取客服账号列表
  getAccount (params) {
    return fetch('api/user/modify/', 'get', params)
  },
  // 新增客服账号
  addAccount (params) {
    return fetch('api/user/modify/', 'post', params)
  },
  // 修改客服账号
  updateAccount (url, params) {
    return fetch(url, 'patch', params)
  },
  // 删除客服账号
  deleteAccount (url, params) {
    return fetch(url, 'delete', params)
  },

  // 信息反馈
  feedback (params) {
    return fetch('api/user/feedback/', 'get', params)
  },
  // 删除信息反馈
  deleteFeedback (params) {
    return fetch('api/user/feedback/', 'post', params)
  }
};

export default wdsbServer;
