const should = require('should');
const sinon = require('sinon');

const deleterAndCreate = require('../controllers/hero/heroPatch');

describe('Hero delete and create', () => {
	it('should delete and create new hero', () => {
		const hero = { save: (callback) => callback() };
		const req = { hero, body: { name: 'Bombasto' } };
		const res = {
			sendStatus: sinon.spy(),
			json: () => {}
		};
		deleterAndCreate(req, res);

		res.sendStatus.calledWith(200).should.equal(true);
	});

	it('should not delete and create new hero without hero', () => {
		const req = { body: {} };
		const res = {
			sendStatus: sinon.spy(),
			json: () => {}
		};
		deleterAndCreate(req, res);

		res.sendStatus.calledWith(400).should.equal(true);
	});

	it('should delete and create new hero with _id', () => {
		const hero = { save: (callback) => callback(), _id: 1 };
		const req = { hero, body: {} };
		const res = {
			sendStatus: sinon.spy(),
			json: () => {}
		};
		deleterAndCreate(req, res);

		res.sendStatus.calledWith(200).should.equal(true);
	});

	it('should delete and create new hero', () => {
		const hero = {
			save: (callback) => {
				const err = 'err';
				callback(err);
			}
		};
		const req = { hero, body: { name: 'Bombasto' } };
		const res = {
			send: sinon.spy()
		};
		deleterAndCreate(req, res);

		res.send.called.should.equal(true);
	});
});
