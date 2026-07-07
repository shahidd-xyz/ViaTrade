const { Schema } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = { UserSchema };
