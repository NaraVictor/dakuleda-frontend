import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { shopContext } from "./../../context/shopContext";
import AddToCartButton from "./addToCartButton";
import BuyItemButton from "./buyItemButton";

const Product = (props) => {
	const {
		name,
		regular_price,
		product_image,
		manufacturer_name,
		new_price,
		slug,
	} = props.prod;
	const { hideButtons, hideSeparator } = props;
	const { selectItem } = useContext(shopContext);

	return (
		<article className="product text-center my-md-4">
			<Link
				to={`/p/${slug}`}
				title={name}
				onClick={() => selectItem(props.prod)}>
				<div className="product-image">
					<img src={product_image} alt="product" />
				</div>
				<div className="product-detail">
					<p className="m-0 product-title">{name}</p>
					<small>{manufacturer_name ?? "manufacturer"}</small>
					<div>
						<strong>GHS {new_price}</strong>{" "}
						<strike>
							<small>GHS {regular_price}</small>
						</strike>
					</div>

					{hideSeparator ? "" : <hr />}
				</div>
			</Link>
			{hideButtons ? (
				""
			) : (
				<div className="product-footer">
					<AddToCartButton prod={props.prod} />
					<BuyItemButton prod={props.prod} />
				</div>
			)}
		</article>
	);
};

export default Product;
