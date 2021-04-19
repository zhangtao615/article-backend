const { exec } = require('../db/mysql')

const getBLogList = async (keyword) => {
  let sql = `select pic, title, tag, description, createTime, id  from t_blogs where 1=1 `
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by id desc;`
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
const deleteBlog = async (id) => {
  let sql = `DELETE from t_blogs where id=${id};`
  return await exec(sql)
}
const getUserComments = async (username) => {
  let sql = `select * from t_comments where author="${username}";`
  return await exec(sql)
}
const deleteComment = async (id) => {
  let sql = `delete from t_comments where id=${id};`
  return await exec(sql)
}
module.exports = {
  getBLogList,
  getBLogDetail,
  createBlog,
  deleteBlog,
  getUserComments,
  deleteComment
}