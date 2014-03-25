module.exports = function(settings) {
  var mongoose, userSchema;
  mongoose = require('mongoose');
  userSchema = mongoose.Schema({
    id: 'Number',
    name: 'String',
    username: {
      type: String,
      lowercase: true,
      trim: true
    },
    url: 'String',
    gender: 'String',
    location: 'String',
    occupation: 'String',
    education: 'String',
    email: 'String',
    quotes: 'String',
    bio: 'String',
    birthday: 'Date',
    created: {
      type: Date,
      "default": Date.now
    },
    hidden: {
      type: Boolean,
      "default": false
    },
    random: {
      type: [Number],
      index: '2d',
      "default": function() {
        return [Math.random(), Math.random()];
      }
    }
  });
  mongoose.model('users', userSchema);
  return mongoose.connect('localhost', settings.db);
};
