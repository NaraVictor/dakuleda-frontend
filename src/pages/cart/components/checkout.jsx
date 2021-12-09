import React from "react";
import { shopContext } from "./../../../context/shopContext";
import CheckOutForm from "./checkoutForm";
import { BuyCheckOut, CartCheckOut } from "./checkoutItems";
import { Link } from "react-router-dom";
import { postData, toTitleCase } from "./../../../helpers/utilities";

class CheckOut extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			form: {
				name: "",
				location: "",
				phone: "",
				email: "",
				"payment-method": "",
				"delivery-method": "",
			},
			success: false,
			errors: [],
		};
	}

	static contextType = shopContext;

	componentDidMount() {
		// check if either cart or buy mode is valid
		// if(localStorage.getItem("buy"))
	}

	validateForm = () => {
		let { errors, form } = this.state;
		errors = [];

		for (const [key, value] of Object.entries(form)) {
			if (!value) {
				if (["email"].includes(key)) continue;
				else errors.push(`${toTitleCase(key)} is required`);
			}
		}

		this.setState({ errors });
		if (errors.length > 0) return false;
		return true;
	};

	handleCheckOut = (e) => {
		e.preventDefault();

		if (!this.validateForm()) return;

		postData("checkout/").then((res) => {
			// update success n clear form
			this.setState({
				success: true,
				form: {
					name: "",
					location: "",
					phone: "",
					email: "",
					"payment-method": "",
					"delivery-method": "",
				},
			});

			// call checkout on context
			this.context.checkOut("buy");
		});
	};

	handleChange = ({ target: input }) => {
		const form = { ...this.state.form };
		form[input.id] = input.value;
		this.setState({ form });
	};

	render() {
		const item = this.context.getBuyItem();
		const { errors, form, success } = this.state;
		return (
			<div className="container mt-3 mb-5">
				<article className="row">
					{success ? (
						<div className="text-center col">
							<i className="fas fa-check-circle fa-5x text-success"></i>
							<h2 className="text-success">Success</h2>
							<p>Your order has been successfully placed.</p>
							<p>We'd get in touched soon!</p>
							<Link
								onClick={() => {
									this.props.history.replace("/");
								}}>
								Back to Shop
							</Link>
						</div>
					) : (
						<>
							<section className="col-md-6 col order-2 order-md-1">
								<h3>Checkout</h3>
								{errors &&
									errors.map((err, index) => (
										<strong className="text-danger d-block" key={index}>
											{err}
										</strong>
									))}
								<hr />
								<CheckOutForm
									onCheckout={this.handleCheckOut}
									onChange={this.handleChange}
									data={form}
								/>
							</section>
							{item && (
								<section className="col-md-4 order-1 order-md-2 mb-5">
									<h3>Order</h3>
									<hr />
									<BuyCheckOut item={item} />
								</section>
							)}
						</>
					)}
				</article>
			</div>
		);
	}
}

export default CheckOut;
