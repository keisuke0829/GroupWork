module.exports = function(req, res, next) {
	var userId = req.session.user_id;
	var userName = req.session.user_name;
	if (userId) {
		res.locals.userName = userName;
	}
	next();
};