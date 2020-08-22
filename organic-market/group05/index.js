const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 2222;

app.use(morgan('tiny'));

/* app.use((req, res, next) => {
	debug('Organic Market works');
	next();
}); */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(expressSession({ secret: 'products' }));
require('./src/config/passport')(app);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
	{ link: '/', title: 'Home' },
	{ link: '/products', title: 'Products' },
	{ link: '/auth/profile', title: 'My profile' },
	{ link: '/auth/signin', title: 'Login' },
	{ link: '/cart', title: 'Cart' }
	// { link: '/auth/signout', title: 'Sign out' }
];

app.get('/', (req, res) => {
	const url = 'mongodb://localhost:27017';
	const dbName = 'organics';
	const collectionName = 'products';
	let client;

	(async function mongo() {
		try {
			client = await MongoClient.connect(url);
			debug('Connection for home works');
			const db = client.db(dbName);
			const collection = db.collection(collectionName);
			const products = await collection
				.find({ rating: 5 } || { rating: '5' })
				.toArray();
			res.render('home', { nav, title: 'Home', products });
		} catch (error) {
			debug(error.stack);
		}
		client.close();
	})();
});

const productsRoutes = require('./src/routes/productsRoutes')(nav);

app.use('/products', productsRoutes);

const mongoRoutes = require('./src/routes/mongoRoutes');

app.use('/getproducts', mongoRoutes);

const authRoutes = require('./src/routes/authRoutes')(nav);

app.use('/auth', authRoutes);

app.listen(port, () =>
	debug(`Server is running in ${chalk.cyan('port: ')}${chalk.cyan(port)}`)
);