const Users = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(req.body)
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  Users.getById(req.params.id)
  .then(result => {
    if (result == null) {
      res.status(400).json({message: "User not found"});
    }
    req.validUser = result;
    next();
  })
}

function validateUser(req, res, next) {
  
}

function validatePost(req, res, next) {
}

// do not forget to expose these functions to other modules
module.exports = {
logger,
validateUserId,
validateUser,
validatePost,

}