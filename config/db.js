const env = process.env.NODE_ENV // 环境参数

let MYSQL_CONFIG

// 开发环境
if (env === 'dev') {
  // mysql
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'blog'
  }

}
// 生产环境
if (env === 'production') {
  // mysql
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'blog'
  }
}

module.exports = {
  MYSQL_CONFIG
}