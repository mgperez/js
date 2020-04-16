'use strict'

const express  = require('express');
const users    = require('../lib/users');
const RJson    = require('../lib/promotions');
const router   = express.Router();
const passport  = require('passport');

  /*----------------------------------------USERS OPTIONS---*/	
  //Get Options
router.get('/get/example',passport.authenticate('jwt', { session: false }), RJson.GetJsonSecured);

  //Post Options
router.post('/register', users.registerUsers);
router.post('/login', users.loginUsers);


  //DELETE Options


module.exports = router;
