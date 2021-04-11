export default function logger(req, res, next) {
    if (req.path === '/login' || req.path === '/register') {
        if (!req.session.user) {
            return next()
        }
    
        return res.redirect('/')
    }

    if (req.session.user) {
        return next()
    }

    res.redirect('/login')
}
