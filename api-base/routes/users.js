/* 
This file defines all of the routes, not the functions for the database, 
but the actual CRUD uses of the API and what they correspond to.
*/

const express = require('express');
const router = express.Router();
const users = require('../services/users');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadPath)){
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// This defines what happens when we make a "GET" request to the API. It will 
// call the "getMultiple" function
router.get('/', async function(req, res, next) {
  try {
    res.json(await users.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

// This defines what happens when we make a "POST" request to the API. It will 
// call the "create" function from the "services/users" function. 
router.post('/', upload.single("profileImage"), async function(req, res, next) {
    try {
      //const { name, age, email } = req.body;
      const profileImagePath = req.file ? req.file.path : null;

      console.log(profileImagePath);

      res.json(await users.create(req.body, profileImagePath));
    } catch (err) {
      console.error(`Error while adding user`, err.message);
      next(err);
    }
});

/*
router.post('/register', upload.single("profileImage"), async function(req, res, next) {
  try {
    const profileImagePath = req.file ? req.file.path : null
    res.json(await users.register(profileImagePath));
  } catch (err) {
    console.error(`Error while registering user picture`, err.message);
    next(err);
  }
});
*/

// This defines what happens when we try to send a "PUT" request, or update the 
// information of a current user. This will call the "services/users" "update" function.
router.put('/:id', async function(req, res, next) {
    try {
      res.json(await users.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating user`, err.message);
      next(err);
    }
});

// This function defines what happens when we try to send a "DELETE" request with a 
// specific ID. This will call the "services/users" "delete" function.
router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await users.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting user`, err.message);
      next(err);
    }
});

// Exports all these modules with express.
module.exports = router;