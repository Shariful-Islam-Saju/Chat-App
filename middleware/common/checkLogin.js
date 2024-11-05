import jwt from "jsonwebtoken";

export async function checkLogin(req, res, next) {
  const cookie =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (cookie) {
    const token = cookie[process.env.COOKIE_NAME];

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Set loggedInUser for templates if HTML response
        if (res.locals.HTML) {
          res.locals.loggedInUser = decoded;
        }

        next(); // Proceed to next middleware or route handler
      } catch (error) {
        res.clearCookie(process.env.COOKIE_NAME);

        if (res.locals.HTML) {
          return res.redirect("/"); // Redirect to login page for HTML requests
        } else {
          return res.status(401).send({ message: "Invalid token" });
        }
      }
    } else {
      // No token in signed cookies
      res.clearCookie(process.env.COOKIE_NAME);

      if (res.locals.HTML) {
        return res.redirect("/"); // Redirect to login page for HTML requests
      } else {
        return res.status(401).send({ message: "No token found" });
      }
    }
  } else {
    // No signed cookies at all
    if (res.locals.HTML) {
      return res.redirect("/"); // Redirect to login page for HTML requests
    } else {
      return res.status(401).send({ message: "No cookie found" });
    }
  }
}
