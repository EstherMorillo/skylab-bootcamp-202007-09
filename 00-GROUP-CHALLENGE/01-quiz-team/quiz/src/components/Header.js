import React from 'react';
import { NavLink } from 'react-router-dom';
import './../css/styles.css'
import './../css/Header.css'


function Header(props) {
	return (
		<>
			<div className="header border border-info">
				<div className="inner__header">
						<div className="logo__header">
							<img className="img__header" src="https://storage.needpix.com/rsynced_images/quiz-2074324_1280.png" alt="quiz logo" />
						</div>
					<nav>
<<<<<<< HEAD
						<NavLink activeClassName="my-active-class" to="/">
							Home
				</NavLink>{' '}
						{' | '}
						<NavLink activeClassName="my-active-class" to="/leaderboard">
							Leaderboard
				</NavLink>{' '}
						{' | '}
						<NavLink activeClassName="my-active-class" to="/dashboard">
=======
						<NavLink className="nav__item" activeClassName="my-active-class link" to="/">
							Home
				</NavLink>{' '}
						{' | '}
						<NavLink className="nav__item" activeClassName="my-active-class link" to="/leaderboard">
							Leaderboard
				</NavLink>{' '}
						{' | '}
						<NavLink className="nav__item" activeClassName="my-active-class link" to="/dashboard">
>>>>>>> a8868aadee8bf3af7fa026975d4a31806774c6fd
							Dashboard
				</NavLink>
					</nav>
					<NavLink activeClassName="my-active-class" to="/Login">
						<button type="button" class="btn btn-info">Login</button>
					</NavLink>
				</div>
			</div>
		</>
	)
}

export default Header;
