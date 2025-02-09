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
      res.status(404).json({message: "User not found"});
      return;
    }
    req.validUser = result;
    next();
  })
}

function validateUser(req, res, next) {
  const trimmed = req.body.name;
  if (typeof trimmed !== 'string' || trimmed.trim() == null || trimmed.trim() === '') {
    res.status(400).json({message: "missing required name"});
    return;
  } 
  req.newUser = {name: trimmed.trim()};
  next();
}

function uniqueUsername(req, res, next) {
Users.get().then(item => {
  item.forEach(user => {
    if(user.name === req.validName) {
      res.status(400).json({message: "user already exists"});
      return;
    }
    return;
  })
})
next();
}

function validatePost(req, res, next) {
  if(typeof req.body.text !== "string" || req.body.text.trim()=== '') {
    res.status(400).json({message: "missing required text"});
    return;
  }
  req.validPost = {text: req.body.text.trim()};
  next();
}

// do not forget to expose these functions to other modules
module.exports = {
logger,
validateUserId,
validateUser,
validatePost,
uniqueUsername,

}