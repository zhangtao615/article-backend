const env = process.env.NODE_ENV // 环境参数

let MYSQL_CONFIG
let REDIS_CONFIG

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

  // redis
  REDIS_CONFIG = {
    port: 6379,
    host: '127.0.0.1'
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

  // redis
  REDIS_CONFIG = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG
}