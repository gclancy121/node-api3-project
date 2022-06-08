const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
// The middleware functions also need to be required
const {logger, validateUserId, validatePost, validateUser, uniqueUsername} = require('../middleware/middleware');

const router = express.Router();

router.get('/', logger, (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get().then(result => {
    res.status(200).json(result);
  })
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.validUser);
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post('/', validateUser, uniqueUsername, (req, res, next) => {
  Users.insert(req.newUser).then(result => {
    res.status(201).json(result);
  }).catch(error => {next(error)});
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
 Users.update(req.validUser.id, req.newUser).then(result => {
   res.status(200).json(result);
 });
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', validateUserId, (req, res) => {
Users.remove(req.validUser.id).then(() => {
  res.status(200).json(req.validUser);
})
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;