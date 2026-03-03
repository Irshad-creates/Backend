const jwt = require('jsonwebtoken')

async function indentifyUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "token invaild, unauthorized access",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "invaild token",
    });
  }

  req.user = decoded

  next()
}


module.exports = indentifyUser