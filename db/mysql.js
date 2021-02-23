const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db')

//创建链接对象
const con = mysql.createConnection(MYSQL_CONFIG)

// 开启链接
con.connect()

// 新建执行sql的函数

const exec = (sql) => {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, res) => {
      if (err) {
        reject(err)
        return 
      }
      resolve(res)
    })
  })
  return promise
}

module.exports = {
  exec,
  escape: mysql.escape // 预防Sql注入
}
