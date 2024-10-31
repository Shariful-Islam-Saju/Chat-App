function decorateHTML(pageTitle) {
  return (req, res, next) => {
    res.locals.HTML = true;
    res.locals.title = `${pageTitle} - Chat Application `;
    next()
  };
}

export default decorateHTML
