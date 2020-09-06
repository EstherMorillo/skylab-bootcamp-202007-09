const express = require('express');

const usersRouterControler = require('../controler/usersRouteControler');
const userRouteControler = require('../controler/userRouteControler');

const authRouter = express.Router();

function routes(User) {
	const controlerUserList = usersRouterControler(User);
	authRouter.route('/').post(controlerUserList.post).get(controlerUserList.get);

	authRouter.use('/:userId', (req, res, next) => {
		User.findById(req.params.userId, (error, user) => {
			if (error) {
				res.send(error);
			}
			if (user) {
				req.user = user;
				next();
			} else {
				res.sendStatus(404);
			}
		});
	});

	authRouter
		.route('/:userId')
		.put(userRouteControler.put)
		.patch(userRouteControler.patch)
		.delete(userRouteControler.deleter)
		.get(userRouteControler.get);

	return authRouter;
}

module.exports = routes;
