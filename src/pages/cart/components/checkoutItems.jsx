export const BuyCheckOut = ({ item }) => {
	return (
		<article className="checkout-items">
			<section className="buy">
				<h5>Item</h5>
				<div className="row">
					<div className="col-5">
						<img
							src={item.product_image}
							alt="product"
							className="checkout-prod-img"
						/>
					</div>
					<div className="col-7">
						<div>
							<strong>{item.name}</strong>
						</div>
						<div>GHS {item.new_price}</div>
						<div>
							<small>
								<strike>{item.regular_price}</strike>
							</small>
							<small className="text-success d-block">
								<strong>{item.category}</strong>
							</small>
						</div>
					</div>
				</div>
			</section>
		</article>
	);
};

export const CartCheckOut = (props) => {
	return (
		<section>
			<h1>Cart Checktout</h1>
		</section>
	);
};
