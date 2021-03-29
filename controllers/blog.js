const { exec } = require('../db/mysql')

const getBLogList = async (keyword) => {
  let sql = `select pic, title, tag, description, createTime, id  from t_blogs where 1=1 `
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createTime desc;`
  return await exec(sql)
}

const getBLogDetail = async (id) => {
  let sql = `select * from t_blogs where id=${id}`
  return await exec(sql)
}

const createBlog = async (title, content, tag, createTime, description, pic) => {
  let sql = `insert into t_blogs (title, content, tag, createTime, description, pic) values ('${title}', '${content}', '${tag}', '${createTime}', '${description}', '${pic}');`
  return await exec(sql)
}
module.exports = {
  getBLogList,
  getBLogDetail,
  createBlog
}