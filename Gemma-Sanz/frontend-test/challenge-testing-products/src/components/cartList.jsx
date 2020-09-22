import React, { useState, useEffect } from 'react';
import productStore from '../store/productStore';
import './cartList.css';

function CartList() {
	const [cart, setCart] = useState(productStore.getCart());
	useEffect(() => {
		productStore.addChangeListener(onChange);

		return () => {
			productStore.removeChangeListener(onChange);
		};
	}, [cart.length]);

	function onChange() {
		setCart(productStore.getCart());
	}
	return (
		<div className="cart__container">
			<h3>MI CESTA</h3>
			<ul>
				{cart.map((product) => {
					return (
						<li className="cart__product">
							<img
								className="image__product"
								src={product.img}
								alt="product"
							></img>
							<p>{product.name}</p>
							<p>
								<span>{product.price} €</span>
							</p>
						</li>
					);
				})}
			</ul>
			<div className="cart__total">
				<p>
					{' '}
					<span> TOTAL </span>({cart.length} productos)
				</p>
				<p>
					<span> XXX €</span>
				</p>
			</div>
		</div>
	);
}

export default CartList;
