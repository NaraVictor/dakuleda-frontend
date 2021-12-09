import React, { Component } from "react";
import CartItem from "./components/cartItem";
import CartSummary from "./components/cartSummary";
import { cartContext } from "./../../context/cartContext";
import { Link } from "react-router-dom";
import emptyCart from "../../static/svg/emptyCart.svg";
import PageTitle from "./../../components/page-title";

class CartPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	static contextType = cartContext;

	handleCheckOut = () => {
		this.props.history.push("/checkout");
	};

	render() {
		return (
			<section className="container mt-3">
				<PageTitle title="Cart" />
				{this.context.cart.length === 0 ? (
					<div className="text-center">
						<img src={emptyCart} style={{ maxHeight: "30vh" }} alt="" />
						<h2 className="mt-4">Your cart is empty</h2>
						<Link to="" onClick={() => window.history.go(-1)}>
							Continue shopping
						</Link>
					</div>
				) : (
					<>
						<h4>Your Cart ({this.context.cart.length ?? 0} items) </h4>
						<div className="row mt-4">
							<article className="col-md-8">
								{this.context.cart.map((item) => (
									<span key={item.id}>
										<CartItem item={item} />
										<hr />
									</span>
								))}
								<Link
									to="#"
									onClick={() => window.history.go(-1)}
									className="mr-4">
									Continue shopping
								</Link>
								<Link to="#" onClick={this.context.clearCart}>
									clear cart
								</Link>
							</article>
							<article className="col-md-4">
								<CartSummary onCheckOut={this.handleCheckOut} />
							</article>
						</div>
					</>
				)}
			</section>
		);
	}
}

export { CartPage };
