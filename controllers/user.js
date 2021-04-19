const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

// 注册
const reg = async (username, password, avatar) => {
  // 使用escape后拼接sql语句需要加引号
  let userName = escape(username)
  // 生成加密密码
  let passWord = escape(password)
  const sql = `
    insert into t_users (username, password, admin, avatar) values (${userName}, ${passWord}, false,"${avatar}");
  `
  const rows = await exec(sql)
  return rows[0] || {}
}
// 登录
const login = async (username, password) => {
   // 使用escape后拼接sql语句需要加引号
   let userName = escape(username)
   let passWord = escape(password)
   const sql = `
     select username, id, admin, avatar from t_users where username=${userName} and password=${passWord};
   `
   const rows = await exec(sql)
   return rows[0] || {}
}
// 检查用户名是否被注册
const checkName = async (username) => {
  let userName = escape(username)
  const sql = `
     select username from t_users where username=${userName};
   `
   const rows = await exec(sql)
   return rows[0] || {}
}
// 处理评论
const handleCommit = async (author, content, blogId, avatar) => {
  let con = escape(content)
  const sql = `insert into t_comments (author, content, blogId, avatar) values ('${author}', ${con}, ${blogId}, '${avatar}');`
  const rows = await exec(sql)
  return rows || {}
}
const getComment = async (id) => {
  let sql = `select * from t_comments where blogId=${id} order by id`
  const rows = await exec(sql)
  return rows || []
}
const changeUserInfo = async (id, name, avatar) => {
  let sql = `update t_users set username="${name}", avatar="${avatar}" where id=${id};`
  const rows = await exec(sql)
  return rows
}
const getCurrentUser = async (name) => {
  let sql = `select username, id, admin, avatar from t_users where username="${name}";`
  const rows = await exec(sql)
  return rows[0] || {}
}
module.exports = {
  reg,
  login,
  checkName,
  handleCommit,
  getComment,
  changeUserInfo,
  getCurrentUser
}