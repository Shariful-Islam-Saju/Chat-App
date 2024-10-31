import createHttpError from "http-errors";

export function notFound(req, res, next) {
  next(createHttpError(404, "Your Requsted Content Not Found!"));
}

export function errorHandler(err, req, res, next) {
  res.render("error", {
    error: "This is  an error message",
  });
}
