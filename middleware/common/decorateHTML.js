function decorateHTML(pageTitle) {
  return (req, res, next) => {
    res.locals.HTML = true;
    res.locals.title = `${pageTitle} - Chat Application `;
    res.locals.loggedInUser = {}
    res.locals.errors = {}
    res.locals.data  = {}

    next()
  };
}

export default decorateHTML
