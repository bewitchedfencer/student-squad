var exports = module.exports = {};

exports.dashboard = function (req, res) {
    console.log(`Request.body inside auth.controllers: ${req.body}`);
    //change dashboard to the correct handlebars file
    res.render('dashboard', req.body);
};

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/')
    })
}