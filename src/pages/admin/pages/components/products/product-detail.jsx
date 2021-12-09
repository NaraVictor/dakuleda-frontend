import { updateData } from "../../../../../helpers/utilities";
import placeholder from "../../../../../static/img/placeholder-image.png";

const ProductDetail = ({ product, onReload, onEdit }) => {
	const deleteProduct = () => {
		updateData(`accounts/${product.id}/update-status`).then((res) => onReload);
	};
	return (
		<div className="p-3">
			{!product.hasOwnProperty("id") ? (
				<p>Select a product</p>
			) : (
				<div>
					<div className="row">
						<div className="col-12">
							<h3 className="mb-0">{product.name}</h3>
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-7">
							<p>
								<strong>Purchase Price:</strong> {product.purchasePrice}
							</p>
							<p>
								<strong>Regular Price:</strong> {product.regularPrice}
							</p>
							<p>
								<strong>New Price:</strong> {product.newPrice}
							</p>
							<p>
								<strong>Category:</strong> {product.category.name}
							</p>
							<p>
								<strong>Manufacturer:</strong> {product.manufacturer.name}
							</p>

							<p>
								<strong>SKU:</strong> {product.SKU}
							</p>
							<p>
								<strong>Gift Eligble:</strong>
								{product.giftEligible ? "Yes" : "No"}
							</p>
							<p>
								<strong>Free Delivery:</strong>
								{product.freeDelivery ? "Yes" : "No"}
							</p>

							<p>
								<strong>Location:</strong> {product.location}
							</p>
							<p>
								<strong>Number of Orders:</strong> {product.orderCount}
							</p>
							<p>
								<strong>Description:</strong> {product.description}
							</p>
						</div>
						<div className="col-5">
							<img
								src={product.imageUrl || placeholder}
								alt="category"
								style={{
									maxHeight: "200px",
									maxWidth: "190px",
								}}
							/>
						</div>
					</div>
					<hr />
					<div className="row">
						<button
							className="btn-dc-white"
							onClick={() => onEdit(product, true)}>
							<i className="bi bi-pencil"></i>
							edit
						</button>

						<button className="btn-dc-white" onClick={() => deleteProduct()}>
							<i className="bi bi-trash"></i>
							delete
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export { ProductDetail };
