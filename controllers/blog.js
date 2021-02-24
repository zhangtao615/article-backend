const { exec } = require('../db/mysql')

const getBLogList = async (keyword) => {
  let sql = `select pic, title, wordsCount, description, readTime, id, createTime  from t_blogs where 1=1 `
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createTime desc;`
  return await exec(sql)
}

const getBLogDetail = async (id) => {
  console.log(id)
  let sql = `select * from t_blogs where id=${id}`
  return await exec(sql)
}
module.exports = {
  getBLogList,
  getBLogDetail
}