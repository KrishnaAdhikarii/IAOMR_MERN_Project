module.exports = (req, res, next) => {
  try {
    // Example:
    // req.user comes from auth middleware

    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      })
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Admin access only",
      })
    }

    next()
  } catch (err) {
    console.error(err)

    res.status(500).json({
      message: "Authorization failed",
    })
  }
}