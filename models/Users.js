const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const hashPassword = require("../helpers/hashPassword");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await hashPassword({ password: this.password });
  }
});

UserSchema.methods.comparePasswords = function (candidatePassword) {
  // console.log("--- pass", this.password);
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
