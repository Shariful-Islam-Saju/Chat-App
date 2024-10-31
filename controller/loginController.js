export function getLogin(req, res, next) {
  res.render("index", {
    title: "Login - Chat Application",
  });
}
