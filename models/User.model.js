const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: [true, 'Password is required.']
  },

  fullName: {
    type: String,
  },

  imageProfile: {
    type: String,
    default: "https://media.elliotfern.com/img/default_profile.png"
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  lang: {
    type: String,
    enum: ["en", "es", "ca", "it", "fr"],
    default: "en",
  },

  savedCourses: [
    {
      type: String,
    },
  ],

  savedLessons: [
    {
      type: String,
    },
  ],

},

  {
    timestamps: true
  },
);

const User = model("User", userSchema);

module.exports = User;
