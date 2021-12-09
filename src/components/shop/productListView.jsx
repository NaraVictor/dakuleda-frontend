import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "./addToCartButton";
import BuyItemButton from "./buyItemButton";
import { shopContext } from "./../../context/shopContext";

const ProductListView = (props) => {
	const {
		name,
		product_image,
		regular_price,
		new_price,
		manufacturer_name,
		description,
		slug,
	} = props.prod;

	const shop = useContext(shopContext);

	return (
		<article className="product-list">
			<div className="row">
				<div className="col-2 no-gutters">
					<Link
						to={`/p/${slug}`}
						title={name}
						className="col"
						onClick={() => shop.selectItem(props.prod)}>
						<img
							src={product_image}
							alt="product"
							className="mr-3 product-list-image"
						/>
					</Link>
				</div>

				<div className="col-md-6 col product-title-details pl-5">
					<Link
						to={`/p/${slug}`}
						title={name}
						onClick={() => shop.selectItem(props.prod)}>
						<h4>{name}</h4>
						<p className="product-list-manufacturer text-success">
							<strong>{manufacturer_name}</strong>
						</p>
						<small id="product-list-description">{description}</small>

						{/* for small screen only */}
						<div className="product-list-sm-details">
							<h4>GHS {new_price}</h4>
							<p>
								<strike>GHS {regular_price}</strike>
							</p>
						</div>
					</Link>
				</div>

				<div className="col-md-4 product-list-footer pl-5 ml-5 ml-md-0">
					<div className="product-list-prices">
						<h4>GHS {new_price}</h4>
						<p>
							<strike>GHS {regular_price}</strike>
						</p>
					</div>
					<AddToCartButton prod={props.prod} classes="d-md-block my-md-3" />
					<BuyItemButton prod={props.prod} classes="d-md-block" />
				</div>
			</div>
		</article>
	);
};

export default ProductListView;
