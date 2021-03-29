const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

// 注册
const reg = async (username, password) => {
  // 使用escape后拼接sql语句需要加引号
  let userName = escape(username)
  // 生成加密密码
  let passWord = escape(password)
  const sql = `
    insert into t_users (username, password, admin) values (${userName}, ${passWord}, false);
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
     select username, id from t_users where username=${userName} and password=${passWord};
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
const handleCommit = async (author, content, blogId, createTime) => {
  let con = escape(content)
  const sql = `insert into t_comments (author, content, blogId, createTime) values ('${author}', ${con}, ${blogId}, ${createTime});`
  const rows = await exec(sql)
  return rows || {}
}
module.exports = {
  reg,
  login,
  checkName,
  handleCommit
}