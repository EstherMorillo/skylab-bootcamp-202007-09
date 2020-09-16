const put = (req, res) => {
	const { user } = req;
	if (user) {
		user.name = req.body.name;
		user.save((err) => {
			if (err) {
				res.send(err);
			}
			res.json(user);
		});
		res.status(200);
	} else {
		res.status(404);
	}
};
const patch = (req, res) => {
	const { user } = req;
	if (user) {
		// eslint-disable-next-line no-underscore-dangle
		if (user._id) {
			// eslint-disable-next-line no-underscore-dangle
			delete user._id;
		}

		Object.entries(req.body).forEach((item) => {
			const key = item[0];
			const value = item[1];
			user[key] = value;
		});
		user.save((err) => {
			if (err) {
				res.send(err);
			}
			res.json(user);
		});
		res.status(200);
	} else {
		res.status(404);
	}
};

const deleter = (req, res) => {
	const { user } = req;
	if (user) {
		user.remove((err) => {
			if (err) {
				res.send(err);
			}
			res.json(user);
		});
		res.status(200);
	} else {
		res.status(404);
	}
};

const get = (req, res) => {
	const { user } = req;
	if (user) {
		res.json(user);
		res.status(200);
	} else {
		res.status(404);
	}
};
module.exports = { put, patch, deleter, get };
