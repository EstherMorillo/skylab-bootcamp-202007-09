const express = require('express');

const recipesRouter = express.Router();
const debug = require('debug')('app:recipesRoutes');

const { MongoClient, ObjectID } = require('mongodb');

function router(nav) {
	recipesRouter
		.route('/')
		.get((req, res) => {
			// mongodb
			const url = 'mongodb://localhost:27017';
			const dbName = 'organicMarket';
			const collectionName = 'recipes';
			let client;

			(async function query() {
				try {
					client = await MongoClient.connect(url);

					const db = client.db(dbName);

					const collection = await db.collection(collectionName);

					const recipe = await collection.find().toArray();

					res.render('list', {
						nav,
						title: 'Products List',
						recipes: recipe
					});
				} catch (error) {
					debug(error.stack);
				}
				client.close();
			})();
		})
		.post((req, res) => {
			const { product } = req.body;
			debug(req.body);
			const url = 'mongodb://localhost:27017';
			const dbName = 'organicMarket';
			const collectionName = 'recipes';
			let client;

			(async function deleteHeroFromList() {
				try {
					client = await MongoClient.connect(url);
					debug('Connection to db established...');
					const db = client.db(dbName);
					const collection = db.collection(collectionName);
					const { title } = req.body;
					const filter = { title };
					await collection.deleteOne(filter);
					res.redirect('/list');
				} catch (error) {
					debug(error.stack);
				}
			})();
		});
	recipesRouter.route('/addcart').post((req, res) => {
		const { product } = req.body;
		debug(req.body);
		const url = 'mongodb://localhost:27017';
		const dbName = 'organicMarket';
		const collectionName = 'recipes';
		let client;

		(async function mongo() {
			client = await MongoClient.connect(url);

			const db = client.db(dbName);

			const collection = db.collection(collectionName);

			const idProduct = await collection.findOne({
				_id: new ObjectID(product)
			});
			debug(idProduct);
		})();
	});

	recipesRouter.route('/create').post((req, res) => {
		const { deletedRecipe } = req.body;
		const url = 'mongodb://localhost:27017';
		const dbName = 'organicMarket';
		const collectionName = 'recipes';
		let client;
		res.send('Inserting books');
		(async function mongo() {
			try {
				/* client = await MongoClient.connect(url);
					debug('Connect sucesfully');
	
					const db = client.db(dbName);
	
					const response = await db.collection('books').insertMany(books);
					res.json(response); */
				/* client = await MongoClient.connect(url);
					debug('Connection to db established...');
					const db = client.db(dbName);
					const collection = db.collection(collectionName);
					const { title } = req.body;
					const filter = { title };
					await collection.deleteOne(filter);
					res.redirect('/list'); */
			} catch (error) {
				debug(error.stack);
			}

			client.close();
		})();
	});
	recipesRouter.route('/:title').get((req, res) => {
		const url = 'mongodb://localhost:27017';
		const dbName = 'organicMarket';
		let client;
		const { title } = req.params;
		const fileName = '0.jpg';
		(async function query() {
			try {
				client = await MongoClient.connect(url);

				const db = client.db(dbName);

				const collection = await db.collection('recipes');
				const filterRecipe = await collection.findOne({ title });
				debug(filterRecipe);

				res.render('detail', {
					nav,
					title: 'Detail',
					/* recipe: {
						title: 'Brown eggs',
						type: 'dairy',
						description: 'Raw organic brown eggs in a basket',
						filename: '0.jpg',
						height: 600,
						width: 400,
						price: 28.1,
						rating: 4
					} */
					recipe: filterRecipe
				});
			} catch (error) {
				debug(error);
			}
		})();
	});

	return recipesRouter;
}

module.exports = router;