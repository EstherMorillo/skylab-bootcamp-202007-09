const { expect } = require('chai');
const sinon = require('sinon');
const controller = require('../controllers/heroesRouteController');

describe.skip('Heroes Controller', () => {
	afterEach(() => {
		sinon.restore();
	});
	it('should respond with status 201', () => {
		const Hero = function () {
			this.save = () => {};
		};

		const req = {
			body: {
				name: 'Bombasto'
			}
		};

		const res = {
			status: (code) => {},
			json: () => {}
		};

		const statusSpy = sinon.spy(res, 'status');

		controller(Hero).post(req, res);

		expect(statusSpy.calledWith(201)).to.be.true;
	});

	it('should respond with status 400', () => {
		const Hero = function () {
			this.save = () => {};
		};

		const req = {
			body: {}
		};

		const res = {
			status: (code) => {},
			send: () => {}
		};

		const statusSpy = sinon.spy(res, 'status');

		controller(Hero).post(req, res);

		expect(statusSpy.calledWith(400)).to.be.true;
	});

	it('should call find without query', () => {
		const Hero = {
			find: () => {}
		};

		const req = {};

		const res = {};

		const findSpy = sinon.spy(Hero, 'find');

		controller(Hero).get(req, res);

		expect(findSpy.called).to.be.true;
	});

	it('should call find with a query', () => {
		const Hero = {
			find: () => {}
		};

		const req = {
			query: {
				id: 'myId'
			}
		};

		const res = {};

		const findSpy = sinon.spy(Hero, 'find');

		controller(Hero).get(req, res);

		expect(findSpy.called).to.be.true;
	});
});
