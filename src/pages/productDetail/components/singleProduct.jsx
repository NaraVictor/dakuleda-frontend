import React from "react";
import { Row, Container } from "react-bootstrap";
import AddToCartButton from "../../../components/shop/addToCartButton";
import BuyItemButton from "../../../components/shop/buyItemButton";

const SingleProduct = (props) => {
	const {
		name,
		number_in_stock,
		product_image,
		regular_price,
		new_price,
		category,
		description,
	} = props.prod;

	let count = [];

	for (let i = 1; i <= number_in_stock; i++) {
		count.push(i);
	}

	const qtyControl = (
		<select name="cart-qty" className="cart-qty">
			{count.map((number) => (
				<option value={`${number}`} key={number}>
					{number}
				</option>
			))}
		</select>
	);

	return (
		<Container>
			{props.prod.notfound && (
				<div className="row">
					<div className="col mt-2 text-center">
						<h6 className="alert alert-danger">
							Your initial item search was not found. Check the product name in
							the url n try again
						</h6>
					</div>
				</div>
			)}

			<Row as="section" className="py-4 text-center text-md-left">
				<article className="col-md-1 single-product-gallery">
					{props.gallery.map((img) => (
						<img
							src={img.image}
							alt="product gallery"
							className="product-gallery-img"
						/>
					))}
				</article>
				<article className="col-md-7 col text-center  bg-gray">
					<img
						src={product_image}
						alt="single product"
						id="single-product"
						className="single-product-image"
					/>
				</article>
				<article className="col-md-4 col mt-4 single-product-details">
					<h3>{name}</h3>
					<div className="mt-4 mb-2">
						<h4>
							<strong>GHS {new_price}</strong>
						</h4>
						<strike>GHS {regular_price}</strike>
						<p className="my-2">
							category:
							<strong className="text-success"> {category}</strong>
						</p>
					</div>

					<small className="mr-2">
						<strong>Qty</strong>
					</small>
					{qtyControl}

					<AddToCartButton classes="ml-3" prod={props.prod} />
					<BuyItemButton classes="btn-primary-filled px-3" prod={props.prod} />
					<p className="mt-3">{description}</p>
				</article>
			</Row>
		</Container>
	);
};

export default SingleProduct;
