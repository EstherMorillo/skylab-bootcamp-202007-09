const should = require('should');
const sinon = require('sinon');

const create = require('../controllers/hero/heroCreate');

describe('Hero create', () => {
	it('should create hero', () => {
		const req = { body: {} };
		const res = {
			json: () => {},
			sendStatus: sinon.spy()
		};
		const Hero = function heroConstructor() {
			this.id = 13;
			this.name = 'Bombasto';
			this.save = (callback) => callback();
		};
		create(req, res, Hero);

		res.sendStatus.calledWith(200).should.equal(true);
	});
	it('should not create hero without name or id', () => {
		const req = { body: {} };
		const res = {
			json: () => {},
			sendStatus: sinon.spy()
		};
		const Hero = function heroConstructor() {
			this.save = (callback) => callback();
		};
		create(req, res, Hero);

		res.sendStatus.calledWith(404).should.equal(true);
	});

	it('should not create hero without data', () => {
		const req = {};
		const res = { sendStatus: sinon.spy() };

		create(req, res);

		res.sendStatus.calledWith(404).should.equal(true);
	});
});
