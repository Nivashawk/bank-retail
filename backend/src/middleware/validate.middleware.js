const validator = require("../helper/validate.helper");



// validation for Login



const login = (req, res, next) => {
  const validationRule = {
    Username: "required|string",
    Password: "required|string",
    Notification_Token: "required|string"
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(200).send({
        code: 201,
        status: "failure",
        message: "validation error",
        error : err["errors"]
      });
    } else {
      next();
    }
  });
};






module.exports = {
  login
};