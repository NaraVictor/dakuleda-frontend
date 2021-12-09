import React from "react";
import { Link } from "react-router-dom";

const Product = (props) => {
	const { title, image, manufacturer, price } = props.prod;
	const { hideButtons, hideSeparator } = props;

	return (
		<article className="product text-center my-md-4">
			<Link to={`/product/${title}`} title={title}>
				<div className="product-image">
					<img
						src={image}
						style={{ maxHeight: 200, maxWidth: 200 }}
						alt="product"
					/>
				</div>
				<div className="product-detail">
					<p className="m-0 product-title">{title}</p>
					<small>{manufacturer ?? "manufacturer"}</small>
					<div>
						<strong>GHS {price}</strong> <strike>GHS 110</strike>
					</div>

					{hideSeparator ? "" : <hr />}
				</div>
			</Link>
			{hideButtons ? (
				""
			) : (
				<div className="product-footer">
					<button className="btn-dc-white">Add to cart</button>
					<button className="btn-dc-primary">Buy now</button>
				</div>
			)}
		</article>
	);
};

export default Product;
