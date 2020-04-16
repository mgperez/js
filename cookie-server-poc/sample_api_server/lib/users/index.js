'use strict';

const bcrypt                = require('bcryptjs');
const User                  = require('../../models/users');
const validateLoginInput    = require('../validator/login');
const validateRegisterInput = require('../validator/register');
const jwt                   = require('jsonwebtoken');
const logger                = require('../logger').info;

//Register a new user in MongoDB
const registerUsers         =  (req, res)=> {

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      const error = 'Email already exists';
      return res.status(400).json({errors: error});
    } else {

      const newUser = new User({
        firstName         : req.body.firstName,
        lastName          : req.body.lastName,
        email             : req.body.email,
        password          : req.body.password
      });
      //Encrypt the password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          
          newUser.password = hash;
          logger.info("Storing user in database...  ")
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => {
              logger.error("Error storing user in database")
              res.status(401).json(err)
            })
        });
      });
    }
  });
}

/*Functionality for user login
 * En case of successfully login user receive a new JWT token
*/
const loginUsers = (req, res)=> {
  const { errors, isValid } = validateLoginInput(req.body);

  // Checking if headers is present
  if (!isValid) {
    return res.status(400).json(errors);
  }
  logger.info("Valid request")
  const email = req.body.email;
  const password = req.body.password;

  // Check if user exist in BBDD 
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Compare the password with pass stored in Mongo DB
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User logged correctly
        const payload = { id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
       }; // Sample key signed
        const secret  = "secretOrKey";
        // Signing the token
        const jwtBearerToken = jwt.sign(
          payload,
          secret,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              //access_token: 'Bearer ' + token
              access_token: '' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
}

module.exports = {
  registerUsers,
  loginUsers
}
