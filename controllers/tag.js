const { exec } = require('../db/mysql')

const getTagList = async () => {
  let sql = 'select * from t_tags'
  return await exec(sql)
}

const createTag = async (val) => {
  let sql = `INSERT INTO t_tags (tag) VALUES ('${val}')`
  const insertData = await exec(sql)
  return {
    id: insertData.insertId
  }
}
module.exports = {
  getTagList,
  createTag
}