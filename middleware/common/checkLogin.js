import jwt from "jsonwebtoken";

// Helper function to retrieve and verify token
function getVerifiedToken(req) {
  const cookie =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  if (cookie) {
    const token = cookie[process.env.COOKIE_NAME];
    if (token) {
      try {
        return jwt.verify(token, process.env.JWT_SECRET); // Return decoded token if valid
      } catch (error) {
        return null; // Return null if token verification fails
      }
    }
  }
  return null; // Return null if no token or no cookies
}

// Middleware to check if user is logged in
export async function checkLogin(req, res, next) {
  const decoded = getVerifiedToken(req);

  if (decoded) {
    req.user = decoded;
    if (res.locals.HTML) {
      res.locals.loggedInUser = decoded;
    }
    next();
  } else {
    res.clearCookie(process.env.COOKIE_NAME);
    if (res.locals.HTML) {
      return res.redirect("/"); // Redirect to login page for HTML requests
    } else {
      return res.status(401).send({ message: "Authentication required" });
    }
  }
}

// Middleware to redirect if user is already logged in
export async function redirectCheck(req, res, next) {
  const decoded = getVerifiedToken(req);

  if (decoded) {
    req.user = decoded;
    if (res.locals.HTML) {
      res.locals.loggedInUser = decoded;
    }
    return res.redirect("/inbox"); // Redirect to inbox if user is already logged in
  } else {
    // Clear cookie if invalid or missing token
    res.clearCookie(process.env.COOKIE_NAME);
    next(); // Continue to the next middleware or route handler
  }
}
