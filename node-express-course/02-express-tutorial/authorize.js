const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === "Kolade") {
    req.user = { name: "Kolade" };
    next();
  } else {
    res.status(401).send("unauthorized");
  }
};
module.exports = authorize;
