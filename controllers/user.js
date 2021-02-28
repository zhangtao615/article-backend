const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const reg = async (username, password) => {
  // 使用escape后拼接sql语句需要加引号
  let userName = escape(username)
   
  // 生成加密密码
  let pwd = genPassword(password)
  pwd = escape(pwd)
  const sql = `
    insert into t_users (username, password, admin) values (${userName}, ${pwd}, 0);
  `
  const rows = await exec(sql)
  return rows[0] || {}
}

const login = async (username, password) => {
   // 使用escape后拼接sql语句需要加引号
   let userName = escape(username)
   
   // 生成加密密码
   let pwd = genPassword(password)
   pwd = escape(pwd)
   const sql = `
     select username from t_users where username=${userName} and password=${pwd};
   `
   const rows = await exec(sql)
   return rows[0] || {}
}

module.exports = {
  reg,
  login
}