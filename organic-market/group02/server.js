const express = require('express');
const debug = require('debug')('app');
const chalk = require('chalk');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const ROUTES = require('./src/routes/ROUTES');

const app = express();
const port = 3010;

app.use(morgan('dev'));

/* configurar middlewares */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(expressSession({
	secret: 'products',
	resave: true,
	saveUninitialized: false
}));

require('./src/config/passport')(app);

/* otros */
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
	{ link: '/', title: 'Top Products' },
	{ link: '/products', title: 'Products' },
	{ link: ROUTES.signup.path, title: 'Sign up' },
	{ link: ROUTES.signin.path, title: 'Sign in' },
	{ link: ROUTES.signout.path, title: 'Sign out' },
	{ link: ROUTES.cart.path, title: 'Cart' }
];

const topProductRoutes = require('./src/routes/topProductRoutes')(nav);

app.use('/', topProductRoutes);

const productRoutes = require('./src/routes/productRoutes')(nav);

app.use('/products', productRoutes);

const adminRoutes = require('./src/routes/adminRoutes')(nav);

app.use('/admin', adminRoutes);

const authRoutes = require('./src/routes/authRoutes')(nav);

app.use('/auth', authRoutes);

const cartRoutes = require('./src/routes/cartRoutes')(nav);

app.use('/cart', cartRoutes);

const apiRoutes = require('./src/routes/apiRoutes')(nav);

app.use('/api', apiRoutes);

app.listen(port, () => debug(`Listening on port ${chalk.green(port)}`));