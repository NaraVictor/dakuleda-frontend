import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { shopContext } from "./../../context/shopContext";
import AddToCartButton from "./addToCartButton";
import BuyItemButton from "./buyItemButton";
import { generateFileUrl } from "./../../helpers/utilities";

const Product = (props) => {
	const { name, regularPrice, imageFileName, manufacturer, newPrice, slug } =
		props.prod;
	const { hideButtons, hideSeparator } = props;
	const { selectItem } = useContext(shopContext);

	return (
		<article className="product text-center my-md-4">
			<Link
				to={`/p/${slug}`}
				title={name}
				onClick={() => selectItem(props.prod)}>
				<div className="product-image">
					<img src={generateFileUrl(imageFileName)} alt="product" />
				</div>
				<div className="product-detail">
					<p className="m-0 product-title">{name}</p>
					<small>{manufacturer.name ?? "manufacturer"}</small>
					<div>
						<strong>GHS {newPrice}</strong>{" "}
						<strike>
							<small>GHS {regularPrice}</small>
						</strike>
					</div>

					{hideSeparator ? "" : <hr />}
				</div>
			</Link>
			{hideButtons ? (
				""
			) : (
				<div className="product-footer">
					{/* <AddToCartButton prod={props.prod} /> */}
					<BuyItemButton prod={props.prod} />
				</div>
			)}
		</article>
	);
};

export default Product;
