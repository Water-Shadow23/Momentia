const { register, login } = require("../services/auth");

module.exports = {
  registerController:async function (req, res) {
      const fieldData = req.body;
      try {
        const {token,id} = await register(fieldData);
        res
          .status(200)
          .json({
            code: 200,
            message: "User registered successfully",
            token: token,
            id:id
          });
      } catch (err) {
        throw err;
      }
    },
 
  loginController:async function (req, res) {
      const fieldData = req.body;
      try {
        const {token,id} = await login(fieldData);
        res
          .status(200)
          .json({
            code: 200,
            message: "User logged in successfully",
            token: token,
            id:id
          });
      } catch (err) {
        throw err;
      }
    }
};
