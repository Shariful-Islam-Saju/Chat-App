export function getUser(req, res , next) {
    res.render('users', {
        title: "Users - Chat Application"
    })
}