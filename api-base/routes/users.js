const express = require('express');
const router = express.Router();
const users = require('../services/users');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await users.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
    try {
      res.json(await users.create(req.body));
    } catch (err) {
      console.error(`Error while adding user`, err.message);
      next(err);
    }
});

router.put('/:id', async function(req, res, next) {
    try {
      res.json(await users.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating user`, err.message);
      next(err);
    }
});

/* DELETE programming language */
router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await users.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting user`, err.message);
      next(err);
    }
});

module.exports = router;