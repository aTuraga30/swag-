const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, age, email FROM users LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(user) {
    const result = await db.query(
      `INSERT INTO users (name, age, email) VALUES ('${user.name}', '${user.age}', '${user.email}')`
    );
  
    let message = 'Error in creating users';
  
    if (result.affectedRows) {
      message = 'Users added successfully';
    }
  
    return {message};
}

async function update(id, user) {
    const result = await db.query(
      `UPDATE users SET name="${user.name}", age="${user.age}", email="${user.email}" WHERE id=${id}` 
    );
  
    let message = 'Error in updating user';
  
    if (result.affectedRows) {
      message = 'User updated successfully';
    }
  
    return {message};
}

async function remove(id) {
    const result = await db.query(
      `DELETE FROM users WHERE id=${id}`
    );
  
    let message = 'Error in deleting user';
  
    if (result.affectedRows) {
      message = 'User deleted successfully';
    }
  
    return {message};
}

module.exports = {
  getMultiple, 
  create, 
  update
}