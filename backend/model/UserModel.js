const {UserSchema} = require("../schema/UserSchema");
const {model} = require("mongoose");

const UserModel = new model("user", UserSchema);

module.exports = {UserModel};