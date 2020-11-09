module.exports = {
  jwt: {
    secret: process.env.JWT_SECRET || "SetStrongSecretInDotEnv",
    options: {
      expiresIn: "1y",
    },
    cookie: {
      httpOnly: true,
      sameSite: true,
      signed: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  },
};
