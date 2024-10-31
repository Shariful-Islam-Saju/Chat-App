import createHttpError from "http-errors";

export function notFound(req, res, next) {
  next(createHttpError(404, "Your Requsted Content Not Found!"));
}

export function errorHandler(err, req, res, next) {
  res.locals.errors =
    process.env.NODE_ENV === "development" ? err : { message: err.message };
  res.status(err.status || 500);

  if (!res.locals.html) {
    res.render("error", {
      error: res.locals.errors,
    });
  } else {
    res.json(res.locals.errors)
  }
}
