const bcrypt = require("bcrypt");
const salt = process.env.saltRounds;
const privateKey=process.env.privateKey
const { User } = require("../model/user");
var jwt = require("jsonwebtoken");
// var decoded = jwt.verify(token, "shhhhh");
const verifyUser = async (req, res, next) => {
  const { email, username, password } = req.body;
  try {
    if (email) {
      let user = await User.findOne({ email });
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          var token = jwt.sign({ user }, "shhhhh");
          req.body.token = token;
          next();
        } else {
          res.status(500).json("user not authorized !");
        }
      });
    } else {
      let user = await User.findOne({ username });
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          var token = jwt.sign({ user }, privateKey);
          req.body.token = token;
          next();
        } else {
          res.status(500).json("user not authorized !");
        }
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Verify the user or not in backend

const UserVerifyMiddleware = async (req, res,next) => {
  const { auth } = req.headers;
  
  const valid_auth = auth.split(" ")[1];

  jwt.verify(valid_auth, privateKey, function (err, decoded) {
    if (err) {
      res.status(500).json({ msg: "error to Verify User !" });
    }
    if (decoded) {
      req.body.user_id = decoded.user._id;
      next();
    }
  });
};

module.exports = { verifyUser, UserVerifyMiddleware };
