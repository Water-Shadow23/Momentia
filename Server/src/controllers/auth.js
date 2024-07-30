const { register, login } = require("../services/auth");

module.exports = {
  registerController:async function (req, res) {
      const fieldData = req.body;
      try {
        const token = await register(fieldData);
        res
          .status(200)
          .json({
            code: 200,
            message: "User registered successfully",
            token: token,
          });
      } catch (err) {
        throw err;
      }
    },
 
  loginController:async function (req, res) {
      const fieldData = req.body;
      try {
        const token = await login(fieldData);
        res
          .status(200)
          .json({
            code: 200,
            message: "User logged in successfully",
            token: token,
          });
      } catch (err) {
        throw err;
      }
    }
};
