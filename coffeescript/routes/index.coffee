exports.index = (req, res) ->
  res.render 'index',
    loggedin: req.user

exports.logout = (req, res) ->
  req.logout()
  res.redirect('/')

exports.loginSuccess = (req, res) ->
  res.redirect('/')

exports.loginFail = (req, res) ->
  res.redirect('/')

exports.removeAccount = (req, res) ->
  mongoose = require('mongoose')
  if !req.user
    res.redirect('/auth/facebook')
  else
    Users = mongoose.model 'users'
    Users
      .update { id: req.user },
        $set:
          hidden: true
        , ->
          res.redirect('/logout')