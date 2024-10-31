export function getInbox(req, res, next) {
  res.render('inbox', {
    title:"Inbox - Chat Application"
  })
}