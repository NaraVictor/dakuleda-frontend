import React, { useState } from "react";
import { Row, Container } from "react-bootstrap";
import { FreeDelivery, GiftEligible } from "../../../components/gift-deliver";
import AddToCartButton from "../../../components/shop/addToCartButton";
import BuyItemButton from "../../../components/shop/buyItemButton";
import {
	cedisLocale,
	generateFileUrl,
	priceChangePercentage,
} from "./../../../helpers/utilities";
import { SRLWrapper } from "simple-react-lightbox";

const SingleProduct = ({ prod, gallery }) => {
	// const { name, imageFileName, regularPrice, newPrice, category, description } =
	// 	prod;
	const [qty, setQty] = useState(1);

	let count = [];

	const handleChange = (e) => {
		setQty(e.target.value);
	};

	for (let i = 1; i <= 20; i++) {
		count.push(i);
	}
	// for (let i = 1; i <= number_in_stock; i++) {
	// 	count.push(i);
	// }

	const qtyControl = (
		<select name="cart-qty" className="cart-qty" onChange={handleChange}>
			{count.map((number) => (
				<option value={`${number}`} key={number}>
					{number}
				</option>
			))}
		</select>
	);

	return (
		<div className="container">
			{prod.notfound && (
				<div className="row">
					<div className="col mt-2 text-center">
						<h6 className="alert alert-danger">
							Your initial item search was not found. Double check the search
							query
						</h6>
					</div>
				</div>
			)}

			<Row as="section" className="py-4 text-center text-md-left">
				<article className="col-md-1 single-product-gallery">
					<SRLWrapper>
						{gallery.map((img) => (
							<a href={generateFileUrl(img.imageFileName)}>
								<img
									src={generateFileUrl(img.imageFileName)}
									title={prod.name + " product image"}
									alt={prod.name + " product image"}
									className="product-gallery-img my-md-1 my-0"
								/>
							</a>
						))}
					</SRLWrapper>
				</article>
				<article className="col-md-7 col text-center  bg-gray">
					<SRLWrapper>
						<a href={generateFileUrl(prod.imageFileName)}>
							<img
								src={generateFileUrl(prod.imageFileName)}
								alt={prod.name + " product image"}
								id="single-product"
								title={prod.name + " product image"}
								className="single-product-image"
							/>
						</a>
					</SRLWrapper>
				</article>
				<article className="col-md-4 col mt-4 single-product-details">
					<h3>{prod.name}</h3>
					<div>
						{prod.freeDelivery && <FreeDelivery showIconsOnly={false} />}
						{prod.giftEligible && <GiftEligible showIconsOnly={false} />}
					</div>
					<div className="mt-4 mb-2">
						<h4>
							<strong>GHS {cedisLocale.format(prod.newPrice)}</strong>
						</h4>
						<strike>GHS {prod.regularPrice}</strike>
						{/* {priceChangePercentage(prod.regularPrice, prod.newPrice) > 0 &&
								priceChangePercentage(prod.regularPrice, prod.newPrice) +
							" % off"} */}

						{priceChangePercentage(prod.regularPrice, prod.newPrice) > 0 && (
							<small className="bg-dark p-2 ml-2 text-white d-inline rounded">
								{priceChangePercentage(prod.regularPrice, prod.newPrice) +
									" % off"}
							</small>
						)}
						<p className="my-2">
							category:
							<strong className="text-success ml-2">
								{prod.category?.name}
							</strong>
						</p>
					</div>

					<span className="mr-3">
						<small className="mr-3">
							<strong>Qty</strong>
						</small>
						{qtyControl}
					</span>

					{/* <AddToCartButton classes="ml-3" prod={prod} /> */}
					<BuyItemButton
						classes="btn-primary-filled px-3"
						prod={{ ...prod, quantity: qty }}
					/>
					<p className="mt-3">{prod.description}</p>
				</article>
			</Row>
		</div>
	);
};

export default SingleProduct;
