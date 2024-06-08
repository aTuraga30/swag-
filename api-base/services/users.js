// These are the functions that allow the creation, update, and deletion of a user

// Requires the helpers, database config
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

// This function selects all the data from the current database and displays it
async function getMultiple(page = 1){
  //const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    //`SELECT id, name, age, email, profile_image_path FROM users LIMIT ${offset},${config.listPerPage}`
    `SELECT id, name, age, email, profile_image_path FROM users`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}
/*
async function register(user) {
  const result = await db.query(
    `INSERT INTO users (profile_image_path) VALUES ('${user.profileImagePath}')`
  );

  let message = "Error in registering the user picture";

  if (result.affectedRows) {
    message = "User picture registered!"
  }

  return {message};
}
*/

async function create(user, profileImagePath) {
  user.profileImagePath = profileImagePath;
  console.log(user.profileImagePath);
  console.log(profileImagePath);
  
  const result = await db.query(
    `INSERT INTO users (name, age, email, profile_image_path) VALUES ('${user.name}', '${user.age}', '${user.email}', '${user.profileImagePath}')`
  );

  let message = 'Error in creating users';

  if (result.affectedRows) {
    message = 'Users added successfully';
    //message = `${user.name} added successfully`;
  }

  return {message};
}
/*
// Creates a new user with the specified fields --- ORIGINAL
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
*/

// Updates a current existing user with the specified fields
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

// Deletes a user from the database
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

async function register(user) {
  const result = await db.query(
    `INSERT INTO users (profile_image_path) VALUES ('${user.profileImagePath}')`
  );

  let message = "Error in registering the user picture";

  if (result.affectedRows) {
    message = "User picture registered!"
  }

  return {message};
}

// Exports all of the "modules", bascially all of the functions
module.exports = {
  getMultiple, 
  create, 
  update, 
  remove, 
  register
}